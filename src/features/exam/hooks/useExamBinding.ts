import { useCallback, useMemo } from 'react';

import { isSingleLevelTrainer } from '@shared/config/trainers.ts';
import { toIsoDate } from '@shared/lib/format.ts';
import {
  type DualLevelAttempt,
  type SingleLevelAttempt,
  type SingleLevelTrainerId,
  type TrainerId
} from '@shared/types';

import { A2B1_FORMAT } from '@features/exam/lib/formats/dual-level/index.ts';
import { SINGLE_LEVEL_FORMAT } from '@features/exam/lib/formats/single-level/index.ts';
import { type ExamBinding } from '@features/exam/types/examBinding.ts';
import { touchActivity, useProgress, useTrainerDoc } from '@features/progress';

/**
 * Resolves a trainer to the paper it sets and the document it stores attempts in, so the
 * three exam screens narrow once and then render the same generic views either way.
 */
export const useExamBinding = (trainer: TrainerId): ExamBinding => {
  const { db, update } = useProgress();
  /* The A2·B1 trainer has no level document. Reading B1's is a pure derivation of the
     same context, and keeps the hook order fixed whichever trainer is active. */
  const level: SingleLevelTrainerId = isSingleLevelTrainer(trainer) ? trainer : 'b1';
  const { doc, updateDoc } = useTrainerDoc(level);

  const saveExamAttempt = useCallback(
    (attempt: DualLevelAttempt) => {
      update(current => ({ ...current, attempts: [...current.attempts, attempt] }));
    },
    [update]
  );

  const saveLevelAttempt = useCallback(
    (attempt: SingleLevelAttempt) => {
      updateDoc(current =>
        touchActivity({ ...current, attempts: [...current.attempts, attempt] }, toIsoDate(new Date()))
      );
    },
    [updateDoc]
  );

  return useMemo(() => {
    if (isSingleLevelTrainer(trainer)) {
      return {
        kind: 'single-level',
        level: trainer,
        format: SINGLE_LEVEL_FORMAT,
        store: { settings: doc.settings, attempts: doc.attempts, saveAttempt: saveLevelAttempt }
      };
    }
    return {
      kind: 'dual-level',
      format: A2B1_FORMAT,
      store: { settings: db.settings, attempts: db.attempts, saveAttempt: saveExamAttempt }
    };
  }, [trainer, doc, db, saveLevelAttempt, saveExamAttempt]);
};
