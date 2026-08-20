import { useMemo } from 'react';

import { type Schedule, type SingleLevelTrainerId } from '@shared/types';

import { useTrainerDoc } from '@features/progress';

import { buildScheduleFrom } from '../lib/buildSchedule.ts';
import { trainerScheduleSource } from '../lib/trainerSource.ts';

import { useToday } from './useToday.ts';

/**
 * The adaptive study plan of one level trainer, or null when its stored exam date is
 * unusable. Derived on render, never persisted — like the A2·B1 plan.
 */
export const useTrainerSchedule = (level: SingleLevelTrainerId): Schedule | null => {
  const { doc } = useTrainerDoc(level);
  const today = useToday();

  const attemptedExamIds = useMemo(
    () => new Set(doc.attempts.map(attempt => attempt.examId)),
    [doc.attempts]
  );

  return useMemo(
    () =>
      buildScheduleFrom(
        {
          examDate: doc.settings.examDate,
          today,
          learnDone: doc.learnDone,
          attemptedExamIds
        },
        trainerScheduleSource(level)
      ),
    [doc.settings.examDate, today, doc.learnDone, attemptedExamIds, level]
  );
};
