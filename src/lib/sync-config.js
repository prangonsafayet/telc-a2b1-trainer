/* Cloud sync configuration (Supabase) — read from the Vite environment.
   Copy .env.example to .env and fill in your own values; .env is git-ignored.
   Leave them unset and the app works 100% locally, as before. See HOSTING.md, Part 1.

   Note: VITE_* variables are inlined into the client bundle at build time. That is
   correct for the Supabase *anon / publishable* key, which is designed to be public and
   is protected by row-level security — never put a service-role key here. */
export const SYNC_CONFIG = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
};
