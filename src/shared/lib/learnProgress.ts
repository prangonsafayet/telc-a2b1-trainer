/** The learn-plan checkbox key scheme. Persisted and synced, so it never changes. */

import { type LearnDay, type LearnDoneMap } from '@shared/types';

/** Checkbox key for one task of one day: `d7t2`. */
export function learnTaskKey(day: number, taskIndex: number): string {
  return `d${String(day)}t${String(taskIndex)}`;
}

/** A day counts as done when every one of its tasks is ticked. */
export function isLearnDayComplete(day: LearnDay, done: LearnDoneMap): boolean {
  return day.tasks.every((_, index) => done[learnTaskKey(day.day, index)] === true);
}
