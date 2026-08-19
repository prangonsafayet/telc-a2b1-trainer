/** Bucketing helpers for the schedule engine. Pure, and deliberately boring. */

/**
 * Splits `items` into exactly `buckets` contiguous groups, front-loaded: 14 items into 5
 * buckets gives 3/3/3/3/2. Order is preserved, so a compressed curriculum is still read
 * in the order it was authored. Returns empty buckets when there are fewer items than
 * buckets, and no buckets at all when `buckets < 1`.
 */
export function chunkEvenly<T>(items: readonly T[], buckets: number): readonly T[][] {
  if (buckets < 1) return [];
  const out: T[][] = [];
  let taken = 0;
  for (let index = 0; index < buckets; index += 1) {
    /* Recomputed each round rather than precomputed, so the remainder lands on the
       earliest buckets without any off-by-one bookkeeping. */
    const size = Math.ceil((items.length - taken) / (buckets - index));
    out.push(items.slice(taken, taken + size));
    taken += size;
  }
  return out;
}

/** Splits `items` into contiguous groups of at most `size`. */
export function chunkBySize<T>(items: readonly T[], size: number): readonly T[][] {
  if (size < 1) return [];
  const out: T[][] = [];
  for (let index = 0; index < items.length; index += size) out.push(items.slice(index, index + size));
  return out;
}

/**
 * Interleaves `fillers` empty groups between the given groups, one after every
 * `groupsPerFiller` of them and the rest appended, so a long plan gets its review days
 * spread through the work instead of piled at the end.
 */
export function interleaveFillers<T>(
  groups: readonly (readonly T[])[],
  fillers: number,
  groupsPerFiller: number
): readonly (readonly T[])[] {
  if (fillers < 1) return groups;

  const gaps: number[] = [];
  for (let index = groupsPerFiller; index < groups.length; index += groupsPerFiller) gaps.push(index);
  /* With nothing to interleave between, everything trails the work. */
  if (gaps.length === 0) return [...groups, ...emptyGroups<T>(fillers)];

  const perGap = Math.floor(fillers / gaps.length);
  let leftover = fillers - perGap * gaps.length;

  const out: (readonly T[])[] = [];
  for (let index = 0; index < groups.length; index += 1) {
    const group = groups[index];
    if (group) out.push(group);
    if (gaps.includes(index + 1)) {
      /* The earliest gaps absorb the remainder: reviews are most useful early. */
      const extra = leftover > 0 ? 1 : 0;
      leftover -= extra;
      out.push(...emptyGroups<T>(perGap + extra));
    }
  }
  return out;
}

function emptyGroups<T>(count: number): readonly T[][] {
  return Array.from({ length: Math.max(0, count) }, () => []);
}
