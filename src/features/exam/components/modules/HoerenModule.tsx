import { Headphones } from 'lucide-react';

import {
  Callout,
  MultipleChoice,
  QuestionItem,
  QuestionText,
  ReadingText,
  RichtigFalsch,
  Teil
} from '@shared/components';
import { booleanAnswer, itemKey, numberAnswer, textAnswer } from '@shared/lib/answers.ts';
import { Input } from '@shared/ui';

import AudioPlayButton from '../audio/AudioPlayButton.tsx';
import { type ExamModuleProps } from '../moduleProps.ts';

const HoerenModule = ({ exam, answers, setAnswer, settings, plays, onConsumePlay }: ExamModuleProps) => {
  const { hoeren } = exam;

  const playButton = (key: string) => (
    <AudioPlayButton
      exam={exam}
      settings={settings}
      itemKey={key}
      playsLeft={plays[key] ?? settings.playsAllowed}
      onConsumePlay={onConsumePlay}
    />
  );

  return (
    <>
      <Callout className="flex items-start gap-2">
        <Headphones className="mt-0.5 size-4 shrink-0" />
        <span>
          Each audio can be played <b>{settings.playsAllowed}×</b>. Read the items first, then press play.
          Transcripts appear in the review after submitting.
        </span>
      </Callout>

      <Teil title="Teil 1 — Ansagen" chip="richtig/falsch" anweisung={hoeren.teil1.anweisung}>
        {hoeren.teil1.items.map((item, index) => (
          <QuestionItem key={index}>
            {playButton(itemKey('h1.', index))}
            <QuestionText>
              {index + 1}. {item.statement}
            </QuestionText>
            <RichtigFalsch
              name={itemKey('h1.', index)}
              value={booleanAnswer(answers, itemKey('h1.', index))}
              onChange={value => {
                setAnswer(itemKey('h1.', index), value);
              }}
            />
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 2 — Informationen" chip="a/b/c" anweisung={hoeren.teil2.anweisung}>
        {hoeren.teil2.items.map((item, index) => (
          <QuestionItem key={index}>
            {playButton(itemKey('h2.', index))}
            <QuestionText>
              {index + 1}. {item.frage}
            </QuestionText>
            <MultipleChoice
              name={itemKey('h2.', index)}
              options={item.options}
              value={numberAnswer(answers, itemKey('h2.', index))}
              onChange={value => {
                setAnswer(itemKey('h2.', index), value);
              }}
            />
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 3 — Gespräche" chip="richtig/falsch" anweisung={hoeren.teil3.anweisung}>
        {hoeren.teil3.items.map((item, index) => (
          <QuestionItem key={index}>
            {playButton(itemKey('h3.', index))}
            <QuestionText>
              {index + 1}. {item.statement}
            </QuestionText>
            <RichtigFalsch
              name={itemKey('h3.', index)}
              value={booleanAnswer(answers, itemKey('h3.', index))}
              onChange={value => {
                setAnswer(itemKey('h3.', index), value);
              }}
            />
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 4 — Interview" chip="a/b/c" anweisung={hoeren.teil4.anweisung}>
        <div className="pb-2">{playButton('h4')}</div>
        {hoeren.teil4.questions.map((question, index) => (
          <QuestionItem key={index}>
            <QuestionText>
              {index + 1}. {question.frage}
            </QuestionText>
            <MultipleChoice
              name={itemKey('h4.', index)}
              options={question.options}
              value={numberAnswer(answers, itemKey('h4.', index))}
              onChange={value => {
                setAnswer(itemKey('h4.', index), value);
              }}
            />
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 5 — Hören & Schreiben" chip="Notiz ergänzen" anweisung={hoeren.teil5.anweisung}>
        {playButton('h5')}
        <ReadingText title={hoeren.teil5.noteTitle}>
          {hoeren.teil5.gaps.map((gap, index) => {
            const [before, after] = gap.label.split('____');
            return (
              <div key={index} className="my-2 flex flex-wrap items-center gap-2">
                <span>{before}</span>
                <Input
                  className="w-48"
                  autoComplete="off"
                  aria-label={gap.label.replace('____', '…')}
                  value={textAnswer(answers, itemKey('h5.', index))}
                  onChange={event => {
                    setAnswer(itemKey('h5.', index), event.target.value);
                  }}
                />
                <span>{after ?? ''}</span>
              </div>
            );
          })}
        </ReadingText>
      </Teil>
    </>
  );
};

export default HoerenModule;
