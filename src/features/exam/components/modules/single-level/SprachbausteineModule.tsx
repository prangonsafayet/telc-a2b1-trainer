import { GapFillText, InlineGapSelect, Teil } from '@shared/components';
import { itemKey, numberAnswer } from '@shared/lib/answers.ts';
import { LETTERS } from '@shared/lib/format.ts';

import { type SingleLevelModuleProps } from '@features/exam/types/moduleProps.ts';

const SprachbausteineModule = ({ exam, answers, setAnswer }: SingleLevelModuleProps) => {
  const { sprachbausteine } = exam;

  return (
    <>
      <Teil
        title="Teil 1 — Grammatik-Lücken"
        chip="10 Items · je 1,5 Punkte"
        anweisung={sprachbausteine.teil1.anweisung}
      >
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
    </>
  );
};

export default SprachbausteineModule;
