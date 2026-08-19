# Testing

Two layers, both required, because they catch different things.

## jsdom suites — `tests/`, run by `vite-node`

Fast structural and logical checks:

| Suite             | Covers                                           |
| ----------------- | ------------------------------------------------ |
| `routes`          | every route mounts, with no React warnings       |
| `content-render`  | authored HTML is injected, plain text stays text |
| `auth-visibility` | the signed-out warnings appear everywhere        |
| `sign-up-outcome` | every shape Supabase's sign-up response can take |
| `exam-date`       | timezone helpers, and the calendar's dropdowns   |
| `exam-flow`       | a full attempt, including a mid-module reload    |

`tests/setup.js` holds the browser shims. Radix needs `ResizeObserver`,
`MutationObserver`, pointer-capture and `scrollIntoView`; `localStorage` must exist as a
**global** or storage silently no-ops and every persistence assertion passes vacuously.

`mount()` waits for `aria-busy` to clear rather than sleeping — a lazily-loaded route can
take longer than a fixed timeout, and a route rendering ~8 characters means the Suspense
fallback never cleared, which is usually an import cycle rather than a slow chunk.

## Playwright — `e2e/`

Anything jsdom cannot judge: layout at three breakpoints, dark-mode persistence, real
reload behaviour, popover positioning, and network-level stubbing (the sign-up specs stub
Supabase to drive each outcome deterministically).

The **Playwright MCP** plugin is also available for interactive checks — drive the running
app directly instead of writing a throwaway spec.

## Rules

- A bug fix ships with a regression test in the layer that would have caught it.
- Appearance claims need a Playwright test or a real browser look, never a passing jsdom
  test.
- Assert on roles, not classes. The exam timer is `getByRole('timer')`; it used to be
  `span.font-mono`, which broke the moment the footer gained a monospaced version badge.
