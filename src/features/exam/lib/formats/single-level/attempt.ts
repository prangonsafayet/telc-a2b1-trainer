import {
  SINGLE_LEVEL_MODULE_META,
  SINGLE_LEVEL_ORAL_MAX,
  SINGLE_LEVEL_WRITTEN_MAX
} from '@shared/config/singleLevelExam.ts';
import { numberAnswer, WRITING_TASK_KEY } from '@shared/lib/answers.ts';
import {
  type AnswerMap,
  type ExamModule,
  type SingleLevelAttempt,
  type SingleLevelExam,
  type SingleLevelSectionScores
} from '@shared/types';

import {
  type CompletionToast,
  type FinishedRun,
  type WritingSample
} from '@features/exam/types/examFormat.ts';

import { gradeFullExam, scoreHoeren, scoreLesen, scoreSprachbausteine } from './scoring.ts';

/** Marks a finished run and returns the attempt to store on the trainer document. */
export const buildAttempt = ({
  exam,
  mode,
  queue,
  answers,
  ratings,
  times
}: FinishedRun<SingleLevelExam>): SingleLevelAttempt => {
  const includes = (candidate: ExamModule): boolean => queue.includes(candidate);
  const scores: SingleLevelSectionScores = {};

  if (includes('lesen')) scores.lesen = scoreLesen(exam, answers).points;
  if (includes('sprachbausteine')) scores.sprachbausteine = scoreSprachbausteine(exam, answers).points;
  if (includes('hoeren')) scores.hoeren = scoreHoeren(exam, answers).points;
  if (includes('schreiben')) scores.schreiben = ratings.schreiben ?? 0;
  if (includes('sprechen')) scores.sprechen = ratings.sprechen ?? 0;

  const grade = mode === 'full' ? gradeFullExam(scores) : null;
  const writingTask = numberAnswer(answers, WRITING_TASK_KEY);

  return {
    id: Date.now(),
    examId: exam.id,
    mode,
    date: new Date().toISOString(),
    times,
    scores,
    answers,
    ratings,
    ...(writingTask !== undefined ? { writingTask } : {}),
    ...(grade ? { written: grade.written, oral: grade.oral, total: grade.total, result: grade.result } : {})
  };
};

export const completionToast = (exam: SingleLevelExam, attempt: SingleLevelAttempt): CompletionToast => {
  if (attempt.result != null && attempt.written != null && attempt.oral != null) {
    const passed = attempt.result === 'Bestanden';
    return {
      tone: passed ? 'success' : 'info',
      title: `${exam.title} finished — ${attempt.result}`,
      description: `${String(attempt.written)}/${String(SINGLE_LEVEL_WRITTEN_MAX)} written · ${String(attempt.oral)}/${String(SINGLE_LEVEL_ORAL_MAX)} oral. Review every red item before your next test.`
    };
  }
  const module: ExamModule | null = attempt.mode === 'full' ? null : attempt.mode;
  return {
    tone: 'success',
    title: `${module ? SINGLE_LEVEL_MODULE_META[module].short : exam.title} practice saved`,
    description: 'Open the review to see the correct answers and transcripts.'
  };
};

/** The Musterlösung of the writing task, or of whichever one was chosen if a paper ever offers more than one. */
export const writingSample = (exam: SingleLevelExam, answers: AnswerMap): WritingSample | null => {
  const chosen = numberAnswer(answers, WRITING_TASK_KEY) ?? 0;
  const task = exam.schreiben.tasks[chosen] ?? exam.schreiben.tasks[0];
  if (!task) return null;
  return {
    musterloesung: task.musterloesung,
    tipps: exam.schreiben.tipps,
    points: task.leitpunkte
  };
};
