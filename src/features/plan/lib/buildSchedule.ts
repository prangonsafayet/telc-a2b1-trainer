/**
 * The schedule engine: exam date in, dated plan out.
 *
 * Pure by construction — `today` is an input, never read from the clock — so the same
 * arguments always give the same plan and the whole thing is unit-testable. The plan is
 * derived on every render and never persisted; the only stored inputs are the exam date,
 * the learn-plan checkboxes and the attempt list.
 *
 * Trainer-agnostic: what to schedule arrives as a `ScheduleSource`, which
 * `trainerScheduleSource` builds from the registry.
 */

import {
  EXAMS_PER_REVIEW,
  LEARN_PHASE_WEIGHT,
  LESSONS_PER_REVIEW,
  MAX_EXAMS_PER_DAY,
  MAX_PREP_DAYS,
  MIN_MOCK_SLOTS,
  MIN_PREP_DAYS,
  MOCK_PHASE_WEIGHT
} from '@shared/config/schedule.ts';
import { daysBetween, parseIsoDate, toIsoDate } from '@shared/lib/format.ts';
import { isLearnDayComplete } from '@shared/lib/learnProgress.ts';
import {
  type LearnDay,
  type PhaseSplit,
  type Schedule,
  type ScheduleClamp,
  type ScheduleInput,
  type ScheduleSlot,
  type SchedulePhase,
  type SlotKind
} from '@shared/types';

import { chunkEvenly, interleaveFillers } from './distribute.ts';

/**
 * What one trainer feeds the engine: its curriculum, its papers, and which of them the
 * emergency sprint reaches for. The engine itself is trainer-agnostic.
 */
export interface ScheduleSource {
  readonly learnDays: readonly LearnDay[];
  /** All exam ids of the trainer, easiest first. */
  readonly examIds: readonly number[];
  /** The difficulty anchors of the five-day emergency plan. */
  readonly sprintExamIds: readonly number[];
  /** Lesson days that carry the crash course when only a sprint is left. */
  readonly sprintLearnDays: readonly number[];
}

/** An easy, a middling and a hard paper — the sprint anchors of any exam list. */
export const sprintAnchors = (examIds: readonly number[]): readonly number[] => {
  const first = examIds[0];
  const middle = examIds[Math.floor(examIds.length / 2)];
  const last = examIds[examIds.length - 1];
  return [...new Set([first, middle, last])].filter((id): id is number => id !== undefined);
};

/** A slot before it knows its date or its kind. */
interface SlotDraft {
  readonly learnDays: readonly number[];
  readonly examIds: readonly number[];
}

interface Placement {
  /** Exactly as many groups as there were slots to fill. */
  readonly groups: readonly (readonly number[])[];
  /** What did not fit. Offered as optional material rather than dropped. */
  readonly unscheduled: readonly number[];
}

const EVE: SlotDraft = { learnDays: [], examIds: [] };

/**
 * How the plannable days divide between lessons and mocks. The eve is reserved first,
 * then the rest splits by weight, with a floor under each phase so neither disappears.
 */
export const splitWorkDays = (effectiveDays: number): PhaseSplit => {
  const workDays = Math.max(0, effectiveDays - 1);
  const weighted = Math.round((workDays * LEARN_PHASE_WEIGHT) / (LEARN_PHASE_WEIGHT + MOCK_PHASE_WEIGHT));
  const learnSlots = Math.min(Math.max(1, weighted), Math.max(1, workDays - MIN_MOCK_SLOTS));
  return { learnSlots, mockSlots: Math.max(0, workDays - learnSlots) };
};

/**
 * Lesson days into lesson slots. Core days always win: they are scheduled one per slot
 * whenever they fit and compressed several to a day when they do not, and extension days
 * only get a slot once every core day already has one.
 */
const placeLearnDays = (
  learnSlots: number,
  core: readonly number[],
  extension: readonly number[]
): Placement => {
  if (learnSlots < 1) return { groups: [], unscheduled: [...core, ...extension] };

  if (learnSlots >= core.length + extension.length) {
    /* Room to spare: one lesson a day, and the spare days become review days spread
       through the plan rather than banked at the end. */
    const lessons = [...core, ...extension].map(day => [day]);
    const spare = learnSlots - lessons.length;
    return { groups: interleaveFillers(lessons, spare, LESSONS_PER_REVIEW), unscheduled: [] };
  }

  if (learnSlots >= core.length) {
    const room = learnSlots - core.length;
    return {
      groups: [...core, ...extension.slice(0, room)].map(day => [day]),
      unscheduled: extension.slice(room)
    };
  }

  /* Not even the core fits one per day, so it compresses — and the extension tier is not
     attempted at all at this pace. */
  return { groups: chunkEvenly(core, learnSlots), unscheduled: [...extension] };
};

/** Unattempted exams into mock slots, easiest first, never more than two a day. */
const placeExams = (mockSlots: number, pending: readonly number[]): Placement => {
  if (mockSlots < 1) return { groups: [], unscheduled: [...pending] };

  if (pending.length <= mockSlots) {
    const each = pending.map(id => [id]);
    return { groups: interleaveFillers(each, mockSlots - each.length, EXAMS_PER_REVIEW), unscheduled: [] };
  }

  const capacity = mockSlots * MAX_EXAMS_PER_DAY;
  return {
    groups: chunkEvenly(pending.slice(0, capacity), mockSlots),
    unscheduled: pending.slice(capacity)
  };
};

/**
 * Picks the exams for the five-day plan: an easy, a middling and a hard one. An exam that
 * has already been taken is replaced by the nearest one that has not, so a sprint always
 * offers fresh papers.
 */
const pickSprintExams = (pending: readonly number[], sprintExamIds: readonly number[]): readonly number[] => {
  const chosen: number[] = [];
  for (const wanted of sprintExamIds) {
    const free = pending.filter(id => !chosen.includes(id));
    const [first, ...rest] = free;
    if (first === undefined) break;
    chosen.push(
      rest.reduce((best, id) => (Math.abs(id - wanted) < Math.abs(best - wanted) ? id : best), first)
    );
  }
  return chosen;
};

/**
 * The emergency plan: a crash course, three papers and an eve. Also the shape of any
 * runway shorter than five days, trimmed from the middle so the crash course and the eve
 * always survive.
 */
const buildSprint = (
  availableSlots: number,
  remainingCore: readonly number[],
  pending: readonly number[],
  source: ScheduleSource
): { readonly drafts: readonly SlotDraft[]; readonly examIds: readonly number[] } => {
  const crashDays = source.sprintLearnDays.filter(day => remainingCore.includes(day));
  const sprintExams = pickSprintExams(pending, source.sprintExamIds);

  if (availableSlots <= 1) return { drafts: [EVE], examIds: [] };

  const middle = sprintExams.slice(0, availableSlots - 2).map(id => ({ learnDays: [], examIds: [id] }));
  return {
    drafts: [{ learnDays: crashDays, examIds: [] }, ...middle, EVE],
    examIds: middle.flatMap(draft => draft.examIds)
  };
};

const kindFor = (draft: SlotDraft, isLast: boolean): SlotKind => {
  if (isLast) return 'exam-eve';
  const hasLearn = draft.learnDays.length > 0;
  const hasExam = draft.examIds.length > 0;
  if (hasLearn && hasExam) return 'mixed';
  if (hasExam) return 'mock';
  if (hasLearn) return 'learn';
  return 'review';
};

/**
 * The plan for one exam date, or null when the stored date is not a date — callers fall
 * back to the static copy rather than showing a plan built on a guess.
 */
export const buildScheduleFrom = (input: ScheduleInput, source: ScheduleSource): Schedule | null => {
  const daysLeft = daysBetween(input.today, input.examDate);
  const start = parseIsoDate(input.today);
  if (daysLeft === null || !start) return null;

  const clamped: ScheduleClamp =
    daysLeft < MIN_PREP_DAYS ? 'below-min' : daysLeft > MAX_PREP_DAYS ? 'above-max' : 'none';
  const effectiveDays = Math.min(Math.max(daysLeft, MIN_PREP_DAYS), MAX_PREP_DAYS);

  const incomplete = source.learnDays.filter(day => !isLearnDayComplete(day, input.learnDone));
  const remainingCore = incomplete.filter(day => day.tier === 'core').map(day => day.day);
  const remainingExtension = incomplete.filter(day => day.tier === 'extension').map(day => day.day);
  const pendingExamIds = source.examIds.filter(id => !input.attemptedExamIds.has(id));

  if (daysLeft < 0) {
    return {
      daysLeft,
      effectiveDays,
      clamped,
      phase: 'past-due',
      slots: [],
      todaySlot: null,
      unscheduledExamIds: pendingExamIds,
      unscheduledLearnDays: [...remainingCore, ...remainingExtension]
    };
  }

  const { drafts, unscheduledExamIds, unscheduledLearnDays } = buildDrafts(
    daysLeft,
    effectiveDays,
    remainingCore,
    remainingExtension,
    pendingExamIds,
    source
  );

  const slots = drafts.map<ScheduleSlot>((draft, index) => ({
    date: toIsoDate(new Date(start.getFullYear(), start.getMonth(), start.getDate() + index)),
    dayOffset: index,
    learnDays: draft.learnDays,
    examIds: draft.examIds,
    kind: kindFor(draft, index === drafts.length - 1)
  }));

  return {
    daysLeft,
    effectiveDays,
    clamped,
    phase: derivePhase(daysLeft, slots, remainingCore),
    slots,
    todaySlot: slots.find(slot => slot.dayOffset === 0) ?? null,
    unscheduledExamIds,
    unscheduledLearnDays
  };
};

interface Drafted {
  readonly drafts: readonly SlotDraft[];
  readonly unscheduledExamIds: readonly number[];
  readonly unscheduledLearnDays: readonly number[];
}

const buildDrafts = (
  daysLeft: number,
  effectiveDays: number,
  remainingCore: readonly number[],
  remainingExtension: readonly number[],
  pendingExamIds: readonly number[],
  source: ScheduleSource
): Drafted => {
  /* Five days is the shortest plannable runway, and anything shorter is that same plan
     with days taken out of the middle. Both cases are the emergency shape. */
  if (effectiveDays === MIN_PREP_DAYS) {
    const availableSlots = daysLeft < MIN_PREP_DAYS ? Math.max(1, daysLeft) : MIN_PREP_DAYS;
    const sprint = buildSprint(availableSlots, remainingCore, pendingExamIds, source);
    const scheduledLearn = sprint.drafts.flatMap(draft => draft.learnDays);
    return {
      drafts: sprint.drafts,
      unscheduledExamIds: pendingExamIds.filter(id => !sprint.examIds.includes(id)),
      unscheduledLearnDays: [...remainingCore, ...remainingExtension].filter(
        day => !scheduledLearn.includes(day)
      )
    };
  }

  const split = splitWorkDays(effectiveDays);
  const learn = placeLearnDays(split.learnSlots, remainingCore, remainingExtension);
  const mocks = placeExams(split.mockSlots, pendingExamIds);

  return {
    drafts: [
      ...learn.groups.map<SlotDraft>(group => ({ learnDays: group, examIds: [] })),
      ...mocks.groups.map<SlotDraft>(group => ({ learnDays: [], examIds: group })),
      EVE
    ],
    unscheduledExamIds: mocks.unscheduled,
    unscheduledLearnDays: learn.unscheduled
  };
};

const derivePhase = (
  daysLeft: number,
  slots: readonly ScheduleSlot[],
  remainingCore: readonly number[]
): SchedulePhase => {
  if (daysLeft < MIN_PREP_DAYS) return 'final-sprint';
  const lessonsAhead = slots.some(slot => slot.kind === 'learn' || slot.kind === 'mixed');
  return lessonsAhead && remainingCore.length > 0 ? 'learn' : 'mock';
};
