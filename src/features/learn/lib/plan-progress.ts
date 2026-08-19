import { LEARN } from '@/content/learn.ts';

import { type LearnDoneMap } from '@/shared/types';

/** Checkbox key. Stable across versions — it is persisted and synced. */
export function learnTaskKey(day: number, taskIndex: number): string {
  return `d${String(day)}t${String(taskIndex)}`;
}

export interface PlanSummary {
  readonly totalTasks: number;
  readonly doneTasks: number;
  readonly percent: number;
}

export function summarizePlan(done: LearnDoneMap): PlanSummary {
  const totalTasks = LEARN.days.reduce((sum, day) => sum + day.tasks.length, 0);
  const doneTasks = Object.values(done).filter(Boolean).length;
  return { totalTasks, doneTasks, percent: totalTasks === 0 ? 0 : (doneTasks / totalTasks) * 100 };
}
