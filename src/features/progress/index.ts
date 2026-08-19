/** Public surface of the progress feature. */
export { ProgressProvider } from './providers/ProgressProvider.tsx';
export { useProgress, useSettings } from './hooks/useProgress.ts';
export { touchActivity, useTrainerDoc } from './hooks/useTrainerDoc.ts';
export {
  EMPTY_DATABASE,
  emptyTrainerDoc,
  normalizeDatabase,
  PROGRESS_STORAGE_KEY,
  stamp
} from './lib/progressDb.ts';
export type { ProgressContextValue, ProgressRecipe } from './providers/ProgressProvider.tsx';
export type { TrainerDocHandle, TrainerRecipe } from './hooks/useTrainerDoc.ts';
