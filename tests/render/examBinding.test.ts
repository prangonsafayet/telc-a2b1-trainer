import { act, createElement, Suspense } from 'react';

import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { useExamBinding } from '@features/exam/hooks/useExamBinding.ts';
import { type ExamBinding } from '@features/exam/types/examBinding.ts';
import { ProgressProvider, useTrainerSlice, type TrainerSlice } from '@features/progress';

import { waitFor } from './harness.ts';

/*
 * `useExamBinding` resolves a trainer to its paper, its Modelltests and the document its
 * attempts live in. Its memo used to depend on the whole slice and the whole content object,
 * both of which are rebuilt on every progress write — so ticking a curriculum checkbox
 * handed the runner a brand-new `store` and a brand-new `format`, and everything downstream
 * of them re-rendered. The memo now names the five references it actually reads.
 */

let binding: ExamBinding | null = null;
let update: TrainerSlice['update'] | null = null;

const Probe = (): null => {
  binding = useExamBinding('a2b1');
  update = useTrainerSlice('a2b1').update;
  return null;
};

const live = (): ExamBinding => {
  if (!binding) throw new Error('the probe has not resolved its content yet');
  return binding;
};

let unmount: () => Promise<void>;

beforeEach(async () => {
  binding = null;
  update = null;

  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(createElement(ProgressProvider, null, createElement(Suspense, null, createElement(Probe))));
  });
  /* The trainer's content is loaded lazily, so the probe suspends before it ever binds. */
  await waitFor(() => binding !== null);

  unmount = async () => {
    await act(async () => {
      root.unmount();
    });
    container.remove();
  };
});

afterEach(async () => {
  await unmount();
});

describe('the exam binding', () => {
  it('survives a progress write that does not touch the exam', async () => {
    const before = live();

    await act(async () => {
      update?.(current => ({ ...current, learnDone: { ...current.learnDone, d1t0: true } }));
    });

    /* Same object: a curriculum tick is not news to the runner. */
    expect(live()).toBe(before);
    expect(live().store).toBe(before.store);
    expect(live().papers).toBe(before.papers);
  });

  /* The other half of narrowing a memo: it must still fire when what it reads does change,
     or the runner is handed a stale store and the attempt it just saved is invisible. */
  it('sees a stored attempt appear, which is a reference it does depend on', async () => {
    const before = live();
    expect(before.kind).toBe('dual-level');
    if (before.kind !== 'dual-level') throw new Error('the root trainer sets the dual-level paper');

    await act(async () => {
      before.store.saveAttempt({
        id: 1,
        examId: 1,
        mode: 'full',
        date: new Date().toISOString(),
        times: {},
        scores: {},
        sb: null,
        answers: {},
        ratings: {}
      });
    });

    expect(live().store.attempts).toHaveLength(1);
    expect(live()).not.toBe(before);
  });

  it('still resolves the trainer to its own paper and store', () => {
    expect(live().kind).toBe('dual-level');
    expect(live().papers.length).toBeGreaterThan(0);
    expect(typeof live().store.saveAttempt).toBe('function');
  });
});
