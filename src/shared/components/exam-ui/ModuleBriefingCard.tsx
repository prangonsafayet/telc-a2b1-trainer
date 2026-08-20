import { Timer } from 'lucide-react';

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

interface ModuleBriefingCardProps {
  /** "Modelltest 3 · B1 · Module 2 of 5" — whatever identifies the sitting. */
  readonly kicker: string;
  /** The module name, e.g. "Leseverstehen". */
  readonly title: string;
  /** What to do, in one paragraph. */
  readonly briefing: string;
  readonly minutes: number;
  /** True for modules whose clock is only a guideline (Sprechen). */
  readonly guidelineOnly: boolean;
  /** The verb on the start button, e.g. "Start Lesen". */
  readonly startLabel: string;
  readonly onBegin: () => void;
  readonly onAbort: () => void;
}

/** The "what to do" screen shown before each exam module starts — shared by all trainers. */
const ModuleBriefingCard = ({
  kicker,
  title,
  briefing,
  minutes,
  guidelineOnly,
  startLabel,
  onBegin,
  onAbort
}: ModuleBriefingCardProps) => (
  <Card className="animate-pop-in relative mx-auto max-w-2xl overflow-hidden text-center shadow-md">
    <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-primary" />
    <CardHeader className="items-center">
      <CardDescription>{kicker}</CardDescription>
      <CardTitle className="text-2xl">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-5">
      <p className="text-left text-sm leading-relaxed text-muted-foreground">
        <b className="text-foreground">What to do:</b> {briefing}
      </p>
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Timer className="size-3" /> {minutes} minutes
        {guidelineOnly ? ' (guideline)' : ' — auto-submits when time runs out'}
      </Badge>
      <div className="flex flex-col items-center gap-2">
        <Button
          size="lg"
          className="px-8 shadow-sm transition-transform hover:scale-[1.03]"
          onClick={onBegin}
        >
          {startLabel} ▸
        </Button>
        <Button variant="ghost" size="sm" onClick={onAbort}>
          Abort attempt
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default ModuleBriefingCard;
