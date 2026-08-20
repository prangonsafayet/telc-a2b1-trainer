import { PunkteGrid, RecorderControls, RedemittelList, Teil, type SpeakingPart } from '@shared/components';
import { type TelcSprechenTeil } from '@shared/types';

interface SprechenTeilProps {
  readonly teil: TelcSprechenTeil;
  readonly part: SpeakingPart;
  readonly chip: string;
  readonly recordingUrl: string | undefined;
  readonly onRecorded: (part: SpeakingPart, url: string) => void;
}

const SprechenTeilCard = ({ teil, part, chip, recordingUrl, onRecorded }: SprechenTeilProps) => (
  <Teil title={teil.titel} chip={chip} anweisung={teil.anweisung}>
    <PunkteGrid items={teil.punkte} />
    <RedemittelList items={teil.redemittel} />
    <RecorderControls part={part} recordingUrl={recordingUrl} onRecorded={onRecorded} />
  </Teil>
);

export default SprechenTeilCard;
