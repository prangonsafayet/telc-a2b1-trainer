import { describe, expect, it } from 'vitest';

import { CASE_LABELS } from '@shared/config/studyCategories.ts';
import {
  type CaseItem,
  type NounEntry,
  type PrepVerbEntry,
  type StudyCategory,
  type VerbEntry,
  type VocabBank
} from '@shared/types';

import { buildQuiz, type QuizQuestion } from '@features/practice/lib/quiz.ts';

/*
 * `buildQuiz` generates every multiple-choice drill the practice hub shows, mixing five
 * different item shapes and two random branches (verbs and nouns each pick between a
 * meaning question and a form/article one). Nothing checked that the generated options
 * were ever well-formed, so a broken distractor pool or an off-by-one on `answer` would
 * have shipped silently.
 */

const REPEATS = 40;

/** A bank with enough distinct entries per category that distractor sampling has room to
 *  work, and every field distinct enough that a mix-up between entries cannot hide as a
 *  coincidental match. */
const buildBank = (size: number): VocabBank => ({
  verbs: Array.from({ length: size }, (_, i) => ({
    id: `v.${String(i)}`,
    de: `verb${String(i)}`,
    en: `verb${String(i)}-en`,
    example: { de: '', en: '' },
    praesens: `praesens${String(i)}`,
    praeteritum: `praeteritum${String(i)}`,
    perfekt: `perfekt${String(i)}`
  })),
  nouns: Array.from({ length: size }, (_, i) => ({
    id: `n.${String(i)}`,
    de: `noun${String(i)}`,
    en: `noun${String(i)}-en`,
    example: { de: '', en: '' },
    article: (['der', 'die', 'das'] as const)[i % 3] ?? 'der',
    plural: `plural${String(i)}`
  })),
  adjectives: Array.from({ length: size }, (_, i) => ({
    id: `a.${String(i)}`,
    de: `adj${String(i)}`,
    en: `adj${String(i)}-en`,
    example: { de: '', en: '' }
  })),
  prepVerbs: Array.from({ length: size }, (_, i) => ({
    id: `p.${String(i)}`,
    de: `prepverb${String(i)}`,
    en: `prepverb${String(i)}-en`,
    example: { de: '', en: '' },
    verb: `verb${String(i)}`,
    preposition: `prep${String(i)}`,
    kasus: (['akkusativ', 'dativ', 'genitiv'] as const)[i % 3] ?? 'akkusativ'
  })),
  caseItems: Array.from({ length: size }, (_, i) => ({
    id: `c.${String(i)}`,
    de: `case${String(i)}`,
    en: `case${String(i)}-en`,
    example: { de: '', en: '' },
    kasus: (['akkusativ', 'dativ', 'genitiv'] as const)[i % 3] ?? 'akkusativ',
    kind: 'praeposition' as const
  }))
});

const findEntry = (bank: VocabBank, category: StudyCategory, id: string) => {
  const pool =
    category === 'verbs'
      ? bank.verbs
      : category === 'nouns'
        ? bank.nouns
        : category === 'adjectives'
          ? bank.adjectives
          : category === 'prepVerbs'
            ? bank.prepVerbs
            : bank.caseItems;
  const entry = pool.find(item => item.id === id);
  if (!entry) throw new Error(`fixture missing id ${id} in ${category}`);
  return entry;
};

/** Every acceptable "correct" option string for an item, covering both random branches a
 *  verb or noun question can take. */
const acceptableCorrectValues = (category: StudyCategory, bank: VocabBank, id: string): readonly string[] => {
  const entry = findEntry(bank, category, id);
  if (category === 'verbs') {
    const verb = entry as VerbEntry;
    return [verb.en, verb.praeteritum, verb.perfekt];
  }
  if (category === 'nouns') {
    const noun = entry as NounEntry;
    return [noun.en, noun.article];
  }
  if (category === 'adjectives') return [entry.en];
  if (category === 'prepVerbs') {
    const prepVerb = entry as PrepVerbEntry;
    return [`${prepVerb.preposition} + ${CASE_LABELS[prepVerb.kasus]}`];
  }
  const caseItem = entry as CaseItem;
  return [CASE_LABELS[caseItem.kasus]];
};

const assertWellFormed = (question: QuizQuestion, bank: VocabBank): void => {
  /* Options are unique: this is at once "no distractor equals the answer" and "no two
     distractors collide with each other". */
  expect(new Set(question.options).size).toBe(question.options.length);

  expect(question.answer).toBeGreaterThanOrEqual(0);
  expect(question.answer).toBeLessThan(question.options.length);

  const chosen = question.options[question.answer];
  expect(chosen).toBeDefined();
  expect(acceptableCorrectValues(question.category, bank, question.id)).toContain(chosen);
};

describe('buildQuiz — well-formedness', () => {
  it('generates well-formed questions for every category, across many random draws', () => {
    const bank = buildBank(8);
    for (let trial = 0; trial < REPEATS; trial += 1) {
      for (const category of ['verbs', 'nouns', 'adjectives', 'prepVerbs', 'caseItems'] as const) {
        const quiz = buildQuiz(bank, category, 8);
        expect(quiz.length).toBeGreaterThan(0);
        for (const question of quiz) {
          expect(question.category).toBe(category);
          assertWellFormed(question, bank);
        }
      }
    }
  });

  it('generates well-formed questions for the mixed category too', () => {
    const bank = buildBank(8);
    for (let trial = 0; trial < REPEATS; trial += 1) {
      const quiz = buildQuiz(bank, 'mixed', 15);
      for (const question of quiz) assertWellFormed(question, bank);
    }
  });

  it('never returns more questions than requested', () => {
    const bank = buildBank(8);
    expect(buildQuiz(bank, 'verbs', 3)).toHaveLength(3);
    expect(buildQuiz(bank, 'mixed', 5)).toHaveLength(5);
  });

  it('prefers the given ids before filling the rest', () => {
    const bank = buildBank(8);
    const quiz = buildQuiz(bank, 'verbs', 2, ['v.5']);
    expect(quiz.map(q => q.id)).toContain('v.5');
  });
});

describe('buildQuiz — degrading rather than throwing', () => {
  it('returns nothing for an empty category rather than throwing', () => {
    const bank = buildBank(0);
    expect(() => buildQuiz(bank, 'verbs', 10)).not.toThrow();
    expect(buildQuiz(bank, 'verbs', 10)).toEqual([]);
  });

  it('returns an empty-category-free set for a mixed bank with one empty category', () => {
    const bank = { ...buildBank(8), caseItems: [] };
    expect(() => buildQuiz(bank, 'mixed', 40)).not.toThrow();
    const quiz = buildQuiz(bank, 'mixed', 40);
    expect(quiz.some(q => q.category === 'caseItems')).toBe(false);
    for (const question of quiz) assertWellFormed(question, bank);
  });

  it('still returns a well-formed question with only one item in the category (no distractors)', () => {
    const bank = buildBank(1);
    for (let trial = 0; trial < REPEATS; trial += 1) {
      const quiz = buildQuiz(bank, 'verbs', 5);
      expect(quiz).toHaveLength(1);
      assertWellFormed(quiz[0] as QuizQuestion, bank);
    }
  });

  it('asking for more than exists returns only what exists, not padded or duplicated', () => {
    const bank = buildBank(3);
    const quiz = buildQuiz(bank, 'adjectives', 50);
    expect(quiz).toHaveLength(3);
    expect(new Set(quiz.map(q => q.id)).size).toBe(3);
  });
});
