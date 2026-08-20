import { type WeaknessCategory, type WeaknessTopic } from '@shared/types';

/**
 * What a learner can act on. Deliberately coarse: these map onto cheatsheets and drills,
 * so "your Dativ is shaky" is useful where "rule DE_AGREEMENT_SG_PL fired" is not.
 */
export const WEAKNESS_CATEGORIES: readonly WeaknessCategory[] = [
  'case',
  'agreement',
  'wordOrder',
  'verbForm',
  'preposition',
  'spelling',
  'punctuation',
  'style'
];

/** LanguageTool category id → what to study. Categories outlive individual rule ids. */
export const LT_CATEGORY_TO_WEAKNESS: Readonly<Record<string, WeaknessCategory>> = {
  GRAMMAR: 'agreement',
  CASING: 'spelling',
  TYPOS: 'spelling',
  CONFUSED_WORDS: 'style',
  COLLOCATIONS: 'preposition',
  PUNCTUATION: 'punctuation',
  TYPOGRAPHY: 'punctuation',
  REDUNDANCY: 'style',
  STYLE: 'style'
};

/** Fallback when the category is unknown to us. */
export const LT_ISSUE_TYPE_TO_WEAKNESS: Readonly<Record<string, WeaknessCategory>> = {
  grammar: 'agreement',
  misspelling: 'spelling',
  typographical: 'punctuation',
  whitespace: 'punctuation',
  duplication: 'style',
  style: 'style',
  inconsistency: 'style'
};

/**
 * Rule ids worth pulling out of the coarse buckets, because German learners live here.
 *
 * `PRAEP_DAT` (the wrong case after a fixed preposition, e.g. "zu die Schule") is one of
 * only two error classes the public LanguageTool API reliably catches — measured directly
 * against `https://api.languagetool.org`, which missed a wrong-article-case sentence and a
 * subject-verb agreement sentence but caught this and a misspelling. A self-hosted instance
 * with n-gram data catches the rest of this list far more often; the public API mostly
 * leaves them silent, which is fine — `classify` still falls back to category and issue
 * type for whatever it does not name here.
 */
export const LT_RULE_TO_WEAKNESS: Readonly<Record<string, WeaknessCategory>> = {
  DE_CASE: 'case',
  DE_AGREEMENT: 'agreement',
  DE_VERBAGREEMENT: 'agreement',
  WORD_ORDER: 'wordOrder',
  VERB_FORM: 'verbForm',
  PRAEP_DAT: 'preposition'
};

/** How much each category counts against Formale Richtigkeit. Style is nearly free. */
export const WEAKNESS_WEIGHTS: Readonly<Record<WeaknessCategory, number>> = {
  case: 1,
  agreement: 1,
  wordOrder: 1,
  verbForm: 1,
  preposition: 0.8,
  spelling: 0.6,
  punctuation: 0.2,
  style: 0.1
};

/**
 * Which curriculum area each weakness belongs to.
 *
 * Deliberately not a category → cheatsheet-key map: the three trainers each own their own
 * cheatsheets under `src/content/trainers/<id>/curriculum.ts`, and the keys are unrelated —
 * A2·B1 has twelve (`cases`, `verbpraep`, `nebensaetze`, …), B1 has six
 * (`cases`, `verbs`, `konnektoren`, `schreiben`, `sprechen`, `hoeren`), B2 has six
 * (`genitiv`, `passiv`, `kii`, `nominal`, `brief`, `muendlich`). A single flat map keyed by
 * `WeaknessCategory` cannot resolve to real keys for all three at once.
 *
 * A topic is the portable half of that lookup: every trainer resolves its own cheatsheet
 * keys for a topic in its `TrainerInfo.weaknessCheatsheets` (`@shared/config/trainers.ts`),
 * which is where trainer-specific facts belong. Task 7's adaptive queue links a learner's
 * weakness to a cheatsheet by composing the two: `TRAINERS[trainer].weaknessCheatsheets[
 * WEAKNESS_TOPICS[category]]`.
 */
export const WEAKNESS_TOPICS: Readonly<Record<WeaknessCategory, WeaknessTopic>> = {
  case: 'cases',
  agreement: 'verbForms',
  wordOrder: 'connectors',
  verbForm: 'verbForms',
  preposition: 'prepositions',
  spelling: 'vocabulary',
  punctuation: 'writing',
  style: 'writing'
};
