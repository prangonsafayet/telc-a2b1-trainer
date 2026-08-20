import { useMemo } from 'react';

import { type Schedule, type TrainerId } from '@shared/types';

import { useTrainerSlice } from '@features/progress';

import { buildScheduleFrom } from '../lib/buildSchedule.ts';
import { trainerScheduleSource } from '../lib/trainerSource.ts';

import { useToday } from './useToday.ts';

/**
 * The adaptive study plan of one trainer, or null when its stored exam date is unusable.
 * Derived on render and never persisted, so a plan can never disagree with progress.
 */
export const useTrainerSchedule = (trainer: TrainerId): Schedule | null => {
  const { learnDone, settings, attemptedExamIds } = useTrainerSlice(trainer);
  const today = useToday();
  const examDate = settings.examDate;

  return useMemo(
    () => buildScheduleFrom({ examDate, today, learnDone, attemptedExamIds }, trainerScheduleSource(trainer)),
    [examDate, today, learnDone, attemptedExamIds, trainer]
  );
};
