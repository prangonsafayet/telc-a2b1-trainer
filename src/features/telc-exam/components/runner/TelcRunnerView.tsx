import { useCallback, type ComponentType } from 'react';

import { Navigate } from 'react-router-dom';

import { ExamModuleToolbar, ModuleBriefingCard, RouteFallback } from '@shared/components';
import { TELC_MODULE_META, telcModuleBriefing } from '@shared/config/telcExam.ts';
import { TRAINERS } from '@shared/config/trainers.ts';
import { numberAnswer, textAnswer, WRITING_ANSWER_KEY, WRITING_TASK_KEY } from '@shared/lib/answers.ts';
import { useConfirm } from '@shared/providers/useConfirm.ts';
import { type AttemptMode, type TelcExam, type TelcLevel } from '@shared/types';
import { Button } from '@shared/ui';

import { useTrainerDoc } from '@features/progress';
import { useTelcRun } from '@features/telc-exam/hooks/useTelcRun.ts';
import { type TelcModuleProps } from '@features/telc-exam/types/moduleProps.ts';

import TelcHoerenModule from '../modules/TelcHoerenModule.tsx';
import TelcLesenModule from '../modules/TelcLesenModule.tsx';
import TelcSchreibenModule from '../modules/TelcSchreibenModule.tsx';
import TelcSprachbausteineModule from '../modules/TelcSprachbausteineModule.tsx';
import TelcSprechenModule from '../modules/TelcSprechenModule.tsx';
import TelcRatingCard from '../rating/TelcRatingCard.tsx';

const MODULE_COMPONENTS: Readonly<Record<string, ComponentType<TelcModuleProps>>> = {
  lesen: TelcLesenModule,
  sprachbausteine: TelcSprachbausteineModule,
  hoeren: TelcHoerenModule,
  schreiben: TelcSchreibenModule,
  sprechen: TelcSprechenModule
};

interface TelcRunnerViewProps {
  readonly level: TelcLevel;
  readonly exam: TelcExam;
  readonly mode: AttemptMode;
}

/** One B1/B2 attempt after the route params are known good: briefing → module → rating. */
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
      <ModuleBriefingCard
        kicker={`${exam.title} · telc Deutsch ${exam.level.toUpperCase()}${step ? ` · Module ${String(step.index)} of ${String(step.total)}` : ' · Single-module practice'}`}
        title={TELC_MODULE_META[run.module].name}
        briefing={telcModuleBriefing(run.module, exam.level)}
        minutes={run.minutes}
        guidelineOnly={run.module === 'sprechen'}
        startLabel={`Start ${TELC_MODULE_META[run.module].short}`}
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
      <ExamModuleToolbar
        title={TELC_MODULE_META[run.module].name}
        subtitle={`${exam.title} · ${exam.level.toUpperCase()}${step ? ` · module ${String(step.index)}/${String(step.total)}` : ''}`}
        secondsRemaining={run.secondsRemaining}
        totalSeconds={run.totalSeconds}
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

export default TelcRunnerView;
