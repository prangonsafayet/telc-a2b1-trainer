import { beforeEach, describe, expect, it } from 'vitest';

import { LEARN } from '@content/learn.ts';

import { MAX_PREP_DAYS } from '@shared/config/schedule.ts';

import { mount, seedProgress } from './harness.ts';

/* The plan is the feature: if the pages stop reflecting the exam date, the user is back to
   a fixed 28-day curriculum they may not have 28 days for. Each runway is checked at the
   page level, including the three fallbacks. */

const TASKS_PER_DAY = (day: number): number =>
  LEARN.days.find(candidate => candidate.day === day)?.tasks.length ?? 3;

beforeEach(() => {
  localStorage.clear();
});

describe('with a long runway', () => {
  beforeEach(() => {
    seedProgress({ daysUntilExam: MAX_PREP_DAYS });
  });

  it('groups the Learn page by day, starting with today', async () => {
    const page = await mount('/learn');
    expect(page.text()).toMatch(/Your schedule/);
    expect(page.text()).toMatch(/Today ·/);
    expect(page.text()).toMatch(/Lessons/);
    /* One lesson a day at this pace, so nothing is flagged as a long day. */
    expect(page.text()).not.toMatch(/a long day/);
    await page.unmount();
  });

  it('says how the plan is paced instead of promising a fixed two weeks', async () => {
    const page = await mount('/learn');
    expect(page.text()).toMatch(new RegExp(`${String(MAX_PREP_DAYS)} days to`));
    expect(page.text()).not.toMatch(/2-week learning phase/);
    await page.unmount();
  });

  it('schedules every exam, so none is marked optional on the Dashboard', async () => {
    const page = await mount('/');
    expect(page.text()).toMatch(/Today's plan|Today’s plan/);
    expect(page.text()).toMatch(/planned/);
    expect(page.text()).not.toMatch(/optional/);
    await page.unmount();
  });
});

describe('with a short runway', () => {
  beforeEach(() => {
    seedProgress({ daysUntilExam: 10 });
  });

  it('compresses the core curriculum and says so', async () => {
    const page = await mount('/learn');
    expect(page.text()).toMatch(/a long day/);
    await page.unmount();
  });

  it('offers the extension tier as extra material rather than hiding it', async () => {
    const page = await mount('/learn');
    expect(page.text()).toMatch(/Extra material/);
    expect(page.text()).toMatch(/Not scheduled at your pace/);
    await page.unmount();
  });

  it('marks the exams that do not fit as optional', async () => {
    const page = await mount('/');
    expect(page.text()).toMatch(/optional/);
    await page.unmount();
  });
});

describe('the fallbacks', () => {
  it('explains a date in the past and offers to fix it', async () => {
    seedProgress({ daysUntilExam: -1 });
    const dashboard = await mount('/');
    expect(dashboard.text()).toMatch(/exam date needs updating/);
    expect(dashboard.container.querySelector('a[href="/settings"]')).not.toBeNull();
    await dashboard.unmount();

    const learn = await mount('/learn');
    /* No plan, but the curriculum is still fully usable. */
    expect(learn.text()).toMatch(/28-day curriculum/);
    expect(learn.text()).toMatch(/date has passed/);
    await learn.unmount();
  });

  it('explains a runway longer than the plannable window', async () => {
    seedProgress({ daysUntilExam: 200 });
    const page = await mount('/');
    expect(page.text()).toMatch(new RegExp(`covers the next ${String(MAX_PREP_DAYS)} days`));
    await page.unmount();
  });

  it('explains the emergency sprint when the exam is days away', async () => {
    seedProgress({ daysUntilExam: 3 });
    const page = await mount('/');
    expect(page.text()).toMatch(/emergency plan/);
    await page.unmount();
  });
});

describe('as lessons get finished', () => {
  it('moves them out of the schedule and into a Done section', async () => {
    seedProgress({
      daysUntilExam: 30,
      completedDays: [1, 2, 3].map(day => ({ day, tasks: TASKS_PER_DAY(day) }))
    });
    const page = await mount('/learn');
    expect(page.text()).toMatch(/3 days finished/);
    /* A finished day is no longer part of any dated slot. */
    const schedule = page.text().split('Done')[0] ?? '';
    expect(schedule).not.toMatch(/Day 1:/);
    await page.unmount();
  });
});
