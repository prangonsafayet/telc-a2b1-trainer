import { ArrowRight, Check, X } from 'lucide-react';

import { cn } from '@shared/lib/cn.ts';
import { LETTERS } from '@shared/lib/format.ts';
import { Button, Card, CardContent, Progress } from '@shared/ui';

import { type QuizSession as QuizSessionState } from '@features/practice/lib/practiceStore.ts';

import SessionSummary from './SessionSummary.tsx';

interface QuizSessionProps {
  readonly session: QuizSessionState;
  readonly done: boolean;
  readonly onChoose: (option: number) => void;
  readonly onNext: () => void;
  readonly onRestart: () => void;
  readonly onClose: () => void;
}

/** The quiz run: one question at a time with instant feedback and an explanation. */
const QuizSession = ({ session, done, onChoose, onNext, onRestart, onClose }: QuizSessionProps) => {
  if (done) {
    return (
      <SessionSummary
        kind="quiz"
        correct={session.correct}
        wrong={session.wrong}
        onRestart={onRestart}
        onClose={onClose}
      />
    );
  }

  const question = session.questions[session.index];
  if (!question) return null;
  const answered = session.chosen !== null;

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div className="flex items-center gap-3">
        <Progress value={(session.index / session.questions.length) * 100} className="h-1.5" />
        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
          {session.index + 1}/{session.questions.length}
        </span>
      </div>

      {/* Re-keying restarts the entrance animation for every new question. */}
      <Card key={question.id} className="animate-pop-in">
        <CardContent className="space-y-4">
          <div>
            <div className="text-lg font-semibold leading-relaxed">{question.prompt}</div>
            <div className="mt-1 text-sm text-muted-foreground">{question.hint}</div>
          </div>

          <div className="grid gap-2">
            {question.options.map((option, index) => {
              const isAnswer = index === question.answer;
              const isChosen = index === session.chosen;
              return (
                <Button
                  key={index}
                  variant="outline"
                  disabled={answered}
                  onClick={() => {
                    onChoose(index);
                  }}
                  className={cn(
                    'h-auto justify-start whitespace-normal py-2.5 text-left leading-relaxed transition-transform',
                    !answered && 'hover:scale-[1.01]',
                    answered &&
                      isAnswer &&
                      'border-[color:var(--success)] bg-[color-mix(in_oklab,var(--success)_12%,transparent)] opacity-100',
                    answered && isChosen && !isAnswer && 'border-destructive bg-destructive/10 opacity-100'
                  )}
                >
                  <span className="mr-1 text-muted-foreground">{LETTERS[index] ?? String(index + 1)})</span>
                  <span className="min-w-0 flex-1">{option}</span>
                  {answered && isAnswer ? (
                    <Check className="size-4 shrink-0 text-[color:var(--success-foreground)]" />
                  ) : null}
                  {answered && isChosen && !isAnswer ? (
                    <X className="size-4 shrink-0 text-destructive" />
                  ) : null}
                </Button>
              );
            })}
          </div>

          {answered ? (
            <div className="animate-fade-up space-y-3">
              <p
                className={cn(
                  'rounded-lg border-l-4 p-3 text-sm leading-relaxed',
                  session.chosen === question.answer
                    ? 'border-[color:var(--success)] bg-[color-mix(in_oklab,var(--success)_8%,transparent)]'
                    : 'border-destructive bg-destructive/5'
                )}
              >
                {question.explanation}
              </p>
              <div className="flex justify-end">
                <Button onClick={onNext}>
                  Next <ArrowRight />
                </Button>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSession;
