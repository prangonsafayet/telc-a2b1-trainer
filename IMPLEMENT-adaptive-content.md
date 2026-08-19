# Implement: adaptive schedule + expanded lessons (28 days) + expanded mock exams (15) + tests

You are working in the **telc-a2b1-trainer** repo (React 19 + Vite + TypeScript, Tailwind/shadcn, strict ESLint). This document is a complete, self-contained work order. Read it fully before writing code. A companion design doc, `PLAN-adaptive-schedule.md`, sits in the repo root — follow it where it goes deeper; where the two disagree, THIS file wins (it supersedes the plan's 14-day/10-exam counts).

## Mission

1. **Adaptive schedule engine** — the user's exam date (already stored as `settings.examDate`, `YYYY-MM-DD`, local time) drives everything. Days remaining are clamped to **min 5, max 90**. The learn plan and mock-exam pacing compress or stretch to fit.
2. **Expand the curriculum from 14 to 28 authored lesson days** in `src/content/learn.ts` (days 15–28 are a B1-deepening "extension tier").
3. **Expand the mock exams from 10 to 15** (`exam11.ts`–`exam15.ts`, difficulty `b1`).
4. **Automated tests** proving the schedule adapts correctly and the new content is valid.

## Hard constraints — violate none of these

- **Never change the `learnDone` key scheme** (`d<day>t<index>`) or the shape of `ProgressDatabase` / `Settings` / `Attempt` in `src/shared/types/progress.ts`. Existing users' localStorage and Supabase rows must keep working. New lesson days simply extend the day numbering (d15…d28).
- **No Supabase / sync / auth changes.** The schedule is derived at runtime, never persisted. Do not touch `features/auth/`.
- **The schedule engine must be a pure function.** No `Date.now()`/`new Date()` inside it — `today` is a parameter. All date math via the existing helpers in `src/shared/lib/format.ts` (`parseIsoDate`, `toIsoDate`, `daysUntil`).
- **All existing tests, `npm run validate`, `npm run typecheck`, and `npm run lint` must stay green after every phase.** Work phase by phase; commit per phase.
- Follow the existing code style exactly: `readonly` types, `@/` path aliases with explicit `.ts`/`.tsx` extensions, feature-folder layout (`features/<name>/{components,hooks,lib,routes}`), authored-content patterns in `src/content/`.

---

## Phase 1 — Schedule engine (pure logic + unit tests, no UI)

### 1a. Constants — new file `src/shared/config/schedule.ts`

```ts
export const MIN_PREP_DAYS = 5;
export const MAX_PREP_DAYS = 90;
export const CORE_LEARN_DAYS = 14; // days 1–14: the essential curriculum
export const EXTENSION_LEARN_DAYS = 14; // days 15–28: B1 deepening, only for long plans
export const TOTAL_LEARN_DAYS = 28;
export const MOCK_EXAM_COUNT = 15;
export const MAX_EXAMS_PER_DAY = 2; // a full mock is ~2.5 h; never schedule 3
```

### 1b. Engine — new file `src/features/plan/lib/build-schedule.ts`

```ts
export interface ScheduleInput {
  readonly examDate: string; // settings.examDate
  readonly today: string; // YYYY-MM-DD, injected
  readonly learnDone: LearnDoneMap; // schedule only remaining work
  readonly attemptedExamIds: ReadonlySet<number>;
}

export interface ScheduleSlot {
  readonly date: string; // YYYY-MM-DD
  readonly dayOffset: number; // 0 = today
  readonly learnDays: readonly number[]; // LEARN day numbers in this slot
  readonly examIds: readonly number[]; // mock exam ids in this slot
  readonly kind: 'learn' | 'mock' | 'mixed' | 'review' | 'exam-eve';
}

export interface Schedule {
  readonly daysLeft: number; // raw daysUntil(examDate)
  readonly effectiveDays: number; // clamp(daysLeft, MIN, MAX)
  readonly clamped: 'none' | 'below-min' | 'above-max';
  readonly phase: 'learn' | 'mock' | 'final-sprint' | 'past-due';
  readonly slots: readonly ScheduleSlot[];
  readonly todaySlot: ScheduleSlot | null;
  readonly unscheduledExamIds: readonly number[]; // shown as "optional / if time allows"
}
```

**Algorithm (deterministic — same input, same output; no randomness):**

1. `effectiveDays = clamp(daysUntil(examDate), 5, 90)`. Set `clamped` accordingly. If `daysUntil < 0` → `phase: 'past-due'`, empty slots, return early. If `0 <= daysUntil < 5` → `phase: 'final-sprint'`: build the 5-day emergency plan (step 6) truncated to the days actually left.
2. Reserve the final slot as `exam-eve` (light review: writing + speaking cheatsheets, Day-28 material; no new lessons, no mocks). `workDays = effectiveDays - 1`.
3. Split `workDays` between learn and mock phases in the ratio **28 : 18** (28 lesson days; 15 mocks + 3 review days), i.e. `learnSlots = round(workDays * 28 / 46)`, then clamp so `learnSlots >= 1` and `mockSlots = workDays - learnSlots >= 2`.
4. **Lesson selection & compression — the tier rule:**
   - Remaining lesson days = LEARN days not yet complete (a day is complete when all its task checkboxes `d<day>t<i>` are true).
   - If `learnSlots >= remaining core + remaining extension`, schedule all 28 one per slot, extras become `review` slots interleaved after every 7 lesson days.
   - If `learnSlots < remaining total`, **core days (1–14) always win**: schedule all remaining core days first (compressed round-robin into the available slots, e.g. 14 days into 5 slots → chunks 3/3/3/3/2, preserving order), then fill any leftover capacity with extension days _in order_. Extension days that don't fit are simply not scheduled (they stay visible on the Learn page under "Extra material", unscheduled).
   - Short plans therefore compress the core 14 — they never cram all 28.
5. **Mock distribution:** unattempted exams in id order (ids are easiest-first) across `mockSlots`: one per slot when they fit, plus a `review` slot after every 3rd exam if there's room; else up to `MAX_EXAMS_PER_DAY` per slot; exams that still don't fit go into `unscheduledExamIds` (never hidden, just unplanned).
6. **5-day emergency plan** (also used by final-sprint): slot 1 = crash course (learn days 1 + 13 material, kind `learn`), slots 2–4 = one exam each (ids 1, 8, 15 — easy/medium/hard spread; skip attempted ones, pull the next unattempted of similar difficulty), slot 5 = `exam-eve`.
7. `phase` is `'learn'` while any learn slot is today or in the future and unfinished core days remain, else `'mock'`.

### 1c. Hook — new file `src/features/plan/hooks/use-schedule.ts`

Memoize `buildSchedule` over `db.settings.examDate`, `db.learnDone`, `db.attempts`. Maintain a `today` state (ISO string) refreshed by a timer set to the next local midnight **and** on `visibilitychange` — the SPA stays open across days. Export via a `src/features/plan/index.ts` barrel, matching the other features.

### 1d. Unit tests — new file `tests/schedule.test.js`

Follow the existing test style (`vite-node`, console check/exit-code pattern — see `tests/exam-date.test.js`). Add script `"test:schedule": "vite-node tests/schedule.test.js"` to package.json and wire it into `test:unit`. Cover, at minimum:

- **Invariants swept across every `effectiveDays` in 5…90** (loop, cheap): slot count === effectiveDays; last slot is `exam-eve`; slot dates are consecutive starting at `today`; no slot exceeds `MAX_EXAMS_PER_DAY`; every scheduled learn day appears exactly once; core days 1–14 are all scheduled whenever nothing is completed; extension days only appear when all remaining core days are scheduled uncompressed capacity remains; determinism (two calls, deep-equal).
- **Clamping:** date 3 days out → `final-sprint`; date yesterday → `past-due` with empty slots; date 120 days out → `effectiveDays === 90`, `clamped === 'above-max'`.
- **Adaptivity:** mark days 1–10 complete → they are not rescheduled and the freed capacity goes to extension days / reviews; mark exams 1–14 attempted → only exam 15 is scheduled; everything done → all slots `review`.
- **Ratio sanity:** at 90 days, all 28 lessons and all 15 exams are scheduled with reviews; at 14 days, all core days are scheduled compressed and ≥ 5 exams fit; at 5 days, the emergency plan shape holds.

**Also update `tests/exam-date.test.js`** after Phase 4 changes the picker (see below).

---

## Phase 2 — Curriculum expansion: LEARN days 15–28

Edit `src/content/learn.ts`. Keep days 1–14 **byte-identical** (users' checkbox history maps to them). Append days 15–28 following the exact existing shape (`day`, `title`, `focus`, `tasks` [3 strings], `cheats` [existing or new cheatsheet keys], `ai` [1–2 prompts, `t` + `p`]). Also add a `tier` field:

- Extend `LearnDay` in `src/shared/types/learn.ts` with `readonly tier: 'core' | 'extension';` and set `tier: 'core'` on days 1–14, `'extension'` on 15–28. (Additive content-type change — persisted data is untouched.)

**Add 4 new cheatsheets** (same `Record` in `learn.ts`; keys must not collide with the existing 8: `cases, verbs, connectors, writing, speaking, listening, vocab, modal`):

| key           | title                        | must cover                                                                                                                                       |
| ------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `nebensaetze` | Relativsätze & Nebensätze II | relative pronouns der/die/das/denen in Nom/Akk/Dat, wo/was; indirect questions (ob, W-Fragen); als vs. wenn                                      |
| `passivkii`   | Passiv & Konjunktiv II       | werden-Passiv (present + Präteritum), man-alternative; KII: wäre/hätte/könnte/würde + irreale Bedingungen (Wenn ich … hätte, würde ich …)        |
| `verbpraep`   | Verben mit Präpositionen     | the ~20 telc-relevant pairs (warten auf + Akk, sich freuen über/auf, denken an, sich interessieren für …) with case, plus da(r)-/wo(r)-Komposita |
| `formal`      | Formelle Briefe & E-Mails    | Sie-register skeleton, Bitte um Information/Termin, Beschwerde, Entschuldigung; formal connectors (bezüglich, daher, außerdem)                   |

**Day-by-day outline for 15–28** (author real tasks and AI prompts in the established voice — concrete, imperative, 60–90 min/day; German terms where natural; AI prompts self-contained so any chat AI can act as tutor):

- **15 — Reading II: detail comprehension.** Lesen Teil 2+4 tactics under time; vocab fields 6–10 flashcards. cheats: `vocab`.
- **16 — Grammar upgrade I: Nebensätze & Relativsätze.** Write 12 own sentences; transform main clauses into relatives. cheats: `nebensaetze`, `connectors`.
- **17 — Listening II: interviews & notes.** Hören Teil 4/5 tactics; dictation drill via AI prompt (numbers, names, times). cheats: `listening`.
- **18 — Writing II: the formal register.** One formal email (Terminanfrage) + one Beschwerde, self-scored with the writing criteria. cheats: `formal`, `writing`.
- **19 — Grammar upgrade II: Passiv & Konjunktiv II.** Drills + 10 polite-request transformations. cheats: `passivkii`.
- **20 — Speaking II: opinions with structure.** Teil 2 with einerseits/andererseits, Vor-/Nachteile; record and listen back. cheats: `speaking`.
- **21 — Error clinic I.** Redo every wrong item from attempts so far (Review pages); build a personal error list; AI debrief prompt pasting their mistakes. cheats: none.
- **22 — Sprachbausteine mastery.** Verben mit Präpositionen + gap tactics; 20-gap AI drill. cheats: `verbpraep`.
- **23 — Reading III: full module under exam timing.** Strategy: order of Teile, time boxing, guessing policy. cheats: `vocab`.
- **24 — Listening III: numbers bootcamp.** Times/dates/prices/correction-signals; AI dictation at increasing speed. cheats: `listening`.
- **25 — Writing III: three timed emails.** 3 × 10-minute emails (privat, halbformell, formell), all self-scored. cheats: `writing`, `formal`.
- **26 — Speaking III: full simulation.** All three Teile in one recorded 15-minute run; AI plays the partner. cheats: `speaking`.
- **27 — Vocabulary consolidation.** Personal top-100 list across all 10 fields; spaced-repetition AI quiz. cheats: `vocab`.
- **28 — Generalprobe.** Re-read all cheatsheets; speaking script 5×; plan the mock phase; early night. cheats: all four new ones. _(This day doubles as the `exam-eve` slot material.)_

**Update `tests/content-render.test.js`** to assert: `LEARN.days.length === 28`, day numbers are 1–28 with no gaps, every `cheats` key exists in `LEARN.cheatsheets`, every day has ≥ 3 tasks and ≥ 1 AI prompt, tiers are core×14 + extension×14.

---

## Phase 3 — Mock exams 11–15

Create `src/content/exams/exam11.ts` … `exam15.ts` and register them in `src/content/exams/index.ts` (import + add to `EXAMS`; the array is sorted by id, easiest first, so the new B1-heavy tests land at the end).

**Before authoring, read `src/content/exams/exam01.ts` and `src/content/exams/exam10.ts` end-to-end** to absorb the exact authoring wrapper (`const exam = { … } as const satisfies Exam; export default exam;`), tone, item length, and difficulty ramp. The type contract is `Exam` in `src/shared/types/exam.ts`. The structural rules are enforced by `validate.cjs` — run `npm run validate` after each exam file; it must pass with zero errors (heed its warnings too). Key counts it enforces: Lesen 5 situations/8 ads, 2 texts/5 questions, 5 messages/8 headlines, 5 statements (mixed true/false); Sprachbausteine 6 gaps `[1]`–`[6]` × 3 options, 12-word bank with 6 distinct answers, 5 mini-dialogues; Hören 4+4+4 items (mixed truth values), Teil-4 dialogue-array audio + 4 questions, Teil-5 string audio + 4 gaps with `alt` arrays; Schreiben 3 points + Musterlösung + Tipps; Sprechen ≥5/4/4 punkte + Redemittel.

Per-exam spec — all five are `difficulty: 'b1'`, `level: 'B1'`-flavoured badges continuing the existing wording style, ids 11–15. Read the `theme` of exams 1–10 first and choose five fresh themes that do NOT repeat them; suggested pool (adjust for collisions): Umzug & Nachbarschaft · Gesundheit & Termine · Bewerbung & Arbeitswelt · Reisen mit Pannen · Feste & Einladungen · Medien & Alltag · Umwelt & Stadtleben. Difficulty should ramp: exam 11 ≈ exam 10's level; exams 14–15 solid B1 (longer Teil-4 reading text, faster-feeling dialogue turns, closer distractors, KII/Passiv/Nebensätze appearing naturally in texts). German must be idiomatic and error-free; every distractor plausible; answers unambiguous and derivable from the text/audio alone.

**Also update:** `package.json` `description` ("10 full model tests" → 15) and any UI copy that hard-codes "10 Modelltests" (grep for `10 Modelltest`, `10 full`, `Modelltests` in `src/` — Dashboard lead at minimum).

---

## Phase 4 — Wire the UI to the schedule

Follow `PLAN-adaptive-schedule.md` §§2–5 for the details; summary of required changes:

1. **Settings** (`features/settings/`): constrain `ExamDatePicker` to `[today+5, today+90]` via `startMonth`/`endMonth` **and** `disabled={{ before, after }}`; replace the "Today" button with "+30 days"; add a two-way-bound "Days until exam" number input (5–90) that writes `examDate = today + N`; hint line previews the computed plan shape ("N days → X learning days + Y mock-exam days"). Out-of-range stored dates show a warning but never block.
2. **Learn page** (`features/learn/`): group `LearnDayCard`s under schedule-slot headers ("Today · Mon 24 Aug", "Tomorrow", dates); completed days collapse into a "Done" section; unscheduled extension days render under "Extra material (not scheduled at your pace)"; dynamic intro copy replaces the hard-coded "2-week learning phase" (keep `LEARN.intro` as fallback for invalid dates).
3. **Dashboard** (`features/dashboard/`): add a "Today's plan" card at the top (today's lessons link + today's exam(s) with Start); scheduled-date badge on each `ExamCard` ("today", "planned Thu 28 Aug", "optional"); dynamic lead copy; `past-due` and `final-sprint` notices with a one-click jump to Settings.
4. Header countdown already works — leave it.

**Update `tests/exam-date.test.js`:** picker rejects dates < today+5 and > today+90; the number input round-trips with the calendar; hint text renders. **Update `e2e/exam-date.spec.js` / `e2e/smoke.spec.js`:** set a date 10 days out → Learn shows compressed slot groups and Dashboard shows "Today's plan"; set 90 days out → one-lesson-per-day layout with all 15 exams scheduled.

---

## Definition of done

Run, in order — every one must pass:

```bash
npm run typecheck
npm run lint
npm run validate        # all 15 exam files, zero errors
npm test                # includes the new test:schedule
npm run test:e2e
npm run build
```

Plus: no diff in `src/shared/types/progress.ts` semantics, no changes under `features/auth/`, days 1–14 of `LEARN.days` unchanged, and a manual sanity pass — `npm run dev`, set the date 7 days out, confirm the Learn page compresses to core days and the Dashboard schedules exams; set it 90 days out, confirm all 28 lessons and 15 exams appear.

Suggested commits: `feat(plan): schedule engine + tests` → `feat(content): learn days 15–28 + cheatsheets` → `feat(content): exams 11–15` → `feat(ui): schedule-driven settings/learn/dashboard` → `test(e2e): adaptive schedule coverage`.
