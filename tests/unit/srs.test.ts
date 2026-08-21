import { describe, expect, it } from 'vitest';

import { addDays } from '@shared/lib/format.ts';
import { isDue, masteryOf, reviewItem, streakLength } from '@shared/lib/srs.ts';
import { type SrsEntry } from '@shared/types';

import { bumpActivity } from '@features/progress/lib/progressDb.ts';

/*
 * The spaced-repetition engine and the daily streak are both pure functions of an explicit
 * `today`, and nothing exercised either before this suite. `reviewItem` decides the box (and
 * therefore the interval) every flashcard grade and every quiz answer writes into a trainer's
 * document; `streakLength` is what the dashboard's streak counter reads.
 */

const TODAY = '2026-08-21';

describe('reviewItem', () => {
  it('starts an unseen item in box 1 on its first correct answer, due tomorrow', () => {
    const entry = reviewItem(undefined, true, TODAY);
    expect(entry).toEqual({ box: 1, due: addDays(TODAY, 1), seen: 1, correct: 1, wrong: 0 });
  });

  it('starts an unseen item in box 1 on its first wrong answer too — there is nowhere lower to reset to', () => {
    const entry = reviewItem(undefined, false, TODAY);
    expect(entry).toEqual({ box: 1, due: addDays(TODAY, 1), seen: 1, correct: 0, wrong: 1 });
  });

  it('promotes a box on a correct answer and pushes the due date out to match', () => {
    const before: SrsEntry = { box: 3, due: TODAY, seen: 5, correct: 4, wrong: 1 };
    const after = reviewItem(before, true, TODAY);
    /* Box 3 -> 4, and SRS_INTERVALS[4] = 14. */
    expect(after).toEqual({ box: 4, due: addDays(TODAY, 14), seen: 6, correct: 5, wrong: 1 });
  });

  it('resets a wrong answer straight to box 1, however high the box was', () => {
    const before: SrsEntry = { box: 5, due: TODAY, seen: 20, correct: 18, wrong: 2 };
    const after = reviewItem(before, false, TODAY);
    expect(after).toEqual({ box: 1, due: addDays(TODAY, 1), seen: 21, correct: 18, wrong: 3 });
  });

  it('caps promotion at the top box instead of running past the interval table', () => {
    const before: SrsEntry = { box: 5, due: TODAY, seen: 10, correct: 10, wrong: 0 };
    const after = reviewItem(before, true, TODAY);
    /* Box 5 is already SRS_TOP_BOX; SRS_INTERVALS[5] = 30. */
    expect(after.box).toBe(5);
    expect(after.due).toBe(addDays(TODAY, 30));
  });

  it('produces a due date that survives a spring-forward DST boundary', () => {
    /* addDays builds the date from its parts, so the hour lost to DST cannot turn "+1 day"
       into "same day, 23:00" (see .claude/docs/pitfalls.md). */
    const before: SrsEntry = { box: 0, due: '2026-03-28', seen: 0, correct: 0, wrong: 0 };
    const after = reviewItem(before, true, '2026-03-28');
    expect(after.due).toBe('2026-03-29');
  });
});

describe('isDue', () => {
  it('is always due when never seen', () => {
    expect(isDue(undefined, TODAY)).toBe(true);
  });

  it('is due on the day it is scheduled, inclusive', () => {
    expect(isDue({ box: 1, due: TODAY, seen: 1, correct: 1, wrong: 0 }, TODAY)).toBe(true);
  });

  it('is due once the scheduled day has passed', () => {
    expect(isDue({ box: 1, due: addDays(TODAY, -1) ?? TODAY, seen: 1, correct: 1, wrong: 0 }, TODAY)).toBe(
      true
    );
  });

  it('is not due while the scheduled day is still ahead', () => {
    expect(isDue({ box: 1, due: addDays(TODAY, 1) ?? TODAY, seen: 1, correct: 1, wrong: 0 }, TODAY)).toBe(
      false
    );
  });
});

describe('masteryOf', () => {
  it('calls an unseen item new', () => {
    expect(masteryOf(undefined)).toBe('new');
  });

  it('calls a seen item below the mastered box learning', () => {
    expect(masteryOf({ box: 3, due: TODAY, seen: 3, correct: 3, wrong: 0 })).toBe('learning');
  });

  it('calls a seen item at or above the mastered box mastered', () => {
    expect(masteryOf({ box: 4, due: TODAY, seen: 4, correct: 4, wrong: 0 })).toBe('mastered');
  });
});

describe('streakLength', () => {
  it('is zero with no activity at all', () => {
    expect(streakLength({}, TODAY)).toBe(0);
  });

  it('counts one day when only today was touched', () => {
    expect(streakLength({ [TODAY]: 1 }, TODAY)).toBe(1);
  });

  it('extends across consecutive local days', () => {
    const activity = {
      [addDays(TODAY, -2) ?? '']: 1,
      [addDays(TODAY, -1) ?? '']: 1,
      [TODAY]: 1
    };
    expect(streakLength(activity, TODAY)).toBe(3);
  });

  it('does not break the streak for a session not yet started today, as long as yesterday was touched', () => {
    /* An evening session should not read as broken the next morning before the learner has
       opened the app — the streak counts through yesterday. */
    const activity = { [addDays(TODAY, -1) ?? '']: 1 };
    expect(streakLength(activity, TODAY)).toBe(1);
  });

  it('breaks the streak across a missed day', () => {
    const activity = {
      [addDays(TODAY, -3) ?? '']: 1,
      [addDays(TODAY, -2) ?? '']: 1,
      /* day -1 missed */
      [TODAY]: 1
    };
    expect(streakLength(activity, TODAY)).toBe(1);
  });

  it('counts two sessions in the same day once, not twice', () => {
    const activity = bumpActivity(bumpActivity({}, TODAY), TODAY);
    expect(activity[TODAY]).toBe(2);
    expect(streakLength(activity, TODAY)).toBe(1);
  });

  /* Counting today must not cost the days before it. The fixture above starts from `{}`, so
     it had no earlier day to lose: dropping the spread in `bumpActivity` would erase the whole
     history on the next flashcard grade, persist it, and sync it, with nothing failing. */
  it('keeps every earlier day when it counts today', () => {
    const before = { [addDays(TODAY, -2) ?? '']: 3, [addDays(TODAY, -1) ?? '']: 1 };

    const after = bumpActivity(before, TODAY);

    expect(after).toEqual({ ...before, [TODAY]: 1 });
    /* Said as the dashboard says it: a three-day streak, not a one-day one. */
    expect(streakLength(after, TODAY)).toBe(3);
    /* And the stored map it was given is not mutated on the way. */
    expect(before[TODAY]).toBeUndefined();
  });

  it('extends correctly across a month boundary', () => {
    const lastOfMonth = '2026-08-31';
    const firstOfNextMonth = '2026-09-01';
    const activity = { [lastOfMonth]: 1, [firstOfNextMonth]: 1 };
    expect(streakLength(activity, firstOfNextMonth)).toBe(2);
  });

  it('does not let a month boundary hide a missed day', () => {
    const activity = { '2026-08-30': 1, '2026-09-01': 1 };
    /* 08-31 was skipped, so the streak on 09-01 is just that one day. */
    expect(streakLength(activity, '2026-09-01')).toBe(1);
  });
});
