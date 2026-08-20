import { useMemo } from 'react';

import { LEVEL_CONTENT } from '@content/trainers/index.ts';

import { type LevelContent, type SingleLevelTrainerId } from '@shared/types';

import { useToday } from '@features/plan';
import { useTrainerDoc, type TrainerDocHandle } from '@features/progress';

import {
  buildLevelStats,
  buildWeakAreas,
  type LevelDashboardStats,
  type WeakArea
} from '../lib/levelStats.ts';
import { CATEGORY_META } from '../lib/studyItems.ts';

export interface LevelTrainerView {
  readonly content: LevelContent;
  readonly doc: TrainerDocHandle['doc'];
  readonly updateDoc: TrainerDocHandle['updateDoc'];
  readonly today: string;
  readonly stats: LevelDashboardStats;
  readonly weakAreas: readonly WeakArea[];
}

const CATEGORY_LABELS = Object.fromEntries(
  Object.entries(CATEGORY_META).map(([key, meta]) => [key, meta.label])
) as Record<keyof typeof CATEGORY_META, string>;

/** Everything a level trainer screen needs: content, document, derived stats. */
export const useLevelStats = (level: SingleLevelTrainerId): LevelTrainerView => {
  const { doc, updateDoc } = useTrainerDoc(level);
  const today = useToday();
  const content = LEVEL_CONTENT[level];

  const stats = useMemo(() => buildLevelStats(doc, content, today), [doc, content, today]);
  const weakAreas = useMemo(() => buildWeakAreas(doc, content, CATEGORY_LABELS), [doc, content]);

  return useMemo(
    () => ({ content, doc, updateDoc, today, stats, weakAreas }),
    [content, doc, updateDoc, today, stats, weakAreas]
  );
};
