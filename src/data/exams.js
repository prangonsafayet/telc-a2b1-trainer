import exam01 from './exam01.js';
import exam02 from './exam02.js';
import exam03 from './exam03.js';
import exam04 from './exam04.js';
import exam05 from './exam05.js';
import exam06 from './exam06.js';
import exam07 from './exam07.js';
import exam08 from './exam08.js';
import exam09 from './exam09.js';
import exam10 from './exam10.js';

export const EXAMS = [exam01, exam02, exam03, exam04, exam05, exam06, exam07, exam08, exam09, exam10]
  .slice()
  .sort((a, b) => a.id - b.id);

export const examById = id => EXAMS.find(e => e.id === Number(id));
