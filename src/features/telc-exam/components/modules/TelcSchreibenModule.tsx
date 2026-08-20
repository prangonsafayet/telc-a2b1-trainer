import { Teil } from '@shared/components';
import {
  itemKey,
  numberAnswer,
  textAnswer,
  WRITING_ANSWER_KEY,
  WRITING_TASK_KEY
} from '@shared/lib/answers.ts';
import { cn } from '@shared/lib/cn.ts';
import { Label, RadioGroup, RadioGroupItem, Textarea } from '@shared/ui';

import { describeTelcWordCount } from '@features/telc-exam/lib/wordCount.ts';

import { type TelcModuleProps } from '../moduleProps.ts';

import WritingTaskBrief from './WritingTaskBrief.tsx';

const TelcSchreibenModule = ({ exam, answers, setAnswer }: TelcModuleProps) => {
  const { schreiben } = exam;
  const hasChoice = schreiben.tasks.length > 1;
  const chosen = numberAnswer(answers, WRITING_TASK_KEY) ?? 0;
  const task = schreiben.tasks[chosen] ?? schreiben.tasks[0];
  const text = textAnswer(answers, WRITING_ANSWER_KEY);
  const { count, hint, inRange } = describeTelcWordCount(text, exam.level);

  if (!task) return null;

  return (
    <Teil
      title={exam.level === 'b1' ? 'Schreiben — Brief beantworten' : 'Schriftlicher Ausdruck'}
      chip="45 Punkte"
      anweisung={schreiben.anweisung}
    >
      {hasChoice ? (
        <RadioGroup
          className="mb-4 grid gap-2 sm:grid-cols-2"
          value={String(chosen)}
          onValueChange={next => {
            setAnswer(WRITING_TASK_KEY, Number(next));
          }}
        >
          {schreiben.tasks.map((candidate, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-2 rounded-lg border p-3 transition-colors',
                chosen === index && 'border-primary bg-accent/40'
              )}
            >
              <RadioGroupItem value={String(index)} id={itemKey('w.task-', index)} className="mt-1" />
              <Label htmlFor={itemKey('w.task-', index)} className="cursor-pointer font-normal">
                <b>Thema {String.fromCharCode(65 + index)}:</b> {candidate.titel}
              </Label>
            </div>
          ))}
        </RadioGroup>
      ) : null}

      <WritingTaskBrief task={task} />

      <Textarea
        className="min-h-64 leading-relaxed"
        placeholder={
          exam.level === 'b1' ? 'Liebe/r … / Sehr geehrte/r …' : 'Sehr geehrte Damen und Herren, …'
        }
        aria-label="Ihr Brief"
        spellCheck={false}
        value={text}
        onChange={event => {
          setAnswer(WRITING_ANSWER_KEY, event.target.value);
        }}
      />
      <div
        className={cn(
          'mt-2 text-right text-sm',
          inRange ? 'text-[color:var(--success-foreground)]' : 'text-muted-foreground'
        )}
      >
        {count} Wörter — {hint}
      </div>
    </Teil>
  );
};

export default TelcSchreibenModule;
