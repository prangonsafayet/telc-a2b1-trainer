# Architecture

```
src/app        composition root — providers, router, layout. May import anything.
src/features   vertical slices, each with components/ hooks/ lib/ routes/ and an
               index.ts naming its public surface.
src/shared     feature-agnostic building blocks — ui/ primitives, components, hooks,
               lib, config, types, providers.
src/content    inert data, keyed by trainer — `content/trainers/<id>/` holds that
               trainer's exams, curriculum, vocabulary bank and guide HTML.
```

The trainers are peers, described once in the **registry** at
`shared/config/trainers.ts`: one `TRAINERS` descriptor per trainer names its identity and
route namespace, which paper it sets, where its slice of the progress document lives, and
the content it studies from (loaded lazily — see below). That is the only place a
per-trainer fact may live — a `no-restricted-syntax` rule refuses the literals `'a2b1'`,
`'b1'` and `'b2'` as values anywhere else in `src/`. Every screen, route, hook and nav item
is generated from `TRAINER_ORDER`, so none of them needs editing to add a trainer.

**The extensibility claim, stated precisely.** This was measured, not assumed: a fourth
trainer was planted to see what actually needs to change. Adding one costs its content
folder (`content/trainers/<id>/`), one entry in `TRAINERS`, and a row in the type-level
plumbing that keeps the registry exhaustive and the persisted document typed —
`TrainerId` and, if it sets the single-level paper, `SingleLevelTrainerId` (both in
`shared/types/trainer.ts` / `shared/types/singleLevelExam.ts`), plus a field on
`ProgressDatabase` (`shared/types/progress.ts`) with matching cases in `normalizeDatabase`
and `mergeProgress` (`features/progress/lib/progressDb.ts`,
`features/auth/lib/mergeProgress.ts`). No screen, route, hook, nav item or test needs
editing — that part of the original claim held. The earlier phrasing, "a content folder
plus one registry entry", undercounted this: the id unions and the persisted document's
own shape are irreducible without widening `TrainerId` to `string` and losing the
exhaustiveness checking the registry is built on, which is a worse trade than the three
extra edit points.

`features/exam` runs every mock exam of every trainer: one run-state machine, one runner
shell, one results screen and one review screen, driven by a **format descriptor** in
`features/exam/lib/formats/`. There are two of those — `DUAL_LEVEL_FORMAT` and
`SINGLE_LEVEL_FORMAT` — and they own everything a paper decides for itself: its module list
and timing, its briefing copy, its marking rules, its self-rating scale and its five module
renderers (`components/modules/dual-level/`, `components/modules/single-level/`).
`features/practice` adds the flashcards, quizzes and reference tables every trainer's
vocabulary bank is drilled with.

A trainer is bound to its paper and its stored attempts by `useExamBinding`, so the three
screens narrow once and then render the same generic views for either format. Everything
both papers render — inputs, Teil layout, gap fills, briefing card, toolbar, rating panel,
recorder — lives in `shared/components/exam-ui/` and is consumed through
`@shared/components`; the feature keeps no private copy.

Anything named after one paper is named after that paper (`SINGLE_LEVEL_FORMAT`,
`single-level/scoring.ts`). Anything generic is not, and nothing is named after a brand: all
three exams are telc exams, so `Telc` in an identifier distinguishes nothing.

## The dependency rules are ESLint rules, not conventions

- A feature must not import another feature's internals. Go through
  `@features/<name>` (its `index.ts`). A feature MAY deep-import itself via its own
  alias — one generated config entry per feature directory allows exactly that.
- A feature must not import `@app/**` — that inverts the dependency direction.
- `src/shared` must not import features or the app.
- `src/content` must not import application code at all.
- Primitives are imported from `@shared/ui`, never from a file inside it.
- Relative imports climb at most one level; `../../` and deeper must use an alias.

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
| Feature logic             | `features/<f>/hooks/`, `features/<f>/lib/` | `useExamRun.ts`, `runStore.ts` |

## The `plan` feature

`features/plan` owns the adaptive schedule and is the one feature every screen reads:
dashboard, learn and settings all import it through `@features/plan`.

- `lib/buildSchedule.ts` — the engine. A pure function of (exam date, today, finished
  lessons, taken exams). It reads no clock: `today` is an argument, which is what makes it
  testable and deterministic.
- `lib/distribute.ts` — the bucketing helpers it compresses and spaces slots with.
- `lib/describeSchedule.ts` — every user-facing string about the plan, so no component
  builds copy of its own.
- `hooks/useTrainerSchedule.ts` / `hooks/useToday.ts` — the React surface. It takes the
  trainer and reads its inputs from `useTrainerSlice`; `useToday` re-reads the date at local
  midnight and on `visibilitychange`, since the tab stays open overnight.

The schedule is derived on render and **never persisted**. Its inputs — `settings.examDate`,
`learnDone`, `attempts` — are the only stored state, so a plan can never disagree with
progress. Constants live in `@shared/config/schedule.ts` and the types in
`@shared/types/schedule.ts`.
| Cross-feature component | `shared/components/<group>/` | `data-display/Meter.tsx` |
| Design-system primitive | `shared/ui/` (shadcn CLI writes here) | `button.tsx` |
| Domain type | `shared/types/` | `exam.ts`, `progress.ts` |
| Shared constant | `shared/config/` | `exam.ts`, `appInfo.ts` |
| Exam or study content | `content/trainers/<id>/` | `a2b1/exams/exam07.ts`, `b1/curriculum.ts` |
