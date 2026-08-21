import { type AttemptMode, type ExamModule } from '@shared/types';

import { type ExamRunFormat } from '@features/exam/types/examFormat.ts';

/** A mode is valid for a format when it is a full sitting or one of that paper's modules. */
export const isAttemptMode = (format: ExamRunFormat, value: string | undefined): value is AttemptMode =>
  value === 'full' || (format.modules as readonly string[]).includes(value ?? '');

/** Whether an attempt covered a module: either it was a full sitting, or that was the mode. */
export const attemptIncludes = (mode: AttemptMode, module: ExamModule): boolean =>
  mode === 'full' || mode === module;
