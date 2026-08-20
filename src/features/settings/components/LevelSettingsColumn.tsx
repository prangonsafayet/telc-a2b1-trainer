import { TRAINERS } from '@shared/config/trainers.ts';
import { type SingleLevelTrainerId } from '@shared/types';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui';

import { useLevelExamSettings } from '../hooks/useLevelExamSettings.ts';

import ExamDateControls from './ExamDateControls.tsx';

interface LevelSettingsColumnProps {
  readonly level: SingleLevelTrainerId;
}

/** One level trainer's settings: exam date, writing time and audio plays. */
const LevelSettingsColumn = ({ level }: LevelSettingsColumnProps) => {
  const { settings, setLevelSetting } = useLevelExamSettings(level);
  const writingId = `setting-${level}-writing`;
  const playsId = `setting-${level}-plays`;

  return (
    <div className="space-y-5">
      <h3 className="font-semibold">{TRAINERS[level].name}</h3>

      <div className="space-y-1.5">
        <span className="text-sm font-medium leading-none">Exam date</span>
        <ExamDateControls
          value={settings.examDate}
          onChange={iso => {
            setLevelSetting('examDate', iso);
          }}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={writingId}>Writing time</Label>
        <Select
          value={String(settings.writingMinutes)}
          onValueChange={value => {
            setLevelSetting('writingMinutes', Number(value));
          }}
        >
          <SelectTrigger id={writingId} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 minutes (official)</SelectItem>
            <SelectItem value="40">40 minutes (relaxed)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={playsId}>Audio plays per item</Label>
        <Select
          value={String(settings.playsAllowed)}
          onValueChange={value => {
            setLevelSetting('playsAllowed', Number(value));
          }}
        >
          <SelectTrigger id={playsId} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 (official — you hear it once)</SelectItem>
            <SelectItem value="2">2 (training)</SelectItem>
            <SelectItem value="3">3 (training)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LevelSettingsColumn;
