import { Home, ListChecks, RotateCcw } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { CountedNumber, Meter } from '@shared/components';
import {
  TELC_MODULE_META,
  TELC_ORAL_PASS,
  TELC_WRITTEN_PASS,
  telcModuleMinutes
} from '@shared/config/telcExam.ts';
import { TRAINERS } from '@shared/config/trainers.ts';
import { cn } from '@shared/lib/cn.ts';
import { fmtClock } from '@shared/lib/format.ts';
import { type ExamModule, type TelcLevel } from '@shared/types';
import { Button, Card, CardContent, CardDescription, CardHeader } from '@shared/ui';

import { useTrainerDoc } from '@features/progress';

import { useTelcAttempt, useTelcStart } from '../hooks/useTelcAttempt.ts';
import { summarizeTelcAttempt } from '../lib/telcAttemptSummary.ts';

interface TelcResultsPageProps {
  readonly level: TelcLevel;
}

const TelcResultsPage = ({ level }: TelcResultsPageProps) => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const { attempt, exam } = useTelcAttempt(level, attemptId);
  const { doc } = useTrainerDoc(level);
  const retry = useTelcStart(level);
  const base = TRAINERS[level].basePath;

  if (!attempt || !exam) return <Navigate to={`${base}/history`} replace />;

  const summary = summarizeTelcAttempt(attempt);
  const passed = attempt.result === 'Bestanden';

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
            {exam.title} · telc Deutsch {level.toUpperCase()} ·{' '}
            {summary.isFull ? 'Full exam' : `${TELC_MODULE_META[attempt.mode as ExamModule].name} (practice)`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {summary.isFull && attempt.total != null ? (
            <>
              <div
                className={cn(
                  'text-6xl font-bold tracking-tight',
                  passed ? 'text-[color:var(--success-foreground)]' : 'text-destructive'
                )}
              >
                {attempt.result}
              </div>
              <div className="text-lg tabular-nums">
                <b>
                  <CountedNumber value={attempt.total} durationMs={900} />
                </b>{' '}
                / 300 points · time used {fmtClock(summary.totalSeconds)}
              </div>
              <p className="text-sm tabular-nums text-muted-foreground">
                Written: <b>{attempt.written ?? 0}</b>/225 (pass ≥ {TELC_WRITTEN_PASS}) · Oral:{' '}
                <b>{attempt.oral ?? 0}</b>/75 (pass ≥ {TELC_ORAL_PASS}) — both must pass, no compensation.
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
          {summary.sectionBars.map(bar => (
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
                  `${TELC_MODULE_META[entry.module].short}: ${fmtClock(entry.seconds)} / ${String(telcModuleMinutes(entry.module, level, doc.settings))}:00`
              )
              .join(' · ')}
          </CardContent>
        </Card>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild>
          <Link to={`${base}/review/${String(attempt.id)}`}>
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
          <Link to={base || '/'}>
            <Home /> Dashboard
          </Link>
        </Button>
      </div>
    </>
  );
};

export default TelcResultsPage;
