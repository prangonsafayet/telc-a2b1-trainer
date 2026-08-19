<div align="center">
  <img src="public/logo.svg" alt="" width="76" height="76">
  <h1>telc Deutsch A2·B1 — Mock Exam Trainer</h1>
  <p><strong>Ten complete German exam simulations, under real timing, with official scoring.</strong></p>
  <p>
    <a href="https://github.com/prangonsafayet/telc-a2b1-trainer/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/prangonsafayet/telc-a2b1-trainer/actions/workflows/ci.yml/badge.svg"></a>
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">
  </p>
  <p>
    <img alt="React" src="https://img.shields.io/badge/React-18-087ea4?logo=react&logoColor=white">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white">
    <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white">
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white">
    <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Auth%20%2B%20Postgres-3ecf8e?logo=supabase&logoColor=white">
    <img alt="Playwright" src="https://img.shields.io/badge/Playwright-e2e-2ead33?logo=playwright&logoColor=white">
  </p>
</div>

---

I built this to sit the telc Deutsch A2·B1 exam. Practice material for it is
thin, and the material that exists does not simulate the thing that actually
makes the exam hard: doing five modules back to back, on the clock, with the
listening audio playing twice and no more.

So this is the exam, not a quiz app. Real time limits per module, automatic
submission when time runs out, a limited number of audio plays, and the official
grading rule — **B1 = ≥42/60 in three skills plus ≥24/60 in the fourth**.

## What it does

- **Fifteen full Modelltests**, ramping from early A2 to solid B1, covering all
  five modules: Leseverstehen, Sprachbausteine, Hörverstehen, Schreiben, Sprechen.
- **Real exam conditions.** Per-module countdowns that auto-submit, a play budget
  per listening item, and no preparation time in the speaking module.
- **Refresh-safe attempts.** The running exam — current module, every answer, the
  remaining time and the audio plays used — is written to browser storage as you
  go. Reload the tab, or come back after closing it, and it resumes exactly where
  you were.
- **Official scoring**, plus guided self-assessment for the two modules a human
  has to grade, against sample answers and telc-style criteria.
- **Full review** of any past attempt: every answer against the correct one, with
  the listening transcripts revealed only afterwards.
- **A study plan that adapts to your exam date.** Tell it when you sit the exam
  and it lays out one dated day at a time: a 28-day curriculum in twelve
  cheatsheets and copy-paste prompts that turn any AI chat into a tutor, examiner
  or speaking partner, then the mock exams. Three weeks left and it compresses the
  essentials and offers the rest as optional; three months and it spreads
  everything out with review days between. Five days and it becomes an emergency
  sprint. Nothing is ever hidden — only re-paced.
- **Progress that follows you.** Optional cloud sync behind Google, GitHub or
  email + password; without it everything stays local, and the app says so
  clearly rather than letting you assume otherwise.
- Light and dark mode, keyboard-accessible throughout, and a deep-linkable URL
  for every screen.

## Screens

<img src="docs/screenshots/dashboard.png" alt="Dashboard — today's plan, skill progress, score history and the mock exams">

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/runner.png" alt="Exam runner with a sticky countdown"></td>
    <td width="50%"><img src="docs/screenshots/results.png" alt="Results screen with the official grade"></td>
  </tr>
  <tr>
    <td><strong>Exam runner</strong> — per-module countdown that auto-submits, limited audio plays, and a briefing before each module.</td>
    <td><strong>Results</strong> — the official grade, per-skill breakdown against the B1 threshold, and time used per module.</td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/review.png" alt="Answer review with correct answers and transcripts"></td>
    <td><img src="docs/screenshots/dashboard-dark.png" alt="The dashboard in dark mode"></td>
  </tr>
  <tr>
    <td><strong>Review</strong> — every item marked, with the listening transcripts revealed only now.</td>
    <td><strong>Dark mode</strong> — follows the system, with a toggle, and no flash on load.</td>
  </tr>
</table>

## Engineering notes

The interesting parts, for anyone reading the code:

**Feature-sliced architecture with enforced boundaries.** `src/app` is the
composition root, `src/features` holds vertical slices that expose a public
surface through `index.ts`, `src/shared` holds feature-agnostic building blocks,
and `src/content` is inert data. The dependency rules are ESLint rules, not
documentation — a feature physically cannot reach into another feature's
internals or import the app shell. Wiring this up surfaced two real import
cycles, one of which was hanging a route.

**Components are visual; logic is in hooks and utils.** The exam state machine
lives in `useExamRun`, score derivation in `lib/attempt-summary.ts`, review
construction in `lib/review-items.ts`. A component that renders a screen reads a
hook and maps over data.

**Strict TypeScript**, including `noUncheckedIndexedAccess` and
`exactOptionalPropertyTypes`, with no `any` and no non-null assertions. The exam
data files are checked against the domain types with `satisfies`, so a malformed
Modelltest fails the build rather than the exam.

**Two test layers, because they catch different things.** Vitest runs the pure
logic in Node and the mounted app in happy-dom — 877 assertions in under five
seconds, including a sweep of the schedule engine across every runway length from
five days to ninety, and a check that an attempt survives a mid-module reload with
its clock still running. Playwright covers what no DOM emulation can judge: layout
at three breakpoints, dark-mode persistence, popover positioning, and that the
OAuth handoff is really PKCE rather than an implicit flow. Between them they
caught an infinite render loop that only reproduced on machines with no German
text-to-speech voice installed, a timer that stalled whenever you typed, and a
long study plan that banked nine review days in a row instead of spacing them.

**Auth done carefully.** PKCE so no token ever lands in a URL, a redirect target
built from the page's own origin, row-level security scoping every row to
`auth.uid()`, and a build-time guard that refuses to ship a secret key. Passwords
are Supabase's business — nothing is hashed or stored in the browser.

**Accessibility and motion.** shadcn/ui over Radix primitives throughout, no raw
interactive elements in feature code, and every animation behind
`prefers-reduced-motion` — an exam timer is not the place to fight the interface.

## Running it

Node 24+.

```bash
npm install
npm run dev          # http://localhost:5173
```

| Command            | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| `npm run build`    | Production build into `dist/`                             |
| `npm test`         | Typecheck, lint, validate exam data, Vitest suites        |
| `npm run test:e2e` | Playwright (needs `npx playwright install chromium` once) |
| `npm run test:all` | Everything                                                |

Cloud sync is optional. Copy `.env.example` to `.env` and fill in a Supabase
project URL and publishable key to enable it; leave it out and the app runs fully
offline on browser storage.

```dotenv
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon / publishable key>
VITE_AUTH_PROVIDERS=google,github
VITE_SITE_URL=https://your-deployment-url
```

`VITE_*` values are inlined at build time, so changing one needs a rebuild. The
Settings page reports exactly what the running build was compiled with, which
turns "why is sync off?" into a five-second answer.

## Notes

- Listening uses the browser's German text-to-speech; Chrome and Edge ship a good
  voice. Transcripts stay hidden until the review.
- The speaking module can record you locally so you can listen back. Recordings
  live in the tab and are never uploaded.
- Sprachbausteine is tracked separately, since in the real exam it feeds the
  reading and writing subtests rather than forming its own 60-point skill.
- `npm run validate` checks the ten data files. [`CLAUDE.md`](CLAUDE.md) documents
  the architecture and conventions, [`CONTRIBUTING.md`](CONTRIBUTING.md) the
  issue → branch → PR → release workflow, [`SECURITY.md`](SECURITY.md) how auth and data
  are protected, and [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) how to behave here.

---

<div align="center"><sub>Viel Erfolg bei der Prüfung 🍀</sub></div>
