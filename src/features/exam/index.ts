/**
 * Public surface of the exam feature: domain logic other features may legitimately use.
 * Route components are deliberately NOT re-exported — the router imports them directly by
 * path, so pulling in the exam domain never drags three screens along with it.
 */
export { useRetryExam } from './hooks/useAttempt.ts';
export { clearRun, createRun, loadRun, saveRun, secondsLeft } from './lib/runState.ts';
export {
  countUnanswered,
  gradeFullExam,
  isGapCorrect,
  scoreHoeren,
  scoreLesen,
  scoreSprachbausteine
} from './lib/scoring.ts';
export type { ExamRun, RunPhase } from './lib/runState.ts';
export type { SpeakingPart } from './hooks/useExamRun.ts';
