import { LETTERS } from '@shared/lib/format.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui';

interface InlineGapSelectProps {
  /** The gap number as authored, shown as the placeholder. */
  readonly label: string;
  readonly options: readonly string[];
  readonly value: number | undefined;
  readonly onChange: (value: number) => void;
}

/** One inline dropdown inside a Sprachbausteine gap text. */
const InlineGapSelect = ({ label, options, value, onChange }: InlineGapSelectProps) => (
  <Select
    value={value == null ? '' : String(value)}
    onValueChange={next => {
      onChange(Number(next));
    }}
  >
    <SelectTrigger
      size="sm"
      aria-label={`Lücke ${label}`}
      className="mx-1 inline-flex h-7 max-w-52 bg-background align-baseline"
    >
      <SelectValue placeholder={`[${label}]`} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option, index) => (
        <SelectItem key={index} value={String(index)}>
          <span className="text-muted-foreground">{LETTERS[index] ?? String(index + 1)})</span> {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default InlineGapSelect;
