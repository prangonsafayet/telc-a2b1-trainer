import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { fmtDate } from '@/lib/util.js';

const H = 160;
const GRIDLINES = [
  { v: 240, label: '240' },
  { v: 168, label: '168 · B1' },
  { v: 96, label: '96 · A2' }
];

/* Total points per full exam, most recent 12 attempts. */
export default function HistoryChart({ attempts }) {
  const fa = attempts.filter(a => a.mode === 'full').slice(-12);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score history</CardTitle>
        <CardDescription>
          Total points per full exam. Gridlines mark the B1 (168) and A2 (96) zones — the official rule uses per-skill
          minimums, see the Exam Guide.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!fa.length ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No full exams yet — your score history will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <div className="relative min-w-fit pl-14" style={{ height: H + 28 }}>
              {GRIDLINES.map(g => (
                <div key={g.v} className="absolute inset-x-0 left-14 border-t border-dashed border-border" style={{ bottom: (g.v / 240) * H + 28 }}>
                  <span className="absolute -left-14 -top-2 w-12 text-right text-[11px] tabular-nums text-muted-foreground">
                    {g.label}
                  </span>
                </div>
              ))}
              <div className="flex h-full items-end gap-2">
                {fa.map((a, i) => {
                  /* Colour each bar by its grade so the trend reads at a glance. */
                  const tone =
                    a.result === 'B1' ? 'var(--success)' : a.result === 'A2' ? 'var(--warning)' : 'var(--destructive)';
                  return (
                    <div
                      key={a.id}
                      className="group flex w-10 flex-col items-center gap-1"
                      title={`Test ${a.examId} · ${fmtDate(a.date)} · ${a.total}/240 · ${a.result}`}
                    >
                      <span className="text-[11px] tabular-nums text-muted-foreground transition-colors group-hover:text-foreground">
                        {a.total}
                      </span>
                      <div
                        className="w-full origin-bottom rounded-t transition-[filter] duration-200 group-hover:brightness-110"
                        style={{
                          height: Math.max(2, (a.total / 240) * H),
                          background: `linear-gradient(to top, ${tone}, color-mix(in oklab, ${tone} 60%, white))`,
                          animation: `grow-up 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms both`
                        }}
                      />
                      <span className="text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
                        T{a.examId}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
