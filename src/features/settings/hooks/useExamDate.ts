import { useCallback, useMemo, useState } from 'react';

import { MAX_PREP_DAYS, MIN_PREP_DAYS } from '@shared/config/schedule.ts';
import { addDays, daysBetween, parseIsoDate, toIsoDate } from '@shared/lib/format.ts';

import { describePlanShape, useToday } from '@features/plan';

/** How far "+30 days" jumps — a comfortable default runway. */
const DEFAULT_JUMP_DAYS = 30;

export interface ExamDateState {
  readonly open: boolean;
  readonly setOpen: (open: boolean) => void;
  readonly selected: Date | undefined;
  readonly label: string;
  /** What the current date means for the countdown. */
  readonly countdownHint: string | null;
  /** What the current date means for the plan: lessons vs mock days. */
  readonly planHint: string | null;
  /** Set when the stored date sits outside the plannable window. Never blocks. */
  readonly rangeWarning: string | null;
  readonly select: (date: Date | undefined) => void;
  readonly selectDefaultRunway: () => void;
  /** Bound to the "days until exam" input; only commits an in-range number. */
  readonly daysInput: string;
  readonly setDaysInput: (raw: string) => void;
  /** Set while the typed number is not a date the plan can use. */
  readonly daysError: string | null;
  /** Drops an unusable draft on blur, so the field never disagrees with the calendar. */
  readonly revertDaysInput: () => void;
  readonly minDays: number;
  readonly maxDays: number;
  /** Earliest and latest plannable day, for the calendar's own limits. */
  readonly earliest: Date;
  readonly latest: Date;
  /** Year range offered in the calendar's dropdowns. */
  readonly startMonth: Date;
  readonly endMonth: Date;
}

const describeCountdown = (days: number | null): string | null => {
  if (days == null) return null;
  if (days > 0) {
    return `${String(days)} day${days === 1 ? '' : 's'} to go — the countdown in the header follows this date.`;
  }
  if (days === 0) return 'That is today. Viel Erfolg! 🍀';
  const past = Math.abs(days);
  return `That was ${String(past)} day${past === 1 ? '' : 's'} ago — pick a new date.`;
};

/**
 * A date outside the plannable window is still allowed — it is the user's exam, not ours —
 * but the plan it produces is a fallback, so it is said out loud.
 */
const describeRange = (days: number | null): string | null => {
  if (days == null) return 'That date could not be read. Pick one from the calendar.';
  if (days < 0) return 'This date has passed, so there is no plan to build. Pick your next exam date.';
  if (days < MIN_PREP_DAYS) {
    return `Under ${String(MIN_PREP_DAYS)} days out, the plan drops to an emergency sprint: a crash course, a few papers, then rest.`;
  }
  if (days > MAX_PREP_DAYS) {
    return `More than ${String(MAX_PREP_DAYS)} days out. The plan covers the next ${String(MAX_PREP_DAYS)} days and re-paces itself as the date gets closer.`;
  }
  return null;
};

/**
 * A number the plan cannot use is refused rather than silently ignored — the field keeps
 * showing what was typed, says why it is not accepted, and reverts on blur.
 */
const describeDaysError = (draft: string): string | null => {
  if (draft === '') return `Enter a number between ${String(MIN_PREP_DAYS)} and ${String(MAX_PREP_DAYS)}.`;
  if (!/^\d{1,3}$/.test(draft)) return 'Whole days only.';
  const days = Number(draft);
  if (days < MIN_PREP_DAYS) {
    return `Too close to plan: ${String(MIN_PREP_DAYS)} days is the minimum. For a nearer exam, pick the date in the calendar.`;
  }
  if (days > MAX_PREP_DAYS) return `${String(MAX_PREP_DAYS)} days is the longest plan.`;
  return null;
};

/** Presentation state for the exam-date controls. */
export const useExamDate = (value: string, onChange: (iso: string) => void): ExamDateState => {
  const today = useToday();
  const [open, setOpen] = useState(false);
  const selected = parseIsoDate(value) ?? undefined;
  const daysLeft = daysBetween(today, value);

  /* Typing "1" on the way to "12" must not be rejected as out of range, so the field keeps
     its own draft and only writes the date once the number is plannable. The draft is
     re-derived during render whenever the stored date changes from elsewhere — the calendar,
     a cloud sync, another tab — which is React's own answer to state that follows a prop. */
  const [daysInput, setDraft] = useState(() => (daysLeft == null ? '' : String(daysLeft)));
  const [lastDaysLeft, setLastDaysLeft] = useState(daysLeft);
  if (daysLeft !== lastDaysLeft) {
    setLastDaysLeft(daysLeft);
    setDraft(daysLeft == null ? '' : String(daysLeft));
  }

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

  const selectDefaultRunway = useCallback(() => {
    const iso = addDays(today, DEFAULT_JUMP_DAYS);
    if (iso) onChange(iso);
    setOpen(false);
  }, [onChange, today]);

  const setDaysInput = useCallback(
    (raw: string) => {
      setDraft(raw);
      const days = Number(raw);
      if (!/^\d{1,3}$/.test(raw) || days < MIN_PREP_DAYS || days > MAX_PREP_DAYS) return;
      const iso = addDays(today, days);
      if (iso) onChange(iso);
    },
    /* `setDraft` is a stable setState, but the React Compiler checks the list literally. */
    [onChange, today, setDraft]
  );

  const revertDaysInput = useCallback(() => {
    setDraft(daysLeft == null ? '' : String(daysLeft));
  }, [daysLeft, setDraft]);

  const { earliest, latest, startMonth, endMonth } = useMemo(() => {
    const first = parseIsoDate(addDays(today, MIN_PREP_DAYS) ?? undefined) ?? new Date();
    const last = parseIsoDate(addDays(today, MAX_PREP_DAYS) ?? undefined) ?? new Date();
    return {
      earliest: first,
      latest: last,
      /* The dropdowns offer only the months the window touches, so there is nothing to
         scroll to that cannot be picked. */
      startMonth: new Date(first.getFullYear(), first.getMonth()),
      endMonth: new Date(last.getFullYear(), last.getMonth())
    };
  }, [today]);

  return {
    open,
    setOpen,
    selected,
    label,
    countdownHint: describeCountdown(daysLeft),
    planHint: daysLeft != null && daysLeft >= 0 ? describePlanShape(daysLeft) : null,
    rangeWarning: describeRange(daysLeft),
    select,
    selectDefaultRunway,
    daysInput,
    setDaysInput,
    daysError: describeDaysError(daysInput),
    revertDaysInput,
    minDays: MIN_PREP_DAYS,
    maxDays: MAX_PREP_DAYS,
    earliest,
    latest,
    startMonth,
    endMonth
  };
};
