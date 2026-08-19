import { Fragment } from 'react';

import { Teil } from '@shared/components';
import { LETTERS } from '@shared/lib/format.ts';
import { splitGapText } from '@shared/lib/gapText.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui';

import { itemKey, numberAnswer } from '../lib/answers.ts';

import { type TelcModuleProps } from './moduleProps.ts';

interface InlineGapProps {
  readonly label: string;
  readonly options: readonly string[];
  readonly value: number | undefined;
  readonly onChange: (value: number) => void;
}

const InlineGap = ({ label, options, value, onChange }: InlineGapProps) => (
  <Select
    value={value == null ? '' : String(value)}
    onValueChange={next => {
      onChange(Number(next));
    }}
  >
    <SelectTrigger
      size="sm"
      aria-label={`Lücke ${label}`}
      className="mx-1 inline-flex h-7 max-w-52 bg-background align-baseline"
    >
      <SelectValue placeholder={`[${label}]`} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option, index) => (
        <SelectItem key={index} value={String(index)}>
          <span className="text-muted-foreground">{LETTERS[index] ?? String(index + 1)})</span> {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

interface GapTextProps {
  readonly text: string;
  readonly renderGap: (gapIndex: number, label: string) => React.ReactNode;
}

const GapText = ({ text, renderGap }: GapTextProps) => (
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

export const TelcSprachbausteineModule = ({ exam, answers, setAnswer }: TelcModuleProps) => {
  const { sprachbausteine } = exam;

  return (
    <>
      <Teil
        title="Teil 1 — Grammatik-Lücken"
        chip="10 Items · je 1,5 Punkte"
        anweisung={sprachbausteine.teil1.anweisung}
      >
        <GapText
          text={sprachbausteine.teil1.text}
          renderGap={(gapIndex, label) => (
            <InlineGap
              label={label}
              options={sprachbausteine.teil1.gaps[gapIndex]?.options ?? []}
              value={numberAnswer(answers, itemKey('s1.', gapIndex))}
              onChange={value => {
                setAnswer(itemKey('s1.', gapIndex), value);
              }}
            />
          )}
        />
      </Teil>

      <Teil
        title="Teil 2 — Wortschatz-Lücken"
        chip="10 Items · je 1,5 Punkte"
        anweisung={sprachbausteine.teil2.anweisung}
      >
        <div className="mb-4 flex flex-wrap gap-2">
          {sprachbausteine.teil2.wordBank.map((word, index) => (
            <span key={index} className="rounded-md border bg-background px-2 py-1 text-sm">
              <span className="text-muted-foreground">{LETTERS[index] ?? String(index + 1)})</span> {word}
            </span>
          ))}
        </div>
        <GapText
          text={sprachbausteine.teil2.text}
          renderGap={(gapIndex, label) => (
            <InlineGap
              label={label}
              options={sprachbausteine.teil2.wordBank}
              value={numberAnswer(answers, itemKey('s2.', gapIndex))}
              onChange={value => {
                setAnswer(itemKey('s2.', gapIndex), value);
              }}
            />
          )}
        />
      </Teil>
    </>
  );
};
