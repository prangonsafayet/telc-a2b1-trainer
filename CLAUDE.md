# CLAUDE.md

Guidance for working in this repository.

## What this is

A React study app with 10 full mock exams for the **telc Deutsch A2·B1** German
exam. It runs timed modules, scores them by the official rules, and stores
progress locally with optional cloud sync. It is also a portfolio project, so
code quality and presentation matter as much as features.

## Commands

| Command                     | Purpose                                           |
| --------------------------- | ------------------------------------------------- |
| `npm run dev`               | Dev server (Vite) on :5173                        |
| `npm run build`             | Production build into `dist/`                     |
| `npm run preview`           | Serve the production build                        |
| `npm test`                  | typecheck → lint → data validation → jsdom suites |
| `npm run typecheck`         | `tsc -b --noEmit`                                 |
| `npm run lint` / `lint:fix` | ESLint                                            |
| `npm run format`            | Prettier                                          |
| `npm run validate`          | Check the 10 exam data files                      |
| `npm run test:unit`         | jsdom suites only                                 |
| `npm run test:e2e`          | Playwright (Chromium + a mobile profile)          |
| `npm run test:all`          | Everything                                        |
| `npm run images`            | Rasterise the SVG sources into favicon/OG PNGs    |

`npm test` must pass before anything is committed. `npm run test:e2e` needs
browsers once: `npx playwright install chromium`.

## Architecture

```
src/app        composition root — providers, router, layout. May import anything.
src/features   vertical slices, each with components/ hooks/ lib/ routes/ and an
               index.ts naming its public surface.
src/shared     reusable building blocks — ui/ primitives, composed components,
               hooks, lib, config, types, providers. Feature-agnostic.
src/content    inert data — the 10 exams, the guide HTML, the 14-day plan.
```

**The dependency rules are enforced by ESLint, not by convention:**

- A feature must not import another feature's internals. Go through
  `@/features/<name>` (its `index.ts`).
- A feature must not import `@/app/**` — that inverts the dependency direction.
- `src/shared` must not import features or the app.
- `src/content` must not import application code at all.

Two consequences worth remembering:

- **Route components are not exported from feature barrels.** The router
  deep-imports them (`@/features/exam/routes/RunnerPage.tsx`) so that importing
  the exam domain does not drag three screens and their dependencies along. An
  earlier version did export them and produced an import cycle that hung the
  settings route.
- If two features need the same thing, it belongs in `src/shared`, not in
  whichever feature happened to define it first. That is why the confirm dialog,
  the speech layer and the score-history chart live there.

## Conventions

**Components are visual only.** Logic goes in a hook (`use-*.ts`) or a pure util
in `lib/`. A component may hold trivial UI state (an open/closed flag) but
anything derived, persisted, timed or networked belongs outside it. See
`useExamRun`, `useDashboardStats`, `buildReviewSections`, `summarizeAttempt`.

**Use a shadcn primitive when one exists.** No raw `<button>`, `<input>`,
`<select>`, `<textarea>`, `<table>` or `<label>` in feature code — import from
`@/shared/components/ui`. The primitives themselves are the exception: they wrap
Radix and own their own logic. If a primitive is missing, add it to
`src/shared/components/ui` in the same style rather than reaching for raw HTML.

**Naming.** Files: `PascalCase.tsx` for components, `kebab-case.ts` for hooks,
libs and types. Hooks are `use-thing.ts` exporting `useThing`. Identifiers are
camelCase, PascalCase for components/types/namespaces, UPPER_CASE for module
constants. Imports use the `@/` alias with explicit `.ts`/`.tsx` extensions.

**Types.** Strict mode plus `noUncheckedIndexedAccess` and
`exactOptionalPropertyTypes`. No `any`, no non-null assertions — narrow instead.
Domain types live in `src/shared/types`; the exam files are checked against them
with `satisfies`. When a third-party prop type lacks `| undefined`, use
`optional()` from `@/shared/lib/optional-props.ts` rather than loosening tsconfig.

## Things that are easy to get wrong

- **Dates.** `new Date('2026-09-12')` is UTC midnight, which is the previous day
  west of Greenwich. Always use `parseIsoDate` / `toIsoDate` / `daysUntil` from
  `@/shared/lib/format.ts`.
- **The exam clock** stores an absolute `deadline`, not a countdown, so it stays
  correct across a reload. Its interval must not depend on the whole run object —
  that restarts it on every keystroke and stalls the clock.
- **Answers** are a flat, stringly-keyed map (`l1.0`, `h5.2`, `w.text`) because
  they are persisted and must stay readable by older and newer builds. Read them
  through the accessors in `features/exam/lib/answers.ts`.
- **`VITE_*` values are inlined at build time.** Changing an env var requires a
  rebuild or a dev-server restart; setting one in a hosting dashboard does not
  update an already-built site. The Settings panel reports what the running build
  was compiled with.
- **Never hash or store a password in the browser.** Supabase Auth owns
  credentials and keeps a server-side bcrypt hash. Only the anon/publishable key
  ships; a `sb_secret_`/`service_role` key is rejected at build time and at
  runtime.
- **Authored HTML vs text.** `GUIDE_HTML`, `LEARN.intro` and each
  `cheatsheets[].html` are repo-authored HTML and are injected. Every other
  content string is plain text and must render as text. `tests/content-render`
  guards this both ways.

## Testing

Two layers, both required:

- **jsdom suites** (`tests/`, run by `vite-node`) — fast structural checks:
  every route mounts without warnings, an attempt survives a mid-module reload,
  content does not leak literal tags, the signed-out warnings appear, and the
  date helpers behave. `tests/setup.js` holds the browser shims; Radix needs
  `ResizeObserver`, `MutationObserver`, pointer-capture and `scrollIntoView`, and
  `localStorage` must exist as a global or storage silently no-ops.
- **Playwright** (`e2e/`) — anything jsdom cannot judge: layout, CSS, animation,
  real reload behaviour, popover positioning, and that the OAuth handoff really
  is PKCE.

Add a regression case for every bug fixed. The suites have already caught an
infinite render loop that only occurred with no German TTS voice installed, and a
timer that stalled while typing.

## Commits

No AI attribution — no `Co-Authored-By`, no "generated with" footer. Write the
message as the author.
