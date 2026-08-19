import { useCallback, useMemo, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { LEARN } from '@content/learn.ts';

import { useProgress } from '@features/progress';

import { learnTaskKey, summarizePlan, type PlanSummary } from '../lib/planProgress.ts';

export interface LearnPlanState {
  readonly summary: PlanSummary;
  readonly isTaskDone: (day: number, taskIndex: number) => boolean;
  readonly toggleTask: (day: number, taskIndex: number, done: boolean) => void;
  readonly isDayComplete: (day: number) => boolean;
  /** Cheatsheet ids that are expanded. */
  readonly openCheatsheets: readonly string[];
  readonly setOpenCheatsheets: (ids: string[]) => void;
}

export const useLearnPlan = (): LearnPlanState => {
  const { db, update } = useProgress();
  const { hash } = useLocation();
  const done = db.learnDone;

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
        return { ...current, learnDone: isDone ? { ...rest, [key]: true } : rest };
      });
    },
    [update]
  );

  const isDayComplete = useCallback(
    (day: number) => {
      const entry = LEARN.days.find(candidate => candidate.day === day);
      return entry ? entry.tasks.every((_, index) => isTaskDone(day, index)) : false;
    },
    [isTaskDone]
  );

  const summary = useMemo(() => summarizePlan(done), [done]);

  return { summary, isTaskDone, toggleTask, isDayComplete, openCheatsheets, setOpenCheatsheets };
};
