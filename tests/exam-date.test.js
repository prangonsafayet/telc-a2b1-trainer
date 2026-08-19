/* The exam-date picker must write a local-time YYYY-MM-DD and drive the header countdown. */
import { click, findByText, mount } from './setup.js';
import { daysUntil, parseIsoDate, toIsoDate } from '../src/shared/lib/format.ts';

const checks = [];
const check = (name, cond, extra = '') => {
  checks.push(cond);
  console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${name}${!cond && extra ? ' — ' + extra : ''}`);
};

/* Pure helpers first — the timezone bug this guards against is invisible in the UI. */
const d = parseIsoDate('2026-09-12');
check(
  'parseIsoDate keeps the calendar day in local time',
  d.getFullYear() === 2026 && d.getMonth() === 8 && d.getDate() === 12
);
check('toIsoDate round-trips', toIsoDate(d) === '2026-09-12');
check('parseIsoDate rejects junk', parseIsoDate('not-a-date') === null && parseIsoDate('') === null);
check('daysUntil(today) is 0', daysUntil(toIsoDate(new Date())) === 0);

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
  check('saved date parses back to the same day', saved && toIsoDate(parseIsoDate(saved)) === saved);
}

/* The month/year pickers: react-day-picker's default is a transparent native <select>
   overlaid on a label, which renders unstyled and with the wrong chevron. They are
   replaced with real shadcn selects, so no native <select> may remain in the calendar. */
/* Picking a day closed the popover, so open it again for the dropdown checks. */
await click(findByText(/\d{4}|Pick your exam date/));
const byLabel = l => document.querySelector(`[data-slot="select-trigger"][aria-label="${l}"]`);
const popover = document.querySelector('[data-slot="popover-content"]');

check('calendar uses no native <select>', (popover?.querySelectorAll('select').length ?? 0) === 0);

const monthTrigger = byLabel('Monat auswählen');
const yearTrigger = byLabel('Jahr auswählen');
check('month dropdown is rendered', !!monthTrigger);
check('year dropdown is rendered', !!yearTrigger);
check('month dropdown shows the current month', /\p{L}{3,}/u.test(monthTrigger?.textContent || ''));
check('year dropdown shows a 4-digit year', /\d{4}/.test(yearTrigger?.textContent || ''));

if (monthTrigger) {
  await click(monthTrigger);
  const months = [...document.querySelectorAll('[data-slot="select-item"]')];
  check('month dropdown opens all 12 months', months.length === 12, `${months.length} options`);
  await click(months[0]);
  check('picking a month updates the caption', /Januar/.test(byLabel('Monat auswählen')?.textContent || ''));
}

if (yearTrigger) {
  await click(byLabel('Jahr auswählen'));
  const years = [...document.querySelectorAll('[data-slot="select-item"]')];
  check('year dropdown offers a range of years', years.length >= 5, `${years.length} options`);
  await click(years[years.length - 1]);
  check('picking a year updates the caption', /\d{4}/.test(byLabel('Jahr auswählen')?.textContent || ''));
}

check('calendar grid survives both changes', !!document.querySelector('[role="grid"], table'));

/* Chevrons must point the right way: down for dropdowns, left/right for month nav. */
const chevrons = [...(popover?.querySelectorAll('svg.lucide') ?? [])]
  .map(el => (el.getAttribute('class') || '').match(/lucide-chevron-(left|right|up|down)/)?.[1])
  .filter(Boolean);
check(
  'nav renders left and right chevrons',
  chevrons.includes('left') && chevrons.includes('right'),
  chevrons.join(',')
);

await unmount();

const failed = checks.filter(c => !c).length;
console.log(
  failed
    ? `\nEXAM DATE FAILED (${failed}/${checks.length})`
    : `\nEXAM DATE PASSED (${checks.length}/${checks.length})`
);
process.exit(failed ? 1 : 0);
