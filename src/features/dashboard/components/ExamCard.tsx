import { CalendarClock, PlayCircle, RotateCcw, Trophy } from 'lucide-react';

import { type AttemptMode } from '@shared/types';
import {
  Badge,
  type BadgeVariant,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@shared/ui';

import { type ExamCardModel } from '../types/dashboard.ts';

interface ExamCardProps {
  readonly card: ExamCardModel;
  readonly onStart: (examId: number, mode: AttemptMode) => void;
}

/** `today` earns the loud badge; a future date is quieter; optional is quietest. */
const scheduleTone = (label: string): BadgeVariant => {
  if (label === 'today') return 'default';
  if (label === 'tomorrow') return 'info';
  return label === 'optional' ? 'outline' : 'secondary';
};

/** One Modelltest of any trainer: how it went, where the plan puts it, and how to start it. */
const ExamCard = ({ card, onStart }: ExamCardProps) => (
  <Card className="card-hover relative gap-4 overflow-hidden">
    <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: card.accent }} />
    <CardHeader>
      <div className="flex items-start justify-between gap-2">
        <CardTitle className="text-base">{card.title}</CardTitle>
        <Badge variant={card.badgeTone}>{card.badge}</Badge>
      </div>
      <CardDescription>{card.theme}</CardDescription>
      {card.scheduleLabel ? (
        <div>
          <Badge variant={scheduleTone(card.scheduleLabel)}>
            <CalendarClock aria-hidden /> {card.scheduleLabel}
          </Badge>
        </div>
      ) : null}
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center gap-2 text-sm">
        {card.bestText ? (
          <>
            <Trophy className="size-4 text-muted-foreground" aria-hidden />
            <span>
              Best: <b className="tabular-nums">{card.bestText}</b>
            </span>
            {card.resultLabel && card.resultTone ? (
              <Badge variant={card.resultTone}>{card.resultLabel}</Badge>
            ) : null}
          </>
        ) : (
          <span className="text-muted-foreground">
            {card.attemptCount > 0 ? `${String(card.attemptCount)} practice run(s)` : 'Not attempted yet'}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="w-full"
          onClick={() => {
            onStart(card.id, 'full');
          }}
        >
          {card.attempted ? <RotateCcw /> : <PlayCircle />}
          {card.attempted ? 'Retry full exam' : 'Start full exam'}
        </Button>
        <Select
          value=""
          onValueChange={mode => {
            onStart(card.id, mode as AttemptMode);
          }}
        >
          <SelectTrigger size="sm" className="w-full" aria-label={`Practice one module of ${card.title}`}>
            <SelectValue placeholder="Practice one module…" />
          </SelectTrigger>
          <SelectContent>
            {card.modules.map(choice => (
              <SelectItem key={choice.mode} value={choice.mode}>
                {choice.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
);

export default ExamCard;
