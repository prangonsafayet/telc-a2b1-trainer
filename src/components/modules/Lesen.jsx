import {
  LetterSelect, MultipleChoice, Multiline, QuestionItem, QuestionText, ReadingText, RichtigFalsch, Teil
} from '@/components/common.jsx';
import { LETTERS } from '@/lib/util.js';

function OptionList({ items }) {
  return (
    <div className="my-4 grid gap-2 sm:grid-cols-2">
      {items.map((a, i) => (
        <div key={i} className="rounded-lg border bg-muted/40 p-3 text-sm leading-relaxed">
          <b className="mr-1.5 text-primary">{LETTERS[i]})</b>
          {a}
        </div>
      ))}
    </div>
  );
}

export default function Lesen({ exam, answers, setAnswer }) {
  const L = exam.lesen;
  return (
    <>
      <Teil title="Teil 1 — Anzeigen zuordnen" chip="5 Items" anweisung={L.teil1.anweisung}>
        <OptionList items={L.teil1.ads} />
        {L.teil1.situations.map((s, i) => (
          <QuestionItem key={i}>
            <QuestionText>{i + 1}. {s}</QuestionText>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Anzeige:
              <LetterSelect count={8} value={answers[`l1.${i}`]} onChange={v => setAnswer(`l1.${i}`, v)} />
            </div>
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 2 — Texte lesen" chip="5 Items" anweisung={L.teil2.anweisung}>
        {L.teil2.texts.map((t, i) => (
          <ReadingText key={i} title={`Text ${'AB'[i]}: ${t.titel}`}>
            <Multiline text={t.text} />
          </ReadingText>
        ))}
        {L.teil2.questions.map((q, i) => (
          <QuestionItem key={i}>
            <QuestionText>{i + 1}. (Text {'AB'[q.textIndex]}) {q.frage}</QuestionText>
            <MultipleChoice name={`l2.${i}`} options={q.options} value={answers[`l2.${i}`]} onChange={v => setAnswer(`l2.${i}`, v)} />
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 3 — Überschriften zuordnen" chip="5 Items" anweisung={L.teil3.anweisung}>
        <OptionList items={L.teil3.headlines} />
        {L.teil3.messages.map((m, i) => (
          <QuestionItem key={i}>
            <QuestionText>Nachricht {i + 1}</QuestionText>
            <p className="text-sm leading-relaxed text-muted-foreground"><Multiline text={m} /></p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Überschrift:
              <LetterSelect count={8} value={answers[`l3.${i}`]} onChange={v => setAnswer(`l3.${i}`, v)} />
            </div>
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 4 — Richtig oder falsch?" chip="5 Items" anweisung={L.teil4.anweisung}>
        <ReadingText title={L.teil4.titel}>
          <Multiline text={L.teil4.text} />
        </ReadingText>
        {L.teil4.statements.map((s, i) => (
          <QuestionItem key={i}>
            <QuestionText>{i + 1}. {s.text}</QuestionText>
            <RichtigFalsch name={`l4.${i}`} value={answers[`l4.${i}`]} onChange={v => setAnswer(`l4.${i}`, v)} />
          </QuestionItem>
        ))}
      </Teil>
    </>
  );
}
