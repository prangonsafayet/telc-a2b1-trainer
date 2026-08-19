---
name: verify
description: Run this project's full verification pipeline (typecheck, lint, format check, exam-data validation, jsdom suites, Playwright) and report what failed. Use before committing, after a refactor, or when asked whether the app still works.
---

# Verify

Run these in order and **stop at the first failure** — later stages are meaningless
if typecheck is broken.

```bash
npm run typecheck        # tsc -b --noEmit
npm run lint             # ESLint, zero tolerance
npm run format:check     # Prettier
npm run validate         # the 10 exam data files
npm run test:unit        # jsdom suites
npm run test:e2e         # Playwright, Chromium + mobile
```

`npm test` chains the first five. Playwright needs browsers once:
`npx playwright install chromium`.

## Interpreting failures

- **Typecheck** — fix the types. Do not reach for `any`, a non-null assertion or a
  looser tsconfig. For third-party props that lack `| undefined`, use `optional()`
  from `@/shared/lib/optional-props.ts`.
- **Lint** — most import-order and formatting issues are `--fix`able. Boundary
  violations (`no-restricted-imports`) are design problems: move the shared thing
  into `src/shared`, or route the import through the feature's `index.ts`.
- **A jsdom route rendering ~8 characters** means the Suspense fallback never
  cleared — usually an import cycle, not a slow chunk. `tests/setup.js` waits for
  `aria-busy` to clear, so a genuine hang shows here.
- **Playwright only** failing, with jsdom green, points at layout, CSS, animation
  or real navigation — exactly what jsdom cannot see. Read the trace.

## Reporting

State plainly which stages passed and which failed, with the actual output for
failures. If everything passes, say so and note that appearance is only verified to
the extent Playwright asserts it — visual polish still needs a human look.
