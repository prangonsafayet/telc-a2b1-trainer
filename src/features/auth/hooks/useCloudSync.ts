import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

import { type User } from '@supabase/supabase-js';
import { toast } from 'sonner';

import { type ProgressDatabase } from '@shared/types';

import { normalizeDatabase } from '@features/progress';

import { mergeProgress } from '../lib/mergeProgress.ts';
import { enabledProviders, providerLabel, type OAuthProvider } from '../lib/oauthProviders.ts';
import {
  interpretSignUp,
  isRateLimited,
  retryAfterSeconds,
  type SignUpOutcome
} from '../lib/signUpOutcome.ts';
import { isSyncConfigured, PROGRESS_TABLE, supabase } from '../lib/supabaseClient.ts';

/** Short status shown in the header. */
export interface SyncChip {
  readonly text: string;
  readonly title: string;
}

export interface CloudSyncState {
  readonly configured: boolean;
  readonly user: User | null;
  readonly status: string;
  readonly lastSyncedAt: Date | null;
  readonly chip: SyncChip | null;
  readonly syncing: boolean;
  readonly providers: readonly OAuthProvider[];
  readonly pendingProvider: OAuthProvider | null;
  readonly busyWithEmail: boolean;
  readonly signInWithProvider: (provider: OAuthProvider) => Promise<void>;
  readonly signInWithPassword: (email: string, password: string) => Promise<boolean>;
  readonly signUpWithPassword: (email: string, password: string) => Promise<SignUpOutcome>;
  readonly resendConfirmation: (email: string) => Promise<boolean>;
  readonly sendPasswordReset: (email: string) => Promise<void>;
  readonly fullSync: (options?: { readonly announce?: boolean }) => Promise<void>;
  /**
   * Deletes this account's stored row. True when it is gone (or there was nothing to
   * delete); false when the database could not be reached, which the caller has to say.
   */
  readonly deleteRemote: () => Promise<boolean>;
  readonly signOut: () => Promise<void>;
}

interface CloudSyncOptions {
  readonly dbRef: RefObject<ProgressDatabase>;
  readonly replaceLocal: (next: ProgressDatabase) => void;
  /** `_updatedAt` of the local document; a change here schedules a push. */
  readonly updatedAt: string | undefined;
}

const PUSH_DEBOUNCE_MS = 1500;

const errorMessage = (error: unknown): string => (error instanceof Error ? error.message : String(error));

/** Drives cloud sync: session, pull/merge/push, and the OAuth handoff. */
export const useCloudSync = ({ dbRef, replaceLocal, updatedAt }: CloudSyncOptions): CloudSyncState => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState('');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [chip, setChip] = useState<SyncChip | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [pendingProvider, setPendingProvider] = useState<OAuthProvider | null>(null);
  const [busyWithEmail, setBusyWithEmail] = useState(false);

  /** `_updatedAt` of the document last pushed; `null` until the first sync completes. */
  const pushedAtRef = useRef<string | null>(null);
  const pushTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  /** Everything that only makes sense while signed in. */
  const clearSessionState = useCallback(() => {
    setChip(null);
    setLastSyncedAt(null);
    setStatus('');
    pushedAtRef.current = null;
  }, []);

  const push = useCallback(
    async (db: ProgressDatabase): Promise<void> => {
      if (!supabase || !user) return;
      const { error } = await supabase
        .from(PROGRESS_TABLE)
        .upsert({ user_id: user.id, data: db, updated_at: new Date().toISOString() });
      if (error) throw new Error(error.message);

      pushedAtRef.current = db._updatedAt ?? null;
      const now = new Date();
      setLastSyncedAt(now);
      setChip({
        text: `synced ${now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`,
        title: 'Progress synced to your Supabase database'
      });
    },
    [user]
  );

  const fullSync = useCallback(
    async ({ announce = false }: { readonly announce?: boolean } = {}): Promise<void> => {
      if (!supabase || !user) return;
      setSyncing(true);
      setStatus('Syncing…');
      try {
        const { data, error } = await supabase
          .from(PROGRESS_TABLE)
          .select('data, updated_at')
          .eq('user_id', user.id)
          .maybeSingle();
        if (error) throw new Error(error.message);

        /* The stored row is JSON written by whichever build last synced, so it is coerced
           into a full document before it is merged rather than trusted field by field. */
        const remote = data?.data == null ? null : normalizeDatabase(data.data);
        const merged = mergeProgress(dbRef.current, remote);
        replaceLocal(merged);
        await push(merged);
        setStatus('');
        if (announce) {
          toast.success('Progress synced', {
            description: `${String(merged.attempts.length)} attempt(s) are up to date across your devices.`
          });
        }
      } catch (error) {
        const message = `Sync failed: ${errorMessage(error)} — your data is still safe locally.`;
        setStatus(message);
        setChip({ text: 'offline', title: message });
        toast.error('Could not reach the cloud database', {
          description: 'Your progress is still saved in this browser and will sync next time.'
        });
      } finally {
        setSyncing(false);
      }
    },
    [user, dbRef, replaceLocal, push]
  );

  /**
   * The one operation the union-only merge cannot express. Emptying the local document and
   * letting the debounced push carry it up is not a delete: another signed-in device merges
   * its full copy with the empty remote and restores everything. Removing the row is what
   * makes "delete" mean delete on this account's side of it.
   */
  const deleteRemote = useCallback(async (): Promise<boolean> => {
    if (!supabase || !user) return true;
    try {
      const { error } = await supabase.from(PROGRESS_TABLE).delete().eq('user_id', user.id);
      if (error) throw new Error(error.message);
      return true;
    } catch (error) {
      setStatus(`Could not delete the cloud copy: ${errorMessage(error)}`);
      return false;
    }
  }, [user]);

  /* Surface a failed or cancelled OAuth callback instead of silently landing signed out. */
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const failure =
      query.get('error_description') ??
      query.get('error') ??
      hash.get('error_description') ??
      hash.get('error');
    if (!failure) return;

    toast.error('Sign-in was not completed', {
      description: decodeURIComponent(failure).replace(/\+/g, ' ')
    });
    const url = new URL(window.location.href);
    for (const key of ['error', 'error_description', 'error_code']) url.searchParams.delete(key);
    url.hash = '';
    window.history.replaceState({}, '', url.toString());
  }, []);

  /*
   * Track the session. This is the standard external-subscription shape, but supabase-js
   * emits INITIAL_SESSION synchronously while subscribing, so the setState lands in the
   * effect body from the linter's point of view. There is nothing to restructure: the
   * alternative is deferring our own state behind a microtask for no benefit.
   */
  useEffect(() => {
    if (!supabase) return undefined;
    let alive = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (alive) setUser(data.session?.user ?? null);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const next = session?.user ?? null;

      setUser(next);
      if (!next) clearSessionState();
    });

    return () => {
      alive = false;
      subscription.subscription.unsubscribe();
    };
  }, [clearSessionState]);

  const userId = user?.id;

  /* Pull, merge and push once per sign-in. Nothing is reset here: the signed-out state is
     cleared by `clearSessionState`, called from the auth listener and from signOut. */
  useEffect(() => {
    if (!userId) return undefined;
    /* Deferred by a tick so the sign-in render commits before the syncing flag flips —
       the effect's job is to trigger the sync, not to set state during it. */
    const handle = setTimeout(() => void fullSync(), 0);
    return () => {
      clearTimeout(handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per signed-in user, not per fullSync identity
  }, [userId]);

  /* Debounced push whenever the local document changes after the first sync. */
  useEffect(() => {
    if (!supabase || !user || !updatedAt) return undefined;
    if (pushedAtRef.current === updatedAt) return undefined;

    clearTimeout(pushTimerRef.current);
    pushTimerRef.current = setTimeout(() => {
      /* Nothing has been pulled yet, so the sign-in sync failed (or has not finished).
         Pushing now would upsert this device's document over a remote nobody has merged
         with, so the retry is a full sync rather than a push. Gating the push alone on this
         meant one failed sync stalled every later change for the rest of the session. */
      if (pushedAtRef.current === null) {
        void fullSync();
        return;
      }
      push(dbRef.current).catch(() => {
        setChip({
          text: 'offline',
          title: 'Could not reach the database — data kept locally. It will sync next time.'
        });
      });
    }, PUSH_DEBOUNCE_MS);

    return () => {
      clearTimeout(pushTimerRef.current);
    };
  }, [updatedAt, user, push, fullSync, dbRef]);

  /**
   * Hands off to the provider's consent screen. On success the browser navigates away, so
   * nothing after the call runs. `redirectTo` is built from the page's own origin and can
   * never point elsewhere; Supabase's redirect allowlist is the second gate.
   */
  const signInWithProvider = useCallback(async (provider: OAuthProvider): Promise<void> => {
    if (!supabase) return;
    setPendingProvider(provider);
    setStatus(`Redirecting to ${providerLabel(provider)}…`);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + window.location.pathname,
          ...(provider === 'google' ? { queryParams: { prompt: 'select_account' } } : {})
        }
      });
      if (error) throw new Error(error.message);
    } catch (error) {
      const message = errorMessage(error);
      const notEnabled = /provider is not enabled|Unsupported provider/i.test(message);
      setStatus(
        notEnabled
          ? `${providerLabel(provider)} is not enabled for this Supabase project yet.`
          : `Sign-in failed: ${message}`
      );
      toast.error(
        notEnabled ? `${providerLabel(provider)} sign-in is not enabled` : 'Could not start sign-in',
        {
          description: notEnabled
            ? 'Enable it in Supabase → Authentication → Providers, then try again.'
            : message
        }
      );
      setPendingProvider(null);
    }
  }, []);

  /**
   * Email + password sign-in. The password goes straight to Supabase Auth over TLS and is
   * never stored, logged or hashed here — Supabase holds only a server-side bcrypt hash.
   */
  const signInWithPassword = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (!supabase) return false;
    setBusyWithEmail(true);
    setStatus('Signing in…');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      setStatus('');
      toast.success('Signed in', { description: 'Your progress is syncing now.' });
      return true;
    } catch (error) {
      const message = errorMessage(error);
      /* Supabase deliberately does not say which half was wrong; do not guess for it. */
      const friendly = /invalid login credentials/i.test(message)
        ? 'Email or password is incorrect.'
        : /email not confirmed/i.test(message)
          ? 'Confirm your email address first — check your inbox for the link.'
          : message;
      setStatus(friendly);
      toast.error('Could not sign in', { description: friendly });
      return false;
    } finally {
      setBusyWithEmail(false);
    }
  }, []);

  /**
   * Creates an account. Three outcomes are possible and they are not distinguishable from
   * the presence of a session alone — see `interpretSignUp` for why.
   */
  const signUpWithPassword = useCallback(async (email: string, password: string): Promise<SignUpOutcome> => {
    if (!supabase) return { kind: 'failed', message: 'Cloud sync is not configured.' };
    setBusyWithEmail(true);
    setStatus('Creating your account…');
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + window.location.pathname }
      });
      const outcome = interpretSignUp(data, error);

      switch (outcome.kind) {
        case 'signed-in':
          setStatus('');
          toast.success('Account created', {
            description: 'You are signed in and your progress is syncing.'
          });
          break;
        case 'confirmation-sent':
          setStatus('✓ Check your inbox (and spam) for the confirmation link, then sign in.');
          toast.success('Confirm your email', { description: `We sent a confirmation link to ${email}.` });
          break;
        case 'already-registered':
          setStatus('That email already has a confirmed account. Sign in instead, or reset the password.');
          toast.info('You already have an account', {
            description: 'Signing in is the way in — use "Forgot password?" if you need to.'
          });
          break;
        case 'failed':
          setStatus(outcome.message);
          toast.error('Could not create the account', { description: outcome.message });
          break;
      }

      return outcome;
    } catch (error) {
      const message = errorMessage(error);
      setStatus(message);
      toast.error('Could not create the account', { description: message });
      return { kind: 'failed', message };
    } finally {
      setBusyWithEmail(false);
    }
  }, []);

  /**
   * Re-sends the sign-up confirmation.
   *
   * `signUp` is documented to resend for an unconfirmed account, but it is rate limited
   * and silently does nothing once the window is hit — which reads to the user as "the
   * email never arrived". `auth.resend` is the explicit API and surfaces the rate limit as
   * an error we can show.
   */
  const resendConfirmation = useCallback(async (email: string): Promise<boolean> => {
    if (!supabase) return false;
    setBusyWithEmail(true);
    setStatus('Re-sending the confirmation email…');
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: { emailRedirectTo: window.location.origin + window.location.pathname }
      });
      if (error) throw new Error(error.message);
      setStatus('✓ Sent again — check your inbox and your spam folder.');
      toast.success('Confirmation email re-sent', { description: `Check the inbox for ${email}.` });
      return true;
    } catch (error) {
      const message = errorMessage(error);
      if (isRateLimited(message)) {
        const wait = retryAfterSeconds(message);
        const friendly = wait
          ? `Too many requests — try again in ${String(wait)} seconds.`
          : 'Too many requests — wait a minute before trying again.';
        setStatus(friendly);
        toast.warning('Slow down a moment', { description: friendly });
      } else {
        setStatus(message);
        toast.error('Could not re-send the email', { description: message });
      }
      return false;
    } finally {
      setBusyWithEmail(false);
    }
  }, []);

  /** Emails a reset link; the user sets a new password on Supabase's hosted page. */
  const sendPasswordReset = useCallback(async (email: string): Promise<void> => {
    if (!supabase) return;
    setBusyWithEmail(true);
    setStatus('Sending reset link…');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + window.location.pathname
      });
      if (error) throw new Error(error.message);
      setStatus('✓ If that email has an account, a reset link is on its way.');
      toast.success('Password reset sent', { description: `Check the inbox for ${email}.` });
    } catch (error) {
      const message = errorMessage(error);
      setStatus(message);
      toast.error('Could not send the reset link', { description: message });
    } finally {
      setBusyWithEmail(false);
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
      toast.success('Signed out', { description: 'Your progress stays in this browser.' });
    } catch (error) {
      toast.error('Could not sign out', { description: errorMessage(error) });
    }
    setUser(null);
    clearSessionState();
  }, [clearSessionState]);

  return {
    configured: isSyncConfigured,
    user,
    status,
    lastSyncedAt,
    chip,
    syncing,
    providers: enabledProviders,
    pendingProvider,
    busyWithEmail,
    signInWithProvider,
    signInWithPassword,
    signUpWithPassword,
    resendConfirmation,
    sendPasswordReset,
    fullSync,
    deleteRemote,
    signOut
  };
};
