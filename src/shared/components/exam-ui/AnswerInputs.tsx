import { LETTERS } from '@/shared/lib/format.ts';
import {
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui';

interface RichtigFalschProps {
  /** Item id, e.g. `l4.2`; used to tie labels to inputs. */
  readonly name: string;
  readonly value: boolean | undefined;
  readonly onChange: (value: boolean) => void;
}

/** richtig / falsch. Radix works in strings, so the boolean is encoded on the way through. */
export function RichtigFalsch({ name, value, onChange }: RichtigFalschProps) {
  return (
    <RadioGroup
      className="flex flex-wrap gap-x-6 gap-y-2"
      value={value == null ? '' : String(value)}
      onValueChange={next => {
        onChange(next === 'true');
      }}
    >
      {(
        [
          ['true', 'richtig'],
          ['false', 'falsch']
        ] as const
      ).map(([raw, label]) => (
        <div className="flex items-center gap-2" key={raw}>
          <RadioGroupItem value={raw} id={`${name}-${raw}`} />
          <Label htmlFor={`${name}-${raw}`} className="cursor-pointer font-normal">
            {label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

interface MultipleChoiceProps {
  readonly name: string;
  readonly options: readonly string[];
  /** Index into `options`. */
  readonly value: number | undefined;
  readonly onChange: (value: number) => void;
}

export function MultipleChoice({ name, options, value, onChange }: MultipleChoiceProps) {
  return (
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
}

interface LetterSelectProps {
  readonly count: number;
  readonly value: number | undefined;
  readonly onChange: (value: number) => void;
  readonly placeholder?: string;
}

/** Letter dropdown (a–h) for the matching parts of Lesen. */
export function LetterSelect({ count, value, onChange, placeholder = '–' }: LetterSelectProps) {
  return (
    <Select
      value={value == null ? '' : String(value)}
      onValueChange={next => {
        onChange(Number(next));
      }}
    >
      <SelectTrigger size="sm" className="w-20">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: count }, (_, index) => (
          <SelectItem key={index} value={String(index)}>
            {LETTERS[index]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
