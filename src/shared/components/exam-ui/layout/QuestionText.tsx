import { type ReactNode } from 'react';

const QuestionText = ({ children }: { readonly children: ReactNode }) => (
  <div className="font-medium leading-relaxed">{children}</div>
);

export default QuestionText;
