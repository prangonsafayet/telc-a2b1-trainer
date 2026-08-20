import { useMemo } from 'react';

import { examCount, TRAINERS } from '@shared/config/trainers.ts';
import { useTrainerContent } from '@shared/hooks/useTrainerContent.ts';
import { buildScoreChart } from '@shared/lib/scoreChart.ts';
import { type ScoreChartModel, type TrainerId } from '@shared/types';

import { describeMockLead, examSlotLabel, useToday, useTrainerSchedule } from '@features/plan';
import { useTrainerSlice } from '@features/progress';

import {
  buildMastery,
  buildMeters,
  buildTiles,
  buildWeakAreas,
  masteryCounts,
  passRuleFor
} from '../lib/dashboardModel.ts';
import { buildExamCards } from '../lib/examCards.ts';
import {
  type ExamCardModel,
  type MasteryModel,
  type MeterModel,
  type StatTileModel,
  type WeakAreaModel
} from '../types/dashboard.ts';

export interface DashboardStats {
  readonly heading: string;
  readonly lead: string;
  readonly passRule: string;
  readonly attemptCount: number;
  /** This trainer's own history page. */
  readonly historyTo: string;
  readonly tiles: readonly StatTileModel[];
  /** Best score per scored part of the paper. */
  readonly meters: readonly MeterModel[];
  /** Null for a trainer with no vocabulary bank; its Practice page shows its empty state. */
  readonly mastery: MasteryModel | null;
  readonly weakAreas: readonly WeakAreaModel[];
  readonly chart: ScoreChartModel;
  readonly examCards: readonly ExamCardModel[];
}

/**
 * Everything one trainer's dashboard displays, derived from its stored slice, its content
 * and its plan. Which sections that adds up to follows from what the descriptor offers.
 */
export const useDashboardStats = (trainer: TrainerId): DashboardStats => {
  const slice = useTrainerSlice(trainer);
  const schedule = useTrainerSchedule(trainer);
  const today = useToday();
  const info = TRAINERS[trainer];
  const content = useTrainerContent(trainer);
  const vocab = content.vocab;

  return useMemo(() => {
    const mastery = buildMastery(trainer, vocab, slice.srs, today);
    const counts = mastery === null ? null : masteryCounts(vocab, slice.srs, today);
    return {
      heading: `Dashboard · ${info.short}`,
      lead: schedule
        ? `${info.name}: ${describeMockLead(schedule, examCount(content))}`
        : `${info.name}: ${String(examCount(content))} Modelltests, easiest first. Take them in order under real timing.`,
      passRule: passRuleFor(info),
      attemptCount: slice.attempts.length,
      historyTo: `${info.basePath}/history`,
      tiles: buildTiles(slice, counts, today),
      meters: buildMeters(slice),
      mastery,
      weakAreas: buildWeakAreas(slice, vocab, info.basePath),
      chart: buildScoreChart(slice),
      examCards: buildExamCards(slice, info, content.exams, examId => examSlotLabel(schedule, examId))
    };
  }, [trainer, info, content, vocab, slice, schedule, today]);
};
