import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/* VITE_* values are inlined at build time, so a build that runs without them produces a
   site with cloud sync permanently off — and nothing in the hosting dashboard will say
   so. Fail loudly in the build log instead. */
function supabaseEnvCheck(env) {
  return {
    name: 'supabase-env-check',
    apply: 'build',
    buildStart() {
      const url = (env.VITE_SUPABASE_URL || '').trim();
      const key = (env.VITE_SUPABASE_ANON_KEY || '').trim();
      if (url && key) {
        this.info(`Supabase cloud sync will be enabled (${url}).`);
        if (/^sb_secret_/i.test(key)) {
          this.error('VITE_SUPABASE_ANON_KEY is a SECRET key. Use the anon / publishable key — never ship a secret to the browser.');
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
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), supabaseEnvCheck(env)],
    resolve: {
      alias: { '@': path.resolve(process.cwd(), './src') }
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          /* Keep the vendor libraries and the exam content in their own long-lived
             cache entries, so shipping app changes does not re-download them. */
          manualChunks(id) {
            if (id.includes('src/data/')) return 'exam-data';
            if (id.includes('src/content.js')) return 'content';
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('react-dom') || id.includes('/react/') || id.includes('react-router')) return 'react';
            return undefined;
          }
        }
      }
    },
    server: { open: true }
  };
});
