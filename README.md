# telc Deutsch A2·B1 — Mock Exam Trainer

A complete offline web app with **10 full mock exams** for the telc Deutsch A2·B1 exam, built to the official format: Leseverstehen (4 parts, 45 min), Sprachbausteine (3 parts, 35 min), Hörverstehen + Hören & Schreiben (5 parts, 35 min), Schreiben (1 part, 10 min) and Sprechen (3 parts, ~15 min, no prep time). Difficulty ramps from early A2 (Modelltest 1–3) through solid A2/A2+ (4–7) to B1 level (8–10).

It is a React app (Vite + React Router + Tailwind CSS + shadcn/ui) with light and dark
mode, real URLs for every screen, and an exam runner that survives a page refresh.

## How to run it locally

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev          # then open the printed http://localhost:5173
```

Other scripts:

| Command            | What it does                                                                      |
| ------------------ | --------------------------------------------------------------------------------- |
| `npm run dev`      | Dev server with hot reload                                                        |
| `npm run build`    | Production build into `dist/`                                                     |
| `npm run preview`  | Serve the production build locally                                                |
| `npm test`         | Validate the exam data, then render every route and drive a full attempt in jsdom |
| `npm run validate` | Check the 10 exam data files only                                                 |

Optional: copy `.env.example` to `.env` and fill in your Supabase keys to turn on cloud
sync (see `HOSTING.md`). Without it the app runs fully offline on browser storage.

**Best browsers:** Chrome or Edge — they ship good German text-to-speech voices for the listening module. If the Settings page says "No German voice found", install a German language pack (Windows: Settings → Time & Language → Speech; macOS: System Settings → Accessibility → Spoken Content → add a German voice).

Your progress is saved in the browser (localStorage) on that computer. Use **History → Export progress** to back it up or move it to another machine.

**Host it online with a persistent cloud database (recommended):** see **`HOSTING.md`** for a 15-minute, fully free setup — Netlify hosts the built app at a public URL and Supabase (free Postgres) stores your progress behind a Google/GitHub sign-in, syncing automatically across all your devices.

## What's inside the app

- **Dashboard** — all 10 Modelltests with difficulty labels, best scores, retry buttons, skill-progress meters, score-history chart, and a countdown to your exam date (set it in Settings).
- **Learn (14-day plan)** — an AI-assisted study plan for the two weeks before mock-exam season: daily tasks with checkboxes, grammar/vocabulary/writing/speaking **cheatsheets**, and copy-paste **AI practice prompts** that turn Claude (or any AI chat) into your tutor, examiner, or speaking partner.
- **Exam Guide** — the full exam structure, the official scoring rules, and concrete "how to crack it" tactics for every module and part, including exam-day advice.
- **Exam runner** — real countdown timers per module (auto-submit when time is up), limited audio plays like the real exam, and a "what to do" briefing before every module.
- **Scoring** — official model: 60 points per skill, 240 total. Lesen/Hören/Sprachbausteine are auto-scored; Schreiben and Sprechen are self-scored against sample answers and telc-style criteria. Grading follows the official rule: **B1 = ≥70% (42/60) in three skills + ≥40% (24/60) in the fourth**; A2 fallback = ≥40% in three + ≥10% in the fourth.
- **Tracking** — every attempt (full exam or single-module practice) is stored with per-module time used, scores, and answers; review any attempt later with correct answers and full listening transcripts. Retry any exam as often as you like.
- **Real URLs** — every screen has its own address (`/learn`, `/history`, `/review/1723`, `/exam/4/full`), so you can bookmark, share, use the back button, and reload without losing your place.
- **Refresh-safe exams** — the running attempt (current module, every answer, the remaining time and your used audio plays) is written to browser storage as you go. Reload the tab, or come back after closing it, and the dashboard offers to resume exactly where you were. Only microphone recordings are session-only.
- **Light and dark mode** — follows your system by default, with a toggle in the header.
- **Account status, always visible** — the header shows whether you are signed in, and warns clearly (with a one-click backup export) that progress is browser-local until you are. Sign out lives in the same menu.
- **Resilience** — every screen is wrapped in an error boundary, lazily-loaded routes show a skeleton, and success/failure of every meaningful action is confirmed with a toast.

## Suggested schedule (exam on 12 Sept)

Weeks 1–2: work through the 14-day Learn plan (~60–90 min/day). Then take roughly one mock exam per day in order 1 → 10, always under real timing, and review every mistake before the next one. Keep Modelltest 10 for two or three days before the real exam.

## Notes

- The Listening module uses your browser's built-in German text-to-speech. Transcripts are hidden during the test and revealed in the review.
- The Speaking module can record you via microphone (allow access when asked) so you can listen back and self-rate. Recordings live only in the current session and are never uploaded anywhere.
- Sprachbausteine are tracked as a separate grammar/vocab score, since in the official exam they feed into the reading/writing subtests rather than forming their own 60-point skill.
- `validate.cjs` is a developer tool (`npm run validate`) that checks the exam data files; you don't need it to use the app.
- Exam content lives in `src/data/exam01.js` … `exam10.js`, one ES module per Modelltest; the study guide and 14-day plan live in `src/content.js`.

Viel Erfolg bei der Prüfung! 🍀
