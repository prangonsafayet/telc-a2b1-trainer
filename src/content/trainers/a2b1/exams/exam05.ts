import { type DualLevelExam } from '@shared/types';

const exam = {
  id: 5,
  title: 'Modelltest 5',
  difficulty: 'medium',
  level: 'A2 · mittel',
  theme: 'Gesundheit & Sport',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?',
      situations: [
        'Sie haben oft Rückenschmerzen und suchen einen Kurs.',
        'Ihre Tochter (10 Jahre) möchte Tennis spielen lernen.',
        'Sie brauchen am Sonntag dringend Medikamente.',
        'Sie möchten nicht allein joggen, sondern mit einer Gruppe laufen.',
        'Sie suchen ein günstiges Fitnessstudio mit Sauna.'
      ],
      ads: [
        'Tennisclub Grün-Weiß: Tenniskurse für Kinder von 8 bis 14 Jahren. Training jeden Mittwoch und Freitag, Schläger können Sie bei uns leihen.',
        'Sportgeschäft Aktiv: Diese Woche alle Laufschuhe 20 % billiger! Große Auswahl für Damen, Herren und Kinder. Mo–Sa 9–19 Uhr.',
        'Apotheke am Markt: Wir haben auch Notdienst an Sonn- und Feiertagen, von 8 bis 20 Uhr. Marktplatz 3, Tel. 0651 22890.',
        'Physiopraxis Balance: Kurs "Fit für den Rücken" – jeden Montag um 18 Uhr, 10 Termine für 80 Euro. Jetzt anmelden!',
        'Schwimmbad Wellenberg: Neu renoviert! Sportbecken, Kinderbecken und Rutsche. Täglich 9–21 Uhr, Eintritt ab 4,50 Euro.',
        'Lauftreff Neustadt: Wir joggen jeden Mittwoch und Samstag zusammen im Stadtwald. Anfänger und Profis willkommen – kostenlos!',
        'Fitnessstudio Vital: Trainieren Sie bei uns für nur 25 Euro im Monat – mit Sauna, Kursen und moderner Ausstattung. Probetraining gratis!',
        'Arztpraxis Dr. Sommer sucht ab sofort eine freundliche Arzthelferin in Teilzeit. Bewerbung bitte per E-Mail.'
      ],
      answers: [3, 0, 2, 5, 6]
    },
    teil2: {
      anweisung: 'Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.',
      texts: [
        {
          titel: 'Gesundheitstag in Lindenfeld',
          text: 'Am Samstag, dem 14. September, findet im Bürgerhaus Lindenfeld der große Gesundheitstag statt – von 10 bis 17 Uhr. Ärztinnen und Ärzte messen kostenlos Ihren Blutdruck und beantworten Fragen. Um 11 Uhr gibt es einen Vortrag über gesunde Ernährung im Alltag. Für Kinder gibt es einen Bewegungsparcours mit kleinen Preisen. Der Eintritt kostet 3 Euro, Kinder bis 14 Jahre sind frei. Im Café im Erdgeschoss bekommen Sie gesunde Snacks und frische Säfte.'
        },
        {
          titel: 'Schwimmbad Aquarena: Neue Öffnungszeiten',
          text: 'Ab Oktober öffnet die Aquarena von Montag bis Freitag schon um 6:30 Uhr – perfekt für alle, die vor der Arbeit schwimmen möchten. Am Wochenende öffnen wir um 9 Uhr. Neu ist auch der Frauenabend: Jeden Dienstag ab 19 Uhr ist das Bad nur für Frauen geöffnet. Bitte beachten Sie: Die Sauna bleibt im Oktober geschlossen, weil sie renoviert wird. Ab November können Sie dort wieder entspannen.'
        }
      ],
      questions: [
        {
          textIndex: 0,
          frage: 'Was kostet der Gesundheitstag für Erwachsene?',
          options: ['Nichts.', '3 Euro.', '14 Euro.'],
          answer: 1
        },
        {
          textIndex: 0,
          frage: 'Was können die Besucher kostenlos machen?',
          options: ['Den Blutdruck messen lassen.', 'Snacks und Säfte bekommen.', 'Einen Kochkurs besuchen.'],
          answer: 0
        },
        {
          textIndex: 0,
          frage: 'Wann beginnt der Vortrag über Ernährung?',
          options: ['Um 10 Uhr.', 'Um 17 Uhr.', 'Um 11 Uhr.'],
          answer: 2
        },
        {
          textIndex: 1,
          frage: 'Wann öffnet das Schwimmbad ab Oktober am Montag?',
          options: ['Um 6:30 Uhr.', 'Um 9 Uhr.', 'Um 19 Uhr.'],
          answer: 0
        },
        {
          textIndex: 1,
          frage: 'Warum ist die Sauna im Oktober geschlossen?',
          options: ['Sie ist zu klein.', 'Sie wird renoviert.', 'Es kommen zu wenige Gäste.'],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung: 'Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?',
      messages: [
        'Hallo Frau Wolf, ich muss unseren Termin am Donnerstag leider absagen. Ich habe Fieber und muss im Bett bleiben. Können wir einen neuen Termin machen? Viele Grüße, Selin Acar',
        'Hi Deniz, super Nachricht: Unser Volleyballteam hat am Samstag gewonnen! Jetzt spielen wir im Finale. Kommst du zuschauen? LG Robert',
        'Liebe Mitglieder, ab nächster Woche gibt es bei uns einen neuen Yogakurs, immer dienstags um 19 Uhr. Die erste Stunde ist gratis. Ihr Team von SportPlus',
        'Hallo Oma, der Arzt hat gesagt, mein Fuß ist nicht gebrochen! Ich muss nur eine Woche Pause machen, dann kann ich wieder Fußball spielen. Dein Milan',
        'Hallo Jana, ich habe zwei Karten für das Basketballspiel am Freitag. Hast du Lust mitzukommen? Das Spiel beginnt um 20 Uhr. Melde dich! Tom'
      ],
      headlines: [
        'Neuer Kurs im Angebot',
        'Gute Nachricht vom Arzt',
        'Einladung zu einem Spiel',
        'Schwimmbad bleibt geschlossen',
        'Termin wegen Krankheit abgesagt',
        'Team steht im Finale',
        'Fahrrad zu verkaufen',
        'Suche einen Trainingspartner'
      ],
      answers: [4, 5, 0, 1, 2]
    },
    teil4: {
      anweisung: 'Lesen Sie den Text. Sind die Aussagen richtig oder falsch?',
      titel: 'Endlich wieder fit',
      text: 'Vor einem Jahr hatte ich oft Rückenschmerzen, weil ich den ganzen Tag im Büro sitze. Mein Arzt sagte, dass ich mich mehr bewegen muss. Zuerst hatte ich keine Lust, denn nach der Arbeit war ich immer müde.\n\nDann hat mir eine Kollegin von ihrem Lauftreff erzählt. Ich bin einfach mitgegangen, und es hat mir sofort gefallen. Wir laufen zweimal pro Woche im Stadtpark, immer dienstags und freitags. Am Anfang konnte ich nur zehn Minuten laufen, heute schaffe ich schon eine ganze Stunde. Ich bin jetzt viel fitter als früher und habe auch drei Kilo abgenommen.\n\nAuch mein Essen habe ich geändert. Ich esse mehr Obst und Gemüse und trinke weniger Cola. Süßigkeiten gibt es nur noch am Wochenende. Das war am Anfang schwer, aber jetzt ist es ganz normal für mich.\n\nMeine Rückenschmerzen sind fast weg, und ich schlafe viel besser. Wenn das Wetter schlecht ist, mache ich zu Hause Gymnastik vor dem Fernseher. Mein Arzt ist sehr zufrieden, und meine Familie freut sich auch. Mein nächstes Ziel: Im Mai möchte ich beim Stadtlauf mitmachen, zusammen mit meiner Kollegin. Fünf Kilometer sind heute kein Problem mehr für mich.',
      statements: [
        { text: 'Der Autor hatte früher oft Rückenschmerzen.', answer: true },
        { text: 'Eine Kollegin hat ihm vom Lauftreff erzählt.', answer: true },
        { text: 'Der Lauftreff läuft dreimal pro Woche.', answer: false },
        { text: 'Der Autor isst jetzt mehr Süßigkeiten als früher.', answer: false },
        { text: 'Bei schlechtem Wetter macht er zu Hause Gymnastik.', answer: true }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: 'Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.',
      text: 'Lieber Jonas,\n\nwie geht es dir? Ich war letzte Woche krank und [1] drei Tage im Bett bleiben. Ich hatte Husten und Fieber. Meine Ärztin hat gesagt, dass ich viel Tee trinken [2]. Jetzt geht es [3] zum Glück wieder besser. Morgen gehe ich zum ersten Mal wieder [4] Training. Ich freue mich schon sehr, [5] ich meine Mannschaft vermisst habe. Spielst du am Samstag wieder mit [6]?\n\nViele Grüße\nEmre',
      gaps: [
        { options: ['musste', 'muss', 'müsst'], answer: 0 },
        { options: ['sollen', 'soll', 'sollst'], answer: 1 },
        { options: ['mir', 'mich', 'ich'], answer: 0 },
        { options: ['am', 'zur', 'zum'], answer: 2 },
        { options: ['dass', 'weil', 'ob'], answer: 1 },
        { options: ['uns', 'wir', 'unser'], answer: 0 }
      ]
    },
    teil2: {
      anweisung: 'Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.',
      text: 'Sehr geehrte Damen und Herren,\n\nich möchte gern Mitglied in Ihrem Fitnessstudio [1]. Ich habe eine Frage: Wie viel [2] die Mitgliedschaft pro Monat? Gibt es einen Rabatt für Studenten? Ich habe auch [3], dass es bei Ihnen Yogakurse gibt. Sind die Kurse im Preis dabei? Am liebsten möchte ich nach der Arbeit am [4] trainieren. Bitte schicken Sie mir mehr [5] per E-Mail. Vielen Dank für Ihre [6]!\n\nMit freundlichen Grüßen\nLea Winkler',
      wordBank: [
        'Abend',
        'kostet',
        'werden',
        'Morgen',
        'Informationen',
        'gelesen',
        'Hilfe',
        'kauft',
        'Fragen',
        'gegangen',
        'machen',
        'teuer'
      ],
      answers: [2, 1, 5, 0, 4, 6]
    },
    teil3: {
      anweisung: 'Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.',
      items: [
        {
          prompt: '"Was fehlt Ihnen denn?"',
          options: [
            'Ich habe seit gestern starke Halsschmerzen.',
            'Mir fehlt ein Rezept.',
            'Ich fühle mich sehr gut, danke.'
          ],
          answer: 0
        },
        {
          prompt: '"Treibst du regelmäßig Sport?"',
          options: [
            'Nein, Sport ist gesund.',
            'Ja, ich schwimme zweimal pro Woche.',
            'Ja, ich habe keinen Sport.'
          ],
          answer: 1
        },
        {
          prompt: '"Gute Besserung!"',
          options: ['Ja, sehr gern.', 'Bitte schön.', 'Danke schön!'],
          answer: 2
        },
        {
          prompt: '"Soll ich dir eine Schmerztablette holen?"',
          options: [
            'Ja, bitte. Mein Kopf tut sehr weh.',
            'Nein, ich habe keine Tabletten.',
            'Die Apotheke ist heute geschlossen.'
          ],
          answer: 0
        },
        {
          prompt: '"Wollen wir morgen zusammen schwimmen gehen?"',
          options: [
            'Nein, ich kann sehr gut schwimmen.',
            'Gern, aber erst am Nachmittag.',
            'Das Wasser war gestern kalt.'
          ],
          answer: 1
        }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: 'Sie hören vier kurze Ansagen. Richtig oder falsch?',
      items: [
        {
          audio:
            'Guten Tag, hier ist die Praxis Doktor Hoffmann. Unsere Sprechstunde ist heute nur bis zwölf Uhr. In dringenden Fällen rufen Sie bitte den ärztlichen Notdienst an. Ab morgen sind wir wieder wie gewohnt für Sie da.',
          statement: 'Die Praxis ist heute nur bis zwölf Uhr geöffnet.',
          answer: true
        },
        {
          audio:
            'Liebe Sportfreunde, herzlich willkommen im Stadion! Das Spiel beginnt heute fünfzehn Minuten später, also um fünfzehn Uhr fünfzehn. Bitte haben Sie noch etwas Geduld. Vielen Dank!',
          statement: 'Das Spiel beginnt pünktlich um fünfzehn Uhr.',
          answer: false
        },
        {
          audio:
            'Liebe Mitglieder, ein wichtiger Hinweis: Der Zumba-Kurs fällt heute leider aus, weil die Trainerin krank ist. Ab nächster Woche findet der Kurs wieder wie immer donnerstags statt.',
          statement: 'Der Zumba-Kurs fällt heute aus.',
          answer: true
        },
        {
          audio:
            'Liebe Kundinnen und Kunden, unsere Apotheke schließt in fünfzehn Minuten. Und denken Sie daran: Ab Montag finden Sie uns in der Gartenstraße acht, direkt neben der Bäckerei.',
          statement: 'Die Apotheke ist ab Montag in der Bahnhofstraße.',
          answer: false
        }
      ]
    },
    teil2: {
      anweisung: 'Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.',
      items: [
        {
          audio:
            'Und hier unser Gesundheitstipp: Trinken Sie am Tag ungefähr zwei Liter Wasser, besonders wenn Sie Sport machen. Kaffee und Cola sind übrigens kein Ersatz für Wasser.',
          frage: 'Wie viel Wasser soll man am Tag trinken?',
          options: ['Einen Liter.', 'Zwei Liter.', 'Drei Liter.'],
          answer: 1
        },
        {
          audio:
            'Radio Neustadt informiert: Am Sonntag findet der große Stadtlauf statt. Der Start ist um zehn Uhr am Rathaus. Wegen des Laufs sind viele Straßen im Zentrum bis vierzehn Uhr gesperrt.',
          frage: 'Wo startet der Stadtlauf?',
          options: ['Am Stadion.', 'Am Stadtpark.', 'Am Rathaus.'],
          answer: 2
        },
        {
          audio:
            'Das Wetter für das Wochenende: Am Samstag bleibt es trocken und warm, perfekt für Sport im Freien. Am Sonntag müssen Sie mit Gewittern rechnen, bleiben Sie am Nachmittag besser drinnen.',
          frage: 'Wie wird das Wetter am Samstag?',
          options: ['Trocken und warm.', 'Es gibt Gewitter.', 'Es wird kalt.'],
          answer: 0
        },
        {
          audio:
            'Eine Information für alle Badegäste: Das Hallenbad ist nächste Woche wegen der jährlichen Reinigung geschlossen. Das Freibad im Süden der Stadt ist aber täglich von neun bis zwanzig Uhr geöffnet.',
          frage: 'Warum ist das Hallenbad nächste Woche geschlossen?',
          options: ['Wegen einer Reinigung.', 'Wegen eines Festes.', 'Wegen des Wetters.'],
          answer: 0
        }
      ]
    },
    teil3: {
      anweisung: 'Sie hören vier kurze Gespräche. Richtig oder falsch?',
      items: [
        {
          audio: [
            { speaker: 'Kunde', text: 'Guten Tag, ich brauche bitte etwas gegen Husten.' },
            {
              speaker: 'Apothekerin',
              text: 'Gern. Dieser Saft hilft sehr gut. Nehmen Sie ihn dreimal am Tag nach dem Essen.'
            },
            { speaker: 'Kunde', text: 'Danke, dann nehme ich den.' }
          ],
          statement: 'Der Kunde soll den Saft dreimal am Tag nehmen.',
          answer: true
        },
        {
          audio: [
            { speaker: 'Anna', text: 'Hallo Ben, kommst du heute mit ins Fitnessstudio?' },
            {
              speaker: 'Ben',
              text: 'Heute nicht, mein Knie tut weh. Der Arzt hat gesagt, ich soll eine Woche Pause machen.'
            },
            { speaker: 'Anna', text: 'Oh, das tut mir leid. Dann gute Besserung!' }
          ],
          statement: 'Ben geht heute mit ins Fitnessstudio.',
          answer: false
        },
        {
          audio: [
            { speaker: 'Patientin', text: 'Guten Tag, ich möchte gern einen Termin bei Frau Doktor Lang.' },
            {
              speaker: 'Sprechstundenhilfe',
              text: 'Nächste Woche Dienstag um neun Uhr ist etwas frei. Passt das?'
            },
            { speaker: 'Patientin', text: 'Am Dienstag kann ich leider nicht. Geht auch Mittwoch?' },
            { speaker: 'Sprechstundenhilfe', text: 'Ja, am Mittwoch um elf Uhr. Dann trage ich Sie ein.' }
          ],
          statement: 'Die Patientin bekommt einen Termin am Mittwoch.',
          answer: true
        },
        {
          audio: [
            { speaker: 'Vater', text: 'Lina, hast du deine Schwimmsachen eingepackt?' },
            { speaker: 'Lina', text: 'Ja, Papa. Aber ich finde meine Schwimmbrille nicht.' },
            {
              speaker: 'Vater',
              text: 'Die liegt noch im Auto. Komm, wir müssen los, dein Kurs beginnt um vier Uhr.'
            }
          ],
          statement: 'Der Schwimmkurs beginnt um fünf Uhr.',
          answer: false
        }
      ]
    },
    teil4: {
      anweisung: 'Sie hören ein Interview. Kreuzen Sie an: a, b oder c.',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Herzlich willkommen bei Radio Fit! Heute ist Katja Brandt bei uns. Katja, du bist Schwimmtrainerin. Wie lange machst du diesen Beruf schon?'
        },
        {
          speaker: 'Katja',
          text: 'Seit acht Jahren. Zuerst habe ich Kinder trainiert, jetzt arbeite ich vor allem mit Erwachsenen, die schwimmen lernen wollen.'
        },
        { speaker: 'Moderator', text: 'Erwachsene, die nicht schwimmen können – gibt es davon viele?' },
        {
          speaker: 'Katja',
          text: 'Ja, mehr als man denkt. Viele hatten als Kind keine Möglichkeit, oder sie hatten Angst vor dem Wasser.'
        },
        { speaker: 'Moderator', text: 'Und wie lange dauert es, bis ein Erwachsener schwimmen kann?' },
        {
          speaker: 'Katja',
          text: 'Das ist verschieden. Die meisten brauchen ungefähr zehn Stunden, dann können sie sicher schwimmen.'
        },
        { speaker: 'Moderator', text: 'Was ist dein Tipp für unsere Hörerinnen und Hörer?' },
        {
          speaker: 'Katja',
          text: 'Gehen Sie regelmäßig schwimmen, am besten einmal pro Woche. Schwimmen ist gesund für den Rücken, und man kann es bis ins hohe Alter machen.'
        }
      ],
      questions: [
        {
          frage: 'Wie lange arbeitet Katja schon als Trainerin?',
          options: ['Seit acht Jahren.', 'Seit zehn Jahren.', 'Seit einem Jahr.'],
          answer: 0
        },
        {
          frage: 'Mit wem arbeitet Katja heute vor allem?',
          options: ['Mit Kindern.', 'Mit Erwachsenen.', 'Mit alten Menschen.'],
          answer: 1
        },
        {
          frage: 'Wie viele Stunden brauchen die meisten Erwachsenen?',
          options: ['Ungefähr fünf Stunden.', 'Ungefähr acht Stunden.', 'Ungefähr zehn Stunden.'],
          answer: 2
        },
        {
          frage: 'Wie oft soll man laut Katja schwimmen gehen?',
          options: ['Jeden Tag.', 'Einmal pro Woche.', 'Einmal pro Monat.'],
          answer: 1
        }
      ]
    },
    teil5: {
      anweisung: 'Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.',
      audio:
        'Guten Tag, hier spricht Herr Lindner von der Praxis Physio Aktiv. Ihre Behandlung am Montag müssen wir leider verschieben. Der neue Termin ist am Donnerstag um Viertel nach acht. Bitte bringen Sie bequeme Sportkleidung und ein Handtuch mit. Wenn Sie Fragen haben, erreichen Sie uns unter null vier null, sieben sieben zwei drei. Vielen Dank und auf Wiederhören!',
      noteTitle: 'Notiz: Anruf von der Physiopraxis',
      gaps: [
        { label: 'Es ruft an: Herr ____', answer: 'Lindner', alt: [] },
        { label: 'Neuer Termin: am ____', answer: 'Donnerstag', alt: ['donnerstag'] },
        {
          label: 'Uhrzeit: ____ Uhr',
          answer: '8:15',
          alt: ['8.15', 'Viertel nach acht', 'viertel nach acht', '08:15', '815']
        },
        { label: 'Mitbringen: Sportkleidung und ____', answer: 'Handtuch', alt: ['ein Handtuch'] }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).',
    situation: 'Ihr Freund Karim hat Ihnen geschrieben. Er möchte mit Ihnen zusammen Sport machen.',
    incomingEmail: {
      von: 'karim.said@web.de',
      betreff: 'Zusammen Sport machen?',
      text: 'Hallo!\n\nIch sitze zu viel am Schreibtisch und möchte endlich mehr Sport machen. Aber alleine habe ich keine Lust. Hast du Zeit und Lust, mit mir zu trainieren? Welcher Sport passt für uns, und wann können wir anfangen? Brauche ich besondere Sachen?\n\nViele Grüße\nKarim'
    },
    points: [
      'Sagen Sie: Sie machen gern mit.',
      'Schlagen Sie einen Sport und einen Tag vor.',
      'Schreiben Sie, was Karim mitbringen soll.'
    ],
    musterloesung:
      'Hallo Karim,\n\ndanke für deine Nachricht! Ich finde deine Idee super und mache sehr gern mit. Wollen wir zusammen joggen gehen? Das kostet nichts, und wir können im Park laufen. Am Dienstag um 18 Uhr habe ich Zeit. Bring bitte gute Sportschuhe und eine Flasche Wasser mit. Ich freue mich schon!\n\nBis Dienstag!\nViele Grüße',
    tipps:
      "Answer all three points and connect your ideas with 'und', 'aber' or 'weil'. A concrete suggestion (sport + day + time) makes point two easy to fulfil."
  },

  sprechen: {
    teil1: {
      anweisung: 'Stellen Sie sich vor. Sprechen Sie über die Punkte.',
      punkte: ['Name', 'Alter', 'Wohnort', 'Familie', 'Arbeit / Beruf', 'Sprachen', 'Hobbys'],
      redemittel: [
        'Ich heiße ... / Mein Name ist ...',
        'Ich bin ... Jahre alt.',
        'Ich wohne in ... / Ich komme aus ...',
        'Ich bin verheiratet. / Ich lebe allein.',
        'Ich arbeite als ... / Ich bin ... von Beruf.',
        'Ich spreche ... und ein bisschen ...',
        'In meiner Freizeit mache ich gern Sport.'
      ]
    },
    teil2: {
      thema: 'Sport und Gesundheit',
      anweisung: 'Sprechen Sie über das Thema. Die Fragen helfen Ihnen.',
      leitfragen: [
        'Welchen Sport machen Sie oder mögen Sie?',
        'Was machen Sie, wenn Sie krank sind?',
        'Was essen und trinken Sie, um gesund zu bleiben?',
        'Finden Sie Sport wichtig? Warum (nicht)?'
      ],
      redemittel: [
        'Ich mache gern ..., weil ...',
        'Wenn ich krank bin, ... ich ...',
        'Ich versuche, viel ... zu essen.',
        'Ich finde Sport (nicht so) wichtig, denn ...',
        'Machst du auch Sport?'
      ]
    },
    teil3: {
      aufgabe: 'Planen Sie zusammen einen Sporttag mit Freunden.',
      anweisung: 'Planen Sie gemeinsam. Sprechen Sie über die Punkte.',
      punkte: [
        'Wann? (Tag und Uhrzeit)',
        'Welcher Sport?',
        'Wo? (Park, Sporthalle, Schwimmbad?)',
        'Was brauchen wir? (Essen, Getränke, Bälle?)'
      ],
      redemittel: [
        'Wollen wir am ... einen Sporttag machen?',
        'Wie wäre es mit Volleyball?',
        'Das ist eine gute Idee!',
        'Ich bin nicht sicher. Vielleicht lieber ...',
        'Wer bringt die Getränke mit?',
        'Gut, dann machen wir das so.'
      ]
    }
  }
} as const satisfies DualLevelExam;

export default exam;
