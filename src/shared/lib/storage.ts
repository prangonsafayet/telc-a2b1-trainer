/**
 * localStorage that degrades instead of throwing. Private-browsing modes and
 * storage-disabled browsers reject writes, and losing progress is preferable to
 * crashing mid-exam — so an in-memory map stands in for the rest of the session.
 */
const fallback = new Map<string, string>();

export const readLocal = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return fallback.get(key) ?? null;
  }
};

export const writeLocal = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    fallback.set(key, value);
  }
};

export const removeLocal = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    fallback.delete(key);
  }
};

/**
 * Reads and parses a JSON value, returning `null` when absent or malformed. Deliberately
 * `unknown`: stored data can come from an older version of the app or a hand-edited
 * import file, so every caller has to validate it rather than assert a shape.
 */
export const readLocalJson = (key: string): unknown => {
  const raw = readLocal(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
