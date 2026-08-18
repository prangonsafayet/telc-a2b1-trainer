/* Cloud sync via Supabase (free tier) — optional and offline-first.
   If SYNC_CONFIG is empty the app silently keeps working with localStorage only. */
import { createClient } from '@supabase/supabase-js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { SYNC_CONFIG as cfg } from './sync-config.js';

/* Normalize the project URL so common paste mistakes still work:
   - dashboard link (https://supabase.com/dashboard/project/<ref>/…) → https://<ref>.supabase.co
   - trailing slashes or extra paths (/rest/v1, /auth/v1 …) → stripped */
function normalizeUrl(raw) {
  const u = String(raw || '').trim().replace(/\/+$/, '');
  const dash = u.match(/supabase\.com\/dashboard\/project\/([a-z0-9-]+)/i);
  if (dash) return 'https://' + dash[1] + '.supabase.co';
  if (/^[a-z0-9-]+\.supabase\.(co|in|red|net)$/i.test(u)) return 'https://' + u;
  const m = u.match(/^(https?:\/\/[a-z0-9-]+\.supabase\.(?:co|in|red|net))(\/.*)?$/i);
  if (m) return m[1].replace(/^http:/i, 'https:');
  return u;
}

export const projectUrl = normalizeUrl(cfg.supabaseUrl);
export const urlValid = /^https:\/\/[a-z0-9-]+\.supabase\.(co|in|red|net)$/i.test(projectUrl);
export const rawUrl = cfg.supabaseUrl;
const anonKey = String(cfg.supabaseAnonKey || '').trim();

/* A publishable key is either a legacy JWT ("eyJ…") or the newer "sb_publishable_…".
   Anything starting with sb_secret_ / service_role must never reach the browser. */
const keyIsSecret = /^sb_secret_/i.test(anonKey) || /"role"\s*:\s*"service_role"/.test(atobSafe(anonKey));
const keyLooksValid = !!anonKey && !keyIsSecret && (/^sb_publishable_/i.test(anonKey) || /^eyJ/.test(anonKey));

function atobSafe(jwt) {
  try {
    return atob(String(jwt).split('.')[1] || '');
  } catch (e) {
    return '';
  }
}

export const configured = !!(projectUrl && urlValid && anonKey && keyLooksValid);

/* Everything the Settings page needs to explain *why* sync is off. The values are
   resolved when the bundle is built, so a deploy whose build lacked the variables shows
   up here as "missing" no matter what the hosting dashboard says today. */
export const diagnostics = {
  mode: import.meta.env.MODE,
  urlPresent: !!String(cfg.supabaseUrl || '').trim(),
  urlValid,
  projectUrl,
  keyPresent: !!anonKey,
  keyLooksValid,
  keyIsSecret,
  keyPreview: anonKey ? anonKey.slice(0, 12) + '…' + anonKey.slice(-4) : ''
};

if (keyIsSecret) {
  console.error(
    'Supabase: VITE_SUPABASE_ANON_KEY looks like a SECRET key. Never ship one to the browser — ' +
    'use the anon / publishable key. Cloud sync has been disabled.'
  );
}

const client = configured ? createClient(projectUrl, anonKey) : null;

/* ---------- merge: union attempts, OR learn tasks, newer settings ---------- */
export function mergeDB(local, remote) {
  if (!remote) return local;
  if (!local) return remote;
  const byId = new Map();
  [...(remote.attempts || []), ...(local.attempts || [])].forEach(a => byId.set(a.id, a));
  const attempts = [...byId.values()].sort((a, b) => a.id - b.id);
  const learnDone = { ...remote.learnDone, ...local.learnDone };
  for (const k of Object.keys(learnDone)) if (!learnDone[k]) delete learnDone[k];
  const localNewer = (local._updatedAt || '') >= (remote._updatedAt || '');
  const settings = {
    ...(localNewer ? remote.settings : local.settings),
    ...(localNewer ? local.settings : remote.settings)
  };
  return { attempts, learnDone, settings, _updatedAt: localNewer ? local._updatedAt : remote._updatedAt };
}

/* Drives the sync chip in the header and the panel on the Settings page. */
export function useCloudSync({ dbRef, replaceLocal, updatedAt }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [chip, setChip] = useState(null); // { text, title }
  const pushedRef = useRef(null);
  const timerRef = useRef(null);

  const push = useCallback(async db => {
    const { error } = await client.from('progress').upsert({
      user_id: user.id,
      data: db,
      updated_at: new Date().toISOString()
    });
    if (error) throw error;
    pushedRef.current = db._updatedAt;
    const now = new Date();
    setLastSyncedAt(now);
    setChip({
      text: '☁ synced ' + now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      title: 'Progress synced to your Supabase database'
    });
  }, [user]);

  const [syncing, setSyncing] = useState(false);

  const fullSync = useCallback(async ({ announce = false } = {}) => {
    if (!client || !user) return;
    setSyncing(true);
    try {
      setStatus('Syncing…');
      const { data, error } = await client
        .from('progress')
        .select('data, updated_at')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      const merged = mergeDB(dbRef.current, data ? data.data : null);
      replaceLocal(merged);
      await push(merged);
      setStatus('');
      if (announce) {
        toast.success('Progress synced', {
          description: `${merged.attempts.length} attempt(s) are up to date across your devices.`
        });
      }
    } catch (e) {
      const msg = 'Sync failed: ' + (e.message || e) + ' — your data is still safe locally.';
      setStatus(msg);
      setChip({ text: '☁ offline', title: msg });
      toast.error('Could not reach the cloud database', {
        description: 'Your progress is still saved in this browser and will sync next time.'
      });
    } finally {
      setSyncing(false);
    }
  }, [user, dbRef, replaceLocal, push]);

  /* Watch the session. */
  useEffect(() => {
    if (!client) return undefined;
    let alive = true;
    client.auth.getSession().then(({ data }) => {
      if (alive) setUser(data.session ? data.session.user : null);
    });
    const { data: sub } = client.auth.onAuthStateChange((_e, session) => {
      setUser(session ? session.user : null);
    });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);

  /* Pull + merge + push once whenever a user signs in. */
  useEffect(() => {
    if (!user) { setChip(null); setLastSyncedAt(null); return; }
    fullSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user && user.id]);

  /* Debounced push on every local change after the first sync. */
  useEffect(() => {
    if (!client || !user || !updatedAt) return undefined;
    if (pushedRef.current == null || pushedRef.current === updatedAt) return undefined;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      push(dbRef.current).catch(() => {
        setChip({
          text: '☁ offline',
          title: 'Could not reach the database — data kept locally. It will sync next time.'
        });
      });
    }, 1500);
    return () => clearTimeout(timerRef.current);
  }, [updatedAt, user, push, dbRef]);

  const [sendingLink, setSendingLink] = useState(false);

  const sendMagicLink = useCallback(async email => {
    setSendingLink(true);
    setStatus('Sending link…');
    try {
      const { error } = await client.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + window.location.pathname }
      });
      if (error) throw error;
      setStatus('✓ Check your inbox and click the login link (also check spam). Then come back to this tab or the one it opens.');
      toast.success('Magic link sent', { description: `Check the inbox for ${email} — the link signs you straight in.` });
    } catch (e) {
      setStatus('Could not send link: ' + (e.message || e));
      toast.error('Could not send the login link', { description: e.message || String(e) });
    } finally {
      setSendingLink(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await client.auth.signOut();
      toast.success('Signed out', { description: 'Your progress stays in this browser.' });
    } catch (e) {
      toast.error('Could not sign out', { description: e.message || String(e) });
    }
    setUser(null);
    setStatus('');
    setChip(null);
    setLastSyncedAt(null);
  }, []);

  return { configured, user, status, lastSyncedAt, chip, syncing, sendingLink, fullSync, sendMagicLink, signOut };
}
