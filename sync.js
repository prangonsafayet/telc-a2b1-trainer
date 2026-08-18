/* Cloud sync via Supabase (free tier) — optional.
   Offline-first: if SYNC_CONFIG is empty or the Supabase library fails to load,
   the app silently keeps working with localStorage only. */
(() => {
'use strict';

const cfg = window.SYNC_CONFIG || {};
const hasLib = typeof window.supabase !== 'undefined' && window.supabase.createClient;

/* Normalize the project URL so common paste mistakes still work:
   - dashboard link (https://supabase.com/dashboard/project/<ref>/...) → https://<ref>.supabase.co
   - trailing slashes or extra paths (/rest/v1, /auth/v1 …) → stripped */
function normalizeUrl(raw) {
  let u = String(raw || '').trim().replace(/\/+$/, '');
  const dash = u.match(/supabase\.com\/dashboard\/project\/([a-z0-9-]+)/i);
  if (dash) return 'https://' + dash[1] + '.supabase.co';
  if (/^[a-z0-9-]+\.supabase\.(co|in|red|net)$/i.test(u)) return 'https://' + u;
  const m = u.match(/^(https?:\/\/[a-z0-9-]+\.supabase\.(?:co|in|red|net))(\/.*)?$/i);
  if (m) return m[1].replace(/^http:/i, 'https:');
  return u;
}
const projectUrl = normalizeUrl(cfg.supabaseUrl);
const urlValid = /^https:\/\/[a-z0-9-]+\.supabase\.(co|in|red|net)$/i.test(projectUrl);
const anonKey = String(cfg.supabaseAnonKey || '').trim();
const configured = !!(projectUrl && anonKey && hasLib && urlValid);

let client = null;
let hooks = null;          // { getDB, replaceDB }
let user = null;
let pushTimer = null;
let lastSyncedAt = null;
let statusMsg = '';

const chip = () => document.getElementById('syncChip');
const setChip = (txt, title) => { const c = chip(); if (c) { c.textContent = txt; c.title = title || ''; c.style.display = txt ? '' : 'none'; } };

function esc(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

/* ---------- merge: union attempts, OR learn tasks, newer settings ---------- */
function mergeDB(local, remote) {
  if (!remote) return local;
  if (!local) return remote;
  const byId = new Map();
  [...(remote.attempts || []), ...(local.attempts || [])].forEach(a => byId.set(a.id, a));
  const attempts = [...byId.values()].sort((a, b) => a.id - b.id);
  const learnDone = Object.assign({}, remote.learnDone, local.learnDone);
  for (const k of Object.keys(learnDone)) if (!learnDone[k]) delete learnDone[k];
  const localNewer = (local._updatedAt || '') >= (remote._updatedAt || '');
  const settings = Object.assign({}, localNewer ? remote.settings : local.settings, localNewer ? local.settings : remote.settings);
  return { attempts, learnDone, settings, _updatedAt: localNewer ? local._updatedAt : remote._updatedAt };
}

/* ---------- remote io ---------- */
async function pull() {
  const { data, error } = await client.from('progress').select('data, updated_at').eq('user_id', user.id).maybeSingle();
  if (error) throw error;
  return data ? data.data : null;
}
async function push(db) {
  const { error } = await client.from('progress').upsert({ user_id: user.id, data: db, updated_at: new Date().toISOString() });
  if (error) throw error;
  lastSyncedAt = new Date();
}

async function fullSync(showErrors) {
  if (!client || !user || !hooks) return;
  try {
    statusMsg = 'Syncing…'; renderPanel();
    const remote = await pull();
    const merged = mergeDB(hooks.getDB(), remote);
    hooks.replaceDB(merged);           // saves locally + re-renders
    await push(merged);
    statusMsg = ''; renderPanel();
    setChip('☁ synced ' + lastSyncedAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }), 'Progress synced to your Supabase database');
  } catch (e) {
    statusMsg = 'Sync failed: ' + (e.message || e) + ' — your data is still safe locally.';
    setChip('☁ offline', statusMsg);
    if (showErrors) renderPanel();
  }
}

function schedulePush(db) {
  if (!client || !user) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(async () => {
    try {
      await push(db);
      setChip('☁ synced ' + lastSyncedAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }), 'Progress synced to your Supabase database');
    } catch (e) {
      setChip('☁ offline', 'Could not reach the database — data kept locally. It will sync next time.');
    }
  }, 1500);
}

/* ---------- auth ---------- */
async function sendMagicLink(email) {
  statusMsg = 'Sending link…'; renderPanel();
  const { error } = await client.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin + window.location.pathname }
  });
  statusMsg = error ? 'Could not send link: ' + error.message : '✓ Check your inbox and click the login link (also check spam). Then come back to this tab or the one it opens.';
  renderPanel();
}
async function signOut() {
  await client.auth.signOut();
  user = null; lastSyncedAt = null; statusMsg = '';
  setChip('');
  renderPanel();
}

/* ---------- settings panel ---------- */
function renderPanel() {
  const el = document.getElementById('syncPanel');
  if (!el) return;
  if (!configured) {
    if (cfg.supabaseUrl && !urlValid) {
      el.innerHTML = `<h3 style="margin-top:0">☁ Cloud sync — configuration error</h3>
        <p class="small" style="color:var(--critical)">The <code>supabaseUrl</code> in <code>sync-config.js</code> doesn't look like a project URL:<br>
        <code>${esc(cfg.supabaseUrl)}</code></p>
        <p class="small muted">It must be exactly <code>https://&lt;project-ref&gt;.supabase.co</code> — nothing after ".supabase.co", no dashboard link.
        Find it in Supabase under <b>Project Settings → Data API → Project URL</b>, fix the file, and re-upload the folder to Netlify.</p>`;
      return;
    }
    el.innerHTML = `<h3 style="margin-top:0">☁ Cloud sync — not configured</h3>
      <p class="small muted">Your progress is currently saved only in this browser. To sync it to a free cloud database (so it survives browser cleanups and follows you across devices), follow <b>HOSTING.md → Part 1</b>: create a free Supabase project, run the SQL setup, and paste your project URL + anon key into <code>sync-config.js</code>.${!hasLib ? '<br>⚠ Note: the Supabase library did not load — this is normal when offline; sync needs an internet connection.' : ''}</p>`;
    return;
  }
  if (!user) {
    const fileWarn = location.protocol === 'file:' ? '<p class="small" style="color:var(--critical)">⚠ You opened the app as a file. The email login link cannot bring you back here — use your hosted URL (or http://localhost) to sign in.</p>' : '';
    el.innerHTML = `<h3 style="margin-top:0">☁ Cloud sync — sign in</h3>
      ${fileWarn}
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <input type="email" id="syncEmail" placeholder="you@example.com" style="font:inherit;padding:7px 10px;border:1px solid var(--baseline);border-radius:6px;min-width:240px">
        <button class="primary" id="syncSend">Send magic link</button>
      </div>
      <p class="small muted">${esc(statusMsg) || 'You will get an email with a login link — no password needed. After signing in, every attempt syncs automatically.'}</p>`;
    const btn = document.getElementById('syncSend');
    btn.addEventListener('click', () => {
      const em = document.getElementById('syncEmail').value.trim();
      if (em) sendMagicLink(em);
    });
  } else {
    el.innerHTML = `<h3 style="margin-top:0">☁ Cloud sync — active</h3>
      <p class="small">Signed in as <b>${esc(user.email)}</b>. Progress auto-syncs after every change.<br>
      <span class="muted">${lastSyncedAt ? 'Last synced: ' + lastSyncedAt.toLocaleString('de-DE') : 'Not synced yet this session.'} ${esc(statusMsg)}</span></p>
      <div class="runner-actions" style="margin:8px 0 0">
        <button class="ghost" id="syncNow">Sync now</button>
        <button class="ghost" id="syncOut">Sign out</button>
      </div>`;
    document.getElementById('syncNow').addEventListener('click', () => fullSync(true));
    document.getElementById('syncOut').addEventListener('click', signOut);
  }
}

/* ---------- init ---------- */
function init(h) {
  hooks = h;
  if (!configured) { renderPanel(); return; }
  client = window.supabase.createClient(projectUrl, anonKey);
  client.auth.onAuthStateChange((_event, session) => {
    const newUser = session ? session.user : null;
    const signedIn = newUser && (!user || user.id !== newUser.id);
    user = newUser;
    renderPanel();
    if (signedIn) fullSync(false);
    if (!user) setChip('');
  });
  client.auth.getSession().then(({ data }) => {
    user = data.session ? data.session.user : null;
    renderPanel();
    if (user) fullSync(false);
  });
}

window.CloudSync = { init, schedulePush, renderPanel, isConfigured: () => configured };
})();
