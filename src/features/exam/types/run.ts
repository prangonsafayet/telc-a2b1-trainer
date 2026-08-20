/**
 * The attempt in progress, mirrored to localStorage so a refresh — or an accidentally
 * closed tab — resumes on the same module with the same answers and the same time left.
 * Microphone recordings are deliberately session-only and never stored.
 *
 * One shape serves both papers: what a run *is* does not depend on which Modelltest is
 * being sat, only on which trainer it belongs to.
 */

import {
  type AnswerMap,
  type AttemptMode,
  type ExamModule,
  type ModuleTimes,
  type PlayBudget,
  type TrainerId
} from '@shared/types';

/** Which screen of the run is showing. */
export type RunPhase = 'brief' | 'module' | 'rating';

/** The two modules the candidate marks themselves. */
export type RatedModule = 'schreiben' | 'sprechen';

export type RatingMap = Partial<Record<RatedModule, number>>;

export interface ExamRun {
  readonly runId: number;
  /**
   * Which trainer's paper this run belongs to. The B1 and B2 trainers share one storage
   * key, so without it a half-finished B1 run would be offered as a B2 one. Runs written
   * before this field existed are read as `a2b1`, which is the only trainer that had them.
   */
  readonly trainer: TrainerId;
  readonly examId: number;
  readonly mode: AttemptMode;
  /** Modules still to work through, in order. */
  readonly queue: readonly ExamModule[];
  readonly index: number;
  readonly phase: RunPhase;
  readonly answers: AnswerMap;
  readonly times: ModuleTimes;
  readonly plays: PlayBudget;
  readonly ratings: RatingMap;
  /**
   * Absolute epoch milliseconds. Stored as a deadline rather than a countdown so the
   * clock keeps running correctly across a reload.
   */
  readonly deadline: number | null;
  readonly moduleStart: number | null;
}

/** Reading and writing the run in progress. One implementation, one key per format. */
export interface ExamRunStore {
  readonly load: () => ExamRun | null;
  readonly save: (run: ExamRun) => void;
  readonly clear: () => void;
}
