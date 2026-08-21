import { beforeAll, describe, expect, it, vi } from 'vitest';

import { type TrainerId } from '@shared/types';

/*
 * Whether a trainer's content loads lazily is a fact about the *module graph*, not about a
 * file's size on disk — one static import anywhere in the chain `trainers.ts` pulls in would
 * put every trainer's exams, curriculum, guide and vocabulary bank back in one eager bundle
 * while every byte-count check in the build report kept passing (see Task 10's brief). So
 * this mocks each trainer's content module to record the moment it is first evaluated, then
 * asserts that importing the registry — and reading every eager fact it exposes — never
 * touches any of them, and that resolving one trainer's `loadContent()` touches only its own.
 *
 * `vi.mock` calls are hoisted above the rest of this file, so the state and helper they
 * close over has to come from `vi.hoisted` rather than a plain top-level `const`.
 */
const { loaded, trackLoad } = vi.hoisted(() => {
  const loaded: string[] = [];
  const trackLoad = (id: 'a2b1' | 'b1' | 'b2') => () => {
    loaded.push(id);
    return vi.importActual(`@content/trainers/${id}/index.ts`);
  };
  return { loaded, trackLoad };
});

vi.mock('@content/trainers/a2b1/index.ts', trackLoad('a2b1'));
vi.mock('@content/trainers/b1/index.ts', trackLoad('b1'));
vi.mock('@content/trainers/b2/index.ts', trackLoad('b2'));

/* A real ES module (mocked or not) evaluates its top-level body once per file run, so the
   registry is imported exactly once here — every test below shares that one import and
   reads the shared `loaded` log cumulatively, in a fixed order, rather than each resetting
   the module graph (which would test Vitest's mock lifecycle more than this task's code). */
let TRAINERS: (typeof import('@shared/config/trainers.ts'))['TRAINERS'];
let TRAINER_ORDER: (typeof import('@shared/config/trainers.ts'))['TRAINER_ORDER'];

beforeAll(async () => {
  const registry = await import('@shared/config/trainers.ts');
  TRAINERS = registry.TRAINERS;
  TRAINER_ORDER = registry.TRAINER_ORDER;
});

describe('the registry loads trainer content lazily, one chunk per trainer', () => {
  it('touches no trainer content while the registry module itself evaluates', () => {
    expect(loaded).toEqual([]);

    /* Every eager fact the registry exposes — paper, hasGuide, sprintLearnDays,
       weaknessCheatsheets — has to answer without loading anything either. */
    for (const id of TRAINER_ORDER) {
      const trainer = TRAINERS[id];
      expect(trainer.paper.minutes.schreiben).toBeGreaterThan(0);
      expect(typeof trainer.hasGuide).toBe('boolean');
      expect(trainer.sprintLearnDays.length).toBeGreaterThan(0);
    }
    expect(loaded).toEqual([]);
  });

  it('resolves b2 through its own loader, touching neither a2b1 nor b1', async () => {
    const content = await TRAINERS.b2.loadContent();

    expect(loaded).toEqual(['b2']);
    expect(content.trainer).toBe('b2');
    expect(content.exams.length).toBeGreaterThan(0);
    expect(content.curriculum.days.length).toBeGreaterThan(0);
  });

  it('resolves b1 next, still without touching a2b1', async () => {
    const content = await TRAINERS.b1.loadContent();

    expect(loaded).toEqual(['b2', 'b1']);
    expect(content.trainer).toBe('b1');
  });

  it('leaves a2b1 untouched until its own loader is finally called', async () => {
    const content = await TRAINERS.a2b1.loadContent();

    expect(loaded).toEqual(['b2', 'b1', 'a2b1']);
    expect(content.trainer).toBe('a2b1');
    /* The dual-level exam list, unlike the other two trainers', carries `difficulty` — a
       cheap way to confirm this really is a2b1's own content, not a shared shape. */
    expect(content.exams.every(exam => 'difficulty' in exam)).toBe(true);
  });

  it('gives every trainer an id-matching loader, so a fourth trainer just needs an entry', async () => {
    for (const id of TRAINER_ORDER) {
      const content = await TRAINERS[id].loadContent();
      expect(content.trainer).toBe(id satisfies TrainerId);
    }
  });
});
