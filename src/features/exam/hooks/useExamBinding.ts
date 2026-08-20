import { useMemo } from 'react';

import { DUAL_LEVEL_EXAMS, SINGLE_LEVEL_EXAMS } from '@content/trainers/index.ts';

import { type TrainerId } from '@shared/types';

import { DUAL_LEVEL_FORMAT } from '@features/exam/lib/formats/dual-level/index.ts';
import { SINGLE_LEVEL_FORMAT } from '@features/exam/lib/formats/single-level/index.ts';
import { type ExamBinding } from '@features/exam/types/examBinding.ts';
import { useTrainerSlice } from '@features/progress';

/**
 * Resolves a trainer to the paper it sets, the papers it ships and the document its
 * attempts live in, so the three exam screens narrow once and then render the same generic
 * views either way. Which paper that is comes from the trainer's stored slice, which the
 * registry places — never from the trainer's id.
 */
export const useExamBinding = (trainer: TrainerId): ExamBinding => {
  const slice = useTrainerSlice(trainer);

  return useMemo(() => {
    if (slice.format === 'single-level') {
      return {
        kind: 'single-level',
        trainer,
        format: SINGLE_LEVEL_FORMAT,
        papers: SINGLE_LEVEL_EXAMS[slice.trainer],
        store: { settings: slice.settings, attempts: slice.attempts, saveAttempt: slice.saveAttempt }
      };
    }
    return {
      kind: 'dual-level',
      trainer,
      format: DUAL_LEVEL_FORMAT,
      papers: DUAL_LEVEL_EXAMS,
      store: { settings: slice.settings, attempts: slice.attempts, saveAttempt: slice.saveAttempt }
    };
  }, [trainer, slice]);
};
