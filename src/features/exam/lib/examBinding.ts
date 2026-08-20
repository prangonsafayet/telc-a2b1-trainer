/** Collapsing an `ExamBinding` back to one code path. */

import { type ExamPaper } from '@shared/types';

import { type ExamBinding, type ExamStore } from '@features/exam/types/examBinding.ts';
import { type ExamFormat, type RunSettings, type StoredAttempt } from '@features/exam/types/examFormat.ts';

/** One trainer's paper, its Modelltests and its stored attempts, with the types lined up. */
export interface BoundExam<
  TExam extends ExamPaper,
  TSettings extends RunSettings,
  TAttempt extends StoredAttempt
> {
  readonly format: ExamFormat<TExam, TSettings, TAttempt>;
  readonly papers: readonly TExam[];
  readonly store: ExamStore<TSettings, TAttempt>;
}

/**
 * Runs `render` against whichever member of the binding union this trainer has.
 *
 * The three exam screens do the same three things — find the paper, find the attempt,
 * redirect if either is missing — but a discriminated union cannot be looked up once: the
 * format, the papers and the store are correlated types, so narrowing them means one branch
 * per member and each screen used to carry two near-identical copies. `render` is generic
 * over the paper, so it is written once and instantiated per branch, and the correlation
 * stays sound: nothing here widens a type or asserts one.
 */
export const withBinding = <TResult>(
  binding: ExamBinding,
  render: <TExam extends ExamPaper, TSettings extends RunSettings, TAttempt extends StoredAttempt>(
    bound: BoundExam<TExam, TSettings, TAttempt>
  ) => TResult
): TResult => (binding.kind === 'single-level' ? render(binding) : render(binding));
