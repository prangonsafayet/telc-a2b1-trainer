import { LETTERS } from '@shared/lib/format.ts';

interface OptionCardsProps {
  /** The lettered ads or headlines the items match against. */
  readonly items: readonly string[];
}

/** The a)–l) option grid of a matching Teil. */
const OptionCards = ({ items }: OptionCardsProps) => (
  <div className="stagger my-4 grid gap-2 sm:grid-cols-2">
    {items.map((item, index) => (
      <div key={index} className="rounded-lg border bg-muted/40 p-3 text-sm leading-relaxed">
        <b className="mr-1.5 text-primary">{LETTERS[index] ?? String(index + 1)})</b>
        {item}
      </div>
    ))}
  </div>
);

export default OptionCards;
