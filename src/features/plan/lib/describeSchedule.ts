/** Human-readable labels for the schedule. Kept out of the components, which stay visual. */

import { MAX_PREP_DAYS, MIN_PREP_DAYS } from '@shared/config/schedule.ts';
import { parseIsoDate } from '@shared/lib/format.ts';
import { type Schedule, type ScheduleSlot, type SlotKind } from '@shared/types';

import { splitWorkDays } from './buildSchedule.ts';

const KIND_LABELS: Readonly<Record<SlotKind, string>> = {
  learn: 'Lessons',
  mock: 'Mock exam',
  mixed: 'Lessons + mock exam',
  review: 'Review & catch-up',
  'exam-eve': 'Exam eve — light review only'
};

export const slotKindLabel = (kind: SlotKind): string => KIND_LABELS[kind];

/** `Di, 26. Aug` — German, like the rest of the exam-facing copy. */
export const shortDateLabel = (iso: string): string => {
  const date = parseIsoDate(iso);
  if (!date) return iso;
  return date.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' });
};

/** `Today · Di, 26. Aug` for the slot headers. */
export const slotHeading = (slot: ScheduleSlot): string => {
  const relative = slot.dayOffset === 0 ? 'Today' : slot.dayOffset === 1 ? 'Tomorrow' : null;
  const date = shortDateLabel(slot.date);
  return relative ? `${relative} · ${date}` : date;
};

/** The one-line preview under the date picker. */
export const describePlanShape = (days: number): string => {
  const effective = Math.min(Math.max(days, MIN_PREP_DAYS), MAX_PREP_DAYS);
  const { learnSlots, mockSlots } = splitWorkDays(effective);
  return `${String(days)} days → ${String(learnSlots)} learning days + ${String(mockSlots)} mock-exam days + 1 exam eve`;
};

/** Why a stored date is being adjusted, or null when it needs no comment. */
export const describeClamp = (schedule: Schedule): string | null => {
  if (schedule.phase === 'past-due') {
    const ago = Math.abs(schedule.daysLeft);
    return `Your exam date was ${String(ago)} day${ago === 1 ? '' : 's'} ago. Set the next one to get a plan.`;
  }
  if (schedule.clamped === 'above-max') {
    return `Your exam is ${String(schedule.daysLeft)} days away. This plan covers the next ${String(MAX_PREP_DAYS)} days — come back for the rest.`;
  }
  if (schedule.clamped === 'below-min') {
    return `Only ${String(schedule.daysLeft)} day${schedule.daysLeft === 1 ? '' : 's'} left — this is the emergency plan: crash course, a few papers, then rest.`;
  }
  return null;
};

/** The Learn page lead, replacing the static "2-week learning phase" copy. */
export const describeLearnLead = (schedule: Schedule): string => {
  if (schedule.phase === 'past-due') {
    return 'Your exam date has passed. Set a new one in Settings and the plan below re-paces itself.';
  }
  const lessons = schedule.slots.reduce((sum, slot) => sum + slot.learnDays.length, 0);
  if (lessons === 0) {
    return 'Every scheduled lesson is done — the plan is all mock exams and review from here.';
  }
  const lessonDays = schedule.slots.filter(slot => slot.learnDays.length > 0).length;
  return `${String(schedule.daysLeft)} days to your exam, so the plan below fits ${String(lessons)} lesson${lessons === 1 ? '' : 's'} into ${String(lessonDays)} study day${lessonDays === 1 ? '' : 's'}. Work through them in order — one box per day.`;
};

/** The Dashboard lead. */
export const describeMockLead = (schedule: Schedule, examCount: number): string => {
  const scheduled = schedule.slots.reduce((sum, slot) => sum + slot.examIds.length, 0);
  if (schedule.phase === 'past-due' || scheduled === 0) {
    return `${String(examCount)} Modelltests, easiest first. Take them in order under real timing.`;
  }
  const optional = schedule.unscheduledExamIds.length;
  const tail = optional > 0 ? ` The other ${String(optional)} stay available if you find the time.` : '';
  return `${String(examCount)} Modelltests, easiest first. Your date fits ${String(scheduled)} of them into the plan.${tail}`;
};

/** Where an exam sits in the plan: `today`, `planned Do, 28. Aug`, or `optional`. */
export const examSlotLabel = (schedule: Schedule | null, examId: number): string | null => {
  if (!schedule || schedule.phase === 'past-due') return null;
  const slot = schedule.slots.find(candidate => candidate.examIds.includes(examId));
  if (!slot) return schedule.unscheduledExamIds.includes(examId) ? 'optional' : null;
  if (slot.dayOffset === 0) return 'today';
  if (slot.dayOffset === 1) return 'tomorrow';
  return `planned ${shortDateLabel(slot.date)}`;
};
