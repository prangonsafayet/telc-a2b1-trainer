# Architecture

```
src/app        composition root — providers, router, layout. May import anything.
src/features   vertical slices, each with components/ hooks/ lib/ routes/ and an
               index.ts naming its public surface.
src/shared     feature-agnostic building blocks — ui/ primitives, components, hooks,
               lib, config, types, providers.
src/content    inert data — the ten exams, the guide HTML, the 14-day plan.
```

## The dependency rules are ESLint rules, not conventions

- A feature must not import another feature's internals. Go through
  `@features/<name>` (its `index.ts`).
- A feature must not import `@app/**` — that inverts the dependency direction.
- `src/shared` must not import features or the app.
- `src/content` must not import application code at all.
- Primitives are imported from `@shared/ui`, never from a file inside it.

Violations fail `npm run lint`. They are not style preferences; two of them were added
after real import cycles.

All five are `no-restricted-imports` patterns. That rule is _configured_, not
accumulated: when two flat-config entries set it for the same file, the later one
replaces the earlier one's options instead of merging them. So each layer's entry in
`eslint.config.js` restates every pattern that applies to its files. Dropping one is
silent — the rule keeps passing and stops checking. After editing those entries,
re-prove each rule by introducing a violation and confirming lint rejects it.

## Two consequences worth remembering

**Route components are not exported from feature barrels.** The router deep-imports them
(`@features/exam/routes/RunnerPage.tsx`) so importing the exam domain does not drag three
screens and their dependencies along. An earlier version did export them and produced an
import cycle that hung the settings route with a permanent loading skeleton.

**If two features need the same thing, it belongs in `src/shared`** — not in whichever
feature defined it first. That is why the confirm dialog, the speech layer and the
score-history chart live there.

## Where things go

| Kind                      | Location                                   | Example                        |
| ------------------------- | ------------------------------------------ | ------------------------------ |
| Screen                    | `features/<f>/routes/`                     | `DashboardPage.tsx`            |
| Feature-private component | `features/<f>/components/`                 | `ExamCard.tsx`                 |
| Feature logic             | `features/<f>/hooks/`, `features/<f>/lib/` | `useExamRun.ts`, `runState.ts` |

## The `plan` feature

`features/plan` owns the adaptive schedule and is the one feature every screen reads:
dashboard, learn and settings all import it through `@features/plan`.

- `lib/buildSchedule.ts` — the engine. A pure function of (exam date, today, finished
  lessons, taken exams). It reads no clock: `today` is an argument, which is what makes it
  testable and deterministic.
- `lib/distribute.ts` — the bucketing helpers it compresses and spaces slots with.
- `lib/describeSchedule.ts` — every user-facing string about the plan, so no component
  builds copy of its own.
- `hooks/useSchedule.ts` / `hooks/useToday.ts` — the React surface; `useToday` re-reads the
  date at local midnight and on `visibilitychange`, since the tab stays open overnight.

The schedule is derived on render and **never persisted**. Its inputs — `settings.examDate`,
`learnDone`, `attempts` — are the only stored state, so a plan can never disagree with
progress. Constants live in `@shared/config/schedule.ts` and the types in
`@shared/types/schedule.ts`.
| Cross-feature component | `shared/components/<group>/` | `data-display/Meter.tsx` |
| Design-system primitive | `shared/ui/` (shadcn CLI writes here) | `button.tsx` |
| Domain type | `shared/types/` | `exam.ts`, `progress.ts` |
| Shared constant | `shared/config/` | `exam.ts`, `appInfo.ts` |
| Exam or study content | `content/` | `exams/exam07.ts`, `learn.ts` |
