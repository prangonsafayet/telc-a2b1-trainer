/**
 * An in-memory `Storage`, installed on the global before anything reads it.
 *
 * Two reasons, one per project:
 *
 *   render  happy-dom ships no Storage at all, and the whole app persists through
 *           localStorage — without one, every persistence assertion would pass vacuously.
 *   logic   Node 22+ defines `localStorage` as an experimental getter that is unusable
 *           without `--localstorage-file`. Reading it warns, and `@shared/lib/storage.ts`
 *           then falls through to its private in-memory fallback — so the suite tested the
 *           degraded path and printed an `ExperimentalWarning` per worker on every run.
 *
 * Installed with `defineProperty` and never conditionally: `typeof globalThis.localStorage`
 * is itself what invokes Node's getter and emits the warning, so the check was the noise.
 * An in-memory store is also better for tests than a real one — every file starts empty
 * instead of inheriting what the last run wrote.
 */

const createStorage = (): Storage => {
  const entries = new Map<string, string>();
  return {
    get length(): number {
      return entries.size;
    },
    clear: () => entries.clear(),
    getItem: (key: string) => entries.get(key) ?? null,
    key: (index: number) => [...entries.keys()][index] ?? null,
    removeItem: (key: string) => {
      entries.delete(key);
    },
    setItem: (key: string, value: string) => {
      entries.set(key, String(value));
    }
  } as unknown as Storage;
};

/** Installs `localStorage` (and `sessionStorage`) on every global the app might read it from. */
export const installMemoryStorage = (): void => {
  for (const name of ['localStorage', 'sessionStorage'] as const) {
    const storage = createStorage();
    /* `window` is happy-dom's; in the node project there is only `globalThis`. */
    const targets: object[] = [globalThis];
    if (typeof window !== 'undefined' && window !== globalThis) targets.push(window);
    for (const target of targets) {
      Object.defineProperty(target, name, { value: storage, configurable: true, writable: true });
    }
  }
};
