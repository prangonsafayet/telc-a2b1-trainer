import { ArrowLeft, Check, X } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { Multiline, PageTitle, Transcript } from '@shared/components';
import { TRAINERS } from '@shared/config/trainers.ts';
import { cn } from '@shared/lib/cn.ts';
import { type TelcLevel } from '@shared/types';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@shared/ui';

import { useTelcAttempt } from '../hooks/useTelcAttempt.ts';
import { textAnswer, WRITING_ANSWER_KEY } from '../lib/answers.ts';
import { buildTelcReviewSections } from '../lib/reviewRows.ts';

interface TelcReviewPageProps {
  readonly level: TelcLevel;
}

/** Every item of an attempt with the given and the correct answer, plus transcripts. */
export const TelcReviewPage = ({ level }: TelcReviewPageProps) => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const { attempt, exam } = useTelcAttempt(level, attemptId);
  const base = TRAINERS[level].basePath;

  if (!attempt || !exam) return <Navigate to={`${base}/history`} replace />;

  const sections = buildTelcReviewSections(exam, attempt);
  const writtenText = textAnswer(attempt.answers, WRITING_ANSWER_KEY);
  const includesWriting = attempt.mode === 'full' || attempt.mode === 'schreiben';
  const writingTask = exam.schreiben.tasks[attempt.writingTask ?? 0] ?? exam.schreiben.tasks[0];

  return (
    <>
      <PageTitle
        lead={
          <>
            {exam.title} · telc Deutsch {level.toUpperCase()} — every item with your answer and the correct
            one. Red rows are the material for your next study session.
          </>
        }
      >
        Answer review
      </PageTitle>

      {sections.map(section => (
        <Card key={section.module} className="mb-6 animate-fade-up">
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {section.rows.map((row, index) => (
              <div
                key={index}
                className={cn(
                  'border-t py-3 first:border-t-0',
                  !row.correct && 'rounded-md bg-destructive/5 px-3'
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {row.label}
                    </div>
                    {row.prompt ? (
                      <p className="mt-0.5 text-sm leading-relaxed">
                        <Multiline text={row.prompt} />
                      </p>
                    ) : null}
                  </div>
                  <Badge variant={row.correct ? 'success' : 'destructive'} className="gap-1 py-1">
                    {row.correct ? <Check className="size-3" /> : <X className="size-3" />}
                    {row.correct ? 'correct' : 'wrong'}
                  </Badge>
                </div>
                <div className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground">Your answer: </span>
                    <span className={cn(!row.correct && 'text-destructive')}>{row.given}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Correct: </span>
                    <span className="text-[color:var(--success-foreground)]">{row.expected}</span>
                  </div>
                </div>
                {row.audio ? <Transcript audio={row.audio} /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {includesWriting && writingTask ? (
        <Card className="mb-6 animate-fade-up">
          <CardHeader>
            <CardTitle>Schriftlicher Ausdruck — your text vs. sample</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/40 p-4 leading-relaxed">
              <Multiline text={writtenText || '(empty)'} />
            </div>
            <div className="rounded-lg border-l-4 border-[color:var(--success)] bg-[color-mix(in_oklab,var(--success)_8%,transparent)] p-4 leading-relaxed">
              <Multiline text={writingTask.musterloesung} />
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Button asChild variant="outline">
        <Link to={`${base}/results/${String(attempt.id)}`}>
          <ArrowLeft /> Back to results
        </Link>
      </Button>
    </>
  );
};
