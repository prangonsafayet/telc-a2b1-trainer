/**
 * The shape of one telc Deutsch B1 / B2 Modelltest, as authored in
 * `src/content/trainers/<level>/exams`. Both levels share one skeleton (researched from
 * the official telc handbooks): Lesen 5+5+10 items, Sprachbausteine 10+10, Hören 5+10+5,
 * one 45-point letter, a three-part oral. They differ in the writing task (B1 replies to
 * a letter, B2 chooses one of two formal tasks) and the oral part weights.
 */

import { type AttemptMode, type AudioScript, type ExamModule, type MultipleChoiceQuestion } from './exam.ts';
import { type AnswerMap, type ModuleTimes } from './progress.ts';

/** Declared here to avoid a cycle with `trainer.ts`, which imports this file. */
export type TelcExamLevel = 'b1' | 'b2';

export interface TelcLesenTeil1 {
  readonly anweisung: string;
  /** 10 headlines (a–j). */
  readonly headlines: readonly string[];
  /** 5 short texts. */
  readonly texts: readonly string[];
  /** For each text, the index of the matching headline. */
  readonly answers: readonly number[];
}

export interface TelcLesenTeil2 {
  readonly anweisung: string;
  readonly titel: string;
  /** One longer article. */
  readonly text: string;
  /** 5 questions, 3 options each. */
  readonly questions: readonly MultipleChoiceQuestion[];
}

export interface TelcLesenTeil3 {
  readonly anweisung: string;
  /** 10 situations. */
  readonly situations: readonly string[];
  /** 12 ads (a–l). Each ad matches at most one situation. */
  readonly ads: readonly string[];
  /** For each situation, the index of the matching ad. */
  readonly answers: readonly number[];
}

export interface TelcLesenSection {
  readonly teil1: TelcLesenTeil1;
  readonly teil2: TelcLesenTeil2;
  readonly teil3: TelcLesenTeil3;
}

export interface TelcGap {
  readonly options: readonly string[];
  readonly answer: number;
}

export interface TelcSprachbausteineSection {
  /** A letter with gaps `[1]`–`[10]`, 3 options each. */
  readonly teil1: {
    readonly anweisung: string;
    readonly text: string;
    readonly gaps: readonly TelcGap[];
  };
  /** A letter with gaps `[1]`–`[10]`, filled from a bank of 15 words. */
  readonly teil2: {
    readonly anweisung: string;
    readonly text: string;
    readonly wordBank: readonly string[];
    readonly answers: readonly number[];
  };
}

export interface TelcHoerenItem {
  readonly statement: string;
  readonly answer: boolean;
  readonly audio: AudioScript;
}

export interface TelcHoerenStatement {
  readonly statement: string;
  readonly answer: boolean;
}

export interface TelcHoerenSection {
  /** 5 short clips, each with one richtig/falsch statement. */
  readonly teil1: { readonly anweisung: string; readonly items: readonly TelcHoerenItem[] };
  /** One long interview with 10 richtig/falsch statements. */
  readonly teil2: {
    readonly anweisung: string;
    readonly audio: AudioScript;
    readonly statements: readonly TelcHoerenStatement[];
  };
  /** 5 announcements, each with one richtig/falsch statement. */
  readonly teil3: { readonly anweisung: string; readonly items: readonly TelcHoerenItem[] };
}

export interface TelcWritingTask {
  readonly titel: string;
  readonly situation: string;
  /** B1 only: the half-formal letter/email this task replies to. */
  readonly incoming?: {
    readonly von: string;
    readonly betreff: string;
    readonly text: string;
  };
  /** 4 Leitpunkte. B1 asks for at least 3 of them; B2 for 2 plus an own point. */
  readonly leitpunkte: readonly string[];
  readonly musterloesung: string;
}

export interface TelcSchreibenSection {
  readonly anweisung: string;
  /** B1: exactly one task. B2: two tasks — the candidate works on one. */
  readonly tasks: readonly TelcWritingTask[];
  readonly tipps: string;
}

export interface TelcSprechenTeil {
  readonly titel: string;
  readonly anweisung: string;
  readonly punkte: readonly string[];
  readonly redemittel: readonly string[];
}

export interface TelcSprechenSection {
  readonly teil1: TelcSprechenTeil;
  readonly teil2: TelcSprechenTeil;
  readonly teil3: TelcSprechenTeil;
}

export interface TelcExam {
  /** 1–10 within its level; the (level, id) pair is the identity. */
  readonly id: number;
  readonly level: TelcExamLevel;
  readonly title: string;
  readonly theme: string;
  readonly lesen: TelcLesenSection;
  readonly sprachbausteine: TelcSprachbausteineSection;
  readonly hoeren: TelcHoerenSection;
  readonly schreiben: TelcSchreibenSection;
  readonly sprechen: TelcSprechenSection;
}

/* --- Attempts --- */

export type TelcResult = 'Bestanden' | 'Nicht bestanden';

/** Points per section: lesen /75, sprachbausteine /30, hoeren /75, schreiben /45, sprechen /75. */
export type TelcSectionScores = Partial<Record<ExamModule, number>>;

/** One completed B1/B2 attempt, as stored inside the trainer document. */
export interface TelcAttempt {
  /** `Date.now()` at completion; also the route parameter. */
  readonly id: number;
  readonly examId: number;
  readonly mode: AttemptMode;
  /** ISO timestamp. */
  readonly date: string;
  readonly times: ModuleTimes;
  readonly scores: TelcSectionScores;
  readonly answers: AnswerMap;
  /** Self-assessed scores for schreiben (/45) and sprechen (/75). */
  readonly ratings: Partial<Record<'schreiben' | 'sprechen', number>>;
  /** B2 only: which of the two writing tasks was chosen. */
  readonly writingTask?: number;
  /** Full attempts only. Written /225, oral /75, total /300. */
  readonly written?: number;
  readonly oral?: number;
  readonly total?: number;
  readonly result?: TelcResult;
}
