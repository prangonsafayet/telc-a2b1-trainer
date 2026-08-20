/**
 * The paper-independent half of the dual-level (A2·B1) descriptor. Kept apart from the full
 * one so a dashboard can offer to resume a run without pulling in five module renderers.
 */

import { EXAM_MODULES, MODULE_META } from '@shared/config/exam.ts';
import { type ExamModule } from '@shared/types';

import { createRunStore } from '@features/exam/lib/runStore.ts';
import { type ExamRunFormat } from '@features/exam/types/examFormat.ts';

/** Stable since the trainer shipped — do not rename without a migration. */
const RUN_STORAGE_KEY = 'telcTrainerRunV1';

export const DUAL_LEVEL_RUN_FORMAT: ExamRunFormat = {
  id: 'dual-level',
  modules: EXAM_MODULES,
  moduleShort: (module: ExamModule) => MODULE_META[module].short,
  runStore: createRunStore(RUN_STORAGE_KEY)
};
