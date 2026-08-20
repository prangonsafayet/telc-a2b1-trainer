/** The shape of one Modelltest, as authored in `src/content/trainers/<id>/exams`. */

/**
 * What every Modelltest of every paper has. Enough for the generic layers — the registry,
 * the schedule engine, the exam lists — to work with a paper they cannot narrow.
 */
export interface ExamPaper {
  readonly id: number;
  readonly title: string;
}

export type ExamDifficulty = 'easy' | 'medium' | 'b1';

/** A module of the written/oral exam. `sprachbausteine` is tracked but is not a skill. */
export type ExamModule = 'lesen' | 'sprachbausteine' | 'hoeren' | 'schreiben' | 'sprechen';

/** A full exam, or a single module practised on its own. */
export type AttemptMode = 'full' | ExamModule;

/** The four scored skills that decide the grade. */
export type SkillKey = 'lesen' | 'hoeren' | 'schreiben' | 'sprechen';

export type ExamGrade = 'B1' | 'A2' | 'Nicht bestanden';

/** A listening clip: either a monologue or a speaker-tagged dialogue. */
export type AudioScript = string | readonly DialogueTurn[];

export interface DialogueTurn {
  readonly speaker: string;
  readonly text: string;
}

export interface MultipleChoiceQuestion {
  readonly frage: string;
  readonly options: readonly string[];
  /** Index into `options`. */
  readonly answer: number;
}

export interface TrueFalseStatement {
  readonly text: string;
  readonly answer: boolean;
}

export interface LesenTeil1 {
  readonly anweisung: string;
  readonly situations: readonly string[];
  readonly ads: readonly string[];
  /** For each situation, the index of the matching ad. */
  readonly answers: readonly number[];
}

export interface LesenTeil2 {
  readonly anweisung: string;
  readonly texts: readonly { readonly titel: string; readonly text: string }[];
  readonly questions: readonly (MultipleChoiceQuestion & { readonly textIndex: number })[];
}

export interface LesenTeil3 {
  readonly anweisung: string;
  readonly headlines: readonly string[];
  readonly messages: readonly string[];
  readonly answers: readonly number[];
}

export interface LesenTeil4 {
  readonly anweisung: string;
  readonly titel: string;
  readonly text: string;
  readonly statements: readonly TrueFalseStatement[];
}

export interface LesenSection {
  readonly teil1: LesenTeil1;
  readonly teil2: LesenTeil2;
  readonly teil3: LesenTeil3;
  readonly teil4: LesenTeil4;
}

export interface GrammarGap {
  readonly options: readonly string[];
  readonly answer: number;
}

export interface SprachbausteineSection {
  readonly teil1: { readonly anweisung: string; readonly text: string; readonly gaps: readonly GrammarGap[] };
  readonly teil2: {
    readonly anweisung: string;
    readonly text: string;
    readonly wordBank: readonly string[];
    /** For each gap, the index into `wordBank`. */
    readonly answers: readonly number[];
  };
  readonly teil3: {
    readonly anweisung: string;
    readonly items: readonly {
      readonly prompt: string;
      readonly options: readonly string[];
      readonly answer: number;
    }[];
  };
}

export interface ListeningTrueFalseItem {
  readonly statement: string;
  readonly answer: boolean;
  readonly audio: AudioScript;
}

export interface ListeningChoiceItem extends MultipleChoiceQuestion {
  readonly audio: AudioScript;
}

/** A blank in the Teil-5 note sheet. `alt` lists other spellings that count as correct. */
export interface NoteGap {
  /** Contains `____` where the input goes. */
  readonly label: string;
  readonly answer: string;
  readonly alt?: readonly string[];
}

export interface HoerenSection {
  readonly teil1: { readonly anweisung: string; readonly items: readonly ListeningTrueFalseItem[] };
  readonly teil2: { readonly anweisung: string; readonly items: readonly ListeningChoiceItem[] };
  readonly teil3: { readonly anweisung: string; readonly items: readonly ListeningTrueFalseItem[] };
  readonly teil4: {
    readonly anweisung: string;
    readonly audio: AudioScript;
    readonly questions: readonly MultipleChoiceQuestion[];
  };
  readonly teil5: {
    readonly anweisung: string;
    readonly audio: AudioScript;
    readonly noteTitle: string;
    readonly gaps: readonly NoteGap[];
  };
}

export interface SchreibenSection {
  readonly anweisung: string;
  readonly situation: string;
  readonly incomingEmail: { readonly von: string; readonly betreff: string; readonly text: string };
  /** The three content points that must be covered. */
  readonly points: readonly string[];
  readonly musterloesung: string;
  readonly tipps: string;
}

export interface SprechenSection {
  readonly teil1: {
    readonly anweisung: string;
    readonly punkte: readonly string[];
    readonly redemittel: readonly string[];
  };
  readonly teil2: {
    readonly thema: string;
    readonly anweisung: string;
    readonly leitfragen: readonly string[];
    readonly redemittel: readonly string[];
  };
  readonly teil3: {
    readonly aufgabe: string;
    readonly anweisung: string;
    readonly punkte: readonly string[];
    readonly redemittel: readonly string[];
  };
}

export interface DualLevelExam {
  readonly id: number;
  readonly title: string;
  readonly difficulty: ExamDifficulty;
  /** Human-readable level badge, e.g. "A2 · leicht". */
  readonly level: string;
  readonly theme: string;
  readonly lesen: LesenSection;
  readonly sprachbausteine: SprachbausteineSection;
  readonly hoeren: HoerenSection;
  readonly schreiben: SchreibenSection;
  readonly sprechen: SprechenSection;
}
