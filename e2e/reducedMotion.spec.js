import { expect, test } from '@playwright/test';

/*
 * Motion is decoration in this app, and the entrance animations all run with
 * `animation-fill-mode: both` from `opacity: 0` / `scaleY(0)`. That makes the *delay* the
 * part a reduced-motion user actually notices: cutting `animation-duration` alone still
 * left dashboard tiles, exam cards, Learn sections and the score-history bars invisible for
 * up to 320ms (`.stagger`) or ~540ms (the chart's `index * 60ms`) after paint.
 *
 * Delays live in three places — the `.stagger` rules, inline `animationDelay` props on the
 * history and results cards, and the chart's inline `animation` shorthand — so this asserts
 * the outcome across the whole page rather than any one of them.
 */

const PAGES = ['/', '/learn', '/history', '/b1', '/b2/learn'];

/* Three scored sittings, so /history renders the score chart — its bars carry the delay as
   part of an inline `animation` shorthand, which is the one form the stagger rules do not
   cover. Attempts are the shape `DualLevelAttempt` persists. */
const seedAttempts = page =>
  page.addInitScript(() => {
    const attempt = (id, total, result) => ({
      id,
      examId: id,
      mode: 'full',
      date: new Date(id).toISOString(),
      times: {},
      scores: { lesen: 45, hoeren: 40, schreiben: 42, sprechen: 41 },
      sb: null,
      answers: {},
      ratings: {},
      total,
      result
    });
    window.localStorage.setItem(
      'telcTrainerV1',
      JSON.stringify({
        attempts: [attempt(1, 172, 'B1'), attempt(2, 120, 'A2'), attempt(3, 60, 'nicht bestanden')],
        learnDone: {},
        settings: {}
      })
    );
  });

test.describe('prefers-reduced-motion', () => {
  for (const path of PAGES) {
    test(`${path} animates nothing on a delay`, async ({ page }) => {
      /* Emulated on the page rather than through `test.use({ reducedMotion })`: the fixture
         option did not reach the media query here — `matchMedia('(prefers-reduced-motion:
         reduce)').matches` stayed false — so the suite would have passed vacuously. */
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await seedAttempts(page);
      await page.goto(path);
      await expect(page.locator('main')).toBeVisible();
      expect(
        await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches),
        'reduced motion is not actually emulated'
      ).toBe(true);

      if (path === '/history') {
        /* Proof the seeding worked: without bars the chart's inline delays never render and
           this suite would pass on a page that has nothing to check. */
        await expect(page.getByText('Score history')).toBeVisible();
        expect(
          await page.evaluate(
            () =>
              [...document.querySelectorAll('*')].filter(
                element => getComputedStyle(element).animationName === 'grow-up'
              ).length
          )
        ).toBeGreaterThan(1);
      }

      const delayed = await page.evaluate(() =>
        [...document.querySelectorAll('*')]
          .map(element => {
            const style = getComputedStyle(element);
            return { style, animation: style.animationDelay, transition: style.transitionDelay };
          })
          .filter(
            ({ animation, transition }) =>
              animation.split(', ').some(value => value !== '0s') ||
              transition.split(', ').some(value => value !== '0s')
          )
          .map(({ style, animation, transition }) => `${style.animationName}: ${animation} / ${transition}`)
      );

      expect(delayed, `elements still animating on a delay on ${path}`).toEqual([]);
    });
  }
});
