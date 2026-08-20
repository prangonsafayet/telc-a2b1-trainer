import { beforeEach, describe, expect, it } from 'vitest';

import { createRunStore, parseRun } from '@features/exam/lib/runStore.ts';
import { type ExamRun } from '@features/exam/types/run.ts';
import { readLocal, removeLocal, writeLocal } from '@shared/lib/storage.ts';
import { type ExamModule } from '@shared/types';

/* The run in progress is the one piece of state a candidate cannot recreate: mis-reading it
   throws away answers and remaining time mid-exam. It has been written in two shapes — the
   B1/B2 trainer used zustand's `persist`, which wraps the payload as
   `{ state: { run }, version }` and called the trainer `level` — and the key is deliberately
   unchanged, so both shapes are still out there in real browsers. Everything below is data
   the app does not control, including whatever a truncated or hand-edited entry holds. */

const KEY = 'telcTrainerLevelRunV1';
const store = createRunStore(KEY);

const run = (over: Partial<ExamRun> = {}): ExamRun => ({
  runId: 1_700_000_000_000,
  trainer: 'b1',
  examId: 3,
  mode: 'lesen',
  queue: ['lesen'],
  index: 0,
  phase: 'module',
  answers: { 'l1.0': 'a' },
  times: {},
  plays: {},
  ratings: {},
  deadline: 1_700_000_100_000,
  moduleStart: 1_700_000_000_000,
  ...over
});

/** A run as an older version of the app left it: one field it did not have yet is absent. */
const runWithout = (field: 'trainer' | 'queue' | 'examId'): Record<string, unknown> => {
  const stored: Record<string, unknown> = { ...run() };
  delete stored[field];
  return stored;
};

/** The run as the old zustand store left it: no `trainer`, a `level`, inside an envelope. */
const legacyEnvelope = (level: string): string =>
  JSON.stringify({ state: { run: { ...runWithout('trainer'), level } }, version: 0 });

beforeEach(() => {
  removeLocal(KEY);
});

describe('parseRun', () => {
  it('resumes a run left behind in the legacy zustand envelope', () => {
    writeLocal(KEY, legacyEnvelope('b1'));

    const loaded = store.load();

    expect(loaded).not.toBeNull();
    expect(loaded?.examId).toBe(3);
    expect(loaded?.phase).toBe('module');
    expect(loaded?.answers).toEqual({ 'l1.0': 'a' });
    /* The deadline is absolute, so the clock the candidate had left survives the upgrade. */
    expect(loaded?.deadline).toBe(1_700_000_100_000);
  });

  it('reads the legacy `level` as the trainer, or the run is offered to the wrong one', () => {
    writeLocal(KEY, legacyEnvelope('b2'));
    expect(store.load()?.trainer).toBe('b2');

    writeLocal(KEY, legacyEnvelope('b1'));
    expect(store.load()?.trainer).toBe('b1');
  });

  it('reads a run stored in the current shape unchanged', () => {
    store.save(run({ trainer: 'b2', mode: 'full' }));

    expect(store.load()).toEqual(run({ trainer: 'b2', mode: 'full' }));
  });

  it('falls back to a2b1 when a run names no trainer', () => {
    writeLocal(KEY, JSON.stringify(runWithout('trainer')));

    /* A2·B1 was the only trainer that had runs before the field existed, so an attempt in
       flight there still resumes rather than restarting. */
    expect(store.load()?.trainer).toBe('a2b1');
    expect(store.load()?.examId).toBe(3);
  });

  it('returns null rather than throwing on an empty zustand envelope', () => {
    writeLocal(KEY, JSON.stringify({ state: { run: null }, version: 0 }));
    expect(store.load()).toBeNull();

    writeLocal(KEY, JSON.stringify({ state: {}, version: 0 }));
    expect(store.load()).toBeNull();
  });

  it('returns null on malformed JSON', () => {
    writeLocal(KEY, '{"state":{"run":');
    expect(store.load()).toBeNull();
  });

  it('returns null on a JSON array', () => {
    writeLocal(KEY, JSON.stringify([run()]));
    expect(store.load()).toBeNull();
  });

  it('returns null when the queue or the exam id is missing', () => {
    writeLocal(KEY, JSON.stringify(runWithout('queue')));
    expect(store.load()).toBeNull();

    writeLocal(KEY, JSON.stringify(runWithout('examId')));
    expect(store.load()).toBeNull();

    writeLocal(KEY, JSON.stringify({ ...run(), examId: '3' }));
    expect(store.load()).toBeNull();
  });

  it('returns null for values that are not objects at all', () => {
    for (const raw of ['null', '"resume"', '7', 'true']) {
      writeLocal(KEY, raw);
      expect(store.load()).toBeNull();
    }
    expect(parseRun(undefined)).toBeNull();
  });

  it('writes and clears under the key it was given, and nothing else', () => {
    const other = createRunStore('telcTrainerRunV1');
    removeLocal('telcTrainerRunV1');

    store.save(run());
    expect(other.load()).toBeNull();
    expect(readLocal(KEY)).not.toBeNull();

    store.clear();
    expect(store.load()).toBeNull();
  });
});

describe('the module queue', () => {
  it('keeps a stored queue as it was written', () => {
    const queue: readonly ExamModule[] = ['lesen', 'sprachbausteine', 'hoeren'];
    store.save(run({ mode: 'full', queue, index: 2 }));

    expect(store.load()?.queue).toEqual(queue);
    expect(store.load()?.index).toBe(2);
  });

  /* `queue[index]` picks the renderer the runner mounts. An entry that names no real module
     used to pass straight through, and the runner then rendered `undefined` as a component —
     a blank screen with a stack trace, from a value the app does not control. */
  it('refuses a queue naming a module that does not exist', () => {
    writeLocal(KEY, JSON.stringify({ ...run(), queue: ['lesen', 'schreiben-teil-2'] }));
    expect(store.load()).toBeNull();

    writeLocal(KEY, JSON.stringify({ ...run(), queue: ['Lesen'] }));
    expect(store.load()).toBeNull();
  });

  it('refuses a queue holding anything that is not a module name', () => {
    for (const queue of [[0], [null], [{ module: 'lesen' }], [['lesen']]]) {
      writeLocal(KEY, JSON.stringify({ ...run(), queue }));
      expect(store.load()).toBeNull();
    }
  });

  it('refuses an empty queue, which has no module to open', () => {
    writeLocal(KEY, JSON.stringify({ ...run(), queue: [] }));
    expect(store.load()).toBeNull();
  });
});

describe('the legacy trainer field', () => {
  it('is read for the trainer and then dropped, not carried onto the run', () => {
    writeLocal(KEY, legacyEnvelope('b2'));
    const loaded = store.load();

    expect(loaded?.trainer).toBe('b2');
    /* `ExamRun` never declared `level`; leaving it on the object means it gets written back
       out on the next save and outlives the migration it belonged to. */
    expect(loaded).not.toBeNull();
    expect(Object.keys(loaded ?? {})).not.toContain('level');
  });
});
