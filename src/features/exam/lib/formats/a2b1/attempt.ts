import { FULL_EXAM_MAX, MODULE_META } from '@shared/config/exam.ts';
import {
  type Attempt,
  type Exam,
  type ExamModule,
  type SkillScores,
  type SprachbausteineScore
} from '@shared/types';

import {
  type CompletionToast,
  type FinishedRun,
  type WritingSample
} from '@features/exam/types/examFormat.ts';

import { gradeFullExam, scoreHoeren, scoreLesen, scoreSprachbausteine } from './scoring.ts';

/** Marks a finished run and returns the attempt to store. */
export const buildAttempt = ({ exam, mode, queue, answers, ratings, times }: FinishedRun<Exam>): Attempt => {
  const includes = (candidate: ExamModule): boolean => queue.includes(candidate);
  const scores: SkillScores = {};
  let sb: SprachbausteineScore | null = null;

  if (includes('lesen')) scores.lesen = scoreLesen(exam, answers).points;
  if (includes('hoeren')) scores.hoeren = scoreHoeren(exam, answers).points;
  if (includes('sprachbausteine')) sb = scoreSprachbausteine(exam, answers);
  if (includes('schreiben')) scores.schreiben = ratings.schreiben ?? 0;
  if (includes('sprechen')) scores.sprechen = ratings.sprechen ?? 0;

  const grade = mode === 'full' ? gradeFullExam(scores) : null;

  return {
    id: Date.now(),
    examId: exam.id,
    mode,
    date: new Date().toISOString(),
    times,
    scores,
    sb,
    answers,
    ratings,
    ...(grade ? { total: grade.total, result: grade.result } : {})
  };
};

export const completionToast = (exam: Exam, attempt: Attempt): CompletionToast => {
  if (attempt.result != null && attempt.total != null) {
    const passed = attempt.result !== 'Nicht bestanden';
    return {
      tone: passed ? 'success' : 'info',
      title: `${exam.title} finished — ${attempt.result}`,
      description: `${String(attempt.total)}/${String(FULL_EXAM_MAX)} points. Review every red item before your next test.`
    };
  }
  const module: ExamModule | null = attempt.mode === 'full' ? null : attempt.mode;
  return {
    tone: 'success',
    title: `${module ? MODULE_META[module].short : exam.title} practice saved`,
    description: 'Open the review to see the correct answers and transcripts.'
  };
};

/** The Musterlösung for the one writing task an A2·B1 paper has. */
export const writingSample = (exam: Exam): WritingSample => ({
  musterloesung: exam.schreiben.musterloesung,
  tipps: `${exam.schreiben.tipps} — Check: did you cover all three points?`,
  points: exam.schreiben.points
});
