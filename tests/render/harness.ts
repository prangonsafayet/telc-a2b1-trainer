/** Mounts the real app at a route, the way the browser does, and waits for it to settle. */
import { createElement, act, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';

import { AppRouter } from '@app/router.tsx';
import { addDays, toIsoDate } from '@shared/lib/format.ts';
import { learnTaskKey } from '@shared/lib/learnProgress.ts';
import { type LearnDoneMap } from '@shared/types';
import { PROGRESS_STORAGE_KEY, ProgressProvider } from '@features/progress';
import { ConfirmProvider } from '@shared/providers/ConfirmProvider.tsx';

export interface Mounted {
  readonly container: HTMLElement;
  readonly text: () => string;
  readonly unmount: () => Promise<void>;
}

const app = (route: string): ReactElement =>
  createElement(
    ProgressProvider,
    null,
    createElement(
      ConfirmProvider,
      null,
      createElement(MemoryRouter, { initialEntries: [route] }, createElement(AppRouter))
    )
  );

export const mount = async (route: string): Promise<Mounted> => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(app(route));
  });

  /* Route chunks are lazy, and the heavier ones outlast any fixed sleep, so wait for the
     Suspense fallback to actually go away. */
  await waitFor(() => !container.querySelector('[aria-busy="true"]'));

  return {
    container,
    text: () => container.textContent ?? '',
    unmount: async () => {
      await act(async () => {
        root.unmount();
      });
      container.remove();
    }
  };
};

/** Lets queued effects, timers and microtasks run. */
export const settle = (ms = 40): Promise<void> =>
  act(async () => {
    await new Promise(resolve => setTimeout(resolve, ms));
  });

/** Polls until `predicate` holds, or gives up and returns false. */
export const waitFor = async (
  predicate: () => boolean,
  { timeout = 5000, interval = 20 } = {}
): Promise<boolean> => {
  const deadline = Date.now() + timeout;
  for (;;) {
    await settle(interval);
    if (predicate()) return true;
    if (Date.now() > deadline) return false;
  }
};

export const bySelector = (selector: string): readonly Element[] => [...document.querySelectorAll(selector)];

/** First element matching `selector` whose text matches. Defaults to buttons. */
export const findByText = (pattern: RegExp, selector = 'button'): HTMLElement | undefined =>
  bySelector(selector).find(element => pattern.test(element.textContent ?? '')) as HTMLElement | undefined;

export const click = async (element: Element | undefined): Promise<void> => {
  if (!element) throw new Error('click() got nothing to click');
  await act(async () => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  await settle(40);
};

/**
 * Types into a controlled input. React tracks the previous value on the DOM node, so the
 * value has to go through the native setter or the change event is swallowed as a no-op.
 */
export const typeInto = async (element: Element | undefined, value: string): Promise<void> => {
  if (!element) throw new Error('typeInto() got nothing to type into');
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  await act(async () => {
    setter?.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await settle(30);
};

/** React's onBlur is a focusout listener, not a blur one. */
export const blur = async (element: Element | undefined): Promise<void> => {
  if (!element) throw new Error('blur() got nothing to blur');
  await act(async () => {
    element.dispatchEvent(new Event('focusout', { bubbles: true }));
  });
  await settle(30);
};

/** Elements addressed the way a screen reader would. */
export const byLabel = (label: string): HTMLElement | null =>
  document.querySelector(`[aria-label="${label}"]`);

/** Collects console.error output so a test can fail on React warnings. */
export const captureErrors = (): { readonly restore: () => void; readonly real: () => string[] } => {
  const errors: string[] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args.map(String).join(' '));
  };
  return {
    restore: () => {
      console.error = original;
    },
    real: () =>
      errors.filter(
        message => !/not wrapped in act|ReactDOMTestUtils|not configured to support act/.test(message)
      )
  };
};

export const today = (): string => toIsoDate(new Date());

/** `today + days`, for tests that must stay true whenever they are run. */
export const isoInDays = (days: number): string => {
  const iso = addDays(today(), days);
  if (iso === null) throw new Error('unreachable: today() is a valid date');
  return iso;
};

export interface SeedOptions {
  /** Exam date as an offset from today, so a suite never rots into "past-due". */
  readonly daysUntilExam?: number;
  /** Learn days to mark finished. */
  readonly completedDays?: readonly { readonly day: number; readonly tasks: number }[];
  readonly attempts?: readonly { readonly examId: number }[];
}

/**
 * Writes a stored document before mounting. Exam dates are always relative: a suite that
 * hardcodes a date passes today and fails silently a month later.
 */
export const seedProgress = (options: SeedOptions = {}): void => {
  const learnDone: LearnDoneMap = {};
  for (const entry of options.completedDays ?? []) {
    for (let index = 0; index < entry.tasks; index += 1) learnDone[learnTaskKey(entry.day, index)] = true;
  }

  localStorage.setItem(
    PROGRESS_STORAGE_KEY,
    JSON.stringify({
      attempts: (options.attempts ?? []).map((attempt, index) => ({
        id: index + 1,
        examId: attempt.examId,
        mode: 'full',
        date: new Date().toISOString(),
        times: {},
        scores: {},
        sb: null,
        answers: {},
        ratings: {}
      })),
      learnDone,
      ...(options.daysUntilExam === undefined
        ? {}
        : { settings: { examDate: isoInDays(options.daysUntilExam) } })
    })
  );
};
