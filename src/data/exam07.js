export default {
  id: 7,
  title: "Modelltest 7",
  difficulty: "medium",
  level: "A2+ · mittel",
  theme: "Schule, Lernen & Sprachen",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Sie möchten Spanisch lernen, haben aber nur am Samstag Zeit.",
        "Ihre Tochter (12 Jahre) braucht Hilfe in Mathematik.",
        "Sie möchten Ihr Englisch mit Muttersprachlern üben, aber keinen Kurs besuchen.",
        "Sie arbeiten abends und möchten deshalb flexibel am Computer Deutsch lernen.",
        "Sie suchen günstige gebrauchte Bücher für Ihr Studium."
      ],
      ads: [
        "Nachhilfe-Institut Lernwerk: Erfahrene Lehrerinnen und Lehrer helfen bei Mathe, Physik und Deutsch. Für Schüler von Klasse 5 bis 13. Erste Stunde kostenlos!",
        "Stadtbücherei: Lange Nacht des Vorlesens am Freitag ab 19 Uhr. Bekannte Autoren lesen aus ihren Büchern. Eintritt frei!",
        "Sprachschule Mundo: Spanisch für Anfänger – Kompaktkurs jeden Samstag von 10 bis 13 Uhr. Kleine Gruppen, Einstieg jederzeit möglich.",
        "Antiquariat Bücherwurm: An- und Verkauf gebrauchter Bücher. Große Auswahl an Fachbüchern für Studium und Schule zu kleinen Preisen. Di–Sa 10–18 Uhr.",
        "Musikschule Tonleiter: Gitarren- und Klavierunterricht für Kinder und Erwachsene. Jetzt Probestunde vereinbaren!",
        "Sprachcafé International: Jeden Donnerstag ab 19 Uhr im Café Luna. Sprechen Sie Englisch mit Muttersprachlern – ohne Kurs, ohne Anmeldung, kostenlos!",
        "Deutsch online lernen mit der Sprachschule Aktiv: Lernen Sie flexibel am Computer, wann Sie wollen. Kurse von A1 bis B2 mit Video-Lektionen und Tests.",
        "Schreibwaren Pelikan: Alles für den Schulanfang – Hefte, Stifte, Schulranzen. Diese Woche 20 % Rabatt auf alle Ranzen!"
      ],
      answers: [2, 0, 5, 6, 3]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Elternbrief: Projektwoche an der Goethe-Schule",
          text: "Liebe Eltern, vom 16. bis zum 20. März findet an unserer Schule die Projektwoche statt. In dieser Woche gibt es keinen normalen Unterricht. Die Schülerinnen und Schüler arbeiten in Gruppen zu den Themen Umwelt, Theater und gesunde Küche. Am Freitag ab 15 Uhr zeigen die Kinder ihre Ergebnisse in der Aula – alle Eltern sind herzlich eingeladen. Der Unterricht endet in der Projektwoche jeden Tag um 13 Uhr. Die Mensa bleibt wie gewohnt geöffnet."
        },
        {
          titel: "Die neue Mediathek der Volkshochschule",
          text: "Die Volkshochschule hat jetzt eine eigene Mediathek. Kursteilnehmer können hier kostenlos Lehrbücher, Wörterbücher und Filme in zwölf Sprachen ausleihen. Die Mediathek ist dienstags und donnerstags von 14 bis 19 Uhr geöffnet. Wer möchte, kann außerdem an einem der vier Computer arbeiten und Übungen machen. Einmal im Monat, immer am letzten Donnerstag, gibt es einen Konversationsabend für Deutschlerner. Die Teilnahme kostet 2 Euro, Getränke sind inklusive."
        }
      ],
      questions: [
        { textIndex: 0, frage: "Was machen die Schüler in der Projektwoche?", options: ["Sie arbeiten in Gruppen.", "Sie haben normalen Unterricht.", "Sie machen eine Klassenfahrt."], answer: 0 },
        { textIndex: 0, frage: "Wann können die Eltern die Ergebnisse sehen?", options: ["Am Montag um 13 Uhr.", "Am Freitag ab 15 Uhr.", "Jeden Tag in der Mensa."], answer: 1 },
        { textIndex: 0, frage: "Wann endet der Unterricht in der Projektwoche?", options: ["Um 13 Uhr.", "Um 15 Uhr.", "Um 16 Uhr."], answer: 0 },
        { textIndex: 1, frage: "Was kostet das Ausleihen in der Mediathek?", options: ["2 Euro.", "12 Euro.", "Nichts."], answer: 2 },
        { textIndex: 1, frage: "Wie oft gibt es den Konversationsabend?", options: ["Jeden Donnerstag.", "Einmal im Monat.", "Zweimal pro Woche."], answer: 1 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Hallo Frau Demir, ich schaffe es heute leider nicht zum Deutschkurs, mein Sohn ist krank. Können Sie mir die Hausaufgaben per E-Mail schicken? Danke! Amira",
        "Hi Jonas, ich habe die Matheprüfung bestanden – eine Zwei! Danke für deine Hilfe beim Lernen. Ich lade dich am Freitag auf eine Pizza ein. LG Furkan",
        "Liebe Kursteilnehmer, der Englischkurs am Mittwoch beginnt ausnahmsweise erst um 19 Uhr, weil Raum 12 besetzt ist. Wir treffen uns dann in Raum 8. Ihre Volkshochschule",
        "Hallo Selma, ich verkaufe meine Bücher vom letzten Semester, auch das Grammatikbuch, das du so gut fandest. Willst du es für 10 Euro haben? Grüße, Vera",
        "Hallo Mama, vergiss nicht: Morgen ist bei uns Elternabend, um 18:30 Uhr in der Schule. Papa kann nicht, kannst du kommen? Dein Leon"
      ],
      headlines: [
        "Prüfung bestanden",
        "Kurs beginnt später",
        "Neuer Lehrer an der Schule",
        "Entschuldigung für den Kurs",
        "Buch zu verkaufen",
        "Erinnerung an den Elternabend",
        "Bibliothek sucht Helfer",
        "Kurs fällt aus"
      ],
      answers: [3, 0, 1, 4, 5]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Drei Sprachen, drei Welten",
      text: "Als ich vor vier Jahren nach Deutschland kam, konnte ich nur zwei Wörter Deutsch: \"Hallo\" und \"Danke\". Heute spreche ich die Sprache fast fließend. Der Weg dahin war aber nicht leicht.\n\nAm Anfang habe ich einen Integrationskurs besucht, jeden Vormittag vier Stunden. Die Grammatik fand ich besonders schwer, obwohl ich zu Hause in Brasilien immer gut in der Schule war. Artikel wie \"der, die, das\" gibt es im Portugiesischen auch, aber man muss sie hier ganz neu lernen. Meine Lehrerin hatte einen guten Tipp: Lernen Sie jedes Wort immer zusammen mit dem Artikel.\n\nNach dem Kurs habe ich mir eine Arbeit in einem Kindergarten gesucht. Das war die beste Entscheidung, denn Kinder sprechen einfach und korrigieren dich ganz ohne Probleme. Wenn ich ein Wort falsch sage, lachen wir zusammen, und ich merke es mir sofort.\n\nSeit einem Jahr lerne ich jetzt auch noch Französisch an der Volkshochschule, zweimal pro Woche am Abend. Mein Mann findet das verrückt, aber ich sage immer: Jede Sprache ist eine neue Welt. Mein großer Traum ist es, eines Tages als Erzieherin zu arbeiten. Dafür brauche ich das B2-Zertifikat. Diese Prüfung möchte ich im nächsten Herbst machen.",
      statements: [
        { text: "Die Autorin konnte am Anfang nur zwei Wörter Deutsch.", answer: true },
        { text: "Der Integrationskurs war jeden Nachmittag.", answer: false },
        { text: "Die Autorin arbeitet in einem Kindergarten.", answer: true },
        { text: "Sie lernt seit einem Jahr auch Spanisch.", answer: false },
        { text: "Sie möchte im nächsten Herbst die B2-Prüfung machen.", answer: true }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Sehr geehrte Frau Krüger,\n\nich interessiere mich [1] Ihren Italienischkurs am Dienstagabend. Ich habe vor zwei Jahren schon einen Kurs gemacht, [2] ich habe leider viel vergessen. Können Sie mir sagen, [3] der Kurs für Anfänger richtig ist? Ich arbeite bis 17 Uhr und kann erst [4] 18 Uhr da sein. Ist das ein Problem? Ich würde mich auch gern vor dem Kursbeginn kurz mit Ihnen [5]. Bitte rufen Sie [6] unter 0176 334455 an.\n\nMit freundlichen Grüßen\nDavid Oyelaran",
      gaps: [
        { options: ["für", "über", "an"], answer: 0 },
        { options: ["weil", "aber", "oder"], answer: 1 },
        { options: ["dass", "wenn", "ob"], answer: 2 },
        { options: ["seit", "um", "nach"], answer: 1 },
        { options: ["treffen", "trifft", "triffst"], answer: 0 },
        { options: ["ich", "mir", "mich"], answer: 2 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Liebe Frau Sanchez,\n\nvielen Dank für den tollen Unterricht in diesem [1]! Ich habe viel gelernt und kann jetzt viel [2] sprechen als vorher. Besonders die Spiele und Lieder haben mir gut [3]. Im Januar möchte ich den nächsten Kurs [4]. Können Sie mir sagen, welche [5] ich dafür kaufen muss? Ich wünsche Ihnen schöne Ferien und eine gute [6]!\n\nHerzliche Grüße\nIhre Kursteilnehmerin Marta",
      wordBank: ["besser", "gefallen", "Semester", "Erholung", "Bücher", "besuchen", "schlechter", "Wörter", "gekauft", "Prüfung", "lernen", "gehört"],
      answers: [2, 0, 1, 5, 4, 3]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Wie lange lernst du schon Deutsch?\"", options: ["Seit ungefähr zwei Jahren.", "Vor zwei Jahren.", "In zwei Jahren."], answer: 0 },
        { prompt: "\"Kannst du mir deine Notizen aus dem Kurs geben?\"", options: ["Nein, ich mag den Kurs sehr.", "Ja, die Notizen waren teuer.", "Klar, ich schicke dir heute Abend ein Foto."], answer: 2 },
        { prompt: "\"Und, wie war deine Prüfung?\"", options: ["Die Prüfung ist morgen um neun.", "Ich glaube, ganz gut. Das Ergebnis kommt nächste Woche.", "Ja, ich lerne sehr viel."], answer: 1 },
        { prompt: "\"Entschuldigung, was bedeutet dieses Wort?\"", options: ["Das Wort hat sieben Buchstaben.", "Das weiß ich auch nicht. Fragen wir die Lehrerin!", "Ich finde Wörter sehr wichtig."], answer: 1 },
        { prompt: "\"Kommst du morgen mit in die Bibliothek zum Lernen?\"", options: ["Gute Idee, dann lernen wir zusammen für den Test.", "Die Bibliothek hat sehr viele Bücher.", "Nein, ich war gestern schon dort, es war schön."], answer: 0 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Guten Tag, hier ist die Volkshochschule am Ring. Unser Büro ist in den Sommerferien nur vormittags von neun bis zwölf Uhr geöffnet. Anmeldungen für die neuen Kurse sind aber jederzeit online möglich.",
          statement: "Das Büro ist in den Ferien am Nachmittag geöffnet.",
          answer: false
        },
        {
          audio: "Liebe Schülerinnen und Schüler, eine Durchsage: Die sechste Stunde fällt heute für alle Klassen aus, weil eine Lehrerkonferenz stattfindet. Der Unterricht endet also schon um dreizehn Uhr zehn.",
          statement: "Der Unterricht endet heute um dreizehn Uhr zehn.",
          answer: true
        },
        {
          audio: "Liebe Besucherinnen und Besucher, die Bibliothek schließt heute in einer halben Stunde. Bitte bringen Sie Ihre Bücher zur Ausleihe im Erdgeschoss. Wir öffnen morgen wieder um zehn Uhr.",
          statement: "Die Bibliothek öffnet morgen um zehn Uhr.",
          answer: true
        },
        {
          audio: "Eine Information für alle Teilnehmer der Deutschprüfung: Die Prüfung beginnt um neun Uhr. Bitte seien Sie aber schon um halb neun im Prüfungsraum. Handys müssen ausgeschaltet sein und bleiben in der Tasche.",
          statement: "Die Teilnehmer sollen schon um acht Uhr im Raum sein.",
          answer: false
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Ein Tipp für alle Eltern: Am Samstag ist Tag der offenen Tür an der städtischen Musikschule. Kinder können von zehn bis sechzehn Uhr alle Instrumente ausprobieren. Der Eintritt ist frei.",
          frage: "Was können Kinder am Samstag machen?",
          options: ["Instrumente ausprobieren.", "Ein Konzert geben.", "Instrumente kaufen."],
          answer: 0
        },
        {
          audio: "Und jetzt eine Meldung für alle Studierenden: Die Universitätsbibliothek ist in der Prüfungszeit länger geöffnet, nämlich bis Mitternacht. Das Angebot gilt von Montag bis Samstag.",
          frage: "Wie lange ist die Bibliothek in der Prüfungszeit geöffnet?",
          options: ["Bis zweiundzwanzig Uhr.", "Bis Mitternacht.", "Bis zwanzig Uhr."],
          answer: 1
        },
        {
          audio: "Radio Campus informiert: Die Anmeldung für die Sommersprachkurse beginnt am ersten April. Die Plätze sind erfahrungsgemäß schnell weg, besonders für Spanisch und Japanisch. Melden Sie sich also früh an!",
          frage: "Wann beginnt die Anmeldung?",
          options: ["Am ersten August.", "Am ersten Juli.", "Am ersten April."],
          answer: 2
        },
        {
          audio: "Eine Durchsage der Stadtverwaltung: Wegen des Lehrerstreiks bleiben am Donnerstag alle Grundschulen der Stadt geschlossen. Die Kindergärten sind dagegen normal geöffnet.",
          frage: "Was ist am Donnerstag geschlossen?",
          options: ["Die Kindergärten.", "Die Grundschulen.", "Alle Schulen und Kindergärten."],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Timo", text: "Frau Weber, ich habe meine Hausaufgaben zu Hause vergessen. Kann ich sie morgen mitbringen?" },
            { speaker: "Frau Weber", text: "In Ordnung, Timo. Aber bitte nur dieses eine Mal. Leg sie mir morgen früh auf den Tisch." },
            { speaker: "Timo", text: "Mache ich, versprochen!" }
          ],
          statement: "Timo darf die Hausaufgaben morgen mitbringen.",
          answer: true
        },
        {
          audio: [
            { speaker: "Ines", text: "Und, wie läuft dein Japanischkurs?" },
            { speaker: "Marie", text: "Das Sprechen macht mir Spaß, aber die Schrift finde ich total schwierig. Ich übe jeden Tag eine halbe Stunde." },
            { speaker: "Ines", text: "Respekt! Das ist wirklich viel." }
          ],
          statement: "Marie findet die japanische Schrift leicht.",
          answer: false
        },
        {
          audio: [
            { speaker: "Vater", text: "Und, wie war der erste Tag an der neuen Schule?" },
            { speaker: "Tochter", text: "Richtig gut! Meine Klasse ist nett, und ich sitze neben einem Mädchen aus Italien. Sie heißt Giulia." },
            { speaker: "Vater", text: "Das freut mich. Und die Lehrer?" },
            { speaker: "Tochter", text: "Der Mathelehrer ist streng, aber auch lustig." }
          ],
          statement: "Die Tochter sitzt neben einem Mädchen aus Italien.",
          answer: true
        },
        {
          audio: [
            { speaker: "Teilnehmer", text: "Guten Tag, ich möchte mich für einen Deutschkurs anmelden." },
            { speaker: "Mitarbeiterin", text: "Gern. Haben Sie schon einen Einstufungstest gemacht?" },
            { speaker: "Teilnehmer", text: "Nein, noch nicht." },
            { speaker: "Mitarbeiterin", text: "Dann machen Sie bitte zuerst den Test, er dauert nur dreißig Minuten. Danach kann ich Sie anmelden." }
          ],
          statement: "Der Teilnehmer hat den Einstufungstest schon gemacht.",
          answer: false
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderator", text: "Herzlich willkommen bei Radio Campus! Unser Gast heute ist Aylin Kaya. Aylin, du sprichst fünf Sprachen. Welche denn?" },
        { speaker: "Aylin", text: "Türkisch und Deutsch sind meine Muttersprachen. Dazu kommen Englisch, Spanisch und seit zwei Jahren auch Koreanisch." },
        { speaker: "Moderator", text: "Koreanisch – wie kam es denn dazu?" },
        { speaker: "Aylin", text: "Durch Musik! Ich höre gern koreanische Popmusik und wollte die Texte verstehen. Zuerst habe ich mit einer App gelernt, jetzt besuche ich einen Kurs an der Volkshochschule." },
        { speaker: "Moderator", text: "Wie viel Zeit brauchst du für das Lernen?" },
        { speaker: "Aylin", text: "Ich lerne jeden Morgen zwanzig Minuten, vor dem Frühstück. Das klingt wenig, aber es funktioniert, weil ich es wirklich jeden Tag mache." },
        { speaker: "Moderator", text: "Und was ist dein wichtigster Tipp für unsere Hörer?" },
        { speaker: "Aylin", text: "Keine Angst vor Fehlern! Ich habe am Anfang sehr viele Fehler gemacht. Aber wer nicht spricht, lernt auch nicht. Sucht euch Freunde, die die Sprache sprechen." }
      ],
      questions: [
        { frage: "Wie viele Sprachen spricht Aylin?", options: ["Drei.", "Vier.", "Fünf."], answer: 2 },
        { frage: "Warum hat Aylin mit Koreanisch angefangen?", options: ["Wegen der Musik.", "Wegen einer Reise.", "Wegen der Arbeit."], answer: 0 },
        { frage: "Wann lernt Aylin?", options: ["Am Abend.", "Jeden Morgen.", "Nur am Wochenende."], answer: 1 },
        { frage: "Was ist Aylins wichtigster Tipp?", options: ["Viel Grammatik lernen.", "Keine Angst vor Fehlern haben.", "Jeden Tag fernsehen."], answer: 1 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Hallo, hier spricht Frau Vogel von der Sprachschule Lingua. Ich rufe an wegen Ihres Einstufungstests. Der Test ist am Mittwoch um halb fünf am Nachmittag bei uns in der Schule, in Raum zwölf. Bitte bringen Sie einen Kugelschreiber und Ihren Ausweis mit. Der Test dauert ungefähr fünfundvierzig Minuten. Wenn Sie den Termin nicht schaffen, rufen Sie bitte zurück unter null drei null, sechs sechs neun eins. Danke und bis Mittwoch!",
      noteTitle: "Notiz: Anruf von der Sprachschule",
      gaps: [
        { label: "Es ruft an: Frau ____", answer: "Vogel", alt: [] },
        { label: "Einstufungstest am: ____", answer: "Mittwoch", alt: ["mittwoch"] },
        { label: "Uhrzeit: ____ Uhr", answer: "16:30", alt: ["16.30", "halb fünf", "halb 5", "4:30", "4.30", "1630"] },
        { label: "Raum: ____", answer: "12", alt: ["zwölf", "Raum 12"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihr Freund Pavel hat Ihnen geschrieben. Er möchte Deutsch lernen und bittet Sie um Tipps.",
    incomingEmail: {
      von: "pavel.horak@seznam.cz",
      betreff: "Wie hast du Deutsch gelernt?",
      text: "Hallo!\n\nStell dir vor: Ich habe eine Arbeit in Düsseldorf gefunden und ziehe im Januar nach Deutschland! Aber mein Deutsch ist noch nicht gut. Du lernst doch schon lange Deutsch – wie hast du das gemacht? Welcher Kurs ist gut, und was kann ich jetzt schon zu Hause machen?\n\nViele Grüße\nPavel"
    },
    points: [
      "Gratulieren Sie Pavel zur neuen Arbeit.",
      "Empfehlen Sie einen Kurs oder eine Lernmethode.",
      "Geben Sie einen Tipp, was Pavel zu Hause machen kann."
    ],
    musterloesung: "Hallo Pavel,\n\nherzlichen Glückwunsch zur neuen Arbeit, das ist super! Ich habe an der Volkshochschule einen Abendkurs gemacht. Das war günstig, und die Lehrer waren sehr gut. Zu Hause kannst du jeden Tag zehn Minuten mit einer App lernen und deutsche Filme mit Untertiteln sehen. Wenn du hier bist, üben wir zusammen!\n\nViele Grüße",
    tipps: "Start with the congratulation, then give one clear recommendation per point. Simple connectors like 'und', 'aber' and one 'wenn' clause are enough to score well."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Ich heiße ... / Mein Name ist ...",
        "Ich bin ... Jahre alt.",
        "Ich wohne in ... / Ich komme aus ...",
        "Meine Familie ist ... / Ich habe ...",
        "Ich arbeite als ... / Ich gehe noch zur Schule.",
        "Ich spreche ... , ... und ein bisschen ...",
        "Mein Hobby ist ... / Ich lese gern."
      ]
    },
    teil2: {
      thema: "Sprachen lernen",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Welche Sprachen sprechen Sie?",
        "Wie und wo haben Sie Deutsch gelernt?",
        "Was ist für Sie beim Sprachenlernen schwer?",
        "Welche Sprache möchten Sie noch lernen? Warum?"
      ],
      redemittel: [
        "Ich spreche ... und ...",
        "Deutsch habe ich ... gelernt.",
        "Für mich ist ... am schwersten, weil ...",
        "Ich möchte gern ... lernen, denn ...",
        "Wie lernst du am liebsten?"
      ]
    },
    teil3: {
      aufgabe: "Planen Sie zusammen einen Lernabend für Ihren Deutschkurs.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Wann? (Tag und Uhrzeit)", "Wo? (bei wem zu Hause oder in der Schule?)", "Was üben wir? (Grammatik, Sprechen, Hören?)", "Was essen und trinken wir?"],
      redemittel: [
        "Wollen wir uns am ... treffen?",
        "Wie wäre es bei mir zu Hause?",
        "Gute Idee!",
        "Ich glaube, wir sollten vor allem ... üben.",
        "Wer bringt etwas zu essen mit?",
        "Gut, dann machen wir das so."
      ]
    }
  }
};
