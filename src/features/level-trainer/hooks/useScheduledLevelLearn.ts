import { useMemo } from 'react';

import { LEVEL_CONTENT } from '@content/trainers/index.ts';

import { isLearnDayComplete } from '@shared/lib/learnProgress.ts';
import { type LearnDay, type TelcLevel } from '@shared/types';

import {
  describeClamp,
  describeLearnLead,
  slotHeading,
  slotKindLabel,
  useTrainerSchedule
} from '@features/plan';
import { useTrainerDoc } from '@features/progress';

export interface LevelLearnSlotGroup {
  readonly key: string;
  /** "Today · Di, 26. Aug" */
  readonly heading: string;
  readonly kindLabel: string;
  readonly isToday: boolean;
  readonly days: readonly LearnDay[];
}

export interface ScheduledLevelLearn {
  /** False when there is no usable plan; the page falls back to the flat curriculum. */
  readonly scheduled: boolean;
  readonly headline: string;
  readonly lead: string | null;
  readonly notice: string | null;
  readonly groups: readonly LevelLearnSlotGroup[];
  /** Lessons the current pace has no room for. Shown, never hidden. */
  readonly extra: readonly LearnDay[];
  readonly done: readonly LearnDay[];
  readonly pending: readonly LearnDay[];
}

/** Turns one level trainer's plan into the sections its Learn page renders. */
export const useScheduledLevelLearn = (level: TelcLevel): ScheduledLevelLearn => {
  const { doc } = useTrainerDoc(level);
  const schedule = useTrainerSchedule(level);
  const curriculum = LEVEL_CONTENT[level].curriculum;
  const done = doc.learnDone;

  return useMemo(() => {
    const byDay = new Map(curriculum.days.map(day => [day.day, day]));
    const complete = curriculum.days.filter(day => isLearnDayComplete(day, done));
    const pending = curriculum.days.filter(day => !isLearnDayComplete(day, done));
    const lookup = (numbers: readonly number[]): readonly LearnDay[] =>
      numbers.flatMap(number => byDay.get(number) ?? []);

    if (!schedule || schedule.phase === 'past-due') {
      return {
        scheduled: false,
        headline: `The ${level.toUpperCase()} curriculum`,
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
      .map<LevelLearnSlotGroup>(slot => ({
        key: slot.date,
        heading: slotHeading(slot),
        kindLabel: slotKindLabel(slot.kind),
        isToday: slot.dayOffset === 0,
        days: lookup(slot.learnDays)
      }));

    return {
      scheduled: groups.length > 0,
      headline: `${level.toUpperCase()} study plan — ${String(schedule.daysLeft)} days to exam day`,
      lead: describeLearnLead(schedule),
      notice: describeClamp(schedule),
      groups,
      extra: lookup(schedule.unscheduledLearnDays),
      done: complete,
      pending
    };
  }, [schedule, done, curriculum, level]);
};
