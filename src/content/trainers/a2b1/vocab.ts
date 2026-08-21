import { type AdjectiveEntry, type NounEntry, type VerbEntry, type VocabBank } from '@shared/types';

import { A2B1_CASE_ITEMS, A2B1_PREP_VERBS } from './grammar.ts';

/* The A2·B1 vocabulary bank. It spans the everyday fields the dual-level paper tests —
   Wohnen, Arbeit, Einkaufen, Gesundheit, Reisen, Behörden, Freizeit, Familie, Essen,
   Medien — at A2 and B1 register together, since the certificate is awarded at either
   level. Ids are persisted SRS keys — never renumber existing items. */

export const A2B1_VERBS: readonly VerbEntry[] = [
  {
    id: 'a2b1.v.001',
    de: 'wohnen',
    en: 'to live, to reside',
    praesens: 'wohnt',
    praeteritum: 'wohnte',
    perfekt: 'hat gewohnt',
    example: {
      de: 'Wir wohnen seit fünf Jahren in dieser Straße.',
      en: 'We have been living in this street for five years.'
    }
  },
  {
    id: 'a2b1.v.002',
    de: 'mieten',
    en: 'to rent',
    praesens: 'mietet',
    praeteritum: 'mietete',
    perfekt: 'hat gemietet',
    example: {
      de: 'Wir mieten eine kleine Wohnung im Zentrum.',
      en: 'We are renting a small apartment in the centre.'
    }
  },
  {
    id: 'a2b1.v.003',
    de: 'vermieten',
    en: 'to rent out',
    praesens: 'vermietet',
    praeteritum: 'vermietete',
    perfekt: 'hat vermietet',
    example: {
      de: 'Die Familie vermietet ein Zimmer an Studenten.',
      en: 'The family rents out a room to students.'
    }
  },
  {
    id: 'a2b1.v.004',
    de: 'umziehen',
    en: 'to move (house)',
    praesens: 'zieht um',
    praeteritum: 'zog um',
    perfekt: 'ist umgezogen',
    example: {
      de: 'Nächsten Monat ziehen wir in eine größere Wohnung um.',
      en: 'Next month we are moving into a bigger apartment.'
    }
  },
  {
    id: 'a2b1.v.005',
    de: 'renovieren',
    en: 'to renovate',
    praesens: 'renoviert',
    praeteritum: 'renovierte',
    perfekt: 'hat renoviert',
    example: {
      de: 'Wir haben die Küche vor dem Einzug renoviert.',
      en: 'We renovated the kitchen before moving in.'
    }
  },
  {
    id: 'a2b1.v.006',
    de: 'einrichten',
    en: 'to furnish',
    praesens: 'richtet ein',
    praeteritum: 'richtete ein',
    perfekt: 'hat eingerichtet',
    example: {
      de: 'Sie hat das Wohnzimmer sehr gemütlich eingerichtet.',
      en: 'She furnished the living room very cosily.'
    }
  },
  {
    id: 'a2b1.v.007',
    de: 'putzen',
    en: 'to clean',
    praesens: 'putzt',
    praeteritum: 'putzte',
    perfekt: 'hat geputzt',
    example: {
      de: 'Samstags putze ich immer die ganze Wohnung.',
      en: 'On Saturdays I always clean the whole apartment.'
    }
  },
  {
    id: 'a2b1.v.008',
    de: 'aufräumen',
    en: 'to tidy up',
    praesens: 'räumt auf',
    praeteritum: 'räumte auf',
    perfekt: 'hat aufgeräumt',
    example: {
      de: 'Die Kinder müssen vor dem Essen ihr Zimmer aufräumen.',
      en: 'The children have to tidy their room before dinner.'
    }
  },
  {
    id: 'a2b1.v.009',
    de: 'reparieren',
    en: 'to repair',
    praesens: 'repariert',
    praeteritum: 'reparierte',
    perfekt: 'hat repariert',
    example: {
      de: 'Der Vermieter hat das kaputte Fenster reparieren lassen.',
      en: 'The landlord had the broken window repaired.'
    }
  },
  {
    id: 'a2b1.v.010',
    de: 'heizen',
    en: 'to heat',
    praesens: 'heizt',
    praeteritum: 'heizte',
    perfekt: 'hat geheizt',
    example: {
      de: 'Im Winter heizen wir jeden Abend das Wohnzimmer.',
      en: 'In winter we heat the living room every evening.'
    }
  },
  {
    id: 'a2b1.v.011',
    de: 'arbeiten',
    en: 'to work',
    praesens: 'arbeitet',
    praeteritum: 'arbeitete',
    perfekt: 'hat gearbeitet',
    example: {
      de: 'Sie arbeitet seit einem Jahr in einem Krankenhaus.',
      en: 'She has been working in a hospital for a year.'
    }
  },
  {
    id: 'a2b1.v.012',
    de: 'verdienen',
    en: 'to earn',
    praesens: 'verdient',
    praeteritum: 'verdiente',
    perfekt: 'hat verdient',
    example: {
      de: 'In diesem Beruf verdient man am Anfang nicht viel.',
      en: 'In this job you do not earn much at first.'
    }
  },
  {
    id: 'a2b1.v.013',
    de: 'kündigen',
    en: 'to quit, to hand in notice',
    praesens: 'kündigt',
    praeteritum: 'kündigte',
    perfekt: 'hat gekündigt',
    example: {
      de: 'Er hat seine Stelle gekündigt, weil er umziehen musste.',
      en: 'He quit his job because he had to move.'
    }
  },
  {
    id: 'a2b1.v.014',
    de: 'sich bewerben',
    en: 'to apply (for a job)',
    praesens: 'bewirbt sich',
    praeteritum: 'bewarb sich',
    perfekt: 'hat sich beworben',
    example: {
      de: 'Ich habe mich bei drei Firmen beworben.',
      en: 'I applied to three companies.'
    }
  },
  {
    id: 'a2b1.v.015',
    de: 'einstellen',
    en: 'to hire',
    praesens: 'stellt ein',
    praeteritum: 'stellte ein',
    perfekt: 'hat eingestellt',
    example: {
      de: 'Die Firma stellt im Sommer mehrere neue Mitarbeiter ein.',
      en: 'The company is hiring several new employees in summer.'
    }
  },
  {
    id: 'a2b1.v.016',
    de: 'erledigen',
    en: 'to take care of, to get done',
    praesens: 'erledigt',
    praeteritum: 'erledigte',
    perfekt: 'hat erledigt',
    example: {
      de: 'Ich muss heute noch ein paar Sachen beim Amt erledigen.',
      en: 'I still have to take care of a few things at the office today.'
    }
  },
  {
    id: 'a2b1.v.017',
    de: 'leiten',
    en: 'to lead, to manage',
    praesens: 'leitet',
    praeteritum: 'leitete',
    perfekt: 'hat geleitet',
    example: {
      de: 'Meine Kollegin leitet seit letztem Jahr das ganze Team.',
      en: 'My colleague has been leading the whole team since last year.'
    }
  },
  {
    id: 'a2b1.v.018',
    de: 'organisieren',
    en: 'to organise',
    praesens: 'organisiert',
    praeteritum: 'organisierte',
    perfekt: 'hat organisiert',
    example: {
      de: 'Wer organisiert dieses Jahr die Weihnachtsfeier?',
      en: 'Who is organising the Christmas party this year?'
    }
  },
  {
    id: 'a2b1.v.019',
    de: 'planen',
    en: 'to plan',
    praesens: 'plant',
    praeteritum: 'plante',
    perfekt: 'hat geplant',
    example: {
      de: 'Wir planen die nächste Besprechung für Montag.',
      en: 'We are planning the next meeting for Monday.'
    }
  },
  {
    id: 'a2b1.v.020',
    de: 'schaffen',
    en: 'to manage, to get done',
    praesens: 'schafft',
    praeteritum: 'schaffte',
    perfekt: 'hat geschafft',
    example: {
      de: 'Ich schaffe die Arbeit heute nicht mehr.',
      en: 'I will not manage to finish the work today.'
    }
  },
  {
    id: 'a2b1.v.021',
    de: 'einkaufen',
    en: 'to shop, to go shopping',
    praesens: 'kauft ein',
    praeteritum: 'kaufte ein',
    perfekt: 'hat eingekauft',
    example: {
      de: 'Samstags kaufen wir immer für die ganze Woche ein.',
      en: 'On Saturdays we always shop for the whole week.'
    }
  },
  {
    id: 'a2b1.v.022',
    de: 'bezahlen',
    en: 'to pay',
    praesens: 'bezahlt',
    praeteritum: 'bezahlte',
    perfekt: 'hat bezahlt',
    example: {
      de: 'Können wir bitte getrennt bezahlen?',
      en: 'Could we please pay separately?'
    }
  },
  {
    id: 'a2b1.v.023',
    de: 'kosten',
    en: 'to cost',
    praesens: 'kostet',
    praeteritum: 'kostete',
    perfekt: 'hat gekostet',
    example: {
      de: 'Der Pullover kostet im Angebot nur zwanzig Euro.',
      en: 'The sweater only costs twenty euros in the sale.'
    }
  },
  {
    id: 'a2b1.v.024',
    de: 'sparen',
    en: 'to save (money)',
    praesens: 'spart',
    praeteritum: 'sparte',
    perfekt: 'hat gespart',
    example: {
      de: 'Wir sparen jeden Monat etwas Geld für den Urlaub.',
      en: 'We save some money every month for the holiday.'
    }
  },
  {
    id: 'a2b1.v.025',
    de: 'umtauschen',
    en: 'to exchange (goods)',
    praesens: 'tauscht um',
    praeteritum: 'tauschte um',
    perfekt: 'hat umgetauscht',
    example: {
      de: 'Ich möchte diese Schuhe gern umtauschen.',
      en: 'I would like to exchange these shoes.'
    }
  },
  {
    id: 'a2b1.v.026',
    de: 'anprobieren',
    en: 'to try on',
    praesens: 'probiert an',
    praeteritum: 'probierte an',
    perfekt: 'hat anprobiert',
    example: {
      de: 'Darf ich die Jacke kurz anprobieren?',
      en: 'May I try on the jacket for a moment?'
    }
  },
  {
    id: 'a2b1.v.027',
    de: 'auswählen',
    en: 'to select, to choose',
    praesens: 'wählt aus',
    praeteritum: 'wählte aus',
    perfekt: 'hat ausgewählt',
    example: {
      de: 'Sie hat lange das richtige Geschenk ausgewählt.',
      en: 'She spent a long time selecting the right present.'
    }
  },
  {
    id: 'a2b1.v.028',
    de: 'liefern',
    en: 'to deliver',
    praesens: 'liefert',
    praeteritum: 'lieferte',
    perfekt: 'hat geliefert',
    example: {
      de: 'Der Supermarkt liefert die Lebensmittel direkt nach Hause.',
      en: 'The supermarket delivers the groceries straight to your home.'
    }
  },
  {
    id: 'a2b1.v.029',
    de: 'verkaufen',
    en: 'to sell',
    praesens: 'verkauft',
    praeteritum: 'verkaufte',
    perfekt: 'hat verkauft',
    example: {
      de: 'Der Laden verkauft nur frisches Obst und Gemüse.',
      en: 'The shop only sells fresh fruit and vegetables.'
    }
  },
  {
    id: 'a2b1.v.030',
    de: 'anbieten',
    en: 'to offer',
    praesens: 'bietet an',
    praeteritum: 'bot an',
    perfekt: 'hat angeboten',
    example: {
      de: 'Der Verkäufer bietet uns einen guten Preis an.',
      en: 'The salesman offers us a good price.'
    }
  },
  {
    id: 'a2b1.v.031',
    de: 'sich erkälten',
    en: 'to catch a cold',
    praesens: 'erkältet sich',
    praeteritum: 'erkältete sich',
    perfekt: 'hat sich erkältet',
    example: {
      de: 'Ich habe mich beim Warten auf den Bus erkältet.',
      en: 'I caught a cold while waiting for the bus.'
    }
  },
  {
    id: 'a2b1.v.032',
    de: 'husten',
    en: 'to cough',
    praesens: 'hustet',
    praeteritum: 'hustete',
    perfekt: 'hat gehustet',
    example: {
      de: 'Der Junge hustet schon seit drei Tagen.',
      en: 'The boy has been coughing for three days already.'
    }
  },
  {
    id: 'a2b1.v.033',
    de: 'sich verletzen',
    en: 'to injure oneself',
    praesens: 'verletzt sich',
    praeteritum: 'verletzte sich',
    perfekt: 'hat sich verletzt',
    example: {
      de: 'Sie hat sich beim Sport am Knie verletzt.',
      en: 'She injured her knee while doing sports.'
    }
  },
  {
    id: 'a2b1.v.034',
    de: 'untersuchen',
    en: 'to examine',
    praesens: 'untersucht',
    praeteritum: 'untersuchte',
    perfekt: 'hat untersucht',
    example: {
      de: 'Der Arzt untersucht zuerst den Rücken des Patienten.',
      en: "The doctor first examines the patient's back."
    }
  },
  {
    id: 'a2b1.v.035',
    de: 'sich ausruhen',
    en: 'to rest',
    praesens: 'ruht sich aus',
    praeteritum: 'ruhte sich aus',
    perfekt: 'hat sich ausgeruht',
    example: {
      de: 'Nach der Reise musste sie sich erst einmal ausruhen.',
      en: 'After the trip she first had to rest.'
    }
  },
  {
    id: 'a2b1.v.036',
    de: 'schmerzen',
    en: 'to hurt',
    praesens: 'schmerzt',
    praeteritum: 'schmerzte',
    perfekt: 'hat geschmerzt',
    example: {
      de: 'Sein Fuß schmerzt seit dem Sturz sehr stark.',
      en: 'His foot has hurt a lot since the fall.'
    }
  },
  {
    id: 'a2b1.v.037',
    de: 'behandeln',
    en: 'to treat (medically)',
    praesens: 'behandelt',
    praeteritum: 'behandelte',
    perfekt: 'hat behandelt',
    example: {
      de: 'Der Zahnarzt hat den Zahn schnell behandelt.',
      en: 'The dentist treated the tooth quickly.'
    }
  },
  {
    id: 'a2b1.v.038',
    de: 'sich erholen',
    en: 'to recover',
    praesens: 'erholt sich',
    praeteritum: 'erholte sich',
    perfekt: 'hat sich erholt',
    example: {
      de: 'Nach der Grippe hat er sich langsam wieder erholt.',
      en: 'After the flu he slowly recovered.'
    }
  },
  {
    id: 'a2b1.v.039',
    de: 'impfen',
    en: 'to vaccinate',
    praesens: 'impft',
    praeteritum: 'impfte',
    perfekt: 'hat geimpft',
    example: {
      de: 'Der Arzt impft heute alle Kinder gegen Grippe.',
      en: 'The doctor is vaccinating all the children against flu today.'
    }
  },
  {
    id: 'a2b1.v.040',
    de: 'verschreiben',
    en: 'to prescribe',
    praesens: 'verschreibt',
    praeteritum: 'verschrieb',
    perfekt: 'hat verschrieben',
    example: {
      de: 'Die Ärztin hat mir ein starkes Medikament verschrieben.',
      en: 'The doctor prescribed me a strong medicine.'
    }
  },
  {
    id: 'a2b1.v.041',
    de: 'buchen',
    en: 'to book',
    praesens: 'bucht',
    praeteritum: 'buchte',
    perfekt: 'hat gebucht',
    example: {
      de: 'Wir haben das Hotel schon im Frühling gebucht.',
      en: 'We already booked the hotel in spring.'
    }
  },
  {
    id: 'a2b1.v.042',
    de: 'packen',
    en: 'to pack',
    praesens: 'packt',
    praeteritum: 'packte',
    perfekt: 'hat gepackt',
    example: {
      de: 'Ich packe meinen Koffer immer erst am Abend vor der Reise.',
      en: 'I always pack my suitcase only the evening before the trip.'
    }
  },
  {
    id: 'a2b1.v.043',
    de: 'ankommen',
    en: 'to arrive',
    praesens: 'kommt an',
    praeteritum: 'kam an',
    perfekt: 'ist angekommen',
    example: {
      de: 'Der Zug kommt pünktlich um zehn Uhr an.',
      en: "The train arrives punctually at ten o'clock."
    }
  },
  {
    id: 'a2b1.v.044',
    de: 'abfahren',
    en: 'to depart',
    praesens: 'fährt ab',
    praeteritum: 'fuhr ab',
    perfekt: 'ist abgefahren',
    example: {
      de: 'Der Bus ist schon vor fünf Minuten abgefahren.',
      en: 'The bus already departed five minutes ago.'
    }
  },
  {
    id: 'a2b1.v.045',
    de: 'übernachten',
    en: 'to stay overnight',
    praesens: 'übernachtet',
    praeteritum: 'übernachtete',
    perfekt: 'hat übernachtet',
    example: {
      de: 'Wir übernachten eine Nacht in einem kleinen Hotel.',
      en: 'We are staying overnight in a small hotel.'
    }
  },
  {
    id: 'a2b1.v.046',
    de: 'reservieren',
    en: 'to reserve, to book',
    praesens: 'reserviert',
    praeteritum: 'reservierte',
    perfekt: 'hat reserviert',
    example: {
      de: 'Ich habe für heute Abend einen Tisch reserviert.',
      en: 'I reserved a table for this evening.'
    }
  },
  {
    id: 'a2b1.v.047',
    de: 'besichtigen',
    en: 'to visit, to view (a sight)',
    praesens: 'besichtigt',
    praeteritum: 'besichtigte',
    perfekt: 'hat besichtigt',
    example: {
      de: 'Am ersten Tag besichtigen wir die Altstadt.',
      en: 'On the first day we are visiting the old town.'
    }
  },
  {
    id: 'a2b1.v.048',
    de: 'fliegen',
    en: 'to fly',
    praesens: 'fliegt',
    praeteritum: 'flog',
    perfekt: 'ist geflogen',
    example: {
      de: 'Wir fliegen dieses Jahr zum ersten Mal nach Griechenland.',
      en: 'This year we are flying to Greece for the first time.'
    }
  },
  {
    id: 'a2b1.v.049',
    de: 'umsteigen',
    en: 'to change (trains/buses)',
    praesens: 'steigt um',
    praeteritum: 'stieg um',
    perfekt: 'ist umgestiegen',
    example: {
      de: 'In Frankfurt müssen wir in einen anderen Zug umsteigen.',
      en: 'In Frankfurt we have to change to a different train.'
    }
  },
  {
    id: 'a2b1.v.050',
    de: 'sich verspäten',
    en: 'to be late, to be delayed',
    praesens: 'verspätet sich',
    praeteritum: 'verspätete sich',
    perfekt: 'hat sich verspätet',
    example: {
      de: 'Der Flug hat sich um zwei Stunden verspätet.',
      en: 'The flight was delayed by two hours.'
    }
  },
  {
    id: 'a2b1.v.051',
    de: 'beantragen',
    en: 'to apply for (officially)',
    praesens: 'beantragt',
    praeteritum: 'beantragte',
    perfekt: 'hat beantragt',
    example: {
      de: 'Ich muss einen neuen Ausweis beantragen.',
      en: 'I have to apply for a new ID card.'
    }
  },
  {
    id: 'a2b1.v.052',
    de: 'anmelden',
    en: 'to register',
    praesens: 'meldet an',
    praeteritum: 'meldete an',
    perfekt: 'hat angemeldet',
    example: {
      de: 'Wir müssen unseren neuen Wohnsitz beim Amt anmelden.',
      en: 'We have to register our new address at the office.'
    }
  },
  {
    id: 'a2b1.v.053',
    de: 'sich abmelden',
    en: 'to deregister, to check out',
    praesens: 'meldet sich ab',
    praeteritum: 'meldete sich ab',
    perfekt: 'hat sich abgemeldet',
    example: {
      de: 'Vor dem Umzug muss man sich beim alten Amt abmelden.',
      en: 'Before moving you have to deregister at the old office.'
    }
  },
  {
    id: 'a2b1.v.054',
    de: 'ausfüllen',
    en: 'to fill out',
    praesens: 'füllt aus',
    praeteritum: 'füllte aus',
    perfekt: 'hat ausgefüllt',
    example: {
      de: 'Bitte füllen Sie das Formular in Blockbuchstaben aus.',
      en: 'Please fill out the form in block letters.'
    }
  },
  {
    id: 'a2b1.v.055',
    de: 'unterschreiben',
    en: 'to sign',
    praesens: 'unterschreibt',
    praeteritum: 'unterschrieb',
    perfekt: 'hat unterschrieben',
    example: {
      de: 'Sie müssen den Vertrag noch auf der letzten Seite unterschreiben.',
      en: 'You still have to sign the contract on the last page.'
    }
  },
  {
    id: 'a2b1.v.056',
    de: 'gelten',
    en: 'to be valid',
    praesens: 'gilt',
    praeteritum: 'galt',
    perfekt: 'hat gegolten',
    example: {
      de: 'Der Ausweis gilt noch bis zum nächsten Jahr.',
      en: 'The ID is still valid until next year.'
    }
  },
  {
    id: 'a2b1.v.057',
    de: 'verlängern',
    en: 'to extend, to renew',
    praesens: 'verlängert',
    praeteritum: 'verlängerte',
    perfekt: 'hat verlängert',
    example: {
      de: 'Ich muss meine Aufenthaltserlaubnis nächsten Monat verlängern.',
      en: 'I have to renew my residence permit next month.'
    }
  },
  {
    id: 'a2b1.v.058',
    de: 'bestätigen',
    en: 'to confirm',
    praesens: 'bestätigt',
    praeteritum: 'bestätigte',
    perfekt: 'hat bestätigt',
    example: {
      de: 'Das Amt hat den Termin per E-Mail bestätigt.',
      en: 'The office confirmed the appointment by email.'
    }
  },
  {
    id: 'a2b1.v.059',
    de: 'vorlegen',
    en: 'to submit, to present (a document)',
    praesens: 'legt vor',
    praeteritum: 'legte vor',
    perfekt: 'hat vorgelegt',
    example: {
      de: 'Beim Termin müssen Sie Ihren Ausweis vorlegen.',
      en: 'At the appointment you have to present your ID.'
    }
  },
  {
    id: 'a2b1.v.060',
    de: 'benötigen',
    en: 'to require, to need',
    praesens: 'benötigt',
    praeteritum: 'benötigte',
    perfekt: 'hat benötigt',
    example: {
      de: 'Für den Antrag benötigen Sie eine Kopie des Mietvertrags.',
      en: 'For the application you need a copy of the rental contract.'
    }
  },
  {
    id: 'a2b1.v.061',
    de: 'spazieren gehen',
    en: 'to go for a walk',
    praesens: 'geht spazieren',
    praeteritum: 'ging spazieren',
    perfekt: 'ist spazieren gegangen',
    example: {
      de: 'Am Sonntag gehen wir gern im Park spazieren.',
      en: 'On Sundays we like to go for a walk in the park.'
    }
  },
  {
    id: 'a2b1.v.062',
    de: 'joggen',
    en: 'to jog',
    praesens: 'joggt',
    praeteritum: 'joggte',
    perfekt: 'ist gejoggt',
    example: {
      de: 'Er joggt jeden Morgen eine halbe Stunde.',
      en: 'He jogs for half an hour every morning.'
    }
  },
  {
    id: 'a2b1.v.063',
    de: 'fotografieren',
    en: 'to photograph',
    praesens: 'fotografiert',
    praeteritum: 'fotografierte',
    perfekt: 'hat fotografiert',
    example: {
      de: 'In seiner Freizeit fotografiert er gern alte Gebäude.',
      en: 'In his free time he likes to photograph old buildings.'
    }
  },
  {
    id: 'a2b1.v.064',
    de: 'singen',
    en: 'to sing',
    praesens: 'singt',
    praeteritum: 'sang',
    perfekt: 'hat gesungen',
    example: {
      de: 'Meine Tochter singt seit einem Jahr im Chor.',
      en: 'My daughter has been singing in the choir for a year.'
    }
  },
  {
    id: 'a2b1.v.065',
    de: 'tanzen',
    en: 'to dance',
    praesens: 'tanzt',
    praeteritum: 'tanzte',
    perfekt: 'hat getanzt',
    example: {
      de: 'Auf der Hochzeit haben wir bis Mitternacht getanzt.',
      en: 'At the wedding we danced until midnight.'
    }
  },
  {
    id: 'a2b1.v.066',
    de: 'malen',
    en: 'to paint',
    praesens: 'malt',
    praeteritum: 'malte',
    perfekt: 'hat gemalt',
    example: {
      de: 'Meine Nichte malt sehr gern bunte Bilder.',
      en: 'My niece really likes painting colourful pictures.'
    }
  },
  {
    id: 'a2b1.v.067',
    de: 'angeln',
    en: 'to fish',
    praesens: 'angelt',
    praeteritum: 'angelte',
    perfekt: 'hat geangelt',
    example: {
      de: 'Mein Opa angelt am liebsten früh am Morgen.',
      en: 'My grandpa likes to fish best early in the morning.'
    }
  },
  {
    id: 'a2b1.v.068',
    de: 'wandern',
    en: 'to hike',
    praesens: 'wandert',
    praeteritum: 'wanderte',
    perfekt: 'ist gewandert',
    example: {
      de: 'Wir sind letzten Sommer durch die Berge gewandert.',
      en: 'Last summer we hiked through the mountains.'
    }
  },
  {
    id: 'a2b1.v.069',
    de: 'sich entspannen',
    en: 'to relax',
    praesens: 'entspannt sich',
    praeteritum: 'entspannte sich',
    perfekt: 'hat sich entspannt',
    example: {
      de: 'Am Wochenende entspannt sie sich am liebsten mit einem Buch.',
      en: 'At the weekend she likes to relax with a book best.'
    }
  },
  {
    id: 'a2b1.v.070',
    de: 'sich treffen',
    en: 'to meet (each other)',
    praesens: 'trifft sich',
    praeteritum: 'traf sich',
    perfekt: 'hat sich getroffen',
    example: {
      de: 'Wir treffen uns freitags meistens im Café.',
      en: 'We usually meet at the café on Fridays.'
    }
  },
  {
    id: 'a2b1.v.071',
    de: 'heiraten',
    en: 'to marry',
    praesens: 'heiratet',
    praeteritum: 'heiratete',
    perfekt: 'hat geheiratet',
    example: {
      de: 'Meine Schwester heiratet im Sommer ihren Freund.',
      en: 'My sister is marrying her boyfriend in summer.'
    }
  },
  {
    id: 'a2b1.v.072',
    de: 'sich verlieben',
    en: 'to fall in love',
    praesens: 'verliebt sich',
    praeteritum: 'verliebte sich',
    perfekt: 'hat sich verliebt',
    example: {
      de: 'Sie hat sich sofort in ihn verliebt.',
      en: 'She fell in love with him immediately.'
    }
  },
  {
    id: 'a2b1.v.073',
    de: 'erziehen',
    en: 'to raise, to bring up (a child)',
    praesens: 'erzieht',
    praeteritum: 'erzog',
    perfekt: 'hat erzogen',
    example: {
      de: 'Sie erziehen ihre Kinder sehr liebevoll.',
      en: 'They bring up their children very lovingly.'
    }
  },
  {
    id: 'a2b1.v.074',
    de: 'aufwachsen',
    en: 'to grow up',
    praesens: 'wächst auf',
    praeteritum: 'wuchs auf',
    perfekt: 'ist aufgewachsen',
    example: {
      de: 'Er ist auf dem Land bei seinen Großeltern aufgewachsen.',
      en: 'He grew up in the countryside with his grandparents.'
    }
  },
  {
    id: 'a2b1.v.075',
    de: 'sich streiten',
    en: 'to argue, to quarrel',
    praesens: 'streitet sich',
    praeteritum: 'stritt sich',
    perfekt: 'hat sich gestritten',
    example: {
      de: 'Die Geschwister streiten sich fast jeden Tag.',
      en: 'The siblings argue almost every day.'
    }
  },
  {
    id: 'a2b1.v.076',
    de: 'sich vertragen',
    en: 'to get along',
    praesens: 'verträgt sich',
    praeteritum: 'vertrug sich',
    perfekt: 'hat sich vertragen',
    example: {
      de: 'Nach dem Streit vertragen sie sich schnell wieder.',
      en: 'After the argument they quickly get along again.'
    }
  },
  {
    id: 'a2b1.v.077',
    de: 'sich scheiden lassen',
    en: 'to get divorced',
    praesens: 'lässt sich scheiden',
    praeteritum: 'ließ sich scheiden',
    perfekt: 'hat sich scheiden lassen',
    example: {
      de: 'Meine Nachbarn haben sich letztes Jahr scheiden lassen.',
      en: 'My neighbours got divorced last year.'
    }
  },
  {
    id: 'a2b1.v.078',
    de: 'pflegen',
    en: 'to care for, to nurse',
    praesens: 'pflegt',
    praeteritum: 'pflegte',
    perfekt: 'hat gepflegt',
    example: {
      de: 'Sie pflegt ihre kranke Mutter seit zwei Jahren.',
      en: 'She has been caring for her sick mother for two years.'
    }
  },
  {
    id: 'a2b1.v.079',
    de: 'unterstützen',
    en: 'to support',
    praesens: 'unterstützt',
    praeteritum: 'unterstützte',
    perfekt: 'hat unterstützt',
    example: {
      de: 'Die Familie unterstützt ihn bei der Wohnungssuche.',
      en: 'The family is supporting him in his search for an apartment.'
    }
  },
  {
    id: 'a2b1.v.080',
    de: 'trösten',
    en: 'to comfort',
    praesens: 'tröstet',
    praeteritum: 'tröstete',
    perfekt: 'hat getröstet',
    example: {
      de: 'Die Mutter hat das weinende Kind getröstet.',
      en: 'The mother comforted the crying child.'
    }
  },
  {
    id: 'a2b1.v.081',
    de: 'kochen',
    en: 'to cook',
    praesens: 'kocht',
    praeteritum: 'kochte',
    perfekt: 'hat gekocht',
    example: {
      de: 'Am Wochenende koche ich immer für die ganze Familie.',
      en: 'At the weekend I always cook for the whole family.'
    }
  },
  {
    id: 'a2b1.v.082',
    de: 'braten',
    en: 'to fry, to roast',
    praesens: 'brät',
    praeteritum: 'briet',
    perfekt: 'hat gebraten',
    example: {
      de: 'Sie brät das Fleisch mit ein wenig Butter.',
      en: 'She fries the meat with a little butter.'
    }
  },
  {
    id: 'a2b1.v.083',
    de: 'schmecken',
    en: 'to taste',
    praesens: 'schmeckt',
    praeteritum: 'schmeckte',
    perfekt: 'hat geschmeckt',
    example: {
      de: 'Die Suppe schmeckt heute ein bisschen zu salzig.',
      en: 'The soup tastes a bit too salty today.'
    }
  },
  {
    id: 'a2b1.v.084',
    de: 'bestellen',
    en: 'to order',
    praesens: 'bestellt',
    praeteritum: 'bestellte',
    perfekt: 'hat bestellt',
    example: {
      de: 'Wir bestellen im Restaurant meistens das Tagesgericht.',
      en: 'In the restaurant we usually order the dish of the day.'
    }
  },
  {
    id: 'a2b1.v.085',
    de: 'probieren',
    en: 'to try, to taste',
    praesens: 'probiert',
    praeteritum: 'probierte',
    perfekt: 'hat probiert',
    example: {
      de: 'Möchten Sie den neuen Käse einmal probieren?',
      en: 'Would you like to try the new cheese?'
    }
  },
  {
    id: 'a2b1.v.086',
    de: 'backen',
    en: 'to bake',
    praesens: 'bäckt',
    praeteritum: 'backte',
    perfekt: 'hat gebacken',
    example: {
      de: 'Meine Mutter bäckt jeden Sonntag einen Kuchen.',
      en: 'My mother bakes a cake every Sunday.'
    }
  },
  {
    id: 'a2b1.v.087',
    de: 'schneiden',
    en: 'to cut',
    praesens: 'schneidet',
    praeteritum: 'schnitt',
    perfekt: 'hat geschnitten',
    example: {
      de: 'Bitte schneide das Gemüse in kleine Stücke.',
      en: 'Please cut the vegetables into small pieces.'
    }
  },
  {
    id: 'a2b1.v.088',
    de: 'servieren',
    en: 'to serve (food)',
    praesens: 'serviert',
    praeteritum: 'servierte',
    perfekt: 'hat serviert',
    example: {
      de: 'Der Kellner serviert uns zuerst die Getränke.',
      en: 'The waiter serves us the drinks first.'
    }
  },
  {
    id: 'a2b1.v.089',
    de: 'würzen',
    en: 'to season',
    praesens: 'würzt',
    praeteritum: 'würzte',
    perfekt: 'hat gewürzt',
    example: {
      de: 'Sie würzt das Essen immer mit frischen Kräutern.',
      en: 'She always seasons the food with fresh herbs.'
    }
  },
  {
    id: 'a2b1.v.090',
    de: 'grillen',
    en: 'to grill, to barbecue',
    praesens: 'grillt',
    praeteritum: 'grillte',
    perfekt: 'hat gegrillt',
    example: {
      de: 'Im Sommer grillen wir fast jedes Wochenende im Garten.',
      en: 'In summer we barbecue in the garden almost every weekend.'
    }
  },
  {
    id: 'a2b1.v.091',
    de: 'anrufen',
    en: 'to call (on the phone)',
    praesens: 'ruft an',
    praeteritum: 'rief an',
    perfekt: 'hat angerufen',
    example: {
      de: 'Ich rufe dich heute Abend bestimmt an.',
      en: 'I will definitely call you this evening.'
    }
  },
  {
    id: 'a2b1.v.092',
    de: 'simsen',
    en: 'to text',
    praesens: 'simst',
    praeteritum: 'simste',
    perfekt: 'hat gesimst',
    example: {
      de: 'Wir haben den ganzen Nachmittag miteinander gesimst.',
      en: 'We texted each other the whole afternoon.'
    }
  },
  {
    id: 'a2b1.v.093',
    de: 'chatten',
    en: 'to chat (online)',
    praesens: 'chattet',
    praeteritum: 'chattete',
    perfekt: 'hat gechattet',
    example: {
      de: 'Sie chattet abends oft mit Freunden im Ausland.',
      en: 'In the evenings she often chats with friends abroad.'
    }
  },
  {
    id: 'a2b1.v.094',
    de: 'herunterladen',
    en: 'to download',
    praesens: 'lädt herunter',
    praeteritum: 'lud herunter',
    perfekt: 'hat heruntergeladen',
    example: {
      de: 'Ich habe die App gestern auf mein Handy heruntergeladen.',
      en: 'I downloaded the app to my phone yesterday.'
    }
  },
  {
    id: 'a2b1.v.095',
    de: 'hochladen',
    en: 'to upload',
    praesens: 'lädt hoch',
    praeteritum: 'lud hoch',
    perfekt: 'hat hochgeladen',
    example: {
      de: 'Er hat die Fotos vom Ausflug schon hochgeladen.',
      en: 'He has already uploaded the photos from the trip.'
    }
  },
  {
    id: 'a2b1.v.096',
    de: 'sich informieren',
    en: 'to find out, to inform oneself',
    praesens: 'informiert sich',
    praeteritum: 'informierte sich',
    perfekt: 'hat sich informiert',
    example: {
      de: 'Vor der Reise informieren wir uns über das Wetter.',
      en: 'Before the trip we find out about the weather.'
    }
  },
  {
    id: 'a2b1.v.097',
    de: 'berichten',
    en: 'to report',
    praesens: 'berichtet',
    praeteritum: 'berichtete',
    perfekt: 'hat berichtet',
    example: {
      de: 'Die Zeitung berichtet heute über den neuen Bahnhof.',
      en: 'The newspaper reports today about the new station.'
    }
  },
  {
    id: 'a2b1.v.098',
    de: 'senden',
    en: 'to broadcast, to transmit',
    praesens: 'sendet',
    praeteritum: 'sendete',
    perfekt: 'hat gesendet',
    example: {
      de: 'Das Programm sendet die Nachrichten jeden Abend um acht.',
      en: 'The channel broadcasts the news every evening at eight.'
    }
  },
  {
    id: 'a2b1.v.099',
    de: 'drucken',
    en: 'to print',
    praesens: 'druckt',
    praeteritum: 'druckte',
    perfekt: 'hat gedruckt',
    example: {
      de: 'Kannst du mir das Formular kurz drucken?',
      en: 'Can you print the form for me quickly?'
    }
  },
  {
    id: 'a2b1.v.100',
    de: 'speichern',
    en: 'to save (a file)',
    praesens: 'speichert',
    praeteritum: 'speicherte',
    perfekt: 'hat gespeichert',
    example: {
      de: 'Bitte speichere das Dokument, bevor du den Computer ausschaltest.',
      en: 'Please save the document before you turn off the computer.'
    }
  }
];

export const A2B1_NOUNS: readonly NounEntry[] = [
  {
    id: 'a2b1.n.001',
    de: 'Wohnung',
    en: 'apartment, flat',
    article: 'die',
    plural: 'die Wohnungen',
    example: {
      de: 'Unsere Wohnung hat drei Zimmer und einen Balkon.',
      en: 'Our apartment has three rooms and a balcony.'
    }
  },
  {
    id: 'a2b1.n.002',
    de: 'Zimmer',
    en: 'room',
    article: 'das',
    plural: 'die Zimmer',
    example: {
      de: 'Das Zimmer meiner Tochter ist sehr klein.',
      en: "My daughter's room is very small."
    }
  },
  {
    id: 'a2b1.n.003',
    de: 'Miete',
    en: 'rent',
    article: 'die',
    plural: 'die Mieten',
    example: {
      de: 'Die Miete für die Wohnung ist jeden Monat fällig.',
      en: 'The rent for the apartment is due every month.'
    }
  },
  {
    id: 'a2b1.n.004',
    de: 'Vermieter',
    en: 'landlord',
    article: 'der',
    plural: 'die Vermieter',
    example: {
      de: 'Der Vermieter hat die Heizung endlich reparieren lassen.',
      en: 'The landlord finally had the heating repaired.'
    }
  },
  {
    id: 'a2b1.n.005',
    de: 'Nachbar',
    en: 'neighbour',
    article: 'der',
    plural: 'die Nachbarn',
    example: {
      de: 'Unser Nachbar hilft uns oft im Garten.',
      en: 'Our neighbour often helps us in the garden.'
    }
  },
  {
    id: 'a2b1.n.006',
    de: 'Heizung',
    en: 'heating',
    article: 'die',
    plural: 'die Heizungen',
    example: {
      de: 'Im Winter läuft die Heizung fast jeden Tag.',
      en: 'In winter the heating runs almost every day.'
    }
  },
  {
    id: 'a2b1.n.007',
    de: 'Balkon',
    en: 'balcony',
    article: 'der',
    plural: 'die Balkone',
    example: {
      de: 'Auf dem Balkon stehen viele Blumen.',
      en: 'There are many flowers on the balcony.'
    }
  },
  {
    id: 'a2b1.n.008',
    de: 'Keller',
    en: 'cellar, basement',
    article: 'der',
    plural: 'die Keller',
    example: {
      de: 'Die alten Möbel stehen jetzt im Keller.',
      en: 'The old furniture is now in the cellar.'
    }
  },
  {
    id: 'a2b1.n.009',
    de: 'Mietvertrag',
    en: 'rental contract',
    article: 'der',
    plural: 'die Mietverträge',
    example: {
      de: 'Bitte lesen Sie den Mietvertrag vor der Unterschrift genau.',
      en: 'Please read the rental contract carefully before signing.'
    }
  },
  {
    id: 'a2b1.n.010',
    de: 'Umzug',
    en: 'move (house)',
    article: 'der',
    plural: 'die Umzüge',
    example: {
      de: 'Der Umzug in die neue Stadt war sehr anstrengend.',
      en: 'The move to the new city was very exhausting.'
    }
  },
  {
    id: 'a2b1.n.011',
    de: 'Beruf',
    en: 'job, profession',
    article: 'der',
    plural: 'die Berufe',
    example: {
      de: 'Was für einen Beruf hat dein Vater?',
      en: 'What job does your father have?'
    }
  },
  {
    id: 'a2b1.n.012',
    de: 'Firma',
    en: 'company',
    article: 'die',
    plural: 'die Firmen',
    example: {
      de: 'Die Firma sucht neue Mitarbeiter für die Produktion.',
      en: 'The company is looking for new employees for production.'
    }
  },
  {
    id: 'a2b1.n.013',
    de: 'Chef',
    en: 'boss',
    article: 'der',
    plural: 'die Chefs',
    example: {
      de: 'Mein Chef ist diese Woche im Urlaub.',
      en: 'My boss is on holiday this week.'
    }
  },
  {
    id: 'a2b1.n.014',
    de: 'Kollegin',
    en: 'colleague (female)',
    article: 'die',
    plural: 'die Kolleginnen',
    example: {
      de: 'Meine Kollegin hilft mir gern bei schwierigen E-Mails.',
      en: 'My colleague is happy to help me with difficult emails.'
    }
  },
  {
    id: 'a2b1.n.015',
    de: 'Gehalt',
    en: 'salary',
    article: 'das',
    plural: 'die Gehälter',
    example: {
      de: 'Das Gehalt wird immer am Monatsende überwiesen.',
      en: 'The salary is always transferred at the end of the month.'
    }
  },
  {
    id: 'a2b1.n.016',
    de: 'Bewerbung',
    en: 'job application',
    article: 'die',
    plural: 'die Bewerbungen',
    example: {
      de: 'Ich habe meine Bewerbung gestern per E-Mail geschickt.',
      en: 'I sent my application by email yesterday.'
    }
  },
  {
    id: 'a2b1.n.017',
    de: 'Lebenslauf',
    en: 'CV, curriculum vitae',
    article: 'der',
    plural: 'die Lebensläufe',
    example: {
      de: 'Der Lebenslauf sollte nicht länger als zwei Seiten sein.',
      en: 'The CV should not be longer than two pages.'
    }
  },
  {
    id: 'a2b1.n.018',
    de: 'Urlaub',
    en: 'holiday, vacation',
    article: 'der',
    plural: 'die Urlaube',
    example: {
      de: 'Wir fahren dieses Jahr im August in den Urlaub.',
      en: 'This year we are going on holiday in August.'
    }
  },
  {
    id: 'a2b1.n.019',
    de: 'Pause',
    en: 'break',
    article: 'die',
    plural: 'die Pausen',
    example: {
      de: 'In der Pause trinken wir immer einen Kaffee.',
      en: 'During the break we always drink a coffee.'
    }
  },
  {
    id: 'a2b1.n.020',
    de: 'Termin',
    en: 'appointment',
    article: 'der',
    plural: 'die Termine',
    example: {
      de: 'Ich habe morgen einen Termin bei der Bank.',
      en: 'I have an appointment at the bank tomorrow.'
    }
  },
  {
    id: 'a2b1.n.021',
    de: 'Supermarkt',
    en: 'supermarket',
    article: 'der',
    plural: 'die Supermärkte',
    example: {
      de: 'Der Supermarkt an der Ecke hat bis zehn Uhr geöffnet.',
      en: 'The supermarket on the corner is open until ten o’clock.'
    }
  },
  {
    id: 'a2b1.n.022',
    de: 'Kasse',
    en: 'checkout, cash register',
    article: 'die',
    plural: 'die Kassen',
    example: {
      de: 'An der Kasse war heute eine lange Schlange.',
      en: 'There was a long queue at the checkout today.'
    }
  },
  {
    id: 'a2b1.n.023',
    de: 'Preis',
    en: 'price',
    article: 'der',
    plural: 'die Preise',
    example: {
      de: 'Der Preis für Gemüse ist im Winter oft höher.',
      en: 'The price of vegetables is often higher in winter.'
    }
  },
  {
    id: 'a2b1.n.024',
    de: 'Rechnung',
    en: 'bill, invoice',
    article: 'die',
    plural: 'die Rechnungen',
    example: {
      de: 'Bitte bezahlen Sie die Rechnung innerhalb von zwei Wochen.',
      en: 'Please pay the invoice within two weeks.'
    }
  },
  {
    id: 'a2b1.n.025',
    de: 'Kunde',
    en: 'customer',
    article: 'der',
    plural: 'die Kunden',
    example: {
      de: 'Ein Kunde hat sich über die langen Wartezeiten beschwert.',
      en: 'A customer complained about the long waiting times.'
    }
  },
  {
    id: 'a2b1.n.026',
    de: 'Verkäuferin',
    en: 'saleswoman',
    article: 'die',
    plural: 'die Verkäuferinnen',
    example: {
      de: 'Die Verkäuferin hat mir bei der Auswahl geholfen.',
      en: 'The saleswoman helped me choose.'
    }
  },
  {
    id: 'a2b1.n.027',
    de: 'Angebot',
    en: 'offer, special deal',
    article: 'das',
    plural: 'die Angebote',
    example: {
      de: 'Diese Woche gibt es ein gutes Angebot für Käse.',
      en: 'This week there is a good offer on cheese.'
    }
  },
  {
    id: 'a2b1.n.028',
    de: 'Quittung',
    en: 'receipt',
    article: 'die',
    plural: 'die Quittungen',
    example: {
      de: 'Bewahren Sie die Quittung für den Fall eines Umtauschs auf.',
      en: 'Keep the receipt in case you need to exchange the item.'
    }
  },
  {
    id: 'a2b1.n.029',
    de: 'Einkaufswagen',
    en: 'shopping trolley',
    article: 'der',
    plural: 'die Einkaufswagen',
    example: {
      de: 'Der Einkaufswagen war schon nach zehn Minuten voll.',
      en: 'The shopping trolley was already full after ten minutes.'
    }
  },
  {
    id: 'a2b1.n.030',
    de: 'Größe',
    en: 'size',
    article: 'die',
    plural: 'die Größen',
    example: {
      de: 'Haben Sie diese Hose auch in einer größeren Größe?',
      en: 'Do you have these trousers in a bigger size too?'
    }
  },
  {
    id: 'a2b1.n.031',
    de: 'Arzt',
    en: 'doctor',
    article: 'der',
    plural: 'die Ärzte',
    example: {
      de: 'Der Arzt hat mir für die Erkältung ein Medikament verschrieben.',
      en: 'The doctor prescribed me medicine for the cold.'
    }
  },
  {
    id: 'a2b1.n.032',
    de: 'Krankenhaus',
    en: 'hospital',
    article: 'das',
    plural: 'die Krankenhäuser',
    example: {
      de: 'Mein Onkel liegt seit gestern im Krankenhaus.',
      en: 'My uncle has been in the hospital since yesterday.'
    }
  },
  {
    id: 'a2b1.n.033',
    de: 'Apotheke',
    en: 'pharmacy',
    article: 'die',
    plural: 'die Apotheken',
    example: {
      de: 'Die Apotheke gegenüber hat auch sonntags geöffnet.',
      en: 'The pharmacy across the street is open on Sundays too.'
    }
  },
  {
    id: 'a2b1.n.034',
    de: 'Medikament',
    en: 'medicine',
    article: 'das',
    plural: 'die Medikamente',
    example: {
      de: 'Ich muss das Medikament dreimal täglich nehmen.',
      en: 'I have to take the medicine three times a day.'
    }
  },
  {
    id: 'a2b1.n.035',
    de: 'Schmerz',
    en: 'pain',
    article: 'der',
    plural: 'die Schmerzen',
    example: {
      de: 'Seit dem Sturz hat sie starke Schmerzen im Rücken.',
      en: 'Since the fall she has had severe pain in her back.'
    }
  },
  {
    id: 'a2b1.n.036',
    de: 'Erkältung',
    en: 'cold (illness)',
    article: 'die',
    plural: 'die Erkältungen',
    example: {
      de: 'Wegen einer Erkältung bleibt er heute im Bett.',
      en: 'Because of a cold he is staying in bed today.'
    }
  },
  {
    id: 'a2b1.n.037',
    de: 'Fieber',
    en: 'fever',
    article: 'das',
    plural: '– (nur Singular)',
    example: {
      de: 'Das Kind hat hohes Fieber und muss zu Hause bleiben.',
      en: 'The child has a high fever and has to stay at home.'
    }
  },
  {
    id: 'a2b1.n.038',
    de: 'Untersuchung',
    en: 'examination, check-up',
    article: 'die',
    plural: 'die Untersuchungen',
    example: {
      de: 'Die nächste Untersuchung ist erst in drei Monaten.',
      en: 'The next check-up is not for another three months.'
    }
  },
  {
    id: 'a2b1.n.039',
    de: 'Versicherung',
    en: 'insurance',
    article: 'die',
    plural: 'die Versicherungen',
    example: {
      de: 'Meine Versicherung übernimmt die Kosten für den Arztbesuch.',
      en: "My insurance covers the costs of the doctor's visit."
    }
  },
  {
    id: 'a2b1.n.040',
    de: 'Impfung',
    en: 'vaccination',
    article: 'die',
    plural: 'die Impfungen',
    example: {
      de: 'Vor der Reise braucht man eine bestimmte Impfung.',
      en: 'Before the trip you need a certain vaccination.'
    }
  },
  {
    id: 'a2b1.n.041',
    de: 'Koffer',
    en: 'suitcase',
    article: 'der',
    plural: 'die Koffer',
    example: {
      de: 'Mein Koffer war am Flughafen leider zu schwer.',
      en: 'Unfortunately my suitcase was too heavy at the airport.'
    }
  },
  {
    id: 'a2b1.n.042',
    de: 'Fahrkarte',
    en: 'ticket (train/bus)',
    article: 'die',
    plural: 'die Fahrkarten',
    example: {
      de: 'Die Fahrkarte nach Hamburg kostet heute besonders viel.',
      en: 'The ticket to Hamburg is especially expensive today.'
    }
  },
  {
    id: 'a2b1.n.043',
    de: 'Flughafen',
    en: 'airport',
    article: 'der',
    plural: 'die Flughäfen',
    example: {
      de: 'Der Flughafen liegt etwa eine Stunde von der Stadt entfernt.',
      en: 'The airport is about an hour from the city.'
    }
  },
  {
    id: 'a2b1.n.044',
    de: 'Hotel',
    en: 'hotel',
    article: 'das',
    plural: 'die Hotels',
    example: {
      de: 'Wir haben ein kleines Hotel direkt am Strand gebucht.',
      en: 'We booked a small hotel right on the beach.'
    }
  },
  {
    id: 'a2b1.n.045',
    de: 'Reise',
    en: 'trip, journey',
    article: 'die',
    plural: 'die Reisen',
    example: {
      de: 'Die Reise nach Italien war unser schönster Urlaub.',
      en: 'The trip to Italy was our nicest holiday.'
    }
  },
  {
    id: 'a2b1.n.046',
    de: 'Reisepass',
    en: 'passport',
    article: 'der',
    plural: 'die Reisepässe',
    example: {
      de: 'Ohne gültigen Reisepass darfst du nicht ins Ausland fahren.',
      en: 'Without a valid passport you are not allowed to travel abroad.'
    }
  },
  {
    id: 'a2b1.n.047',
    de: 'Grenze',
    en: 'border',
    article: 'die',
    plural: 'die Grenzen',
    example: {
      de: 'An der Grenze mussten wir unsere Ausweise zeigen.',
      en: 'At the border we had to show our IDs.'
    }
  },
  {
    id: 'a2b1.n.048',
    de: 'Zug',
    en: 'train',
    article: 'der',
    plural: 'die Züge',
    example: {
      de: 'Der Zug nach München hat heute zwanzig Minuten Verspätung.',
      en: 'The train to Munich is twenty minutes late today.'
    }
  },
  {
    id: 'a2b1.n.049',
    de: 'Verspätung',
    en: 'delay',
    article: 'die',
    plural: 'die Verspätungen',
    example: {
      de: 'Wegen der Verspätung haben wir unseren Anschlussflug verpasst.',
      en: 'Because of the delay we missed our connecting flight.'
    }
  },
  {
    id: 'a2b1.n.050',
    de: 'Ankunft',
    en: 'arrival',
    article: 'die',
    plural: 'die Ankünfte',
    example: {
      de: 'Die Ankunft des Zuges verzögert sich um zehn Minuten.',
      en: 'The arrival of the train is delayed by ten minutes.'
    }
  },
  {
    id: 'a2b1.n.051',
    de: 'Amt',
    en: '(government) office',
    article: 'das',
    plural: 'die Ämter',
    example: {
      de: 'Für die neue Adresse muss ich zum Amt gehen.',
      en: 'I have to go to the office for the new address.'
    }
  },
  {
    id: 'a2b1.n.052',
    de: 'Antrag',
    en: 'application, request',
    article: 'der',
    plural: 'die Anträge',
    example: {
      de: 'Der Antrag auf Kindergeld dauert oft mehrere Wochen.',
      en: 'The application for child benefit often takes several weeks.'
    }
  },
  {
    id: 'a2b1.n.053',
    de: 'Formular',
    en: 'form',
    article: 'das',
    plural: 'die Formulare',
    example: {
      de: 'Bitte füllen Sie dieses Formular vollständig aus.',
      en: 'Please fill out this form completely.'
    }
  },
  {
    id: 'a2b1.n.054',
    de: 'Ausweis',
    en: 'ID card',
    article: 'der',
    plural: 'die Ausweise',
    example: {
      de: 'Ohne Ausweis kommen Sie leider nicht in das Gebäude.',
      en: 'Unfortunately you cannot enter the building without an ID.'
    }
  },
  {
    id: 'a2b1.n.055',
    de: 'Anmeldung',
    en: 'registration',
    article: 'die',
    plural: 'die Anmeldungen',
    example: {
      de: 'Die Anmeldung des neuen Wohnsitzes muss innerhalb von zwei Wochen erfolgen.',
      en: 'Registering the new address must happen within two weeks.'
    }
  },
  {
    id: 'a2b1.n.056',
    de: 'Bescheinigung',
    en: 'certificate, confirmation',
    article: 'die',
    plural: 'die Bescheinigungen',
    example: {
      de: 'Für den Kurs brauche ich eine Bescheinigung von meinem Arbeitgeber.',
      en: 'I need a certificate from my employer for the course.'
    }
  },
  {
    id: 'a2b1.n.057',
    de: 'Unterschrift',
    en: 'signature',
    article: 'die',
    plural: 'die Unterschriften',
    example: {
      de: 'Auf dem letzten Blatt fehlt noch Ihre Unterschrift.',
      en: 'Your signature is still missing on the last page.'
    }
  },
  {
    id: 'a2b1.n.058',
    de: 'Frist',
    en: 'deadline',
    article: 'die',
    plural: 'die Fristen',
    example: {
      de: 'Die Frist für den Antrag endet am 30. Juni.',
      en: 'The deadline for the application ends on 30 June.'
    }
  },
  {
    id: 'a2b1.n.059',
    de: 'Aufenthaltserlaubnis',
    en: 'residence permit',
    article: 'die',
    plural: 'die Aufenthaltserlaubnisse',
    example: {
      de: 'Meine Aufenthaltserlaubnis muss ich nächsten Monat verlängern.',
      en: 'I have to renew my residence permit next month.'
    }
  },
  {
    id: 'a2b1.n.060',
    de: 'Staatsangehörigkeit',
    en: 'nationality',
    article: 'die',
    plural: 'die Staatsangehörigkeiten',
    example: {
      de: 'Bitte geben Sie im Formular Ihre Staatsangehörigkeit an.',
      en: 'Please state your nationality on the form.'
    }
  },
  {
    id: 'a2b1.n.061',
    de: 'Verein',
    en: 'club, association',
    article: 'der',
    plural: 'die Vereine',
    example: {
      de: 'Mein Sohn spielt seit zwei Jahren im Fußballverein.',
      en: 'My son has been playing at the football club for two years.'
    }
  },
  {
    id: 'a2b1.n.062',
    de: 'Hobby',
    en: 'hobby',
    article: 'das',
    plural: 'die Hobbys',
    example: {
      de: 'Mein liebstes Hobby ist Fotografieren.',
      en: 'My favourite hobby is photography.'
    }
  },
  {
    id: 'a2b1.n.063',
    de: 'Ausstellung',
    en: 'exhibition',
    article: 'die',
    plural: 'die Ausstellungen',
    example: {
      de: 'Am Wochenende besuchen wir eine Ausstellung im Museum.',
      en: 'At the weekend we are visiting an exhibition at the museum.'
    }
  },
  {
    id: 'a2b1.n.064',
    de: 'Konzert',
    en: 'concert',
    article: 'das',
    plural: 'die Konzerte',
    example: {
      de: 'Die Karten für das Konzert waren schon nach einer Stunde ausverkauft.',
      en: 'The tickets for the concert were already sold out after an hour.'
    }
  },
  {
    id: 'a2b1.n.065',
    de: 'Ausflug',
    en: 'excursion, outing',
    article: 'der',
    plural: 'die Ausflüge',
    example: {
      de: 'Am Sonntag machen wir einen Ausflug in die Berge.',
      en: 'On Sunday we are going on an excursion to the mountains.'
    }
  },
  {
    id: 'a2b1.n.066',
    de: 'Mannschaft',
    en: 'team',
    article: 'die',
    plural: 'die Mannschaften',
    example: {
      de: 'Unsere Mannschaft hat das letzte Spiel knapp verloren.',
      en: 'Our team narrowly lost the last game.'
    }
  },
  {
    id: 'a2b1.n.067',
    de: 'Spaziergang',
    en: 'walk, stroll',
    article: 'der',
    plural: 'die Spaziergänge',
    example: {
      de: 'Nach dem Essen machen wir gern einen kleinen Spaziergang.',
      en: 'After the meal we like to go for a little walk.'
    }
  },
  {
    id: 'a2b1.n.068',
    de: 'Fest',
    en: 'party, celebration, festival',
    article: 'das',
    plural: 'die Feste',
    example: {
      de: 'Zum Fest kommen alle Verwandten aus der ganzen Stadt.',
      en: 'All the relatives from all over the city come to the celebration.'
    }
  },
  {
    id: 'a2b1.n.069',
    de: 'Freizeit',
    en: 'free time',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'In seiner Freizeit spielt er gern Gitarre.',
      en: 'In his free time he likes to play the guitar.'
    }
  },
  {
    id: 'a2b1.n.070',
    de: 'Wettbewerb',
    en: 'competition',
    article: 'der',
    plural: 'die Wettbewerbe',
    example: {
      de: 'Beim Wettbewerb haben über hundert Kinder mitgemacht.',
      en: 'Over a hundred children took part in the competition.'
    }
  },
  {
    id: 'a2b1.n.071',
    de: 'Ehe',
    en: 'marriage',
    article: 'die',
    plural: 'die Ehen',
    example: {
      de: 'Die beiden führen schon seit dreißig Jahren eine glückliche Ehe.',
      en: 'The two of them have had a happy marriage for thirty years.'
    }
  },
  {
    id: 'a2b1.n.072',
    de: 'Hochzeit',
    en: 'wedding',
    article: 'die',
    plural: 'die Hochzeiten',
    example: {
      de: 'Zur Hochzeit meiner Schwester kommen über hundert Gäste.',
      en: "More than a hundred guests are coming to my sister's wedding."
    }
  },
  {
    id: 'a2b1.n.073',
    de: 'Enkel',
    en: 'grandson, grandchild',
    article: 'der',
    plural: 'die Enkel',
    example: {
      de: 'Mein Enkel besucht mich fast jedes Wochenende.',
      en: 'My grandson visits me almost every weekend.'
    }
  },
  {
    id: 'a2b1.n.074',
    de: 'Baby',
    en: 'baby',
    article: 'das',
    plural: 'die Babys',
    example: {
      de: 'Das Baby schläft meistens den ganzen Vormittag.',
      en: 'The baby mostly sleeps the whole morning.'
    }
  },
  {
    id: 'a2b1.n.075',
    de: 'Kindheit',
    en: 'childhood',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Sie hat ihre ganze Kindheit auf dem Land verbracht.',
      en: 'She spent her whole childhood in the countryside.'
    }
  },
  {
    id: 'a2b1.n.076',
    de: 'Erziehung',
    en: 'upbringing, education (of a child)',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Bei der Erziehung ihrer Kinder legen sie viel Wert auf Höflichkeit.',
      en: 'In raising their children they place great value on politeness.'
    }
  },
  {
    id: 'a2b1.n.077',
    de: 'Tante',
    en: 'aunt',
    article: 'die',
    plural: 'die Tanten',
    example: {
      de: 'Meine Tante lebt schon seit Jahren in Kanada.',
      en: 'My aunt has lived in Canada for years.'
    }
  },
  {
    id: 'a2b1.n.078',
    de: 'Onkel',
    en: 'uncle',
    article: 'der',
    plural: 'die Onkel',
    example: {
      de: 'Mein Onkel hilft mir jedes Jahr im Garten.',
      en: 'My uncle helps me in the garden every year.'
    }
  },
  {
    id: 'a2b1.n.079',
    de: 'Verwandtschaft',
    en: 'relatives, family (collectively)',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Zu Weihnachten trifft sich die ganze Verwandtschaft bei uns.',
      en: 'At Christmas the whole family gets together at our place.'
    }
  },
  {
    id: 'a2b1.n.080',
    de: 'Ehepaar',
    en: 'married couple',
    article: 'das',
    plural: 'die Ehepaare',
    example: {
      de: 'Nebenan wohnt ein freundliches älteres Ehepaar.',
      en: 'A friendly elderly married couple lives next door.'
    }
  },
  {
    id: 'a2b1.n.081',
    de: 'Gericht',
    en: 'dish (food)',
    article: 'das',
    plural: 'die Gerichte',
    example: {
      de: 'Das Gericht mit Reis und Gemüse hat mir am besten geschmeckt.',
      en: 'The dish with rice and vegetables tasted best to me.'
    }
  },
  {
    id: 'a2b1.n.082',
    de: 'Zutat',
    en: 'ingredient',
    article: 'die',
    plural: 'die Zutaten',
    example: {
      de: 'Für den Kuchen brauchen wir noch zwei Zutaten.',
      en: 'For the cake we still need two ingredients.'
    }
  },
  {
    id: 'a2b1.n.083',
    de: 'Rezept',
    en: 'recipe',
    article: 'das',
    plural: 'die Rezepte',
    example: {
      de: 'Meine Oma hat mir ihr Rezept für Apfelkuchen gegeben.',
      en: 'My grandma gave me her recipe for apple cake.'
    }
  },
  {
    id: 'a2b1.n.084',
    de: 'Speisekarte',
    en: 'menu',
    article: 'die',
    plural: 'die Speisekarten',
    example: {
      de: 'Können wir bitte die Speisekarte haben?',
      en: 'Could we have the menu, please?'
    }
  },
  {
    id: 'a2b1.n.085',
    de: 'Kellner',
    en: 'waiter',
    article: 'der',
    plural: 'die Kellner',
    example: {
      de: 'Der Kellner hat uns einen Tisch am Fenster gegeben.',
      en: 'The waiter gave us a table by the window.'
    }
  },
  {
    id: 'a2b1.n.086',
    de: 'Vorspeise',
    en: 'starter, appetizer',
    article: 'die',
    plural: 'die Vorspeisen',
    example: {
      de: 'Als Vorspeise nehme ich die Suppe.',
      en: "As a starter I'll have the soup."
    }
  },
  {
    id: 'a2b1.n.087',
    de: 'Nachtisch',
    en: 'dessert',
    article: 'der',
    plural: 'die Nachtische',
    example: {
      de: 'Zum Nachtisch gibt es heute Schokoladenkuchen.',
      en: 'For dessert there is chocolate cake today.'
    }
  },
  {
    id: 'a2b1.n.088',
    de: 'Portion',
    en: 'portion, serving',
    article: 'die',
    plural: 'die Portionen',
    example: {
      de: 'Eine Portion Pommes reicht mir völlig.',
      en: 'One portion of fries is completely enough for me.'
    }
  },
  {
    id: 'a2b1.n.089',
    de: 'Gewürz',
    en: 'spice',
    article: 'das',
    plural: 'die Gewürze',
    example: {
      de: 'In diesem Rezept fehlt noch ein wichtiges Gewürz.',
      en: 'An important spice is still missing from this recipe.'
    }
  },
  {
    id: 'a2b1.n.090',
    de: 'Mahlzeit',
    en: 'meal',
    article: 'die',
    plural: 'die Mahlzeiten',
    example: {
      de: 'Die letzte Mahlzeit sollte nicht zu spät am Abend sein.',
      en: 'The last meal should not be too late in the evening.'
    }
  },
  {
    id: 'a2b1.n.091',
    de: 'Handy',
    en: 'mobile phone',
    article: 'das',
    plural: 'die Handys',
    example: {
      de: 'Mein Handy hat leider nur noch fünf Prozent Akku.',
      en: 'Unfortunately my phone only has five percent battery left.'
    }
  },
  {
    id: 'a2b1.n.092',
    de: 'Nachricht',
    en: 'message, news',
    article: 'die',
    plural: 'die Nachrichten',
    example: {
      de: 'Ich habe dir gestern eine Nachricht geschickt.',
      en: 'I sent you a message yesterday.'
    }
  },
  {
    id: 'a2b1.n.093',
    de: 'Bericht',
    en: 'report',
    article: 'der',
    plural: 'die Berichte',
    example: {
      de: 'Im Fernsehen kam gestern ein interessanter Bericht über das Klima.',
      en: 'There was an interesting report about the climate on TV yesterday.'
    }
  },
  {
    id: 'a2b1.n.094',
    de: 'Zeitung',
    en: 'newspaper',
    article: 'die',
    plural: 'die Zeitungen',
    example: {
      de: 'Mein Vater liest jeden Morgen die Zeitung.',
      en: 'My father reads the newspaper every morning.'
    }
  },
  {
    id: 'a2b1.n.095',
    de: 'Programm',
    en: 'programme, channel',
    article: 'das',
    plural: 'die Programme',
    example: {
      de: 'Welches Programm läuft heute Abend im Fernsehen?',
      en: 'What programme is on TV tonight?'
    }
  },
  {
    id: 'a2b1.n.096',
    de: 'Anzeige',
    en: 'advertisement, ad',
    article: 'die',
    plural: 'die Anzeigen',
    example: {
      de: 'Die Wohnung habe ich durch eine Anzeige im Internet gefunden.',
      en: 'I found the apartment through an ad on the internet.'
    }
  },
  {
    id: 'a2b1.n.097',
    de: 'Internet',
    en: 'internet',
    article: 'das',
    plural: '– (nur Singular)',
    example: {
      de: 'Ohne Internet kann ich von zu Hause nicht arbeiten.',
      en: 'Without internet I cannot work from home.'
    }
  },
  {
    id: 'a2b1.n.098',
    de: 'App',
    en: 'app',
    article: 'die',
    plural: 'die Apps',
    example: {
      de: 'Für den Sprachkurs benutze ich eine kostenlose App.',
      en: 'I use a free app for the language course.'
    }
  },
  {
    id: 'a2b1.n.099',
    de: 'Beitrag',
    en: 'post, article, contribution',
    article: 'der',
    plural: 'die Beiträge',
    example: {
      de: 'Sie hat einen langen Beitrag über ihre Reise geschrieben.',
      en: 'She wrote a long post about her trip.'
    }
  },
  {
    id: 'a2b1.n.100',
    de: 'Foto',
    en: 'photo',
    article: 'das',
    plural: 'die Fotos',
    example: {
      de: 'Von der Hochzeit haben wir viele schöne Fotos.',
      en: 'We have many nice photos from the wedding.'
    }
  }
];

export const A2B1_ADJECTIVES: readonly AdjectiveEntry[] = [
  {
    id: 'a2b1.a.001',
    de: 'gemütlich',
    en: 'cosy',
    komparativ: 'gemütlicher',
    superlativ: 'am gemütlichsten',
    example: {
      de: 'Das Wohnzimmer ist sehr gemütlich eingerichtet.',
      en: 'The living room is furnished very cosily.'
    }
  },
  {
    id: 'a2b1.a.002',
    de: 'hell',
    en: 'bright, light',
    komparativ: 'heller',
    superlativ: 'am hellsten',
    example: {
      de: 'Die Küche ist zum Glück sehr hell.',
      en: 'Luckily the kitchen is very bright.'
    }
  },
  {
    id: 'a2b1.a.003',
    de: 'dunkel',
    en: 'dark',
    komparativ: 'dunkler',
    superlativ: 'am dunkelsten',
    example: {
      de: 'Das Zimmer im Keller ist ziemlich dunkel.',
      en: 'The room in the basement is quite dark.'
    }
  },
  {
    id: 'a2b1.a.004',
    de: 'ruhig',
    en: 'quiet',
    komparativ: 'ruhiger',
    superlativ: 'am ruhigsten',
    example: {
      de: 'Wir suchen eine ruhige Wohnung ohne laute Straße.',
      en: 'We are looking for a quiet apartment without a loud street.'
    }
  },
  {
    id: 'a2b1.a.005',
    de: 'laut',
    en: 'loud',
    komparativ: 'lauter',
    superlativ: 'am lautesten',
    example: {
      de: 'Die neue Wohnung liegt leider an einer sehr lauten Straße.',
      en: 'Unfortunately the new apartment is on a very loud street.'
    }
  },
  {
    id: 'a2b1.a.006',
    de: 'modern',
    en: 'modern',
    komparativ: 'moderner',
    superlativ: 'am modernsten',
    example: {
      de: 'Die Küche ist ganz neu und sehr modern.',
      en: 'The kitchen is brand new and very modern.'
    }
  },
  {
    id: 'a2b1.a.007',
    de: 'geräumig',
    en: 'spacious',
    komparativ: 'geräumiger',
    superlativ: 'am geräumigsten',
    example: {
      de: 'Das Schlafzimmer ist überraschend geräumig.',
      en: 'The bedroom is surprisingly spacious.'
    }
  },
  {
    id: 'a2b1.a.008',
    de: 'sauber',
    en: 'clean',
    komparativ: 'sauberer',
    superlativ: 'am saubersten',
    example: {
      de: 'Die Treppe im Haus ist immer sehr sauber.',
      en: 'The staircase in the building is always very clean.'
    }
  },
  {
    id: 'a2b1.a.009',
    de: 'schmutzig',
    en: 'dirty',
    komparativ: 'schmutziger',
    superlativ: 'am schmutzigsten',
    example: {
      de: 'Nach dem Umzug war der Boden ziemlich schmutzig.',
      en: 'After the move the floor was quite dirty.'
    }
  },
  {
    id: 'a2b1.a.010',
    de: 'möbliert',
    en: 'furnished',
    example: {
      de: 'Wir vermieten ein möbliertes Zimmer für Studenten.',
      en: 'We rent out a furnished room for students.'
    }
  },
  {
    id: 'a2b1.a.011',
    de: 'pünktlich',
    en: 'punctual',
    komparativ: 'pünktlicher',
    superlativ: 'am pünktlichsten',
    example: {
      de: 'Mein Kollege ist immer sehr pünktlich.',
      en: 'My colleague is always very punctual.'
    }
  },
  {
    id: 'a2b1.a.012',
    de: 'zuverlässig',
    en: 'reliable',
    komparativ: 'zuverlässiger',
    superlativ: 'am zuverlässigsten',
    example: {
      de: 'Wir suchen eine zuverlässige neue Mitarbeiterin.',
      en: 'We are looking for a reliable new employee.'
    }
  },
  {
    id: 'a2b1.a.013',
    de: 'fleißig',
    en: 'hard-working, diligent',
    komparativ: 'fleißiger',
    superlativ: 'am fleißigsten',
    example: {
      de: 'Der neue Praktikant ist sehr fleißig.',
      en: 'The new intern is very hard-working.'
    }
  },
  {
    id: 'a2b1.a.014',
    de: 'freundlich',
    en: 'friendly',
    komparativ: 'freundlicher',
    superlativ: 'am freundlichsten',
    example: {
      de: 'Unser Chef ist wirklich sehr freundlich.',
      en: 'Our boss is really very friendly.'
    }
  },
  {
    id: 'a2b1.a.015',
    de: 'stressig',
    en: 'stressful',
    komparativ: 'stressiger',
    superlativ: 'am stressigsten',
    example: {
      de: 'Die letzte Woche vor dem Urlaub war besonders stressig.',
      en: 'The last week before the holiday was especially stressful.'
    }
  },
  {
    id: 'a2b1.a.016',
    de: 'erfahren',
    en: 'experienced',
    komparativ: 'erfahrener',
    superlativ: 'am erfahrensten',
    example: {
      de: 'Für diese Stelle suchen wir einen erfahrenen Techniker.',
      en: 'For this position we are looking for an experienced technician.'
    }
  },
  {
    id: 'a2b1.a.017',
    de: 'selbstständig',
    en: 'independent, self-employed',
    example: {
      de: 'Sie arbeitet seit drei Jahren selbstständig.',
      en: 'She has been self-employed for three years.'
    }
  },
  {
    id: 'a2b1.a.018',
    de: 'verantwortlich',
    en: 'responsible',
    example: {
      de: 'Wer ist für diese Aufgabe verantwortlich?',
      en: 'Who is responsible for this task?'
    }
  },
  {
    id: 'a2b1.a.019',
    de: 'arbeitslos',
    en: 'unemployed',
    example: {
      de: 'Nach der Kündigung war er drei Monate arbeitslos.',
      en: 'After being fired he was unemployed for three months.'
    }
  },
  {
    id: 'a2b1.a.020',
    de: 'befristet',
    en: 'temporary, fixed-term',
    example: {
      de: 'Mein Vertrag ist leider nur befristet.',
      en: 'Unfortunately my contract is only temporary.'
    }
  },
  {
    id: 'a2b1.a.021',
    de: 'billig',
    en: 'cheap',
    komparativ: 'billiger',
    superlativ: 'am billigsten',
    example: {
      de: 'Im Discounter ist das Obst meistens billiger.',
      en: 'At the discount store the fruit is usually cheaper.'
    }
  },
  {
    id: 'a2b1.a.022',
    de: 'teuer',
    en: 'expensive',
    komparativ: 'teurer',
    superlativ: 'am teuersten',
    example: {
      de: 'Diese Jacke ist mir leider zu teuer.',
      en: 'Unfortunately this jacket is too expensive for me.'
    }
  },
  {
    id: 'a2b1.a.023',
    de: 'preiswert',
    en: 'good value, inexpensive',
    komparativ: 'preiswerter',
    superlativ: 'am preiswertesten',
    example: {
      de: 'Der kleine Laden an der Ecke ist sehr preiswert.',
      en: 'The little shop on the corner is very good value.'
    }
  },
  {
    id: 'a2b1.a.024',
    de: 'praktisch',
    en: 'practical',
    komparativ: 'praktischer',
    superlativ: 'am praktischsten',
    example: {
      de: 'Diese Tasche ist wirklich sehr praktisch.',
      en: 'This bag is really very practical.'
    }
  },
  {
    id: 'a2b1.a.025',
    de: 'bequem',
    en: 'comfortable',
    komparativ: 'bequemer',
    superlativ: 'am bequemsten',
    example: {
      de: 'Die neuen Schuhe sind viel bequemer als die alten.',
      en: 'The new shoes are much more comfortable than the old ones.'
    }
  },
  {
    id: 'a2b1.a.026',
    de: 'modisch',
    en: 'fashionable',
    komparativ: 'modischer',
    superlativ: 'am modischsten',
    example: {
      de: 'Meine Tochter kauft gern modische Kleidung.',
      en: 'My daughter likes to buy fashionable clothes.'
    }
  },
  {
    id: 'a2b1.a.027',
    de: 'reduziert',
    en: 'reduced (in price)',
    example: {
      de: 'Diese Hose ist gerade um dreißig Prozent reduziert.',
      en: 'These trousers are currently reduced by thirty percent.'
    }
  },
  {
    id: 'a2b1.a.028',
    de: 'kostenlos',
    en: 'free of charge',
    example: {
      de: 'Der Eintritt für Kinder ist kostenlos.',
      en: 'Admission is free for children.'
    }
  },
  {
    id: 'a2b1.a.029',
    de: 'hochwertig',
    en: 'high-quality',
    komparativ: 'hochwertiger',
    superlativ: 'am hochwertigsten',
    example: {
      de: 'Das Geschäft verkauft nur hochwertige Produkte.',
      en: 'The shop only sells high-quality products.'
    }
  },
  {
    id: 'a2b1.a.030',
    de: 'günstig',
    en: 'cheap, favourable',
    komparativ: 'günstiger',
    superlativ: 'am günstigsten',
    example: {
      de: 'Im Sommerschlussverkauf sind die Preise sehr günstig.',
      en: 'During the summer sale the prices are very cheap.'
    }
  },
  {
    id: 'a2b1.a.031',
    de: 'krank',
    en: 'ill, sick',
    komparativ: 'kränker',
    superlativ: 'am kränksten',
    example: {
      de: 'Er ist seit einer Woche krank und bleibt zu Hause.',
      en: 'He has been ill for a week and is staying home.'
    }
  },
  {
    id: 'a2b1.a.032',
    de: 'gesund',
    en: 'healthy',
    komparativ: 'gesünder',
    superlativ: 'am gesündesten',
    example: {
      de: 'Frisches Obst und Gemüse sind sehr gesund.',
      en: 'Fresh fruit and vegetables are very healthy.'
    }
  },
  {
    id: 'a2b1.a.033',
    de: 'müde',
    en: 'tired',
    komparativ: 'müder',
    superlativ: 'am müdesten',
    example: {
      de: 'Nach der Nachtschicht war er sehr müde.',
      en: 'After the night shift he was very tired.'
    }
  },
  {
    id: 'a2b1.a.034',
    de: 'schwach',
    en: 'weak',
    komparativ: 'schwächer',
    superlativ: 'am schwächsten',
    example: {
      de: 'Nach der Krankheit fühlte sie sich noch sehr schwach.',
      en: 'After the illness she still felt very weak.'
    }
  },
  {
    id: 'a2b1.a.035',
    de: 'stark',
    en: 'strong',
    komparativ: 'stärker',
    superlativ: 'am stärksten',
    example: {
      de: 'Die Schmerzen im Rücken waren gestern sehr stark.',
      en: 'The pain in her back was very strong yesterday.'
    }
  },
  {
    id: 'a2b1.a.036',
    de: 'verletzt',
    en: 'injured',
    example: {
      de: 'Nach dem Sturz war sein Arm leicht verletzt.',
      en: 'After the fall his arm was slightly injured.'
    }
  },
  {
    id: 'a2b1.a.037',
    de: 'erschöpft',
    en: 'exhausted',
    example: {
      de: 'Nach dem langen Dienst war die Krankenschwester total erschöpft.',
      en: 'After the long shift the nurse was totally exhausted.'
    }
  },
  {
    id: 'a2b1.a.038',
    de: 'fit',
    en: 'fit',
    komparativ: 'fitter',
    superlativ: 'am fittesten',
    example: {
      de: 'Seit sie regelmäßig joggt, fühlt sie sich viel fitter.',
      en: 'Since she started jogging regularly, she feels much fitter.'
    }
  },
  {
    id: 'a2b1.a.039',
    de: 'schmerzhaft',
    en: 'painful',
    komparativ: 'schmerzhafter',
    superlativ: 'am schmerzhaftesten',
    example: {
      de: 'Die Untersuchung war zum Glück nicht sehr schmerzhaft.',
      en: 'Luckily the examination was not very painful.'
    }
  },
  {
    id: 'a2b1.a.040',
    de: 'ansteckend',
    en: 'contagious',
    example: {
      de: 'Diese Erkältung ist leider sehr ansteckend.',
      en: 'Unfortunately this cold is very contagious.'
    }
  },
  {
    id: 'a2b1.a.041',
    de: 'weit',
    en: 'far',
    komparativ: 'weiter',
    superlativ: 'am weitesten',
    example: {
      de: 'Der Bahnhof ist von hier noch ziemlich weit.',
      en: 'The station is still quite far from here.'
    }
  },
  {
    id: 'a2b1.a.042',
    de: 'nah',
    en: 'near, close',
    komparativ: 'näher',
    superlativ: 'am nächsten',
    example: {
      de: 'Unser Hotel liegt ganz nah am Strand.',
      en: 'Our hotel is very close to the beach.'
    }
  },
  {
    id: 'a2b1.a.043',
    de: 'schnell',
    en: 'fast',
    komparativ: 'schneller',
    superlativ: 'am schnellsten',
    example: {
      de: 'Der ICE ist viel schneller als der Regionalzug.',
      en: 'The ICE is much faster than the regional train.'
    }
  },
  {
    id: 'a2b1.a.044',
    de: 'komfortabel',
    en: 'comfortable',
    komparativ: 'komfortabler',
    superlativ: 'am komfortabelsten',
    example: {
      de: 'Der Nachtzug war überraschend komfortabel.',
      en: 'The night train was surprisingly comfortable.'
    }
  },
  {
    id: 'a2b1.a.045',
    de: 'verspätet',
    en: 'delayed, late',
    example: {
      de: 'Unser Flug war leider verspätet.',
      en: 'Unfortunately our flight was delayed.'
    }
  },
  {
    id: 'a2b1.a.046',
    de: 'spannend',
    en: 'exciting',
    komparativ: 'spannender',
    superlativ: 'am spannendsten',
    example: {
      de: 'Die Fahrt durch die Berge war wirklich spannend.',
      en: 'The drive through the mountains was really exciting.'
    }
  },
  {
    id: 'a2b1.a.047',
    de: 'anstrengend',
    en: 'exhausting, strenuous',
    komparativ: 'anstrengender',
    superlativ: 'am anstrengendsten',
    example: {
      de: 'Die lange Wanderung war ziemlich anstrengend.',
      en: 'The long hike was quite exhausting.'
    }
  },
  {
    id: 'a2b1.a.048',
    de: 'exotisch',
    en: 'exotic',
    komparativ: 'exotischer',
    superlativ: 'am exotischsten',
    example: {
      de: 'In Thailand haben wir viele exotische Früchte probiert.',
      en: 'In Thailand we tried many exotic fruits.'
    }
  },
  {
    id: 'a2b1.a.049',
    de: 'international',
    en: 'international',
    example: {
      de: 'Am Flughafen trifft man Menschen aus vielen internationalen Ländern.',
      en: 'At the airport you meet people from many different countries.'
    }
  },
  {
    id: 'a2b1.a.050',
    de: 'fremd',
    en: 'foreign, unfamiliar',
    komparativ: 'fremder',
    superlativ: 'am fremdesten',
    example: {
      de: 'In der neuen Stadt fühlte er sich zuerst sehr fremd.',
      en: 'In the new city he felt very foreign at first.'
    }
  },
  {
    id: 'a2b1.a.051',
    de: 'gültig',
    en: 'valid',
    example: {
      de: 'Ihr Ausweis ist nur noch bis Ende des Monats gültig.',
      en: 'Your ID is only valid until the end of the month.'
    }
  },
  {
    id: 'a2b1.a.052',
    de: 'ungültig',
    en: 'invalid',
    example: {
      de: 'Der abgelaufene Pass ist leider ungültig.',
      en: 'The expired passport is unfortunately invalid.'
    }
  },
  {
    id: 'a2b1.a.053',
    de: 'amtlich',
    en: 'official',
    example: {
      de: 'Für den Antrag braucht man ein amtliches Dokument.',
      en: 'For the application you need an official document.'
    }
  },
  {
    id: 'a2b1.a.054',
    de: 'notwendig',
    en: 'necessary',
    komparativ: 'notwendiger',
    superlativ: 'am notwendigsten',
    example: {
      de: 'Für die Anmeldung sind mehrere Unterlagen notwendig.',
      en: 'Several documents are necessary for the registration.'
    }
  },
  {
    id: 'a2b1.a.055',
    de: 'wichtig',
    en: 'important',
    komparativ: 'wichtiger',
    superlativ: 'am wichtigsten',
    example: {
      de: 'Die Unterschrift ist der wichtigste Teil des Formulars.',
      en: 'The signature is the most important part of the form.'
    }
  },
  {
    id: 'a2b1.a.056',
    de: 'kompliziert',
    en: 'complicated',
    komparativ: 'komplizierter',
    superlativ: 'am kompliziertesten',
    example: {
      de: 'Das Formular für die Aufenthaltserlaubnis ist ziemlich kompliziert.',
      en: 'The form for the residence permit is quite complicated.'
    }
  },
  {
    id: 'a2b1.a.057',
    de: 'einfach',
    en: 'simple, easy',
    komparativ: 'einfacher',
    superlativ: 'am einfachsten',
    example: {
      de: 'Die Anmeldung online ist viel einfacher als am Schalter.',
      en: 'Registering online is much simpler than at the counter.'
    }
  },
  {
    id: 'a2b1.a.058',
    de: 'schriftlich',
    en: 'in writing',
    example: {
      de: 'Bitte schicken Sie uns Ihre Kündigung schriftlich.',
      en: 'Please send us your notice in writing.'
    }
  },
  {
    id: 'a2b1.a.059',
    de: 'mündlich',
    en: 'oral, verbal',
    example: {
      de: 'Eine mündliche Zusage reicht bei diesem Amt leider nicht.',
      en: 'Unfortunately a verbal confirmation is not enough at this office.'
    }
  },
  {
    id: 'a2b1.a.060',
    de: 'dringend',
    en: 'urgent',
    komparativ: 'dringender',
    superlativ: 'am dringendsten',
    example: {
      de: 'Dieser Antrag muss dringend bearbeitet werden.',
      en: 'This application needs to be processed urgently.'
    }
  },
  {
    id: 'a2b1.a.061',
    de: 'sportlich',
    en: 'sporty, athletic',
    komparativ: 'sportlicher',
    superlativ: 'am sportlichsten',
    example: {
      de: 'Meine Kinder sind sehr sportlich und spielen viel im Verein.',
      en: 'My children are very sporty and play a lot at the club.'
    }
  },
  {
    id: 'a2b1.a.062',
    de: 'lustig',
    en: 'funny',
    komparativ: 'lustiger',
    superlativ: 'am lustigsten',
    example: {
      de: 'Der neue Film war wirklich sehr lustig.',
      en: 'The new film was really very funny.'
    }
  },
  {
    id: 'a2b1.a.063',
    de: 'langweilig',
    en: 'boring',
    komparativ: 'langweiliger',
    superlativ: 'am langweiligsten',
    example: {
      de: 'Ohne Hobby war ihm die Freizeit oft langweilig.',
      en: 'Without a hobby, his free time was often boring.'
    }
  },
  {
    id: 'a2b1.a.064',
    de: 'interessant',
    en: 'interesting',
    komparativ: 'interessanter',
    superlativ: 'am interessantesten',
    example: {
      de: 'Die Ausstellung im Museum war sehr interessant.',
      en: 'The exhibition at the museum was very interesting.'
    }
  },
  {
    id: 'a2b1.a.065',
    de: 'unterhaltsam',
    en: 'entertaining',
    komparativ: 'unterhaltsamer',
    superlativ: 'am unterhaltsamsten',
    example: {
      de: 'Das Konzert war unterhaltsam von Anfang bis Ende.',
      en: 'The concert was entertaining from start to finish.'
    }
  },
  {
    id: 'a2b1.a.066',
    de: 'aktiv',
    en: 'active',
    komparativ: 'aktiver',
    superlativ: 'am aktivsten',
    example: {
      de: 'In seiner Freizeit ist er sehr aktiv und macht viel Sport.',
      en: 'In his free time he is very active and does a lot of sport.'
    }
  },
  {
    id: 'a2b1.a.067',
    de: 'entspannt',
    en: 'relaxed',
    example: {
      de: 'Nach dem Urlaub fühlt man sich meistens sehr entspannt.',
      en: 'After the holiday you usually feel very relaxed.'
    }
  },
  {
    id: 'a2b1.a.068',
    de: 'beliebt',
    en: 'popular',
    komparativ: 'beliebter',
    superlativ: 'am beliebtesten',
    example: {
      de: 'Dieser Verein ist bei jungen Leuten sehr beliebt.',
      en: 'This club is very popular with young people.'
    }
  },
  {
    id: 'a2b1.a.069',
    de: 'kreativ',
    en: 'creative',
    komparativ: 'kreativer',
    superlativ: 'am kreativsten',
    example: {
      de: 'Beim Malen kann man wunderbar kreativ sein.',
      en: 'You can be wonderfully creative when painting.'
    }
  },
  {
    id: 'a2b1.a.070',
    de: 'musikalisch',
    en: 'musical',
    example: {
      de: 'Ihre ganze Familie ist sehr musikalisch.',
      en: 'Her whole family is very musical.'
    }
  },
  {
    id: 'a2b1.a.071',
    de: 'verheiratet',
    en: 'married',
    example: {
      de: 'Meine Schwester ist seit letztem Jahr verheiratet.',
      en: 'My sister has been married since last year.'
    }
  },
  {
    id: 'a2b1.a.072',
    de: 'geschieden',
    en: 'divorced',
    example: {
      de: 'Ihre Eltern sind schon seit zehn Jahren geschieden.',
      en: 'Her parents have been divorced for ten years already.'
    }
  },
  {
    id: 'a2b1.a.073',
    de: 'ledig',
    en: 'single, unmarried',
    example: {
      de: 'Er ist noch ledig und wohnt allein.',
      en: 'He is still single and lives alone.'
    }
  },
  {
    id: 'a2b1.a.074',
    de: 'verlobt',
    en: 'engaged',
    example: {
      de: 'Meine Kollegin ist seit einem Monat verlobt.',
      en: 'My colleague has been engaged for a month.'
    }
  },
  {
    id: 'a2b1.a.075',
    de: 'streng',
    en: 'strict',
    komparativ: 'strenger',
    superlativ: 'am strengsten',
    example: {
      de: 'Meine Großeltern waren früher sehr streng.',
      en: 'My grandparents used to be very strict.'
    }
  },
  {
    id: 'a2b1.a.076',
    de: 'locker',
    en: 'relaxed, easy-going',
    komparativ: 'lockerer',
    superlativ: 'am lockersten',
    example: {
      de: 'Meine Eltern sind zum Glück ziemlich locker.',
      en: 'Luckily my parents are quite easy-going.'
    }
  },
  {
    id: 'a2b1.a.077',
    de: 'liebevoll',
    en: 'loving, affectionate',
    komparativ: 'liebevoller',
    superlativ: 'am liebevollsten',
    example: {
      de: 'Sie kümmert sich sehr liebevoll um ihre kleinen Geschwister.',
      en: 'She takes care of her little siblings very lovingly.'
    }
  },
  {
    id: 'a2b1.a.078',
    de: 'verständnisvoll',
    en: 'understanding',
    komparativ: 'verständnisvoller',
    superlativ: 'am verständnisvollsten',
    example: {
      de: 'Mein Vater war immer sehr verständnisvoll.',
      en: 'My father was always very understanding.'
    }
  },
  {
    id: 'a2b1.a.079',
    de: 'erwachsen',
    en: 'grown-up, adult',
    example: {
      de: 'Seine Kinder sind inzwischen alle erwachsen.',
      en: 'His children are all grown-up by now.'
    }
  },
  {
    id: 'a2b1.a.080',
    de: 'jung',
    en: 'young',
    komparativ: 'jünger',
    superlativ: 'am jüngsten',
    example: {
      de: 'Meine jüngere Schwester wohnt noch bei unseren Eltern.',
      en: 'My younger sister still lives with our parents.'
    }
  },
  {
    id: 'a2b1.a.081',
    de: 'lecker',
    en: 'delicious',
    komparativ: 'leckerer',
    superlativ: 'am leckersten',
    example: {
      de: 'Der Kuchen von meiner Oma schmeckt immer besonders lecker.',
      en: "My grandma's cake always tastes especially delicious."
    }
  },
  {
    id: 'a2b1.a.082',
    de: 'scharf',
    en: 'spicy, hot',
    komparativ: 'schärfer',
    superlativ: 'am schärfsten',
    example: {
      de: 'Das Curry war mir heute ein bisschen zu scharf.',
      en: 'The curry was a bit too spicy for me today.'
    }
  },
  {
    id: 'a2b1.a.083',
    de: 'süß',
    en: 'sweet',
    komparativ: 'süßer',
    superlativ: 'am süßesten',
    example: {
      de: 'Der Nachtisch war mir eigentlich zu süß.',
      en: 'The dessert was actually too sweet for me.'
    }
  },
  {
    id: 'a2b1.a.084',
    de: 'sauer',
    en: 'sour',
    komparativ: 'saurer',
    superlativ: 'am sauersten',
    example: {
      de: 'Diese Zitrone ist besonders sauer.',
      en: 'This lemon is particularly sour.'
    }
  },
  {
    id: 'a2b1.a.085',
    de: 'salzig',
    en: 'salty',
    komparativ: 'salziger',
    superlativ: 'am salzigsten',
    example: {
      de: 'Die Suppe ist mir heute etwas zu salzig.',
      en: 'The soup is a bit too salty for me today.'
    }
  },
  {
    id: 'a2b1.a.086',
    de: 'bitter',
    en: 'bitter',
    komparativ: 'bitterer',
    superlativ: 'am bittersten',
    example: {
      de: 'Der schwarze Kaffee schmeckt mir zu bitter.',
      en: 'The black coffee tastes too bitter to me.'
    }
  },
  {
    id: 'a2b1.a.087',
    de: 'roh',
    en: 'raw',
    example: {
      de: 'Das Fleisch ist innen noch roh.',
      en: 'The meat is still raw inside.'
    }
  },
  {
    id: 'a2b1.a.088',
    de: 'fett',
    en: 'fatty, greasy',
    komparativ: 'fetter',
    superlativ: 'am fettesten',
    example: {
      de: 'Das Essen im Imbiss war mir zu fett.',
      en: 'The food at the snack bar was too fatty for me.'
    }
  },
  {
    id: 'a2b1.a.089',
    de: 'vegetarisch',
    en: 'vegetarian',
    example: {
      de: 'Im Restaurant gibt es auch vegetarische Gerichte.',
      en: 'The restaurant also has vegetarian dishes.'
    }
  },
  {
    id: 'a2b1.a.090',
    de: 'würzig',
    en: 'spicy, flavourful',
    komparativ: 'würziger',
    superlativ: 'am würzigsten',
    example: {
      de: 'Die Wurst schmeckt sehr würzig.',
      en: 'The sausage tastes very spicy.'
    }
  },
  {
    id: 'a2b1.a.091',
    de: 'aktuell',
    en: 'current, up to date',
    komparativ: 'aktueller',
    superlativ: 'am aktuellsten',
    example: {
      de: 'Diese Nachrichten-App ist immer sehr aktuell.',
      en: 'This news app is always very up to date.'
    }
  },
  {
    id: 'a2b1.a.092',
    de: 'bekannt',
    en: 'well-known, famous',
    komparativ: 'bekannter',
    superlativ: 'am bekanntesten',
    example: {
      de: 'Dieser Schauspieler ist in Deutschland sehr bekannt.',
      en: 'This actor is very well-known in Germany.'
    }
  },
  {
    id: 'a2b1.a.093',
    de: 'berühmt',
    en: 'famous',
    komparativ: 'berühmter',
    superlativ: 'am berühmtesten',
    example: {
      de: 'Sie ist durch ihre Videos im Internet berühmt geworden.',
      en: 'She became famous through her videos on the internet.'
    }
  },
  {
    id: 'a2b1.a.094',
    de: 'digital',
    en: 'digital',
    example: {
      de: 'Viele Ämter bieten inzwischen digitale Formulare an.',
      en: 'Many offices now offer digital forms.'
    }
  },
  {
    id: 'a2b1.a.095',
    de: 'sozial',
    en: 'social',
    example: {
      de: 'Er verbringt jeden Tag viel Zeit in den sozialen Medien.',
      en: 'He spends a lot of time on social media every day.'
    }
  },
  {
    id: 'a2b1.a.096',
    de: 'online',
    en: 'online',
    example: {
      de: 'Den Antrag können Sie auch online stellen.',
      en: 'You can also submit the application online.'
    }
  },
  {
    id: 'a2b1.a.097',
    de: 'nützlich',
    en: 'useful',
    komparativ: 'nützlicher',
    superlativ: 'am nützlichsten',
    example: {
      de: 'Diese App ist wirklich sehr nützlich für Reisen.',
      en: 'This app is really very useful for travelling.'
    }
  },
  {
    id: 'a2b1.a.098',
    de: 'informativ',
    en: 'informative',
    komparativ: 'informativer',
    superlativ: 'am informativsten',
    example: {
      de: 'Der Bericht in der Zeitung war sehr informativ.',
      en: 'The report in the newspaper was very informative.'
    }
  },
  {
    id: 'a2b1.a.099',
    de: 'kostenpflichtig',
    en: 'chargeable, not free',
    example: {
      de: 'Dieser Teil der App ist leider kostenpflichtig.',
      en: 'Unfortunately this part of the app is chargeable.'
    }
  },
  {
    id: 'a2b1.a.100',
    de: 'werbefrei',
    en: 'advertisement-free',
    example: {
      de: 'Ich bezahle gern etwas mehr für ein werbefreies Programm.',
      en: 'I am happy to pay a bit more for an ad-free service.'
    }
  }
];

export const A2B1_VOCAB: VocabBank = {
  verbs: A2B1_VERBS,
  nouns: A2B1_NOUNS,
  adjectives: A2B1_ADJECTIVES,
  prepVerbs: A2B1_PREP_VERBS,
  caseItems: A2B1_CASE_ITEMS
};
