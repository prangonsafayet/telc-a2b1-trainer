# Testing

Two layers, both required, because they catch different things.

## Vitest — `tests/`

One command, two projects (`vitest.config.ts`):

| Project  | Where           | Environment | For                                                     |
| -------- | --------------- | ----------- | ------------------------------------------------------- |
| `logic`  | `tests/unit/`   | node        | pure functions — no DOM, no React, milliseconds         |
| `render` | `tests/render/` | happy-dom   | the app mounted for real, to prove a page renders right |

```bash
npm run test:unit    # both projects
npm run test:logic   # just the pure logic
npm run test:render  # just the mounted pages
npm run test:watch   # vitest in watch mode
```

| Suite                     | Covers                                                        |
| ------------------------- | ------------------------------------------------------------- |
| `unit/schedule`           | the plan engine, swept across all 86 plannable runways        |
| `unit/distribute`         | the bucketing helpers the engine compresses with              |
| `unit/format`             | date maths, including DST and leap days                       |
| `unit/signUpOutcome`      | every shape Supabase's sign-up response can take              |
| `unit/content`            | curriculum and exam-list shape the engine trusts              |
| `unit/runStore`           | the run in progress, in both storage shapes it has had        |
| `render/routes`           | every route mounts with no React warning                      |
| `render/contentInjection` | authored HTML is injected, never shown as text                |
| `render/authVisibility`   | the signed-out warnings appear everywhere                     |
| `render/examDate`         | the date window is enforced, not merely suggested             |
| `render/examFlow`         | a full attempt, including a mid-module reload                 |
| `render/examFinish`       | the finish path acts on submit, not inside a state updater    |
| `render/schedulePlan`     | the pages re-shape with the exam date, all fallbacks included |

**No jsdom.** happy-dom provides `matchMedia`, both observers, `scrollIntoView` and
pointer capture out of the box, so `tests/render/setup.ts` only adds React's act flag and
an in-memory `Storage` — happy-dom ships none, and without it every persistence assertion
would pass vacuously. Anything that needs a genuine browser belongs in Playwright.

`mount()` in `tests/render/harness.ts` waits for `aria-busy` to clear rather than
sleeping: a lazily-loaded route can outlast any fixed timeout, and a route that renders
~8 characters means the Suspense fallback never cleared — usually an import cycle rather
than a slow chunk.

Three things the harness exists to stop you re-learning:

- `seedProgress({ daysUntilExam })` writes the stored document **before** mounting, and
  always relative to today. A suite that hardcodes an exam date passes now and turns
  "past-due" a month later.
- `typeInto()` goes through the native value setter. React tracks the previous value on
  the node, so assigning `element.value` directly is swallowed as a no-op.
- `blur()` dispatches `focusout`, because that is what React's `onBlur` listens to.

The render setup clears `document.body` after every test: a test that fails before it
unmounts would otherwise leave its tree behind and make the next one fail for the wrong
reason.

## Playwright — `e2e/`

Anything happy-dom cannot judge: layout at three breakpoints, dark-mode persistence, real
reload behaviour, popover positioning, and network-level stubbing (the sign-up specs stub
Supabase to drive each outcome deterministically). Runs on Chromium and a Pixel 7 profile.

The **Playwright MCP** plugin is also available for interactive checks — drive the running
app directly instead of writing a throwaway spec.

## Rules

- A bug fix ships with a regression test in the layer that would have caught it.
- Appearance claims need a Playwright test or a real browser look, never a passing unit
  test.
- Assert on roles, not classes. The exam timer is `getByRole('timer')`; it used to be
  `span.font-mono`, which broke the moment the footer gained a monospaced version badge.
- Prefer a parameterised sweep to a spot check when the input is a range. The schedule
  suite runs every runway from 5 to 90 days, which is how the review-day clumping bug and
  the emergency-plan edge case were both found.
