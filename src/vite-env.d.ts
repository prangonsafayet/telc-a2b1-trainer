/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Comma-separated OAuth provider ids, e.g. "google,github". */
  readonly VITE_AUTH_PROVIDERS?: string;
  /** Absolute public URL, used for canonical/OG tags and the sitemap. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Injected by Vite at build time from package.json — see `define` in vite.config.ts. */
declare const __APP_VERSION__: string;
/** Short commit SHA of the deployed build; empty in local development. */
declare const __APP_COMMIT__: string;
