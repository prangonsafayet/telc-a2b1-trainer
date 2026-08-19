import { useCallback, type ComponentType } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import { findTelcExam } from '@content/trainers/index.ts';

import { RouteFallback } from '@shared/components';
import { TELC_MODULE_META, TELC_MODULES } from '@shared/config/telcExam.ts';
import { TRAINERS } from '@shared/config/trainers.ts';
import { useConfirm } from '@shared/providers/useConfirm.ts';
import { type AttemptMode, type TelcExam, type TelcLevel } from '@shared/types';
import { Button } from '@shared/ui';

import { useTrainerDoc } from '@features/progress';

import { type TelcModuleProps } from '../components/moduleProps.ts';
import { TelcHoerenModule } from '../components/TelcHoerenModule.tsx';
import { TelcLesenModule } from '../components/TelcLesenModule.tsx';
import { TelcModuleBriefing } from '../components/TelcModuleBriefing.tsx';
import { TelcModuleToolbar } from '../components/TelcModuleToolbar.tsx';
import { TelcRatingCard } from '../components/TelcRatingCard.tsx';
import { TelcSchreibenModule } from '../components/TelcSchreibenModule.tsx';
import { TelcSprachbausteineModule } from '../components/TelcSprachbausteineModule.tsx';
import { TelcSprechenModule } from '../components/TelcSprechenModule.tsx';
import { useTelcRun } from '../hooks/useTelcRun.ts';
import { numberAnswer, textAnswer, WRITING_ANSWER_KEY, WRITING_TASK_KEY } from '../lib/answers.ts';

const MODULE_COMPONENTS: Readonly<Record<string, ComponentType<TelcModuleProps>>> = {
  lesen: TelcLesenModule,
  sprachbausteine: TelcSprachbausteineModule,
  hoeren: TelcHoerenModule,
  schreiben: TelcSchreibenModule,
  sprechen: TelcSprechenModule
};

const isAttemptMode = (value: string | undefined): value is AttemptMode =>
  value === 'full' || (TELC_MODULES as readonly string[]).includes(value ?? '');

interface TelcRunnerPageProps {
  readonly level: TelcLevel;
}

/** Drives one B1/B2 attempt: briefing → module → optional self-scoring → results. */
export const TelcRunnerPage = ({ level }: TelcRunnerPageProps) => {
  const { examId, mode } = useParams<{ examId: string; mode: string }>();
  const exam = findTelcExam(level, examId);
  const validMode = isAttemptMode(mode);

  /* An unknown exam or mode is a bad URL, not a state worth rendering. */
  if (!exam || !validMode) return <Navigate to={TRAINERS[level].basePath || '/'} replace />;
  return <TelcRunnerView level={level} exam={exam} mode={mode} />;
};

interface TelcRunnerViewProps {
  readonly level: TelcLevel;
  readonly exam: TelcExam;
  readonly mode: AttemptMode;
}

/** Split out so the run hook is only created once the route params are known good. */
const TelcRunnerView = ({ level, exam, mode }: TelcRunnerViewProps) => {
  const confirm = useConfirm();
  const { doc } = useTrainerDoc(level);
  const run = useTelcRun({ level, exam, mode });

  const handleSubmit = useCallback(async () => {
    const missing = run.requestSubmit();
    if (missing > 0) {
      const ok = await confirm({
        title: `${String(missing)} item${missing === 1 ? '' : 's'} still unanswered`,
        description: 'In the real exam a blank is a guaranteed zero — a guess costs nothing. Submit anyway?',
        confirmText: 'Submit anyway'
      });
      if (!ok) return;
    }
    run.submit();
  }, [run, confirm]);

  const handleAbort = useCallback(async () => {
    const ok = await confirm({
      title: 'Abort this attempt?',
      description: 'Nothing from this attempt will be saved.',
      confirmText: 'Abort attempt',
      destructive: true
    });
    if (ok) run.abort();
  }, [run, confirm]);

  /* One render while a stale run is replaced by a fresh one. */
  if (!run.run) return <RouteFallback />;

  const step = run.run.mode === 'full' ? { index: run.run.index + 1, total: run.run.queue.length } : null;

  if (run.run.phase === 'brief') {
    return (
      <TelcModuleBriefing
        exam={exam}
        module={run.module}
        minutes={run.minutes}
        step={step}
        onBegin={run.beginModule}
        onAbort={() => void handleAbort()}
      />
    );
  }

  if (run.run.phase === 'rating' && (run.module === 'schreiben' || run.module === 'sprechen')) {
    return (
      <TelcRatingCard
        module={run.module}
        exam={exam}
        writtenText={textAnswer(run.run.answers, WRITING_ANSWER_KEY)}
        writingTask={numberAnswer(run.run.answers, WRITING_TASK_KEY) ?? 0}
        recordings={run.recordings}
        onConfirm={run.confirmRating}
      />
    );
  }

  const ModuleComponent = MODULE_COMPONENTS[run.module];
  if (!ModuleComponent) return <Navigate to={TRAINERS[level].basePath || '/'} replace />;

  return (
    <>
      <TelcModuleToolbar
        exam={exam}
        module={run.module}
        secondsRemaining={run.secondsRemaining}
        totalSeconds={run.totalSeconds}
        step={step}
      />

      <ModuleComponent
        exam={exam}
        answers={run.run.answers}
        setAnswer={run.setAnswer}
        settings={doc.settings}
        plays={run.run.plays}
        onConsumePlay={run.consumePlay}
        recordings={run.recordings}
        onRecorded={run.setRecording}
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <Button size="lg" onClick={() => void handleSubmit()}>
          Submit {TELC_MODULE_META[run.module].short} ✓
        </Button>
        <Button variant="ghost" size="lg" onClick={() => void handleAbort()}>
          Abort attempt
        </Button>
      </div>
    </>
  );
};
