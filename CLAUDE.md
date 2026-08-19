# CLAUDE.md

A React study app with ten full mock exams for the **telc Deutsch A2·B1** German exam.
It runs timed modules, scores them by the official rules, and stores progress locally
with optional Supabase sync. It is also a portfolio project, so code quality and
presentation count as much as features.

## Read this first

This file stays short on purpose. Load the detail page for the work in front of you:

| Doing this                                                 | Read                                                           |
| ---------------------------------------------------------- | -------------------------------------------------------------- |
| Anything at all — before your first edit                   | [`.claude/docs/conventions.md`](.claude/docs/conventions.md)   |
| Adding or moving files, wondering where something belongs  | [`.claude/docs/architecture.md`](.claude/docs/architecture.md) |
| Touching dates, timers, answers, auth, env vars or content | [`.claude/docs/pitfalls.md`](.claude/docs/pitfalls.md)         |
| Writing or fixing tests                                    | [`.claude/docs/testing.md`](.claude/docs/testing.md)           |
| Picking a tool, skill, agent or plugin for the task        | [`.claude/docs/tooling.md`](.claude/docs/tooling.md)           |
| Verbose output eating the context window                   | `caveman tools shrink` — see tooling.md                        |
| Branching, reviewing, releasing, deploying                 | [`CONTRIBUTING.md`](CONTRIBUTING.md)                           |
| Authoring exam content                                     | the `exam-author` agent                                        |

## Commands

```bash
npm run dev          # dev server on :5173
npm test             # typecheck → lint → format → exam data → jsdom suites
npm run test:e2e     # Playwright (Chromium + a mobile profile)
npm run build        # production build into dist/
```

`npm test` must pass before anything is committed; the pre-push hook enforces it.
`npm run test:e2e` needs browsers once: `npx playwright install chromium`.

## Non-negotiables

1. **Components are visual only.** Logic goes in a `use*.ts` hook or a pure `lib/` util.
2. **Primitives come from `@/shared/ui`**, never from a file inside it, and never as raw
   `<button>` / `<input>` / `<form>` / `<table>` / `<label>`.
3. **No `any`, no non-null assertions.** Narrow instead.
4. **A bug fix ships with a regression test.**
5. **Never commit to `main`.** Issue → branch → PR → green CI → squash-merge.
6. **No AI attribution in commits** — no `Co-Authored-By`, no "generated with" footer.

## Reporting

Say what you actually ran and what it printed. If appearance matters, verify it in a real
browser (Playwright MCP is available) rather than asserting it from a passing jsdom test.
