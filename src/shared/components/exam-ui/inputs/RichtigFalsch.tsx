import { Label, RadioGroup, RadioGroupItem } from '@shared/ui';

interface RichtigFalschProps {
  /** Item id, e.g. `l4.2`; used to tie labels to inputs. */
  readonly name: string;
  readonly value: boolean | undefined;
  readonly onChange: (value: boolean) => void;
}

/** richtig / falsch. Radix works in strings, so the boolean is encoded on the way through. */
const RichtigFalsch = ({ name, value, onChange }: RichtigFalschProps) => (
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

export default RichtigFalsch;
