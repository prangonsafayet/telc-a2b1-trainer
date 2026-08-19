import { wordCount } from '@shared/lib/format.ts';
import { type TelcLevel } from '@shared/types';

/** B1 asks for a solid half-formal letter; B2 explicitly wants 150–200 words. */
const TARGETS: Readonly<Record<TelcLevel, { readonly min: number; readonly max: number }>> = {
  b1: { min: 80, max: 150 },
  b2: { min: 150, max: 220 }
};

export interface TelcWordCountFeedback {
  readonly count: number;
  readonly hint: string;
  readonly inRange: boolean;
}

export const describeTelcWordCount = (text: string, level: TelcLevel): TelcWordCountFeedback => {
  const { min, max } = TARGETS[level];
  const count = wordCount(text);
  if (count < min) return { count, hint: `aim for ${String(min)}–${String(max)}`, inRange: false };
  if (count > max) return { count, hint: 'that is plenty — check your grammar!', inRange: false };
  return { count, hint: 'good length ✓', inRange: true };
};
