import { type DualLevelExam } from '@shared/types';

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
import exam11 from './exam11.ts';
import exam12 from './exam12.ts';
import exam13 from './exam13.ts';
import exam14 from './exam14.ts';
import exam15 from './exam15.ts';

/** All A2·B1 Modelltests, ordered easiest first. */
export const A2B1_EXAMS: readonly DualLevelExam[] = [
  exam01,
  exam02,
  exam03,
  exam04,
  exam05,
  exam06,
  exam07,
  exam08,
  exam09,
  exam10,
  exam11,
  exam12,
  exam13,
  exam14,
  exam15
].toSorted((a, b) => a.id - b.id);
