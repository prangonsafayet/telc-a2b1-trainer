import { FULL_EXAM_MAX, SKILL_MAX } from '@shared/config/exam.ts';
import { type DualLevelAttempt, type ExamModule } from '@shared/types';

import {
  type AttemptGrade,
  type AttemptSummary,
  type ModuleTimeEntry,
  type ScoreBar
} from '@features/exam/types/examFormat.ts';

/** The pass rule, spelled out under the grade. */
const PASS_RULE =
  'B1 rule: ≥42/60 in three skills + ≥24/60 in the fourth. A2 rule: ≥24/60 in three + ≥6/60 in the fourth.';

const gradeFor = (attempt: DualLevelAttempt): AttemptGrade | null => {
  if (attempt.mode !== 'full' || attempt.total == null || attempt.result == null) return null;
  return {
    label: attempt.result,
    tone: attempt.result === 'B1' ? 'success' : attempt.result === 'A2' ? 'warning' : 'destructive',
    total: attempt.total,
    of: FULL_EXAM_MAX,
    notes: [PASS_RULE]
  };
};

/** Turns a stored attempt into the numbers and labels the results screen renders. */
export const summarizeAttempt = (attempt: DualLevelAttempt): AttemptSummary => {
  const isFull = attempt.mode === 'full';
  const { scores, sb } = attempt;

  const bars: ScoreBar[] = [];
  if (scores.lesen != null) bars.push({ label: 'Lesen', value: scores.lesen, of: SKILL_MAX });
  if (scores.hoeren != null) bars.push({ label: 'Hören', value: scores.hoeren, of: SKILL_MAX });
  if (scores.schreiben != null)
    bars.push({ label: 'Schreiben (self)', value: scores.schreiben, of: SKILL_MAX });
  if (scores.sprechen != null) bars.push({ label: 'Sprechen (self)', value: scores.sprechen, of: SKILL_MAX });
  if (sb) bars.push({ label: 'Sprachbausteine', value: sb.correct, of: sb.of });

  const moduleTimes: readonly ModuleTimeEntry[] = Object.entries(attempt.times)
    .filter((entry): entry is [ExamModule, number] => typeof entry[1] === 'number')
    .map(([module, seconds]) => ({ module, seconds }));

  const totalSeconds = moduleTimes.reduce((sum, entry) => sum + entry.seconds, 0);

  const firstSkillScore = Object.values(scores).find(value => typeof value === 'number');
  const headlineScore =
    firstSkillScore != null ? String(firstSkillScore) : sb ? `${String(sb.percent)}%` : '–';

  const accentColor = !isFull
    ? 'var(--primary)'
    : attempt.result === 'B1'
      ? 'var(--success)'
      : attempt.result === 'A2'
        ? 'var(--warning)'
        : 'var(--destructive)';

  return {
    isFull,
    totalSeconds,
    accentColor,
    bars,
    moduleTimes,
    grade: gradeFor(attempt),
    headlineScore,
    headlineSuffix: firstSkillScore != null ? `/${String(SKILL_MAX)}` : ''
  };
};
