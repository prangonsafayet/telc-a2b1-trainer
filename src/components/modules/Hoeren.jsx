import { useEffect, useState } from 'react';
import { Headphones, Play, Square } from 'lucide-react';
import {
  Callout, MultipleChoice, QuestionItem, QuestionText, ReadingText, RichtigFalsch, Teil
} from '@/components/common.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { rateForExam, speakAudio, stopSpeech } from '@/lib/tts.js';

function audioFor(H, key) {
  if (key === 'h4') return H.teil4.audio;
  if (key === 'h5') return H.teil5.audio;
  const [part, i] = key.split('.');
  return H['teil' + part[1]].items[+i].audio;
}

/* Play button with a real-exam play budget, remembered across refreshes via `plays`. */
function PlayButton({ exam, settings, playsKey, plays, usePlay }) {
  const [playing, setPlaying] = useState(false);
  const left = plays[playsKey] ?? settings.playsAllowed;

  useEffect(() => () => stopSpeech(), []);

  const onClick = () => {
    if (playing) { stopSpeech(); setPlaying(false); return; }
    if (left <= 0) return;
    usePlay(playsKey);
    setPlaying(true);
    speakAudio(audioFor(exam.hoeren, playsKey), rateForExam(exam, settings), settings.voiceName, () => setPlaying(false));
  };

  return (
    <div className="flex items-center gap-3">
      <Button size="sm" variant={playing ? 'secondary' : 'default'} onClick={onClick} disabled={!playing && left <= 0}>
        {playing ? <><Square /> Stopp</> : <><Play /> Anhören</>}
      </Button>
      <Badge variant={left > 0 ? 'secondary' : 'destructive'}>{left}× left</Badge>
    </div>
  );
}

export default function Hoeren({ exam, answers, setAnswer, settings, plays, usePlay }) {
  const H = exam.hoeren;
  const play = key => <PlayButton exam={exam} settings={settings} playsKey={key} plays={plays} usePlay={usePlay} />;

  return (
    <>
      <Callout className="flex items-start gap-2">
        <Headphones className="mt-0.5 size-4 shrink-0" />
        <span>
          Each audio can be played <b>{settings.playsAllowed}×</b>. Read the items first, then press play. Transcripts
          appear in the review after submitting.
        </span>
      </Callout>

      <Teil title="Teil 1 — Ansagen" chip="richtig/falsch" anweisung={H.teil1.anweisung}>
        {H.teil1.items.map((it, i) => (
          <QuestionItem key={i}>
            {play(`h1.${i}`)}
            <QuestionText>{i + 1}. {it.statement}</QuestionText>
            <RichtigFalsch name={`h1.${i}`} value={answers[`h1.${i}`]} onChange={v => setAnswer(`h1.${i}`, v)} />
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 2 — Informationen" chip="a/b/c" anweisung={H.teil2.anweisung}>
        {H.teil2.items.map((it, i) => (
          <QuestionItem key={i}>
            {play(`h2.${i}`)}
            <QuestionText>{i + 1}. {it.frage}</QuestionText>
            <MultipleChoice name={`h2.${i}`} options={it.options} value={answers[`h2.${i}`]} onChange={v => setAnswer(`h2.${i}`, v)} />
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 3 — Gespräche" chip="richtig/falsch" anweisung={H.teil3.anweisung}>
        {H.teil3.items.map((it, i) => (
          <QuestionItem key={i}>
            {play(`h3.${i}`)}
            <QuestionText>{i + 1}. {it.statement}</QuestionText>
            <RichtigFalsch name={`h3.${i}`} value={answers[`h3.${i}`]} onChange={v => setAnswer(`h3.${i}`, v)} />
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 4 — Interview" chip="a/b/c" anweisung={H.teil4.anweisung}>
        <div className="pb-2">{play('h4')}</div>
        {H.teil4.questions.map((q, i) => (
          <QuestionItem key={i}>
            <QuestionText>{i + 1}. {q.frage}</QuestionText>
            <MultipleChoice name={`h4.${i}`} options={q.options} value={answers[`h4.${i}`]} onChange={v => setAnswer(`h4.${i}`, v)} />
          </QuestionItem>
        ))}
      </Teil>

      <Teil title="Teil 5 — Hören & Schreiben" chip="Notiz ergänzen" anweisung={H.teil5.anweisung}>
        {play('h5')}
        <ReadingText title={H.teil5.noteTitle}>
          {H.teil5.gaps.map((g, i) => {
            const parts = g.label.split('____');
            return (
              <div key={i} className="my-2 flex flex-wrap items-center gap-2">
                <span>{parts[0]}</span>
                <Input
                  className="w-48"
                  autoComplete="off"
                  value={answers[`h5.${i}`] ?? ''}
                  onChange={e => setAnswer(`h5.${i}`, e.target.value)}
                />
                <span>{parts[1] || ''}</span>
              </div>
            );
          })}
        </ReadingText>
      </Teil>
    </>
  );
}
