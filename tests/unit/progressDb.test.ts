import { describe, expect, it } from 'vitest';

import { EMPTY_DATABASE, emptyTrainerDoc, normalizeDatabase } from '@features/progress/lib/progressDb.ts';
import { defaultExamDate } from '@shared/config/exam.ts';
import { TRAINERS, TRAINER_ORDER } from '@shared/config/trainers.ts';

/*
 * A fresh trainer document used to hardcode `writingMinutes: 30` and re-implement
 * `defaultExamDate()` inline. Both B1 and B2 run a 30-minute Schreiben, so the constant
 * looked right and would have gone on looking right — a fourth single-level trainer with a
 * different official time would silently have inherited B1's, and `emptyTrainerDoc` takes no
 * trainer to notice.
 */

describe('a fresh trainer document', () => {
  for (const trainer of TRAINER_ORDER) {
    it(`gives ${trainer} the writing time its own paper allows`, () => {
      expect(emptyTrainerDoc(trainer).settings.writingMinutes).toBe(
        TRAINERS[trainer].paper.minutes.schreiben
      );
    });
  }

  it('dates itself with the shared default, not a second copy of the maths', () => {
    expect(emptyTrainerDoc(TRAINER_ORDER[0] ?? 'a2b1').settings.examDate).toBe(defaultExamDate());
  });

  it('allows one play of each listening clip — a fact of this paper, not of a trainer', () => {
    for (const trainer of TRAINER_ORDER) expect(emptyTrainerDoc(trainer).settings.playsAllowed).toBe(1);
  });

  it('is empty of study state', () => {
    const doc = emptyTrainerDoc('b1');
    expect(doc.attempts).toEqual([]);
    expect(doc.learnDone).toEqual({});
    expect(doc.srs).toEqual({});
    expect(doc.activity).toEqual({});
  });
});

/* Each trainer's slice of the empty and normalised documents has to be that trainer's own,
   not a shared object — the writing time is the visible difference. */
describe('the documents built from it', () => {
  const docKeys = TRAINER_ORDER.map(trainer => TRAINERS[trainer].docKey).filter(
    (key): key is NonNullable<typeof key> => key !== null
  );

  it('seeds every trainer slice of EMPTY_DATABASE from that trainer', () => {
    for (const key of docKeys) {
      expect(EMPTY_DATABASE[key]?.settings.writingMinutes).toBe(TRAINERS[key].paper.minutes.schreiben);
    }
  });

  it('defaults a missing trainer slice from that trainer too', () => {
    const normalized = normalizeDatabase({});
    for (const key of docKeys) {
      expect(normalized[key]?.settings.writingMinutes).toBe(TRAINERS[key].paper.minutes.schreiben);
    }
  });
});
