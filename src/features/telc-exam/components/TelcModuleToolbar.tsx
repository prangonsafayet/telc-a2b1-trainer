import { CountdownRing } from '@shared/components';
import { TELC_MODULE_META } from '@shared/config/telcExam.ts';
import { type ExamModule, type TelcExam } from '@shared/types';

interface TelcModuleToolbarProps {
  readonly exam: TelcExam;
  readonly module: ExamModule;
  readonly secondsRemaining: number;
  readonly totalSeconds: number;
  readonly step: { readonly index: number; readonly total: number } | null;
}

/** Sticky module header with the stopwatch-style countdown ring. */
export const TelcModuleToolbar = ({
  exam,
  module,
  secondsRemaining,
  totalSeconds,
  step
}: TelcModuleToolbarProps) => (
  <div className="sticky top-[var(--header-h,3.5rem)] z-30 -mx-4 mb-4 border-b bg-background/90 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6">
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <div>
        <span className="block font-semibold">{TELC_MODULE_META[module].name}</span>
        <span className="text-sm text-muted-foreground">
          {exam.title} · {exam.level.toUpperCase()}
          {step ? ` · module ${String(step.index)}/${String(step.total)}` : ''}
        </span>
      </div>
      <CountdownRing
        className="ml-auto"
        secondsRemaining={secondsRemaining}
        totalSeconds={totalSeconds}
        size={56}
      />
    </div>
  </div>
);
