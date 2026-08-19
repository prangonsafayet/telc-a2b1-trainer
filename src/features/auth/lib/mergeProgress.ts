import { type Attempt, type LearnDoneMap, type ProgressDatabase } from '@shared/types';

/**
 * Merges the local and remote documents without losing work from either side.
 *
 * Attempts are a union keyed by id (they are immutable once written, so a union is
 * always right). Completed learn tasks are OR-ed — unticking on one device must not
 * silently undo progress recorded on another, so only an explicit `false` is dropped.
 * Settings are last-write-wins, decided by `_updatedAt`.
 */
export function mergeProgress(
  local: ProgressDatabase | null,
  remote: ProgressDatabase | null
): ProgressDatabase {
  if (!remote) {
    if (!local) throw new Error('mergeProgress needs at least one document');
    return local;
  }
  if (!local) return remote;

  const byId = new Map<number, Attempt>();
  for (const attempt of [...remote.attempts, ...local.attempts]) byId.set(attempt.id, attempt);
  const attempts = [...byId.values()].toSorted((a, b) => a.id - b.id);

  /* Only truthy entries survive: unticking on one device must not silently undo a task
     completed on another, so a `false` is dropped rather than merged in. */
  const learnDone: LearnDoneMap = Object.fromEntries(
    Object.entries({ ...remote.learnDone, ...local.learnDone }).filter(([, done]) => done === true)
  );

  const localIsNewer = (local._updatedAt ?? '') >= (remote._updatedAt ?? '');
  const settings = localIsNewer
    ? { ...remote.settings, ...local.settings }
    : { ...local.settings, ...remote.settings };
  const updatedAt = localIsNewer ? local._updatedAt : remote._updatedAt;

  return { attempts, learnDone, settings, ...(updatedAt ? { _updatedAt: updatedAt } : {}) };
}
