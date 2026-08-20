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
  /** Official time limit. Only Schreiben is user-configurable. */
  readonly minutes: (settings: Settings) => number;
  /** Whether the module contributes one of the four 60-point skill scores. */
  readonly isSkill: boolean;
}

export const MODULE_META: Readonly<Record<ExamModule, ModuleMeta>> = {
  lesen: { name: 'Leseverstehen', short: 'Lesen', minutes: () => 45, isSkill: true },
  sprachbausteine: { name: 'Sprachbausteine', short: 'Sprachbausteine', minutes: () => 35, isSkill: false },
  hoeren: { name: 'Hörverstehen · Hören & Schreiben', short: 'Hören', minutes: () => 35, isSkill: true },
  schreiben: { name: 'Schreiben', short: 'Schreiben', minutes: s => s.writingMinutes, isSkill: true },
  sprechen: { name: 'Sprechen', short: 'Sprechen', minutes: () => 15, isSkill: true }
};

export const moduleMinutes = (module: ExamModule, settings: Settings): number =>
  MODULE_META[module].minutes(settings);

/** Points a perfect module scores. Four skills × 60 make up the 240-point total. */
export const SKILL_MAX = 60;

export const FULL_EXAM_MAX = 240;

/** Shown on the briefing screen before each module starts. */
export const MODULE_BRIEFING: Readonly<Record<ExamModule, string>> = {
  lesen:
    '4 parts, 20 items. Teil 1: match 5 situations to 8 ads. Teil 2: read 2 texts, answer 5 multiple-choice questions. Teil 3: match 5 messages to 8 headlines. Teil 4: read a longer text, decide richtig/falsch for 5 statements. Budget ≈ 10 minutes per part. Never leave a blank!',
  sprachbausteine:
    '3 parts. Teil 1: a letter with 6 grammar gaps — pick a, b or c. Teil 2: a text with 6 gaps — pick the right word from a bank of 12 (each word fits only once). Teil 3: pick the fitting response in 5 mini-dialogues. Look left AND right of every gap.',
  hoeren:
    '5 parts, 20 items. You can play each audio a limited number of times (like the real exam). Teil 1: 4 announcements → richtig/falsch. Teil 2: 4 info clips → a/b/c. Teil 3: 4 dialogues → richtig/falsch. Teil 4: one interview → 4 questions. Teil 5: a phone message → write 4 missing words into the note. Read the items BEFORE you press play!',
  schreiben:
    'Reply to the email. Cover ALL THREE content points (about 40–60 words), with a greeting and a sign-off. Plan 1 minute, write, keep 2 minutes to check verb positions and capital letters. After submitting you will score yourself against the sample answer.',
  sprechen:
    '3 parts, like the real paired oral exam — no preparation time. Teil 1: introduce yourself. Teil 2: talk about a topic using the guiding questions. Teil 3: plan something (speak both roles or grab a partner). Record yourself if you allow microphone access, then listen back and rate yourself honestly.'
};

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
