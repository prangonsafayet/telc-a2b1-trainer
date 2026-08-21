/**
 * One flashcard-able view of a vocabulary bank, whatever its category. Shared because both
 * the dashboards (mastery counts) and the practice hub (the cards themselves) read it.
 */

import { CASE_LABELS, STUDY_CATEGORIES } from '@shared/config/studyCategories.ts';
import {
  type CaseItem,
  type GermanCase,
  type StudyCard,
  type StudyCategory,
  type VocabBank
} from '@shared/types';

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
