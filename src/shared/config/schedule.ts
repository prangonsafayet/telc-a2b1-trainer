/**
 * The shape of an adaptive study plan. The exam date decides how much of the curriculum
 * fits; these are the numbers that decision is made from.
 */

/** Below this, there is no plan left to make — only a final sprint. */
export const MIN_PREP_DAYS = 5;
/** Above this, a plan stops being a plan. Longer runways are covered from today. */
export const MAX_PREP_DAYS = 90;

/** Days 1–14 of `LEARN.days`: the essential curriculum, always scheduled. */
export const CORE_LEARN_DAYS = 14;
/** Days 15–28: B1 deepening, scheduled only when the pace allows. */
export const EXTENSION_LEARN_DAYS = 14;
export const TOTAL_LEARN_DAYS = CORE_LEARN_DAYS + EXTENSION_LEARN_DAYS;

export const MOCK_EXAM_COUNT = 15;

/** A full mock is ~2.5 h, so two is already a hard day and three is fiction. */
export const MAX_EXAMS_PER_DAY = 2;

/**
 * How the working days are split. 28 lesson days against 15 mocks plus 3 review days —
 * the mock phase needs the smaller share because a mock day is one sitting, not a topic.
 */
export const LEARN_PHASE_WEIGHT = 28;
export const MOCK_PHASE_WEIGHT = 18;

/** The mock phase needs at least this many days to be worth calling a phase. */
export const MIN_MOCK_SLOTS = 2;

/** A review day is inserted after this many consecutive lessons, when there is room. */
export const LESSONS_PER_REVIEW = 7;
/** …and after this many consecutive mocks. */
export const EXAMS_PER_REVIEW = 3;

/** The three difficulty anchors the five-day emergency plan reaches for. */
export const SPRINT_EXAM_IDS = [1, 8, 15] as const;
/** Lesson days that carry the crash course when there is only a sprint left. */
export const SPRINT_LEARN_DAYS = [1, 13] as const;
