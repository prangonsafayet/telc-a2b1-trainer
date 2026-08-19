import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject
} from 'react';

import { type ProgressDatabase } from '@shared/types';

import { loadDatabase, normalizeDatabase, persistDatabase, stamp } from '../lib/progressDb.ts';

/** A change to the stored document, expressed as a pure function. */
export type ProgressRecipe = (current: ProgressDatabase) => ProgressDatabase;

export interface ProgressContextValue {
  readonly db: ProgressDatabase;
  /** Always-current value, for callbacks that must not close over a stale render. */
  readonly dbRef: RefObject<ProgressDatabase>;
  /** Applies a change, stamps it and writes through to localStorage. */
  readonly update: (recipe: ProgressRecipe) => void;
  /**
   * Saves without re-stamping `_updatedAt`. Used when cloud sync hands back a merged
   * document, so the two sides do not fight over which is newer.
   */
  readonly replaceLocal: (next: ProgressDatabase) => void;
}

export const ProgressContext = createContext<ProgressContextValue | null>(null);

/** Single source of truth for attempts, learn-plan state and settings. */
export function ProgressProvider({ children }: { readonly children: ReactNode }) {
  const [db, setDb] = useState<ProgressDatabase>(loadDatabase);

  /* A stable handle on the current document for callbacks that must not close over a
     stale render — cloud sync in particular. Kept in sync after commit, and also written
     directly by `update`/`replaceLocal` so a push scheduled in the same tick is correct. */
  const dbRef = useRef<ProgressDatabase>(db);
  useEffect(() => {
    dbRef.current = db;
  }, [db]);

  const update = useCallback((recipe: ProgressRecipe) => {
    setDb(current => {
      const next = stamp(normalizeDatabase(recipe(current)));
      persistDatabase(next);
      dbRef.current = next;
      return next;
    });
  }, []);

  const replaceLocal = useCallback((next: ProgressDatabase) => {
    const normalized = normalizeDatabase(next);
    persistDatabase(normalized);
    dbRef.current = normalized;
    setDb(normalized);
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({ db, dbRef, update, replaceLocal }),
    [db, update, replaceLocal]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
