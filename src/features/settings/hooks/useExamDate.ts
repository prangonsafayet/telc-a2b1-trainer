import { useCallback, useMemo, useState } from 'react';

import { daysUntil, parseIsoDate, toIsoDate } from '@shared/lib/format.ts';

export interface ExamDateState {
  readonly open: boolean;
  readonly setOpen: (open: boolean) => void;
  readonly selected: Date | undefined;
  readonly label: string;
  readonly countdownHint: string | null;
  readonly select: (date: Date | undefined) => void;
  readonly selectToday: () => void;
  /** Year range offered in the calendar's dropdowns. */
  readonly startMonth: Date;
  readonly endMonth: Date;
}

const YEARS_BACK = 1;
const YEARS_FORWARD = 5;

function describeCountdown(days: number | null): string | null {
  if (days == null) return null;
  if (days > 0) {
    return `${String(days)} day${days === 1 ? '' : 's'} to go — the countdown in the header follows this date.`;
  }
  if (days === 0) return 'That is today. Viel Erfolg! 🍀';
  const past = Math.abs(days);
  return `That was ${String(past)} day${past === 1 ? '' : 's'} ago — pick a new date.`;
}

/** Presentation state for the exam-date picker. */
export function useExamDate(value: string, onChange: (iso: string) => void): ExamDateState {
  const [open, setOpen] = useState(false);
  const selected = parseIsoDate(value) ?? undefined;

  const label = selected
    ? selected.toLocaleDateString('de-DE', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    : 'Pick your exam date';

  const select = useCallback(
    (date: Date | undefined) => {
      if (!date) return;
      onChange(toIsoDate(date));
      setOpen(false);
    },
    [onChange]
  );

  const selectToday = useCallback(() => {
    onChange(toIsoDate(new Date()));
    setOpen(false);
  }, [onChange]);

  const { startMonth, endMonth } = useMemo(() => {
    const thisYear = new Date().getFullYear();
    return {
      startMonth: new Date(thisYear - YEARS_BACK, 0),
      endMonth: new Date(thisYear + YEARS_FORWARD, 11)
    };
  }, []);

  return {
    open,
    setOpen,
    selected,
    label,
    countdownHint: describeCountdown(daysUntil(value)),
    select,
    selectToday,
    startMonth,
    endMonth
  };
}
