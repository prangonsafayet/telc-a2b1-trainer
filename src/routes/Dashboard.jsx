import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarClock, ClipboardCheck, LogIn, PlayCircle, RotateCcw, TriangleAlert, Trophy } from 'lucide-react';
import HistoryChart from '@/components/HistoryChart.jsx';
import { Meter, PageTitle, SectionTitle, difficultyVariant, resultVariant, useCountUp } from '@/components/common.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { EXAMS } from '@/data/exams.js';
import { MODULES, MOD_META, modMinutes } from '@/lib/constants.js';
import { toast } from 'sonner';
import { clearRun, loadRun, newRun, saveRun } from '@/lib/runState.js';
import { useDB } from '@/lib/store.jsx';
import { useSync } from '@/lib/sync-context.jsx';
import { fmtDate } from '@/lib/util.js';
import { cn } from '@/lib/utils';

const SKILLS = [['lesen', 'Lesen'], ['hoeren', 'Hören'], ['schreiben', 'Schreiben'], ['sprechen', 'Sprechen']];

function Stat({ label, value, sub, icon: Icon }) {
  return (
    <Card className="card-hover gap-2 overflow-hidden py-4">
      <CardContent className="relative px-4">
        {Icon ? (
          <Icon className="absolute right-0 top-0 size-10 text-primary/10" strokeWidth={1.5} />
        ) : null}
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>
      </CardContent>
    </Card>
  );
}

/* Counted-up integer, used for the headline numbers. */
function Counted({ value }) {
  const n = useCountUp(value);
  return <>{n ?? '–'}</>;
}

export default function Dashboard() {
  const { db } = useDB();
  const sync = useSync();
  const navigate = useNavigate();
  const [running, setRunning] = useState(() => loadRun());
  const signedIn = sync.configured && !!sync.user;

  const attempts = db.attempts;
  const fa = attempts.filter(a => a.mode === 'full');
  const best = fa.length ? Math.max(...fa.map(a => a.total)) : null;
  const last = attempts.length ? attempts[attempts.length - 1] : null;

  const bestSkill = k => {
    const rel = attempts.filter(a => a.scores && a.scores[k] != null);
    return rel.length ? Math.max(...rel.map(a => a.scores[k])) : null;
  };
  const bestFor = examId => {
    const list = fa.filter(a => a.examId === examId);
    return list.length ? list.reduce((m, a) => (a.total > m.total ? a : m)) : null;
  };

  /* Always start from a clean slate — the saved run only exists to survive refreshes. */
  const start = (examId, mode) => {
    saveRun(newRun(examId, mode, mode === 'full' ? MODULES.slice() : [mode]));
    navigate(`/exam/${examId}/${mode}`);
  };

  return (
    <>
      <PageTitle lead={<>10 Modelltests, easiest first. Take them in order under real timing. Aim: <b className="text-foreground">≥ 42/60 in three skills</b> and ≥ 24/60 in the fourth = B1.</>}>
        Dashboard
      </PageTitle>

      {!signedIn ? (
        <Card className="animate-fade-up mb-6 border-l-4 border-l-[color:var(--warning)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TriangleAlert className="size-4 text-[color:var(--warning-foreground)]" />
              You are not signed in — progress is saved only in this browser
            </CardTitle>
            <CardDescription>
              {attempts.length
                ? `Your ${attempts.length} saved attempt(s) live in this browser's storage.`
                : 'Attempts you record will live in this browser\'s storage.'}{' '}
              Clearing site data, private browsing, or moving to another device or browser will lose them.
              {sync.configured
                ? ' Signing in backs everything up and syncs it across your devices — no password, just an email link.'
                : ' Cloud sync is not configured for this build (see HOSTING.md), so export a backup file regularly.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sync.configured ? (
              <Button asChild size="sm"><Link to="/settings"><LogIn /> Sign in to sync</Link></Button>
            ) : null}
            <Button asChild size="sm" variant="outline"><Link to="/history">Export a backup</Link></Button>
          </CardContent>
        </Card>
      ) : null}

      {running ? (
        <Card className="animate-pop-in mb-6 border-l-4 border-l-primary shadow-md">
          <CardHeader>
            <CardTitle>You have an exam in progress</CardTitle>
            <CardDescription>
              Modelltest {running.examId} · {running.mode === 'full' ? 'full exam' : MOD_META[running.mode].short} — module{' '}
              {running.idx + 1} of {running.queue.length}. Your answers and remaining time were saved.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button onClick={() => navigate(`/exam/${running.examId}/${running.mode}`)}>
              <PlayCircle /> Resume
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                clearRun();
                setRunning(null);
                toast.info('In-progress attempt discarded.');
              }}
            >
              Discard it
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="stagger grid gap-3 sm:grid-cols-3">
        <Stat
          icon={ClipboardCheck}
          label="Full exams taken"
          value={<Counted value={fa.length} />}
          sub={`${attempts.length - fa.length} module practice runs`}
        />
        <Stat
          icon={Trophy}
          label="Best total"
          value={<>{best != null ? <Counted value={best} /> : '–'}<span className="text-base font-normal text-muted-foreground">/240</span></>}
          sub={best != null ? (best >= 168 ? 'B1 territory 🎉' : best >= 96 ? 'A2 zone — push to 168' : 'keep training') : 'no full exam yet'}
        />
        <Stat
          icon={CalendarClock}
          label="Last activity"
          value={<span className="text-lg">{last ? `${MOD_META[last.mode] ? MOD_META[last.mode].short : 'Full exam'} · Test ${last.examId}` : '–'}</span>}
          sub={last ? fmtDate(last.date) : 'start below'}
        />
      </div>

      <SectionTitle>Skill progress (best scores)</SectionTitle>
      <Card>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          {SKILLS.map(([k, label]) => (
            <Meter key={k} label={label} value={bestSkill(k)} of={60} />
          ))}
        </CardContent>
      </Card>

      <div className="mt-6">
        <HistoryChart attempts={attempts} />
      </div>

      <SectionTitle>Mock exams</SectionTitle>
      <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMS.map(ex => {
          const b = bestFor(ex.id);
          const n = attempts.filter(a => a.examId === ex.id).length;
          const accent =
            ex.difficulty === 'easy' ? 'var(--success)' : ex.difficulty === 'medium' ? 'var(--warning)' : 'var(--primary)';
          return (
            <Card key={ex.id} className="card-hover relative gap-4 overflow-hidden">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{ex.title}</CardTitle>
                  <Badge variant={difficultyVariant(ex.difficulty)}>{ex.level}</Badge>
                </div>
                <CardDescription>{ex.theme}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  {b ? (
                    <>
                      <Trophy className="size-4 text-muted-foreground" />
                      <span>Best: <b className="tabular-nums">{b.total}/240</b></span>
                      <Badge variant={resultVariant(b.result)}>{b.result}</Badge>
                    </>
                  ) : (
                    <span className="text-muted-foreground">{n ? `${n} practice run(s)` : 'Not attempted yet'}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button className="w-full" onClick={() => start(ex.id, 'full')}>
                    {b || n ? <><RotateCcw /> Retry full exam</> : <><PlayCircle /> Start full exam</>}
                  </Button>
                  <Select value="" onValueChange={m => start(ex.id, m)}>
                    <SelectTrigger size="sm" className="w-full">
                      <SelectValue placeholder="Practice one module…" />
                    </SelectTrigger>
                    <SelectContent>
                      {MODULES.map(m => (
                        <SelectItem key={m} value={m}>
                          {MOD_META[m].short} ({modMinutes(m, db.settings)} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
