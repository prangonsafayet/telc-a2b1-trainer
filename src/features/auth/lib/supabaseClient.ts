import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { SUPABASE_CONFIG } from './supabaseConfig.ts';

/**
 * Normalises the project URL so common paste mistakes still work:
 * a dashboard link, a bare host, or a URL with `/rest/v1` appended.
 */
function normalizeProjectUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/+$/, '');
  const dashboard = /supabase\.com\/dashboard\/project\/([a-z0-9-]+)/i.exec(trimmed);
  if (dashboard) return `https://${dashboard[1] ?? ''}.supabase.co`;
  if (/^[a-z0-9-]+\.supabase\.(co|in|red|net)$/i.test(trimmed)) return `https://${trimmed}`;
  const withPath = /^(https?:\/\/[a-z0-9-]+\.supabase\.(?:co|in|red|net))(\/.*)?$/i.exec(trimmed);
  if (withPath?.[1]) return withPath[1].replace(/^http:/i, 'https:');
  return trimmed;
}

function decodeJwtPayload(token: string): string {
  try {
    return atob(token.split('.')[1] ?? '');
  } catch {
    return '';
  }
}

const projectUrl = normalizeProjectUrl(SUPABASE_CONFIG.url);
const anonKey = SUPABASE_CONFIG.anonKey.trim();

const urlValid = /^https:\/\/[a-z0-9-]+\.supabase\.(co|in|red|net)$/i.test(projectUrl);
/** A secret key must never reach a browser: it bypasses row-level security entirely. */
const keyIsSecret =
  /^sb_secret_/i.test(anonKey) || /"role"\s*:\s*"service_role"/.test(decodeJwtPayload(anonKey));
const keyLooksValid =
  anonKey !== '' && !keyIsSecret && (/^sb_publishable_/i.test(anonKey) || anonKey.startsWith('eyJ'));

export const isSyncConfigured = projectUrl !== '' && urlValid && anonKey !== '' && keyLooksValid;

/** Everything the Settings panel needs to explain *why* sync is off. */
export interface SyncDiagnostics {
  readonly mode: string;
  readonly urlPresent: boolean;
  readonly urlValid: boolean;
  readonly projectUrl: string;
  readonly keyPresent: boolean;
  readonly keyLooksValid: boolean;
  readonly keyIsSecret: boolean;
  readonly keyPreview: string;
}

export const syncDiagnostics: SyncDiagnostics = {
  mode: import.meta.env.MODE,
  urlPresent: SUPABASE_CONFIG.url.trim() !== '',
  urlValid,
  projectUrl,
  keyPresent: anonKey !== '',
  keyLooksValid,
  keyIsSecret,
  keyPreview: anonKey ? `${anonKey.slice(0, 12)}…${anonKey.slice(-4)}` : ''
};

if (keyIsSecret) {
  console.error(
    'Supabase: VITE_SUPABASE_ANON_KEY looks like a SECRET key. Never ship one to the browser — ' +
      'use the anon / publishable key. Cloud sync has been disabled.'
  );
}

/**
 * Auth hardening:
 * - `pkce` keeps tokens out of the URL: the redirect carries a single-use code that only
 *   the browser which started the sign-in can exchange, so a shared callback URL is inert.
 * - `detectSessionInUrl` completes that exchange on load and strips the code from the URL.
 * - `autoRefreshToken` + `persistSession` keep the session alive without the app ever
 *   handling a refresh token itself.
 */
export const supabase: SupabaseClient | null = isSyncConfigured
  ? createClient(projectUrl, anonKey, {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        autoRefreshToken: true,
        persistSession: true,
        storageKey: 'telcTrainerAuth'
      }
    })
  : null;

/** Table holding one JSON progress document per user. */
export const PROGRESS_TABLE = 'progress';
