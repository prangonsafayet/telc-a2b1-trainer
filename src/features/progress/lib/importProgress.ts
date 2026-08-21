/**
 * Reading a backup file into the stored document.
 *
 * Import replaces rather than merges — that is what a restore means, and merging would make
 * rolling back to an older backup impossible. But a file written before a trainer existed
 * says *nothing* about that trainer, which is not the same as asking for it to be deleted:
 * restoring a pre-B1/B2 backup used to empty both trainer documents silently, and the fresh
 * `_updatedAt` then pushed that emptiness to the cloud and every other device. So a trainer
 * the file does not mention keeps what it has, and the confirm dialog names both lists.
 */

import { TRAINER_ORDER, TRAINERS } from '@shared/config/trainers.ts';
import { type ProgressDatabase, type TrainerId } from '@shared/types';

import { normalizeDatabase } from './progressDb.ts';

/**
 * What proves the file carries the root trainer's slice. `settings` is not on the list: it
 * holds exam conditions rather than work done, so a file with settings and no attempts is
 * not evidence that the root trainer was exported.
 */
const ROOT_PROGRESS_FIELDS = ['attempts', 'learnDone', 'srs', 'activity'] as const;

/** What is carried over when the file does not mention the root trainer — its whole slice. */
const ROOT_SLICE_FIELDS = [...ROOT_PROGRESS_FIELDS, 'settings'] as const;

export interface ImportPlan {
  /** The document to store: the file, plus every unmentioned trainer's own progress. */
  readonly database: ProgressDatabase;
  /** Trainers the file carries, whose stored progress it replaces. */
  readonly replaces: readonly TrainerId[];
  /** Trainers the file says nothing about, whose stored progress is kept. */
  readonly keeps: readonly TrainerId[];
}

/** Whether the file carries this trainer's slice at all. */
const mentions = (file: Partial<Record<string, unknown>>, trainer: TrainerId): boolean => {
  const docKey = TRAINERS[trainer].docKey;
  return docKey === null ? ROOT_PROGRESS_FIELDS.some(field => field in file) : docKey in file;
};

/**
 * What importing this file would do, or null if it is not a trainer export at all.
 *
 * Pure, and separate from the hook, because it is the whole decision: which trainers the
 * file speaks for, which ones keep what they have, and the document that comes out.
 */
export const planImport = (current: ProgressDatabase, parsed: unknown): ImportPlan | null => {
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
  const file = parsed as Partial<Record<string, unknown>>;

  const replaces: TrainerId[] = [];
  const keeps: TrainerId[] = [];
  const next: Partial<Record<string, unknown>> = { ...file };

  for (const trainer of TRAINER_ORDER) {
    if (mentions(file, trainer)) {
      replaces.push(trainer);
      continue;
    }
    keeps.push(trainer);
    const docKey = TRAINERS[trainer].docKey;
    if (docKey === null) {
      for (const field of ROOT_SLICE_FIELDS) next[field] = current[field];
    } else {
      next[docKey] = current[docKey];
    }
  }

  /* A file that speaks for no trainer is not a trainer export: `{}`, an array, or simply the
     wrong file. Refusing it beats importing it as "no progress" over everything stored. */
  if (replaces.length === 0) return null;

  return { database: normalizeDatabase(next), replaces, keeps };
};

const listNames = (trainers: readonly TrainerId[]): string =>
  trainers.map(trainer => TRAINERS[trainer].short).join(', ');

/**
 * What the confirm dialog says an import will do. Here rather than in the component so no
 * screen writes copy of its own about it — and so the claim can be tested next to the
 * behaviour it describes.
 */
export const describeImport = (plan: ImportPlan): string => {
  const replaced = `Attempts, learn-plan ticks and exam conditions for ${listNames(plan.replaces)} will be replaced by the ones in the file.`;
  const kept =
    plan.keeps.length === 0
      ? ''
      : ` ${listNames(plan.keeps)} ${plan.keeps.length === 1 ? 'is' : 'are'} not in the file, so ${plan.keeps.length === 1 ? 'its' : 'their'} progress stays exactly as it is.`;
  return `${replaced}${kept} If you are signed in, the result syncs to the cloud and to your other devices.`;
};
