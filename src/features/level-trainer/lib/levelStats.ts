import { SINGLE_LEVEL_SECTION_MAX } from '@shared/config/singleLevelExam.ts';
import { countMastery, streakLength, type MasteryCounts } from '@shared/lib/srs.ts';
import {
  type ExamModule,
  type SrsMap,
  type StudyCategory,
  type SingleLevelAttempt,
  type SingleLevelExam,
  type VocabBank
} from '@shared/types';

import { idsFor, STUDY_CATEGORIES } from './studyItems.ts';

/** The part of a trainer's stored slice these stats are derived from. */
export interface LevelStatsInput {
  readonly attempts: readonly SingleLevelAttempt[];
  readonly srs: SrsMap;
  readonly activity: Readonly<Partial<Record<string, number>>>;
}

/** The part of a trainer's content these stats are derived from. */
export interface LevelStatsContent {
  readonly vocab: VocabBank;
  readonly exams: readonly SingleLevelExam[];
}

export interface LevelExamCardStats {
  readonly exam: SingleLevelExam;
  readonly attemptCount: number;
  readonly bestTotal: number | null;
  readonly lastResult: string | null;
}

export interface LevelDashboardStats {
  readonly streak: number;
  readonly mastery: MasteryCounts;
  readonly categoryMastery: Readonly<Record<StudyCategory, MasteryCounts>>;
  readonly attempts: readonly SingleLevelAttempt[];
  readonly fullAttempts: readonly SingleLevelAttempt[];
  readonly practiceCount: number;
  readonly bestTotal: number | null;
  readonly lastAttempt: SingleLevelAttempt | null;
  readonly examCards: readonly LevelExamCardStats[];
}

/** Everything the level dashboard shows, derived from the document — never persisted. */
export const buildLevelStats = (
  doc: LevelStatsInput,
  content: LevelStatsContent,
  today: string
): LevelDashboardStats => {
  const categoryMastery = Object.fromEntries(
    STUDY_CATEGORIES.map(category => [
      category,
      countMastery(idsFor(content.vocab, category), doc.srs, today)
    ])
  ) as Record<StudyCategory, MasteryCounts>;

  const allIds = STUDY_CATEGORIES.flatMap(category => idsFor(content.vocab, category));
  const fullAttempts = doc.attempts.filter(attempt => attempt.mode === 'full');
  const totals = fullAttempts
    .map(attempt => attempt.total)
    .filter((total): total is number => typeof total === 'number');

  return {
    streak: streakLength(doc.activity, today),
    mastery: countMastery(allIds, doc.srs, today),
    categoryMastery,
    attempts: doc.attempts,
    fullAttempts,
    practiceCount: doc.attempts.length - fullAttempts.length,
    bestTotal: totals.length > 0 ? Math.max(...totals) : null,
    lastAttempt: doc.attempts.at(-1) ?? null,
    examCards: content.exams.map(exam => {
      const examAttempts = doc.attempts.filter(attempt => attempt.examId === exam.id);
      const examTotals = examAttempts
        .map(attempt => attempt.total)
        .filter((total): total is number => typeof total === 'number');
      return {
        exam,
        attemptCount: examAttempts.length,
        bestTotal: examTotals.length > 0 ? Math.max(...examTotals) : null,
        lastResult: examAttempts.at(-1)?.result ?? null
      };
    })
  };
};

export interface WeakArea {
  /** Stable key for React lists. */
  readonly key: string;
  readonly label: string;
  readonly detail: string;
  /** Where one tap should take the learner. */
  readonly drill: { readonly kind: 'quiz'; readonly category: StudyCategory } | { readonly kind: 'exam' };
  /** 0–1, higher = weaker. Drives the ordering. */
  readonly severity: number;
}

const SECTION_LABELS: Readonly<Record<ExamModule, string>> = {
  lesen: 'Leseverstehen',
  sprachbausteine: 'Sprachbausteine',
  hoeren: 'Hörverstehen',
  schreiben: 'Schriftlicher Ausdruck',
  sprechen: 'Mündliche Prüfung'
};

/** The weakest study categories and exam sections, worst first. */
export const buildWeakAreas = (
  doc: LevelStatsInput,
  content: LevelStatsContent,
  categoryLabels: Readonly<Record<StudyCategory, string>>
): readonly WeakArea[] => {
  const areas: WeakArea[] = [];

  for (const category of STUDY_CATEGORIES) {
    const ids = idsFor(content.vocab, category);
    let wrong = 0;
    let seen = 0;
    for (const id of ids) {
      const entry = doc.srs[id];
      if (!entry) continue;
      wrong += entry.wrong;
      seen += entry.seen;
    }
    if (seen < 5) continue; // Too little signal to call anything weak.
    const rate = wrong / seen;
    if (rate < 0.2) continue;
    areas.push({
      key: `vocab.${category}`,
      label: categoryLabels[category],
      detail: `${String(wrong)} of ${String(seen)} answers wrong — drill the weak cards.`,
      drill: { kind: 'quiz', category },
      severity: rate
    });
  }

  const sections: readonly ExamModule[] = ['lesen', 'sprachbausteine', 'hoeren', 'schreiben', 'sprechen'];
  for (const section of sections) {
    const scores = doc.attempts
      .map(attempt => attempt.scores[section])
      .filter((score): score is number => typeof score === 'number');
    if (scores.length === 0) continue;
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const percent = average / SINGLE_LEVEL_SECTION_MAX[section];
    if (percent >= 0.6) continue; // At or above pass level is not a weak area.
    areas.push({
      key: `exam.${section}`,
      label: SECTION_LABELS[section],
      detail: `Averaging ${String(Math.round(percent * 100))}% across ${String(scores.length)} attempt${scores.length === 1 ? '' : 's'} — below the 60% pass line.`,
      drill: { kind: 'exam' },
      severity: 1 - percent
    });
  }

  return areas.toSorted((a, b) => b.severity - a.severity);
};
