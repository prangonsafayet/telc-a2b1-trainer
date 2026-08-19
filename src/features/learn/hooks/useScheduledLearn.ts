import { useMemo } from 'react';

import { LEARN } from '@content/learn.ts';

import { isLearnDayComplete } from '@shared/lib/learnProgress.ts';
import { type LearnDay } from '@shared/types';

import { describeClamp, describeLearnLead, slotHeading, slotKindLabel, useSchedule } from '@features/plan';
import { useProgress } from '@features/progress';

export interface LearnSlotGroup {
  readonly key: string;
  /** "Today · Di, 26. Aug" */
  readonly heading: string;
  readonly kindLabel: string;
  readonly isToday: boolean;
  readonly days: readonly LearnDay[];
}

export interface ScheduledLearn {
  /**
   * False when there is no usable plan — an unreadable or past exam date. The page then
   * shows the curriculum as a flat list, which is still perfectly usable.
   */
  readonly scheduled: boolean;
  readonly headline: string;
  /** Null falls back to the authored `LEARN.intro`. */
  readonly lead: string | null;
  readonly notice: string | null;
  readonly groups: readonly LearnSlotGroup[];
  /** Lessons the current pace has no room for. Shown, never hidden. */
  readonly extra: readonly LearnDay[];
  readonly done: readonly LearnDay[];
  /** Every unfinished day, for the unscheduled fallback. */
  readonly pending: readonly LearnDay[];
}

/** Turns the plan into the sections the Learn page renders. */
export const useScheduledLearn = (): ScheduledLearn => {
  const { db } = useProgress();
  const schedule = useSchedule();
  const done = db.learnDone;

  return useMemo(() => {
    const byDay = new Map(LEARN.days.map(day => [day.day, day]));
    const complete = LEARN.days.filter(day => isLearnDayComplete(day, done));
    const pending = LEARN.days.filter(day => !isLearnDayComplete(day, done));
    const lookup = (numbers: readonly number[]): readonly LearnDay[] =>
      numbers.flatMap(number => byDay.get(number) ?? []);

    if (!schedule || schedule.phase === 'past-due') {
      return {
        scheduled: false,
        headline: 'AI-assisted learning — the 28-day curriculum',
        lead: schedule ? describeLearnLead(schedule) : null,
        notice: schedule ? describeClamp(schedule) : null,
        groups: [],
        extra: [],
        done: complete,
        pending
      };
    }

    const groups = schedule.slots
      .filter(slot => slot.learnDays.length > 0)
      .map<LearnSlotGroup>(slot => ({
        key: slot.date,
        heading: slotHeading(slot),
        kindLabel: slotKindLabel(slot.kind),
        isToday: slot.dayOffset === 0,
        days: lookup(slot.learnDays)
      }));

    return {
      scheduled: groups.length > 0,
      headline: `AI-assisted learning — ${String(schedule.daysLeft)} days to exam day`,
      lead: describeLearnLead(schedule),
      notice: describeClamp(schedule),
      groups,
      extra: lookup(schedule.unscheduledLearnDays),
      done: complete,
      pending
    };
  }, [schedule, done]);
};
