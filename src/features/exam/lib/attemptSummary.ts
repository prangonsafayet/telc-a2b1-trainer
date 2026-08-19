import { type Attempt, type ExamModule } from '@shared/types';

export interface SkillBar {
  readonly label: string;
  readonly value: number;
  readonly of: number;
}

export interface ModuleTimeEntry {
  readonly module: ExamModule;
  readonly seconds: number;
}

export interface AttemptSummary {
  readonly isFull: boolean;
  readonly totalSeconds: number;
  readonly accentColor: string;
  readonly skillBars: readonly SkillBar[];
  readonly moduleTimes: readonly ModuleTimeEntry[];
  /** For a single-module practice run: the one number worth showing large. */
  readonly headlineScore: string;
  readonly headlineSuffix: string;
}

/** Turns a stored attempt into the numbers and labels the results screen renders. */
export const summarizeAttempt = (attempt: Attempt): AttemptSummary => {
  const isFull = attempt.mode === 'full';
  const { scores, sb } = attempt;

  const skillBars: SkillBar[] = [];
  if (scores.lesen != null) skillBars.push({ label: 'Lesen', value: scores.lesen, of: 60 });
  if (scores.hoeren != null) skillBars.push({ label: 'Hören', value: scores.hoeren, of: 60 });
  if (scores.schreiben != null)
    skillBars.push({ label: 'Schreiben (self)', value: scores.schreiben, of: 60 });
  if (scores.sprechen != null) skillBars.push({ label: 'Sprechen (self)', value: scores.sprechen, of: 60 });
  if (sb) skillBars.push({ label: 'Sprachbausteine', value: sb.correct, of: sb.of });

  const moduleTimes = Object.entries(attempt.times)
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
    skillBars,
    moduleTimes,
    headlineScore,
    headlineSuffix: firstSkillScore != null ? '/60' : ''
  };
};
