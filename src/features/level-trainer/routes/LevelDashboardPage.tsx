import { CalendarClock, Flame, Layers, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

import { PageTitle, SectionTitle } from '@shared/components';
import { TRAINERS } from '@shared/config/trainers.ts';
import { fmtDate } from '@shared/lib/format.ts';
import { type TelcLevel } from '@shared/types';
import { Alert, AlertDescription, Button, Card, CardContent, Progress } from '@shared/ui';

import { useStartAttempt } from '@features/exam';
import { describeClamp, examSlotLabel, useTrainerSchedule } from '@features/plan';

import TelcExamCard from '../components/exams/TelcExamCard.tsx';
import LevelStatTile from '../components/stats/LevelStatTile.tsx';
import TelcScoreChart from '../components/stats/TelcScoreChart.tsx';
import WeakAreasCard from '../components/stats/WeakAreasCard.tsx';
import { useLevelStats } from '../hooks/useLevelStats.ts';
import { CATEGORY_META, STUDY_CATEGORIES } from '../lib/studyItems.ts';

interface LevelDashboardPageProps {
  readonly level: TelcLevel;
}

const LevelDashboardPage = ({ level }: LevelDashboardPageProps) => {
  const { doc, stats, weakAreas } = useLevelStats(level);
  const schedule = useTrainerSchedule(level);
  const start = useStartAttempt(level);
  const trainer = TRAINERS[level];
  const base = trainer.basePath;
  const notice = schedule ? describeClamp(schedule) : null;
  const masteredPercent =
    stats.mastery.total > 0 ? Math.round((stats.mastery.mastered / stats.mastery.total) * 100) : 0;

  return (
    <>
      <PageTitle
        lead={
          <>
            {trainer.name}: {String(stats.examCards.length)} Modelltests in the official format, plus
            vocabulary and grammar training. Pass rule:{' '}
            <b className="text-foreground">≥ 135/225 written and ≥ 45/75 oral</b> — 60% in each part, judged
            separately.
          </>
        }
      >
        {trainer.name}
      </PageTitle>

      {notice ? (
        <Alert className="mb-4">
          <CalendarClock aria-hidden />
          <AlertDescription>{notice} Set the date in Settings.</AlertDescription>
        </Alert>
      ) : null}

      <div className="stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <LevelStatTile
          icon={Flame}
          label="Streak"
          value={stats.streak}
          caption={stats.streak === 1 ? 'day in a row' : 'days in a row'}
        />
        <LevelStatTile
          icon={Layers}
          label="Due today"
          value={stats.mastery.due}
          caption={`${String(stats.mastery.total)} items in the bank`}
        />
        <LevelStatTile
          icon={Trophy}
          label="Best total"
          value={
            stats.bestTotal !== null ? (
              <>
                {stats.bestTotal}
                <span className="text-base font-normal text-muted-foreground">/300</span>
              </>
            ) : (
              '–'
            )
          }
          caption={`${String(stats.fullAttempts.length)} full exams taken`}
        />
        <LevelStatTile
          icon={CalendarClock}
          label="Last activity"
          value={
            <span className="text-lg">
              {stats.lastAttempt ? `Test ${String(stats.lastAttempt.examId)}` : '–'}
            </span>
          }
          caption={stats.lastAttempt ? fmtDate(stats.lastAttempt.date) : 'start below'}
        />
      </div>

      <div className="mt-6">
        <WeakAreasCard areas={weakAreas} basePath={base} />
      </div>

      <SectionTitle>Vocabulary &amp; grammar mastery</SectionTitle>
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium">
              {stats.mastery.mastered}/{stats.mastery.total} items mastered
            </span>
            <span className="tabular-nums text-muted-foreground">{masteredPercent}%</span>
          </div>
          <Progress value={masteredPercent} />
          <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {STUDY_CATEGORIES.map(category => {
              const counts = stats.categoryMastery[category];
              const percent = counts.total > 0 ? (counts.mastered / counts.total) * 100 : 0;
              return (
                <div key={category} className="flex items-center gap-3 text-sm">
                  <span className="w-44 shrink-0">{CATEGORY_META[category].label}</span>
                  <Progress value={percent} className="h-1.5" />
                  <span className="w-16 shrink-0 text-right tabular-nums text-muted-foreground">
                    {counts.mastered}/{counts.total}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link to={`${base}/practice`}>Open the practice hub ▸</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to={`${base}/learn`}>Study plan ▸</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <TelcScoreChart attempts={stats.attempts} />
      </div>

      <SectionTitle>Mock exams</SectionTitle>
      <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.examCards.map(card => (
          <TelcExamCard
            key={card.exam.id}
            level={level}
            stats={card}
            settings={doc.settings}
            scheduleLabel={examSlotLabel(schedule, card.exam.id)}
            onStart={start}
          />
        ))}
        {stats.examCards.length === 0 ? (
          <p className="text-sm text-muted-foreground">The Modelltests for this level are on their way.</p>
        ) : null}
      </div>
    </>
  );
};

export default LevelDashboardPage;
