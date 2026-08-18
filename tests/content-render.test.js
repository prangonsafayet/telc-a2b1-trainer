/* Authored content in content.js mixes plain text and HTML. Plain-text fields must not
   contain markup, and HTML fields must be injected rather than shown as literal tags. */
import { mount } from './setup.js';
import { GUIDE_HTML, LEARN } from '../src/content.js';

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
check('GUIDE_HTML is non-empty HTML', GUIDE_HTML.length > 1000 && /<h1>/.test(GUIDE_HTML));

const failed = checks.filter(c => !c).length;
console.log(failed ? `\nCONTENT RENDER FAILED (${failed}/${checks.length})` : `\nCONTENT RENDER PASSED (${checks.length}/${checks.length})`);
process.exit(failed ? 1 : 0);
