import { expect, test } from '@playwright/test';

const PAGES = [
  { path: '/', heading: 'Dashboard' },
  { path: '/learn', heading: /AI-assisted learning/ },
  { path: '/guide', heading: /Exam Guide/ },
  { path: '/history', heading: 'History' },
  { path: '/settings', heading: 'Settings' }
];

test.describe('shell', () => {
  for (const { path, heading } of PAGES) {
    test(`${path} renders and survives a reload`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', m => {
        if (m.type() === 'error') errors.push(m.text());
      });

      await page.goto(path);
      await expect(page.getByRole('heading', { name: heading, level: 1 })).toBeVisible();

      /* The whole point of the routing work: a hard reload must land on the same screen. */
      await page.reload();
      await expect(page.getByRole('heading', { name: heading, level: 1 })).toBeVisible();

      expect(errors, `console/page errors on ${path}`).toEqual([]);
    });
  }

  test('logo is visible and links home', async ({ page }) => {
    await page.goto('/settings');
    const brand = page.getByRole('link', { name: /dashboard/i }).first();
    await expect(brand.locator('svg')).toBeVisible();
    await brand.click();
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('no horizontal overflow at any breakpoint', async ({ page }) => {
    for (const width of [360, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow, `viewport ${width}px overflows`).toBeLessThanOrEqual(1);
    }
  });

  test('dark mode toggles and persists across a reload', async ({ page }) => {
    await page.goto('/');
    const root = page.locator('html');
    const wasDark = await root.evaluate(el => el.classList.contains('dark'));
    await page.getByRole('button', { name: /switch to (light|dark) mode/i }).click();
    await expect(root).toHaveClass(wasDark ? /^(?!.*\bdark\b).*$/ : /\bdark\b/);

    const afterToggle = await root.evaluate(el => el.classList.contains('dark'));
    await page.reload();
    expect(await root.evaluate(el => el.classList.contains('dark'))).toBe(afterToggle);
  });
});

test.describe('SEO head', () => {
  test('title, description and social tags are present', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/telc Deutsch A2·B1 Mock Exam Trainer/);
    const content = name =>
      page.locator(`meta[name="${name}"], meta[property="${name}"]`).first().getAttribute('content');
    expect(await content('description')).toContain('telc Deutsch A2·B1');
    expect(await content('og:title')).toBeTruthy();
    expect(await content('twitter:card')).toBe('summary_large_image');
    await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
    await expect(page.locator('link[rel="icon"]')).toHaveCount(1);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  });

  test('icons and the social image actually resolve', async ({ request }) => {
    for (const path of [
      '/favicon.svg',
      '/logo.svg',
      '/apple-touch-icon.png',
      '/og-image.png',
      '/manifest.webmanifest'
    ]) {
      const res = await request.get(path);
      expect(res.status(), `${path} should be served`).toBe(200);
    }
  });
});
