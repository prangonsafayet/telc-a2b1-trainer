import { beforeEach, describe, expect, it } from 'vitest';

import { PROGRESS_STORAGE_KEY } from '@features/progress';

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

  /* The warning counts the attempts of the trainer whose dashboard it is, and its backup
     link stays inside that trainer. Reading the root document here told a B1 user with five
     B1 attempts that nothing had been recorded, and sent them to the A2·B1 history page. */
  it('counts the attempts of the trainer whose dashboard it is', async () => {
    localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        attempts: [],
        learnDone: {},
        b1: {
          attempts: [1, 2, 3, 4, 5].map(id => ({
            id,
            examId: 1,
            mode: 'full',
            date: new Date(id).toISOString(),
            times: {},
            scores: {},
            answers: {},
            ratings: {}
          })),
          learnDone: {},
          srs: {},
          activity: {}
        }
      })
    );

    const b1 = await mount('/b1');
    expect(b1.text()).toMatch(/Your 5 saved attempt\(s\)/);
    expect(b1.container.querySelector('a[href="/b1/history"]')).not.toBeNull();
    expect(b1.container.querySelector('a[href="/history"]')).toBeNull();
    await b1.unmount();

    /* …and the root trainer, which has none, is told exactly that. */
    const root = await mount('/');
    expect(root.text()).toMatch(/Attempts you record will live/);
    expect(root.container.querySelector('a[href="/history"]')).not.toBeNull();
    await root.unmount();
  });

  it('keeps the header status on a route with no dashboard banner', async () => {
    const page = await mount('/guide');
    expect(document.querySelector('header')?.textContent ?? '').toMatch(/Not signed in|Local only/);
    await page.unmount();
  });
});
