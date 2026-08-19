/**
 * Supabase configuration, read from the Vite environment.
 *
 * `VITE_*` values are inlined at build time, which is correct for the anon/publishable
 * key: it is designed to be public and is constrained by row-level security. A
 * service-role or `sb_secret_` key must never appear here — the build and the Settings
 * panel both reject one.
 */
export interface SupabaseConfig {
  readonly url: string;
  readonly anonKey: string;
}

export const SUPABASE_CONFIG: SupabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL ?? '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''
};

/** Providers offered on the sign-in card, from `VITE_AUTH_PROVIDERS`. */
export const CONFIGURED_PROVIDER_IDS = (import.meta.env.VITE_AUTH_PROVIDERS ?? 'google,github')
  .split(',')
  .map(id => id.trim().toLowerCase())
  .filter(Boolean);
