import { Home, ListChecks, RotateCcw } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { Meter } from '@/shared/components';
import { MODULE_META, moduleMinutes } from '@/shared/config/exam.ts';
import { useCountUp } from '@/shared/hooks/useCountUp.ts';
import { cn } from '@/shared/lib/cn.ts';
import { fmtClock } from '@/shared/lib/format.ts';
import { type ExamModule } from '@/shared/types';
import { Button, Card, CardContent, CardDescription, CardHeader } from '@/shared/ui';

import { useProgress } from '@/features/progress';

import { useAttempt, useRetryExam } from '../hooks/useAttempt.ts';
import { summarizeAttempt } from '../lib/attemptSummary.ts';

function CountedTotal({ value }: { readonly value: number }) {
  const shown = useCountUp(value, 900);
  return <b>{shown}</b>;
}

export function ResultsPage() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const { attempt, exam } = useAttempt(attemptId);
  const { db } = useProgress();
  const retry = useRetryExam();

  if (!attempt || !exam) return <Navigate to="/history" replace />;

  const summary = summarizeAttempt(attempt);
  const gradeTone =
    attempt.result === 'B1'
      ? 'text-[color:var(--success-foreground)]'
      : attempt.result === 'A2'
        ? 'text-[color:var(--warning-foreground)]'
        : 'text-destructive';

  return (
    <>
      <Card className="relative animate-pop-in overflow-hidden text-center shadow-md">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: summary.accentColor }}
        />
        <CardHeader className="items-center">
          <CardDescription>
            {exam.title} · {exam.level} ·{' '}
            {summary.isFull ? 'Full exam' : `${MODULE_META[attempt.mode as ExamModule].name} (practice)`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {summary.isFull && attempt.total != null ? (
            <>
              <div className={cn('text-6xl font-bold tracking-tight', gradeTone)}>{attempt.result}</div>
              <div className="text-lg tabular-nums">
                <CountedTotal value={attempt.total} /> / 240 points · time used{' '}
                {fmtClock(summary.totalSeconds)}
              </div>
              <p className="text-sm text-muted-foreground">
                B1 rule: ≥42/60 in three skills + ≥24/60 in the fourth. A2 rule: ≥24/60 in three + ≥6/60 in
                the fourth.
              </p>
            </>
          ) : (
            <>
              <div className="text-5xl font-bold tracking-tight tabular-nums">
                {summary.headlineScore}
                {summary.headlineSuffix ? (
                  <span className="text-2xl font-normal text-muted-foreground">{summary.headlineSuffix}</span>
                ) : null}
              </div>
              <div className="text-muted-foreground">time used {fmtClock(summary.totalSeconds)}</div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          {summary.skillBars.map(bar => (
            <Meter key={bar.label} label={bar.label} value={bar.value} of={bar.of} colorByScore />
          ))}
        </CardContent>
      </Card>

      {summary.moduleTimes.length > 0 ? (
        <Card className="mt-4">
          <CardContent className="text-sm">
            <b>Time per module:</b>{' '}
            {summary.moduleTimes
              .map(
                entry =>
                  `${MODULE_META[entry.module].short}: ${fmtClock(entry.seconds)} / ${String(moduleMinutes(entry.module, db.settings))}:00`
              )
              .join(' · ')}
          </CardContent>
        </Card>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild>
          <Link to={`/review/${String(attempt.id)}`}>
            <ListChecks /> Review answers &amp; transcripts
          </Link>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            retry(attempt.examId, attempt.mode);
          }}
        >
          <RotateCcw /> Retry this exam
        </Button>
        <Button asChild variant="ghost">
          <Link to="/">
            <Home /> Dashboard
          </Link>
        </Button>
      </div>
    </>
  );
}
