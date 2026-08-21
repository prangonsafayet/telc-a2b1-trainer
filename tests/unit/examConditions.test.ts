import { describe, expect, it } from 'vitest';

import {
  PASS_PERCENT,
  PASS_RULES,
  WRITING_MINUTE_CHOICES,
  writingTimeHint
} from '@shared/config/examConditions.ts';

/* Which of these numbers telc publishes and which are the app's own is not a detail: this
   branch shipped five invented telc facts into twenty papers, two guides, two curricula and
   the validator. `docs/level-trainers.local.md` records that the single-level paper's
   Uebungstests publish only its weighting table — no per-part pass percentage — and give no
   A2·B1 Schreiben duration. Both figures still drive the app; the copy around them may not
   call them telc's. Prose is unreviewed by the type system, so it is asserted here. */

describe('the pass line the single-level paper is marked at', () => {
  it('still marks at 60%, unchanged', () => {
    expect(PASS_PERCENT['single-level']).toBe(60);
    expect(PASS_PERCENT['dual-level']).toBe(70);
  });

  it('names the trainer as the source of the 60%, not telc', () => {
    const rule = PASS_RULES['single-level'];
    expect(rule).toContain('135/225');
    expect(rule).toContain('this trainer');
    expect(rule.toLowerCase()).not.toContain('official');
    expect(rule.toLowerCase()).not.toContain('pass rule');
  });

  it('leaves the A2·B1 rule stating the thresholds telc publishes for it', () => {
    expect(PASS_RULES['dual-level']).toContain('168/240');
  });
});

describe('the writing-time hint', () => {
  it('calls the single-level paper 30 minutes official, because telc publishes it', () => {
    expect(writingTimeHint('single-level', 30)).toBe('Official: 30 minutes.');
  });

  it('does not call the A2·B1 Schreiben slot official, because no source gives it', () => {
    const hint = writingTimeHint('dual-level', 10);
    expect(hint).toContain('10 minutes');
    expect(hint.toLowerCase()).not.toContain('official');
  });

  it('says the same in the choice labels', () => {
    const labels = WRITING_MINUTE_CHOICES['dual-level'].map(choice => choice.label.toLowerCase());
    expect(labels.some(label => label.includes('official'))).toBe(false);
    expect(WRITING_MINUTE_CHOICES['single-level'][0]?.label).toContain('official');
  });
});
