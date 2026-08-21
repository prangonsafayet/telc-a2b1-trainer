import { describe, expect, it } from 'vitest';

import { SINGLE_LEVEL_ORAL_PASS, SINGLE_LEVEL_WRITTEN_PASS } from '@shared/config/singleLevelExam.ts';
import { type AnswerMap, type SingleLevelExam, type SingleLevelSectionScores } from '@shared/types';

import {
  countUnanswered,
  gradeFullExam,
  scoreHoeren,
  scoreLesen,
  scoreSprachbausteine
} from '@features/exam/lib/formats/single-level/scoring.ts';

/*
 * `scoring.ts` marks all twenty authored B1/B2 papers and nothing checked it before this
 * suite. The official scheme (verified against telc's own published documents, not
 * re-derived here):
 *   Lesen           Teil 1 5×5 + Teil 2 5×5 + Teil 3 10×2.5 = 75
 *   Sprachbausteine Teil 1 10×1.5 + Teil 2 10×1.5           = 30
 *   Hören           Teil 1 5×5 + Teil 2 10×2.5 + Teil 3 5×5 = 75
 *   written = lesen + sprachbausteine + hoeren + schreiben, max 225
 *   oral    = sprechen, max 75
 *   pass    = written >= 135 AND oral >= 45, no compensation between the two.
 *
 * A fixture is used rather than a real Modelltest so every count is exact and visible in
 * one place instead of implied by a content file's shape.
 */

const buildExam = (): SingleLevelExam => ({
  id: 1,
  level: 'b1',
  title: 'Fixture',
  theme: 'Fixture',
  lesen: {
    teil1: {
      anweisung: '',
      headlines: Array.from({ length: 10 }, (_, i) => `headline-${String(i)}`),
      texts: Array.from({ length: 5 }, (_, i) => `text-${String(i)}`),
      answers: [0, 1, 2, 3, 4]
    },
    teil2: {
      anweisung: '',
      titel: '',
      text: '',
      questions: Array.from({ length: 5 }, (_, i) => ({
        frage: `frage-${String(i)}`,
        options: ['a', 'b', 'c'],
        answer: i % 3
      }))
    },
    teil3: {
      anweisung: '',
      situations: Array.from({ length: 10 }, (_, i) => `situation-${String(i)}`),
      ads: Array.from({ length: 12 }, (_, i) => `ad-${String(i)}`),
      answers: Array.from({ length: 10 }, (_, i) => i)
    }
  },
  sprachbausteine: {
    teil1: {
      anweisung: '',
      text: '',
      gaps: Array.from({ length: 10 }, (_, i) => ({ options: ['a', 'b', 'c'], answer: i % 3 }))
    },
    teil2: {
      anweisung: '',
      text: '',
      wordBank: Array.from({ length: 15 }, (_, i) => `word-${String(i)}`),
      answers: Array.from({ length: 10 }, (_, i) => i)
    }
  },
  hoeren: {
    teil1: {
      anweisung: '',
      items: Array.from({ length: 5 }, (_, i) => ({
        statement: `statement-${String(i)}`,
        answer: i % 2 === 0,
        audio: ''
      }))
    },
    teil2: {
      anweisung: '',
      audio: '',
      statements: Array.from({ length: 10 }, (_, i) => ({
        statement: `statement-${String(i)}`,
        answer: i % 2 === 0
      }))
    },
    teil3: {
      anweisung: '',
      items: Array.from({ length: 5 }, (_, i) => ({
        statement: `statement-${String(i)}`,
        answer: i % 2 === 0,
        audio: ''
      }))
    }
  },
  schreiben: {
    anweisung: '',
    tasks: [{ titel: '', situation: '', leitpunkte: [], musterloesung: '' }],
    tipps: ''
  },
  sprechen: {
    teil1: { titel: '', anweisung: '', punkte: [], redemittel: [] },
    teil2: { titel: '', anweisung: '', punkte: [], redemittel: [] },
    teil3: { titel: '', anweisung: '', punkte: [], redemittel: [] }
  }
});

/** Every objectively-marked item answered correctly. */
const perfectAnswers = (exam: SingleLevelExam): AnswerMap => {
  const answers: Record<string, number | boolean> = {};
  exam.lesen.teil1.answers.forEach((value, i) => (answers[`l1.${String(i)}`] = value));
  exam.lesen.teil2.questions.forEach((q, i) => (answers[`l2.${String(i)}`] = q.answer));
  exam.lesen.teil3.answers.forEach((value, i) => (answers[`l3.${String(i)}`] = value));
  exam.sprachbausteine.teil1.gaps.forEach((gap, i) => (answers[`s1.${String(i)}`] = gap.answer));
  exam.sprachbausteine.teil2.answers.forEach((value, i) => (answers[`s2.${String(i)}`] = value));
  exam.hoeren.teil1.items.forEach((item, i) => (answers[`h1.${String(i)}`] = item.answer));
  exam.hoeren.teil2.statements.forEach((item, i) => (answers[`h2.${String(i)}`] = item.answer));
  exam.hoeren.teil3.items.forEach((item, i) => (answers[`h3.${String(i)}`] = item.answer));
  return answers;
};

/** Every objectively-marked item answered, but wrong every time. */
const wrongAnswers = (exam: SingleLevelExam): AnswerMap => {
  const answers: Record<string, number | boolean> = {};
  exam.lesen.teil1.answers.forEach((value, i) => (answers[`l1.${String(i)}`] = (value + 1) % 10));
  exam.lesen.teil2.questions.forEach((q, i) => (answers[`l2.${String(i)}`] = (q.answer + 1) % 3));
  exam.lesen.teil3.answers.forEach((value, i) => (answers[`l3.${String(i)}`] = (value + 1) % 12));
  exam.sprachbausteine.teil1.gaps.forEach((gap, i) => (answers[`s1.${String(i)}`] = (gap.answer + 1) % 3));
  exam.sprachbausteine.teil2.answers.forEach((value, i) => (answers[`s2.${String(i)}`] = (value + 1) % 15));
  exam.hoeren.teil1.items.forEach((item, i) => (answers[`h1.${String(i)}`] = !item.answer));
  exam.hoeren.teil2.statements.forEach((item, i) => (answers[`h2.${String(i)}`] = !item.answer));
  exam.hoeren.teil3.items.forEach((item, i) => (answers[`h3.${String(i)}`] = !item.answer));
  return answers;
};

describe('scoreLesen', () => {
  it('awards the full 75 points for a perfect paper', () => {
    const exam = buildExam();
    const score = scoreLesen(exam, perfectAnswers(exam));
    expect(score).toEqual({ correct: 20, of: 20, points: 75 });
  });

  it('awards zero points for a paper answered entirely wrong', () => {
    const exam = buildExam();
    const score = scoreLesen(exam, wrongAnswers(exam));
    expect(score).toEqual({ correct: 0, of: 20, points: 0 });
  });

  it('awards zero points for a paper left entirely blank', () => {
    const exam = buildExam();
    const score = scoreLesen(exam, {});
    expect(score).toEqual({ correct: 0, of: 20, points: 0 });
  });

  it('weights Teil 3 at 2.5 rather than 5, unlike Teil 1 and 2', () => {
    const exam = buildExam();
    /* Only the ten Teil 3 items correct: 10 × 2.5 = 25. */
    const answers: AnswerMap = {};
    exam.lesen.teil3.answers.forEach((value, i) => (answers[`l3.${String(i)}`] = value));
    expect(scoreLesen(exam, answers)).toEqual({ correct: 10, of: 20, points: 25 });
  });
});

describe('scoreSprachbausteine', () => {
  it('awards the full 30 points for a perfect paper (20 items × 1.5)', () => {
    const exam = buildExam();
    const score = scoreSprachbausteine(exam, perfectAnswers(exam));
    expect(score).toEqual({ correct: 20, of: 20, points: 30 });
  });

  it('awards zero points for a paper answered entirely wrong', () => {
    const exam = buildExam();
    const score = scoreSprachbausteine(exam, wrongAnswers(exam));
    expect(score).toEqual({ correct: 0, of: 20, points: 0 });
  });

  it('scores partial credit at 1.5 per correct gap', () => {
    const exam = buildExam();
    const answers: AnswerMap = {};
    exam.sprachbausteine.teil1.gaps.forEach((gap, i) => (answers[`s1.${String(i)}`] = gap.answer));
    /* Ten Teil 1 gaps correct, all of Teil 2 blank: 10 × 1.5 = 15. */
    expect(scoreSprachbausteine(exam, answers)).toEqual({ correct: 10, of: 20, points: 15 });
  });
});

describe('scoreHoeren', () => {
  it('awards the full 75 points for a perfect paper', () => {
    const exam = buildExam();
    const score = scoreHoeren(exam, perfectAnswers(exam));
    expect(score).toEqual({ correct: 20, of: 20, points: 75 });
  });

  it('awards zero points for a paper answered entirely wrong', () => {
    const exam = buildExam();
    const score = scoreHoeren(exam, wrongAnswers(exam));
    expect(score).toEqual({ correct: 0, of: 20, points: 0 });
  });

  it('weights Teil 2 at 2.5 rather than 5, unlike Teil 1 and 3', () => {
    const exam = buildExam();
    /* Only the ten Teil 2 statements correct: 10 × 2.5 = 25. */
    const answers: AnswerMap = {};
    exam.hoeren.teil2.statements.forEach((item, i) => (answers[`h2.${String(i)}`] = item.answer));
    expect(scoreHoeren(exam, answers)).toEqual({ correct: 10, of: 20, points: 25 });
  });
});

describe('countUnanswered', () => {
  it('counts every item as unanswered on a blank paper, per module', () => {
    const exam = buildExam();
    expect(countUnanswered(exam, 'lesen', {})).toBe(20);
    expect(countUnanswered(exam, 'sprachbausteine', {})).toBe(20);
    expect(countUnanswered(exam, 'hoeren', {})).toBe(20);
  });

  it('counts nothing unanswered once every item — right or wrong — has a value', () => {
    const exam = buildExam();
    const answers = wrongAnswers(exam);
    expect(countUnanswered(exam, 'lesen', answers)).toBe(0);
    expect(countUnanswered(exam, 'sprachbausteine', answers)).toBe(0);
    expect(countUnanswered(exam, 'hoeren', answers)).toBe(0);
  });

  it('does not count Schreiben or Sprechen, which are self-scored', () => {
    const exam = buildExam();
    expect(countUnanswered(exam, 'schreiben', {})).toBe(0);
    expect(countUnanswered(exam, 'sprechen', {})).toBe(0);
  });
});

describe('gradeFullExam', () => {
  const scores = (overrides: SingleLevelSectionScores): SingleLevelSectionScores => ({
    lesen: 0,
    sprachbausteine: 0,
    hoeren: 0,
    schreiben: 0,
    sprechen: 0,
    ...overrides
  });

  it('passes a perfect paper: 225 written, 75 oral, 300 total', () => {
    const grade = gradeFullExam(
      scores({ lesen: 75, sprachbausteine: 30, hoeren: 75, schreiben: 45, sprechen: 75 })
    );
    expect(grade).toEqual({ written: 225, oral: 75, total: 300, result: 'Bestanden' });
  });

  it('fails a paper answered not at all: 0 written, 0 oral, 0 total', () => {
    const grade = gradeFullExam(scores({}));
    expect(grade).toEqual({ written: 0, oral: 0, total: 0, result: 'Nicht bestanden' });
  });

  it(`passes right at the boundary: written ${String(SINGLE_LEVEL_WRITTEN_PASS)}, oral ${String(SINGLE_LEVEL_ORAL_PASS)}`, () => {
    const grade = gradeFullExam(
      scores({ lesen: 60, sprachbausteine: 30, hoeren: 45, schreiben: 0, sprechen: 45 })
    );
    expect(grade.written).toBe(135);
    expect(grade.oral).toBe(45);
    expect(grade.result).toBe('Bestanden');
  });

  it('fails one point under the written boundary even with a passing oral score', () => {
    const grade = gradeFullExam(
      scores({ lesen: 59, sprachbausteine: 30, hoeren: 45, schreiben: 0, sprechen: 45 })
    );
    expect(grade.written).toBe(134);
    expect(grade.oral).toBe(45);
    expect(grade.result).toBe('Nicht bestanden');
  });

  it('fails a maxed-out written score when the oral score is one point short — no compensation', () => {
    const grade = gradeFullExam(
      scores({ lesen: 75, sprachbausteine: 30, hoeren: 75, schreiben: 45, sprechen: 44 })
    );
    expect(grade.written).toBe(225);
    expect(grade.oral).toBe(44);
    expect(grade.result).toBe('Nicht bestanden');
  });

  it('fails a maxed-out oral score when the written score is short — no compensation either way', () => {
    const grade = gradeFullExam(
      scores({ lesen: 0, sprachbausteine: 0, hoeren: 0, schreiben: 0, sprechen: 75 })
    );
    expect(grade.written).toBe(0);
    expect(grade.oral).toBe(75);
    expect(grade.result).toBe('Nicht bestanden');
  });

  it('treats a missing section as zero rather than throwing', () => {
    const grade = gradeFullExam({ lesen: 75, hoeren: 75 });
    expect(grade.written).toBe(150);
    expect(grade.oral).toBe(0);
    expect(grade.result).toBe('Nicht bestanden');
  });
});
