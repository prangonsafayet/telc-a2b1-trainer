import {
  type AnswerMap,
  type AnswerValue,
  type Exam,
  type ExamGrade,
  type ExamModule,
  type NoteGap,
  type SkillScores,
  type SprachbausteineScore
} from '@shared/types';

/** Points awarded per correct item in Lesen and Hören. */
const POINTS_PER_ITEM = 3;

export interface ModuleScore {
  readonly correct: number;
  readonly of: number;
  readonly points: number;
}

/**
 * Loose comparison for the Teil-5 note-sheet gaps: case and punctuation are ignored, a
 * leading article is dropped, and a time written "8" matches "8 Uhr". The real exam marks
 * content, not orthography.
 */
const normalizeGapAnswer = (value: AnswerValue | undefined): string =>
  String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:"'()]/g, '')
    .replace(/^((der|die|das|den|dem|ein|eine|einen|am|um|im) )+/, '')
    .replace(/ uhr$/, '')
    .replace(/\s+/g, ' ');

export const isGapCorrect = (gap: NoteGap, value: AnswerValue | undefined): boolean => {
  const given = normalizeGapAnswer(value);
  if (!given) return false;

  const accepted = [gap.answer, ...(gap.alt ?? [])].map(normalizeGapAnswer);
  if (accepted.includes(given)) return true;

  /* "halb 8" vs "7:30" is out of scope, but bare digits should still match. */
  const digitsOnly = (text: string): string => text.replace(/[^0-9]/g, '');
  const expectedDigits = digitsOnly(gap.answer);
  return expectedDigits !== '' && digitsOnly(given) === expectedDigits;
};

export const scoreLesen = (exam: Exam, answers: AnswerMap): ModuleScore => {
  let correct = 0;
  exam.lesen.teil1.answers.forEach((expected, i) => {
    if (answers[`l1.${String(i)}`] === expected) correct++;
  });
  exam.lesen.teil2.questions.forEach((question, i) => {
    if (answers[`l2.${String(i)}`] === question.answer) correct++;
  });
  exam.lesen.teil3.answers.forEach((expected, i) => {
    if (answers[`l3.${String(i)}`] === expected) correct++;
  });
  exam.lesen.teil4.statements.forEach((statement, i) => {
    if (answers[`l4.${String(i)}`] === statement.answer) correct++;
  });
  return { correct, of: 20, points: correct * POINTS_PER_ITEM };
};

export const scoreHoeren = (exam: Exam, answers: AnswerMap): ModuleScore => {
  let correct = 0;
  exam.hoeren.teil1.items.forEach((item, i) => {
    if (answers[`h1.${String(i)}`] === item.answer) correct++;
  });
  exam.hoeren.teil2.items.forEach((item, i) => {
    if (answers[`h2.${String(i)}`] === item.answer) correct++;
  });
  exam.hoeren.teil3.items.forEach((item, i) => {
    if (answers[`h3.${String(i)}`] === item.answer) correct++;
  });
  exam.hoeren.teil4.questions.forEach((question, i) => {
    if (answers[`h4.${String(i)}`] === question.answer) correct++;
  });
  exam.hoeren.teil5.gaps.forEach((gap, i) => {
    if (isGapCorrect(gap, answers[`h5.${String(i)}`])) correct++;
  });
  return { correct, of: 20, points: correct * POINTS_PER_ITEM };
};

export const scoreSprachbausteine = (exam: Exam, answers: AnswerMap): SprachbausteineScore => {
  let correct = 0;
  exam.sprachbausteine.teil1.gaps.forEach((gap, i) => {
    if (answers[`s1.${String(i)}`] === gap.answer) correct++;
  });
  exam.sprachbausteine.teil2.answers.forEach((expected, i) => {
    if (answers[`s2.${String(i)}`] === expected) correct++;
  });
  exam.sprachbausteine.teil3.items.forEach((item, i) => {
    if (answers[`s3.${String(i)}`] === item.answer) correct++;
  });
  const of = 17;
  return { correct, of, percent: Math.round((correct / of) * 100) };
};

export interface FullExamGrade {
  readonly total: number;
  readonly result: ExamGrade;
}

/**
 * The official rule: B1 needs ≥42/60 in three of the four skills and ≥24/60 in the
 * fourth; A2 needs ≥24/60 in three and ≥6/60 in the fourth.
 */
export const gradeFullExam = (scores: SkillScores): FullExamGrade => {
  const values = (['lesen', 'hoeren', 'schreiben', 'sprechen'] as const).map(key => scores[key] ?? 0);
  const total = values.reduce((sum, value) => sum + value, 0);
  const isB1 = values.filter(v => v >= 42).length >= 3 && values.every(v => v >= 24);
  const isA2 = values.filter(v => v >= 24).length >= 3 && values.every(v => v >= 6);
  return { total, result: isB1 ? 'B1' : isA2 ? 'A2' : 'Nicht bestanden' };
};

/** How many items of a module are still blank — drives the submit warning. */
export const countUnanswered = (exam: Exam, module: ExamModule, answers: AnswerMap): number => {
  const missing = (keys: readonly string[]): number =>
    keys.filter(key => {
      const value = answers[key];
      return value == null || value === '';
    }).length;

  const keysFor = (length: number, prefix: string): string[] =>
    Array.from({ length }, (_, i) => `${prefix}${String(i)}`);

  if (module === 'lesen') {
    return (
      missing(keysFor(exam.lesen.teil1.answers.length, 'l1.')) +
      missing(keysFor(exam.lesen.teil2.questions.length, 'l2.')) +
      missing(keysFor(exam.lesen.teil3.answers.length, 'l3.')) +
      missing(keysFor(exam.lesen.teil4.statements.length, 'l4.'))
    );
  }
  if (module === 'sprachbausteine') {
    return (
      missing(keysFor(exam.sprachbausteine.teil1.gaps.length, 's1.')) +
      missing(keysFor(exam.sprachbausteine.teil2.answers.length, 's2.')) +
      missing(keysFor(exam.sprachbausteine.teil3.items.length, 's3.'))
    );
  }
  if (module === 'hoeren') {
    return (
      missing(keysFor(exam.hoeren.teil1.items.length, 'h1.')) +
      missing(keysFor(exam.hoeren.teil2.items.length, 'h2.')) +
      missing(keysFor(exam.hoeren.teil3.items.length, 'h3.')) +
      missing(keysFor(exam.hoeren.teil4.questions.length, 'h4.')) +
      missing(keysFor(exam.hoeren.teil5.gaps.length, 'h5.'))
    );
  }
  /* Schreiben and Sprechen are self-scored; there is nothing to count. */
  return 0;
};
