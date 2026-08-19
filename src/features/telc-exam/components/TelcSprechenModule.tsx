import { Mic } from 'lucide-react';

import { Callout, RecorderControls, Teil, type SpeakingPart } from '@shared/components';
import { type TelcSprechenTeil } from '@shared/types';

import { type TelcModuleProps } from './moduleProps.ts';

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
  <div className="stagger my-4 grid gap-2 sm:grid-cols-2">
    {items.map((item, index) => (
      <div key={index} className="rounded-lg border bg-muted/40 p-3 text-sm">
        {item}
      </div>
    ))}
  </div>
);

interface SprechenTeilProps {
  readonly teil: TelcSprechenTeil;
  readonly part: SpeakingPart;
  readonly chip: string;
  readonly recordingUrl: string | undefined;
  readonly onRecorded: (part: SpeakingPart, url: string) => void;
}

const SprechenTeil = ({ teil, part, chip, recordingUrl, onRecorded }: SprechenTeilProps) => (
  <Teil title={teil.titel} chip={chip} anweisung={teil.anweisung}>
    <Punkte items={teil.punkte} />
    <Redemittel items={teil.redemittel} />
    <RecorderControls part={part} recordingUrl={recordingUrl} onRecorded={onRecorded} />
  </Teil>
);

export const TelcSprechenModule = ({ exam, recordings, onRecorded }: TelcModuleProps) => {
  const { sprechen } = exam;
  const isB1 = exam.level === 'b1';
  const chips: readonly string[] = isB1
    ? ['15 Punkte · ~3 Min.', '30 Punkte · ~6 Min.', '30 Punkte · ~6 Min.']
    : ['25 Punkte · ~5 Min.', '25 Punkte · ~5 Min.', '25 Punkte · ~5 Min.'];

  return (
    <>
      <Callout className="flex items-start gap-2">
        <Mic className="mt-0.5 size-4 shrink-0" />
        <span>
          Speak OUT LOUD — ideally record yourself (allow the microphone) and listen back.{' '}
          {isB1 ? (
            <>
              In the real exam you get <b>20 minutes preparation</b> for all three parts.
            </>
          ) : (
            <>
              In the real exam you get <b>20 minutes preparation</b>; a dictionary is allowed only there.
            </>
          )}{' '}
          Recordings live only in this session; they are not saved to disk.
        </span>
      </Callout>

      <SprechenTeil
        teil={sprechen.teil1}
        part="t1"
        chip={chips[0] ?? ''}
        recordingUrl={recordings.t1}
        onRecorded={onRecorded}
      />
      <SprechenTeil
        teil={sprechen.teil2}
        part="t2"
        chip={chips[1] ?? ''}
        recordingUrl={recordings.t2}
        onRecorded={onRecorded}
      />
      <SprechenTeil
        teil={sprechen.teil3}
        part="t3"
        chip={chips[2] ?? ''}
        recordingUrl={recordings.t3}
        onRecorded={onRecorded}
      />
    </>
  );
};
