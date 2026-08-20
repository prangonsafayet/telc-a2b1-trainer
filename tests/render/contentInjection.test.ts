import { describe, expect, it } from 'vitest';

import { TRAINER_ORDER, TRAINERS } from '@shared/config/trainers.ts';
import { type TrainerId } from '@shared/types';

import { click, findByText, mount } from './harness.ts';

/* Authored content mixes plain text and HTML. A field that carries markup must be injected,
   never rendered as text — the bug this guards against showed "<b>" to the user. */

const RAW_TAG = /<\/?(b|i|em|strong|br|p|ul|li|div|span|code|h[1-6])\b[^>]*>/i;

/* Every trainer's Guide route, derived from the registry — a fourth trainer with a guide
   is covered here for free, with no new test case to add. */
const guideRoute = (trainer: TrainerId): string => `${TRAINERS[trainer].basePath}/guide`;
const guideRoutes = TRAINER_ORDER.map(guideRoute);

describe.each(['/learn', ...guideRoutes])('%s', route => {
  it('shows no literal HTML tag anywhere on the page', async () => {
    const page = await mount(route);
    expect(page.text()).not.toMatch(RAW_TAG);
    await page.unmount();
  });
});

describe.each(TRAINER_ORDER)('the %s guide', trainer => {
  it('injects its authored markup as real elements', async () => {
    const page = await mount(guideRoute(trainer));
    expect(page.container.querySelectorAll('h2, h3').length).toBeGreaterThan(0);
    await page.unmount();
  });
});

describe('a cheatsheet', () => {
  it('renders as markup once opened, not as escaped text', async () => {
    const page = await mount('/learn');
    /* Accordion content is unmounted while collapsed, so open one first. */
    await click(findByText(/Cases|Fälle|Verbs|Connectors/i));
    const prose = page.container.querySelector('.prose');
    expect(prose).not.toBeNull();
    expect(prose?.querySelectorAll('b, strong, li, table').length ?? 0).toBeGreaterThan(0);
    expect(prose?.textContent ?? '').not.toMatch(/<\/?(b|li|table)>/);
    await page.unmount();
  });
});
