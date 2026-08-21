import { describe, expect, it } from 'vitest';

import { filterBank } from '@features/practice/lib/referenceSearch.ts';
import { CASE_BADGE, CASE_LABELS } from '@shared/config/studyCategories.ts';
import { type GermanCase, type VocabBank } from '@shared/types';

/*
 * These five filters were inline `.filter()` chains inside `ReferenceTables`, where nothing
 * could reach them — and they are not the same filter: a verb is findable by its Perfekt and
 * a verb+preposition pair by its example sentence, but a noun is findable by neither.
 */

const example = (de: string) => ({ de, en: `${de} (en)` });

const BANK: VocabBank = {
  verbs: [
    {
      id: 'v.1',
      de: 'nehmen',
      en: 'to take',
      praesens: 'nimmt',
      praeteritum: 'nahm',
      perfekt: 'hat genommen',
      example: example('Ich nehme den Bus.')
    },
    {
      id: 'v.2',
      de: 'fahren',
      en: 'to drive',
      praesens: 'fährt',
      praeteritum: 'fuhr',
      perfekt: 'ist gefahren',
      example: example('Wir fahren nach Bonn.')
    }
  ],
  nouns: [
    {
      id: 'n.1',
      de: 'Haus',
      en: 'house',
      article: 'das',
      plural: 'die Häuser',
      example: example('Das Haus ist alt.')
    }
  ],
  adjectives: [
    {
      id: 'a.1',
      de: 'hoch',
      en: 'high',
      komparativ: 'höher',
      superlativ: 'am höchsten',
      example: example('Der Turm ist hoch.')
    },
    { id: 'a.2', de: 'schnell', en: 'fast', example: example('Der Zug ist schnell.') }
  ],
  prepVerbs: [
    {
      id: 'p.1',
      de: 'warten auf',
      en: 'to wait for',
      verb: 'warten',
      preposition: 'auf',
      kasus: 'akkusativ',
      example: example('Ich warte auf den Zug.')
    }
  ],
  caseItems: [
    {
      id: 'c.1',
      de: 'für',
      en: 'for',
      kasus: 'akkusativ',
      kind: 'praeposition',
      example: example('Das ist für dich.')
    },
    {
      id: 'c.2',
      de: 'mit',
      en: 'with',
      kasus: 'dativ',
      kind: 'praeposition',
      example: example('Ich komme mit dir.')
    },
    {
      id: 'c.3',
      de: 'wegen',
      en: 'because of',
      kasus: 'genitiv',
      kind: 'praeposition',
      example: example('Wegen des Regens.')
    }
  ]
};

describe('filterBank', () => {
  it('returns the whole bank for an empty or blank query', () => {
    for (const query of ['', '   ']) {
      const rows = filterBank(BANK, query);
      expect(rows.verbs).toHaveLength(BANK.verbs.length);
      expect(rows.nouns).toHaveLength(BANK.nouns.length);
      expect(rows.adjectives).toHaveLength(BANK.adjectives.length);
      expect(rows.prepVerbs).toHaveLength(BANK.prepVerbs.length);
      expect(rows.cases.flatMap(group => group.items)).toHaveLength(BANK.caseItems.length);
    }
  });

  it('matches German and English, case-insensitively and on substrings', () => {
    expect(filterBank(BANK, 'NEHM').verbs.map(entry => entry.id)).toEqual(['v.1']);
    expect(filterBank(BANK, 'house').nouns.map(entry => entry.id)).toEqual(['n.1']);
    expect(filterBank(BANK, 'HOCH').adjectives.map(entry => entry.id)).toEqual(['a.1']);
  });

  it('finds a verb by its Perfekt — the form a learner is usually looking up', () => {
    expect(filterBank(BANK, 'ist gefahren').verbs.map(entry => entry.id)).toEqual(['v.2']);
  });

  it('finds a verb+preposition pair and a case trigger by their example sentence', () => {
    expect(filterBank(BANK, 'auf den Zug').prepVerbs.map(entry => entry.id)).toEqual(['p.1']);
    expect(filterBank(BANK, 'des Regens').cases.flatMap(group => group.items.map(item => item.id))).toEqual([
      'c.3'
    ]);
  });

  it('does not match a noun by a field its table never shows a search for', () => {
    /* `plural` and `article` are rendered but not searched — asserted so the difference is
       deliberate rather than an oversight nobody can see. */
    expect(filterBank(BANK, 'Häuser').nouns).toEqual([]);
    expect(filterBank(BANK, 'das Haus ist').nouns).toEqual([]);
  });

  it('matches nothing for a query in the bank', () => {
    const rows = filterBank(BANK, 'zzz');
    expect(rows.verbs).toEqual([]);
    expect(rows.cases.flatMap(group => group.items)).toEqual([]);
  });

  it('keeps every case group, in order, even when a group matches nothing', () => {
    const rows = filterBank(BANK, 'für');
    expect(rows.cases.map(group => group.kasus)).toEqual(['akkusativ', 'dativ', 'genitiv']);
    expect(rows.cases.map(group => group.items.length)).toEqual([1, 0, 0]);
    /* The heading counts what the bank holds, not what the search matched — it said
       "30 triggers" before the filter moved out of the component and must still. */
    expect(rows.cases.map(group => group.total)).toEqual([1, 1, 1]);
  });
});

/* `CASE_BADGE` lived in the component with a `?? 'secondary'` fallback; it now sits beside
   `CASE_LABELS` and is exhaustive, so no call site needs one. */
describe('the case chips', () => {
  const CASES: readonly GermanCase[] = ['akkusativ', 'dativ', 'genitiv'];

  it('gives every case a label and a distinct tone', () => {
    for (const kasus of CASES) {
      expect(CASE_LABELS[kasus]).toBeTruthy();
      expect(CASE_BADGE[kasus]).toBeTruthy();
    }
    expect(new Set(CASES.map(kasus => CASE_BADGE[kasus])).size).toBe(CASES.length);
  });
});
