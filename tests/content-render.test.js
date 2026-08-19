/* Authored content in content.js mixes plain text and HTML. Plain-text fields must not
   contain markup, and HTML fields must be injected rather than shown as literal tags. */
import { mount } from './setup.js';
import { GUIDE_HTML } from '../src/content/guide.ts';
import { LEARN } from '../src/content/learn.ts';

const checks = [];
const check = (name, cond, extra = '') => {
  checks.push(cond);
  console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${name}${!cond && extra ? ' — ' + extra : ''}`);
};

const RAW_TAG = /<\/?(b|i|em|strong|br|p|ul|li|div|span|code|h[1-6])\b[^>]*>/i;

/* Whichever fields carry HTML, the rendered page must never show a tag as text. */
for (const route of ['/learn', '/guide']) {
  const { container, unmount } = await mount(route);
  const text = container.textContent || '';
  const leak = RAW_TAG.exec(text);
  check(`${route} renders no literal HTML tags`, !leak, leak ? `found "${leak[0]}"` : '');
  await unmount();
}

/* The intro is the one HTML-bearing LEARN field; make sure it actually reached the DOM. */
const { container, unmount } = await mount('/learn');
check('learn intro is present and de-tagged', /2-week learning phase/.test(container.textContent));
check('learn intro bolding survived as real markup', !!container.querySelector('b'));
await unmount();

check('LEARN.intro still contains the HTML this relies on', /<b>/.test(LEARN.intro));

/* The curriculum is 28 authored days in two tiers, and the schedule engine trusts both
   the numbering and the tier split. Content drift here silently reshapes every plan. */
check('LEARN has 28 days', LEARN.days.length === 28, `${LEARN.days.length} days`);
check(
  'day numbers run 1–28 with no gaps',
  LEARN.days.every((day, index) => day.day === index + 1)
);
const tiers = LEARN.days.reduce((acc, day) => ({ ...acc, [day.tier]: (acc[day.tier] ?? 0) + 1 }), {});
check(
  'the tiers are 14 core + 14 extension',
  tiers.core === 14 && tiers.extension === 14,
  JSON.stringify(tiers)
);
check(
  'core days come first',
  LEARN.days.every(day => (day.day <= 14 ? day.tier === 'core' : day.tier === 'extension'))
);
check(
  'every day has at least 3 tasks',
  LEARN.days.every(day => day.tasks.length >= 3)
);
check(
  'every day has at least one AI prompt',
  LEARN.days.every(day => day.ai.length >= 1)
);
check(
  'every AI prompt has a title and a body',
  LEARN.days.every(day => day.ai.every(prompt => prompt.t.length > 0 && prompt.p.length > 40))
);
const unknownCheats = [
  ...new Set(LEARN.days.flatMap(day => day.cheats).filter(key => !(key in LEARN.cheatsheets)))
];
check('every cheats key exists as a cheatsheet', unknownCheats.length === 0, unknownCheats.join());
check(
  'the four B1 cheatsheets were added',
  ['nebensaetze', 'passivkii', 'verbpraep', 'formal'].every(key => key in LEARN.cheatsheets)
);
check(
  'every cheatsheet has a title and HTML',
  Object.values(LEARN.cheatsheets).every(sheet => sheet.title.length > 0 && /<\w/.test(sheet.html))
);
const orphans = Object.keys(LEARN.cheatsheets).filter(
  key => !LEARN.days.some(day => day.cheats.includes(key))
);
check('no cheatsheet is unreachable from the plan', orphans.length === 0, orphans.join());
check('GUIDE_HTML is non-empty HTML', GUIDE_HTML.length > 1000 && /<h1>/.test(GUIDE_HTML));

const failed = checks.filter(c => !c).length;
console.log(
  failed
    ? `\nCONTENT RENDER FAILED (${failed}/${checks.length})`
    : `\nCONTENT RENDER PASSED (${checks.length}/${checks.length})`
);
process.exit(failed ? 1 : 0);
