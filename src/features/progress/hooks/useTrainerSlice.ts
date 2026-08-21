import { useCallback, useMemo } from 'react';

import { TRAINERS } from '@shared/config/trainers.ts';
import { toIsoDate } from '@shared/lib/format.ts';
import {
  type ActivityMap,
  type DualLevelAttempt,
  type LearnDoneMap,
  type LevelTrainerSettings,
  type Settings,
  type SingleLevelAttempt,
  type SrsMap,
  type TrainerExamSettings,
  type TrainerId
} from '@shared/types';

import { bumpActivity, emptyTrainerDoc } from '../lib/progressDb.ts';

import { useProgress } from './useProgress.ts';

/** The study state of one trainer, whichever slice of the document holds it. */
export interface TrainerSliceState {
  readonly learnDone: LearnDoneMap;
  readonly srs: SrsMap;
  readonly activity: ActivityMap;
}

/** A change to one trainer's study state, expressed as a pure function. */
export type TrainerSliceRecipe = (current: TrainerSliceState) => TrainerSliceState;

interface TrainerSliceBase extends TrainerSliceState {
  readonly trainer: TrainerId;
  /** Exam ids with at least one attempt — what the schedule stops planning. */
  readonly attemptedExamIds: ReadonlySet<number>;
  /** Applies a change to this trainer's study state and persists the whole database. */
  readonly update: (recipe: TrainerSliceRecipe) => void;
  readonly setSetting: <K extends keyof TrainerExamSettings>(key: K, value: TrainerExamSettings[K]) => void;
}

/**
 * One trainer's persisted slice, discriminated by the paper its attempts were marked
 * against — which is the only thing about a slice that is not the same shape for every
 * trainer. `format` is copied straight off the trainer's registry descriptor, so the run
 * store, the results screen and every model below mark against the same paper.
 */
export type TrainerSlice =
  | (TrainerSliceBase & {
      readonly format: 'dual-level';
      readonly settings: Settings;
      readonly attempts: readonly DualLevelAttempt[];
      readonly saveAttempt: (attempt: DualLevelAttempt) => void;
    })
  | (TrainerSliceBase & {
      readonly format: 'single-level';
      readonly settings: LevelTrainerSettings;
      readonly attempts: readonly SingleLevelAttempt[];
      readonly saveAttempt: (attempt: SingleLevelAttempt) => void;
    });

/** Counts one practice touch for the streak, on the given local ISO date. */
export const touchActivity = (state: TrainerSliceState, today: string, touches = 1): TrainerSliceState => ({
  ...state,
  activity: bumpActivity(state.activity, today, touches)
});

/**
 * The persisted slice of one trainer, plus its write handles.
 *
 * The trainer that owns the root of the URL space also owns the root of the progress
 * document: its attempts, learn plan, SRS state and settings sit at the top level, where
 * they have been since v1. Every other trainer keeps the same fields in its own document
 * under its id. Both facts — which paper marks its attempts, and where its slice lives —
 * are read off the same registry descriptor, so no caller tests a trainer id and the two
 * cannot drift apart: `TrainerInfo` pairs `format` with `docKey`, which is what makes the
 * `format` assignments below typecheck against the branch they sit in.
 */
export const useTrainerSlice = (trainer: TrainerId): TrainerSlice => {
  const { db, update } = useProgress();
  const info = TRAINERS[trainer];
  const { docKey } = info;

  /* Always a document, so the hook order never depends on which trainer is active; the
     root trainer's branch below simply does not read it. */
  const doc = useMemo(
    () => (docKey === null ? emptyTrainerDoc() : (db[docKey] ?? emptyTrainerDoc())),
    [db, docKey]
  );

  const stored: readonly { readonly examId: number }[] = docKey === null ? db.attempts : doc.attempts;
  const attemptedExamIds = useMemo(() => new Set(stored.map(attempt => attempt.examId)), [stored]);

  const updateSlice = useCallback(
    (recipe: TrainerSliceRecipe) => {
      update(current => {
        if (docKey === null) {
          const next = recipe({ learnDone: current.learnDone, srs: current.srs, activity: current.activity });
          return { ...current, ...next };
        }
        const slice = current[docKey] ?? emptyTrainerDoc();
        const next = recipe({ learnDone: slice.learnDone, srs: slice.srs, activity: slice.activity });
        return { ...current, [docKey]: { ...slice, ...next } };
      });
    },
    [update, docKey]
  );

  const setSetting = useCallback(
    <K extends keyof TrainerExamSettings>(key: K, value: TrainerExamSettings[K]) => {
      update(current => {
        if (docKey === null) return { ...current, settings: { ...current.settings, [key]: value } };
        const slice = current[docKey] ?? emptyTrainerDoc();
        return { ...current, [docKey]: { ...slice, settings: { ...slice.settings, [key]: value } } };
      });
    },
    [update, docKey]
  );

  /* Both writers count the sitting towards the streak: taking a Modelltest is study. */
  const saveRootAttempt = useCallback(
    (attempt: DualLevelAttempt) => {
      update(current => ({
        ...current,
        attempts: [...current.attempts, attempt],
        activity: bumpActivity(current.activity, toIsoDate(new Date()))
      }));
    },
    [update]
  );

  const saveDocAttempt = useCallback(
    (attempt: SingleLevelAttempt) => {
      update(current => {
        if (docKey === null) return current;
        const slice = current[docKey] ?? emptyTrainerDoc();
        return {
          ...current,
          [docKey]: {
            ...slice,
            attempts: [...slice.attempts, attempt],
            activity: bumpActivity(slice.activity, toIsoDate(new Date()))
          }
        };
      });
    },
    [update, docKey]
  );

  return useMemo<TrainerSlice>(() => {
    const base = {
      trainer,
      attemptedExamIds,
      update: updateSlice,
      setSetting
    };

    /* The root slice was written by the dual-level trainer and holds its attempts; a
       trainer with its own document holds single-level ones. The registry pairs the paper
       with the document location, so `info.format` is what says which of the two this is —
       narrowing `info` here is only how the compiler is shown that the attempts it is about
       to read match that paper. */
    if (info.docKey === null) {
      return {
        ...base,
        format: info.format,
        learnDone: db.learnDone,
        srs: db.srs,
        activity: db.activity,
        settings: db.settings,
        attempts: db.attempts,
        saveAttempt: saveRootAttempt
      };
    }

    return {
      ...base,
      format: info.format,
      learnDone: doc.learnDone,
      srs: doc.srs,
      activity: doc.activity,
      settings: doc.settings,
      attempts: doc.attempts,
      saveAttempt: saveDocAttempt
    };
  }, [trainer, info, attemptedExamIds, updateSlice, setSetting, doc, db, saveRootAttempt, saveDocAttempt]);
};
