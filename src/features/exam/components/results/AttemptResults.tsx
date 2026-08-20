import { Home, ListChecks, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

import { CountedNumber, Meter } from '@shared/components';
import { TRAINERS } from '@shared/config/trainers.ts';
import { cn } from '@shared/lib/cn.ts';
import { fmtClock } from '@shared/lib/format.ts';
import { type AttemptMode } from '@shared/types';
import { Button, Card, CardContent, CardDescription, CardHeader } from '@shared/ui';

import { BARS_ANIMATION_DELAY, GRADE_TONE_CLASS, SCORE_COUNT_UP_MS } from '@features/exam/config/results.ts';
import {
  type ExamFormat,
  type ExamPaper,
  type RunSettings,
  type StoredAttempt
} from '@features/exam/types/examFormat.ts';

interface AttemptResultsProps<
  TExam extends ExamPaper,
  TSettings extends RunSettings,
  TAttempt extends StoredAttempt
> {
  readonly format: ExamFormat<TExam, TSettings, TAttempt>;
  readonly exam: TExam;
  readonly attempt: TAttempt;
  readonly settings: TSettings;
  readonly onRetry: (examId: number, mode: AttemptMode) => void;
}

/** What one finished attempt scored, and where to go next. */
const AttemptResults = <
  TExam extends ExamPaper,
  TSettings extends RunSettings,
  TAttempt extends StoredAttempt
>({
  format,
  exam,
  attempt,
  settings,
  onRetry
}: AttemptResultsProps<TExam, TSettings, TAttempt>) => {
  const summary = format.scoring.summarize(attempt);
  const base = TRAINERS[format.trainer(exam)].basePath;
  const { grade } = summary;

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
            {format.examLabel(exam)} ·{' '}
            {attempt.mode === 'full' ? 'Full exam' : `${format.moduleName(attempt.mode)} (practice)`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {grade ? (
            <>
              <div className={cn('text-6xl font-bold tracking-tight', GRADE_TONE_CLASS[grade.tone])}>
                {grade.label}
              </div>
              <div className="text-lg tabular-nums">
                <b>
                  <CountedNumber value={grade.total} durationMs={SCORE_COUNT_UP_MS} />
                </b>{' '}
                / {grade.of} points · time used {fmtClock(summary.totalSeconds)}
              </div>
              {grade.notes.map(note => (
                <p key={note} className="text-sm tabular-nums text-muted-foreground">
                  {note}
                </p>
              ))}
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

      <Card className="mt-6 animate-fade-up" style={{ animationDelay: BARS_ANIMATION_DELAY }}>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          {summary.bars.map(bar => (
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
                  `${format.moduleShort(entry.module)}: ${fmtClock(entry.seconds)} / ${String(format.minutes(entry.module, exam, settings))}:00`
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
            onRetry(attempt.examId, attempt.mode);
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

export default AttemptResults;
