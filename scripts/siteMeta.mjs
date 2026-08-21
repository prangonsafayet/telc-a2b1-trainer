import { readFileSync } from 'node:fs';

/**
 * What goes into the emitted `sitemap.xml` and `robots.txt`, derived from the trainer
 * registry so a fourth trainer is covered without anyone remembering to come here.
 *
 * Plain JS in its own module rather than inside `vite.config.ts`, for one reason: it has to
 * be testable. `vite.config.ts` belongs to `tsconfig.node.json`, and a suite that imports it
 * drags it into `tsconfig.app.json`'s program, where `noPropertyAccessFromIndexSignature`
 * rejects its `env.VITE_*` reads. A `.mjs` with `checkJs: false` is pulled into neither
 * project's type-check, so `tests/unit/siteMeta.test.js` can import exactly this.
 */

/**
 * The trainers' route namespaces, read out of the registry as text. Importing it is not an
 * option here: the registry reaches for `@content/...` and `@shared/...` transitively, and
 * neither the Vite config's loader nor a plain Node import resolves the layer aliases.
 *
 * @param {URL} [registry] the registry module to read; overridable for tests
 * @returns {readonly string[]} every distinct `basePath`, registry order preserved
 */
export const trainerBasePaths = (registry = new URL('../src/shared/config/trainers.ts', import.meta.url)) => {
  const source = readFileSync(registry, 'utf8');
  const paths = [...source.matchAll(/^ {4}basePath: '([^']*)',$/gm)].map(match => match[1] ?? '');
  if (paths.length === 0) {
    throw new Error(
      `No \`basePath\` entries found in ${registry.pathname}. sitemap.xml and robots.txt are generated from them — fix the pattern in scripts/siteMeta.mjs rather than hardcoding routes.`
    );
  }
  return [...new Set(paths)];
};

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
