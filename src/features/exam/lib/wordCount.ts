import { wordCount } from '@/shared/lib/format.ts';

/** The official task asks for roughly 40–60 words; past 80 is a warning sign. */
const TARGET_MIN = 40;
const TARGET_MAX = 80;

export interface WordCountFeedback {
  readonly count: number;
  readonly hint: string;
  readonly inRange: boolean;
}

export function describeWordCount(text: string): WordCountFeedback {
  const count = wordCount(text);
  if (count < TARGET_MIN) return { count, hint: 'aim for 40–60', inRange: false };
  if (count > TARGET_MAX) return { count, hint: 'that is plenty — check your grammar!', inRange: false };
  return { count, hint: 'good length ✓', inRange: true };
}
