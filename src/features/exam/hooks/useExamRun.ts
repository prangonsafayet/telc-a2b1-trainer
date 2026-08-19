import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { type SpeakingPart } from '@shared/components';
import { EXAM_MODULES, MODULE_META, moduleMinutes } from '@shared/config/exam.ts';
import { stopSpeech } from '@shared/lib/speech.ts';
import {
  type AnswerValue,
  type Attempt,
  type AttemptMode,
  type Exam,
  type ExamModule,
  type SkillScores,
  type SprachbausteineScore
} from '@shared/types';

import { useProgress } from '@features/progress';

import {
  clearRun,
  createRun,
  currentModule,
  loadRun,
  saveRun,
  secondsLeft,
  type ExamRun
} from '../lib/runState.ts';
import {
  countUnanswered,
  gradeFullExam,
  scoreHoeren,
  scoreLesen,
  scoreSprachbausteine
} from '../lib/scoring.ts';


export type { SpeakingPart };

/** Blob URLs for the speaking module. Session-only — never persisted. */
export type RecordingMap = Partial<Record<SpeakingPart, string>>;

export interface ExamRunController {
  readonly run: ExamRun;
  readonly module: ExamModule;
  readonly minutes: number;
  readonly secondsRemaining: number;
  readonly recordings: RecordingMap;
  readonly setAnswer: (key: string, value: AnswerValue) => void;
  readonly consumePlay: (key: string) => void;
  readonly setRecording: (part: SpeakingPart, url: string) => void;
  readonly beginModule: () => void;
  /** Resolves false when the user declines the "items unanswered" prompt. */
  readonly requestSubmit: () => number;
  readonly submit: () => void;
  readonly confirmRating: (score: number) => void;
  readonly abort: () => void;
}

interface ExamRunOptions {
  readonly exam: Exam;
  readonly mode: AttemptMode;
}

const queueForMode = (mode: AttemptMode): readonly ExamModule[] => (mode === 'full' ? EXAM_MODULES : [mode]);

/**
 * Owns the whole attempt: which module is open, the answers, the clock, and turning a
 * finished run into a stored attempt. Every transition writes through to localStorage, so
 * a reload resumes exactly where the user was.
 */
export const useExamRun = ({ exam, mode }: ExamRunOptions): ExamRunController => {
  const navigate = useNavigate();
  const { db, update } = useProgress();

  const [run, setRun] = useState<ExamRun>(() => {
    const saved = loadRun();
    if (saved !== null && saved.examId === exam.id && saved.mode === mode) return saved;
    const fresh = createRun(exam.id, mode, queueForMode(mode));
    saveRun(fresh);
    return fresh;
  });
  const [recordings, setRecordings] = useState<RecordingMap>({});
  const [, forceTick] = useState(0);
  const finishedRef = useRef(false);

  /* The queue is never empty, so there is always a current module; fall back to the
     first entry rather than asserting non-null. */
  const module = currentModule(run) ?? queueForMode(mode)[0] ?? 'lesen';
  const minutes = moduleMinutes(module, db.settings);

  const patch = useCallback((recipe: (current: ExamRun) => ExamRun) => {
    setRun(current => {
      const next = recipe(current);
      saveRun(next);
      return next;
    });
  }, []);

  const setAnswer = useCallback(
    (key: string, value: AnswerValue) => {
      patch(current => ({ ...current, answers: { ...current.answers, [key]: value } }));
    },
    [patch]
  );

  const consumePlay = useCallback(
    (key: string) => {
      patch(current => ({
        ...current,
        plays: { ...current.plays, [key]: (current.plays[key] ?? db.settings.playsAllowed) - 1 }
      }));
    },
    [patch, db.settings.playsAllowed]
  );

  const setRecording = useCallback((part: SpeakingPart, url: string) => {
    setRecordings(current => ({ ...current, [part]: url }));
  }, []);

  /** Turns a finished run into a stored attempt and navigates to its results. */
  const finish = useCallback(
    (finalRun: ExamRun) => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      const includes = (candidate: ExamModule): boolean => finalRun.queue.includes(candidate);
      const scores: SkillScores = {};
      let sb: SprachbausteineScore | null = null;

      if (includes('lesen')) scores.lesen = scoreLesen(exam, finalRun.answers).points;
      if (includes('hoeren')) scores.hoeren = scoreHoeren(exam, finalRun.answers).points;
      if (includes('sprachbausteine')) sb = scoreSprachbausteine(exam, finalRun.answers);
      if (includes('schreiben')) scores.schreiben = finalRun.ratings.schreiben ?? 0;
      if (includes('sprechen')) scores.sprechen = finalRun.ratings.sprechen ?? 0;

      const grade = finalRun.mode === 'full' ? gradeFullExam(scores) : null;
      const attempt: Attempt = {
        id: Date.now(),
        examId: exam.id,
        mode: finalRun.mode,
        date: new Date().toISOString(),
        times: finalRun.times,
        scores,
        sb,
        answers: finalRun.answers,
        ratings: finalRun.ratings,
        ...(grade ? { total: grade.total, result: grade.result } : {})
      };

      update(current => ({ ...current, attempts: [...current.attempts, attempt] }));
      clearRun();
      stopSpeech();

      if (grade) {
        const passed = grade.result !== 'Nicht bestanden';
        toast[passed ? 'success' : 'info'](`${exam.title} finished — ${grade.result}`, {
          description: `${String(grade.total)}/240 points. Review every red item before your next test.`
        });
      } else {
        toast.success(`${MODULE_META[finalRun.mode as ExamModule].short} practice saved`, {
          description: 'Open the review to see the correct answers and transcripts.'
        });
      }

      void navigate(`/results/${String(attempt.id)}`, { replace: true });
    },
    [exam, update, navigate]
  );

  /** Records the time spent, then moves to the next module, the rating screen, or the end. */
  const submit = useCallback(() => {
    setRun(current => {
      const finishedModule = currentModule(current);
      if (!finishedModule || current.phase !== 'module') return current;

      stopSpeech();
      const times = {
        ...current.times,
        [finishedModule]: Math.round((Date.now() - (current.moduleStart ?? Date.now())) / 1000)
      };

      if (finishedModule === 'schreiben' || finishedModule === 'sprechen') {
        const next: ExamRun = { ...current, times, phase: 'rating', deadline: null };
        saveRun(next);
        return next;
      }

      const nextIndex = current.index + 1;
      const upcoming = current.queue[nextIndex];
      if (!upcoming) {
        const done: ExamRun = { ...current, times };
        finish(done);
        return done;
      }

      const next: ExamRun = {
        ...current,
        times,
        index: nextIndex,
        phase: 'brief',
        deadline: null,
        moduleStart: null
      };
      saveRun(next);
      toast.success(`${MODULE_META[finishedModule].short} submitted`, {
        description: `Next up: ${MODULE_META[upcoming].name}.`
      });
      return next;
    });
  }, [finish]);

  /** Number of blanks, so the page can confirm before submitting an incomplete module. */
  const requestSubmit = useCallback(
    () => countUnanswered(exam, module, run.answers),
    [exam, module, run.answers]
  );

  const confirmRating = useCallback(
    (score: number) => {
      setRun(current => {
        const rated = currentModule(current);
        if (rated !== 'schreiben' && rated !== 'sprechen') return current;

        const withRating: ExamRun = { ...current, ratings: { ...current.ratings, [rated]: score } };
        const nextIndex = current.index + 1;
        const upcoming = current.queue[nextIndex];

        if (!upcoming) {
          finish(withRating);
          return withRating;
        }
        const next: ExamRun = {
          ...withRating,
          index: nextIndex,
          phase: 'brief',
          deadline: null,
          moduleStart: null
        };
        saveRun(next);
        return next;
      });
    },
    [finish]
  );

  const beginModule = useCallback(() => {
    patch(current => ({
      ...current,
      phase: 'module',
      moduleStart: Date.now(),
      deadline: Date.now() + minutes * 60_000
    }));
    window.scrollTo(0, 0);
  }, [patch, minutes]);

  const abort = useCallback(() => {
    clearRun();
    stopSpeech();
    toast.info('Attempt aborted', { description: 'Nothing was saved. Start again whenever you are ready.' });
    void navigate('/');
  }, [navigate]);

  /*
   * One-second heartbeat while a timed module is open. It must not depend on `run`
   * itself: that object changes on every keystroke, which would restart the interval
   * before it ever fired and stall the clock. Live values are read through refs.
   */
  const runRef = useRef(run);
  const submitRef = useRef(submit);
  useEffect(() => {
    runRef.current = run;
    submitRef.current = submit;
  }, [run, submit]);

  useEffect(() => {
    if (run.phase !== 'module') return undefined;
    const interval = setInterval(() => {
      forceTick(tick => tick + 1);
      const live = runRef.current;
      /* Sprechen has no hard stop — the clock is only a guideline there. */
      if (secondsLeft(live) <= 0 && currentModule(live) !== 'sprechen') {
        clearInterval(interval);
        toast.warning('⏱ Time is up — the module was submitted automatically.');
        submitRef.current();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [run.phase, run.index]);

  const secondsRemaining = run.phase === 'module' ? secondsLeft(run) : 0;

  return useMemo(
    () => ({
      run,
      module,
      minutes,
      secondsRemaining,
      recordings,
      setAnswer,
      consumePlay,
      setRecording,
      beginModule,
      requestSubmit,
      submit,
      confirmRating,
      abort
    }),
    [
      run,
      module,
      minutes,
      secondsRemaining,
      recordings,
      setAnswer,
      consumePlay,
      setRecording,
      beginModule,
      requestSubmit,
      submit,
      confirmRating,
      abort
    ]
  );
};
