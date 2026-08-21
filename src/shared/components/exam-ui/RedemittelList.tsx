interface RedemittelListProps {
  readonly items: readonly string[];
}

/** The highlighted phrase suggestions of a speaking Teil. */
const RedemittelList = ({ items }: RedemittelListProps) => (
  <div className="my-4 rounded-lg border-l-4 border-[color:var(--warning)] bg-[color-mix(in_oklab,var(--warning)_10%,transparent)] p-3">
    <b className="text-sm">Redemittel:</b>
    <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export default RedemittelList;
