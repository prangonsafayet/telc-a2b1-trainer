import { CalendarClock, ClipboardCheck, Trophy } from 'lucide-react';

import { CountedNumber, Meter, PageTitle, ScoreHistoryChart, SectionTitle } from '@shared/components';
import { MODULE_META } from '@shared/config/exam.ts';
import { fmtDate } from '@shared/lib/format.ts';
import { Card, CardContent } from '@shared/ui';

import { useAccountIdentity } from '@features/auth';
import { describeMockLead, examSlotLabel } from '@features/plan';
import { useProgress } from '@features/progress';

import ExamCard from '../components/ExamCard.tsx';
import LocalOnlyNotice from '../components/LocalOnlyNotice.tsx';
import ResumeRunNotice from '../components/ResumeRunNotice.tsx';
import SchedulePhaseNotice from '../components/SchedulePhaseNotice.tsx';
import StatTile from '../components/StatTile.tsx';
import TodayPlanCard from '../components/TodayPlanCard.tsx';
import { useDashboardStats } from '../hooks/useDashboardStats.ts';
import { useResumableRun } from '../hooks/useResumableRun.ts';
import { useTodayPlan } from '../hooks/useTodayPlan.ts';

const SKILL_LABELS = [
  ['lesen', 'Lesen'],
  ['hoeren', 'Hören'],
  ['schreiben', 'Schreiben'],
  ['sprechen', 'Sprechen']
] as const;

const DashboardPage = () => {
  const { db } = useProgress();
  const stats = useDashboardStats();
  const identity = useAccountIdentity();
  const resumable = useResumableRun();
  const plan = useTodayPlan();

  const last = stats.lastAttempt;
  const lastLabel = last
    ? `${last.mode === 'full' ? 'Full exam' : MODULE_META[last.mode].short} · Test ${String(last.examId)}`
    : '–';

  return (
    <>
      <PageTitle
        lead={
          <>
            {plan.schedule
              ? describeMockLead(plan.schedule, stats.examCards.length)
              : `${String(stats.examCards.length)} Modelltests, easiest first. Take them in order under real timing.`}{' '}
            Aim: <b className="text-foreground">≥ 42/60 in three skills</b> and ≥ 24/60 in the fourth = B1.
          </>
        }
      >
        Dashboard
      </PageTitle>

      {identity.signedIn ? null : (
        <LocalOnlyNotice attemptCount={stats.attempts.length} syncAvailable={identity.configured} />
      )}

      {resumable.run ? (
        <ResumeRunNotice run={resumable.run} onResume={resumable.resume} onDiscard={resumable.discard} />
      ) : null}

      {plan.notice ? <SchedulePhaseNotice message={plan.notice} needsNewDate={plan.needsNewDate} /> : null}

      {plan.today ? (
        <TodayPlanCard
          plan={plan.today}
          onStartExam={examId => {
            resumable.start(examId, 'full');
          }}
        />
      ) : null}

      <div className="stagger grid gap-3 sm:grid-cols-3">
        <StatTile
          icon={ClipboardCheck}
          label="Full exams taken"
          value={<CountedNumber value={stats.fullAttempts.length} />}
          caption={`${String(stats.practiceCount)} module practice runs`}
        />
        <StatTile
          icon={Trophy}
          label="Best total"
          value={
            <>
              <CountedNumber value={stats.bestTotal} />
              <span className="text-base font-normal text-muted-foreground">/240</span>
            </>
          }
          caption={stats.bestTotalCaption}
        />
        <StatTile
          icon={CalendarClock}
          label="Last activity"
          value={<span className="text-lg">{lastLabel}</span>}
          caption={last ? fmtDate(last.date) : 'start below'}
        />
      </div>

      <SectionTitle>Skill progress (best scores)</SectionTitle>
      <Card>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          {SKILL_LABELS.map(([key, label]) => (
            <Meter key={key} label={label} value={stats.bestPerSkill[key]} of={60} />
          ))}
        </CardContent>
      </Card>

      <div className="mt-6">
        <ScoreHistoryChart attempts={stats.attempts} />
      </div>

      <SectionTitle>Mock exams</SectionTitle>
      <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.examCards.map(card => (
          <ExamCard
            key={card.exam.id}
            stats={card}
            settings={db.settings}
            scheduleLabel={examSlotLabel(plan.schedule, card.exam.id)}
            onStart={resumable.start}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardPage;
