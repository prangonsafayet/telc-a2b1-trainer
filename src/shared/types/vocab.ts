/** Vocabulary and grammar banks for the B1/B2 trainers, plus the spaced-repetition state. */

/** The three cases the trainers drill. Nominativ needs no drilling at this level. */
export type GermanCase = 'akkusativ' | 'dativ' | 'genitiv';

export type WordClass = 'verb' | 'noun' | 'adjective';

/** Every learnable item carries an example sentence in both languages. */
export interface VocabExample {
  readonly de: string;
  readonly en: string;
}

interface VocabEntryBase {
  /**
   * Stable id, e.g. `b1.v.001`. It keys the SRS map, so it is persisted —
   * never renumber an existing item.
   */
  readonly id: string;
  readonly de: string;
  readonly en: string;
  readonly example: VocabExample;
}

export interface VerbEntry extends VocabEntryBase {
  /** 3rd person singular Präsens, e.g. "nimmt". */
  readonly praesens: string;
  /** 3rd person singular Präteritum, e.g. "nahm". */
  readonly praeteritum: string;
  /** Perfekt with auxiliary, e.g. "hat genommen" / "ist gefahren". */
  readonly perfekt: string;
}

export interface NounEntry extends VocabEntryBase {
  readonly article: 'der' | 'die' | 'das';
  /** Plural form, e.g. "die Häuser", or "– (nur Singular)". */
  readonly plural: string;
}

export interface AdjectiveEntry extends VocabEntryBase {
  /** Comparative where sensible, e.g. "höher". */
  readonly komparativ?: string;
  /** Superlative where sensible, e.g. "am höchsten". */
  readonly superlativ?: string;
}

/** A verb with a fixed preposition, e.g. "warten auf + Akkusativ". */
export interface PrepVerbEntry extends VocabEntryBase {
  /** Infinitive, e.g. "warten". */
  readonly verb: string;
  /** The fixed preposition, e.g. "auf". */
  readonly preposition: string;
  readonly kasus: GermanCase;
}

/** What kind of trigger governs the case of a `CaseItem`. */
export type CaseItemKind = 'praeposition' | 'verb' | 'wendung';

/** One case-government fact: a preposition, verb or fixed phrase and the case it takes. */
export interface CaseItem extends VocabEntryBase {
  readonly kasus: GermanCase;
  readonly kind: CaseItemKind;
}

/** Everything one level trainer offers for study. */
export interface VocabBank {
  readonly verbs: readonly VerbEntry[];
  readonly nouns: readonly NounEntry[];
  readonly adjectives: readonly AdjectiveEntry[];
  readonly prepVerbs: readonly PrepVerbEntry[];
  readonly caseItems: readonly CaseItem[];
}

/** The study categories a learner can pick, in display order. */
export type StudyCategory = 'verbs' | 'nouns' | 'adjectives' | 'prepVerbs' | 'caseItems';

/* --- Spaced repetition --- */

/** Leitner-box state of one item. Persisted inside the trainer document. */
export interface SrsEntry {
  /** 0–5. New items start at 0; a wrong answer sends the item back to box 1. */
  readonly box: number;
  /** `YYYY-MM-DD` — the day the item is due again, in local time. */
  readonly due: string;
  readonly seen: number;
  readonly correct: number;
  readonly wrong: number;
}

/** SRS state keyed by item id. */
export type SrsMap = Partial<Record<string, SrsEntry>>;

export type MasteryLevel = 'new' | 'learning' | 'mastered';
