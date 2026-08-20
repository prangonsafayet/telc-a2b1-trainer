import { type DualLevelAttempt, type ExamGrade } from '@shared/types';

export const CHART_HEIGHT = 160;
const MAX_POINTS = 240;
const MAX_BARS = 12;

export const GRIDLINES = [
  { value: 240, label: '240' },
  { value: 168, label: '168 · B1' },
  { value: 96, label: '96 · A2' }
] as const;

export interface ScoreBar {
  readonly id: number;
  readonly examId: number;
  readonly date: string;
  readonly total: number;
  readonly result: ExamGrade;
  readonly heightPx: number;
  readonly color: string;
}

const colorForGrade = (result: ExamGrade): string => {
  if (result === 'B1') return 'var(--success)';
  if (result === 'A2') return 'var(--warning)';
  return 'var(--destructive)';
};

/** The last dozen full attempts, as bar geometry. */
export const buildScoreHistory = (attempts: readonly DualLevelAttempt[]): readonly ScoreBar[] =>
  attempts
    .filter(attempt => attempt.mode === 'full')
    .slice(-MAX_BARS)
    .map<ScoreBar>(attempt => {
      const total = attempt.total ?? 0;
      const result = attempt.result ?? 'Nicht bestanden';
      return {
        id: attempt.id,
        examId: attempt.examId,
        date: attempt.date,
        total,
        result,
        heightPx: Math.max(2, (total / MAX_POINTS) * CHART_HEIGHT),
        color: colorForGrade(result)
      };
    });
