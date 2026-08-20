import { Mic } from 'lucide-react';

import { Callout, PunkteGrid, RecorderControls, RedemittelList, Teil } from '@shared/components';

import { type A2b1ModuleProps } from '@features/exam/types/moduleProps.ts';

const SprechenModule = ({ exam, recordings, onRecorded }: A2b1ModuleProps) => {
  const { sprechen } = exam;

  return (
    <>
      <Callout className="flex items-start gap-2">
        <Mic className="mt-0.5 size-4 shrink-0" />
        <span>
          Speak OUT LOUD — ideally record yourself (allow the microphone) and listen back. In the real exam
          there is <b>no preparation time</b>. Recordings live only in this session; they are not saved to
          disk.
        </span>
      </Callout>

      <Teil title="Teil 1 — Sich vorstellen" chip="~2 Min." anweisung={sprechen.teil1.anweisung}>
        <PunkteGrid items={sprechen.teil1.punkte} />
        <RedemittelList items={sprechen.teil1.redemittel} />
        <RecorderControls part="t1" recordingUrl={recordings.t1} onRecorded={onRecorded} />
      </Teil>

      <Teil title="Teil 2 — Über ein Thema sprechen" chip="~5 Min.">
        <p className="mb-2 font-semibold">Thema: {sprechen.teil2.thema}</p>
        <p className="mb-4 text-sm italic text-muted-foreground">
          {sprechen.teil2.anweisung}{' '}
          <b className="not-italic text-foreground">Read the task twice before you start!</b>
        </p>
        <ol className="my-4 list-decimal space-y-1 pl-5">
          {sprechen.teil2.leitfragen.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ol>
        <RedemittelList items={sprechen.teil2.redemittel} />
        <RecorderControls part="t2" recordingUrl={recordings.t2} onRecorded={onRecorded} />
      </Teil>

      <Teil title="Teil 3 — Gemeinsam planen" chip="~5 Min.">
        <p className="mb-2 font-semibold">{sprechen.teil3.aufgabe}</p>
        <p className="mb-4 text-sm italic text-muted-foreground">
          {sprechen.teil3.anweisung} (Solo training: speak both roles, or grab a partner.)
        </p>
        <PunkteGrid items={sprechen.teil3.punkte} />
        <RedemittelList items={sprechen.teil3.redemittel} />
        <RecorderControls part="t3" recordingUrl={recordings.t3} onRecorded={onRecorded} />
      </Teil>
    </>
  );
};

export default SprechenModule;
