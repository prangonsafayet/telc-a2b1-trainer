/** How long each trainer's writing task should be. */

import { type TrainerId, type WritingTarget } from '@shared/types';

/**
 * The official windows: the A2·B1 letter asks for roughly 40–60 words, telc B1 wants a
 * full half-formal reply, and telc B2 states 150–200 words outright. The upper bound is
 * deliberately looser than the official one — going long is a grammar risk, not a failure.
 */
export const WRITING_TARGETS: Readonly<Record<TrainerId, WritingTarget>> = {
  a2b1: { min: 40, max: 80 },
  b1: { min: 80, max: 150 },
  b2: { min: 150, max: 220 }
};
