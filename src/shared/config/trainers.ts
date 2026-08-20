/** The three trainers the app hosts and how the UI addresses them. */

import { type SingleLevelTrainerId, type TrainerId } from '@shared/types';

/** User-facing app name. UI-level only — repo, package and storage keys keep theirs. */
export const APP_NAME = 'telc Deutsch Trainer';

export interface TrainerInfo {
  readonly id: TrainerId;
  /** Full exam name, e.g. "telc Deutsch B1". */
  readonly name: string;
  /** Level chip, e.g. "B1". */
  readonly short: string;
  /** Route namespace. Empty string for the original trainer, which owns the root. */
  readonly basePath: string;
  /** One-line subtitle under the app name while this trainer is active. */
  readonly tagline: string;
  readonly examCount: number;
}

export const TRAINER_ORDER: readonly TrainerId[] = ['a2b1', 'b1', 'b2'];

/** The two single-level trainers, in the order they are offered. */
export const SINGLE_LEVEL_TRAINERS: readonly SingleLevelTrainerId[] = ['b1', 'b2'];

export const TRAINERS: Readonly<Record<TrainerId, TrainerInfo>> = {
  a2b1: {
    id: 'a2b1',
    name: 'telc Deutsch A2·B1',
    short: 'A2·B1',
    basePath: '',
    tagline: '15 Modelltests · Lesen · Sprachbausteine · Hören · Schreiben · Sprechen',
    examCount: 15
  },
  b1: {
    id: 'b1',
    name: 'telc Deutsch B1',
    short: 'B1',
    basePath: '/b1',
    tagline: 'Zertifikat Deutsch · Vokabeln, Grammatik & 10 Modelltests',
    examCount: 10
  },
  b2: {
    id: 'b2',
    name: 'telc Deutsch B2',
    short: 'B2',
    basePath: '/b2',
    tagline: 'Vokabeln, Grammatik & 10 Modelltests',
    examCount: 10
  }
};

export const isSingleLevelTrainer = (trainer: TrainerId): trainer is SingleLevelTrainerId =>
  trainer !== 'a2b1';

/** Which trainer a pathname belongs to. The original trainer owns everything else. */
export const trainerFromPath = (pathname: string): TrainerId => {
  if (pathname === '/b1' || pathname.startsWith('/b1/')) return 'b1';
  if (pathname === '/b2' || pathname.startsWith('/b2/')) return 'b2';
  return 'a2b1';
};
