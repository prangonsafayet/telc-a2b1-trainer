/**
 * Public surface of the exam feature: domain logic other features may legitimately use.
 * Route components are deliberately NOT re-exported — the router imports them directly by
 * path, so pulling in the exam domain never drags three screens along with it.
 */
export { useRetryExam } from './hooks/use-attempt.ts';
export { clearRun, createRun, loadRun, saveRun, secondsLeft } from './lib/run-state.ts';
export {
  countUnanswered,
  gradeFullExam,
  isGapCorrect,
  scoreHoeren,
  scoreLesen,
  scoreSprachbausteine
} from './lib/scoring.ts';
export type { ExamRun, RunPhase } from './lib/run-state.ts';
export type { SpeakingPart } from './hooks/use-exam-run.ts';
