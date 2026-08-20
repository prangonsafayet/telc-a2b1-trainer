import { type SingleLevelContent } from '@shared/types';

import { B2_CURRICULUM } from './curriculum.ts';
import { B2_EXAMS } from './exams/index.ts';
import { B2_GUIDE } from './guide.ts';
import { B2_VOCAB } from './vocab.ts';

/*
 * `paper.ts` is deliberately not part of this — see the note on `TrainerContent` in
 * @shared/types/trainer.ts. `TRAINERS.b2.paper` in @shared/config/trainers.ts is where it
 * lives now.
 */

/** Everything the telc B2 trainer studies from. */
export const B2_CONTENT: SingleLevelContent = {
  trainer: 'b2',
  vocab: B2_VOCAB,
  curriculum: B2_CURRICULUM,
  exams: B2_EXAMS,
  guide: B2_GUIDE
};
