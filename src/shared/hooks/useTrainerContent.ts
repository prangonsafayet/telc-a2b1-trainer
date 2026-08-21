import { use } from 'react';

import { TRAINERS } from '@shared/config/trainers.ts';
import { type TrainerContent, type TrainerId } from '@shared/types';

/*
 * `use()` suspends on a promise but must see the *same* promise instance on every render to
 * ever stop suspending — a fresh `.then()` each render would loop forever. This caches one
 * promise per trainer, so every caller across the tree shares the single in-flight (then
 * resolved) load instead of triggering a repeat `import()`.
 */
const contentPromises = new Map<TrainerId, Promise<TrainerContent>>();

const contentPromise = (trainer: TrainerId): Promise<TrainerContent> => {
  const cached = contentPromises.get(trainer);
  if (cached) return cached;
  const promise = TRAINERS[trainer].loadContent();
  contentPromises.set(trainer, promise);
  return promise;
};

/**
 * One trainer's exams, curriculum, guide and vocabulary bank. Suspends the nearest
 * `<Suspense>` boundary until that trainer's content chunk has loaded, then returns it
 * synchronously — every screen that calls this already renders under the router's top-level
 * boundary, so nothing else has to thread a loading state through.
 */
export const useTrainerContent = (trainer: TrainerId): TrainerContent => use(contentPromise(trainer));
