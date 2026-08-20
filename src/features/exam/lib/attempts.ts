import { type StoredAttempt } from '@features/exam/types/examFormat.ts';

/** Finds a stored attempt by the id in the route, whichever trainer stored it. */
export const findAttempt = <TAttempt extends StoredAttempt>(
  attempts: readonly TAttempt[],
  attemptId: string | undefined
): TAttempt | undefined => attempts.find(candidate => String(candidate.id) === attemptId);
