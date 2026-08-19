import { readLocalJson, removeLocal, writeLocal } from '@/shared/lib/storage.ts';
import {
  type AnswerMap,
  type AttemptMode,
  type ExamModule,
  type ModuleTimes,
  type PlayBudget
} from '@/shared/types';

/** Which screen of the run is showing. */
export type RunPhase = 'brief' | 'module' | 'rating';

/**
 * The attempt in progress, mirrored to localStorage so a refresh — or an accidentally
 * closed tab — resumes on the same module with the same answers and the same time left.
 * Microphone recordings are deliberately session-only and never stored.
 */
export interface ExamRun {
  readonly runId: number;
  readonly examId: number;
  readonly mode: AttemptMode;
  /** Modules still to work through, in order. */
  readonly queue: readonly ExamModule[];
  readonly index: number;
  readonly phase: RunPhase;
  readonly answers: AnswerMap;
  readonly times: ModuleTimes;
  readonly plays: PlayBudget;
  readonly ratings: Partial<Record<'schreiben' | 'sprechen', number>>;
  /**
   * Absolute epoch milliseconds. Stored as a deadline rather than a countdown so the
   * clock keeps running correctly across a reload.
   */
  readonly deadline: number | null;
  readonly moduleStart: number | null;
}

const RUN_STORAGE_KEY = 'telcTrainerRunV1';

function isExamRun(value: unknown): value is ExamRun {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<ExamRun>;
  return typeof candidate.examId === 'number' && Array.isArray(candidate.queue);
}

export function loadRun(): ExamRun | null {
  const raw = readLocalJson(RUN_STORAGE_KEY);
  return isExamRun(raw) ? raw : null;
}

export function saveRun(run: ExamRun): void {
  writeLocal(RUN_STORAGE_KEY, JSON.stringify(run));
}

export function clearRun(): void {
  removeLocal(RUN_STORAGE_KEY);
}

export function createRun(examId: number, mode: AttemptMode, queue: readonly ExamModule[]): ExamRun {
  return {
    runId: Date.now(),
    examId,
    mode,
    queue,
    index: 0,
    phase: 'brief',
    answers: {},
    times: {},
    plays: {},
    ratings: {},
    deadline: null,
    moduleStart: null
  };
}

/** Whole seconds left on the current module, never negative. */
export function secondsLeft(run: ExamRun | null): number {
  if (!run?.deadline) return 0;
  return Math.max(0, Math.round((run.deadline - Date.now()) / 1000));
}

/** The module currently being worked on, if any. */
export function currentModule(run: ExamRun): ExamModule | undefined {
  return run.queue[run.index];
}
