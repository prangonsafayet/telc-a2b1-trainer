import { useMemo } from 'react';

import { EXAMS } from '@content/exams';
import { LEARN } from '@content/learn.ts';

import { type Exam, type LearnDay, type Schedule } from '@shared/types';

import { describeClamp, slotHeading, slotKindLabel, useSchedule } from '@features/plan';

export interface TodayPlan {
  /** "Today · Di, 26. Aug" */
  readonly heading: string;
  readonly kindLabel: string;
  readonly lessons: readonly LearnDay[];
  readonly exams: readonly Exam[];
  /** A day the plan deliberately leaves free of new material. */
  readonly isRest: boolean;
}

export interface SchedulePlan {
  readonly schedule: Schedule | null;
  readonly today: TodayPlan | null;
  /** Set when the date needs explaining: past, too near, or too far. */
  readonly notice: string | null;
  readonly needsNewDate: boolean;
}

/** What the plan asks for today, and whether the date behind it needs attention. */
export const useTodayPlan = (): SchedulePlan => {
  const schedule = useSchedule();

  return useMemo(() => {
    if (!schedule) {
      return {
        schedule: null,
        today: null,
        notice: 'No exam date is set, so there is no plan yet. Add one in Settings.',
        needsNewDate: true
      };
    }

    const notice = describeClamp(schedule);
    const slot = schedule.todaySlot;
    if (!slot) {
      return { schedule, today: null, notice, needsNewDate: schedule.phase === 'past-due' };
    }

    const lessons = slot.learnDays.flatMap(number => LEARN.days.filter(day => day.day === number));
    const exams = slot.examIds.flatMap(id => EXAMS.filter(exam => exam.id === id));

    return {
      schedule,
      today: {
        heading: slotHeading(slot),
        kindLabel: slotKindLabel(slot.kind),
        lessons,
        exams,
        isRest: lessons.length === 0 && exams.length === 0
      },
      notice,
      needsNewDate: false
    };
  }, [schedule]);
};
