/**
 * The paper-independent half of the telc B1/B2 descriptor. Both levels share it: they share
 * the module list and the storage key, and a stored run names its own trainer.
 */

import { TELC_MODULES } from '@shared/config/telcExam.ts';

import { createRunStore } from '@features/exam/lib/runStore.ts';
import { type ExamRunFormat } from '@features/exam/types/examFormat.ts';

/** Stable since the feature shipped — do not rename without a migration. */
const RUN_STORAGE_KEY = 'telcTrainerLevelRunV1';

export const TELC_RUN_FORMAT: ExamRunFormat = {
  id: 'telc',
  modules: TELC_MODULES,
  runStore: createRunStore(RUN_STORAGE_KEY)
};
