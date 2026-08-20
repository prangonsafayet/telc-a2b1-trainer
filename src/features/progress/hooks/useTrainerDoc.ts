import { useCallback, useMemo } from 'react';

import { type LevelTrainerDoc, type SingleLevelTrainerId } from '@shared/types';

import { emptyTrainerDoc } from '../lib/progressDb.ts';

import { useProgress } from './useProgress.ts';

/** A change to one trainer document, expressed as a pure function. */
export type TrainerRecipe = (current: LevelTrainerDoc) => LevelTrainerDoc;

export interface TrainerDocHandle {
  readonly doc: LevelTrainerDoc;
  /** Applies a change to this trainer's document and persists the whole database. */
  readonly updateDoc: (recipe: TrainerRecipe) => void;
}

/** The persisted document of one B1/B2 trainer, plus its write handle. */
export const useTrainerDoc = (level: SingleLevelTrainerId): TrainerDocHandle => {
  const { db, update } = useProgress();
  const stored = db[level];
  const doc = useMemo(() => stored ?? emptyTrainerDoc(), [stored]);

  const updateDoc = useCallback(
    (recipe: TrainerRecipe) => {
      update(current => ({
        ...current,
        [level]: recipe(current[level] ?? emptyTrainerDoc())
      }));
    },
    [update, level]
  );

  return useMemo(() => ({ doc, updateDoc }), [doc, updateDoc]);
};

/** Counts one practice touch for the streak, on the given local ISO date. */
export const touchActivity = (doc: LevelTrainerDoc, today: string, touches = 1): LevelTrainerDoc => ({
  ...doc,
  activity: { ...doc.activity, [today]: (doc.activity[today] ?? 0) + touches }
});
