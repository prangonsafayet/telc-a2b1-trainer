import { expect, test } from '@playwright/test';

test('signed-out users are told their progress is local, and offered OAuth', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(/only in this browser/)).toBeVisible();

  await page.goto('/settings');
  await expect(page.getByText('Cloud sync — sign in')).toBeVisible();

  /* Provider buttons, not an email field — the magic link is gone. */
  await expect(page.getByRole('button', { name: /Continue with Google/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Continue with GitHub/ })).toBeVisible();
  await expect(page.locator('input[type="email"]')).toHaveCount(0);
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
  await page.route('**/auth/v1/authorize*', route => { target = route.request().url(); route.abort(); });
  await page.getByRole('button', { name: /Continue with Google/ }).click();
  await expect.poll(() => target, { timeout: 10_000 }).toContain('provider=google');
  expect(target).toContain('code_challenge');          // PKCE, not implicit flow
  expect(target).toContain('code_challenge_method=s256');
});
