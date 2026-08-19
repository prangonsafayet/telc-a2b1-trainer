/**
 * `exactOptionalPropertyTypes` is on, which is what we want for our own code: an optional
 * property should be absent, not explicitly `undefined`. Third-party component props
 * rarely declare `| undefined`, so passing a maybe-value through fails to typecheck even
 * though the runtime behaviour is identical.
 *
 * `optional` drops the key entirely when the value is nullish, which is exactly what those
 * libraries expect.
 */
export const optional = <K extends string, V>(key: K, value: V | null | undefined): Partial<Record<K, V>> =>
  value == null ? {} : ({ [key]: value } as Record<K, V>);
