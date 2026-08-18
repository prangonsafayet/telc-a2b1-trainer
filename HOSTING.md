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
5. Open the file **`sync-config.js`** in this folder with any text editor and paste both values between the quotes:
   ```js
   window.SYNC_CONFIG = {
     supabaseUrl: "https://abcdefghijkl.supabase.co",
     supabaseAnonKey: "eyJhbGciOi...the-long-key..."
   };
   ```
   Save the file.

## Part 2 — Host the app (Netlify Drop)

1. Go to **https://app.netlify.com** and sign up free (email or GitHub).
2. Go to **https://app.netlify.com/drop**.
3. Drag the whole **`telc-a2b1-trainer` folder** (the unzipped folder containing `index.html`) from your file explorer onto the drop zone. Upload takes a few seconds.
4. You get a live URL like `https://sparkly-otter-123abc.netlify.app`. To make it nicer: **Site configuration → Site details → Change site name** → e.g. `safayet-telc-trainer` → your URL becomes `https://safayet-telc-trainer.netlify.app`.

## Part 3 — Connect the login link to your new URL

1. Back in Supabase: sidebar → **Authentication → URL Configuration**.
2. Set **Site URL** to your Netlify address, e.g. `https://safayet-telc-trainer.netlify.app`, and save. (This is where the email magic link sends you after clicking.)

## Part 4 — Sign in and sync

1. Open your Netlify URL in the browser (works on your phone too).
2. Go to **Settings** in the app → **☁ Cloud sync** → type your email → **Send magic link**.
3. Open the email (check spam the first time) and click the link — it brings you back to the app, signed in.
4. Done. From now on every attempt, learn-plan checkbox and setting **auto-syncs** to your database a moment after each change (watch the "☁ synced" chip in the top bar). Sign in on any other device with the same email and your progress appears there.

## Updating the app later

Netlify: open your site's dashboard → **Deploys** tab → drag the updated folder onto the "drag and drop" area. The new version is live in seconds; your database is untouched.

## Good to know

- **The app still works offline / without any of this.** With an empty `sync-config.js` it behaves exactly as before (browser-local storage only).
- **Supabase free projects pause after ~1 week without activity.** Using the app counts as activity; if you take a long break, the dashboard shows a **Restore** button — one click, no data lost. Free tier includes 2 projects, 500 MB database, 50,000 monthly auth users — this app uses a tiny fraction of that.
- **Sign-in doesn't work from a double-clicked `index.html`** (`file://`) because the email link can't redirect back to a local file. Use the Netlify URL (or `http://localhost:8000` via `python3 -m http.server`, after adding that URL under Supabase → Authentication → URL Configuration → Redirect URLs).
- **Conflict handling:** if two devices have different data, the app merges them — all exam attempts from both are kept, learn-plan ticks are combined, and the newest settings win.
- **Backup:** History → Export progress still works and is a good occasional extra backup.
