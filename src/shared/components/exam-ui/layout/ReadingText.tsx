import { type ReactNode } from 'react';

interface ReadingTextProps {
  readonly title?: string;
  readonly children: ReactNode;
}

/** A reading passage or a note sheet. */
const ReadingText = ({ title, children }: ReadingTextProps) => (
  <div className="my-4 rounded-lg border bg-muted/40 p-4 leading-relaxed">
    {title ? <div className="mb-2 font-semibold">{title}</div> : null}
    {children}
  </div>
);

export default ReadingText;
