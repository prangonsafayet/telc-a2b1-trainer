/* The schedule engine is the one piece of logic the whole plan hangs off, and its output
   is invisible in a screenshot: a plan that quietly drops half the curriculum still
   renders fine. So the invariants are swept across every runway length. */
import { buildSchedule } from '../src/features/plan/lib/buildSchedule.ts';
import { chunkEvenly } from '../src/features/plan/lib/distribute.ts';
import { LEARN } from '../src/content/learn.ts';
import { EXAMS } from '../src/content/exams/index.ts';
import {
  MAX_EXAMS_PER_DAY,
  MAX_PREP_DAYS,
  MIN_PREP_DAYS,
  MOCK_EXAM_COUNT,
  TOTAL_LEARN_DAYS
} from '../src/shared/config/schedule.ts';
import { addDays } from '../src/shared/lib/format.ts';

const checks = [];
const check = (name, cond, extra = '') => {
  checks.push(cond);
  console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${name}${!cond && extra ? ' — ' + extra : ''}`);
};

const TODAY = '2026-03-02';
const CORE_DAYS = LEARN.days.filter(d => d.tier === 'core').map(d => d.day);
const EXTENSION_DAYS = LEARN.days.filter(d => d.tier === 'extension').map(d => d.day);

const build = (daysLeft, { done = {}, attempted = [] } = {}) =>
  buildSchedule({
    examDate: addDays(TODAY, daysLeft),
    today: TODAY,
    learnDone: done,
    attemptedExamIds: new Set(attempted)
  });

/** Every checkbox of days 1..through, so those days count as complete. */
const completeThrough = through => {
  const done = {};
  for (const day of LEARN.days.filter(d => d.day <= through)) {
    day.tasks.forEach((_, i) => {
      done[`d${day.day}t${i}`] = true;
    });
  }
  return done;
};

const learnDaysIn = schedule => schedule.slots.flatMap(s => s.learnDays);
const examIdsIn = schedule => schedule.slots.flatMap(s => s.examIds);

/* ---------- content the engine assumes ---------- */

check(`content has ${TOTAL_LEARN_DAYS} learn days`, LEARN.days.length === TOTAL_LEARN_DAYS);
check(`content has ${MOCK_EXAM_COUNT} exams`, EXAMS.length === MOCK_EXAM_COUNT);
check('the tiers split evenly', CORE_DAYS.length === 14 && EXTENSION_DAYS.length === 14);

/* ---------- chunking helper ---------- */

check(
  'chunkEvenly front-loads the remainder (14 into 5 → 3/3/3/3/2)',
  JSON.stringify(chunkEvenly([...Array(14).keys()], 5).map(c => c.length)) === '[3,3,3,3,2]'
);
check('chunkEvenly preserves order', chunkEvenly([1, 2, 3, 4, 5], 2).flat().join() === '1,2,3,4,5');
check('chunkEvenly pads when there are more buckets than items', chunkEvenly([1], 3).length === 3);

/* ---------- invariants across every plannable runway ---------- */

const broken = { count: 0, dates: 0, eve: 0, examCap: 0, dupLearn: 0, core: 0, tierOrder: 0 };
for (let daysLeft = MIN_PREP_DAYS; daysLeft <= MAX_PREP_DAYS; daysLeft += 1) {
  const s = build(daysLeft);

  if (s.slots.length !== s.effectiveDays) broken.count += 1;
  if (s.slots.at(-1)?.kind !== 'exam-eve') broken.eve += 1;
  if (s.slots.some((slot, i) => slot.dayOffset !== i || slot.date !== addDays(TODAY, i))) broken.dates += 1;
  if (s.slots.some(slot => slot.examIds.length > MAX_EXAMS_PER_DAY)) broken.examCap += 1;

  const scheduledLearn = learnDaysIn(s);
  if (new Set(scheduledLearn).size !== scheduledLearn.length) broken.dupLearn += 1;
  /* Nothing is done, so every core day must be planned — except in the emergency shape,
     which deliberately teaches two days and spends the rest on papers. */
  if (daysLeft > MIN_PREP_DAYS && !CORE_DAYS.every(day => scheduledLearn.includes(day))) broken.core += 1;
  /* Extension days are a luxury: they may only appear once every core day has a day of
     its own, never while the core is compressed. */
  const compressedCore = s.slots.some(slot => slot.learnDays.length > 1);
  if (scheduledLearn.some(day => EXTENSION_DAYS.includes(day)) && compressedCore) broken.tierOrder += 1;
}
check('slot count always equals the effective runway', broken.count === 0, `${broken.count} lengths`);
check('the last slot is always the exam eve', broken.eve === 0, `${broken.eve} lengths`);
check('slot dates are consecutive from today', broken.dates === 0, `${broken.dates} lengths`);
check(
  `no slot ever holds more than ${MAX_EXAMS_PER_DAY} exams`,
  broken.examCap === 0,
  `${broken.examCap} lengths`
);
check('no learn day is scheduled twice', broken.dupLearn === 0, `${broken.dupLearn} lengths`);
check(
  'all 14 core days are scheduled at every runway past the sprint',
  broken.core === 0,
  `${broken.core} lengths`
);
check(
  'extension days never appear while the core is compressed',
  broken.tierOrder === 0,
  `${broken.tierOrder} lengths`
);

/* ---------- determinism ---------- */

check(
  'the same input builds the same plan',
  JSON.stringify(build(21)) === JSON.stringify(build(21)) &&
    JSON.stringify(build(21, { done: completeThrough(4) })) !==
      JSON.stringify(build(21, { done: completeThrough(6) }))
);

/* ---------- clamping ---------- */

const sprint = build(3);
check('3 days out is a final sprint', sprint.phase === 'final-sprint', sprint.phase);
check('3 days out is flagged below the minimum', sprint.clamped === 'below-min');
check(
  'a sprint is trimmed to the days actually left',
  sprint.slots.length === 3,
  `${sprint.slots.length} slots`
);
check('a sprint keeps the crash course first', sprint.slots[0].kind === 'learn', sprint.slots[0].kind);
check('a sprint keeps the eve last', sprint.slots.at(-1).kind === 'exam-eve');

const examToday = build(0);
check(
  'the exam day itself is review only',
  examToday.slots.length === 1 && examToday.slots[0].kind === 'exam-eve'
);

const past = build(-1);
check('a past date is past-due with no slots', past.phase === 'past-due' && past.slots.length === 0);
check('a past date still lists the work as optional', past.unscheduledExamIds.length === MOCK_EXAM_COUNT);
check('a past date has no today slot', past.todaySlot === null);

const far = build(120);
check('120 days out clamps to the maximum', far.effectiveDays === MAX_PREP_DAYS, String(far.effectiveDays));
check('120 days out is flagged above the maximum', far.clamped === 'above-max');
check('the raw countdown is kept as stored', far.daysLeft === 120);

check(
  'an unparseable exam date builds no plan',
  buildSchedule({ examDate: 'soon', today: TODAY, learnDone: {}, attemptedExamIds: new Set() }) === null
);

/* ---------- adaptivity ---------- */

const after10 = build(30, { done: completeThrough(10) });
check(
  'completed lessons are not scheduled again',
  !learnDaysIn(after10).some(day => day <= 10),
  learnDaysIn(after10).slice(0, 5).join()
);
check(
  'the freed days go to the extension tier',
  learnDaysIn(after10).filter(day => EXTENSION_DAYS.includes(day)).length >
    learnDaysIn(build(30)).filter(day => EXTENSION_DAYS.includes(day)).length
);

const oneLeft = build(30, { attempted: EXAMS.slice(0, 14).map(e => e.id) });
check(
  'attempted exams are not scheduled again',
  examIdsIn(oneLeft).join() === '15',
  examIdsIn(oneLeft).join()
);

const allDone = build(30, {
  done: completeThrough(TOTAL_LEARN_DAYS),
  attempted: EXAMS.map(e => e.id)
});
check(
  'with everything done the plan is pure review',
  allDone.slots.every(slot => slot.kind === 'review' || slot.kind === 'exam-eve')
);
check(
  'with everything done nothing is left over',
  allDone.unscheduledExamIds.length === 0 && allDone.unscheduledLearnDays.length === 0
);
check('with the core finished the plan is in its mock phase', allDone.phase === 'mock', allDone.phase);
check('with nothing finished the plan is in its learn phase', build(30).phase === 'learn');

/* ---------- ratio sanity at the three interesting lengths ---------- */

const long = build(MAX_PREP_DAYS);
check(
  'a 90-day plan schedules the whole curriculum',
  new Set(learnDaysIn(long)).size === TOTAL_LEARN_DAYS,
  `${new Set(learnDaysIn(long)).size} days`
);
check(
  'a 90-day plan schedules every exam',
  new Set(examIdsIn(long)).size === MOCK_EXAM_COUNT,
  `${new Set(examIdsIn(long)).size} exams`
);
check(
  'a 90-day plan leaves nothing optional',
  long.unscheduledExamIds.length === 0 && long.unscheduledLearnDays.length === 0
);
check('a 90-day plan builds in review days', long.slots.filter(s => s.kind === 'review').length > 0);
check(
  'a 90-day plan is one lesson a day',
  long.slots.every(s => s.learnDays.length <= 1)
);

const two = build(14);
check(
  'a 14-day plan still covers every core day',
  CORE_DAYS.every(day => learnDaysIn(two).includes(day))
);
check(
  'a 14-day plan compresses the core',
  two.slots.some(s => s.learnDays.length > 1)
);
check('a 14-day plan skips the extension tier', !learnDaysIn(two).some(day => EXTENSION_DAYS.includes(day)));
check(
  'a 14-day plan still fits at least five exams',
  new Set(examIdsIn(two)).size >= 5,
  `${new Set(examIdsIn(two)).size} exams`
);
check(
  'a 14-day plan marks the rest optional',
  two.unscheduledExamIds.length > 0 && two.unscheduledLearnDays.length === EXTENSION_DAYS.length
);

const five = build(MIN_PREP_DAYS);
check(
  'a 5-day plan is the emergency shape',
  five.slots.map(s => s.kind).join() === 'learn,mock,mock,mock,exam-eve',
  five.slots.map(s => s.kind).join()
);
check('a 5-day plan spreads the difficulty', examIdsIn(five).join() === '1,8,15', examIdsIn(five).join());
check(
  'a 5-day plan crams the two crash-course days',
  five.slots[0].learnDays.join() === '1,13',
  five.slots[0].learnDays.join()
);
check(
  'a 5-day plan substitutes an unattempted exam for a taken one',
  examIdsIn(build(MIN_PREP_DAYS, { attempted: [1, 8] })).join() === '2,7,15',
  examIdsIn(build(MIN_PREP_DAYS, { attempted: [1, 8] })).join()
);
check('a 5-day plan is not clamped', five.clamped === 'none');

const failed = checks.filter(c => !c).length;
console.log(
  failed
    ? `\nSCHEDULE FAILED (${failed}/${checks.length})`
    : `\nSCHEDULE PASSED (${checks.length}/${checks.length})`
);
process.exit(failed ? 1 : 0);
