import { cn } from '@shared/lib/cn.ts';

import { strengthLabel } from '@features/auth/lib/passwordPolicy.ts';

const STRENGTH_COLORS = [
  'bg-muted',
  'bg-destructive',
  'bg-[color:var(--warning)]',
  'bg-[color:var(--warning)]',
  'bg-[color:var(--success)]'
] as const;

interface StrengthMeterProps {
  readonly strength: number;
}

/** Four segments that fill and recolour as the password gets stronger. */
const StrengthMeter = ({ strength }: StrengthMeterProps) => (
  <div className="space-y-1">
    <div className="flex gap-1" aria-hidden>
      {[1, 2, 3, 4].map(step => (
        <div
          key={step}
          className={cn(
            'h-1 flex-1 rounded-full transition-colors',
            step <= strength ? STRENGTH_COLORS[strength] : 'bg-muted'
          )}
        />
      ))}
    </div>
    <p className="text-xs text-muted-foreground">Password strength: {strengthLabel(strength)}</p>
  </div>
);

export default StrengthMeter;
