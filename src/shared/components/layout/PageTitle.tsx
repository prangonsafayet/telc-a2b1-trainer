import { type ReactNode } from 'react';

interface PageTitleProps {
  readonly children: ReactNode;
  readonly lead?: ReactNode;
}

export function PageTitle({ children, lead }: PageTitleProps) {
  return (
    <div className="mb-6">
      <h1 className="bg-gradient-to-br from-foreground to-foreground/65 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
        {children}
      </h1>
      {lead ? <p className="mt-2 max-w-3xl text-muted-foreground">{lead}</p> : null}
    </div>
  );
}
