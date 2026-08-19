import { Fragment } from 'react';

interface MultilineProps {
  /** Plain text that may contain newlines. Never HTML — this renders text, not markup. */
  readonly text: string | undefined;
}

/** Renders newline-separated text without `dangerouslySetInnerHTML`. */
export function Multiline({ text }: MultilineProps) {
  const lines = (text ?? '').split('\n');
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {line}
          {index < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  );
}
