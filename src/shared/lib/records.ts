/** Building a record that covers a whole union of keys, without a cast at the call site. */

/**
 * Maps every key in `keys` to a value, typed as a total record.
 *
 * `Object.fromEntries` returns `{ [k: string]: T }` — TypeScript cannot see that a runtime
 * array covers a union — so an assertion is unavoidable somewhere. This is where it lives:
 * one place, next to the reason, rather than repeated at each call site. Callers must pass a
 * list that names every member of `TKey` (`TRAINER_ORDER`, `STUDY_CATEGORIES`); a short list
 * yields a record with missing keys and no complaint.
 */
export const recordFrom = <TKey extends string, TValue>(
  keys: readonly TKey[],
  value: (key: TKey) => TValue
): Readonly<Record<TKey, TValue>> =>
  Object.fromEntries(keys.map(key => [key, value(key)])) as Readonly<Record<TKey, TValue>>;
