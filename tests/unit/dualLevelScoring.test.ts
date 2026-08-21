import { describe, expect, it } from 'vitest';

import { A2B1_EXAMS } from '@content/trainers/a2b1/exams/index.ts';
import { A2_TOTAL, B1_TOTAL } from '@shared/config/exam.ts';
import { type AnswerMap, type SkillScores } from '@shared/types';

import {
  gradeFullExam,
  scoreHoeren,
  scoreLesen,
  scoreSprachbausteine
} from '@features/exam/lib/formats/dual-level/scoring.ts';

/*
 * `scoring.ts` marks all fifteen authored A2·B1 papers. The sibling single-level suite
 * covers the twenty B1/B2 papers; this paper's verdict had no test at all, which is how it
 * came to certify B1 for a sitting telc would fail.
 *
 * The official scheme (telc Deutsch A2·B1 Übungstest 1, "Punkte und Gewichtung" p. 42 and
 * "Ermittlung des Gesamtergebnisses" p. 44) — not re-derived here:
 *   240 points, 60 per skill: Lesen, Hören, Schreiben, Sprechen (25% each).
 *   Lesen and Hören award 3 points per correct item; Sprachbausteine is 17 items and
 *   contributes to the grammar signal, not to the 240.
 *   B1 = total >= 168 AND >= 42/60 in three subtests AND >= 24/60 in every subtest.
 *   A2 = >= 24/60 in three subtests AND >= 6/60 in the fourth.
 * All three B1 conditions are conjunctive; none is implied by the others.
 */

const skills = (lesen: number, hoeren: number, schreiben: number, sprechen: number): SkillScores => ({
  lesen,
  hoeren,
  schreiben,
  sprechen
});

describe('gradeFullExam — the A2·B1 verdict', () => {
  it('certifies B1 for a perfect paper', () => {
    expect(gradeFullExam(skills(60, 60, 60, 60))).toEqual({ total: 240, result: 'B1' });
  });

  it('fails a paper answered not at all', () => {
    expect(gradeFullExam(skills(0, 0, 0, 0))).toEqual({ total: 0, result: 'Nicht bestanden' });
  });

  it(`refuses B1 below ${String(B1_TOTAL)} even when every per-subtest minimum is met`, () => {
    /* The cheapest sitting satisfying the two per-subtest conditions: 42+42+42+24 = 150. */
    expect(gradeFullExam(skills(42, 42, 42, 24))).toEqual({ total: 150, result: 'A2' });
  });

  it(`refuses B1 one point below the line, at ${String(B1_TOTAL - 1)}`, () => {
    expect(gradeFullExam(skills(47, 48, 48, 24))).toEqual({ total: 167, result: 'A2' });
  });

  it(`certifies B1 exactly on the line, at ${String(B1_TOTAL)}`, () => {
    expect(gradeFullExam(skills(42, 42, 42, 42))).toEqual({ total: 168, result: 'B1' });
  });

  it('refuses B1 when the total is high but one subtest is under 24', () => {
    /* 210 points, comfortably past the total, but Sprechen at 30% fails the 40% floor. */
    expect(gradeFullExam(skills(60, 60, 60, 18))).toEqual({ total: 198, result: 'A2' });
  });

  it('refuses B1 when only two subtests reach 42, however high the total', () => {
    expect(gradeFullExam(skills(60, 60, 40, 40))).toEqual({ total: 200, result: 'A2' });
  });

  it('accepts exactly three subtests at 42 with the fourth at 24, given the total', () => {
    expect(gradeFullExam(skills(42, 42, 60, 24))).toEqual({ total: 168, result: 'B1' });
  });

  it('falls back to A2 on three subtests at 24 and a fourth at 6', () => {
    expect(gradeFullExam(skills(24, 24, 24, 6))).toEqual({ total: 78, result: 'A2' });
  });

  it('fails when the fourth subtest is below 6', () => {
    expect(gradeFullExam(skills(24, 24, 24, 5))).toEqual({ total: 77, result: 'Nicht bestanden' });
  });

  it('fails when only two subtests reach 24', () => {
    expect(gradeFullExam(skills(60, 60, 23, 23))).toEqual({ total: 166, result: 'Nicht bestanden' });
  });

  it('treats a missing skill as zero rather than throwing', () => {
    expect(gradeFullExam({ lesen: 60, hoeren: 60 })).toEqual({ total: 120, result: 'Nicht bestanden' });
  });

  it(`keeps A2_TOTAL (${String(A2_TOTAL)}) out of the verdict — no official A2 total is sourced`, () => {
    /* 78 < 96, and still A2: the gridline value must not become a gate by accident. */
    const below = gradeFullExam(skills(24, 24, 24, 6));
    expect(below.total).toBeLessThan(A2_TOTAL);
    expect(below.result).toBe('A2');
  });
});

describe('the module scorers, against the real fifteen papers', () => {
  const answerAll = (exam: (typeof A2B1_EXAMS)[number]): AnswerMap => {
    const answers: AnswerMap = {};
    exam.lesen.teil1.answers.forEach((a, i) => (answers[`l1.${String(i)}`] = a));
    exam.lesen.teil2.questions.forEach((q, i) => (answers[`l2.${String(i)}`] = q.answer));
    exam.lesen.teil3.answers.forEach((a, i) => (answers[`l3.${String(i)}`] = a));
    exam.lesen.teil4.statements.forEach((st, i) => (answers[`l4.${String(i)}`] = st.answer));
    exam.hoeren.teil1.items.forEach((it, i) => (answers[`h1.${String(i)}`] = it.answer));
    exam.hoeren.teil2.items.forEach((it, i) => (answers[`h2.${String(i)}`] = it.answer));
    exam.hoeren.teil3.items.forEach((it, i) => (answers[`h3.${String(i)}`] = it.answer));
    exam.hoeren.teil4.questions.forEach((q, i) => (answers[`h4.${String(i)}`] = q.answer));
    exam.hoeren.teil5.gaps.forEach((g, i) => (answers[`h5.${String(i)}`] = g.answer));
    exam.sprachbausteine.teil1.gaps.forEach((g, i) => (answers[`s1.${String(i)}`] = g.answer));
    exam.sprachbausteine.teil2.answers.forEach((a, i) => (answers[`s2.${String(i)}`] = a));
    exam.sprachbausteine.teil3.items.forEach((it, i) => (answers[`s3.${String(i)}`] = it.answer));
    return answers;
  };

  it('has fifteen papers to mark', () => {
    expect(A2B1_EXAMS).toHaveLength(15);
  });

  it.each(A2B1_EXAMS.map((exam, i) => [i + 1, exam] as const))(
    'paper %i: a fully correct sitting scores 60 Lesen, 60 Hören and 17/17 Sprachbausteine',
    (_n, exam) => {
      const answers = answerAll(exam);
      expect(scoreLesen(exam, answers).points).toBe(60);
      expect(scoreHoeren(exam, answers).points).toBe(60);
      const sb = scoreSprachbausteine(exam, answers);
      expect(sb).toEqual({ correct: 17, of: 17, percent: 100 });
    }
  );

  it.each(A2B1_EXAMS.map((exam, i) => [i + 1, exam] as const))(
    'paper %i: a blank sitting scores zero in every module',
    (_n, exam) => {
      expect(scoreLesen(exam, {}).points).toBe(0);
      expect(scoreHoeren(exam, {}).points).toBe(0);
      expect(scoreSprachbausteine(exam, {})).toEqual({ correct: 0, of: 17, percent: 0 });
    }
  );

  it('awards 3 points per correct item, so one right answer is worth 3', () => {
    const exam = A2B1_EXAMS[0];
    if (!exam) throw new Error('no first paper');
    const first = exam.lesen.teil1.answers[0];
    if (first === undefined) throw new Error('no first Lesen item');
    expect(scoreLesen(exam, { 'l1.0': first }).points).toBe(3);
  });
});
