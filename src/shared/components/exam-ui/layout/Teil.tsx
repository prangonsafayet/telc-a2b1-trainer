import { type ReactNode } from 'react';

import { Badge } from '@shared/ui';

interface TeilProps {
  readonly title: string;
  readonly chip?: string;
  /** The German task instruction, shown in italics above the items. */
  readonly anweisung?: string;
  readonly children: ReactNode;
}

/** One "Teil 1 — …" block of a module. */
const Teil = ({ title, chip, anweisung, children }: TeilProps) => (
  <section className="animate-fade-up mb-6 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-base font-semibold">{title}</h3>
      {chip ? <Badge variant="secondary">{chip}</Badge> : null}
    </div>
    {anweisung ? <p className="mb-4 text-sm italic text-muted-foreground">{anweisung}</p> : null}
    {children}
  </section>
);

export default Teil;
