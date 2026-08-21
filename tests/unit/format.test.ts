import { describe, expect, it, vi } from 'vitest';

import {
  addDays,
  daysBetween,
  daysUntil,
  fmtClock,
  fmtDate,
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

/* `fmtDate` is the module's only formatter and used to be the one export that did NOT go
   through `parseIsoDate` — `new Date('2026-09-12').toLocaleDateString()` prints the 11th in
   any negative UTC offset. Every current caller passes a full timestamp, where that does not
   apply, so the assertion is pinned to a west-of-Greenwich zone: without it the test would
   pass on a UTC machine with the bug still in place. */
describe('fmtDate', () => {
  /* `vi.stubEnv` rather than a direct `process.env` write: `process` is not in the app
     project's `types`, and `vi.unstubAllEnvs` restores the runner's own zone. */
  const inZone = (tz: string, run: () => void): void => {
    vi.stubEnv('TZ', tz);
    try {
      run();
    } finally {
      vi.unstubAllEnvs();
    }
  };

  it('formats a full timestamp', () => {
    expect(fmtDate('2026-09-12T10:00:00.000Z')).toMatch(/^\d{2}\.\d{2}\.\d{2}$/);
  });

  it('formats a calendar day as that calendar day, west of Greenwich too', () => {
    inZone('America/Los_Angeles', () => {
      expect(fmtDate('2026-09-12')).toBe('12.09.26');
      expect(fmtDate('2026-01-01')).toBe('01.01.26');
    });
  });

  it('still formats something that is not a calendar day', () => {
    inZone('America/Los_Angeles', () => {
      expect(fmtDate('2026-03-01T23:30:00.000Z')).toBe('01.03.26');
    });
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
