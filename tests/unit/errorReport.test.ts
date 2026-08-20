import { describe, expect, it } from 'vitest';

import { buildErrorReport } from '@features/feedback/lib/errorReport.ts';
import { type LtMatch } from '@shared/types';

/*
 * The default rule id is deliberately not one of LT_RULE_TO_WEAKNESS's prefixes (unlike
 * 'DE_AGREEMENT', which is): the fixture's default should exercise the category/issueType
 * fallback unless a test overrides `rule.id` on purpose, and `startsWith` matching means
 * any id sharing that prefix — including the exact string — would otherwise always win
 * over whatever category the test sets.
 */
/*
 * `Partial<LtMatch> & { rule?: Partial<LtMatch['rule']> }` looks right but is not: because
 * `Partial<LtMatch>` already carries `rule?: LtRule` (Partial does not go deep), the
 * intersection on `rule` requires the full `LtRule` anyway. `Omit` drops that property
 * before adding back the genuinely partial one.
 */
const match = (
  over: Omit<Partial<LtMatch>, 'rule'> & { readonly rule?: Partial<LtMatch['rule']> } = {}
): LtMatch => ({
  message: 'Möglicher Fehler',
  offset: 0,
  length: 4,
  replacements: [{ value: 'einen' }],
  ...over,
  rule: {
    id: 'MORFOLOGIK_RULE_DE_DE',
    issueType: 'grammar',
    category: { id: 'GRAMMAR', name: 'Grammatik' },
    ...over.rule
  }
});

describe('buildErrorReport', () => {
  it('quotes the exact span from the text', () => {
    const [entry] = buildErrorReport('Ich habe ein Hund gesehen.', [match({ offset: 9, length: 8 })]);
    expect(entry?.excerpt).toBe('ein Hund');
  });

  it('classifies by category, falling back to issue type', () => {
    const report = buildErrorReport('Der Hund. Die Katze.', [
      match({ rule: { category: { id: 'CASING', name: 'Groß-/Kleinschreibung' } } }),
      match({ offset: 10, rule: { category: { id: 'UNKNOWN_TO_US', name: '?' }, issueType: 'misspelling' } })
    ]);
    expect(report.map(entry => entry.category)).toEqual(['spelling', 'spelling']);
  });

  it('prefers a non-empty shortMessage over the full message, trimmed', () => {
    const [entry] = buildErrorReport('ein Hund', [
      match({ message: 'Die längere Erklärung.', shortMessage: '  Kurzform  ' })
    ]);
    expect(entry?.message).toBe('Kurzform');
  });

  it('falls back to the full message when shortMessage is all whitespace', () => {
    const [entry] = buildErrorReport('ein Hund', [
      match({ message: 'Die längere Erklärung.', shortMessage: '   ' })
    ]);
    expect(entry?.message).toBe('Die längere Erklärung.');
  });

  it('keeps the first suggestion and drops the rest', () => {
    const [entry] = buildErrorReport('ein Hund', [
      match({ replacements: [{ value: 'einen' }, { value: 'eines' }, { value: 'einem' }] })
    ]);
    expect(entry?.suggestion).toBe('einen');
  });

  it('sorts by position so the list reads with the text', () => {
    const report = buildErrorReport('aaaa bbbb cccc', [match({ offset: 10 }), match({ offset: 0 })]);
    expect(report.map(entry => entry.offset)).toEqual([0, 10]);
  });

  it('drops duplicate matches on the same span from different rules', () => {
    const report = buildErrorReport('ein Hund', [
      match({ offset: 0, length: 3, rule: { id: 'RULE_A' } }),
      match({ offset: 0, length: 3, rule: { id: 'RULE_B' } })
    ]);
    expect(report).toHaveLength(1);
  });

  it('returns nothing for clean text', () => {
    expect(buildErrorReport('Guten Tag.', [])).toEqual([]);
  });
});
