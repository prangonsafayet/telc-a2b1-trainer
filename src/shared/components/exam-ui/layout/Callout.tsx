import { type ReactNode } from 'react';

import { cn } from '@shared/lib/cn.ts';

interface CalloutProps {
  readonly children: ReactNode;
  readonly className?: string;
}

const Callout = ({ children, className }: CalloutProps) => (
  <div className={cn('mb-4 rounded-lg border-l-4 border-primary bg-accent/40 p-3 text-sm', className)}>
    {children}
  </div>
);

export default Callout;
