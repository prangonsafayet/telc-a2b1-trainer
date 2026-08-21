import { ArrowLeft, Home, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Multiline, PageTitle, SectionTitle, Transcript } from '@shared/components';
import { TRAINERS } from '@shared/config/trainers.ts';
import { textAnswer, WRITING_ANSWER_KEY } from '@shared/lib/answers.ts';
import { fmtDate } from '@shared/lib/format.ts';
import { type AttemptMode, type ExamPaper, type TrainerId } from '@shared/types';
import { Button, Card, CardContent } from '@shared/ui';

import ReviewRowCard from '@features/exam/components/review/ReviewRowCard.tsx';
import { attemptIncludes } from '@features/exam/lib/attemptMode.ts';
import { type ExamFormat, type RunSettings, type StoredAttempt } from '@features/exam/types/examFormat.ts';

interface AttemptReviewProps<
  TExam extends ExamPaper,
  TSettings extends RunSettings,
  TAttempt extends StoredAttempt
> {
  readonly trainer: TrainerId;
  readonly format: ExamFormat<TExam, TSettings, TAttempt>;
  readonly exam: TExam;
  readonly attempt: TAttempt;
  readonly onRetry: (examId: number, mode: AttemptMode) => void;
}

/** Every item of an attempt with the given and the correct answer, plus the transcripts. */
const AttemptReview = <
  TExam extends ExamPaper,
  TSettings extends RunSettings,
  TAttempt extends StoredAttempt
>({
  trainer,
  format,
  exam,
  attempt,
  onRetry
}: AttemptReviewProps<TExam, TSettings, TAttempt>) => {
  const base = TRAINERS[trainer].basePath;
  const sections = format.scoring.review(exam, attempt);
  const sample = format.scoring.writingSample(exam, attempt.answers);
  const writtenText = textAnswer(attempt.answers, WRITING_ANSWER_KEY);
  const selfScore = (module: 'schreiben' | 'sprechen'): string =>
    `${String(attempt.ratings[module] ?? '–')}/${String(format.rating[module].max)}`;

  return (
    <>
      <PageTitle
        lead={`${fmtDate(attempt.date)} · Green = correct, red = wrong. Learn every red item before the next test.`}
      >
        Review — {format.examLabel(exam)}
      </PageTitle>

      {sections.map(section => (
        <section key={section.module}>
          <SectionTitle>{section.heading}</SectionTitle>
          {section.transcripts?.map((audio, index) => (
            <Card className="my-3" key={index}>
              <CardContent>
                <Transcript audio={audio} />
              </CardContent>
            </Card>
          ))}
          {section.rows.map(row => (
            <ReviewRowCard key={row.id} row={row} />
          ))}
        </section>
      ))}

      {attemptIncludes(attempt.mode, 'schreiben') && sample ? (
        <section>
          <SectionTitle>
            {format.moduleName('schreiben')} — {selfScore('schreiben')} (self-scored)
          </SectionTitle>
          <Card>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">Your text</h3>
                <div className="rounded-lg border bg-muted/40 p-4 leading-relaxed">
                  <Multiline text={writtenText || '(empty)'} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Musterlösung</h3>
                <div className="rounded-lg border-l-4 border-[color:var(--success)] bg-[color-mix(in_oklab,var(--success)_8%,transparent)] p-4 leading-relaxed">
                  <Multiline text={sample.musterloesung} />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : null}

      {attemptIncludes(attempt.mode, 'sprechen') ? (
        <section>
          <SectionTitle>
            {format.moduleName('sprechen')} — {selfScore('sprechen')} (self-scored)
          </SectionTitle>
          <Card>
            <CardContent className="text-sm text-muted-foreground">{format.speakingReviewNote}</CardContent>
          </Card>
        </section>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild variant="outline">
          <Link to={`${base}/results/${String(attempt.id)}`}>
            <ArrowLeft /> Back to results
          </Link>
        </Button>
        <Button
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

export default AttemptReview;
