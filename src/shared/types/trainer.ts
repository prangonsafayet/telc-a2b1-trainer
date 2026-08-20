/** What a trainer is: the content it studies from and the document it persists. */

import { type ExamModule, type ExamPaper } from './exam.ts';
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

/** Word-count window for a writing task. */
export interface WritingTarget {
  readonly min: number;
  readonly max: number;
}

/**
 * A sentence with one phrase emphasised. Authored copy that needs a bold phrase but is
 * rendered as text, not injected — only the guide, the curriculum intro and the cheatsheets
 * are HTML.
 */
export interface EmphasisedNote {
  readonly lead: string;
  readonly emphasis: string;
  readonly tail: string;
}

/**
 * How one trainer's own sitting runs: its timings, its briefing copy, and the copy its
 * module renderers need.
 *
 * These are per-*trainer* facts, not per-paper ones — two trainers can set the same paper
 * and still differ here, the way the single-level Hören runs half an hour at B1 and twenty
 * minutes at B2 — so they live with the trainer that decides them. A record keyed by trainer
 * id anywhere else would be the same special-casing in a different file.
 */
export interface TrainerPaper {
  /** Minutes per module. Schreiben is the official time; the user's setting overrides it. */
  readonly minutes: Readonly<Record<ExamModule, number>>;
  /** Shown on the briefing screen before each module starts. */
  readonly briefing: Readonly<Record<ExamModule, string>>;
  /** Speech-rate multiplier for its listening audio, before the user's speed setting. */
  readonly listeningRate: number;
  /** Word-count window its writing task is judged against. */
  readonly writingTarget: WritingTarget;
  readonly writingTitle: string;
  /** The register its letter or email opens in, as a textarea placeholder. */
  readonly writingPlaceholder: string;
  /** Point weight and rough length of each oral Teil, in order. */
  readonly sprechenChips: readonly string[];
  /** What its oral briefing says about preparation time in the real exam. */
  readonly prepNote: EmphasisedNote;
}

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
 *
 * Its sitting (`TrainerPaper`) is deliberately NOT part of this shape, even though it is
 * authored right next to the rest in the same folder: `TrainerInfo.paper` in
 * `@shared/config/trainers.ts` needs it eagerly, and this `TrainerContent` is what loads on
 * demand. A trainer's `paper.ts` importing into both would make the bundler's per-trainer
 * chunk share code with the eager registry chunk — and a module shared between an eager
 * chunk and an async one gets folded into the async one, which is exactly the kind of import
 * that quietly drags a trainer's whole content back into the initial bundle.
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
 * How a trainer's descriptor hands over its content: on demand, not up front. Keying the
 * bundler's chunks per trainer only works once the registry stops holding every trainer's
 * content in one eager import graph — see `TRAINERS[trainer].loadContent` in
 * `@shared/config/trainers.ts` and `useTrainerContent` in `@shared/hooks`.
 */
export type TrainerContentLoader = () => Promise<TrainerContent>;

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
