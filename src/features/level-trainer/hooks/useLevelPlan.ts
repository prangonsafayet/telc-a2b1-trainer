import { useCallback, useMemo } from 'react';

import { LEVEL_CONTENT } from '@content/trainers/index.ts';

import { learnTaskKey } from '@shared/lib/learnProgress.ts';
import { type SingleLevelTrainerId } from '@shared/types';

import { useToday } from '@features/plan';
import { touchActivity, useTrainerDoc } from '@features/progress';

export interface LevelPlanSummary {
  readonly doneTasks: number;
  readonly totalTasks: number;
  readonly percent: number;
}

export interface LevelPlanState {
  readonly summary: LevelPlanSummary;
  readonly isTaskDone: (day: number, taskIndex: number) => boolean;
  readonly toggleTask: (day: number, taskIndex: number, done: boolean) => void;
  readonly isDayComplete: (day: number) => boolean;
}

/** Curriculum checkbox state of one level trainer, stored on its document. */
export const useLevelPlan = (level: SingleLevelTrainerId): LevelPlanState => {
  const { doc, updateDoc } = useTrainerDoc(level);
  const today = useToday();
  const curriculum = LEVEL_CONTENT[level].curriculum;
  const done = doc.learnDone;

  const isTaskDone = useCallback(
    (day: number, taskIndex: number) => done[learnTaskKey(day, taskIndex)] === true,
    [done]
  );

  const toggleTask = useCallback(
    (day: number, taskIndex: number, isDone: boolean) => {
      updateDoc(current => {
        const key = learnTaskKey(day, taskIndex);
        /* Absent rather than `false`, so the map only ever lists completed tasks. */
        const { [key]: _removed, ...rest } = current.learnDone;
        const next = { ...current, learnDone: isDone ? { ...rest, [key]: true } : rest };
        return isDone ? touchActivity(next, today) : next;
      });
    },
    [updateDoc, today]
  );

  const isDayComplete = useCallback(
    (day: number) => {
      const entry = curriculum.days.find(candidate => candidate.day === day);
      return entry ? entry.tasks.every((_, index) => isTaskDone(day, index)) : false;
    },
    [curriculum.days, isTaskDone]
  );

  const summary = useMemo<LevelPlanSummary>(() => {
    const totalTasks = curriculum.days.reduce((sum, day) => sum + day.tasks.length, 0);
    const doneTasks = curriculum.days.reduce(
      (sum, day) => sum + day.tasks.filter((_, index) => isTaskDone(day.day, index)).length,
      0
    );
    return {
      doneTasks,
      totalTasks,
      percent: totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0
    };
  }, [curriculum.days, isTaskDone]);

  return { summary, isTaskDone, toggleTask, isDayComplete };
};
