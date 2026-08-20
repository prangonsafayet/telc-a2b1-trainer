/**
 * The one place a run in progress is read from and written to. Both papers use it; they
 * differ only in the storage key their descriptor names, so a half-finished A2·B1 attempt
 * and a half-finished B1 attempt never see each other.
 */

import { readLocalJson, removeLocal, writeLocal } from '@shared/lib/storage.ts';
import { type AttemptMode, type ExamModule, type TrainerId } from '@shared/types';

import { type ExamRun, type ExamRunStore } from '@features/exam/types/run.ts';

/**
 * Runs written before the `trainer` field existed belong to the A2·B1 trainer, the only
 * one that had them, so an in-flight attempt survives the upgrade.
 */
const readTrainer = (value: unknown): TrainerId => (value === 'b1' || value === 'b2' ? value : 'a2b1');

const parseRun = (value: unknown): ExamRun | null => {
  if (typeof value !== 'object' || value === null) return null;
  const candidate = value as Partial<ExamRun>;
  if (typeof candidate.examId !== 'number' || !Array.isArray(candidate.queue)) return null;
  return { ...(candidate as ExamRun), trainer: readTrainer(candidate.trainer) };
};

export const createRunStore = (storageKey: string): ExamRunStore => ({
  load: () => parseRun(readLocalJson(storageKey)),
  save: run => {
    writeLocal(storageKey, JSON.stringify(run));
  },
  clear: () => {
    removeLocal(storageKey);
  }
});

interface NewRun {
  readonly trainer: TrainerId;
  readonly examId: number;
  readonly mode: AttemptMode;
  readonly queue: readonly ExamModule[];
}

export const createRun = ({ trainer, examId, mode, queue }: NewRun): ExamRun => ({
  runId: Date.now(),
  trainer,
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
});

/** The queue for one attempt: every module of a full sitting, or the single one practised. */
export const queueForMode = (modules: readonly ExamModule[], mode: AttemptMode): readonly ExamModule[] =>
  mode === 'full' ? modules : [mode];

/** Whole seconds left on the current module, never negative. */
export const secondsLeft = (run: ExamRun | null): number => {
  if (!run?.deadline) return 0;
  return Math.max(0, Math.round((run.deadline - Date.now()) / 1000));
};

/** The module currently being worked on, if any. */
export const currentModule = (run: ExamRun): ExamModule | undefined => run.queue[run.index];
