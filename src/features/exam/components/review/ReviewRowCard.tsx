import { Check, X } from 'lucide-react';

import { Multiline, Transcript } from '@shared/components';
import { cn } from '@shared/lib/cn.ts';

import { type ReviewRow } from '@features/exam/types/examFormat.ts';

interface ReviewRowCardProps {
  readonly row: ReviewRow;
}

/** One reviewed item, green when it was right and red when it was not. */
const ReviewRowCard = ({ row }: ReviewRowCardProps) => {
  const { correct } = row;

  return (
    <div
      className={cn(
        'animate-fade-up my-2 rounded-lg border border-l-4 p-3 transition-colors',
        correct
          ? 'border-l-[color:var(--success)] bg-[color-mix(in_oklab,var(--success)_5%,transparent)]'
          : 'border-l-destructive bg-[color-mix(in_oklab,var(--destructive)_5%,transparent)]'
      )}
    >
      <div className="flex items-start gap-2">
        <span
          className={cn(
            'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full',
            correct
              ? 'bg-[color:var(--success)]/15 text-[color:var(--success)]'
              : 'bg-destructive/15 text-destructive'
          )}
        >
          {correct ? <Check className="size-3.5" /> : <X className="size-3.5" />}
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{row.label}</div>
          {row.prompt ? (
            <div className="font-medium leading-relaxed">
              <Multiline text={row.prompt} />
            </div>
          ) : null}
          <div className={cn('text-sm', correct ? 'text-muted-foreground' : 'text-destructive')}>
            Your answer: {row.given ?? '—'}
          </div>
          {correct ? null : (
            <div className="text-sm font-semibold text-[color:var(--success-foreground)]">
              Correct: {row.expected}
            </div>
          )}
          {row.audio ? <Transcript audio={row.audio} /> : null}
        </div>
      </div>
    </div>
  );
};

export default ReviewRowCard;
