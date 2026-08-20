/** Turns stored attempts into the score-history chart's model, per paper. */

import { A2_TOTAL, B1_TOTAL, FULL_EXAM_MAX } from '@shared/config/exam.ts';
import {
  SINGLE_LEVEL_ORAL_PASS,
  SINGLE_LEVEL_TOTAL_MAX,
  SINGLE_LEVEL_WRITTEN_PASS
} from '@shared/config/singleLevelExam.ts';
import {
  type ExamGrade,
  type ScoreChartGridline,
  type ScoreChartModel,
  type ScoredAttempts
} from '@shared/types';

export const CHART_HEIGHT = 160;

/** Older sittings scroll off: a dozen bars is what fits and what is still comparable. */
const MAX_BARS = 12;

const DUAL_LEVEL_GRIDLINES: readonly ScoreChartGridline[] = [
  { value: FULL_EXAM_MAX, label: String(FULL_EXAM_MAX) },
  { value: B1_TOTAL, label: `${String(B1_TOTAL)} · B1` },
  { value: A2_TOTAL, label: `${String(A2_TOTAL)} · A2` }
];

const DUAL_LEVEL_DESCRIPTION = `Total points per full exam. Gridlines mark the B1 (${String(B1_TOTAL)}) and A2 (${String(A2_TOTAL)}) zones — the official rule uses per-skill minimums, see the Exam Guide.`;

/** 60% written plus 60% oral is the lowest total any pass can add up to. */
const SINGLE_LEVEL_PASS_LINE = SINGLE_LEVEL_WRITTEN_PASS + SINGLE_LEVEL_ORAL_PASS;

const SINGLE_LEVEL_GRIDLINES: readonly ScoreChartGridline[] = [
  { value: SINGLE_LEVEL_PASS_LINE, label: String(SINGLE_LEVEL_PASS_LINE) }
];

const SINGLE_LEVEL_DESCRIPTION = `Total points per full exam out of ${String(SINGLE_LEVEL_TOTAL_MAX)}. The gridline marks ${String(SINGLE_LEVEL_PASS_LINE)} — the minimum a pass adds up to (60% written and 60% oral, judged separately).`;

const gradeColor = (result: ExamGrade): string => {
  if (result === 'B1') return 'var(--success)';
  if (result === 'A2') return 'var(--warning)';
  return 'var(--destructive)';
};

/** A bar per scored sitting; practice runs and unscored attempts are not comparable. */
const scored = <T extends { readonly mode: string; readonly total?: number }>(
  attempts: readonly T[]
): readonly T[] =>
  attempts.filter(attempt => attempt.mode === 'full' && typeof attempt.total === 'number').slice(-MAX_BARS);

export const buildScoreChart = (source: ScoredAttempts): ScoreChartModel => {
  if (source.format === 'single-level') {
    return {
      max: SINGLE_LEVEL_TOTAL_MAX,
      description: SINGLE_LEVEL_DESCRIPTION,
      gridlines: SINGLE_LEVEL_GRIDLINES,
      bars: scored(source.attempts).map(attempt => ({
        id: attempt.id,
        examId: attempt.examId,
        date: attempt.date,
        total: attempt.total ?? 0,
        result: attempt.result ?? '',
        color: attempt.result === 'Bestanden' ? 'var(--success)' : 'var(--destructive)'
      }))
    };
  }

  return {
    max: FULL_EXAM_MAX,
    description: DUAL_LEVEL_DESCRIPTION,
    gridlines: DUAL_LEVEL_GRIDLINES,
    bars: scored(source.attempts).map(attempt => {
      const result = attempt.result ?? 'Nicht bestanden';
      return {
        id: attempt.id,
        examId: attempt.examId,
        date: attempt.date,
        total: attempt.total ?? 0,
        result,
        color: gradeColor(result)
      };
    })
  };
};
