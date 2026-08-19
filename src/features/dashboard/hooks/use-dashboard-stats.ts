import { useMemo } from 'react';

import { EXAMS } from '@/content/exams';

import { type Attempt, type Exam, type SkillKey } from '@/shared/types';

import { useProgress } from '@/features/progress';

/** B1 needs 168/240 overall; A2 territory starts around 96. */
const B1_TOTAL = 168;
const A2_TOTAL = 96;

export interface ExamCardStats {
  readonly exam: Exam;
  readonly best: Attempt | null;
  readonly attemptCount: number;
}

export interface DashboardStats {
  readonly attempts: readonly Attempt[];
  readonly fullAttempts: readonly Attempt[];
  readonly practiceCount: number;
  readonly bestTotal: number | null;
  readonly bestTotalCaption: string;
  readonly lastAttempt: Attempt | null;
  readonly bestPerSkill: Readonly<Record<SkillKey, number | null>>;
  readonly examCards: readonly ExamCardStats[];
}

const SKILL_KEYS: readonly SkillKey[] = ['lesen', 'hoeren', 'schreiben', 'sprechen'];

function captionForBest(best: number | null): string {
  if (best == null) return 'no full exam yet';
  if (best >= B1_TOTAL) return 'B1 territory 🎉';
  if (best >= A2_TOTAL) return 'A2 zone — push to 168';
  return 'keep training';
}

/** Everything the dashboard displays, derived from the stored attempts. */
export function useDashboardStats(): DashboardStats {
  const { db } = useProgress();

  return useMemo(() => {
    const attempts = db.attempts;
    const fullAttempts = attempts.filter(attempt => attempt.mode === 'full');
    const totals = fullAttempts.map(attempt => attempt.total ?? 0);
    const bestTotal = totals.length > 0 ? Math.max(...totals) : null;

    const bestPerSkill = Object.fromEntries(
      SKILL_KEYS.map(key => {
        const scores = attempts
          .map(attempt => attempt.scores[key])
          .filter((value): value is number => value != null);
        return [key, scores.length > 0 ? Math.max(...scores) : null];
      })
    ) as Record<SkillKey, number | null>;

    const examCards = EXAMS.map<ExamCardStats>(exam => {
      const forExam = fullAttempts.filter(attempt => attempt.examId === exam.id);
      const best =
        forExam.length > 0 ? forExam.reduce((a, b) => ((b.total ?? 0) > (a.total ?? 0) ? b : a)) : null;
      return { exam, best, attemptCount: attempts.filter(attempt => attempt.examId === exam.id).length };
    });

    return {
      attempts,
      fullAttempts,
      practiceCount: attempts.length - fullAttempts.length,
      bestTotal,
      bestTotalCaption: captionForBest(bestTotal),
      lastAttempt: attempts.at(-1) ?? null,
      bestPerSkill,
      examCards
    };
  }, [db.attempts]);
}
