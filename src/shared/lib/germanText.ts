/** Text handling that has to know about German, kept in one place. */

/** Below this, a stripped ending leaves too little word to be worth comparing. */
const MIN_STEM_LENGTH = 3;

/** The endings German inflection adds most often, longest first so `-en` wins over `-n`. */
const INFLECTION_ENDING = /(?:en|em|er|es|e|n|s)$/u;

/**
 * ASCII-folds umlauts and ß and lowercases, so spelling variants compare equal.
 *
 * The German folds are spelled out (ä → ae, not ä → a) because that is the substitution
 * German itself uses when umlauts are unavailable, and a learner who types "Gruesse" for
 * "Grüße" must land on the same string. Composition is normalised first: an "ä" typed as
 * `a` + combining diaeresis is one character to a reader and two to `replaceAll`. Anything
 * still carrying a diacritic afterwards is a loanword — `src/content` authors
 * "Digital-Café" — so the mark is dropped rather than left for the tokeniser to split a
 * word on.
 */
export const normalizeGerman = (text: string): string =>
  text
    .normalize('NFC')
    .toLowerCase()
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue')
    .replaceAll('ß', 'ss')
    .normalize('NFD')
    .replace(/\p{Mn}+/gu, '');

/** Words, without punctuation, normalised. */
export const germanWords = (text: string): readonly string[] =>
  normalizeGerman(text)
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 0);

/**
 * Crude stem: trims the endings German inflection adds most often, but only while at least
 * three characters remain, so "das" does not become "da" and match half the language. Good
 * enough to match "Kleidung" against "Kleidungsstücke"; not a morphological analyser, and
 * not pretending to be — it over-trims ("Haus" → "Hau") and knows nothing of umlaut plurals
 * ("Häuser"). Every caller that matters treats a match as evidence for a *provisional*
 * verdict shown beside the learner's own.
 */
export const germanStem = (word: string): string => {
  const stem = word.replace(INFLECTION_ENDING, '');
  return stem.length >= MIN_STEM_LENGTH ? stem : word;
};

/** One phrase found in a text, at the word index it starts on. */
export interface PhraseMatch {
  readonly phrase: string;
  /** Index into the `germanWords` array the phrase was searched in. */
  readonly at: number;
}

/**
 * Every occurrence of `phrases` in an already-tokenised text, matched as whole-word
 * sequences rather than as substrings: "also" must not count as the connector "als",
 * "dennoch" must not count as "denn", and "zum Beispiel" is one phrase of two words.
 * Phrases are tokenised the same way the text was, so both sides are normalised.
 *
 * Positions are returned rather than a yes/no, because where a phrase sits is part of the
 * judgement — a greeting has to open the letter and a sign-off has to close it.
 */
export const findPhrases = (words: readonly string[], phrases: readonly string[]): readonly PhraseMatch[] => {
  const found: PhraseMatch[] = [];
  for (const phrase of phrases) {
    const parts = germanWords(phrase);
    if (parts.length === 0) continue;
    for (let at = 0; at + parts.length <= words.length; at += 1) {
      if (parts.every((part, offset) => words[at + offset] === part)) found.push({ phrase, at });
    }
  }
  return found;
};
