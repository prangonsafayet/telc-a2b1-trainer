/**
 * Public surface of the B1/B2 level-trainer feature. Route components are deliberately
 * not exported here — the router deep-imports them.
 */
export { useLevelStats } from './hooks/useLevelStats.ts';
export { usePractice } from './hooks/usePractice.ts';
export { buildLevelStats, buildWeakAreas } from './lib/levelStats.ts';
export type { LevelDashboardStats, WeakArea } from './lib/levelStats.ts';
export { buildQuiz } from './lib/quiz.ts';
export type { QuizQuestion } from './lib/quiz.ts';
export { allCards, cardsFor, CATEGORY_META, idsFor, STUDY_CATEGORIES } from './lib/studyItems.ts';
export type { StudyCard } from './lib/studyItems.ts';
