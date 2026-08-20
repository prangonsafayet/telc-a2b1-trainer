import { type TrainerId } from '@shared/types';

import { type ExamRunFormat } from '@features/exam/types/examFormat.ts';

import { A2B1_RUN_FORMAT } from './a2b1/runFormat.ts';
import { TELC_RUN_FORMAT } from './telc/runFormat.ts';

/** Which paper a trainer sets — enough to start, resume or discard one of its runs. */
export const runFormatFor = (trainer: TrainerId): ExamRunFormat =>
  trainer === 'a2b1' ? A2B1_RUN_FORMAT : TELC_RUN_FORMAT;
