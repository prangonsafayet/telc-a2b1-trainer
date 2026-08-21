/** What the app tells a learner about their own writing, and what it remembers. */

export type WeaknessCategory =
  'case' | 'agreement' | 'wordOrder' | 'verbForm' | 'preposition' | 'spelling' | 'punctuation' | 'style';

/**
 * A curriculum area a weakness belongs to. Deliberately trainer-agnostic: the three
 * trainers name and group their cheatsheets differently (A2·B1 has twelve keys, B1 has six,
 * B2 has six, and none of the three share a key), so a topic is the thing every trainer can
 * resolve against its own `curriculum.cheatsheets`, not a cheatsheet key itself. See
 * `WEAKNESS_TOPICS` in `@shared/config/weakness.ts` and `TrainerInfo.weaknessCheatsheets`
 * in `@shared/config/trainers.ts`.
 */
export type WeaknessTopic = 'cases' | 'verbForms' | 'connectors' | 'prepositions' | 'vocabulary' | 'writing';

/** One mistake, located in the learner's text. */
export interface ErrorReportEntry {
  readonly offset: number;
  readonly length: number;
  /** The learner's own words at that span, so the list is readable on its own. */
  readonly excerpt: string;
  readonly message: string;
  readonly category: WeaknessCategory;
  /** LanguageTool's best replacement, when it offers one. */
  readonly suggestion: string | null;
  readonly ruleId: string;
}

/** The official criteria, each scored A/B/C/D = 5/3/1/0. */
export type RubricCriterion = 'aufgabenbewaeltigung' | 'kommunikativeGestaltung' | 'formaleRichtigkeit';

export interface RubricBand {
  readonly points: 0 | 1 | 3 | 5;
  /** Why it landed in this band, in one sentence a learner can act on. */
  readonly because: string;
}

export interface RubricScore {
  readonly bands: Readonly<Record<RubricCriterion, RubricBand>>;
  /** Sum of the three bands, multiplied by 3 as telc does. 0–45. */
  readonly points: number;
  readonly max: 45;
}

export interface WritingFeedback {
  readonly report: readonly ErrorReportEntry[];
  readonly score: RubricScore;
  readonly wordCount: number;
}

/** Mistakes seen over time, per category. Persisted. */
export interface WeaknessEntry {
  readonly count: number;
  /** `YYYY-MM-DD`, local time. */
  readonly lastSeen: string;
}

export type WeaknessProfile = Partial<Record<WeaknessCategory, WeaknessEntry>>;
