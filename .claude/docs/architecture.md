# Architecture

```
src/app        composition root — providers, router, layout. May import anything.
src/features   vertical slices, each with components/ hooks/ lib/ routes/ and — where
               another feature needs something from it — an index.ts naming its
               public surface.
src/shared     feature-agnostic building blocks — ui/ primitives, components, hooks,
               lib, config, types, providers.
src/content    inert data, keyed by trainer — `content/trainers/<id>/` holds that
               trainer's exams, curriculum, vocabulary bank and guide HTML.
```

The trainers are peers, described once in the **registry** at
`shared/config/trainers.ts`: one `TRAINERS` descriptor per trainer names its identity and
route namespace, which paper it sets, where its slice of the progress document lives, and
the content it studies from (loaded lazily — see below). That is the only place a
per-trainer fact may live — a `no-restricted-syntax` rule refuses a trainer id anywhere
else in `src/`, in every shape it can take: as a value (`mode === 'b1'`), as an object key
(`{ b1: … }`) and as a property read (`db.b1`, `TRAINERS.a2b1`). Type-level uses are not
matched, so the unions that DEFINE the ids and `ProgressDatabase`'s own fields still
declare theirs. Three files and one folder are exempt: the registry itself,
`src/content/**` (keyed by trainer by definition), and the persisted document's two
irreducible per-trainer spots — `progress/lib/progressDb.ts` and
`auth/lib/mergeProgress.ts`. `eslint.config.js` is not on that list because it no longer
names an id: `scripts/trainerRegistry.mjs` reads them back out of the registry, so the rule
covers a new trainer without being edited. Every screen, route, hook and nav item is
generated from `TRAINER_ORDER`, so none of them needs editing to add a trainer either.

**The extensibility claim, stated precisely.** This was measured, not assumed: a fourth
trainer was planted to see what actually needs to change. **The claim is scoped to a
trainer that sets one of the two existing papers** — a new paper is a much larger job, and
its cost is listed at the end of this section.

Adding one costs seven edits, and every one of them is a list the type system needs
spelled out:

| Edit                                                                           | Why it cannot be derived                                                                                          |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `content/trainers/<id>/` — the content folder                                  | it is the content                                                                                                 |
| one entry in `TRAINERS` (`shared/config/trainers.ts`)                          | it is the registry                                                                                                |
| `TrainerId`, and `SingleLevelTrainerId` if it sets that paper                  | widening either to `string` loses the exhaustiveness the whole design rests on                                    |
| a field on `ProgressDatabase` (`shared/types/progress.ts`)                     | the persisted document's own shape                                                                                |
| `EMPTY_DATABASE` + `normalizeDatabase` (`features/progress/lib/progressDb.ts`) | `exactOptionalPropertyTypes` means a trainer nobody has opened is an ABSENT key, so the defaulting is per trainer |
| `mergeProgress` (`features/auth/lib/mergeProgress.ts`)                         | it rebuilds the document field by field on purpose — see pitfalls.md; this is where two trainers were once wiped  |
| `TRAINER_CONTENT` (`src/content/trainers/index.ts`)                            | the three static content imports live here and nowhere else; four suites and `validate.cjs` read it eagerly       |

Two **tests** need editing, and the earlier claim that none did was simply false:

- `tests/unit/contentChunks.test.ts` — one `vi.mock` per trainer's content module.
  `vi.mock` takes a literal path, so this cannot be looped. Miss it and the new
  trainer's lazy-loading guarantee goes unverified while the suite stays green, which is
  the exact silent failure that suite exists to catch.
- `tests/unit/mergeProgress.test.ts` — pitfalls.md requires a test per new
  `ProgressDatabase` field, so this one is a feature of the process rather than a cost.

Everything else that used to be an edit point is now generated, and the removals matter
more than the documentation: `eslint.config.js`'s `TRAINER_IDS`, `vite.config.ts`'s
sitemap and `robots.txt`, `tests/render/routes.test.ts`'s route list and
`e2e/singleLevelTrainers.spec.js`'s trainer list all read the registry through
`scripts/trainerRegistry.mjs`, which parses it as text because none of those four
resolves the layer aliases the registry imports through.
`tests/unit/trainerRegistry.test.js` asserts that parse against the real `TRAINERS`.

A trainer that sets a **new paper** additionally costs: another `ExamFormatId`
(`shared/types/trainer.ts`), a whole `features/exam/lib/formats/<new>/` mirroring
`single-level/`, five module renderers under `components/modules/<new>/`, an
`eslint.config.js` exemption for that folder, an entry in `RUN_FORMATS`, a `TrainerSlice`
variant, a `ProgressDatabase` attempt type and seven format-keyed records in
`shared/config/examConditions.ts`. That is a paper, not a registry entry.

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

That is also why `dashboard`, `guide`, `history`, `learn`, `settings`, `practice` and
`feedback` have no `index.ts` at all: the first five had barrels that exported nothing but
their route component — the exact pattern above — and the last two had barrels nothing
imported. `@features/auth`, `@features/exam`, `@features/plan` and `@features/progress`
are the four features another feature actually reads, so they are the four with a barrel.
A barrel is the one legal door for a cross-feature import; a feature nobody imports does
not need a door, and an export list nobody reads is an inventory, not a contract.

**If two features need the same thing, it belongs in `src/shared`** — not in whichever
feature defined it first. That is why the confirm dialog, the speech layer and the
score-history chart live there.

## Where things go

| Kind                      | Location                                   | Example                        |
| ------------------------- | ------------------------------------------ | ------------------------------ |
| Screen                    | `features/<f>/routes/`                     | `DashboardPage.tsx`            |
| Feature-private component | `features/<f>/components/`                 | `ExamCard.tsx`                 |
| Feature logic             | `features/<f>/hooks/`, `features/<f>/lib/` | `useExamRun.ts`, `runStore.ts` |
| Cross-feature component   | `shared/components/<group>/`               | `data-display/Meter.tsx`       |
| Design-system primitive   | `shared/ui/` (shadcn CLI writes here)      | `button.tsx`                   |
| Domain type               | `shared/types/`                            | `exam.ts`, `progress.ts`       |
| Shared constant           | `shared/config/`                           | `exam.ts`, `appInfo.ts`        |
| Exam or study content     | `content/trainers/<id>/`                   | `a2b1/exams/exam07.ts`         |

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
