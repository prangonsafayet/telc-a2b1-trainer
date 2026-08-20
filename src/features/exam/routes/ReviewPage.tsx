import { Home, RotateCcw } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { Multiline, PageTitle, SectionTitle, Transcript } from '@shared/components';
import { fmtDate } from '@shared/lib/format.ts';
import { Button, Card, CardContent } from '@shared/ui';

import ReviewEntryCard from '../components/review/ReviewEntryCard.tsx';
import { useAttempt, useRetryExam } from '../hooks/useAttempt.ts';
import { attemptIncludes, buildReviewSections } from '../lib/reviewItems.ts';

const ReviewPage = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const { attempt, exam } = useAttempt(attemptId);
  const retry = useRetryExam();

  if (!attempt || !exam) return <Navigate to="/history" replace />;

  const sections = buildReviewSections(exam, attempt);
  const writtenText = typeof attempt.answers['w.text'] === 'string' ? attempt.answers['w.text'] : '';

  return (
    <>
      <PageTitle
        lead={`${fmtDate(attempt.date)} · Green = correct, red = wrong. Learn every red item before the next test.`}
      >
        Review — {exam.title}
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
          {section.entries.map(entry => (
            <ReviewEntryCard key={entry.id} entry={entry} />
          ))}
        </section>
      ))}

      {attemptIncludes(attempt, 'schreiben') ? (
        <section>
          <SectionTitle>Schreiben — {attempt.scores.schreiben ?? '–'}/60 (self-scored)</SectionTitle>
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
                  <Multiline text={exam.schreiben.musterloesung} />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ) : null}

      {attemptIncludes(attempt, 'sprechen') ? (
        <section>
          <SectionTitle>Sprechen — {attempt.scores.sprechen ?? '–'}/60 (self-scored)</SectionTitle>
          <Card>
            <CardContent className="text-sm text-muted-foreground">
              Recordings are session-only and not stored. Re-run the module to practice again — and re-read
              the Sprechen tactics in the Exam Guide.
            </CardContent>
          </Card>
        </section>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button
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
};

export default ReviewPage;
