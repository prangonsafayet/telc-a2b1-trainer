/**
 * The telc Deutsch B1 and B2 Modelltests, described for the generic runner. One descriptor
 * serves both levels: everything that differs between them is a function of `exam.level`,
 * which the paper itself carries.
 */

import {
  TELC_MODULE_META,
  TELC_RATING_CRITERIA,
  TELC_RATING_SCALE,
  telcModuleBriefing,
  telcModuleMinutes
} from '@shared/config/telcExam.ts';
import { type ExamModule } from '@shared/types';

import HoerenModule from '@features/exam/components/modules/telc/HoerenModule.tsx';
import LesenModule from '@features/exam/components/modules/telc/LesenModule.tsx';
import SchreibenModule from '@features/exam/components/modules/telc/SchreibenModule.tsx';
import SprachbausteineModule from '@features/exam/components/modules/telc/SprachbausteineModule.tsx';
import SprechenModule from '@features/exam/components/modules/telc/SprechenModule.tsx';
import { MAX_CRITERION_SCORE } from '@features/exam/config/run.ts';
import { type TelcFormat } from '@features/exam/types/examBinding.ts';
import { type RatingSpec } from '@features/exam/types/examFormat.ts';
import { type RatedModule } from '@features/exam/types/run.ts';

import { buildAttempt, completionToast, writingSample } from './attempt.ts';
import { buildReviewSections } from './review.ts';
import { TELC_RUN_FORMAT } from './runFormat.ts';
import { countUnanswered } from './scoring.ts';
import { summarizeAttempt } from './summary.ts';

const ratingSpec = (module: RatedModule): RatingSpec => {
  const criteria = TELC_RATING_CRITERIA[module];
  return {
    criteria,
    scale: TELC_RATING_SCALE,
    max: criteria.length * MAX_CRITERION_SCORE * TELC_RATING_SCALE
  };
};

export const TELC_FORMAT: TelcFormat = {
  ...TELC_RUN_FORMAT,
  trainer: exam => exam.level,
  examLabel: exam => `${exam.title} · telc Deutsch ${exam.level.toUpperCase()}`,
  moduleName: (module: ExamModule) => TELC_MODULE_META[module].name,
  moduleShort: (module: ExamModule) => TELC_MODULE_META[module].short,
  minutes: (module, exam, settings) => telcModuleMinutes(module, exam.level, settings),
  briefing: (module, exam) => telcModuleBriefing(module, exam.level),
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
