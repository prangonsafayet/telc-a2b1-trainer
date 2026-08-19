import { type LevelContent } from '@shared/types';

import { B1_CURRICULUM } from './curriculum.ts';
import { B1_EXAMS } from './exams/index.ts';
import { B1_VOCAB } from './vocab.ts';

export const B1_CONTENT: LevelContent = {
  level: 'b1',
  vocab: B1_VOCAB,
  curriculum: B1_CURRICULUM,
  exams: B1_EXAMS
};
