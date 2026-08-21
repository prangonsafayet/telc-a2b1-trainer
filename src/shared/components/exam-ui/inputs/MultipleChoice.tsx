import { LETTERS } from '@shared/lib/format.ts';
import { Label, RadioGroup, RadioGroupItem } from '@shared/ui';

interface MultipleChoiceProps {
  readonly name: string;
  readonly options: readonly string[];
  /** Index into `options`. */
  readonly value: number | undefined;
  readonly onChange: (value: number) => void;
}

const MultipleChoice = ({ name, options, value, onChange }: MultipleChoiceProps) => (
  <RadioGroup
    className="gap-2"
    value={value == null ? '' : String(value)}
    onValueChange={next => {
      onChange(Number(next));
    }}
  >
    {options.map((option, index) => (
      <div className="flex items-start gap-2" key={index}>
        <RadioGroupItem value={String(index)} id={`${name}-${String(index)}`} className="mt-1" />
        <Label
          htmlFor={`${name}-${String(index)}`}
          className="cursor-pointer items-start font-normal leading-relaxed"
        >
          <span className="text-muted-foreground">{LETTERS[index]})</span> {option}
        </Label>
      </div>
    ))}
  </RadioGroup>
);

export default MultipleChoice;
