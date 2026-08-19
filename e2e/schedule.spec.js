import { expect, test } from '@playwright/test';

/* The plan has to change shape with the exam date in a real browser, not only in a unit
   test: this is the feature a user actually sees. */

const isoInDays = days => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const seedExamDate = (page, days) =>
  page.addInitScript(iso => {
    window.localStorage.setItem(
      'telcTrainerV1',
      JSON.stringify({ attempts: [], learnDone: {}, settings: { examDate: iso } })
    );
  }, isoInDays(days));

test.describe('a long runway', () => {
  test.beforeEach(async ({ page }) => {
    await seedExamDate(page, 90);
  });

  test('the learn page schedules one lesson a day', async ({ page }) => {
    await page.goto('/learn');
    await expect(page.getByRole('heading', { name: /Your schedule/ })).toBeVisible();
    await expect(page.getByText(/Today ·/).first()).toBeVisible();
    await expect(page.getByText(/a long day/)).toHaveCount(0);
    await expect(page.getByText(/Extra material/)).toHaveCount(0);
  });

  test('the dashboard plans every exam', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Today.s plan/)).toBeVisible();
    await expect(page.getByText(/planned/).first()).toBeVisible();
    await expect(page.getByText('optional')).toHaveCount(0);
  });
});

test.describe('a short runway', () => {
  test.beforeEach(async ({ page }) => {
    await seedExamDate(page, 10);
  });

  test('the learn page compresses the core and offers the rest as extra', async ({ page }) => {
    await page.goto('/learn');
    await expect(page.getByText(/a long day/).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Extra material/ })).toBeVisible();
  });

  test('the dashboard marks the exams that do not fit as optional', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('optional').first()).toBeVisible();
  });
});

test.describe('the fallbacks', () => {
  test('a past date is explained and fixable in one click', async ({ page }) => {
    await seedExamDate(page, -2);
    await page.goto('/');
    await expect(page.getByText(/exam date needs updating/)).toBeVisible();
    await page.getByRole('link', { name: /Set your exam date/ }).click();
    await expect(page).toHaveURL(/\/settings$/);
    await expect(page.getByRole('heading', { name: 'Settings', level: 1 })).toBeVisible();
  });

  test('a runway beyond the window says what it covers', async ({ page }) => {
    await seedExamDate(page, 200);
    await page.goto('/');
    await expect(page.getByText(/covers the next 90 days/)).toBeVisible();
  });

  test('an exam days away becomes the emergency plan', async ({ page }) => {
    await seedExamDate(page, 3);
    await page.goto('/');
    await expect(page.getByText(/emergency plan/)).toBeVisible();
  });
});
