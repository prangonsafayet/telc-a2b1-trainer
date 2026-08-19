import { Fragment } from 'react';

import { MultipleChoice, QuestionItem, QuestionText, Teil } from '@shared/components';
import { LETTERS } from '@shared/lib/format.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui';

import { itemKey, numberAnswer } from '../lib/answers.ts';
import { splitGapText } from '../lib/gapText.ts';

import { type ExamModuleProps } from './moduleProps.ts';

interface InlineGapProps {
  readonly label: string;
  readonly options: readonly string[];
  readonly value: number | undefined;
  readonly onChange: (value: number) => void;
}

function InlineGap({ label, options, value, onChange }: InlineGapProps) {
  return (
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
            <span className="text-muted-foreground">{LETTERS[index]})</span> {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface GapTextProps {
  readonly text: string;
  readonly renderGap: (gapIndex: number, label: string) => React.ReactNode;
}

function GapText({ text, renderGap }: GapTextProps) {
  return (
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
}

export function SprachbausteineModule({ exam, answers, setAnswer }: ExamModuleProps) {
  const { sprachbausteine } = exam;

  return (
    <>
      <Teil title="Teil 1 — Grammatik-Lücken" chip="6 Items" anweisung={sprachbausteine.teil1.anweisung}>
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

      <Teil title="Teil 2 — Wortschatz-Lücken" chip="6 Items" anweisung={sprachbausteine.teil2.anweisung}>
        <div className="mb-4 flex flex-wrap gap-2">
          {sprachbausteine.teil2.wordBank.map((word, index) => (
            <span key={index} className="rounded-md border bg-background px-2 py-1 text-sm">
              <span className="text-muted-foreground">{LETTERS[index]})</span> {word}
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

      <Teil title="Teil 3 — Passende Antwort" chip="5 Items" anweisung={sprachbausteine.teil3.anweisung}>
        {sprachbausteine.teil3.items.map((item, index) => (
          <QuestionItem key={index}>
            <QuestionText>
              {index + 1}. {item.prompt}
            </QuestionText>
            <MultipleChoice
              name={itemKey('s3.', index)}
              options={item.options}
              value={numberAnswer(answers, itemKey('s3.', index))}
              onChange={value => {
                setAnswer(itemKey('s3.', index), value);
              }}
            />
          </QuestionItem>
        ))}
      </Teil>
    </>
  );
}
