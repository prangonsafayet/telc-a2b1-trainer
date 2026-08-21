import { Button, Card, CardContent, Separator, Slider } from '@shared/ui';

interface CriteriaRatingPanelProps {
  /** [name, hint] pairs, each rated 0–5. */
  readonly criteria: readonly (readonly [string, string])[];
  readonly values: readonly number[];
  readonly total: number;
  readonly max: number;
  readonly setValue: (index: number, value: number) => void;
  readonly onConfirm: (score: number) => void;
}

/** The self-scoring sliders every trainer's Schreiben/Sprechen rating screen shares. */
const CriteriaRatingPanel = ({
  criteria,
  values,
  total,
  max,
  setValue,
  onConfirm
}: CriteriaRatingPanelProps) => (
  <Card>
    <CardContent className="space-y-5">
      {criteria.map(([name, hint], index) => (
        <div key={name} className="grid items-center gap-3 sm:grid-cols-[1fr_auto]">
          <div>
            <b className="text-sm">{name}</b>
            <div className="text-xs text-muted-foreground">{hint}</div>
          </div>
          <div className="flex items-center gap-3 sm:w-56">
            <Slider
              min={0}
              max={5}
              step={1}
              aria-label={name}
              value={[values[index] ?? 0]}
              onValueChange={([next]) => {
                setValue(index, next ?? 0);
              }}
            />
            <span className="w-5 text-right font-semibold tabular-nums">{values[index]}</span>
          </div>
        </div>
      ))}
      <Separator />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm">
          Module score: <b className="text-lg tabular-nums">{total}</b>/{max}
        </p>
        <Button
          onClick={() => {
            onConfirm(total);
          }}
        >
          Confirm score ▸
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default CriteriaRatingPanel;
