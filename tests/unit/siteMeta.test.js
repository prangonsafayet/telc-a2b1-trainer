import { describe, expect, it } from 'vitest';

import { TRAINERS, TRAINER_ORDER } from '@shared/config/trainers.ts';

import { crawlerDisallows, sitemapPages } from '../../scripts/siteMeta.mjs';
import { trainerBasePaths } from '../../scripts/trainerRegistry.mjs';

/*
 * The emitted sitemap.xml and robots.txt used to name three routes — `/`, `/learn`,
 * `/guide` — while index.html advertised 35 mock tests across three trainers. Two thirds of
 * the site was absent from the sitemap, and `Disallow: /exam/` is a prefix match that never
 * covered `/b1/exam/…`, so two trainers' per-user attempt screens were crawlable while the
 * third trainer's identical screens were not.
 *
 * Plain JS on purpose, and importing a `.mjs`: a `.ts` suite that reaches outside
 * `tsconfig.app.json` fails `tsc` with TS6307, and pulling `vite.config.ts` into that
 * project instead trips `noPropertyAccessFromIndexSignature` on its `env.VITE_*` reads. See
 * the header of `scripts/siteMeta.mjs`. Vitest resolves the layer aliases either way, so the
 * registry read here is the real one.
 */

const BASE_PATHS = trainerBasePaths();

describe('the route namespaces the SEO files are built from', () => {
  it('is every trainer in the registry, and nothing invented', () => {
    expect(BASE_PATHS.toSorted()).toEqual(TRAINER_ORDER.map(id => TRAINERS[id].basePath).toSorted());
  });

  it('found more than the root trainer, so a passing suite means something', () => {
    expect(BASE_PATHS.length).toBeGreaterThan(1);
  });
});

describe('sitemap.xml', () => {
  const pages = sitemapPages(BASE_PATHS);

  it('lists the dashboard, curriculum and guide of every trainer', () => {
    for (const id of TRAINER_ORDER) {
      const base = TRAINERS[id].basePath;
      expect(pages, `${id} dashboard`).toContain(base || '/');
      expect(pages, `${id} learn`).toContain(`${base}/learn`);
      expect(pages, `${id} guide`).toContain(`${base}/guide`);
    }
  });

  it('spells the root trainer as / rather than the empty string', () => {
    expect(pages).toContain('/');
    expect(pages).not.toContain('');
  });
});

describe('robots.txt', () => {
  const disallows = crawlerDisallows(BASE_PATHS);

  it("keeps every trainer's per-user attempt screens out", () => {
    for (const id of TRAINER_ORDER) {
      const base = TRAINERS[id].basePath;
      for (const screen of ['exam', 'results', 'review']) {
        expect(disallows, `${id} ${screen}`).toContain(`${base}/${screen}/`);
      }
    }
  });

  it('never disallows a page the sitemap advertises', () => {
    for (const page of sitemapPages(BASE_PATHS)) {
      expect(disallows).not.toContain(page);
      expect(disallows).not.toContain(`${page}/`);
    }
  });
});
