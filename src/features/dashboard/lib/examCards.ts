import { EXAM_MODULES, FULL_EXAM_MAX, MODULE_META } from '@shared/config/exam.ts';
import {
  SINGLE_LEVEL_MODULE_META,
  SINGLE_LEVEL_MODULES,
  SINGLE_LEVEL_TOTAL_MAX
} from '@shared/config/singleLevelExam.ts';
import { type TrainerInfo } from '@shared/config/trainers.ts';
import { difficultyTone, gradeTone } from '@shared/lib/examBadges.ts';
import { moduleMinutes } from '@shared/lib/paper.ts';
import { type DualLevelExam, type ExamDifficulty, type ExamPaper, type SingleLevelExam } from '@shared/types';

import { type TrainerSlice } from '@features/progress';

import { type ExamCardModel, type ExamModuleChoice } from '../types/dashboard.ts';

/** Difficulty accent, so the ramp from A2 to B1 is visible at a glance. */
const DIFFICULTY_ACCENTS: Readonly<Record<ExamDifficulty, string>> = {
  easy: 'var(--success)',
  medium: 'var(--warning)',
  b1: 'var(--primary)'
};

const bestOf = (totals: readonly (number | undefined)[]): number | null => {
  const scored = totals.filter((total): total is number => typeof total === 'number');
  return scored.length > 0 ? Math.max(...scored) : null;
};

/**
 * One card per Modelltest of one trainer, with its best result and where the plan puts it.
 * The two papers differ in what a card can say about itself — a difficulty chip against a
 * level chip, 240 points against 300 — so each is resolved here and the card only renders.
 *
 * `exams` is the trainer's own content, loaded by the caller (its content is lazy, this
 * function is not). It arrives as the generic `TrainerContent` shape's `readonly
 * ExamPaper[]` — narrowed to whichever paper `slice.format` says it is, which the registry
 * guarantees but the type system cannot see once the content has come through that generic
 * shape, hence the one cast per branch below.
 */
export const buildExamCards = (
  slice: TrainerSlice,
  trainer: TrainerInfo,
  exams: readonly ExamPaper[],
  scheduleLabel: (examId: number) => string | null
): readonly ExamCardModel[] => {
  if (slice.format === 'single-level') {
    const modules: readonly ExamModuleChoice[] = SINGLE_LEVEL_MODULES.map(module => ({
      mode: module,
      label: `${SINGLE_LEVEL_MODULE_META[module].short} (${String(moduleMinutes(trainer.paper, module, slice.settings))} min)`
    }));

    return (exams as readonly SingleLevelExam[]).map<ExamCardModel>(exam => {
      const attempts = slice.attempts.filter(attempt => attempt.examId === exam.id);
      const best = bestOf(attempts.map(attempt => attempt.total));
      const lastResult = attempts.at(-1)?.result ?? null;
      return {
        id: exam.id,
        title: exam.title,
        theme: exam.theme,
        accent: trainer.accent,
        badge: trainer.short,
        badgeTone: 'secondary',
        bestText: best === null ? null : `${String(best)}/${String(SINGLE_LEVEL_TOTAL_MAX)}`,
        resultLabel: best === null ? null : lastResult,
        resultTone: lastResult === 'Bestanden' ? 'success' : 'destructive',
        attemptCount: attempts.length,
        attempted: attempts.length > 0,
        modules,
        scheduleLabel: scheduleLabel(exam.id)
      };
    });
  }

  const modules: readonly ExamModuleChoice[] = EXAM_MODULES.map(module => ({
    mode: module,
    label: `${MODULE_META[module].short} (${String(moduleMinutes(trainer.paper, module, slice.settings))} min)`
  }));

  return (exams as readonly DualLevelExam[]).map<ExamCardModel>(exam => {
    const attempts = slice.attempts.filter(attempt => attempt.examId === exam.id);
    const full = attempts.filter(attempt => attempt.mode === 'full');
    const best = full.length > 0 ? full.reduce((a, b) => ((b.total ?? 0) > (a.total ?? 0) ? b : a)) : null;
    return {
      id: exam.id,
      title: exam.title,
      theme: exam.theme,
      accent: DIFFICULTY_ACCENTS[exam.difficulty],
      badge: exam.level,
      badgeTone: difficultyTone(exam.difficulty),
      bestText: best === null ? null : `${String(best.total ?? 0)}/${String(FULL_EXAM_MAX)}`,
      resultLabel: best?.result ?? null,
      resultTone: best === null ? null : gradeTone(best.result),
      attemptCount: attempts.length,
      attempted: attempts.length > 0,
      modules,
      scheduleLabel: scheduleLabel(exam.id)
    };
  });
};
