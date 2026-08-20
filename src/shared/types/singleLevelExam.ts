/**
 * The shape of one telc Deutsch B1 / B2 Modelltest — the single-level paper, as authored in
 * `src/content/trainers/<level>/exams`. Both levels share one skeleton (researched from
 * the official telc handbooks): Lesen 5+5+10 items, Sprachbausteine 10+10, Hören 5+10+5,
 * one 45-point e-mail, a three-part oral. They differ in the writing task (B1 replies to
 * an incoming e-mail; B2 writes a halbformelle E-Mail directly from a prompt, no incoming
 * message) and in the oral part names, weights and task types.
 */

import { type AttemptMode, type AudioScript, type ExamModule, type MultipleChoiceQuestion } from './exam.ts';
import { type AnswerMap, type ModuleTimes } from './progress.ts';

/** Declared here to avoid a cycle with `trainer.ts`, which imports this file. */
export type SingleLevelTrainerId = 'b1' | 'b2';

export interface SingleLevelLesenTeil1 {
  readonly anweisung: string;
  /** 10 headlines (a–j). */
  readonly headlines: readonly string[];
  /** 5 short texts. */
  readonly texts: readonly string[];
  /** For each text, the index of the matching headline. */
  readonly answers: readonly number[];
}

export interface SingleLevelLesenTeil2 {
  readonly anweisung: string;
  readonly titel: string;
  /** One longer article. */
  readonly text: string;
  /** 5 questions, 3 options each. */
  readonly questions: readonly MultipleChoiceQuestion[];
}

export interface SingleLevelLesenTeil3 {
  readonly anweisung: string;
  /** 10 situations. */
  readonly situations: readonly string[];
  /** 12 ads (a–l). Each ad matches at most one situation. */
  readonly ads: readonly string[];
  /** For each situation, the index of the matching ad. */
  readonly answers: readonly number[];
}

export interface SingleLevelLesenSection {
  readonly teil1: SingleLevelLesenTeil1;
  readonly teil2: SingleLevelLesenTeil2;
  readonly teil3: SingleLevelLesenTeil3;
}

export interface SingleLevelGap {
  readonly options: readonly string[];
  readonly answer: number;
}

export interface SingleLevelSprachbausteineSection {
  /** A letter with gaps `[1]`–`[10]`, 3 options each. */
  readonly teil1: {
    readonly anweisung: string;
    readonly text: string;
    readonly gaps: readonly SingleLevelGap[];
  };
  /** A letter with gaps `[1]`–`[10]`, filled from a bank of 15 words. */
  readonly teil2: {
    readonly anweisung: string;
    readonly text: string;
    readonly wordBank: readonly string[];
    readonly answers: readonly number[];
  };
}

export interface SingleLevelHoerenItem {
  readonly statement: string;
  readonly answer: boolean;
  readonly audio: AudioScript;
}

export interface SingleLevelHoerenStatement {
  readonly statement: string;
  readonly answer: boolean;
}

export interface SingleLevelHoerenSection {
  /** 5 short clips, each with one richtig/falsch statement. */
  readonly teil1: { readonly anweisung: string; readonly items: readonly SingleLevelHoerenItem[] };
  /** One long interview with 10 richtig/falsch statements. */
  readonly teil2: {
    readonly anweisung: string;
    readonly audio: AudioScript;
    readonly statements: readonly SingleLevelHoerenStatement[];
  };
  /** 5 announcements, each with one richtig/falsch statement. */
  readonly teil3: { readonly anweisung: string; readonly items: readonly SingleLevelHoerenItem[] };
}

export interface SingleLevelWritingTask {
  readonly titel: string;
  readonly situation: string;
  /** B1 only: the half-formal e-mail this task replies to. */
  readonly incoming?: {
    readonly von: string;
    readonly betreff: string;
    readonly text: string;
  };
  /** 4 Leitpunkte. The official instruction at both levels: address all four, fully. */
  readonly leitpunkte: readonly string[];
  readonly musterloesung: string;
}

export interface SingleLevelSchreibenSection {
  readonly anweisung: string;
  /** Exactly one task at both levels — neither offers a choice between two. */
  readonly tasks: readonly SingleLevelWritingTask[];
  readonly tipps: string;
}

export interface SingleLevelSprechenTeil {
  readonly titel: string;
  readonly anweisung: string;
  readonly punkte: readonly string[];
  readonly redemittel: readonly string[];
}

export interface SingleLevelSprechenSection {
  readonly teil1: SingleLevelSprechenTeil;
  readonly teil2: SingleLevelSprechenTeil;
  readonly teil3: SingleLevelSprechenTeil;
}

export interface SingleLevelExam {
  /** 1–10 within its level; the (level, id) pair is the identity. */
  readonly id: number;
  readonly level: SingleLevelTrainerId;
  readonly title: string;
  readonly theme: string;
  readonly lesen: SingleLevelLesenSection;
  readonly sprachbausteine: SingleLevelSprachbausteineSection;
  readonly hoeren: SingleLevelHoerenSection;
  readonly schreiben: SingleLevelSchreibenSection;
  readonly sprechen: SingleLevelSprechenSection;
}

/* --- Attempts --- */

export type SingleLevelResult = 'Bestanden' | 'Nicht bestanden';

/** Points per section: lesen /75, sprachbausteine /30, hoeren /75, schreiben /45, sprechen /75. */
export type SingleLevelSectionScores = Partial<Record<ExamModule, number>>;

/** One completed B1/B2 attempt, as stored inside the trainer document. */
export interface SingleLevelAttempt {
  /** `Date.now()` at completion; also the route parameter. */
  readonly id: number;
  readonly examId: number;
  readonly mode: AttemptMode;
  /** ISO timestamp. */
  readonly date: string;
  readonly times: ModuleTimes;
  readonly scores: SingleLevelSectionScores;
  readonly answers: AnswerMap;
  /** Self-assessed scores for schreiben (/45) and sprechen (/75). */
  readonly ratings: Partial<Record<'schreiben' | 'sprechen', number>>;
  /**
   * Which of `schreiben.tasks` was chosen. Both levels currently author exactly one task,
   * so the writing module never sets this; kept for older stored attempts and in case a
   * future paper offers a real choice.
   */
  readonly writingTask?: number;
  /** Full attempts only. Written /225, oral /75, total /300. */
  readonly written?: number;
  readonly oral?: number;
  readonly total?: number;
  readonly result?: SingleLevelResult;
}
