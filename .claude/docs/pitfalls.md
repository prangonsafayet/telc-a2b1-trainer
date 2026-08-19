# Pitfalls

Every entry here cost real debugging time in this repo. They are not hypothetical.

## Dates

`new Date('2026-09-12')` parses as **UTC midnight**, which is the previous day anywhere
west of Greenwich. Always use `parseIsoDate` / `toIsoDate` / `daysUntil` from
`@shared/lib/format.ts`.

The header countdown and the Settings hint once disagreed by a day because one rounded
from 09:00 and the other from midnight. They now share the same helper.

## The schedule

`daysUntil` reads the clock; `daysBetween` does not. Schedule maths uses `daysBetween` and
takes `today` as an argument — a pure engine is the only reason the invariants can be swept
across every runway length in a unit test.

`addDays` builds the new date from its parts rather than adding 86_400_000 ms, so a DST
boundary cannot turn "+1 day" into "same day, 23:00".

The tier rule is load-bearing: core days 1–14 are always scheduled, compressed several to a
day if the runway is short, and extension days 15–28 only appear once every core day has a
day of its own. Anything that changes lesson selection has to preserve that, and the sweep
test will say so if it does not.

A hardcoded default exam date rots. `defaultExamDate()` is a runway from first open, because
a fixed date turns every new user past-due the day it passes.

## Timers

The exam clock stores an **absolute `deadline`**, not a countdown, so it stays correct
across a reload.

Its interval must not depend on the whole run object. That object changes on every
keystroke, so the effect tore the interval down and recreated it before it could ever
fire — the clock silently stalled while typing in the writing module. Read live values
through refs and depend only on `phase` and `index`.

## Answers

The answer map is flat and stringly-keyed (`l1.0`, `h5.2`, `w.text`) because it is
persisted and must stay readable by older and newer builds. **Do not change the key
format.** Read values through the accessors in `features/exam/lib/answers.ts`, which
narrow a stored value to what a given input expects.

## Auth

Never hash, store or log a password in the browser. Supabase Auth owns credentials and
keeps a server-side bcrypt hash.

Supabase **obscures whether an email already exists**, so `signUp` returning "success"
with no session can mean either "we emailed you" or "this account already exists". The
only signal is an empty `identities` array — see `signUpOutcome.ts`. Reading it naively
told existing users to check an inbox nothing was sent to.

`signUp` is documented to resend a confirmation but is rate limited and silently does
nothing once the window is hit. Use `auth.resend` explicitly.

## Environment variables

`VITE_*` values are **inlined at build time**. Changing one requires a rebuild or a dev
server restart; setting it in a hosting dashboard does not update an already-built site.
The Settings panel reports what the running build was compiled with, which turns "why is
sync off?" into a five-second answer.

## Content

`GUIDE_HTML`, `LEARN.intro` and each `cheatsheets[].html` are repo-authored HTML and are
**injected**. Every other content string is plain text and must render as text.
`tests/content-render` guards both directions — a `<b>` once shipped visible on the Learn
page because the field moved from an injected template to a text node.

## Speech synthesis

`speechSynthesis.getVoices()` returns a fresh array every call. Reading it during render
set state, re-rendered, re-read, and looped forever — on machines with **no** German voice
installed, which is exactly where it was least likely to be noticed. It is now read
through `useSyncExternalStore`.

## Tooling traps

- **`npm ci` failing with `Missing: … from lock file` while local installs work** means
  the lockfile lacks other platforms' native binaries. Regenerate it:
  `rm -rf node_modules package-lock.json && npm install`. It happened because `vite-node`
  pulled a second, nested Vite — which is one reason the suites now run on Vitest instead.
- **A blank page and `require_react is not a function` under Playwright** was
  `server.open: true` racing the dependency optimizer, plus `reuseExistingServer` serving
  a stale module graph. Both are fixed in config; do not reintroduce either.
- **The toolchain needs Node ≥ 22, and `.nvmrc` pins 24.** Vite 8's rolldown binaries,
  Vitest 4 and happy-dom are all built against current Node.
- **ESLint flat config only lints extensions a `files` pattern names.** A directory
  pattern like `tests/**/*` counts as universal and opts none in, so `.ts` files under it
  were silently skipped with "File ignored because no matching configuration was supplied".
  List the extensions.
- **A `*/` inside a block comment closes it.** Writing a glob such as `tests/**/*` in a
  `/* ... */` comment in `eslint.config.js` truncates the comment and breaks the config
  with `SyntaxError: Unexpected token '*'`.
- **react-day-picker marks its month navigation with `aria-disabled`, not `disabled`.**
  Day cells use both (`<td data-disabled>` plus a real `disabled` button), so a test that
  checks only one attribute will conclude the constraint is not applied when it is.
