import { expect, test } from '@playwright/test';

/**
 * Supabase is stubbed at the network boundary so each sign-up outcome can be driven
 * deterministically. The shapes mirror what Supabase actually returns — in particular the
 * obfuscated "already registered" response, which is a 200 with an empty identities array.
 */
const stubSignUp = async (page, body, status = 200) => {
  await page.route('**/auth/v1/signup*', route =>
    route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) })
  );
};

const openSignUp = async page => {
  await page.goto('/settings');
  await page.getByRole('tab', { name: /Create account/ }).click();
  await page.getByLabel('Email', { exact: true }).fill('learner@example.com');
  await page.getByLabel('Password', { exact: true }).fill('Correct-Horse-9');
  await page.getByLabel('Repeat password').fill('Correct-Horse-9');
};

test('an already-confirmed email is told to sign in, not to check its inbox', async ({ page }) => {
  /* Obfuscated response: no error, no session, identities empty. */
  await stubSignUp(page, { id: 'stub', email: 'learner@example.com', identities: [] });

  await openSignUp(page);
  await page.getByRole('button', { name: /^Create account$/ }).click();

  await expect(page.getByRole('main').getByText(/already has an account/)).toBeVisible();
  /* The old bug: this must NOT claim an email was sent. */
  await expect(page.getByText(/Check your inbox \(and spam\) for the confirmation link/)).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Resend confirmation email/ })).toHaveCount(0);
  /* And it should drop them on the tab that can actually get them in. */
  await expect(page.getByRole('tab', { name: /Sign in/ })).toHaveAttribute('data-state', 'active');
});

test('an explicit already-registered error is handled too', async ({ page }) => {
  await stubSignUp(
    page,
    { code: 422, error_code: 'user_already_exists', msg: 'User already registered' },
    422
  );

  await openSignUp(page);
  await page.getByRole('button', { name: /^Create account$/ }).click();
  await expect(page.getByRole('main').getByText(/already has an account/)).toBeVisible();
});

test('a genuine new signup is told to confirm, and can resend', async ({ page }) => {
  await stubSignUp(page, {
    id: 'stub',
    email: 'learner@example.com',
    identities: [{ identity_id: 'i1', provider: 'email' }]
  });

  let resendCalls = 0;
  await page.route('**/auth/v1/resend*', route => {
    resendCalls += 1;
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  });

  await openSignUp(page);
  await page.getByRole('button', { name: /^Create account$/ }).click();

  await expect(page.getByRole('main').getByText(/Confirm learner@example.com/)).toBeVisible();

  /* The second bug: an unconfirmed account must have a working way to get the email
     again, rather than re-running signup and silently getting nothing. */
  const resend = page.getByRole('button', { name: /Resend confirmation email/ });
  await expect(resend).toBeVisible();
  await resend.click();
  await expect.poll(() => resendCalls).toBe(1);
  await expect(page.getByRole('main').getByText(/Sent again/)).toBeVisible();
});

test('a rate-limited resend says how long to wait', async ({ page }) => {
  await stubSignUp(page, {
    id: 'stub',
    email: 'learner@example.com',
    identities: [{ identity_id: 'i1', provider: 'email' }]
  });
  await page.route('**/auth/v1/resend*', route =>
    route.fulfill({
      status: 429,
      contentType: 'application/json',
      /* GoTrue puts the human message in `msg`, which is what supabase-js reads. */
      body: JSON.stringify({
        code: 429,
        error_code: 'over_email_send_rate_limit',
        msg: 'For security purposes, you can only request this after 51 seconds.'
      })
    })
  );

  await openSignUp(page);
  await page.getByRole('button', { name: /^Create account$/ }).click();
  await page.getByRole('button', { name: /Resend confirmation email/ }).click();

  /* Shown both inline and as a toast, so scope the assertion to each. */
  await expect(page.getByRole('main').getByText(/try again in 51 seconds/)).toBeVisible();
  await expect(
    page.getByRole('region', { name: /Notifications/ }).getByText(/try again in 51 seconds/)
  ).toBeVisible();
});
