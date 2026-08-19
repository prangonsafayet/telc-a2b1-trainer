import { CalendarClock, ClipboardCheck, Trophy } from 'lucide-react';

import { Meter, PageTitle, SectionTitle } from '@/shared/components';
import { ScoreHistoryChart } from '@/shared/components/data-display/ScoreHistoryChart.tsx';
import { MODULE_META } from '@/shared/config/exam.ts';
import { useCountUp } from '@/shared/hooks/useCountUp.ts';
import { fmtDate } from '@/shared/lib/format.ts';
import { Card, CardContent } from '@/shared/ui';

import { useAccountIdentity } from '@/features/auth';
import { useProgress } from '@/features/progress';

import { ExamCard } from '../components/ExamCard.tsx';
import { LocalOnlyNotice } from '../components/LocalOnlyNotice.tsx';
import { ResumeRunNotice } from '../components/ResumeRunNotice.tsx';
import { StatTile } from '../components/StatTile.tsx';
import { useDashboardStats } from '../hooks/useDashboardStats.ts';
import { useResumableRun } from '../hooks/useResumableRun.ts';

const SKILL_LABELS = [
  ['lesen', 'Lesen'],
  ['hoeren', 'Hören'],
  ['schreiben', 'Schreiben'],
  ['sprechen', 'Sprechen']
] as const;

function Counted({ value }: { readonly value: number | null }) {
  const shown = useCountUp(value);
  return <>{shown ?? '–'}</>;
}

export function DashboardPage() {
  const { db } = useProgress();
  const stats = useDashboardStats();
  const identity = useAccountIdentity();
  const resumable = useResumableRun();

  const last = stats.lastAttempt;
  const lastLabel = last
    ? `${last.mode === 'full' ? 'Full exam' : MODULE_META[last.mode].short} · Test ${String(last.examId)}`
    : '–';

  return (
    <>
      <PageTitle
        lead={
          <>
            10 Modelltests, easiest first. Take them in order under real timing. Aim:{' '}
            <b className="text-foreground">≥ 42/60 in three skills</b> and ≥ 24/60 in the fourth = B1.
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

      <div className="stagger grid gap-3 sm:grid-cols-3">
        <StatTile
          icon={ClipboardCheck}
          label="Full exams taken"
          value={<Counted value={stats.fullAttempts.length} />}
          caption={`${String(stats.practiceCount)} module practice runs`}
        />
        <StatTile
          icon={Trophy}
          label="Best total"
          value={
            <>
              <Counted value={stats.bestTotal} />
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
          <ExamCard key={card.exam.id} stats={card} settings={db.settings} onStart={resumable.start} />
        ))}
      </div>
    </>
  );
}
