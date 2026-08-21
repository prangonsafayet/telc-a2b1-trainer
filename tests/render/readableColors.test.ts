/**
 * The four call sites that render a domain colour as ink or as a mark, asserted to pick the
 * *readable* token rather than the surface one.
 *
 * Measured in Chromium (`e2e/contrast.spec.js` checks the palette itself): the surface amber
 * `--warning` sits at 1.65:1 on `--background` and 1.50:1 on a `--secondary` track, and
 * `text-destructive` on the destructive tint at 3.94:1 — so each of these was below its WCAG
 * threshold until the class changed. A class is normally the wrong thing to assert on, but
 * here the class *is* the colour decision, and happy-dom loads no stylesheet to compute.
 */
import { createElement, act, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it } from 'vitest';

import { CountdownRing, Meter } from '@shared/components';
import { Badge, Button } from '@shared/ui';

const render = async (element: ReactElement): Promise<HTMLElement> => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  await act(async () => {
    createRoot(container).render(element);
  });
  return container;
};

describe('readable ink on the domain colours', () => {
  it('the destructive badge uses the on-tint ink, not the fill colour', async () => {
    const container = await render(createElement(Badge, { variant: 'destructive' }, 'Nicht bestanden'));
    const className = container.querySelector('[data-slot="badge"]')?.className ?? '';
    expect(className).toContain('text-destructive-on-tint');
    expect(className).not.toMatch(/text-destructive(?![-\w])/);
  });

  it('the success button uses the on-fill ink, not white', async () => {
    const container = await render(createElement(Button, { variant: 'success' }, 'Knew it'));
    const className = container.querySelector('[data-slot="button"]')?.className ?? '';
    expect(className).toContain('text-success-on-fill');
    expect(className).not.toContain('text-white');
  });

  it('a mid-range Meter bar uses the readable amber, not the surface amber', async () => {
    const container = await render(
      createElement(Meter, {
        label: 'Lesen',
        value: 38,
        of: 75,
        colorByScore: true,
        thresholdPercent: 60,
        thresholdLabel: '60%'
      })
    );
    const className = container.querySelector('[data-slot="progress-indicator"]')?.className ?? '';
    expect(className).toContain('bg-warning-foreground');
    expect(className).not.toContain('var(--warning)');
  });

  it('the countdown ring warns in the readable amber, not the surface amber', async () => {
    const container = await render(
      createElement(CountdownRing, { secondsRemaining: 200, totalSeconds: 600 })
    );
    const stroke = [...container.querySelectorAll('circle')].at(-1)?.getAttribute('class') ?? '';
    expect(stroke).toContain('text-warning-foreground');
    expect(stroke).not.toContain('var(--warning)');
  });
});
