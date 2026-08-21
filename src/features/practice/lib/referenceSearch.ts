import { caseGroups } from '@shared/lib/studyItems.ts';
import {
  type AdjectiveEntry,
  type CaseItem,
  type GermanCase,
  type NounEntry,
  type PrepVerbEntry,
  type VerbEntry,
  type VocabBank
} from '@shared/types';

/** One case's triggers, as the reference tables group them. */
export interface CaseGroup {
  readonly kasus: GermanCase;
  /** The triggers this search matches. */
  readonly items: readonly CaseItem[];
  /** How many the bank holds for this case, search or no search — what the heading counts. */
  readonly total: number;
}

/** A bank narrowed to what a search matches, ready to render table by table. */
export interface FilteredBank {
  readonly verbs: readonly VerbEntry[];
  readonly nouns: readonly NounEntry[];
  readonly adjectives: readonly AdjectiveEntry[];
  readonly prepVerbs: readonly PrepVerbEntry[];
  readonly cases: readonly CaseGroup[];
}

/**
 * An empty query matches everything — the reference tables open unfiltered — and a
 * non-empty one matches on a substring, case-insensitively.
 */
const matches = (query: string, ...fields: readonly (string | undefined)[]): boolean =>
  query === '' || fields.some(field => field?.toLowerCase().includes(query) === true);

/**
 * Every reference table's rows for one search, derived in one place.
 *
 * Which fields a table searches differs per table — a verb is findable by its Perfekt, a
 * verb+preposition pair by its example sentence — and those five decisions were five inline
 * `.filter()` chains inside the component, where nothing could test them.
 */
export const filterBank = (bank: VocabBank, search: string): FilteredBank => {
  const query = search.trim().toLowerCase();
  return {
    verbs: bank.verbs.filter(entry => matches(query, entry.de, entry.en, entry.perfekt)),
    nouns: bank.nouns.filter(entry => matches(query, entry.de, entry.en)),
    adjectives: bank.adjectives.filter(entry => matches(query, entry.de, entry.en)),
    prepVerbs: bank.prepVerbs.filter(entry => matches(query, entry.de, entry.en, entry.example.de)),
    /* Grouped first, then filtered, so a case with no match still shows its heading and an
       empty table rather than vanishing from the tab. */
    cases: caseGroups(bank.caseItems).map(group => ({
      kasus: group.kasus,
      items: group.items.filter(entry => matches(query, entry.de, entry.en, entry.example.de)),
      total: group.items.length
    }))
  };
};
