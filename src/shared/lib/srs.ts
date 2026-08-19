/**
 * The spaced-repetition engine: a small Leitner system. Pure by construction — `today`
 * is always an argument, never read from the clock — so every transition is unit-testable
 * and a review session cannot disagree with the stored state.
 */

import { type MasteryLevel, type SrsEntry, type SrsMap } from '@shared/types';

import { addDays } from './format.ts';

/** Days until an item in box N is due again. Box 0 is "new — due immediately". */
export const SRS_INTERVALS: readonly number[] = [0, 1, 3, 7, 14, 30];

export const SRS_TOP_BOX = SRS_INTERVALS.length - 1;

/** Boxes at or above this count as mastered. */
export const SRS_MASTERED_BOX = 4;

/** One review outcome folded into the stored entry. A miss sends the item back to box 1. */
export const reviewItem = (entry: SrsEntry | undefined, correct: boolean, today: string): SrsEntry => {
  const box = correct ? Math.min((entry?.box ?? 0) + 1, SRS_TOP_BOX) : 1;
  const interval = SRS_INTERVALS[box] ?? 0;
  return {
    box,
    due: addDays(today, interval) ?? today,
    seen: (entry?.seen ?? 0) + 1,
    correct: (entry?.correct ?? 0) + (correct ? 1 : 0),
    wrong: (entry?.wrong ?? 0) + (correct ? 0 : 1)
  };
};

/** An unseen item is always due. ISO dates compare correctly as strings. */
export const isDue = (entry: SrsEntry | undefined, today: string): boolean =>
  entry === undefined || entry.due <= today;

export const masteryOf = (entry: SrsEntry | undefined): MasteryLevel => {
  if (!entry || entry.seen === 0) return 'new';
  return entry.box >= SRS_MASTERED_BOX ? 'mastered' : 'learning';
};

export interface MasteryCounts {
  readonly new: number;
  readonly learning: number;
  readonly mastered: number;
  readonly due: number;
  readonly total: number;
}

/** How a set of item ids is distributed across mastery levels, plus how many are due. */
export const countMastery = (ids: readonly string[], srs: SrsMap, today: string): MasteryCounts => {
  let fresh = 0;
  let learning = 0;
  let mastered = 0;
  let due = 0;
  for (const id of ids) {
    const entry = srs[id];
    const mastery = masteryOf(entry);
    if (mastery === 'new') fresh += 1;
    else if (mastery === 'learning') learning += 1;
    else mastered += 1;
    if (isDue(entry, today)) due += 1;
  }
  return { new: fresh, learning, mastered, due, total: ids.length };
};

/**
 * The ids to review today: everything due, weakest boxes first, then new items, capped at
 * `limit`. Stable within a box so a session does not reshuffle under the learner.
 */
export const pickDueIds = (
  ids: readonly string[],
  srs: SrsMap,
  today: string,
  limit: number
): readonly string[] => {
  const due = ids.filter(id => isDue(srs[id], today));
  const boxOf = (id: string): number => srs[id]?.box ?? -1;
  const seenFirst = due.filter(id => srs[id] !== undefined).toSorted((a, b) => boxOf(a) - boxOf(b));
  const unseen = due.filter(id => srs[id] === undefined);
  return [...seenFirst, ...unseen].slice(0, Math.max(0, limit));
};

/**
 * The current daily streak: consecutive days ending today (or yesterday, so an evening
 * session does not read as a broken streak the next morning) with at least one touch.
 */
export const streakLength = (activity: Partial<Record<string, number>>, today: string): number => {
  const touched = (iso: string | null): boolean => iso !== null && (activity[iso] ?? 0) > 0;
  let cursor: string | null = touched(today) ? today : addDays(today, -1);
  let streak = 0;
  while (touched(cursor)) {
    streak += 1;
    cursor = addDays(cursor ?? undefined, -1);
  }
  return streak;
};
