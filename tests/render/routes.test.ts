import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { TRAINERS, TRAINER_ORDER } from '@shared/config/trainers.ts';

import { captureErrors, mount } from './harness.ts';

/* Every route must render its own screen without a React error. The router is the piece
   most likely to break silently: a bad lazy import shows an empty page, not a failure.
 *
 * The list is generated from `TRAINER_ORDER`, the way the router itself is, so a fourth
 * trainer gets the same coverage without editing this file — which is what the extensibility
 * claim in architecture.md says, and used not to be true here. */

/** One entry per screen, appended to each trainer's route namespace. */
const SCREENS = [
  { path: '', expect: /Dashboard/ },
  { path: '/learn', expect: /AI-assisted learning/ },
  { path: '/history', expect: /History|attempts/i },
  { path: '/settings', expect: /Settings/ },
  /* The practice hub serves every trainer, and every trainer has an authored bank, so it
     must render its reference tables rather than a missing route. */
  { path: '/practice', expect: /Reference tables/ },
  /* The exam screens are shared by both papers, so a regression in the runner has to fail
     on one of these whichever trainer it belongs to. */
  { path: '/exam/1/lesen', expect: /Leseverstehen/ },
  { path: '/exam/1/full', expect: /Leseverstehen/ }
] as const;

const ROUTES = [
  ...TRAINER_ORDER.flatMap(trainer =>
    SCREENS.map(screen => ({
      path: `${TRAINERS[trainer].basePath}${screen.path}` || '/',
      expect: screen.expect
    }))
  ),
  /* The guide is the one screen a trainer may not ship, so its route is conditional. */
  ...TRAINER_ORDER.filter(trainer => TRAINERS[trainer].hasGuide).map(trainer => ({
    path: `${TRAINERS[trainer].basePath}/guide`,
    expect: /telc/
  })),
  { path: '/nope', expect: /not found|404/i }
] as const;

let errors: ReturnType<typeof captureErrors>;

beforeEach(() => {
  localStorage.clear();
  errors = captureErrors();
});

afterEach(() => {
  errors.restore();
});

describe.each(ROUTES)('route $path', route => {
  it('renders its screen with no React error', async () => {
    const page = await mount(route.path);
    expect(page.text()).toMatch(route.expect);
    expect(errors.real()).toEqual([]);
    await page.unmount();
  });
});
