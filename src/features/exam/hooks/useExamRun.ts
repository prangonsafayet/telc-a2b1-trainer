import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { TRAINERS } from '@shared/config/trainers.ts';
import { stopSpeech } from '@shared/lib/speech.ts';
import {
  type AnswerValue,
  type AttemptMode,
  type ExamModule,
  type RecordingMap,
  type SpeakingPart
} from '@shared/types';

import { HEARTBEAT_MS, SECONDS_PER_MINUTE, UNTIMED_MODULES } from '@features/exam/config/run.ts';
import { createRun, currentModule, queueForMode, secondsLeft } from '@features/exam/lib/runStore.ts';
import {
  type ExamFormat,
  type ExamPaper,
  type RunSettings,
  type StoredAttempt
} from '@features/exam/types/examFormat.ts';
import { type ExamRun, type RatedModule } from '@features/exam/types/run.ts';

export interface ExamRunController {
  readonly run: ExamRun;
  readonly module: ExamModule;
  readonly minutes: number;
  readonly secondsRemaining: number;
  readonly totalSeconds: number;
  readonly recordings: RecordingMap;
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

interface ExamRunOptions<
  TExam extends ExamPaper,
  TSettings extends RunSettings,
  TAttempt extends StoredAttempt
> {
  readonly format: ExamFormat<TExam, TSettings, TAttempt>;
  readonly exam: TExam;
  readonly mode: AttemptMode;
  readonly settings: TSettings;
  /** Appends the finished attempt to whichever document this trainer stores. */
  readonly saveAttempt: (attempt: TAttempt) => void;
}

const isRated = (module: ExamModule | undefined): module is RatedModule =>
  module === 'schreiben' || module === 'sprechen';

/**
 * Owns the whole attempt: which module is open, the answers, the clock, and turning a
 * finished run into a stored attempt. Every transition writes through to localStorage, so
 * a reload resumes exactly where the candidate was.
 *
 * Nothing here knows which paper is being sat — the format descriptor answers that.
 */
export const useExamRun = <
  TExam extends ExamPaper,
  TSettings extends RunSettings,
  TAttempt extends StoredAttempt
>({
  format,
  exam,
  mode,
  settings,
  saveAttempt
}: ExamRunOptions<TExam, TSettings, TAttempt>): ExamRunController => {
  const navigate = useNavigate();
  const store = format.runStore;
  const trainer = format.trainer(exam);
  const basePath = TRAINERS[trainer].basePath;
  const examId = exam.id;

  const [run, setRun] = useState<ExamRun>(() => {
    const saved = store.load();
    if (saved !== null && saved.trainer === trainer && saved.examId === examId && saved.mode === mode) {
      return saved;
    }
    const fresh = createRun({ trainer, examId, mode, queue: queueForMode(format.modules, mode) });
    store.save(fresh);
    return fresh;
  });
  const [recordings, setRecordings] = useState<RecordingMap>({});
  const [, forceTick] = useState(0);
  const finishedRef = useRef(false);

  /* The live run, readable outside render. Every transition writes here first, so a
     transition can decide what to do next without a state updater — putting the "finish"
     side effects (a stored attempt, a toast, a navigation) inside one would run them
     while React is rendering. */
  const runRef = useRef(run);

  /* The queue is never empty, so there is always a current module; fall back to the
     first entry rather than asserting non-null. */
  const module = currentModule(run) ?? format.modules[0] ?? 'lesen';
  const minutes = format.minutes(module, exam, settings);

  const write = useCallback(
    (next: ExamRun) => {
      runRef.current = next;
      store.save(next);
      setRun(next);
    },
    [store]
  );

  const patch = useCallback(
    (recipe: (current: ExamRun) => ExamRun) => {
      write(recipe(runRef.current));
    },
    [write]
  );

  const setAnswer = useCallback(
    (key: string, value: AnswerValue) => {
      patch(current => ({ ...current, answers: { ...current.answers, [key]: value } }));
    },
    [patch]
  );

  const playsAllowed = settings.playsAllowed;
  const consumePlay = useCallback(
    (key: string) => {
      patch(current => ({
        ...current,
        plays: { ...current.plays, [key]: (current.plays[key] ?? playsAllowed) - 1 }
      }));
    },
    [patch, playsAllowed]
  );

  const setRecording = useCallback((part: SpeakingPart, url: string) => {
    setRecordings(current => ({ ...current, [part]: url }));
  }, []);

  /** Turns a finished run into a stored attempt and navigates to its results. */
  const finish = useCallback(
    (finalRun: ExamRun) => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      const attempt = format.scoring.buildAttempt({
        exam,
        mode: finalRun.mode,
        queue: finalRun.queue,
        answers: finalRun.answers,
        ratings: finalRun.ratings,
        times: finalRun.times
      });

      saveAttempt(attempt);
      store.clear();
      stopSpeech();

      const copy = format.scoring.completionToast(exam, attempt);
      toast[copy.tone](copy.title, { description: copy.description });

      void navigate(`${basePath}/results/${String(attempt.id)}`, { replace: true });
    },
    [format, exam, saveAttempt, store, navigate, basePath]
  );

  /** Records the time spent, then moves to the next module, the rating screen, or the end. */
  const submit = useCallback(() => {
    const current = runRef.current;
    const finishedModule = currentModule(current);
    if (!finishedModule || current.phase !== 'module') return;

    stopSpeech();
    const times = {
      ...current.times,
      [finishedModule]: Math.round((Date.now() - (current.moduleStart ?? Date.now())) / 1000)
    };

    if (isRated(finishedModule)) {
      write({ ...current, times, phase: 'rating', deadline: null });
      return;
    }

    const nextIndex = current.index + 1;
    const upcoming = current.queue[nextIndex];
    if (!upcoming) {
      finish({ ...current, times });
      return;
    }

    write({ ...current, times, index: nextIndex, phase: 'brief', deadline: null, moduleStart: null });
    toast.success(`${format.moduleShort(finishedModule)} submitted`, {
      description: `Next up: ${format.moduleName(upcoming)}.`
    });
  }, [finish, write, format]);

  const requestSubmit = useCallback(
    () => format.scoring.countUnanswered(exam, module, run.answers),
    [format, exam, module, run.answers]
  );

  const confirmRating = useCallback(
    (score: number) => {
      const current = runRef.current;
      const rated = currentModule(current);
      if (!isRated(rated)) return;

      const withRating: ExamRun = { ...current, ratings: { ...current.ratings, [rated]: score } };
      const nextIndex = current.index + 1;
      const upcoming = current.queue[nextIndex];

      if (!upcoming) {
        finish(withRating);
        return;
      }
      write({ ...withRating, index: nextIndex, phase: 'brief', deadline: null, moduleStart: null });
    },
    [finish, write]
  );

  const beginModule = useCallback(() => {
    patch(current => ({
      ...current,
      phase: 'module',
      moduleStart: Date.now(),
      deadline: Date.now() + minutes * SECONDS_PER_MINUTE * 1000
    }));
    window.scrollTo(0, 0);
  }, [patch, minutes]);

  const abort = useCallback(() => {
    store.clear();
    stopSpeech();
    toast.info('Attempt aborted', {
      description: 'Nothing was saved. Start again whenever you are ready.'
    });
    void navigate(basePath || '/');
  }, [store, navigate, basePath]);

  /*
   * One-second heartbeat while a timed module is open. It must not depend on `run`
   * itself: that object changes on every keystroke, which would restart the interval
   * before it ever fired and stall the clock. Live values are read through refs.
   */
  const submitRef = useRef(submit);
  useEffect(() => {
    submitRef.current = submit;
  }, [submit]);

  useEffect(() => {
    if (run.phase !== 'module') return undefined;
    const interval = setInterval(() => {
      forceTick(tick => tick + 1);
      const live = runRef.current;
      const open = currentModule(live);
      if (secondsLeft(live) <= 0 && (!open || !UNTIMED_MODULES.includes(open))) {
        clearInterval(interval);
        toast.warning('⏱ Time is up — the module was submitted automatically.');
        submitRef.current();
      }
    }, HEARTBEAT_MS);
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
      totalSeconds: minutes * SECONDS_PER_MINUTE,
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
