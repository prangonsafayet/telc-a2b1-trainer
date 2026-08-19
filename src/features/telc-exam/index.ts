/**
 * Public surface of the B1/B2 exam feature. Route components are deliberately not
 * exported here — the router deep-imports them so importing this feature does not drag
 * three screens along.
 */
export { useTelcAttempt, useTelcStart } from './hooks/useTelcAttempt.ts';
export { useTelcRunStore, telcSecondsLeft, currentTelcModule } from './lib/runStore.ts';
export type { TelcRun, TelcRunPhase } from './lib/runStore.ts';
export { gradeTelcExam, scoreTelcHoeren, scoreTelcLesen, scoreTelcSprachbausteine } from './lib/scoring.ts';
export type { TelcGrade, TelcModuleScore } from './lib/scoring.ts';
export { summarizeTelcAttempt } from './lib/telcAttemptSummary.ts';
