import { CriteriaRatingPanel, Multiline } from '@shared/components';
import { type Exam } from '@shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui';

import { type RecordingMap, type SpeakingPart } from '@features/exam/hooks/useExamRun.ts';
import { useSelfRating } from '@features/exam/hooks/useSelfRating.ts';

interface SelfRatingCardProps {
  readonly module: 'schreiben' | 'sprechen';
  readonly exam: Exam;
  readonly writtenText: string;
  readonly recordings: RecordingMap;
  readonly onConfirm: (score: number) => void;
}

const SPEAKING_PARTS: readonly SpeakingPart[] = ['t1', 't2', 't3'];

/** Schreiben and Sprechen are self-scored against the sample answer / Redemittel. */
const SelfRatingCard = ({ module, exam, writtenText, recordings, onConfirm }: SelfRatingCardProps) => {
  const { criteria, values, total, setValue } = useSelfRating(module);
  const isWriting = module === 'schreiben';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {isWriting ? 'Schreiben' : 'Sprechen'} — self-scoring (max 60)
        </h2>
        <p className="mt-1 text-muted-foreground">
          Compare honestly with the sample, then move the sliders. 0 = not at all · 5 = fully. Score = sum ×
          3.
        </p>
      </div>

      {isWriting ? (
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
                <Multiline text={exam.schreiben.musterloesung} />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              💡 {exam.schreiben.tipps} — Check: did you cover all three points?
              <ul className="mt-1 list-disc pl-5">
                {exam.schreiben.points.map((point, index) => (
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
              💡 Rate against the Redemittel: did you use suggestion phrases, react, ask back, reach a result
              in Teil 3?
            </p>
          </CardContent>
        </Card>
      )}

      <CriteriaRatingPanel
        criteria={criteria}
        values={values}
        total={total}
        max={60}
        setValue={setValue}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default SelfRatingCard;
