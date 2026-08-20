import { useCallback, useMemo } from 'react';

import { isTelcLevel } from '@shared/config/trainers.ts';
import { toIsoDate } from '@shared/lib/format.ts';
import { type Attempt, type TelcAttempt, type TelcLevel, type TrainerId } from '@shared/types';

import { A2B1_FORMAT } from '@features/exam/lib/formats/a2b1/index.ts';
import { TELC_FORMAT } from '@features/exam/lib/formats/telc/index.ts';
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
  const level: TelcLevel = isTelcLevel(trainer) ? trainer : 'b1';
  const { doc, updateDoc } = useTrainerDoc(level);

  const saveExamAttempt = useCallback(
    (attempt: Attempt) => {
      update(current => ({ ...current, attempts: [...current.attempts, attempt] }));
    },
    [update]
  );

  const saveLevelAttempt = useCallback(
    (attempt: TelcAttempt) => {
      updateDoc(current =>
        touchActivity({ ...current, attempts: [...current.attempts, attempt] }, toIsoDate(new Date()))
      );
    },
    [updateDoc]
  );

  return useMemo(() => {
    if (isTelcLevel(trainer)) {
      return {
        kind: 'telc',
        level: trainer,
        format: TELC_FORMAT,
        store: { settings: doc.settings, attempts: doc.attempts, saveAttempt: saveLevelAttempt }
      };
    }
    return {
      kind: 'a2b1',
      format: A2B1_FORMAT,
      store: { settings: db.settings, attempts: db.attempts, saveAttempt: saveExamAttempt }
    };
  }, [trainer, doc, db, saveLevelAttempt, saveExamAttempt]);
};
