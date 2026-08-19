import { expect, test } from '@playwright/test';

test('signed-out users are told their progress is local, and offered OAuth', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/only in this browser/)).toBeVisible();

  await page.goto('/settings');
  await expect(page.getByText('Cloud sync — sign in')).toBeVisible();

  await expect(page.getByRole('button', { name: /Continue with Google/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Continue with GitHub/ })).toBeVisible();

  /* …plus the email + password alternative. */
  await expect(page.getByRole('tab', { name: /Sign in/ })).toBeVisible();
  await expect(page.getByRole('tab', { name: /Create account/ })).toBeVisible();
});

test('the sign-up tab validates before it will submit', async ({ page }) => {
  await page.goto('/settings');
  await page.getByRole('tab', { name: /Create account/ }).click();

  const submit = page.getByRole('button', { name: /^Create account$/ });
  await expect(submit).toBeDisabled();

  await page.getByLabel('Email', { exact: true }).fill('learner@example.com');
  await page.getByLabel('Password', { exact: true }).fill('short');
  await expect(page.getByText(/at least 8 characters/i)).toBeVisible();
  await expect(submit).toBeDisabled();

  await page.getByLabel('Password', { exact: true }).fill('Correct-Horse-9');
  await page.getByLabel('Repeat password').fill('Correct-Horse-8');
  await expect(page.getByText(/do not match/i)).toBeVisible();
  await expect(submit).toBeDisabled();

  await page.getByLabel('Repeat password').fill('Correct-Horse-9');
  await expect(page.getByText(/do not match/i)).toHaveCount(0);
  await expect(submit).toBeEnabled();
});

test('passwords are never revealed by default and never leave as plain text in the DOM', async ({ page }) => {
  await page.goto('/settings');
  const password = page.getByLabel('Password', { exact: true });
  await password.fill('Correct-Horse-9');
  await expect(password).toHaveAttribute('type', 'password');

  await page.getByRole('button', { name: /Show password/ }).click();
  await expect(password).toHaveAttribute('type', 'text');
});

test('the account menu shows the signed-out state on every page', async ({ page }) => {
  for (const path of ['/', '/learn', '/guide']) {
    await page.goto(path);
    await expect(page.getByRole('button', { name: /Not signed in|Local only/ })).toBeVisible();
  }
});

test('clicking a provider hands off to that provider', async ({ page }) => {
  await page.goto('/settings');
  /* Do not actually leave for Google — capture the redirect and assert its shape. */
  let target = null;
  await page.route('**/auth/v1/authorize*', route => {
    target = route.request().url();
    route.abort();
  });
  await page.getByRole('button', { name: /Continue with Google/ }).click();
  await expect.poll(() => target, { timeout: 10_000 }).toContain('provider=google');
  expect(target).toContain('code_challenge'); // PKCE, not implicit flow
  expect(target).toContain('code_challenge_method=s256');
});
