import { describe, expect, it } from 'vitest';

import { TRAINER_CONTENT } from '@content/trainers/index.ts';

import { buildScheduleFrom, splitWorkDays } from '@features/plan/lib/buildSchedule.ts';
import { trainerScheduleSource } from '@features/plan/lib/trainerSource.ts';
import {
  MAX_EXAMS_PER_DAY,
  MAX_PREP_DAYS,
  MIN_PREP_DAYS,
  TOTAL_LEARN_DAYS
} from '@shared/config/schedule.ts';
import { addDays } from '@shared/lib/format.ts';
import { type LearnDoneMap, type Schedule } from '@shared/types';

/* The engine is the one piece of logic the whole plan hangs off, and a wrong plan still
   renders perfectly — a schedule that quietly drops half the curriculum looks fine in a
   screenshot. So the invariants are swept across every runway length rather than spot-checked. */

const TODAY = '2026-03-02';
/* The root trainer's own curriculum and papers: the engine is generic, so one trainer's
   content is enough to sweep its invariants. */
const CONTENT = TRAINER_CONTENT.a2b1;
const SOURCE = trainerScheduleSource('a2b1');
const LEARN_DAYS = CONTENT.curriculum.days;
const EXAM_COUNT = CONTENT.exams.length;
const CORE_DAYS = LEARN_DAYS.filter(day => day.tier === 'core').map(day => day.day);
const EXTENSION_DAYS = LEARN_DAYS.filter(day => day.tier === 'extension').map(day => day.day);
const ALL_EXAM_IDS = CONTENT.exams.map(exam => exam.id);

const isoIn = (days: number): string => {
  const iso = addDays(TODAY, days);
  if (iso === null) throw new Error('unreachable: TODAY is a valid date');
  return iso;
};

const build = (
  daysLeft: number,
  options: { readonly done?: LearnDoneMap; readonly attempted?: readonly number[] } = {}
): Schedule => {
  const schedule = buildScheduleFrom(
    {
      examDate: isoIn(daysLeft),
      today: TODAY,
      learnDone: options.done ?? {},
      attemptedExamIds: new Set(options.attempted ?? [])
    },
    SOURCE
  );
  if (!schedule) throw new Error('unreachable: a valid date always builds a plan');
  return schedule;
};

/** Every checkbox of days 1..`through`, so those days read as complete. */
const completeThrough = (through: number): LearnDoneMap => {
  const done: Record<string, boolean> = {};
  for (const day of LEARN_DAYS.filter(candidate => candidate.day <= through)) {
    day.tasks.forEach((_, index) => {
      done[`d${String(day.day)}t${String(index)}`] = true;
    });
  }
  return done;
};

const learnDaysIn = (schedule: Schedule): readonly number[] => schedule.slots.flatMap(slot => slot.learnDays);
const examIdsIn = (schedule: Schedule): readonly number[] => schedule.slots.flatMap(slot => slot.examIds);

const RUNWAYS = Array.from({ length: MAX_PREP_DAYS - MIN_PREP_DAYS + 1 }, (_, i) => MIN_PREP_DAYS + i);

describe('the content the engine assumes', () => {
  it('has 28 learn days in two equal tiers', () => {
    expect(LEARN_DAYS).toHaveLength(TOTAL_LEARN_DAYS);
    expect(CORE_DAYS).toHaveLength(14);
    expect(EXTENSION_DAYS).toHaveLength(14);
  });

  it('has 15 exams', () => {
    expect(EXAM_COUNT).toBe(15);
  });
});

describe('splitWorkDays', () => {
  it('reserves the exam eve and leaves both phases a floor', () => {
    for (const days of RUNWAYS) {
      const { learnSlots, mockSlots } = splitWorkDays(days);
      expect(learnSlots + mockSlots).toBe(days - 1);
      expect(learnSlots).toBeGreaterThanOrEqual(1);
      expect(mockSlots).toBeGreaterThanOrEqual(2);
    }
  });

  it('gives lessons the larger share', () => {
    expect(splitWorkDays(MAX_PREP_DAYS)).toEqual({ learnSlots: 54, mockSlots: 35 });
    expect(splitWorkDays(14)).toEqual({ learnSlots: 8, mockSlots: 5 });
  });
});

describe.each(RUNWAYS)('a %i-day runway', daysLeft => {
  const schedule = build(daysLeft);

  it('has one slot per day, dated consecutively from today', () => {
    expect(schedule.slots).toHaveLength(schedule.effectiveDays);
    schedule.slots.forEach((slot, index) => {
      expect(slot.dayOffset).toBe(index);
      expect(slot.date).toBe(isoIn(index));
    });
  });

  it('ends on the exam eve', () => {
    expect(schedule.slots.at(-1)?.kind).toBe('exam-eve');
  });

  it('never asks for more than two exams in a day', () => {
    for (const slot of schedule.slots) expect(slot.examIds.length).toBeLessThanOrEqual(MAX_EXAMS_PER_DAY);
  });

  it('schedules no lesson and no exam twice', () => {
    const lessons = learnDaysIn(schedule);
    const exams = examIdsIn(schedule);
    expect(new Set(lessons).size).toBe(lessons.length);
    expect(new Set(exams).size).toBe(exams.length);
  });

  it('accounts for every exam, as planned or as optional', () => {
    expect([...examIdsIn(schedule), ...schedule.unscheduledExamIds].sort((a, b) => a - b)).toEqual(
      ALL_EXAM_IDS
    );
  });

  it('accounts for every lesson, as planned or as extra material', () => {
    expect([...learnDaysIn(schedule), ...schedule.unscheduledLearnDays].sort((a, b) => a - b)).toEqual(
      LEARN_DAYS.map(day => day.day)
    );
  });

  it('holds the tier rule: extension days never displace a core day', () => {
    const compressed = schedule.slots.some(slot => slot.learnDays.length > 1);
    const hasExtension = learnDaysIn(schedule).some(day => EXTENSION_DAYS.includes(day));
    expect(hasExtension && compressed).toBe(false);
  });

  it('schedules every core day, unless it is the five-day emergency plan', () => {
    if (daysLeft === MIN_PREP_DAYS) return;
    for (const day of CORE_DAYS) expect(learnDaysIn(schedule)).toContain(day);
  });

  it('is deterministic', () => {
    expect(build(daysLeft)).toEqual(schedule);
  });
});

describe('runways outside the plannable window', () => {
  it('falls back to the emergency plan under five days, trimmed to the days left', () => {
    const sprint = build(3);
    expect(sprint.phase).toBe('final-sprint');
    expect(sprint.clamped).toBe('below-min');
    expect(sprint.slots).toHaveLength(3);
    expect(sprint.slots.map(slot => slot.kind)).toEqual(['learn', 'mock', 'exam-eve']);
  });

  it('keeps the crash course and the eve when only two days are left', () => {
    expect(build(2).slots.map(slot => slot.kind)).toEqual(['learn', 'exam-eve']);
  });

  it('treats the exam day itself as review only', () => {
    const today = build(0);
    expect(today.slots).toHaveLength(1);
    expect(today.slots[0]?.kind).toBe('exam-eve');
    expect(today.phase).toBe('final-sprint');
  });

  it('offers no plan once the date has passed, but still lists the work', () => {
    const past = build(-1);
    expect(past.phase).toBe('past-due');
    expect(past.slots).toEqual([]);
    expect(past.todaySlot).toBeNull();
    expect(past.unscheduledExamIds).toEqual(ALL_EXAM_IDS);
    expect(past.unscheduledLearnDays).toHaveLength(TOTAL_LEARN_DAYS);
  });

  it('plans the next ninety days when the exam is further off than that', () => {
    const far = build(120);
    expect(far.effectiveDays).toBe(MAX_PREP_DAYS);
    expect(far.clamped).toBe('above-max');
    /* The raw countdown is preserved: the header still says 120 days. */
    expect(far.daysLeft).toBe(120);
    expect(far.slots).toHaveLength(MAX_PREP_DAYS);
  });

  it('builds no plan at all from an unusable date', () => {
    expect(
      buildScheduleFrom(
        { examDate: 'soon', today: TODAY, learnDone: {}, attemptedExamIds: new Set() },
        SOURCE
      )
    ).toBeNull();
    expect(
      buildScheduleFrom(
        { examDate: isoIn(10), today: '', learnDone: {}, attemptedExamIds: new Set() },
        SOURCE
      )
    ).toBeNull();
  });
});

describe('adapting to progress', () => {
  it('never schedules a finished lesson again', () => {
    expect(learnDaysIn(build(30, { done: completeThrough(10) })).some(day => day <= 10)).toBe(false);
  });

  it('spends the freed days on the extension tier', () => {
    const extensionsAfter = learnDaysIn(build(30, { done: completeThrough(10) })).filter(day =>
      EXTENSION_DAYS.includes(day)
    );
    const extensionsBefore = learnDaysIn(build(30)).filter(day => EXTENSION_DAYS.includes(day));
    expect(extensionsAfter.length).toBeGreaterThan(extensionsBefore.length);
  });

  it('never schedules a taken exam again', () => {
    expect(examIdsIn(build(30, { attempted: ALL_EXAM_IDS.slice(0, 14) }))).toEqual([15]);
  });

  it('becomes pure review once everything is done', () => {
    const done = build(30, { done: completeThrough(TOTAL_LEARN_DAYS), attempted: ALL_EXAM_IDS });
    expect(done.slots.every(slot => slot.kind === 'review' || slot.kind === 'exam-eve')).toBe(true);
    expect(done.unscheduledExamIds).toEqual([]);
    expect(done.unscheduledLearnDays).toEqual([]);
    expect(done.phase).toBe('mock');
  });

  it('reports the learn phase while core lessons remain', () => {
    expect(build(30).phase).toBe('learn');
    expect(build(30, { done: completeThrough(14) }).phase).toBe('mock');
  });
});

describe('the shape at the three interesting lengths', () => {
  it('a 90-day plan covers everything, one lesson a day, with review days between', () => {
    const long = build(MAX_PREP_DAYS);
    expect(new Set(learnDaysIn(long)).size).toBe(TOTAL_LEARN_DAYS);
    expect(new Set(examIdsIn(long)).size).toBe(EXAM_COUNT);
    expect(long.unscheduledExamIds).toEqual([]);
    expect(long.unscheduledLearnDays).toEqual([]);
    expect(long.slots.every(slot => slot.learnDays.length <= 1)).toBe(true);
    expect(long.slots.filter(slot => slot.kind === 'review').length).toBeGreaterThan(0);
  });

  it('a 14-day plan compresses the core, drops the extension tier and still fits five papers', () => {
    const two = build(14);
    for (const day of CORE_DAYS) expect(learnDaysIn(two)).toContain(day);
    expect(two.slots.some(slot => slot.learnDays.length > 1)).toBe(true);
    expect(learnDaysIn(two).some(day => EXTENSION_DAYS.includes(day))).toBe(false);
    expect(two.unscheduledLearnDays).toHaveLength(EXTENSION_DAYS.length);
    expect(new Set(examIdsIn(two)).size).toBeGreaterThanOrEqual(5);
    expect(two.unscheduledExamIds.length).toBeGreaterThan(0);
  });

  it('a 5-day plan is a crash course, three graded papers and an eve', () => {
    const five = build(MIN_PREP_DAYS);
    expect(five.slots.map(slot => slot.kind)).toEqual(['learn', 'mock', 'mock', 'mock', 'exam-eve']);
    expect(five.slots[0]?.learnDays).toEqual([1, 13]);
    expect(examIdsIn(five)).toEqual([1, 8, 15]);
    expect(five.clamped).toBe('none');
  });

  it('substitutes the nearest fresh paper when a sprint exam has been taken', () => {
    expect(examIdsIn(build(MIN_PREP_DAYS, { attempted: [1, 8] }))).toEqual([2, 7, 15]);
  });
});
