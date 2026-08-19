# Development workflow

The loop for any change, from idea to released code.

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

Read [`CLAUDE.md`](CLAUDE.md) first if you have not. The rules that matter most:

- Components are visual; logic goes in a `use-*.ts` hook or a pure `lib/` util.
- Use a shadcn primitive from `@/shared/components/ui` — no raw `<button>`,
  `<input>`, `<select>`, `<textarea>`, `<table>` or `<label>` in feature code.
- Features do not import each other's internals or the app shell. If two features
  need the same thing, it belongs in `src/shared`.
- No `any`, no non-null assertions.

Run the app while you work:

```bash
npm run dev
```

## 4. Test it

**Every bug fix gets a regression test.** That is not a formality here — the suites
have already caught an infinite render loop that only reproduced with no German
text-to-speech voice installed, and a timer that stalled whenever you typed.

Which layer:

- **jsdom** (`tests/`) for structure and behaviour — routes mounting, state
  persisting, content rendering as text vs HTML, pure logic.
- **Playwright** (`e2e/`) for anything jsdom cannot judge — layout, CSS, animation,
  real reload behaviour, popover positioning, network-level stubbing.

```bash
npm test           # typecheck, lint, format, exam data, jsdom
npm run test:e2e   # real browsers
```

## 5. Commit

Husky gates this:

- **pre-commit** — lints and formats staged files; a commit either lands clean or
  does not land.
- **pre-push** — typecheck, exam-data validation, jsdom suites.

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

CI runs typecheck, lint, format, data validation, the jsdom suites, Playwright on
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

Squash-merge so `main` reads as one commit per change, and delete the branch.

## 8. Release

Releases are tag-driven. Tag `main` once it is green:

```bash
git switch main && git pull
git tag -a v2.1.0 -m "Password sign-up and account-exists handling"
git push origin v2.1.0
```

`.github/workflows/release.yml` then re-runs the full suite plus Playwright, builds
the site, and publishes a GitHub release with notes generated from the merged PR
labels, attaching the built site as a tarball. A tag that does not pass does not
become a release.

Versioning: `MAJOR.MINOR.PATCH`, where a change to exam timing, scoring or the number
of audio plays is at least a MINOR — past attempts stop being comparable, and that
deserves to be visible in the version.

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

**Node 24 or newer.** `.nvmrc` pins it because jsdom calls
`webidl.util.markAsUncloneable`, which Node 20's bundled undici does not have — the
suites fail with `TypeError: webidl.util.markAsUncloneable is not a function` on
older runtimes. GitHub has deprecated Node 20 on runners anyway.

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

## 9. Deploy

Netlify builds from `main`. Before or after a release, walk the `ship` skill or
`.github`-adjacent notes:

- The build log must say `Supabase cloud sync will be enabled (…)`. `VITE_*` values
  are inlined at build time, so changing an environment variable requires a **new
  deploy** — setting it in the dashboard alone changes nothing.
- Supabase redirect URLs must list every origin you sign in from.
