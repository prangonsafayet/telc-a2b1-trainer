/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Comma-separated OAuth provider ids, e.g. "google,github". */
  readonly VITE_AUTH_PROVIDERS?: string;
  /** Absolute public URL, used for canonical/OG tags and the sitemap. */
  readonly VITE_SITE_URL?: string;
  /** Feature switch for dynamic feedback; the actual server address is never shipped here. */
  readonly VITE_DYNAMIC_FEEDBACK?: string;
  /** Local-dev-only override: a LanguageTool instance to call directly, e.g. http://localhost:8010. */
  readonly VITE_LANGUAGETOOL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Injected by Vite at build time from package.json — see `define` in vite.config.ts. */
declare const __APP_VERSION__: string;
/** Short commit SHA of the deployed build; empty in local development. */
declare const __APP_COMMIT__: string;
