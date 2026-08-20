import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { SINGLE_LEVEL_TRAINERS, TRAINERS } from '@shared/config/trainers.ts';
import { type SingleLevelAttempt } from '@shared/types';
import { runFormatFor } from '@features/exam';
import { PROGRESS_STORAGE_KEY } from '@features/progress';

import { captureErrors, click, findByText, mount, seedProgress, waitFor } from './harness.ts';

/*
 * The B1/B2 equivalent of examFlow.test.ts's dual-level round trip: a real attempt through
 * a real trainer, including a mid-module refresh, proving the deadline survives the reload
 * and the attempt lands in storage exactly once. Parameterised over the single-level
 * trainers from the registry — SINGLE_LEVEL_TRAINERS, never a hardcoded ['b1', 'b2']  — so
 * a fourth single-level trainer inherits this suite unedited.
 */

describe.each(SINGLE_LEVEL_TRAINERS)('a single-module practice run — %s', trainer => {
  const info = TRAINERS[trainer];
  const docKey = info.docKey;
  if (docKey === null) throw new Error(`${trainer} is single-level but has no docKey`);

  const runStore = runFormatFor(trainer).runStore;

  const storedAttempts = (): readonly SingleLevelAttempt[] => {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return [];
    const db = JSON.parse(raw) as Partial<Record<string, { attempts?: SingleLevelAttempt[] }>>;
    return db[docKey]?.attempts ?? [];
  };

  let errors: ReturnType<typeof captureErrors>;

  beforeEach(() => {
    localStorage.clear();
    runStore.clear();
    seedProgress({ daysUntilExam: 30 });
    errors = captureErrors();
  });

  afterEach(() => {
    errors.restore();
  });

  it('survives a refresh and records an attempt', async () => {
    /* 1. The briefing. */
    let view = await mount(`${info.basePath}/exam/1/lesen`);
    expect(view.text()).toMatch(/Leseverstehen/);
    const start = findByText(/^Start Lesen/);
    expect(start).toBeDefined();

    /* 2. Start the module. */
    await click(start);
    expect(view.text()).toMatch(/Teil 1 — Überschriften zuordnen/);
    /* A running clock, whatever this paper's own Lesen minutes are. */
    expect(view.text()).toMatch(/\d{1,2}:\d\d/);
    const started = runStore.load();
    expect(started?.phase).toBe('module');
    expect(started?.trainer).toBe(trainer);
    /* An absolute deadline, not a countdown: a countdown cannot survive a reload. */
    expect(started?.deadline).toBeTruthy();

    /* 3. Answer one item (a Teil 2 multiple-choice question). */
    const radios = [...document.querySelectorAll('button[role="radio"]')];
    expect(radios.length).toBeGreaterThan(0);
    await click(radios[0]);
    expect(Object.keys(runStore.load()?.answers ?? {})).toHaveLength(1);

    /* 4. The refresh: tear the tree down and remount at the same URL. */
    const savedDeadline = runStore.load()?.deadline;
    await view.unmount();
    view = await mount(`${info.basePath}/exam/1/lesen`);
    expect(view.text()).toMatch(/Teil 1 — Überschriften zuordnen/);
    expect(runStore.load()?.deadline).toBe(savedDeadline);
    expect(Object.keys(runStore.load()?.answers ?? {})).toHaveLength(1);
    expect(document.querySelectorAll('button[role="radio"][data-state="checked"]')).toHaveLength(1);

    /* 5. Submit with blanks: confirm, then results. */
    const submit = findByText(/^Submit Lesen/);
    expect(submit).toBeDefined();
    await click(submit);
    expect(document.body.textContent ?? '').toMatch(/still unanswered/);
    await click(findByText(/Submit anyway/));

    /* The results screen is a lazy route chunk; wait it out the way mount() waits out
       chunks, rather than a fixed sleep that a slow chunk could outlast. */
    await waitFor(() => /time used/.test(view.text()));
    expect(view.text()).toMatch(/time used/);
    /* The in-progress run must be gone, or the dashboard offers to resume a finished exam. */
    expect(runStore.load()).toBeNull();

    const attempts = storedAttempts();
    expect(attempts).toHaveLength(1);
    expect(typeof attempts[0]?.scores.lesen).toBe('number');

    /* Nothing on the way through a whole attempt may log a React error. */
    expect(errors.real()).toEqual([]);

    await view.unmount();
  });
});
