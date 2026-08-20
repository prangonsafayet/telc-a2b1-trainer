import { type WordCountFeedback, type WritingTarget } from '@shared/types';

import { wordCount } from './format.ts';

/** Live word count and a nudge, for whichever writing task is on screen. */
export const describeWordCount = (text: string, target: WritingTarget): WordCountFeedback => {
  const count = wordCount(text);
  if (count < target.min) {
    return { count, hint: `aim for ${String(target.min)}–${String(target.max)}`, inRange: false };
  }
  if (count > target.max) {
    return { count, hint: 'that is plenty — check your grammar!', inRange: false };
  }
  return { count, hint: 'good length ✓', inRange: true };
};
