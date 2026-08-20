import {
  LT_CATEGORY_TO_WEAKNESS,
  LT_ISSUE_TYPE_TO_WEAKNESS,
  LT_RULE_TO_WEAKNESS
} from '@shared/config/weakness.ts';
import { type ErrorReportEntry, type LtMatch, type WeaknessCategory } from '@shared/types';

/** Rule id first (most specific), then category, then issue type. */
const classify = (rule: LtMatch['rule']): WeaknessCategory => {
  const byRule = Object.entries(LT_RULE_TO_WEAKNESS).find(([prefix]) => rule.id.startsWith(prefix));
  if (byRule) return byRule[1];
  return LT_CATEGORY_TO_WEAKNESS[rule.category.id] ?? LT_ISSUE_TYPE_TO_WEAKNESS[rule.issueType] ?? 'style';
};

/**
 * Turns LanguageTool's raw matches into a report a learner can read on its own: one entry
 * per span, sorted with the text, classified by what to study rather than which rule fired.
 */
export const buildErrorReport = (text: string, matches: readonly LtMatch[]): readonly ErrorReportEntry[] => {
  const bySpan = new Map<string, ErrorReportEntry>();

  for (const match of [...matches].sort((a, b) => a.offset - b.offset)) {
    /* Two rules firing on one span is one mistake to the learner. First wins. */
    const span = `${String(match.offset)}:${String(match.length)}`;
    if (bySpan.has(span)) continue;
    /* A `??` here would keep an all-whitespace shortMessage; the learner needs the real
       message, not a blank line. */
    const shortMessage = match.shortMessage?.trim();
    bySpan.set(span, {
      offset: match.offset,
      length: match.length,
      excerpt: text.slice(match.offset, match.offset + match.length),
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- deliberately falsy, not nullish: an all-whitespace shortMessage trims to '' and must still fall back
      message: shortMessage ? shortMessage : match.message,
      category: classify(match.rule),
      suggestion: match.replacements[0]?.value ?? null,
      ruleId: match.rule.id
    });
  }

  return [...bySpan.values()];
};
