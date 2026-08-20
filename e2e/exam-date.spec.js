import { expect, test } from '@playwright/test';

const MIN_PREP_DAYS = 5;
const MAX_PREP_DAYS = 90;

const isoInDays = days => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

/** Seeds the stored document before the app boots, so the page opens on a known runway. */
const seedExamDate = (page, days) =>
  page.addInitScript(iso => {
    window.localStorage.setItem(
      'telcTrainerV1',
      JSON.stringify({ attempts: [], learnDone: {}, settings: { examDate: iso } })
    );
  }, isoInDays(days));

/* Settings shows one exam-date control per trainer, each named after its exam, so the specs
   address the A2·B1 pair by name rather than by position. */
const A2B1_DATE = /^Your telc Deutsch A2·B1 exam date/;
const A2B1_DAYS = '#days-until-exam-a2b1';

const openCalendar = async page => {
  await page.getByRole('button', { name: A2B1_DATE }).click();
  const popover = page.locator('[data-slot="popover-content"]');
  await expect(popover).toBeVisible();
  return popover;
};

test.describe('the exam-date controls', () => {
  test.beforeEach(async ({ page }) => {
    await seedExamDate(page, 30);
  });

  /* The month/year dropdowns were the reported bug: react-day-picker's native <select>
     overlay is invisible to the design system, so they are real shadcn selects now. */
  test('the month and year selectors are real controls', async ({ page }) => {
    await page.goto('/settings');
    const popover = await openCalendar(page);
    await expect(popover.locator('select')).toHaveCount(0);

    const month = popover.getByLabel('Monat auswählen');
    const year = popover.getByLabel('Jahr auswählen');
    await expect(month).toBeVisible();
    await expect(year).toBeVisible();

    await month.click();
    /* All twelve months are listed, but only those the plan window touches are selectable. */
    await expect(page.getByRole('option')).toHaveCount(12);
    const selectable = page.getByRole('option').and(page.locator(':not([aria-disabled="true"])'));
    expect(await selectable.count()).toBeLessThanOrEqual(4);
    await page.keyboard.press('Escape');
  });

  test('a day inside the window can be picked and updates the countdown', async ({ page }) => {
    await page.goto('/settings');
    const popover = await openCalendar(page);

    const enabled = popover.locator('[role="gridcell"] button:not([disabled])');
    await expect(enabled.first()).toBeVisible();
    await enabled.first().click();
    await expect(popover).toBeHidden();

    const stored = await page.evaluate(
      () => JSON.parse(window.localStorage.getItem('telcTrainerV1')).settings.examDate
    );
    expect(stored).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    await expect(page.getByText(/day(s)? to go/)).toBeVisible();
  });

  test('days outside the plannable window cannot be picked', async ({ page }) => {
    await seedExamDate(page, MIN_PREP_DAYS);
    await page.goto('/settings');
    const popover = await openCalendar(page);

    /* Opened on the first plannable month, so paging further back is refused. */
    await expect(popover.getByLabel('Zum vorherigen Monat')).toHaveAttribute('aria-disabled', 'true');

    const before = await page.evaluate(
      () => JSON.parse(window.localStorage.getItem('telcTrainerV1')).settings.examDate
    );
    const blocked = popover.locator('[role="gridcell"][data-disabled="true"] button');
    if ((await blocked.count()) > 0) {
      await blocked.first().click({ force: true });
      const after = await page.evaluate(
        () => JSON.parse(window.localStorage.getItem('telcTrainerV1')).settings.examDate
      );
      expect(after).toBe(before);
    }
  });

  test('the days-from-today field accepts the window and rejects the rest', async ({ page }) => {
    await page.goto('/settings');
    const field = page.locator(A2B1_DAYS);

    await field.fill('45');
    await expect(page.getByText(/45 days to go/)).toBeVisible();

    await field.fill('2');
    await expect(page.getByText(/Too close to plan/)).toBeVisible();
    /* Refused, not applied: the countdown still reads the last usable value. */
    await expect(page.getByText(/45 days to go/)).toBeVisible();

    await field.fill(String(MAX_PREP_DAYS + 10));
    await expect(page.getByText(new RegExp(`${MAX_PREP_DAYS} days is the longest plan`))).toBeVisible();
  });

  test('the calendar is reachable and readable on a phone viewport', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('/settings');
    const popover = await openCalendar(page);
    const box = await popover.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(-1);
    expect(box.x + box.width).toBeLessThanOrEqual(361);
  });
});
