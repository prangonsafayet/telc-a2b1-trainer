import { type ExamDifficulty, type ExamGrade } from '@shared/types';

/** The badge variants this app's data maps onto. Mirrors `BadgeVariant` without
 *  importing the design system into a pure lib. */
export type BadgeTone = 'success' | 'warning' | 'destructive' | 'info' | 'outline' | 'secondary';

/** Grade → badge tone, so a pass always reads green and a fail always red. */
export const gradeTone = (result: ExamGrade | undefined): BadgeTone => {
  if (result === 'B1') return 'success';
  if (result === 'A2') return 'warning';
  return 'destructive';
};

export const difficultyTone = (difficulty: ExamDifficulty): BadgeTone => {
  if (difficulty === 'easy') return 'success';
  if (difficulty === 'medium') return 'warning';
  return 'info';
};
