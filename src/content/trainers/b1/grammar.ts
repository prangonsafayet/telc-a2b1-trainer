import { type CaseItem, type PrepVerbEntry } from '@shared/types';

/* B1 grammar banks: Verben mit Präposition and case government (Akkusativ / Dativ /
   Genitiv). Ids are persisted SRS keys — never renumber existing items. */

export const B1_PREP_VERBS: readonly PrepVerbEntry[] = [
  {
    id: 'b1.pv.001',
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
    id: 'b1.pv.002',
    de: 'sich freuen über + Akk.',
    en: 'to be pleased about',
    verb: 'sich freuen',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Ich habe mich sehr über dein Geschenk gefreut.',
      en: 'I was very pleased about your present.'
    }
  },
  {
    id: 'b1.pv.003',
    de: 'denken an + Akk.',
    en: 'to think of',
    verb: 'denken',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'Ich denke oft an meinen alten Deutschlehrer.',
      en: 'I often think of my old German teacher.'
    }
  },
  {
    id: 'b1.pv.004',
    de: 'sich ärgern über + Akk.',
    en: 'to be annoyed about',
    verb: 'sich ärgern',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Sie ärgert sich über den Lärm auf der Straße.',
      en: 'She is annoyed about the noise in the street.'
    }
  },
  {
    id: 'b1.pv.005',
    de: 'teilnehmen an + Dat.',
    en: 'to take part in',
    verb: 'teilnehmen',
    preposition: 'an',
    kasus: 'dativ',
    example: {
      de: 'Er nimmt an einem Erste-Hilfe-Kurs teil.',
      en: 'He is taking part in a first-aid course.'
    }
  },
  {
    id: 'b1.pv.006',
    de: 'sich kümmern um + Akk.',
    en: 'to take care of',
    verb: 'sich kümmern',
    preposition: 'um',
    kasus: 'akkusativ',
    example: {
      de: 'Meine Nachbarin kümmert sich um meinen Hund.',
      en: 'My neighbour takes care of my dog.'
    }
  },
  {
    id: 'b1.pv.007',
    de: 'gehören zu + Dat.',
    en: 'to belong to, to be part of',
    verb: 'gehören',
    preposition: 'zu',
    kasus: 'dativ',
    example: {
      de: 'Köln gehört zu den größten Städten Deutschlands.',
      en: 'Cologne is one of the largest cities in Germany.'
    }
  },
  {
    id: 'b1.pv.008',
    de: 'träumen von + Dat.',
    en: 'to dream of',
    verb: 'träumen',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Sie träumt von einem Haus am Meer.',
      en: 'She dreams of a house by the sea.'
    }
  },
  {
    id: 'b1.pv.009',
    de: 'sich bedanken für + Akk.',
    en: 'to say thank you for',
    verb: 'sich bedanken',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Ich möchte mich für die Einladung bedanken.',
      en: 'I would like to say thank you for the invitation.'
    }
  },
  {
    id: 'b1.pv.010',
    de: 'sich bedanken bei + Dat.',
    en: 'to thank (a person)',
    verb: 'sich bedanken',
    preposition: 'bei',
    kasus: 'dativ',
    example: {
      de: 'Vergiss nicht, dich bei der Ärztin zu bedanken.',
      en: 'Do not forget to thank the doctor.'
    }
  },
  {
    id: 'b1.pv.011',
    de: 'achten auf + Akk.',
    en: 'to pay attention to',
    verb: 'achten',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Achten Sie bitte auf den Verkehr!',
      en: 'Please pay attention to the traffic!'
    }
  },
  {
    id: 'b1.pv.012',
    de: 'bestehen aus + Dat.',
    en: 'to consist of',
    verb: 'bestehen',
    preposition: 'aus',
    kasus: 'dativ',
    example: {
      de: 'Die Prüfung besteht aus einem schriftlichen und einem mündlichen Teil.',
      en: 'The exam consists of a written and an oral part.'
    }
  },
  {
    id: 'b1.pv.013',
    de: 'sich beschäftigen mit + Dat.',
    en: 'to occupy oneself with',
    verb: 'sich beschäftigen',
    preposition: 'mit',
    kasus: 'dativ',
    example: {
      de: 'In seiner Freizeit beschäftigt er sich mit alten Autos.',
      en: 'In his free time he occupies himself with old cars.'
    }
  },
  {
    id: 'b1.pv.014',
    de: 'Angst haben vor + Dat.',
    en: 'to be afraid of',
    verb: 'Angst haben',
    preposition: 'vor',
    kasus: 'dativ',
    example: {
      de: 'Viele Kinder haben Angst vor dem Zahnarzt.',
      en: 'Many children are afraid of the dentist.'
    }
  },
  {
    id: 'b1.pv.015',
    de: 'sich interessieren für + Akk.',
    en: 'to be interested in',
    verb: 'sich interessieren',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Ich interessiere mich für den Deutschkurs am Abend.',
      en: 'I am interested in the evening German course.'
    }
  },
  {
    id: 'b1.pv.016',
    de: 'sich freuen auf + Akk.',
    en: 'to look forward to',
    verb: 'sich freuen',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Wir freuen uns schon auf den Urlaub.',
      en: 'We are already looking forward to the holiday.'
    }
  },
  {
    id: 'b1.pv.017',
    de: 'sprechen über + Akk.',
    en: 'to talk about',
    verb: 'sprechen',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Im Kurs sprechen wir über den Klimawandel.',
      en: 'In class we talk about climate change.'
    }
  },
  {
    id: 'b1.pv.018',
    de: 'sich entscheiden für + Akk.',
    en: 'to decide on',
    verb: 'sich entscheiden',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Ich habe mich für den blauen Mantel entschieden.',
      en: 'I decided on the blue coat.'
    }
  },
  {
    id: 'b1.pv.019',
    de: 'fragen nach + Dat.',
    en: 'to ask about, to ask for',
    verb: 'fragen',
    preposition: 'nach',
    kasus: 'dativ',
    example: {
      de: 'Ein Tourist hat mich nach dem Weg zum Bahnhof gefragt.',
      en: 'A tourist asked me the way to the station.'
    }
  },
  {
    id: 'b1.pv.020',
    de: 'antworten auf + Akk.',
    en: 'to reply to',
    verb: 'antworten',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Er hat nie auf meinen Brief geantwortet.',
      en: 'He never replied to my letter.'
    }
  },
  {
    id: 'b1.pv.021',
    de: 'sich erinnern an + Akk.',
    en: 'to remember',
    verb: 'sich erinnern',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'Erinnerst du dich noch an unseren ersten Schultag?',
      en: 'Do you still remember our first day at school?'
    }
  },
  {
    id: 'b1.pv.022',
    de: 'sich gewöhnen an + Akk.',
    en: 'to get used to',
    verb: 'sich gewöhnen',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'Ich habe mich schnell an den Lärm der Großstadt gewöhnt.',
      en: 'I quickly got used to the noise of the big city.'
    }
  },
  {
    id: 'b1.pv.023',
    de: 'sich bewerben um + Akk.',
    en: 'to apply for',
    verb: 'sich bewerben',
    preposition: 'um',
    kasus: 'akkusativ',
    example: {
      de: 'Sie bewirbt sich um eine Stelle als Krankenschwester.',
      en: 'She is applying for a job as a nurse.'
    }
  },
  {
    id: 'b1.pv.024',
    de: 'bitten um + Akk.',
    en: 'to ask for',
    verb: 'bitten',
    preposition: 'um',
    kasus: 'akkusativ',
    example: {
      de: 'Darf ich Sie um einen Gefallen bitten?',
      en: 'May I ask you for a favour?'
    }
  },
  {
    id: 'b1.pv.025',
    de: 'danken für + Akk.',
    en: 'to thank for',
    verb: 'danken',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Ich danke Ihnen für Ihre schnelle Antwort.',
      en: 'Thank you for your quick reply.'
    }
  },
  {
    id: 'b1.pv.026',
    de: 'helfen bei + Dat.',
    en: 'to help with',
    verb: 'helfen',
    preposition: 'bei',
    kasus: 'dativ',
    example: {
      de: 'Kannst du mir bei den Hausaufgaben helfen?',
      en: 'Can you help me with the homework?'
    }
  },
  {
    id: 'b1.pv.027',
    de: 'einladen zu + Dat.',
    en: 'to invite to',
    verb: 'einladen',
    preposition: 'zu',
    kasus: 'dativ',
    example: {
      de: 'Sie hat mich zu ihrer Hochzeit eingeladen.',
      en: 'She invited me to her wedding.'
    }
  },
  {
    id: 'b1.pv.028',
    de: 'gratulieren zu + Dat.',
    en: 'to congratulate on',
    verb: 'gratulieren',
    preposition: 'zu',
    kasus: 'dativ',
    example: {
      de: 'Ich gratuliere dir zu deinem neuen Job.',
      en: 'Congratulations on your new job.'
    }
  },
  {
    id: 'b1.pv.029',
    de: 'sich treffen mit + Dat.',
    en: 'to meet with',
    verb: 'sich treffen',
    preposition: 'mit',
    kasus: 'dativ',
    example: {
      de: 'Ich treffe mich morgen mit einem alten Freund.',
      en: 'I am meeting an old friend tomorrow.'
    }
  },
  {
    id: 'b1.pv.030',
    de: 'sich beschweren über + Akk.',
    en: 'to complain about',
    verb: 'sich beschweren',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Die Gäste beschweren sich über den schlechten Service.',
      en: 'The guests are complaining about the bad service.'
    }
  },
  {
    id: 'b1.pv.031',
    de: 'anfangen mit + Dat.',
    en: 'to start with',
    verb: 'anfangen',
    preposition: 'mit',
    kasus: 'dativ',
    example: {
      de: 'Wann fängst du mit der Arbeit an?',
      en: 'When are you starting the work?'
    }
  },
  {
    id: 'b1.pv.032',
    de: 'aufhören mit + Dat.',
    en: 'to stop (doing something)',
    verb: 'aufhören',
    preposition: 'mit',
    kasus: 'dativ',
    example: {
      de: 'Mein Vater hat endlich mit dem Rauchen aufgehört.',
      en: 'My father has finally stopped smoking.'
    }
  },
  {
    id: 'b1.pv.033',
    de: 'erzählen von + Dat.',
    en: 'to tell about',
    verb: 'erzählen',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Erzähl mir von deiner Reise nach Italien!',
      en: 'Tell me about your trip to Italy!'
    }
  },
  {
    id: 'b1.pv.034',
    de: 'halten von + Dat.',
    en: 'to think of (have an opinion)',
    verb: 'halten',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Was hältst du von dem neuen Kollegen?',
      en: 'What do you think of the new colleague?'
    }
  },
  {
    id: 'b1.pv.035',
    de: 'abhängen von + Dat.',
    en: 'to depend on',
    verb: 'abhängen',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Ob wir grillen, hängt vom Wetter ab.',
      en: 'Whether we barbecue depends on the weather.'
    }
  },
  {
    id: 'b1.pv.036',
    de: 'sich verabschieden von + Dat.',
    en: 'to say goodbye to',
    verb: 'sich verabschieden',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Wir verabschieden uns von unseren Gästen.',
      en: 'We say goodbye to our guests.'
    }
  },
  {
    id: 'b1.pv.037',
    de: 'sich vorbereiten auf + Akk.',
    en: 'to prepare for',
    verb: 'sich vorbereiten',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Ich bereite mich gerade auf die mündliche Prüfung vor.',
      en: 'I am currently preparing for the oral exam.'
    }
  },
  {
    id: 'b1.pv.038',
    de: 'sich verlassen auf + Akk.',
    en: 'to rely on',
    verb: 'sich verlassen',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Du kannst dich immer auf deinen besten Freund verlassen.',
      en: 'You can always rely on your best friend.'
    }
  },
  {
    id: 'b1.pv.039',
    de: 'hoffen auf + Akk.',
    en: 'to hope for',
    verb: 'hoffen',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Wir hoffen auf einen sonnigen Sommer.',
      en: 'We are hoping for a sunny summer.'
    }
  },
  {
    id: 'b1.pv.040',
    de: 'glauben an + Akk.',
    en: 'to believe in',
    verb: 'glauben',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'Sie glaubt fest an ihren Erfolg.',
      en: 'She firmly believes in her success.'
    }
  }
];

export const B1_CASE_ITEMS: readonly CaseItem[] = [
  {
    id: 'b1.c.001',
    de: 'für + Akkusativ',
    en: 'for',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: { de: 'Das Geschenk ist für meinen Bruder.', en: 'The present is for my brother.' }
  },
  {
    id: 'b1.c.002',
    de: 'mit + Dativ',
    en: 'with',
    kasus: 'dativ',
    kind: 'praeposition',
    example: { de: 'Ich fahre mit dem Zug nach Berlin.', en: 'I am going to Berlin by train.' }
  },
  {
    id: 'b1.c.003',
    de: 'wegen + Genitiv',
    en: 'because of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Wegen des Wetters bleiben wir heute zu Hause.',
      en: 'Because of the weather we are staying at home today.'
    }
  },
  {
    id: 'b1.c.004',
    de: 'durch + Akkusativ',
    en: 'through',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Wir gehen jeden Morgen durch den Park.',
      en: 'We walk through the park every morning.'
    }
  },
  {
    id: 'b1.c.005',
    de: 'gegen + Akkusativ',
    en: 'against',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Das Auto ist gegen einen Baum gefahren.',
      en: 'The car drove into a tree.'
    }
  },
  {
    id: 'b1.c.006',
    de: 'ohne + Akkusativ',
    en: 'without',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Ohne meinen Kaffee kann ich nicht arbeiten.',
      en: 'I cannot work without my coffee.'
    }
  },
  {
    id: 'b1.c.007',
    de: 'um + Akkusativ',
    en: 'around',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Die Kinder sitzen um den Tisch.',
      en: 'The children are sitting around the table.'
    }
  },
  {
    id: 'b1.c.008',
    de: 'bis + Akkusativ',
    en: 'until, up to',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Der Kurs dauert bis nächsten Freitag.',
      en: 'The course lasts until next Friday.'
    }
  },
  {
    id: 'b1.c.009',
    de: 'entlang + Akkusativ',
    en: 'along',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Wir spazieren den Fluss entlang.',
      en: 'We are strolling along the river.'
    }
  },
  {
    id: 'b1.c.010',
    de: 'aus + Dativ',
    en: 'from, out of',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Sie nimmt das Buch aus dem Regal.',
      en: 'She takes the book out of the shelf.'
    }
  },
  {
    id: 'b1.c.011',
    de: 'bei + Dativ',
    en: 'at, near, with',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Anna wohnt noch bei ihren Eltern.',
      en: 'Anna still lives with her parents.'
    }
  },
  {
    id: 'b1.c.012',
    de: 'nach + Dativ',
    en: 'after, to',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Nach dem Unterricht gehen wir in die Mensa.',
      en: 'After class we go to the cafeteria.'
    }
  },
  {
    id: 'b1.c.013',
    de: 'seit + Dativ',
    en: 'since, for (time)',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Ich lerne seit einem Jahr Deutsch.',
      en: 'I have been learning German for a year.'
    }
  },
  {
    id: 'b1.c.014',
    de: 'von + Dativ',
    en: 'from, of',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Das ist ein Geschenk von meinem Onkel.',
      en: 'That is a present from my uncle.'
    }
  },
  {
    id: 'b1.c.015',
    de: 'zu + Dativ',
    en: 'to',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Wir gehen heute Abend zu einem Konzert.',
      en: 'We are going to a concert tonight.'
    }
  },
  {
    id: 'b1.c.016',
    de: 'gegenüber + Dativ',
    en: 'opposite, across from',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Die Apotheke liegt gegenüber dem Bahnhof.',
      en: 'The pharmacy is opposite the station.'
    }
  },
  {
    id: 'b1.c.017',
    de: 'ab + Dativ',
    en: 'from (a time) on',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Ab nächster Woche habe ich Urlaub.',
      en: 'From next week on I am on holiday.'
    }
  },
  {
    id: 'b1.c.018',
    de: 'trotz + Genitiv',
    en: 'despite',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Trotz des Regens spielen die Kinder draußen.',
      en: 'Despite the rain the children are playing outside.'
    }
  },
  {
    id: 'b1.c.019',
    de: 'während + Genitiv',
    en: 'during',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Während der Prüfung darf man nicht sprechen.',
      en: 'You are not allowed to talk during the exam.'
    }
  },
  {
    id: 'b1.c.020',
    de: 'statt / anstatt + Genitiv',
    en: 'instead of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Statt eines Autos hat er sich ein Fahrrad gekauft.',
      en: 'Instead of a car he bought himself a bicycle.'
    }
  },
  {
    id: 'b1.c.021',
    de: 'innerhalb + Genitiv',
    en: 'within',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Bitte antworten Sie innerhalb einer Woche.',
      en: 'Please reply within a week.'
    }
  },
  {
    id: 'b1.c.022',
    de: 'außerhalb + Genitiv',
    en: 'outside of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Sie wohnt außerhalb der Stadt.',
      en: 'She lives outside the city.'
    }
  },
  {
    id: 'b1.c.023',
    de: 'aufgrund + Genitiv',
    en: 'due to',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Aufgrund des Streiks fahren heute keine Züge.',
      en: 'Due to the strike no trains are running today.'
    }
  },
  {
    id: 'b1.c.024',
    de: 'helfen + Dativ',
    en: 'to help',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Ich helfe meiner Oma im Garten.',
      en: 'I help my grandma in the garden.'
    }
  },
  {
    id: 'b1.c.025',
    de: 'danken + Dativ',
    en: 'to thank',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Wir danken dem Lehrer für seine Geduld.',
      en: 'We thank the teacher for his patience.'
    }
  },
  {
    id: 'b1.c.026',
    de: 'gefallen + Dativ',
    en: 'to please, to appeal to',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Der Film hat meinem Vater gut gefallen.',
      en: 'My father liked the film a lot.'
    }
  },
  {
    id: 'b1.c.027',
    de: 'gehören + Dativ',
    en: 'to belong to',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Das Fahrrad gehört meinem Bruder.',
      en: 'The bicycle belongs to my brother.'
    }
  },
  {
    id: 'b1.c.028',
    de: 'schmecken + Dativ',
    en: 'to taste good (to someone)',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Die Suppe schmeckt dem Kind nicht.',
      en: 'The child does not like the soup.'
    }
  },
  {
    id: 'b1.c.029',
    de: 'gratulieren + Dativ',
    en: 'to congratulate',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Alle gratulieren der Gewinnerin.',
      en: 'Everyone congratulates the winner.'
    }
  },
  {
    id: 'b1.c.030',
    de: 'folgen + Dativ',
    en: 'to follow',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Der Hund folgt seinem Besitzer.',
      en: 'The dog follows its owner.'
    }
  },
  {
    id: 'b1.c.031',
    de: 'zuhören + Dativ',
    en: 'to listen to',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Die Schüler hören der Lehrerin aufmerksam zu.',
      en: 'The pupils listen attentively to the teacher.'
    }
  },
  {
    id: 'b1.c.032',
    de: 'antworten + Dativ',
    en: 'to answer (a person)',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Der Student antwortet dem Professor.',
      en: 'The student answers the professor.'
    }
  },
  {
    id: 'b1.c.033',
    de: 'vertrauen + Dativ',
    en: 'to trust',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Ich vertraue meiner besten Freundin.',
      en: 'I trust my best friend.'
    }
  },
  {
    id: 'b1.c.034',
    de: 'es gibt + Akkusativ',
    en: 'there is / there are',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'In unserer Straße gibt es einen kleinen Supermarkt.',
      en: 'There is a small supermarket in our street.'
    }
  },
  {
    id: 'b1.c.035',
    de: 'brauchen + Akkusativ',
    en: 'to need',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Ich brauche einen neuen Computer.',
      en: 'I need a new computer.'
    }
  },
  {
    id: 'b1.c.036',
    de: 'besuchen + Akkusativ',
    en: 'to visit',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Am Wochenende besuchen wir unseren Großvater.',
      en: 'At the weekend we are visiting our grandfather.'
    }
  },
  {
    id: 'b1.c.037',
    de: 'anrufen + Akkusativ',
    en: 'to call (on the phone)',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Ich rufe morgen den Zahnarzt an.',
      en: 'I will call the dentist tomorrow.'
    }
  },
  {
    id: 'b1.c.038',
    de: 'fragen + Akkusativ',
    en: 'to ask (a person)',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Frag doch den Verkäufer nach dem Preis!',
      en: 'Just ask the salesman about the price!'
    }
  },
  {
    id: 'b1.c.039',
    de: 'kennenlernen + Akkusativ',
    en: 'to get to know',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Im Kurs habe ich einen netten Mann aus Spanien kennengelernt.',
      en: 'In the course I got to know a nice man from Spain.'
    }
  },
  {
    id: 'b1.c.040',
    de: 'treffen + Akkusativ',
    en: 'to meet',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Sie trifft heute Abend ihren besten Freund.',
      en: 'She is meeting her best friend tonight.'
    }
  },
  {
    id: 'b1.c.041',
    de: 'einladen + Akkusativ',
    en: 'to invite (a person)',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Wir laden unseren Nachbarn zum Grillen ein.',
      en: 'We are inviting our neighbour to the barbecue.'
    }
  },
  {
    id: 'b1.c.042',
    de: 'jeden Tag — Akkusativ',
    en: 'every day (time expressions take the accusative)',
    kasus: 'akkusativ',
    kind: 'wendung',
    example: {
      de: 'Jeden Tag lerne ich zwanzig neue Wörter.',
      en: 'Every day I learn twenty new words.'
    }
  },
  {
    id: 'b1.c.043',
    de: 'letzten Monat — Akkusativ',
    en: 'last month (time expressions take the accusative)',
    kasus: 'akkusativ',
    kind: 'wendung',
    example: {
      de: 'Letzten Monat habe ich die Prüfung bestanden.',
      en: 'Last month I passed the exam.'
    }
  },
  {
    id: 'b1.c.044',
    de: 'dem Kind zuliebe — Dativ',
    en: 'for the child’s sake (zuliebe follows the dative)',
    kasus: 'dativ',
    kind: 'wendung',
    example: {
      de: 'Dem Kind zuliebe sind sie aufs Land gezogen.',
      en: 'For the child’s sake they moved to the countryside.'
    }
  },
  {
    id: 'b1.c.045',
    de: 'Anfang des Monats — Genitiv',
    en: 'at the beginning of the month',
    kasus: 'genitiv',
    kind: 'wendung',
    example: {
      de: 'Anfang des Monats bekomme ich mein Gehalt.',
      en: 'At the beginning of the month I get my salary.'
    }
  },
  {
    id: 'b1.c.046',
    de: 'Ende des Jahres — Genitiv',
    en: 'at the end of the year',
    kasus: 'genitiv',
    kind: 'wendung',
    example: {
      de: 'Ende des Jahres fahren wir zu meiner Familie.',
      en: 'At the end of the year we travel to my family.'
    }
  },
  {
    id: 'b1.c.047',
    de: 'eines Tages — Genitiv',
    en: 'one day, someday',
    kasus: 'genitiv',
    kind: 'wendung',
    example: {
      de: 'Eines Tages möchte ich in Deutschland arbeiten.',
      en: 'One day I would like to work in Germany.'
    }
  },
  {
    id: 'b1.c.048',
    de: 'das Auto meines Vaters — Genitiv',
    en: 'my father’s car (possessive genitive)',
    kasus: 'genitiv',
    kind: 'wendung',
    example: {
      de: 'Das Auto meines Vaters ist schon sehr alt.',
      en: 'My father’s car is already very old.'
    }
  }
];
