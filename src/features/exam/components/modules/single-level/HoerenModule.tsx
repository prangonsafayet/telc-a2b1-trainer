import { Headphones } from 'lucide-react';

import { Callout, QuestionItem, QuestionText, RichtigFalsch, Teil } from '@shared/components';
import AudioPlayButton from '@shared/components/exam-ui/AudioPlayButton.tsx';
import { booleanAnswer, itemKey } from '@shared/lib/answers.ts';

import { singleLevelAudioForKey, singleLevelRate } from '@features/exam/lib/formats/single-level/audio.ts';
import { type SingleLevelModuleProps } from '@features/exam/types/moduleProps.ts';
import { useSettings } from '@features/progress';

const HoerenModule = ({
  exam,
  answers,
  setAnswer,
  settings,
  plays,
  onConsumePlay
}: SingleLevelModuleProps) => {
  const { hoeren } = exam;
  /* Voice and speed are the global speech settings, shared across all three trainers. */
  const { ttsRate, voiceName } = useSettings();

  const playButton = (key: string) => (
    <AudioPlayButton
      script={singleLevelAudioForKey(exam, key)}
      rate={singleLevelRate(exam.level, ttsRate)}
      voiceName={voiceName}
      itemKey={key}
      playsLeft={plays[key] ?? settings.playsAllowed}
      onConsumePlay={onConsumePlay}
    />
  );

  const richtigFalsch = (key: string, statement: string, index: number) => (
    <>
      <QuestionText>
        {index + 1}. {statement}
      </QuestionText>
      <RichtigFalsch
        name={key}
        value={booleanAnswer(answers, key)}
        onChange={value => {
          setAnswer(key, value);
        }}
      />
    </>
  );

  return (
    <>
      <Callout className="flex items-start gap-2">
        <Headphones className="mt-0.5 size-4 shrink-0" />
        <span>
          Each audio can be played <b>{settings.playsAllowed}×</b> — in the real exam you hear everything only
          once. Read the statements first, then press play. Transcripts appear in the review.
        </span>
      </Callout>

      <Teil title="Teil 1 — Globalverstehen" chip="5 Items · je 5 Punkte" anweisung={hoeren.teil1.anweisung}>
        {hoeren.teil1.items.map((item, index) => (
          <QuestionItem key={index}>
            {playButton(itemKey('h1.', index))}
            {richtigFalsch(itemKey('h1.', index), item.statement, index)}
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 2 — Interview" chip="10 Items · je 2,5 Punkte" anweisung={hoeren.teil2.anweisung}>
        <div className="pb-2">{playButton('h2')}</div>
        {hoeren.teil2.statements.map((item, index) => (
          <QuestionItem key={index}>
            {richtigFalsch(itemKey('h2.', index), item.statement, index)}
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 3 — Durchsagen" chip="5 Items · je 5 Punkte" anweisung={hoeren.teil3.anweisung}>
        {hoeren.teil3.items.map((item, index) => (
          <QuestionItem key={index}>
            {playButton(itemKey('h3.', index))}
            {richtigFalsch(itemKey('h3.', index), item.statement, index)}
          </QuestionItem>
        ))}
      </Teil>
    </>
  );
};

export default HoerenModule;
