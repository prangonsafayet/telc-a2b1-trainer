import {
  LetterSelect,
  OptionCards,
  MultipleChoice,
  Multiline,
  QuestionItem,
  QuestionText,
  ReadingText,
  RichtigFalsch,
  Teil
} from '@shared/components';
import { booleanAnswer, itemKey, numberAnswer } from '@shared/lib/answers.ts';

import { type A2b1ModuleProps } from '@features/exam/types/moduleProps.ts';

const TEXT_LABELS = ['A', 'B'] as const;

const LesenModule = ({ exam, answers, setAnswer }: A2b1ModuleProps) => {
  const { lesen } = exam;

  return (
    <>
      <Teil title="Teil 1 — Anzeigen zuordnen" chip="5 Items" anweisung={lesen.teil1.anweisung}>
        <OptionCards items={lesen.teil1.ads} />
        {lesen.teil1.situations.map((situation, index) => (
          <QuestionItem key={index}>
            <QuestionText>
              {index + 1}. {situation}
            </QuestionText>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Anzeige:
              <LetterSelect
                count={lesen.teil1.ads.length}
                value={numberAnswer(answers, itemKey('l1.', index))}
                onChange={value => {
                  setAnswer(itemKey('l1.', index), value);
                }}
              />
            </div>
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 2 — Texte lesen" chip="5 Items" anweisung={lesen.teil2.anweisung}>
        {lesen.teil2.texts.map((text, index) => (
          <ReadingText key={index} title={`Text ${TEXT_LABELS[index] ?? ''}: ${text.titel}`}>
            <Multiline text={text.text} />
          </ReadingText>
        ))}
        {lesen.teil2.questions.map((question, index) => (
          <QuestionItem key={index}>
            <QuestionText>
              {index + 1}. (Text {TEXT_LABELS[question.textIndex] ?? ''}) {question.frage}
            </QuestionText>
            <MultipleChoice
              name={itemKey('l2.', index)}
              options={question.options}
              value={numberAnswer(answers, itemKey('l2.', index))}
              onChange={value => {
                setAnswer(itemKey('l2.', index), value);
              }}
            />
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 3 — Überschriften zuordnen" chip="5 Items" anweisung={lesen.teil3.anweisung}>
        <OptionCards items={lesen.teil3.headlines} />
        {lesen.teil3.messages.map((message, index) => (
          <QuestionItem key={index}>
            <QuestionText>Nachricht {index + 1}</QuestionText>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <Multiline text={message} />
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Überschrift:
              <LetterSelect
                count={lesen.teil3.headlines.length}
                value={numberAnswer(answers, itemKey('l3.', index))}
                onChange={value => {
                  setAnswer(itemKey('l3.', index), value);
                }}
              />
            </div>
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 4 — Richtig oder falsch?" chip="5 Items" anweisung={lesen.teil4.anweisung}>
        <ReadingText title={lesen.teil4.titel}>
          <Multiline text={lesen.teil4.text} />
        </ReadingText>
        {lesen.teil4.statements.map((statement, index) => (
          <QuestionItem key={index}>
            <QuestionText>
              {index + 1}. {statement.text}
            </QuestionText>
            <RichtigFalsch
              name={itemKey('l4.', index)}
              value={booleanAnswer(answers, itemKey('l4.', index))}
              onChange={value => {
                setAnswer(itemKey('l4.', index), value);
              }}
            />
          </QuestionItem>
        ))}
      </Teil>
    </>
  );
};

export default LesenModule;
