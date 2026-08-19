# Security

## Reporting

Open a [private security advisory](https://github.com/prangonsafayet/telc-a2b1-trainer/security/advisories/new)
rather than a public issue. I will confirm within a few days.

## What this app handles

Exam answers, self-assessed scores and study-plan progress — no payment data and no
personal data beyond the email address and display name the identity provider returns
at sign-in.

## How it is protected

- **Credentials never reach this code.** Sign-in goes through Supabase Auth (Google,
  GitHub, or email + password). Passwords are hashed server-side by Supabase; nothing
  is hashed, stored or logged in the browser.
- **PKCE.** The OAuth flow uses `flowType: 'pkce'`, so the redirect carries a
  single-use code that only the browser which started the sign-in can exchange. No
  access token ever lands in a URL or in browser history.
- **Redirects are pinned twice.** `redirectTo` is always built from the page's own
  origin, and Supabase independently enforces its redirect allowlist.
- **Row-level security.** Every read and write to the `progress` table is scoped to
  `auth.uid() = user_id` (see `supabase-setup.sql`). There is deliberately no delete
  policy, so nothing the browser can send removes a row.
- **Only a publishable key ships.** `VITE_*` values are inlined into the bundle, which
  is correct for the anon/publishable key and wrong for anything else. A
  `sb_secret_`/`service_role` key is rejected at build time by a Vite plugin and again
  at runtime, where the Settings panel flags it.

## Known limitations

- The session lives in `localStorage`, the standard trade-off for a SPA. On a shared
  computer, sign out and use **Settings → Delete all progress**, which also clears the
  local copy.
- Without cloud sync, progress exists only in one browser. The app says so on the
  dashboard rather than letting you assume otherwise.
