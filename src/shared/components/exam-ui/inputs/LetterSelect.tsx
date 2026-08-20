import { LETTERS } from '@shared/lib/format.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui';

interface LetterSelectProps {
  readonly count: number;
  readonly value: number | undefined;
  readonly onChange: (value: number) => void;
  readonly placeholder?: string;
}

/** Letter dropdown (a–l) for the matching parts of Lesen. */
const LetterSelect = ({ count, value, onChange, placeholder = '–' }: LetterSelectProps) => (
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
          {LETTERS[index] ?? String(index + 1)}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default LetterSelect;
