import { type SingleLevelContent } from '@shared/types';

import { B2_CURRICULUM } from './curriculum.ts';
import { B2_EXAMS } from './exams/index.ts';
import { B2_GUIDE } from './guide.ts';
import { B2_PAPER } from './paper.ts';
import { B2_VOCAB } from './vocab.ts';

/** Everything the telc B2 trainer studies from. */
export const B2_CONTENT: SingleLevelContent = {
  trainer: 'b2',
  vocab: B2_VOCAB,
  curriculum: B2_CURRICULUM,
  exams: B2_EXAMS,
  paper: B2_PAPER,
  guide: B2_GUIDE
};
