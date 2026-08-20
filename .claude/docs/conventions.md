# Conventions

## Components are visual only

A component renders. Anything derived, persisted, timed or networked goes in a hook
(`use*.ts`) or a pure util in `lib/`. Trivial open/closed UI state in a component is fine.

Reference implementations: `useExamRun` (the attempt state machine), `buildReviewSections`
(turns an attempt into rows), `summarizeAttempt`, `useDashboardStats`.

## One component per file, default-exported

Every React component lives in its own file (`react/no-multi-comp`), and every component
file default-exports its component (the local `component-default-export` rule). Types and
interfaces may still be named exports from the same file. Hooks, libs, config and
providers stay named exports. Barrels re-export the defaults by name
(`export { default as Teil } from './exam-ui/layout/Teil.tsx';`), so consumers keep
writing `import { Teil } from '@shared/components'`. The vendored `src/shared/ui` files
are exempt from both rules.

Components are grouped in folders/subfolders by area: `features/<f>/components/<group>/`
(e.g. `exam/components/{modules,audio,rating,review,runner}/`,
`auth/components/{sync,password,icons}/`), and shared ones under
`shared/components/{actions,data-display,layout,exam-ui}/`.

## Shared exam machinery

Everything both exam formats render lives in `shared/components/exam-ui/` — inputs
(`RichtigFalsch`, `MultipleChoice`, `LetterSelect`), layout (`Teil`, `QuestionItem`,
`QuestionText`, `ReadingText`, `Callout`), gaps (`InlineGapSelect`, `GapFillText`),
`OptionCards`, `PunkteGrid`, `RedemittelList`, `ModuleBriefingCard`, `ExamModuleToolbar`,
`CriteriaRatingPanel`, `CountdownRing`, `RecorderControls`, `Transcript`. The A2·B1 and
telc module renderers under `features/exam/components/modules/` consume it via
`@shared/components`; neither keeps a copy of its own.

## Use the design system

Import primitives from `@shared/ui`. No raw `<button>`, `<input>`, `<select>`,
`<textarea>`, `<table>` or `<label>` in feature code. If a primitive is missing, add it to
`src/shared/ui` in the same style and export it from the barrel — do not reach for raw HTML.

`src/shared/ui/*.tsx` are written by the shadcn CLI and treated as vendored. They keep
kebab-case filenames so `npx shadcn add` keeps working; the barrel is the stable surface.

## Naming (enforced by `check-file`)

| Thing                        | Convention             | Example             |
| ---------------------------- | ---------------------- | ------------------- |
| Component / route module     | `PascalCase.tsx`       | `ExamCard.tsx`      |
| Hook                         | `useThing.ts`          | `useExamRun.ts`     |
| Util, config, types, context | `camelCase.ts`         | `attemptSummary.ts` |
| Folder                       | `kebab-case`           | `exam-ui/`          |
| Module constant              | `SCREAMING_SNAKE_CASE` | `EXAM_MODULES`      |
| Type / interface             | `PascalCase`           | `SignUpOutcome`     |

`@typescript-eslint/naming-convention` covers identifiers, allowing PascalCase where a
value is a component or namespace import, and `snake_case` / `UPPER_CASE` in type
properties that mirror external contracts (Supabase columns, `VITE_` env vars).

## Types

Strict mode plus `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`. No `any`, no
non-null assertions — narrow instead. Domain types live in `src/shared/types`; the exam
files are checked against them with `satisfies`, so a malformed Modelltest fails the build.

When a third-party prop type lacks `| undefined`, use `optional()` from
`@shared/lib/optionalProps.ts` rather than loosening tsconfig.

## Imports

One alias per layer — `@app/*`, `@features/*`, `@shared/*`, `@content/*` — with explicit
`.ts`/`.tsx` extensions. There is no catch-all `@/`: the alias names the layer an import
crosses, which is exactly what the boundary rules match on. `import-x/order` enforces
grouping and alphabetisation; `--fix` handles it.

Relative imports may climb at most one level (`./x`, `../x`); anything `../../` or deeper
is banned by lint — use an alias. A feature may deep-import its own internals through its
own alias (`@features/level-trainer/lib/quiz.ts` from inside `features/level-trainer`);
other features' internals stay off limits. Both are `no-restricted-imports` patterns, so
the replace-not-merge pitfall applies (see architecture.md).
