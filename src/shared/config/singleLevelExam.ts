/**
 * Structure, points and pass rules of the single-level paper, as published in the official
 * handbooks. What every trainer setting this paper shares lives here; what each one decides
 * for itself — its timings, its briefing copy, its writing task and its listening speed —
 * lives on that trainer's `TrainerPaper` in `src/content/trainers/<id>/paper.ts`.
 */

import { addDays, toIsoDate } from '@shared/lib/format.ts';
import { type ExamModule, type LevelTrainerSettings } from '@shared/types';

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

/**
 * 60% of each part, independently — the threshold this trainer scores against. NOT
 * confirmed from an official telc source: the two Übungstest PDFs publish only the
 * weighting table (see `SINGLE_LEVEL_SECTION_MAX`), never a per-part pass percentage. The
 * B1 and B2 guides deliberately print no threshold for this reason; treat this constant as
 * this app's working assumption, not an asserted fact.
 */
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

interface SingleLevelModuleMeta {
  readonly name: string;
  readonly short: string;
  /** Whether the module contributes to the written score (Sprechen is the oral part). */
  readonly written: boolean;
}

/* What the paper's sections are called and which of them the written score is made of. How
   long each one runs differs between the trainers that set this paper — Hören is half an
   hour at B1 and twenty minutes at B2 — so timings live on each trainer's `TrainerPaper`. */
export const SINGLE_LEVEL_MODULE_META: Readonly<Record<ExamModule, SingleLevelModuleMeta>> = {
  lesen: { name: 'Leseverstehen', short: 'Lesen', written: true },
  sprachbausteine: { name: 'Sprachbausteine', short: 'Sprachbausteine', written: true },
  hoeren: { name: 'Hörverstehen', short: 'Hören', written: true },
  schreiben: { name: 'Schriftlicher Ausdruck', short: 'Schreiben', written: true },
  sprechen: { name: 'Mündliche Prüfung', short: 'Sprechen', written: false }
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
