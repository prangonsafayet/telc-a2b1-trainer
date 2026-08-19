# Feature plan — Adaptive study schedule from exam date (5–90 days)

**Goal.** The user picks their exam date; the app computes the remaining days (clamped to 5–90) and adapts everything to it: the learn plan, the mock-exam pacing, and the copy that currently hard-codes "14 days" and "one exam per day".

**Guiding principle.** The schedule is _derived, never stored_. It is a pure function of `(settings.examDate, today, learnDone, attempts)`. Nothing new is persisted, so localStorage, the Supabase `progress` table, RLS, and cloud-sync merge logic all stay untouched. Every day the user opens the app, the remaining work is re-laid onto the remaining days — which is exactly the "adaptive" behavior wanted, and it means skipped days self-heal instead of leaving a stale plan.

---

## 0. What already exists (build on it, don't duplicate)

| Piece                                          | Where                                                                                                                                   | Status                                           |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `settings.examDate` (`YYYY-MM-DD`, local time) | `shared/types/progress.ts`, default in `shared/config/exam.ts`                                                                          | ✅ persisted + synced                            |
| Date picker + header countdown                 | `features/settings/components/ExamDatePicker.tsx`, `use-exam-date.ts`, `daysUntil`/`parseIsoDate`/`toIsoDate` in `shared/lib/format.ts` | ✅ working, unconstrained                        |
| 14 authored learn days, 8 cheatsheets          | `content/learn.ts` (`LEARN.days`), types in `shared/types/learn.ts`                                                                     | ✅ fixed 14-day sequence                         |
| Learn checkbox state                           | `learnDone` keyed `d<day>t<index>`                                                                                                      | ✅ persisted + synced — **must not change keys** |
| 10 mock exams, easiest first                   | `content/exams/index.ts`, Dashboard `ExamCard`s                                                                                         | ✅ static list, no pacing                        |
| Hard-coded pacing copy                         | `LEARN.intro` ("2-week learning phase"), LearnPage title ("14 days"), Dashboard lead                                                    | ⚠️ must become dynamic                           |

---

## 1. Core: the schedule engine (pure, fully unit-testable)

**New file: `src/shared/config/schedule.ts`** — constants:

```ts
export const MIN_PREP_DAYS = 5;
export const MAX_PREP_DAYS = 90;
export const LEARN_DAY_COUNT = 14; // LEARN.days.length, asserted in a test
export const MOCK_EXAM_COUNT = 10; // EXAMS.length, asserted in a test
```

**New file: `src/features/plan/lib/build-schedule.ts`** — the only place with allocation logic.

```ts
export interface ScheduleInput {
  examDate: string; // settings.examDate
  today: string; // injected, never Date.now() inside — testability
  learnDone: LearnDoneMap; // to schedule only remaining work
  attemptedExamIds: ReadonlySet<number>;
}

export interface ScheduleSlot {
  date: string; // YYYY-MM-DD
  dayOffset: number; // 0 = today
  learnDays: readonly number[]; // LEARN day numbers assigned to this slot
  examIds: readonly number[]; // mock exams assigned to this slot
  kind: 'learn' | 'mock' | 'mixed' | 'review' | 'exam-eve';
}

export interface Schedule {
  daysLeft: number; // raw daysUntil(examDate)
  effectiveDays: number; // clamp(daysLeft, 5, 90)
  clamped: 'none' | 'below-min' | 'above-max';
  phase: 'learn' | 'mock' | 'final-sprint' | 'past-due';
  slots: readonly ScheduleSlot[];
  todaySlot: ScheduleSlot | null;
}
```

**Allocation algorithm** (deterministic, no randomness):

1. `effectiveDays = clamp(daysUntil(examDate), 5, 90)`. The last day before the exam is always reserved as `exam-eve` (light review: cheatsheets + speaking script, no new material), so `workDays = effectiveDays - 1`.
2. Split `workDays` between the two phases in the authored ratio 14 : 12 (14 learn days, 10 mocks + 2 review days), i.e. `learnSlots = round(workDays * 14 / 26)`, floored/ceiled so both phases get at least their minimum: `learnSlots >= 1`, `mockSlots >= 2`.
3. **Learn phase compression.** Distribute the _not-yet-completed_ LEARN days (a day counts completed when `isDayComplete`) across `learnSlots` slots in order, round-robin chunking — e.g. 14 remaining days into 5 slots → chunks of 3,3,3,3,2. A slot's card shows all its LEARN day cards stacked ("Today: Day 3 + Day 4"). With ≥ 14 learn slots, it's the classic one-per-day plan and extra slots become `review`.
4. **Mock phase compression/expansion.** Distribute unattempted exams (in easiest-first order) across `mockSlots`: with ≥ 10 slots it's one per day plus `review` days after every third exam; with fewer slots, 2 per day (never more than 2 — a full mock is ~2.5h); if even 2/day can't fit all 10, keep the _first N_ that fit and mark the rest "optional / if time allows" — never hide them, just don't schedule them.
5. **Extreme cases.**
   - `effectiveDays = 5` → 1 crash-course learn slot (links the 4 priority cheatsheets: writing, speaking, connectors, listening + Day-1/Day-13 tasks), 3 mock slots (easiest, middle, hardest — hand-picked ids), 1 exam-eve.
   - `daysLeft < 5` (date drifted closer than the minimum) → `phase: 'final-sprint'`: same layout as the 5-day plan truncated to what's left; a notice explains it.
   - `daysLeft < 0` → `phase: 'past-due'`: schedule empty, UI prompts to pick a new date.
   - `daysLeft > 90` → clamp to 90 and note "your plan starts closer to the exam"; the first slots become `review`/free until the 90-day window opens (simplest: treat as 90).
6. **Completed-work awareness is what makes it adaptive**: the function only schedules remaining learn days and unattempted exams, so finishing early relaxes the plan and falling behind recompresses it automatically each day.

**New file: `src/features/plan/hooks/use-schedule.ts`** — memoizes `buildSchedule` over `db.settings.examDate`, `db.learnDone`, `db.attempts`, and a `today` state that refreshes on a midnight timer + `visibilitychange` (the app is a long-lived SPA; without this the plan goes stale overnight).

---

## 2. Settings UI — choosing the days

`ExamDatePicker` / `use-exam-date.ts` changes:

1. Constrain the calendar to `[today + MIN_PREP_DAYS, today + MAX_PREP_DAYS]` via `startMonth`/`endMonth` **and** react-day-picker's `disabled={{ before, after }}` (month bounds alone still allow bad days inside a month). Remove the "Today" quick button (today is now invalid by definition) and replace it with "+30 days".
2. Add a companion **"Days until exam" number input / slider (5–90)**, two-way bound: typing `N` sets `examDate = today + N`; picking a date updates the number. This is literally the "user can select how many days are left" requirement — the date stays the single stored value.
3. Hint line: "`{n}` days → your plan: `{learnSlots}` learning days + `{mockSlots}` mock-exam days" (pulled from `buildSchedule`, so Settings previews the plan shape live).
4. Out-of-range stored value (date drifted or legacy data): the picker shows it with an inline warning and the schedule clamps — never block the app on it.

---

## 3. Learn page — dynamic plan

1. Replace the static `LEARN.intro` sentence ("2-week learning phase", "After Day 14…") with copy computed from the schedule: "You have **{effectiveDays} days** until your exam on {date}: {learnSlots} learning days, then {mockSlots} mock-exam days." Keep `LEARN.intro` as the fallback when `examDate` is invalid.
2. Group day cards by schedule slot: a slot header ("**Today** · Mon 24 Aug", "Tomorrow", then dates) with its 1–3 `LearnDayCard`s under it. Completed learn days collapse into a "Done" section at the top rather than being re-scheduled.
3. `learnDone` keys (`d<day>t<index>`) and `LearnDayCard` internals stay exactly as they are — only the wrapper/grouping changes, so history, sync, and merge are untouched.

## 4. Dashboard — paced mocks

1. Replace the static lead ("10 Modelltests, easiest first…") with schedule-aware copy, and add a **"Today's plan" card** at the top: today's learn tasks (link to Learn) and/or today's exam(s) with a Start button — this is the single highest-value UI piece of the feature.
2. Each `ExamCard` gets a small scheduled-date badge ("planned Thu 28 Aug", "today", "optional"). Attempted exams show their result as now.
3. Countdown chip already in the header keeps working unchanged (`daysUntil`).

## 5. Copy/content touch-ups

`content/learn.ts`: `intro` becomes a template or is superseded by computed copy (keep authored HTML for the static parts). Day-14 ("exam eve") content doubles as the `exam-eve` slot's material regardless of compression. No other content changes — the 14 authored days remain the canonical curriculum at every pace.

---

## 6. Persistence, Supabase, Netlify

- **No schema change.** `examDate` already lives in `settings` and syncs through the existing `progress` row; the schedule is derived. `mergeDB` (newest-settings-wins) already handles two devices disagreeing about the date.
- **No Supabase dashboard work, no new env vars, no Netlify config.** Deploy = normal build.
- One subtlety: two devices in different timezones can compute a different `daysLeft` for the same date on the same evening. Accepted — the date is interpreted in local time by design (documented in `format.ts`).

## 7. Edge cases checklist

- Date < 5 days away (drift, not selectable) → final-sprint mode, notice, never a crash.
- Date in the past → past-due state on Dashboard + Learn, one-click "pick a new date" jump to Settings.
- Date > 90 days → clamp, informational hint.
- Invalid/missing date (legacy or hand-edited storage) → fall back to `DEFAULT_SETTINGS.examDate` behavior; `parseIsoDate` already returns `null` for junk.
- Midnight rollover with the tab open → `use-schedule`'s day tick.
- All learn days done, no exams attempted, 6 days left → all slots become mock slots (algorithm handles via remaining-work inputs).
- Everything done → all-review plan + congratulatory copy.

## 8. Test plan

1. **Unit — `build-schedule.test.js`** (pure function, no DOM): invariants across all inputs 5…90 × completion states — slots cover exactly `effectiveDays` days; last slot is `exam-eve`; every remaining learn day appears exactly once; ≤ 2 exams per slot; deterministic (same input → same output); clamping flags correct; past-due/final-sprint phases.
2. **Unit — content assertions**: `LEARN.days.length === LEARN_DAY_COUNT`, `EXAMS.length === MOCK_EXAM_COUNT` (fails the build if content and scheduler drift apart).
3. **Update `tests/exam-date.test.js`**: picker now refuses dates < today+5 and > today+90; number input ↔ calendar round-trip; hint shows plan shape.
4. **Update `e2e/exam-date.spec.js` + `e2e/smoke.spec.js`**: set a date 10 days out → Learn page groups days into compressed slots, Dashboard shows "Today's plan"; set 90 days → classic one-per-day layout.
5. Existing `learnDone`/sync tests must pass unchanged — proves backward compatibility.

## 9. Suggested implementation order (each step ships green)

1. `schedule.ts` constants + `build-schedule.ts` + unit tests (no UI).
2. `use-schedule.ts` hook + midnight tick.
3. Settings: constrained picker + days-left input + live hint (update exam-date tests).
4. Learn page grouping + dynamic intro.
5. Dashboard "Today's plan" card + exam-card badges + dynamic lead.
6. Edge-state notices (final-sprint, past-due) + e2e updates.

Rough effort: the engine and tests are the bulk (~½ the work); UI steps are mostly rearranging existing components.
