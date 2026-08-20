/**
 * The dual-level paper — the telc Deutsch A2·B1 Modelltest — described for the generic
 * runner: five modules, four 60-point skills plus Sprachbausteine, and a grade of B1, A2 or
 * Nicht bestanden.
 */

import { DUAL_LEVEL_PAPER } from '@content/trainers/index.ts';

import { MODULE_META, RATING_CRITERIA } from '@shared/config/exam.ts';
import { moduleMinutes } from '@shared/lib/paper.ts';
import { type ExamModule } from '@shared/types';

import HoerenModule from '@features/exam/components/modules/dual-level/HoerenModule.tsx';
import LesenModule from '@features/exam/components/modules/dual-level/LesenModule.tsx';
import SchreibenModule from '@features/exam/components/modules/dual-level/SchreibenModule.tsx';
import SprachbausteineModule from '@features/exam/components/modules/dual-level/SprachbausteineModule.tsx';
import SprechenModule from '@features/exam/components/modules/dual-level/SprechenModule.tsx';
import { MAX_CRITERION_SCORE } from '@features/exam/config/run.ts';
import { type DualLevelFormat } from '@features/exam/types/examBinding.ts';
import { type RatingSpec } from '@features/exam/types/examFormat.ts';
import { type RatedModule } from '@features/exam/types/run.ts';

import { buildAttempt, completionToast, writingSample } from './attempt.ts';
import { buildReviewSections } from './review.ts';
import { DUAL_LEVEL_RUN_FORMAT } from './runFormat.ts';
import { countUnanswered } from './scoring.ts';
import { summarizeAttempt } from './summary.ts';

/** Each criterion scores 0–5; the sum is multiplied by 3 for a 60-point module score. */
const CRITERION_SCALE = 3;

const ratingSpec = (module: RatedModule): RatingSpec => {
  const criteria = RATING_CRITERIA[module];
  return {
    criteria,
    scale: CRITERION_SCALE,
    max: criteria.length * MAX_CRITERION_SCORE * CRITERION_SCALE
  };
};

export const DUAL_LEVEL_FORMAT: DualLevelFormat = {
  ...DUAL_LEVEL_RUN_FORMAT,
  examLabel: exam => `${exam.title} · ${exam.level}`,
  moduleName: (module: ExamModule) => MODULE_META[module].name,
  minutes: (module, _exam, settings) => moduleMinutes(DUAL_LEVEL_PAPER, module, settings),
  briefing: (module: ExamModule) => DUAL_LEVEL_PAPER.briefing[module],
  rating: { schreiben: ratingSpec('schreiben'), sprechen: ratingSpec('sprechen') },
  speakingHint:
    'Rate against the Redemittel: did you use suggestion phrases, react, ask back, reach a result in Teil 3?',
  speakingReviewNote:
    'Recordings are session-only and not stored. Re-run the module to practice again — and re-read the Sprechen tactics in the Exam Guide.',
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
    writingSample: exam => writingSample(exam)
  }
};
