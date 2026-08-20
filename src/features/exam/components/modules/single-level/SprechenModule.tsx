import { Mic } from 'lucide-react';

import { Callout } from '@shared/components';

import { type SingleLevelModuleProps } from '@features/exam/types/moduleProps.ts';

import SprechenTeilCard from './SprechenTeilCard.tsx';

const SprechenModule = ({ exam, paper, recordings, onRecorded }: SingleLevelModuleProps) => {
  const { sprechen } = exam;
  const chips = paper.sprechenChips;

  return (
    <>
      <Callout className="flex items-start gap-2">
        <Mic className="mt-0.5 size-4 shrink-0" />
        <span>
          Speak OUT LOUD — ideally record yourself (allow the microphone) and listen back.{' '}
          {paper.prepNote.lead}
          <b>{paper.prepNote.emphasis}</b>
          {paper.prepNote.tail} Recordings live only in this session; they are not saved to disk.
        </span>
      </Callout>

      <SprechenTeilCard
        teil={sprechen.teil1}
        part="t1"
        chip={chips[0] ?? ''}
        recordingUrl={recordings.t1}
        onRecorded={onRecorded}
      />
      <SprechenTeilCard
        teil={sprechen.teil2}
        part="t2"
        chip={chips[1] ?? ''}
        recordingUrl={recordings.t2}
        onRecorded={onRecorded}
      />
      <SprechenTeilCard
        teil={sprechen.teil3}
        part="t3"
        chip={chips[2] ?? ''}
        recordingUrl={recordings.t3}
        onRecorded={onRecorded}
      />
    </>
  );
};

export default SprechenModule;
