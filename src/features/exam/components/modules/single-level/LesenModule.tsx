import {
  LetterSelect,
  MultipleChoice,
  Multiline,
  OptionCards,
  QuestionItem,
  QuestionText,
  ReadingText,
  Teil
} from '@shared/components';
import { itemKey, numberAnswer } from '@shared/lib/answers.ts';

import { type SingleLevelModuleProps } from '@features/exam/types/moduleProps.ts';

const LesenModule = ({ exam, answers, setAnswer }: SingleLevelModuleProps) => {
  const { lesen } = exam;

  return (
    <>
      <Teil
        title="Teil 1 — Überschriften zuordnen"
        chip="5 Items · je 5 Punkte"
        anweisung={lesen.teil1.anweisung}
      >
        <OptionCards items={lesen.teil1.headlines} />
        {lesen.teil1.texts.map((text, index) => (
          <QuestionItem key={index}>
            <QuestionText>Text {index + 1}</QuestionText>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <Multiline text={text} />
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Überschrift:
              <LetterSelect
                count={lesen.teil1.headlines.length}
                value={numberAnswer(answers, itemKey('l1.', index))}
                onChange={value => {
                  setAnswer(itemKey('l1.', index), value);
                }}
              />
            </div>
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 2 — Detailverstehen" chip="5 Items · je 5 Punkte" anweisung={lesen.teil2.anweisung}>
        <ReadingText title={lesen.teil2.titel}>
          <Multiline text={lesen.teil2.text} />
        </ReadingText>
        {lesen.teil2.questions.map((question, index) => (
          <QuestionItem key={index}>
            <QuestionText>
              {index + 1}. {question.frage}
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

      <Teil
        title="Teil 3 — Anzeigen zuordnen"
        chip="10 Items · je 2,5 Punkte"
        anweisung={lesen.teil3.anweisung}
      >
        <OptionCards items={lesen.teil3.ads} />
        {lesen.teil3.situations.map((situation, index) => (
          <QuestionItem key={index}>
            <QuestionText>
              {index + 1}. {situation}
            </QuestionText>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Anzeige:
              <LetterSelect
                count={lesen.teil3.ads.length}
                value={numberAnswer(answers, itemKey('l3.', index))}
                onChange={value => {
                  setAnswer(itemKey('l3.', index), value);
                }}
              />
            </div>
          </QuestionItem>
        ))}
      </Teil>
    </>
  );
};

export default LesenModule;
