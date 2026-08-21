import { describe, expect, it } from 'vitest';

import { findPhrases, germanStem, germanWords, normalizeGerman } from '@shared/lib/germanText.ts';

describe('normalizeGerman', () => {
  it('folds umlauts and ß the way German itself does', () => {
    expect(normalizeGerman('Grüße')).toBe('gruesse');
    expect(normalizeGerman('Ärztin über Öl')).toBe('aerztin ueber oel');
  });

  it('folds a decomposed umlaut too', () => {
    /* `a` + U+0308 renders as "ä" and is two characters to `replaceAll`, so without the
       NFC pass first this would fold to "marz" while the composed form folds to "maerz". */
    expect(normalizeGerman('Ma\u0308rz')).toBe('maerz');
    expect(normalizeGerman('März')).toBe('maerz');
  });

  it('drops a loanword accent instead of leaving the tokeniser to split on it', () => {
    expect(normalizeGerman('Digital-Café')).toBe('digital-cafe');
    expect(germanWords('Digital-Café')).toEqual(['digital', 'cafe']);
  });
});

describe('germanWords', () => {
  it('splits on punctuation and keeps nothing empty', () => {
    expect(germanWords('Hallo, Anna! Wie geht es dir?')).toEqual([
      'hallo',
      'anna',
      'wie',
      'geht',
      'es',
      'dir'
    ]);
    expect(germanWords('   ')).toEqual([]);
  });
});

describe('germanStem', () => {
  it('trims the ending German inflection adds most often', () => {
    expect(germanStem('ausfluegen')).toBe('ausflueg');
    expect(germanStem('beste')).toBe('best');
  });

  it('leaves a word alone rather than trimming it below three letters', () => {
    expect(germanStem('das')).toBe('das');
    expect(germanStem('die')).toBe('die');
  });
});

describe('findPhrases', () => {
  it('matches whole words, not substrings', () => {
    const words = germanWords('Also war das falsch, denn dennoch ist kein Konnektor.');
    expect(findPhrases(words, ['als', 'denn']).map(match => match.phrase)).toEqual(['denn']);
  });

  it('matches a multi-word phrase as one unit and reports where it starts', () => {
    const words = germanWords('Ich nehme zum Beispiel den Bus.');
    expect(findPhrases(words, ['zum beispiel'])).toEqual([{ phrase: 'zum beispiel', at: 2 }]);
  });

  it('reports every occurrence, so a caller can judge by position', () => {
    const words = germanWords('Liebe Anna, ... Liebe Grüße');
    expect(findPhrases(words, ['liebe']).map(match => match.at)).toEqual([0, 2]);
  });
});
