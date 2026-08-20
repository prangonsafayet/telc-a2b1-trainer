import { useMemo } from 'react';

import { TRAINERS } from '@shared/config/trainers.ts';
import { useTrainerContent } from '@shared/hooks/useTrainerContent.ts';
import { isLearnDayComplete } from '@shared/lib/learnProgress.ts';
import { type LearnDay, type TrainerId } from '@shared/types';

import {
  describeClamp,
  describeLearnLead,
  slotHeading,
  slotKindLabel,
  useTrainerSchedule
} from '@features/plan';
import { useTrainerSlice } from '@features/progress';

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
  /** Null falls back to the trainer's authored curriculum intro. */
  readonly lead: string | null;
  readonly notice: string | null;
  readonly groups: readonly LearnSlotGroup[];
  /** Lessons the current pace has no room for. Shown, never hidden. */
  readonly extra: readonly LearnDay[];
  readonly done: readonly LearnDay[];
  /** Every unfinished day, for the unscheduled fallback. */
  readonly pending: readonly LearnDay[];
}

/** Turns one trainer's plan into the sections its Learn page renders. */
export const useScheduledLearn = (trainer: TrainerId): ScheduledLearn => {
  const { learnDone: done } = useTrainerSlice(trainer);
  const schedule = useTrainerSchedule(trainer);
  const { short } = TRAINERS[trainer];
  const curriculum = useTrainerContent(trainer).curriculum;

  return useMemo(() => {
    const byDay = new Map(curriculum.days.map(day => [day.day, day]));
    const complete = curriculum.days.filter(day => isLearnDayComplete(day, done));
    const pending = curriculum.days.filter(day => !isLearnDayComplete(day, done));
    const lookup = (numbers: readonly number[]): readonly LearnDay[] =>
      numbers.flatMap(number => byDay.get(number) ?? []);

    if (!schedule || schedule.phase === 'past-due') {
      return {
        scheduled: false,
        headline: `AI-assisted learning · ${short} — the ${String(curriculum.days.length)}-day curriculum`,
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
      headline: `AI-assisted learning · ${short} — ${String(schedule.daysLeft)} days to exam day`,
      lead: describeLearnLead(schedule),
      notice: describeClamp(schedule),
      groups,
      extra: lookup(schedule.unscheduledLearnDays),
      done: complete,
      pending
    };
  }, [schedule, done, curriculum, short]);
};
