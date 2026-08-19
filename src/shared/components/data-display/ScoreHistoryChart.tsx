import { fmtDate } from '@shared/lib/format.ts';
import { buildScoreHistory, CHART_HEIGHT, GRIDLINES } from '@shared/lib/scoreHistory.ts';
import { type Attempt } from '@shared/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

interface ScoreHistoryChartProps {
  readonly attempts: readonly Attempt[];
}

/** Total points per full exam, most recent attempts last. */
export function ScoreHistoryChart({ attempts }: ScoreHistoryChartProps) {
  const bars = buildScoreHistory(attempts);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score history</CardTitle>
        <CardDescription>
          Total points per full exam. Gridlines mark the B1 (168) and A2 (96) zones — the official rule uses
          per-skill minimums, see the Exam Guide.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bars.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No full exams yet — your score history will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <div className="relative min-w-fit pl-14" style={{ height: CHART_HEIGHT + 28 }}>
              {GRIDLINES.map(line => (
                <div
                  key={line.value}
                  className="absolute inset-x-0 left-14 border-t border-dashed border-border"
                  style={{ bottom: (line.value / 240) * CHART_HEIGHT + 28 }}
                >
                  <span className="absolute -left-14 -top-2 w-12 text-right text-[11px] tabular-nums text-muted-foreground">
                    {line.label}
                  </span>
                </div>
              ))}
              <div className="flex h-full items-end gap-2">
                {bars.map((bar, index) => (
                  <div
                    key={bar.id}
                    className="group flex w-10 flex-col items-center gap-1"
                    title={`Test ${String(bar.examId)} · ${fmtDate(bar.date)} · ${String(bar.total)}/240 · ${bar.result}`}
                  >
                    <span className="text-[11px] tabular-nums text-muted-foreground transition-colors group-hover:text-foreground">
                      {bar.total}
                    </span>
                    <div
                      className="w-full origin-bottom rounded-t transition-[filter] duration-200 group-hover:brightness-110"
                      style={{
                        height: bar.heightPx,
                        background: `linear-gradient(to top, ${bar.color}, color-mix(in oklab, ${bar.color} 60%, white))`,
                        animation: `grow-up 0.6s cubic-bezier(0.22,1,0.36,1) ${String(index * 60)}ms both`
                      }}
                    />
                    <span className="text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
                      T{bar.examId}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
