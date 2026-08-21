import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { type DualLevelAttempt } from '@shared/types';
import { runFormatFor } from '@features/exam';
import { PROGRESS_STORAGE_KEY } from '@features/progress';

import { captureErrors, click, findByText, mount, seedProgress, waitFor } from './harness.ts';

/* Drives a real attempt end to end, including a mid-module page refresh — the failure this
   guards against lost a candidate's answers and their remaining time. */

const runStore = runFormatFor('a2b1').runStore;

const storedAttempts = (): readonly DualLevelAttempt[] => {
  const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
  return raw ? ((JSON.parse(raw) as { attempts?: DualLevelAttempt[] }).attempts ?? []) : [];
};

let errors: ReturnType<typeof captureErrors>;

beforeEach(() => {
  localStorage.clear();
  runStore.clear('a2b1');
  seedProgress({ daysUntilExam: 30 });
  errors = captureErrors();
});

afterEach(() => {
  errors.restore();
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
    const started = runStore.load('a2b1');
    expect(started?.phase).toBe('module');
    /* An absolute deadline, not a countdown: a countdown cannot survive a reload. */
    expect(started?.deadline).toBeTruthy();

    /* 3. Answer one item. */
    const radios = [...document.querySelectorAll('button[role="radio"]')];
    expect(radios.length).toBeGreaterThan(0);
    await click(radios[0]);
    expect(Object.keys(runStore.load('a2b1')?.answers ?? {})).toHaveLength(1);

    /* 4. The refresh: tear the tree down and remount at the same URL. */
    const savedDeadline = runStore.load('a2b1')?.deadline;
    await view.unmount();
    view = await mount('/exam/1/lesen');
    expect(view.text()).toMatch(/Teil 1 — Anzeigen zuordnen/);
    expect(runStore.load('a2b1')?.deadline).toBe(savedDeadline);
    expect(Object.keys(runStore.load('a2b1')?.answers ?? {})).toHaveLength(1);
    expect(document.querySelectorAll('button[role="radio"][data-state="checked"]')).toHaveLength(1);

    /* 5. Submit with blanks: confirm, then results. */
    const submit = findByText(/^Submit Lesen/);
    expect(submit).toBeDefined();
    await click(submit);
    expect(document.body.textContent ?? '').toMatch(/still unanswered/);
    await click(findByText(/Submit anyway/));

    /* The results screen is a lazy route chunk; under full-suite load it can outlast the
       click helper's fixed settle, so wait for it the same way mount() waits out chunks. */
    await waitFor(() => /time used/.test(view.text()));
    expect(view.text()).toMatch(/time used/);
    /* The in-progress run must be gone, or the dashboard offers to resume a finished exam. */
    expect(runStore.load('a2b1')).toBeNull();

    const attempts = storedAttempts();
    expect(attempts).toHaveLength(1);
    expect(typeof attempts[0]?.scores.lesen).toBe('number');

    /* Nothing on the way through a whole attempt may log a React error. A broad guard, not
       a targeted one: React only warns about a state update during render when an update is
       already queued, so the defect that motivated it — storing the attempt from inside a
       `setRun` updater — is covered by `examFinish.test.ts` instead. */
    expect(errors.real()).toEqual([]);

    await view.unmount();
  });
});
