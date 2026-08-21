/**
 * The score-history chart as a resolved model. Both papers score out of different totals
 * against different gridlines, so the numbers are worked out per format and the component
 * only draws — which is why there is one chart rather than one per trainer.
 */

import { type DualLevelAttempt } from './progress.ts';
import { type SingleLevelAttempt } from './singleLevelExam.ts';

/** Stored attempts together with the paper they were marked against. */
export type ScoredAttempts =
  | { readonly format: 'dual-level'; readonly attempts: readonly DualLevelAttempt[] }
  | { readonly format: 'single-level'; readonly attempts: readonly SingleLevelAttempt[] };

export interface ScoreChartGridline {
  readonly value: number;
  readonly label: string;
}

export interface ScoreChartBar {
  readonly id: number;
  readonly examId: number;
  /** ISO timestamp. */
  readonly date: string;
  readonly total: number;
  /** The grade or result, for the hover title. */
  readonly result: string;
  readonly color: string;
}

export interface ScoreChartModel {
  /** Points a perfect sitting scores — the vertical scale. */
  readonly max: number;
  readonly description: string;
  readonly gridlines: readonly ScoreChartGridline[];
  readonly bars: readonly ScoreChartBar[];
}
