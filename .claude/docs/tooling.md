# Tooling

19 Claude Code plugins are installed at user scope. This maps the task to the tool worth
reaching for, so they are actually used instead of rediscovered.

## Reach for these by task

| Task                                             | Use                                                                                                                   |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Any non-trivial feature — before writing code    | `superpowers:brainstorming`, then `superpowers:writing-plans`                                                         |
| Executing a written plan                         | `superpowers:executing-plans` or `superpowers:subagent-driven-development`                                            |
| A bug, test failure or anything surprising       | `superpowers:systematic-debugging` — form a hypothesis and bisect, do not guess-patch                                 |
| About to claim something works                   | `superpowers:verification-before-completion` — run it, paste the output                                               |
| Implementing a feature or fix                    | `superpowers:test-driven-development`                                                                                 |
| Before merging                                   | `superpowers:requesting-code-review`, or `/code-review`                                                               |
| Reviewing a PR                                   | `pr-review-toolkit:review-pr`                                                                                         |
| Visual design direction for new UI               | `frontend-design:frontend-design`                                                                                     |
| Checking the app in a real browser               | **Playwright MCP** — drive it directly, no throwaway spec                                                             |
| Library or framework API questions               | **context7** — fetch current docs; do not answer Vite/React/Router/Tailwind API questions from memory, they move fast |
| Anything Supabase (auth, RLS, schema, debugging) | `supabase:supabase`, and `supabase:supabase-postgres-best-practices` before touching SQL                              |
| Netlify config, redirects, env vars, deploys     | `netlify-skills:netlify-config`, `netlify-skills:netlify-deploy`                                                      |
| Type navigation in a large refactor              | **typescript-lsp**                                                                                                    |
| Security review of a change                      | `security-review`, `security-guidance`                                                                                |
| "Did we solve this before?"                      | `claude-mem:mem-search`                                                                                               |
| Recording what was learned                       | `claude-md-management:revise-claude-md`                                                                               |
| Adding an exam                                   | the `new-exam` skill and the `exam-author` agent                                                                      |
| Running the full verification pipeline           | the `verify` skill                                                                                                    |
| Pre-deploy checks                                | the `ship` skill                                                                                                      |
| Reviewing a change against this repo's rules     | the `frontend-reviewer` agent                                                                                         |

## Project-local skills and agents

Defined in `.claude/`:

- **`verify`** — the ordered pipeline and how to read each failure.
- **`new-exam`** — adding a Modelltest end to end, with the item counts per Teil.
- **`ship`** — pre-deploy checks for Netlify and Supabase.
- **`exam-author`** agent — authors German exam content to the required shape and the
  A2→B1 difficulty ladder.
- **`frontend-reviewer`** agent — reviews against the layer boundaries, the
  components-visual-only rule, and the pitfalls list.

## Memory across sessions

**claude-mem** is installed and captures observations automatically. Before starting
something that feels familiar, search it (`claude-mem:mem-search`) rather than re-deriving.

Durable project facts and corrections also live as memory files under
`~/.claude/projects/<project>/memory/`, indexed by `MEMORY.md`. Anything learned the hard
way belongs in one of two places:

- a **pitfall** → [`pitfalls.md`](pitfalls.md), so it is enforced by documentation
- a **preference or correction** → a memory file, so it survives into the next session

## Standing preferences for this repo

- Commit messages carry **no AI attribution** — no `Co-Authored-By`, no generated-with
  footer.
- Never commit to `main`. Issue → branch → PR → green CI → squash-merge.
- Internal notes (plans, specifications, agent instructions) stay out of the published
  repo — `docs/*.local.md` is git-ignored for exactly this.
