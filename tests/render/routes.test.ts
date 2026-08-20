import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { captureErrors, mount } from './harness.ts';

/* Every route must render its own screen without a React error. The router is the piece
   most likely to break silently: a bad lazy import shows an empty page, not a failure. */

const ROUTES = [
  { path: '/', expect: /Dashboard/ },
  { path: '/learn', expect: /AI-assisted learning/ },
  { path: '/guide', expect: /telc/ },
  { path: '/history', expect: /History|attempts/i },
  { path: '/settings', expect: /Settings/ },
  { path: '/nope', expect: /not found|404/i },
  /* The B1 and B2 trainers mount the same three exam screens as the root trainer, so a
     regression in the shared runner has to fail on one of these. */
  { path: '/b1', expect: /telc Deutsch B1/ },
  { path: '/b1/exam/1/lesen', expect: /Leseverstehen/ },
  { path: '/b2', expect: /telc Deutsch B2/ },
  { path: '/b2/exam/1/full', expect: /Leseverstehen/ }
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
