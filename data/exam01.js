window.TELC_EXAMS = window.TELC_EXAMS || [];
window.TELC_EXAMS.push({
  id: 1,
  title: "Modelltest 1",
  difficulty: "easy",
  level: "A2 · leicht",
  theme: "Alltag & Familie",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Sie suchen eine kleine Wohnung in der Stadt.",
        "Ihr Sohn (8 Jahre) möchte schwimmen lernen.",
        "Sie möchten am Wochenende günstig Obst und Gemüse kaufen.",
        "Ihr Fahrrad ist kaputt und Sie brauchen Hilfe.",
        "Sie suchen einen Deutschkurs am Abend."
      ],
      ads: [
        "Schwimmschule Delfin: Kurse für Kinder von 6 bis 12 Jahren. Jeden Samstag im Hallenbad Nord. Jetzt anmelden!",
        "Restaurant Sonne: Jeden Mittag Menü für nur 8,90 Euro. Montag bis Freitag, 12–15 Uhr.",
        "2-Zimmer-Wohnung im Zentrum, 52 m², Balkon, ab sofort frei. 650 Euro kalt. Tel. 0171 2334455.",
        "Fahrrad-Werkstatt Pedal: Wir reparieren schnell und günstig. Mo–Sa 9–18 Uhr, Bahnhofstraße 12.",
        "Autohaus Meier: Gebrauchte Autos ab 3.000 Euro. Große Auswahl, gute Preise!",
        "Wochenmarkt am Rathausplatz: Frisches Obst und Gemüse direkt vom Bauern. Samstag 8–14 Uhr, günstige Preise!",
        "Volkshochschule: Deutsch A2 für Anfänger. Dienstag und Donnerstag, 18:30–20:00 Uhr. Anmeldung online.",
        "Sportverein Blau-Weiß: Fußball für Erwachsene, Training Mittwoch 19 Uhr."
      ],
      answers: [2, 0, 5, 3, 6]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Information: Stadtbibliothek",
          text: "Die Stadtbibliothek ist von Montag bis Freitag von 10 bis 19 Uhr geöffnet, am Samstag von 10 bis 14 Uhr. Kinder und Schüler zahlen nichts. Erwachsene zahlen 20 Euro pro Jahr. Sie können Bücher für vier Wochen ausleihen. Filme und Spiele bekommen Sie für eine Woche. Am ersten Sonntag im Monat gibt es ein Vorlesen für Kinder ab 4 Jahren. Der Eintritt ist frei."
        },
        {
          titel: "Neues Café im Stadtpark",
          text: "Seit Mai hat der Stadtpark ein neues Café. Das \"Café am See\" ist täglich von 9 bis 18 Uhr geöffnet. Es gibt Kuchen, kleine Gerichte und viele Getränke. Familien mit Kindern sind willkommen: Neben dem Café gibt es einen Spielplatz. Wer draußen sitzen möchte, findet 40 Plätze mit Blick auf den See. Am Montag ist das Café geschlossen."
        }
      ],
      questions: [
        { textIndex: 0, frage: "Wie lange kann man Bücher ausleihen?", options: ["Eine Woche.", "Vier Wochen.", "Ein Jahr."], answer: 1 },
        { textIndex: 0, frage: "Was kostet die Bibliothek für Schüler?", options: ["Nichts.", "20 Euro pro Jahr.", "4 Euro pro Monat."], answer: 0 },
        { textIndex: 0, frage: "Was gibt es am ersten Sonntag im Monat?", options: ["Einen Filmabend.", "Ein Vorlesen für Kinder.", "Einen Bücherflohmarkt."], answer: 1 },
        { textIndex: 1, frage: "Wann ist das Café geschlossen?", options: ["Am Sonntag.", "Am Montag.", "Im Mai."], answer: 1 },
        { textIndex: 1, frage: "Was gibt es neben dem Café?", options: ["Einen Spielplatz.", "Ein Schwimmbad.", "Einen Parkplatz."], answer: 0 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Hallo Tim, ich kann heute nicht zum Training kommen. Ich bin krank und liege im Bett. Vielleicht bis nächste Woche! Gruß, Jonas",
        "Liebe Frau Schmidt, Ihr Paket ist da. Es liegt bei uns im Büro im Erdgeschoss. Sie können es bis 18 Uhr abholen. Ihre Hausverwaltung",
        "Hi Lena, super Nachricht: Ich habe die neue Arbeit! Ich fange am Montag an. Das müssen wir feiern! Lade dich zum Essen ein. Deine Mia",
        "Hallo Papa, mein Zug hat 40 Minuten Verspätung. Ich bin erst um 21:10 Uhr am Bahnhof. Kannst du mich später abholen? Danke! Emma",
        "Liebe Nachbarn, am Samstag machen wir ein kleines Fest im Hof. Ab 15 Uhr gibt es Kaffee und Kuchen. Kommen Sie gern vorbei! Familie Öztürk"
      ],
      headlines: [
        "Einladung zum Hoffest",
        "Neue Wohnung gefunden",
        "Zug kommt später an",
        "Absage: krank",
        "Einladung zum Geburtstag",
        "Paket abholen",
        "Neue Stelle gefunden",
        "Training fällt aus"
      ],
      answers: [3, 5, 6, 2, 0]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Mein Sonntag mit der Familie",
      text: "Sonntag ist für unsere Familie der wichtigste Tag in der Woche. Wir stehen spät auf und frühstücken zusammen. Mein Mann kauft am Morgen frische Brötchen, und ich mache Kaffee und Tee. Unsere Kinder, Ali und Sara, decken den Tisch.\n\nNach dem Frühstück gehen wir oft in den Park. Die Kinder fahren Fahrrad, und wir gehen spazieren. Wenn das Wetter schlecht ist, bleiben wir zu Hause und spielen Karten oder sehen einen Film.\n\nAm Nachmittag kommt manchmal meine Mutter zu Besuch. Sie bringt immer einen Kuchen mit. Die Kinder lieben ihren Apfelkuchen. Am Abend kochen wir zusammen. Sonntag ist Pasta-Tag: Es gibt immer Nudeln, das ist bei uns Tradition. Um neun Uhr gehen die Kinder ins Bett, denn am Montag beginnt wieder die Schule.",
      statements: [
        { text: "Die Familie frühstückt am Sonntag zusammen.", answer: true },
        { text: "Die Kinder kaufen die Brötchen.", answer: false },
        { text: "Bei schlechtem Wetter bleibt die Familie zu Hause.", answer: true },
        { text: "Die Großmutter bringt immer einen Apfelkuchen mit.", answer: true },
        { text: "Am Sonntagabend isst die Familie immer Pizza.", answer: false }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Liebe Carla,\n\nviele Grüße aus Hamburg! Ich [1] seit einer Woche hier und die Stadt gefällt [2] sehr gut. Am Morgen gehe ich in [3] Sprachschule, am Nachmittag habe ich frei. Gestern [4] ich im Hafen und habe viele Schiffe gesehen. Morgen möchte ich [5] Museum gehen. Und du? Hast du Lust, mich [6] Wochenende zu besuchen?\n\nLiebe Grüße\nSofia",
      gaps: [
        { options: ["bin", "bist", "ist"], answer: 0 },
        { options: ["mich", "mir", "ich"], answer: 1 },
        { options: ["der", "die", "das"], answer: 1 },
        { options: ["war", "bin", "habe"], answer: 0 },
        { options: ["ins", "im", "am"], answer: 0 },
        { options: ["im", "am", "um"], answer: 1 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Hallo Herr Braun,\n\nich habe eine [1] an Sie. Meine Waschmaschine ist [2] und funktioniert nicht mehr. Können Sie diese Woche [3] und sie reparieren? Ich bin jeden Tag ab 17 Uhr zu [4]. Am besten rufen Sie mich kurz [5]. Meine Nummer: 0170 5566778. Vielen [6] im Voraus!\n\nMit freundlichen Grüßen\nDaria Petrova",
      wordBank: ["Dank", "Hause", "kaputt", "Frage", "kommen", "an", "neu", "gehen", "Antwort", "Arbeit", "auf", "schnell"],
      answers: [3, 2, 4, 1, 5, 0]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Entschuldigung, wie komme ich zum Bahnhof?\"", options: ["Gehen Sie geradeaus und dann links.", "Der Zug kommt um 8 Uhr.", "Ich fahre gern mit dem Zug."], answer: 0 },
        { prompt: "\"Möchten Sie noch einen Kaffee?\"", options: ["Ja, ich trinke keinen Kaffee.", "Nein danke, ich muss gleich gehen.", "Der Kaffee kostet zwei Euro."], answer: 1 },
        { prompt: "\"Wie geht es Ihrer Tochter?\"", options: ["Sie ist acht Jahre alt.", "Danke, gut. Sie geht jetzt in die Schule.", "Ja, ich habe eine Tochter."], answer: 1 },
        { prompt: "\"Können Sie mir bitte helfen? Die Tasche ist so schwer.\"", options: ["Ja, natürlich. Ich nehme sie.", "Nein, die Tasche ist neu.", "Die Tasche kostet 30 Euro."], answer: 0 },
        { prompt: "\"Was hast du am Wochenende gemacht?\"", options: ["Ich besuche meine Eltern.", "Ich war bei meinen Eltern.", "Ich gehe zu meinen Eltern."], answer: 1 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Liebe Fahrgäste, der Zug nach München fährt heute nicht von Gleis drei, sondern von Gleis sieben ab. Ich wiederhole: Der Zug nach München fährt von Gleis sieben.",
          statement: "Der Zug nach München fährt von Gleis drei.",
          answer: false
        },
        {
          audio: "Liebe Kundinnen und Kunden, herzlich willkommen! Heute im Angebot: ein Kilo Äpfel für nur einen Euro neunzig. Sie finden die Äpfel in der Obstabteilung im Erdgeschoss.",
          statement: "Die Äpfel kosten heute einen Euro neunzig.",
          answer: true
        },
        {
          audio: "Guten Tag, hier ist die Praxis Doktor Klein. Unsere Praxis ist vom zweiten bis zum sechsten August geschlossen. Ab Montag, dem neunten August, sind wir wieder für Sie da.",
          statement: "Die Praxis ist ab dem neunten August wieder geöffnet.",
          answer: true
        },
        {
          audio: "Achtung, eine Durchsage: Das Schwimmbad schließt heute schon um siebzehn Uhr. Bitte gehen Sie jetzt langsam zu den Umkleidekabinen. Vielen Dank und bis morgen!",
          statement: "Das Schwimmbad schließt heute um neunzehn Uhr.",
          answer: false
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Und nun das Wetter für morgen: Am Vormittag scheint die Sonne, am Nachmittag gibt es Regen. Die Temperaturen liegen bei zwanzig Grad. Nehmen Sie also besser einen Regenschirm mit!",
          frage: "Wie wird das Wetter morgen Nachmittag?",
          options: ["Es regnet.", "Die Sonne scheint.", "Es schneit."],
          answer: 0
        },
        {
          audio: "Verkehrsinformation: Auf der Autobahn A drei gibt es zwischen Köln und Bonn einen Stau von acht Kilometern. Bitte fahren Sie langsam. Wir empfehlen die Bundesstraße als Umleitung.",
          frage: "Wie lang ist der Stau?",
          options: ["Drei Kilometer.", "Acht Kilometer.", "Achtzehn Kilometer."],
          answer: 1
        },
        {
          audio: "Radio Aktuell mit einem Tipp fürs Wochenende: Am Samstag gibt es im Stadtpark ein großes Familienfest mit Musik und Spielen. Der Eintritt ist frei. Das Fest beginnt um elf Uhr.",
          frage: "Was kostet das Familienfest?",
          options: ["Elf Euro.", "Nichts.", "Fünf Euro."],
          answer: 1
        },
        {
          audio: "Und hier eine Information für alle Bahnfahrer: Am Sonntag fahren zwischen Hauptbahnhof und Westbahnhof keine Züge. Bitte benutzen Sie die Busse. Die Fahrt mit dem Bus dauert ungefähr zwanzig Minuten.",
          frage: "Was sollen die Fahrgäste am Sonntag benutzen?",
          options: ["Die Züge.", "Die Straßenbahn.", "Die Busse."],
          answer: 2
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Frau", text: "Guten Tag, ich möchte bitte zwei Brötchen und ein Brot." },
            { speaker: "Verkäufer", text: "Gern. Das Brot ist heute im Angebot, es kostet nur zwei Euro. Sonst noch etwas?" },
            { speaker: "Frau", text: "Nein, danke. Das ist alles." }
          ],
          statement: "Die Frau kauft Brötchen und ein Brot.",
          answer: true
        },
        {
          audio: [
            { speaker: "Mann", text: "Hallo Petra, kommst du morgen mit ins Kino?" },
            { speaker: "Petra", text: "Morgen kann ich leider nicht, ich muss arbeiten. Aber am Freitag habe ich Zeit." },
            { speaker: "Mann", text: "Okay, dann gehen wir am Freitag." }
          ],
          statement: "Petra geht morgen ins Kino.",
          answer: false
        },
        {
          audio: [
            { speaker: "Kundin", text: "Entschuldigung, haben Sie diese Jacke auch in Größe achtunddreißig?" },
            { speaker: "Verkäuferin", text: "Moment, ich schaue nach... Nein, tut mir leid. In Größe achtunddreißig haben wir sie nur in Blau." },
            { speaker: "Kundin", text: "Blau finde ich auch schön. Ich probiere sie an." }
          ],
          statement: "Die Kundin möchte die blaue Jacke anprobieren.",
          answer: true
        },
        {
          audio: [
            { speaker: "Sohn", text: "Mama, ich gehe heute nach der Schule zu Lukas. Wir machen zusammen Hausaufgaben." },
            { speaker: "Mutter", text: "In Ordnung. Aber komm bitte um sechs Uhr nach Hause, wir essen zusammen." },
            { speaker: "Sohn", text: "Ja, mache ich. Bis später!" }
          ],
          statement: "Der Sohn soll um sieben Uhr nach Hause kommen.",
          answer: false
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderatorin", text: "Herzlich willkommen bei Radio Stadt! Unser Gast heute ist Marco. Marco, du kommst aus Italien und lebst jetzt in Deutschland. Seit wann bist du hier?" },
        { speaker: "Marco", text: "Hallo! Ich bin vor zwei Jahren nach Deutschland gekommen. Zuerst habe ich in Berlin gewohnt, jetzt lebe ich in Leipzig." },
        { speaker: "Moderatorin", text: "Und was machst du beruflich?" },
        { speaker: "Marco", text: "Ich arbeite als Koch in einem italienischen Restaurant. Die Arbeit macht mir viel Spaß, aber die Arbeitszeiten sind lang." },
        { speaker: "Moderatorin", text: "Wie hast du Deutsch gelernt?" },
        { speaker: "Marco", text: "Ich habe einen Kurs an der Volkshochschule gemacht. Und ich spreche jeden Tag mit den Kollegen Deutsch. Das hilft am meisten." },
        { speaker: "Moderatorin", text: "Was gefällt dir in Deutschland besonders?" },
        { speaker: "Marco", text: "Die Menschen sind sehr freundlich, und ich liebe die Parks in Leipzig. Nur das Wetter finde ich nicht so gut. Im Winter ist es mir zu kalt!" }
      ],
      questions: [
        { frage: "Seit wann lebt Marco in Deutschland?", options: ["Seit zwei Monaten.", "Seit zwei Jahren.", "Seit zehn Jahren."], answer: 1 },
        { frage: "Wo wohnt Marco jetzt?", options: ["In Berlin.", "In Leipzig.", "In Italien."], answer: 1 },
        { frage: "Was ist Marco von Beruf?", options: ["Kellner.", "Lehrer.", "Koch."], answer: 2 },
        { frage: "Was findet Marco nicht so gut?", options: ["Das Wetter im Winter.", "Die Menschen.", "Die Parks."], answer: 0 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Guten Tag, hier spricht Frau Berger von der Zahnarztpraxis Doktor Winter. Ich rufe an wegen Ihres Termins. Der Termin am Mittwoch geht leider nicht. Ich möchte Ihnen einen neuen Termin geben: am Freitag um halb zehn. Bitte bringen Sie Ihre Versichertenkarte mit. Wenn der Termin nicht passt, rufen Sie uns bitte zurück. Die Nummer ist: null sieben elf, drei vier fünf sechs. Vielen Dank und auf Wiederhören!",
      noteTitle: "Notiz: Anruf von der Zahnarztpraxis",
      gaps: [
        { label: "Es ruft an: Frau ____", answer: "Berger", alt: [] },
        { label: "Neuer Termin: am ____", answer: "Freitag", alt: ["freitag"] },
        { label: "Uhrzeit: ____ Uhr", answer: "9:30", alt: ["9.30", "halb zehn", "09:30", "halb 10", "930"] },
        { label: "Mitbringen: ____", answer: "Versichertenkarte", alt: ["die Versichertenkarte", "Versicherungskarte"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihre Freundin Paula hat Ihnen geschrieben. Sie möchte Sie am Samstag besuchen.",
    incomingEmail: {
      von: "paula.meier@mail.de",
      betreff: "Besuch am Samstag?",
      text: "Hallo!\n\nWie geht es dir? Ich habe am Samstag frei und möchte dich gern besuchen. Passt das? Wann soll ich kommen, und was machen wir zusammen? Soll ich etwas mitbringen?\n\nLiebe Grüße\nPaula"
    },
    points: [
      "Sagen Sie: Der Besuch passt.",
      "Nennen Sie eine Uhrzeit und eine Aktivität.",
      "Schreiben Sie, was Paula mitbringen soll."
    ],
    musterloesung: "Hallo Paula,\n\ndanke für deine E-Mail! Ich freue mich sehr, Samstag passt super. Komm doch um 14 Uhr zu mir. Zuerst trinken wir Kaffee, und dann gehen wir in den Park spazieren. Kannst du bitte einen Kuchen mitbringen? Ich koche am Abend für uns.\n\nBis Samstag!\nLiebe Grüße",
    tipps: "Answer all three points, use a greeting and a closing, and keep sentences short. One or two sentences per point is enough at this level."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Ich heiße ... / Mein Name ist ...",
        "Ich bin ... Jahre alt.",
        "Ich wohne in ... / Ich komme aus ...",
        "Ich bin verheiratet. / Ich habe ... Kinder.",
        "Ich arbeite als ... / Ich bin ... von Beruf.",
        "Ich spreche ... und ein bisschen ...",
        "In meiner Freizeit ... ich gern ..."
      ]
    },
    teil2: {
      thema: "Familie",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Wie groß ist Ihre Familie?",
        "Was machen Sie mit Ihrer Familie am Wochenende?",
        "Wer kocht bei Ihnen zu Hause?",
        "Ist Familie für Sie wichtig? Warum?"
      ],
      redemittel: [
        "In meiner Familie sind wir ... Personen.",
        "Am Wochenende ... wir oft ...",
        "Bei uns kocht meistens ...",
        "Ich finde, Familie ist ..., weil ...",
        "Und wie ist das bei dir?"
      ]
    },
    teil3: {
      aufgabe: "Planen Sie zusammen ein Abendessen für einen Freund, der Geburtstag hat.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Wann? (Tag und Uhrzeit)", "Wo? (zu Hause oder im Restaurant?)", "Was essen und trinken?", "Was schenken wir?"],
      redemittel: [
        "Wollen wir am ... feiern?",
        "Wie wäre es mit ...?",
        "Das ist eine gute Idee!",
        "Ich bin nicht sicher. Vielleicht lieber ...",
        "Wer bringt ... mit?",
        "Gut, dann machen wir das so."
      ]
    }
  }
});
