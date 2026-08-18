/* The exam-date picker must write a local-time YYYY-MM-DD and drive the header countdown. */
import { click, findByText, mount } from './setup.js';
import { daysUntil, parseISODate, toISODate } from '../src/components/ExamDatePicker.jsx';

const checks = [];
const check = (name, cond, extra = '') => {
  checks.push(cond);
  console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${name}${!cond && extra ? ' — ' + extra : ''}`);
};

/* Pure helpers first — the timezone bug this guards against is invisible in the UI. */
const d = parseISODate('2026-09-12');
check('parseISODate keeps the calendar day in local time', d.getFullYear() === 2026 && d.getMonth() === 8 && d.getDate() === 12);
check('toISODate round-trips', toISODate(d) === '2026-09-12');
check('parseISODate rejects junk', parseISODate('not-a-date') === null && parseISODate('') === null);
check('daysUntil(today) is 0', daysUntil(toISODate(new Date())) === 0);

localStorage.clear();
const { container, unmount } = await mount('/settings');

const trigger = findByText(/September|Pick your exam date/);
check('date picker trigger is rendered', !!trigger, (container.textContent || '').slice(0, 80));
check('picker shows a formatted date, not a raw input', /\d{4}/.test(trigger?.textContent || ''));
check('settings explains the countdown link', /countdown in the header/.test(container.textContent));

/* Open the calendar and pick a day. */
await click(trigger);
const grid = document.querySelector('table, [role="grid"]');
check('calendar opened', !!grid);

const dayButtons = [...document.querySelectorAll('[role="gridcell"] button, button[name="day"]')];
check('calendar rendered day buttons', dayButtons.length > 20, `${dayButtons.length} buttons`);

if (dayButtons.length) {
  await click(dayButtons[Math.floor(dayButtons.length / 2)]);
  const db = JSON.parse(localStorage.getItem('telcTrainerV1') || '{}');
  const saved = db.settings?.examDate;
  check('picking a day saves an ISO date', /^\d{4}-\d{2}-\d{2}$/.test(saved || ''), String(saved));
  check('saved date parses back to the same day', saved && toISODate(parseISODate(saved)) === saved);
}

await unmount();

const failed = checks.filter(c => !c).length;
console.log(failed ? `\nEXAM DATE FAILED (${failed}/${checks.length})` : `\nEXAM DATE PASSED (${checks.length}/${checks.length})`);
process.exit(failed ? 1 : 0);
