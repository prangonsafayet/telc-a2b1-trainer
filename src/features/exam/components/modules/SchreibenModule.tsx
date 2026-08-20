import { Multiline, Teil } from '@shared/components';
import { WRITING_TARGETS } from '@shared/config/writing.ts';
import { textAnswer, WRITING_ANSWER_KEY } from '@shared/lib/answers.ts';
import { cn } from '@shared/lib/cn.ts';
import { describeWordCount } from '@shared/lib/writingFeedback.ts';
import { Textarea } from '@shared/ui';

import { type A2b1ModuleProps } from '@features/exam/types/moduleProps.ts';

const SchreibenModule = ({ exam, answers, setAnswer }: A2b1ModuleProps) => {
  const { schreiben } = exam;
  const text = textAnswer(answers, WRITING_ANSWER_KEY);
  const { count, hint, inRange } = describeWordCount(text, WRITING_TARGETS.a2b1);

  return (
    <Teil title="Schreiben — E-Mail beantworten" chip="60 Punkte" anweisung={schreiben.anweisung}>
      <p className="mb-4">{schreiben.situation}</p>

      <div className="my-4 overflow-hidden rounded-lg border">
        <div className="border-b bg-muted/60 px-4 py-2 text-sm text-muted-foreground">
          Von: {schreiben.incomingEmail.von} · Betreff:{' '}
          <b className="text-foreground">{schreiben.incomingEmail.betreff}</b>
        </div>
        <div className="p-4 leading-relaxed">
          <Multiline text={schreiben.incomingEmail.text} />
        </div>
      </div>

      <p className="mb-2 font-semibold">Schreiben Sie zu diesen Punkten:</p>
      <ol className="mb-4 list-decimal space-y-1 pl-5">
        {schreiben.points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ol>

      <Textarea
        className="min-h-64 leading-relaxed"
        placeholder="Liebe/r …"
        aria-label="Ihre E-Mail"
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

export default SchreibenModule;
