/** The three trainers the app hosts, and the per-level trainer document. */

import { type LearnPlan } from './learn.ts';
import { type LearnDoneMap } from './progress.ts';
import { type TelcAttempt, type TelcExam, type TelcExamLevel } from './telcExam.ts';
import { type SrsMap, type VocabBank } from './vocab.ts';

/** One of the three trainers. `a2b1` is the original exam trainer. */
export type TrainerId = 'a2b1' | 'b1' | 'b2';

/** The two new single-level trainers. */
export type TelcLevel = TelcExamLevel;

/** Per-trainer settings for the B1/B2 trainers, mirroring the global ones. */
export interface LevelTrainerSettings {
  /** `YYYY-MM-DD`, interpreted in local time. */
  readonly examDate: string;
  readonly writingMinutes: number;
  readonly playsAllowed: number;
}

/**
 * Everything one level trainer persists. Lives inside `ProgressDatabase`, so cloud sync
 * and the JSON backup carry it without any extra plumbing.
 */
/** Everything one level trainer studies from, authored in `src/content/trainers`. */
export interface LevelContent {
  readonly level: TelcLevel;
  readonly vocab: VocabBank;
  /** The 28-day curriculum the adaptive plan schedules. */
  readonly curriculum: LearnPlan;
  readonly exams: readonly TelcExam[];
}

export interface LevelTrainerDoc {
  readonly attempts: readonly TelcAttempt[];
  /** Curriculum checkbox state, keyed `d<day>t<index>` like the A2·B1 plan. */
  readonly learnDone: LearnDoneMap;
  /** Spaced-repetition state, keyed by vocab/grammar item id. */
  readonly srs: SrsMap;
  /** Practice touches per local ISO date — drives the streak display. */
  readonly activity: Partial<Record<string, number>>;
  readonly settings: LevelTrainerSettings;
}
