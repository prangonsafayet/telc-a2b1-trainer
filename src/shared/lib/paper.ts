/** Reading a trainer's own sitting: how long a module runs, and how fast its audio reads. */

import { type ExamModule, type TrainerExamSettings, type TrainerPaper } from '@shared/types';

/**
 * How long one module of this trainer's sitting runs. Every paper's writing time is the one
 * exam condition the candidate may change, so the stored setting wins there; everything else
 * is the official time the trainer's paper states.
 */
export const moduleMinutes = (
  paper: TrainerPaper,
  module: ExamModule,
  settings: TrainerExamSettings
): number => (module === 'schreiben' ? settings.writingMinutes : paper.minutes[module]);

/** The trainer's own listening speed, scaled by the user's speed setting. */
export const listeningRate = (paper: TrainerPaper, ttsRate: number): number => paper.listeningRate * ttsRate;
