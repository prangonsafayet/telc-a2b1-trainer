import { describe, expect, it } from 'vitest';

import { mergeProgress } from '@features/auth/lib/mergeProgress.ts';
import { normalizeDatabase } from '@features/progress/lib/progressDb.ts';
import { DEFAULT_SETTINGS } from '@shared/config/exam.ts';
import { type DualLevelAttempt, type LevelTrainerDoc, type ProgressDatabase } from '@shared/types';

/* Sync is the one place where two real documents meet, and anything it forgets to copy is
   gone for good. It rebuilds the document field by field, so every field needs a test —
   the B1/B2 trainer documents were dropped entirely when the trainers were first added,
   which silently wiped vocabulary progress on every sign-in. */

const attempt = (id: number, examId = 1): DualLevelAttempt => ({
  id,
  examId,
  mode: 'full',
  date: new Date(id).toISOString(),
  times: {},
  scores: {},
  sb: null,
  answers: {},
  ratings: {}
});

const levelDoc = (over: Partial<LevelTrainerDoc> = {}): LevelTrainerDoc => ({
  attempts: [],
  learnDone: {},
  srs: {},
  activity: {},
  settings: { examDate: '2026-10-01', writingMinutes: 30, playsAllowed: 1 },
  ...over
});

const db = (over: Partial<ProgressDatabase> = {}): ProgressDatabase => ({
  attempts: [],
  learnDone: {},
  settings: DEFAULT_SETTINGS,
  srs: {},
  activity: {},
  ...over
});

describe('the A2·B1 document', () => {
  it('unions attempts by id and keeps them sorted', () => {
    const merged = mergeProgress(db({ attempts: [attempt(2)] }), db({ attempts: [attempt(1), attempt(2)] }));
    expect(merged.attempts.map(a => a.id)).toEqual([1, 2]);
  });

  it('ORs completed tasks, so unticking on one device undoes nothing on another', () => {
    const merged = mergeProgress(
      db({ learnDone: { d1t0: true, d2t0: false } }),
      db({ learnDone: { d2t0: true } })
    );
    expect(merged.learnDone).toEqual({ d1t0: true, d2t0: true });
  });

  it('takes settings from whichever side is newer', () => {
    const older = db({ settings: { ...DEFAULT_SETTINGS, examDate: '2026-01-01' }, _updatedAt: '2026-01-01' });
    const newer = db({ settings: { ...DEFAULT_SETTINGS, examDate: '2026-12-31' }, _updatedAt: '2026-06-01' });
    expect(mergeProgress(newer, older).settings.examDate).toBe('2026-12-31');
    expect(mergeProgress(older, newer).settings.examDate).toBe('2026-12-31');
  });

  it('merges the root trainer SRS state per item, keeping the more studied side', () => {
    const merged = mergeProgress(
      db({ srs: { 'a2b1.v.001': { box: 1, due: '2026-05-01', seen: 2, correct: 1, wrong: 1 } } }),
      db({ srs: { 'a2b1.v.001': { box: 4, due: '2026-04-01', seen: 9, correct: 8, wrong: 1 } } })
    );
    expect(merged.srs['a2b1.v.001']).toEqual({
      box: 4,
      due: '2026-05-01',
      seen: 9,
      correct: 8,
      wrong: 1
    });
  });

  it('keeps the larger root activity count per day, so syncing twice cannot inflate a streak', () => {
    const merged = mergeProgress(
      db({ activity: { '2026-05-01': 3 } }),
      db({ activity: { '2026-05-01': 7 } })
    );
    expect(merged.activity).toEqual({ '2026-05-01': 7 });
  });

  /* A document written by a build without the root SRS fields still arrives from the cloud
     table; reading it must not throw, or every sign-in on an older account fails. */
  it('survives a remote document written before the root SRS fields existed', () => {
    /* Parsed rather than constructed: the point is a payload whose fields are simply not
       there, which the current type cannot express. */
    const legacy = JSON.parse(
      JSON.stringify({ attempts: [], learnDone: {}, settings: DEFAULT_SETTINGS })
    ) as ProgressDatabase;
    const local = db({ srs: { x: { box: 2, due: '2026-05-01', seen: 1, correct: 1, wrong: 0 } } });
    const merged = mergeProgress(local, legacy);
    expect(merged.srs['x']?.box).toBe(2);
    expect(merged.activity).toEqual({});
  });

  it('returns whichever side exists when the other does not', () => {
    const only = db({ attempts: [attempt(1)] });
    expect(mergeProgress(only, null)).toBe(only);
    expect(mergeProgress(null, only)).toBe(only);
    expect(() => mergeProgress(null, null)).toThrow();
  });
});

describe('the B1 and B2 documents', () => {
  it('survives a merge at all', () => {
    const local = db({
      b1: levelDoc({ srs: { 'b1.v.001': { box: 3, due: '2026-09-01', seen: 4, correct: 3, wrong: 1 } } })
    });
    const merged = mergeProgress(local, db());
    expect(merged.b1?.srs['b1.v.001']?.box).toBe(3);
  });

  it('keeps the side that has studied an item further, and the later due date', () => {
    const ahead = db({
      b1: levelDoc({ srs: { 'b1.v.001': { box: 4, due: '2026-09-05', seen: 9, correct: 8, wrong: 1 } } })
    });
    const behind = db({
      b1: levelDoc({ srs: { 'b1.v.001': { box: 1, due: '2026-09-09', seen: 2, correct: 1, wrong: 1 } } })
    });
    const merged = mergeProgress(ahead, behind).b1?.srs['b1.v.001'];
    expect(merged?.box).toBe(4);
    expect(merged?.seen).toBe(9);
    /* Later due date wins, or an item just answered on one device is asked again today. */
    expect(merged?.due).toBe('2026-09-09');
  });

  it('takes the larger daily touch count rather than the sum, so syncing twice is idempotent', () => {
    const a = db({ b1: levelDoc({ activity: { '2026-08-20': 12, '2026-08-19': 3 } }) });
    const b = db({ b1: levelDoc({ activity: { '2026-08-20': 7 } }) });
    const once = mergeProgress(a, b);
    expect(once.b1?.activity).toEqual({ '2026-08-20': 12, '2026-08-19': 3 });
    expect(mergeProgress(once, b).b1?.activity).toEqual(once.b1?.activity);
  });

  it('unions level attempts and ORs curriculum ticks independently per level', () => {
    const local = db({
      b1: levelDoc({ learnDone: { d1t0: true } }),
      b2: levelDoc({ attempts: [{ ...attempt(5), level: 'b2' } as never] })
    });
    const remote = db({ b1: levelDoc({ learnDone: { d2t0: true } }), b2: levelDoc() });
    const merged = mergeProgress(local, remote);
    expect(merged.b1?.learnDone).toEqual({ d1t0: true, d2t0: true });
    expect(merged.b2?.attempts.map(a => a.id)).toEqual([5]);
    /* b1's ticks must not leak into b2. */
    expect(merged.b2?.learnDone).toEqual({});
  });

  it('carries a trainer that only one side has ever used', () => {
    const merged = mergeProgress(db({ b2: levelDoc({ learnDone: { d3t1: true } }) }), db());
    expect(merged.b2?.learnDone).toEqual({ d3t1: true });
    /* An unused trainer stays absent rather than becoming an explicit undefined. */
    expect('b1' in merged).toBe(false);
  });

  it('keeps each trainer its own exam date', () => {
    const local = db({
      b1: levelDoc({ settings: { examDate: '2026-11-01', writingMinutes: 30, playsAllowed: 1 } }),
      b2: levelDoc({ settings: { examDate: '2027-02-01', writingMinutes: 30, playsAllowed: 1 } }),
      _updatedAt: '2026-06-01'
    });
    const merged = mergeProgress(local, db({ _updatedAt: '2026-01-01' }));
    expect(merged.b1?.settings.examDate).toBe('2026-11-01');
    expect(merged.b2?.settings.examDate).toBe('2027-02-01');
  });
});

/* `normalizeDatabase` runs on every write, not only on load. Rebuilding its sub-objects
   unconditionally handed every memo a new `settings` and two new trainer documents each time
   a curriculum checkbox was ticked, which is why the exam binding churned. */
describe('normalizeDatabase', () => {
  it('keeps the objects it was handed when nothing needs defaulting', () => {
    const first = normalizeDatabase({});
    const second = normalizeDatabase({ ...first, learnDone: { d1t0: true } });

    expect(second.settings).toBe(first.settings);
    expect(second.attempts).toBe(first.attempts);
    expect(second.b1).toBe(first.b1);
    expect(second.b2).toBe(first.b2);
    expect(second.learnDone).toEqual({ d1t0: true });
  });

  it('still defaults a field that is genuinely missing', () => {
    const partial = normalizeDatabase({ settings: { examDate: '2026-11-01' } });

    expect(partial.settings.examDate).toBe('2026-11-01');
    expect(partial.settings.writingMinutes).toBe(DEFAULT_SETTINGS.writingMinutes);
    expect(partial.b1?.settings.playsAllowed).toBeDefined();
    expect(partial.attempts).toEqual([]);
  });

  it('replaces a trainer document that is not one', () => {
    const fixed = normalizeDatabase({ b1: 'nonsense' });

    expect(fixed.b1?.attempts).toEqual([]);
    expect(fixed.b1?.settings.writingMinutes).toBeDefined();
  });
});

/*
 * Forward compatibility. `useCloudSync` pulls the row, runs `normalizeDatabase` over it and
 * merges it — and both of those used to rebuild the document from a whitelist, so a field
 * this build has never heard of was dropped and then pushed back stripped. That deletes a
 * newer build's progress from the cloud: exactly the shape of the wipe that lost every
 * B1/B2 attempt once, one rollout step removed (a cached bundle, a staged rollout, a tab
 * that has not reloaded). The registry's own extensibility note says a fourth trainer costs
 * a field on `ProgressDatabase`, so this is the rollout that produces it.
 */
describe('a document written by a newer build', () => {
  /** The row as `push` upserts it — JSON, where a field the types cannot express is visible. */
  const asRow = (database: ProgressDatabase): Partial<Record<string, unknown>> =>
    JSON.parse(JSON.stringify(database)) as Partial<Record<string, unknown>>;

  /** A fourth trainer's document, as a build this one predates would have written it. */
  const newerRow = (): unknown => ({
    attempts: [attempt(1)],
    learnDone: {},
    settings: DEFAULT_SETTINGS,
    srs: {},
    activity: {},
    b3: { attempts: [attempt(9)], learnDone: { d1t0: true }, srs: {}, activity: {} },
    _updatedAt: '2026-06-01'
  });

  it('keeps the unknown trainer document when the remote row is normalized', () => {
    const normalized = normalizeDatabase(newerRow());

    expect(asRow(normalized)['b3']).toEqual({
      attempts: [attempt(9)],
      learnDone: { d1t0: true },
      srs: {},
      activity: {}
    });
    /* And the fields this build does know are still validated, not merely passed through. */
    expect(normalized.b1?.settings.playsAllowed).toBeDefined();
  });

  it('keeps it through the pull, the merge and the push back', () => {
    const remote = normalizeDatabase(newerRow());
    const local = normalizeDatabase({ attempts: [attempt(2)], _updatedAt: '2026-07-01' });

    const pushed = asRow(mergeProgress(local, remote));

    expect(pushed['b3']).toEqual({
      attempts: [attempt(9)],
      learnDone: { d1t0: true },
      srs: {},
      activity: {}
    });
    /* The known fields still merge as they always did. */
    expect((pushed['attempts'] as readonly DualLevelAttempt[]).map(a => a.id)).toEqual([1, 2]);
  });

  it('keeps an unknown field inside a trainer document too', () => {
    const remote = normalizeDatabase({
      ...db(),
      b1: { ...levelDoc(), quizStreak: 4 },
      _updatedAt: '2026-06-01'
    });
    const local = normalizeDatabase({ ...db({ b1: levelDoc() }), _updatedAt: '2026-07-01' });

    const pushed = asRow(mergeProgress(local, remote));

    expect((pushed['b1'] as Partial<Record<string, unknown>>)['quizStreak']).toBe(4);
  });

  it('takes the newer side when both know the field', () => {
    const older = normalizeDatabase({ ...db(), b3: { attempts: [] }, _updatedAt: '2026-01-01' });
    const newer = normalizeDatabase({ ...db(), b3: { attempts: [attempt(9)] }, _updatedAt: '2026-09-01' });

    expect(asRow(mergeProgress(newer, older))['b3']).toEqual({ attempts: [attempt(9)] });
    expect(asRow(mergeProgress(older, newer))['b3']).toEqual({ attempts: [attempt(9)] });
  });
});

/*
 * `typeof null === 'object'`, so a document with `learnDone: null` — a hand-edited or
 * foreign JSON file, reachable through the import path — loaded with the null intact. Then
 * `Object.entries(null)` threw inside `mergeProgress`, so that account could not sign in at
 * all, and every reader of the map crashed the page it was on, including the Settings screen
 * the user would have to import a good file from.
 */
describe('a document with null where a map belongs', () => {
  /* Parsed rather than constructed: the type cannot express what a foreign file may hold. */
  const hostile = (): unknown =>
    JSON.parse(
      '{"learnDone":null,"srs":null,"activity":null,"b1":{"learnDone":null,"srs":null,"activity":null}}'
    );

  it('defaults every null map to an empty one', () => {
    const fixed = normalizeDatabase(hostile());

    expect(fixed.learnDone).toEqual({});
    expect(fixed.srs).toEqual({});
    expect(fixed.activity).toEqual({});
    expect(fixed.b1?.learnDone).toEqual({});
    expect(fixed.b1?.srs).toEqual({});
    expect(fixed.b1?.activity).toEqual({});
  });

  it('lets sign-in merge it instead of throwing', () => {
    const local = normalizeDatabase(hostile());
    const remote = db({ learnDone: { d1t0: true }, b1: levelDoc({ learnDone: { d2t0: true } }) });

    expect(() => mergeProgress(local, remote)).not.toThrow();
    const merged = mergeProgress(local, remote);
    expect(merged.learnDone).toEqual({ d1t0: true });
    expect(merged.b1?.learnDone).toEqual({ d2t0: true });
  });

  it('defaults an array where a map belongs, which contributes no ticks either way', () => {
    const fixed = normalizeDatabase(JSON.parse('{"learnDone":[],"srs":[],"activity":[]}'));

    expect(fixed.learnDone).toEqual({});
    expect(fixed.srs).toEqual({});
    expect(fixed.activity).toEqual({});
  });
});

/*
 * `seen`, `correct` and `wrong` only ever go up, one review at a time. `mergeSrs` takes the
 * entry from whichever side has the higher box, so an item studied a lot on the device that
 * happens to be one box behind used to have its history replaced by the other side's much
 * smaller counters — twenty reviews reported as four.
 */
describe('the SRS counters', () => {
  const entry = (box: number, due: string, seen: number) => ({
    box,
    due,
    seen,
    correct: seen - 1,
    wrong: 1
  });

  it('never go backwards when the side with the higher box has seen less', () => {
    const merged = mergeProgress(
      db({ srs: { item: entry(3, '2026-05-01', 20) } }),
      db({ srs: { item: entry(4, '2026-04-01', 4) } })
    );

    /* The box and the due date rules are unchanged: higher box, later due. */
    expect(merged.srs['item']?.box).toBe(4);
    expect(merged.srs['item']?.due).toBe('2026-05-01');
    expect(merged.srs['item']?.seen).toBe(20);
    expect(merged.srs['item']?.correct).toBe(19);
  });

  it('merge the same way inside a trainer document, and stay idempotent', () => {
    const local = db({ b1: levelDoc({ srs: { item: entry(3, '2026-05-01', 20) } }) });
    const remote = db({ b1: levelDoc({ srs: { item: entry(5, '2026-04-01', 6) } }) });

    const once = mergeProgress(local, remote);
    expect(once.b1?.srs['item']?.box).toBe(5);
    expect(once.b1?.srs['item']?.seen).toBe(20);
    /* Syncing twice must not change the answer, as with the activity counts. */
    expect(mergeProgress(once, remote).b1?.srs['item']).toEqual(once.b1?.srs['item']);
  });
});
