import { TRAINERS } from '@shared/config/trainers.ts';
import { type TrainerId } from '@shared/types';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui';

import { useTrainerConditions } from '../hooks/useTrainerConditions.ts';

import ExamDateControls from './ExamDateControls.tsx';

interface TrainerConditionsColumnProps {
  readonly trainer: TrainerId;
}

/** One trainer's exam conditions: exam date, writing time and audio plays. */
const TrainerConditionsColumn = ({ trainer }: TrainerConditionsColumnProps) => {
  const { name, settings, writingChoices, playsChoices, setSetting } = useTrainerConditions(trainer);
  const writingId = `setting-${trainer}-writing`;
  const playsId = `setting-${trainer}-plays`;

  return (
    <div className="space-y-5">
      <h3 className="font-semibold" style={{ color: TRAINERS[trainer].accent }}>
        {name}
      </h3>

      <div className="space-y-1.5">
        <span className="text-sm font-medium leading-none">Exam date</span>
        <ExamDateControls
          trainer={trainer}
          value={settings.examDate}
          onChange={iso => {
            setSetting('examDate', iso);
          }}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={writingId}>Writing time</Label>
        <Select
          value={String(settings.writingMinutes)}
          onValueChange={value => {
            setSetting('writingMinutes', Number(value));
          }}
        >
          <SelectTrigger id={writingId} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {writingChoices.map(choice => (
              <SelectItem key={choice.value} value={String(choice.value)}>
                {choice.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={playsId}>Audio plays per item</Label>
        <Select
          value={String(settings.playsAllowed)}
          onValueChange={value => {
            setSetting('playsAllowed', Number(value));
          }}
        >
          <SelectTrigger id={playsId} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {playsChoices.map(choice => (
              <SelectItem key={choice.value} value={String(choice.value)}>
                {choice.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TrainerConditionsColumn;
