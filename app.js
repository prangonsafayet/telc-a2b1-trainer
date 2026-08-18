/* telc Deutsch A2·B1 Trainer — app logic */
(() => {
'use strict';

/* ================= utils ================= */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const LETTERS = 'abcdefghijkl';
const nl2br = s => esc(s).replace(/\n/g, '<br>');
const fmtClock = sec => {
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec / 60), s = sec % 60;
  return m + ':' + String(s).padStart(2, '0');
};
const fmtDate = iso => new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' });

/* ================= storage ================= */
const KEY = 'telcTrainerV1';
const mem = {};
const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return mem[k] ?? null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } };

const DEFAULTS = { attempts: [], learnDone: {}, settings: { writingMinutes: 10, ttsRate: 1, voiceName: '', examDate: '2026-09-12', playsAllowed: 2 } };
let DB;
try { DB = Object.assign({}, DEFAULTS, JSON.parse(lsGet(KEY) || '{}')); } catch (e) { DB = JSON.parse(JSON.stringify(DEFAULTS)); }
DB.settings = Object.assign({}, DEFAULTS.settings, DB.settings || {});
const save = () => {
  DB._updatedAt = new Date().toISOString();
  lsSet(KEY, JSON.stringify(DB));
  if (window.CloudSync) window.CloudSync.schedulePush(DB);
};

/* ================= data ================= */
const EXAMS = (window.TELC_EXAMS || []).slice().sort((a, b) => a.id - b.id);
const examById = id => EXAMS.find(e => e.id === id);

const MODULES = ['lesen', 'sprachbausteine', 'hoeren', 'schreiben', 'sprechen'];
const MOD_META = {
  lesen: { name: 'Leseverstehen', short: 'Lesen', min: () => 45, skill: true },
  sprachbausteine: { name: 'Sprachbausteine', short: 'Sprachbausteine', min: () => 35, skill: false },
  hoeren: { name: 'Hörverstehen · Hören & Schreiben', short: 'Hören', min: () => 35, skill: true },
  schreiben: { name: 'Schreiben', short: 'Schreiben', min: () => DB.settings.writingMinutes, skill: true },
  sprechen: { name: 'Sprechen', short: 'Sprechen', min: () => 15, skill: true }
};
const WHAT_TO_DO = {
  lesen: '4 parts, 20 items. Teil 1: match 5 situations to 8 ads. Teil 2: read 2 texts, answer 5 multiple-choice questions. Teil 3: match 5 messages to 8 headlines. Teil 4: read a longer text, decide richtig/falsch for 5 statements. Budget ≈ 10 minutes per part. Never leave a blank!',
  sprachbausteine: '3 parts. Teil 1: a letter with 6 grammar gaps — pick a, b or c. Teil 2: a text with 6 gaps — pick the right word from a bank of 12 (each word fits only once). Teil 3: pick the fitting response in 5 mini-dialogues. Look left AND right of every gap.',
  hoeren: '5 parts, 20 items. You can play each audio a limited number of times (like the real exam). Teil 1: 4 announcements → richtig/falsch. Teil 2: 4 info clips → a/b/c. Teil 3: 4 dialogues → richtig/falsch. Teil 4: one interview → 4 questions. Teil 5: a phone message → write 4 missing words into the note. Read the items BEFORE you press play!',
  schreiben: 'Reply to the email. Cover ALL THREE content points (about 40–60 words), with a greeting and a sign-off. Plan 1 minute, write, keep 2 minutes to check verb positions and capital letters. After submitting you will score yourself against the sample answer.',
  sprechen: '3 parts, like the real paired oral exam — no preparation time. Teil 1: introduce yourself. Teil 2: talk about a topic using the guiding questions. Teil 3: plan something (speak both roles or grab a partner). Record yourself if you allow microphone access, then listen back and rate yourself honestly.'
};

/* ================= scoring ================= */
const norm = s => String(s ?? '').toLowerCase().trim()
  .replace(/[.,!?;:"'()]/g, '')
  .replace(/^((der|die|das|den|dem|ein|eine|einen|am|um|im) )+/, '')
  .replace(/ uhr$/, '')
  .replace(/\s+/g, ' ');

function scoreLesen(ex, a) {
  let c = 0; const d = [];
  ex.lesen.teil1.answers.forEach((ans, i) => { const u = a['l1.' + i]; const ok = u === ans; if (ok) c++; d.push(ok); });
  ex.lesen.teil2.questions.forEach((q, i) => { const ok = a['l2.' + i] === q.answer; if (ok) c++; d.push(ok); });
  ex.lesen.teil3.answers.forEach((ans, i) => { const ok = a['l3.' + i] === ans; if (ok) c++; d.push(ok); });
  ex.lesen.teil4.statements.forEach((s, i) => { const ok = a['l4.' + i] === s.answer; if (ok) c++; d.push(ok); });
  return { correct: c, of: 20, points: c * 3 };
}
function scoreSB(ex, a) {
  let c = 0;
  ex.sprachbausteine.teil1.gaps.forEach((g, i) => { if (a['s1.' + i] === g.answer) c++; });
  ex.sprachbausteine.teil2.answers.forEach((ans, i) => { if (a['s2.' + i] === ans) c++; });
  ex.sprachbausteine.teil3.items.forEach((it, i) => { if (a['s3.' + i] === it.answer) c++; });
  return { correct: c, of: 17, percent: Math.round(c / 17 * 100) };
}
function gapCorrect(gap, val) {
  const n = norm(val);
  if (!n) return false;
  const cands = [gap.answer, ...(gap.alt || [])].map(norm);
  if (cands.includes(n)) return true;
  const digits = x => x.replace(/[^0-9]/g, '');
  if (digits(gap.answer) && digits(n) && digits(n) === digits(gap.answer)) return true;
  return false;
}
function scoreHoeren(ex, a) {
  let c = 0;
  ex.hoeren.teil1.items.forEach((it, i) => { if (a['h1.' + i] === it.answer) c++; });
  ex.hoeren.teil2.items.forEach((it, i) => { if (a['h2.' + i] === it.answer) c++; });
  ex.hoeren.teil3.items.forEach((it, i) => { if (a['h3.' + i] === it.answer) c++; });
  ex.hoeren.teil4.questions.forEach((q, i) => { if (a['h4.' + i] === q.answer) c++; });
  ex.hoeren.teil5.gaps.forEach((g, i) => { if (gapCorrect(g, a['h5.' + i])) c++; });
  return { correct: c, of: 20, points: c * 3 };
}
function gradeFull(scores) {
  const vals = ['lesen', 'hoeren', 'schreiben', 'sprechen'].map(k => scores[k] ?? 0);
  const total = vals.reduce((x, y) => x + y, 0);
  const b1 = vals.filter(v => v >= 42).length >= 3 && vals.every(v => v >= 24);
  const a2 = vals.filter(v => v >= 24).length >= 3 && vals.every(v => v >= 6);
  return { total, result: b1 ? 'B1' : (a2 ? 'A2' : 'Nicht bestanden') };
}

/* ================= TTS ================= */
let voices = [];
function refreshVoices() { try { voices = speechSynthesis.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith('de')); } catch (e) { voices = []; } }
if ('speechSynthesis' in window) {
  refreshVoices();
  speechSynthesis.onvoiceschanged = refreshVoices;
}
function pickVoice() {
  if (!voices.length) refreshVoices();
  return voices.find(v => v.name === DB.settings.voiceName) || voices[0] || null;
}
const rateForExam = ex => (ex.difficulty === 'easy' ? 0.88 : ex.difficulty === 'medium' ? 0.94 : 1.0) * DB.settings.ttsRate;

let speaking = false;
function stopSpeech() { try { speechSynthesis.cancel(); } catch (e) {} speaking = false; $$('.audio-controls button.playing').forEach(b => b.classList.remove('playing')); }
function speakAudio(audio, rate, onDone) {
  if (!('speechSynthesis' in window)) { alert('Your browser has no speech synthesis. Use the transcript in review mode.'); onDone && onDone(); return; }
  stopSpeech();
  const turns = Array.isArray(audio) ? audio : [{ speaker: '', text: audio }];
  const speakers = [...new Set(turns.map(t => t.speaker))];
  const v = pickVoice();
  let i = 0; speaking = true;
  const next = () => {
    if (!speaking || i >= turns.length) { speaking = false; onDone && onDone(); return; }
    const t = turns[i++];
    const u = new SpeechSynthesisUtterance(t.text);
    if (v) u.voice = v;
    u.lang = 'de-DE'; u.rate = rate;
    u.pitch = speakers.length > 1 ? (speakers.indexOf(t.speaker) % 2 === 0 ? 1.05 : 0.85) : 1.0;
    u.onend = () => setTimeout(next, 350);
    u.onerror = () => setTimeout(next, 100);
    speechSynthesis.speak(u);
  };
  next();
}

/* ================= router ================= */
const VIEWS = ['dashboard', 'learn', 'guide', 'history', 'settings', 'runner', 'results', 'review'];
function show(view) {
  stopSpeech();
  VIEWS.forEach(v => { $('#view-' + v).hidden = v !== view; });
  $$('#mainNav button').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  window.scrollTo(0, 0);
}
$$('#mainNav button').forEach(b => b.addEventListener('click', () => {
  if (RUN && !confirmLeave()) return;
  const v = b.dataset.view;
  if (v === 'dashboard') renderDashboard();
  if (v === 'learn') renderLearn();
  if (v === 'guide') renderGuide();
  if (v === 'history') renderHistory();
  if (v === 'settings') renderSettings();
  show(v);
}));
function confirmLeave() {
  if (!RUN) return true;
  if (confirm('Leave the running exam? Progress of this attempt will be lost.')) { abortRun(); return true; }
  return false;
}

/* ================= countdown chip ================= */
function renderCountdown() {
  const el = $('#countdownChip');
  const d = new Date(DB.settings.examDate + 'T09:00:00');
  const days = Math.ceil((d - new Date()) / 86400000);
  el.innerHTML = isNaN(days) ? '' : (days >= 0 ? `Exam: ${d.toLocaleDateString('de-DE')} — <b>${days} day${days === 1 ? '' : 's'} left</b>` : 'Exam date passed — update it in Settings');
}

/* ================= dashboard ================= */
function fullAttempts() { return DB.attempts.filter(a => a.mode === 'full'); }
function bestFor(examId) {
  const list = fullAttempts().filter(a => a.examId === examId);
  return list.length ? list.reduce((m, a) => a.total > m.total ? a : m) : null;
}
function renderDashboard() {
  renderCountdown();
  const fa = fullAttempts();
  const best = fa.length ? Math.max(...fa.map(a => a.total)) : null;
  const last = DB.attempts.length ? DB.attempts[DB.attempts.length - 1] : null;
  const bestSkill = k => {
    const rel = DB.attempts.filter(a => a.scores && a.scores[k] != null);
    return rel.length ? Math.max(...rel.map(a => a.scores[k])) : null;
  };
  const skills = [['lesen', 'Lesen'], ['hoeren', 'Hören'], ['schreiben', 'Schreiben'], ['sprechen', 'Sprechen']];

  $('#view-dashboard').innerHTML = `
    <h1>Dashboard</h1>
    <p class="lead">10 Modelltests, easiest first. Take them in order under real timing. Aim: <b>≥ 42/60 in three skills</b> and ≥ 24/60 in the fourth = B1.</p>
    <div class="stat-row">
      <div class="stat-tile"><div class="label">Full exams taken</div><div class="value">${fa.length}</div><div class="sub">${DB.attempts.length - fa.length} module practice runs</div></div>
      <div class="stat-tile"><div class="label">Best total</div><div class="value">${best != null ? best : '–'}<span class="muted" style="font-size:1rem">/240</span></div><div class="sub">${best != null ? (best >= 168 ? 'B1 territory 🎉' : best >= 96 ? 'A2 zone — push to 168' : 'keep training') : 'no full exam yet'}</div></div>
      <div class="stat-tile"><div class="label">Last activity</div><div class="value" style="font-size:1.05rem">${last ? esc(MOD_META[last.mode] ? MOD_META[last.mode].short : 'Full exam') + ' · Test ' + last.examId : '–'}</div><div class="sub">${last ? fmtDate(last.date) : 'start below'}</div></div>
    </div>

    <h2>Skill progress (best scores)</h2>
    <div class="meters">
      ${skills.map(([k, label]) => {
        const v = bestSkill(k); const pct = v != null ? Math.round(v / 60 * 100) : 0;
        return `<div class="meter"><div class="name"><span>${label}</span><span>${v != null ? v + '/60' : '—'}</span></div>
          <div class="track"><div class="fill" style="width:${pct}%"></div><div class="target" style="left:70%"></div></div></div>`;
      }).join('')}
    </div>

    ${historyChartHTML()}

    <h2>Mock exams</h2>
    <div class="exam-grid">
      ${EXAMS.map(ex => {
        const b = bestFor(ex.id);
        const n = DB.attempts.filter(a => a.examId === ex.id).length;
        return `<div class="exam-card">
          <div class="title-line"><h3>${esc(ex.title)}</h3><span class="chip ${ex.difficulty}">${esc(ex.level)}</span></div>
          <div class="theme">${esc(ex.theme)}</div>
          <div class="best">${b ? `Best: <b>${b.total}/240</b> <span class="chip result-${b.result === 'B1' ? 'B1' : b.result === 'A2' ? 'A2' : 'fail'}">${esc(b.result)}</span>` : (n ? n + ' practice run(s)' : 'Not attempted yet')}</div>
          <div class="actions">
            <button class="primary" data-start="${ex.id}">${b || n ? 'Retry full exam' : 'Start full exam'}</button>
            <select data-practice="${ex.id}" class="ghost" style="font:inherit;border:1px solid var(--baseline);border-radius:8px;padding:6px 8px">
              <option value="">Practice one module…</option>
              ${MODULES.map(m => `<option value="${m}">${MOD_META[m].short} (${MOD_META[m].min()} min)</option>`).join('')}
            </select>
          </div>
        </div>`;
      }).join('')}
    </div>`;

  $$('#view-dashboard [data-start]').forEach(b => b.addEventListener('click', () => startRun(+b.dataset.start, 'full')));
  $$('#view-dashboard [data-practice]').forEach(s => s.addEventListener('change', () => { if (s.value) startRun(+s.dataset.practice, s.value); }));
}
function historyChartHTML() {
  const fa = fullAttempts().slice(-12);
  let inner;
  if (!fa.length) inner = '<div class="empty">No full exams yet — your score history will appear here.</div>';
  else {
    const H = 150;
    inner = `<div class="bars">
      ${[240, 168, 96].map(v => `<div class="gridline" style="bottom:${v / 240 * H}px"><span>${v}</span></div>`).join('')}
      ${fa.map(a => `<div class="bar-col" title="Test ${a.examId} · ${fmtDate(a.date)} · ${a.total}/240 · ${esc(a.result)}">
        <div class="val">${a.total}</div><div class="bar" style="height:${Math.max(2, a.total / 240 * H - 14)}px"></div></div>`).join('')}
    </div>
    <div class="bar-labels">${fa.map(a => `<div>T${a.examId}</div>`).join('')}</div>`;
  }
  return `<div class="chart" style="margin-top:14px"><div class="chart-title">Score history — total points per full exam</div>
    <div class="chart-sub">Gridlines: 168 = B1 threshold zone, 96 = A2 zone (official rule uses per-skill minimums — see Exam Guide)</div>${inner}</div>`;
}

/* ================= guide / learn ================= */
function renderGuide() { $('#view-guide').innerHTML = `<div class="guide">${window.GUIDE_HTML}</div>`; }

function renderLearn() {
  const L = window.LEARN;
  const done = DB.learnDone;
  const totalTasks = L.days.reduce((n, d) => n + d.tasks.length, 0);
  const doneCount = Object.values(done).filter(Boolean).length;
  $('#view-learn').innerHTML = `
    <h1>AI-assisted learning — 14 days to mock-exam readiness</h1>
    <div class="card"><p>${L.intro}</p>
    <p class="small muted">Progress: <b>${doneCount}/${totalTasks}</b> tasks done.</p></div>

    <h2>The 14-day plan</h2>
    ${L.days.map(d => {
      const dayDone = d.tasks.every((_, i) => done[`d${d.day}t${i}`]);
      return `<div class="card" ${dayDone ? 'style="border-left:4px solid var(--good)"' : ''}>
      <h3 style="margin-top:0">Day ${d.day}: ${esc(d.title)} <span class="chip">${esc(d.focus)}</span> ${dayDone ? '<span class="chip result-B1">done</span>' : ''}</h3>
      ${d.tasks.map((t, i) => `<label style="display:flex;gap:10px;align-items:flex-start;margin:6px 0;cursor:pointer">
        <input type="checkbox" data-task="d${d.day}t${i}" ${done[`d${d.day}t${i}`] ? 'checked' : ''} style="margin-top:4px"> <span>${esc(t)}</span></label>`).join('')}
      <div class="small muted" style="margin:8px 0 4px">Cheatsheets: ${d.cheats.map(c => `<a href="#cs-${c}">${esc(L.cheatsheets[c].title)}</a>`).join(' · ')}</div>
      ${d.ai.map(a => `<div class="callout blue"><b>🤖 AI practice — ${esc(a.t)}</b><br><span class="small">${esc(a.p)}</span><br>
        <button class="ghost" style="margin-top:8px" data-copy="${esc(a.p)}">Copy prompt</button></div>`).join('')}
      </div>`;
    }).join('')}

    <h2>Cheatsheets</h2>
    <p class="lead">Open, study, and come back before every mock exam.</p>
    ${Object.entries(L.cheatsheets).map(([id, cs]) => `
      <details class="card" id="cs-${id}"><summary style="cursor:pointer;font-weight:700">${esc(cs.title)}</summary>
      <div style="margin-top:10px">${cs.html}</div></details>`).join('')}
  `;
  $$('#view-learn [data-task]').forEach(cb => cb.addEventListener('change', () => {
    DB.learnDone[cb.dataset.task] = cb.checked; save(); renderLearn();
  }));
  $$('#view-learn [data-copy]').forEach(b => b.addEventListener('click', () => {
    navigator.clipboard && navigator.clipboard.writeText(b.dataset.copy).then(() => { b.textContent = 'Copied ✓'; setTimeout(() => b.textContent = 'Copy prompt', 1500); });
  }));
}

/* ================= history & settings ================= */
function renderHistory() {
  const rows = DB.attempts.slice().reverse();
  $('#view-history').innerHTML = `
    <h1>History</h1>
    ${historyChartHTML()}
    <div class="card">
    ${rows.length ? `<table class="history"><tr><th>Date</th><th>Test</th><th>Mode</th><th>Lesen</th><th>SB %</th><th>Hören</th><th>Schreiben</th><th>Sprechen</th><th>Total</th><th>Result</th><th>Time</th><th></th></tr>
      ${rows.map(a => {
        const s = a.scores || {};
        const t = Object.values(a.times || {}).reduce((x, y) => x + y, 0);
        return `<tr><td>${fmtDate(a.date)}</td><td>T${a.examId}</td><td>${a.mode === 'full' ? 'Full' : esc(MOD_META[a.mode].short)}</td>
        <td>${s.lesen ?? '–'}</td><td>${a.sb ? a.sb.percent + '%' : '–'}</td><td>${s.hoeren ?? '–'}</td><td>${s.schreiben ?? '–'}</td><td>${s.sprechen ?? '–'}</td>
        <td><b>${a.mode === 'full' ? a.total + '/240' : '–'}</b></td>
        <td>${a.mode === 'full' ? `<span class="chip result-${a.result === 'B1' ? 'B1' : a.result === 'A2' ? 'A2' : 'fail'}">${esc(a.result)}</span>` : '–'}</td>
        <td>${fmtClock(t)}</td>
        <td><button class="ghost" data-review="${a.id}" style="padding:3px 10px;font-size:.8rem">Review</button></td></tr>`;
      }).join('')}</table>` : '<p class="muted">No attempts yet.</p>'}
    </div>
    <div class="runner-actions">
      <button class="ghost" id="exportBtn">Export progress (JSON)</button>
      <button class="ghost" id="importBtn">Import progress</button>
      <input type="file" id="importFile" accept=".json" hidden>
    </div>`;
  $$('#view-history [data-review]').forEach(b => b.addEventListener('click', () => {
    const a = DB.attempts.find(x => x.id === +b.dataset.review);
    if (a) { renderReview(a); show('review'); }
  }));
  $('#exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(DB, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'telc-trainer-progress.json'; a.click();
  });
  $('#importBtn').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { try { DB = Object.assign({}, DEFAULTS, JSON.parse(r.result)); save(); renderHistory(); alert('Progress imported.'); } catch (err) { alert('Invalid file.'); } };
    r.readAsText(f);
  });
}

function renderSettings() {
  refreshVoices();
  const s = DB.settings;
  $('#view-settings').innerHTML = `
    <h1>Settings</h1>
    <div class="card"><div class="settings-grid">
      <div><label>Writing time (official: 10 min)</label>
        <select id="setWriting"><option value="10" ${s.writingMinutes == 10 ? 'selected' : ''}>10 minutes (official)</option><option value="15" ${s.writingMinutes == 15 ? 'selected' : ''}>15 minutes (relaxed)</option></select></div>
      <div><label>Listening speed</label>
        <select id="setRate">${[['0.85', 'Slower'], ['1', 'Normal (recommended)'], ['1.1', 'Faster (challenge)']].map(([v, l]) => `<option value="${v}" ${String(s.ttsRate) === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      <div><label>Audio plays per item (real exam: mostly 2×)</label>
        <select id="setPlays"><option value="1" ${s.playsAllowed == 1 ? 'selected' : ''}>1 (hard mode)</option><option value="2" ${s.playsAllowed == 2 ? 'selected' : ''}>2 (realistic)</option><option value="3" ${s.playsAllowed == 3 ? 'selected' : ''}>3 (training)</option></select></div>
      <div><label>German voice</label>
        <select id="setVoice"><option value="">Auto (first German voice)</option>${voices.map(v => `<option value="${esc(v.name)}" ${s.voiceName === v.name ? 'selected' : ''}>${esc(v.name)}</option>`).join('')}</select></div>
      <div><label>Your exam date</label><input type="date" id="setDate" value="${esc(s.examDate)}"></div>
    </div>
    <div class="runner-actions">
      <button class="ghost" id="testVoice">▶ Test voice</button>
      <button class="danger" id="wipeBtn">Delete all progress</button>
    </div>
    <p class="small muted">${voices.length ? voices.length + ' German voice(s) found in this browser.' : '⚠ No German voice found — listening audio needs one. Chrome/Edge usually include German voices; on some systems you must install a German language pack.'}</p>
    </div>
    <div class="card" id="syncPanel"></div>`;
  const upd = () => {
    DB.settings.writingMinutes = +$('#setWriting').value;
    DB.settings.ttsRate = +$('#setRate').value;
    DB.settings.playsAllowed = +$('#setPlays').value;
    DB.settings.voiceName = $('#setVoice').value;
    DB.settings.examDate = $('#setDate').value || s.examDate;
    save(); renderCountdown();
  };
  ['setWriting', 'setRate', 'setPlays', 'setVoice', 'setDate'].forEach(id => $('#' + id).addEventListener('change', upd));
  $('#testVoice').addEventListener('click', () => speakAudio('Guten Tag! Willkommen zur Prüfung telc Deutsch A2 B1. Viel Erfolg!', DB.settings.ttsRate, null));
  if (window.CloudSync) window.CloudSync.renderPanel();
  $('#wipeBtn').addEventListener('click', () => { if (confirm('Really delete ALL progress and history?')) { DB = JSON.parse(JSON.stringify(DEFAULTS)); save(); renderSettings(); renderCountdown(); } });
}

/* ================= exam runner ================= */
let RUN = null;

function startRun(examId, mode) {
  const ex = examById(examId);
  if (!ex) return;
  RUN = {
    exam: ex, mode,
    queue: mode === 'full' ? MODULES.slice() : [mode],
    idx: -1,
    answers: {}, times: {}, plays: {}, ratings: {}, recordings: {},
    timerId: null, secLeft: 0
  };
  nextModule();
  show('runner');
}
function abortRun() {
  if (RUN && RUN.timerId) clearInterval(RUN.timerId);
  stopRecording(true);
  RUN = null;
}
function nextModule() {
  if (RUN.timerId) { clearInterval(RUN.timerId); RUN.timerId = null; }
  RUN.idx++;
  if (RUN.idx >= RUN.queue.length) { finishRun(); return; }
  const mod = RUN.queue[RUN.idx];
  const meta = MOD_META[mod];
  $('#view-runner').innerHTML = `
    <div class="between-screen card">
      <div class="muted small">${esc(RUN.exam.title)} · ${esc(RUN.exam.level)} · ${RUN.mode === 'full' ? `Module ${RUN.idx + 1} of ${RUN.queue.length}` : 'Single-module practice'}</div>
      <div class="big">${esc(meta.name)}</div>
      <p style="max-width:640px;margin:10px auto"><b>What to do:</b> ${esc(WHAT_TO_DO[mod])}</p>
      <p class="muted">⏱ ${meta.min()} minutes${mod !== 'sprechen' ? ' — the module submits automatically when time runs out.' : ' (guideline — you submit when done).'}</p>
      <button class="primary" id="beginModule" style="font-size:1.05rem;padding:10px 26px">Start ${esc(meta.short)} ▸</button>
      <div style="margin-top:14px"><button class="ghost" id="abortRun">Abort attempt</button></div>
    </div>`;
  $('#beginModule').addEventListener('click', () => beginModule(mod));
  $('#abortRun').addEventListener('click', () => { if (confirm('Abort this attempt? Nothing will be saved.')) { abortRun(); renderDashboard(); show('dashboard'); } });
}

function beginModule(mod) {
  const meta = MOD_META[mod];
  RUN.moduleStart = Date.now();
  RUN.secLeft = meta.min() * 60;
  $('#view-runner').innerHTML = `
    <div class="runner-top">
      <span class="mod-name">${esc(meta.name)}</span>
      <span class="steps">${esc(RUN.exam.title)}${RUN.mode === 'full' ? ` · module ${RUN.idx + 1}/${RUN.queue.length}` : ''}</span>
      <span class="timer" id="timer">${fmtClock(RUN.secLeft)}</span>
    </div>
    <div id="moduleBody"></div>
    <div class="runner-actions">
      <button class="primary" id="submitModule">Submit ${esc(meta.short)} ✓</button>
      <button class="ghost" id="abortRun2">Abort attempt</button>
    </div>`;
  $('#moduleBody').innerHTML = RENDER[mod](RUN.exam);
  wireModule(mod);
  $('#submitModule').addEventListener('click', () => submitModule(mod, false));
  $('#abortRun2').addEventListener('click', () => { if (confirm('Abort this attempt? Nothing will be saved.')) { abortRun(); renderDashboard(); show('dashboard'); } });
  RUN.timerId = setInterval(() => {
    RUN.secLeft--;
    const t = $('#timer'); if (!t) return;
    t.textContent = fmtClock(RUN.secLeft);
    t.classList.toggle('warn', RUN.secLeft <= 300 && RUN.secLeft > 60);
    t.classList.toggle('crit', RUN.secLeft <= 60);
    if (RUN.secLeft <= 0) {
      if (mod === 'sprechen') { clearInterval(RUN.timerId); RUN.timerId = null; t.textContent = '0:00'; }
      else submitModule(mod, true);
    }
  }, 1000);
  window.scrollTo(0, 0);
}

/* ---------- module renderers ---------- */
const letterOpts = (n, sel) => '<option value="">–</option>' + Array.from({ length: n }, (_, i) => `<option value="${i}" ${sel === i ? 'selected' : ''}>${LETTERS[i]}</option>`).join('');
const rfRadios = (name) => `
  <label><input type="radio" name="${name}" value="true"> richtig</label>
  <label><input type="radio" name="${name}" value="false"> falsch</label>`;
const mcRadios = (name, options) => options.map((o, i) => `<label><input type="radio" name="${name}" value="${i}"> ${LETTERS[i]}) ${esc(o)}</label>`).join('');

const RENDER = {
  lesen(ex) {
    const L = ex.lesen;
    return `
    <div class="teil"><div class="teil-head"><h3>Teil 1 — Anzeigen zuordnen</h3><span class="chip">5 Punkte-Items</span></div>
      <p class="anweisung">${esc(L.teil1.anweisung)}</p>
      <div class="ads-list">${L.teil1.ads.map((a, i) => `<div class="ad"><b class="letter">${LETTERS[i]})</b>${esc(a)}</div>`).join('')}</div>
      ${L.teil1.situations.map((s, i) => `<div class="q-item"><div class="q-text">${i + 1}. ${esc(s)}</div>
        Anzeige: <select data-key="l1.${i}">${letterOpts(8)}</select></div>`).join('')}
    </div>
    <div class="teil"><div class="teil-head"><h3>Teil 2 — Texte lesen</h3><span class="chip">5 Items</span></div>
      <p class="anweisung">${esc(L.teil2.anweisung)}</p>
      ${L.teil2.texts.map((t, i) => `<div class="reading-text"><div class="rt-title">Text ${'AB'[i]}: ${esc(t.titel)}</div>${nl2br(t.text)}</div>`).join('')}
      ${L.teil2.questions.map((q, i) => `<div class="q-item"><div class="q-text">${i + 1}. (Text ${'AB'[q.textIndex]}) ${esc(q.frage)}</div>${mcRadios('l2.' + i, q.options)}</div>`).join('')}
    </div>
    <div class="teil"><div class="teil-head"><h3>Teil 3 — Überschriften zuordnen</h3><span class="chip">5 Items</span></div>
      <p class="anweisung">${esc(L.teil3.anweisung)}</p>
      <div class="ads-list">${L.teil3.headlines.map((h, i) => `<div class="ad"><b class="letter">${LETTERS[i]})</b>${esc(h)}</div>`).join('')}</div>
      ${L.teil3.messages.map((m, i) => `<div class="q-item"><div class="q-text">Nachricht ${i + 1}</div><p>${nl2br(m)}</p>
        Überschrift: <select data-key="l3.${i}">${letterOpts(8)}</select></div>`).join('')}
    </div>
    <div class="teil"><div class="teil-head"><h3>Teil 4 — Richtig oder falsch?</h3><span class="chip">5 Items</span></div>
      <p class="anweisung">${esc(L.teil4.anweisung)}</p>
      <div class="reading-text"><div class="rt-title">${esc(L.teil4.titel)}</div>${nl2br(L.teil4.text)}</div>
      ${L.teil4.statements.map((s, i) => `<div class="q-item"><div class="q-text">${i + 1}. ${esc(s.text)}</div>${rfRadios('l4.' + i)}</div>`).join('')}
    </div>`;
  },

  sprachbausteine(ex) {
    const S = ex.sprachbausteine;
    const gapText1 = esc(S.teil1.text).replace(/\[(\d)\]/g, (_, n) => {
      const g = S.teil1.gaps[+n - 1];
      return `<select class="inline-gap-select" data-key="s1.${+n - 1}"><option value="">[${n}]</option>${g.options.map((o, i) => `<option value="${i}">${LETTERS[i]}) ${esc(o)}</option>`).join('')}</select>`;
    });
    const gapText2 = esc(S.teil2.text).replace(/\[(\d)\]/g, (_, n) =>
      `<select class="inline-gap-select" data-key="s2.${+n - 1}"><option value="">[${n}]</option>${S.teil2.wordBank.map((w, i) => `<option value="${i}">${LETTERS[i]}) ${esc(w)}</option>`).join('')}</select>`);
    return `
    <div class="teil"><div class="teil-head"><h3>Teil 1 — Grammatik-Lücken</h3><span class="chip">6 Items</span></div>
      <p class="anweisung">${esc(S.teil1.anweisung)}</p>
      <div class="gap-text">${gapText1.replace(/\n/g, '<br>')}</div></div>
    <div class="teil"><div class="teil-head"><h3>Teil 2 — Wortschatz-Lücken</h3><span class="chip">6 Items</span></div>
      <p class="anweisung">${esc(S.teil2.anweisung)}</p>
      <div class="wordbank">${S.teil2.wordBank.map((w, i) => `<span>${LETTERS[i]}) ${esc(w)}</span>`).join('')}</div>
      <div class="gap-text">${gapText2.replace(/\n/g, '<br>')}</div></div>
    <div class="teil"><div class="teil-head"><h3>Teil 3 — Passende Antwort</h3><span class="chip">5 Items</span></div>
      <p class="anweisung">${esc(S.teil3.anweisung)}</p>
      ${S.teil3.items.map((it, i) => `<div class="q-item"><div class="q-text">${i + 1}. ${esc(it.prompt)}</div>${mcRadios('s3.' + i, it.options)}</div>`).join('')}
    </div>`;
  },

  hoeren(ex) {
    const H = ex.hoeren;
    const playBtn = key => `<div class="audio-controls"><button class="primary" data-audio="${key}">▶ Anhören</button><span class="plays" data-plays="${key}">${DB.settings.playsAllowed}× left</span></div>`;
    return `
    <div class="callout blue small">🎧 Each audio can be played <b>${DB.settings.playsAllowed}×</b>. Read the items first, then press play. Transcripts appear in the review after submitting.</div>
    <div class="teil"><div class="teil-head"><h3>Teil 1 — Ansagen</h3><span class="chip">richtig/falsch</span></div>
      <p class="anweisung">${esc(H.teil1.anweisung)}</p>
      ${H.teil1.items.map((it, i) => `<div class="q-item">${playBtn('h1.' + i)}<div class="q-text">${i + 1}. ${esc(it.statement)}</div>${rfRadios('h1.' + i)}</div>`).join('')}
    </div>
    <div class="teil"><div class="teil-head"><h3>Teil 2 — Informationen</h3><span class="chip">a/b/c</span></div>
      <p class="anweisung">${esc(H.teil2.anweisung)}</p>
      ${H.teil2.items.map((it, i) => `<div class="q-item">${playBtn('h2.' + i)}<div class="q-text">${i + 1}. ${esc(it.frage)}</div>${mcRadios('h2.' + i, it.options)}</div>`).join('')}
    </div>
    <div class="teil"><div class="teil-head"><h3>Teil 3 — Gespräche</h3><span class="chip">richtig/falsch</span></div>
      <p class="anweisung">${esc(H.teil3.anweisung)}</p>
      ${H.teil3.items.map((it, i) => `<div class="q-item">${playBtn('h3.' + i)}<div class="q-text">${i + 1}. ${esc(it.statement)}</div>${rfRadios('h3.' + i)}</div>`).join('')}
    </div>
    <div class="teil"><div class="teil-head"><h3>Teil 4 — Interview</h3><span class="chip">a/b/c</span></div>
      <p class="anweisung">${esc(H.teil4.anweisung)}</p>
      <div class="q-item">${playBtn('h4')}</div>
      ${H.teil4.questions.map((q, i) => `<div class="q-item"><div class="q-text">${i + 1}. ${esc(q.frage)}</div>${mcRadios('h4.' + i, q.options)}</div>`).join('')}
    </div>
    <div class="teil"><div class="teil-head"><h3>Teil 5 — Hören &amp; Schreiben</h3><span class="chip">Notiz ergänzen</span></div>
      <p class="anweisung">${esc(H.teil5.anweisung)}</p>
      <div class="q-item">${playBtn('h5')}
        <div class="reading-text"><div class="rt-title">${esc(H.teil5.noteTitle)}</div>
        ${H.teil5.gaps.map((g, i) => {
          const parts = g.label.split('____');
          return `<div style="margin:8px 0">${esc(parts[0])}<input type="text" data-key="h5.${i}" style="width:180px" autocomplete="off">${esc(parts[1] || '')}</div>`;
        }).join('')}</div>
      </div>
    </div>`;
  },

  schreiben(ex) {
    const W = ex.schreiben;
    return `
    <div class="teil"><div class="teil-head"><h3>Schreiben — E-Mail beantworten</h3><span class="chip">60 Punkte</span></div>
      <p class="anweisung">${esc(W.anweisung)}</p>
      <p>${esc(W.situation)}</p>
      <div class="email-box"><div class="meta">Von: ${esc(W.incomingEmail.von)} · Betreff: <b>${esc(W.incomingEmail.betreff)}</b></div>
      <div class="body">${nl2br(W.incomingEmail.text)}</div></div>
      <p><b>Schreiben Sie zu diesen Punkten:</b></p>
      <ol class="points-list">${W.points.map(p => `<li>${esc(p)}</li>`).join('')}</ol>
      <textarea class="writing" data-key="w.text" placeholder="Liebe/r …" spellcheck="false"></textarea>
      <div class="wordcount" id="wordcount">0 Wörter</div>
    </div>`;
  },

  sprechen(ex) {
    const P = ex.sprechen;
    const rec = part => `<div class="rec-controls" data-recpart="${part}">
      <button class="ghost" data-rec="${part}">● Record</button>
      <button class="ghost" data-recstop="${part}" disabled>■ Stop</button>
      <span class="small muted" data-recstate="${part}"></span>
      <audio controls data-recaudio="${part}" style="display:none;height:32px"></audio>
    </div>`;
    return `
    <div class="callout blue small">🎤 Speak OUT LOUD — ideally record yourself (allow the microphone) and listen back. In the real exam there is <b>no preparation time</b>. Recordings live only in this session; they are not saved to disk.</div>
    <div class="teil speaking-part"><div class="teil-head"><h3>Teil 1 — Sich vorstellen</h3><span class="chip">~2 Min.</span></div>
      <p class="anweisung">${esc(P.teil1.anweisung)}</p>
      <div class="ads-list">${P.teil1.punkte.map(p => `<div class="ad">${esc(p)}</div>`).join('')}</div>
      <div class="redemittel"><b>Redemittel:</b><ul>${P.teil1.redemittel.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
      ${rec('t1')}
    </div>
    <div class="teil speaking-part"><div class="teil-head"><h3>Teil 2 — Über ein Thema sprechen</h3><span class="chip">~5 Min.</span></div>
      <p><b>Thema: ${esc(P.teil2.thema)}</b></p>
      <p class="anweisung">${esc(P.teil2.anweisung)} <b>Read the task twice before you start!</b></p>
      <ol class="points-list">${P.teil2.leitfragen.map(f => `<li>${esc(f)}</li>`).join('')}</ol>
      <div class="redemittel"><b>Redemittel:</b><ul>${P.teil2.redemittel.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
      ${rec('t2')}
    </div>
    <div class="teil speaking-part"><div class="teil-head"><h3>Teil 3 — Gemeinsam planen</h3><span class="chip">~5 Min.</span></div>
      <p><b>${esc(P.teil3.aufgabe)}</b></p>
      <p class="anweisung">${esc(P.teil3.anweisung)} (Solo training: speak both roles, or grab a partner.)</p>
      <div class="ads-list">${P.teil3.punkte.map(p => `<div class="ad">${esc(p)}</div>`).join('')}</div>
      <div class="redemittel"><b>Redemittel:</b><ul>${P.teil3.redemittel.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div>
      ${rec('t3')}
    </div>`;
  }
};

/* ---------- module wiring ---------- */
function wireModule(mod) {
  if (mod === 'hoeren') {
    $$('#moduleBody [data-audio]').forEach(btn => {
      const key = btn.dataset.audio;
      RUN.plays[key] = RUN.plays[key] ?? DB.settings.playsAllowed;
      btn.addEventListener('click', () => {
        if (speaking) { stopSpeech(); return; }
        if (RUN.plays[key] <= 0) return;
        RUN.plays[key]--;
        const el = $(`#moduleBody [data-plays="${key}"]`);
        if (el) el.textContent = RUN.plays[key] + '× left';
        btn.classList.add('playing'); btn.textContent = '■ Stopp';
        const H = RUN.exam.hoeren;
        const audio = key === 'h4' ? H.teil4.audio : key === 'h5' ? H.teil5.audio : H['teil' + key[1]].items[+key.split('.')[1]].audio;
        speakAudio(audio, rateForExam(RUN.exam), () => {
          btn.classList.remove('playing'); btn.textContent = '▶ Anhören';
          if (RUN.plays[key] <= 0) btn.disabled = true;
        });
      });
    });
  }
  if (mod === 'schreiben') {
    const ta = $('#moduleBody [data-key="w.text"]');
    ta.addEventListener('input', () => {
      const n = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
      $('#wordcount').textContent = n + ' Wörter' + (n < 40 ? ' (aim for 40–60)' : n > 80 ? ' (that is plenty — check your grammar!)' : ' ✓');
    });
  }
  if (mod === 'sprechen') wireRecorder();
}

/* ---------- recorder ---------- */
let recState = { stream: null, rec: null, part: null };
function wireRecorder() {
  if (!navigator.mediaDevices || !window.MediaRecorder) {
    $$('#moduleBody [data-rec]').forEach(b => { b.disabled = true; b.title = 'Recording not supported in this browser'; });
    return;
  }
  $$('#moduleBody [data-rec]').forEach(b => b.addEventListener('click', async () => {
    const part = b.dataset.rec;
    try {
      stopRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const chunks = [];
      rec.ondataavailable = e => chunks.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
        RUN.recordings[part] = URL.createObjectURL(blob);
        const audio = $(`[data-recaudio="${part}"]`);
        if (audio) { audio.src = RUN.recordings[part]; audio.style.display = 'inline-block'; }
        stream.getTracks().forEach(t => t.stop());
      };
      rec.start();
      recState = { stream, rec, part };
      $(`[data-rec="${part}"]`).disabled = true;
      $(`[data-recstop="${part}"]`).disabled = false;
      $(`[data-recstate="${part}"]`).innerHTML = '<span class="rec-dot"></span> recording…';
    } catch (e) {
      $(`[data-recstate="${part}"]`).textContent = 'Microphone not available — practice out loud and self-rate.';
    }
  }));
  $$('#moduleBody [data-recstop]').forEach(b => b.addEventListener('click', () => stopRecording()));
}
function stopRecording(silent) {
  if (recState.rec && recState.rec.state !== 'inactive') recState.rec.stop();
  else if (recState.stream) recState.stream.getTracks().forEach(t => t.stop());
  if (recState.part && !silent) {
    const p = recState.part;
    const b1 = $(`[data-rec="${p}"]`), b2 = $(`[data-recstop="${p}"]`), st = $(`[data-recstate="${p}"]`);
    if (b1) b1.disabled = false; if (b2) b2.disabled = true; if (st) st.textContent = 'recorded ✓ — listen below';
  }
  recState = { stream: null, rec: null, part: null };
}

/* ---------- collect & submit ---------- */
function collectModule(mod) {
  const a = RUN.answers;
  $$('#moduleBody [data-key]').forEach(el => {
    const k = el.dataset.key;
    if (el.tagName === 'SELECT') a[k] = el.value === '' ? null : +el.value;
    else a[k] = el.value;
  });
  $$('#moduleBody input[type="radio"]:checked').forEach(r => {
    a[r.name] = r.value === 'true' ? true : r.value === 'false' ? false : +r.value;
  });
}
function unansweredCount(mod) {
  const ex = RUN.exam, a = RUN.answers;
  const miss = keys => keys.filter(k => a[k] == null || a[k] === '').length;
  if (mod === 'lesen') return miss(['l1.0','l1.1','l1.2','l1.3','l1.4']) + miss(ex.lesen.teil2.questions.map((_, i) => 'l2.' + i)) + miss(['l3.0','l3.1','l3.2','l3.3','l3.4']) + miss(ex.lesen.teil4.statements.map((_, i) => 'l4.' + i));
  if (mod === 'sprachbausteine') return miss(ex.sprachbausteine.teil1.gaps.map((_, i) => 's1.' + i)) + miss(ex.sprachbausteine.teil2.answers.map((_, i) => 's2.' + i)) + miss(ex.sprachbausteine.teil3.items.map((_, i) => 's3.' + i));
  if (mod === 'hoeren') return miss(ex.hoeren.teil1.items.map((_, i) => 'h1.' + i)) + miss(ex.hoeren.teil2.items.map((_, i) => 'h2.' + i)) + miss(ex.hoeren.teil3.items.map((_, i) => 'h3.' + i)) + miss(ex.hoeren.teil4.questions.map((_, i) => 'h4.' + i)) + miss(ex.hoeren.teil5.gaps.map((_, i) => 'h5.' + i));
  return 0;
}
function submitModule(mod, auto) {
  collectModule(mod);
  if (!auto) {
    const n = unansweredCount(mod);
    if (n > 0 && !confirm(`${n} item(s) unanswered — in the real exam a blank is a guaranteed zero. Submit anyway?`)) return;
  }
  if (RUN.timerId) { clearInterval(RUN.timerId); RUN.timerId = null; }
  stopSpeech(); stopRecording(true);
  RUN.times[mod] = Math.round((Date.now() - RUN.moduleStart) / 1000);
  if (auto) alert('⏱ Time is up — the module was submitted automatically.');
  if (mod === 'schreiben') return showRating('schreiben');
  if (mod === 'sprechen') return showRating('sprechen');
  nextModule();
}

/* ---------- self-rating (schreiben / sprechen) ---------- */
const RATING_CRITERIA = {
  schreiben: [
    ['Inhalt — alle 3 Punkte behandelt?', 'All three content points fully addressed'],
    ['Verständlichkeit', 'A German reader would understand everything without effort'],
    ['Wortschatz', 'Varied, appropriate words; correct greeting & sign-off'],
    ['Korrektheit', 'Verb positions, endings, capitalization mostly right']
  ],
  sprechen: [
    ['Aufgabe & Inhalt', 'All parts/points covered, on topic'],
    ['Flüssigkeit', 'Kept talking, few long pauses'],
    ['Wortschatz & Strukturen', 'Used the Redemittel, varied sentences'],
    ['Aussprache & Interaktion', 'Understandable; asked/reacted like a partner']
  ]
};
function showRating(mod) {
  const ex = RUN.exam;
  const crit = RATING_CRITERIA[mod];
  const isW = mod === 'schreiben';
  $('#view-runner').innerHTML = `
    <h2>${isW ? 'Schreiben' : 'Sprechen'} — self-scoring (max 60)</h2>
    <p class="lead">Compare honestly with the sample, then move the sliders. 0 = not at all · 5 = fully. Score = sum × 3.</p>
    ${isW ? `<div class="card"><h3>Your text</h3><div class="reading-text">${nl2br(RUN.answers['w.text'] || '(empty)')}</div>
      <h3>Sample answer (Musterlösung)</h3><div class="muster">${nl2br(ex.schreiben.musterloesung)}</div>
      <p class="small muted">💡 ${esc(ex.schreiben.tipps)} — Check: did you cover all three points? ${ex.schreiben.points.map(p => `<br>· ${esc(p)}`).join('')}</p></div>`
    : `<div class="card"><h3>Your recordings</h3>
      ${['t1', 't2', 't3'].map((p, i) => RUN.recordings[p] ? `<p>Teil ${i + 1}: <audio controls src="${RUN.recordings[p]}" style="height:32px;vertical-align:middle"></audio></p>` : `<p class="muted small">Teil ${i + 1}: no recording</p>`).join('')}
      <p class="small muted">💡 Rate against the Redemittel: did you use suggestion phrases, react, ask back, reach a result in Teil 3?</p></div>`}
    <div class="card">
      ${crit.map(([name, hint], i) => `<div class="rating-row">
        <div class="r-label"><b>${esc(name)}</b><div class="small muted">${esc(hint)}</div></div>
        <input type="range" min="0" max="5" step="1" value="3" data-rate="${i}">
        <div class="score" data-ratescore="${i}">3</div></div>`).join('')}
      <hr class="sep"><p style="text-align:right">Module score: <b id="rateTotal">36</b>/60</p>
      <div class="runner-actions"><button class="primary" id="rateDone">Confirm score ▸</button></div>
    </div>`;
  const update = () => {
    const vals = $$('#view-runner [data-rate]').map(r => +r.value);
    vals.forEach((v, i) => $(`[data-ratescore="${i}"]`).textContent = v);
    $('#rateTotal').textContent = vals.reduce((a, b) => a + b, 0) * 3;
  };
  $$('#view-runner [data-rate]').forEach(r => r.addEventListener('input', update));
  update();
  $('#rateDone').addEventListener('click', () => {
    RUN.ratings[mod] = $$('#view-runner [data-rate]').map(r => +r.value).reduce((a, b) => a + b, 0) * 3;
    nextModule();
  });
  window.scrollTo(0, 0);
}

/* ---------- finish & results ---------- */
function finishRun() {
  const ex = RUN.exam;
  const has = m => RUN.queue.includes(m);
  const scores = {};
  let sb = null;
  if (has('lesen')) scores.lesen = scoreLesen(ex, RUN.answers).points;
  if (has('hoeren')) scores.hoeren = scoreHoeren(ex, RUN.answers).points;
  if (has('sprachbausteine')) sb = scoreSB(ex, RUN.answers);
  if (has('schreiben')) scores.schreiben = RUN.ratings.schreiben ?? 0;
  if (has('sprechen')) scores.sprechen = RUN.ratings.sprechen ?? 0;

  const attempt = {
    id: Date.now(), examId: ex.id, mode: RUN.mode,
    date: new Date().toISOString(),
    times: RUN.times, scores, sb,
    answers: RUN.answers, ratings: RUN.ratings
  };
  if (RUN.mode === 'full') Object.assign(attempt, gradeFull(scores));
  DB.attempts.push(attempt); save();
  RUN = null;
  renderResults(attempt);
  show('results');
}
function skillBar(label, val, of) {
  const pct = Math.round((val ?? 0) / of * 100);
  return `<div class="meter"><div class="name"><span>${label}</span><span>${val != null ? val + '/' + of : '—'}</span></div>
    <div class="track"><div class="fill" style="width:${pct}%;${pct >= 70 ? '' : 'background:' + (pct >= 40 ? 'var(--warning)' : 'var(--critical)')}"></div><div class="target" style="left:70%"></div></div></div>`;
}
function renderResults(a) {
  const ex = examById(a.examId);
  const s = a.scores, full = a.mode === 'full';
  const timeTotal = Object.values(a.times || {}).reduce((x, y) => x + y, 0);
  $('#view-results').innerHTML = `
    <div class="card result-banner">
      <div class="muted">${esc(ex.title)} · ${esc(ex.level)} · ${full ? 'Full exam' : MOD_META[a.mode].name + ' (practice)'}</div>
      ${full ? `<div class="grade" style="color:${a.result === 'B1' ? 'var(--good-text)' : a.result === 'A2' ? '#8a5b00' : 'var(--critical)'}">${esc(a.result)}</div>
        <div class="total">${a.total} / 240 points · time used ${fmtClock(timeTotal)}</div>
        <p class="small muted">B1 rule: ≥42/60 in three skills + ≥24/60 in the fourth. A2 rule: ≥24/60 in three + ≥6/60 in the fourth.</p>`
      : `<div class="grade">${Object.values(s)[0] ?? (a.sb ? a.sb.percent + '%' : '–')}${Object.keys(s).length ? '<span style="font-size:1.2rem">/60</span>' : ''}</div>
        <div class="total">time used ${fmtClock(timeTotal)}</div>`}
    </div>
    <div class="skill-breakdown">
      ${s.lesen != null ? skillBar('Lesen', s.lesen, 60) : ''}
      ${s.hoeren != null ? skillBar('Hören', s.hoeren, 60) : ''}
      ${s.schreiben != null ? skillBar('Schreiben (self)', s.schreiben, 60) : ''}
      ${s.sprechen != null ? skillBar('Sprechen (self)', s.sprechen, 60) : ''}
      ${a.sb ? skillBar('Sprachbausteine', a.sb.correct, 17) : ''}
    </div>
    ${a.times && Object.keys(a.times).length ? `<div class="card small"><b>Time per module:</b> ${Object.entries(a.times).map(([m, t]) => `${MOD_META[m].short}: ${fmtClock(t)} / ${MOD_META[m].min()}:00`).join(' · ')}</div>` : ''}
    <div class="runner-actions">
      <button class="primary" id="resReview">Review answers &amp; transcripts</button>
      <button class="ghost" id="resRetry">Retry this exam</button>
      <button class="ghost" id="resHome">Dashboard</button>
    </div>`;
  $('#resReview').addEventListener('click', () => { renderReview(a); show('review'); });
  $('#resRetry').addEventListener('click', () => startRun(a.examId, a.mode));
  $('#resHome').addEventListener('click', () => { renderDashboard(); show('dashboard'); });
}

/* ---------- review ---------- */
function reviewItem(ok, qHtml, yourTxt, correctTxt, extra) {
  return `<div class="review-item ${ok ? 'correct' : 'wrong'}">
    <div class="q-text">${qHtml}</div>
    <div class="your ${ok ? '' : 'bad'}">Your answer: ${esc(yourTxt ?? '—')}</div>
    ${ok ? '' : `<div class="correct-ans">Correct: ${esc(correctTxt)}</div>`}${extra || ''}</div>`;
}
const trHtml = audio => `<details class="tr-details"><summary>Transcript</summary><div class="transcript">${
  Array.isArray(audio) ? audio.map(t => `<b>${esc(t.speaker)}:</b> ${esc(t.text)}`).join('<br>') : esc(audio)}</div></details>`;

function renderReview(a) {
  const ex = examById(a.examId);
  const ans = a.answers || {};
  const has = m => a.mode === 'full' || a.mode === m;
  let html = `<h1>Review — ${esc(ex.title)}</h1><p class="lead">${fmtDate(a.date)} · Green = correct, red = wrong. Learn every red item before the next test.</p>`;

  if (has('lesen')) {
    const L = ex.lesen;
    html += `<h2>Lesen — ${a.scores.lesen}/60</h2>`;
    html += L.teil1.answers.map((c, i) => reviewItem(ans['l1.' + i] === c,
      `T1.${i + 1} ${esc(L.teil1.situations[i])}`,
      ans['l1.' + i] != null ? LETTERS[ans['l1.' + i]] + ') ' + L.teil1.ads[ans['l1.' + i]] : null,
      LETTERS[c] + ') ' + L.teil1.ads[c])).join('');
    html += L.teil2.questions.map((q, i) => reviewItem(ans['l2.' + i] === q.answer,
      `T2.${i + 1} ${esc(q.frage)}`, ans['l2.' + i] != null ? q.options[ans['l2.' + i]] : null, q.options[q.answer])).join('');
    html += L.teil3.answers.map((c, i) => reviewItem(ans['l3.' + i] === c,
      `T3.${i + 1} ${esc(L.teil3.messages[i].slice(0, 90))}…`,
      ans['l3.' + i] != null ? L.teil3.headlines[ans['l3.' + i]] : null, L.teil3.headlines[c])).join('');
    html += L.teil4.statements.map((st, i) => reviewItem(ans['l4.' + i] === st.answer,
      `T4.${i + 1} ${esc(st.text)}`, ans['l4.' + i] == null ? null : ans['l4.' + i] ? 'richtig' : 'falsch', st.answer ? 'richtig' : 'falsch')).join('');
  }
  if (has('sprachbausteine') && a.sb) {
    const S = ex.sprachbausteine;
    html += `<h2>Sprachbausteine — ${a.sb.correct}/17 (${a.sb.percent}%)</h2>`;
    html += S.teil1.gaps.map((g, i) => reviewItem(ans['s1.' + i] === g.answer,
      `T1 Lücke ${i + 1}`, ans['s1.' + i] != null ? g.options[ans['s1.' + i]] : null, g.options[g.answer])).join('');
    html += S.teil2.answers.map((c, i) => reviewItem(ans['s2.' + i] === c,
      `T2 Lücke ${i + 1}`, ans['s2.' + i] != null ? S.teil2.wordBank[ans['s2.' + i]] : null, S.teil2.wordBank[c])).join('');
    html += S.teil3.items.map((it, i) => reviewItem(ans['s3.' + i] === it.answer,
      `T3.${i + 1} ${esc(it.prompt)}`, ans['s3.' + i] != null ? it.options[ans['s3.' + i]] : null, it.options[it.answer])).join('');
  }
  if (has('hoeren')) {
    const H = ex.hoeren;
    html += `<h2>Hören — ${a.scores.hoeren}/60</h2>`;
    html += H.teil1.items.map((it, i) => reviewItem(ans['h1.' + i] === it.answer,
      `T1.${i + 1} ${esc(it.statement)}`, ans['h1.' + i] == null ? null : ans['h1.' + i] ? 'richtig' : 'falsch', it.answer ? 'richtig' : 'falsch', trHtml(it.audio))).join('');
    html += H.teil2.items.map((it, i) => reviewItem(ans['h2.' + i] === it.answer,
      `T2.${i + 1} ${esc(it.frage)}`, ans['h2.' + i] != null ? it.options[ans['h2.' + i]] : null, it.options[it.answer], trHtml(it.audio))).join('');
    html += H.teil3.items.map((it, i) => reviewItem(ans['h3.' + i] === it.answer,
      `T3.${i + 1} ${esc(it.statement)}`, ans['h3.' + i] == null ? null : ans['h3.' + i] ? 'richtig' : 'falsch', it.answer ? 'richtig' : 'falsch', trHtml(it.audio))).join('');
    html += `<div class="card">${trHtml(H.teil4.audio)}</div>`;
    html += H.teil4.questions.map((q, i) => reviewItem(ans['h4.' + i] === q.answer,
      `T4.${i + 1} ${esc(q.frage)}`, ans['h4.' + i] != null ? q.options[ans['h4.' + i]] : null, q.options[q.answer])).join('');
    html += `<div class="card">${trHtml(H.teil5.audio)}</div>`;
    html += H.teil5.gaps.map((g, i) => reviewItem(gapCorrect(g, ans['h5.' + i]),
      `T5.${i + 1} ${esc(g.label.replace('____', '______'))}`, ans['h5.' + i], g.answer)).join('');
  }
  if (has('schreiben')) {
    html += `<h2>Schreiben — ${a.scores.schreiben ?? '–'}/60 (self-scored)</h2>
    <div class="card"><h3>Your text</h3><div class="reading-text">${nl2br(ans['w.text'] || '(empty)')}</div>
    <h3>Musterlösung</h3><div class="muster">${nl2br(ex.schreiben.musterloesung)}</div></div>`;
  }
  if (has('sprechen')) {
    html += `<h2>Sprechen — ${a.scores.sprechen ?? '–'}/60 (self-scored)</h2>
    <div class="card small muted">Recordings are session-only and not stored. Re-run the module to practice again — and re-read the Sprechen tactics in the Exam Guide.</div>`;
  }
  html += `<div class="runner-actions"><button class="primary" id="revRetry">Retry this exam</button><button class="ghost" id="revBack">Dashboard</button></div>`;
  $('#view-review').innerHTML = html;
  $('#revRetry').addEventListener('click', () => startRun(a.examId, a.mode));
  $('#revBack').addEventListener('click', () => { renderDashboard(); show('dashboard'); });
}

/* ================= boot ================= */
window.addEventListener('beforeunload', e => { if (RUN) { e.preventDefault(); e.returnValue = ''; } });
renderCountdown();
renderDashboard();
show('dashboard');
if (window.CloudSync) window.CloudSync.init({
  getDB: () => DB,
  replaceDB: (newDB) => {
    DB = Object.assign({}, DEFAULTS, newDB);
    DB.settings = Object.assign({}, DEFAULTS.settings, DB.settings || {});
    lsSet(KEY, JSON.stringify(DB));   // local save only; CloudSync pushes explicitly
    renderCountdown();
    if (!$('#view-dashboard').hidden) renderDashboard();
    if (!$('#view-history').hidden) renderHistory();
    if (!$('#view-learn').hidden) renderLearn();
    if (!$('#view-settings').hidden) renderSettings();
  }
});
})();
