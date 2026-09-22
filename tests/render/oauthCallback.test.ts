import { act, createElement } from 'react';

import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DEFAULT_SETTINGS } from '@shared/config/exam.ts';
import { type ProgressDatabase } from '@shared/types';

import { settle } from './harness.ts';

/*
 * The OAuth return leg. supabase-js performs the PKCE exchange itself when it sees a
 * `?code=` on load (`detectSessionInUrl`) and swallows the rejection when it fails, so a
 * verifier written on another origin — or a code already spent — used to land the user
 * back on the sign-in card with no session and nothing whatsoever to read. Only an
 * `error` parameter was ever surfaced, and this path carries none.
 */

const errorToasts: { readonly title: string; readonly description: string }[] = [];

vi.mock('sonner', () => ({
  toast: {
    error: (title: string, options?: { readonly description?: string }) => {
      errorToasts.push({ title, description: options?.description ?? '' });
    },
    success: () => undefined
  }
}));

let exchangeError: { readonly message: string } | null = null;
let exchanges = 0;

vi.mock('@features/auth/lib/supabaseClient.ts', () => ({
  isSyncConfigured: true,
  PROGRESS_TABLE: 'progress',
  syncDiagnostics: {},
  supabase: {
    auth: {
      /* No session: whatever the client tried on load did not produce one. */
      getSession: () => Promise.resolve({ data: { session: null } }),
      exchangeCodeForSession: () => {
        exchanges += 1;
        return Promise.resolve({ data: {}, error: exchangeError });
      },
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } })
    },
    from: () => {
      throw new Error('the database must not be touched while signed out');
    }
  }
}));

const { useCloudSync } = await import('@features/auth/hooks/useCloudSync.ts');

const DB: ProgressDatabase = {
  attempts: [],
  learnDone: {},
  settings: DEFAULT_SETTINGS,
  srs: {},
  activity: {},
  _updatedAt: '2026-01-01T00:00:00.000Z'
};

const dbRef: { current: ProgressDatabase } = { current: DB };

const Probe = () => {
  useCloudSync({
    dbRef,
    replaceLocal: next => {
      dbRef.current = next;
    },
    updatedAt: DB._updatedAt
  });
  return null;
};

let container: HTMLElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

/** Lands on the page the way the provider's redirect does. */
const arriveAt = async (search: string): Promise<void> => {
  window.history.replaceState({}, '', `/settings${search}`);
  await act(async () => {
    root?.render(createElement(Probe));
  });
  await settle();
};

beforeEach(() => {
  errorToasts.length = 0;
  exchanges = 0;
  exchangeError = { message: 'invalid request: both auth code and code verifier should be non-empty' };
  dbRef.current = DB;

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
});

describe('an OAuth callback whose code exchange fails', () => {
  it('names the reason instead of landing silently signed out', async () => {
    await arriveAt('?code=abc123');

    expect(errorToasts).toHaveLength(1);
    expect(errorToasts[0]?.description).toContain('code verifier');
  });

  it('strips the spent code so a refresh does not retry it forever', async () => {
    await arriveAt('?code=abc123');

    expect(new URLSearchParams(window.location.search).get('code')).toBeNull();
  });

  it('recovers the sign-in when the retry succeeds, and stays quiet', async () => {
    exchangeError = null;
    await arriveAt('?code=abc123');

    expect(exchanges).toBe(1);
    expect(errorToasts).toEqual([]);
    expect(new URLSearchParams(window.location.search).get('code')).toBeNull();
  });

  it('still reports a provider error carried as a parameter', async () => {
    await arriveAt('?error=access_denied&error_description=The+user+denied+the+request');

    expect(errorToasts[0]?.description).toBe('The user denied the request');
    /* That shape never reaches an exchange: there is no code to exchange. */
    expect(exchanges).toBe(0);
  });
});
