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
  },
  {
    id: 'b1.v.003',
    de: 'kündigen',
    en: 'to quit, to hand in notice',
    praesens: 'kündigt',
    praeteritum: 'kündigte',
    perfekt: 'hat gekündigt',
    example: {
      de: 'Er hat seinen Job gekündigt, weil das Gehalt zu niedrig war.',
      en: 'He quit his job because the salary was too low.'
    }
  },
  {
    id: 'b1.v.004',
    de: 'verdienen',
    en: 'to earn',
    praesens: 'verdient',
    praeteritum: 'verdiente',
    perfekt: 'hat verdient',
    example: {
      de: 'In diesem Beruf verdient man am Anfang nicht viel.',
      en: 'In this profession you do not earn much at first.'
    }
  },
  {
    id: 'b1.v.005',
    de: 'einstellen',
    en: 'to hire',
    praesens: 'stellt ein',
    praeteritum: 'stellte ein',
    perfekt: 'hat eingestellt',
    example: {
      de: 'Die Firma stellt dieses Jahr zwanzig neue Mitarbeiter ein.',
      en: 'The company is hiring twenty new employees this year.'
    }
  },
  {
    id: 'b1.v.006',
    de: 'erledigen',
    en: 'to take care of, to complete',
    praesens: 'erledigt',
    praeteritum: 'erledigte',
    perfekt: 'hat erledigt',
    example: {
      de: 'Ich muss heute noch einige wichtige Aufgaben erledigen.',
      en: 'I still have to take care of some important tasks today.'
    }
  },
  {
    id: 'b1.v.007',
    de: 'vereinbaren',
    en: 'to arrange, to agree on',
    praesens: 'vereinbart',
    praeteritum: 'vereinbarte',
    perfekt: 'hat vereinbart',
    example: {
      de: 'Wir haben einen Termin für nächste Woche vereinbart.',
      en: 'We arranged an appointment for next week.'
    }
  },
  {
    id: 'b1.v.008',
    de: 'teilnehmen',
    en: 'to take part',
    praesens: 'nimmt teil',
    praeteritum: 'nahm teil',
    perfekt: 'hat teilgenommen',
    example: {
      de: 'Sie nimmt an einem Deutschkurs für Fortgeschrittene teil.',
      en: 'She is taking part in an advanced German course.'
    }
  },
  {
    id: 'b1.v.009',
    de: 'sich vorstellen',
    en: 'to introduce oneself',
    praesens: 'stellt sich vor',
    praeteritum: 'stellte sich vor',
    perfekt: 'hat sich vorgestellt',
    example: {
      de: 'Am ersten Arbeitstag stellte er sich allen Kollegen vor.',
      en: 'On his first day at work he introduced himself to all colleagues.'
    }
  },
  {
    id: 'b1.v.010',
    de: 'leiten',
    en: 'to lead, to manage',
    praesens: 'leitet',
    praeteritum: 'leitete',
    perfekt: 'hat geleitet',
    example: {
      de: 'Frau Krause leitet die Abteilung seit zwei Jahren.',
      en: 'Ms Krause has been managing the department for two years.'
    }
  },
  {
    id: 'b1.v.011',
    de: 'umziehen',
    en: 'to move (house)',
    praesens: 'zieht um',
    praeteritum: 'zog um',
    perfekt: 'ist umgezogen',
    example: {
      de: 'Wir sind letzten Monat in eine größere Wohnung umgezogen.',
      en: 'Last month we moved into a bigger flat.'
    }
  },
  {
    id: 'b1.v.012',
    de: 'einziehen',
    en: 'to move in',
    praesens: 'zieht ein',
    praeteritum: 'zog ein',
    perfekt: 'ist eingezogen',
    example: {
      de: 'Die neuen Mieter ziehen am ersten März ein.',
      en: 'The new tenants are moving in on the first of March.'
    }
  },
  {
    id: 'b1.v.013',
    de: 'ausziehen',
    en: 'to move out',
    praesens: 'zieht aus',
    praeteritum: 'zog aus',
    perfekt: 'ist ausgezogen',
    example: {
      de: 'Mein Bruder ist mit achtzehn Jahren zu Hause ausgezogen.',
      en: 'My brother moved out of home at eighteen.'
    }
  },
  {
    id: 'b1.v.014',
    de: 'mieten',
    en: 'to rent (as a tenant)',
    praesens: 'mietet',
    praeteritum: 'mietete',
    perfekt: 'hat gemietet',
    example: {
      de: 'Für den Urlaub haben wir ein kleines Ferienhaus gemietet.',
      en: 'We rented a small holiday house for the vacation.'
    }
  },
  {
    id: 'b1.v.015',
    de: 'vermieten',
    en: 'to rent out',
    praesens: 'vermietet',
    praeteritum: 'vermietete',
    perfekt: 'hat vermietet',
    example: {
      de: 'Sie vermietet ein Zimmer an eine Studentin.',
      en: 'She rents out a room to a student.'
    }
  },
  {
    id: 'b1.v.016',
    de: 'einrichten',
    en: 'to furnish',
    praesens: 'richtet ein',
    praeteritum: 'richtete ein',
    perfekt: 'hat eingerichtet',
    example: {
      de: 'Wir haben das Wohnzimmer ganz neu eingerichtet.',
      en: 'We completely refurnished the living room.'
    }
  },
  {
    id: 'b1.v.017',
    de: 'renovieren',
    en: 'to renovate',
    praesens: 'renoviert',
    praeteritum: 'renovierte',
    perfekt: 'hat renoviert',
    example: {
      de: 'Der Vermieter will das Bad im Sommer renovieren.',
      en: 'The landlord wants to renovate the bathroom in summer.'
    }
  },
  {
    id: 'b1.v.018',
    de: 'sich erkälten',
    en: 'to catch a cold',
    praesens: 'erkältet sich',
    praeteritum: 'erkältete sich',
    perfekt: 'hat sich erkältet',
    example: {
      de: 'Zieh dich warm an, sonst erkältest du dich!',
      en: 'Dress warmly, otherwise you will catch a cold!'
    }
  },
  {
    id: 'b1.v.019',
    de: 'untersuchen',
    en: 'to examine',
    praesens: 'untersucht',
    praeteritum: 'untersuchte',
    perfekt: 'hat untersucht',
    example: {
      de: 'Die Ärztin untersuchte den Patienten sehr gründlich.',
      en: 'The doctor examined the patient very thoroughly.'
    }
  },
  {
    id: 'b1.v.020',
    de: 'verschreiben',
    en: 'to prescribe',
    praesens: 'verschreibt',
    praeteritum: 'verschrieb',
    perfekt: 'hat verschrieben',
    example: {
      de: 'Der Arzt hat mir ein Medikament gegen die Schmerzen verschrieben.',
      en: 'The doctor prescribed me a medication for the pain.'
    }
  },
  {
    id: 'b1.v.021',
    de: 'sich verletzen',
    en: 'to injure oneself',
    praesens: 'verletzt sich',
    praeteritum: 'verletzte sich',
    perfekt: 'hat sich verletzt',
    example: {
      de: 'Beim Fußballspielen hat er sich am Knie verletzt.',
      en: 'He injured his knee while playing football.'
    }
  },
  {
    id: 'b1.v.022',
    de: 'sich erholen',
    en: 'to recover, to rest',
    praesens: 'erholt sich',
    praeteritum: 'erholte sich',
    perfekt: 'hat sich erholt',
    example: {
      de: 'Nach der Operation musste sie sich lange erholen.',
      en: 'After the operation she had to recover for a long time.'
    }
  },
  {
    id: 'b1.v.023',
    de: 'wehtun',
    en: 'to hurt',
    praesens: 'tut weh',
    praeteritum: 'tat weh',
    perfekt: 'hat wehgetan',
    example: {
      de: 'Mein Rücken tut mir seit einigen Tagen weh.',
      en: 'My back has been hurting for a few days.'
    }
  },
  {
    id: 'b1.v.024',
    de: 'abnehmen',
    en: 'to lose weight',
    praesens: 'nimmt ab',
    praeteritum: 'nahm ab',
    perfekt: 'hat abgenommen',
    example: {
      de: 'Er hat durch den Sport fünf Kilo abgenommen.',
      en: 'He lost five kilos through exercise.'
    }
  },
  {
    id: 'b1.v.025',
    de: 'zunehmen',
    en: 'to gain weight, to increase',
    praesens: 'nimmt zu',
    praeteritum: 'nahm zu',
    perfekt: 'hat zugenommen',
    example: {
      de: 'Im Winter nehme ich immer ein bisschen zu.',
      en: 'In winter I always gain a little weight.'
    }
  },
  {
    id: 'b1.v.026',
    de: 'abfahren',
    en: 'to depart',
    praesens: 'fährt ab',
    praeteritum: 'fuhr ab',
    perfekt: 'ist abgefahren',
    example: {
      de: 'Der Zug nach Köln fährt um acht Uhr ab.',
      en: 'The train to Cologne departs at eight.'
    }
  },
  {
    id: 'b1.v.027',
    de: 'ankommen',
    en: 'to arrive',
    praesens: 'kommt an',
    praeteritum: 'kam an',
    perfekt: 'ist angekommen',
    example: {
      de: 'Wir sind erst spät in der Nacht angekommen.',
      en: 'We only arrived late at night.'
    }
  },
  {
    id: 'b1.v.028',
    de: 'umsteigen',
    en: 'to change (trains)',
    praesens: 'steigt um',
    praeteritum: 'stieg um',
    perfekt: 'ist umgestiegen',
    example: {
      de: 'In Hannover müssen Sie in den Regionalzug umsteigen.',
      en: 'In Hanover you have to change to the regional train.'
    }
  },
  {
    id: 'b1.v.029',
    de: 'einsteigen',
    en: 'to get on, to board',
    praesens: 'steigt ein',
    praeteritum: 'stieg ein',
    perfekt: 'ist eingestiegen',
    example: {
      de: 'Sie stieg in Eile in den falschen Bus ein.',
      en: 'In a hurry she got on the wrong bus.'
    }
  },
  {
    id: 'b1.v.030',
    de: 'aussteigen',
    en: 'to get off',
    praesens: 'steigt aus',
    praeteritum: 'stieg aus',
    perfekt: 'ist ausgestiegen',
    example: {
      de: 'An der nächsten Haltestelle müssen wir aussteigen.',
      en: 'We have to get off at the next stop.'
    }
  },
  {
    id: 'b1.v.031',
    de: 'verpassen',
    en: 'to miss (a train, a chance)',
    praesens: 'verpasst',
    praeteritum: 'verpasste',
    perfekt: 'hat verpasst',
    example: {
      de: 'Beeil dich, sonst verpassen wir den letzten Bus!',
      en: 'Hurry up, otherwise we will miss the last bus!'
    }
  },
  {
    id: 'b1.v.032',
    de: 'buchen',
    en: 'to book',
    praesens: 'bucht',
    praeteritum: 'buchte',
    perfekt: 'hat gebucht',
    example: {
      de: 'Wir haben den Flug schon im Januar gebucht.',
      en: 'We already booked the flight in January.'
    }
  },
  {
    id: 'b1.v.033',
    de: 'verreisen',
    en: 'to go away (on a trip)',
    praesens: 'verreist',
    praeteritum: 'verreiste',
    perfekt: 'ist verreist',
    example: {
      de: 'Meine Nachbarn verreisen jedes Jahr im August.',
      en: 'My neighbours go away every year in August.'
    }
  },
  {
    id: 'b1.v.034',
    de: 'besichtigen',
    en: 'to visit, to tour (sights)',
    praesens: 'besichtigt',
    praeteritum: 'besichtigte',
    perfekt: 'hat besichtigt',
    example: {
      de: 'Morgen besichtigen wir die Altstadt und den Dom.',
      en: 'Tomorrow we are touring the old town and the cathedral.'
    }
  },
  {
    id: 'b1.v.035',
    de: 'übernachten',
    en: 'to stay overnight',
    praesens: 'übernachtet',
    praeteritum: 'übernachtete',
    perfekt: 'hat übernachtet',
    example: {
      de: 'In München haben wir bei Freunden übernachtet.',
      en: 'In Munich we stayed overnight with friends.'
    }
  },
  {
    id: 'b1.v.036',
    de: 'umtauschen',
    en: 'to exchange (goods)',
    praesens: 'tauscht um',
    praeteritum: 'tauschte um',
    perfekt: 'hat umgetauscht',
    example: {
      de: 'Kann ich die Hose auch ohne Kassenbon umtauschen?',
      en: 'Can I exchange the trousers even without a receipt?'
    }
  },
  {
    id: 'b1.v.037',
    de: 'anprobieren',
    en: 'to try on',
    praesens: 'probiert an',
    praeteritum: 'probierte an',
    perfekt: 'hat anprobiert',
    example: {
      de: 'Sie probierte das Kleid in drei Größen an.',
      en: 'She tried the dress on in three sizes.'
    }
  },
  {
    id: 'b1.v.038',
    de: 'bestellen',
    en: 'to order',
    praesens: 'bestellt',
    praeteritum: 'bestellte',
    perfekt: 'hat bestellt',
    example: {
      de: 'Ich habe mir online ein neues Handy bestellt.',
      en: 'I ordered a new mobile phone online.'
    }
  },
  {
    id: 'b1.v.039',
    de: 'liefern',
    en: 'to deliver',
    praesens: 'liefert',
    praeteritum: 'lieferte',
    perfekt: 'hat geliefert',
    example: {
      de: 'Der Laden liefert die Möbel direkt nach Hause.',
      en: 'The shop delivers the furniture straight to your home.'
    }
  },
  {
    id: 'b1.v.040',
    de: 'sich beschweren',
    en: 'to complain',
    praesens: 'beschwert sich',
    praeteritum: 'beschwerte sich',
    perfekt: 'hat sich beschwert',
    example: {
      de: 'Der Gast beschwerte sich über das kalte Essen.',
      en: 'The guest complained about the cold food.'
    }
  },
  {
    id: 'b1.v.041',
    de: 'sparen',
    en: 'to save (money)',
    praesens: 'spart',
    praeteritum: 'sparte',
    perfekt: 'hat gespart',
    example: {
      de: 'Wir sparen seit einem Jahr für ein neues Auto.',
      en: 'We have been saving for a new car for a year.'
    }
  },
  {
    id: 'b1.v.042',
    de: 'ausgeben',
    en: 'to spend (money)',
    praesens: 'gibt aus',
    praeteritum: 'gab aus',
    perfekt: 'hat ausgegeben',
    example: {
      de: 'Für Kleidung gibt sie ziemlich viel Geld aus.',
      en: 'She spends quite a lot of money on clothes.'
    }
  },
  {
    id: 'b1.v.043',
    de: 'vergleichen',
    en: 'to compare',
    praesens: 'vergleicht',
    praeteritum: 'verglich',
    perfekt: 'hat verglichen',
    example: {
      de: 'Vor dem Kauf sollte man die Preise genau vergleichen.',
      en: 'Before buying you should compare prices carefully.'
    }
  },
  {
    id: 'b1.v.044',
    de: 'herunterladen',
    en: 'to download',
    praesens: 'lädt herunter',
    praeteritum: 'lud herunter',
    perfekt: 'hat heruntergeladen',
    example: {
      de: 'Die neue App kann man kostenlos herunterladen.',
      en: 'You can download the new app for free.'
    }
  },
  {
    id: 'b1.v.045',
    de: 'ausdrucken',
    en: 'to print out',
    praesens: 'druckt aus',
    praeteritum: 'druckte aus',
    perfekt: 'hat ausgedruckt',
    example: {
      de: 'Ich habe das Ticket zu Hause ausgedruckt.',
      en: 'I printed the ticket out at home.'
    }
  },
  {
    id: 'b1.v.046',
    de: 'speichern',
    en: 'to save (data)',
    praesens: 'speichert',
    praeteritum: 'speicherte',
    perfekt: 'hat gespeichert',
    example: {
      de: 'Vergiss nicht, das Dokument regelmäßig zu speichern!',
      en: 'Do not forget to save the document regularly!'
    }
  },
  {
    id: 'b1.v.047',
    de: 'löschen',
    en: 'to delete',
    praesens: 'löscht',
    praeteritum: 'löschte',
    perfekt: 'hat gelöscht',
    example: {
      de: 'Er hat aus Versehen alle Fotos gelöscht.',
      en: 'He accidentally deleted all the photos.'
    }
  },
  {
    id: 'b1.v.048',
    de: 'mitteilen',
    en: 'to inform, to notify',
    praesens: 'teilt mit',
    praeteritum: 'teilte mit',
    perfekt: 'hat mitgeteilt',
    example: {
      de: 'Die Schule teilte den Eltern den Termin schriftlich mit.',
      en: 'The school notified the parents of the date in writing.'
    }
  },
  {
    id: 'b1.v.049',
    de: 'senden',
    en: 'to send',
    praesens: 'sendet',
    praeteritum: 'sendete',
    perfekt: 'hat gesendet',
    example: {
      de: 'Ich sende Ihnen die Unterlagen noch heute per E-Mail.',
      en: 'I will send you the documents by email today.'
    }
  },
  {
    id: 'b1.v.050',
    de: 'sich informieren',
    en: 'to inform oneself, to find out',
    praesens: 'informiert sich',
    praeteritum: 'informierte sich',
    perfekt: 'hat sich informiert',
    example: {
      de: 'Sie informiert sich vor der Reise über das Land.',
      en: 'She finds out about the country before the trip.'
    }
  },
  {
    id: 'b1.v.051',
    de: 'schützen',
    en: 'to protect',
    praesens: 'schützt',
    praeteritum: 'schützte',
    perfekt: 'hat geschützt',
    example: {
      de: 'Wir müssen die Natur besser vor Müll schützen.',
      en: 'We must protect nature better from rubbish.'
    }
  },
  {
    id: 'b1.v.052',
    de: 'wegwerfen',
    en: 'to throw away',
    praesens: 'wirft weg',
    praeteritum: 'warf weg',
    perfekt: 'hat weggeworfen',
    example: {
      de: 'Wirf die alten Batterien nicht in den Hausmüll weg!',
      en: 'Do not throw the old batteries away in the household waste!'
    }
  },
  {
    id: 'b1.v.053',
    de: 'verschmutzen',
    en: 'to pollute',
    praesens: 'verschmutzt',
    praeteritum: 'verschmutzte',
    perfekt: 'hat verschmutzt',
    example: {
      de: 'Viele Fabriken verschmutzen immer noch die Flüsse.',
      en: 'Many factories still pollute the rivers.'
    }
  },
  {
    id: 'b1.v.054',
    de: 'trennen',
    en: 'to separate (waste)',
    praesens: 'trennt',
    praeteritum: 'trennte',
    perfekt: 'hat getrennt',
    example: {
      de: 'In Deutschland trennt man den Müll sehr genau.',
      en: 'In Germany people separate their rubbish very carefully.'
    }
  },
  {
    id: 'b1.v.055',
    de: 'verbrauchen',
    en: 'to consume, to use up',
    praesens: 'verbraucht',
    praeteritum: 'verbrauchte',
    perfekt: 'hat verbraucht',
    example: {
      de: 'Das alte Auto verbraucht viel zu viel Benzin.',
      en: 'The old car uses far too much petrol.'
    }
  },
  {
    id: 'b1.v.056',
    de: 'bestehen',
    en: 'to pass (an exam)',
    praesens: 'besteht',
    praeteritum: 'bestand',
    perfekt: 'hat bestanden',
    example: {
      de: 'Sie hat die Prüfung beim ersten Versuch bestanden.',
      en: 'She passed the exam on the first attempt.'
    }
  },
  {
    id: 'b1.v.057',
    de: 'durchfallen',
    en: 'to fail (an exam)',
    praesens: 'fällt durch',
    praeteritum: 'fiel durch',
    perfekt: 'ist durchgefallen',
    example: {
      de: 'Er ist bei der theoretischen Fahrprüfung zweimal durchgefallen.',
      en: 'He failed the driving theory test twice.'
    }
  },
  {
    id: 'b1.v.058',
    de: 'sich anmelden',
    en: 'to register, to sign up',
    praesens: 'meldet sich an',
    praeteritum: 'meldete sich an',
    perfekt: 'hat sich angemeldet',
    example: {
      de: 'Ich habe mich für einen Tanzkurs angemeldet.',
      en: 'I signed up for a dance class.'
    }
  },
  {
    id: 'b1.v.059',
    de: 'unterrichten',
    en: 'to teach',
    praesens: 'unterrichtet',
    praeteritum: 'unterrichtete',
    perfekt: 'hat unterrichtet',
    example: {
      de: 'Herr Weber unterrichtet Mathematik an einer Realschule.',
      en: 'Mr Weber teaches mathematics at a secondary school.'
    }
  },
  {
    id: 'b1.v.060',
    de: 'wiederholen',
    en: 'to repeat, to revise',
    praesens: 'wiederholt',
    praeteritum: 'wiederholte',
    perfekt: 'hat wiederholt',
    example: {
      de: 'Vor dem Test wiederholte sie alle wichtigen Vokabeln.',
      en: 'Before the test she revised all the important vocabulary.'
    }
  },
  {
    id: 'b1.v.061',
    de: 'übersetzen',
    en: 'to translate',
    praesens: 'übersetzt',
    praeteritum: 'übersetzte',
    perfekt: 'hat übersetzt',
    example: {
      de: 'Kannst du mir diesen Satz ins Deutsche übersetzen?',
      en: 'Can you translate this sentence into German for me?'
    }
  },
  {
    id: 'b1.v.062',
    de: 'sich weiterbilden',
    en: 'to get further training',
    praesens: 'bildet sich weiter',
    praeteritum: 'bildete sich weiter',
    perfekt: 'hat sich weitergebildet',
    example: {
      de: 'Nach der Ausbildung will sie sich beruflich weiterbilden.',
      en: 'After her apprenticeship she wants to get further professional training.'
    }
  },
  {
    id: 'b1.v.063',
    de: 'heiraten',
    en: 'to marry',
    praesens: 'heiratet',
    praeteritum: 'heiratete',
    perfekt: 'hat geheiratet',
    example: {
      de: 'Meine Schwester heiratet im Juni ihren langjährigen Freund.',
      en: 'My sister is marrying her long-time boyfriend in June.'
    }
  },
  {
    id: 'b1.v.064',
    de: 'sich kümmern',
    en: 'to take care of',
    praesens: 'kümmert sich',
    praeteritum: 'kümmerte sich',
    perfekt: 'hat sich gekümmert',
    example: {
      de: 'Er kümmert sich jeden Tag um seine kranke Mutter.',
      en: 'He takes care of his sick mother every day.'
    }
  },
  {
    id: 'b1.v.065',
    de: 'erziehen',
    en: 'to raise, to bring up',
    praesens: 'erzieht',
    praeteritum: 'erzog',
    perfekt: 'hat erzogen',
    example: {
      de: 'Es ist nicht leicht, drei Kinder allein zu erziehen.',
      en: 'It is not easy to raise three children alone.'
    }
  },
  {
    id: 'b1.v.066',
    de: 'sich streiten',
    en: 'to argue',
    praesens: 'streitet sich',
    praeteritum: 'stritt sich',
    perfekt: 'hat sich gestritten',
    example: {
      de: 'Die Geschwister streiten sich oft um den Computer.',
      en: 'The siblings often argue over the computer.'
    }
  },
  {
    id: 'b1.v.067',
    de: 'vertrauen',
    en: 'to trust',
    praesens: 'vertraut',
    praeteritum: 'vertraute',
    perfekt: 'hat vertraut',
    example: {
      de: 'Ich vertraue meiner besten Freundin voll und ganz.',
      en: 'I trust my best friend completely.'
    }
  },
  {
    id: 'b1.v.068',
    de: 'unterstützen',
    en: 'to support',
    praesens: 'unterstützt',
    praeteritum: 'unterstützte',
    perfekt: 'hat unterstützt',
    example: {
      de: 'Seine Eltern unterstützen ihn während des Studiums finanziell.',
      en: 'His parents support him financially during his studies.'
    }
  },
  {
    id: 'b1.v.069',
    de: 'sich verabreden',
    en: 'to arrange to meet',
    praesens: 'verabredet sich',
    praeteritum: 'verabredete sich',
    perfekt: 'hat sich verabredet',
    example: {
      de: 'Wir haben uns für Samstagabend im Kino verabredet.',
      en: 'We arranged to meet at the cinema on Saturday evening.'
    }
  },
  {
    id: 'b1.v.070',
    de: 'stattfinden',
    en: 'to take place',
    praesens: 'findet statt',
    praeteritum: 'fand statt',
    perfekt: 'hat stattgefunden',
    example: {
      de: 'Das Konzert findet bei Regen in der Halle statt.',
      en: 'If it rains, the concert takes place in the hall.'
    }
  },
  {
    id: 'b1.v.071',
    de: 'verbringen',
    en: 'to spend (time)',
    praesens: 'verbringt',
    praeteritum: 'verbrachte',
    perfekt: 'hat verbracht',
    example: {
      de: 'Wir verbrachten den ganzen Sommer am Meer.',
      en: 'We spent the whole summer at the seaside.'
    }
  },
  {
    id: 'b1.v.072',
    de: 'sich langweilen',
    en: 'to be bored',
    praesens: 'langweilt sich',
    praeteritum: 'langweilte sich',
    perfekt: 'hat sich gelangweilt',
    example: {
      de: 'Ohne seine Freunde langweilt er sich am Wochenende.',
      en: 'Without his friends he gets bored at the weekend.'
    }
  },
  {
    id: 'b1.v.073',
    de: 'unternehmen',
    en: 'to do (an activity)',
    praesens: 'unternimmt',
    praeteritum: 'unternahm',
    perfekt: 'hat unternommen',
    example: {
      de: 'Am Sonntag wollen wir etwas mit den Kindern unternehmen.',
      en: 'On Sunday we want to do something with the children.'
    }
  },
  {
    id: 'b1.v.074',
    de: 'sich entspannen',
    en: 'to relax',
    praesens: 'entspannt sich',
    praeteritum: 'entspannte sich',
    perfekt: 'hat sich entspannt',
    example: {
      de: 'Nach der Arbeit entspanne ich mich gern beim Lesen.',
      en: 'After work I like to relax by reading.'
    }
  },
  {
    id: 'b1.v.075',
    de: 'beantragen',
    en: 'to apply for (officially)',
    praesens: 'beantragt',
    praeteritum: 'beantragte',
    perfekt: 'hat beantragt',
    example: {
      de: 'Sie müssen den neuen Reisepass persönlich beantragen.',
      en: 'You have to apply for the new passport in person.'
    }
  },
  {
    id: 'b1.v.076',
    de: 'ausfüllen',
    en: 'to fill in',
    praesens: 'füllt aus',
    praeteritum: 'füllte aus',
    perfekt: 'hat ausgefüllt',
    example: {
      de: 'Bitte füllen Sie das Formular vollständig aus.',
      en: 'Please fill in the form completely.'
    }
  },
  {
    id: 'b1.v.077',
    de: 'verlängern',
    en: 'to extend, to renew',
    praesens: 'verlängert',
    praeteritum: 'verlängerte',
    perfekt: 'hat verlängert',
    example: {
      de: 'Ich möchte mein Visum um drei Monate verlängern.',
      en: 'I would like to extend my visa by three months.'
    }
  },
  {
    id: 'b1.v.078',
    de: 'unterschreiben',
    en: 'to sign',
    praesens: 'unterschreibt',
    praeteritum: 'unterschrieb',
    perfekt: 'hat unterschrieben',
    example: {
      de: 'Sie unterschrieb den Mietvertrag gleich am nächsten Tag.',
      en: 'She signed the rental contract the very next day.'
    }
  },
  {
    id: 'b1.v.079',
    de: 'sich erkundigen',
    en: 'to enquire',
    praesens: 'erkundigt sich',
    praeteritum: 'erkundigte sich',
    perfekt: 'hat sich erkundigt',
    example: {
      de: 'Er erkundigte sich am Schalter nach den Öffnungszeiten.',
      en: 'He enquired about the opening hours at the counter.'
    }
  },
  {
    id: 'b1.v.080',
    de: 'abgeben',
    en: 'to hand in',
    praesens: 'gibt ab',
    praeteritum: 'gab ab',
    perfekt: 'hat abgegeben',
    example: {
      de: 'Die Unterlagen können Sie im Sekretariat abgeben.',
      en: 'You can hand in the documents at the office.'
    }
  },
  {
    id: 'b1.v.081',
    de: 'behaupten',
    en: 'to claim',
    praesens: 'behauptet',
    praeteritum: 'behauptete',
    perfekt: 'hat behauptet',
    example: {
      de: 'Er behauptet, den Fehler nicht gemacht zu haben.',
      en: 'He claims that he did not make the mistake.'
    }
  },
  {
    id: 'b1.v.082',
    de: 'empfehlen',
    en: 'to recommend',
    praesens: 'empfiehlt',
    praeteritum: 'empfahl',
    perfekt: 'hat empfohlen',
    example: {
      de: 'Können Sie mir ein gutes Restaurant in der Nähe empfehlen?',
      en: 'Can you recommend a good restaurant nearby?'
    }
  },
  {
    id: 'b1.v.083',
    de: 'überzeugen',
    en: 'to convince',
    praesens: 'überzeugt',
    praeteritum: 'überzeugte',
    perfekt: 'hat überzeugt',
    example: {
      de: 'Ihre Argumente haben mich am Ende überzeugt.',
      en: 'In the end her arguments convinced me.'
    }
  },
  {
    id: 'b1.v.084',
    de: 'sich ärgern',
    en: 'to be annoyed',
    praesens: 'ärgert sich',
    praeteritum: 'ärgerte sich',
    perfekt: 'hat sich geärgert',
    example: {
      de: 'Ich habe mich über die Verspätung sehr geärgert.',
      en: 'I was very annoyed about the delay.'
    }
  },
  {
    id: 'b1.v.085',
    de: 'befürchten',
    en: 'to fear',
    praesens: 'befürchtet',
    praeteritum: 'befürchtete',
    perfekt: 'hat befürchtet',
    example: {
      de: 'Ich befürchte, dass es morgen wieder regnet.',
      en: 'I fear that it will rain again tomorrow.'
    }
  },
  {
    id: 'b1.v.086',
    de: 'vermuten',
    en: 'to suspect, to assume',
    praesens: 'vermutet',
    praeteritum: 'vermutete',
    perfekt: 'hat vermutet',
    example: {
      de: 'Die Polizei vermutet, dass der Fahrer zu schnell war.',
      en: 'The police suspect that the driver was too fast.'
    }
  },
  {
    id: 'b1.v.087',
    de: 'versprechen',
    en: 'to promise',
    praesens: 'verspricht',
    praeteritum: 'versprach',
    perfekt: 'hat versprochen',
    example: {
      de: 'Er hat mir versprochen, diesmal pünktlich zu kommen.',
      en: 'He promised me to arrive on time this time.'
    }
  },
  {
    id: 'b1.v.088',
    de: 'enttäuschen',
    en: 'to disappoint',
    praesens: 'enttäuscht',
    praeteritum: 'enttäuschte',
    perfekt: 'hat enttäuscht',
    example: {
      de: 'Der neue Film hat viele Zuschauer enttäuscht.',
      en: 'The new film disappointed many viewers.'
    }
  },
  {
    id: 'b1.v.089',
    de: 'sich wundern',
    en: 'to be surprised',
    praesens: 'wundert sich',
    praeteritum: 'wunderte sich',
    perfekt: 'hat sich gewundert',
    example: {
      de: 'Ich wundere mich über die hohen Preise hier.',
      en: 'I am surprised at the high prices here.'
    }
  },
  {
    id: 'b1.v.090',
    de: 'sich entscheiden',
    en: 'to decide',
    praesens: 'entscheidet sich',
    praeteritum: 'entschied sich',
    perfekt: 'hat sich entschieden',
    example: {
      de: 'Sie hat sich für das Studium in Berlin entschieden.',
      en: 'She decided on studying in Berlin.'
    }
  },
  {
    id: 'b1.v.091',
    de: 'vorschlagen',
    en: 'to suggest',
    praesens: 'schlägt vor',
    praeteritum: 'schlug vor',
    perfekt: 'hat vorgeschlagen',
    example: {
      de: 'Ich schlage vor, dass wir eine kurze Pause machen.',
      en: 'I suggest that we take a short break.'
    }
  },
  {
    id: 'b1.v.092',
    de: 'erlauben',
    en: 'to allow',
    praesens: 'erlaubt',
    praeteritum: 'erlaubte',
    perfekt: 'hat erlaubt',
    example: {
      de: 'Meine Eltern erlauben mir, bis Mitternacht wegzubleiben.',
      en: 'My parents allow me to stay out until midnight.'
    }
  },
  {
    id: 'b1.v.093',
    de: 'verbieten',
    en: 'to forbid',
    praesens: 'verbietet',
    praeteritum: 'verbot',
    perfekt: 'hat verboten',
    example: {
      de: 'Der Vermieter hat das Grillen auf dem Balkon verboten.',
      en: 'The landlord has forbidden barbecuing on the balcony.'
    }
  },
  {
    id: 'b1.v.094',
    de: 'gelingen',
    en: 'to succeed, to turn out well',
    praesens: 'gelingt',
    praeteritum: 'gelang',
    perfekt: 'ist gelungen',
    example: {
      de: 'Der Kuchen ist dir dieses Mal wirklich gut gelungen.',
      en: 'Your cake really turned out well this time.'
    }
  },
  {
    id: 'b1.v.095',
    de: 'steigen',
    en: 'to rise, to climb',
    praesens: 'steigt',
    praeteritum: 'stieg',
    perfekt: 'ist gestiegen',
    example: {
      de: 'Die Mieten in der Stadt steigen jedes Jahr.',
      en: 'Rents in the city are rising every year.'
    }
  },
  {
    id: 'b1.v.096',
    de: 'sinken',
    en: 'to sink, to fall',
    praesens: 'sinkt',
    praeteritum: 'sank',
    perfekt: 'ist gesunken',
    example: {
      de: 'Die Temperaturen sinken in der Nacht unter null Grad.',
      en: 'At night the temperatures fall below zero degrees.'
    }
  },
  {
    id: 'b1.v.097',
    de: 'wachsen',
    en: 'to grow',
    praesens: 'wächst',
    praeteritum: 'wuchs',
    perfekt: 'ist gewachsen',
    example: {
      de: 'Unsere Stadt wächst seit einigen Jahren sehr schnell.',
      en: 'Our city has been growing very fast for some years.'
    }
  },
  {
    id: 'b1.v.098',
    de: 'vermeiden',
    en: 'to avoid',
    praesens: 'vermeidet',
    praeteritum: 'vermied',
    perfekt: 'hat vermieden',
    example: {
      de: 'Man sollte unnötigen Stress im Alltag möglichst vermeiden.',
      en: 'You should avoid unnecessary stress in everyday life as much as possible.'
    }
  },
  {
    id: 'b1.v.099',
    de: 'erreichen',
    en: 'to reach, to achieve',
    praesens: 'erreicht',
    praeteritum: 'erreichte',
    perfekt: 'hat erreicht',
    example: {
      de: 'Sie können mich tagsüber unter dieser Nummer erreichen.',
      en: 'You can reach me at this number during the day.'
    }
  },
  {
    id: 'b1.v.100',
    de: 'sich beeilen',
    en: 'to hurry',
    praesens: 'beeilt sich',
    praeteritum: 'beeilte sich',
    perfekt: 'hat sich beeilt',
    example: {
      de: 'Wir müssen uns beeilen, der Film beginnt gleich.',
      en: 'We have to hurry, the film starts soon.'
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
  },
  {
    id: 'b1.n.003',
    de: 'Gehalt',
    en: 'salary',
    article: 'das',
    plural: 'die Gehälter',
    example: {
      de: 'Das Gehalt wird am Ende des Monats überwiesen.',
      en: 'The salary is transferred at the end of the month.'
    }
  },
  {
    id: 'b1.n.004',
    de: 'Lebenslauf',
    en: 'CV, curriculum vitae',
    article: 'der',
    plural: 'die Lebensläufe',
    example: {
      de: 'Bitte schicken Sie uns Ihren Lebenslauf mit Foto.',
      en: 'Please send us your CV with a photo.'
    }
  },
  {
    id: 'b1.n.005',
    de: 'Kollege',
    en: 'colleague',
    article: 'der',
    plural: 'die Kollegen',
    example: {
      de: 'Mein neuer Kollege kommt aus Spanien und spricht vier Sprachen.',
      en: 'My new colleague comes from Spain and speaks four languages.'
    }
  },
  {
    id: 'b1.n.006',
    de: 'Arbeitgeber',
    en: 'employer',
    article: 'der',
    plural: 'die Arbeitgeber',
    example: {
      de: 'Mein Arbeitgeber bezahlt die Fahrtkosten zur Arbeit.',
      en: 'My employer pays my travel costs to work.'
    }
  },
  {
    id: 'b1.n.007',
    de: 'Besprechung',
    en: 'meeting',
    article: 'die',
    plural: 'die Besprechungen',
    example: {
      de: 'Die Besprechung dauert heute länger als geplant.',
      en: 'The meeting is lasting longer than planned today.'
    }
  },
  {
    id: 'b1.n.008',
    de: 'Erfahrung',
    en: 'experience',
    article: 'die',
    plural: 'die Erfahrungen',
    example: {
      de: 'Für diese Stelle braucht man viel Erfahrung im Verkauf.',
      en: 'For this position you need a lot of sales experience.'
    }
  },
  {
    id: 'b1.n.009',
    de: 'Stelle',
    en: 'position, job',
    article: 'die',
    plural: 'die Stellen',
    example: {
      de: 'Die Stelle in der Werkstatt ist leider schon besetzt.',
      en: 'Unfortunately the position in the workshop is already filled.'
    }
  },
  {
    id: 'b1.n.010',
    de: 'Vertrag',
    en: 'contract',
    article: 'der',
    plural: 'die Verträge',
    example: {
      de: 'Lesen Sie den Vertrag genau, bevor Sie unterschreiben.',
      en: 'Read the contract carefully before you sign.'
    }
  },
  {
    id: 'b1.n.011',
    de: 'Miete',
    en: 'rent',
    article: 'die',
    plural: 'die Mieten',
    example: {
      de: 'Die Miete für die kleine Wohnung ist ziemlich hoch.',
      en: 'The rent for the small flat is quite high.'
    }
  },
  {
    id: 'b1.n.012',
    de: 'Vermieter',
    en: 'landlord',
    article: 'der',
    plural: 'die Vermieter',
    example: {
      de: 'Unser Vermieter repariert die Heizung leider nie sofort.',
      en: 'Unfortunately our landlord never repairs the heating right away.'
    }
  },
  {
    id: 'b1.n.013',
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
    id: 'b1.n.014',
    de: 'Umzug',
    en: 'move, relocation',
    article: 'der',
    plural: 'die Umzüge',
    example: {
      de: 'Beim Umzug haben uns viele Freunde geholfen.',
      en: 'Many friends helped us with the move.'
    }
  },
  {
    id: 'b1.n.015',
    de: 'Heizung',
    en: 'heating',
    article: 'die',
    plural: 'die Heizungen',
    example: {
      de: 'Im Herbst funktionierte die Heizung plötzlich nicht mehr.',
      en: 'In autumn the heating suddenly stopped working.'
    }
  },
  {
    id: 'b1.n.016',
    de: 'Aufzug',
    en: 'lift, elevator',
    article: 'der',
    plural: 'die Aufzüge',
    example: {
      de: 'Der Aufzug ist kaputt, wir müssen die Treppe nehmen.',
      en: 'The lift is broken, we have to take the stairs.'
    }
  },
  {
    id: 'b1.n.017',
    de: 'Umgebung',
    en: 'surroundings, area',
    article: 'die',
    plural: 'die Umgebungen',
    example: {
      de: 'Wir suchen eine Wohnung in einer ruhigen Umgebung.',
      en: 'We are looking for a flat in a quiet area.'
    }
  },
  {
    id: 'b1.n.018',
    de: 'Stockwerk',
    en: 'floor, storey',
    article: 'das',
    plural: 'die Stockwerke',
    example: {
      de: 'Das Büro liegt im dritten Stockwerk des Gebäudes.',
      en: 'The office is on the third floor of the building.'
    }
  },
  {
    id: 'b1.n.019',
    de: 'Untersuchung',
    en: 'examination, check-up',
    article: 'die',
    plural: 'die Untersuchungen',
    example: {
      de: 'Die Untersuchung beim Arzt dauerte nur zwanzig Minuten.',
      en: 'The examination at the doctor took only twenty minutes.'
    }
  },
  {
    id: 'b1.n.020',
    de: 'Rezept',
    en: 'prescription',
    article: 'das',
    plural: 'die Rezepte',
    example: {
      de: 'Dieses Medikament bekommen Sie nur mit Rezept.',
      en: 'You can only get this medication with a prescription.'
    }
  },
  {
    id: 'b1.n.021',
    de: 'Schmerz',
    en: 'pain',
    article: 'der',
    plural: 'die Schmerzen',
    example: {
      de: 'Der Schmerz im Rücken wurde immer stärker.',
      en: 'The pain in my back got stronger and stronger.'
    }
  },
  {
    id: 'b1.n.022',
    de: 'Krankenkasse',
    en: 'health insurance (fund)',
    article: 'die',
    plural: 'die Krankenkassen',
    example: {
      de: 'Die Krankenkasse bezahlt diese Behandlung leider nicht.',
      en: 'Unfortunately the health insurance does not pay for this treatment.'
    }
  },
  {
    id: 'b1.n.023',
    de: 'Verletzung',
    en: 'injury',
    article: 'die',
    plural: 'die Verletzungen',
    example: {
      de: 'Wegen einer Verletzung am Fuß konnte er nicht mitspielen.',
      en: 'Because of a foot injury he could not play.'
    }
  },
  {
    id: 'b1.n.024',
    de: 'Ernährung',
    en: 'diet, nutrition',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Eine gesunde Ernährung ist wichtig für den Körper.',
      en: 'A healthy diet is important for the body.'
    }
  },
  {
    id: 'b1.n.025',
    de: 'Sprechstunde',
    en: 'consultation hours',
    article: 'die',
    plural: 'die Sprechstunden',
    example: {
      de: 'Die Sprechstunde beginnt am Montag um neun Uhr.',
      en: 'Consultation hours begin at nine on Monday.'
    }
  },
  {
    id: 'b1.n.026',
    de: 'Medikament',
    en: 'medication',
    article: 'das',
    plural: 'die Medikamente',
    example: {
      de: 'Nehmen Sie das Medikament dreimal täglich nach dem Essen.',
      en: 'Take the medication three times a day after meals.'
    }
  },
  {
    id: 'b1.n.027',
    de: 'Verspätung',
    en: 'delay',
    article: 'die',
    plural: 'die Verspätungen',
    example: {
      de: 'Der Zug hat heute zwanzig Minuten Verspätung.',
      en: 'The train is twenty minutes late today.'
    }
  },
  {
    id: 'b1.n.028',
    de: 'Anschluss',
    en: 'connection (transport)',
    article: 'der',
    plural: 'die Anschlüsse',
    example: {
      de: 'Wegen der Verspätung haben wir den Anschluss verpasst.',
      en: 'Because of the delay we missed our connection.'
    }
  },
  {
    id: 'b1.n.029',
    de: 'Gepäck',
    en: 'luggage',
    article: 'das',
    plural: '– (nur Singular)',
    example: {
      de: 'Sie können Ihr Gepäck an der Rezeption lassen.',
      en: 'You can leave your luggage at reception.'
    }
  },
  {
    id: 'b1.n.030',
    de: 'Unterkunft',
    en: 'accommodation',
    article: 'die',
    plural: 'die Unterkünfte',
    example: {
      de: 'Wir suchen noch eine günstige Unterkunft für zwei Nächte.',
      en: 'We are still looking for cheap accommodation for two nights.'
    }
  },
  {
    id: 'b1.n.031',
    de: 'Ausflug',
    en: 'excursion, day trip',
    article: 'der',
    plural: 'die Ausflüge',
    example: {
      de: 'Am Wochenende machen wir einen Ausflug an den See.',
      en: 'At the weekend we are going on a trip to the lake.'
    }
  },
  {
    id: 'b1.n.032',
    de: 'Ermäßigung',
    en: 'discount, reduction',
    article: 'die',
    plural: 'die Ermäßigungen',
    example: {
      de: 'Studenten bekommen an der Kasse eine Ermäßigung.',
      en: 'Students get a discount at the ticket desk.'
    }
  },
  {
    id: 'b1.n.033',
    de: 'Fahrplan',
    en: 'timetable',
    article: 'der',
    plural: 'die Fahrpläne',
    example: {
      de: 'Der neue Fahrplan gilt ab dem ersten Dezember.',
      en: 'The new timetable is valid from the first of December.'
    }
  },
  {
    id: 'b1.n.034',
    de: 'Sehenswürdigkeit',
    en: 'sight, tourist attraction',
    article: 'die',
    plural: 'die Sehenswürdigkeiten',
    example: {
      de: 'Der Dom ist die bekannteste Sehenswürdigkeit der Stadt.',
      en: 'The cathedral is the most famous sight in the city.'
    }
  },
  {
    id: 'b1.n.035',
    de: 'Grenze',
    en: 'border',
    article: 'die',
    plural: 'die Grenzen',
    example: {
      de: 'An der Grenze mussten wir unsere Pässe zeigen.',
      en: 'At the border we had to show our passports.'
    }
  },
  {
    id: 'b1.n.036',
    de: 'Stau',
    en: 'traffic jam',
    article: 'der',
    plural: 'die Staus',
    example: {
      de: 'Wegen eines Staus kamen wir zwei Stunden später an.',
      en: 'Because of a traffic jam we arrived two hours later.'
    }
  },
  {
    id: 'b1.n.037',
    de: 'Angebot',
    en: 'offer, special offer',
    article: 'das',
    plural: 'die Angebote',
    example: {
      de: 'Diese Woche gibt es im Supermarkt viele Angebote.',
      en: 'This week there are many special offers at the supermarket.'
    }
  },
  {
    id: 'b1.n.038',
    de: 'Quittung',
    en: 'receipt',
    article: 'die',
    plural: 'die Quittungen',
    example: {
      de: 'Heben Sie die Quittung für einen möglichen Umtausch auf.',
      en: 'Keep the receipt in case of a possible exchange.'
    }
  },
  {
    id: 'b1.n.039',
    de: 'Rabatt',
    en: 'discount',
    article: 'der',
    plural: 'die Rabatte',
    example: {
      de: 'Beim Kauf von zwei Paar Schuhen gibt es Rabatt.',
      en: 'You get a discount when buying two pairs of shoes.'
    }
  },
  {
    id: 'b1.n.040',
    de: 'Werbung',
    en: 'advertising',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Im Fernsehen kommt heutzutage sehr viel Werbung.',
      en: 'There is a lot of advertising on television these days.'
    }
  },
  {
    id: 'b1.n.041',
    de: 'Kunde',
    en: 'customer',
    article: 'der',
    plural: 'die Kunden',
    example: {
      de: 'Der Kunde hat immer recht, sagt mein Chef.',
      en: 'The customer is always right, my boss says.'
    }
  },
  {
    id: 'b1.n.042',
    de: 'Ware',
    en: 'goods, merchandise',
    article: 'die',
    plural: 'die Waren',
    example: {
      de: 'Die bestellte Ware kam schon nach zwei Tagen an.',
      en: 'The ordered goods arrived after just two days.'
    }
  },
  {
    id: 'b1.n.043',
    de: 'Lieferung',
    en: 'delivery',
    article: 'die',
    plural: 'die Lieferungen',
    example: {
      de: 'Die Lieferung verspätet sich leider um eine Woche.',
      en: 'Unfortunately the delivery is delayed by a week.'
    }
  },
  {
    id: 'b1.n.044',
    de: 'Rechnung',
    en: 'bill, invoice',
    article: 'die',
    plural: 'die Rechnungen',
    example: {
      de: 'Bitte bezahlen Sie die Rechnung innerhalb von vierzehn Tagen.',
      en: 'Please pay the invoice within fourteen days.'
    }
  },
  {
    id: 'b1.n.045',
    de: 'Nachricht',
    en: 'message, news item',
    article: 'die',
    plural: 'die Nachrichten',
    example: {
      de: 'Ich habe dir gestern Abend eine Nachricht geschickt.',
      en: 'I sent you a message yesterday evening.'
    }
  },
  {
    id: 'b1.n.046',
    de: 'Sendung',
    en: 'programme, broadcast',
    article: 'die',
    plural: 'die Sendungen',
    example: {
      de: 'Diese Sendung läuft jeden Abend um acht Uhr.',
      en: 'This programme is on every evening at eight.'
    }
  },
  {
    id: 'b1.n.047',
    de: 'Bildschirm',
    en: 'screen, monitor',
    article: 'der',
    plural: 'die Bildschirme',
    example: {
      de: 'Der Bildschirm meines Laptops ist plötzlich schwarz geworden.',
      en: 'The screen of my laptop suddenly went black.'
    }
  },
  {
    id: 'b1.n.048',
    de: 'Verbindung',
    en: 'connection (network)',
    article: 'die',
    plural: 'die Verbindungen',
    example: {
      de: 'Die Verbindung ist hier auf dem Land oft schlecht.',
      en: 'The connection is often poor here in the countryside.'
    }
  },
  {
    id: 'b1.n.049',
    de: 'Passwort',
    en: 'password',
    article: 'das',
    plural: 'die Passwörter',
    example: {
      de: 'Ich habe mein Passwort schon wieder vergessen.',
      en: 'I have forgotten my password yet again.'
    }
  },
  {
    id: 'b1.n.050',
    de: 'Anhang',
    en: 'attachment',
    article: 'der',
    plural: 'die Anhänge',
    example: {
      de: 'Meinen Lebenslauf schicke ich Ihnen im Anhang mit.',
      en: 'I am sending you my CV in the attachment.'
    }
  },
  {
    id: 'b1.n.051',
    de: 'Datei',
    en: 'file (computer)',
    article: 'die',
    plural: 'die Dateien',
    example: {
      de: 'Die Datei ist zu groß für eine E-Mail.',
      en: 'The file is too big for an email.'
    }
  },
  {
    id: 'b1.n.052',
    de: 'Umwelt',
    en: 'environment',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Jeder von uns kann etwas für die Umwelt tun.',
      en: 'Each of us can do something for the environment.'
    }
  },
  {
    id: 'b1.n.053',
    de: 'Müll',
    en: 'rubbish, garbage',
    article: 'der',
    plural: '– (nur Singular)',
    example: {
      de: 'Bring bitte den Müll nach unten, wenn du gehst.',
      en: 'Please take the rubbish down when you leave.'
    }
  },
  {
    id: 'b1.n.054',
    de: 'Verschmutzung',
    en: 'pollution',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Die Verschmutzung der Meere ist ein großes Problem.',
      en: 'The pollution of the oceans is a big problem.'
    }
  },
  {
    id: 'b1.n.055',
    de: 'Klima',
    en: 'climate',
    article: 'das',
    plural: '– (nur Singular)',
    example: {
      de: 'Das Klima hat sich in den letzten Jahren stark verändert.',
      en: 'The climate has changed a lot in recent years.'
    }
  },
  {
    id: 'b1.n.056',
    de: 'Abfall',
    en: 'waste',
    article: 'der',
    plural: 'die Abfälle',
    example: {
      de: 'Nach dem Festival lag überall Abfall auf dem Boden.',
      en: 'After the festival there was waste lying everywhere on the ground.'
    }
  },
  {
    id: 'b1.n.057',
    de: 'Energie',
    en: 'energy',
    article: 'die',
    plural: 'die Energien',
    example: {
      de: 'Moderne Häuser verbrauchen viel weniger Energie.',
      en: 'Modern houses use much less energy.'
    }
  },
  {
    id: 'b1.n.058',
    de: 'Gewitter',
    en: 'thunderstorm',
    article: 'das',
    plural: 'die Gewitter',
    example: {
      de: 'Bei einem Gewitter sollte man nicht unter Bäumen stehen.',
      en: 'During a thunderstorm you should not stand under trees.'
    }
  },
  {
    id: 'b1.n.059',
    de: 'Überschwemmung',
    en: 'flood',
    article: 'die',
    plural: 'die Überschwemmungen',
    example: {
      de: 'Nach dem starken Regen gab es mehrere Überschwemmungen.',
      en: 'After the heavy rain there were several floods.'
    }
  },
  {
    id: 'b1.n.060',
    de: 'Prüfung',
    en: 'exam',
    article: 'die',
    plural: 'die Prüfungen',
    example: {
      de: 'Sie bereitet sich seit Wochen auf die Prüfung vor.',
      en: 'She has been preparing for the exam for weeks.'
    }
  },
  {
    id: 'b1.n.061',
    de: 'Zeugnis',
    en: 'certificate, school report',
    article: 'das',
    plural: 'die Zeugnisse',
    example: {
      de: 'Mit diesem Zeugnis findest du sicher schnell eine Stelle.',
      en: 'With this certificate you will surely find a job quickly.'
    }
  },
  {
    id: 'b1.n.062',
    de: 'Ausbildung',
    en: 'apprenticeship, training',
    article: 'die',
    plural: 'die Ausbildungen',
    example: {
      de: 'Er macht eine Ausbildung zum Elektriker bei einer kleinen Firma.',
      en: 'He is doing an apprenticeship as an electrician at a small company.'
    }
  },
  {
    id: 'b1.n.063',
    de: 'Unterricht',
    en: 'lessons, class',
    article: 'der',
    plural: '– (nur Singular)',
    example: {
      de: 'Der Unterricht fällt heute wegen Krankheit aus.',
      en: 'Class is cancelled today due to illness.'
    }
  },
  {
    id: 'b1.n.064',
    de: 'Note',
    en: 'grade, mark',
    article: 'die',
    plural: 'die Noten',
    example: {
      de: 'Sie hat in der Prüfung eine sehr gute Note bekommen.',
      en: 'She got a very good grade in the exam.'
    }
  },
  {
    id: 'b1.n.065',
    de: 'Studium',
    en: 'studies (at university)',
    article: 'das',
    plural: 'die Studien',
    example: {
      de: 'Nach dem Studium möchte er im Ausland arbeiten.',
      en: 'After his studies he would like to work abroad.'
    }
  },
  {
    id: 'b1.n.066',
    de: 'Voraussetzung',
    en: 'requirement, prerequisite',
    article: 'die',
    plural: 'die Voraussetzungen',
    example: {
      de: 'Gute Deutschkenntnisse sind eine Voraussetzung für diese Stelle.',
      en: 'A good knowledge of German is a requirement for this position.'
    }
  },
  {
    id: 'b1.n.067',
    de: 'Praktikum',
    en: 'internship',
    article: 'das',
    plural: 'die Praktika',
    example: {
      de: 'Im Sommer macht sie ein Praktikum bei einer Zeitung.',
      en: 'In summer she is doing an internship at a newspaper.'
    }
  },
  {
    id: 'b1.n.068',
    de: 'Ehe',
    en: 'marriage',
    article: 'die',
    plural: 'die Ehen',
    example: {
      de: 'Ihre Ehe hält schon seit dreißig Jahren.',
      en: 'Their marriage has lasted for thirty years.'
    }
  },
  {
    id: 'b1.n.069',
    de: 'Hochzeit',
    en: 'wedding',
    article: 'die',
    plural: 'die Hochzeiten',
    example: {
      de: 'Zur Hochzeit haben sie über hundert Gäste eingeladen.',
      en: 'They invited over a hundred guests to the wedding.'
    }
  },
  {
    id: 'b1.n.070',
    de: 'Erziehung',
    en: 'upbringing, education',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Bei der Erziehung der Kinder helfen auch die Großeltern.',
      en: 'The grandparents also help with raising the children.'
    }
  },
  {
    id: 'b1.n.071',
    de: 'Verhältnis',
    en: 'relationship, relation',
    article: 'das',
    plural: 'die Verhältnisse',
    example: {
      de: 'Ich habe ein gutes Verhältnis zu meinen Eltern.',
      en: 'I have a good relationship with my parents.'
    }
  },
  {
    id: 'b1.n.072',
    de: 'Beziehung',
    en: 'relationship',
    article: 'die',
    plural: 'die Beziehungen',
    example: {
      de: 'Eine gute Beziehung braucht vor allem Vertrauen.',
      en: 'A good relationship needs trust above all.'
    }
  },
  {
    id: 'b1.n.073',
    de: 'Geburt',
    en: 'birth',
    article: 'die',
    plural: 'die Geburten',
    example: {
      de: 'Nach der Geburt des Babys blieb sie ein Jahr zu Hause.',
      en: 'After the birth of the baby she stayed home for a year.'
    }
  },
  {
    id: 'b1.n.074',
    de: 'Jugend',
    en: 'youth',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'In seiner Jugend hat er viel Fußball gespielt.',
      en: 'In his youth he played a lot of football.'
    }
  },
  {
    id: 'b1.n.075',
    de: 'Veranstaltung',
    en: 'event',
    article: 'die',
    plural: 'die Veranstaltungen',
    example: {
      de: 'Die Veranstaltung im Park ist für Familien kostenlos.',
      en: 'The event in the park is free for families.'
    }
  },
  {
    id: 'b1.n.076',
    de: 'Verein',
    en: 'club, association',
    article: 'der',
    plural: 'die Vereine',
    example: {
      de: 'Mein Sohn spielt seit drei Jahren in einem Fußballverein.',
      en: 'My son has been playing in a football club for three years.'
    }
  },
  {
    id: 'b1.n.077',
    de: 'Ausstellung',
    en: 'exhibition',
    article: 'die',
    plural: 'die Ausstellungen',
    example: {
      de: 'Die Ausstellung über moderne Kunst läuft noch bis Oktober.',
      en: 'The exhibition on modern art runs until October.'
    }
  },
  {
    id: 'b1.n.078',
    de: 'Mitglied',
    en: 'member',
    article: 'das',
    plural: 'die Mitglieder',
    example: {
      de: 'Als Mitglied zahlen Sie nur die Hälfte des Preises.',
      en: 'As a member you pay only half the price.'
    }
  },
  {
    id: 'b1.n.079',
    de: 'Eintrittskarte',
    en: 'entrance ticket',
    article: 'die',
    plural: 'die Eintrittskarten',
    example: {
      de: 'Die Eintrittskarten für das Konzert sind schon ausverkauft.',
      en: 'The tickets for the concert are already sold out.'
    }
  },
  {
    id: 'b1.n.080',
    de: 'Formular',
    en: 'form',
    article: 'das',
    plural: 'die Formulare',
    example: {
      de: 'Das Formular bekommen Sie am Schalter drei.',
      en: 'You can get the form at counter three.'
    }
  },
  {
    id: 'b1.n.081',
    de: 'Ausweis',
    en: 'identity card',
    article: 'der',
    plural: 'die Ausweise',
    example: {
      de: 'Für die Anmeldung brauchen Sie einen gültigen Ausweis.',
      en: 'For registration you need a valid identity card.'
    }
  },
  {
    id: 'b1.n.082',
    de: 'Anmeldung',
    en: 'registration',
    article: 'die',
    plural: 'die Anmeldungen',
    example: {
      de: 'Die Anmeldung für den Kurs ist bis Freitag möglich.',
      en: 'Registration for the course is possible until Friday.'
    }
  },
  {
    id: 'b1.n.083',
    de: 'Genehmigung',
    en: 'permit, approval',
    article: 'die',
    plural: 'die Genehmigungen',
    example: {
      de: 'Für den Umbau brauchen Sie eine Genehmigung der Stadt.',
      en: 'For the renovation you need a permit from the city.'
    }
  },
  {
    id: 'b1.n.084',
    de: 'Gebühr',
    en: 'fee',
    article: 'die',
    plural: 'die Gebühren',
    example: {
      de: 'Für den neuen Pass zahlen Sie eine Gebühr von sechzig Euro.',
      en: 'You pay a fee of sixty euros for the new passport.'
    }
  },
  {
    id: 'b1.n.085',
    de: 'Frist',
    en: 'deadline',
    article: 'die',
    plural: 'die Fristen',
    example: {
      de: 'Die Frist für die Anmeldung endet am Freitag.',
      en: 'The deadline for registration ends on Friday.'
    }
  },
  {
    id: 'b1.n.086',
    de: 'Staatsangehörigkeit',
    en: 'nationality, citizenship',
    article: 'die',
    plural: 'die Staatsangehörigkeiten',
    example: {
      de: 'Bitte geben Sie im Formular Ihre Staatsangehörigkeit an.',
      en: 'Please state your nationality on the form.'
    }
  },
  {
    id: 'b1.n.087',
    de: 'Amt',
    en: 'office, authority',
    article: 'das',
    plural: 'die Ämter',
    example: {
      de: 'Das Amt hat nur vormittags für Besucher geöffnet.',
      en: 'The office is only open to visitors in the morning.'
    }
  },
  {
    id: 'b1.n.088',
    de: 'Unterschrift',
    en: 'signature',
    article: 'die',
    plural: 'die Unterschriften',
    example: {
      de: 'Ohne Ihre Unterschrift ist der Antrag nicht gültig.',
      en: 'Without your signature the application is not valid.'
    }
  },
  {
    id: 'b1.n.089',
    de: 'Behörde',
    en: 'authority, public office',
    article: 'die',
    plural: 'die Behörden',
    example: {
      de: 'Die Behörde bearbeitet den Antrag innerhalb von vier Wochen.',
      en: 'The authority processes the application within four weeks.'
    }
  },
  {
    id: 'b1.n.090',
    de: 'Meinung',
    en: 'opinion',
    article: 'die',
    plural: 'die Meinungen',
    example: {
      de: 'Meiner Meinung nach ist der Film sehr sehenswert.',
      en: 'In my opinion the film is well worth seeing.'
    }
  },
  {
    id: 'b1.n.091',
    de: 'Gefühl',
    en: 'feeling',
    article: 'das',
    plural: 'die Gefühle',
    example: {
      de: 'Ich habe ein gutes Gefühl bei dieser Entscheidung.',
      en: 'I have a good feeling about this decision.'
    }
  },
  {
    id: 'b1.n.092',
    de: 'Angst',
    en: 'fear',
    article: 'die',
    plural: 'die Ängste',
    example: {
      de: 'Viele Menschen haben Angst vor großen Spinnen.',
      en: 'Many people are afraid of big spiders.'
    }
  },
  {
    id: 'b1.n.093',
    de: 'Hoffnung',
    en: 'hope',
    article: 'die',
    plural: 'die Hoffnungen',
    example: {
      de: 'Die Hoffnung auf besseres Wetter haben wir aufgegeben.',
      en: 'We have given up hope of better weather.'
    }
  },
  {
    id: 'b1.n.094',
    de: 'Vorteil',
    en: 'advantage',
    article: 'der',
    plural: 'die Vorteile',
    example: {
      de: 'Ein großer Vorteil dieser Wohnung ist der Balkon.',
      en: 'A big advantage of this flat is the balcony.'
    }
  },
  {
    id: 'b1.n.095',
    de: 'Nachteil',
    en: 'disadvantage',
    article: 'der',
    plural: 'die Nachteile',
    example: {
      de: 'Der einzige Nachteil ist die laute Straße vor dem Haus.',
      en: 'The only disadvantage is the noisy street in front of the house.'
    }
  },
  {
    id: 'b1.n.096',
    de: 'Eindruck',
    en: 'impression',
    article: 'der',
    plural: 'die Eindrücke',
    example: {
      de: 'Der neue Kollege hat einen sehr guten Eindruck gemacht.',
      en: 'The new colleague made a very good impression.'
    }
  },
  {
    id: 'b1.n.097',
    de: 'Sorge',
    en: 'worry, concern',
    article: 'die',
    plural: 'die Sorgen',
    example: {
      de: 'Mach dir keine Sorgen, alles wird gut.',
      en: 'Do not worry, everything will be fine.'
    }
  },
  {
    id: 'b1.n.098',
    de: 'Entscheidung',
    en: 'decision',
    article: 'die',
    plural: 'die Entscheidungen',
    example: {
      de: 'Die Entscheidung für den Umzug war nicht leicht.',
      en: 'The decision to move was not easy.'
    }
  },
  {
    id: 'b1.n.099',
    de: 'Unterschied',
    en: 'difference',
    article: 'der',
    plural: 'die Unterschiede',
    example: {
      de: 'Der Unterschied zwischen den beiden Angeboten ist klein.',
      en: 'The difference between the two offers is small.'
    }
  },
  {
    id: 'b1.n.100',
    de: 'Zukunft',
    en: 'future',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'In Zukunft möchte ich weniger mit dem Auto fahren.',
      en: 'In future I want to drive less.'
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
  },
  {
    id: 'b1.a.003',
    de: 'flexibel',
    en: 'flexible',
    komparativ: 'flexibler',
    superlativ: 'am flexibelsten',
    example: {
      de: 'Meine Arbeitszeiten sind zum Glück ziemlich flexibel.',
      en: 'Luckily my working hours are quite flexible.'
    }
  },
  {
    id: 'b1.a.004',
    de: 'erfolgreich',
    en: 'successful',
    komparativ: 'erfolgreicher',
    superlativ: 'am erfolgreichsten',
    example: {
      de: 'Das Projekt war am Ende sehr erfolgreich.',
      en: 'In the end the project was very successful.'
    }
  },
  {
    id: 'b1.a.005',
    de: 'selbstständig',
    en: 'independent, self-employed',
    komparativ: 'selbstständiger',
    superlativ: 'am selbstständigsten',
    example: {
      de: 'Sie arbeitet seit fünf Jahren selbstständig als Übersetzerin.',
      en: 'She has been working freelance as a translator for five years.'
    }
  },
  {
    id: 'b1.a.006',
    de: 'anstrengend',
    en: 'strenuous, demanding',
    komparativ: 'anstrengender',
    superlativ: 'am anstrengendsten',
    example: {
      de: 'Die Arbeit auf der Baustelle ist körperlich sehr anstrengend.',
      en: 'The work on the building site is physically very demanding.'
    }
  },
  {
    id: 'b1.a.007',
    de: 'verantwortungsvoll',
    en: 'responsible (task, person)',
    komparativ: 'verantwortungsvoller',
    superlativ: 'am verantwortungsvollsten',
    example: {
      de: 'Als Krankenpfleger hat er eine sehr verantwortungsvolle Aufgabe.',
      en: 'As a nurse he has a very responsible job.'
    }
  },
  {
    id: 'b1.a.008',
    de: 'fleißig',
    en: 'hard-working, diligent',
    komparativ: 'fleißiger',
    superlativ: 'am fleißigsten',
    example: {
      de: 'Unsere Auszubildende ist fleißig und lernt schnell.',
      en: 'Our trainee is hard-working and learns quickly.'
    }
  },
  {
    id: 'b1.a.009',
    de: 'ehrgeizig',
    en: 'ambitious',
    komparativ: 'ehrgeiziger',
    superlativ: 'am ehrgeizigsten',
    example: {
      de: 'Er ist so ehrgeizig, dass er sogar am Wochenende arbeitet.',
      en: 'He is so ambitious that he even works at weekends.'
    }
  },
  {
    id: 'b1.a.010',
    de: 'geeignet',
    en: 'suitable',
    komparativ: 'geeigneter',
    superlativ: 'am geeignetsten',
    example: {
      de: 'Diese Stelle ist auch für Anfänger gut geeignet.',
      en: 'This position is also well suited for beginners.'
    }
  },
  {
    id: 'b1.a.011',
    de: 'berufstätig',
    en: 'employed, working',
    example: {
      de: 'Beide Eltern sind berufstätig, die Kinder gehen in die Kita.',
      en: 'Both parents work, the children go to daycare.'
    }
  },
  {
    id: 'b1.a.012',
    de: 'arbeitslos',
    en: 'unemployed',
    example: {
      de: 'Nach der Schließung der Fabrik war er ein Jahr arbeitslos.',
      en: 'After the factory closed he was unemployed for a year.'
    }
  },
  {
    id: 'b1.a.013',
    de: 'gemütlich',
    en: 'cosy',
    komparativ: 'gemütlicher',
    superlativ: 'am gemütlichsten',
    example: {
      de: 'Mit den neuen Möbeln wirkt das Zimmer viel gemütlicher.',
      en: 'With the new furniture the room feels much cosier.'
    }
  },
  {
    id: 'b1.a.014',
    de: 'geräumig',
    en: 'spacious',
    komparativ: 'geräumiger',
    superlativ: 'am geräumigsten',
    example: {
      de: 'Die Küche ist geräumig und hat viel Licht.',
      en: 'The kitchen is spacious and gets a lot of light.'
    }
  },
  {
    id: 'b1.a.015',
    de: 'zentral',
    en: 'central',
    komparativ: 'zentraler',
    superlativ: 'am zentralsten',
    example: {
      de: 'Die Wohnung liegt sehr zentral, direkt am Marktplatz.',
      en: 'The flat is very central, right on the market square.'
    }
  },
  {
    id: 'b1.a.016',
    de: 'ordentlich',
    en: 'neat, tidy',
    komparativ: 'ordentlicher',
    superlativ: 'am ordentlichsten',
    example: {
      de: 'Sein Schreibtisch ist immer ordentlich und aufgeräumt.',
      en: 'His desk is always neat and tidy.'
    }
  },
  {
    id: 'b1.a.017',
    de: 'möbliert',
    en: 'furnished',
    example: {
      de: 'Wir suchen ein möbliertes Zimmer für sechs Monate.',
      en: 'We are looking for a furnished room for six months.'
    }
  },
  {
    id: 'b1.a.018',
    de: 'gesund',
    en: 'healthy',
    komparativ: 'gesünder',
    superlativ: 'am gesündesten',
    example: {
      de: 'Obst und Gemüse sind gesünder als Fast Food.',
      en: 'Fruit and vegetables are healthier than fast food.'
    }
  },
  {
    id: 'b1.a.019',
    de: 'ansteckend',
    en: 'contagious',
    komparativ: 'ansteckender',
    superlativ: 'am ansteckendsten',
    example: {
      de: 'Die Grippe ist in den ersten Tagen besonders ansteckend.',
      en: 'The flu is especially contagious in the first days.'
    }
  },
  {
    id: 'b1.a.020',
    de: 'fit',
    en: 'fit',
    komparativ: 'fitter',
    superlativ: 'am fittesten',
    example: {
      de: 'Durch das Schwimmen fühlt er sich wieder richtig fit.',
      en: 'Swimming makes him feel really fit again.'
    }
  },
  {
    id: 'b1.a.021',
    de: 'erschöpft',
    en: 'exhausted',
    komparativ: 'erschöpfter',
    superlativ: 'am erschöpftesten',
    example: {
      de: 'Nach der langen Schicht war sie völlig erschöpft.',
      en: 'After the long shift she was completely exhausted.'
    }
  },
  {
    id: 'b1.a.022',
    de: 'schmerzhaft',
    en: 'painful',
    komparativ: 'schmerzhafter',
    superlativ: 'am schmerzhaftesten',
    example: {
      de: 'Die Behandlung beim Zahnarzt war weniger schmerzhaft als gedacht.',
      en: 'The treatment at the dentist was less painful than expected.'
    }
  },
  {
    id: 'b1.a.023',
    de: 'pünktlich',
    en: 'punctual, on time',
    komparativ: 'pünktlicher',
    superlativ: 'am pünktlichsten',
    example: {
      de: 'Der Bus ist hier fast nie pünktlich.',
      en: 'The bus here is almost never on time.'
    }
  },
  {
    id: 'b1.a.024',
    de: 'bequem',
    en: 'comfortable',
    komparativ: 'bequemer',
    superlativ: 'am bequemsten',
    example: {
      de: 'Die Sitze im neuen Zug sind sehr bequem.',
      en: 'The seats in the new train are very comfortable.'
    }
  },
  {
    id: 'b1.a.025',
    de: 'entfernt',
    en: 'distant, away',
    komparativ: 'entfernter',
    superlativ: 'am entferntesten',
    example: {
      de: 'Das Hotel ist nur wenige Minuten vom Strand entfernt.',
      en: 'The hotel is only a few minutes from the beach.'
    }
  },
  {
    id: 'b1.a.026',
    de: 'sehenswert',
    en: 'worth seeing',
    komparativ: 'sehenswerter',
    superlativ: 'am sehenswertesten',
    example: {
      de: 'Die Altstadt von Lübeck ist wirklich sehenswert.',
      en: 'The old town of Lübeck is really worth seeing.'
    }
  },
  {
    id: 'b1.a.027',
    de: 'ausgebucht',
    en: 'fully booked',
    example: {
      de: 'Das Hotel ist über Ostern leider komplett ausgebucht.',
      en: 'Unfortunately the hotel is fully booked over Easter.'
    }
  },
  {
    id: 'b1.a.028',
    de: 'preiswert',
    en: 'inexpensive, good value',
    komparativ: 'preiswerter',
    superlativ: 'am preiswertesten',
    example: {
      de: 'In diesem Restaurant isst man gut und preiswert.',
      en: 'In this restaurant you eat well and inexpensively.'
    }
  },
  {
    id: 'b1.a.029',
    de: 'hochwertig',
    en: 'high-quality',
    komparativ: 'hochwertiger',
    superlativ: 'am hochwertigsten',
    example: {
      de: 'Die Jacke ist teuer, aber sehr hochwertig.',
      en: 'The jacket is expensive but very high quality.'
    }
  },
  {
    id: 'b1.a.030',
    de: 'haltbar',
    en: 'long-lasting, keepable',
    komparativ: 'haltbarer',
    superlativ: 'am haltbarsten',
    example: {
      de: 'Im Kühlschrank ist die Milch viel länger haltbar.',
      en: 'Milk keeps much longer in the fridge.'
    }
  },
  {
    id: 'b1.a.031',
    de: 'kaputt',
    en: 'broken',
    komparativ: 'kaputter',
    superlativ: 'am kaputtesten',
    example: {
      de: 'Mein Handy ist schon wieder kaputt gegangen.',
      en: 'My mobile phone has broken yet again.'
    }
  },
  {
    id: 'b1.a.032',
    de: 'erhältlich',
    en: 'available (for purchase)',
    example: {
      de: 'Das Ticket ist nur noch online erhältlich.',
      en: 'The ticket is now only available online.'
    }
  },
  {
    id: 'b1.a.033',
    de: 'aktuell',
    en: 'current, up to date',
    komparativ: 'aktueller',
    superlativ: 'am aktuellsten',
    example: {
      de: 'Die aktuellen Nachrichten finden Sie auf unserer Webseite.',
      en: 'You can find the latest news on our website.'
    }
  },
  {
    id: 'b1.a.034',
    de: 'übersichtlich',
    en: 'clear, well organised',
    komparativ: 'übersichtlicher',
    superlativ: 'am übersichtlichsten',
    example: {
      de: 'Die neue Webseite ist deutlich übersichtlicher als die alte.',
      en: 'The new website is much clearer than the old one.'
    }
  },
  {
    id: 'b1.a.035',
    de: 'kompliziert',
    en: 'complicated',
    komparativ: 'komplizierter',
    superlativ: 'am kompliziertesten',
    example: {
      de: 'Die Anleitung ist mir viel zu kompliziert.',
      en: 'The instructions are far too complicated for me.'
    }
  },
  {
    id: 'b1.a.036',
    de: 'digital',
    en: 'digital',
    example: {
      de: 'Die Rechnung bekommen Sie in digitaler Form per E-Mail.',
      en: 'You receive the invoice in digital form by email.'
    }
  },
  {
    id: 'b1.a.037',
    de: 'kabellos',
    en: 'wireless',
    example: {
      de: 'Ich höre Musik am liebsten mit kabellosen Kopfhörern.',
      en: 'I like listening to music best with wireless headphones.'
    }
  },
  {
    id: 'b1.a.038',
    de: 'umweltfreundlich',
    en: 'environmentally friendly',
    komparativ: 'umweltfreundlicher',
    superlativ: 'am umweltfreundlichsten',
    example: {
      de: 'Das Fahrrad ist das umweltfreundlichste Verkehrsmittel der Stadt.',
      en: 'The bicycle is the most environmentally friendly means of transport in the city.'
    }
  },
  {
    id: 'b1.a.039',
    de: 'schädlich',
    en: 'harmful',
    komparativ: 'schädlicher',
    superlativ: 'am schädlichsten',
    example: {
      de: 'Rauchen ist sehr schädlich für die Gesundheit.',
      en: 'Smoking is very harmful to your health.'
    }
  },
  {
    id: 'b1.a.040',
    de: 'nachhaltig',
    en: 'sustainable',
    komparativ: 'nachhaltiger',
    superlativ: 'am nachhaltigsten',
    example: {
      de: 'Immer mehr Firmen wollen nachhaltig produzieren.',
      en: 'More and more companies want to produce sustainably.'
    }
  },
  {
    id: 'b1.a.041',
    de: 'giftig',
    en: 'poisonous, toxic',
    komparativ: 'giftiger',
    superlativ: 'am giftigsten',
    example: {
      de: 'Einige Pilze im Wald sind sehr giftig.',
      en: 'Some mushrooms in the forest are very poisonous.'
    }
  },
  {
    id: 'b1.a.042',
    de: 'sparsam',
    en: 'economical, thrifty',
    komparativ: 'sparsamer',
    superlativ: 'am sparsamsten',
    example: {
      de: 'Der neue Motor ist sparsamer als der alte.',
      en: 'The new engine is more economical than the old one.'
    }
  },
  {
    id: 'b1.a.043',
    de: 'anspruchsvoll',
    en: 'demanding, sophisticated',
    komparativ: 'anspruchsvoller',
    superlativ: 'am anspruchsvollsten',
    example: {
      de: 'Der Kurs ist anspruchsvoll, aber man lernt sehr viel.',
      en: 'The course is demanding, but you learn a lot.'
    }
  },
  {
    id: 'b1.a.044',
    de: 'lehrreich',
    en: 'instructive, educational',
    komparativ: 'lehrreicher',
    superlativ: 'am lehrreichsten',
    example: {
      de: 'Der Besuch im Museum war für die Schüler sehr lehrreich.',
      en: 'The visit to the museum was very instructive for the pupils.'
    }
  },
  {
    id: 'b1.a.045',
    de: 'konzentriert',
    en: 'focused, concentrated',
    komparativ: 'konzentrierter',
    superlativ: 'am konzentriertesten',
    example: {
      de: 'In der Bibliothek kann ich konzentrierter arbeiten als zu Hause.',
      en: 'In the library I can work with more focus than at home.'
    }
  },
  {
    id: 'b1.a.046',
    de: 'begabt',
    en: 'gifted, talented',
    komparativ: 'begabter',
    superlativ: 'am begabtesten',
    example: {
      de: 'Ihre Tochter ist musikalisch sehr begabt.',
      en: 'Her daughter is very musically gifted.'
    }
  },
  {
    id: 'b1.a.047',
    de: 'streng',
    en: 'strict',
    komparativ: 'strenger',
    superlativ: 'am strengsten',
    example: {
      de: 'Unsere Lehrerin ist streng, aber gerecht.',
      en: 'Our teacher is strict but fair.'
    }
  },
  {
    id: 'b1.a.048',
    de: 'gerecht',
    en: 'fair, just',
    komparativ: 'gerechter',
    superlativ: 'am gerechtesten',
    example: {
      de: 'Ich finde die Note für meine Arbeit nicht gerecht.',
      en: 'I do not think the grade for my work is fair.'
    }
  },
  {
    id: 'b1.a.049',
    de: 'hilfsbereit',
    en: 'helpful',
    komparativ: 'hilfsbereiter',
    superlativ: 'am hilfsbereitesten',
    example: {
      de: 'Die Nachbarn in unserem Haus sind alle sehr hilfsbereit.',
      en: 'The neighbours in our building are all very helpful.'
    }
  },
  {
    id: 'b1.a.050',
    de: 'ehrlich',
    en: 'honest',
    komparativ: 'ehrlicher',
    superlativ: 'am ehrlichsten',
    example: {
      de: 'Sei ehrlich: Wie findest du meine neue Frisur?',
      en: 'Be honest: how do you like my new hairstyle?'
    }
  },
  {
    id: 'b1.a.051',
    de: 'geduldig',
    en: 'patient',
    komparativ: 'geduldiger',
    superlativ: 'am geduldigsten',
    example: {
      de: 'Mit kleinen Kindern muss man sehr geduldig sein.',
      en: 'You have to be very patient with small children.'
    }
  },
  {
    id: 'b1.a.052',
    de: 'eifersüchtig',
    en: 'jealous',
    komparativ: 'eifersüchtiger',
    superlativ: 'am eifersüchtigsten',
    example: {
      de: 'Er ist eifersüchtig, wenn seine Freundin mit anderen tanzt.',
      en: 'He gets jealous when his girlfriend dances with others.'
    }
  },
  {
    id: 'b1.a.053',
    de: 'großzügig',
    en: 'generous',
    komparativ: 'großzügiger',
    superlativ: 'am großzügigsten',
    example: {
      de: 'Meine Großmutter war immer sehr großzügig zu uns.',
      en: 'My grandmother was always very generous to us.'
    }
  },
  {
    id: 'b1.a.054',
    de: 'höflich',
    en: 'polite',
    komparativ: 'höflicher',
    superlativ: 'am höflichsten',
    example: {
      de: 'Der Verkäufer war höflich und hat uns gut beraten.',
      en: 'The salesman was polite and gave us good advice.'
    }
  },
  {
    id: 'b1.a.055',
    de: 'treu',
    en: 'loyal, faithful',
    komparativ: 'treuer',
    superlativ: 'am treuesten',
    example: {
      de: 'Ein Hund ist ein treuer Freund des Menschen.',
      en: 'A dog is a loyal friend to humans.'
    }
  },
  {
    id: 'b1.a.056',
    de: 'verheiratet',
    en: 'married',
    example: {
      de: 'Meine Schwester ist seit zwei Jahren glücklich verheiratet.',
      en: 'My sister has been happily married for two years.'
    }
  },
  {
    id: 'b1.a.057',
    de: 'ledig',
    en: 'single, unmarried',
    example: {
      de: 'Im Formular müssen Sie ankreuzen, ob Sie ledig sind.',
      en: 'On the form you have to tick whether you are single.'
    }
  },
  {
    id: 'b1.a.058',
    de: 'geschieden',
    en: 'divorced',
    example: {
      de: 'Ihre Eltern sind seit vielen Jahren geschieden.',
      en: 'Her parents have been divorced for many years.'
    }
  },
  {
    id: 'b1.a.059',
    de: 'spannend',
    en: 'exciting, gripping',
    komparativ: 'spannender',
    superlativ: 'am spannendsten',
    example: {
      de: 'Das Buch war so spannend, dass ich die ganze Nacht gelesen habe.',
      en: 'The book was so exciting that I read all night.'
    }
  },
  {
    id: 'b1.a.060',
    de: 'unterhaltsam',
    en: 'entertaining',
    komparativ: 'unterhaltsamer',
    superlativ: 'am unterhaltsamsten',
    example: {
      de: 'Der Abend mit den Kollegen war sehr unterhaltsam.',
      en: 'The evening with the colleagues was very entertaining.'
    }
  },
  {
    id: 'b1.a.061',
    de: 'kreativ',
    en: 'creative',
    komparativ: 'kreativer',
    superlativ: 'am kreativsten',
    example: {
      de: 'Beim Malen kann sie richtig kreativ sein.',
      en: 'She can be really creative when painting.'
    }
  },
  {
    id: 'b1.a.062',
    de: 'sportlich',
    en: 'sporty, athletic',
    komparativ: 'sportlicher',
    superlativ: 'am sportlichsten',
    example: {
      de: 'Mein Bruder ist viel sportlicher als ich.',
      en: 'My brother is much sportier than I am.'
    }
  },
  {
    id: 'b1.a.063',
    de: 'abwechslungsreich',
    en: 'varied',
    komparativ: 'abwechslungsreicher',
    superlativ: 'am abwechslungsreichsten',
    example: {
      de: 'Mein neuer Job ist zum Glück sehr abwechslungsreich.',
      en: 'Luckily my new job is very varied.'
    }
  },
  {
    id: 'b1.a.064',
    de: 'gültig',
    en: 'valid',
    example: {
      de: 'Der Ausweis ist noch bis Ende des Jahres gültig.',
      en: 'The identity card is valid until the end of the year.'
    }
  },
  {
    id: 'b1.a.065',
    de: 'notwendig',
    en: 'necessary',
    komparativ: 'notwendiger',
    superlativ: 'am notwendigsten',
    example: {
      de: 'Für die Reise ist eine Impfung nicht notwendig.',
      en: 'A vaccination is not necessary for the trip.'
    }
  },
  {
    id: 'b1.a.066',
    de: 'erforderlich',
    en: 'required',
    example: {
      de: 'Für diesen Kurs sind keine Vorkenntnisse erforderlich.',
      en: 'No previous knowledge is required for this course.'
    }
  },
  {
    id: 'b1.a.067',
    de: 'vollständig',
    en: 'complete',
    komparativ: 'vollständiger',
    superlativ: 'am vollständigsten',
    example: {
      de: 'Bitte prüfen Sie, ob Ihre Unterlagen vollständig sind.',
      en: 'Please check whether your documents are complete.'
    }
  },
  {
    id: 'b1.a.068',
    de: 'schriftlich',
    en: 'written, in writing',
    example: {
      de: 'Die Kündigung des Vertrags muss immer schriftlich erfolgen.',
      en: 'The cancellation of the contract must always be in writing.'
    }
  },
  {
    id: 'b1.a.069',
    de: 'mündlich',
    en: 'oral, verbal',
    example: {
      de: 'Nach dem Test gibt es noch eine mündliche Prüfung.',
      en: 'After the test there is also an oral exam.'
    }
  },
  {
    id: 'b1.a.070',
    de: 'dringend',
    en: 'urgent',
    komparativ: 'dringender',
    superlativ: 'am dringendsten',
    example: {
      de: 'Ich muss dringend mit dem Chef sprechen.',
      en: 'I urgently need to speak to the boss.'
    }
  },
  {
    id: 'b1.a.071',
    de: 'zuständig',
    en: 'responsible, in charge',
    example: {
      de: 'Für Ihren Antrag ist ein anderes Amt zuständig.',
      en: 'A different office is responsible for your application.'
    }
  },
  {
    id: 'b1.a.072',
    de: 'enttäuscht',
    en: 'disappointed',
    komparativ: 'enttäuschter',
    superlativ: 'am enttäuschtesten',
    example: {
      de: 'Sie war enttäuscht, weil niemand an ihren Geburtstag dachte.',
      en: 'She was disappointed because nobody remembered her birthday.'
    }
  },
  {
    id: 'b1.a.073',
    de: 'zufrieden',
    en: 'satisfied, content',
    komparativ: 'zufriedener',
    superlativ: 'am zufriedensten',
    example: {
      de: 'Mit dem Ergebnis der Prüfung bin ich sehr zufrieden.',
      en: 'I am very satisfied with the result of the exam.'
    }
  },
  {
    id: 'b1.a.074',
    de: 'stolz',
    en: 'proud',
    komparativ: 'stolzer',
    superlativ: 'am stolzesten',
    example: {
      de: 'Die Eltern sind sehr stolz auf ihre Tochter.',
      en: 'The parents are very proud of their daughter.'
    }
  },
  {
    id: 'b1.a.075',
    de: 'nervös',
    en: 'nervous',
    komparativ: 'nervöser',
    superlativ: 'am nervösesten',
    example: {
      de: 'Vor dem Vorstellungsgespräch war er ziemlich nervös.',
      en: 'He was quite nervous before the job interview.'
    }
  },
  {
    id: 'b1.a.076',
    de: 'begeistert',
    en: 'enthusiastic, thrilled',
    komparativ: 'begeisterter',
    superlativ: 'am begeistertsten',
    example: {
      de: 'Die Kinder waren von dem Zirkus total begeistert.',
      en: 'The children were totally thrilled by the circus.'
    }
  },
  {
    id: 'b1.a.077',
    de: 'optimistisch',
    en: 'optimistic',
    komparativ: 'optimistischer',
    superlativ: 'am optimistischsten',
    example: {
      de: 'Trotz aller Probleme bleibt sie optimistisch.',
      en: 'Despite all the problems she remains optimistic.'
    }
  },
  {
    id: 'b1.a.078',
    de: 'sinnvoll',
    en: 'sensible, useful',
    komparativ: 'sinnvoller',
    superlativ: 'am sinnvollsten',
    example: {
      de: 'Es ist sinnvoll, vor der Reise eine Versicherung abzuschließen.',
      en: 'It makes sense to take out insurance before the trip.'
    }
  },
  {
    id: 'b1.a.079',
    de: 'deutlich',
    en: 'clear, distinct',
    komparativ: 'deutlicher',
    superlativ: 'am deutlichsten',
    example: {
      de: 'Bitte sprechen Sie am Telefon langsam und deutlich.',
      en: 'Please speak slowly and clearly on the telephone.'
    }
  },
  {
    id: 'b1.a.080',
    de: 'ähnlich',
    en: 'similar',
    komparativ: 'ähnlicher',
    superlativ: 'am ähnlichsten',
    example: {
      de: 'Die beiden Brüder sehen sich sehr ähnlich.',
      en: 'The two brothers look very similar.'
    }
  },
  {
    id: 'b1.a.081',
    de: 'unterschiedlich',
    en: 'different, varying',
    komparativ: 'unterschiedlicher',
    superlativ: 'am unterschiedlichsten',
    example: {
      de: 'Die Preise für Wohnungen sind regional sehr unterschiedlich.',
      en: 'Prices for flats vary greatly from region to region.'
    }
  },
  {
    id: 'b1.a.082',
    de: 'ängstlich',
    en: 'anxious, fearful',
    komparativ: 'ängstlicher',
    superlativ: 'am ängstlichsten',
    example: {
      de: 'Unser Hund ist bei Gewitter immer sehr ängstlich.',
      en: 'Our dog is always very anxious during thunderstorms.'
    }
  },
  {
    id: 'b1.a.083',
    de: 'mutig',
    en: 'brave, courageous',
    komparativ: 'mutiger',
    superlativ: 'am mutigsten',
    example: {
      de: 'Es war mutig von dir, deine Meinung zu sagen.',
      en: 'It was brave of you to speak your mind.'
    }
  },
  {
    id: 'b1.a.084',
    de: 'vorsichtig',
    en: 'careful, cautious',
    komparativ: 'vorsichtiger',
    superlativ: 'am vorsichtigsten',
    example: {
      de: 'Fahr bitte vorsichtig, die Straßen sind glatt.',
      en: 'Please drive carefully, the roads are slippery.'
    }
  },
  {
    id: 'b1.a.085',
    de: 'neugierig',
    en: 'curious',
    komparativ: 'neugieriger',
    superlativ: 'am neugierigsten',
    example: {
      de: 'Die Kinder waren neugierig auf das neue Spielzeug.',
      en: 'The children were curious about the new toy.'
    }
  },
  {
    id: 'b1.a.086',
    de: 'selbstbewusst',
    en: 'self-confident',
    komparativ: 'selbstbewusster',
    superlativ: 'am selbstbewusstesten',
    example: {
      de: 'Im Gespräch wirkte die Bewerberin sehr selbstbewusst.',
      en: 'In the interview the applicant appeared very self-confident.'
    }
  },
  {
    id: 'b1.a.087',
    de: 'sympathisch',
    en: 'likeable',
    komparativ: 'sympathischer',
    superlativ: 'am sympathischsten',
    example: {
      de: 'Ich fand die neue Mitbewohnerin sofort sympathisch.',
      en: 'I immediately found the new flatmate likeable.'
    }
  },
  {
    id: 'b1.a.088',
    de: 'gründlich',
    en: 'thorough',
    komparativ: 'gründlicher',
    superlativ: 'am gründlichsten',
    example: {
      de: 'Vor dem Umzug haben wir die Wohnung gründlich geputzt.',
      en: 'Before moving out we cleaned the flat thoroughly.'
    }
  },
  {
    id: 'b1.a.089',
    de: 'vernünftig',
    en: 'sensible, reasonable',
    komparativ: 'vernünftiger',
    superlativ: 'am vernünftigsten',
    example: {
      de: 'Sei vernünftig und geh bei Fieber zum Arzt!',
      en: 'Be sensible and see a doctor when you have a fever!'
    }
  },
  {
    id: 'b1.a.090',
    de: 'tolerant',
    en: 'tolerant',
    komparativ: 'toleranter',
    superlativ: 'am tolerantesten',
    example: {
      de: 'Meine Großeltern sind toleranter, als ich dachte.',
      en: 'My grandparents are more tolerant than I thought.'
    }
  },
  {
    id: 'b1.a.091',
    de: 'modisch',
    en: 'fashionable',
    komparativ: 'modischer',
    superlativ: 'am modischsten',
    example: {
      de: 'Sie trägt gern modische Kleidung in kräftigen Farben.',
      en: 'She likes wearing fashionable clothes in bold colours.'
    }
  },
  {
    id: 'b1.a.092',
    de: 'herzlich',
    en: 'warm, cordial',
    komparativ: 'herzlicher',
    superlativ: 'am herzlichsten',
    example: {
      de: 'Wir wurden von der Gastfamilie sehr herzlich empfangen.',
      en: 'We were given a very warm welcome by the host family.'
    }
  },
  {
    id: 'b1.a.093',
    de: 'lebendig',
    en: 'lively',
    komparativ: 'lebendiger',
    superlativ: 'am lebendigsten',
    example: {
      de: 'Am Abend ist das Viertel besonders lebendig.',
      en: 'In the evening the neighbourhood is especially lively.'
    }
  },
  {
    id: 'b1.a.094',
    de: 'einsam',
    en: 'lonely',
    komparativ: 'einsamer',
    superlativ: 'am einsamsten',
    example: {
      de: 'Ohne seine Familie fühlte er sich im Ausland einsam.',
      en: 'Without his family he felt lonely abroad.'
    }
  },
  {
    id: 'b1.a.095',
    de: 'verrückt',
    en: 'crazy',
    komparativ: 'verrückter',
    superlativ: 'am verrücktesten',
    example: {
      de: 'Die Idee klingt verrückt, aber sie könnte funktionieren.',
      en: 'The idea sounds crazy, but it could work.'
    }
  },
  {
    id: 'b1.a.096',
    de: 'peinlich',
    en: 'embarrassing',
    komparativ: 'peinlicher',
    superlativ: 'am peinlichsten',
    example: {
      de: 'Es war mir peinlich, dass ich seinen Namen vergessen hatte.',
      en: 'I was embarrassed that I had forgotten his name.'
    }
  },
  {
    id: 'b1.a.097',
    de: 'angenehm',
    en: 'pleasant',
    komparativ: 'angenehmer',
    superlativ: 'am angenehmsten',
    example: {
      de: 'Im Schatten ist die Temperatur sehr angenehm.',
      en: 'In the shade the temperature is very pleasant.'
    }
  },
  {
    id: 'b1.a.098',
    de: 'verständlich',
    en: 'understandable',
    komparativ: 'verständlicher',
    superlativ: 'am verständlichsten',
    example: {
      de: 'Die Lehrerin erklärt die Grammatik sehr verständlich.',
      en: 'The teacher explains the grammar in a very understandable way.'
    }
  },
  {
    id: 'b1.a.099',
    de: 'außergewöhnlich',
    en: 'exceptional, unusual',
    komparativ: 'außergewöhnlicher',
    superlativ: 'am außergewöhnlichsten',
    example: {
      de: 'Das Restaurant bietet eine außergewöhnliche Auswahl an Gerichten.',
      en: 'The restaurant offers an exceptional selection of dishes.'
    }
  },
  {
    id: 'b1.a.100',
    de: 'sorgfältig',
    en: 'careful, meticulous',
    komparativ: 'sorgfältiger',
    superlativ: 'am sorgfältigsten',
    example: {
      de: 'Bitte lesen Sie die Anleitung vor der Benutzung sorgfältig durch.',
      en: 'Please read the instructions through carefully before use.'
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
