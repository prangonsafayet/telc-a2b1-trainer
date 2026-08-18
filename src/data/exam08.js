export default {
  id: 8,
  title: "Modelltest 8",
  difficulty: "b1",
  level: "B1 · Aufbau",
  theme: "Freizeit, Medien & Kultur",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Sie möchten am Wochenende einen Fotokurs für Anfänger besuchen.",
        "Ihre Freundin liebt Theater, hat aber als Studentin wenig Geld. Sie suchen günstige Karten.",
        "Sie sehen gern alte Filme und möchten sie auf einer großen Leinwand erleben.",
        "Ihr Nachbar (70) möchte endlich lernen, wie man ein Tablet benutzt.",
        "Sie spielen seit Jahren Gitarre und möchten mit anderen zusammen Musik machen."
      ],
      ads: [
        "Stadtmuseum Roth: Sonderausstellung \"Unsere Stadt vor 100 Jahren\". Täglich außer montags, 10–17 Uhr. Eintritt 6 Euro.",
        "Fotoklub Blende 8: Workshop \"Fotografieren für Einsteiger\" – jeden ersten Samstag im Monat, 10–16 Uhr. Eigene Kamera mitbringen! Anmeldung: www.blende8-roth.de",
        "Theater an der Mauer: Große Premiere im Oktober! \"Der Besuch der alten Dame\" – Karten ab 45 Euro, Abendkasse ab 18 Uhr.",
        "Kino Lumière: Filmklassiker-Reihe! Jeden Donnerstag zeigen wir berühmte alte Filme auf großer Leinwand. Eintritt nur 7 Euro.",
        "Volkshochschule Roth: Kurs \"Tablet und Smartphone – Schritt für Schritt\", speziell für Menschen über 65. Kleine Gruppen, viel Zeit für Fragen.",
        "Die Band \"Nordlicht\" sucht Verstärkung: Gitarrist oder Gitarristin für wöchentliche Proben und kleine Auftritte. Einfach anrufen: 0160 4455667.",
        "Junges Theater Fabrik: Alle Vorstellungen für Schüler, Studierende und Azubis nur 8 Euro! Programm und Karten online.",
        "Musikhaus Takt: Gebrauchte Gitarren, Keyboards und Schlagzeuge ab 60 Euro. Ankauf und Verkauf, Bahnhofstraße 3."
      ],
      answers: [1, 6, 3, 4, 5]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Lange Nacht der Museen",
          text: "Am Samstag, dem 6. September, findet in Roth wieder die Lange Nacht der Museen statt. Von 18 Uhr bis 1 Uhr nachts öffnen zwölf Museen ihre Türen und bieten ein besonderes Programm mit Führungen, Konzerten und Mitmach-Aktionen. Mit einem einzigen Ticket können Sie alle Museen besuchen: Es kostet 15 Euro, ermäßigt 10 Euro. Kinder unter 12 Jahren zahlen keinen Eintritt. Zwischen den Museen fahren kostenlose Shuttlebusse, und zwar alle 20 Minuten. Das komplette Programm finden Sie unter www.museumsnacht-roth.de."
        },
        {
          titel: "Open-Air-Kino am Flussufer",
          text: "Von Juli bis Ende August verwandelt sich die Wiese am Flussufer wieder in ein Kino unter freiem Himmel. Gezeigt wird jeden Freitag und Samstag ein Film, Beginn ist bei Einbruch der Dunkelheit gegen 21:30 Uhr. Tickets gibt es ausschließlich online für 9 Euro, eine Abendkasse gibt es nicht. Wer möchte, kann vor Ort eine Decke für 3 Euro mieten. Bei starkem Regen wird die Vorstellung verschoben – ob der Film läuft, erfahren Sie ab 17 Uhr auf unserer Website. Bitte reisen Sie mit dem Fahrrad oder dem Bus an, Parkplätze für Autos gibt es nicht."
        }
      ],
      questions: [
        { textIndex: 0, frage: "Wer zahlt bei der Langen Nacht der Museen keinen Eintritt?", options: ["Studierende.", "Alle Besucher ab 18 Jahren.", "Kinder unter 12 Jahren."], answer: 2 },
        { textIndex: 0, frage: "Wie oft fahren die Shuttlebusse?", options: ["Alle 20 Minuten.", "Alle 30 Minuten.", "Einmal pro Stunde."], answer: 0 },
        { textIndex: 0, frage: "Bis wann sind die Museen in dieser Nacht geöffnet?", options: ["Bis 18 Uhr.", "Bis Mitternacht.", "Bis 1 Uhr nachts."], answer: 2 },
        { textIndex: 1, frage: "Was sollen Besucher bei schlechtem Wetter tun?", options: ["An der Abendkasse nachfragen.", "Ab 17 Uhr auf der Website nachsehen.", "Das Kino anrufen."], answer: 1 },
        { textIndex: 1, frage: "Wo kann man Tickets für das Open-Air-Kino kaufen?", options: ["Nur im Internet.", "An der Abendkasse.", "Im Bus."], answer: 0 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Hallo Deniz, schlechte Nachricht: Das Konzert am Freitag ist komplett ausverkauft, ich habe keine Karten mehr bekommen. Sollen wir stattdessen ins Open-Air-Kino gehen? Melde dich! Ben",
        "Liebe Mitglieder, wegen des großen Interesses wird unsere Fotoausstellung verlängert! Ihr könnt die Bilder jetzt noch bis Ende Oktober im Vereinsheim sehen. Euer Fotoklub",
        "Hi Carla, ich habe gestern deinen Podcast gehört – wirklich toll! Besonders das Interview mit der Musikerin hat mir gefallen. Mach unbedingt weiter so! Liebe Grüße, Jana",
        "Hallo Herr Yilmaz, das Buch \"Der lange Sommer\", das Sie reserviert haben, liegt jetzt für Sie bereit. Bitte holen Sie es innerhalb einer Woche ab. Ihre Stadtbücherei",
        "Liebe Theatergruppe, die Probe am Mittwoch muss leider ausfallen, weil der Saal renoviert wird. Nächste Woche treffen wir uns wieder wie gewohnt. Grüße, Miriam"
      ],
      headlines: [
        "Termin fällt aus",
        "Lob für einen Podcast",
        "Konzert ist ausverkauft",
        "Ausstellung wird verlängert",
        "Neues Buch gekauft",
        "Reserviertes Buch liegt bereit",
        "Einladung zur Premiere",
        "Kritik an einer Sendung"
      ],
      answers: [2, 3, 1, 5, 0]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Vier Wochen ohne soziale Medien – ein Selbstversuch",
      text: "Julia Petersen, 29, aus Kassel verbrachte früher jeden Abend zwei bis drei Stunden am Handy – und fühlte sich danach selten besser. Deshalb startete die junge Grafikerin im Frühjahr ein Experiment: vier Wochen ohne soziale Medien.\n\n\"Die erste Woche war schwieriger, als ich gedacht hatte\", erzählt sie. \"Ich hatte die Apps zwar gelöscht, aber ich nahm das Handy trotzdem ständig automatisch in die Hand.\" Nach ungefähr zehn Tagen wurde es leichter. Julia las abends wieder Bücher, traf Freunde, die sie lange nicht gesehen hatte, und meldete sich in einem Volleyballkurs an.\n\nInteressant waren die Reaktionen in ihrem Umfeld. Einige Freunde fanden die Idee gut, andere waren irritiert, weil Julia auf Nachrichten nicht mehr sofort antwortete. Wichtige Neuigkeiten bekam sie trotzdem mit, denn ihre beste Freundin rief sie regelmäßig an.\n\nNach den vier Wochen installierte Julia die Apps wieder – allerdings mit neuen Regeln. Beim Essen bleibt das Handy jetzt in der Tasche, und ab einundzwanzig Uhr wird es ausgeschaltet. Insgesamt nutzt sie soziale Medien heute nur noch etwa dreißig Minuten am Tag. Ganz verzichten möchte sie nicht, weil sie sonst den Kontakt zu ihrer Familie im Ausland verlieren würde.\n\nIhr Fazit: \"Ein Leben mit weniger Bildschirm ist nicht nur möglich, sondern auch schöner, als ich dachte. Ich habe wieder Zeit für Dinge, die mir wirklich wichtig sind.\" Ihren nächsten Selbstversuch plant sie schon: einen Monat ohne Online-Shopping.",
      statements: [
        { text: "Julia hat früher jeden Abend mehrere Stunden am Handy verbracht.", answer: true },
        { text: "Die erste Woche des Experiments war für Julia leichter als erwartet.", answer: false },
        { text: "Während des Experiments hat Julia mit einem Sportkurs angefangen.", answer: true },
        { text: "Alle Freunde fanden Julias Experiment gut.", answer: false },
        { text: "Heute schaltet Julia das Handy ab einundzwanzig Uhr aus.", answer: true }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Sehr geehrte Damen und Herren,\n\nich habe auf Ihrer Website gelesen, dass im Oktober ein Theaterkurs für Erwachsene angeboten [1]. Ich interessiere mich sehr dafür und [2] gern wissen, ob es noch freie Plätze gibt. Ich habe zwar noch nie Theater gespielt, [3] ich habe schon einmal an einem Improvisationsworkshop teilgenommen.\n\nAußerdem habe ich eine Frage zu den Kurszeiten: Auf der Website steht, dass der Kurs dienstags stattfindet. Gibt es auch eine Gruppe, [4] sich am Wochenende trifft? Da ich im Schichtdienst arbeite, [5] ich unter der Woche nur selten Zeit.\n\nIch würde mich freuen, [6] Sie mir bald antworten.\n\nMit freundlichen Grüßen\nNilufar Karimova",
      gaps: [
        { options: ["werden", "wird", "worden"], answer: 1 },
        { options: ["würde", "werde", "wurde"], answer: 0 },
        { options: ["denn", "oder", "aber"], answer: 2 },
        { options: ["das", "die", "der"], answer: 1 },
        { options: ["hatte", "habe", "hätte"], answer: 1 },
        { options: ["ob", "weil", "wenn"], answer: 2 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Liebe Kolleginnen und Kollegen,\n\nam Freitag, dem 12. September, organisiert unser Verein wieder einen Filmabend. Dieses [1] zeigen wir eine Komödie aus Frankreich. Der Film beginnt um 20 Uhr, der [2] ist wie immer frei. Getränke und Snacks können vor Ort [3] werden. Wer helfen möchte, kann sich bis Mittwoch bei Tobias [4]. Wir suchen noch zwei Personen für die [5] der Gäste an der Tür. Nach dem Film gibt es die Möglichkeit, bei einem Glas Wein über den Film zu [6].\n\nViele Grüße\ndas Kulturteam",
      wordBank: ["Eintritt", "diskutieren", "Mal", "gekauft", "melden", "Begrüßung", "Ausgang", "geöffnet", "anrufen", "Woche", "Preis", "besuchen"],
      answers: [2, 0, 3, 4, 5, 1]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Hast du Lust, am Samstag mit ins Konzert zu kommen?\"", options: ["Ja, gern! Wer spielt denn?", "Nein, ich höre gern Musik.", "Das Konzert war wirklich schön."], answer: 0 },
        { prompt: "\"Wie hat dir der Film gefallen?\"", options: ["Ich sehe lieber fern.", "Ehrlich gesagt fand ich ihn ein bisschen langweilig.", "Der Film läuft um acht Uhr."], answer: 1 },
        { prompt: "\"Könnten Sie mir sagen, wann die Ausstellung schließt?\"", options: ["Ja, die Ausstellung ist sehr interessant.", "Nein, ich habe die Ausstellung nicht gesehen.", "Einen Moment, ich schaue nach – um achtzehn Uhr."], answer: 2 },
        { prompt: "\"Entschuldigung, ist dieser Platz noch frei?\"", options: ["Nein, ich sitze hier sehr gern.", "Ja, bitte setzen Sie sich.", "Der Platz kostet zehn Euro."], answer: 1 },
        { prompt: "\"Ich habe gehört, du machst jetzt einen Tanzkurs?\"", options: ["Nein danke, ich tanze nicht so gern.", "Der Kurs findet leider nicht statt.", "Ja, stimmt. Wir treffen uns jeden Donnerstag."], answer: 2 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Liebe Besucherinnen und Besucher, das Museum schließt in dreißig Minuten. Die Sonderausstellung im zweiten Stock ist bereits geschlossen. Der Museumsshop im Erdgeschoss hat aber noch bis achtzehn Uhr geöffnet. Wir danken Ihnen für Ihren Besuch.",
          statement: "Der Museumsshop ist schon geschlossen.",
          answer: false
        },
        {
          audio: "Herzlich willkommen im Kino Central! Die Vorstellung \"Sommer in Paris\" um zwanzig Uhr fünfzehn ist leider ausverkauft. Für die Spätvorstellung um zweiundzwanzig Uhr dreißig gibt es noch Karten an der Kasse eins.",
          statement: "Für die Spätvorstellung kann man noch Karten kaufen.",
          answer: true
        },
        {
          audio: "Guten Tag, hier ist die Stadtbücherei. Wegen einer technischen Störung bleibt die Bücherei heute leider geschlossen. Ausgeliehene Medien können Sie kostenlos eine Woche länger behalten. Ab morgen sind wir wieder wie gewohnt für Sie da.",
          statement: "Die Bücherei ist heute wegen einer Störung geschlossen.",
          answer: true
        },
        {
          audio: "Achtung, eine Durchsage: Das Konzert der Band \"Silberfisch\" beginnt nicht wie geplant um neunzehn Uhr, sondern erst um zwanzig Uhr. Der Grund ist ein technisches Problem mit der Bühne. Wir bitten um Ihr Verständnis.",
          statement: "Das Konzert beginnt früher als geplant.",
          answer: false
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Radio Kultur mit einem Tipp: Am Sonntag liest die Autorin Helene Brand aus ihrem neuen Roman. Die Lesung findet im Literaturhaus statt und beginnt um siebzehn Uhr. Karten kosten zwölf Euro, für Studierende acht Euro.",
          frage: "Was kostet eine Karte für Studierende?",
          options: ["Zwölf Euro.", "Acht Euro.", "Siebzehn Euro."],
          answer: 1
        },
        {
          audio: "Und noch eine Information für alle Kulturfans: Das Stadtmuseum hat jetzt eine kostenlose App. Damit können Sie Führungen in fünf Sprachen hören. Die App gibt es ab sofort – Sie brauchen nur Ihr Smartphone und Kopfhörer.",
          frage: "Was braucht man für die Führungen mit der App?",
          options: ["Ein Ticket an der Kasse.", "Einen Stadtplan.", "Ein Smartphone und Kopfhörer."],
          answer: 2
        },
        {
          audio: "Verkehrshinweis: Wegen des Straßenfestivals ist die Innenstadt am Samstag für Autos gesperrt. Die Straßenbahnen fahren normal. Besucher parken am besten am Stadion und fahren von dort mit der Linie sechs weiter in die Innenstadt.",
          frage: "Wie kommen Besucher am Samstag am besten in die Innenstadt?",
          options: ["Mit dem Auto bis zum Marktplatz.", "Mit der Straßenbahn vom Stadion.", "Zu Fuß vom Bahnhof."],
          answer: 1
        },
        {
          audio: "Radio Neun verlost heute dreimal zwei Karten für das Open-Air-Konzert am Freitag. Rufen Sie uns bis sechzehn Uhr an und beantworten Sie eine einfache Frage. Die Telefonnummer finden Sie auf unserer Website.",
          frage: "Was kann man bei Radio Neun gewinnen?",
          options: ["Konzertkarten.", "Eine Reise.", "Ein Radio."],
          answer: 0
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Kundin", text: "Guten Abend, ich habe zwei Karten für die Vorstellung heute reserviert, auf den Namen Aydin." },
            { speaker: "Mitarbeiter", text: "Einen Moment bitte... Ja, hier sind sie: zwei Karten, Reihe fünf. Das macht achtundzwanzig Euro." },
            { speaker: "Kundin", text: "Kann ich mit Karte zahlen?" },
            { speaker: "Mitarbeiter", text: "Natürlich, gern." }
          ],
          statement: "Die Frau hat Karten in Reihe fünfzehn reserviert.",
          answer: false
        },
        {
          audio: [
            { speaker: "Tom", text: "Hast du die neue Serie über die Berliner Musikszene schon gesehen?" },
            { speaker: "Nina", text: "Nein, noch nicht. Lohnt sie sich denn?" },
            { speaker: "Tom", text: "Auf jeden Fall! Die ersten Folgen sind etwas langsam, aber danach wird sie richtig spannend." },
            { speaker: "Nina", text: "Okay, dann schaue ich am Wochenende mal rein." }
          ],
          statement: "Nina hat die Serie schon gesehen.",
          answer: false
        },
        {
          audio: [
            { speaker: "Besucher", text: "Entschuldigung, darf man in der Ausstellung fotografieren?" },
            { speaker: "Mitarbeiterin", text: "Ja, aber bitte ohne Blitz. Und im letzten Raum sind Fotos leider gar nicht erlaubt." },
            { speaker: "Besucher", text: "Verstanden, vielen Dank für die Information." }
          ],
          statement: "Fotografieren ohne Blitz ist in der Ausstellung meistens erlaubt.",
          answer: true
        },
        {
          audio: [
            { speaker: "Lea", text: "Sollen wir am Samstag zusammen auf das Straßenfestival gehen?" },
            { speaker: "Jan", text: "Am Samstag kann ich leider nicht, da helfe ich meinem Bruder beim Umzug. Aber am Sonntag hätte ich Zeit." },
            { speaker: "Lea", text: "Sonntag ist sogar besser, da spielt nämlich meine Lieblingsband." }
          ],
          statement: "Lea und Jan gehen am Sonntag zum Festival.",
          answer: true
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderator", text: "Herzlich willkommen bei Radio Morgen! Zu Gast ist heute Sarah Lindner, die mit einem Bücherbus über die Dörfer fährt. Frau Lindner, wie sind Sie auf diese Idee gekommen?" },
        { speaker: "Sarah Lindner", text: "Vor vier Jahren wurde die kleine Bibliothek in meinem Heimatort geschlossen. Das fand ich sehr schade, vor allem für die Kinder und für ältere Leute, die nicht so mobil sind. Da hatte ich die Idee mit dem Bus." },
        { speaker: "Moderator", text: "Was finden die Leserinnen und Leser in Ihrem Bus?" },
        { speaker: "Sarah Lindner", text: "Ungefähr dreitausend Bücher, dazu Hörbücher und Gesellschaftsspiele. Für Kinder ist die Ausleihe kostenlos, Erwachsene zahlen zehn Euro im Jahr." },
        { speaker: "Moderator", text: "Und wie oft sind Sie unterwegs?" },
        { speaker: "Sarah Lindner", text: "Von Dienstag bis Freitag. Jeden Tag besuche ich drei Dörfer, immer nach einem festen Plan. Montags bleibt der Bus in der Garage – dann bestelle ich neue Bücher und mache die Buchhaltung." },
        { speaker: "Moderator", text: "Was wünschen Sie sich für die Zukunft?" },
        { speaker: "Sarah Lindner", text: "Einen zweiten Bus! Auf unserer Warteliste stehen nämlich viele Dörfer. Und ich würde gern eine Kollegin einstellen, damit wir auch samstags fahren könnten." }
      ],
      questions: [
        { frage: "Warum hat Sarah Lindner mit dem Bücherbus angefangen?", options: ["Die Bibliothek in ihrem Ort wurde geschlossen.", "Sie wollte alte Busse verkaufen.", "Eine Schule hat sie darum gebeten."], answer: 0 },
        { frage: "Was kostet die Ausleihe für Kinder?", options: ["Zehn Euro im Jahr.", "Drei Euro im Monat.", "Nichts."], answer: 2 },
        { frage: "Was macht Frau Lindner montags?", options: ["Sie besucht drei Dörfer.", "Sie bestellt neue Bücher.", "Sie repariert den Bus."], answer: 1 },
        { frage: "Was wünscht sich Frau Lindner für die Zukunft?", options: ["Eine größere Garage.", "Weniger Arbeit am Wochenende.", "Einen zweiten Bus."], answer: 2 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Guten Tag, hier spricht Herr Steinbach vom Kulturzentrum Alte Post. Ich rufe an wegen Ihrer Anmeldung zum Fotokurs. Der Kurs beginnt eine Woche später als geplant, also erst am Montag, dem sechsten Oktober. Der Raum hat sich auch geändert: Wir treffen uns jetzt im Raum zwölf im ersten Stock. Bitte bringen Sie zur ersten Stunde Ihre eigene Kamera mit. Die Kursgebühr von fünfundvierzig Euro können Sie am ersten Abend bar bezahlen. Bei Fragen erreichen Sie mich unter null drei null, zwei vier sechs acht. Auf Wiederhören!",
      noteTitle: "Notiz: Anruf vom Kulturzentrum",
      gaps: [
        { label: "Es ruft an: Herr ____", answer: "Steinbach", alt: [] },
        { label: "Kursbeginn: Montag, ____ Oktober", answer: "6.", alt: ["6", "sechster", "sechsten", "der sechste"] },
        { label: "Neuer Raum: ____", answer: "12", alt: ["zwölf", "Raum 12", "Raum zwölf"] },
        { label: "Mitbringen: ____", answer: "Kamera", alt: ["eigene Kamera", "die Kamera", "die eigene Kamera"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihr Freund Jonas hat Ihnen geschrieben. Er möchte mit Ihnen das Straßenfestival besuchen.",
    incomingEmail: {
      von: "jonas.brandt@web.de",
      betreff: "Straßenfestival am Wochenende",
      text: "Hallo!\n\nHast du schon gehört? Am Wochenende ist wieder das Straßenfestival in der Innenstadt. Ich würde gern hingehen – hast du Lust mitzukommen? Am Samstag spielt eine Band, die ich super finde, aber ich weiß nicht, ob du an dem Tag Zeit hast. Wir könnten vorher auch etwas essen gehen. Was meinst du? Und sollen wir noch jemanden mitnehmen?\n\nViele Grüße\nJonas"
    },
    points: [
      "Sagen Sie, an welchem Tag Sie Zeit haben.",
      "Machen Sie einen Vorschlag für das Treffen (Ort und Uhrzeit).",
      "Schreiben Sie, wen Sie noch einladen möchten."
    ],
    musterloesung: "Hallo Jonas,\n\ndanke für deine Nachricht! Das Festival ist eine super Idee. Am Samstag muss ich leider arbeiten, aber am Sonntag habe ich den ganzen Tag Zeit. Wir könnten uns um zwölf Uhr am Marktplatz treffen und zuerst etwas essen. Ich würde gern noch meine Kollegin Aylin einladen, die neu in der Stadt ist. Bis Sonntag!\n\nLiebe Grüße",
    tipps: "Cover all three points and show B1 structures: make suggestions with \"Wir könnten ...\" and add a relative clause. Connect ideas with \"aber\", \"weil\" or \"deshalb\" instead of writing isolated sentences."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Ich heiße ... und bin ... Jahre alt.",
        "Ich wohne seit ... in ...",
        "Ich bin in ... geboren und aufgewachsen.",
        "Ich arbeite als ... / Ich mache gerade eine Ausbildung als ...",
        "Neben Deutsch spreche ich noch ...",
        "In meiner Freizeit beschäftige ich mich am liebsten mit ...",
        "Am Wochenende unternehme ich oft etwas mit ..."
      ]
    },
    teil2: {
      thema: "Medien im Alltag",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Wie oft und wofür nutzen Sie Ihr Smartphone am Tag?",
        "Welche Medien nutzen Sie, um Nachrichten zu bekommen?",
        "Sehen Sie Filme lieber zu Hause oder im Kino? Warum?",
        "Sind soziale Medien für Sie eher positiv oder eher negativ?"
      ],
      redemittel: [
        "Ich nutze am liebsten ..., weil ...",
        "Meiner Meinung nach ...",
        "Einerseits ..., andererseits ...",
        "Da bin ich ganz deiner Meinung.",
        "Das sehe ich ein bisschen anders, denn ..."
      ]
    },
    teil3: {
      aufgabe: "Planen Sie zusammen einen Kinoabend mit den Leuten aus Ihrem Deutschkurs.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Welcher Film?", "Wann und in welchem Kino?", "Wie kommen alle dorthin?", "Was machen Sie nach dem Film?"],
      redemittel: [
        "Wie wäre es, wenn wir ...?",
        "Ich schlage vor, dass ...",
        "Einverstanden, das machen wir so.",
        "Ich bin nicht sicher, ob das allen gefällt.",
        "Wir könnten stattdessen ...",
        "Sollen wir vorher noch ...?"
      ]
    }
  }
};
