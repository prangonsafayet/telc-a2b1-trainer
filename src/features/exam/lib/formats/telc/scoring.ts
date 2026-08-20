/**
 * How a telc Deutsch B1/B2 paper is marked. Same contract as the A2·B1 marker next door,
 * different rules: points per Teil rather than per item, and a written/oral split that
 * does not compensate.
 */

import { TELC_ORAL_PASS, TELC_POINTS, TELC_WRITTEN_PASS } from '@shared/config/telcExam.ts';
import {
  type AnswerMap,
  type ExamModule,
  type TelcExam,
  type TelcResult,
  type TelcSectionScores
} from '@shared/types';

export interface ModuleScore {
  readonly correct: number;
  readonly of: number;
  readonly points: number;
}

const countCorrect = (length: number, isCorrect: (index: number) => boolean): number => {
  let correct = 0;
  for (let index = 0; index < length; index += 1) if (isCorrect(index)) correct += 1;
  return correct;
};

/** Lesen: Teil 1 and 2 score 5 points per item, Teil 3 scores 2.5. Max 75. */
export const scoreLesen = (exam: TelcExam, answers: AnswerMap): ModuleScore => {
  const { teil1, teil2, teil3 } = exam.lesen;
  const c1 = countCorrect(teil1.answers.length, i => answers[`l1.${String(i)}`] === teil1.answers[i]);
  const c2 = countCorrect(
    teil2.questions.length,
    i => answers[`l2.${String(i)}`] === teil2.questions[i]?.answer
  );
  const c3 = countCorrect(teil3.answers.length, i => answers[`l3.${String(i)}`] === teil3.answers[i]);
  return {
    correct: c1 + c2 + c3,
    of: teil1.answers.length + teil2.questions.length + teil3.answers.length,
    points: c1 * TELC_POINTS.lesenTeil1 + c2 * TELC_POINTS.lesenTeil2 + c3 * TELC_POINTS.lesenTeil3
  };
};

/** Sprachbausteine: 1.5 points per item. Max 30. */
export const scoreSprachbausteine = (exam: TelcExam, answers: AnswerMap): ModuleScore => {
  const { teil1, teil2 } = exam.sprachbausteine;
  const c1 = countCorrect(teil1.gaps.length, i => answers[`s1.${String(i)}`] === teil1.gaps[i]?.answer);
  const c2 = countCorrect(teil2.answers.length, i => answers[`s2.${String(i)}`] === teil2.answers[i]);
  return {
    correct: c1 + c2,
    of: teil1.gaps.length + teil2.answers.length,
    points: (c1 + c2) * TELC_POINTS.sprachbausteine
  };
};

/** Hören: Teil 1 and 3 score 5 points per item, Teil 2 scores 2.5. Max 75. */
export const scoreHoeren = (exam: TelcExam, answers: AnswerMap): ModuleScore => {
  const { teil1, teil2, teil3 } = exam.hoeren;
  const c1 = countCorrect(teil1.items.length, i => answers[`h1.${String(i)}`] === teil1.items[i]?.answer);
  const c2 = countCorrect(
    teil2.statements.length,
    i => answers[`h2.${String(i)}`] === teil2.statements[i]?.answer
  );
  const c3 = countCorrect(teil3.items.length, i => answers[`h3.${String(i)}`] === teil3.items[i]?.answer);
  return {
    correct: c1 + c2 + c3,
    of: teil1.items.length + teil2.statements.length + teil3.items.length,
    points: c1 * TELC_POINTS.hoerenTeil1 + c2 * TELC_POINTS.hoerenTeil2 + c3 * TELC_POINTS.hoerenTeil3
  };
};

export interface FullExamGrade {
  readonly written: number;
  readonly oral: number;
  readonly total: number;
  readonly result: TelcResult;
}

/** The official rule: ≥135/225 written AND ≥45/75 oral — no compensation between them. */
export const gradeFullExam = (scores: TelcSectionScores): FullExamGrade => {
  const written =
    (scores.lesen ?? 0) + (scores.sprachbausteine ?? 0) + (scores.hoeren ?? 0) + (scores.schreiben ?? 0);
  const oral = scores.sprechen ?? 0;
  const passed = written >= TELC_WRITTEN_PASS && oral >= TELC_ORAL_PASS;
  return { written, oral, total: written + oral, result: passed ? 'Bestanden' : 'Nicht bestanden' };
};

/** How many items of a module are still blank — drives the submit warning. */
export const countUnanswered = (exam: TelcExam, module: ExamModule, answers: AnswerMap): number => {
  const missing = (length: number, prefix: string): number => {
    let blanks = 0;
    for (let index = 0; index < length; index += 1) {
      const value = answers[`${prefix}${String(index)}`];
      if (value == null || value === '') blanks += 1;
    }
    return blanks;
  };

  if (module === 'lesen') {
    return (
      missing(exam.lesen.teil1.answers.length, 'l1.') +
      missing(exam.lesen.teil2.questions.length, 'l2.') +
      missing(exam.lesen.teil3.answers.length, 'l3.')
    );
  }
  if (module === 'sprachbausteine') {
    return (
      missing(exam.sprachbausteine.teil1.gaps.length, 's1.') +
      missing(exam.sprachbausteine.teil2.answers.length, 's2.')
    );
  }
  if (module === 'hoeren') {
    return (
      missing(exam.hoeren.teil1.items.length, 'h1.') +
      missing(exam.hoeren.teil2.statements.length, 'h2.') +
      missing(exam.hoeren.teil3.items.length, 'h3.')
    );
  }
  /* Schreiben and Sprechen are self-scored; there is nothing to count. */
  return 0;
};
