import { expect, test } from '@playwright/test';

/*
 * Contrast is a browser fact, so it is measured in one rather than asserted from a token
 * value. Colours are resolved by painting them onto a canvas and reading the pixel back:
 * getComputedStyle returns `oklch()` and `color-mix(…, transparent)` here, which no naive
 * rgb parser survives, and a tinted background only has a real colour once every ancestor
 * behind it has been composited.
 *
 * The theme is switched through the app's own storage key. Toggling a class on
 * documentElement does not do it — the pre-paint script in index.html reads
 * `telcTrainerTheme`, and that is what these tokens hang off.
 */

const BADGE_BASE =
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium';
const BUTTON_BASE =
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-md h-11 px-6 text-base font-medium';

/**
 * `need` is the WCAG 2.1 minimum for what the pair is: 4.5:1 for text under 18.66px bold /
 * 24px (1.4.3), 3:1 for a non-text graphical object that carries meaning (1.4.11).
 */
const PAIRS = [
  {
    id: 'default button — label on --primary',
    surface: 'bg-card',
    html: `<span class="${BUTTON_BASE} bg-primary text-primary-foreground">Los</span>`,
    prop: 'color',
    need: 4.5
  },
  {
    id: 'destructive button — label on --destructive',
    surface: 'bg-card',
    html: `<span class="${BUTTON_BASE} bg-destructive text-destructive-foreground">Löschen</span>`,
    prop: 'color',
    need: 4.5
  },
  {
    id: 'success button — label on --success',
    surface: 'bg-card',
    html: `<span class="${BUTTON_BASE} bg-[color:var(--success)] text-success-on-fill">Knew it</span>`,
    prop: 'color',
    need: 4.5
  },
  {
    id: 'destructive badge — 12px ink on the destructive tint',
    surface: 'bg-card',
    html: `<span class="${BADGE_BASE} border-transparent bg-[color-mix(in_oklab,var(--destructive)_14%,transparent)] text-destructive-on-tint">Nicht bestanden</span>`,
    prop: 'color',
    need: 4.5
  },
  {
    id: 'success badge — 12px ink on the success tint',
    surface: 'bg-card',
    html: `<span class="${BADGE_BASE} border-transparent bg-[color-mix(in_oklab,var(--success)_16%,transparent)] text-[color:var(--success-foreground)]">Bestanden</span>`,
    prop: 'color',
    need: 4.5
  },
  {
    id: 'warning badge — 12px ink on the warning tint',
    surface: 'bg-card',
    html: `<span class="${BADGE_BASE} border-transparent bg-[color-mix(in_oklab,var(--warning)_22%,transparent)] text-[color:var(--warning-foreground)]">Bald</span>`,
    prop: 'color',
    need: 4.5
  },
  {
    id: 'exam-date warning — 12px ink on a card',
    surface: 'bg-card',
    html: '<span class="text-xs text-[color:var(--warning-foreground)]">Datum liegt in der Vergangenheit</span>',
    prop: 'color',
    need: 4.5
  },
  {
    id: 'inline destructive text on the destructive tint',
    surface: 'bg-card',
    html: '<span class="block bg-[color-mix(in_oklab,var(--destructive)_10%,transparent)] p-3 text-destructive-on-tint">Stop.</span>',
    prop: 'color',
    need: 4.5
  },
  {
    id: 'countdown ring — warning stroke on the page background',
    surface: 'bg-background',
    html: '<span class="text-warning-foreground">◠</span>',
    prop: 'color',
    need: 3
  },
  {
    id: 'countdown ring — warning stroke on a card',
    surface: 'bg-card',
    html: '<span class="text-warning-foreground">◠</span>',
    prop: 'color',
    need: 3
  },
  {
    id: 'meter — mid-range bar on its track',
    surface: 'bg-card',
    html: '<span class="block h-2 w-40 bg-secondary"><span data-probe class="block h-2 w-20 bg-warning-foreground"></span></span>',
    prop: 'backgroundColor',
    need: 3
  },
  {
    id: 'meter — failing bar on its track',
    surface: 'bg-card',
    html: '<span class="block h-2 w-40 bg-secondary"><span data-probe class="block h-2 w-20 bg-destructive"></span></span>',
    prop: 'backgroundColor',
    need: 3
  },
  {
    id: 'meter — passing bar on its track',
    surface: 'bg-card',
    html: '<span class="block h-2 w-40 bg-secondary"><span data-probe class="block h-2 w-20 bg-primary"></span></span>',
    prop: 'backgroundColor',
    need: 3
  }
];

const measure = (page, pairs) =>
  page.evaluate(samples => {
    const host = document.createElement('div');
    host.style.position = 'fixed';
    host.style.inset = '0';
    document.body.appendChild(host);

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const reset = () => {
      ctx.globalCompositeOperation = 'copy';
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 1, 1);
      ctx.globalCompositeOperation = 'source-over';
    };
    const paint = css => {
      ctx.fillStyle = css;
      ctx.fillRect(0, 0, 1, 1);
    };
    const pixel = () => {
      const data = ctx.getImageData(0, 0, 1, 1).data;
      return [data[0], data[1], data[2]];
    };
    const luminance = rgb => {
      const [r, g, b] = rgb.map(v => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (a, b) => {
      const [hi, lo] =
        luminance(a) >= luminance(b) ? [luminance(a), luminance(b)] : [luminance(b), luminance(a)];
      return (hi + 0.05) / (lo + 0.05);
    };
    const hex = rgb => `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`;

    const results = samples.map(sample => {
      host.innerHTML = `<div class="${sample.surface} p-4"><span data-root>${sample.html}</span></div>`;
      const root = host.querySelector('[data-root]');
      const target = root.querySelector('[data-probe]') ?? root.firstElementChild ?? root;

      const chain = [];
      for (let node = target; node; node = node.parentElement) chain.unshift(node);
      reset();
      for (const node of chain) {
        if (node === target && sample.prop === 'backgroundColor') break;
        const bg = getComputedStyle(node).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') paint(bg);
      }
      const background = pixel();
      paint(getComputedStyle(target)[sample.prop]);
      const foreground = pixel();

      return {
        id: sample.id,
        need: sample.need,
        ratio: Math.round(contrast(foreground, background) * 100) / 100,
        pair: `${hex(foreground)} on ${hex(background)}`
      };
    });

    host.remove();
    return results;
  }, pairs);

/* Chromium only: the measurement is a property of the palette, not of the viewport, and
   running it twice per theme on a phone profile would say nothing new. */
test.describe('palette contrast', () => {
  for (const theme of ['light', 'dark']) {
    test(`every ink and mark clears its WCAG minimum in the ${theme} theme`, async ({ page }, info) => {
      test.skip(info.project.name !== 'chromium', 'palette-level check; one browser is enough');

      await page.goto('/');
      await page.evaluate(t => localStorage.setItem('telcTrainerTheme', t), theme);
      await page.reload();
      await expect(page.locator('main')).toBeVisible();

      const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      expect(isDark, `the ${theme} theme did not apply`).toBe(theme === 'dark');

      const measured = await measure(page, PAIRS);
      const failures = measured
        .filter(result => result.ratio < result.need)
        .map(result => `${result.id}: ${result.ratio}:1 (${result.pair}), needs ${result.need}:1`);

      expect(
        failures,
        `${theme} theme contrast\n${measured.map(r => `  ${r.id}: ${r.ratio}:1 (${r.pair})`).join('\n')}`
      ).toEqual([]);
    });
  }
});
