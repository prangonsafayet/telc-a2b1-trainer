import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { findExamById } from '@content/exams';

import { EXAM_MODULES } from '@shared/config/exam.ts';
import { type Attempt, type AttemptMode, type Exam, type ExamModule } from '@shared/types';

import { useProgress } from '@features/progress';

import { createRun, saveRun } from '../lib/runState.ts';

/** Looks up a stored attempt and its exam by the id in the route. */
export function useAttempt(attemptId: string | undefined): {
  attempt: Attempt | undefined;
  exam: Exam | undefined;
} {
  const { db } = useProgress();
  const attempt = db.attempts.find(candidate => String(candidate.id) === attemptId);
  return { attempt, exam: attempt ? findExamById(attempt.examId) : undefined };
}

/** Starts a fresh run of the same exam and mode, discarding any half-finished one. */
export function useRetryExam(): (examId: number, mode: AttemptMode) => void {
  const navigate = useNavigate();
  return useCallback(
    (examId, mode) => {
      const queue: readonly ExamModule[] = mode === 'full' ? EXAM_MODULES : [mode];
      saveRun(createRun(examId, mode, queue));
      void navigate(`/exam/${String(examId)}/${mode}`);
    },
    [navigate]
  );
}
