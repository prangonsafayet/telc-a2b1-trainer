import {
  type LevelContent,
  type SingleLevelExam,
  type SingleLevelTrainerId,
  type VocabBank
} from '@shared/types';

import { B1_CONTENT } from './b1/index.ts';
import { B2_CONTENT } from './b2/index.ts';

/** Everything the two level trainers study from, keyed by level. */
export const LEVEL_CONTENT: Readonly<Record<SingleLevelTrainerId, LevelContent>> = {
  b1: B1_CONTENT,
  b2: B2_CONTENT
};

/** Looks up an exam by id; accepts the string form that arrives from route params. */
export const findSingleLevelExam = (
  level: SingleLevelTrainerId,
  id: string | number | undefined
): SingleLevelExam | undefined => {
  const numeric = Number(id);
  return Number.isFinite(numeric) ? LEVEL_CONTENT[level].exams.find(exam => exam.id === numeric) : undefined;
};

/** Every learnable item id of one bank, across all five categories. */
export const allItemIds = (vocab: VocabBank): readonly string[] => [
  ...vocab.verbs.map(item => item.id),
  ...vocab.nouns.map(item => item.id),
  ...vocab.adjectives.map(item => item.id),
  ...vocab.prepVerbs.map(item => item.id),
  ...vocab.caseItems.map(item => item.id)
];
