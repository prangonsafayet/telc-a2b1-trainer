import { TRAINERS } from '@shared/config/trainers.ts';
import { type TrainerId } from '@shared/types';

import { sprintAnchors, type ScheduleSource } from './buildSchedule.ts';

/**
 * What one trainer feeds the schedule engine, read entirely from its descriptor: its
 * curriculum, its papers, and the crash-course days its sprint reaches for. The engine
 * itself knows about no trainer.
 */
export const trainerScheduleSource = (trainer: TrainerId): ScheduleSource => {
  const { content, sprintLearnDays } = TRAINERS[trainer];
  const examIds = content.exams.map(exam => exam.id);
  return {
    learnDays: content.curriculum.days,
    examIds,
    sprintExamIds: sprintAnchors(examIds),
    sprintLearnDays: sprintLearnDays.filter(day => content.curriculum.days.some(item => item.day === day))
  };
};
