import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Home, ListChecks, RotateCcw } from 'lucide-react';
import { Meter, useCountUp } from '@/components/common.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card.jsx';
import { examById } from '@/data/exams.js';
import { MODULES, MOD_META, modMinutes } from '@/lib/constants.js';
import { newRun, saveRun } from '@/lib/runState.js';
import { useDB } from '@/lib/store.jsx';
import { fmtClock } from '@/lib/util.js';
import { cn } from '@/lib/utils';

function CountedTotal({ value }) {
  const n = useCountUp(value, 900);
  return <b>{n}</b>;
}

export default function Results() {
  const { attemptId } = useParams();
  const { db } = useDB();
  const navigate = useNavigate();
  const a = db.attempts.find(x => String(x.id) === String(attemptId));

  if (!a) return <Navigate to="/history" replace />;

  const ex = examById(a.examId);
  const s = a.scores || {};
  const full = a.mode === 'full';
  const timeTotal = Object.values(a.times || {}).reduce((x, y) => x + y, 0);
  const gradeTone =
    a.result === 'B1' ? 'text-[color:var(--success-foreground)]'
      : a.result === 'A2' ? 'text-[color:var(--warning-foreground)]'
        : 'text-destructive';

  const retry = () => {
    saveRun(newRun(a.examId, a.mode, a.mode === 'full' ? MODULES.slice() : [a.mode]));
    navigate(`/exam/${a.examId}/${a.mode}`);
  };

  return (
    <>
      <Card className="relative animate-pop-in overflow-hidden text-center shadow-md">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1"
          style={{
            background: full
              ? a.result === 'B1' ? 'var(--success)' : a.result === 'A2' ? 'var(--warning)' : 'var(--destructive)'
              : 'var(--primary)'
          }}
        />
        <CardHeader className="items-center">
          <CardDescription>
            {ex.title} · {ex.level} · {full ? 'Full exam' : `${MOD_META[a.mode].name} (practice)`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {full ? (
            <>
              <div className={cn('text-6xl font-bold tracking-tight', gradeTone)}>{a.result}</div>
              <div className="text-lg tabular-nums">
                <CountedTotal value={a.total} /> / 240 points · time used {fmtClock(timeTotal)}
              </div>
              <p className="text-sm text-muted-foreground">
                B1 rule: ≥42/60 in three skills + ≥24/60 in the fourth. A2 rule: ≥24/60 in three + ≥6/60 in the fourth.
              </p>
            </>
          ) : (
            <>
              <div className="text-5xl font-bold tracking-tight tabular-nums">
                {Object.values(s)[0] ?? (a.sb ? a.sb.percent + '%' : '–')}
                {Object.keys(s).length ? <span className="text-2xl font-normal text-muted-foreground">/60</span> : null}
              </div>
              <div className="text-muted-foreground">time used {fmtClock(timeTotal)}</div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6 animate-fade-up" style={{ animationDelay: '120ms' }}>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          {s.lesen != null ? <Meter label="Lesen" value={s.lesen} of={60} colorByScore /> : null}
          {s.hoeren != null ? <Meter label="Hören" value={s.hoeren} of={60} colorByScore /> : null}
          {s.schreiben != null ? <Meter label="Schreiben (self)" value={s.schreiben} of={60} colorByScore /> : null}
          {s.sprechen != null ? <Meter label="Sprechen (self)" value={s.sprechen} of={60} colorByScore /> : null}
          {a.sb ? <Meter label="Sprachbausteine" value={a.sb.correct} of={17} colorByScore /> : null}
        </CardContent>
      </Card>

      {a.times && Object.keys(a.times).length ? (
        <Card className="mt-4">
          <CardContent className="text-sm">
            <b>Time per module:</b>{' '}
            {Object.entries(a.times)
              .map(([m, t]) => `${MOD_META[m].short}: ${fmtClock(t)} / ${modMinutes(m, db.settings)}:00`)
              .join(' · ')}
          </CardContent>
        </Card>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild><Link to={`/review/${a.id}`}><ListChecks /> Review answers &amp; transcripts</Link></Button>
        <Button variant="outline" onClick={retry}><RotateCcw /> Retry this exam</Button>
        <Button asChild variant="ghost"><Link to="/"><Home /> Dashboard</Link></Button>
      </div>
    </>
  );
}
