import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { type AttemptMode } from '@shared/types';

import { A2B1_RUN_FORMAT, useStartAttempt, type ExamRun } from '@features/exam';

export interface ResumableRun {
  readonly run: ExamRun | null;
  readonly discard: () => void;
  readonly resume: () => void;
  /** Always starts fresh, discarding any half-finished attempt for that exam. */
  readonly start: (examId: number, mode: AttemptMode) => void;
}

export const useResumableRun = (): ResumableRun => {
  const navigate = useNavigate();
  const store = A2B1_RUN_FORMAT.runStore;
  const start = useStartAttempt('a2b1');
  const [run, setRun] = useState<ExamRun | null>(() => store.load());

  const discard = useCallback(() => {
    store.clear();
    setRun(null);
    toast.info('In-progress attempt discarded.');
  }, [store]);

  const resume = useCallback(() => {
    if (run) void navigate(`/exam/${String(run.examId)}/${run.mode}`);
  }, [navigate, run]);

  return { run, discard, resume, start };
};
