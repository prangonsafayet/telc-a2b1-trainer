import { Fragment } from 'react';
import { MultipleChoice, QuestionItem, QuestionText, Teil } from '@/components/common.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { LETTERS } from '@/lib/util.js';

/* Splits "… ich [1] gestern …" into text runs and inline <select> gaps, preserving line breaks. */
function GapText({ text, renderGap }) {
  const chunks = String(text).split(/(\[\d\])/);
  return (
    <div className="rounded-lg border bg-muted/40 p-4 text-base leading-loose">
      {chunks.map((chunk, i) => {
        const m = chunk.match(/^\[(\d)\]$/);
        if (m) return <Fragment key={i}>{renderGap(+m[1] - 1, m[1])}</Fragment>;
        return chunk.split('\n').map((line, j, arr) => (
          <Fragment key={`${i}-${j}`}>
            {line}
            {j < arr.length - 1 ? <br /> : null}
          </Fragment>
        ));
      })}
    </div>
  );
}

function InlineGap({ label, options, value, onChange }) {
  return (
    <Select value={value == null ? '' : String(value)} onValueChange={v => onChange(+v)}>
      <SelectTrigger size="sm" className="mx-1 inline-flex h-7 max-w-52 bg-background align-baseline">
        <SelectValue placeholder={`[${label}]`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o, i) => (
          <SelectItem key={i} value={String(i)}>
            <span className="text-muted-foreground">{LETTERS[i]})</span> {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function Sprachbausteine({ exam, answers, setAnswer }) {
  const S = exam.sprachbausteine;
  return (
    <>
      <Teil title="Teil 1 — Grammatik-Lücken" chip="6 Items" anweisung={S.teil1.anweisung}>
        <GapText
          text={S.teil1.text}
          renderGap={(idx, label) => (
            <InlineGap
              label={label}
              options={S.teil1.gaps[idx].options}
              value={answers[`s1.${idx}`]}
              onChange={v => setAnswer(`s1.${idx}`, v)}
            />
          )}
        />
      </Teil>

      <Teil title="Teil 2 — Wortschatz-Lücken" chip="6 Items" anweisung={S.teil2.anweisung}>
        <div className="mb-4 flex flex-wrap gap-2">
          {S.teil2.wordBank.map((w, i) => (
            <span key={i} className="rounded-md border bg-background px-2 py-1 text-sm">
              <span className="text-muted-foreground">{LETTERS[i]})</span> {w}
            </span>
          ))}
        </div>
        <GapText
          text={S.teil2.text}
          renderGap={(idx, label) => (
            <InlineGap
              label={label}
              options={S.teil2.wordBank}
              value={answers[`s2.${idx}`]}
              onChange={v => setAnswer(`s2.${idx}`, v)}
            />
          )}
        />
      </Teil>

      <Teil title="Teil 3 — Passende Antwort" chip="5 Items" anweisung={S.teil3.anweisung}>
        {S.teil3.items.map((it, i) => (
          <QuestionItem key={i}>
            <QuestionText>{i + 1}. {it.prompt}</QuestionText>
            <MultipleChoice name={`s3.${i}`} options={it.options} value={answers[`s3.${i}`]} onChange={v => setAnswer(`s3.${i}`, v)} />
          </QuestionItem>
        ))}
      </Teil>
    </>
  );
}
