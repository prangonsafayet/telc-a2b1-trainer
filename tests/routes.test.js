/* Every route must mount without crashing and without React warnings. */
import { captureErrors, mount } from './setup.js';

const ROUTES = [
  '/',
  '/learn',
  '/guide',
  '/history',
  '/settings',
  '/exam/1/full',
  '/exam/3/lesen',
  '/exam/2/sprachbausteine',
  '/exam/1/hoeren',
  '/exam/1/schreiben',
  '/exam/1/sprechen',
  '/results/999',
  '/review/999',
  '/nope'
];

const cap = captureErrors();
let failed = 0;

for (const route of ROUTES) {
  try {
    const { container, unmount } = await mount(route);
    const text = container.textContent || '';
    const ok = text.length >= 40;
    if (!ok) failed++;
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${route.padEnd(26)} ${text.length} chars`);
    await unmount();
  } catch (e) {
    failed++;
    console.log(`  FAIL ${route.padEnd(26)} ${e.message}`);
  }
}

cap.restore();
const errors = cap.real();
errors.slice(0, 10).forEach(e => console.log('  · ' + e.slice(0, 240)));

const bad = failed + errors.length;
console.log(bad ? `\nROUTES FAILED (${failed} routes, ${errors.length} console errors)` : '\nROUTES PASSED');
process.exit(bad ? 1 : 0);
