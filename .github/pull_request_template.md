## What and why

<!-- What changes, and what problem it solves. Link the issue: "Closes #12". -->

## How it was verified

<!-- Tick what you actually ran. `npm test` is the minimum. -->

- [ ] `npm test` (typecheck, lint, exam data, Vitest logic + render)
- [ ] `npm run test:e2e` — required for anything visual or navigational
- [ ] Clicked through the affected screen in `npm run dev`
- [ ] Added a regression test for the bug being fixed

## Checklist

- [ ] No new layer-boundary violations (features stay out of each other's internals)
- [ ] Logic lives in a hook or a `lib/` util, not in a component
- [ ] shadcn primitives used instead of raw interactive elements
- [ ] No `any`, no non-null assertions
- [ ] New animation sits behind `prefers-reduced-motion`
- [ ] No secrets, keys or personal data added to the repo

## Screenshots

<!-- Before/after for visual changes. Delete if not applicable. -->
