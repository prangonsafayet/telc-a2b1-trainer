import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { type SpeakingPart } from '@shared/components';
import { TELC_MODULE_META, TELC_MODULES, telcModuleMinutes } from '@shared/config/telcExam.ts';
import { TRAINERS } from '@shared/config/trainers.ts';
import { numberAnswer, WRITING_TASK_KEY } from '@shared/lib/answers.ts';
import { toIsoDate } from '@shared/lib/format.ts';
import { stopSpeech } from '@shared/lib/speech.ts';
import {
  type AnswerValue,
  type AttemptMode,
  type ExamModule,
  type TelcAttempt,
  type TelcExam,
  type TelcLevel,
  type TelcSectionScores
} from '@shared/types';

import { touchActivity, useTrainerDoc } from '@features/progress';

import {
  createTelcRun,
  currentTelcModule,
  telcSecondsLeft,
  useTelcRunStore,
  type TelcRun
} from '../lib/runStore.ts';
import {
  countTelcUnanswered,
  gradeTelcExam,
  scoreTelcHoeren,
  scoreTelcLesen,
  scoreTelcSprachbausteine
} from '../lib/scoring.ts';

/** Blob URLs for the speaking module. Session-only — never persisted. */
export type TelcRecordingMap = Partial<Record<SpeakingPart, string>>;

export interface TelcRunController {
  /** Null for one render while a mismatched or missing run is being replaced. */
  readonly run: TelcRun | null;
  readonly module: ExamModule;
  readonly minutes: number;
  readonly secondsRemaining: number;
  readonly totalSeconds: number;
  readonly recordings: TelcRecordingMap;
  readonly setAnswer: (key: string, value: AnswerValue) => void;
  readonly consumePlay: (key: string) => void;
  readonly setRecording: (part: SpeakingPart, url: string) => void;
  readonly beginModule: () => void;
  /** How many items are still blank — the page confirms before submitting past them. */
  readonly requestSubmit: () => number;
  readonly submit: () => void;
  readonly confirmRating: (score: number) => void;
  readonly abort: () => void;
}

interface TelcRunOptions {
  readonly level: TelcLevel;
  readonly exam: TelcExam;
  readonly mode: AttemptMode;
}

const queueForMode = (mode: AttemptMode): readonly ExamModule[] => (mode === 'full' ? TELC_MODULES : [mode]);

/**
 * Owns one B1/B2 attempt: which module is open, the answers, the clock, and turning a
 * finished run into a stored attempt on the trainer document. State lives in the zustand
 * run store, which writes through to localStorage.
 */
export const useTelcRun = ({ level, exam, mode }: TelcRunOptions): TelcRunController => {
  const navigate = useNavigate();
  const { doc, updateDoc } = useTrainerDoc(level);
  const storedRun = useTelcRunStore(state => state.run);
  const startRun = useTelcRunStore(state => state.startRun);
  const clearRun = useTelcRunStore(state => state.clearRun);
  const patchRun = useTelcRunStore(state => state.patchRun);

  const [recordings, setRecordings] = useState<TelcRecordingMap>({});
  const [, forceTick] = useState(0);
  const finishedRef = useRef(false);

  const run =
    storedRun?.level === level && storedRun.examId === exam.id && storedRun.mode === mode ? storedRun : null;

  /* A stale or missing run is replaced by a fresh one; the page shows its fallback for
     that single render rather than an attempt against the wrong paper. */
  useEffect(() => {
    if (!run) startRun(createTelcRun(level, exam.id, mode, queueForMode(mode)));
  }, [run, startRun, level, exam.id, mode]);

  const module = run ? (currentTelcModule(run) ?? 'lesen') : 'lesen';
  const minutes = telcModuleMinutes(module, level, doc.settings);

  const setAnswer = useCallback(
    (key: string, value: AnswerValue) => {
      patchRun(current => ({ ...current, answers: { ...current.answers, [key]: value } }));
    },
    [patchRun]
  );

  const playsAllowed = doc.settings.playsAllowed;
  const consumePlay = useCallback(
    (key: string) => {
      patchRun(current => ({
        ...current,
        plays: { ...current.plays, [key]: (current.plays[key] ?? playsAllowed) - 1 }
      }));
    },
    [patchRun, playsAllowed]
  );

  const setRecording = useCallback((part: SpeakingPart, url: string) => {
    setRecordings(current => ({ ...current, [part]: url }));
  }, []);

  /** Turns a finished run into a stored attempt and navigates to its results. */
  const finish = useCallback(
    (finalRun: TelcRun) => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      const includes = (candidate: ExamModule): boolean => finalRun.queue.includes(candidate);
      const scores: TelcSectionScores = {};
      if (includes('lesen')) scores.lesen = scoreTelcLesen(exam, finalRun.answers).points;
      if (includes('sprachbausteine'))
        scores.sprachbausteine = scoreTelcSprachbausteine(exam, finalRun.answers).points;
      if (includes('hoeren')) scores.hoeren = scoreTelcHoeren(exam, finalRun.answers).points;
      if (includes('schreiben')) scores.schreiben = finalRun.ratings.schreiben ?? 0;
      if (includes('sprechen')) scores.sprechen = finalRun.ratings.sprechen ?? 0;

      const grade = finalRun.mode === 'full' ? gradeTelcExam(scores) : null;
      const writingTask = numberAnswer(finalRun.answers, WRITING_TASK_KEY);
      const attempt: TelcAttempt = {
        id: Date.now(),
        examId: exam.id,
        mode: finalRun.mode,
        date: new Date().toISOString(),
        times: finalRun.times,
        scores,
        answers: finalRun.answers,
        ratings: finalRun.ratings,
        ...(writingTask !== undefined ? { writingTask } : {}),
        ...(grade
          ? { written: grade.written, oral: grade.oral, total: grade.total, result: grade.result }
          : {})
      };

      updateDoc(current =>
        touchActivity({ ...current, attempts: [...current.attempts, attempt] }, toIsoDate(new Date()))
      );
      clearRun();
      stopSpeech();

      if (grade) {
        const passed = grade.result === 'Bestanden';
        toast[passed ? 'success' : 'info'](`${exam.title} finished — ${grade.result}`, {
          description: `${String(grade.written)}/225 written · ${String(grade.oral)}/75 oral. Review every red item before your next test.`
        });
      } else {
        toast.success(`${TELC_MODULE_META[finalRun.mode as ExamModule].short} practice saved`, {
          description: 'Open the review to see the correct answers and transcripts.'
        });
      }

      void navigate(`${TRAINERS[level].basePath}/results/${String(attempt.id)}`, { replace: true });
    },
    [exam, updateDoc, clearRun, navigate, level]
  );

  /** Records the time spent, then moves to the next module, the rating screen, or the end. */
  const submit = useCallback(() => {
    const current = useTelcRunStore.getState().run;
    if (current?.phase !== 'module') return;
    const finishedModule = currentTelcModule(current);
    if (!finishedModule) return;

    stopSpeech();
    const times = {
      ...current.times,
      [finishedModule]: Math.round((Date.now() - (current.moduleStart ?? Date.now())) / 1000)
    };

    if (finishedModule === 'schreiben' || finishedModule === 'sprechen') {
      patchRun(existing => ({ ...existing, times, phase: 'rating', deadline: null }));
      return;
    }

    const nextIndex = current.index + 1;
    const upcoming = current.queue[nextIndex];
    if (!upcoming) {
      finish({ ...current, times });
      return;
    }

    patchRun(existing => ({
      ...existing,
      times,
      index: nextIndex,
      phase: 'brief',
      deadline: null,
      moduleStart: null
    }));
    toast.success(`${TELC_MODULE_META[finishedModule].short} submitted`, {
      description: `Next up: ${TELC_MODULE_META[upcoming].name}.`
    });
  }, [patchRun, finish]);

  const requestSubmit = useCallback(
    () => (run ? countTelcUnanswered(exam, module, run.answers) : 0),
    [exam, module, run]
  );

  const confirmRating = useCallback(
    (score: number) => {
      const current = useTelcRunStore.getState().run;
      if (!current) return;
      const rated = currentTelcModule(current);
      if (rated !== 'schreiben' && rated !== 'sprechen') return;

      const withRating: TelcRun = { ...current, ratings: { ...current.ratings, [rated]: score } };
      const nextIndex = current.index + 1;
      const upcoming = current.queue[nextIndex];

      if (!upcoming) {
        finish(withRating);
        return;
      }
      patchRun(() => ({
        ...withRating,
        index: nextIndex,
        phase: 'brief',
        deadline: null,
        moduleStart: null
      }));
    },
    [patchRun, finish]
  );

  const beginModule = useCallback(() => {
    patchRun(current => ({
      ...current,
      phase: 'module',
      moduleStart: Date.now(),
      deadline: Date.now() + minutes * 60_000
    }));
    window.scrollTo(0, 0);
  }, [patchRun, minutes]);

  const abort = useCallback(() => {
    clearRun();
    stopSpeech();
    toast.info('Attempt aborted', {
      description: 'Nothing was saved. Start again whenever you are ready.'
    });
    void navigate(TRAINERS[level].basePath || '/');
  }, [clearRun, navigate, level]);

  /*
   * One-second heartbeat while a timed module is open. It must not depend on the run
   * object, which changes on every keystroke — live values are read from the store.
   */
  const submitRef = useRef(submit);
  useEffect(() => {
    submitRef.current = submit;
  }, [submit]);

  const phase = run?.phase;
  const index = run?.index;
  useEffect(() => {
    if (phase !== 'module') return undefined;
    const interval = setInterval(() => {
      forceTick(tick => tick + 1);
      const live = useTelcRunStore.getState().run;
      /* Sprechen has no hard stop — the clock is only a guideline there. */
      if (live && telcSecondsLeft(live) <= 0 && currentTelcModule(live) !== 'sprechen') {
        clearInterval(interval);
        toast.warning('⏱ Time is up — the module was submitted automatically.');
        submitRef.current();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [phase, index]);

  const secondsRemaining = run?.phase === 'module' ? telcSecondsLeft(run) : 0;

  return useMemo(
    () => ({
      run,
      module,
      minutes,
      secondsRemaining,
      totalSeconds: minutes * 60,
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
