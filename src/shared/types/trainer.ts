/** What a trainer is: the content it studies from and the document it persists. */

import { type ExamPaper } from './exam.ts';
import { type LearnPlan } from './learn.ts';
import { type LearnDoneMap } from './progress.ts';
import {
  type SingleLevelAttempt,
  type SingleLevelExam,
  type SingleLevelTrainerId
} from './singleLevelExam.ts';
import { type SrsMap, type VocabBank } from './vocab.ts';

/** One of the trainers the app hosts. Every entry has a descriptor in `TRAINERS`. */
export type TrainerId = 'a2b1' | 'b1' | 'b2';

/**
 * Which paper a trainer sets. Two exist — the dual-level A2·B1 paper and the single-level
 * paper the B1 and B2 trainers share — and a trainer names one rather than owning a copy.
 */
export type ExamFormatId = 'dual-level' | 'single-level';

/** The exam conditions every trainer stores, whichever slice of the document it lives in. */
export interface TrainerExamSettings {
  /** `YYYY-MM-DD`, interpreted in local time. */
  readonly examDate: string;
  readonly writingMinutes: number;
  readonly playsAllowed: number;
}

/** Per-trainer settings for the trainers that keep their own document. */
export type LevelTrainerSettings = TrainerExamSettings;

/**
 * Everything one trainer studies from, authored in `src/content/trainers/<id>/`. Every
 * trainer exposes the same shape; the type parameter narrows the papers for the format
 * layer, which is the only place that knows how to mark them.
 */
export interface TrainerContent<TExam extends ExamPaper = ExamPaper> {
  readonly trainer: TrainerId;
  /** The vocabulary and grammar bank the practice hub drills. May be empty. */
  readonly vocab: VocabBank;
  /** The 28-day curriculum the adaptive plan schedules. */
  readonly curriculum: LearnPlan;
  /** Its Modelltests, easiest first. */
  readonly exams: readonly TExam[];
  /** Authored HTML exam guide, or null while the trainer has none. */
  readonly guide: string | null;
}

/** The single-level content, narrowed to the paper its two trainers set. */
export type SingleLevelContent = TrainerContent<SingleLevelExam>;

/**
 * Everything a trainer with its own document persists. Lives inside `ProgressDatabase`, so
 * cloud sync and the JSON backup carry it without any extra plumbing.
 */
export interface LevelTrainerDoc {
  readonly attempts: readonly SingleLevelAttempt[];
  /** Curriculum checkbox state, keyed `d<day>t<index>` like every other trainer's. */
  readonly learnDone: LearnDoneMap;
  /** Spaced-repetition state, keyed by vocab/grammar item id. */
  readonly srs: SrsMap;
  /** Practice touches per local ISO date — drives the streak display. */
  readonly activity: Partial<Record<string, number>>;
  readonly settings: LevelTrainerSettings;
}

/** The trainers that keep their own document, as their document key. */
export type TrainerDocKey = SingleLevelTrainerId;
