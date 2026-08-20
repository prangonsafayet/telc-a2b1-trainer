/**
 * Public surface of the exam feature: the paper a trainer sets, and enough of a run's
 * machinery for a dashboard to start, resume or discard one. Route components are
 * deliberately NOT re-exported — the router imports them directly by path, so pulling in
 * the exam domain never drags three screens along with it.
 */
export { useStartAttempt } from './hooks/useStartAttempt.ts';
export { runFormatFor } from './lib/formats/runFormats.ts';
export type { ExamRun } from './types/run.ts';
