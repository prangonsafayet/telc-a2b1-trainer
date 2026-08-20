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
