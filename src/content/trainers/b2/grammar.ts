import { type CaseItem, type PrepVerbEntry } from '@shared/types';

/* B2 grammar banks: Verben mit Präposition and case government (Akkusativ / Dativ /
   Genitiv). Ids are persisted SRS keys — never renumber existing items. */

export const B2_PREP_VERBS: readonly PrepVerbEntry[] = [
  {
    id: 'b2.pv.001',
    de: 'warten auf + Akk.',
    en: 'to wait for',
    verb: 'warten',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Wir warten seit zwanzig Minuten auf den Bus.',
      en: 'We have been waiting for the bus for twenty minutes.'
    }
  },
  {
    id: 'b2.pv.002',
    de: 'sich freuen über + Akk.',
    en: 'to be pleased about',
    verb: 'sich freuen',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Ich habe mich sehr über dein Geschenk gefreut.',
      en: 'I was very pleased about your present.'
    }
  }
];

export const B2_CASE_ITEMS: readonly CaseItem[] = [
  {
    id: 'b2.c.001',
    de: 'für + Akkusativ',
    en: 'for',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: { de: 'Das Geschenk ist für meinen Bruder.', en: 'The present is for my brother.' }
  },
  {
    id: 'b2.c.002',
    de: 'mit + Dativ',
    en: 'with',
    kasus: 'dativ',
    kind: 'praeposition',
    example: { de: 'Ich fahre mit dem Zug nach Berlin.', en: 'I am going to Berlin by train.' }
  },
  {
    id: 'b2.c.003',
    de: 'wegen + Genitiv',
    en: 'because of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Wegen des Wetters bleiben wir heute zu Hause.',
      en: 'Because of the weather we are staying at home today.'
    }
  }
];
