import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { findTelcExam } from '@content/trainers/index.ts';

import { TELC_MODULES } from '@shared/config/telcExam.ts';
import { TRAINERS } from '@shared/config/trainers.ts';
import {
  type AttemptMode,
  type ExamModule,
  type TelcAttempt,
  type TelcExam,
  type TelcLevel
} from '@shared/types';

import { useTrainerDoc } from '@features/progress';

import { createTelcRun, useTelcRunStore } from '../lib/runStore.ts';

/** Looks up a stored attempt and its exam by the id in the route. */
export const useTelcAttempt = (
  level: TelcLevel,
  attemptId: string | undefined
): {
  attempt: TelcAttempt | undefined;
  exam: TelcExam | undefined;
} => {
  const { doc } = useTrainerDoc(level);
  const attempt = doc.attempts.find(candidate => String(candidate.id) === attemptId);
  return { attempt, exam: attempt ? findTelcExam(level, attempt.examId) : undefined };
};

/** Starts a fresh run of an exam and mode, discarding any half-finished one. */
export const useTelcStart = (level: TelcLevel): ((examId: number, mode: AttemptMode) => void) => {
  const navigate = useNavigate();
  const startRun = useTelcRunStore(state => state.startRun);
  return useCallback(
    (examId, mode) => {
      const queue: readonly ExamModule[] = mode === 'full' ? TELC_MODULES : [mode];
      startRun(createTelcRun(level, examId, mode, queue));
      void navigate(`${TRAINERS[level].basePath}/exam/${String(examId)}/${mode}`);
    },
    [navigate, level, startRun]
  );
};
