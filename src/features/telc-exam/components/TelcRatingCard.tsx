import { Multiline, type SpeakingPart } from '@shared/components';
import { type TelcExam } from '@shared/types';
import { Button, Card, CardContent, CardHeader, CardTitle, Separator, Slider } from '@shared/ui';

import { type TelcRecordingMap } from '../hooks/useTelcRun.ts';
import { useTelcSelfRating } from '../hooks/useTelcSelfRating.ts';

interface TelcRatingCardProps {
  readonly module: 'schreiben' | 'sprechen';
  readonly exam: TelcExam;
  readonly writtenText: string;
  /** Which writing task was worked on (B2 offers two). */
  readonly writingTask: number;
  readonly recordings: TelcRecordingMap;
  readonly onConfirm: (score: number) => void;
}

const SPEAKING_PARTS: readonly SpeakingPart[] = ['t1', 't2', 't3'];

/** Schreiben and Sprechen are self-scored against the sample answer / Redemittel. */
export const TelcRatingCard = ({
  module,
  exam,
  writtenText,
  writingTask,
  recordings,
  onConfirm
}: TelcRatingCardProps) => {
  const { criteria, values, total, max, setValue } = useTelcSelfRating(module);
  const isWriting = module === 'schreiben';
  const task = exam.schreiben.tasks[writingTask] ?? exam.schreiben.tasks[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {isWriting ? 'Schreiben' : 'Sprechen'} — self-scoring (max {max})
        </h2>
        <p className="mt-1 text-muted-foreground">
          Compare honestly with the sample, then move the sliders. 0 = not at all · 5 = fully. Score = sum ×
          3.
        </p>
      </div>

      {isWriting && task ? (
        <Card>
          <CardHeader>
            <CardTitle>Your text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/40 p-4 leading-relaxed">
              <Multiline text={writtenText || '(empty)'} />
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Sample answer (Musterlösung)</h3>
              <div className="rounded-lg border-l-4 border-[color:var(--success)] bg-[color-mix(in_oklab,var(--success)_8%,transparent)] p-4 leading-relaxed">
                <Multiline text={task.musterloesung} />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              💡 {exam.schreiben.tipps}
              <ul className="mt-1 list-disc pl-5">
                {task.leitpunkte.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your recordings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {SPEAKING_PARTS.map((part, index) => {
              const url = recordings[part];
              return url ? (
                <div key={part} className="flex flex-wrap items-center gap-3 text-sm">
                  <span>Teil {index + 1}:</span>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption -- the learner's
                      own recording; there is no transcript to caption it with. */}
                  <audio controls src={url} className="h-8" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground" key={part}>
                  Teil {index + 1}: no recording
                </p>
              );
            })}
            <p className="pt-2 text-sm text-muted-foreground">
              💡 Rate against the Redemittel: did you present clearly, react to your partner, and reach a
              result in Teil 3?
            </p>
          </CardContent>
        </Card>
      )}

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
    </div>
  );
};
