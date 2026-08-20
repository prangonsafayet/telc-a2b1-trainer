/** Looking up one exam of a paper — generic over the paper, so it carries no trainer's data. */

import { type ExamPaper } from '@shared/types';

/** Looks up a paper by id; accepts the string form that arrives from route params. */
export const findPaper = <TExam extends ExamPaper>(
  exams: readonly TExam[],
  id: string | number | undefined
): TExam | undefined => {
  const numeric = Number(id);
  return Number.isFinite(numeric) ? exams.find(exam => exam.id === numeric) : undefined;
};
