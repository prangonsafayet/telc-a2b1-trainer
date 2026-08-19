import { Timer } from 'lucide-react';

import { TELC_MODULE_META, telcModuleBriefing } from '@shared/config/telcExam.ts';
import { type ExamModule, type TelcExam } from '@shared/types';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

interface TelcModuleBriefingProps {
  readonly exam: TelcExam;
  readonly module: ExamModule;
  readonly minutes: number;
  /** Only meaningful for a full exam. */
  readonly step: { readonly index: number; readonly total: number } | null;
  readonly onBegin: () => void;
  readonly onAbort: () => void;
}

/** The "what to do" screen shown before each module starts. */
export const TelcModuleBriefing = ({
  exam,
  module,
  minutes,
  step,
  onBegin,
  onAbort
}: TelcModuleBriefingProps) => {
  const meta = TELC_MODULE_META[module];

  return (
    <Card className="animate-pop-in relative mx-auto max-w-2xl overflow-hidden text-center shadow-md">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-primary" />
      <CardHeader className="items-center">
        <CardDescription>
          {exam.title} · telc Deutsch {exam.level.toUpperCase()} ·{' '}
          {step ? `Module ${String(step.index)} of ${String(step.total)}` : 'Single-module practice'}
        </CardDescription>
        <CardTitle className="text-2xl">{meta.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-left text-sm leading-relaxed text-muted-foreground">
          <b className="text-foreground">What to do:</b> {telcModuleBriefing(module, exam.level)}
        </p>
        <Badge variant="secondary" className="gap-1.5 py-1">
          <Timer className="size-3" /> {minutes} minutes
          {module === 'sprechen' ? ' (guideline)' : ' — auto-submits when time runs out'}
        </Badge>
        <div className="flex flex-col items-center gap-2">
          <Button
            size="lg"
            className="px-8 shadow-sm transition-transform hover:scale-[1.03]"
            onClick={onBegin}
          >
            Start {meta.short} ▸
          </Button>
          <Button variant="ghost" size="sm" onClick={onAbort}>
            Abort attempt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
