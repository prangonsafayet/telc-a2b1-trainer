/**
 * What goes into the emitted `sitemap.xml` and `robots.txt`, built from the trainer
 * namespaces `scripts/trainerRegistry.mjs` reads out of the registry — so a fourth trainer
 * is covered without anyone remembering to come here.
 *
 * Plain JS in its own module rather than inside `vite.config.ts`, for one reason: it has to
 * be testable. `vite.config.ts` belongs to `tsconfig.node.json`, and a suite that imports it
 * drags it into `tsconfig.app.json`'s program, where `noPropertyAccessFromIndexSignature`
 * rejects its `env.VITE_*` reads. A `.mjs` with `checkJs: false` is pulled into neither
 * project's type-check, so `tests/unit/siteMeta.test.js` can import exactly this.
 */

/**
 * The crawlable pages, per trainer: its dashboard, its curriculum and its exam guide. The
 * root trainer's base path is the empty string, and `/` is not.
 *
 * @param {readonly string[]} basePaths
 * @returns {readonly string[]}
 */
export const sitemapPages = basePaths =>
  basePaths.flatMap(base => [base || '/', `${base}/learn`, `${base}/guide`]);

/**
 * The screens a crawler has no business in: they render one person's stored attempt and
 * nothing else. Per trainer, because `Disallow: /exam/` is a prefix match and never covered
 * `/b1/exam/…`.
 *
 * @param {readonly string[]} basePaths
 * @returns {readonly string[]}
 */
export const crawlerDisallows = basePaths =>
  basePaths.flatMap(base => [`${base}/exam/`, `${base}/results/`, `${base}/review/`]);
