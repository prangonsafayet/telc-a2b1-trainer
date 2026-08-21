import { type ReactNode } from 'react';

import { cn } from '@shared/lib/cn.ts';

interface QuestionItemProps {
  readonly children: ReactNode;
  readonly className?: string;
}

const QuestionItem = ({ children, className }: QuestionItemProps) => (
  <div className={cn('space-y-2 border-t py-4 first:border-t-0', className)}>{children}</div>
);

export default QuestionItem;
