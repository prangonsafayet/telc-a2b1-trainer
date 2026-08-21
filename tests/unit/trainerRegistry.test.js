import { describe, expect, it } from 'vitest';

import { TRAINERS, TRAINER_ORDER } from '@shared/config/trainers.ts';

import { trainerBasePaths, trainerDescriptors, trainerIds } from '../../scripts/trainerRegistry.mjs';

/*
 * `scripts/trainerRegistry.mjs` reads the registry as text, because the three consumers that
 * need it — eslint.config.js, the Vite config and the Playwright specs — cannot resolve the
 * layer aliases the registry imports through. A text parse can drift from what it parses,
 * and the consequences are silent: the lint rule stops covering a trainer id, the sitemap
 * loses a namespace, an e2e sweep quietly runs on fewer trainers.
 *
 * So this asserts the parse against the real registry, which this suite CAN import. Plain JS
 * because a `.ts` suite may not reach outside `tsconfig.app.json` — see the header of the
 * script itself.
 */

describe('the registry as Node reads it', () => {
  const parsed = trainerDescriptors();

  it('finds every trainer, in the order the registry declares them', () => {
    expect(parsed.map(trainer => trainer.id)).toEqual([...TRAINER_ORDER]);
  });

  it('reads each descriptor field exactly as the module exports it', () => {
    expect(parsed).toEqual(
      TRAINER_ORDER.map(id => ({
        id: TRAINERS[id].id,
        name: TRAINERS[id].name,
        short: TRAINERS[id].short,
        basePath: TRAINERS[id].basePath,
        format: TRAINERS[id].format
      }))
    );
  });

  it('found more than one trainer, so a passing suite means something', () => {
    expect(parsed.length).toBeGreaterThan(1);
  });

  it('gives the lint rule the same ids the app uses', () => {
    expect(trainerIds()).toEqual([...TRAINER_ORDER]);
  });

  it('gives the SEO files the same namespaces the router mounts', () => {
    expect(trainerBasePaths().toSorted()).toEqual(TRAINER_ORDER.map(id => TRAINERS[id].basePath).toSorted());
  });

  it('throws rather than answering short when the registry moves', () => {
    const notTheRegistry = new URL('../../package.json', import.meta.url);
    expect(() => trainerDescriptors(notTheRegistry)).toThrow(/TRAINERS/);
  });
});
