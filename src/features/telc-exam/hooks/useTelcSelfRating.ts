import { useCallback, useMemo, useState } from 'react';

import { TELC_RATING_CRITERIA, TELC_RATING_SCALE } from '@shared/config/telcExam.ts';

const DEFAULT_SCORE = 3;

export interface TelcSelfRatingState {
  readonly criteria: readonly (readonly [string, string])[];
  readonly values: readonly number[];
  readonly total: number;
  readonly max: number;
  readonly setValue: (index: number, value: number) => void;
}

/** Schreiben: 3 criteria × 0–5 × 3 → 45. Sprechen: 5 criteria × 0–5 × 3 → 75. */
export const useTelcSelfRating = (module: 'schreiben' | 'sprechen'): TelcSelfRatingState => {
  const criteria = TELC_RATING_CRITERIA[module];
  const [values, setValues] = useState<readonly number[]>(() => criteria.map(() => DEFAULT_SCORE));

  const setValue = useCallback((index: number, value: number) => {
    setValues(current => current.map((existing, i) => (i === index ? value : existing)));
  }, []);

  const total = useMemo(() => values.reduce((sum, value) => sum + value, 0) * TELC_RATING_SCALE, [values]);

  return { criteria, values, total, max: criteria.length * 5 * TELC_RATING_SCALE, setValue };
};
