/**
 * The content layer, keyed by trainer. Every trainer exposes the same shape, so a screen
 * reads `TRAINER_CONTENT[trainer]` and never asks which trainer it is looking at.
 *
 * The narrowed paper lists below exist for the format layer only: marking a paper needs its
 * concrete type, and only `features/exam` does that.
 */

import {
  type DualLevelExam,
  type ExamPaper,
  type SingleLevelExam,
  type SingleLevelTrainerId,
  type TrainerContent,
  type TrainerId
} from '@shared/types';

import { A2B1_CONTENT } from './a2b1/index.ts';
import { B1_CONTENT } from './b1/index.ts';
import { B2_CONTENT } from './b2/index.ts';

/** Everything every trainer studies from, keyed by trainer. */
export const TRAINER_CONTENT: Readonly<Record<TrainerId, TrainerContent>> = {
  a2b1: A2B1_CONTENT,
  b1: B1_CONTENT,
  b2: B2_CONTENT
};

/**
 * The papers of each format, named by format rather than by trainer, so `features/exam`
 * reaches its own paper type without naming a trainer. A second trainer setting the
 * dual-level paper would turn this into a record, here — in the content layer, which is
 * the only place that knows which trainer authored what.
 */
export const DUAL_LEVEL_EXAMS: readonly DualLevelExam[] = A2B1_CONTENT.exams;

export const SINGLE_LEVEL_EXAMS: Readonly<Record<SingleLevelTrainerId, readonly SingleLevelExam[]>> = {
  b1: B1_CONTENT.exams,
  b2: B2_CONTENT.exams
};

/** Looks up a paper by id; accepts the string form that arrives from route params. */
export const findPaper = <TExam extends ExamPaper>(
  exams: readonly TExam[],
  id: string | number | undefined
): TExam | undefined => {
  const numeric = Number(id);
  return Number.isFinite(numeric) ? exams.find(exam => exam.id === numeric) : undefined;
};
