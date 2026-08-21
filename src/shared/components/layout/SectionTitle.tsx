import { type ReactNode } from 'react';

import { cn } from '@shared/lib/cn.ts';

interface SectionTitleProps {
  readonly children: ReactNode;
  readonly className?: string;
}

const SectionTitle = ({ children, className }: SectionTitleProps) => (
  <h2 className={cn('mb-3 mt-8 text-lg font-semibold tracking-tight', className)}>{children}</h2>
);

export default SectionTitle;
