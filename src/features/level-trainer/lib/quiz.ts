import { type NounEntry, type StudyCategory, type VerbEntry, type VocabBank } from '@shared/types';

import { CASE_LABELS } from './studyItems.ts';

/** One generated multiple-choice drill item. `id` is the SRS key it feeds. */
export interface QuizQuestion {
  readonly id: string;
  readonly category: StudyCategory;
  readonly prompt: string;
  /** Extra context under the prompt, e.g. the English meaning. */
  readonly hint: string;
  readonly options: readonly string[];
  readonly answer: number;
  /** Shown after answering, with the English meaning. */
  readonly explanation: string;
}

const shuffle = <T>(items: readonly T[]): readonly T[] => {
  const out = [...items];
  for (let index = out.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    const a = out[index];
    const b = out[other];
    if (a !== undefined && b !== undefined) {
      out[index] = b;
      out[other] = a;
    }
  }
  return out;
};

const sample = <T>(items: readonly T[], count: number): readonly T[] => shuffle(items).slice(0, count);

/** Builds options from the right answer plus distractors, returning the answer index. */
const withDistractors = (
  correct: string,
  distractors: readonly string[]
): { readonly options: readonly string[]; readonly answer: number } => {
  const unique = [...new Set(distractors.filter(option => option !== correct))].slice(0, 3);
  const options = shuffle([correct, ...unique]);
  return { options, answer: options.indexOf(correct) };
};

const meaningQuestion = (
  entry: { readonly id: string; readonly de: string; readonly en: string },
  pool: readonly string[],
  category: StudyCategory,
  prefix = ''
): QuizQuestion => {
  const { options, answer } = withDistractors(entry.en, sample(pool, 6));
  return {
    id: entry.id,
    category,
    prompt: `Was bedeutet „${prefix}${entry.de}“?`,
    hint: 'Pick the English meaning.',
    options,
    answer,
    explanation: `${prefix}${entry.de} = ${entry.en}`
  };
};

const articleQuestion = (entry: NounEntry): QuizQuestion => {
  const options = ['der', 'die', 'das'] as const;
  return {
    id: entry.id,
    category: 'nouns',
    prompt: `___ ${entry.de} (${entry.en})`,
    hint: 'Pick the article.',
    options,
    answer: options.indexOf(entry.article),
    explanation: `${entry.article} ${entry.de}, ${entry.plural} — ${entry.en}`
  };
};

const verbFormQuestion = (entry: VerbEntry, verbs: readonly VerbEntry[]): QuizQuestion => {
  const tense = Math.random() < 0.5 ? 'praeteritum' : 'perfekt';
  const correct = tense === 'praeteritum' ? entry.praeteritum : entry.perfekt;
  const pool = verbs.map(verb => (tense === 'praeteritum' ? verb.praeteritum : verb.perfekt));
  const { options, answer } = withDistractors(correct, sample(pool, 6));
  return {
    id: entry.id,
    category: 'verbs',
    prompt: `${tense === 'praeteritum' ? 'Präteritum' : 'Perfekt'} von „${entry.de}“ (${entry.en})?`,
    hint: `Präsens: ${entry.praesens}`,
    options,
    answer,
    explanation: `${entry.de}: ${entry.praesens} · ${entry.praeteritum} · ${entry.perfekt} — ${entry.en}`
  };
};

const prepVerbQuestion = (bank: VocabBank, index: number): QuizQuestion | null => {
  const entry = bank.prepVerbs[index];
  if (!entry) return null;
  const correct = `${entry.preposition} + ${CASE_LABELS[entry.kasus]}`;
  const pool = bank.prepVerbs.map(other => `${other.preposition} + ${CASE_LABELS[other.kasus]}`);
  const { options, answer } = withDistractors(correct, sample(pool, 8));
  return {
    id: entry.id,
    category: 'prepVerbs',
    prompt: `${entry.verb} ___ ? (${entry.en})`,
    hint: entry.example.de,
    options,
    answer,
    explanation: `${entry.de} — ${entry.en}. „${entry.example.de}“ (${entry.example.en})`
  };
};

const caseQuestion = (bank: VocabBank, index: number): QuizQuestion | null => {
  const entry = bank.caseItems[index];
  if (!entry) return null;
  const options = ['Akkusativ', 'Dativ', 'Genitiv'] as const;
  return {
    id: entry.id,
    category: 'caseItems',
    prompt: `Welcher Kasus? „${entry.de}“`,
    hint: `${entry.en} — ${entry.example.de.replace(/\b\S+\b/, '…')}`,
    options,
    answer: options.indexOf(CASE_LABELS[entry.kasus] as (typeof options)[number]),
    explanation: `${entry.de} → ${CASE_LABELS[entry.kasus]}. „${entry.example.de}“ (${entry.example.en})`
  };
};

/** A drill of `count` questions for one category, or a mixed one across all of them. */
export const buildQuiz = (
  bank: VocabBank,
  category: StudyCategory | 'mixed',
  count: number,
  /** Prefer these item ids (the due/weak ones) before random fill. */
  preferIds: readonly string[] = []
): readonly QuizQuestion[] => {
  const enPool = {
    verbs: bank.verbs.map(entry => entry.en),
    nouns: bank.nouns.map(entry => entry.en),
    adjectives: bank.adjectives.map(entry => entry.en)
  };

  const generators: Readonly<Record<StudyCategory, (index: number) => QuizQuestion | null>> = {
    verbs: index => {
      const entry = bank.verbs[index];
      if (!entry) return null;
      return Math.random() < 0.5
        ? verbFormQuestion(entry, bank.verbs)
        : meaningQuestion(entry, enPool.verbs, 'verbs');
    },
    nouns: index => {
      const entry = bank.nouns[index];
      if (!entry) return null;
      return Math.random() < 0.5 ? articleQuestion(entry) : meaningQuestion(entry, enPool.nouns, 'nouns');
    },
    adjectives: index => {
      const entry = bank.adjectives[index];
      if (!entry) return null;
      return meaningQuestion(entry, enPool.adjectives, 'adjectives');
    },
    prepVerbs: index => prepVerbQuestion(bank, index),
    caseItems: index => caseQuestion(bank, index)
  };

  const lengths: Readonly<Record<StudyCategory, number>> = {
    verbs: bank.verbs.length,
    nouns: bank.nouns.length,
    adjectives: bank.adjectives.length,
    prepVerbs: bank.prepVerbs.length,
    caseItems: bank.caseItems.length
  };

  const categories: readonly StudyCategory[] =
    category === 'mixed' ? ['verbs', 'nouns', 'adjectives', 'prepVerbs', 'caseItems'] : [category];

  /* Index every candidate (category, position) pair, preferred ids first. */
  const candidates = categories.flatMap(cat =>
    Array.from({ length: lengths[cat] }, (_, index) => ({ cat, index }))
  );
  const preferred = new Set(preferIds);
  const idAt = (cat: StudyCategory, index: number): string => {
    const entry =
      cat === 'verbs'
        ? bank.verbs[index]
        : cat === 'nouns'
          ? bank.nouns[index]
          : cat === 'adjectives'
            ? bank.adjectives[index]
            : cat === 'prepVerbs'
              ? bank.prepVerbs[index]
              : bank.caseItems[index];
    return entry?.id ?? '';
  };
  const due = shuffle(candidates.filter(({ cat, index }) => preferred.has(idAt(cat, index))));
  const rest = shuffle(candidates.filter(({ cat, index }) => !preferred.has(idAt(cat, index))));

  return [...due, ...rest]
    .slice(0, count)
    .map(({ cat, index }) => generators[cat](index))
    .filter((question): question is QuizQuestion => question !== null);
};
