/**
 * Every objectively-marked item of an A2·B1 attempt, turned into review rows. The item
 * shapes are specific to this paper; the row and section types are not.
 */

import { SKILL_MAX } from '@shared/config/exam.ts';
import { booleanAnswer, itemKey, numberAnswer, textAnswer } from '@shared/lib/answers.ts';
import { LETTERS } from '@shared/lib/format.ts';
import { type Attempt, type Exam, type ExamModule } from '@shared/types';

import { attemptIncludes } from '@features/exam/lib/attemptMode.ts';
import { type ReviewRow, type ReviewSection } from '@features/exam/types/examFormat.ts';

import { isGapCorrect } from './scoring.ts';

const RICHTIG = 'richtig';
const FALSCH = 'falsch';

/** How much of a matching text is enough to recognise the item in the review. */
const MESSAGE_PREVIEW_CHARS = 90;

const boolLabel = (value: boolean | undefined): string | null => {
  if (value == null) return null;
  return value ? RICHTIG : FALSCH;
};

const optionLabel = (options: readonly string[], index: number | undefined): string | null =>
  index == null ? null : (options[index] ?? null);

const teilLabel = (teil: number, index: number): string => `Teil ${String(teil)} · ${String(index + 1)}`;

const buildLesen = (exam: Exam, attempt: Attempt): ReviewSection => {
  const { lesen } = exam;
  const { answers } = attempt;
  const rows: ReviewRow[] = [];

  lesen.teil1.answers.forEach((expected, i) => {
    const given = numberAnswer(answers, itemKey('l1.', i));
    rows.push({
      id: itemKey('l1.', i),
      correct: given === expected,
      label: teilLabel(1, i),
      prompt: lesen.teil1.situations[i] ?? '',
      given: given == null ? null : `${LETTERS[given] ?? ''}) ${lesen.teil1.ads[given] ?? ''}`,
      expected: `${LETTERS[expected] ?? ''}) ${lesen.teil1.ads[expected] ?? ''}`
    });
  });

  lesen.teil2.questions.forEach((question, i) => {
    const given = numberAnswer(answers, itemKey('l2.', i));
    rows.push({
      id: itemKey('l2.', i),
      correct: given === question.answer,
      label: teilLabel(2, i),
      prompt: question.frage,
      given: optionLabel(question.options, given),
      expected: question.options[question.answer] ?? ''
    });
  });

  lesen.teil3.answers.forEach((expected, i) => {
    const given = numberAnswer(answers, itemKey('l3.', i));
    rows.push({
      id: itemKey('l3.', i),
      correct: given === expected,
      label: teilLabel(3, i),
      prompt: `${(lesen.teil3.messages[i] ?? '').slice(0, MESSAGE_PREVIEW_CHARS)}…`,
      given: optionLabel(lesen.teil3.headlines, given),
      expected: lesen.teil3.headlines[expected] ?? ''
    });
  });

  lesen.teil4.statements.forEach((statement, i) => {
    const given = booleanAnswer(answers, itemKey('l4.', i));
    rows.push({
      id: itemKey('l4.', i),
      correct: given === statement.answer,
      label: teilLabel(4, i),
      prompt: statement.text,
      given: boolLabel(given),
      expected: statement.answer ? RICHTIG : FALSCH
    });
  });

  return {
    module: 'lesen',
    heading: `Lesen — ${String(attempt.scores.lesen ?? 0)}/${String(SKILL_MAX)}`,
    rows
  };
};

const buildSprachbausteine = (exam: Exam, attempt: Attempt): ReviewSection | null => {
  if (!attempt.sb) return null;
  const { sprachbausteine } = exam;
  const { answers } = attempt;
  const rows: ReviewRow[] = [];

  sprachbausteine.teil1.gaps.forEach((gap, i) => {
    const given = numberAnswer(answers, itemKey('s1.', i));
    rows.push({
      id: itemKey('s1.', i),
      correct: given === gap.answer,
      label: `Teil 1 · Lücke ${String(i + 1)}`,
      prompt: '',
      given: optionLabel(gap.options, given),
      expected: gap.options[gap.answer] ?? ''
    });
  });

  sprachbausteine.teil2.answers.forEach((expected, i) => {
    const given = numberAnswer(answers, itemKey('s2.', i));
    rows.push({
      id: itemKey('s2.', i),
      correct: given === expected,
      label: `Teil 2 · Lücke ${String(i + 1)}`,
      prompt: '',
      given: optionLabel(sprachbausteine.teil2.wordBank, given),
      expected: sprachbausteine.teil2.wordBank[expected] ?? ''
    });
  });

  sprachbausteine.teil3.items.forEach((item, i) => {
    const given = numberAnswer(answers, itemKey('s3.', i));
    rows.push({
      id: itemKey('s3.', i),
      correct: given === item.answer,
      label: teilLabel(3, i),
      prompt: item.prompt,
      given: optionLabel(item.options, given),
      expected: item.options[item.answer] ?? ''
    });
  });

  return {
    module: 'sprachbausteine',
    heading: `Sprachbausteine — ${String(attempt.sb.correct)}/${String(attempt.sb.of)} (${String(attempt.sb.percent)}%)`,
    rows
  };
};

const buildHoeren = (exam: Exam, attempt: Attempt): ReviewSection => {
  const { hoeren } = exam;
  const { answers } = attempt;
  const rows: ReviewRow[] = [];

  hoeren.teil1.items.forEach((item, i) => {
    const given = booleanAnswer(answers, itemKey('h1.', i));
    rows.push({
      id: itemKey('h1.', i),
      correct: given === item.answer,
      label: teilLabel(1, i),
      prompt: item.statement,
      given: boolLabel(given),
      expected: item.answer ? RICHTIG : FALSCH,
      audio: item.audio
    });
  });

  hoeren.teil2.items.forEach((item, i) => {
    const given = numberAnswer(answers, itemKey('h2.', i));
    rows.push({
      id: itemKey('h2.', i),
      correct: given === item.answer,
      label: teilLabel(2, i),
      prompt: item.frage,
      given: optionLabel(item.options, given),
      expected: item.options[item.answer] ?? '',
      audio: item.audio
    });
  });

  hoeren.teil3.items.forEach((item, i) => {
    const given = booleanAnswer(answers, itemKey('h3.', i));
    rows.push({
      id: itemKey('h3.', i),
      correct: given === item.answer,
      label: teilLabel(3, i),
      prompt: item.statement,
      given: boolLabel(given),
      expected: item.answer ? RICHTIG : FALSCH,
      audio: item.audio
    });
  });

  hoeren.teil4.questions.forEach((question, i) => {
    const given = numberAnswer(answers, itemKey('h4.', i));
    rows.push({
      id: itemKey('h4.', i),
      correct: given === question.answer,
      label: teilLabel(4, i),
      prompt: question.frage,
      given: optionLabel(question.options, given),
      expected: question.options[question.answer] ?? ''
    });
  });

  hoeren.teil5.gaps.forEach((gap, i) => {
    const given = textAnswer(answers, itemKey('h5.', i));
    rows.push({
      id: itemKey('h5.', i),
      correct: isGapCorrect(gap, given),
      label: teilLabel(5, i),
      prompt: gap.label.replace('____', '______'),
      given: given || null,
      expected: gap.answer
    });
  });

  return {
    module: 'hoeren',
    heading: `Hören — ${String(attempt.scores.hoeren ?? 0)}/${String(SKILL_MAX)}`,
    rows,
    transcripts: [hoeren.teil4.audio, hoeren.teil5.audio]
  };
};

/** Every auto-marked section of an attempt, ready to render. */
export const buildReviewSections = (exam: Exam, attempt: Attempt): readonly ReviewSection[] => {
  const includes = (module: ExamModule): boolean => attemptIncludes(attempt.mode, module);
  const sections: ReviewSection[] = [];

  if (includes('lesen')) sections.push(buildLesen(exam, attempt));
  if (includes('sprachbausteine')) {
    const section = buildSprachbausteine(exam, attempt);
    if (section) sections.push(section);
  }
  if (includes('hoeren')) sections.push(buildHoeren(exam, attempt));

  return sections;
};
