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
   row-level security you just set up). Never put a *service-role* key here.

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
   Your `.env` is deliberately *not* in the repository, so without this step the deployed
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

## Part 3 — Connect the login link to your new URL

1. Back in Supabase: sidebar → **Authentication → URL Configuration**.
2. Set **Site URL** to your Netlify address, e.g. `https://safayet-telc-trainer.netlify.app`, and save. (This is where the email magic link sends you after clicking.)

## Part 4 — Sign in and sync

1. Open your Netlify URL in the browser (works on your phone too).
2. Go to **Settings** in the app → **☁ Cloud sync** → type your email → **Send magic link**.
3. Open the email (check spam the first time) and click the link — it brings you back to the app, signed in.
4. Done. From now on every attempt, learn-plan checkbox and setting **auto-syncs** to your database a moment after each change (watch the "☁ synced" chip in the top bar). Sign in on any other device with the same email and your progress appears there.

## Updating the app later

- **Option A (Git):** push to `main` — Netlify rebuilds and redeploys automatically.
- **Option B (Drop):** run `npm run build` again, then open your site's dashboard →
  **Deploys** tab → drag the new `dist` folder onto the "drag and drop" area.

Either way the new version is live in seconds and your database is untouched.

## Good to know

- **The app still works offline / without any of this.** With no `.env` (or empty values) it behaves exactly as before — browser-local storage only, and the Settings page says so.
- **Rotate the key if it was ever committed.** Earlier versions of this project shipped the Supabase URL and anon key inside `sync-config.js`, so they are still in the Git history. The anon key is public by design, but if you would rather start clean: Supabase → **Project Settings → API Keys → rotate**, then update `.env` and the Netlify environment variables.
- **Supabase free projects pause after ~1 week without activity.** Using the app counts as activity; if you take a long break, the dashboard shows a **Restore** button — one click, no data lost. Free tier includes 2 projects, 500 MB database, 50,000 monthly auth users — this app uses a tiny fraction of that.
- **There is no double-clickable `index.html` any more.** The app is built with Vite; for local use run `npm run dev` and open the printed `http://localhost:5173`.
- **Sign-in doesn't work from a `file://` page** because the email link can't redirect back to a local file. Use the Netlify URL (or `http://localhost:8000` via `python3 -m http.server`, after adding that URL under Supabase → Authentication → URL Configuration → Redirect URLs).
- **Conflict handling:** if two devices have different data, the app merges them — all exam attempts from both are kept, learn-plan ticks are combined, and the newest settings win.
- **Backup:** History → Export progress still works and is a good occasional extra backup.
