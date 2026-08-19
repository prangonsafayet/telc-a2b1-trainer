# Conventions

## Components are visual only

A component renders. Anything derived, persisted, timed or networked goes in a hook
(`use*.ts`) or a pure util in `lib/`. Trivial open/closed UI state in a component is fine.

Reference implementations: `useExamRun` (the attempt state machine), `buildReviewSections`
(turns an attempt into rows), `summarizeAttempt`, `useDashboardStats`.

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
