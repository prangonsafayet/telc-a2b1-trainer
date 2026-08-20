import { Navigate, useParams } from 'react-router-dom';

import { findExamById } from '@content/exams';

import { EXAM_MODULES } from '@shared/config/exam.ts';
import { type AttemptMode } from '@shared/types';

import RunnerView from '@features/exam/components/runner/RunnerView.tsx';

const isAttemptMode = (value: string | undefined): value is AttemptMode =>
  value === 'full' || (EXAM_MODULES as readonly string[]).includes(value ?? '');

/** Drives one attempt: briefing → module → optional self-scoring → results. */
const RunnerPage = () => {
  const { examId, mode } = useParams<{ examId: string; mode: string }>();
  const exam = findExamById(examId);
  const validMode = isAttemptMode(mode);

  /* An unknown exam or mode is a bad URL, not a state worth rendering. */
  if (!exam || !validMode) return <Navigate to="/" replace />;
  return <RunnerView exam={exam} mode={mode} />;
};

export default RunnerPage;
