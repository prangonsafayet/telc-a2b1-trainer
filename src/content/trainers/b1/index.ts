import { type SingleLevelContent } from '@shared/types';

import { B1_CURRICULUM } from './curriculum.ts';
import { B1_EXAMS } from './exams/index.ts';
import { B1_GUIDE } from './guide.ts';
import { B1_VOCAB } from './vocab.ts';

/*
 * `paper.ts` is deliberately not part of this — see the note on `TrainerContent` in
 * @shared/types/trainer.ts. `TRAINERS.b1.paper` in @shared/config/trainers.ts is where it
 * lives now.
 */

/** Everything the telc B1 trainer studies from. */
export const B1_CONTENT: SingleLevelContent = {
  trainer: 'b1',
  vocab: B1_VOCAB,
  curriculum: B1_CURRICULUM,
  exams: B1_EXAMS,
  guide: B1_GUIDE
};
