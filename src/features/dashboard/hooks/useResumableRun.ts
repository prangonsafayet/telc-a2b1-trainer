import { useCallback, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { TRAINERS } from '@shared/config/trainers.ts';
import { type AttemptMode, type TrainerId } from '@shared/types';

import { runFormatFor, useStartAttempt, type ExamRun } from '@features/exam';

export interface ResumableRun {
  readonly run: ExamRun | null;
  /** What the run is: "full exam", or the short name of its module in that paper. */
  readonly modeLabel: string;
  readonly discard: () => void;
  readonly resume: () => void;
  /** Always starts fresh, discarding any half-finished attempt for that exam. */
  readonly start: (examId: number, mode: AttemptMode) => void;
}

/**
 * The half-finished run of one trainer's paper, if there is one. Two trainers that set the
 * same paper share its storage key, so a stored run that names another trainer is not this
 * trainer's to offer.
 */
export const useResumableRun = (trainer: TrainerId): ResumableRun => {
  const navigate = useNavigate();
  const format = useMemo(() => runFormatFor(trainer), [trainer]);
  const store = format.runStore;
  const start = useStartAttempt(trainer);
  const basePath = TRAINERS[trainer].basePath;
  const [run, setRun] = useState<ExamRun | null>(() => {
    const stored = store.load();
    return stored?.trainer === trainer ? stored : null;
  });

  const discard = useCallback(() => {
    store.clear();
    setRun(null);
    toast.info('In-progress attempt discarded.');
  }, [store]);

  const resume = useCallback(() => {
    if (run) void navigate(`${basePath}/exam/${String(run.examId)}/${run.mode}`);
  }, [navigate, run, basePath]);

  const modeLabel = run === null || run.mode === 'full' ? 'full exam' : format.moduleShort(run.mode);

  return { run, modeLabel, discard, resume, start };
};
