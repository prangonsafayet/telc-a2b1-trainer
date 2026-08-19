import { describe, expect, it } from 'vitest';

import {
  addDays,
  daysBetween,
  daysUntil,
  fmtClock,
  parseIsoDate,
  toIsoDate,
  wordCount
} from '@shared/lib/format.ts';

/* `new Date('2026-09-12')` is UTC midnight, which is the day before anywhere west of
   Greenwich. Every date in this app goes through these helpers for that reason, so they
   are guarded directly — the bug is invisible in the UI. */
describe('ISO date handling', () => {
  it('parses a calendar day as that calendar day in local time', () => {
    const date = parseIsoDate('2026-09-12');
    expect(date?.getFullYear()).toBe(2026);
    expect(date?.getMonth()).toBe(8);
    expect(date?.getDate()).toBe(12);
  });

  it('round-trips', () => {
    expect(toIsoDate(parseIsoDate('2026-09-12') as Date)).toBe('2026-09-12');
  });

  it('rejects anything that is not a date', () => {
    expect(parseIsoDate('not-a-date')).toBeNull();
    expect(parseIsoDate('')).toBeNull();
    expect(parseIsoDate(undefined)).toBeNull();
    expect(parseIsoDate('2026-9-12')).toBeNull();
  });
});

describe('addDays', () => {
  it('shifts by whole days', () => {
    expect(addDays('2026-03-02', 5)).toBe('2026-03-07');
    expect(addDays('2026-03-02', -3)).toBe('2026-02-27');
  });

  it('crosses months, years and a leap day', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2028-02-28', 1)).toBe('2028-02-29');
  });

  it('survives a spring-forward DST boundary', () => {
    /* Adding days via the date parts rather than 86_400_000 ms: an hour lost to DST must
       not turn "+1 day" into "same day, 23:00". */
    expect(addDays('2026-03-28', 1)).toBe('2026-03-29');
    expect(addDays('2026-03-29', 1)).toBe('2026-03-30');
  });

  it('returns null for junk', () => {
    expect(addDays('soon', 1)).toBeNull();
  });
});

describe('daysBetween', () => {
  it('counts whole days in both directions', () => {
    expect(daysBetween('2026-03-02', '2026-03-09')).toBe(7);
    expect(daysBetween('2026-03-09', '2026-03-02')).toBe(-7);
    expect(daysBetween('2026-03-02', '2026-03-02')).toBe(0);
  });

  it('reads no clock, so it agrees with addDays at every offset', () => {
    for (let offset = -400; offset <= 400; offset += 7) {
      expect(daysBetween('2026-03-02', addDays('2026-03-02', offset) as string)).toBe(offset);
    }
  });

  it('returns null when either side is not a date', () => {
    expect(daysBetween('2026-03-02', 'soon')).toBeNull();
    expect(daysBetween(undefined, '2026-03-02')).toBeNull();
  });
});

describe('daysUntil', () => {
  it('is zero for today', () => {
    expect(daysUntil(toIsoDate(new Date()))).toBe(0);
  });

  it('is negative once the date has passed', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(daysUntil(toIsoDate(yesterday))).toBe(-1);
  });
});

describe('display helpers', () => {
  it('formats a clock and clamps at zero', () => {
    expect(fmtClock(0)).toBe('0:00');
    expect(fmtClock(65)).toBe('1:05');
    expect(fmtClock(-5)).toBe('0:00');
    expect(fmtClock(3600)).toBe('60:00');
  });

  it('counts words the way the writing task does', () => {
    expect(wordCount('  Hallo   liebe  Anna ')).toBe(3);
    expect(wordCount('')).toBe(0);
    expect(wordCount(undefined)).toBe(0);
  });
});
