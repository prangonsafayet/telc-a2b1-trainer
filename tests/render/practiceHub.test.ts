import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { SINGLE_LEVEL_TRAINERS, TRAINERS } from '@shared/config/trainers.ts';
import { type SrsMap } from '@shared/types';
import { usePracticeStore } from '@features/practice/lib/practiceStore.ts';
import { PROGRESS_STORAGE_KEY } from '@features/progress';

import { bySelector, captureErrors, click, findByText, mount, selectTab } from './harness.ts';

/*
 * The practice hub — flashcards, quiz drills and the reference tables — had no coverage at
 * all. This covers the one behaviour that matters most: grading a flashcard or answering a
 * quiz question has to write a real SRS transition into that trainer's own document slice,
 * not just move the session along in memory. Parameterised over SINGLE_LEVEL_TRAINERS, the
 * registry's list of trainers that keep a vocabulary bank worth drilling.
 */

describe.each(SINGLE_LEVEL_TRAINERS)('the practice hub — %s', trainer => {
  const info = TRAINERS[trainer];
  const docKey = info.docKey;
  if (docKey === null) throw new Error(`${trainer} is single-level but has no docKey`);

  const storedSrs = (): SrsMap => {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const db = JSON.parse(raw) as Partial<Record<string, { srs?: SrsMap }>>;
    return db[docKey]?.srs ?? {};
  };

  let errors: ReturnType<typeof captureErrors>;

  beforeEach(() => {
    localStorage.clear();
    usePracticeStore.getState().end();
    errors = captureErrors();
  });

  afterEach(() => {
    errors.restore();
  });

  it('grades a flashcard and persists its SRS entry', async () => {
    const view = await mount(`${info.basePath}/practice`);
    expect(view.text()).toMatch(/Practice/);

    await click(findByText(/Flashcards/));

    const session = usePracticeStore.getState().session;
    if (session?.kind !== 'flashcards') throw new Error('expected a flashcard session to start');
    const cardId = session.cards[0]?.id;
    if (!cardId) throw new Error('the flashcard session started with no cards');

    /* Nothing recorded for this item yet. */
    expect(storedSrs()[cardId]).toBeUndefined();

    await click(findByText(/Flip card/));

    /* The primary action goes through Button's `success` variant rather than a copy of its
       classes — the copy shipped `text-white`, which measures 3.89:1 on the green in
       Chromium's light theme and 2.70:1 in dark. See tests/render/readableColors.test.ts. */
    const knewIt = findByText(/Knew it/);
    expect(knewIt?.className).toContain('text-success-on-fill');
    expect(knewIt?.className).not.toContain('text-white');

    await click(knewIt);

    const entry = storedSrs()[cardId];
    expect(entry?.box).toBe(1);
    expect(entry?.seen).toBe(1);
    expect(entry?.correct).toBe(1);
    expect(entry?.wrong).toBe(0);
    /* A local YYYY-MM-DD, not an ISO timestamp. */
    expect(entry?.due).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    expect(errors.real()).toEqual([]);
    await view.unmount();
  });

  /* The card is the control — the whole 3D face is clickable — so it has to stay a real
     button with its own label. It was a raw `<button>` until `Pressable` existed, and the
     lint rule that now refuses raw controls cannot say whether the replacement still works. */
  it('flips when the card itself is clicked, not only the Flip button', async () => {
    const view = await mount(`${info.basePath}/practice`);
    await click(findByText(/Flashcards/));

    const front = bySelector('button[aria-label="Show the English side"]');
    expect(front).toHaveLength(1);
    await click(front[0]);

    expect(bySelector('button[aria-label="Show the German side"]')).toHaveLength(1);
    const flipped = usePracticeStore.getState().session;
    expect(flipped?.kind === 'flashcards' && flipped.flipped).toBe(true);

    await view.unmount();
  });

  it('grading "Didn\'t know" resets the box to 1 and counts a wrong answer', async () => {
    const view = await mount(`${info.basePath}/practice`);
    await click(findByText(/Flashcards/));

    const session = usePracticeStore.getState().session;
    if (session?.kind !== 'flashcards') throw new Error('expected a flashcard session to start');
    const cardId = session.cards[0]?.id;
    if (!cardId) throw new Error('the flashcard session started with no cards');

    await click(findByText(/Flip card/));
    await click(findByText(/Didn't know/));

    const entry = storedSrs()[cardId];
    expect(entry?.box).toBe(1);
    expect(entry?.correct).toBe(0);
    expect(entry?.wrong).toBe(1);

    await view.unmount();
  });

  it('answering a quiz question persists an SRS entry matching whether it was right', async () => {
    const view = await mount(`${info.basePath}/practice`);
    await click(findByText(/Quiz/));

    const session = usePracticeStore.getState().session;
    if (session?.kind !== 'quiz') throw new Error('expected a quiz session to start');
    const question = session.questions[0];
    if (!question) throw new Error('the quiz session started with no questions');

    const correctText = question.options[question.answer];
    if (!correctText) throw new Error('the first question has no correct option text');

    const optionButtons = bySelector('button');
    const correctButton = optionButtons.find(button => button.textContent?.includes(correctText));
    expect(correctButton).toBeDefined();
    await click(correctButton);

    /* The explanation appears and a "Next" button replaces the disabled options — proof the
       answer was actually registered, not just clicked. */
    expect(document.body.textContent ?? '').toMatch(/Next/);

    const entry = storedSrs()[question.id];
    expect(entry?.box).toBe(1);
    expect(entry?.seen).toBe(1);
    expect(entry?.correct).toBe(1);
    expect(entry?.wrong).toBe(0);

    expect(errors.real()).toEqual([]);
    await view.unmount();
  });

  it('renders the reference tables with real bank content', async () => {
    const view = await mount(`${info.basePath}/practice`);

    await selectTab(findByText(/Reference tables/));

    /* The Verben sub-tab is the default and needs no further click. */
    expect(view.text()).toMatch(/Infinitiv/);
    expect(view.text()).toMatch(/Präteritum/);
    expect(view.text()).toMatch(/Perfekt/);

    expect(errors.real()).toEqual([]);
    await view.unmount();
  });
});

/*
 * The practice store is module-global and is deliberately not persisted, so it survives a
 * route change between trainers. Before the session carried its trainer, a session left
 * open under one trainer rendered its cards under the next one and graded them into that
 * trainer's SRS — the exam runner has always guarded the equivalent case for a stored run.
 */
describe('a session does not follow the user to another trainer', () => {
  beforeEach(() => {
    localStorage.clear();
    usePracticeStore.getState().end();
  });

  it('leaves the second trainer with no session, and grades nothing into its document', async () => {
    const [first, second] = SINGLE_LEVEL_TRAINERS;
    if (first === undefined || second === undefined) throw new Error('need two single-level trainers');

    const firstView = await mount(`${TRAINERS[first].basePath}/practice`);
    await click(findByText(/Flashcards/));
    const started = usePracticeStore.getState().session;
    if (started?.kind !== 'flashcards') throw new Error('expected a flashcard session to start');
    expect(started.trainer).toBe(first);

    /* The store still holds the first trainer's session while the second trainer mounts. */
    const view = await mount(`${TRAINERS[second].basePath}/practice`);
    expect(usePracticeStore.getState().session?.trainer).toBe(first);

    /*
     * "End session" renders only while a session is live. It is asserted present on the
     * first trainer before being asserted absent on the second, so the absence means the
     * session did not follow — not merely that the marker was mistyped.
     */
    expect(firstView.text()).toMatch(/End session/);
    expect(view.text()).toMatch(/Flashcards/);
    expect(view.text()).not.toMatch(/End session/);

    const secondKey = TRAINERS[second].docKey;
    if (secondKey === null) throw new Error(`${second} has no docKey`);
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    const db = raw === null ? {} : (JSON.parse(raw) as Partial<Record<string, { srs?: SrsMap }>>);
    expect(db[secondKey]?.srs ?? {}).toEqual({});
  });
});
