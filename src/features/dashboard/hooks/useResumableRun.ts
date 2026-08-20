import { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { ROOT_TRAINER } from '@shared/config/trainers.ts';
import { type AttemptMode } from '@shared/types';

import { runFormatFor, useStartAttempt, type ExamRun } from '@features/exam';

export interface ResumableRun {
  readonly run: ExamRun | null;
  readonly discard: () => void;
  readonly resume: () => void;
  /** Always starts fresh, discarding any half-finished attempt for that exam. */
  readonly start: (examId: number, mode: AttemptMode) => void;
}

export const useResumableRun = (): ResumableRun => {
  const navigate = useNavigate();
  const store = runFormatFor(ROOT_TRAINER).runStore;
  const start = useStartAttempt(ROOT_TRAINER);
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
