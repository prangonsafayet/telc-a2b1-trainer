import { booleanAnswer, numberAnswer } from '@shared/lib/answers.ts';
import { LETTERS } from '@shared/lib/format.ts';
import {
  type AnswerMap,
  type AudioScript,
  type ExamModule,
  type TelcAttempt,
  type TelcExam
} from '@shared/types';

/** One reviewable item: what was asked, what was given, what was right. */
export interface TelcReviewRow {
  readonly label: string;
  readonly prompt: string;
  readonly given: string;
  readonly expected: string;
  readonly correct: boolean;
  readonly audio?: AudioScript;
}

export interface TelcReviewSection {
  readonly module: ExamModule;
  readonly title: string;
  readonly rows: readonly TelcReviewRow[];
}

const letter = (index: number | undefined): string =>
  index == null ? '—' : (LETTERS[index] ?? String(index + 1));

const boolLabel = (value: boolean | undefined): string =>
  value == null ? '—' : value ? 'richtig' : 'falsch';

const lesenRows = (exam: TelcExam, answers: AnswerMap): readonly TelcReviewRow[] => {
  const { teil1, teil2, teil3 } = exam.lesen;
  return [
    ...teil1.answers.map<TelcReviewRow>((expected, index) => {
      const given = numberAnswer(answers, `l1.${String(index)}`);
      return {
        label: `Teil 1 · Text ${String(index + 1)}`,
        prompt: teil1.texts[index] ?? '',
        given: `${letter(given)}) ${given != null ? (teil1.headlines[given] ?? '') : ''}`,
        expected: `${letter(expected)}) ${teil1.headlines[expected] ?? ''}`,
        correct: given === expected
      };
    }),
    ...teil2.questions.map<TelcReviewRow>((question, index) => {
      const given = numberAnswer(answers, `l2.${String(index)}`);
      return {
        label: `Teil 2 · ${String(index + 1)}`,
        prompt: question.frage,
        given: given != null ? `${letter(given)}) ${question.options[given] ?? ''}` : '—',
        expected: `${letter(question.answer)}) ${question.options[question.answer] ?? ''}`,
        correct: given === question.answer
      };
    }),
    ...teil3.answers.map<TelcReviewRow>((expected, index) => {
      const given = numberAnswer(answers, `l3.${String(index)}`);
      return {
        label: `Teil 3 · ${String(index + 1)}`,
        prompt: teil3.situations[index] ?? '',
        given: `${letter(given)}) ${given != null ? (teil3.ads[given] ?? '') : ''}`,
        expected: `${letter(expected)}) ${teil3.ads[expected] ?? ''}`,
        correct: given === expected
      };
    })
  ];
};

const sprachbausteineRows = (exam: TelcExam, answers: AnswerMap): readonly TelcReviewRow[] => {
  const { teil1, teil2 } = exam.sprachbausteine;
  return [
    ...teil1.gaps.map<TelcReviewRow>((gap, index) => {
      const given = numberAnswer(answers, `s1.${String(index)}`);
      return {
        label: `Teil 1 · Lücke ${String(index + 1)}`,
        prompt: '',
        given: given != null ? (gap.options[given] ?? '—') : '—',
        expected: gap.options[gap.answer] ?? '',
        correct: given === gap.answer
      };
    }),
    ...teil2.answers.map<TelcReviewRow>((expected, index) => {
      const given = numberAnswer(answers, `s2.${String(index)}`);
      return {
        label: `Teil 2 · Lücke ${String(index + 1)}`,
        prompt: '',
        given: given != null ? (teil2.wordBank[given] ?? '—') : '—',
        expected: teil2.wordBank[expected] ?? '',
        correct: given === expected
      };
    })
  ];
};

const hoerenRows = (exam: TelcExam, answers: AnswerMap): readonly TelcReviewRow[] => {
  const { teil1, teil2, teil3 } = exam.hoeren;
  return [
    ...teil1.items.map<TelcReviewRow>((item, index) => {
      const given = booleanAnswer(answers, `h1.${String(index)}`);
      return {
        label: `Teil 1 · ${String(index + 1)}`,
        prompt: item.statement,
        given: boolLabel(given),
        expected: boolLabel(item.answer),
        correct: given === item.answer,
        audio: item.audio
      };
    }),
    ...teil2.statements.map<TelcReviewRow>((item, index) => {
      const given = booleanAnswer(answers, `h2.${String(index)}`);
      return {
        label: `Teil 2 · ${String(index + 1)}`,
        prompt: item.statement,
        given: boolLabel(given),
        expected: boolLabel(item.answer),
        correct: given === item.answer,
        ...(index === 0 ? { audio: teil2.audio } : {})
      };
    }),
    ...teil3.items.map<TelcReviewRow>((item, index) => {
      const given = booleanAnswer(answers, `h3.${String(index)}`);
      return {
        label: `Teil 3 · ${String(index + 1)}`,
        prompt: item.statement,
        given: boolLabel(given),
        expected: boolLabel(item.answer),
        correct: given === item.answer,
        audio: item.audio
      };
    })
  ];
};

/** Every objectively-scored item of an attempt, grouped by module, in exam order. */
export const buildTelcReviewSections = (
  exam: TelcExam,
  attempt: TelcAttempt
): readonly TelcReviewSection[] => {
  const include = (module: ExamModule): boolean => attempt.mode === 'full' || attempt.mode === module;

  const sections: TelcReviewSection[] = [];
  if (include('lesen'))
    sections.push({ module: 'lesen', title: 'Leseverstehen', rows: lesenRows(exam, attempt.answers) });
  if (include('sprachbausteine'))
    sections.push({
      module: 'sprachbausteine',
      title: 'Sprachbausteine',
      rows: sprachbausteineRows(exam, attempt.answers)
    });
  if (include('hoeren'))
    sections.push({ module: 'hoeren', title: 'Hörverstehen', rows: hoerenRows(exam, attempt.answers) });
  return sections;
};
