/**
 * Structure, timing, points and pass rules of the telc Deutsch B1/B2 exams, as published
 * in the official handbooks. Both levels share one skeleton; the differences (Hören
 * length, writing task, oral part weights) are encoded here, not in components.
 */

import { addDays, toIsoDate } from '@shared/lib/format.ts';
import { type ExamModule, type LevelTrainerSettings, type SingleLevelTrainerId } from '@shared/types';

import { DEFAULT_PREP_DAYS } from './exam.ts';

/** Module order of a full B1/B2 sitting. Same keys as the A2·B1 trainer. */
export const SINGLE_LEVEL_MODULES: readonly ExamModule[] = [
  'lesen',
  'sprachbausteine',
  'hoeren',
  'schreiben',
  'sprechen'
] as const;

/** Maximum points per section. Written = 225, oral = 75. */
export const SINGLE_LEVEL_SECTION_MAX: Readonly<Record<ExamModule, number>> = {
  lesen: 75,
  sprachbausteine: 30,
  hoeren: 75,
  schreiben: 45,
  sprechen: 75
};

export const SINGLE_LEVEL_WRITTEN_MAX = 225;
export const SINGLE_LEVEL_ORAL_MAX = 75;
export const SINGLE_LEVEL_TOTAL_MAX = SINGLE_LEVEL_WRITTEN_MAX + SINGLE_LEVEL_ORAL_MAX;

/** The official rule: 60% in the written and the oral part, independently. */
export const SINGLE_LEVEL_WRITTEN_PASS = 135;
export const SINGLE_LEVEL_ORAL_PASS = 45;

/** Points per correct item, by Teil. */
export const SINGLE_LEVEL_POINTS = {
  lesenTeil1: 5,
  lesenTeil2: 5,
  lesenTeil3: 2.5,
  sprachbausteine: 1.5,
  hoerenTeil1: 5,
  hoerenTeil2: 2.5,
  hoerenTeil3: 5
} as const;

/** Hörverstehen runs ≈30 minutes at B1 and ≈20 at B2. */
const HOEREN_MINUTES: Readonly<Record<SingleLevelTrainerId, number>> = { b1: 30, b2: 20 };

interface SingleLevelModuleMeta {
  readonly name: string;
  readonly short: string;
  /** Whether the module contributes to the written score (Sprechen is the oral part). */
  readonly written: boolean;
  readonly minutes: (level: SingleLevelTrainerId, settings: LevelTrainerSettings) => number;
}

/**
 * Official timing: Lesen + Sprachbausteine share 90 minutes (the app splits them 65/25),
 * Hören runs ≈30 minutes at B1 and ≈20 at B2, Schreiben 30 minutes.
 */
export const SINGLE_LEVEL_MODULE_META: Readonly<Record<ExamModule, SingleLevelModuleMeta>> = {
  lesen: { name: 'Leseverstehen', short: 'Lesen', written: true, minutes: () => 65 },
  sprachbausteine: {
    name: 'Sprachbausteine',
    short: 'Sprachbausteine',
    written: true,
    minutes: () => 25
  },
  hoeren: {
    name: 'Hörverstehen',
    short: 'Hören',
    written: true,
    minutes: level => HOEREN_MINUTES[level]
  },
  schreiben: {
    name: 'Schriftlicher Ausdruck',
    short: 'Schreiben',
    written: true,
    minutes: (_level, settings) => settings.writingMinutes
  },
  sprechen: { name: 'Mündliche Prüfung', short: 'Sprechen', written: false, minutes: () => 15 }
};

export const singleLevelModuleMinutes = (
  module: ExamModule,
  level: SingleLevelTrainerId,
  settings: LevelTrainerSettings
): number => SINGLE_LEVEL_MODULE_META[module].minutes(level, settings);

/* The two levels share the reading and Sprachbausteine briefings and differ in the other
   three, so both are written out per level: a level is looked up, never tested for. */
const LESEN_BRIEFING =
  '3 parts, 20 items, 75 points. Teil 1: match 5 texts to 10 headlines (5 pts each). Teil 2: read one article, answer 5 a/b/c questions (5 pts each). Teil 3: match 10 situations to 12 ads — some situations may have no perfect-looking ad, pick the best fit (2.5 pts each). Budget ≈ 20 minutes per part and never leave a blank!';

const SPRACHBAUSTEINE_BRIEFING =
  '2 parts, 20 items, 30 points. Teil 1: a letter with 10 grammar gaps — pick a, b or c (1.5 pts each). Teil 2: a letter with 10 gaps — fill them from a bank of 15 words, each word fits only once (1.5 pts each). Look left AND right of every gap.';

/** Shown on the briefing screen before each module starts. */
const SINGLE_LEVEL_BRIEFING: Readonly<Record<SingleLevelTrainerId, Readonly<Record<ExamModule, string>>>> = {
  b1: {
    lesen: LESEN_BRIEFING,
    sprachbausteine: SPRACHBAUSTEINE_BRIEFING,
    hoeren:
      '3 parts, 20 items, 75 points, ≈30 minutes. Teil 1: 5 short texts → richtig/falsch (5 pts). Teil 2: one long interview → 10 richtig/falsch statements (2.5 pts). Teil 3: 5 announcements → richtig/falsch (5 pts). Each audio plays a limited number of times, like the real exam. Read the statements BEFORE you press play!',
    schreiben:
      'Reply to the letter, 45 points. Cover at least THREE of the four Leitpunkte (≈80+ words), with a fitting greeting and sign-off. Plan 2 minutes, write, keep 3 minutes to check verb positions, endings and capital letters. You will score yourself against the sample answer afterwards.',
    sprechen:
      '3 parts, 75 points, like the real paired oral exam. Teil 1: Kontaktaufnahme — get to know your partner (15 pts). Teil 2: Gespräch über ein Thema (30 pts). Teil 3: gemeinsam etwas planen (30 pts). Record yourself if you allow microphone access, then listen back and rate yourself honestly.'
  },
  b2: {
    lesen: LESEN_BRIEFING,
    sprachbausteine: SPRACHBAUSTEINE_BRIEFING,
    hoeren:
      '3 parts, 20 items, 75 points, ≈20 minutes. Teil 1: 5 radio clips → richtig/falsch (5 pts). Teil 2: one long interview → 10 richtig/falsch statements (2.5 pts). Teil 3: 5 announcements → richtig/falsch (5 pts). Each audio plays a limited number of times, like the real exam. Read the statements BEFORE you press play!',
    schreiben:
      'Choose ONE of the two tasks, 45 points. Write a formal letter of 150–200 words covering at least two Leitpunkte plus one point of your own, with Betreff, formal greeting and sign-off. Keep 5 minutes to check structure and endings. You will score yourself against the sample answer afterwards.',
    sprechen:
      '3 parts, 75 points, with 20 minutes preparation in the real exam. Teil 1: Präsentation of a topic (25 pts). Teil 2: Diskussion about a short text (25 pts). Teil 3: gemeinsam etwas planen (25 pts). Record yourself if you allow microphone access, then listen back and rate yourself honestly.'
  }
};

export const singleLevelModuleBriefing = (module: ExamModule, level: SingleLevelTrainerId): string =>
  SINGLE_LEVEL_BRIEFING[level][module];

/** Oral part weights and rough timings per Teil, which differ between the two levels. */
export const SINGLE_LEVEL_SPRECHEN_CHIPS: Readonly<Record<SingleLevelTrainerId, readonly string[]>> = {
  b1: ['15 Punkte · ~3 Min.', '30 Punkte · ~6 Min.', '30 Punkte · ~6 Min.'],
  b2: ['25 Punkte · ~5 Min.', '25 Punkte · ~5 Min.', '25 Punkte · ~5 Min.']
};

/** How the oral briefing finishes the sentence "you get 20 minutes preparation…". */
export const SINGLE_LEVEL_PREP_TAIL: Readonly<Record<SingleLevelTrainerId, string>> = {
  b1: ' for all three parts.',
  b2: '; a dictionary is allowed only there.'
};

/** Title of the writing module, which is named differently at each level. */
export const SINGLE_LEVEL_WRITING_TITLE: Readonly<Record<SingleLevelTrainerId, string>> = {
  b1: 'Schreiben — Brief beantworten',
  b2: 'Schriftlicher Ausdruck'
};

/** The register the letter opens in, as a textarea placeholder. */
export const SINGLE_LEVEL_WRITING_PLACEHOLDER: Readonly<Record<SingleLevelTrainerId, string>> = {
  b1: 'Liebe/r … / Sehr geehrte/r …',
  b2: 'Sehr geehrte Damen und Herren, …'
};

/** B1 audio is read slightly slower than B2, before the user's speed setting is applied. */
export const SINGLE_LEVEL_TTS_RATE: Readonly<Record<SingleLevelTrainerId, number>> = {
  b1: 0.97,
  b2: 1.03
};

/**
 * Self-assessment criteria. Schreiben: 3 × 0–5, ×3 → 45 points. Sprechen: 5 × 0–5,
 * ×3 → 75 points. Mirrors the official criteria (task, communication, correctness).
 */
export const SINGLE_LEVEL_RATING_CRITERIA: Readonly<
  Record<'schreiben' | 'sprechen', readonly (readonly [string, string])[]>
> = {
  schreiben: [
    ['Inhalt — Leitpunkte behandelt?', 'Enough Leitpunkte covered, fully and on topic'],
    ['Kommunikative Gestaltung', 'Fitting greeting/sign-off, connected sentences, right register'],
    ['Korrektheit', 'Verb positions, endings and capitalization mostly right']
  ],
  sprechen: [
    ['Aufgabenbewältigung', 'All parts covered, on topic, interacted with the partner'],
    ['Flüssigkeit', 'Kept talking, few long pauses'],
    ['Wortschatz', 'Varied, level-appropriate words; used the Redemittel'],
    ['Strukturen', 'Varied sentence patterns, subordinate clauses attempted'],
    ['Aussprache & Intonation', 'Understandable throughout, natural rhythm']
  ]
};

/** Multiplier from a 0–5 criteria rating to points. */
export const SINGLE_LEVEL_RATING_SCALE = 3;

/** A fresh trainer document needs a date the schedule can work with. */
export const defaultLevelSettings = (): LevelTrainerSettings => ({
  examDate: addDays(toIsoDate(new Date()), DEFAULT_PREP_DAYS) ?? toIsoDate(new Date()),
  writingMinutes: 30,
  playsAllowed: 1
});
