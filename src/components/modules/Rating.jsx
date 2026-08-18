import { useState } from 'react';
import { Multiline } from '@/components/common.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { RATING_CRITERIA } from '@/lib/constants.js';

/* Schreiben and Sprechen are self-scored against the sample answer / Redemittel:
   4 criteria × 0–5, times 3 = a 60-point module score. */
export default function Rating({ mod, exam, text, recordings, onDone }) {
  const crit = RATING_CRITERIA[mod];
  const [vals, setVals] = useState(() => crit.map(() => 3));
  const isW = mod === 'schreiben';
  const total = vals.reduce((a, b) => a + b, 0) * 3;

  const setVal = (i, v) => setVals(prev => prev.map((x, j) => (j === i ? v : x)));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {isW ? 'Schreiben' : 'Sprechen'} — self-scoring (max 60)
        </h2>
        <p className="mt-1 text-muted-foreground">
          Compare honestly with the sample, then move the sliders. 0 = not at all · 5 = fully. Score = sum × 3.
        </p>
      </div>

      {isW ? (
        <Card>
          <CardHeader><CardTitle>Your text</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-muted/40 p-4 leading-relaxed">
              <Multiline text={text || '(empty)'} />
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Sample answer (Musterlösung)</h3>
              <div className="rounded-lg border-l-4 border-[color:var(--success)] bg-[color-mix(in_oklab,var(--success)_8%,transparent)] p-4 leading-relaxed">
                <Multiline text={exam.schreiben.musterloesung} />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              💡 {exam.schreiben.tipps} — Check: did you cover all three points?
              <ul className="mt-1 list-disc pl-5">
                {exam.schreiben.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader><CardTitle>Your recordings</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {['t1', 't2', 't3'].map((p, i) =>
              recordings[p] ? (
                <div key={p} className="flex flex-wrap items-center gap-3 text-sm">
                  <span>Teil {i + 1}:</span>
                  <audio controls src={recordings[p]} className="h-8" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground" key={p}>Teil {i + 1}: no recording</p>
              )
            )}
            <p className="pt-2 text-sm text-muted-foreground">
              💡 Rate against the Redemittel: did you use suggestion phrases, react, ask back, reach a result in Teil 3?
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="space-y-5">
          {crit.map(([name, hint], i) => (
            <div key={name} className="grid items-center gap-3 sm:grid-cols-[1fr_auto]">
              <div>
                <b className="text-sm">{name}</b>
                <div className="text-xs text-muted-foreground">{hint}</div>
              </div>
              <div className="flex items-center gap-3 sm:w-56">
                <Slider min={0} max={5} step={1} value={[vals[i]]} onValueChange={([v]) => setVal(i, v)} />
                <span className="w-5 text-right font-semibold tabular-nums">{vals[i]}</span>
              </div>
            </div>
          ))}
          <Separator />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">
              Module score: <b className="text-lg tabular-nums">{total}</b>/60
            </p>
            <Button onClick={() => onDone(total)}>Confirm score ▸</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
