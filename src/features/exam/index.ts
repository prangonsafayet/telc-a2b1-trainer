/**
 * Public surface of the exam feature: the two papers it can run, and enough of a run's
 * machinery for the dashboards to start, resume or discard one. Route components are
 * deliberately NOT re-exported — the router imports them directly by path, so pulling in
 * the exam domain never drags three screens along with it.
 */
export { useStartAttempt } from './hooks/useStartAttempt.ts';
export { A2B1_RUN_FORMAT } from './lib/formats/a2b1/runFormat.ts';
export { TELC_RUN_FORMAT } from './lib/formats/telc/runFormat.ts';
export { runFormatFor } from './lib/formats/runFormats.ts';
export { createRun, currentModule, queueForMode, secondsLeft } from './lib/runStore.ts';
export type { ExamRunFormat } from './types/examFormat.ts';
export type { ExamRun, ExamRunStore, RunPhase } from './types/run.ts';
