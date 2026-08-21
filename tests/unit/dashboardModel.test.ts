import { describe, expect, it } from 'vitest';

import { PASS_PERCENT } from '@shared/config/examConditions.ts';
import {
  A2_TOTAL,
  B1_TOTAL,
  EXAM_MODULES,
  MODULE_META,
  SKILL_MAX,
  SKILL_MODULES
} from '@shared/config/exam.ts';
import {
  SINGLE_LEVEL_MODULE_META,
  SINGLE_LEVEL_MODULES,
  SINGLE_LEVEL_SECTION_MAX
} from '@shared/config/singleLevelExam.ts';
import { buildScoreChart } from '@shared/lib/scoreChart.ts';
import {
  buildMeters,
  buildTiles,
  buildWeakAreas,
  metersHeading
} from '@features/dashboard/lib/dashboardModel.ts';
import type { TrainerSlice } from '@features/progress';
import type {
  DualLevelAttempt,
  SingleLevelAttempt,
  Settings,
  LevelTrainerSettings,
  VocabBank
} from '@shared/types';

/* The two papers are passed on different lines: 42 of 60 in an A2·B1 skill is 70%, while the
   single-level paper wants 60% of each section. Applying one paper's line to the other is a
   silent scoring bug — the dashboard simply prints a threshold the candidate's exam does not
   use — so both directions are asserted here rather than trusted to stay in step. */

const EMPTY_BANK: VocabBank = { verbs: [], nouns: [], adjectives: [], prepVerbs: [], caseItems: [] };

const SETTINGS: Settings = {
  examDate: '2026-09-19',
  writingMinutes: 10,
  playsAllowed: 2,
  ttsRate: 1,
  voiceName: ''
};

const LEVEL_SETTINGS: LevelTrainerSettings = {
  examDate: '2026-09-19',
  writingMinutes: 30,
  playsAllowed: 1
};

const base = {
  learnDone: {},
  srs: {},
  activity: {},
  attemptedExamIds: new Set<number>(),
  update: () => undefined,
  setSetting: () => undefined,
  saveAttempt: () => undefined
};

/** A dual-level slice whose only attempt scored `lesen` at the given fraction of 60. */
const dualLevelSlice = (fraction: number): TrainerSlice => {
  const attempt: DualLevelAttempt = {
    id: 1,
    examId: 1,
    mode: 'full',
    date: '2026-08-20T10:00:00.000Z',
    times: {},
    scores: { lesen: SKILL_MAX * fraction },
    sb: null,
    answers: {},
    ratings: {}
  };
  return { ...base, trainer: 'a2b1', format: 'dual-level', settings: SETTINGS, attempts: [attempt] };
};

/** A single-level slice whose only attempt scored `lesen` at the given fraction of 75. */
const singleLevelSlice = (fraction: number): TrainerSlice => {
  const attempt: SingleLevelAttempt = {
    id: 1,
    examId: 1,
    mode: 'full',
    date: '2026-08-20T10:00:00.000Z',
    times: {},
    scores: { lesen: SINGLE_LEVEL_SECTION_MAX.lesen * fraction },
    answers: {},
    ratings: {}
  };
  return { ...base, trainer: 'b1', format: 'single-level', settings: LEVEL_SETTINGS, attempts: [attempt] };
};

const lesenArea = (slice: TrainerSlice) =>
  buildWeakAreas(slice, EMPTY_BANK, '').find(area => area.key === 'exam.lesen');

describe('the pass line each paper is judged on', () => {
  it('differs between the two papers, so neither can inherit the other', () => {
    expect(PASS_PERCENT['dual-level']).toBe(70);
    expect(PASS_PERCENT['single-level']).toBe(60);
  });

  it('marks the meters with the paper the trainer actually sits', () => {
    for (const meter of buildMeters(dualLevelSlice(1))) {
      expect(meter.thresholdPercent).toBe(PASS_PERCENT['dual-level']);
      expect(meter.thresholdLabel).toContain('70%');
    }
    for (const meter of buildMeters(singleLevelSlice(1))) {
      expect(meter.thresholdPercent).toBe(PASS_PERCENT['single-level']);
      expect(meter.thresholdLabel).toContain('60%');
    }
  });

  /* 65% is the band between the two lines: weak on the A2·B1 paper, a pass on the other.
     A single shared ratio cannot get both of these right. */
  it('flags a skill at 65% on the A2·B1 paper, whose line is 70%', () => {
    const area = lesenArea(dualLevelSlice(0.65));
    expect(area).toBeDefined();
    expect(area?.detail).toContain('below the 70% pass line');
  });

  it('leaves a section at 65% alone on the single-level paper, whose line is 60%', () => {
    expect(lesenArea(singleLevelSlice(0.65))).toBeUndefined();
  });

  it('flags a section below 60% on the single-level paper, and names that line', () => {
    const area = lesenArea(singleLevelSlice(0.5));
    expect(area).toBeDefined();
    expect(area?.detail).toContain('below the 60% pass line');
  });

  it('leaves a skill above 70% alone on the A2·B1 paper', () => {
    expect(lesenArea(dualLevelSlice(0.8))).toBeUndefined();
  });
});

/* The A2·B1 paper's two grade zones had a copy in the score chart and another in the
   dashboard model, which is exactly how a "168" and a "170" end up on the same screen.
   They now come from one place; this is the guard that they still do. */
describe('the A2·B1 grade zones', () => {
  const withTotal = (total: number): TrainerSlice => {
    const attempt: DualLevelAttempt = {
      id: 1,
      examId: 1,
      mode: 'full',
      date: '2026-08-20T10:00:00.000Z',
      times: {},
      scores: {},
      sb: null,
      answers: {},
      ratings: {},
      total,
      result: 'B1'
    };
    return { ...base, trainer: 'a2b1', format: 'dual-level', settings: SETTINGS, attempts: [attempt] };
  };

  const bestCaption = (total: number): string =>
    buildTiles(withTotal(total), null, '2026-08-20').find(tile => tile.kind === 'best')?.caption ?? '';

  it('calls the B1 total B1 territory and nothing below it', () => {
    expect(bestCaption(B1_TOTAL)).toBe('B1 territory 🎉');
    expect(bestCaption(B1_TOTAL - 1)).not.toBe('B1 territory 🎉');
  });

  it('points the A2 zone at the same B1 total the chart draws', () => {
    expect(bestCaption(A2_TOTAL)).toContain(String(B1_TOTAL));
    const gridlines = buildScoreChart({ format: 'dual-level', attempts: [] }).gridlines;
    expect(gridlines.map(line => line.value)).toContain(B1_TOTAL);
    expect(gridlines.map(line => line.value)).toContain(A2_TOTAL);
  });
});

/* The heading over the meters used to read "Skill progress" for both papers. On the
   single-level paper the meters are its five marked sections out of 75/30/75/45/75 — one of
   which (Sprachbausteine) is explicitly not a skill — so the heading has to follow the
   paper the way the meters already do. */
describe('the heading over the meters', () => {
  it('says skills on the A2·B1 paper, whose meters are its four 60-point skills', () => {
    expect(metersHeading(dualLevelSlice(1))).toMatch(/Skill/);
    expect(buildMeters(dualLevelSlice(1))).toHaveLength(4);
  });

  it("does not call the single-level paper's five marked sections skills", () => {
    expect(metersHeading(singleLevelSlice(1))).not.toMatch(/Skill/);
    expect(metersHeading(singleLevelSlice(1))).toMatch(/Section/);
    expect(buildMeters(singleLevelSlice(1))).toHaveLength(5);
  });
});

/* Both papers mark five sections with the same keys, and three of them have different
   names: `schreiben` is "Schreiben" on the A2·B1 paper and "Schriftlicher Ausdruck" on the
   single-level one, `sprechen` is "Sprechen" against "Mündliche Prüfung", and `hoeren` is
   "Hörverstehen · Hören & Schreiben" against "Hörverstehen". One shared table of labels
   therefore prints the other paper's exam on somebody's dashboard. */
describe('what the weak-area rows call a section', () => {
  /* Every section scored badly, so every row appears. `lesen` alone would prove nothing: it
     is the one section both papers call "Leseverstehen". */
  const failedSections = (slice: TrainerSlice): readonly string[] =>
    buildWeakAreas(slice, EMPTY_BANK, '')
      .filter(area => area.key.startsWith('exam.'))
      .map(area => area.label);

  const dualLevelAllSections: TrainerSlice = {
    ...base,
    trainer: 'a2b1',
    format: 'dual-level',
    settings: SETTINGS,
    attempts: [
      {
        id: 1,
        examId: 1,
        mode: 'full',
        date: '2026-08-20T10:00:00.000Z',
        times: {},
        scores: { lesen: 6, hoeren: 6, schreiben: 6, sprechen: 6 },
        sb: null,
        answers: {},
        ratings: {}
      }
    ]
  };

  const singleLevelAllSections: TrainerSlice = {
    ...base,
    trainer: 'b1',
    format: 'single-level',
    settings: LEVEL_SETTINGS,
    attempts: [
      {
        id: 1,
        examId: 1,
        mode: 'full',
        date: '2026-08-20T10:00:00.000Z',
        times: {},
        scores: { lesen: 7, sprachbausteine: 3, hoeren: 7, schreiben: 4, sprechen: 7 },
        answers: {},
        ratings: {}
      }
    ]
  };

  it("uses the A2·B1 paper's own section names on the A2·B1 paper", () => {
    const labels = failedSections(dualLevelAllSections);
    expect(labels).toHaveLength(SKILL_MODULES.length);
    expect(labels.toSorted()).toEqual(SKILL_MODULES.map(module => MODULE_META[module].name).toSorted());
  });

  it("uses the single-level paper's own section names on that paper", () => {
    const labels = failedSections(singleLevelAllSections);
    expect(labels).toHaveLength(SINGLE_LEVEL_MODULES.length);
    expect(labels.toSorted()).toEqual(
      SINGLE_LEVEL_MODULES.map(section => SINGLE_LEVEL_MODULE_META[section].name).toSorted()
    );
  });

  it('never labels the A2·B1 paper with a name only the other paper uses', () => {
    const onlySingleLevel = SINGLE_LEVEL_MODULES.map(
      section => SINGLE_LEVEL_MODULE_META[section].name
    ).filter(name => !EXAM_MODULES.some(module => MODULE_META[module].name === name));
    /* Guards the guard: if the two papers ever name every section identically this test
       proves nothing, and should be deleted rather than left passing. */
    expect(onlySingleLevel).toEqual(['Hörverstehen', 'Schriftlicher Ausdruck', 'Mündliche Prüfung']);

    const labels = failedSections(dualLevelAllSections);
    for (const name of onlySingleLevel) expect(labels).not.toContain(name);
  });
});

/* `SKILL_MODULES` is filtered out of `EXAM_MODULES` by `MODULE_META[…].isSkill`, and the
   predicate that does it claims the result is a `SkillKey`. That claim is what this asserts;
   the meters and the weak-area rows are built from it. */
describe('which modules the A2·B1 paper counts as skills', () => {
  it('is the four 60-point ones, in paper order', () => {
    expect(SKILL_MODULES).toEqual(['lesen', 'hoeren', 'schreiben', 'sprechen']);
  });

  it('leaves out every module the paper does not call a skill', () => {
    const skills: readonly string[] = SKILL_MODULES;
    for (const module of EXAM_MODULES) {
      expect(skills.includes(module)).toBe(MODULE_META[module].isSkill);
    }
  });
});
