import { SINGLE_LEVEL_TOTAL_MAX } from '@shared/config/singleLevelExam.ts';
import { fmtDate } from '@shared/lib/format.ts';
import { type SingleLevelAttempt } from '@shared/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

interface SingleLevelScoreChartProps {
  readonly attempts: readonly SingleLevelAttempt[];
}

const CHART_HEIGHT = 160;
/** 180/300 is what 60% written + 60% oral adds up to — the floor of any pass. */
const PASS_LINE = 180;

/** Total points per full exam, most recent attempts last. */
const SingleLevelScoreChart = ({ attempts }: SingleLevelScoreChartProps) => {
  const bars = attempts
    .filter(attempt => attempt.mode === 'full' && typeof attempt.total === 'number')
    .map(attempt => ({
      id: attempt.id,
      examId: attempt.examId,
      date: attempt.date,
      total: attempt.total ?? 0,
      result: attempt.result ?? '',
      color: attempt.result === 'Bestanden' ? 'var(--success)' : 'var(--destructive)'
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Score history</CardTitle>
        <CardDescription>
          Total points per full exam out of 300. The gridline marks 180 — the minimum a pass adds up to (60%
          written and 60% oral, judged separately).
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
              <div
                className="absolute inset-x-0 left-14 border-t border-dashed border-border"
                style={{ bottom: (PASS_LINE / SINGLE_LEVEL_TOTAL_MAX) * CHART_HEIGHT + 28 }}
              >
                <span className="absolute -left-14 -top-2 w-12 text-right text-[11px] tabular-nums text-muted-foreground">
                  180
                </span>
              </div>
              <div className="flex h-full items-end gap-2">
                {bars.map((bar, index) => (
                  <div
                    key={bar.id}
                    className="group flex w-10 flex-col items-center gap-1"
                    title={`Test ${String(bar.examId)} · ${fmtDate(bar.date)} · ${String(bar.total)}/300 · ${bar.result}`}
                  >
                    <span className="text-[11px] tabular-nums text-muted-foreground transition-colors group-hover:text-foreground">
                      {bar.total}
                    </span>
                    <div
                      className="w-full origin-bottom rounded-t transition-[filter] duration-200 group-hover:brightness-110"
                      style={{
                        height: Math.max(4, (bar.total / SINGLE_LEVEL_TOTAL_MAX) * CHART_HEIGHT),
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
};

export default SingleLevelScoreChart;
