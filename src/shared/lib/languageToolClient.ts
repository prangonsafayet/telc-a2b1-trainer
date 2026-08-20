import {
  LANGUAGE_TOOL_CACHE_ENTRIES,
  LANGUAGE_TOOL_LANGUAGE,
  LANGUAGE_TOOL_MAX_CHARS,
  LANGUAGE_TOOL_TIMEOUT_MS,
  getLanguageToolBase,
  isDynamicFeedbackEnabled
} from '@shared/config/languageTool.ts';
import { type LtMatch, type LtResult } from '@shared/types';

export const isLanguageToolConfigured = (): boolean => isDynamicFeedbackEnabled();

/* Same text, same answer. The generator checks one sentence per distractor, so the same
   authored sentence is submitted many times in a session. */
const cache = new Map<string, LtResult>();

const remember = (key: string, result: LtResult): LtResult => {
  if (result.kind === 'ok') {
    if (cache.size >= LANGUAGE_TOOL_CACHE_ENTRIES) {
      const oldest = cache.keys().next().value;
      if (oldest !== undefined) cache.delete(oldest);
    }
    cache.set(key, result);
  }
  return result;
};

const parseMatches = (payload: unknown): readonly LtMatch[] => {
  if (typeof payload !== 'object' || payload === null) return [];
  const { matches } = payload as { matches?: unknown };
  return Array.isArray(matches) ? (matches as readonly LtMatch[]) : [];
};

export const checkText = async (
  text: string,
  options: { readonly level?: 'default' | 'picky' } = {}
): Promise<LtResult> => {
  if (!isLanguageToolConfigured()) return { kind: 'unavailable', reason: 'not-configured' };
  if (text.length > LANGUAGE_TOOL_MAX_CHARS) return { kind: 'unavailable', reason: 'too-long' };

  const level = options.level ?? 'default';
  const key = `${level}:${text}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const body = new URLSearchParams({ text, language: LANGUAGE_TOOL_LANGUAGE, level });

  try {
    const response = await fetch(`${getLanguageToolBase()}/v2/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body,
      signal: AbortSignal.timeout(LANGUAGE_TOOL_TIMEOUT_MS)
    });
    if (response.status === 429) return { kind: 'unavailable', reason: 'rate-limited' };
    if (response.status === 413) return { kind: 'unavailable', reason: 'too-long' };
    if (!response.ok) return { kind: 'unavailable', reason: 'error' };
    return remember(key, { kind: 'ok', matches: parseMatches(await response.json()) });
  } catch {
    /* A timeout and a dead server are the same thing to a learner: no feedback this time. */
    return { kind: 'unavailable', reason: 'offline' };
  }
};
