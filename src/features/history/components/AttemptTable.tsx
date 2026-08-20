import { Link } from 'react-router-dom';

import { gradeTone } from '@shared/lib/examBadges.ts';
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui';

import { ATTEMPT_COLUMNS, type AttemptRow } from '../lib/attemptRows.ts';

interface AttemptTableProps {
  readonly rows: readonly AttemptRow[];
}

const AttemptTable = ({ rows }: AttemptTableProps) => {
  if (rows.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No attempts yet.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {ATTEMPT_COLUMNS.map((column, index) => (
            <TableHead key={index}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.test}</TableCell>
            <TableCell>{row.mode}</TableCell>
            <TableCell className="tabular-nums">{row.lesen}</TableCell>
            <TableCell className="tabular-nums">{row.sprachbausteine}</TableCell>
            <TableCell className="tabular-nums">{row.hoeren}</TableCell>
            <TableCell className="tabular-nums">{row.schreiben}</TableCell>
            <TableCell className="tabular-nums">{row.sprechen}</TableCell>
            <TableCell className="font-semibold tabular-nums">{row.total}</TableCell>
            <TableCell>
              {row.result ? <Badge variant={gradeTone(row.result)}>{row.result}</Badge> : '–'}
            </TableCell>
            <TableCell className="tabular-nums">{row.time}</TableCell>
            <TableCell>
              <Button asChild variant="ghost" size="sm">
                <Link to={`/review/${String(row.id)}`}>Review</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttemptTable;
