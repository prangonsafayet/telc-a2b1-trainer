import { defineConfig, devices } from '@playwright/test';

/* Real-browser tests. These complement the Vitest suites in tests/: happy-dom can prove
   structure and behaviour but never layout, CSS or animation, so anything visual belongs
   here. The dev server is started automatically. */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ],
  webServer: {
    command: 'npm run dev -- --port 5173 --strictPort',
    url: 'http://localhost:5173',
    /*
     * Never inherit a server. A dev server left over from an earlier run keeps a module
     * graph and an optimized-dependency set from before the current checkout, which
     * renders a blank page and fails every test for reasons that have nothing to do with
     * the code under test. Paying a few seconds of startup is worth not chasing that.
     */
    reuseExistingServer: false,
    timeout: 120_000
  }
});
