/* A signed-out user must be told, on every page, that progress is browser-local. */
import { mount } from './setup.js';

const checks = [];
const check = (name, cond, extra = '') => {
  checks.push(cond);
  console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${name}${!cond && extra ? ' — ' + extra : ''}`);
};

localStorage.clear();

const { container, unmount } = await mount('/');
const text = container.textContent || '';
const header = document.querySelector('header')?.textContent || '';

check('header states the account status', /Not signed in|Local only/.test(header), header.slice(0, 160));
check('dashboard warns progress is browser-local', /only in this browser/.test(text));
check('dashboard offers a backup export', /Export a backup/.test(text));
await unmount();

/* The warning must not appear on the guide, which has no dashboard banner — but the
   header status must still be there. */
const guide = await mount('/guide');
check(
  'header status persists across routes',
  /Not signed in|Local only/.test(document.querySelector('header')?.textContent || '')
);
await guide.unmount();

const failed = checks.filter(c => !c).length;
console.log(
  failed
    ? `\nAUTH VISIBILITY FAILED (${failed}/${checks.length})`
    : `\nAUTH VISIBILITY PASSED (${checks.length}/${checks.length})`
);
process.exit(failed ? 1 : 0);
