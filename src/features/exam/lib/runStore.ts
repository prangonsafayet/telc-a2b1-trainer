/**
 * The one place a run in progress is read from and written to. Both papers use it; they
 * differ only in the storage key their descriptor names, so a half-finished A2·B1 attempt
 * and a half-finished B1 attempt never see each other.
 */

import { MODULE_META } from '@shared/config/exam.ts';
import { ROOT_TRAINER, TRAINER_ORDER } from '@shared/config/trainers.ts';
import { readLocalJson, removeLocal, writeLocal } from '@shared/lib/storage.ts';
import { type AttemptMode, type ExamModule, type TrainerId } from '@shared/types';

import { MS_PER_SECOND } from '@features/exam/config/run.ts';
import { type ExamRun, type ExamRunStore } from '@features/exam/types/run.ts';

/**
 * Runs written before the `trainer` field existed belong to the trainer that owns the root,
 * the only one that had them, so an in-flight attempt survives the upgrade. A B1/B2 run
 * written by the old zustand store named the same thing `level`.
 */
const readTrainer = (value: unknown): TrainerId => TRAINER_ORDER.find(id => id === value) ?? ROOT_TRAINER;

/**
 * The B1/B2 run used to be persisted by zustand's `persist` middleware, which wraps the
 * payload as `{ state: { run }, version }`. The key is unchanged, so an attempt that was
 * in progress when the app upgraded is still sitting there in the old envelope — unwrap it
 * rather than throwing the candidate's half-finished exam away.
 */
const unwrapLegacyEnvelope = (value: object): unknown => {
  if (!('state' in value)) return value;
  const state: unknown = value.state;
  if (typeof state !== 'object' || state === null || !('run' in state)) return null;
  return state.run;
};

/** What a stored run might actually hold: the fields below are validated, not trusted. */
type StoredRun = Omit<Partial<ExamRun>, 'queue'> & {
  readonly queue?: unknown;
  readonly level?: unknown;
};

/* `MODULE_META` is a `Record` over the whole `ExamModule` union, so its keys are the
   complete set by construction — a new module cannot be forgotten here. */
const isExamModule = (value: unknown): value is ExamModule =>
  typeof value === 'string' && Object.hasOwn(MODULE_META, value);

/** The module queue of a stored run, or null if any entry does not name a real module. */
const readQueue = (value: unknown): readonly ExamModule[] | null => {
  if (!Array.isArray(value) || value.length === 0) return null;
  const modules: ExamModule[] = [];
  for (const entry of value as readonly unknown[]) {
    if (!isExamModule(entry)) return null;
    modules.push(entry);
  }
  return modules;
};

/**
 * Exported for its unit tests: everything it has to survive — two storage envelopes, a
 * missing `trainer`, and whatever a hand-edited or truncated localStorage entry holds — is
 * data it cannot control, and getting it wrong silently discards an attempt in progress.
 */
export const parseRun = (value: unknown): ExamRun | null => {
  if (typeof value !== 'object' || value === null) return null;
  const stored = unwrapLegacyEnvelope(value);
  if (typeof stored !== 'object' || stored === null || Array.isArray(stored)) return null;
  const candidate = stored as StoredRun;
  if (typeof candidate.examId !== 'number') return null;

  /* Every entry has to name a real module. `queue[index]` decides which renderer the runner
     mounts, so a hand-edited entry naming something else would render `undefined` as a
     component — a blank screen, not a rejected run. */
  const queue = readQueue(candidate.queue);
  if (queue === null) return null;

  /* `level` is read for the trainer and then dropped: it is the old field name and has no
     place on an `ExamRun`, which never declared it. */
  const { level: _legacyLevel, ...rest } = candidate;
  return {
    ...(rest as ExamRun),
    queue,
    trainer: readTrainer(candidate.trainer ?? candidate.level)
  };
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
  return Math.max(0, Math.round((run.deadline - Date.now()) / MS_PER_SECOND));
};

/** The module currently being worked on, if any. */
export const currentModule = (run: ExamRun): ExamModule | undefined => run.queue[run.index];
