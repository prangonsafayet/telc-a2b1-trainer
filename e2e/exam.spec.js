import { expect, test } from '@playwright/test';

/* The behaviour the jsdom suite proves structurally, re-proven in a real browser where
   the timer, the popover positioning and the persistence all genuinely run. */
test('an exam survives a mid-module reload with its clock and answers', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('button', { name: /Start full exam/ })
    .first()
    .click();
  await expect(page.getByText('Leseverstehen')).toBeVisible();

  await page.getByRole('button', { name: /^Start Lesen/ }).click();
  await expect(page.getByText('Teil 1 — Anzeigen zuordnen')).toBeVisible();

  const timer = page.locator('span.font-mono');
  await expect(timer).toHaveText(/4[45]:\d\d/);

  /* Answer a richtig/falsch item. */
  const radio = page.getByRole('radio').first();
  await radio.click();
  await expect(radio).toBeChecked();

  const before = await timer.textContent();
  await page.reload();

  await expect(page.getByText('Teil 1 — Anzeigen zuordnen')).toBeVisible();
  await expect(page.getByRole('radio').first()).toBeChecked();
  const after = await timer.textContent();
  const secs = t => t.split(':').reduce((m, s) => m * 60 + +s, 0);
  /* The clock keeps running across the reload rather than resetting to 45:00. */
  expect(secs(after)).toBeLessThanOrEqual(secs(before));
  expect(secs(before) - secs(after)).toBeLessThan(30);
});

test('the dashboard offers to resume an abandoned attempt', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('button', { name: /Start full exam/ })
    .first()
    .click();
  await page.getByRole('button', { name: /^Start Lesen/ }).click();
  await expect(page.getByText('Teil 1 — Anzeigen zuordnen')).toBeVisible();

  await page.goto('/');
  await expect(page.getByText('You have an exam in progress')).toBeVisible();
  await page.getByRole('button', { name: /^Resume/ }).click();
  await expect(page.getByText('Teil 1 — Anzeigen zuordnen')).toBeVisible();
});

test('submitting with blanks warns before scoring', async ({ page }) => {
  await page.goto('/exam/1/lesen');
  await page.getByRole('button', { name: /^Start Lesen/ }).click();
  await page.getByRole('button', { name: /^Submit Lesen/ }).click();

  await expect(page.getByRole('alertdialog')).toContainText(/still unanswered/);
  await page.getByRole('button', { name: /Submit anyway/ }).click();

  await expect(page.getByText(/time used/)).toBeVisible();
  await expect(page.getByRole('link', { name: /Review answers/ })).toBeVisible();
});
