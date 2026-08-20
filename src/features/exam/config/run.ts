/** Constants of a run that hold for every paper. */

import { type ExamModule, type SpeakingPart } from '@shared/types';

/** Sprechen has no hard stop — the clock is only a guideline there. */
export const UNTIMED_MODULES: readonly ExamModule[] = ['sprechen'];

/** The three parts of the oral exam, in order. */
export const SPEAKING_PARTS: readonly SpeakingPart[] = ['t1', 't2', 't3'];

/** How often the countdown re-renders while a module is open. */
export const HEARTBEAT_MS = 1000;

/** Where a self-rating slider starts: the middle of the 0–5 band. */
export const DEFAULT_CRITERION_SCORE = 3;

/** The top of every self-rating criterion's band. */
export const MAX_CRITERION_SCORE = 5;

/** Seconds in a minute — the clock stores milliseconds, the descriptors minutes. */
export const SECONDS_PER_MINUTE = 60;

/** The other half of that conversion. Both are named, so neither reads as a magic number. */
export const MS_PER_SECOND = 1000;
