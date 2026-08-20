/** Presentation constants of the results and review screens. */

import { type AttemptGrade } from '@features/exam/types/examFormat.ts';

/** How long the headline score counts up. */
export const SCORE_COUNT_UP_MS = 900;

/** Staggers the score bars in behind the headline card. */
export const BARS_ANIMATION_DELAY = '120ms';

export const GRADE_TONE_CLASS: Readonly<Record<AttemptGrade['tone'], string>> = {
  success: 'text-[color:var(--success-foreground)]',
  warning: 'text-[color:var(--warning-foreground)]',
  destructive: 'text-destructive'
};
