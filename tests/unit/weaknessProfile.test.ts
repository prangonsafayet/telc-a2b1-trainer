import { describe, expect, it } from 'vitest';

import { recordWeaknesses, topWeaknesses } from '@features/feedback/lib/weaknessProfile.ts';
import { type ErrorReportEntry, type WeaknessCategory, type WeaknessProfile } from '@shared/types';

/*
 * The running record of what a learner keeps getting wrong. It is persisted and synced, so
 * the two properties that matter are that a session only ever adds to it and that reading it
 * back is deterministic: the profile arrives as JSON from another device, where nothing
 * guarantees the key order this process happened to write.
 */

const err = (category: WeaknessCategory): ErrorReportEntry => ({
  offset: 0,
  length: 1,
  excerpt: 'x',
  message: 'm',
  category,
  suggestion: null,
  ruleId: 'R'
});

describe('recordWeaknesses', () => {
  it('counts each category and stamps the day', () => {
    const profile = recordWeaknesses({}, [err('case'), err('case'), err('style')], '2026-08-20');
    expect(profile.case).toEqual({ count: 2, lastSeen: '2026-08-20' });
    expect(profile.style).toEqual({ count: 1, lastSeen: '2026-08-20' });
  });

  it('accumulates across sessions without losing the earlier count', () => {
    const first = recordWeaknesses({}, [err('case')], '2026-08-19');
    const second = recordWeaknesses(first, [err('case')], '2026-08-20');
    expect(second.case).toEqual({ count: 2, lastSeen: '2026-08-20' });
  });

  /* A fixture with nothing to lose cannot catch a wipe: the categories this session did not
     repeat have to survive it, counts and dates intact. */
  it('keeps the categories this session did not repeat', () => {
    const before: WeaknessProfile = {
      case: { count: 4, lastSeen: '2026-08-01' },
      spelling: { count: 2, lastSeen: '2026-08-02' }
    };
    const after = recordWeaknesses(before, [err('style')], '2026-08-20');
    expect(after.style?.count).toBe(1);
    expect(after.case).toEqual({ count: 4, lastSeen: '2026-08-01' });
    expect(after.spelling).toEqual({ count: 2, lastSeen: '2026-08-02' });
  });

  it('leaves the profile untouched for clean writing', () => {
    const before: WeaknessProfile = { case: { count: 1, lastSeen: '2026-08-01' } };
    const after = recordWeaknesses(before, [], '2026-08-20');
    expect(after.case).toEqual({ count: 1, lastSeen: '2026-08-01' });
    /* The same object, so a clean attempt writes nothing and no memo downstream churns. */
    expect(after).toBe(before);
  });
});

describe('topWeaknesses', () => {
  it('ranks by count, most frequent first, and stops at the count asked for', () => {
    const profile: WeaknessProfile = {
      case: { count: 5, lastSeen: '2026-08-20' },
      style: { count: 1, lastSeen: '2026-08-20' },
      agreement: { count: 3, lastSeen: '2026-08-20' }
    };
    expect(topWeaknesses(profile, 2)).toEqual(['case', 'agreement']);
  });

  /* Insertion order is not a tie-break: this profile arrives as JSON written by whichever
     device synced last, so two devices holding the same counts must rank them the same way. */
  it('breaks a tie on the more recent date, then on the category name', () => {
    const profile: WeaknessProfile = {
      style: { count: 2, lastSeen: '2026-08-01' },
      case: { count: 2, lastSeen: '2026-08-20' },
      agreement: { count: 2, lastSeen: '2026-08-01' }
    };
    expect(topWeaknesses(profile, 3)).toEqual(['case', 'agreement', 'style']);
    /* Same data, opposite key order in, same ranking out. */
    const reversed: WeaknessProfile = {
      agreement: { count: 2, lastSeen: '2026-08-01' },
      case: { count: 2, lastSeen: '2026-08-20' },
      style: { count: 2, lastSeen: '2026-08-01' }
    };
    expect(topWeaknesses(reversed, 3)).toEqual(['case', 'agreement', 'style']);
  });

  it('returns nothing for an empty profile, where a populated one returns something', () => {
    expect(topWeaknesses({ case: { count: 1, lastSeen: '2026-08-20' } }, 3)).toEqual(['case']);
    expect(topWeaknesses({}, 3)).toEqual([]);
  });
});
