import { act, createElement } from 'react';

import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { useExamRun, type ExamRunController } from '@features/exam/hooks/useExamRun.ts';
import { createRunStore } from '@features/exam/lib/runStore.ts';
import {
  type ExamFormat,
  type ExamPaper,
  type RunSettings,
  type StoredAttempt
} from '@features/exam/types/examFormat.ts';

import { captureErrors, settle } from './harness.ts';

/*
 * The finish path — score the run, store the attempt, clear the run, navigate — used to
 * live inside a `setRun` updater. React runs updaters while it renders, so storing the
 * attempt set state on `ProgressProvider` mid-render ("Cannot update a component while
 * rendering a different component") and the finish side effects were no longer tied to the
 * click that caused them. The fix writes every transition through a ref first, so `submit`
 * acts synchronously and outside render.
 *
 * The React warning is not a usable signal: React computes an updater eagerly, with no
 * warning, whenever nothing else is pending on that component. So this test queues an
 * update first (an answer, exactly as a candidate would) and then asserts the observable
 * consequence — the attempt exists the moment `submit()` returns, not a render later.
 */

const RUN_KEY = 'examFinishRegressionRunV1';
const runStore = createRunStore(RUN_KEY);

const EXAM: ExamPaper = { id: 1, title: 'Modelltest 1' };
const SETTINGS: RunSettings = { writingMinutes: 30, playsAllowed: 1 };
const RATING: ExamFormat<ExamPaper, RunSettings, StoredAttempt>['rating']['schreiben'] = {
  criteria: [['Inhalt', 'all three points covered']],
  scale: 3,
  max: 15
};

/** The hook never renders a module here; the run machine is what is under test. */
const emptyModule = (): null => null;

let stored: StoredAttempt[] = [];
let nextAttemptId = 1;

/* A stand-in paper. The machine is generic over the format, so the smallest descriptor
   that satisfies the contract exercises it without dragging a Modelltest along. */
const FORMAT: ExamFormat<ExamPaper, RunSettings, StoredAttempt> = {
  id: 'dual-level',
  modules: ['lesen'],
  runStore,
  trainer: () => 'a2b1',
  examLabel: exam => exam.title,
  moduleName: module => module,
  moduleShort: module => module,
  minutes: () => 45,
  briefing: () => 'Read the four Anzeigen.',
  rating: { schreiben: RATING, sprechen: RATING },
  speakingHint: '',
  speakingReviewNote: '',
  moduleComponents: {
    lesen: emptyModule,
    sprachbausteine: emptyModule,
    hoeren: emptyModule,
    schreiben: emptyModule,
    sprechen: emptyModule
  },
  scoring: {
    countUnanswered: () => 0,
    buildAttempt: run => ({
      id: nextAttemptId++,
      examId: run.exam.id,
      mode: run.mode,
      date: new Date().toISOString(),
      answers: run.answers,
      ratings: run.ratings
    }),
    summarize: () => {
      throw new Error('the results screen is not part of this test');
    },
    completionToast: () => ({ tone: 'success', title: 'Lesen saved', description: '' }),
    review: () => [],
    writingSample: () => null
  }
};

let controller: ExamRunController | null = null;

const Probe = (): null => {
  controller = useExamRun({
    format: FORMAT,
    exam: EXAM,
    mode: 'lesen',
    settings: SETTINGS,
    saveAttempt: attempt => {
      stored.push(attempt);
    }
  });
  return null;
};

/** The live controller — every render replaces it, and a stale one hides the defect. */
const live = (): ExamRunController => {
  if (!controller) throw new Error('the probe has not rendered');
  return controller;
};

let errors: ReturnType<typeof captureErrors>;
let unmount: () => Promise<void>;

beforeEach(async () => {
  stored = [];
  nextAttemptId = 1;
  controller = null;
  runStore.clear();
  errors = captureErrors();

  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(createElement(MemoryRouter, { initialEntries: ['/exam/1/lesen'] }, createElement(Probe)));
  });
  unmount = async () => {
    await act(async () => {
      root.unmount();
    });
    container.remove();
  };
});

afterEach(async () => {
  await unmount();
  errors.restore();
});

describe('finishing a run', () => {
  it('stores the attempt synchronously, not from inside a state updater', async () => {
    await act(async () => {
      live().beginModule();
    });
    expect(runStore.load()?.phase).toBe('module');

    /* An answer first: with an update already pending React defers a state updater to the
       next render, so a finish that lives inside one has not run when submit() returns. */
    live().setAnswer('l1.0', 'a');
    live().submit();

    expect(stored).toHaveLength(1);
    /* Read through the ref, not through the render's closure: the answer typed in the same
       tick is part of the attempt. */
    expect(stored[0]?.answers).toEqual({ 'l1.0': 'a' });
    /* And the whole transition happened, not just the scoring. */
    expect(runStore.load()).toBeNull();

    /* Once, not once per render pass. */
    await settle();
    expect(stored).toHaveLength(1);
    expect(errors.real()).toEqual([]);
  });

  it('stores the attempt once when the same submit is dispatched twice', async () => {
    await act(async () => {
      live().beginModule();
    });

    await act(async () => {
      live().submit();
      live().submit();
    });

    expect(stored).toHaveLength(1);
    expect(runStore.load()).toBeNull();
  });
});
