/**
 * The content layer, keyed by trainer. Every trainer exposes the same shape, so a screen
 * reads `TRAINER_CONTENT[trainer]` and never asks which trainer it is looking at.
 *
 * This barrel is deliberately eager — `validate.cjs` and the content-shape tests read every
 * trainer's content directly through it at build and test time — and deliberately the ONLY
 * eager route to it: importing so much as one named export here pulls in all three
 * trainers' exams, curricula, guides and vocabulary banks, because module evaluation runs
 * every import in the file regardless of which export a caller wanted. Application code
 * reaches a trainer's content through `TRAINERS[trainer].loadContent()` in
 * `@shared/config/trainers.ts` (or the `useTrainerContent` hook) instead, which is what
 * lets the bundler key a chunk per trainer. The exam format layer's small, trainer-specific
 * facts (a paper's timings, `findPaper`) are sourced directly from their own files for the
 * same reason — see each format's own `index.ts` under `features/exam/lib/formats` and
 * `@shared/lib/examLookup.ts`.
 */

import {
  type DualLevelExam,
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

/** The dual-level paper's exams, named by format rather than by trainer — test-only. */
export const DUAL_LEVEL_EXAMS: readonly DualLevelExam[] = A2B1_CONTENT.exams;

/** The single-level paper's exams, by the trainer that authored them — test-only. */
export const SINGLE_LEVEL_EXAMS: Readonly<Record<SingleLevelTrainerId, readonly SingleLevelExam[]>> = {
  b1: B1_CONTENT.exams,
  b2: B2_CONTENT.exams
};
