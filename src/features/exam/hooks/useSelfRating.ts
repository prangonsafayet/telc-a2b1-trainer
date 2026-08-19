import { useCallback, useMemo, useState } from 'react';

import { RATING_CRITERIA } from '@shared/config/exam.ts';

/** Each criterion scores 0–5; the sum is multiplied by 3 for a 60-point module score. */
const POINTS_PER_CRITERION_POINT = 3;
const DEFAULT_SCORE = 3;

export interface SelfRatingState {
  readonly criteria: readonly (readonly [string, string])[];
  readonly values: readonly number[];
  readonly total: number;
  readonly setValue: (index: number, value: number) => void;
}

export const useSelfRating = (module: 'schreiben' | 'sprechen'): SelfRatingState => {
  const criteria = RATING_CRITERIA[module];
  const [values, setValues] = useState<readonly number[]>(() => criteria.map(() => DEFAULT_SCORE));

  const setValue = useCallback((index: number, value: number) => {
    setValues(current => current.map((existing, i) => (i === index ? value : existing)));
  }, []);

  const total = useMemo(
    () => values.reduce((sum, value) => sum + value, 0) * POINTS_PER_CRITERION_POINT,
    [values]
  );

  return { criteria, values, total, setValue };
};
