/** The adaptive study plan derived from the exam date. Never persisted. */

import { type LearnDoneMap } from './progress.ts';

export type SlotKind = 'learn' | 'mock' | 'mixed' | 'review' | 'exam-eve';

/** Whether the runway had to be pulled into the plannable window. */
export type ScheduleClamp = 'none' | 'below-min' | 'above-max';

export type SchedulePhase = 'learn' | 'mock' | 'final-sprint' | 'past-due';

export interface ScheduleInput {
  /** `settings.examDate`, `YYYY-MM-DD` in local time. */
  readonly examDate: string;
  /** Today as `YYYY-MM-DD`. Injected so the engine reads no clock. */
  readonly today: string;
  /** Completed work is never scheduled again. */
  readonly learnDone: LearnDoneMap;
  readonly attemptedExamIds: ReadonlySet<number>;
}

/** One calendar day of the plan. */
export interface ScheduleSlot {
  readonly date: string;
  /** 0 = today. */
  readonly dayOffset: number;
  /** `LEARN.days` day numbers to work through. */
  readonly learnDays: readonly number[];
  readonly examIds: readonly number[];
  readonly kind: SlotKind;
}

export interface Schedule {
  /** Whole days to the exam, as stored — may be negative or beyond the window. */
  readonly daysLeft: number;
  /** `daysLeft` pulled into [MIN_PREP_DAYS, MAX_PREP_DAYS]. */
  readonly effectiveDays: number;
  readonly clamped: ScheduleClamp;
  readonly phase: SchedulePhase;
  /** One per day, starting today. Empty once the date has passed. */
  readonly slots: readonly ScheduleSlot[];
  readonly todaySlot: ScheduleSlot | null;
  /** Optional at this pace — offered as extra material, never hidden. */
  readonly unscheduledExamIds: readonly number[];
  readonly unscheduledLearnDays: readonly number[];
}

/** How many days of the plan go to lessons and how many to mocks. */
export interface PhaseSplit {
  readonly learnSlots: number;
  readonly mockSlots: number;
}
