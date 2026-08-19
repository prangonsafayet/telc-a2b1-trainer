/** Display formatting helpers. All dates are handled in the viewer's local time. */

export const LETTERS = 'abcdefghijkl';

/** Seconds → `m:ss`, clamped at zero. */
export function fmtClock(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${String(minutes)}:${String(rest).padStart(2, '0')}`;
}

/** ISO timestamp → `dd.mm.yy`. */
export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

export function wordCount(text: string | undefined): number {
  const trimmed = text?.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

/**
 * `new Date('2026-09-12')` is parsed as UTC midnight, which is the previous day
 * anywhere west of Greenwich. These two build and format the date from its parts so a
 * calendar day always means that calendar day.
 */
export function parseIsoDate(iso: string | undefined): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso ?? '');
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function toIsoDate(date: Date): string {
  const pad = (n: number): string => String(n).padStart(2, '0');
  return `${String(date.getFullYear())}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Whole days from today to `iso`; negative once the date has passed. */
export function daysUntil(iso: string | undefined): number | null {
  const target = parseIsoDate(iso);
  if (!target) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}
