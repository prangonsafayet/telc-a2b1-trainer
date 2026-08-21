import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { TRAINERS } from '@shared/config/trainers.ts';
import { type AttemptMode, type TrainerId } from '@shared/types';

import { runFormatFor } from '@features/exam/lib/formats/runFormats.ts';
import { createRun, queueForMode } from '@features/exam/lib/runStore.ts';

/**
 * Starts a fresh run of an exam and mode for one trainer, discarding any half-finished one,
 * and opens the runner. Used by every "start" and "retry" button in the app.
 */
export const useStartAttempt = (trainer: TrainerId): ((examId: number, mode: AttemptMode) => void) => {
  const navigate = useNavigate();
  return useCallback(
    (examId, mode) => {
      const format = runFormatFor(trainer);
      format.runStore.save(createRun({ trainer, examId, mode, queue: queueForMode(format.modules, mode) }));
      void navigate(`${TRAINERS[trainer].basePath}/exam/${String(examId)}/${mode}`);
    },
    [navigate, trainer]
  );
};
