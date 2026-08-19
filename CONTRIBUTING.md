# Development workflow

The loop for any change, from idea to released code. Participation is covered by the
[Code of Conduct](CODE_OF_CONDUCT.md), and security issues go through
[SECURITY.md](SECURITY.md) rather than a public issue.

## 1. Start from an issue

Every change begins as an issue, including your own. It is the place the _why_ is
recorded — a commit explains what changed, an issue explains why it was worth
changing.

Pick the template that fits: **Bug report**, **Feature request**, or **Exam content
correction** for a wrong or ambiguous item in one of the ten Modelltests.

Label it so the release notes group correctly (see `.github/release.yml`):

| Label           | Use for                             |
| --------------- | ----------------------------------- |
| `bug`           | Incorrect behaviour                 |
| `enhancement`   | New capability or improvement       |
| `content`       | Exam data, guide or study-plan text |
| `refactor`      | Structure with no behaviour change  |
| `tooling`, `ci` | Build, lint, tests, workflows       |
| `documentation` | README, CLAUDE.md, this file        |

## 2. Branch

```bash
git switch main && git pull
git switch -c fix/12-lesen-timer-stalls
```

`<type>/<issue-number>-<short-slug>`, where type is `fix`, `feat`, `refactor`,
`content`, `tooling` or `docs`. Never commit to `main` directly — it stays a branch
that always passes.

## 3. Build it

Read [`CLAUDE.md`](CLAUDE.md) first if you have not — it is short and points at the detail
under [`.claude/docs/`](.claude/docs/). The rules that matter most:

- Components are visual; logic goes in a `use-*.ts` hook or a pure `lib/` util.
- Use a shadcn primitive from `@shared/ui` — no raw `<button>`,
  `<input>`, `<select>`, `<textarea>`, `<table>` or `<label>` in feature code.
- Features do not import each other's internals or the app shell. If two features
  need the same thing, it belongs in `src/shared`.
- Primitives come from `@shared/ui`, never from a file inside it.
- No `any`, no non-null assertions.

The traps this codebase invites are catalogued in
[`.claude/docs/pitfalls.md`](.claude/docs/pitfalls.md) — worth a minute before touching
dates, timers, answers, auth or content.

Run the app while you work:

```bash
npm run dev
```

## 4. Test it

**Every bug fix gets a regression test.** That is not a formality here — the suites
have already caught an infinite render loop that only reproduced with no German
text-to-speech voice installed, and a timer that stalled whenever you typed.

Which layer:

- **Vitest `logic`** (`tests/unit/`) for pure functions — the schedule engine, date
  maths, response interpretation, content shape. Runs in Node; prefer a
  parameterised sweep over a spot check when the input is a range.
- **Vitest `render`** (`tests/render/`) for the app mounted in happy-dom — routes
  mounting, state persisting, content rendering as text vs HTML, a page re-shaping
  when its inputs change.
- **Playwright** (`e2e/`) for anything a DOM emulation cannot judge — layout, CSS,
  animation, real reload behaviour, popover positioning, network-level stubbing.

```bash
npm test           # typecheck, lint, exam data, both Vitest projects
npm run test:watch # Vitest in watch mode while you work
npm run test:e2e   # real browsers
```

Exam dates in tests are always seeded relative to today (`seedProgress({ daysUntilExam })`).
A hardcoded date passes today and silently becomes a "past-due" assertion next month.

## 5. Commit

Husky gates this:

- **pre-commit** — lints and formats staged files; a commit either lands clean or
  does not land.
- **pre-push** — typecheck, exam-data validation, both Vitest projects.

Message style: an imperative subject under ~72 characters, a blank line, then a body
that explains _why_ and calls out anything surprising. Reference the issue.

```
Fix the exam timer stalling while typing

The heartbeat effect depended on the whole run object, which changes on every
keystroke, so the interval was torn down and recreated before it could ever fire.
It now reads live values through refs and depends only on the phase and index.

Refs #12
```

No AI attribution — no `Co-Authored-By`, no "generated with" footer.

## 6. Open a pull request

```bash
git push -u origin HEAD
gh pr create --fill
```

The template asks what you verified. Fill it in honestly; "ran `npm test`" and
"clicked through it" are different claims. Include before/after screenshots for
visual changes.

CI runs typecheck, lint, format, data validation, the Vitest suites, Playwright on
Chromium, and a production build **with no secrets present** — which is what a fork
gets, and catches anything that silently depends on your local `.env`.

## 7. Review and merge

Review against the PR checklist. Look hardest at the things this codebase gets wrong
most easily:

- `new Date('YYYY-MM-DD')` instead of `parseIsoDate` — off by one west of Greenwich.
- Timer or interval effects depending on an object that changes per keystroke.
- Answer-map access without the `features/exam/lib/answers.ts` accessors.
- Anything touching passwords client-side.
- Authored HTML rendered as text, or content text injected as HTML.
- Primitives imported from `@shared/ui/<file>` instead of `@shared/ui`.

Every pull request also gets a **Netlify deploy preview**, so a visual change can be
clicked rather than imagined.

`main` is protected. A PR cannot merge until all four CI gates are green, the branch
is up to date with `main`, and every review conversation is resolved. Squash-merge so
`main` reads as one commit per change, then delete the branch.

## 8. The pipeline

Three systems, one responsibility each, deliberately not overlapping:

| Stage                       | Trigger                        | What it does                                                                            | What it does **not** do       |
| --------------------------- | ------------------------------ | --------------------------------------------------------------------------------------- | ----------------------------- |
| **CI** (`ci.yml`)           | every PR, every push to `main` | Four independent gates: static analysis, unit tests, end-to-end tests, production build | Never deploys, never versions |
| **Netlify**                 | push to `main`; PR (preview)   | Builds and deploys the site                                                             | Never runs the test suite     |
| **Release** (`release.yml`) | manual dispatch                | Verifies `main`, bumps the version, tags, publishes notes and a build tarball           | Never deploys directly        |

The four CI gates are separate jobs on purpose: they run in parallel, and a failure
names itself — "End-to-end tests" failing tells you something different from "Static
analysis" failing.

The release workflow re-runs the full suite even though CI already passed on the merge.
That is the one intentional overlap: a tag is a promise that the commit works, and it
costs a few minutes to keep that promise honest.

## 9. Versioning and releases

Semantic versioning, with the version living in `package.json` as the single source of
truth. It is injected into the bundle at build time and shown in the app footer
alongside the deployed commit, so "which build am I looking at?" is never a guess.

To release, run the **Release** workflow from the Actions tab and pick a bump:

| Bump    | When                                                                                                                                            |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `patch` | Bug fixes, copy, dependencies, internal refactors                                                                                               |
| `minor` | New capability, or **any change to exam timing, scoring or audio plays** — past attempts stop being comparable, and that deserves to be visible |
| `major` | A breaking change to stored progress or the persisted answer format                                                                             |

Releasing is two phases, because `main` is protected and requires a pull request — a
workflow that pushed the bump straight to `main` would simply be rejected, and giving the
Actions bot a bypass would put a hole in the gate that protects every other change.

1. **Release** (`release.yml`, manual dispatch) verifies `main` end to end, runs
   `npm version <bump>`, and opens a **release PR** from `release/vX.Y.Z`. A `dry-run`
   input verifies and prints the next version without opening anything.
2. Review and squash-merge that PR like any other. It has to clear the same four gates.
3. **Tag** (`tag-release.yml`) sees the new version land on `main`, creates the tag,
   publishes the GitHub release with notes generated from the merged PR labels, and
   attaches the built site. It is a no-op when the version is already tagged, so an
   ordinary dependency change that touches `package.json` does not accidentally release.
4. Netlify deploys that same merge commit, so the tag, the release, the version in the app
   footer and the deployed build all agree.

Do not bump the version by hand, and do not tag manually: the workflow is what keeps
the tag, the release notes, the version in the footer and the deployed build in step.

## Naming

Enforced by `check-file` rules in `eslint.config.js`, so a wrong name fails lint
rather than surviving review:

| Thing                        | Convention             | Example                               |
| ---------------------------- | ---------------------- | ------------------------------------- |
| Component / route module     | `PascalCase.tsx`       | `ExamCard.tsx`, `DashboardPage.tsx`   |
| Hook                         | `useThing.ts`          | `useExamRun.ts`, `useCountUp.ts`      |
| Util, config, types, context | `camelCase.ts`         | `attemptSummary.ts`, `runState.ts`    |
| Folder                       | `kebab-case`           | `exam-ui/`, `data-display/`           |
| Module constant              | `SCREAMING_SNAKE_CASE` | `EXAM_MODULES`, `MIN_PASSWORD_LENGTH` |
| Type / interface             | `PascalCase`           | `ExamRun`, `SignUpOutcome`            |
| Everything else              | `camelCase`            |                                       |

One exemption: `src/shared/components/ui/` stays kebab-case because the shadcn CLI
writes files there, and renaming them would break `npx shadcn add`.

Identifier casing is enforced separately by
`@typescript-eslint/naming-convention`, which allows PascalCase where a value is a
component or a namespace import, and permits `snake_case` / `UPPER_CASE` in type
properties that mirror external contracts (Supabase columns, `VITE_` env vars).

## Dependencies

```bash
npx ncu           # what is out of date
npx ncu -u        # bump package.json, then `npm install` and run the suite
```

Two majors are deliberately held back, in `.ncurc.json` and `.github/dependabot.yml`:

| Held                           | Why                                                                                                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `typescript` at 6.x            | `typescript-eslint` peers `typescript >=4.8.4 <6.1.0`. TypeScript 7 would silently disable type-aware linting, which is most of what the config buys. |
| `eslint` / `@eslint/js` at 9.x | `eslint-plugin-jsx-a11y` and `eslint-plugin-react` both peer at `eslint ^9`. ESLint 10 cannot be installed without dropping one of them.              |

Remove the entry once the plugins catch up — do not force it with `--legacy-peer-deps`.

**Bumping Playwright means bumping the CI image.** The end-to-end job runs inside
`mcr.microsoft.com/playwright:v<version>-noble`, which ships the browsers and every OS
library they need. Installing them on a bare runner instead means
`playwright install --with-deps` shelling out to apt for ~20 MB of fonts, which is slow
and has hung the job outright. The image tag is pinned in both workflows and a guard step
fails loudly if the dependency and the tag drift apart.

**Node 24 or newer.** `.nvmrc` pins it: the toolchain (Vite 8's rolldown binaries,
Vitest 4, happy-dom) is built against current Node, and GitHub has deprecated Node 20
on runners anyway.

**Never hand-edit `package-lock.json`, and never commit one produced by a partial
install.** CI runs `npm ci` on Linux, which needs the platform-specific native
binaries (`@rolldown/binding-linux-x64-gnu`, `@tailwindcss/oxide-linux-x64-gnu`,
`@unrs/resolver-binding-linux-x64-gnu`) recorded in the lockfile. A lockfile built up
by repeated `npm install -D one-package` on macOS can omit them, and `npm ci` then
fails with `Missing: … from lock file` while everything works locally. If that
happens, regenerate it:

```bash
rm -rf node_modules package-lock.json && npm install
```
