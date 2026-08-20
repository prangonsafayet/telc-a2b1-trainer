/**
 * The paper-independent half of the single-level (telc B1/B2) descriptor. Both levels share
 * it: they share the module list and the storage key, and a stored run names its own
 * trainer.
 */

import { SINGLE_LEVEL_MODULES } from '@shared/config/singleLevelExam.ts';

import { createRunStore } from '@features/exam/lib/runStore.ts';
import { type ExamRunFormat } from '@features/exam/types/examFormat.ts';

/** Stable since the feature shipped — do not rename without a migration. */
const RUN_STORAGE_KEY = 'telcTrainerLevelRunV1';

export const SINGLE_LEVEL_RUN_FORMAT: ExamRunFormat = {
  id: 'single-level',
  modules: SINGLE_LEVEL_MODULES,
  runStore: createRunStore(RUN_STORAGE_KEY)
};
