interface PunkteGridProps {
  readonly items: readonly string[];
}

/** The task-point cards of a speaking Teil. */
const PunkteGrid = ({ items }: PunkteGridProps) => (
  <div className="stagger my-4 grid gap-2 sm:grid-cols-2">
    {items.map((item, index) => (
      <div key={index} className="rounded-lg border bg-muted/40 p-3 text-sm">
        {item}
      </div>
    ))}
  </div>
);

export default PunkteGrid;
