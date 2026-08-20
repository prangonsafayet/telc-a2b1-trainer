/**
 * The exam conditions a trainer lets the candidate tune, per paper. Keyed by format: the
 * official writing time and the number of times an audio plays are properties of the paper,
 * so a trainer offers whichever set the paper it sets does.
 */

import { type ExamFormatId } from '@shared/types';

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
