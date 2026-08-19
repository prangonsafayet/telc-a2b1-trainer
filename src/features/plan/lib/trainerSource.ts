import { LEVEL_CONTENT } from '@content/trainers/index.ts';

import { type TelcLevel } from '@shared/types';

import { sprintAnchors, type ScheduleSource } from './buildSchedule.ts';

/** Lesson days that carry the crash course when only a sprint is left. */
const CRASH_DAYS: readonly number[] = [1, 13];

/** What one level trainer feeds the schedule engine. */
export const trainerScheduleSource = (level: TelcLevel): ScheduleSource => {
  const content = LEVEL_CONTENT[level];
  const examIds = content.exams.map(exam => exam.id);
  return {
    learnDays: content.curriculum.days,
    examIds,
    sprintExamIds: sprintAnchors(examIds),
    sprintLearnDays: CRASH_DAYS.filter(day => content.curriculum.days.some(item => item.day === day))
  };
};
