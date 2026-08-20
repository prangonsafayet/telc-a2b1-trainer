/**
 * Where a trainer's exam data lives. The A2·B1 trainer keeps its attempts and settings at
 * the top of the progress database; the B1 and B2 trainers keep theirs in their own
 * document. The screens do not care which — they read one of these.
 */

import {
  type Attempt,
  type Exam,
  type LevelTrainerSettings,
  type Settings,
  type TelcAttempt,
  type TelcExam,
  type TelcLevel
} from '@shared/types';

import { type ExamFormat } from './examFormat.ts';

export interface ExamStore<TSettings, TAttempt> {
  readonly settings: TSettings;
  readonly attempts: readonly TAttempt[];
  /** Appends a finished attempt and persists the whole database. */
  readonly saveAttempt: (attempt: TAttempt) => void;
}

export type A2b1Format = ExamFormat<Exam, Settings, Attempt>;
export type TelcFormat = ExamFormat<TelcExam, LevelTrainerSettings, TelcAttempt>;

/**
 * A trainer resolved to its paper and its stored data. Discriminated so a screen narrows
 * once and then renders the same generic view either way.
 */
export type ExamBinding =
  | {
      readonly kind: 'a2b1';
      readonly format: A2b1Format;
      readonly store: ExamStore<Settings, Attempt>;
    }
  | {
      readonly kind: 'telc';
      readonly level: TelcLevel;
      readonly format: TelcFormat;
      readonly store: ExamStore<LevelTrainerSettings, TelcAttempt>;
    };
