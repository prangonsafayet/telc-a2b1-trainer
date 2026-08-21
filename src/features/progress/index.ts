/**
 * Public surface of the progress feature: the stored document, one trainer's slice of it,
 * and the JSON backup. The import planner, the empty-document builders and the provider's
 * own types stay internal — nothing outside this feature reads them.
 */
export { ProgressProvider } from './providers/ProgressProvider.tsx';
export { useProgress, useSettings } from './hooks/useProgress.ts';
export { useProgressBackup } from './hooks/useProgressBackup.ts';
export { touchActivity, useTrainerSlice } from './hooks/useTrainerSlice.ts';
export { EMPTY_DATABASE, normalizeDatabase, PROGRESS_STORAGE_KEY, stamp } from './lib/progressDb.ts';
export type { TrainerSlice } from './hooks/useTrainerSlice.ts';
