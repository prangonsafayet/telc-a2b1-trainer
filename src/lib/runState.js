/* The in-progress exam attempt, mirrored to localStorage so that a page refresh
   (or an accidental tab close) resumes exactly where you were — same module,
   same answers, same remaining time. Recordings are session-only and not stored. */
const RUN_KEY = 'telcTrainerRunV1';

export function loadRun() {
  try {
    const raw = localStorage.getItem(RUN_KEY);
    if (!raw) return null;
    const run = JSON.parse(raw);
    return run && run.examId && Array.isArray(run.queue) ? run : null;
  } catch (e) {
    return null;
  }
}

export function saveRun(run) {
  try {
    if (run) localStorage.setItem(RUN_KEY, JSON.stringify(run));
    else localStorage.removeItem(RUN_KEY);
  } catch (e) { /* private mode — the run simply won't survive a refresh */ }
}

export function clearRun() { saveRun(null); }

export function newRun(examId, mode, queue) {
  return {
    runId: Date.now(),
    examId: Number(examId),
    mode,
    queue,
    idx: 0,
    phase: 'brief',      // brief → module → rating (schreiben/sprechen only)
    answers: {},
    times: {},
    plays: {},
    ratings: {},
    deadline: null,      // epoch ms; survives a refresh, unlike a seconds counter
    moduleStart: null
  };
}

export const secondsLeft = run =>
  run && run.deadline ? Math.max(0, Math.round((run.deadline - Date.now()) / 1000)) : 0;
