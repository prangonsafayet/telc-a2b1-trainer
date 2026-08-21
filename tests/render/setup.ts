import { afterEach } from 'vitest';

import { installMemoryStorage } from '../support/memoryStorage.ts';

/**
 * What happy-dom does not implement but the app needs. Deliberately short: it already
 * provides matchMedia, both observers, scrollIntoView and pointer capture, so anything
 * still missing here is a hint that the behaviour belongs in the Playwright suite instead.
 */

/* React needs to know it is in a test, or `act` warns on every render. */
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

/* happy-dom ships no Storage, and the whole app persists through localStorage. */
installMemoryStorage();

/* A test that fails before it unmounts would otherwise leave its tree in the shared
   document, and the next test would query the wrong page and fail for the wrong reason. */
afterEach(() => {
  document.body.innerHTML = '';
});
