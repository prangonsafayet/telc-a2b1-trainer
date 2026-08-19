import { PartyPopper, RotateCcw, X } from 'lucide-react';

import { Button, Card, CardContent, CardHeader, CardTitle } from '@shared/ui';

interface SessionSummaryProps {
  readonly kind: 'flashcards' | 'quiz';
  readonly correct: number;
  readonly wrong: number;
  readonly onRestart: () => void;
  readonly onClose: () => void;
}

/** The end-of-session screen: how it went, run it again, or back to the hub. */
export const SessionSummary = ({ kind, correct, wrong, onRestart, onClose }: SessionSummaryProps) => {
  const total = correct + wrong;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <Card className="animate-pop-in mx-auto max-w-xl text-center">
      <CardHeader className="items-center">
        <PartyPopper className="size-8 text-primary" aria-hidden />
        <CardTitle>Session finished</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-bold tabular-nums">
          {correct}/{total}
          <span className="ml-2 text-lg font-normal text-muted-foreground">({percent}%)</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {kind === 'flashcards'
            ? 'Cards you missed come back sooner; the ones you knew move up a box.'
            : 'Every answer updated your review schedule — weak items resurface sooner.'}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={onRestart}>
            <RotateCcw /> Another round
          </Button>
          <Button variant="outline" onClick={onClose}>
            <X /> Done
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
