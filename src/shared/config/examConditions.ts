/**
 * The exam conditions a trainer lets the candidate tune, per paper. Keyed by format: the
 * official writing time and the number of times an audio plays are properties of the paper,
 * so a trainer offers whichever set the paper it sets does.
 */

import { type ExamFormatId } from '@shared/types';

import { FULL_EXAM_MAX } from './exam.ts';
import { SINGLE_LEVEL_TOTAL_MAX } from './singleLevelExam.ts';

export interface SettingChoice {
  readonly value: number;
  readonly label: string;
}

export const WRITING_MINUTE_CHOICES: Readonly<Record<ExamFormatId, readonly SettingChoice[]>> = {
  'dual-level': [
    { value: 10, label: '10 minutes (official)' },
    { value: 15, label: '15 minutes (relaxed)' }
  ],
  'single-level': [
    { value: 30, label: '30 minutes (official)' },
    { value: 40, label: '40 minutes (relaxed)' }
  ]
};

/**
 * The share of a scored section a pass needs, per paper. The A2·B1 paper wants 42 of 60 in
 * three of its four skills; the single-level paper wants 60% of the written and of the oral
 * part. Every consumer — the dashboard meters, the weak-area detection and the copy that
 * names the line — reads this, so the two papers' lines cannot be crossed.
 */
export const PASS_PERCENT: Readonly<Record<ExamFormatId, number>> = {
  'dual-level': 70,
  'single-level': 60
};

/** How the pass line reads on screen. */
export const passLineLabel = (format: ExamFormatId): string =>
  format === 'dual-level'
    ? `B1 threshold (${String(PASS_PERCENT[format])}%)`
    : `Pass line (${String(PASS_PERCENT[format])}%)`;

/** Points a perfect sitting of each paper scores. */
export const PAPER_TOTAL_MAX: Readonly<Record<ExamFormatId, number>> = {
  'dual-level': FULL_EXAM_MAX,
  'single-level': SINGLE_LEVEL_TOTAL_MAX
};

/** How each paper is passed, in one sentence — the lead under a dashboard title. */
export const PASS_RULES: Readonly<Record<ExamFormatId, string>> = {
  'dual-level': 'Aim: ≥ 42/60 in three skills and ≥ 24/60 in the fourth = B1.',
  'single-level': 'Pass rule: ≥ 135/225 written and ≥ 45/75 oral — 60% in each part, judged separately.'
};

/**
 * What the official paper allows, said next to the writing-time choice. The number comes
 * from the trainer's own paper rather than from a second list, so the two cannot disagree.
 */
export const officialWritingHint = (minutes: number): string => `Official: ${String(minutes)} minutes.`;

export const PLAYS_ALLOWED_CHOICES: Readonly<Record<ExamFormatId, readonly SettingChoice[]>> = {
  'dual-level': [
    { value: 1, label: '1 (hard mode)' },
    { value: 2, label: '2 (realistic)' },
    { value: 3, label: '3 (training)' }
  ],
  'single-level': [
    { value: 1, label: '1 (official — you hear it once)' },
    { value: 2, label: '2 (training)' },
    { value: 3, label: '3 (training)' }
  ]
};

/** What the real sitting does with its audio, said next to the plays-per-item choice. */
export const PLAYS_ALLOWED_HINTS: Readonly<Record<ExamFormatId, string>> = {
  'dual-level': 'The real exam plays most items twice.',
  'single-level': 'The real exam plays each item once.'
};
