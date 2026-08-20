import { Navigate, useParams } from 'react-router-dom';

import { trainerHome } from '@shared/config/trainers.ts';
import { findPaper } from '@shared/lib/examLookup.ts';
import { type TrainerId } from '@shared/types';

import RunnerView from '@features/exam/components/runner/RunnerView.tsx';
import { useExamBinding } from '@features/exam/hooks/useExamBinding.ts';
import { isAttemptMode } from '@features/exam/lib/attemptMode.ts';
import { withBinding } from '@features/exam/lib/examBinding.ts';

interface RunnerPageProps {
  readonly trainer: TrainerId;
}

/** Drives one attempt: briefing → module → optional self-scoring → results. */
const RunnerPage = ({ trainer }: RunnerPageProps) => {
  const { examId, mode } = useParams<{ examId: string; mode: string }>();
  const binding = useExamBinding(trainer);
  const home = trainerHome(trainer);

  return withBinding(binding, ({ format, papers, store }) => {
    const exam = findPaper(papers, examId);
    /* An unknown exam or mode is a bad URL, not a state worth rendering. */
    if (!exam || !isAttemptMode(format, mode)) return <Navigate to={home} replace />;
    return <RunnerView trainer={trainer} format={format} exam={exam} mode={mode} store={store} />;
  });
};

export default RunnerPage;
