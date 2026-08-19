import { cn } from '@shared/lib/cn.ts';
import { fmtClock } from '@shared/lib/format.ts';

interface CountdownRingProps {
  readonly secondsRemaining: number;
  readonly totalSeconds: number;
  /** Diameter in pixels. */
  readonly size?: number;
  readonly className?: string;
}

const CRITICAL_SECONDS = 60;
const WARNING_SECONDS = 300;
const STROKE = 4;

/**
 * A stopwatch-style countdown: the ring drains clockwise as time runs out and shifts
 * colour as the deadline nears. Purely visual — the deadline itself lives in run state.
 */
export const CountdownRing = ({
  secondsRemaining,
  totalSeconds,
  size = 64,
  className
}: CountdownRingProps) => {
  const radius = (size - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = totalSeconds > 0 ? Math.min(1, Math.max(0, secondsRemaining / totalSeconds)) : 0;
  const critical = secondsRemaining <= CRITICAL_SECONDS;
  const warning = !critical && secondsRemaining <= WARNING_SECONDS;

  return (
    <span
      role="timer"
      aria-live="off"
      className={cn('relative inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          className="text-muted/60"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - fraction)}
          className={cn(
            'transition-[stroke-dashoffset,color] duration-1000 ease-linear',
            critical ? 'text-destructive' : warning ? 'text-[color:var(--warning)]' : 'text-primary'
          )}
        />
      </svg>
      <span
        className={cn(
          'absolute font-mono font-bold tabular-nums',
          size >= 64 ? 'text-sm' : 'text-xs',
          critical ? 'animate-pulse text-destructive' : 'text-foreground'
        )}
      >
        {fmtClock(secondsRemaining)}
      </span>
    </span>
  );
};
