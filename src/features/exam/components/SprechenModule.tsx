import { Mic } from 'lucide-react';

import { Callout, Teil, RecorderControls  } from '@shared/components';

import { type ExamModuleProps } from './moduleProps.ts';

const Redemittel = ({ items }: { readonly items: readonly string[] }) => (
  <div className="my-4 rounded-lg border-l-4 border-[color:var(--warning)] bg-[color-mix(in_oklab,var(--warning)_10%,transparent)] p-3">
    <b className="text-sm">Redemittel:</b>
    <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const Punkte = ({ items }: { readonly items: readonly string[] }) => (
  <div className="my-4 grid gap-2 sm:grid-cols-2">
    {items.map((item, index) => (
      <div key={index} className="rounded-lg border bg-muted/40 p-3 text-sm">
        {item}
      </div>
    ))}
  </div>
);

export const SprechenModule = ({ exam, recordings, onRecorded }: ExamModuleProps) => {
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
        <Punkte items={sprechen.teil1.punkte} />
        <Redemittel items={sprechen.teil1.redemittel} />
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
        <Redemittel items={sprechen.teil2.redemittel} />
        <RecorderControls part="t2" recordingUrl={recordings.t2} onRecorded={onRecorded} />
      </Teil>

      <Teil title="Teil 3 — Gemeinsam planen" chip="~5 Min.">
        <p className="mb-2 font-semibold">{sprechen.teil3.aufgabe}</p>
        <p className="mb-4 text-sm italic text-muted-foreground">
          {sprechen.teil3.anweisung} (Solo training: speak both roles, or grab a partner.)
        </p>
        <Punkte items={sprechen.teil3.punkte} />
        <Redemittel items={sprechen.teil3.redemittel} />
        <RecorderControls part="t3" recordingUrl={recordings.t3} onRecorded={onRecorded} />
      </Teil>
    </>
  );
};
