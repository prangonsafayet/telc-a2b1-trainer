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
  srs: {},
  activity: {},
  b1: emptyTrainerDoc(),
  b2: emptyTrainerDoc()
};

/**
 * Counts practice touches for a day. The streak reads this map, so it is bumped rather
 * than replaced — one shared helper for every trainer's slice, wherever it is stored.
 */
export const bumpActivity = (
  activity: Partial<Record<string, number>>,
  today: string,
  touches = 1
): Partial<Record<string, number>> => ({ ...activity, [today]: (activity[today] ?? 0) + touches });

/**
 * Fills in missing defaults — but returns the caller's own object when nothing is missing.
 *
 * `normalizeDatabase` runs on every write, not just on load, so rebuilding these objects
 * unconditionally handed every consumer a brand-new `settings` on a write that only touched
 * a curriculum checkbox. Everything downstream memoises on those references.
 */
const withDefaults = <T extends object>(defaults: T, input: unknown): T => {
  if (typeof input !== 'object' || input === null) return defaults;
  const candidate = input as T;
  return Object.keys(defaults).every(key => key in candidate) ? candidate : { ...defaults, ...candidate };
};

/** True when normalising changed no field, so the caller's object can be kept as it is. */
const unchanged = <T extends object>(before: Partial<T>, after: T): boolean =>
  Object.keys(after).every(key => before[key as keyof T] === after[key as keyof T]);

/** Coerces anything that claims to be a trainer document, defaulting every field. */
const normalizeTrainerDoc = (raw: unknown): LevelTrainerDoc => {
  const input = (typeof raw === 'object' && raw !== null ? raw : {}) as Partial<LevelTrainerDoc>;
  const normalized: LevelTrainerDoc = {
    ...input,
    attempts: Array.isArray(input.attempts) ? input.attempts : [],
    learnDone: typeof input.learnDone === 'object' ? input.learnDone : {},
    srs: typeof input.srs === 'object' ? input.srs : {},
    activity: typeof input.activity === 'object' ? input.activity : {},
    settings: withDefaults(defaultLevelSettings(), input.settings)
  };
  return unchanged(input, normalized) ? (input as LevelTrainerDoc) : normalized;
};

/**
 * Coerces anything that claims to be a progress document into a usable one. Data can
 * arrive from an older version of the app, a hand-edited import file or the cloud, so
 * every field is defaulted rather than trusted — and every field it does not recognise is
 * carried through untouched, because the writer may simply be a newer build than this one.
 */
export const normalizeDatabase = (raw: unknown): ProgressDatabase => {
  const input = (typeof raw === 'object' && raw !== null ? raw : {}) as Partial<ProgressDatabase>;
  return {
    /* Unrecognised fields are carried over, not dropped. This function runs over the *remote*
       row on its way into `mergeProgress`, so a whitelist rebuild here means a device on an
       older cached build strips a newer build's field — a fourth trainer's document, say —
       and pushes the stripped copy back, deleting that progress from the cloud. That is the
       trainer-document wipe again, one rollout step removed. Every known field below is still
       validated, so nothing untrusted is believed. */
    ...input,
    attempts: Array.isArray(input.attempts) ? input.attempts : [],
    learnDone: typeof input.learnDone === 'object' ? input.learnDone : {},
    settings: withDefaults(DEFAULT_SETTINGS, input.settings),
    srs: typeof input.srs === 'object' ? input.srs : {},
    activity: typeof input.activity === 'object' ? input.activity : {},
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
