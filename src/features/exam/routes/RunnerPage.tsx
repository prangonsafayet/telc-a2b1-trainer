import { Navigate, useParams } from 'react-router-dom';

import { findExamById } from '@content/exams';
import { findSingleLevelExam } from '@content/trainers/index.ts';

import { TRAINERS } from '@shared/config/trainers.ts';
import { type TrainerId } from '@shared/types';

import RunnerView from '@features/exam/components/runner/RunnerView.tsx';
import { useExamBinding } from '@features/exam/hooks/useExamBinding.ts';
import { isAttemptMode } from '@features/exam/lib/attemptMode.ts';

interface RunnerPageProps {
  readonly trainer: TrainerId;
}

/** Drives one attempt: briefing → module → optional self-scoring → results. */
const RunnerPage = ({ trainer }: RunnerPageProps) => {
  const { examId, mode } = useParams<{ examId: string; mode: string }>();
  const binding = useExamBinding(trainer);
  const home = TRAINERS[trainer].basePath || '/';

  /* An unknown exam or mode is a bad URL, not a state worth rendering. */
  if (binding.kind === 'single-level') {
    const exam = findSingleLevelExam(binding.level, examId);
    if (!exam || !isAttemptMode(binding.format, mode)) return <Navigate to={home} replace />;
    return <RunnerView format={binding.format} exam={exam} mode={mode} store={binding.store} />;
  }

  const exam = findExamById(examId);
  if (!exam || !isAttemptMode(binding.format, mode)) return <Navigate to={home} replace />;
  return <RunnerView format={binding.format} exam={exam} mode={mode} store={binding.store} />;
};

export default RunnerPage;
