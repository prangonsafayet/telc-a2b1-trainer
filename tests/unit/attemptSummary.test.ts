import { describe, expect, it } from 'vitest';

import { type DualLevelAttempt, type SingleLevelAttempt } from '@shared/types';

import { summarizeAttempt as summarizeDualLevel } from '@features/exam/lib/formats/dual-level/summary.ts';
import { summarizeAttempt as summarizeSingleLevel } from '@features/exam/lib/formats/single-level/summary.ts';

/*
 * The results screen marks a pass line on every score bar, and the bar primitive used to
 * default that line to the A2·B1 paper's 70% because nothing carried it. A single-level
 * sitting therefore showed "B1 threshold (70%)" over sections whose pass line is 60%, and
 * tinted a passing section red. The summary now names the line, so both papers are asserted
 * here.
 */

const dualLevelAttempt: DualLevelAttempt = {
  id: 1,
  examId: 1,
  mode: 'full',
  date: '2026-01-01T00:00:00.000Z',
  times: { lesen: 60 },
  scores: { lesen: 42, hoeren: 42, schreiben: 42, sprechen: 42 },
  sb: { correct: 15, of: 22, percent: 68 },
  answers: {},
  ratings: {},
  total: 168,
  result: 'B1'
};

const singleLevelAttempt: SingleLevelAttempt = {
  id: 2,
  examId: 1,
  mode: 'full',
  date: '2026-01-01T00:00:00.000Z',
  times: { lesen: 60 },
  scores: { lesen: 45, sprachbausteine: 18, hoeren: 45, schreiben: 27, sprechen: 45 },
  answers: {},
  ratings: {},
  written: 135,
  oral: 45,
  total: 180,
  result: 'Bestanden'
};

describe('summarizeAttempt — the pass line the score bars mark', () => {
  it('marks the A2·B1 paper at its own 70% B1 line', () => {
    const summary = summarizeDualLevel(dualLevelAttempt);
    expect(summary.thresholdPercent).toBe(70);
    expect(summary.thresholdLabel).toBe('B1 threshold (70%)');
  });

  it('marks the telc B1/B2 paper at its own 60% pass line, not the A2·B1 one', () => {
    const summary = summarizeSingleLevel(singleLevelAttempt);
    expect(summary.thresholdPercent).toBe(60);
    expect(summary.thresholdLabel).toBe('Pass line (60%)');
  });

  it('scores every section of a single-level sitting at or above its own line', () => {
    const summary = summarizeSingleLevel(singleLevelAttempt);
    expect(summary.bars.length).toBe(5);
    for (const bar of summary.bars) {
      expect(Math.round((bar.value / bar.of) * 100)).toBeGreaterThanOrEqual(summary.thresholdPercent);
    }
  });
});
