import { beforeEach, describe, expect, it } from 'vitest';

import { mount, seedProgress } from './harness.ts';

/* A signed-out user must be told, on every page, that progress lives in this browser only.
   Silent data loss is the worst failure this app can have. */

beforeEach(() => {
  localStorage.clear();
  seedProgress({ daysUntilExam: 30 });
});

describe('signed out', () => {
  it('states the account status in the header', async () => {
    const page = await mount('/');
    expect(document.querySelector('header')?.textContent ?? '').toMatch(/Not signed in|Local only/);
    await page.unmount();
  });

  it('warns on the dashboard that progress is browser-local, and offers a backup', async () => {
    const page = await mount('/');
    expect(page.text()).toMatch(/only in this browser/);
    expect(page.text()).toMatch(/Export a backup/);
    await page.unmount();
  });

  it('keeps the header status on a route with no dashboard banner', async () => {
    const page = await mount('/guide');
    expect(document.querySelector('header')?.textContent ?? '').toMatch(/Not signed in|Local only/);
    await page.unmount();
  });
});
