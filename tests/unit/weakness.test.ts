import { describe, expect, it } from 'vitest';

import { buildErrorReport } from '@features/feedback/lib/errorReport.ts';
import { LT_RULE_TO_WEAKNESS, WEAKNESS_CATEGORIES, WEAKNESS_TOPICS } from '@shared/config/weakness.ts';
import { TRAINER_ORDER, TRAINERS } from '@shared/config/trainers.ts';
import { type LtMatch } from '@shared/types';

/*
 * Every weakness a learner can be told about must resolve to a real cheatsheet on every
 * trainer — or to an explicit "no cheatsheet, use the practice hub" empty list — never to a
 * dangling key. A flat category → cheatsheet-key map cannot say that for all three trainers
 * at once (see the doc comment on WEAKNESS_TOPICS), so this checks the two-step resolution
 * Task 7 will actually use: category → topic → this trainer's own keys.
 */
describe('weakness → cheatsheet resolution', () => {
  it('gives every weakness category a topic', () => {
    for (const category of WEAKNESS_CATEGORIES) {
      expect(WEAKNESS_TOPICS[category]).toBeDefined();
    }
  });

  it('only points at cheatsheets each trainer actually authored', () => {
    for (const trainerId of TRAINER_ORDER) {
      const trainer = TRAINERS[trainerId];
      const realKeys = new Set(Object.keys(trainer.content.curriculum.cheatsheets));
      for (const category of WEAKNESS_CATEGORIES) {
        const topic = WEAKNESS_TOPICS[category];
        const keys = trainer.weaknessCheatsheets[topic];
        const missing = keys.filter(key => !realKeys.has(key));
        expect(missing, `${trainerId}.weaknessCheatsheets.${topic}`).toEqual([]);
      }
    }
  });
});

const ltMatch = (rule: Partial<LtMatch['rule']>): LtMatch => ({
  message: 'Möglicher Fehler',
  offset: 0,
  length: 3,
  replacements: [],
  rule: { id: 'GENERIC_RULE', issueType: 'grammar', category: { id: 'GRAMMAR', name: 'Grammatik' }, ...rule }
});

/*
 * The public LanguageTool API (no self-hosted n-gram data) reliably catches only two error
 * classes: spelling and preposition-and-case — measured directly against
 * https://api.languagetool.org, which missed a wrong-article-case sentence and a
 * subject-verb agreement sentence while catching a misspelling (GERMAN_SPELLER_RULE, via
 * its TYPOS category) and "zu die Schule" (PRAEP_DAT). Both must classify usefully.
 */
describe('the two error classes the public API actually catches', () => {
  it('classifies PRAEP_DAT as a preposition weakness', () => {
    expect(LT_RULE_TO_WEAKNESS['PRAEP_DAT']).toBe('preposition');
    const [entry] = buildErrorReport('Ich gehe zu die Schule.', [
      ltMatch({ id: 'PRAEP_DAT', category: { id: 'GRAMMAR', name: 'Grammatik' } })
    ]);
    expect(entry?.category).toBe('preposition');
  });

  it('classifies a speller-rule miss as a spelling weakness via its category', () => {
    const [entry] = buildErrorReport('Ich habe einen Bref geschrieben.', [
      ltMatch({
        id: 'GERMAN_SPELLER_RULE',
        issueType: 'misspelling',
        category: { id: 'TYPOS', name: 'Rechtschreibung' }
      })
    ]);
    expect(entry?.category).toBe('spelling');
  });
});
