import { Check, Copy, Sparkles } from 'lucide-react';

import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard.ts';
import { cn } from '@shared/lib/cn.ts';
import { learnTaskKey } from '@shared/lib/learnProgress.ts';
import { type LearnDay } from '@shared/types';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Checkbox, Label } from '@shared/ui';

interface CurriculumDayCardProps {
  readonly day: LearnDay;
  readonly complete: boolean;
  readonly isTaskDone: (taskIndex: number) => boolean;
  readonly onToggleTask: (taskIndex: number, done: boolean) => void;
}

const CopyPrompt = ({ prompt }: { readonly prompt: string }) => {
  const { copied, copy } = useCopyToClipboard();
  return (
    <Button
      variant="outline"
      size="sm"
      className="mt-2"
      onClick={() => {
        copy(prompt);
      }}
    >
      {copied ? <Check /> : <Copy />}
      {copied ? 'Copied' : 'Copy prompt'}
    </Button>
  );
};

/** One curriculum day: its tasks as checkboxes plus the AI practice prompts. */
export const CurriculumDayCard = ({ day, complete, isTaskDone, onToggleTask }: CurriculumDayCardProps) => (
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
                checked={done}
                onCheckedChange={checked => {
                  onToggleTask(index, checked === true);
                }}
                className="mt-0.5"
              />
              <Label
                htmlFor={id}
                className={cn(
                  'cursor-pointer font-normal leading-relaxed',
                  done && 'text-muted-foreground line-through'
                )}
              >
                {task}
              </Label>
            </div>
          );
        })}
      </div>

      {day.ai.map(prompt => (
        <div key={prompt.t} className="rounded-lg border bg-muted/30 p-3">
          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <Sparkles className="size-3.5 text-primary" aria-hidden /> AI practice: {prompt.t}
          </div>
          <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{prompt.p}</p>
          <CopyPrompt prompt={prompt.p} />
        </div>
      ))}
    </CardContent>
  </Card>
);
