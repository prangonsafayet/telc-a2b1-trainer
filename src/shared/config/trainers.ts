/**
 * The trainer registry: one descriptor per trainer, and the only place a per-trainer fact
 * is allowed to live.
 *
 * The three trainers are peers. A fourth one — telc Deutsch C1, a Deutsch-Test für
 * Zuwanderer — is a content folder under `src/content/trainers/` plus one entry here; no
 * screen, route, hook or nav item needs to learn about it. Everything else in `src/`
 * therefore reads a trainer's facts from this file rather than testing its id, which the
 * `no-restricted-syntax` rule in `eslint.config.js` enforces.
 */

import { TRAINER_CONTENT } from '@content/trainers/index.ts';

import {
  type ExamFormatId,
  type SingleLevelTrainerId,
  type TrainerContent,
  type TrainerDocKey,
  type TrainerId
} from '@shared/types';

import { SPRINT_LEARN_DAYS } from './schedule.ts';

/** User-facing app name. UI-level only — repo, package and storage keys keep theirs. */
export const APP_NAME = 'telc Deutsch Trainer';

export interface TrainerInfo {
  readonly id: TrainerId;
  /** Full exam name, e.g. "telc Deutsch B1". */
  readonly name: string;
  /** Level chip, e.g. "B1". */
  readonly short: string;
  /** Route namespace. Empty string for the trainer that owns the root. */
  readonly basePath: string;
  /** Accent colour of its papers and chips, as a CSS custom property reference. */
  readonly accent: string;
  /** Which paper it sets. Trainers may share one. */
  readonly format: ExamFormatId;
  /**
   * Where its slice of the progress document lives: its own key, or null for the trainer
   * whose attempts, learn plan and settings sit at the root of the document.
   */
  readonly docKey: TrainerDocKey | null;
  /** Everything it studies from. */
  readonly content: TrainerContent;
  /** Lesson days the five-day emergency plan reaches for. */
  readonly sprintLearnDays: readonly number[];
}

/** The trainers, in the order they are offered. */
export const TRAINER_ORDER: readonly TrainerId[] = ['a2b1', 'b1', 'b2'];

export const TRAINERS: Readonly<Record<TrainerId, TrainerInfo>> = {
  a2b1: {
    id: 'a2b1',
    name: 'telc Deutsch A2·B1',
    short: 'A2·B1',
    basePath: '',
    accent: 'var(--primary)',
    format: 'dual-level',
    docKey: null,
    content: TRAINER_CONTENT.a2b1,
    sprintLearnDays: SPRINT_LEARN_DAYS
  },
  b1: {
    id: 'b1',
    name: 'telc Deutsch B1',
    short: 'B1',
    basePath: '/b1',
    accent: 'var(--primary)',
    format: 'single-level',
    docKey: 'b1',
    content: TRAINER_CONTENT.b1,
    sprintLearnDays: SPRINT_LEARN_DAYS
  },
  b2: {
    id: 'b2',
    name: 'telc Deutsch B2',
    short: 'B2',
    basePath: '/b2',
    accent: 'var(--warning)',
    format: 'single-level',
    docKey: 'b2',
    content: TRAINER_CONTENT.b2,
    sprintLearnDays: SPRINT_LEARN_DAYS
  }
};

/**
 * Whether a trainer sets the single-level paper. Stated as a fact about the trainer rather
 * than as "not the original one", so a fourth trainer answers it by its own descriptor.
 *
 * It narrows the id because the registry pairs that paper with a per-trainer document: a
 * trainer that sets it keeps its own slice, keyed by its id.
 */
export const isSingleLevelTrainer = (trainer: TrainerId): trainer is SingleLevelTrainerId =>
  TRAINERS[trainer].format === 'single-level';

/** The single-level trainers, in the order they are offered. Derived, never listed twice. */
export const SINGLE_LEVEL_TRAINERS: readonly SingleLevelTrainerId[] =
  TRAINER_ORDER.filter(isSingleLevelTrainer);

/** The trainer that owns the root of the URL space, and of the progress document. */
export const ROOT_TRAINER: TrainerId =
  TRAINER_ORDER.find(id => TRAINERS[id].basePath === '') ?? TRAINER_ORDER[0] ?? 'a2b1';

/** Its landing route. The root trainer's base path is empty, and `/` is not. */
export const trainerHome = (trainer: TrainerId): string => TRAINERS[trainer].basePath || '/';

/** How many Modelltests a trainer offers. Counted from its content, never restated. */
export const examCount = (trainer: TrainerId): number => TRAINERS[trainer].content.exams.length;

/** Whether a trainer offers a vocabulary and grammar bank to drill. */
export const hasVocabBank = (trainer: TrainerId): boolean => {
  const { vocab } = TRAINERS[trainer].content;
  return (
    vocab.verbs.length +
      vocab.nouns.length +
      vocab.adjectives.length +
      vocab.prepVerbs.length +
      vocab.caseItems.length >
    0
  );
};

/** Whether a trainer ships an exam guide. Drives its Guide tab and route. */
export const hasGuide = (trainer: TrainerId): boolean => TRAINERS[trainer].content.guide !== null;

/** What the trainer offers, in one line, derived from the content it actually ships. */
export const trainerTagline = (trainer: TrainerId): string => {
  const { content } = TRAINERS[trainer];
  const parts = [
    `${String(content.exams.length)} Modelltests`,
    `${String(content.curriculum.days.length)}-Tage-Plan`
  ];
  if (hasVocabBank(trainer)) parts.push('Vokabeln & Grammatik');
  if (hasGuide(trainer)) parts.push('Prüfungsguide');
  return parts.join(' · ');
};

/** Which trainer a pathname belongs to. The root trainer owns everything unclaimed. */
export const trainerFromPath = (pathname: string): TrainerId =>
  TRAINER_ORDER.find(id => {
    const base = TRAINERS[id].basePath;
    return base !== '' && (pathname === base || pathname.startsWith(`${base}/`));
  }) ?? ROOT_TRAINER;
