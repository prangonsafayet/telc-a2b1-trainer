import { A2B1_CURRICULUM } from '@content/trainers/a2b1/curriculum.ts';

import { type LearnDoneMap } from '@shared/types';

/** Checkbox key. Stable across versions — it is persisted and synced. */
export const learnTaskKey = (day: number, taskIndex: number): string =>
  `d${String(day)}t${String(taskIndex)}`;

export interface PlanSummary {
  readonly totalTasks: number;
  readonly doneTasks: number;
  readonly percent: number;
}

export const summarizePlan = (done: LearnDoneMap): PlanSummary => {
  const totalTasks = A2B1_CURRICULUM.days.reduce((sum, day) => sum + day.tasks.length, 0);
  const doneTasks = Object.values(done).filter(Boolean).length;
  return { totalTasks, doneTasks, percent: totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100 };
};
