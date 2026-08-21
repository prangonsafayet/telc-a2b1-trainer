import { act, createElement } from 'react';

import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DEFAULT_SETTINGS } from '@shared/config/exam.ts';
import { type ProgressDatabase } from '@shared/types';

import { captureErrors, settle } from './harness.ts';

/*
 * Cloud sync retries. The debounced push is gated on having pulled once — pushing before a
 * merge would upsert this device's document over a remote nobody has reconciled with — but
 * the gate was the *only* thing standing between a failed sign-in sync and a session-long
 * stall: every later change was saved locally and never sent until the user signed in again
 * or pressed Sync by hand. The retry is now a full sync, which is safe because it merges.
 *
 * Driven through the hook with a fake Supabase client, the way `examFinish` drives the run
 * machine: the interesting states (a select that fails, then one that does not) are not
 * reachable through the UI.
 */

const USER = { id: 'user-1' };

let selectFails = false;
let selects = 0;
const upserts: unknown[] = [];

const REMOTE_ROW: ProgressDatabase = {
  attempts: [],
  learnDone: { d1t0: true },
  settings: DEFAULT_SETTINGS,
  srs: {},
  activity: {},
  _updatedAt: '2026-01-01T00:00:00.000Z'
};

vi.mock('@features/auth/lib/supabaseClient.ts', () => ({
  isSyncConfigured: true,
  PROGRESS_TABLE: 'progress',
  syncDiagnostics: {},
  supabase: {
    auth: {
      getSession: () => Promise.resolve({ data: { session: { user: USER } } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: () => {
            selects += 1;
            return Promise.resolve(
              selectFails
                ? { data: null, error: { message: 'network down' } }
                : { data: { data: REMOTE_ROW, updated_at: REMOTE_ROW._updatedAt }, error: null }
            );
          }
        })
      }),
      upsert: (row: unknown) => {
        upserts.push(row);
        return Promise.resolve({ error: null });
      }
    })
  }
}));

/* Imported after the mock is declared; `vi.mock` is hoisted, so the hook sees the fake. */
const { useCloudSync } = await import('@features/auth/hooks/useCloudSync.ts');

const dbRef: { current: ProgressDatabase } = { current: REMOTE_ROW };

const Probe = ({ updatedAt }: { readonly updatedAt: string }) => {
  /* The document the app would have in hand at this render, stamped as the caller says. */
  dbRef.current = { ...dbRef.current, _updatedAt: updatedAt };
  useCloudSync({
    dbRef,
    replaceLocal: next => {
      dbRef.current = next;
    },
    updatedAt
  });
  return null;
};

/** Longer than the hook's own 1.5s debounce, so the scheduled work actually runs. */
const AFTER_DEBOUNCE_MS = 1800;

let errors: ReturnType<typeof captureErrors>;
let container: HTMLElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

/** Renders the probe with the stamp the local document would carry at that moment. */
const render = async (updatedAt: string): Promise<void> => {
  await act(async () => {
    root?.render(createElement(Probe, { updatedAt }));
  });
  await settle();
};

beforeEach(() => {
  selectFails = true;
  selects = 0;
  upserts.length = 0;
  dbRef.current = { ...REMOTE_ROW, _updatedAt: 'local-1' };
  errors = captureErrors();

  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => {
    root?.unmount();
  });
  container?.remove();
  root = null;
  container = null;
  errors.restore();
});

describe('a change made after a failed sign-in sync', () => {
  it('retries the sync instead of stalling for the rest of the session', async () => {
    await render('local-1');
    /* The sign-in sync ran and failed, so nothing has been pushed. */
    expect(selects).toBe(1);
    expect(upserts).toHaveLength(0);

    /* The user ticks a task; the network is back by the time the debounce fires. */
    selectFails = false;
    await render('local-2');
    await settle(AFTER_DEBOUNCE_MS);

    expect(selects).toBe(2);
    expect(upserts).toHaveLength(1);
    expect(errors.real()).toEqual([]);
  });

  it('goes back to plain pushes once a sync has succeeded', async () => {
    selectFails = false;
    await render('local-1');
    await settle();
    const pullsAfterFirstSync = selects;
    expect(upserts).toHaveLength(1);

    await render('local-2');
    await settle(AFTER_DEBOUNCE_MS);

    /* A second push, and no second pull: the remote was already merged in. */
    expect(upserts).toHaveLength(2);
    expect(selects).toBe(pullsAfterFirstSync);
  });
});
