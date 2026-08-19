import { Link } from 'react-router-dom';

import { Badge } from '@/shared/components/ui/badge.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/shared/components/ui/table.tsx';
import { gradeTone } from '@/shared/lib/exam-badges.ts';

import { ATTEMPT_COLUMNS, type AttemptRow } from '../lib/attempt-rows.ts';

interface AttemptTableProps {
  readonly rows: readonly AttemptRow[];
}

export function AttemptTable({ rows }: AttemptTableProps) {
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
}
