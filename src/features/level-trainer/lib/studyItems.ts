import {
  type CaseItem,
  type GermanCase,
  type StudyCategory,
  type VocabBank,
  type VocabExample
} from '@shared/types';

/** One flashcard-able view of any bank entry, whatever its category. */
export interface StudyCard {
  readonly id: string;
  readonly category: StudyCategory;
  /** German side. */
  readonly front: string;
  /** Forms, article + plural, preposition + case — the grammar payload. */
  readonly frontDetail: string;
  /** English side. */
  readonly back: string;
  readonly example: VocabExample;
}

export interface CategoryMeta {
  readonly label: string;
  readonly labelDe: string;
  readonly description: string;
}

export const STUDY_CATEGORIES: readonly StudyCategory[] = [
  'verbs',
  'nouns',
  'adjectives',
  'prepVerbs',
  'caseItems'
];

export const CATEGORY_META: Readonly<Record<StudyCategory, CategoryMeta>> = {
  verbs: {
    label: 'Verbs',
    labelDe: 'Verben',
    description: 'Präsens, Präteritum and Perfekt of every verb, with English meanings.'
  },
  nouns: {
    label: 'Nouns',
    labelDe: 'Nomen',
    description: 'Article and plural of every noun, with English meanings.'
  },
  adjectives: {
    label: 'Adjectives',
    labelDe: 'Adjektive',
    description: 'Comparative and superlative forms, with English meanings.'
  },
  prepVerbs: {
    label: 'Verbs + preposition',
    labelDe: 'Verben mit Präposition',
    description: 'Fixed verb–preposition pairs and the case each one governs.'
  },
  caseItems: {
    label: 'Cases (Akk · Dat · Gen)',
    labelDe: 'Kasus',
    description: 'Prepositions, verbs and phrases that govern Akkusativ, Dativ or Genitiv.'
  }
};

export const CASE_LABELS: Readonly<Record<GermanCase, string>> = {
  akkusativ: 'Akkusativ',
  dativ: 'Dativ',
  genitiv: 'Genitiv'
};

/** All cards of one category, in authored order. */
export const cardsFor = (bank: VocabBank, category: StudyCategory): readonly StudyCard[] => {
  switch (category) {
    case 'verbs':
      return bank.verbs.map(entry => ({
        id: entry.id,
        category,
        front: entry.de,
        frontDetail: `${entry.praesens} · ${entry.praeteritum} · ${entry.perfekt}`,
        back: entry.en,
        example: entry.example
      }));
    case 'nouns':
      return bank.nouns.map(entry => ({
        id: entry.id,
        category,
        front: `${entry.article} ${entry.de}`,
        frontDetail: `Plural: ${entry.plural}`,
        back: entry.en,
        example: entry.example
      }));
    case 'adjectives':
      return bank.adjectives.map(entry => ({
        id: entry.id,
        category,
        front: entry.de,
        frontDetail: entry.komparativ && entry.superlativ ? `${entry.komparativ} · ${entry.superlativ}` : '',
        back: entry.en,
        example: entry.example
      }));
    case 'prepVerbs':
      return bank.prepVerbs.map(entry => ({
        id: entry.id,
        category,
        front: entry.de,
        frontDetail: `${entry.preposition} + ${CASE_LABELS[entry.kasus]}`,
        back: entry.en,
        example: entry.example
      }));
    case 'caseItems':
      return bank.caseItems.map(entry => ({
        id: entry.id,
        category,
        front: entry.de,
        frontDetail: CASE_LABELS[entry.kasus],
        back: entry.en,
        example: entry.example
      }));
  }
};

/** Every card of the bank, all categories. */
export const allCards = (bank: VocabBank): readonly StudyCard[] =>
  STUDY_CATEGORIES.flatMap(category => cardsFor(bank, category));

/** Item ids of one category. */
export const idsFor = (bank: VocabBank, category: StudyCategory): readonly string[] =>
  cardsFor(bank, category).map(card => card.id);

/** Case items grouped for the reference table, in Akk → Dat → Gen order. */
export const caseGroups = (
  items: readonly CaseItem[]
): readonly { readonly kasus: GermanCase; readonly items: readonly CaseItem[] }[] =>
  (['akkusativ', 'dativ', 'genitiv'] as const).map(kasus => ({
    kasus,
    items: items.filter(item => item.kasus === kasus)
  }));
