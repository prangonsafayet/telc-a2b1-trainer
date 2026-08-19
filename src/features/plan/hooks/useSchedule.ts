import { useMemo } from 'react';

import { type Schedule } from '@shared/types';

import { useProgress } from '@features/progress';

import { buildSchedule } from '../lib/buildSchedule.ts';

import { useToday } from './useToday.ts';

/**
 * The current study plan, or null when the stored exam date is unusable. Recomputed from
 * the stored document rather than persisted, so it is always consistent with progress.
 */
export function useSchedule(): Schedule | null {
  const { db } = useProgress();
  const today = useToday();

  const attemptedExamIds = useMemo(() => new Set(db.attempts.map(attempt => attempt.examId)), [db.attempts]);

  return useMemo(
    () =>
      buildSchedule({
        examDate: db.settings.examDate,
        today,
        learnDone: db.learnDone,
        attemptedExamIds
      }),
    [db.settings.examDate, today, db.learnDone, attemptedExamIds]
  );
}
