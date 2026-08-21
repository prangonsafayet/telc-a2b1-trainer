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
    runStore.clear(trainer);
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
    const started = runStore.load(trainer);
    expect(started?.phase).toBe('module');
    expect(started?.trainer).toBe(trainer);
    /* An absolute deadline, not a countdown: a countdown cannot survive a reload. */
    expect(started?.deadline).toBeTruthy();

    /* The paper's label is `<title> · <level>` on both papers. It said "· telc Deutsch B1"
       here and nothing at all on the other paper; every exam in the app is a telc exam, so
       the brand distinguished nothing and only the level marker is carried. */
    expect(view.text()).toMatch(/Modelltest 1 · B[12]/);
    expect(view.text()).not.toMatch(/Modelltest 1 · telc/);

    /* 3. Answer one item (a Teil 2 multiple-choice question). */
    const radios = [...document.querySelectorAll('button[role="radio"]')];
    expect(radios.length).toBeGreaterThan(0);
    await click(radios[0]);
    expect(Object.keys(runStore.load(trainer)?.answers ?? {})).toHaveLength(1);

    /* 4. The refresh: tear the tree down and remount at the same URL. */
    const savedDeadline = runStore.load(trainer)?.deadline;
    await view.unmount();
    view = await mount(`${info.basePath}/exam/1/lesen`);
    expect(view.text()).toMatch(/Teil 1 — Überschriften zuordnen/);
    expect(runStore.load(trainer)?.deadline).toBe(savedDeadline);
    expect(Object.keys(runStore.load(trainer)?.answers ?? {})).toHaveLength(1);
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
    expect(runStore.load(trainer)).toBeNull();

    /* The score bars mark this paper's own pass line. The bar primitive used to default it
       to the A2·B1 paper's 70% B1 line, so a single-level sitting was judged against the
       wrong number and said so on screen. */
    expect(document.querySelector('[title="Pass line (60%)"]')).not.toBeNull();
    expect(document.querySelector('[title="B1 threshold (70%)"]')).toBeNull();

    const attempts = storedAttempts();
    expect(attempts).toHaveLength(1);
    expect(typeof attempts[0]?.scores.lesen).toBe('number');

    /* Nothing on the way through a whole attempt may log a React error. */
    expect(errors.real()).toEqual([]);

    await view.unmount();
  });
});

/*
 * The two single-level trainers share one run storage key. A candidate two modules into a
 * B1 sitting used to lose it — answers and remaining time — by merely opening a B2 exam
 * route: `useExamRun`'s initialiser writes a fresh run the moment the page mounts, and the
 * whole key held exactly one run. Nothing warned, and the B1 dashboard then offered nothing
 * to resume. Driven through the mounted app, because the loss happens on navigation rather
 * than on any action a unit test could call.
 */
describe("one trainer's run in progress survives another trainer's exam route", () => {
  const [first, second] = SINGLE_LEVEL_TRAINERS;
  if (!first || !second) throw new Error('this suite needs two single-level trainers');

  const firstStore = runFormatFor(first).runStore;
  const secondStore = runFormatFor(second).runStore;

  beforeEach(() => {
    localStorage.clear();
    firstStore.clear(first);
    secondStore.clear(second);
    seedProgress({ daysUntilExam: 30 });
  });

  it('keeps the answers and the deadline, and still offers to resume', async () => {
    /* A real sitting of the first trainer, one answer in. */
    let view = await mount(`${TRAINERS[first].basePath}/exam/2/lesen`);
    await click(findByText(/^Start Lesen/));
    await click([...document.querySelectorAll('button[role="radio"]')][0]);
    const started = firstStore.load(first);
    expect(started?.examId).toBe(2);
    expect(Object.keys(started?.answers ?? {})).toHaveLength(1);
    await view.unmount();

    /* Opening the other trainer's exam — a bookmark, a back step, a mistaken click. */
    view = await mount(`${TRAINERS[second].basePath}/exam/1/full`);
    expect(secondStore.load(second)?.examId).toBe(1);
    await view.unmount();

    const kept = firstStore.load(first);
    expect(kept?.trainer).toBe(first);
    expect(kept?.examId).toBe(2);
    expect(kept?.answers).toEqual(started?.answers);
    expect(kept?.deadline).toBe(started?.deadline);

    /* And the dashboard says so, which is where the loss was invisible. */
    view = await mount(TRAINERS[first].basePath || '/');
    expect(view.text()).toMatch(/You have an exam in progress/);
    expect(view.text()).toMatch(/Modelltest 2/);
    await view.unmount();
  });
});
