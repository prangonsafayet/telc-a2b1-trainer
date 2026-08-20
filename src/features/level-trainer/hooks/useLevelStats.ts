import { useMemo } from 'react';

import { SINGLE_LEVEL_EXAMS, TRAINER_CONTENT } from '@content/trainers/index.ts';

import { type SingleLevelTrainerId } from '@shared/types';

import { useToday } from '@features/plan';
import { useTrainerSlice, type TrainerSlice } from '@features/progress';

import {
  buildLevelStats,
  buildWeakAreas,
  type LevelDashboardStats,
  type LevelStatsContent,
  type WeakArea
} from '../lib/levelStats.ts';
import { CATEGORY_META } from '../lib/studyItems.ts';

export interface LevelTrainerView {
  readonly content: LevelStatsContent;
  readonly slice: TrainerSlice;
  readonly today: string;
  readonly stats: LevelDashboardStats;
  readonly weakAreas: readonly WeakArea[];
}

const CATEGORY_LABELS = Object.fromEntries(
  Object.entries(CATEGORY_META).map(([key, meta]) => [key, meta.label])
) as Record<keyof typeof CATEGORY_META, string>;

/** Everything a level trainer screen needs: content, stored slice, derived stats. */
export const useLevelStats = (level: SingleLevelTrainerId): LevelTrainerView => {
  const slice = useTrainerSlice(level);
  const today = useToday();

  const content = useMemo<LevelStatsContent>(
    () => ({ vocab: TRAINER_CONTENT[level].vocab, exams: SINGLE_LEVEL_EXAMS[level] }),
    [level]
  );

  const input = useMemo(
    () =>
      slice.format === 'single-level'
        ? { attempts: slice.attempts, srs: slice.srs, activity: slice.activity }
        : { attempts: [], srs: slice.srs, activity: slice.activity },
    [slice]
  );

  const stats = useMemo(() => buildLevelStats(input, content, today), [input, content, today]);
  const weakAreas = useMemo(() => buildWeakAreas(input, content, CATEGORY_LABELS), [input, content]);

  return useMemo(
    () => ({ content, slice, today, stats, weakAreas }),
    [content, slice, today, stats, weakAreas]
  );
};
