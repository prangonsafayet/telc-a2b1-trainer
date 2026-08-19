import { type Exam } from '@shared/types';

import exam01 from './exam01.ts';
import exam02 from './exam02.ts';
import exam03 from './exam03.ts';
import exam04 from './exam04.ts';
import exam05 from './exam05.ts';
import exam06 from './exam06.ts';
import exam07 from './exam07.ts';
import exam08 from './exam08.ts';
import exam09 from './exam09.ts';
import exam10 from './exam10.ts';

/** All Modelltests, ordered easiest first. */
export const EXAMS: readonly Exam[] = [
  exam01,
  exam02,
  exam03,
  exam04,
  exam05,
  exam06,
  exam07,
  exam08,
  exam09,
  exam10
].toSorted((a, b) => a.id - b.id);

/** Looks up an exam by id; accepts the string form that arrives from route params. */
export function findExamById(id: string | number | undefined): Exam | undefined {
  const numeric = Number(id);
  return Number.isFinite(numeric) ? EXAMS.find(exam => exam.id === numeric) : undefined;
}
