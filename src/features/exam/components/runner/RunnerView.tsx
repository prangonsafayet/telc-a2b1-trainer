import { useCallback, type ComponentType } from 'react';

import { Navigate } from 'react-router-dom';

import { ExamModuleToolbar, ModuleBriefingCard } from '@shared/components';
import { MODULE_BRIEFING, MODULE_META } from '@shared/config/exam.ts';
import { textAnswer, WRITING_ANSWER_KEY } from '@shared/lib/answers.ts';
import { useConfirm } from '@shared/providers/useConfirm.ts';
import { type AttemptMode, type Exam } from '@shared/types';
import { Button } from '@shared/ui';

import { useExamRun } from '@features/exam/hooks/useExamRun.ts';
import { type A2b1ModuleProps } from '@features/exam/types/moduleProps.ts';
import { useProgress } from '@features/progress';

import HoerenModule from '../modules/HoerenModule.tsx';
import LesenModule from '../modules/LesenModule.tsx';
import SchreibenModule from '../modules/SchreibenModule.tsx';
import SprachbausteineModule from '../modules/SprachbausteineModule.tsx';
import SprechenModule from '../modules/SprechenModule.tsx';
import SelfRatingCard from '../rating/SelfRatingCard.tsx';

const MODULE_COMPONENTS: Readonly<Record<string, ComponentType<A2b1ModuleProps>>> = {
  lesen: LesenModule,
  sprachbausteine: SprachbausteineModule,
  hoeren: HoerenModule,
  schreiben: SchreibenModule,
  sprechen: SprechenModule
};

interface RunnerViewProps {
  readonly exam: Exam;
  readonly mode: AttemptMode;
}

/** One attempt after the route params are known good: briefing → module → rating. */
const RunnerView = ({ exam, mode }: RunnerViewProps) => {
  const confirm = useConfirm();
  const { db } = useProgress();
  const run = useExamRun({ exam, mode });

  const step = run.run.mode === 'full' ? { index: run.run.index + 1, total: run.run.queue.length } : null;
  const stepLabel = step ? ` · Module ${String(step.index)} of ${String(step.total)}` : '';

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

  if (run.run.phase === 'brief') {
    return (
      <ModuleBriefingCard
        kicker={`${exam.title} · ${exam.level}${step ? stepLabel : ' · Single-module practice'}`}
        title={MODULE_META[run.module].name}
        briefing={MODULE_BRIEFING[run.module]}
        minutes={run.minutes}
        guidelineOnly={run.module === 'sprechen'}
        startLabel={`Start ${MODULE_META[run.module].short}`}
        onBegin={run.beginModule}
        onAbort={() => void handleAbort()}
      />
    );
  }

  if (run.run.phase === 'rating' && (run.module === 'schreiben' || run.module === 'sprechen')) {
    return (
      <SelfRatingCard
        module={run.module}
        exam={exam}
        writtenText={textAnswer(run.run.answers, WRITING_ANSWER_KEY)}
        recordings={run.recordings}
        onConfirm={run.confirmRating}
      />
    );
  }

  const ModuleComponent = MODULE_COMPONENTS[run.module];
  if (!ModuleComponent) return <Navigate to="/" replace />;

  return (
    <>
      <ExamModuleToolbar
        title={MODULE_META[run.module].name}
        subtitle={`${exam.title}${step ? ` · module ${String(step.index)}/${String(step.total)}` : ''}`}
        secondsRemaining={run.secondsRemaining}
        totalSeconds={run.minutes * 60}
      />

      <ModuleComponent
        exam={exam}
        answers={run.run.answers}
        setAnswer={run.setAnswer}
        settings={db.settings}
        plays={run.run.plays}
        onConsumePlay={run.consumePlay}
        recordings={run.recordings}
        onRecorded={run.setRecording}
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <Button size="lg" onClick={() => void handleSubmit()}>
          Submit {MODULE_META[run.module].short} ✓
        </Button>
        <Button variant="ghost" size="lg" onClick={() => void handleAbort()}>
          Abort attempt
        </Button>
      </div>
    </>
  );
};

export default RunnerView;
