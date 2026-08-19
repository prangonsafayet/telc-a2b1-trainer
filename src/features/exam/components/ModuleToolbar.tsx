import { MODULE_META } from '@/shared/config/exam.ts';
import { cn } from '@/shared/lib/cn.ts';
import { fmtClock } from '@/shared/lib/format.ts';
import { type Exam, type ExamModule } from '@/shared/types';
import { Progress } from '@/shared/ui';

interface ModuleToolbarProps {
  readonly exam: Exam;
  readonly module: ExamModule;
  readonly minutes: number;
  readonly secondsRemaining: number;
  readonly step: { readonly index: number; readonly total: number } | null;
}

/** Time thresholds at which the clock changes colour. */
const CRITICAL_SECONDS = 60;
const WARNING_SECONDS = 300;

export function ModuleToolbar({ exam, module, minutes, secondsRemaining, step }: ModuleToolbarProps) {
  const elapsedPct = Math.min(100, Math.max(0, 100 - (secondsRemaining / (minutes * 60)) * 100));
  const critical = secondsRemaining <= CRITICAL_SECONDS;
  const warning = !critical && secondsRemaining <= WARNING_SECONDS;

  return (
    <div className="sticky top-[var(--header-h,3.5rem)] z-30 -mx-4 mb-4 border-b bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-semibold">{MODULE_META[module].name}</span>
        <span className="text-sm text-muted-foreground">
          {exam.title}
          {step ? ` · module ${String(step.index)}/${String(step.total)}` : ''}
        </span>
        <span
          className={cn(
            'ml-auto rounded-md px-2 py-0.5 font-mono text-xl font-bold tabular-nums transition-colors',
            critical
              ? 'animate-pulse bg-destructive/10 text-destructive'
              : warning
                ? 'bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] text-[color:var(--warning-foreground)]'
                : 'text-foreground'
          )}
          role="timer"
          aria-live="off"
        >
          {fmtClock(secondsRemaining)}
        </span>
      </div>
      <Progress
        value={elapsedPct}
        className="mt-2 h-1"
        indicatorClassName={
          critical ? 'bg-destructive' : warning ? 'bg-[color:var(--warning)]' : 'bg-primary'
        }
      />
    </div>
  );
}
