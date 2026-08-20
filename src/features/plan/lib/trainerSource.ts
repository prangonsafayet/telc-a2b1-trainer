import { type TrainerContent } from '@shared/types';

import { sprintAnchors, type ScheduleSource } from './buildSchedule.ts';

/**
 * What one trainer feeds the schedule engine: its curriculum, its exam ids, and the
 * crash-course days its sprint reaches for. The engine itself knows about no trainer.
 *
 * Takes the trainer's content and sprint days already resolved rather than a `TrainerId`,
 * because the registry's content is loaded on demand — the hook that calls this
 * (`useTrainerSchedule`) reads it first and stays the only place that has to know that.
 */
export const trainerScheduleSource = (
  content: Pick<TrainerContent, 'curriculum' | 'exams'>,
  sprintLearnDays: readonly number[]
): ScheduleSource => {
  const examIds = content.exams.map(exam => exam.id);
  return {
    learnDays: content.curriculum.days,
    examIds,
    sprintExamIds: sprintAnchors(examIds),
    sprintLearnDays: sprintLearnDays.filter(day => content.curriculum.days.some(item => item.day === day))
  };
};
