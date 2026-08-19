import { type LevelContent } from '@shared/types';

import { B2_CURRICULUM } from './curriculum.ts';
import { B2_EXAMS } from './exams/index.ts';
import { B2_VOCAB } from './vocab.ts';

export const B2_CONTENT: LevelContent = {
  level: 'b2',
  vocab: B2_VOCAB,
  curriculum: B2_CURRICULUM,
  exams: B2_EXAMS
};
