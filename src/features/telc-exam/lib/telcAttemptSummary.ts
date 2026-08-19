import { TELC_SECTION_MAX } from '@shared/config/telcExam.ts';
import { type ExamModule, type TelcAttempt } from '@shared/types';

export interface TelcSectionBar {
  readonly label: string;
  readonly value: number;
  readonly of: number;
}

export interface TelcModuleTimeEntry {
  readonly module: ExamModule;
  readonly seconds: number;
}

export interface TelcAttemptSummary {
  readonly isFull: boolean;
  readonly totalSeconds: number;
  readonly accentColor: string;
  readonly sectionBars: readonly TelcSectionBar[];
  readonly moduleTimes: readonly TelcModuleTimeEntry[];
  /** For a single-module practice run: the one number worth showing large. */
  readonly headlineScore: string;
  readonly headlineSuffix: string;
}

const SECTION_LABELS: Readonly<Record<ExamModule, string>> = {
  lesen: 'Lesen',
  sprachbausteine: 'Sprachbausteine',
  hoeren: 'Hören',
  schreiben: 'Schreiben (self)',
  sprechen: 'Sprechen (self)'
};

/** Turns a stored B1/B2 attempt into the numbers and labels the results screen renders. */
export const summarizeTelcAttempt = (attempt: TelcAttempt): TelcAttemptSummary => {
  const isFull = attempt.mode === 'full';
  const { scores } = attempt;

  const sectionBars: TelcSectionBar[] = (
    ['lesen', 'sprachbausteine', 'hoeren', 'schreiben', 'sprechen'] as const
  )
    .filter(module => scores[module] != null)
    .map(module => ({
      label: SECTION_LABELS[module],
      value: scores[module] ?? 0,
      of: TELC_SECTION_MAX[module]
    }));

  const moduleTimes = Object.entries(attempt.times)
    .filter((entry): entry is [ExamModule, number] => typeof entry[1] === 'number')
    .map(([module, seconds]) => ({ module, seconds }));

  const totalSeconds = moduleTimes.reduce((sum, entry) => sum + entry.seconds, 0);

  const firstBar = sectionBars[0];
  const accentColor = !isFull
    ? 'var(--primary)'
    : attempt.result === 'Bestanden'
      ? 'var(--success)'
      : 'var(--destructive)';

  return {
    isFull,
    totalSeconds,
    accentColor,
    sectionBars,
    moduleTimes,
    headlineScore: firstBar ? String(firstBar.value) : '–',
    headlineSuffix: firstBar ? `/${String(firstBar.of)}` : ''
  };
};
