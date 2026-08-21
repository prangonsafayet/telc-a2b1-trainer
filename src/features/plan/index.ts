/**
 * Public surface of the plan feature: the adaptive schedule other features read, and the
 * copy they render it with.
 *
 * The engine itself (`buildScheduleFrom` and its helpers) is deliberately not here. Its
 * only caller outside `features/plan` is `tests/unit/schedule.test.ts`, which deep-imports
 * `lib/buildSchedule.ts` anyway — the settings page previews a plan shape through
 * `describePlanShape`, not by running the engine.
 */
export { useTrainerSchedule } from './hooks/useTrainerSchedule.ts';
export {
  describeClamp,
  describeLearnLead,
  describeMockLead,
  describePlanShape,
  examSlotLabel,
  slotHeading,
  slotKindLabel
} from './lib/describeSchedule.ts';
export { useToday } from './hooks/useToday.ts';
