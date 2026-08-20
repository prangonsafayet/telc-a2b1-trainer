import { DEFAULT_SETTINGS } from '@shared/config/exam.ts';
import { defaultLevelSettings } from '@shared/config/singleLevelExam.ts';
import { readLocalJson, writeLocal } from '@shared/lib/storage.ts';
import { type LevelTrainerDoc, type ProgressDatabase } from '@shared/types';

/** localStorage key. Stable since v1 — do not rename without a migration. */
export const PROGRESS_STORAGE_KEY = 'telcTrainerV1';

/** A fresh B1/B2 trainer document. */
export const emptyTrainerDoc = (): LevelTrainerDoc => ({
  attempts: [],
  learnDone: {},
  srs: {},
  activity: {},
  settings: defaultLevelSettings()
});

export const EMPTY_DATABASE: ProgressDatabase = {
  attempts: [],
  learnDone: {},
  settings: DEFAULT_SETTINGS,
  b1: emptyTrainerDoc(),
  b2: emptyTrainerDoc()
};

/** Coerces anything that claims to be a trainer document, defaulting every field. */
const normalizeTrainerDoc = (raw: unknown): LevelTrainerDoc => {
  const input = (typeof raw === 'object' && raw !== null ? raw : {}) as Partial<LevelTrainerDoc>;
  return {
    attempts: Array.isArray(input.attempts) ? input.attempts : [],
    learnDone: typeof input.learnDone === 'object' ? input.learnDone : {},
    srs: typeof input.srs === 'object' ? input.srs : {},
    activity: typeof input.activity === 'object' ? input.activity : {},
    settings: { ...defaultLevelSettings(), ...(input.settings ?? {}) }
  };
};

/**
 * Coerces anything that claims to be a progress document into a usable one. Data can
 * arrive from an older version of the app, a hand-edited import file or the cloud, so
 * every field is defaulted rather than trusted.
 */
export const normalizeDatabase = (raw: unknown): ProgressDatabase => {
  const input = (typeof raw === 'object' && raw !== null ? raw : {}) as Partial<ProgressDatabase>;
  return {
    attempts: Array.isArray(input.attempts) ? input.attempts : [],
    learnDone: typeof input.learnDone === 'object' ? input.learnDone : {},
    settings: { ...DEFAULT_SETTINGS, ...(input.settings ?? {}) },
    b1: normalizeTrainerDoc(input.b1),
    b2: normalizeTrainerDoc(input.b2),
    ...(input._updatedAt ? { _updatedAt: input._updatedAt } : {})
  };
};

export const loadDatabase = (): ProgressDatabase => normalizeDatabase(readLocalJson(PROGRESS_STORAGE_KEY));

export const persistDatabase = (db: ProgressDatabase): void => {
  writeLocal(PROGRESS_STORAGE_KEY, JSON.stringify(db));
};

/** Stamps the change so cloud sync can tell which side is newer. */
export const stamp = (db: ProgressDatabase): ProgressDatabase => ({
  ...db,
  _updatedAt: new Date().toISOString()
});
