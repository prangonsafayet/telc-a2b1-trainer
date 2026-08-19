import { expect, test } from '@playwright/test';

/* The month/year dropdowns were the reported bug: react-day-picker's native <select>
   overlay is invisible to the design system, so they are real shadcn selects now. */
test('the exam-date calendar month and year selectors work', async ({ page }) => {
  await page.goto('/settings');

  await page.getByRole('button', { name: /September|Pick your exam date/ }).click();
  const dialog = page.locator('[data-slot="popover-content"]');
  await expect(dialog).toBeVisible();

  /* No transparent native select may be left behind. */
  await expect(dialog.locator('select')).toHaveCount(0);

  const month = dialog.getByLabel('Monat auswählen');
  const year = dialog.getByLabel('Jahr auswählen');
  await expect(month).toBeVisible();
  await expect(year).toBeVisible();

  await month.click();
  await expect(page.getByRole('option')).toHaveCount(12);
  await page.getByRole('option', { name: 'Januar' }).click();
  await expect(month).toContainText('Januar');

  await year.click();
  const years = page.getByRole('option');
  await expect(years.first()).toBeVisible();
  const last = await years.last().textContent();
  await years.last().click();
  await expect(year).toContainText(last.trim());

  /* Picking a day closes the popover and updates the header countdown. */
  await dialog.getByRole('button', { name: '15' }).first().click();
  await expect(dialog).toBeHidden();
  await expect(page.getByRole('button', { name: /15\. Januar/ })).toBeVisible();
});

test('the calendar is reachable and readable on a phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/settings');
  await page.getByRole('button', { name: /September|Pick your exam date/ }).click();
  const dialog = page.locator('[data-slot="popover-content"]');
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(-1);
  expect(box.x + box.width).toBeLessThanOrEqual(361);
});
