/** A run of literal text between gaps, split into lines. */
export interface TextSegment {
  readonly kind: 'text';
  readonly lines: readonly string[];
}

/** A `[1]`-style placeholder to be replaced by an input. */
export interface GapSegment {
  readonly kind: 'gap';
  /** Zero-based index into the gap/answer arrays. */
  readonly gapIndex: number;
  /** The number as authored, shown as the placeholder. */
  readonly label: string;
}

export type GapTextSegment = TextSegment | GapSegment;

/**
 * Splits Sprachbausteine text like "… ich [1] gestern …" into literal runs and gaps so it
 * can be rendered with real inputs instead of injected HTML.
 */
export function splitGapText(text: string): readonly GapTextSegment[] {
  return text.split(/(\[\d\])/).map<GapTextSegment>(chunk => {
    const match = /^\[(\d)\]$/.exec(chunk);
    if (match?.[1]) {
      return { kind: 'gap', gapIndex: Number(match[1]) - 1, label: match[1] };
    }
    return { kind: 'text', lines: chunk.split('\n') };
  });
}
