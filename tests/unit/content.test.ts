import { describe, expect, it } from 'vitest';

import { DUAL_LEVEL_EXAMS, SINGLE_LEVEL_EXAMS, TRAINER_CONTENT } from '@content/trainers/index.ts';
import { type SingleLevelTrainerId, type TrainerId } from '@shared/types';

/* The schedule engine trusts every curriculum's numbering and tiers, and every exam list's
   id order. Content drift here silently reshapes a plan — and because a curriculum
   checkbox is stored as `d<day>t<index>`, adding, removing or reordering a day or a task
   re-points a learner's completed work at different work. So the shape of all three
   trainers is asserted, not just the one this file used to read. */

const TRAINERS = Object.values(TRAINER_CONTENT);

/** How many Modelltests each trainer ships. A drop here is missing content, not a refactor. */
const EXPECTED_EXAMS: Readonly<Record<TrainerId, number>> = { a2b1: 15, b1: 10, b2: 10 };

it('covers every registered trainer', () => {
  expect(TRAINERS.map(content => content.trainer)).toEqual(['a2b1', 'b1', 'b2']);
});

for (const content of TRAINERS) {
  const trainer = content.trainer;
  const plan = content.curriculum;

  describe(`${trainer}: the learn curriculum`, () => {
    it('is 28 days numbered without gaps', () => {
      expect(plan.days).toHaveLength(28);
      plan.days.forEach((day, index) => {
        expect(day.day).toBe(index + 1);
      });
    });

    it('is 14 core days followed by 14 extension days', () => {
      for (const day of plan.days) expect(day.tier).toBe(day.day <= 14 ? 'core' : 'extension');
    });

    it('gives every day at least three tasks and one usable AI prompt', () => {
      for (const day of plan.days) {
        expect(day.tasks.length).toBeGreaterThanOrEqual(3);
        for (const task of day.tasks) expect(task.trim().length).toBeGreaterThan(0);
        expect(day.ai.length).toBeGreaterThanOrEqual(1);
        for (const prompt of day.ai) {
          expect(prompt.t.length).toBeGreaterThan(0);
          /* A prompt too short to stand alone is not a prompt. */
          expect(prompt.p.length).toBeGreaterThan(40);
        }
      }
    });

    it('references only cheatsheets that exist', () => {
      const missing = [
        ...new Set(plan.days.flatMap(day => day.cheats).filter(key => !(key in plan.cheatsheets)))
      ];
      expect(missing).toEqual([]);
    });

    it('leaves no cheatsheet unreachable from the plan', () => {
      const orphans = Object.keys(plan.cheatsheets).filter(
        key => !plan.days.some(day => day.cheats.includes(key))
      );
      expect(orphans).toEqual([]);
    });

    it('gives every cheatsheet a title and real markup', () => {
      for (const sheet of Object.values(plan.cheatsheets)) {
        expect(sheet.title.length).toBeGreaterThan(0);
        expect(sheet.html).toMatch(/<\w/);
      }
    });

    it('keeps the authored intro as HTML, since the page injects it', () => {
      expect(plan.intro).toMatch(/<b>/);
    });
  });

  describe(`${trainer}: the exam list`, () => {
    it(`is ${String(EXPECTED_EXAMS[trainer])} exams with contiguous ids`, () => {
      expect(content.exams).toHaveLength(EXPECTED_EXAMS[trainer]);
      content.exams.forEach((exam, index) => {
        expect(exam.id).toBe(index + 1);
      });
    });

    it('never repeats a theme, so no two papers feel like the same paper', () => {
      expect(new Set(content.exams.map(exam => exam.theme)).size).toBe(content.exams.length);
    });

    it('titles every paper', () => {
      for (const exam of content.exams) expect(exam.title.trim().length).toBeGreaterThan(0);
    });
  });

  describe(`${trainer}: the guide`, () => {
    it('is substantial authored HTML', () => {
      expect(content.guide ?? '').toMatch(/<h1>/);
      expect((content.guide ?? '').length).toBeGreaterThan(1000);
    });
  });
}

describe('the A2·B1 exam list, which is the only one that ramps', () => {
  it('ramps difficulty and ends at B1', () => {
    expect(DUAL_LEVEL_EXAMS[0]?.difficulty).toBe('easy');
    expect(DUAL_LEVEL_EXAMS.at(-1)?.difficulty).toBe('b1');
    /* Once the ladder reaches b1 it must not drop back down. */
    const firstB1 = DUAL_LEVEL_EXAMS.findIndex(exam => exam.difficulty === 'b1');
    expect(DUAL_LEVEL_EXAMS.slice(firstB1).every(exam => exam.difficulty === 'b1')).toBe(true);
  });
});

describe('the A2·B1 curriculum', () => {
  it('ships the four B1 cheatsheets the extension tier teaches from', () => {
    for (const key of ['nebensaetze', 'passivkii', 'verbpraep', 'formal']) {
      expect(TRAINER_CONTENT.a2b1.curriculum.cheatsheets).toHaveProperty(key);
    }
  });
});

describe('the single-level exam lists', () => {
  const levels: readonly SingleLevelTrainerId[] = ['b1', 'b2'];

  for (const level of levels) {
    it(`marks every ${level} paper as its own level`, () => {
      const exams = SINGLE_LEVEL_EXAMS[level];
      expect(exams).toHaveLength(10);
      for (const exam of exams) expect(exam.level).toBe(level);
    });
  }

  it('does not share a paper object between the two levels', () => {
    const b1Titles = SINGLE_LEVEL_EXAMS.b1.map(exam => exam.theme);
    const b2Titles = SINGLE_LEVEL_EXAMS.b2.map(exam => exam.theme);
    expect(SINGLE_LEVEL_EXAMS.b1).not.toBe(SINGLE_LEVEL_EXAMS.b2);
    expect(b1Titles).not.toEqual(b2Titles);
  });
});
