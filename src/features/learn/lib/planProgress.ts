import { learnTaskKey } from '@shared/lib/learnProgress.ts';
import { type LearnDoneMap, type LearnPlan } from '@shared/types';

export interface PlanSummary {
  readonly totalTasks: number;
  readonly doneTasks: number;
  readonly percent: number;
}

/**
 * How far through one trainer's curriculum its ticked tasks put it. Counted against the
 * curriculum rather than by counting stored keys, so a task that no longer exists — a
 * curriculum that shrank, an imported file from another build — cannot report 110%.
 */
export const summarizePlan = (curriculum: LearnPlan, done: LearnDoneMap): PlanSummary => {
  const totalTasks = curriculum.days.reduce((sum, day) => sum + day.tasks.length, 0);
  const doneTasks = curriculum.days.reduce(
    (sum, day) => sum + day.tasks.filter((_, index) => done[learnTaskKey(day.day, index)] === true).length,
    0
  );
  return { totalTasks, doneTasks, percent: totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100 };
};
