import { MODULE_META } from '@shared/config/exam.ts';
import { fmtClock, fmtDate } from '@shared/lib/format.ts';
import { type Attempt, type ExamGrade } from '@shared/types';

/** One table row, pre-formatted so the table component stays presentational. */
export interface AttemptRow {
  readonly id: number;
  readonly date: string;
  readonly test: string;
  readonly mode: string;
  readonly lesen: string;
  readonly sprachbausteine: string;
  readonly hoeren: string;
  readonly schreiben: string;
  readonly sprechen: string;
  readonly total: string;
  readonly result: ExamGrade | null;
  readonly time: string;
}

const DASH = '–';

const score = (value: number | undefined): string => (value == null ? DASH : String(value));

/** Newest first — the most recent attempt is the one you want to see. */
export const buildAttemptRows = (attempts: readonly Attempt[]): readonly AttemptRow[] =>
  attempts.toReversed().map<AttemptRow>(attempt => {
    const seconds = Object.values(attempt.times).reduce<number>((sum, value) => sum + value, 0);
    return {
      id: attempt.id,
      date: fmtDate(attempt.date),
      test: `T${String(attempt.examId)}`,
      mode: attempt.mode === 'full' ? 'Full' : MODULE_META[attempt.mode].short,
      lesen: score(attempt.scores.lesen),
      sprachbausteine: attempt.sb ? `${String(attempt.sb.percent)}%` : DASH,
      hoeren: score(attempt.scores.hoeren),
      schreiben: score(attempt.scores.schreiben),
      sprechen: score(attempt.scores.sprechen),
      total: attempt.mode === 'full' ? `${String(attempt.total ?? 0)}/240` : DASH,
      result: attempt.mode === 'full' ? (attempt.result ?? 'Nicht bestanden') : null,
      time: fmtClock(seconds)
    };
  });

export const ATTEMPT_COLUMNS = [
  'Date',
  'Test',
  'Mode',
  'Lesen',
  'SB %',
  'Hören',
  'Schreiben',
  'Sprechen',
  'Total',
  'Result',
  'Time',
  ''
] as const;
