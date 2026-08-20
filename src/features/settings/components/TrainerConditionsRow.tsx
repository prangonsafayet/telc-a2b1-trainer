import { type TrainerId } from '@shared/types';

import { useTrainerConditions } from '../hooks/useTrainerConditions.ts';

import ChoiceSelect from './ChoiceSelect.tsx';
import SettingsField from './SettingsField.tsx';

interface TrainerConditionsRowProps {
  readonly trainer: TrainerId;
}

/** How strictly one trainer's mock exams run: writing time and audio plays per item. */
const TrainerConditionsRow = ({ trainer }: TrainerConditionsRowProps) => {
  const { name, accent, settings, writingChoices, writingHint, playsChoices, playsHint, setSetting } =
    useTrainerConditions(trainer);
  const writingId = `setting-${trainer}-writing`;
  const playsId = `setting-${trainer}-plays`;

  return (
    <div className="grid gap-3 py-5 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:gap-6">
      <div className="flex items-center gap-2.5">
        {/* The same accent as this trainer's date card, so the two blocks read as one
            trainer's settings without the name having to be coloured. */}
        <span aria-hidden className="h-4 w-1 shrink-0 rounded-full" style={{ background: accent }} />
        <h3 className="text-sm font-semibold leading-none">{name}</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SettingsField label="Writing time" htmlFor={writingId} hint={writingHint}>
          <ChoiceSelect
            id={writingId}
            value={settings.writingMinutes}
            choices={writingChoices}
            onChange={minutes => {
              setSetting('writingMinutes', minutes);
            }}
          />
        </SettingsField>

        <SettingsField label="Audio plays per item" htmlFor={playsId} hint={playsHint}>
          <ChoiceSelect
            id={playsId}
            value={settings.playsAllowed}
            choices={playsChoices}
            onChange={plays => {
              setSetting('playsAllowed', plays);
            }}
          />
        </SettingsField>
      </div>
    </div>
  );
};

export default TrainerConditionsRow;
