import { DEFAULT_SETTINGS } from '@/shared/config/exam.ts';
import { readLocalJson, writeLocal } from '@/shared/lib/local-storage.ts';
import { type ProgressDatabase } from '@/shared/types';

/** localStorage key. Stable since v1 — do not rename without a migration. */
export const PROGRESS_STORAGE_KEY = 'telcTrainerV1';

export const EMPTY_DATABASE: ProgressDatabase = {
  attempts: [],
  learnDone: {},
  settings: DEFAULT_SETTINGS
};

/**
 * Coerces anything that claims to be a progress document into a usable one. Data can
 * arrive from an older version of the app, a hand-edited import file or the cloud, so
 * every field is defaulted rather than trusted.
 */
export function normalizeDatabase(raw: unknown): ProgressDatabase {
  const input = (typeof raw === 'object' && raw !== null ? raw : {}) as Partial<ProgressDatabase>;
  return {
    attempts: Array.isArray(input.attempts) ? input.attempts : [],
    learnDone: typeof input.learnDone === 'object' ? input.learnDone : {},
    settings: { ...DEFAULT_SETTINGS, ...(input.settings ?? {}) },
    ...(input._updatedAt ? { _updatedAt: input._updatedAt } : {})
  };
}

export function loadDatabase(): ProgressDatabase {
  return normalizeDatabase(readLocalJson(PROGRESS_STORAGE_KEY));
}

export function persistDatabase(db: ProgressDatabase): void {
  writeLocal(PROGRESS_STORAGE_KEY, JSON.stringify(db));
}

/** Stamps the change so cloud sync can tell which side is newer. */
export function stamp(db: ProgressDatabase): ProgressDatabase {
  return { ...db, _updatedAt: new Date().toISOString() };
}
