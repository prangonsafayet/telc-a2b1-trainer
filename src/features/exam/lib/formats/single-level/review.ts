/**
 * Every objectively-marked item of a telc B1/B2 attempt, turned into review rows. Same row
 * and section types as the A2·B1 builder next door; the Teile they walk are different.
 */

import { SINGLE_LEVEL_MODULE_META, SINGLE_LEVEL_SECTION_MAX } from '@shared/config/singleLevelExam.ts';
import { booleanAnswer, itemKey, numberAnswer } from '@shared/lib/answers.ts';
import { LETTERS } from '@shared/lib/format.ts';
import {
  type AnswerMap,
  type ExamModule,
  type SingleLevelAttempt,
  type SingleLevelExam
} from '@shared/types';

import { attemptIncludes } from '@features/exam/lib/attemptMode.ts';
import { type ReviewRow, type ReviewSection } from '@features/exam/types/examFormat.ts';

const letter = (index: number | undefined): string =>
  index == null ? '—' : (LETTERS[index] ?? String(index + 1));

const boolLabel = (value: boolean | undefined): string | null =>
  value == null ? null : value ? 'richtig' : 'falsch';

const teilLabel = (teil: number, index: number): string => `Teil ${String(teil)} · ${String(index + 1)}`;

const lesenRows = (exam: SingleLevelExam, answers: AnswerMap): readonly ReviewRow[] => {
  const { teil1, teil2, teil3 } = exam.lesen;
  return [
    ...teil1.answers.map<ReviewRow>((expected, index) => {
      const given = numberAnswer(answers, itemKey('l1.', index));
      return {
        id: itemKey('l1.', index),
        label: `Teil 1 · Text ${String(index + 1)}`,
        prompt: teil1.texts[index] ?? '',
        given: given == null ? null : `${letter(given)}) ${teil1.headlines[given] ?? ''}`,
        expected: `${letter(expected)}) ${teil1.headlines[expected] ?? ''}`,
        correct: given === expected
      };
    }),
    ...teil2.questions.map<ReviewRow>((question, index) => {
      const given = numberAnswer(answers, itemKey('l2.', index));
      return {
        id: itemKey('l2.', index),
        label: teilLabel(2, index),
        prompt: question.frage,
        given: given == null ? null : `${letter(given)}) ${question.options[given] ?? ''}`,
        expected: `${letter(question.answer)}) ${question.options[question.answer] ?? ''}`,
        correct: given === question.answer
      };
    }),
    ...teil3.answers.map<ReviewRow>((expected, index) => {
      const given = numberAnswer(answers, itemKey('l3.', index));
      return {
        id: itemKey('l3.', index),
        label: teilLabel(3, index),
        prompt: teil3.situations[index] ?? '',
        given: given == null ? null : `${letter(given)}) ${teil3.ads[given] ?? ''}`,
        expected: `${letter(expected)}) ${teil3.ads[expected] ?? ''}`,
        correct: given === expected
      };
    })
  ];
};

const sprachbausteineRows = (exam: SingleLevelExam, answers: AnswerMap): readonly ReviewRow[] => {
  const { teil1, teil2 } = exam.sprachbausteine;
  return [
    ...teil1.gaps.map<ReviewRow>((gap, index) => {
      const given = numberAnswer(answers, itemKey('s1.', index));
      return {
        id: itemKey('s1.', index),
        label: `Teil 1 · Lücke ${String(index + 1)}`,
        prompt: '',
        given: given == null ? null : (gap.options[given] ?? null),
        expected: gap.options[gap.answer] ?? '',
        correct: given === gap.answer
      };
    }),
    ...teil2.answers.map<ReviewRow>((expected, index) => {
      const given = numberAnswer(answers, itemKey('s2.', index));
      return {
        id: itemKey('s2.', index),
        label: `Teil 2 · Lücke ${String(index + 1)}`,
        prompt: '',
        given: given == null ? null : (teil2.wordBank[given] ?? null),
        expected: teil2.wordBank[expected] ?? '',
        correct: given === expected
      };
    })
  ];
};

const hoerenRows = (exam: SingleLevelExam, answers: AnswerMap): readonly ReviewRow[] => {
  const { teil1, teil2, teil3 } = exam.hoeren;
  return [
    ...teil1.items.map<ReviewRow>((item, index) => {
      const given = booleanAnswer(answers, itemKey('h1.', index));
      return {
        id: itemKey('h1.', index),
        label: teilLabel(1, index),
        prompt: item.statement,
        given: boolLabel(given),
        expected: boolLabel(item.answer) ?? '',
        correct: given === item.answer,
        audio: item.audio
      };
    }),
    ...teil2.statements.map<ReviewRow>((item, index) => {
      const given = booleanAnswer(answers, itemKey('h2.', index));
      return {
        id: itemKey('h2.', index),
        label: teilLabel(2, index),
        prompt: item.statement,
        given: boolLabel(given),
        expected: boolLabel(item.answer) ?? '',
        correct: given === item.answer,
        /* One interview covers the whole Teil, so it is attached to the first row. */
        ...(index === 0 ? { audio: teil2.audio } : {})
      };
    }),
    ...teil3.items.map<ReviewRow>((item, index) => {
      const given = booleanAnswer(answers, itemKey('h3.', index));
      return {
        id: itemKey('h3.', index),
        label: teilLabel(3, index),
        prompt: item.statement,
        given: boolLabel(given),
        expected: boolLabel(item.answer) ?? '',
        correct: given === item.answer,
        audio: item.audio
      };
    })
  ];
};

const heading = (module: ExamModule, attempt: SingleLevelAttempt): string =>
  `${SINGLE_LEVEL_MODULE_META[module].name} — ${String(attempt.scores[module] ?? 0)}/${String(SINGLE_LEVEL_SECTION_MAX[module])}`;

/** Every objectively-marked item of an attempt, grouped by module, in exam order. */
export const buildReviewSections = (
  exam: SingleLevelExam,
  attempt: SingleLevelAttempt
): readonly ReviewSection[] => {
  const sections: ReviewSection[] = [];
  const { answers } = attempt;

  if (attemptIncludes(attempt.mode, 'lesen'))
    sections.push({ module: 'lesen', heading: heading('lesen', attempt), rows: lesenRows(exam, answers) });
  if (attemptIncludes(attempt.mode, 'sprachbausteine'))
    sections.push({
      module: 'sprachbausteine',
      heading: heading('sprachbausteine', attempt),
      rows: sprachbausteineRows(exam, answers)
    });
  if (attemptIncludes(attempt.mode, 'hoeren'))
    sections.push({ module: 'hoeren', heading: heading('hoeren', attempt), rows: hoerenRows(exam, answers) });

  return sections;
};
