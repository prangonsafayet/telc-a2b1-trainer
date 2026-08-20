import { CriteriaRatingPanel, Multiline } from '@shared/components';
import { textAnswer, WRITING_ANSWER_KEY } from '@shared/lib/answers.ts';
import { type AnswerMap, type ExamPaper, type RecordingMap } from '@shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/ui';

import { SPEAKING_PARTS } from '@features/exam/config/run.ts';
import { useSelfRating } from '@features/exam/hooks/useSelfRating.ts';
import { type ExamFormat, type RunSettings, type StoredAttempt } from '@features/exam/types/examFormat.ts';
import { type RatedModule } from '@features/exam/types/run.ts';

interface SelfRatingCardProps<
  TExam extends ExamPaper,
  TSettings extends RunSettings,
  TAttempt extends StoredAttempt
> {
  readonly format: ExamFormat<TExam, TSettings, TAttempt>;
  readonly module: RatedModule;
  readonly exam: TExam;
  readonly answers: AnswerMap;
  readonly recordings: RecordingMap;
  readonly onConfirm: (score: number) => void;
}

/** Schreiben and Sprechen are self-scored against the sample answer / Redemittel. */
const SelfRatingCard = <
  TExam extends ExamPaper,
  TSettings extends RunSettings,
  TAttempt extends StoredAttempt
>({
  format,
  module,
  exam,
  answers,
  recordings,
  onConfirm
}: SelfRatingCardProps<TExam, TSettings, TAttempt>) => {
  const { criteria, values, total, max, setValue } = useSelfRating(format.rating[module]);
  const sample = format.scoring.writingSample(exam, answers);
  const writtenText = textAnswer(answers, WRITING_ANSWER_KEY);
  const isWriting = module === 'schreiben';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {format.moduleShort(module)} — self-scoring (max {max})
        </h2>
        <p className="mt-1 text-muted-foreground">
          Compare honestly with the sample, then move the sliders. 0 = not at all · 5 = fully. Score = sum ×{' '}
          {format.rating[module].scale}.
        </p>
      </div>

      {isWriting && sample ? (
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
                <Multiline text={sample.musterloesung} />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              💡 {sample.tipps}
              <ul className="mt-1 list-disc pl-5">
                {sample.points.map((point, index) => (
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
            <p className="pt-2 text-sm text-muted-foreground">💡 {format.speakingHint}</p>
          </CardContent>
        </Card>
      )}

      <CriteriaRatingPanel
        criteria={criteria}
        values={values}
        total={total}
        max={max}
        setValue={setValue}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default SelfRatingCard;
