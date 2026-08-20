import { Navigate, useParams } from 'react-router-dom';

import { TRAINERS } from '@shared/config/trainers.ts';
import { findPaper } from '@shared/lib/examLookup.ts';
import { type TrainerId } from '@shared/types';

import AttemptResults from '@features/exam/components/results/AttemptResults.tsx';
import { useExamBinding } from '@features/exam/hooks/useExamBinding.ts';
import { useStartAttempt } from '@features/exam/hooks/useStartAttempt.ts';
import { findAttempt } from '@features/exam/lib/attempts.ts';

interface ResultsPageProps {
  readonly trainer: TrainerId;
}

/** What one finished attempt scored. */
const ResultsPage = ({ trainer }: ResultsPageProps) => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const binding = useExamBinding(trainer);
  const retry = useStartAttempt(trainer);
  const history = `${TRAINERS[trainer].basePath}/history`;

  if (binding.kind === 'single-level') {
    const attempt = findAttempt(binding.store.attempts, attemptId);
    const exam = attempt ? findPaper(binding.papers, attempt.examId) : undefined;
    if (!attempt || !exam) return <Navigate to={history} replace />;
    return (
      <AttemptResults
        trainer={trainer}
        format={binding.format}
        exam={exam}
        attempt={attempt}
        settings={binding.store.settings}
        onRetry={retry}
      />
    );
  }

  const attempt = findAttempt(binding.store.attempts, attemptId);
  const exam = attempt ? findPaper(binding.papers, attempt.examId) : undefined;
  if (!attempt || !exam) return <Navigate to={history} replace />;
  return (
    <AttemptResults
      trainer={trainer}
      format={binding.format}
      exam={exam}
      attempt={attempt}
      settings={binding.store.settings}
      onRetry={retry}
    />
  );
};

export default ResultsPage;
