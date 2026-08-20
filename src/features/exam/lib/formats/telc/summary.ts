import {
  TELC_ORAL_MAX,
  TELC_ORAL_PASS,
  TELC_SECTION_MAX,
  TELC_TOTAL_MAX,
  TELC_WRITTEN_MAX,
  TELC_WRITTEN_PASS
} from '@shared/config/telcExam.ts';
import { type ExamModule, type TelcAttempt } from '@shared/types';

import {
  type AttemptGrade,
  type AttemptSummary,
  type ModuleTimeEntry,
  type ScoreBar
} from '@features/exam/types/examFormat.ts';

const SECTION_LABELS: Readonly<Record<ExamModule, string>> = {
  lesen: 'Lesen',
  sprachbausteine: 'Sprachbausteine',
  hoeren: 'Hören',
  schreiben: 'Schreiben (self)',
  sprechen: 'Sprechen (self)'
};

const SECTION_ORDER: readonly ExamModule[] = ['lesen', 'sprachbausteine', 'hoeren', 'schreiben', 'sprechen'];

const gradeFor = (attempt: TelcAttempt): AttemptGrade | null => {
  if (attempt.mode !== 'full' || attempt.total == null || attempt.result == null) return null;
  const passed = attempt.result === 'Bestanden';
  return {
    label: attempt.result,
    tone: passed ? 'success' : 'destructive',
    total: attempt.total,
    of: TELC_TOTAL_MAX,
    notes: [
      `Written: ${String(attempt.written ?? 0)}/${String(TELC_WRITTEN_MAX)} (pass ≥ ${String(TELC_WRITTEN_PASS)}) · Oral: ${String(attempt.oral ?? 0)}/${String(TELC_ORAL_MAX)} (pass ≥ ${String(TELC_ORAL_PASS)}) — both must pass, no compensation.`
    ]
  };
};

/** Turns a stored B1/B2 attempt into the numbers and labels the results screen renders. */
export const summarizeAttempt = (attempt: TelcAttempt): AttemptSummary => {
  const isFull = attempt.mode === 'full';
  const { scores } = attempt;

  const bars: readonly ScoreBar[] = SECTION_ORDER.filter(module => scores[module] != null).map(module => ({
    label: SECTION_LABELS[module],
    value: scores[module] ?? 0,
    of: TELC_SECTION_MAX[module]
  }));

  const moduleTimes: readonly ModuleTimeEntry[] = Object.entries(attempt.times)
    .filter((entry): entry is [ExamModule, number] => typeof entry[1] === 'number')
    .map(([module, seconds]) => ({ module, seconds }));

  const totalSeconds = moduleTimes.reduce((sum, entry) => sum + entry.seconds, 0);
  const firstBar = bars[0];

  return {
    isFull,
    totalSeconds,
    accentColor: !isFull
      ? 'var(--primary)'
      : attempt.result === 'Bestanden'
        ? 'var(--success)'
        : 'var(--destructive)',
    bars,
    moduleTimes,
    grade: gradeFor(attempt),
    headlineScore: firstBar ? String(firstBar.value) : '–',
    headlineSuffix: firstBar ? `/${String(firstBar.of)}` : ''
  };
};
