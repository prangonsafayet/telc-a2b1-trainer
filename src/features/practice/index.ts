/**
 * Public surface of the practice hub: the spaced-repetition drills every trainer's
 * vocabulary and grammar bank is studied with. Route components are deliberately not
 * exported here — the router deep-imports them.
 */
export { usePractice } from './hooks/usePractice.ts';
export { buildQuiz } from './lib/quiz.ts';
export type { QuizQuestion } from './lib/quiz.ts';
