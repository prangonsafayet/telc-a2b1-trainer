import { CalendarClock, PlayCircle, RotateCcw, Trophy } from 'lucide-react';

import { EXAM_MODULES, MODULE_META, moduleMinutes } from '@shared/config/exam.ts';
import { difficultyTone, gradeTone } from '@shared/lib/examBadges.ts';
import { type AttemptMode, type Settings } from '@shared/types';
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

import { type ExamCardStats } from '../hooks/useDashboardStats.ts';

interface ExamCardProps {
  readonly stats: ExamCardStats;
  readonly settings: Settings;
  /** Where the plan puts this exam: `today`, `planned Do, 28. Aug`, `optional`, or nothing. */
  readonly scheduleLabel: string | null;
  readonly onStart: (examId: number, mode: AttemptMode) => void;
}

/** `today` earns the loud badge; a future date is quieter; optional is quietest. */
function scheduleTone(label: string): BadgeVariant {
  if (label === 'today') return 'default';
  if (label === 'tomorrow') return 'info';
  return label === 'optional' ? 'outline' : 'secondary';
}

/** Difficulty accent, so the ramp from A2 to B1 is visible at a glance. */
const ACCENTS = { easy: 'var(--success)', medium: 'var(--warning)', b1: 'var(--primary)' } as const;

export function ExamCard({ stats, settings, scheduleLabel, onStart }: ExamCardProps) {
  const { exam, best, attemptCount } = stats;
  const attempted = best !== null || attemptCount > 0;

  return (
    <Card className="card-hover relative gap-4 overflow-hidden">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: ACCENTS[exam.difficulty] }}
      />
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{exam.title}</CardTitle>
          <Badge variant={difficultyTone(exam.difficulty)}>{exam.level}</Badge>
        </div>
        <CardDescription>{exam.theme}</CardDescription>
        {scheduleLabel ? (
          <div>
            <Badge variant={scheduleTone(scheduleLabel)}>
              <CalendarClock aria-hidden /> {scheduleLabel}
            </Badge>
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          {best ? (
            <>
              <Trophy className="size-4 text-muted-foreground" aria-hidden />
              <span>
                Best: <b className="tabular-nums">{best.total}/240</b>
              </span>
              <Badge variant={gradeTone(best.result)}>{best.result}</Badge>
            </>
          ) : (
            <span className="text-muted-foreground">
              {attemptCount > 0 ? `${String(attemptCount)} practice run(s)` : 'Not attempted yet'}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={() => {
              onStart(exam.id, 'full');
            }}
          >
            {attempted ? <RotateCcw /> : <PlayCircle />}
            {attempted ? 'Retry full exam' : 'Start full exam'}
          </Button>
          <Select
            value=""
            onValueChange={module => {
              onStart(exam.id, module as AttemptMode);
            }}
          >
            <SelectTrigger size="sm" className="w-full" aria-label={`Practice one module of ${exam.title}`}>
              <SelectValue placeholder="Practice one module…" />
            </SelectTrigger>
            <SelectContent>
              {EXAM_MODULES.map(module => (
                <SelectItem key={module} value={module}>
                  {MODULE_META[module].short} ({moduleMinutes(module, settings)} min)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
