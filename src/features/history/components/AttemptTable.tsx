import { ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '@shared/lib/cn.ts';
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui';

import { type AttemptTableModel } from '../types/attemptTable.ts';

interface AttemptTableProps {
  readonly model: AttemptTableModel;
}

const AttemptTable = ({ model }: AttemptTableProps) => {
  if (model.rows.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Nothing here yet — take a Modelltest and it will show up.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {model.columns.map((column, index) => (
            <TableHead key={index}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {model.rows.map(row => (
          <TableRow key={row.id}>
            {row.cells.map((cell, index) => (
              <TableCell
                key={index}
                className={cn(cell.numeric && 'tabular-nums', cell.strong && 'font-semibold')}
              >
                {cell.badge ? <Badge variant={cell.badge}>{cell.text}</Badge> : cell.text}
              </TableCell>
            ))}
            <TableCell>
              <Button asChild variant="ghost" size="sm">
                <Link to={row.reviewTo}>
                  <ListChecks /> Review
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttemptTable;
