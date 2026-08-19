import { useCallback, type ComponentType } from 'react';

import { Navigate, useParams } from 'react-router-dom';

import { findExamById } from '@/content/exams';

import { EXAM_MODULES, MODULE_META } from '@/shared/config/exam.ts';
import { useConfirm } from '@/shared/providers/useConfirm.ts';
import { type AttemptMode, type Exam } from '@/shared/types';
import { Button } from '@/shared/ui';

import { useProgress } from '@/features/progress';

import { HoerenModule } from '../components/HoerenModule.tsx';
import { LesenModule } from '../components/LesenModule.tsx';
import { ModuleBriefing } from '../components/ModuleBriefing.tsx';
import { type ExamModuleProps } from '../components/moduleProps.ts';
import { ModuleToolbar } from '../components/ModuleToolbar.tsx';
import { SchreibenModule } from '../components/SchreibenModule.tsx';
import { SelfRatingCard } from '../components/SelfRatingCard.tsx';
import { SprachbausteineModule } from '../components/SprachbausteineModule.tsx';
import { SprechenModule } from '../components/SprechenModule.tsx';
import { useExamRun } from '../hooks/useExamRun.ts';
import { textAnswer, WRITING_ANSWER_KEY } from '../lib/answers.ts';

const MODULE_COMPONENTS: Readonly<Record<string, ComponentType<ExamModuleProps>>> = {
  lesen: LesenModule,
  sprachbausteine: SprachbausteineModule,
  hoeren: HoerenModule,
  schreiben: SchreibenModule,
  sprechen: SprechenModule
};

function isAttemptMode(value: string | undefined): value is AttemptMode {
  return value === 'full' || (EXAM_MODULES as readonly string[]).includes(value ?? '');
}

/** Drives one attempt: briefing → module → optional self-scoring → results. */
export function RunnerPage() {
  const { examId, mode } = useParams<{ examId: string; mode: string }>();
  const exam = findExamById(examId);
  const validMode = isAttemptMode(mode);

  /* An unknown exam or mode is a bad URL, not a state worth rendering. */
  if (!exam || !validMode) return <Navigate to="/" replace />;
  return <RunnerView exam={exam} mode={mode} />;
}

interface RunnerViewProps {
  readonly exam: Exam;
  readonly mode: AttemptMode;
}

/** Split out so the run hook is only created once the route params are known good. */
function RunnerView({ exam, mode }: RunnerViewProps) {
  const confirm = useConfirm();
  const { db } = useProgress();
  const run = useExamRun({ exam, mode });

  const step = run.run.mode === 'full' ? { index: run.run.index + 1, total: run.run.queue.length } : null;

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
      <ModuleBriefing
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
      <ModuleToolbar
        exam={exam}
        module={run.module}
        minutes={run.minutes}
        secondsRemaining={run.secondsRemaining}
        step={step}
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
}
