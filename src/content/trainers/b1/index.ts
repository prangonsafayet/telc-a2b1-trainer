import { type SingleLevelContent } from '@shared/types';

import { B1_CURRICULUM } from './curriculum.ts';
import { B1_EXAMS } from './exams/index.ts';
import { B1_GUIDE } from './guide.ts';
import { B1_PAPER } from './paper.ts';
import { B1_VOCAB } from './vocab.ts';

/** Everything the telc B1 trainer studies from. */
export const B1_CONTENT: SingleLevelContent = {
  trainer: 'b1',
  vocab: B1_VOCAB,
  curriculum: B1_CURRICULUM,
  exams: B1_EXAMS,
  paper: B1_PAPER,
  guide: B1_GUIDE
};
