/**
 * The attempts table as a resolved model. The two papers report different columns — four
 * 60-point skills against a written/oral split — so the cells are worked out per format and
 * the table component only lays them out.
 */

import { type BadgeTone } from '@shared/lib/examBadges.ts';

export interface AttemptCell {
  readonly text: string;
  /** Rendered as a badge in this tone rather than as plain text. */
  readonly badge: BadgeTone | null;
  /** Numbers are tabular so columns line up. */
  readonly numeric: boolean;
  /** The one number worth reading first in a row. */
  readonly strong: boolean;
}

export interface AttemptRow {
  readonly id: number;
  readonly cells: readonly AttemptCell[];
  /** Route to this attempt's review screen. */
  readonly reviewTo: string;
}

export interface AttemptTableModel {
  /**
   * Headers for the data columns, one per cell in every row. The review-link column is not
   * one of them: the table appends that header and that cell together, so the two counts
   * cannot drift. It used to be declared here as `''`, which rendered an unnamed
   * `<TableHead>` — a column with no accessible name at all.
   */
  readonly columns: readonly string[];
  /** Newest first — the most recent attempt is the one you want to see. */
  readonly rows: readonly AttemptRow[];
}
