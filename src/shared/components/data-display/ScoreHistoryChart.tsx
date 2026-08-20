import { fmtDate } from '@shared/lib/format.ts';
import { CHART_HEIGHT } from '@shared/lib/scoreChart.ts';
import { type ScoreChartModel } from '@shared/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

interface ScoreHistoryChartProps {
  readonly model: ScoreChartModel;
}

/** Total points per full exam, most recent attempts last. One chart for either paper. */
const ScoreHistoryChart = ({ model }: ScoreHistoryChartProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Score history</CardTitle>
      <CardDescription>{model.description}</CardDescription>
    </CardHeader>
    <CardContent>
      {model.bars.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No full exams yet — your score history will appear here.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="relative min-w-fit pl-14" style={{ height: CHART_HEIGHT + 28 }}>
            {model.gridlines.map(line => (
              <div
                key={line.value}
                className="absolute inset-x-0 left-14 border-t border-dashed border-border"
                style={{ bottom: (line.value / model.max) * CHART_HEIGHT + 28 }}
              >
                <span className="absolute -left-14 -top-2 w-12 text-right text-[11px] tabular-nums text-muted-foreground">
                  {line.label}
                </span>
              </div>
            ))}
            <div className="flex h-full items-end gap-2">
              {model.bars.map((bar, index) => (
                <div
                  key={bar.id}
                  className="group flex w-10 flex-col items-center gap-1"
                  title={`Test ${String(bar.examId)} · ${fmtDate(bar.date)} · ${String(bar.total)}/${String(model.max)} · ${bar.result}`}
                >
                  <span className="text-[11px] tabular-nums text-muted-foreground transition-colors group-hover:text-foreground">
                    {bar.total}
                  </span>
                  <div
                    className="w-full origin-bottom rounded-t transition-[filter] duration-200 group-hover:brightness-110"
                    style={{
                      height: Math.max(2, (bar.total / model.max) * CHART_HEIGHT),
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

export default ScoreHistoryChart;
