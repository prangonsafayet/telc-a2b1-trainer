import { addDays, toIsoDate } from '@shared/lib/format.ts';
import { type ExamModule, type Settings } from '@shared/types';

/** Module order of a full exam, matching the real sitting. */
export const EXAM_MODULES: readonly ExamModule[] = [
  'lesen',
  'sprachbausteine',
  'hoeren',
  'schreiben',
  'sprechen'
] as const;

interface ModuleMeta {
  readonly name: string;
  readonly short: string;
  /** Whether the module contributes one of the four 60-point skill scores. */
  readonly isSkill: boolean;
}

/* What the paper's sections are called. How long each one runs is a per-trainer fact and
   lives on that trainer's `TrainerPaper`. */
export const MODULE_META: Readonly<Record<ExamModule, ModuleMeta>> = {
  lesen: { name: 'Leseverstehen', short: 'Lesen', isSkill: true },
  sprachbausteine: { name: 'Sprachbausteine', short: 'Sprachbausteine', isSkill: false },
  hoeren: { name: 'Hörverstehen · Hören & Schreiben', short: 'Hören', isSkill: true },
  schreiben: { name: 'Schreiben', short: 'Schreiben', isSkill: true },
  sprechen: { name: 'Sprechen', short: 'Sprechen', isSkill: true }
};

/** Points a perfect module scores. Four skills × 60 make up the 240-point total. */
export const SKILL_MAX = 60;

export const FULL_EXAM_MAX = 240;

/** Shown on the briefing screen before each module starts. */
/** Self-assessment criteria: 4 × 0–5, multiplied by 3 for a 60-point module score. */
export const RATING_CRITERIA: Readonly<
  Record<'schreiben' | 'sprechen', readonly (readonly [string, string])[]>
> = {
  schreiben: [
    ['Inhalt — alle 3 Punkte behandelt?', 'All three content points fully addressed'],
    ['Verständlichkeit', 'A German reader would understand everything without effort'],
    ['Wortschatz', 'Varied, appropriate words; correct greeting & sign-off'],
    ['Korrektheit', 'Verb positions, endings, capitalization mostly right']
  ],
  sprechen: [
    ['Aufgabe & Inhalt', 'All parts/points covered, on topic'],
    ['Flüssigkeit', 'Kept talking, few long pauses'],
    ['Wortschatz & Strukturen', 'Used the Redemittel, varied sentences'],
    ['Aussprache & Interaktion', 'Understandable; asked/reacted like a partner']
  ]
};

/**
 * A new user has not told us their exam date yet, and a hardcoded one silently rots: the
 * day it passes, everyone who has not changed it gets a past-due plan. So the default is a
 * comfortable runway from whenever the app is first opened, which the schedule can work
 * with and the user can correct in Settings.
 */
export const DEFAULT_PREP_DAYS = 30;

export const defaultExamDate = (): string =>
  addDays(toIsoDate(new Date()), DEFAULT_PREP_DAYS) ?? toIsoDate(new Date());

export const DEFAULT_SETTINGS: Settings = {
  writingMinutes: 10,
  ttsRate: 1,
  voiceName: '',
  examDate: defaultExamDate(),
  playsAllowed: 2
};
