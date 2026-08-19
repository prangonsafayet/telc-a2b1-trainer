import { Check, X } from 'lucide-react';

import { Transcript } from '@/shared/components';
import { cn } from '@/shared/lib/cn.ts';

import { type ReviewEntry } from '../lib/reviewItems.ts';

interface ReviewEntryCardProps {
  readonly entry: ReviewEntry;
}

export function ReviewEntryCard({ entry }: ReviewEntryCardProps) {
  const { correct } = entry;

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
          <div className="font-medium leading-relaxed">{entry.question}</div>
          <div className={cn('text-sm', correct ? 'text-muted-foreground' : 'text-destructive')}>
            Your answer: {entry.given ?? '—'}
          </div>
          {correct ? null : (
            <div className="text-sm font-semibold text-[color:var(--success-foreground)]">
              Correct: {entry.expected}
            </div>
          )}
          {entry.transcript ? <Transcript audio={entry.transcript} /> : null}
        </div>
      </div>
    </div>
  );
}
