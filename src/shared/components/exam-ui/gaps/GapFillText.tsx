import { Fragment } from 'react';

import { splitGapText } from '@shared/lib/gapText.ts';

interface GapFillTextProps {
  /** Text with `[1]`-style placeholders. */
  readonly text: string;
  readonly renderGap: (gapIndex: number, label: string) => React.ReactNode;
}

/** A Sprachbausteine text with its gaps rendered as real inputs, never injected HTML. */
const GapFillText = ({ text, renderGap }: GapFillTextProps) => (
  <div className="rounded-lg border bg-muted/40 p-4 text-base leading-loose">
    {splitGapText(text).map((segment, index) =>
      segment.kind === 'gap' ? (
        <Fragment key={index}>{renderGap(segment.gapIndex, segment.label)}</Fragment>
      ) : (
        <Fragment key={index}>
          {segment.lines.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {line}
              {lineIndex < segment.lines.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </Fragment>
      )
    )}
  </div>
);

export default GapFillText;
