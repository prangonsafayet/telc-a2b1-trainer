import { defineConfig } from 'vitest/config';

import { appDefines, LAYER_ALIASES } from './vite.config.ts';

/**
 * Two projects, because the two kinds of test want different worlds:
 *
 *   logic   pure functions — the schedule engine, date maths, response interpretation.
 *           No DOM, no React, so they run in plain Node and finish in milliseconds.
 *   render  the app mounted for real, to prove a page renders what it claims. happy-dom
 *           supplies the document; anything that needs a genuine browser (layout, audio,
 *           pointer behaviour) belongs in the Playwright suite instead.
 */
export default defineConfig({
  resolve: { alias: LAYER_ALIASES },
  define: appDefines(''),
  test: {
    restoreMocks: true,
    projects: [
      {
        resolve: { alias: LAYER_ALIASES },
        test: {
          name: 'logic',
          include: ['tests/unit/**/*.test.ts'],
          environment: 'node',
          /* The content files are large; a slow first import is not a hanging test. */
          testTimeout: 20_000
        }
      },
      {
        resolve: { alias: LAYER_ALIASES },
        define: appDefines(''),
        test: {
          name: 'render',
          include: ['tests/render/**/*.test.ts'],
          environment: 'happy-dom',
          setupFiles: ['tests/render/setup.ts'],
          /* Routes are lazily loaded, so a first render pulls a chunk from disk. */
          testTimeout: 30_000
        }
      }
    ]
  }
});
