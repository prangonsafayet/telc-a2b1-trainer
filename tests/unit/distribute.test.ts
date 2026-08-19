import { describe, expect, it } from 'vitest';

import { chunkBySize, chunkEvenly, interleaveFillers } from '@features/plan/lib/distribute.ts';

describe('chunkEvenly', () => {
  it('front-loads the remainder so the compression is felt early', () => {
    expect(chunkEvenly([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 5).map(c => c.length)).toEqual([
      3, 3, 3, 3, 2
    ]);
  });

  it('preserves order, so a compressed curriculum is still read in sequence', () => {
    expect(chunkEvenly([1, 2, 3, 4, 5], 2)).toEqual([
      [1, 2, 3],
      [4, 5]
    ]);
  });

  it('pads with empty buckets when there are more buckets than items', () => {
    expect(chunkEvenly([1], 3)).toEqual([[1], [], []]);
  });

  it('returns nothing when asked for no buckets', () => {
    expect(chunkEvenly([1, 2], 0)).toEqual([]);
  });
});

describe('chunkBySize', () => {
  it('splits into groups of at most the given size', () => {
    expect(chunkBySize([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('refuses a size of zero rather than looping forever', () => {
    expect(chunkBySize([1, 2], 0)).toEqual([]);
  });
});

describe('interleaveFillers', () => {
  it('spreads fillers between blocks of work', () => {
    expect(interleaveFillers([[1], [2], [3], [4]], 1, 2)).toEqual([[1], [2], [], [3], [4]]);
  });

  it('tightens the spacing when there is more room than the sparsest pattern uses', () => {
    /* 4 lessons and 3 spare days should alternate, not teach twice and then idle. */
    expect(interleaveFillers([[1], [2], [3], [4]], 3, 7)).toEqual([[1], [], [2], [], [3], [], [4]]);
  });

  it('never leaves a clump longer than it has to', () => {
    const out = interleaveFillers(
      Array.from({ length: 28 }, (_, i) => [i]),
      26,
      7
    );
    const longestRun = out
      .map(group => (group.length === 0 ? 1 : 0))
      .join('')
      .split('0')
      .reduce((longest, run) => Math.max(longest, run.length), 0);
    expect(longestRun).toBeLessThanOrEqual(2);
  });

  it('adds exactly as many fillers as asked for', () => {
    for (let fillers = 0; fillers <= 20; fillers += 1) {
      const out = interleaveFillers([[1], [2], [3]], fillers, 7);
      expect(out.filter(group => group.length === 0)).toHaveLength(fillers);
      expect(out).toHaveLength(3 + fillers);
    }
  });

  it('trails the work when there is nothing to interleave between', () => {
    expect(interleaveFillers([[1]], 2, 7)).toEqual([[1], [], []]);
  });
});
