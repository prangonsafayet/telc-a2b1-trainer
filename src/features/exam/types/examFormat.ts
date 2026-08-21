/**
 * What it means to sit an exam, in the abstract.
 *
 * The app hosts two papers: the telc Deutsch A2·B1 Modelltest and the telc Deutsch B1/B2
 * Modelltest. They differ in their Teile, their item shapes, their timing and their
 * marking — but not in what running one means: a queue of modules against a clock, answers
 * keyed by item, a self-rating for the two productive modules, and a stored attempt at the
 * end. Everything paper-specific is reached through this descriptor, which is why the
 * runner, the results screen and the review screen exist exactly once.
 */

import { type ComponentType } from 'react';

import {
  type AnswerMap,
  type AttemptMode,
  type AudioScript,
  type ExamModule,
  type ExamModuleProps,
  type ExamPaper,
  type ModuleTimes
} from '@shared/types';

import { type ExamRunStore, type RatedModule, type RatingMap } from './run.ts';

/** What every trainer's settings offer a run. */
export interface RunSettings {
  readonly writingMinutes: number;
  readonly playsAllowed: number;
}

/** What every stored attempt has, whatever it scores. */
export interface StoredAttempt {
  readonly id: number;
  readonly examId: number;
  readonly mode: AttemptMode;
  /** ISO timestamp. */
  readonly date: string;
  readonly answers: AnswerMap;
  /** The candidate's own marks for the two productive modules. */
  readonly ratings: RatingMap;
}

/** Self-assessment scale of one productive module. */
export interface RatingSpec {
  /** Criterion label and the plain-English test for it. Each scores 0–5. */
  readonly criteria: readonly (readonly [string, string])[];
  /** Points per criterion point. */
  readonly scale: number;
  /** The score a perfect self-rating produces. */
  readonly max: number;
}

/** One reviewed item: what was asked, what was answered, and what was right. */
export interface ReviewRow {
  readonly id: string;
  /** Where the item sat in the paper, e.g. `Teil 2 · 3`. */
  readonly label: string;
  readonly prompt: string;
  readonly given: string | null;
  readonly expected: string;
  readonly correct: boolean;
  /** Present for listening items, revealed only in the review. */
  readonly audio?: AudioScript;
}

export interface ReviewSection {
  readonly module: ExamModule;
  readonly heading: string;
  readonly rows: readonly ReviewRow[];
  /** Transcripts that belong to the whole section rather than to one item. */
  readonly transcripts?: readonly AudioScript[];
}

/** The candidate's text next to the sample answer, for the rating and review screens. */
export interface WritingSample {
  readonly musterloesung: string;
  readonly tipps: string;
  readonly points: readonly string[];
}

export interface ScoreBar {
  readonly label: string;
  readonly value: number;
  readonly of: number;
}

export interface ModuleTimeEntry {
  readonly module: ExamModule;
  readonly seconds: number;
}

/** The verdict of a full sitting. Null for a single-module practice run. */
export interface AttemptGrade {
  readonly label: string;
  readonly tone: 'success' | 'warning' | 'destructive';
  readonly total: number;
  readonly of: number;
  /** The pass rule, and any part scores it is judged on. */
  readonly notes: readonly string[];
}

/** Everything the results screen renders, already resolved. */
export interface AttemptSummary {
  readonly totalSeconds: number;
  readonly accentColor: string;
  readonly bars: readonly ScoreBar[];
  /** Where this paper's pass line sits on every bar, as a percentage of the bar's `of`. */
  readonly thresholdPercent: number;
  readonly thresholdLabel: string;
  readonly moduleTimes: readonly ModuleTimeEntry[];
  readonly grade: AttemptGrade | null;
  /** For a single-module practice run: the one number worth showing large. */
  readonly headlineScore: string;
  readonly headlineSuffix: string;
}

/** A run that has reached its end, ready to be marked. */
export interface FinishedRun<TExam> {
  readonly exam: TExam;
  readonly mode: AttemptMode;
  readonly queue: readonly ExamModule[];
  readonly answers: AnswerMap;
  readonly ratings: RatingMap;
  readonly times: ModuleTimes;
}

export interface CompletionToast {
  readonly tone: 'success' | 'info';
  readonly title: string;
  readonly description: string;
}

/** Everything that differs because a paper is marked differently. */
export interface ExamScoring<TExam extends ExamPaper, TAttempt extends StoredAttempt> {
  /** How many items of a module are still blank — drives the submit warning. */
  readonly countUnanswered: (exam: TExam, module: ExamModule, answers: AnswerMap) => number;
  readonly buildAttempt: (run: FinishedRun<TExam>) => TAttempt;
  readonly summarize: (attempt: TAttempt) => AttemptSummary;
  readonly completionToast: (exam: TExam, attempt: TAttempt) => CompletionToast;
  readonly review: (exam: TExam, attempt: TAttempt) => readonly ReviewSection[];
  /**
   * The sample answer to compare the written text with. Read from the answers rather than
   * the attempt because the rating screen needs it before an attempt exists.
   */
  readonly writingSample: (exam: TExam, answers: AnswerMap) => WritingSample | null;
}

/**
 * The part of a format that does not depend on the shape of its paper: enough to start,
 * resume or discard a run without knowing which Modelltest it is.
 */
export interface ExamRunFormat {
  /** Module order of a full sitting. */
  readonly modules: readonly ExamModule[];
  /** Short module name, e.g. `Hören` — enough to describe a run without loading the paper. */
  readonly moduleShort: (module: ExamModule) => string;
  readonly runStore: ExamRunStore;
}

export interface ExamFormat<
  TExam extends ExamPaper,
  TSettings extends RunSettings,
  TAttempt extends StoredAttempt
> extends ExamRunFormat {
  /** Identifies the paper on every screen, e.g. `Modelltest 3 · A2 · leicht`. */
  readonly examLabel: (exam: TExam) => string;
  readonly moduleName: (module: ExamModule) => string;
  readonly minutes: (module: ExamModule, exam: TExam, settings: TSettings) => number;
  readonly briefing: (module: ExamModule, exam: TExam) => string;
  readonly rating: Readonly<Record<RatedModule, RatingSpec>>;
  /** What to listen for when rating one's own recordings. */
  readonly speakingHint: string;
  /** Why the review screen cannot show the oral module item by item. */
  readonly speakingReviewNote: string;
  readonly moduleComponents: Readonly<Record<ExamModule, ComponentType<ExamModuleProps<TExam, TSettings>>>>;
  readonly scoring: ExamScoring<TExam, TAttempt>;
}
