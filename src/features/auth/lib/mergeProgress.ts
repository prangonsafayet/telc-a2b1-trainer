import {
  type DualLevelAttempt,
  type LearnDoneMap,
  type LevelTrainerDoc,
  type ProgressDatabase,
  type SingleLevelAttempt,
  type SrsMap
} from '@shared/types';

/** Attempts are immutable once written, so a union by id is always right. */
const unionAttempts = <T extends DualLevelAttempt | SingleLevelAttempt>(
  remote: readonly T[],
  local: readonly T[]
): readonly T[] => {
  const byId = new Map<number, T>();
  for (const attempt of [...remote, ...local]) byId.set(attempt.id, attempt);
  return [...byId.values()].toSorted((a, b) => a.id - b.id);
};

/* Truthy entries from either side survive: unticking on one device must not silently undo
   a task completed on another, so each side is filtered before it is merged. */
const orLearnDone = (remote: LearnDoneMap, local: LearnDoneMap): LearnDoneMap => {
  const done = (map: LearnDoneMap): LearnDoneMap =>
    Object.fromEntries(Object.entries(map).filter(([, value]) => value === true));
  return { ...done(remote), ...done(local) };
};

/**
 * Per item, the side that has got further. Boxes only move up through correct answers, so
 * the higher box is the more studied one and its counters come with it; the due date is the
 * later of the two, or an item just answered on one device is asked again today on the other.
 */
const mergeSrs = (remote: SrsMap, local: SrsMap): SrsMap => {
  const merged: SrsMap = { ...remote };
  for (const [id, mine] of Object.entries(local)) {
    if (!mine) continue;
    const theirs = merged[id];
    if (!theirs) {
      merged[id] = mine;
      continue;
    }
    const ahead = mine.box >= theirs.box ? mine : theirs;
    merged[id] = { ...ahead, due: mine.due > theirs.due ? mine.due : theirs.due };
  }
  return merged;
};

/**
 * Practice touches per day. The larger count wins rather than the sum: syncing twice must
 * not inflate a streak, and both sides then converge on the same number.
 */
const mergeActivity = (
  remote: LevelTrainerDoc['activity'],
  local: LevelTrainerDoc['activity']
): LevelTrainerDoc['activity'] => {
  const merged: Record<string, number> = {};
  for (const [date, count] of [...Object.entries(remote), ...Object.entries(local)]) {
    merged[date] = Math.max(merged[date] ?? 0, count ?? 0);
  }
  return merged;
};

const mergeTrainerDoc = (
  remote: LevelTrainerDoc | undefined,
  local: LevelTrainerDoc | undefined,
  localIsNewer: boolean
): LevelTrainerDoc | undefined => {
  if (!remote) return local;
  if (!local) return remote;
  return {
    attempts: unionAttempts(remote.attempts, local.attempts),
    learnDone: orLearnDone(remote.learnDone, local.learnDone),
    srs: mergeSrs(remote.srs, local.srs),
    activity: mergeActivity(remote.activity, local.activity),
    settings: localIsNewer
      ? { ...remote.settings, ...local.settings }
      : { ...local.settings, ...remote.settings }
  };
};

/**
 * Merges the local and remote documents without losing work from either side.
 *
 * Attempts are a union keyed by id. Completed learn tasks are OR-ed. Settings are
 * last-write-wins, decided by `_updatedAt`. Each level trainer's document is merged the
 * same way, field by field.
 *
 * This function rebuilds the document rather than spreading it, so anything added to
 * `ProgressDatabase` and not handled here is silently dropped on the next sync — which is
 * exactly how every B1/B2 attempt, curriculum tick, SRS box and streak was lost when the
 * two level trainers were first added. Add a field to the document, add it here.
 */
export const mergeProgress = (
  local: ProgressDatabase | null,
  remote: ProgressDatabase | null
): ProgressDatabase => {
  if (!remote) {
    if (!local) throw new Error('mergeProgress needs at least one document');
    return local;
  }
  if (!local) return remote;

  const localIsNewer = (local._updatedAt ?? '') >= (remote._updatedAt ?? '');
  const updatedAt = localIsNewer ? local._updatedAt : remote._updatedAt;

  /* Spelled out per level rather than looped: `exactOptionalPropertyTypes` means a trainer
     nobody has opened must be an absent key, not an explicit undefined. */
  const b1 = mergeTrainerDoc(remote.b1, local.b1, localIsNewer);
  const b2 = mergeTrainerDoc(remote.b2, local.b2, localIsNewer);

  return {
    attempts: unionAttempts(remote.attempts, local.attempts),
    learnDone: orLearnDone(remote.learnDone, local.learnDone),
    settings: localIsNewer
      ? { ...remote.settings, ...local.settings }
      : { ...local.settings, ...remote.settings },
    ...(b1 ? { b1 } : {}),
    ...(b2 ? { b2 } : {}),
    ...(updatedAt ? { _updatedAt: updatedAt } : {})
  };
};
