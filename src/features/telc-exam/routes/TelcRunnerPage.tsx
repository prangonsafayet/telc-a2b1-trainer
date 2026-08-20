import { Navigate, useParams } from 'react-router-dom';

import { findTelcExam } from '@content/trainers/index.ts';

import { TELC_MODULES } from '@shared/config/telcExam.ts';
import { TRAINERS } from '@shared/config/trainers.ts';
import { type AttemptMode, type TelcLevel } from '@shared/types';

import TelcRunnerView from '@features/telc-exam/components/runner/TelcRunnerView.tsx';

const isAttemptMode = (value: string | undefined): value is AttemptMode =>
  value === 'full' || (TELC_MODULES as readonly string[]).includes(value ?? '');

interface TelcRunnerPageProps {
  readonly level: TelcLevel;
}

/** Drives one B1/B2 attempt: briefing → module → optional self-scoring → results. */
const TelcRunnerPage = ({ level }: TelcRunnerPageProps) => {
  const { examId, mode } = useParams<{ examId: string; mode: string }>();
  const exam = findTelcExam(level, examId);
  const validMode = isAttemptMode(mode);

  /* An unknown exam or mode is a bad URL, not a state worth rendering. */
  if (!exam || !validMode) return <Navigate to={TRAINERS[level].basePath || '/'} replace />;
  return <TelcRunnerView level={level} exam={exam} mode={mode} />;
};

export default TelcRunnerPage;
