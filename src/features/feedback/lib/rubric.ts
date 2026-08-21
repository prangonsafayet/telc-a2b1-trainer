import { WEAKNESS_WEIGHTS } from '@shared/config/weakness.ts';
import {
  CONNECTOR_CHECK_MIN_WORDS,
  CONNECTOR_TARGET,
  CONNECTORS,
  FORMAL_ERROR_BANDS,
  GREETINGS,
  RUBRIC_SCALE,
  SALUTATION_WINDOW_WORDS,
  SIGN_OFFS,
  TOO_SHORT_RATIO
} from '@shared/config/writingRubric.ts';
import { findPhrases, germanWords } from '@shared/lib/germanText.ts';
import { describeWordCount } from '@shared/lib/writingFeedback.ts';
import {
  type ErrorReportEntry,
  type RubricBand,
  type RubricScore,
  type WordCountFeedback,
  type WritingTarget
} from '@shared/types';

import { coveredLeitpunkte } from './leitpunkte.ts';

export interface RubricInput {
  readonly text: string;
  readonly leitpunkte: readonly string[];
  readonly target: WritingTarget;
  readonly report: readonly ErrorReportEntry[];
}

const band = (points: 0 | 1 | 3 | 5, because: string): RubricBand => ({ points, because });

const asked = (target: WritingTarget): string =>
  `this task asks for ${String(target.min)}–${String(target.max)}`;

/**
 * Task completion: every Leitpunkt addressed, at roughly the asked-for length.
 *
 * The length half comes from `describeWordCount`, the same judgement the live counter under
 * the textarea shows, so a learner is never told they are "in range" while being marked down
 * for length.
 */
const scoreTask = (input: RubricInput, words: WordCountFeedback): RubricBand => {
  if (words.count < input.target.min * TOO_SHORT_RATIO) {
    return band(0, `Only ${String(words.count)} words — ${asked(input.target)}.`);
  }

  const total = input.leitpunkte.length;
  const covered = coveredLeitpunkte(input.text, input.leitpunkte).filter(Boolean).length;
  const missing = total - covered;
  const detail =
    total === 0
      ? `${String(words.count)} words.`
      : `${String(covered)} of ${String(total)} Leitpunkte look addressed.`;

  if (missing >= 3) return band(0, `${detail} Most of the points look untouched.`);
  if (missing === 2) return band(1, `${detail} Two points look untouched.`);
  if (missing === 1) {
    return band(3, `${detail} One looks untouched — check you answered every point.`);
  }
  if (!words.inRange) {
    return band(3, `${detail} At ${String(words.count)} words, ${asked(input.target)}.`);
  }
  return band(5, `${detail} ${String(words.count)} words, the length the task asks for.`);
};

/**
 * Register and shape: does it read like a letter rather than a list of answers?
 *
 * Four checks, three of them the app's own advice: both writing cheatsheets end with a
 * two-minute checklist asking "greeting + sign-off present?", and the B1 one adds "At least 3
 * different connectors". Paragraphing is the fourth and is this rubric's own. The connector
 * check follows its source and applies only from the B1 letter's length upward — see
 * `CONNECTOR_CHECK_MIN_WORDS`.
 *
 * Position is part of the judgement, not decoration. "Liebe Grüße" contains the greeting
 * "Liebe", so a letter that closes properly but never opens would otherwise be credited with
 * an Anrede it does not have; a greeting therefore has to sit near the top and not be the
 * start of a sign-off, and a sign-off has to sit near the end.
 */
const scoreCommunication = (input: RubricInput): RubricBand => {
  const words = germanWords(input.text);
  const closings = findPhrases(words, SIGN_OFFS);
  const closingStarts = new Set(closings.map(match => match.at));
  const hasGreeting = findPhrases(words, GREETINGS).some(
    match => match.at < SALUTATION_WINDOW_WORDS && !closingStarts.has(match.at)
  );
  const hasSignOff = closings.some(match => match.at >= words.length - SALUTATION_WINDOW_WORDS);
  const connectors = new Set(findPhrases(words, CONNECTORS).map(match => match.phrase));
  const wantsConnectors = input.target.min >= CONNECTOR_CHECK_MIN_WORDS;
  const paragraphs = input.text.split(/\n\s*\n/).filter(part => part.trim().length > 0).length;

  const missing: string[] = [];
  if (!hasGreeting) missing.push('a greeting');
  if (!hasSignOff) missing.push('a sign-off');
  if (wantsConnectors && connectors.size < CONNECTOR_TARGET) missing.push('varied connectors');
  if (paragraphs < 2) missing.push('paragraphs');

  if (missing.length === 0) {
    const cohesion = wantsConnectors ? `, ${String(connectors.size)} different connectors` : '';
    return band(5, `Greeting, sign-off${cohesion} and clear paragraphs.`);
  }
  if (missing.length === 1) return band(3, `Missing ${missing[0] ?? ''}.`);
  if (missing.length === 2) return band(1, `Missing ${missing.join(' and ')}.`);
  return band(0, `Missing ${missing.join(', ')}.`);
};

/**
 * Correctness: weighted error density, so six style nags do not sink a good letter while six
 * case errors do cost two bands.
 *
 * This is the one criterion LanguageTool feeds, and it sees less than it appears to: on the
 * free public API, reliably spelling and some preposition-and-case rules, and little agreement
 * or word order. A count of what was found is therefore a floor on the real error count, never
 * a verdict — which is what makes the whole score provisional.
 */
const scoreCorrectness = (input: RubricInput, words: WordCountFeedback): RubricBand => {
  if (words.count === 0) return band(0, 'Nothing written yet.');
  const weighted = input.report.reduce((sum, entry) => sum + WEAKNESS_WEIGHTS[entry.category], 0);
  const per100 = (weighted / words.count) * 100;
  const points = FORMAL_ERROR_BANDS.find(threshold => per100 < threshold.under)?.points ?? 0;
  const flagged =
    input.report.length === 1 ? '1 flagged span' : `${String(input.report.length)} flagged spans`;
  return band(
    points,
    `${flagged} across ${String(words.count)} words (${per100.toFixed(1)} per 100, weighted).`
  );
};

/**
 * A provisional mark on the three official criteria, each A/B/C/D = 5/3/1/0, summed and
 * tripled as telc does — so a criterion is worth 15, 9, 3 or 0 and the maximum is 45. There is
 * no smooth scale in between, by design.
 *
 * LanguageTool supplies only Formale Richtigkeit; the other two are heuristics over the
 * learner's own text, and no proofreader can know whether they answered the question. That is
 * why this is shown next to the learner's self-rating rather than instead of it, and why
 * `attempt.ratings` remains the score of record.
 */
export const scoreWriting = (input: RubricInput): RubricScore => {
  const words = describeWordCount(input.text, input.target);
  const bands = {
    aufgabenbewaeltigung: scoreTask(input, words),
    kommunikativeGestaltung: scoreCommunication(input),
    formaleRichtigkeit: scoreCorrectness(input, words)
  } as const;

  const summed =
    bands.aufgabenbewaeltigung.points +
    bands.kommunikativeGestaltung.points +
    bands.formaleRichtigkeit.points;

  return { bands, points: summed * RUBRIC_SCALE, max: 45 };
};
