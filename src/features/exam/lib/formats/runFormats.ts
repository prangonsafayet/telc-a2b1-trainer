import { TRAINERS, TRAINER_ORDER } from '@shared/config/trainers.ts';
import { type ExamFormatId, type TrainerId } from '@shared/types';

import { type ExamRunFormat } from '@features/exam/types/examFormat.ts';

import { DUAL_LEVEL_RUN_FORMAT } from './dual-level/runFormat.ts';
import { SINGLE_LEVEL_RUN_FORMAT } from './single-level/runFormat.ts';

const RUN_FORMATS: Readonly<Record<ExamFormatId, ExamRunFormat>> = {
  'dual-level': DUAL_LEVEL_RUN_FORMAT,
  'single-level': SINGLE_LEVEL_RUN_FORMAT
};

/**
 * Which paper a trainer sets — enough to start, resume or discard one of its runs. Looked
 * up through the trainer's descriptor, so a new trainer names an existing paper and needs
 * nothing here.
 */
export const runFormatFor = (trainer: TrainerId): ExamRunFormat => RUN_FORMATS[TRAINERS[trainer].format];

/**
 * Discards every trainer's run in progress, whichever paper it belongs to.
 *
 * "Delete all progress" used to leave both run keys behind, so a half-finished attempt —
 * answers, remaining time and the text typed into the writing module — survived a full wipe
 * and the dashboard offered to resume it immediately afterwards.
 */
export const clearAllRuns = (): void => {
  for (const trainer of TRAINER_ORDER) runFormatFor(trainer).runStore.clear(trainer);
};
