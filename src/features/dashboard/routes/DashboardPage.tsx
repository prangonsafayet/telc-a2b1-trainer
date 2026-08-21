import { Meter, PageTitle, ScoreHistoryChart, SectionTitle } from '@shared/components';
import { type TrainerId } from '@shared/types';
import { Card, CardContent } from '@shared/ui';

import { useAccountIdentity } from '@features/auth';

import ExamCard from '../components/ExamCard.tsx';
import LocalOnlyNotice from '../components/LocalOnlyNotice.tsx';
import MasteryCard from '../components/MasteryCard.tsx';
import ResumeRunNotice from '../components/ResumeRunNotice.tsx';
import SchedulePhaseNotice from '../components/SchedulePhaseNotice.tsx';
import StatTile from '../components/StatTile.tsx';
import TodayPlanCard from '../components/TodayPlanCard.tsx';
import WeakAreasCard from '../components/WeakAreasCard.tsx';
import { useDashboardStats } from '../hooks/useDashboardStats.ts';
import { useResumableRun } from '../hooks/useResumableRun.ts';
import { useTodayPlan } from '../hooks/useTodayPlan.ts';

interface DashboardPageProps {
  readonly trainer: TrainerId;
}

/**
 * One trainer's landing screen. Every section is driven by what its descriptor offers —
 * the mastery card and the two study tiles appear for a trainer with a vocabulary bank, the
 * weak areas once there is enough signal — so there is one Dashboard, not one per trainer.
 */
const DashboardPage = ({ trainer }: DashboardPageProps) => {
  const stats = useDashboardStats(trainer);
  const identity = useAccountIdentity();
  const resumable = useResumableRun(trainer);
  const plan = useTodayPlan(trainer);

  return (
    <>
      <PageTitle
        lead={
          <>
            {stats.lead} <b className="text-foreground">{stats.passRule}</b>
          </>
        }
      >
        {stats.heading}
      </PageTitle>

      {identity.signedIn ? null : (
        <LocalOnlyNotice
          attemptCount={stats.attemptCount}
          syncAvailable={identity.configured}
          historyTo={stats.historyTo}
        />
      )}

      {resumable.run ? (
        <ResumeRunNotice
          run={resumable.run}
          modeLabel={resumable.modeLabel}
          onResume={resumable.resume}
          onDiscard={resumable.discard}
        />
      ) : null}

      {plan.notice ? (
        <SchedulePhaseNotice
          message={plan.notice}
          needsNewDate={plan.needsNewDate}
          settingsTo={plan.settingsTo}
        />
      ) : null}

      {plan.today ? (
        <TodayPlanCard
          plan={plan.today}
          onStartExam={examId => {
            resumable.start(examId, 'full');
          }}
        />
      ) : null}

      <div className="stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.tiles.map(tile => (
          <StatTile key={tile.kind} tile={tile} />
        ))}
      </div>

      {stats.weakAreas.length > 0 ? (
        <div className="mt-6">
          <WeakAreasCard areas={stats.weakAreas} />
        </div>
      ) : null}

      <SectionTitle>{stats.metersHeading}</SectionTitle>
      <Card>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          {stats.meters.map(meter => (
            <Meter
              key={meter.key}
              label={meter.label}
              value={meter.value}
              of={meter.of}
              thresholdPercent={meter.thresholdPercent}
              thresholdLabel={meter.thresholdLabel}
            />
          ))}
        </CardContent>
      </Card>

      {stats.mastery ? (
        <>
          <SectionTitle>Vocabulary &amp; grammar mastery</SectionTitle>
          <MasteryCard mastery={stats.mastery} />
        </>
      ) : null}

      <div className="mt-6">
        <ScoreHistoryChart model={stats.chart} />
      </div>

      <SectionTitle>Mock exams</SectionTitle>
      <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.examCards.map(card => (
          <ExamCard key={card.id} card={card} onStart={resumable.start} />
        ))}
        {stats.examCards.length === 0 ? (
          <p className="text-sm text-muted-foreground">The Modelltests for this trainer are on their way.</p>
        ) : null}
      </div>
    </>
  );
};

export default DashboardPage;
