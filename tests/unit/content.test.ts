import { describe, expect, it } from 'vitest';

import { DUAL_LEVEL_EXAMS, TRAINER_CONTENT } from '@content/trainers/index.ts';

const LEARN = TRAINER_CONTENT.a2b1.curriculum;
const EXAMS = DUAL_LEVEL_EXAMS;
const GUIDE = TRAINER_CONTENT.a2b1.guide ?? '';

/* The schedule engine trusts the curriculum's numbering and tiers, and the exam list's id
   order. Content drift here silently reshapes every plan, so the shape is asserted. */

describe('the learn curriculum', () => {
  it('is 28 days numbered without gaps', () => {
    expect(LEARN.days).toHaveLength(28);
    LEARN.days.forEach((day, index) => {
      expect(day.day).toBe(index + 1);
    });
  });

  it('is 14 core days followed by 14 extension days', () => {
    for (const day of LEARN.days) expect(day.tier).toBe(day.day <= 14 ? 'core' : 'extension');
  });

  it('gives every day at least three tasks and one usable AI prompt', () => {
    for (const day of LEARN.days) {
      expect(day.tasks.length).toBeGreaterThanOrEqual(3);
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
      ...new Set(LEARN.days.flatMap(day => day.cheats).filter(key => !(key in LEARN.cheatsheets)))
    ];
    expect(missing).toEqual([]);
  });

  it('ships the four B1 cheatsheets the extension tier teaches from', () => {
    for (const key of ['nebensaetze', 'passivkii', 'verbpraep', 'formal']) {
      expect(LEARN.cheatsheets).toHaveProperty(key);
    }
  });

  it('leaves no cheatsheet unreachable from the plan', () => {
    const orphans = Object.keys(LEARN.cheatsheets).filter(
      key => !LEARN.days.some(day => day.cheats.includes(key))
    );
    expect(orphans).toEqual([]);
  });

  it('gives every cheatsheet a title and real markup', () => {
    for (const sheet of Object.values(LEARN.cheatsheets)) {
      expect(sheet.title.length).toBeGreaterThan(0);
      expect(sheet.html).toMatch(/<\w/);
    }
  });

  it('keeps the authored intro as HTML, since the page injects it', () => {
    expect(LEARN.intro).toMatch(/<b>/);
  });
});

describe('the exam list', () => {
  it('is 15 exams with contiguous ids, easiest first', () => {
    expect(EXAMS).toHaveLength(15);
    EXAMS.forEach((exam, index) => {
      expect(exam.id).toBe(index + 1);
    });
  });

  it('never repeats a theme, so no two papers feel like the same paper', () => {
    expect(new Set(EXAMS.map(exam => exam.theme)).size).toBe(EXAMS.length);
  });

  it('ramps difficulty and ends at B1', () => {
    expect(EXAMS[0]?.difficulty).toBe('easy');
    expect(EXAMS.at(-1)?.difficulty).toBe('b1');
    /* Once the ladder reaches b1 it must not drop back down. */
    const firstB1 = EXAMS.findIndex(exam => exam.difficulty === 'b1');
    expect(EXAMS.slice(firstB1).every(exam => exam.difficulty === 'b1')).toBe(true);
  });
});

describe('the guide', () => {
  it('is substantial authored HTML', () => {
    expect(GUIDE.length).toBeGreaterThan(1000);
    expect(GUIDE).toMatch(/<h1>/);
  });
});
