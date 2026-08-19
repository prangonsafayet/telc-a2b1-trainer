import { LETTERS } from '@shared/lib/format.ts';
import { type Attempt, type AudioScript, type Exam, type ExamModule } from '@shared/types';

import { booleanAnswer, itemKey, numberAnswer, textAnswer } from './answers.ts';
import { isGapCorrect } from './scoring.ts';

/** One reviewed item: what was asked, what was answered, and what was right. */
export interface ReviewEntry {
  readonly id: string;
  readonly correct: boolean;
  readonly question: string;
  readonly given: string | null;
  readonly expected: string;
  /** Present for listening items, revealed only here. */
  readonly transcript?: AudioScript;
}

export interface ReviewSection {
  readonly module: ExamModule;
  readonly heading: string;
  readonly entries: readonly ReviewEntry[];
  /** Standalone transcripts (the interview and the phone message). */
  readonly transcripts?: readonly AudioScript[];
}

const RICHTIG = 'richtig';
const FALSCH = 'falsch';

const boolLabel = (value: boolean | undefined): string | null => {
  if (value == null) return null;
  return value ? RICHTIG : FALSCH;
};

const optionLabel = (options: readonly string[], index: number | undefined): string | null =>
  index == null ? null : (options[index] ?? null);

const buildLesen = (exam: Exam, attempt: Attempt): ReviewSection => {
  const { lesen } = exam;
  const { answers } = attempt;
  const entries: ReviewEntry[] = [];

  lesen.teil1.answers.forEach((expected, i) => {
    const given = numberAnswer(answers, itemKey('l1.', i));
    entries.push({
      id: `l1.${String(i)}`,
      correct: given === expected,
      question: `T1.${String(i + 1)} ${lesen.teil1.situations[i] ?? ''}`,
      given: given == null ? null : `${LETTERS[given] ?? ''}) ${lesen.teil1.ads[given] ?? ''}`,
      expected: `${LETTERS[expected] ?? ''}) ${lesen.teil1.ads[expected] ?? ''}`
    });
  });

  lesen.teil2.questions.forEach((question, i) => {
    const given = numberAnswer(answers, itemKey('l2.', i));
    entries.push({
      id: `l2.${String(i)}`,
      correct: given === question.answer,
      question: `T2.${String(i + 1)} ${question.frage}`,
      given: optionLabel(question.options, given),
      expected: question.options[question.answer] ?? ''
    });
  });

  lesen.teil3.answers.forEach((expected, i) => {
    const given = numberAnswer(answers, itemKey('l3.', i));
    entries.push({
      id: `l3.${String(i)}`,
      correct: given === expected,
      question: `T3.${String(i + 1)} ${(lesen.teil3.messages[i] ?? '').slice(0, 90)}…`,
      given: optionLabel(lesen.teil3.headlines, given),
      expected: lesen.teil3.headlines[expected] ?? ''
    });
  });

  lesen.teil4.statements.forEach((statement, i) => {
    const given = booleanAnswer(answers, itemKey('l4.', i));
    entries.push({
      id: `l4.${String(i)}`,
      correct: given === statement.answer,
      question: `T4.${String(i + 1)} ${statement.text}`,
      given: boolLabel(given),
      expected: statement.answer ? RICHTIG : FALSCH
    });
  });

  return { module: 'lesen', heading: `Lesen — ${String(attempt.scores.lesen ?? 0)}/60`, entries };
};

const buildSprachbausteine = (exam: Exam, attempt: Attempt): ReviewSection | null => {
  if (!attempt.sb) return null;
  const { sprachbausteine } = exam;
  const { answers } = attempt;
  const entries: ReviewEntry[] = [];

  sprachbausteine.teil1.gaps.forEach((gap, i) => {
    const given = numberAnswer(answers, itemKey('s1.', i));
    entries.push({
      id: `s1.${String(i)}`,
      correct: given === gap.answer,
      question: `T1 Lücke ${String(i + 1)}`,
      given: optionLabel(gap.options, given),
      expected: gap.options[gap.answer] ?? ''
    });
  });

  sprachbausteine.teil2.answers.forEach((expected, i) => {
    const given = numberAnswer(answers, itemKey('s2.', i));
    entries.push({
      id: `s2.${String(i)}`,
      correct: given === expected,
      question: `T2 Lücke ${String(i + 1)}`,
      given: optionLabel(sprachbausteine.teil2.wordBank, given),
      expected: sprachbausteine.teil2.wordBank[expected] ?? ''
    });
  });

  sprachbausteine.teil3.items.forEach((item, i) => {
    const given = numberAnswer(answers, itemKey('s3.', i));
    entries.push({
      id: `s3.${String(i)}`,
      correct: given === item.answer,
      question: `T3.${String(i + 1)} ${item.prompt}`,
      given: optionLabel(item.options, given),
      expected: item.options[item.answer] ?? ''
    });
  });

  return {
    module: 'sprachbausteine',
    heading: `Sprachbausteine — ${String(attempt.sb.correct)}/${String(attempt.sb.of)} (${String(attempt.sb.percent)}%)`,
    entries
  };
};

const buildHoeren = (exam: Exam, attempt: Attempt): ReviewSection => {
  const { hoeren } = exam;
  const { answers } = attempt;
  const entries: ReviewEntry[] = [];

  hoeren.teil1.items.forEach((item, i) => {
    const given = booleanAnswer(answers, itemKey('h1.', i));
    entries.push({
      id: `h1.${String(i)}`,
      correct: given === item.answer,
      question: `T1.${String(i + 1)} ${item.statement}`,
      given: boolLabel(given),
      expected: item.answer ? RICHTIG : FALSCH,
      transcript: item.audio
    });
  });

  hoeren.teil2.items.forEach((item, i) => {
    const given = numberAnswer(answers, itemKey('h2.', i));
    entries.push({
      id: `h2.${String(i)}`,
      correct: given === item.answer,
      question: `T2.${String(i + 1)} ${item.frage}`,
      given: optionLabel(item.options, given),
      expected: item.options[item.answer] ?? '',
      transcript: item.audio
    });
  });

  hoeren.teil3.items.forEach((item, i) => {
    const given = booleanAnswer(answers, itemKey('h3.', i));
    entries.push({
      id: `h3.${String(i)}`,
      correct: given === item.answer,
      question: `T3.${String(i + 1)} ${item.statement}`,
      given: boolLabel(given),
      expected: item.answer ? RICHTIG : FALSCH,
      transcript: item.audio
    });
  });

  hoeren.teil4.questions.forEach((question, i) => {
    const given = numberAnswer(answers, itemKey('h4.', i));
    entries.push({
      id: `h4.${String(i)}`,
      correct: given === question.answer,
      question: `T4.${String(i + 1)} ${question.frage}`,
      given: optionLabel(question.options, given),
      expected: question.options[question.answer] ?? ''
    });
  });

  hoeren.teil5.gaps.forEach((gap, i) => {
    const given = textAnswer(answers, itemKey('h5.', i));
    entries.push({
      id: `h5.${String(i)}`,
      correct: isGapCorrect(gap, given),
      question: `T5.${String(i + 1)} ${gap.label.replace('____', '______')}`,
      given: given || null,
      expected: gap.answer
    });
  });

  return {
    module: 'hoeren',
    heading: `Hören — ${String(attempt.scores.hoeren ?? 0)}/60`,
    entries,
    transcripts: [hoeren.teil4.audio, hoeren.teil5.audio]
  };
};

/** Every auto-scored section of an attempt, ready to render. */
export const buildReviewSections = (exam: Exam, attempt: Attempt): readonly ReviewSection[] => {
  const includes = (module: ExamModule): boolean => attempt.mode === 'full' || attempt.mode === module;
  const sections: ReviewSection[] = [];

  if (includes('lesen')) sections.push(buildLesen(exam, attempt));
  if (includes('sprachbausteine')) {
    const section = buildSprachbausteine(exam, attempt);
    if (section) sections.push(section);
  }
  if (includes('hoeren')) sections.push(buildHoeren(exam, attempt));

  return sections;
};

export const attemptIncludes = (attempt: Attempt, module: ExamModule): boolean =>
  attempt.mode === 'full' || attempt.mode === module;
