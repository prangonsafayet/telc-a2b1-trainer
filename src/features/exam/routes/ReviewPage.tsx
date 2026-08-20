import { Navigate, useParams } from 'react-router-dom';

import { findExamById } from '@content/exams';
import { findTelcExam } from '@content/trainers/index.ts';

import { TRAINERS } from '@shared/config/trainers.ts';
import { type TrainerId } from '@shared/types';

import AttemptReview from '@features/exam/components/review/AttemptReview.tsx';
import { useExamBinding } from '@features/exam/hooks/useExamBinding.ts';
import { useStartAttempt } from '@features/exam/hooks/useStartAttempt.ts';
import { findAttempt } from '@features/exam/lib/attempts.ts';

interface ReviewPageProps {
  readonly trainer: TrainerId;
}

/** Every item of an attempt with the given and the correct answer, plus transcripts. */
const ReviewPage = ({ trainer }: ReviewPageProps) => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const binding = useExamBinding(trainer);
  const retry = useStartAttempt(trainer);
  const history = `${TRAINERS[trainer].basePath}/history`;

  if (binding.kind === 'telc') {
    const attempt = findAttempt(binding.store.attempts, attemptId);
    const exam = attempt ? findTelcExam(binding.level, attempt.examId) : undefined;
    if (!attempt || !exam) return <Navigate to={history} replace />;
    return <AttemptReview format={binding.format} exam={exam} attempt={attempt} onRetry={retry} />;
  }

  const attempt = findAttempt(binding.store.attempts, attemptId);
  const exam = attempt ? findExamById(attempt.examId) : undefined;
  if (!attempt || !exam) return <Navigate to={history} replace />;
  return <AttemptReview format={binding.format} exam={exam} attempt={attempt} onRetry={retry} />;
};

export default ReviewPage;
