import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { EXAM_MODULES } from '@shared/config/exam.ts';
import { type AttemptMode, type ExamModule } from '@shared/types';

import { clearRun, createRun, loadRun, saveRun, type ExamRun } from '@features/exam';

export interface ResumableRun {
  readonly run: ExamRun | null;
  readonly discard: () => void;
  readonly resume: () => void;
  /** Always starts fresh, discarding any half-finished attempt for that exam. */
  readonly start: (examId: number, mode: AttemptMode) => void;
}

export const useResumableRun = (): ResumableRun => {
  const navigate = useNavigate();
  const [run, setRun] = useState<ExamRun | null>(() => loadRun());

  const discard = useCallback(() => {
    clearRun();
    setRun(null);
    toast.info('In-progress attempt discarded.');
  }, []);

  const resume = useCallback(() => {
    if (run) void navigate(`/exam/${String(run.examId)}/${run.mode}`);
  }, [navigate, run]);

  const start = useCallback(
    (examId: number, mode: AttemptMode) => {
      const queue: readonly ExamModule[] = mode === 'full' ? EXAM_MODULES : [mode];
      saveRun(createRun(examId, mode, queue));
      void navigate(`/exam/${String(examId)}/${mode}`);
    },
    [navigate]
  );

  return { run, discard, resume, start };
};
