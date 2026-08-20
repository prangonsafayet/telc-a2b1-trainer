import { Sparkles } from 'lucide-react';

import { CopyTextButton } from '@shared/components';
import { cn } from '@shared/lib/cn.ts';
import { type Cheatsheet, type LearnDay } from '@shared/types';
import { Badge, Card, CardContent, CardHeader, CardTitle, Checkbox, Label } from '@shared/ui';

import { learnTaskKey } from '../lib/planProgress.ts';

interface LearnDayCardProps {
  readonly day: LearnDay;
  readonly complete: boolean;
  readonly cheatsheets: Readonly<Record<string, Cheatsheet>>;
  readonly isTaskDone: (taskIndex: number) => boolean;
  readonly onToggleTask: (taskIndex: number, done: boolean) => void;
}

const LearnDayCard = ({ day, complete, cheatsheets, isTaskDone, onToggleTask }: LearnDayCardProps) => (
  <Card
    className={cn(
      'card-hover',
      complete &&
        'border-l-4 border-l-[color:var(--success)] bg-[color-mix(in_oklab,var(--success)_4%,transparent)]'
    )}
  >
    <CardHeader>
      <div className="flex flex-wrap items-center gap-2">
        <CardTitle className="text-base">
          Day {day.day}: {day.title}
        </CardTitle>
        <Badge variant="secondary">{day.focus}</Badge>
        {complete ? <Badge variant="success">done</Badge> : null}
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="space-y-2">
        {day.tasks.map((task, index) => {
          const id = learnTaskKey(day.day, index);
          const done = isTaskDone(index);
          return (
            <div key={id} className="flex items-start gap-3">
              <Checkbox
                id={id}
                className="mt-0.5"
                checked={done}
                onCheckedChange={next => {
                  onToggleTask(index, next === true);
                }}
              />
              <Label
                htmlFor={id}
                className={cn(
                  'cursor-pointer items-start text-sm font-normal leading-relaxed',
                  done && 'text-muted-foreground line-through'
                )}
              >
                {task}
              </Label>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-muted-foreground">
        Cheatsheets:{' '}
        {day.cheats.map((id, index) => (
          <span key={id}>
            {index > 0 ? ' · ' : ''}
            <a className="underline underline-offset-2 hover:text-foreground" href={`#cs-${id}`}>
              {cheatsheets[id]?.title ?? id}
            </a>
          </span>
        ))}
      </div>

      {day.ai.map((prompt, index) => (
        <div
          key={index}
          className="rounded-lg border-l-4 border-primary bg-accent/40 p-3 transition-colors hover:bg-accent/60"
        >
          <div className="flex items-center gap-1.5 font-semibold">
            <Sparkles className="size-4" aria-hidden /> AI practice — {prompt.t}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{prompt.p}</p>
          <CopyTextButton text={prompt.p} />
        </div>
      ))}
    </CardContent>
  </Card>
);

export default LearnDayCard;
