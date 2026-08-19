import { type ReactNode } from 'react';

import { cn } from '@shared/lib/cn.ts';
import { Badge } from '@shared/ui';

interface TeilProps {
  readonly title: string;
  readonly chip?: string;
  /** The German task instruction, shown in italics above the items. */
  readonly anweisung?: string;
  readonly children: ReactNode;
}

/** One "Teil 1 — …" block of a module. */
export const Teil = ({ title, chip, anweisung, children }: TeilProps) => (
  <section className="animate-fade-up mb-6 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-base font-semibold">{title}</h3>
      {chip ? <Badge variant="secondary">{chip}</Badge> : null}
    </div>
    {anweisung ? <p className="mb-4 text-sm italic text-muted-foreground">{anweisung}</p> : null}
    {children}
  </section>
);

interface QuestionItemProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export const QuestionItem = ({ children, className }: QuestionItemProps) => (
  <div className={cn('space-y-2 border-t py-4 first:border-t-0', className)}>{children}</div>
);

export const QuestionText = ({ children }: { readonly children: ReactNode }) => (
  <div className="font-medium leading-relaxed">{children}</div>
);

interface ReadingTextProps {
  readonly title?: string;
  readonly children: ReactNode;
}

/** A reading passage or the Teil-5 note sheet. */
export const ReadingText = ({ title, children }: ReadingTextProps) => (
  <div className="my-4 rounded-lg border bg-muted/40 p-4 leading-relaxed">
    {title ? <div className="mb-2 font-semibold">{title}</div> : null}
    {children}
  </div>
);

interface CalloutProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export const Callout = ({ children, className }: CalloutProps) => (
  <div className={cn('mb-4 rounded-lg border-l-4 border-primary bg-accent/40 p-3 text-sm', className)}>
    {children}
  </div>
);
