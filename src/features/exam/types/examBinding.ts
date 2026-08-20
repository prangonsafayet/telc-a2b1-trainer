/**
 * Where a trainer's exam data lives. The A2·B1 trainer keeps its attempts and settings at
 * the top of the progress database; the B1 and B2 trainers keep theirs in their own
 * document. The screens do not care which — they read one of these.
 */

import {
  type DualLevelAttempt,
  type DualLevelExam,
  type LevelTrainerSettings,
  type Settings,
  type SingleLevelAttempt,
  type SingleLevelExam,
  type SingleLevelTrainerId
} from '@shared/types';

import { type ExamFormat } from './examFormat.ts';

export interface ExamStore<TSettings, TAttempt> {
  readonly settings: TSettings;
  readonly attempts: readonly TAttempt[];
  /** Appends a finished attempt and persists the whole database. */
  readonly saveAttempt: (attempt: TAttempt) => void;
}

export type A2b1Format = ExamFormat<DualLevelExam, Settings, DualLevelAttempt>;
export type SingleLevelFormat = ExamFormat<SingleLevelExam, LevelTrainerSettings, SingleLevelAttempt>;

/**
 * A trainer resolved to its paper and its stored data. Discriminated so a screen narrows
 * once and then renders the same generic view either way.
 */
export type ExamBinding =
  | {
      readonly kind: 'dual-level';
      readonly format: A2b1Format;
      readonly store: ExamStore<Settings, DualLevelAttempt>;
    }
  | {
      readonly kind: 'single-level';
      readonly level: SingleLevelTrainerId;
      readonly format: SingleLevelFormat;
      readonly store: ExamStore<LevelTrainerSettings, SingleLevelAttempt>;
    };
