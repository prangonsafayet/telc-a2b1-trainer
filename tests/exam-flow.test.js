/* Drives a real attempt end to end, including a mid-module page refresh. */
import { click, findByText, mount } from './setup.js';
import { clearRun, loadRun } from '../src/features/exam/lib/runState.ts';

const checks = [];
const check = (name, cond, extra = '') => {
  checks.push(cond);
  console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${name}${!cond && extra ? ' — ' + extra : ''}`);
};

clearRun();
localStorage.clear();

/* 1. Briefing screen for a single-module practice run. */
let view = await mount('/exam/1/lesen');
check('briefing shows the module name', /Leseverstehen/.test(view.container.textContent));
const startBtn = findByText(/^Start Lesen/);
check('briefing has a Start button', !!startBtn);

/* 2. Start it. */
await click(startBtn);
check('module rendered', /Teil 1 — Anzeigen zuordnen/.test(view.container.textContent));
check('timer counting down from 45:00', /4[45]:\d\d/.test(view.container.textContent));
const started = loadRun();
check('run persisted with phase=module', started && started.phase === 'module');
check('run persisted an absolute deadline', !!(started && started.deadline));

/* 3. Answer one item. */
const radios = [...document.querySelectorAll('button[role="radio"]')];
check('radio items rendered', radios.length > 0, `${radios.length} radios`);
await click(radios[0]);
const answered = loadRun();
const answerCount = Object.keys(answered.answers || {}).length;
check('answer written through to storage', answerCount === 1, JSON.stringify(answered.answers));

/* 4. THE REFRESH — tear the tree down and remount at the same URL. */
const savedDeadline = answered.deadline;
await view.unmount();
view = await mount('/exam/1/lesen');
check('refresh resumed inside the module', /Teil 1 — Anzeigen zuordnen/.test(view.container.textContent));
const resumed = loadRun();
check('refresh kept the same deadline', resumed.deadline === savedDeadline);
check('refresh kept the answer', Object.keys(resumed.answers).length === answerCount);
check(
  'the answered radio is still checked',
  document.querySelectorAll('button[role="radio"][data-state="checked"]').length === 1
);

/* 5. Submit with blanks → confirm dialog → results. */
const submitBtn = findByText(/^Submit Lesen/);
check('submit button present', !!submitBtn);
await click(submitBtn);
check('unanswered-items dialog appeared', /still unanswered/.test(document.body.textContent));
const confirmBtn = findByText(/Submit anyway/);
check('dialog has a confirm action', !!confirmBtn);
await click(confirmBtn);

check('results screen reached', /time used/.test(view.container.textContent));
check('in-progress run cleared', loadRun() === null);

const db = JSON.parse(localStorage.getItem('telcTrainerV1') || '{}');
check('attempt saved', (db.attempts || []).length === 1);
check('attempt has a Lesen score', typeof db.attempts?.[0]?.scores?.lesen === 'number');

await view.unmount();
const failed = checks.filter(c => !c).length;
console.log(
  failed
    ? `\nEXAM FLOW FAILED (${failed}/${checks.length})`
    : `\nEXAM FLOW PASSED (${checks.length}/${checks.length})`
);
process.exit(failed ? 1 : 0);
