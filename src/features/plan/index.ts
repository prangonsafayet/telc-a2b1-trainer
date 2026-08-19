/**
 * Public surface of the plan feature: the adaptive schedule other features read.
 *
 * The engine is exported alongside the hook because the settings page previews a plan
 * shape for a date the user has not saved yet.
 */
export { buildSchedule, buildScheduleFrom, splitWorkDays, sprintAnchors } from './lib/buildSchedule.ts';
export type { ScheduleSource } from './lib/buildSchedule.ts';
export { trainerScheduleSource } from './lib/trainerSource.ts';
export { useTrainerSchedule } from './hooks/useTrainerSchedule.ts';
export {
  describeClamp,
  describeLearnLead,
  describeMockLead,
  describePlanShape,
  examSlotLabel,
  shortDateLabel,
  slotHeading,
  slotKindLabel
} from './lib/describeSchedule.ts';
export { useSchedule } from './hooks/useSchedule.ts';
export { useToday } from './hooks/useToday.ts';
