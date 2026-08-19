import { defineConfig } from 'vitest/config';

import { LAYER_ALIASES } from './vite.config.ts';

/**
 * Vitest covers the logic: pure functions with no DOM and no React. The suites that mount
 * the app in jsdom still run through vite-node (`npm run test:render`) — they predate this
 * config and use their own hand-built environment.
 */
export default defineConfig({
  resolve: { alias: LAYER_ALIASES },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
    /* Content files are large; a slow first import is not a hanging test. */
    testTimeout: 20_000,
    restoreMocks: true
  }
});
