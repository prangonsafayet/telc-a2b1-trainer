import { afterEach } from 'vitest';

/**
 * What happy-dom does not implement but the app needs. Deliberately short: it already
 * provides matchMedia, both observers, scrollIntoView and pointer capture, so anything
 * still missing here is a hint that the behaviour belongs in the Playwright suite instead.
 */

/* React needs to know it is in a test, or `act` warns on every render. */
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/**
 * happy-dom ships no Storage, and the whole app persists through localStorage. An
 * in-memory one is also better for tests than the real thing: every file starts empty
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

const installStorage = (name: 'localStorage' | 'sessionStorage'): void => {
  const storage = createStorage();
  for (const target of [globalThis, window]) {
    Object.defineProperty(target, name, { value: storage, configurable: true, writable: true });
  }
};

if (typeof globalThis.localStorage === 'undefined') installStorage('localStorage');
if (typeof globalThis.sessionStorage === 'undefined') installStorage('sessionStorage');

/* A test that fails before it unmounts would otherwise leave its tree in the shared
   document, and the next test would query the wrong page and fail for the wrong reason. */
afterEach(() => {
  document.body.innerHTML = '';
});
