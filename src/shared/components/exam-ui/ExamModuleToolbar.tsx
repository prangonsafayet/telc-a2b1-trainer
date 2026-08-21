import CountdownRing from '@shared/components/exam-ui/CountdownRing.tsx';

interface ExamModuleToolbarProps {
  /** The module name, e.g. "Leseverstehen". */
  readonly title: string;
  /** "Modelltest 3 · B1 · module 2/5" — whatever identifies the sitting. */
  readonly subtitle: string;
  readonly secondsRemaining: number;
  readonly totalSeconds: number;
}

/** Sticky module header with the stopwatch-style countdown ring — shared by all trainers. */
const ExamModuleToolbar = ({ title, subtitle, secondsRemaining, totalSeconds }: ExamModuleToolbarProps) => (
  <div className="sticky top-[var(--header-h,3.5rem)] z-30 -mx-4 mb-4 border-b bg-background/90 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6">
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <div>
        <span className="block font-semibold">{title}</span>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
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

export default ExamModuleToolbar;
