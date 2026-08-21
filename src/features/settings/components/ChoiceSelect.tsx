import { type SettingChoice } from '@shared/config/examConditions.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui';

interface ChoiceSelectProps {
  /** Id the field's own label points at. */
  readonly id: string;
  readonly value: number;
  readonly choices: readonly SettingChoice[];
  readonly onChange: (value: number) => void;
}

/**
 * A select over one numeric setting's choices. Every exam-condition and audio setting is
 * this shape, so the number-to-string conversion Radix needs is done once, here.
 */
const ChoiceSelect = ({ id, value, choices, onChange }: ChoiceSelectProps) => (
  <Select
    value={String(value)}
    onValueChange={next => {
      onChange(Number(next));
    }}
  >
    <SelectTrigger id={id} className="w-full">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {choices.map(choice => (
        <SelectItem key={choice.value} value={String(choice.value)}>
          {choice.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default ChoiceSelect;
