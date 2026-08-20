/** The study categories a vocabulary bank offers, and how they are labelled. */

import { type GermanCase, type StudyCategory } from '@shared/types';

export interface CategoryMeta {
  readonly label: string;
  readonly labelDe: string;
  readonly description: string;
}

/** In display order. */
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
