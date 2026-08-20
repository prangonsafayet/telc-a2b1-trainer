/** Public surface of the progress feature. */
export { ProgressProvider } from './providers/ProgressProvider.tsx';
export { useProgress, useSettings } from './hooks/useProgress.ts';
export { useProgressBackup } from './hooks/useProgressBackup.ts';
export { touchActivity, useTrainerSlice } from './hooks/useTrainerSlice.ts';
export {
  EMPTY_DATABASE,
  emptyTrainerDoc,
  normalizeDatabase,
  PROGRESS_STORAGE_KEY,
  stamp
} from './lib/progressDb.ts';
export type { ProgressBackup } from './hooks/useProgressBackup.ts';
export type { ProgressContextValue, ProgressRecipe } from './providers/ProgressProvider.tsx';
export type {
  ActivityMap,
  TrainerSlice,
  TrainerSliceRecipe,
  TrainerSliceState
} from './hooks/useTrainerSlice.ts';
