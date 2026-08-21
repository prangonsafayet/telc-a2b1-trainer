import { type DualLevelExam, type TrainerContent } from '@shared/types';

import { A2B1_CURRICULUM } from './curriculum.ts';
import { A2B1_EXAMS } from './exams/index.ts';
import { A2B1_GUIDE } from './guide.ts';
import { A2B1_VOCAB } from './vocab.ts';

/*
 * `paper.ts` is deliberately not part of this — see the note on `TrainerContent` in
 * @shared/types/trainer.ts. `TRAINERS.a2b1.paper` in @shared/config/trainers.ts is where it
 * lives now.
 */

/** Everything the A2·B1 trainer studies from. */
export const A2B1_CONTENT: TrainerContent<DualLevelExam> = {
  trainer: 'a2b1',
  vocab: A2B1_VOCAB,
  curriculum: A2B1_CURRICULUM,
  exams: A2B1_EXAMS,
  guide: A2B1_GUIDE
};
