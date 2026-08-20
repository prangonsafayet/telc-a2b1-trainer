import { readFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/* VITE_* values are inlined at build time, so a build that runs without them produces a
   site with cloud sync permanently off — and nothing in the hosting dashboard will say
   so. Fail loudly in the build log instead. */
/* Crawlers require absolute URLs in canonical/OG tags, so the deploy URL is injected at
   build time from VITE_SITE_URL (Netlify also exposes it as URL / DEPLOY_PRIME_URL). */
const siteUrlHtml = (env: Record<string, string>): Plugin => {
  const site = (env.VITE_SITE_URL || env.DEPLOY_PRIME_URL || env.URL || '').trim().replace(/\/+$/, '');
  return {
    name: 'site-url-html',
    /* Must run before vite:build-html, which decodeURI()s href attributes and would
       choke on a placeholder token. */
    transformIndexHtml: {
      order: 'pre',
      handler: (html: string) => {
        if (!site) {
          console.warn(
            '[site-url-html] VITE_SITE_URL is not set — canonical, og:url and og:image tags are omitted from index.html.'
          );
          /* Better to omit these tags than to publish a wrong absolute URL. */
          /* Better to omit these than to publish a wrong absolute URL. */
          return html
            .replace(
              /^.*(?:rel="canonical"|property="og:url"|property="og:image"|name="twitter:image").*$\n?/gm,
              ''
            )
            .replace(/__SITE_URL__/g, '');
        }
        return html.replace(/__SITE_URL__/g, site);
      }
    },
    generateBundle() {
      if (!site) return;
      const pages = ['/', '/learn', '/guide'];
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          pages.map(u => `  <url><loc>${site}${u}</loc><changefreq>monthly</changefreq></url>`).join('\n') +
          '\n</urlset>\n'
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source:
          'User-agent: *\nAllow: /\n\n' +
          '# Per-user attempt screens hold nothing crawlable.\n' +
          'Disallow: /exam/\nDisallow: /results/\nDisallow: /review/\n\n' +
          `Sitemap: ${site}/sitemap.xml\n`
      });
    }
  };
};

const supabaseEnvCheck = (env: Record<string, string>): Plugin => ({
  name: 'supabase-env-check',
  apply: 'build',
  buildStart() {
    const url = (env.VITE_SUPABASE_URL || '').trim();
    const key = (env.VITE_SUPABASE_ANON_KEY || '').trim();
    if (url && key) {
      this.info(`Supabase cloud sync will be enabled (${url}).`);
      if (/^sb_secret_/i.test(key)) {
        this.error(
          'VITE_SUPABASE_ANON_KEY is a SECRET key. Use the anon / publishable key — never ship a secret to the browser.'
        );
      }
      return;
    }
    this.warn(
      'Building WITHOUT Supabase credentials — cloud sync will be off in this build.\n' +
        `    VITE_SUPABASE_URL      ${url ? 'ok' : 'MISSING'}\n` +
        `    VITE_SUPABASE_ANON_KEY ${key ? 'ok' : 'MISSING'}\n` +
        '    Locally: create .env (see .env.example). On Netlify: Site configuration →\n' +
        '    Environment variables, then trigger a new deploy. See HOSTING.md.'
    );
  }
});

/*
 * Dynamic feedback (LanguageTool) is off unless VITE_DYNAMIC_FEEDBACK is explicitly set,
 * regardless of VITE_LANGUAGETOOL_URL — see src/shared/config/languageTool.ts for why the
 * two are independent. The base the client calls defaults to the same-origin proxy path
 * `/api/lt` (a Netlify Function forwards it to the real server; added with the hosting
 * work), so VITE_LANGUAGETOOL_URL only matters as a local-dev override pointing straight
 * at an instance such as http://localhost:8010.
 */
const languageToolCheck = (env: Record<string, string>): Plugin => ({
  name: 'languagetool-check',
  apply: 'build',
  buildStart() {
    const flag = (env.VITE_DYNAMIC_FEEDBACK || '').trim().toLowerCase();
    const enabled = flag === 'true' || flag === '1';
    if (!enabled) {
      this.warn(
        'Building WITHOUT VITE_DYNAMIC_FEEDBACK — generated practice items and writing feedback will be off in this build.'
      );
      return;
    }
    const override = (env.VITE_LANGUAGETOOL_URL || '').trim();
    if (!override) {
      this.info('Dynamic feedback will call LanguageTool through the same-origin proxy at /api/lt.');
      return;
    }
    this.info(`Dynamic feedback will call LanguageTool directly at ${override} (local-dev override).`);
    if (override.startsWith('http://') && !/^http:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(override)) {
      this.error(
        'VITE_LANGUAGETOOL_URL is http:// and not localhost. The site is served over HTTPS, so the browser will block the call as mixed content. Use the same-origin proxy instead (leave VITE_LANGUAGETOOL_URL unset) or put the server behind HTTPS.'
      );
    }
  }
});

/**
 * One alias per layer, so an import statement shows which layer it crosses. There is
 * deliberately no catch-all '@': two spellings of the same path would let a boundary
 * violation slip past the no-restricted-imports patterns in eslint.config.js.
 *
 * Exported because vitest.config.ts resolves the same layers, and two copies of this map
 * would drift.
 */
export const LAYER_ALIASES = {
  '@app': path.resolve(import.meta.dirname, './src/app'),
  '@features': path.resolve(import.meta.dirname, './src/features'),
  '@shared': path.resolve(import.meta.dirname, './src/shared'),
  '@content': path.resolve(import.meta.dirname, './src/content')
};

/** Single source of truth for the version: package.json, bumped by the release workflow. */
const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as {
  version: string;
};

/**
 * Build-time constants the app reads through `@shared/config/appInfo.ts`. Exported so the
 * test config defines them the same way — without them, importing anything that reaches
 * appInfo fails with "__APP_VERSION__ is not defined".
 */
export const appDefines = (commitRef: string): Record<string, string> => ({
  __APP_VERSION__: JSON.stringify(version),
  /* Netlify exposes the deployed commit; empty locally and in tests. */
  __APP_COMMIT__: JSON.stringify(commitRef.slice(0, 7))
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), supabaseEnvCheck(env), languageToolCheck(env), siteUrlHtml(env)],
    define: appDefines(env.COMMIT_REF ?? ''),
    resolve: { alias: LAYER_ALIASES },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          /* Keep the vendor libraries and the exam content in their own long-lived
             cache entries, so shipping app changes does not re-download them. */
          manualChunks: (id: string) => {
            if (id.includes('src/data/')) return 'exam-data';
            if (id.includes('src/content/')) return 'content';
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('react-dom') || id.includes('/react/') || id.includes('react-router'))
              return 'react';
            return undefined;
          }
        }
      }
    },
    /* Deliberately no `server.open`: it launches a real browser that races the dependency
       optimizer against the one Playwright drives, which surfaces as
       "require_react is not a function" and a blank page. Use `npm run dev -- --open`. */
    server: {}
  };
});
