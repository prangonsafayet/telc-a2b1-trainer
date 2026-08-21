import { type CaseItem, type PrepVerbEntry } from '@shared/types';

/* A2·B1 grammar banks: Verben mit Präposition and case government (Akkusativ / Dativ /
   Genitiv). Ids are persisted SRS keys — never renumber existing items. */

export const A2B1_PREP_VERBS: readonly PrepVerbEntry[] = [
  {
    id: 'a2b1.pv.001',
    de: 'warten auf + Akk.',
    en: 'to wait for',
    verb: 'warten',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Ich warte schon zehn Minuten auf die Straßenbahn.',
      en: 'I have been waiting for the tram for ten minutes already.'
    }
  },
  {
    id: 'a2b1.pv.002',
    de: 'sich freuen auf + Akk.',
    en: 'to look forward to',
    verb: 'sich freuen',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Die Kinder freuen sich auf die Sommerferien.',
      en: 'The children are looking forward to the summer holidays.'
    }
  },
  {
    id: 'a2b1.pv.003',
    de: 'sich freuen über + Akk.',
    en: 'to be pleased about',
    verb: 'sich freuen',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Meine Mutter hat sich sehr über die Blumen gefreut.',
      en: 'My mother was very pleased about the flowers.'
    }
  },
  {
    id: 'a2b1.pv.004',
    de: 'sich interessieren für + Akk.',
    en: 'to be interested in',
    verb: 'sich interessieren',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Mein Sohn interessiert sich sehr für Fußball.',
      en: 'My son is very interested in football.'
    }
  },
  {
    id: 'a2b1.pv.005',
    de: 'denken an + Akk.',
    en: 'to think of',
    verb: 'denken',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'Ich muss noch an die Einkaufsliste denken.',
      en: 'I still need to think of the shopping list.'
    }
  },
  {
    id: 'a2b1.pv.006',
    de: 'sich erinnern an + Akk.',
    en: 'to remember',
    verb: 'sich erinnern',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'Erinnerst du dich noch an unseren Deutschlehrer?',
      en: 'Do you still remember our German teacher?'
    }
  },
  {
    id: 'a2b1.pv.007',
    de: 'sich gewöhnen an + Akk.',
    en: 'to get used to',
    verb: 'sich gewöhnen',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'Er hat sich schnell an das neue Land gewöhnt.',
      en: 'He quickly got used to the new country.'
    }
  },
  {
    id: 'a2b1.pv.008',
    de: 'glauben an + Akk.',
    en: 'to believe in',
    verb: 'glauben',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'Sie glaubt fest an einen guten Ausgang.',
      en: 'She firmly believes in a good outcome.'
    }
  },
  {
    id: 'a2b1.pv.009',
    de: 'sich ärgern über + Akk.',
    en: 'to be annoyed about',
    verb: 'sich ärgern',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Ich habe mich über die lange Wartezeit beim Amt geärgert.',
      en: 'I was annoyed about the long waiting time at the office.'
    }
  },
  {
    id: 'a2b1.pv.010',
    de: 'sich beschweren über + Akk.',
    en: 'to complain about',
    verb: 'sich beschweren',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Der Gast beschwert sich über das kalte Essen.',
      en: 'The guest is complaining about the cold food.'
    }
  },
  {
    id: 'a2b1.pv.011',
    de: 'sprechen über + Akk.',
    en: 'to talk about',
    verb: 'sprechen',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Wir sprechen im Kurs über typische Familienfeste.',
      en: 'In the course we talk about typical family celebrations.'
    }
  },
  {
    id: 'a2b1.pv.012',
    de: 'diskutieren über + Akk.',
    en: 'to discuss',
    verb: 'diskutieren',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Die Nachbarn diskutieren oft über die Mietpreise.',
      en: 'The neighbours often discuss rental prices.'
    }
  },
  {
    id: 'a2b1.pv.013',
    de: 'nachdenken über + Akk.',
    en: 'to think about, to reflect on',
    verb: 'nachdenken',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Ich denke gerade über einen neuen Job nach.',
      en: 'I am currently thinking about a new job.'
    }
  },
  {
    id: 'a2b1.pv.014',
    de: 'sich entscheiden für + Akk.',
    en: 'to decide on',
    verb: 'sich entscheiden',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Wir haben uns für die größere Wohnung entschieden.',
      en: 'We decided on the bigger apartment.'
    }
  },
  {
    id: 'a2b1.pv.015',
    de: 'sich bewerben um + Akk.',
    en: 'to apply for',
    verb: 'sich bewerben',
    preposition: 'um',
    kasus: 'akkusativ',
    example: {
      de: 'Sie bewirbt sich um einen Platz im Deutschkurs.',
      en: 'She is applying for a place in the German course.'
    }
  },
  {
    id: 'a2b1.pv.016',
    de: 'bitten um + Akk.',
    en: 'to ask for',
    verb: 'bitten',
    preposition: 'um',
    kasus: 'akkusativ',
    example: {
      de: 'Ich möchte Sie um Ihre Geduld bitten.',
      en: 'I would like to ask for your patience.'
    }
  },
  {
    id: 'a2b1.pv.017',
    de: 'sich kümmern um + Akk.',
    en: 'to take care of',
    verb: 'sich kümmern',
    preposition: 'um',
    kasus: 'akkusativ',
    example: {
      de: 'Meine Schwester kümmert sich um unsere kranke Mutter.',
      en: 'My sister takes care of our sick mother.'
    }
  },
  {
    id: 'a2b1.pv.018',
    de: 'sich sorgen um + Akk.',
    en: 'to worry about',
    verb: 'sich sorgen',
    preposition: 'um',
    kasus: 'akkusativ',
    example: {
      de: 'Die Eltern sorgen sich um die Gesundheit ihres Kindes.',
      en: "The parents worry about their child's health."
    }
  },
  {
    id: 'a2b1.pv.019',
    de: 'kämpfen für + Akk.',
    en: 'to fight for',
    verb: 'kämpfen',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Die Mieter kämpfen gemeinsam für niedrigere Mietpreise.',
      en: 'The tenants are fighting together for lower rents.'
    }
  },
  {
    id: 'a2b1.pv.020',
    de: 'sich bedanken für + Akk.',
    en: 'to say thank you for',
    verb: 'sich bedanken',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Ich möchte mich für die schnelle Hilfe bedanken.',
      en: 'I would like to say thank you for the quick help.'
    }
  },
  {
    id: 'a2b1.pv.021',
    de: 'sich entschuldigen für + Akk.',
    en: 'to apologise for',
    verb: 'sich entschuldigen',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Er hat sich für seine Verspätung entschuldigt.',
      en: 'He apologised for being late.'
    }
  },
  {
    id: 'a2b1.pv.022',
    de: 'Angst haben vor + Dat.',
    en: 'to be afraid of',
    verb: 'Angst haben',
    preposition: 'vor',
    kasus: 'dativ',
    example: {
      de: 'Viele Patienten haben Angst vor der Untersuchung.',
      en: 'Many patients are afraid of the examination.'
    }
  },
  {
    id: 'a2b1.pv.023',
    de: 'sich fürchten vor + Dat.',
    en: 'to be scared of',
    verb: 'sich fürchten',
    preposition: 'vor',
    kasus: 'dativ',
    example: {
      de: 'Das kleine Kind fürchtet sich vor dem Hund.',
      en: 'The small child is scared of the dog.'
    }
  },
  {
    id: 'a2b1.pv.024',
    de: 'warnen vor + Dat.',
    en: 'to warn of',
    verb: 'warnen',
    preposition: 'vor',
    kasus: 'dativ',
    example: {
      de: 'Der Arzt warnt vor den Folgen des Rauchens.',
      en: 'The doctor warns of the consequences of smoking.'
    }
  },
  {
    id: 'a2b1.pv.025',
    de: 'träumen von + Dat.',
    en: 'to dream of',
    verb: 'träumen',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Sie träumt von einem Haus mit Garten.',
      en: 'She dreams of a house with a garden.'
    }
  },
  {
    id: 'a2b1.pv.026',
    de: 'erzählen von + Dat.',
    en: 'to tell about',
    verb: 'erzählen',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Erzähl mir bitte von deiner Reise nach Spanien.',
      en: 'Please tell me about your trip to Spain.'
    }
  },
  {
    id: 'a2b1.pv.027',
    de: 'abhängen von + Dat.',
    en: 'to depend on',
    verb: 'abhängen',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Der Preis der Wohnung hängt von der Lage ab.',
      en: 'The price of the apartment depends on the location.'
    }
  },
  {
    id: 'a2b1.pv.028',
    de: 'Abschied nehmen von + Dat.',
    en: 'to say farewell to',
    verb: 'Abschied nehmen',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Am Flughafen nehmen wir Abschied von unseren Großeltern.',
      en: 'At the airport we say farewell to our grandparents.'
    }
  },
  {
    id: 'a2b1.pv.029',
    de: 'teilnehmen an + Dat.',
    en: 'to take part in',
    verb: 'teilnehmen',
    preposition: 'an',
    kasus: 'dativ',
    example: {
      de: 'Alle Mitarbeiter nehmen an der Fortbildung teil.',
      en: 'All employees are taking part in the training.'
    }
  },
  {
    id: 'a2b1.pv.030',
    de: 'leiden an + Dat.',
    en: 'to suffer from (an illness)',
    verb: 'leiden',
    preposition: 'an',
    kasus: 'dativ',
    example: {
      de: 'Mein Großvater leidet an einer schweren Krankheit.',
      en: 'My grandfather suffers from a serious illness.'
    }
  },
  {
    id: 'a2b1.pv.031',
    de: 'sterben an + Dat.',
    en: 'to die of',
    verb: 'sterben',
    preposition: 'an',
    kasus: 'dativ',
    example: {
      de: 'Früher sind viele Menschen an dieser Krankheit gestorben.',
      en: 'In the past many people died of this illness.'
    }
  },
  {
    id: 'a2b1.pv.032',
    de: 'zweifeln an + Dat.',
    en: 'to doubt',
    verb: 'zweifeln',
    preposition: 'an',
    kasus: 'dativ',
    example: {
      de: 'Ich zweifle langsam an meiner Entscheidung.',
      en: 'I am slowly starting to doubt my decision.'
    }
  },
  {
    id: 'a2b1.pv.033',
    de: 'gehören zu + Dat.',
    en: 'to belong to, to be part of',
    verb: 'gehören',
    preposition: 'zu',
    kasus: 'dativ',
    example: {
      de: 'Der Balkon gehört zu unserer neuen Wohnung.',
      en: 'The balcony belongs to our new apartment.'
    }
  },
  {
    id: 'a2b1.pv.034',
    de: 'einladen zu + Dat.',
    en: 'to invite to',
    verb: 'einladen',
    preposition: 'zu',
    kasus: 'dativ',
    example: {
      de: 'Wir laden alle Nachbarn zu unserem Fest ein.',
      en: 'We are inviting all the neighbours to our party.'
    }
  },
  {
    id: 'a2b1.pv.035',
    de: 'gratulieren zu + Dat.',
    en: 'to congratulate on',
    verb: 'gratulieren',
    preposition: 'zu',
    kasus: 'dativ',
    example: {
      de: 'Ich gratuliere dir herzlich zu deinem neuen Job.',
      en: 'I congratulate you warmly on your new job.'
    }
  },
  {
    id: 'a2b1.pv.036',
    de: 'passen zu + Dat.',
    en: 'to match, to suit',
    verb: 'passen',
    preposition: 'zu',
    kasus: 'dativ',
    example: {
      de: 'Die Schuhe passen gut zu deinem Kleid.',
      en: 'The shoes match your dress well.'
    }
  },
  {
    id: 'a2b1.pv.037',
    de: 'helfen bei + Dat.',
    en: 'to help with',
    verb: 'helfen',
    preposition: 'bei',
    kasus: 'dativ',
    example: {
      de: 'Kannst du mir bei den Formularen helfen?',
      en: 'Can you help me with the forms?'
    }
  },
  {
    id: 'a2b1.pv.038',
    de: 'sich entschuldigen bei + Dat.',
    en: 'to apologise to (a person)',
    verb: 'sich entschuldigen',
    preposition: 'bei',
    kasus: 'dativ',
    example: {
      de: 'Er hat sich bei seiner Chefin entschuldigt.',
      en: 'He apologised to his boss.'
    }
  },
  {
    id: 'a2b1.pv.039',
    de: 'sich beschäftigen mit + Dat.',
    en: 'to occupy oneself with',
    verb: 'sich beschäftigen',
    preposition: 'mit',
    kasus: 'dativ',
    example: {
      de: 'In der Freizeit beschäftigt er sich mit alten Fotos.',
      en: 'In his free time he occupies himself with old photos.'
    }
  },
  {
    id: 'a2b1.pv.040',
    de: 'sich treffen mit + Dat.',
    en: 'to meet with',
    verb: 'sich treffen',
    preposition: 'mit',
    kasus: 'dativ',
    example: {
      de: 'Ich treffe mich am Samstag mit meiner Familie.',
      en: 'I am meeting with my family on Saturday.'
    }
  }
];

export const A2B1_CASE_ITEMS: readonly CaseItem[] = [
  {
    id: 'a2b1.c.001',
    de: 'für + Akkusativ',
    en: 'for',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: { de: 'Das Geschenk ist für meine Tante.', en: 'The present is for my aunt.' }
  },
  {
    id: 'a2b1.c.002',
    de: 'durch + Akkusativ',
    en: 'through',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: { de: 'Wir fahren durch den Tunnel.', en: 'We are driving through the tunnel.' }
  },
  {
    id: 'a2b1.c.003',
    de: 'gegen + Akkusativ',
    en: 'against',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Das Fahrrad steht gegen die Wand.',
      en: 'The bicycle is leaning against the wall.'
    }
  },
  {
    id: 'a2b1.c.004',
    de: 'ohne + Akkusativ',
    en: 'without',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Ohne meinen Ausweis darf ich nicht ins Amt.',
      en: 'Without my ID I am not allowed into the office.'
    }
  },
  {
    id: 'a2b1.c.005',
    de: 'um + Akkusativ',
    en: 'around, at (time)',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Der Termin beim Arzt ist um neun Uhr.',
      en: "The appointment at the doctor's is at nine o'clock."
    }
  },
  {
    id: 'a2b1.c.006',
    de: 'bis + Akkusativ',
    en: 'until, up to',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Der Antrag muss bis Freitag im Amt sein.',
      en: 'The application must be at the office by Friday.'
    }
  },
  {
    id: 'a2b1.c.007',
    de: 'entlang + Akkusativ',
    en: 'along',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: { de: 'Wir gehen den Fluss entlang.', en: 'We are walking along the river.' }
  },
  {
    id: 'a2b1.c.008',
    de: 'aus + Dativ',
    en: 'from, out of',
    kasus: 'dativ',
    kind: 'praeposition',
    example: { de: 'Meine Kollegin kommt aus Polen.', en: 'My colleague comes from Poland.' }
  },
  {
    id: 'a2b1.c.009',
    de: 'bei + Dativ',
    en: 'at, near, with',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Am Wochenende bin ich bei meinen Eltern.',
      en: "At the weekend I am at my parents' place."
    }
  },
  {
    id: 'a2b1.c.010',
    de: 'mit + Dativ',
    en: 'with',
    kasus: 'dativ',
    kind: 'praeposition',
    example: { de: 'Ich fahre mit dem Bus zur Arbeit.', en: 'I go to work by bus.' }
  },
  {
    id: 'a2b1.c.011',
    de: 'nach + Dativ',
    en: 'after, to',
    kasus: 'dativ',
    kind: 'praeposition',
    example: { de: 'Nach der Arbeit gehe ich einkaufen.', en: 'After work I go shopping.' }
  },
  {
    id: 'a2b1.c.012',
    de: 'seit + Dativ',
    en: 'since, for (time)',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Ich wohne seit einem Jahr in dieser Wohnung.',
      en: 'I have been living in this apartment for a year.'
    }
  },
  {
    id: 'a2b1.c.013',
    de: 'von + Dativ',
    en: 'from, of',
    kasus: 'dativ',
    kind: 'praeposition',
    example: { de: 'Das ist ein Brief von meiner Schwester.', en: 'This is a letter from my sister.' }
  },
  {
    id: 'a2b1.c.014',
    de: 'zu + Dativ',
    en: 'to',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Am Abend gehen wir zu einem Konzert.',
      en: 'In the evening we are going to a concert.'
    }
  },
  {
    id: 'a2b1.c.015',
    de: 'gegenüber + Dativ',
    en: 'opposite',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Die Apotheke liegt gegenüber dem Krankenhaus.',
      en: 'The pharmacy is opposite the hospital.'
    }
  },
  {
    id: 'a2b1.c.016',
    de: 'ab + Dativ',
    en: 'from (a time) on',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Ab nächster Woche arbeite ich in Teilzeit.',
      en: 'From next week on I am working part-time.'
    }
  },
  {
    id: 'a2b1.c.017',
    de: 'wegen + Genitiv',
    en: 'because of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Wegen des schlechten Wetters bleiben wir zu Hause.',
      en: 'Because of the bad weather we are staying home.'
    }
  },
  {
    id: 'a2b1.c.018',
    de: 'trotz + Genitiv',
    en: 'despite',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Trotz seiner Erkältung geht er zur Arbeit.',
      en: 'Despite his cold he is going to work.'
    }
  },
  {
    id: 'a2b1.c.019',
    de: 'während + Genitiv',
    en: 'during',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Während der Fahrt darf man nicht telefonieren.',
      en: 'You are not allowed to make calls during the drive.'
    }
  },
  {
    id: 'a2b1.c.020',
    de: 'statt + Genitiv',
    en: 'instead of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Statt eines Autos kauft sie sich ein Fahrrad.',
      en: 'Instead of a car she is buying herself a bicycle.'
    }
  },
  {
    id: 'a2b1.c.021',
    de: 'innerhalb + Genitiv',
    en: 'within',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Bitte zahlen Sie die Rechnung innerhalb einer Woche.',
      en: 'Please pay the invoice within a week.'
    }
  },
  {
    id: 'a2b1.c.022',
    de: 'außerhalb + Genitiv',
    en: 'outside of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Die Wohnung liegt außerhalb der Stadt.',
      en: 'The apartment is located outside the city.'
    }
  },
  {
    id: 'a2b1.c.023',
    de: 'aufgrund + Genitiv',
    en: 'due to',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Aufgrund des Streiks fahren heute keine Busse.',
      en: 'Due to the strike no buses are running today.'
    }
  },
  {
    id: 'a2b1.c.024',
    de: 'helfen + Dativ',
    en: 'to help',
    kasus: 'dativ',
    kind: 'verb',
    example: { de: 'Ich helfe meinem Nachbarn beim Umzug.', en: 'I am helping my neighbour with the move.' }
  },
  {
    id: 'a2b1.c.025',
    de: 'danken + Dativ',
    en: 'to thank',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Wir danken der Ärztin für die gute Behandlung.',
      en: 'We thank the doctor for the good treatment.'
    }
  },
  {
    id: 'a2b1.c.026',
    de: 'gefallen + Dativ',
    en: 'to please, to appeal to',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Die neue Wohnung gefällt meiner Familie sehr.',
      en: 'My family likes the new apartment a lot.'
    }
  },
  {
    id: 'a2b1.c.027',
    de: 'gehören + Dativ',
    en: 'to belong to',
    kasus: 'dativ',
    kind: 'verb',
    example: { de: 'Dieses Auto gehört meinem Bruder.', en: 'This car belongs to my brother.' }
  },
  {
    id: 'a2b1.c.028',
    de: 'gratulieren + Dativ',
    en: 'to congratulate',
    kasus: 'dativ',
    kind: 'verb',
    example: { de: 'Alle gratulieren dem Brautpaar.', en: 'Everyone congratulates the bride and groom.' }
  },
  {
    id: 'a2b1.c.029',
    de: 'folgen + Dativ',
    en: 'to follow',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Bitte folgen Sie dem Schild zum Ausgang.',
      en: 'Please follow the sign to the exit.'
    }
  },
  {
    id: 'a2b1.c.030',
    de: 'antworten + Dativ',
    en: 'to answer (a person)',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Der Beamte antwortet dem Kunden freundlich.',
      en: 'The official answers the customer politely.'
    }
  },
  {
    id: 'a2b1.c.031',
    de: 'vertrauen + Dativ',
    en: 'to trust',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Ich vertraue meinem Hausarzt völlig.',
      en: 'I trust my family doctor completely.'
    }
  },
  {
    id: 'a2b1.c.032',
    de: 'brauchen + Akkusativ',
    en: 'to need',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Für den Antrag brauche ich meinen Ausweis.',
      en: 'I need my ID for the application.'
    }
  },
  {
    id: 'a2b1.c.033',
    de: 'besuchen + Akkusativ',
    en: 'to visit',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Am Sonntag besuchen wir unsere Großeltern.',
      en: 'On Sunday we are visiting our grandparents.'
    }
  },
  {
    id: 'a2b1.c.034',
    de: 'einladen + Akkusativ',
    en: 'to invite (a person)',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Wir laden unsere neuen Nachbarn zum Kaffee ein.',
      en: 'We are inviting our new neighbours for coffee.'
    }
  },
  {
    id: 'a2b1.c.035',
    de: 'kennenlernen + Akkusativ',
    en: 'to get to know',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Im Deutschkurs habe ich viele neue Leute kennengelernt.',
      en: 'In the German course I got to know a lot of new people.'
    }
  },
  {
    id: 'a2b1.c.036',
    de: 'fragen + Akkusativ',
    en: 'to ask (a person)',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Frag doch die Verkäuferin nach dem Preis.',
      en: 'Just ask the shop assistant about the price.'
    }
  },
  {
    id: 'a2b1.c.037',
    de: 'jeden Tag — Akkusativ',
    en: 'every day (time expressions take the accusative)',
    kasus: 'akkusativ',
    kind: 'wendung',
    example: { de: 'Jeden Tag lernt sie zwanzig neue Wörter.', en: 'Every day she learns twenty new words.' }
  },
  {
    id: 'a2b1.c.038',
    de: 'letzten Monat — Akkusativ',
    en: 'last month',
    kasus: 'akkusativ',
    kind: 'wendung',
    example: {
      de: 'Letzten Monat sind wir in eine neue Wohnung gezogen.',
      en: 'Last month we moved into a new apartment.'
    }
  },
  {
    id: 'a2b1.c.039',
    de: 'nächstes Jahr — Akkusativ',
    en: 'next year',
    kasus: 'akkusativ',
    kind: 'wendung',
    example: {
      de: 'Nächstes Jahr machen wir einen Deutschkurs zusammen.',
      en: 'Next year we are doing a German course together.'
    }
  },
  {
    id: 'a2b1.c.040',
    de: 'den Eltern zuliebe — Dativ',
    en: "for the parents' sake (zuliebe follows the dative)",
    kasus: 'dativ',
    kind: 'wendung',
    example: {
      de: 'Den Eltern zuliebe feiert sie das Fest zu Hause.',
      en: "For her parents' sake she is celebrating the party at home."
    }
  },
  {
    id: 'a2b1.c.041',
    de: 'Mitte der Woche — Genitiv',
    en: 'in the middle of the week',
    kasus: 'genitiv',
    kind: 'wendung',
    example: {
      de: 'Mitte der Woche habe ich meinen Termin beim Amt.',
      en: 'In the middle of the week I have my appointment at the office.'
    }
  },
  {
    id: 'a2b1.c.042',
    de: 'im Laufe des Tages — Genitiv',
    en: 'during the course of the day',
    kasus: 'genitiv',
    kind: 'wendung',
    example: {
      de: 'Im Laufe des Tages wird es noch wärmer.',
      en: 'During the course of the day it will get even warmer.'
    }
  },
  {
    id: 'a2b1.c.043',
    de: 'eines Abends — Genitiv',
    en: 'one evening',
    kasus: 'genitiv',
    kind: 'wendung',
    example: {
      de: 'Eines Abends rief plötzlich mein alter Freund an.',
      en: 'One evening my old friend suddenly called.'
    }
  },
  {
    id: 'a2b1.c.044',
    de: 'die Farbe des Autos — Genitiv',
    en: 'the colour of the car (possessive genitive)',
    kasus: 'genitiv',
    kind: 'wendung',
    example: {
      de: 'Die Farbe des Autos gefällt mir sehr gut.',
      en: 'I like the colour of the car very much.'
    }
  },
  {
    id: 'a2b1.c.045',
    de: 'der Titel des Buches — Genitiv',
    en: 'the title of the book (possessive genitive)',
    kasus: 'genitiv',
    kind: 'wendung',
    example: {
      de: 'Der Titel des Buches ist mir leider nicht mehr bekannt.',
      en: 'Unfortunately I no longer remember the title of the book.'
    }
  }
];
