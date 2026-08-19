/** Public surface of the progress feature. */
export { ProgressProvider } from './providers/ProgressProvider.tsx';
export { useProgress, useSettings } from './hooks/use-progress.ts';
export { EMPTY_DATABASE, normalizeDatabase, PROGRESS_STORAGE_KEY, stamp } from './lib/progress-db.ts';
export type { ProgressContextValue, ProgressRecipe } from './providers/ProgressProvider.tsx';
