import { type AdjectiveEntry, type NounEntry, type VerbEntry, type VocabBank } from '@shared/types';

import { B1_CASE_ITEMS, B1_PREP_VERBS } from './grammar.ts';

/* The B1 vocabulary bank. Ids are persisted SRS keys — never renumber existing items. */

export const B1_VERBS: readonly VerbEntry[] = [
  {
    id: 'b1.v.001',
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
    id: 'b1.v.002',
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

export const B1_NOUNS: readonly NounEntry[] = [
  {
    id: 'b1.n.001',
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
    id: 'b1.n.002',
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

export const B1_ADJECTIVES: readonly AdjectiveEntry[] = [
  {
    id: 'b1.a.001',
    de: 'zuverlässig',
    en: 'reliable',
    komparativ: 'zuverlässiger',
    superlativ: 'am zuverlässigsten',
    example: { de: 'Sie ist eine sehr zuverlässige Kollegin.', en: 'She is a very reliable colleague.' }
  },
  {
    id: 'b1.a.002',
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

export const B1_VOCAB: VocabBank = {
  verbs: B1_VERBS,
  nouns: B1_NOUNS,
  adjectives: B1_ADJECTIVES,
  prepVerbs: B1_PREP_VERBS,
  caseItems: B1_CASE_ITEMS
};
