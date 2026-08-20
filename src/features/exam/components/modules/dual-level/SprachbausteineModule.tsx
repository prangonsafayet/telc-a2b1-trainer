import {
  GapFillText,
  InlineGapSelect,
  MultipleChoice,
  QuestionItem,
  QuestionText,
  Teil
} from '@shared/components';
import { itemKey, numberAnswer } from '@shared/lib/answers.ts';
import { LETTERS } from '@shared/lib/format.ts';

import { type A2b1ModuleProps } from '@features/exam/types/moduleProps.ts';

const SprachbausteineModule = ({ exam, answers, setAnswer }: A2b1ModuleProps) => {
  const { sprachbausteine } = exam;

  return (
    <>
      <Teil title="Teil 1 — Grammatik-Lücken" chip="6 Items" anweisung={sprachbausteine.teil1.anweisung}>
        <GapFillText
          text={sprachbausteine.teil1.text}
          renderGap={(gapIndex, label) => (
            <InlineGapSelect
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
        <GapFillText
          text={sprachbausteine.teil2.text}
          renderGap={(gapIndex, label) => (
            <InlineGapSelect
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
};

export default SprachbausteineModule;
