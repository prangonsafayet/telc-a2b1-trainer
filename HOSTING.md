# Hosting the app + free persistent database — step by step

Two free services, ~15 minutes total:

- **Supabase** (free tier) = your persistent database. Your progress is stored in a real Postgres database in the cloud, tied to your email login, and syncs automatically from any device.
- **Netlify Drop** (free tier) = hosts the app at a public URL like `https://your-name.netlify.app`. No command line, no Git — you drag a folder onto a web page.

Do them in this order (the database first, because you must paste two values into a file **before** uploading the app).

---

## Part 1 — Create the free database (Supabase)

1. Go to **https://supabase.com** → **Start your project** → sign up free (GitHub login or email). No credit card needed.
2. Click **New project**:
   - Name: `telc-trainer`
   - Database password: click **Generate** and save it somewhere (you won't need it day-to-day).
   - Region: **Frankfurt (eu-central-1)** — closest to Germany.
   - Plan: **Free**.
   - Click **Create new project** and wait ~1 minute while it provisions.
3. Create the progress table: in the left sidebar open **SQL Editor** → **New query** → open the file `supabase-setup.sql` from this folder, copy ALL of it, paste it in, press **Run**. You should see "Success. No rows returned". (This creates one table, `progress`, with row-level security so only you can read your own data.)
4. Get your two keys: sidebar → **Project Settings** (gear icon):
   - Under **Data API**: copy the **Project URL** (looks like `https://abcdefghijkl.supabase.co`).
   - Under **API Keys**: copy the **anon / public** key (a very long string). The anon key is safe to ship in a public web page — the SQL you ran ensures each user can only touch their own row.
5. Put both values in a **`.env`** file in this folder (copy `.env.example` to `.env` and fill it in):
   ```dotenv
   VITE_SUPABASE_URL=https://abcdefghijkl.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...the-long-key...
   ```
   Save the file. `.env` is git-ignored, so your keys never end up in the repository —
   but note that Vite **inlines** them into the built JavaScript, which is exactly right
   for the anon/publishable key (it is meant to be public and is protected by the
   row-level security you just set up). Never put a _service-role_ key here.

## Part 2 — Host the app (Netlify)

The trainer is now a React app with a build step, so you deploy the **`dist/` folder**,
not the project folder. Pick one of the two routes.

### Option A — connect the Git repository (recommended)

1. Go to **https://app.netlify.com** and sign up free (email or GitHub).
2. **Add new site → Import an existing project** → pick this GitHub repository.
3. Netlify reads `netlify.toml`, so the build settings are already correct:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. **Before the first deploy**, add your keys: **Site configuration → Environment variables → Add a variable**, and add both
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with the values from Part 1.
   Your `.env` is deliberately _not_ in the repository, so without this step the deployed
   site builds fine but starts with cloud sync switched off.
5. Deploy. Every push to `main` now rebuilds automatically.

### Option B — Netlify Drop (drag and drop, no Git)

1. Make sure `.env` exists locally (Part 1, step 5), then run in this folder:
   ```bash
   npm install
   npm run build
   ```
2. Go to **https://app.netlify.com/drop** and drag the generated **`dist` folder** onto the drop zone.
   (Dragging the project folder instead will not work — it has no `index.html` to serve at the root.)
3. Because the keys are baked in at build time, you must re-run `npm run build` locally
   whenever they change.

Either way you get a live URL like `https://sparkly-otter-123abc.netlify.app`. To make it
nicer: **Site configuration → Site details → Change site name** → e.g. `safayet-telc-trainer`.

> **Why the redirect rule matters.** The app has real URLs now (`/history`, `/review/1723`,
> `/exam/4/full`). Reloading one of those asks the host for a file that does not exist, so
> every static host needs a catch-all rewrite to `index.html`. That rule ships twice here —
> in `netlify.toml` (used by Option A) and in `public/_redirects`, which Vite copies into
> `dist/` (used by Option B). If you host somewhere else, you must add the equivalent rule
> there, or refreshing any page but the home page returns 404.

## Part 3 — Set up OAuth sign-in

Sign-in uses OAuth (Google / GitHub), so there are three places to configure. Do them in
this order — the provider needs Supabase's callback URL, and Supabase needs your site URL.

### 3a. Tell Supabase where your site lives

1. Supabase → **Authentication → URL Configuration**.
2. **Site URL**: your production address, e.g. `https://safayet-telc-trainer.netlify.app`.
3. **Redirect URLs**: add every origin you will sign in from, one per line:
   ```
   https://safayet-telc-trainer.netlify.app/**
   http://localhost:5173/**
   ```
   This is a security allowlist — Supabase refuses to send users anywhere else after login,
   which is what stops an attacker from redirecting your sign-in to their own site. Save.
4. Copy the **callback URL** shown on the Providers page — it looks like
   `https://<project-ref>.supabase.co/auth/v1/callback`. You need it in the next step.

### 3b. Create the OAuth app at the provider

**Google** ([console.cloud.google.com](https://console.cloud.google.com)):

1. Create a project (or reuse one) → **APIs & Services → OAuth consent screen**.
   Choose **External**, fill in app name and your email, and save. While the app is in
   _Testing_ mode, only accounts you add under **Test users** can sign in — either add
   yourself, or click **Publish app** for anyone to use it.
2. **APIs & Services → Credentials → Create credentials → OAuth client ID**.
   - Application type: **Web application**
   - **Authorised redirect URIs**: paste the Supabase callback URL from 3a.4
3. Copy the **Client ID** and **Client secret**.

**GitHub** ([github.com/settings/developers](https://github.com/settings/developers)):

1. **New OAuth App**.
   - Homepage URL: your site URL
   - **Authorization callback URL**: the Supabase callback URL from 3a.4
2. Copy the **Client ID**, then **Generate a new client secret** and copy that too.

### 3c. Enable the provider in Supabase

1. Supabase → **Authentication → Providers** → open **Google** (and/or **GitHub**).
2. Toggle it on, paste the **Client ID** and **Client secret**, and save.
3. The client secret lives only in Supabase — it must never go into `.env` or the app
   bundle. The app only ever sees the publishable key.

### 3d. Tell the app which buttons to show

In `.env` (and in Netlify's environment variables), list only the providers you enabled:

```dotenv
VITE_AUTH_PROVIDERS=google,github
```

Then rebuild. Offering a provider you have not enabled just produces an error toast.

## Part 4 — Sign in and sync

1. Open your site (works on your phone too).
2. **Settings → Cloud sync → Continue with Google** (or GitHub) → approve on the
   provider's page → you land back in the app, signed in.
3. Done. Every attempt, learn-plan checkbox and setting **auto-syncs** a moment after each
   change — watch the account chip in the top bar. Sign in on any other device with the
   same account and your progress appears there.

## Security notes

- **PKCE.** The app requests the `pkce` flow, so the redirect carries a single-use `code`
  instead of an access token, and the code can only be exchanged by the browser that
  started the sign-in. Nothing sensitive ever sits in a URL or in your history.
- **Redirect allowlist.** `redirectTo` is always built from the page's own origin, and
  Supabase independently enforces the list from 3a.3. Both must agree, so a tampered link
  cannot redirect your session elsewhere.
- **Row-level security.** `supabase-setup.sql` restricts every read and write to
  `auth.uid() = user_id`, so the publishable key in the bundle grants access to nothing
  but the signed-in user's own row. There is deliberately no delete policy.
- **Only the publishable key ships.** The build refuses a `sb_secret_`/`service_role` key
  and the Settings panel flags it. Client secrets belong in Supabase only.
- **Shared computers.** Signing out clears the session but leaves the local copy of your
  progress in that browser. On a machine that is not yours, use **Settings → Delete all
  progress** afterwards.

## Updating the app later

- **Option A (Git):** push to `main` — Netlify rebuilds and redeploys automatically.
- **Option B (Drop):** run `npm run build` again, then open your site's dashboard →
  **Deploys** tab → drag the new `dist` folder onto the "drag and drop" area.

Either way the new version is live in seconds and your database is untouched.

## Troubleshooting: "Cloud sync — not active"

Open **Settings** in the app. The panel now lists exactly what the running build was
compiled with — whether the URL and the key were present, and whether they had the right
shape. Work down that list.

The one rule behind almost every case: **`VITE_*` values are baked in when the app is
built, not read when it runs.** Setting them somewhere does nothing until a _new build_
happens.

| Where you are seeing it        | Fix                                                                                                                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Local `npm run dev`            | Vite reads `.env` only at startup. Create/edit `.env`, then stop the dev server and start it again.                                                                           |
| Netlify, Git deploys           | Add the variables under **Site configuration → Environment variables**, then **Deploys → Trigger deploy → Deploy site**. Adding variables does not rebuild the existing site. |
| Netlify Drop (`dist` upload)   | Run `npm run build` locally _with_ `.env` present, then re-upload the fresh `dist`.                                                                                           |
| Anywhere, after editing `.env` | Rebuild (`npm run build`) or restart the dev server.                                                                                                                          |

`npm run build` also prints the verdict in the build log — either
`Supabase cloud sync will be enabled (…)` or a `Building WITHOUT Supabase credentials`
warning listing which variable is missing. Check your Netlify deploy log for that line.

If the panel says your key is a **secret key**, stop and rotate it in Supabase: a
`sb_secret_…` or `service_role` key bypasses row-level security and must never be sent to
a browser. Use the **anon / publishable** key.

## Good to know

- **The app still works offline / without any of this.** With no `.env` (or empty values) it behaves exactly as before — browser-local storage only, and the Settings page says so.
- **Rotate the key if it was ever committed.** Earlier versions of this project shipped the Supabase URL and anon key inside `sync-config.js`, so they are still in the Git history. The anon key is public by design, but if you would rather start clean: Supabase → **Project Settings → API Keys → rotate**, then update `.env` and the Netlify environment variables.
- **Supabase free projects pause after ~1 week without activity.** Using the app counts as activity; if you take a long break, the dashboard shows a **Restore** button — one click, no data lost. Free tier includes 2 projects, 500 MB database, 50,000 monthly auth users — this app uses a tiny fraction of that.
- **There is no double-clickable `index.html` any more.** The app is built with Vite; for local use run `npm run dev` and open the printed `http://localhost:5173`.
- **Sign-in doesn't work from a `file://` page** because OAuth cannot redirect back to a local file. Use your deployed URL, or `http://localhost:5173` via `npm run dev` (add it to the Redirect URLs list first).
- **"Unsupported provider" / "provider is not enabled"** means step 3c was skipped for that provider, or `VITE_AUTH_PROVIDERS` lists one you did not enable.
- **"redirect_uri_mismatch"** from Google or GitHub means the callback URL in the provider's OAuth app does not exactly match Supabase's `/auth/v1/callback` URL.
- **Conflict handling:** if two devices have different data, the app merges them — all exam attempts from both are kept, learn-plan ticks are combined, and the newest settings win.
- **Backup:** History → Export progress still works and is a good occasional extra backup.
