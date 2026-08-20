import { TELC_MODULE_META, TELC_ORAL_MAX, TELC_WRITTEN_MAX } from '@shared/config/telcExam.ts';
import { numberAnswer, WRITING_TASK_KEY } from '@shared/lib/answers.ts';
import {
  type AnswerMap,
  type ExamModule,
  type TelcAttempt,
  type TelcExam,
  type TelcSectionScores
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
}: FinishedRun<TelcExam>): TelcAttempt => {
  const includes = (candidate: ExamModule): boolean => queue.includes(candidate);
  const scores: TelcSectionScores = {};

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

export const completionToast = (exam: TelcExam, attempt: TelcAttempt): CompletionToast => {
  if (attempt.result != null && attempt.written != null && attempt.oral != null) {
    const passed = attempt.result === 'Bestanden';
    return {
      tone: passed ? 'success' : 'info',
      title: `${exam.title} finished — ${attempt.result}`,
      description: `${String(attempt.written)}/${String(TELC_WRITTEN_MAX)} written · ${String(attempt.oral)}/${String(TELC_ORAL_MAX)} oral. Review every red item before your next test.`
    };
  }
  const module: ExamModule | null = attempt.mode === 'full' ? null : attempt.mode;
  return {
    tone: 'success',
    title: `${module ? TELC_MODULE_META[module].short : exam.title} practice saved`,
    description: 'Open the review to see the correct answers and transcripts.'
  };
};

/** The Musterlösung of whichever writing task was chosen — B2 offers two. */
export const writingSample = (exam: TelcExam, answers: AnswerMap): WritingSample | null => {
  const chosen = numberAnswer(answers, WRITING_TASK_KEY) ?? 0;
  const task = exam.schreiben.tasks[chosen] ?? exam.schreiben.tasks[0];
  if (!task) return null;
  return {
    musterloesung: task.musterloesung,
    tipps: exam.schreiben.tipps,
    points: task.leitpunkte
  };
};
