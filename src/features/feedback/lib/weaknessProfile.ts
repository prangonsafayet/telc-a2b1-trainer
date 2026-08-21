import {
  type ErrorReportEntry,
  type WeaknessCategory,
  type WeaknessEntry,
  type WeaknessProfile
} from '@shared/types';

/**
 * Adds one session's mistakes to the running profile.
 *
 * Additive by construction: the previous profile is spread first and only the categories
 * this session produced are touched, so a clean attempt returns the caller's own object and
 * an attempt full of case errors cannot erase what the learner did last week. That matters
 * more here than it looks — the result is persisted and then merged by cloud sync, so
 * anything dropped is dropped on every device.
 */
export const recordWeaknesses = (
  profile: WeaknessProfile,
  report: readonly ErrorReportEntry[],
  today: string
): WeaknessProfile => {
  if (report.length === 0) return profile;
  const next: Record<string, WeaknessEntry> = { ...profile };
  for (const entry of report) {
    const seen = next[entry.category];
    next[entry.category] = { count: (seen?.count ?? 0) + 1, lastSeen: today };
  }
  return next;
};

/**
 * The categories worth putting in front of the learner, most frequent first.
 *
 * Ties are broken by the more recent date and then by the category name, rather than by the
 * order the keys happen to sit in: this profile is JSON that may have been written by another
 * device, so key order carries no meaning and two devices holding identical counts have to
 * rank them identically.
 */
export const topWeaknesses = (profile: WeaknessProfile, count: number): readonly WeaknessCategory[] =>
  (Object.entries(profile) as readonly [WeaknessCategory, WeaknessEntry | undefined][])
    .filter((pair): pair is [WeaknessCategory, WeaknessEntry] => pair[1] !== undefined)
    .toSorted(
      ([aCategory, a], [bCategory, b]) =>
        b.count - a.count || b.lastSeen.localeCompare(a.lastSeen) || aCategory.localeCompare(bCategory)
    )
    .slice(0, count)
    .map(([category]) => category);
