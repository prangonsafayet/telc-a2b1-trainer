import { useCallback, useMemo, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useTrainerContent } from '@shared/hooks/useTrainerContent.ts';
import { learnTaskKey } from '@shared/lib/learnProgress.ts';
import { type Cheatsheet, type TrainerId } from '@shared/types';

import { useToday } from '@features/plan';
import { touchActivity, useTrainerSlice } from '@features/progress';

import { summarizePlan, type PlanSummary } from '../lib/planProgress.ts';

export interface LearnPlanState {
  readonly summary: PlanSummary;
  readonly cheatsheets: Readonly<Record<string, Cheatsheet>>;
  readonly isTaskDone: (day: number, taskIndex: number) => boolean;
  readonly toggleTask: (day: number, taskIndex: number, done: boolean) => void;
  readonly isDayComplete: (day: number) => boolean;
  /** Cheatsheet ids that are expanded. */
  readonly openCheatsheets: readonly string[];
  readonly setOpenCheatsheets: (ids: string[]) => void;
}

/**
 * The curriculum checkbox state of one trainer, stored in whichever slice of the progress
 * document that trainer owns. The key scheme is shared and persisted — never change it.
 */
export const useLearnPlan = (trainer: TrainerId): LearnPlanState => {
  const { learnDone: done, update } = useTrainerSlice(trainer);
  const today = useToday();
  const { hash } = useLocation();
  const curriculum = useTrainerContent(trainer).curriculum;

  /* A "#cs-writing" link from a day card should open that cheatsheet, not just scroll to
     a collapsed header. */
  const initialOpen = hash.startsWith('#cs-') ? [hash.slice(4)] : [];
  const [openCheatsheets, setOpenCheatsheets] = useState<readonly string[]>(initialOpen);

  const isTaskDone = useCallback(
    (day: number, taskIndex: number) => done[learnTaskKey(day, taskIndex)] === true,
    [done]
  );

  const toggleTask = useCallback(
    (day: number, taskIndex: number, isDone: boolean) => {
      update(current => {
        const key = learnTaskKey(day, taskIndex);
        /* Absent rather than `false`, so the map only ever lists completed tasks. */
        const { [key]: _removed, ...rest } = current.learnDone;
        const next = { ...current, learnDone: isDone ? { ...rest, [key]: true } : rest };
        return isDone ? touchActivity(next, today) : next;
      });
    },
    [update, today]
  );

  const isDayComplete = useCallback(
    (day: number) => {
      const entry = curriculum.days.find(candidate => candidate.day === day);
      return entry ? entry.tasks.every((_, index) => isTaskDone(day, index)) : false;
    },
    [curriculum.days, isTaskDone]
  );

  const summary = useMemo(() => summarizePlan(curriculum, done), [curriculum, done]);

  return {
    summary,
    cheatsheets: curriculum.cheatsheets,
    isTaskDone,
    toggleTask,
    isDayComplete,
    openCheatsheets,
    setOpenCheatsheets
  };
};
