import { beforeEach, describe, expect, it } from 'vitest';

import { MAX_PREP_DAYS, MIN_PREP_DAYS } from '@shared/config/schedule.ts';
import { daysBetween } from '@shared/lib/format.ts';
import { PROGRESS_STORAGE_KEY } from '@features/progress';

import { blur, byLabel, click, findByText, mount, seedProgress, today, typeInto } from './harness.ts';

/* The exam date now drives the whole plan, so the control that sets it has to be strict:
   an unusable date is not a bad plan, it is no plan. Dates before the minimum runway must
   be unreachable, not merely discouraged. */

const storedExamDate = (): string | undefined => {
  const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
  return raw ? (JSON.parse(raw) as { settings?: { examDate?: string } }).settings?.examDate : undefined;
};

const daysStored = (): number | null => daysBetween(today(), storedExamDate());

/** react-day-picker renders its days as buttons inside grid cells. */
const dayButtons = (): readonly Element[] => [...document.querySelectorAll('[role="gridcell"] button')];

beforeEach(() => {
  localStorage.clear();
  seedProgress({ daysUntilExam: 30 });
});

describe('the exam-date field', () => {
  it('shows the date as a formatted date, not a raw input', async () => {
    const page = await mount('/settings');
    const trigger = findByText(/\d{4}/);
    expect(trigger).toBeDefined();
    expect(trigger?.textContent ?? '').toMatch(/\d{4}/);
    expect(page.text()).toMatch(/countdown in the header/);
    await page.unmount();
  });

  it('previews what the date does to the plan', async () => {
    const page = await mount('/settings');
    expect(page.text()).toMatch(/learning days/);
    expect(page.text()).toMatch(/mock-exam days/);
    await page.unmount();
  });
});

describe('the days-from-today field', () => {
  it('writes a date that many days out', async () => {
    const page = await mount('/settings');
    await typeInto(document.querySelector('#days-until-exam') ?? undefined, '45');
    expect(daysStored()).toBe(45);
    await page.unmount();
  });

  it('refuses a runway shorter than the minimum, and says why', async () => {
    const page = await mount('/settings');
    const field = document.querySelector('#days-until-exam') ?? undefined;
    await typeInto(field, '2');
    expect(daysStored()).toBe(30);
    expect(page.text()).toMatch(/Too close to plan/);
    expect(field?.getAttribute('aria-invalid')).toBe('true');
    await page.unmount();
  });

  it('refuses a runway longer than the maximum', async () => {
    const page = await mount('/settings');
    await typeInto(document.querySelector('#days-until-exam') ?? undefined, '400');
    expect(daysStored()).toBe(30);
    expect(page.text()).toMatch(new RegExp(`${String(MAX_PREP_DAYS)} days is the longest plan`));
    await page.unmount();
  });

  it('drops an unusable draft when the field loses focus', async () => {
    const page = await mount('/settings');
    const field = document.querySelector('#days-until-exam');
    await typeInto(field ?? undefined, '1');
    await blur(field ?? undefined);
    expect((field as HTMLInputElement | null)?.value).toBe('30');
    await page.unmount();
  });

  it('advertises its own limits to assistive tech', async () => {
    const page = await mount('/settings');
    const field = document.querySelector('#days-until-exam');
    expect(field?.getAttribute('min')).toBe(String(MIN_PREP_DAYS));
    expect(field?.getAttribute('max')).toBe(String(MAX_PREP_DAYS));
    await page.unmount();
  });
});

describe('the calendar', () => {
  /* Seeded at the minimum runway, so the month on screen is the first plannable one and its
     earlier days are the ones that must be refused. */
  beforeEach(() => {
    localStorage.clear();
    seedProgress({ daysUntilExam: MIN_PREP_DAYS });
  });

  it('opens, and uses real selects rather than the native overlay', async () => {
    const page = await mount('/settings');
    await click(findByText(/\d{4}/));
    const popover = document.querySelector('[data-slot="popover-content"]');
    expect(popover).not.toBeNull();
    expect(popover?.querySelectorAll('select')).toHaveLength(0);
    expect(byLabel('Monat auswählen')).not.toBeNull();
    expect(byLabel('Jahr auswählen')).not.toBeNull();
    await page.unmount();
  });

  it('lets no month outside the plannable window be chosen', async () => {
    const page = await mount('/settings');
    await click(findByText(/\d{4}/));
    await click(byLabel('Monat auswählen') ?? undefined);
    const months = [...document.querySelectorAll('[data-slot="select-item"]')];
    const selectable = months.filter(
      month => !month.hasAttribute('disabled') && month.getAttribute('aria-disabled') !== 'true'
    );
    /* All twelve are listed so the year reads normally, but a 90-day window spans four
       months at most, so most of them must be unselectable. */
    expect(months).toHaveLength(12);
    expect(selectable.length).toBeGreaterThan(0);
    expect(selectable.length).toBeLessThanOrEqual(4);
    await page.unmount();
  });

  it('cannot reach a month before the window', async () => {
    const page = await mount('/settings');
    await click(findByText(/\d{4}/));
    /* Opened on the earliest allowed month, so stepping back is refused. react-day-picker
       marks its nav with aria-disabled rather than the disabled attribute. */
    const previous = byLabel('Zum vorherigen Monat');
    expect(previous).not.toBeNull();
    expect(previous?.getAttribute('aria-disabled')).toBe('true');
    await page.unmount();
  });

  it('leaves every day before the minimum runway unselectable', async () => {
    const page = await mount('/settings');
    await click(findByText(/\d{4}/));

    const earliest = new Date();
    earliest.setDate(earliest.getDate() + MIN_PREP_DAYS);
    const disabled = dayButtons().filter(
      day => day.hasAttribute('disabled') || day.getAttribute('aria-disabled') === 'true'
    );

    /* Stated as a condition rather than assumed: when the window opens on the 1st there is
       no earlier day in that month's grid to disable. */
    if (earliest.getDate() > 1) expect(disabled.length).toBeGreaterThan(0);
    for (const day of disabled) {
      await click(day);
      expect(daysStored()).toBe(MIN_PREP_DAYS);
    }
    await page.unmount();
  });

  it('saves an in-window day as a local ISO date', async () => {
    const page = await mount('/settings');
    await click(findByText(/\d{4}/));
    const enabled = dayButtons().filter(
      day => !day.hasAttribute('disabled') && day.getAttribute('aria-disabled') !== 'true'
    );
    expect(enabled.length).toBeGreaterThan(0);
    await click(enabled[0]);
    expect(storedExamDate() ?? '').toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const days = daysStored() ?? -1;
    expect(days).toBeGreaterThanOrEqual(MIN_PREP_DAYS);
    expect(days).toBeLessThanOrEqual(MAX_PREP_DAYS);
    await page.unmount();
  });

  it('renders month-navigation chevrons pointing both ways', async () => {
    const page = await mount('/settings');
    await click(findByText(/\d{4}/));
    const popover = document.querySelector('[data-slot="popover-content"]');
    const directions = [...(popover?.querySelectorAll('svg') ?? [])]
      .map(icon => /lucide-chevron-(left|right|up|down)/.exec(icon.getAttribute('class') ?? '')?.[1])
      .filter(Boolean);
    expect(directions).toContain('left');
    expect(directions).toContain('right');
    await page.unmount();
  });
});
