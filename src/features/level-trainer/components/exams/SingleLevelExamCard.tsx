import { CalendarClock, PlayCircle, RotateCcw, Trophy } from 'lucide-react';

import {
  SINGLE_LEVEL_MODULE_META,
  SINGLE_LEVEL_MODULES,
  singleLevelModuleMinutes
} from '@shared/config/singleLevelExam.ts';
import { type AttemptMode, type LevelTrainerSettings, type SingleLevelTrainerId } from '@shared/types';
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

import { type LevelExamCardStats } from '@features/level-trainer/lib/levelStats.ts';

interface SingleLevelExamCardProps {
  readonly level: SingleLevelTrainerId;
  readonly stats: LevelExamCardStats;
  readonly settings: LevelTrainerSettings;
  /** Where the plan puts this exam: `today`, `planned Do, 28. Aug`, `optional`, or nothing. */
  readonly scheduleLabel: string | null;
  readonly onStart: (examId: number, mode: AttemptMode) => void;
}

/** `today` earns the loud badge; a future date is quieter; optional is quietest. */
const scheduleTone = (label: string): BadgeVariant => {
  if (label === 'today') return 'default';
  if (label === 'tomorrow') return 'info';
  return label === 'optional' ? 'outline' : 'secondary';
};

const SingleLevelExamCard = ({
  level,
  stats,
  settings,
  scheduleLabel,
  onStart
}: SingleLevelExamCardProps) => {
  const { exam, bestTotal, attemptCount, lastResult } = stats;
  const attempted = attemptCount > 0;

  return (
    <Card className="card-hover relative gap-4 overflow-hidden">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: level === 'b1' ? 'var(--primary)' : 'var(--warning)' }}
      />
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{exam.title}</CardTitle>
          <Badge variant="secondary">{level.toUpperCase()}</Badge>
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
          {bestTotal !== null ? (
            <>
              <Trophy className="size-4 text-muted-foreground" aria-hidden />
              <span>
                Best: <b className="tabular-nums">{bestTotal}/300</b>
              </span>
              {lastResult ? (
                <Badge variant={lastResult === 'Bestanden' ? 'success' : 'destructive'}>{lastResult}</Badge>
              ) : null}
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
              {SINGLE_LEVEL_MODULES.map(module => (
                <SelectItem key={module} value={module}>
                  {SINGLE_LEVEL_MODULE_META[module].short} (
                  {singleLevelModuleMinutes(module, level, settings)} min)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleLevelExamCard;
