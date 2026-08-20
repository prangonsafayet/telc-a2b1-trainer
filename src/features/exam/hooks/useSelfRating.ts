import { useCallback, useMemo, useState } from 'react';

import { DEFAULT_CRITERION_SCORE } from '@features/exam/config/run.ts';
import { type RatingSpec } from '@features/exam/types/examFormat.ts';

export interface SelfRatingState {
  readonly criteria: readonly (readonly [string, string])[];
  readonly values: readonly number[];
  readonly total: number;
  readonly max: number;
  readonly setValue: (index: number, value: number) => void;
}

/**
 * The candidate's own marks for a productive module. Each criterion scores 0–5 and the sum
 * is multiplied by the format's scale — 4 × 5 × 3 = 60 at A2·B1, 3 × 5 × 3 = 45 for the
 * telc writing task and 5 × 5 × 3 = 75 for its oral exam.
 */
export const useSelfRating = (spec: RatingSpec): SelfRatingState => {
  const { criteria, scale, max } = spec;
  const [values, setValues] = useState<readonly number[]>(() => criteria.map(() => DEFAULT_CRITERION_SCORE));

  const setValue = useCallback((index: number, value: number) => {
    setValues(current => current.map((existing, i) => (i === index ? value : existing)));
  }, []);

  const total = useMemo(() => values.reduce((sum, value) => sum + value, 0) * scale, [values, scale]);

  return { criteria, values, total, max, setValue };
};
