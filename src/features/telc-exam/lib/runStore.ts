/**
 * The B1/B2 attempt in progress, held in a zustand store (with immer for the patches) and
 * persisted through the same degradable storage layer as the rest of the app — so a
 * reload, or an accidentally closed tab, resumes on the same module with the same answers
 * and the same time left. Microphone recordings are deliberately session-only.
 */

import { castDraft } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { readLocal, removeLocal, writeLocal } from '@shared/lib/storage.ts';
import {
  type AnswerMap,
  type AttemptMode,
  type ExamModule,
  type ModuleTimes,
  type PlayBudget,
  type TelcLevel
} from '@shared/types';

/** Which screen of the run is showing. */
export type TelcRunPhase = 'brief' | 'module' | 'rating';

export interface TelcRun {
  readonly runId: number;
  readonly level: TelcLevel;
  readonly examId: number;
  readonly mode: AttemptMode;
  /** Modules still to work through, in order. */
  readonly queue: readonly ExamModule[];
  readonly index: number;
  readonly phase: TelcRunPhase;
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

/** Stable since the feature shipped — do not rename without a migration. */
const TELC_RUN_STORAGE_KEY = 'telcTrainerLevelRunV1';

export interface TelcRunStore {
  readonly run: TelcRun | null;
  readonly startRun: (run: TelcRun) => void;
  readonly clearRun: () => void;
  /** Applies a change to the active run. No-op when no run is active. */
  readonly patchRun: (recipe: (run: TelcRun) => TelcRun) => void;
}

export const useTelcRunStore = create<TelcRunStore>()(
  persist(
    immer(set => ({
      run: null,
      startRun: run => {
        set(state => {
          state.run = castDraft(run);
        });
      },
      clearRun: () => {
        set(state => {
          state.run = null;
        });
      },
      patchRun: recipe => {
        set(state => {
          if (state.run) state.run = castDraft(recipe(state.run as TelcRun));
        });
      }
    })),
    {
      name: TELC_RUN_STORAGE_KEY,
      storage: createJSONStorage(() => ({
        getItem: readLocal,
        setItem: writeLocal,
        removeItem: removeLocal
      })),
      partialize: state => ({ run: state.run })
    }
  )
);

export const createTelcRun = (
  level: TelcLevel,
  examId: number,
  mode: AttemptMode,
  queue: readonly ExamModule[]
): TelcRun => ({
  runId: Date.now(),
  level,
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

/** Whole seconds left on the current module, never negative. */
export const telcSecondsLeft = (run: TelcRun | null): number => {
  if (!run?.deadline) return 0;
  return Math.max(0, Math.round((run.deadline - Date.now()) / 1000));
};

/** The module currently being worked on, if any. */
export const currentTelcModule = (run: TelcRun): ExamModule | undefined => run.queue[run.index];
