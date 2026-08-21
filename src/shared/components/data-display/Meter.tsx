import { useEffect, useState } from 'react';

import { cn } from '@shared/lib/cn.ts';
import { Progress } from '@shared/ui';

interface MeterProps {
  readonly label: string;
  readonly value: number | null | undefined;
  /** Points a perfect score on this bar is worth — a paper fact, so never defaulted. */
  readonly of: number;
  /** Tint the bar amber/red below the B1/A2 thresholds instead of always using primary. */
  readonly colorByScore?: boolean;
  /** Where the pass line of this paper sits, as a percentage of `of`. */
  readonly thresholdPercent: number;
  readonly thresholdLabel: string;
}

/** A labelled progress bar with its paper's pass line marked. */
const Meter = ({ label, value, of, colorByScore = false, thresholdPercent, thresholdLabel }: MeterProps) => {
  const pct = value == null ? 0 : Math.round((value / of) * 100);
  const tone =
    !colorByScore || pct >= thresholdPercent
      ? 'bg-primary'
      : pct >= 40
        ? 'bg-warning-foreground'
        : 'bg-destructive';

  /* Start empty and fill on the next frame so the bar animates in. */
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setShown(pct);
    });
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [pct]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums text-muted-foreground">
          {value == null ? '—' : `${String(value)}/${String(of)}`}
        </span>
      </div>
      <div className="relative">
        <Progress
          value={shown}
          indicatorClassName={cn(
            tone,
            'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
          )}
        />
        <div
          className="absolute inset-y-0 w-px bg-foreground/40"
          style={{ left: `${String(thresholdPercent)}%` }}
          title={thresholdLabel}
        />
      </div>
    </div>
  );
};

export default Meter;
