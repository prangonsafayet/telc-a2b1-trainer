import { useCountUp } from '@shared/hooks/useCountUp.ts';

interface CountedNumberProps {
  readonly value: number | null;
  readonly durationMs?: number;
  /** Shown while the value is null. */
  readonly fallback?: string;
}

/** A number that counts up on mount. */
const CountedNumber = ({ value, durationMs, fallback = '–' }: CountedNumberProps) => {
  const shown = useCountUp(value, durationMs);
  return <>{shown ?? fallback}</>;
};

export default CountedNumber;
