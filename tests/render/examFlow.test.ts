import { beforeEach, describe, expect, it } from 'vitest';

import { type Attempt } from '@shared/types';
import { clearRun, loadRun } from '@features/exam';
import { PROGRESS_STORAGE_KEY } from '@features/progress';

import { click, findByText, mount, seedProgress } from './harness.ts';

/* Drives a real attempt end to end, including a mid-module page refresh — the failure this
   guards against lost a candidate's answers and their remaining time. */

const storedAttempts = (): readonly Attempt[] => {
  const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
  return raw ? ((JSON.parse(raw) as { attempts?: Attempt[] }).attempts ?? []) : [];
};

beforeEach(() => {
  localStorage.clear();
  clearRun();
  seedProgress({ daysUntilExam: 30 });
});

describe('a single-module practice run', () => {
  it('survives a refresh and records an attempt', async () => {
    /* 1. The briefing. */
    let view = await mount('/exam/1/lesen');
    expect(view.text()).toMatch(/Leseverstehen/);
    const start = findByText(/^Start Lesen/);
    expect(start).toBeDefined();

    /* 2. Start the module. */
    await click(start);
    expect(view.text()).toMatch(/Teil 1 — Anzeigen zuordnen/);
    expect(view.text()).toMatch(/4[45]:\d\d/);
    const started = loadRun();
    expect(started?.phase).toBe('module');
    /* An absolute deadline, not a countdown: a countdown cannot survive a reload. */
    expect(started?.deadline).toBeTruthy();

    /* 3. Answer one item. */
    const radios = [...document.querySelectorAll('button[role="radio"]')];
    expect(radios.length).toBeGreaterThan(0);
    await click(radios[0]);
    expect(Object.keys(loadRun()?.answers ?? {})).toHaveLength(1);

    /* 4. The refresh: tear the tree down and remount at the same URL. */
    const savedDeadline = loadRun()?.deadline;
    await view.unmount();
    view = await mount('/exam/1/lesen');
    expect(view.text()).toMatch(/Teil 1 — Anzeigen zuordnen/);
    expect(loadRun()?.deadline).toBe(savedDeadline);
    expect(Object.keys(loadRun()?.answers ?? {})).toHaveLength(1);
    expect(document.querySelectorAll('button[role="radio"][data-state="checked"]')).toHaveLength(1);

    /* 5. Submit with blanks: confirm, then results. */
    const submit = findByText(/^Submit Lesen/);
    expect(submit).toBeDefined();
    await click(submit);
    expect(document.body.textContent ?? '').toMatch(/still unanswered/);
    await click(findByText(/Submit anyway/));

    expect(view.text()).toMatch(/time used/);
    /* The in-progress run must be gone, or the dashboard offers to resume a finished exam. */
    expect(loadRun()).toBeNull();

    const attempts = storedAttempts();
    expect(attempts).toHaveLength(1);
    expect(typeof attempts[0]?.scores.lesen).toBe('number');

    await view.unmount();
  });
});
