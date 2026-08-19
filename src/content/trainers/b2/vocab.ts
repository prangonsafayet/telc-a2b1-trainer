import { type AdjectiveEntry, type NounEntry, type VerbEntry, type VocabBank } from '@shared/types';

import { B2_CASE_ITEMS, B2_PREP_VERBS } from './grammar.ts';

/* The B2 vocabulary bank. Ids are persisted SRS keys — never renumber existing items. */

export const B2_VERBS: readonly VerbEntry[] = [
  {
    id: 'b2.v.001',
    de: 'anbieten',
    en: 'to offer',
    praesens: 'bietet an',
    praeteritum: 'bot an',
    perfekt: 'hat angeboten',
    example: {
      de: 'Die Firma bietet ihren Mitarbeitern flexible Arbeitszeiten an.',
      en: 'The company offers its employees flexible working hours.'
    }
  },
  {
    id: 'b2.v.002',
    de: 'sich bewerben',
    en: 'to apply (for a job)',
    praesens: 'bewirbt sich',
    praeteritum: 'bewarb sich',
    perfekt: 'hat sich beworben',
    example: {
      de: 'Ich habe mich um die Stelle als Verkäufer beworben.',
      en: 'I applied for the position as a salesperson.'
    }
  }
];

export const B2_NOUNS: readonly NounEntry[] = [
  {
    id: 'b2.n.001',
    de: 'Bewerbung',
    en: 'application',
    article: 'die',
    plural: 'die Bewerbungen',
    example: {
      de: 'Ihre Bewerbung muss bis Freitag bei uns sein.',
      en: 'Your application must reach us by Friday.'
    }
  },
  {
    id: 'b2.n.002',
    de: 'Termin',
    en: 'appointment',
    article: 'der',
    plural: 'die Termine',
    example: {
      de: 'Ich möchte einen Termin beim Zahnarzt vereinbaren.',
      en: 'I would like to arrange an appointment at the dentist.'
    }
  }
];

export const B2_ADJECTIVES: readonly AdjectiveEntry[] = [
  {
    id: 'b2.a.001',
    de: 'zuverlässig',
    en: 'reliable',
    komparativ: 'zuverlässiger',
    superlativ: 'am zuverlässigsten',
    example: { de: 'Sie ist eine sehr zuverlässige Kollegin.', en: 'She is a very reliable colleague.' }
  },
  {
    id: 'b2.a.002',
    de: 'günstig',
    en: 'cheap, favourable',
    komparativ: 'günstiger',
    superlativ: 'am günstigsten',
    example: {
      de: 'Im Winter sind die Flüge deutlich günstiger.',
      en: 'In winter the flights are considerably cheaper.'
    }
  }
];

export const B2_VOCAB: VocabBank = {
  verbs: B2_VERBS,
  nouns: B2_NOUNS,
  adjectives: B2_ADJECTIVES,
  prepVerbs: B2_PREP_VERBS,
  caseItems: B2_CASE_ITEMS
};
