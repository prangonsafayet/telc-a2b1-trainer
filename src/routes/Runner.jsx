import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Timer } from 'lucide-react';
import { toast } from 'sonner';
import Lesen from '@/components/modules/Lesen.jsx';
import Sprachbausteine from '@/components/modules/Sprachbausteine.jsx';
import Hoeren from '@/components/modules/Hoeren.jsx';
import Schreiben from '@/components/modules/Schreiben.jsx';
import Sprechen from '@/components/modules/Sprechen.jsx';
import Rating from '@/components/modules/Rating.jsx';
import { useConfirm } from '@/components/ConfirmProvider.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { examById } from '@/data/exams.js';
import { MODULES, MOD_META, WHAT_TO_DO, modMinutes } from '@/lib/constants.js';
import { clearRun, loadRun, newRun, saveRun, secondsLeft } from '@/lib/runState.js';
import { gradeFull, scoreHoeren, scoreLesen, scoreSB, unansweredCount } from '@/lib/scoring.js';
import { useDB } from '@/lib/store.jsx';
import { stopSpeech } from '@/lib/tts.js';
import { fmtClock } from '@/lib/util.js';
import { cn } from '@/lib/utils';
import NotFound from './NotFound.jsx';

const MODULE_COMPONENTS = {
  lesen: Lesen, sprachbausteine: Sprachbausteine, hoeren: Hoeren, schreiben: Schreiben, sprechen: Sprechen
};

export default function Runner() {
  const { examId, mode } = useParams();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { db, update } = useDB();
  const exam = examById(examId);

  /* Pick up a saved run for this exam+mode — that is what makes a refresh lossless.
     Otherwise start a fresh one, e.g. when the URL was opened directly. */
  const [run, setRun] = useState(() => {
    const saved = loadRun();
    if (saved && String(saved.examId) === String(examId) && saved.mode === mode) return saved;
    const fresh = newRun(examId, mode, mode === 'full' ? MODULES.slice() : [mode]);
    saveRun(fresh);
    return fresh;
  });
  const [recordings, setRecordings] = useState({});
  const [, setTick] = useState(0);
  const finishedRef = useRef(false);

  const patch = useCallback(recipe => {
    setRun(prev => {
      const next = { ...prev, ...recipe(prev) };
      saveRun(next);
      return next;
    });
  }, []);

  const validMode = mode === 'full' || MODULES.includes(mode);
  const currentMod = run.queue[run.idx];
  const secLeft = run.phase === 'module' ? secondsLeft(run) : 0;

  const setAnswer = useCallback((key, value) => {
    patch(prev => ({ answers: { ...prev.answers, [key]: value } }));
  }, [patch]);

  const usePlay = useCallback(key => {
    patch(prev => ({ plays: { ...prev.plays, [key]: (prev.plays[key] ?? db.settings.playsAllowed) - 1 } }));
  }, [patch, db.settings.playsAllowed]);

  const setRecording = useCallback((part, url) => setRecordings(prev => ({ ...prev, [part]: url })), []);

  /* ---------- finishing ---------- */
  const finish = useCallback(finalRun => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const has = m => finalRun.queue.includes(m);
    const scores = {};
    let sb = null;
    if (has('lesen')) scores.lesen = scoreLesen(exam, finalRun.answers).points;
    if (has('hoeren')) scores.hoeren = scoreHoeren(exam, finalRun.answers).points;
    if (has('sprachbausteine')) sb = scoreSB(exam, finalRun.answers);
    if (has('schreiben')) scores.schreiben = finalRun.ratings.schreiben ?? 0;
    if (has('sprechen')) scores.sprechen = finalRun.ratings.sprechen ?? 0;

    const attempt = {
      id: Date.now(),
      examId: exam.id,
      mode: finalRun.mode,
      date: new Date().toISOString(),
      times: finalRun.times,
      scores,
      sb,
      answers: finalRun.answers,
      ratings: finalRun.ratings
    };
    if (finalRun.mode === 'full') Object.assign(attempt, gradeFull(scores));

    update(draft => { draft.attempts = [...draft.attempts, attempt]; });
    clearRun();
    stopSpeech();

    if (finalRun.mode === 'full') {
      const passed = attempt.result === 'B1' || attempt.result === 'A2';
      toast[passed ? 'success' : 'info'](`${exam.title} finished — ${attempt.result}`, {
        description: `${attempt.total}/240 points. Review every red item before your next test.`
      });
    } else {
      toast.success(`${MOD_META[finalRun.mode].short} practice saved`, {
        description: 'Open the review to see the correct answers and transcripts.'
      });
    }
    navigate(`/results/${attempt.id}`, { replace: true });
  }, [exam, update, navigate]);

  const advance = useCallback(() => {
    setRun(prev => {
      const nextIdx = prev.idx + 1;
      if (nextIdx >= prev.queue.length) { finish(prev); return prev; }
      const next = { ...prev, idx: nextIdx, phase: 'brief', deadline: null, moduleStart: null };
      saveRun(next);
      return next;
    });
  }, [finish]);

  const commitSubmit = useCallback(() => {
    setRun(prev => {
      const mod = prev.queue[prev.idx];
      stopSpeech();
      const times = { ...prev.times, [mod]: Math.round((Date.now() - prev.moduleStart) / 1000) };
      if (mod === 'schreiben' || mod === 'sprechen') {
        const next = { ...prev, times, phase: 'rating', deadline: null };
        saveRun(next);
        return next;
      }
      const nextIdx = prev.idx + 1;
      if (nextIdx >= prev.queue.length) {
        const done = { ...prev, times };
        finish(done);
        return done;
      }
      const next = { ...prev, times, idx: nextIdx, phase: 'brief', deadline: null, moduleStart: null };
      saveRun(next);
      toast.success(`${MOD_META[mod].short} submitted`, {
        description: `Next up: ${MOD_META[prev.queue[nextIdx]].name}.`
      });
      return next;
    });
  }, [finish]);

  const submitModule = useCallback(async () => {
    const missing = unansweredCount(exam, currentMod, run.answers);
    if (missing > 0) {
      const ok = await confirm({
        title: `${missing} item${missing === 1 ? '' : 's'} still unanswered`,
        description: 'In the real exam a blank is a guaranteed zero — a guess costs nothing. Submit anyway?',
        confirmText: 'Submit anyway'
      });
      if (!ok) return;
    }
    commitSubmit();
  }, [exam, currentMod, run.answers, confirm, commitSubmit]);

  /* One-second heartbeat while a timed module is open. It must not depend on `run`
     itself: that object changes on every keystroke, which would restart the interval
     before it ever fired and stall the clock. Read the live values through refs. */
  const runRef = useRef(run);
  runRef.current = run;
  const commitRef = useRef(commitSubmit);
  commitRef.current = commitSubmit;

  useEffect(() => {
    if (run.phase !== 'module') return undefined;
    const id = setInterval(() => {
      setTick(t => t + 1);
      /* Auto-submit when the clock hits zero — Sprechen just lets the clock stop. */
      const r = runRef.current;
      if (secondsLeft(r) <= 0 && r.queue[r.idx] !== 'sprechen') {
        clearInterval(id);
        toast.warning('⏱ Time is up — the module was submitted automatically.');
        commitRef.current();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [run.phase, run.idx]);

  const beginModule = () => {
    const minutes = modMinutes(currentMod, db.settings);
    patch(() => ({ phase: 'module', moduleStart: Date.now(), deadline: Date.now() + minutes * 60000 }));
    window.scrollTo(0, 0);
  };

  const abort = async () => {
    const ok = await confirm({
      title: 'Abort this attempt?',
      description: 'Nothing from this attempt will be saved.',
      confirmText: 'Abort attempt',
      destructive: true
    });
    if (!ok) return;
    clearRun();
    stopSpeech();
    toast.info('Attempt aborted', { description: 'Nothing was saved. Start again whenever you are ready.' });
    navigate('/');
  };

  const ModuleComponent = useMemo(() => MODULE_COMPONENTS[currentMod], [currentMod]);

  if (!exam || !validMode) return <NotFound />;

  const meta = MOD_META[currentMod];
  const minutes = modMinutes(currentMod, db.settings);

  /* ---------- briefing ---------- */
  if (run.phase === 'brief') {
    return (
      <Card className="mx-auto max-w-2xl text-center">
        <CardHeader className="items-center">
          <CardDescription>
            {exam.title} · {exam.level} ·{' '}
            {run.mode === 'full' ? `Module ${run.idx + 1} of ${run.queue.length}` : 'Single-module practice'}
          </CardDescription>
          <CardTitle className="text-2xl">{meta.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-left text-sm leading-relaxed text-muted-foreground">
            <b className="text-foreground">What to do:</b> {WHAT_TO_DO[currentMod]}
          </p>
          <Badge variant="secondary" className="gap-1.5 py-1">
            <Timer className="size-3" /> {minutes} minutes
            {currentMod !== 'sprechen' ? ' — auto-submits when time runs out' : ' (guideline)'}
          </Badge>
          <div className="flex flex-col items-center gap-2">
            <Button size="lg" onClick={beginModule}>Start {meta.short} ▸</Button>
            <Button variant="ghost" size="sm" onClick={abort}>Abort attempt</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------- self-scoring ---------- */
  if (run.phase === 'rating') {
    return (
      <Rating
        mod={currentMod}
        exam={exam}
        text={run.answers['w.text']}
        recordings={recordings}
        onDone={total => {
          setRun(prev => {
            const next = { ...prev, ratings: { ...prev.ratings, [currentMod]: total } };
            saveRun(next);
            return next;
          });
          setTimeout(advance, 0);
        }}
      />
    );
  }

  /* ---------- the module itself ---------- */
  const elapsedPct = Math.min(100, Math.max(0, 100 - (secLeft / (minutes * 60)) * 100));

  return (
    <>
      <div className="sticky top-[var(--header-h,3.5rem)] z-30 -mx-4 mb-4 border-b bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-semibold">{meta.name}</span>
          <span className="text-sm text-muted-foreground">
            {exam.title}
            {run.mode === 'full' ? ` · module ${run.idx + 1}/${run.queue.length}` : ''}
          </span>
          <span
            className={cn(
              'ml-auto font-mono text-xl font-bold tabular-nums',
              secLeft <= 60 ? 'animate-pulse text-destructive' : secLeft <= 300 ? 'text-[color:var(--warning-foreground)]' : ''
            )}
          >
            {fmtClock(secLeft)}
          </span>
        </div>
        <Progress
          value={elapsedPct}
          className="mt-2 h-1"
          indicatorClassName={secLeft <= 60 ? 'bg-destructive' : secLeft <= 300 ? 'bg-[color:var(--warning)]' : 'bg-primary'}
        />
      </div>

      <ModuleComponent
        exam={exam}
        answers={run.answers}
        setAnswer={setAnswer}
        settings={db.settings}
        plays={run.plays}
        usePlay={usePlay}
        recordings={recordings}
        setRecording={setRecording}
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <Button size="lg" onClick={submitModule}>Submit {meta.short} ✓</Button>
        <Button variant="ghost" size="lg" onClick={abort}>Abort attempt</Button>
      </div>
    </>
  );
}
