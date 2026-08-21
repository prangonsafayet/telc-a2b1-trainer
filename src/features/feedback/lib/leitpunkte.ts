import { FUNCTION_WORDS, MIN_CUE_LENGTH, PROMPT_VERBS } from '@shared/config/writingRubric.ts';
import { germanStem, germanWords } from '@shared/lib/germanText.ts';

/** Shortest learner word allowed to match a cue that contains it. */
const MIN_TWO_WAY_LENGTH = 5;

/**
 * The content words of one Leitpunkt — the words that could show a learner addressed it.
 *
 * Returned unstemmed, so this reads as "what this point is about" and the caller decides how
 * loosely to match. Everything topic-free is dropped: words of three letters or fewer by
 * length, closed-class words by `FUNCTION_WORDS`, and the instruction verb the point opens
 * with by `PROMPT_VERBS`.
 */
export const cuesFor = (leitpunkt: string): readonly string[] => [
  ...new Set(
    germanWords(leitpunkt).filter(
      word => word.length >= MIN_CUE_LENGTH && !FUNCTION_WORDS.has(word) && !PROMPT_VERBS.has(word)
    )
  )
];

/**
 * A cue counts as used when it and one of the learner's words contain each other, stemmed.
 *
 * Both directions, because German compounds and derives in both: the prompt may name the
 * compound and the learner the head ("Verbesserungsvorschlag" answered with "Vorschlag") as
 * readily as the other way round ("Kleidung" answered with "Kleidungsstücke"). The learner's
 * word has to be five characters for the containing-the-cue direction, or short common stems
 * would swallow everything — "mach" inside "mitmach" would let any "ich mache" answer a point
 * about joining in.
 */
const cueIsUsed = (written: readonly string[], cue: string): boolean =>
  written.some(word => word.includes(cue) || (word.length >= MIN_TWO_WAY_LENGTH && cue.includes(word)));

/**
 * Whether each Leitpunkt looks addressed.
 *
 * It over-credits a learner who merely echoes the prompt's nouns, and it under-credits one who
 * answers in their own words: a point that names a category ("Nennen Sie eine Uhrzeit") is
 * answered by an instance ("um 14 Uhr"), and no offline lexical matcher can see that. Measured,
 * not assumed — scored against the 35 authored Musterlösungen, this marks a point untouched in
 * twelve of them although each addresses every point. Closing that gap needs semantics, which
 * this feature is built without on purpose, so the score it feeds is labelled provisional and
 * shown beside the learner's own mark rather than instead of it.
 *
 * A point with no content words at all gets the benefit of the doubt rather than a `false`.
 * Two of the 125 authored points are like that — "Sagen Sie: Sie machen gern mit." and
 * "Bedanken Sie sich und sagen Sie zu." — where the whole meaning sits in a separable verb
 * (mitmachen, zusagen) whose particle is two or three letters. Nothing this matcher can be
 * taught would find them, so marking them uncovered would cost a learner who did exactly
 * what was asked a band on every attempt at those two papers. `tests/unit/leitpunkte.test.ts`
 * sweeps all 125 and holds the uncheckable share under 5%.
 */
export const coveredLeitpunkte = (text: string, leitpunkte: readonly string[]): readonly boolean[] => {
  const written = germanWords(text).map(germanStem);
  return leitpunkte.map(point => {
    const cues = cuesFor(point).map(germanStem);
    if (cues.length === 0) return true;
    return cues.some(cue => cueIsUsed(written, cue));
  });
};
