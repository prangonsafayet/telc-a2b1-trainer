/**
 * Where LanguageTool lives and how hard we are willing to lean on it.
 *
 * The `erikvl87/languagetool` Docker image has no CORS setting, so the browser cannot
 * call it directly in production: it calls our own origin instead, at the relative path
 * `/api/lt`, which a Netlify Function (added separately, alongside the hosting work)
 * forwards to the real server-side address. `VITE_LANGUAGETOOL_URL` overrides that default
 * for local development, pointing straight at a directly-reachable instance such as
 * `http://localhost:8010` — exempt from mixed-content blocking, and needs no proxy.
 *
 * Because the relative default always resolves to *something*, "is LanguageTool
 * configured" cannot be "is a base URL non-empty" — that would always be true and the
 * `not-configured` result would never fire, even in a build with no server behind
 * `/api/lt`. It is instead an explicit build-time switch, `VITE_DYNAMIC_FEEDBACK`, so a
 * build with the flag off behaves exactly like today's app regardless of what the base
 * resolves to.
 */

/** Read fresh on every call — see the module doc comment on why this is a function. */
const readEnv = (name: 'VITE_LANGUAGETOOL_URL' | 'VITE_DYNAMIC_FEEDBACK'): string =>
  (import.meta.env[name] ?? '').trim();

/** The feature switch. Off unless explicitly turned on, independent of the base below. */
export const isDynamicFeedbackEnabled = (): boolean => {
  const flag = readEnv('VITE_DYNAMIC_FEEDBACK').toLowerCase();
  return flag === 'true' || flag === '1';
};

/**
 * Base URL to POST a check to. `VITE_LANGUAGETOOL_URL` overrides it for local dev; the
 * same-origin proxy path is the production default. A function, not a constant, for the
 * same reason as `isDynamicFeedbackEnabled`: it must see a later `vi.stubEnv`.
 */
export const getLanguageToolBase = (): string => {
  const override = readEnv('VITE_LANGUAGETOOL_URL').replace(/\/+$/, '');
  return override.length > 0 ? override : '/api/lt';
};

/** German as the exam is set. */
export const LANGUAGE_TOOL_LANGUAGE = 'de-DE';

/** A check the learner is waiting on must not hang; 8 s is generous for a 200-word letter. */
export const LANGUAGE_TOOL_TIMEOUT_MS = 8_000;

/**
 * The public API caps a request at 20 KB. A self-hosted instance does not, but keeping the
 * cap means the same code works against either, and a learner's letter never approaches it.
 */
export const LANGUAGE_TOOL_MAX_CHARS = 20_000;

/** Identical text is checked once; the generator re-checks the same sentences constantly. */
export const LANGUAGE_TOOL_CACHE_ENTRIES = 500;

/** Concurrency and backoff, so a burst of generated items cannot stampede the server. */
export const LANGUAGE_TOOL_MAX_CONCURRENT = 4;
export const LANGUAGE_TOOL_RETRY_DELAYS_MS = [400, 1_200, 3_000] as const;
