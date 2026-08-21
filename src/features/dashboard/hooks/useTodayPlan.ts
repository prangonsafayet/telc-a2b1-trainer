import { useMemo } from 'react';

import { TRAINERS } from '@shared/config/trainers.ts';
import { useTrainerContent } from '@shared/hooks/useTrainerContent.ts';
import { type ExamPaper, type LearnDay, type Schedule, type TrainerId } from '@shared/types';

import { describeClamp, slotHeading, slotKindLabel, useTrainerSchedule } from '@features/plan';

export interface TodayPlan {
  /** "Today · Di, 26. Aug" */
  readonly heading: string;
  readonly kindLabel: string;
  readonly lessons: readonly LearnDay[];
  readonly exams: readonly ExamPaper[];
  /** A day the plan deliberately leaves free of new material. */
  readonly isRest: boolean;
  /** Where "open today's lessons" goes. */
  readonly learnTo: string;
}

export interface SchedulePlan {
  readonly schedule: Schedule | null;
  readonly today: TodayPlan | null;
  /** Set when the date needs explaining: past, too near, or too far. */
  readonly notice: string | null;
  readonly needsNewDate: boolean;
  /** Where the notice's button goes. Settings is shared by every trainer. */
  readonly settingsTo: string;
}

const SETTINGS_PATH = '/settings';

/** What one trainer's plan asks for today, and whether the date behind it needs attention. */
export const useTodayPlan = (trainer: TrainerId): SchedulePlan => {
  const schedule = useTrainerSchedule(trainer);
  const { basePath } = TRAINERS[trainer];
  const content = useTrainerContent(trainer);

  return useMemo(() => {
    const learnTo = `${basePath}/learn`;
    if (!schedule) {
      return {
        schedule: null,
        today: null,
        notice: 'No exam date is set, so there is no plan yet. Add one in Settings.',
        needsNewDate: true,
        settingsTo: SETTINGS_PATH
      };
    }

    const notice = describeClamp(schedule);
    const slot = schedule.todaySlot;
    if (!slot) {
      return {
        schedule,
        today: null,
        notice,
        needsNewDate: schedule.phase === 'past-due',
        settingsTo: SETTINGS_PATH
      };
    }

    const lessons = slot.learnDays.flatMap(number =>
      content.curriculum.days.filter(day => day.day === number)
    );
    const exams = slot.examIds.flatMap(id => content.exams.filter(exam => exam.id === id));

    return {
      schedule,
      today: {
        heading: slotHeading(slot),
        kindLabel: slotKindLabel(slot.kind),
        lessons,
        exams,
        isRest: lessons.length === 0 && exams.length === 0,
        learnTo
      },
      notice,
      needsNewDate: false,
      settingsTo: SETTINGS_PATH
    };
  }, [schedule, basePath, content]);
};
