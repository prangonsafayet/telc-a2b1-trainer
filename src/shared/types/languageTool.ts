/** The subset of LanguageTool's /v2/check response this app relies on. */

export interface LtReplacement {
  readonly value: string;
}

export interface LtRule {
  readonly id: string;
  /** 'grammar' | 'misspelling' | 'typographical' | 'style' | 'duplication' | … */
  readonly issueType: string;
  readonly category: { readonly id: string; readonly name: string };
}

export interface LtMatch {
  readonly message: string;
  readonly shortMessage?: string;
  /** Character offset into the checked text. */
  readonly offset: number;
  readonly length: number;
  readonly replacements: readonly LtReplacement[];
  readonly rule: LtRule;
}

export type LtUnavailableReason = 'not-configured' | 'offline' | 'rate-limited' | 'too-long' | 'error';

export type LtResult =
  | { readonly kind: 'ok'; readonly matches: readonly LtMatch[] }
  | { readonly kind: 'unavailable'; readonly reason: LtUnavailableReason };
