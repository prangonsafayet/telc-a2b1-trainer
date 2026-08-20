/**
 * The telc Deutsch B1 and B2 Modelltests, described for the generic runner. One descriptor
 * serves both levels: everything that differs between them is a function of `exam.level`,
 * which the paper itself carries.
 */

/* Sourced straight from each trainer's own paper.ts, not from the content barrel: that
   barrel's evaluation is all-or-nothing (importing one export loads every trainer's whole
   content), which is exactly what per-trainer chunking depends on nobody doing — see the
   comment atop `content/trainers/index.ts`. */
import { B1_PAPER } from '@content/trainers/b1/paper.ts';
import { B2_PAPER } from '@content/trainers/b2/paper.ts';

import {
  SINGLE_LEVEL_MODULE_META,
  SINGLE_LEVEL_RATING_CRITERIA,
  SINGLE_LEVEL_RATING_SCALE
} from '@shared/config/singleLevelExam.ts';
import { moduleMinutes } from '@shared/lib/paper.ts';
import { type ExamModule, type SingleLevelTrainerId, type TrainerPaper } from '@shared/types';

import HoerenModule from '@features/exam/components/modules/single-level/HoerenModule.tsx';
import LesenModule from '@features/exam/components/modules/single-level/LesenModule.tsx';
import SchreibenModule from '@features/exam/components/modules/single-level/SchreibenModule.tsx';
import SprachbausteineModule from '@features/exam/components/modules/single-level/SprachbausteineModule.tsx';
import SprechenModule from '@features/exam/components/modules/single-level/SprechenModule.tsx';
import { MAX_CRITERION_SCORE } from '@features/exam/config/run.ts';
import { type SingleLevelFormat } from '@features/exam/types/examBinding.ts';
import { type RatingSpec } from '@features/exam/types/examFormat.ts';
import { type RatedModule } from '@features/exam/types/run.ts';

import { buildAttempt, completionToast, writingSample } from './attempt.ts';
import { buildReviewSections } from './review.ts';
import { SINGLE_LEVEL_RUN_FORMAT } from './runFormat.ts';
import { countUnanswered } from './scoring.ts';
import { summarizeAttempt } from './summary.ts';

/** Named by format rather than by trainer, same as the papers this file used to import. */
const SINGLE_LEVEL_PAPERS: Readonly<Record<SingleLevelTrainerId, TrainerPaper>> = {
  b1: B1_PAPER,
  b2: B2_PAPER
};

const ratingSpec = (module: RatedModule): RatingSpec => {
  const criteria = SINGLE_LEVEL_RATING_CRITERIA[module];
  return {
    criteria,
    scale: SINGLE_LEVEL_RATING_SCALE,
    max: criteria.length * MAX_CRITERION_SCORE * SINGLE_LEVEL_RATING_SCALE
  };
};

export const SINGLE_LEVEL_FORMAT: SingleLevelFormat = {
  ...SINGLE_LEVEL_RUN_FORMAT,
  examLabel: exam => `${exam.title} · ${exam.level.toUpperCase()}`,
  moduleName: (module: ExamModule) => SINGLE_LEVEL_MODULE_META[module].name,
  minutes: (module, exam, settings) => moduleMinutes(SINGLE_LEVEL_PAPERS[exam.level], module, settings),
  briefing: (module, exam) => SINGLE_LEVEL_PAPERS[exam.level].briefing[module],
  rating: { schreiben: ratingSpec('schreiben'), sprechen: ratingSpec('sprechen') },
  speakingHint:
    'Rate against the Redemittel: did you present clearly, react to your partner, and reach a result in Teil 3?',
  speakingReviewNote:
    'Recordings are session-only and not stored. Re-run the module to practice again — and re-read the Sprechen Redemittel before your next attempt.',
  moduleComponents: {
    lesen: LesenModule,
    sprachbausteine: SprachbausteineModule,
    hoeren: HoerenModule,
    schreiben: SchreibenModule,
    sprechen: SprechenModule
  },
  scoring: {
    countUnanswered,
    buildAttempt,
    summarize: summarizeAttempt,
    completionToast,
    review: buildReviewSections,
    writingSample
  }
};
