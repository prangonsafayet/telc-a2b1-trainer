/**
 * A trainer resolved to everything an exam screen needs: the paper it sets, the papers it
 * ships, and the slice of the progress document its attempts live in. Which of those a
 * trainer has is read from the registry, so the screens narrow once — on the format — and
 * then render the same generic views either way.
 */

import {
  type DualLevelAttempt,
  type DualLevelExam,
  type LevelTrainerSettings,
  type Settings,
  type SingleLevelAttempt,
  type SingleLevelExam,
  type TrainerId
} from '@shared/types';

import { type ExamFormat } from './examFormat.ts';

export interface ExamStore<TSettings, TAttempt> {
  readonly settings: TSettings;
  readonly attempts: readonly TAttempt[];
  /** Appends a finished attempt and persists the whole database. */
  readonly saveAttempt: (attempt: TAttempt) => void;
}

export type DualLevelFormat = ExamFormat<DualLevelExam, Settings, DualLevelAttempt>;
export type SingleLevelFormat = ExamFormat<SingleLevelExam, LevelTrainerSettings, SingleLevelAttempt>;

export type ExamBinding =
  | {
      readonly kind: 'dual-level';
      readonly trainer: TrainerId;
      readonly format: DualLevelFormat;
      /** Its Modelltests, easiest first. */
      readonly papers: readonly DualLevelExam[];
      readonly store: ExamStore<Settings, DualLevelAttempt>;
    }
  | {
      readonly kind: 'single-level';
      readonly trainer: TrainerId;
      readonly format: SingleLevelFormat;
      readonly papers: readonly SingleLevelExam[];
      readonly store: ExamStore<LevelTrainerSettings, SingleLevelAttempt>;
    };
