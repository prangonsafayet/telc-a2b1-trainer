import { describe, expect, it } from 'vitest';

import { DEFAULT_SETTINGS } from '@shared/config/exam.ts';
import { TRAINERS, TRAINER_ORDER } from '@shared/config/trainers.ts';
import { type DualLevelAttempt, type LevelTrainerDoc, type ProgressDatabase } from '@shared/types';
import { describeImport, planImport } from '@features/progress/lib/importProgress.ts';
import { normalizeDatabase } from '@features/progress/lib/progressDb.ts';

/*
 * Importing a backup exported by the pre-B1/B2 app used to empty both trainer documents —
 * attempts `[]`, learnDone `{}`, srs `{}` — with no confirmation, and the fresh `_updatedAt`
 * then pushed that emptiness to the cloud row and every other device. The file says nothing
 * about those trainers, which is not the same as asking for them to be deleted.
 *
 * Every trainer here comes from the registry rather than a hardcoded list, so a fourth one
 * inherits this suite unedited.
 */

const attempt = (id: number): DualLevelAttempt => ({
  id,
  examId: 1,
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

/** The document keys of the trainers that keep their own slice. */
const docKeys = TRAINER_ORDER.map(trainer => TRAINERS[trainer].docKey).filter(
  (key): key is NonNullable<typeof key> => key !== null
);

/** A stored document where every trainer has work in it. */
const stored = (): ProgressDatabase =>
  normalizeDatabase({
    attempts: [attempt(1)],
    learnDone: { d1t0: true },
    settings: DEFAULT_SETTINGS,
    srs: { 'a2b1.v.001': { box: 3, due: '2026-05-01', seen: 6, correct: 5, wrong: 1 } },
    activity: { '2026-05-01': 4 },
    ...Object.fromEntries(
      docKeys.map(key => [
        key,
        levelDoc({
          attempts: [{ ...attempt(2), level: key } as never],
          learnDone: { d2t1: true },
          srs: { [`${key}.v.001`]: { box: 5, due: '2026-06-01', seen: 20, correct: 18, wrong: 2 } }
        })
      ])
    )
  });

/** A backup as the app exported it before the level trainers existed. */
const preBranchFile = (): unknown => ({
  attempts: [attempt(9)],
  learnDone: { d3t0: true },
  settings: DEFAULT_SETTINGS
});

const rootTrainer = TRAINER_ORDER.find(trainer => TRAINERS[trainer].docKey === null);
if (rootTrainer === undefined) throw new Error('a trainer has to own the root of the document');

describe('planImport', () => {
  it('keeps the progress of every trainer a pre-branch backup does not mention', () => {
    const before = stored();

    const plan = planImport(before, preBranchFile());

    expect(plan).not.toBeNull();
    expect(plan?.replaces).toEqual([rootTrainer]);
    expect(plan?.keeps).toEqual(TRAINER_ORDER.filter(trainer => trainer !== rootTrainer));
    for (const key of docKeys) {
      expect(plan?.database[key]?.attempts).toHaveLength(1);
      expect(plan?.database[key]?.learnDone).toEqual({ d2t1: true });
      expect(plan?.database[key]?.srs[`${key}.v.001`]?.box).toBe(5);
    }
  });

  it('still replaces the slice the file does carry', () => {
    const plan = planImport(stored(), preBranchFile());

    expect(plan?.database.attempts.map(entry => entry.id)).toEqual([9]);
    expect(plan?.database.learnDone).toEqual({ d3t0: true });
  });

  it('replaces a trainer the file mentions, even with an empty document', () => {
    const [key] = docKeys;
    if (key === undefined) throw new Error('this suite needs a trainer with its own document');

    const plan = planImport(stored(), { ...(preBranchFile() as object), [key]: levelDoc() });

    /* Present-but-empty is an instruction; absent is not. */
    expect(plan?.database[key]?.attempts).toEqual([]);
    expect(plan?.database[key]?.learnDone).toEqual({});
  });

  it('imports a file that carries only one trainer without touching the others', () => {
    const [key] = docKeys;
    if (key === undefined) throw new Error('this suite needs a trainer with its own document');
    const before = stored();

    const plan = planImport(before, { [key]: levelDoc({ learnDone: { d5t0: true } }) });

    expect(plan?.database[key]?.learnDone).toEqual({ d5t0: true });
    /* The root trainer is not in the file, so its attempts and exam conditions stay. */
    expect(plan?.database.attempts.map(entry => entry.id)).toEqual([1]);
    expect(plan?.database.learnDone).toEqual({ d1t0: true });
    expect(plan?.database.settings).toEqual(before.settings);
  });

  it('refuses a file that speaks for no trainer at all', () => {
    for (const parsed of [{}, [], null, 7, 'progress', { unrelated: true }]) {
      expect(planImport(stored(), parsed)).toBeNull();
    }
  });
});

describe('describeImport', () => {
  it('names what is replaced and what is kept', () => {
    const plan = planImport(stored(), preBranchFile());
    if (!plan) throw new Error('the pre-branch file is a valid export');

    const description = describeImport(plan);

    expect(description).toContain(TRAINERS[rootTrainer].short);
    for (const trainer of plan.keeps) expect(description).toContain(TRAINERS[trainer].short);
    expect(description).toMatch(/stays exactly as it is|stays exactly as they are|their progress stays/);
    /* The import trips the debounced push, so the dialog has to say the cloud is involved. */
    expect(description).toMatch(/syncs to the cloud/);
  });

  it('says nothing about kept trainers when the file carries them all', () => {
    const whole = stored();
    const plan = planImport(whole, JSON.parse(JSON.stringify(whole)));
    if (!plan) throw new Error('a full export is a valid export');

    expect(plan.keeps).toEqual([]);
    expect(describeImport(plan)).not.toMatch(/not in the file/);
  });
});
