/* Cloud sync configuration (Supabase).
   Leave both values empty ("") and the app works 100% locally, as before.
   To enable cloud sync, paste your own values from supabase.com — see HOSTING.md, Part 1. */
window.SYNC_CONFIG = {
  supabaseUrl: "https://REDACTED_PROJECT_REF.supabase.co/rest/v1/",      // e.g. "https://abcdefghijkl.supabase.co"   (Project Settings → Data API)
  supabaseAnonKey: "REDACTED_SUPABASE_PUBLISHABLE_KEY"   // the long "anon / public" key              (Project Settings → API Keys)
};
