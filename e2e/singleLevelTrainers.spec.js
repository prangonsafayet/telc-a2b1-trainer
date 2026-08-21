import { expect, test } from '@playwright/test';

import { trainerDescriptors } from '../scripts/trainerRegistry.mjs';

/*
 * B1 and B2 set the newer single-level telc paper, and had no Playwright coverage at all —
 * everything in exam.spec.js and smoke.spec.js only ever visits the root (A2·B1) trainer.
 *
 * e2e specs are plain JS with no bundler alias resolution, so they cannot import
 * `TRAINER_ORDER`/`TRAINERS` from src/shared/config/trainers.ts the way the Vitest suites do.
 * They can import plain Node, though, and `scripts/trainerRegistry.mjs` reads the descriptors
 * straight out of that file — so this spec no longer keeps a copy of the trainer list, and a
 * fourth trainer is covered here without editing it.
 */
const TRAINERS = trainerDescriptors().map(trainer => ({
  path: trainer.basePath || '/',
  name: trainer.name,
  format: trainer.format
}));

const SINGLE_LEVEL_TRAINERS = TRAINERS.filter(trainer => trainer.format === 'single-level');

/** Every trainer the switcher offers, root first. */
const ALL_TRAINERS = TRAINERS;

/**
 * A trainer's name is registry data, not a pattern. No current name holds a regex
 * metacharacter, but the registry is meant to accept names nobody has written yet — and
 * `telc Deutsch B2 (Beruf)` would silently match the wrong menu item, or nothing.
 */
const startsWith = text => new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);

const collectConsoleErrors = page => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
};

for (const { path, name } of SINGLE_LEVEL_TRAINERS) {
  test.describe(`${name}`, () => {
    test(`${path} loads with no console errors`, async ({ page }) => {
      const errors = collectConsoleErrors(page);

      await page.goto(path);
      await expect(page.getByRole('heading', { name: /^Dashboard/, level: 1 })).toBeVisible();

      await page.reload();
      await expect(page.getByRole('heading', { name: /^Dashboard/, level: 1 })).toBeVisible();

      expect(errors, `console/page errors on ${path}`).toEqual([]);
    });

    test('a full Lesen module run completes and reaches the results screen', async ({ page }) => {
      const errors = collectConsoleErrors(page);

      await page.goto(path);
      await page
        .getByRole('combobox', { name: /^Practice one module of/ })
        .first()
        .click();
      await page.getByRole('option', { name: 'Lesen' }).click();

      await expect(page.getByText('Leseverstehen')).toBeVisible();
      await page.getByRole('button', { name: /^Start Lesen/ }).click();

      /* By role, not by class — see the header countdown's own note in exam.spec.js. */
      const timer = page.getByRole('timer');
      await expect(timer).toBeVisible();

      const radio = page.getByRole('radio').first();
      await radio.click();
      await expect(radio).toBeChecked();

      await page.getByRole('button', { name: /^Submit Lesen/ }).click();

      /* Blanks remain almost every time (only one item was answered), so the confirm dialog
         appears — but do not depend on that if the paper happens to have only one item. */
      const submitAnyway = page.getByRole('button', { name: /Submit anyway/ });
      if (await submitAnyway.isVisible().catch(() => false)) await submitAnyway.click();

      await expect(page.getByText(/time used/)).toBeVisible();

      expect(errors, `console/page errors on ${path}`).toEqual([]);
    });
  });
}

test.describe('the trainer switcher', () => {
  test('moves between all three trainers', async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await page.goto('/');

    for (const { path, name } of ALL_TRAINERS) {
      await page.getByRole('button', { name: 'Switch trainer' }).click();
      await page.getByRole('menuitem', { name: startsWith(name) }).click();
      await expect(page).toHaveURL(`http://localhost:5173${path}`);
      await expect(page.getByRole('heading', { name: /^Dashboard/, level: 1 })).toBeVisible();
    }

    expect(errors, 'console/page errors while switching trainers').toEqual([]);
  });
});
