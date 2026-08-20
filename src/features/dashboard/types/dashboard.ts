/**
 * The dashboard as a resolved model.
 *
 * The two papers report different things — four 60-point skills against a written/oral
 * split — and a trainer with a vocabulary bank has a mastery section and a streak that one
 * without does not. All of that is *data the descriptor offers*, worked out here, so there
 * is one Dashboard screen rather than one per trainer.
 */

import { type BadgeTone } from '@shared/lib/examBadges.ts';
import { type AttemptMode } from '@shared/types';

/** Which icon a tile wears. The component owns the icons; the model owns the numbers. */
export type StatTileKind = 'streak' | 'due' | 'exams' | 'best' | 'last';

export interface StatTileModel {
  readonly kind: StatTileKind;
  readonly label: string;
  /** Counted up when it is a number; rendered as-is when it is a label. */
  readonly value: number | string;
  /** e.g. `/240`. */
  readonly suffix: string | null;
  readonly caption: string;
}

/** One scored part of the paper, against the points a perfect one scores. */
export interface MeterModel {
  readonly key: string;
  readonly label: string;
  readonly value: number | null;
  readonly of: number;
}

export interface MasteryCategoryModel {
  readonly key: string;
  readonly label: string;
  readonly mastered: number;
  readonly total: number;
  readonly percent: number;
}

export interface MasteryModel {
  readonly mastered: number;
  readonly total: number;
  readonly percent: number;
  readonly categories: readonly MasteryCategoryModel[];
  readonly practiceTo: string;
  readonly learnTo: string;
}

export interface WeakAreaModel {
  readonly key: string;
  readonly label: string;
  readonly detail: string;
  /** 0–1, higher = weaker. Drives the ordering. */
  readonly severity: number;
  readonly to: string;
  readonly actionLabel: string;
}

export interface ExamModuleChoice {
  readonly mode: AttemptMode;
  readonly label: string;
}

export interface ExamCardModel {
  readonly id: number;
  readonly title: string;
  readonly theme: string;
  /** Top-stripe colour: the paper's difficulty where it has one, else the trainer's. */
  readonly accent: string;
  readonly badge: string;
  readonly badgeTone: BadgeTone;
  /** `168/240` once a full sitting has been marked. */
  readonly bestText: string | null;
  readonly resultLabel: string | null;
  readonly resultTone: BadgeTone | null;
  readonly attemptCount: number;
  readonly attempted: boolean;
  readonly modules: readonly ExamModuleChoice[];
  /** Where the plan puts this exam: `today`, `planned Do, 28. Aug`, `optional`, or nothing. */
  readonly scheduleLabel: string | null;
}
