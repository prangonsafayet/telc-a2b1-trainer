import { Navigate, useParams } from 'react-router-dom';

import { findExamById } from '@content/exams';
import { findTelcExam } from '@content/trainers/index.ts';

import { TRAINERS } from '@shared/config/trainers.ts';
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

  if (binding.kind === 'telc') {
    const attempt = findAttempt(binding.store.attempts, attemptId);
    const exam = attempt ? findTelcExam(binding.level, attempt.examId) : undefined;
    if (!attempt || !exam) return <Navigate to={history} replace />;
    return (
      <AttemptResults
        format={binding.format}
        exam={exam}
        attempt={attempt}
        settings={binding.store.settings}
        onRetry={retry}
      />
    );
  }

  const attempt = findAttempt(binding.store.attempts, attemptId);
  const exam = attempt ? findExamById(attempt.examId) : undefined;
  if (!attempt || !exam) return <Navigate to={history} replace />;
  return (
    <AttemptResults
      format={binding.format}
      exam={exam}
      attempt={attempt}
      settings={binding.store.settings}
      onRetry={retry}
    />
  );
};

export default ResultsPage;
