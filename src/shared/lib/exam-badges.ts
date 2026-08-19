import { type ExamDifficulty, type ExamGrade } from '@/shared/types';

type BadgeTone = 'success' | 'warning' | 'destructive' | 'info';

/** Grade → badge tone, so a pass always reads green and a fail always red. */
export function gradeTone(result: ExamGrade | undefined): BadgeTone {
  if (result === 'B1') return 'success';
  if (result === 'A2') return 'warning';
  return 'destructive';
}

export function difficultyTone(difficulty: ExamDifficulty): BadgeTone {
  if (difficulty === 'easy') return 'success';
  if (difficulty === 'medium') return 'warning';
  return 'info';
}
