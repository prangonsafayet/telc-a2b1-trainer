# Pitfalls

Every entry here cost real debugging time in this repo. They are not hypothetical.

## Dates

`new Date('2026-09-12')` parses as **UTC midnight**, which is the previous day anywhere
west of Greenwich. Always use `parseIsoDate` / `toIsoDate` / `daysUntil` from
`@shared/lib/format.ts`.

The header countdown and the Settings hint once disagreed by a day because one rounded
from 09:00 and the other from midnight. They now share the same helper.

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
  pulled a second, nested Vite.
- **A blank page and `require_react is not a function` under Playwright** was
  `server.open: true` racing the dependency optimizer, plus `reuseExistingServer` serving
  a stale module graph. Both are fixed in config; do not reintroduce either.
- **jsdom needs Node ≥ 22.** On Node 20 the suites die with
  `webidl.util.markAsUncloneable is not a function`. `.nvmrc` pins 24.
