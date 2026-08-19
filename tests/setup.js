/* Minimal browser environment for rendering the app in Node.
   Keep this in sync with the browser APIs the trainer actually touches. */
import { JSDOM } from 'jsdom';

export const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true
});

const w = dom.window;

global.window = w;
global.document = w.document;
Object.defineProperty(global, 'navigator', { value: w.navigator, configurable: true, writable: true });
Object.defineProperty(global, 'localStorage', { value: w.localStorage, configurable: true });
Object.defineProperty(global, 'sessionStorage', { value: w.sessionStorage, configurable: true });
global.location = w.location;
global.getComputedStyle = w.getComputedStyle;
global.DOMRect = w.DOMRect || class {};
global.MutationObserver = w.MutationObserver;
global.requestAnimationFrame = cb => setTimeout(cb, 0);
global.cancelAnimationFrame = clearTimeout;

for (const k of [
  'HTMLElement',
  'Element',
  'Node',
  'HTMLFormElement',
  'HTMLInputElement',
  'HTMLButtonElement',
  'HTMLSelectElement',
  'HTMLTextAreaElement',
  'HTMLAnchorElement',
  'Event',
  'KeyboardEvent',
  'MouseEvent',
  'PointerEvent',
  'CustomEvent',
  'DocumentFragment',
  'SVGElement',
  'NodeFilter'
]) {
  if (w[k]) global[k] = w[k];
}

/* jsdom ships neither observer; Radix and the layout both expect them. */
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = NoopObserver;
global.IntersectionObserver = w.IntersectionObserver || NoopObserver;
w.ResizeObserver = global.ResizeObserver;
w.IntersectionObserver = global.IntersectionObserver;

w.matchMedia = () => ({
  matches: false,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {}
});
global.matchMedia = w.matchMedia;
w.scrollTo = () => {};

/* Pointer capture and scrollIntoView are unimplemented in jsdom but called by Radix. */
Element.prototype.scrollIntoView = () => {};
Element.prototype.hasPointerCapture = () => false;
Element.prototype.setPointerCapture = () => {};
Element.prototype.releasePointerCapture = () => {};

global.IS_REACT_ACT_ENVIRONMENT = true;
w.IS_REACT_ACT_ENVIRONMENT = true;

/* Shared render helpers. */
const React = (await import('react')).default;
const { createRoot } = await import('react-dom/client');
const { act } = await import('react');
const { MemoryRouter } = await import('react-router-dom');
const { AppRouter } = await import('../src/app/router.tsx');
const { ProgressProvider } = await import('../src/features/progress/index.ts');
const { ConfirmProvider } = await import('../src/shared/providers/ConfirmProvider.tsx');

export { React, act };

export async function mount(route) {
  const container = w.document.createElement('div');
  w.document.body.appendChild(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(
      React.createElement(
        ProgressProvider,
        null,
        React.createElement(
          ConfirmProvider,
          null,
          React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(AppRouter))
        )
      )
    );
  });
  /* Routes are lazily loaded and the heavier chunks take longer than a fixed sleep would
     allow, so wait for the Suspense fallback to actually go away. */
  await waitFor(() => !container.querySelector('[aria-busy="true"]'));
  return {
    container,
    async unmount() {
      await act(async () => {
        root.unmount();
      });
      container.remove();
    }
  };
}

export const settle = (ms = 80) =>
  act(async () => {
    await new Promise(r => setTimeout(r, ms));
  });

/** Polls `predicate` until it is true or the timeout elapses. */
export async function waitFor(predicate, { timeout = 3000, interval = 25 } = {}) {
  const deadline = Date.now() + timeout;
  for (;;) {
    await settle(interval);
    if (predicate()) return true;
    if (Date.now() > deadline) return false;
  }
}

export const findByText = (re, sel = 'button') =>
  [...w.document.querySelectorAll(sel)].find(el => re.test(el.textContent || ''));

export async function click(el) {
  await act(async () => {
    el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  });
  await settle(60);
}

/* Collects console.error output so a test can fail on React warnings. */
export function captureErrors() {
  const errors = [];
  const orig = console.error;
  console.error = (...a) => {
    errors.push(a.map(String).join(' '));
  };
  return {
    restore() {
      console.error = orig;
    },
    real() {
      return errors.filter(
        e => !/not wrapped in act|ReactDOMTestUtils|not configured to support act/.test(e)
      );
    }
  };
}
