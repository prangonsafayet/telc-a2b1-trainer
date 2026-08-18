window.TELC_EXAMS = window.TELC_EXAMS || [];
window.TELC_EXAMS.push({
  id: 4,
  title: "Modelltest 4",
  difficulty: "medium",
  level: "A2 · mittel",
  theme: "Arbeit & Beruf",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Sie sind Student und suchen einen Job für den Sommer, weil Sie Geld verdienen möchten.",
        "Sie möchten besser mit dem Computer arbeiten, weil Sie das für Ihren Beruf brauchen.",
        "Sie haben am Freitag ein Vorstellungsgespräch und brauchen schnell einen Anzug.",
        "Sie sind Köchin und suchen eine neue Stelle in einem Restaurant.",
        "Sie möchten sich bewerben, aber Sie brauchen Hilfe beim Lebenslauf."
      ],
      ads: [
        "Restaurant Zur Mühle sucht ab sofort eine Köchin oder einen Koch in Vollzeit. Gute Bezahlung, nettes Team. Bewerbung an info@zurmuehle.de.",
        "Kurs: Fit für die Bewerbung! Wir helfen Ihnen beim Lebenslauf und beim Anschreiben. Kostenlos, jeden Dienstag um 16 Uhr im Stadtteilbüro.",
        "Nachhilfe in Mathematik und Englisch für Schülerinnen und Schüler ab Klasse 5. Erfahrene Lehrer, faire Preise.",
        "Herrenmode Eleganz: Anzüge, Hemden und Krawatten. Änderungen über Nacht möglich! Mo–Sa 9–19 Uhr, Kaiserstraße 22.",
        "Volkshochschule: Computerkurs für den Beruf (Word, Excel, E-Mail). Montag und Mittwoch, 18–20 Uhr. Anmeldung online.",
        "Eiscafé Milano sucht freundliche Verkäuferinnen und Verkäufer für Juli und August. Ideal für Studentinnen und Studenten!",
        "Büro-Service Klar: Wir reinigen Ihre Büroräume — abends, wenn Ihre Mitarbeiter zu Hause sind. Angebot anfordern!",
        "Fahrschule Start: Führerschein in acht Wochen, Theorie auch am Wochenende. Jetzt anmelden!"
      ],
      answers: [5, 4, 3, 0, 1]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Mitteilung an alle Mitarbeiterinnen und Mitarbeiter",
          text: "Liebe Kolleginnen und Kollegen, ab nächster Woche wird unsere Kantine renoviert. Die Arbeiten dauern voraussichtlich drei Wochen. In dieser Zeit steht jeden Tag ein Food-Truck im Hof. Dort bekommen Sie von 11:30 bis 14 Uhr warme Gerichte, Salate und Getränke. Das Tagesmenü kostet 6,50 Euro und ist damit günstiger als das Menü in der Kantine. Wenn Sie Wünsche oder Ideen für den Speiseplan haben, schreiben Sie bitte bis Freitag eine E-Mail an Frau Vogt."
        },
        {
          titel: "Arbeiten von zu Hause — für viele normal",
          text: "Immer mehr Menschen in Deutschland arbeiten einen Teil der Woche von zu Hause. Viele finden das praktisch, weil sie nicht mehr jeden Tag zur Arbeit fahren müssen. So sparen sie Zeit und Geld. Es gibt aber auch einen Nachteil: Man sieht die Kolleginnen und Kollegen seltener. Die Firma Bürotex hat eine einfache Regel gefunden: Die Mitarbeiter dürfen selbst wählen, wo sie arbeiten. Nur am Montag müssen alle ins Büro kommen, weil dann das Team-Meeting stattfindet."
        }
      ],
      questions: [
        { textIndex: 0, frage: "Warum gibt es einen Food-Truck?", options: ["Weil die Kantine renoviert wird.", "Weil die Kantine zu teuer ist.", "Weil die Firma ein Fest feiert."], answer: 0 },
        { textIndex: 0, frage: "Wann bekommt man Essen am Food-Truck?", options: ["Von 9 bis 11 Uhr.", "Von 12 bis 15 Uhr.", "Von 11:30 bis 14 Uhr."], answer: 2 },
        { textIndex: 0, frage: "Bis wann kann man Frau Vogt Ideen schicken?", options: ["Bis Montag.", "Bis Freitag.", "Bis Ende des Monats."], answer: 1 },
        { textIndex: 1, frage: "Was ist ein Vorteil von der Arbeit zu Hause?", options: ["Man muss nicht jeden Tag zur Arbeit fahren.", "Man sieht die Kollegen öfter.", "Man verdient mehr Geld."], answer: 0 },
        { textIndex: 1, frage: "Was müssen die Mitarbeiter von Bürotex am Montag machen?", options: ["Zu Hause arbeiten.", "Früher nach Hause gehen.", "Zum Team-Meeting ins Büro kommen."], answer: 2 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Guten Morgen Frau Behrens, ich bin heute leider krank und kann nicht ins Büro kommen. Ich gehe gleich zum Arzt und schicke Ihnen danach die Krankmeldung. Viele Grüße, Milan Kovac",
        "Hallo Team, das Meeting am Mittwoch fällt aus, weil unser Kunde erst nächste Woche Zeit hat. Den neuen Termin bekommt ihr per E-Mail. Danke, Sandra",
        "Lieber Herr Yildiz, vielen Dank für Ihre Bewerbung. Wir laden Sie zu einem Gespräch ein: am Donnerstag um 10 Uhr in unserem Büro. Bitte bestätigen Sie den Termin kurz. Mit freundlichen Grüßen, R. Albrecht",
        "Hi Papa, gute Nachrichten von der Arbeit: Ich bekomme mehr Gehalt! Ab nächstem Monat verdiene ich 200 Euro mehr. Das feiern wir am Sonntag! Dein Leon",
        "Liebe Kolleginnen und Kollegen, unsere Kollegin Petra geht nach 30 Jahren in Rente. Am Freitag um 15 Uhr feiern wir im Pausenraum. Bitte bringt gute Laune mit! Euer Chef"
      ],
      headlines: [
        "Einladung zum Vorstellungsgespräch",
        "Kollege ist krank",
        "Neue Stelle gefunden",
        "Feier: Kollegin geht in Rente",
        "Mehr Geld ab nächstem Monat",
        "Meeting fällt aus",
        "Kündigung eingereicht",
        "Urlaub beantragt"
      ],
      answers: [1, 5, 0, 4, 3]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Vom Büro in die Backstube",
      text: "Sandra Koch, 34, erzählt:\n\nFrüher habe ich in einem großen Büro gearbeitet. Ich hatte einen sicheren Job und ein gutes Gehalt, aber ich war oft unzufrieden. Ich saß den ganzen Tag am Computer, und am Abend hatte ich das Gefühl, dass ich nichts Wichtiges gemacht habe.\n\nVor vier Jahren habe ich dann eine Entscheidung getroffen: Ich habe gekündigt und eine Ausbildung als Bäckerin angefangen. Meine Familie war zuerst dagegen, weil man in der Ausbildung nur wenig Geld verdient. Auch die Arbeitszeiten sind hart: Ich muss um drei Uhr aufstehen, denn die ersten Brötchen müssen um sechs Uhr fertig sein.\n\nTrotzdem bin ich heute viel glücklicher als früher. Ich arbeite mit den Händen, und ich sehe am Ende des Tages, was ich gemacht habe. Die Kunden freuen sich über frisches Brot, und mein Chef sagt, dass ich Talent habe.\n\nNächstes Jahr mache ich meine Prüfung. Danach möchte ich vielleicht eine eigene kleine Bäckerei öffnen. Mein Tipp: Wenn dich deine Arbeit unglücklich macht, dann such dir etwas Neues. Es ist nie zu spät.",
      statements: [
        { text: "Sandra hatte im Büro ein gutes Gehalt.", answer: true },
        { text: "Ihre Familie fand die Idee von Anfang an gut.", answer: false },
        { text: "Sandra muss um sechs Uhr aufstehen.", answer: false },
        { text: "Sie ist heute glücklicher als früher.", answer: true },
        { text: "Sie hat schon eine eigene Bäckerei.", answer: false }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Sehr geehrte Frau Winter,\n\nvielen Dank für Ihre E-Mail. Ich freue mich, [1] ich zum Vorstellungsgespräch kommen darf. Der Termin am Donnerstag passt sehr gut. Ich [2] schon zwei Jahre als Verkäufer gearbeitet, zuerst in einem kleinen Laden, [3] in einem Kaufhaus. Im Moment besuche ich einen Deutschkurs, [4] ich im Beruf besser sprechen möchte. Meinen Lebenslauf schicke ich Ihnen [5] dieser E-Mail. Wenn Sie noch Fragen [6], rufen Sie mich gern an.\n\nMit freundlichen Grüßen\nAmir Hassan",
      gaps: [
        { options: ["dass", "weil", "ob"], answer: 0 },
        { options: ["bin", "habe", "hatte"], answer: 1 },
        { options: ["dann", "denn", "als"], answer: 0 },
        { options: ["wenn", "weil", "dass"], answer: 1 },
        { options: ["von", "mit", "aus"], answer: 1 },
        { options: ["habt", "hat", "haben"], answer: 2 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Liebes Team,\n\nab nächster Woche haben wir eine neue [1] im Verkauf: Frau Petersen. Sie hat viel [2], denn sie war vorher fünf Jahre bei einer anderen Firma. Bitte helfen Sie ihr am Anfang bei allen [3]. Am Freitag um zwölf Uhr gibt es ein gemeinsames [4] in der Kantine, dann können Sie Frau Petersen kennenlernen. Bitte tragen Sie sich bis Mittwoch in die [5] am schwarzen Brett ein. Ich [6] mich auf Sie alle!\n\nIhr Chef\nBernd Kaufmann",
      wordBank: ["Erfahrung", "Pause", "Kollegin", "Fragen", "Antworten", "Mittagessen", "freue", "Liste", "Werkstatt", "denke", "Arbeit", "Zeitung"],
      answers: [2, 0, 3, 5, 7, 6]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Warum möchten Sie bei uns arbeiten?\"", options: ["Weil mir Ihre Firma gut gefällt und ich gern im Team arbeite.", "Ich arbeite nicht so gern.", "Meine alte Firma ist in der Hauptstraße."], answer: 0 },
        { prompt: "\"Können Sie auch am Samstag arbeiten?\"", options: ["Am Samstag schlafe ich lange.", "Ja, das ist kein Problem für mich.", "Der Samstag ist der sechste Tag der Woche."], answer: 1 },
        { prompt: "\"Wann haben Sie Ihre Ausbildung gemacht?\"", options: ["Ich mache gern eine Ausbildung.", "Die Ausbildung dauert drei Jahre.", "Von 2018 bis 2021."], answer: 2 },
        { prompt: "\"Ich schaffe die Arbeit heute nicht allein. Kannst du mir helfen?\"", options: ["Klar, ich habe in einer Stunde Zeit.", "Nein, ich arbeite hier schon lange.", "Die Arbeit beginnt um acht Uhr."], answer: 0 },
        { prompt: "\"Wie komme ich am besten zu Ihrem Büro?\"", options: ["Unser Büro ist ganz neu.", "Nehmen Sie den Bus Linie 5 bis zum Marktplatz.", "Ich bin heute nicht im Büro."], answer: 1 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Guten Tag, Sie sind mit der Firma Solartec verbunden. Unsere Büros sind von Montag bis Freitag von acht bis siebzehn Uhr besetzt. Wenn Sie eine Nachricht hinterlassen, rufen wir Sie so schnell wie möglich zurück.",
          statement: "Man erreicht die Firma auch am Samstag.",
          answer: false
        },
        {
          audio: "Liebe Mitarbeiterinnen und Mitarbeiter, bitte denken Sie daran: Die Sicherheitsschulung beginnt morgen schon um acht Uhr dreißig, nicht wie sonst um neun Uhr. Der Raum bleibt gleich: Raum zweihundertvier.",
          statement: "Die Schulung beginnt morgen um halb neun.",
          answer: true
        },
        {
          audio: "Guten Tag, hier ist das Personalbüro der Klinik Nord. Ihre Unterlagen sind angekommen, vielen Dank. Bitte bringen Sie zu Ihrem ersten Arbeitstag noch Ihren Ausweis und ein Foto mit. Wir freuen uns auf Sie!",
          statement: "Man soll einen Ausweis und ein Foto mitbringen.",
          answer: true
        },
        {
          audio: "Achtung, eine Durchsage für alle Besucher der Jobmesse: Der Vortrag über Bewerbungen fällt heute leider aus, weil der Referent krank ist. Alle anderen Vorträge finden wie geplant statt.",
          statement: "Heute fallen alle Vorträge aus.",
          answer: false
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Radio Wirtschaft am Morgen: Das neue Einkaufszentrum am Stadtrand sucht noch Personal. Es gibt achtzig freie Stellen, zum Beispiel im Verkauf und im Lager. Interessierte können sich online oder direkt im Zentrum bewerben.",
          frage: "Wie viele freie Stellen gibt es?",
          options: ["Achtzehn.", "Achtzig.", "Acht."],
          answer: 1
        },
        {
          audio: "Eine Information für unsere Fahrgäste: Wegen eines Streiks fahren heute nur wenige Busse. Wenn Sie zur Arbeit müssen, nehmen Sie besser die S-Bahn oder das Fahrrad. Der Streik dauert bis zum Abend.",
          frage: "Warum fahren heute nur wenige Busse?",
          options: ["Wegen des Wetters.", "Wegen einer Baustelle.", "Wegen eines Streiks."],
          answer: 2
        },
        {
          audio: "Und hier ein Tipp von Radio Campus: Die Universitätsbibliothek sucht Studentinnen und Studenten für die Abendschicht. Die Arbeitszeit ist von achtzehn bis zweiundzwanzig Uhr. Der Lohn: vierzehn Euro pro Stunde.",
          frage: "Wie viel verdient man pro Stunde?",
          options: ["Vierzehn Euro.", "Vierzig Euro.", "Vier Euro."],
          answer: 0
        },
        {
          audio: "Eine Durchsage: Die Kantine ist heute wegen einer Feier ab vierzehn Uhr geschlossen. Kalte Getränke bekommen Sie am Automaten im Erdgeschoss. Morgen ist die Kantine wieder normal geöffnet.",
          frage: "Wo bekommt man heute Nachmittag Getränke?",
          options: ["In der Kantine.", "Am Automaten im Erdgeschoss.", "Im ersten Stock."],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Chef", text: "Frau Ilic, können Sie morgen früher kommen? Wir haben um acht Uhr einen wichtigen Termin mit einem Kunden." },
            { speaker: "Frau Ilic", text: "Ja, das geht. Aber dann möchte ich am Nachmittag früher gehen, weil meine Tochter Geburtstag hat." },
            { speaker: "Chef", text: "Natürlich, das machen wir so." }
          ],
          statement: "Frau Ilic darf morgen Nachmittag früher gehen.",
          answer: true
        },
        {
          audio: [
            { speaker: "Kollege", text: "Hast du schon gehört? Herr Lange wechselt zu einer Firma nach Köln." },
            { speaker: "Kollegin", text: "Wirklich? Warum denn?" },
            { speaker: "Kollege", text: "Er sagt, dass er dort mehr verdient und die Arbeit interessanter ist." }
          ],
          statement: "Herr Lange bleibt in der Firma.",
          answer: false
        },
        {
          audio: [
            { speaker: "Frau Roth", text: "Praxis Doktor Sommer, guten Tag." },
            { speaker: "Herr Nowak", text: "Guten Tag, hier Nowak. Ich bin krank und brauche eine Krankmeldung für meinen Arbeitgeber. Kann ich heute noch vorbeikommen?" },
            { speaker: "Frau Roth", text: "Ja, kommen Sie bis elf Uhr, dann ist die Sprechstunde noch offen." }
          ],
          statement: "Herr Nowak soll bis elf Uhr in die Praxis kommen.",
          answer: true
        },
        {
          audio: [
            { speaker: "Kollegin", text: "Machst du dieses Jahr im Juli Urlaub?" },
            { speaker: "Kollege", text: "Nein, im Juli haben wir zu viel Arbeit. Ich nehme meinen Urlaub im September, dann sind die Flüge auch billiger." },
            { speaker: "Kollegin", text: "Das ist eine gute Idee." }
          ],
          statement: "Der Mann macht im Juli Urlaub.",
          answer: false
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderator", text: "Willkommen zu unserer Serie 'Mein Beruf'. Heute ist Frau Abadi zu Gast. Frau Abadi, Sie arbeiten als Krankenpflegerin. Wie lange machen Sie diesen Beruf schon?" },
        { speaker: "Frau Abadi", text: "Seit acht Jahren. Ich habe meine Ausbildung in Frankfurt gemacht und arbeite jetzt in einem Krankenhaus in Kassel." },
        { speaker: "Moderator", text: "Wie sieht Ihr Arbeitstag aus?" },
        { speaker: "Frau Abadi", text: "Das ist immer verschieden, weil wir in Schichten arbeiten. Diese Woche habe ich Frühdienst: Ich beginne um sechs Uhr und bin um vierzehn Uhr fertig." },
        { speaker: "Moderator", text: "Was ist schwer an Ihrem Beruf?" },
        { speaker: "Frau Abadi", text: "Wir haben zu wenig Personal, deshalb müssen wir oft sehr schnell arbeiten. Und die Nachtschichten sind anstrengend." },
        { speaker: "Moderator", text: "Und was gefällt Ihnen an der Arbeit?" },
        { speaker: "Frau Abadi", text: "Der Kontakt mit den Menschen. Wenn ein Patient gesund nach Hause geht und Danke sagt, dann weiß ich, dass mein Beruf wichtig ist. Ich möchte nichts anderes machen." }
      ],
      questions: [
        { frage: "Wie lange arbeitet Frau Abadi schon als Krankenpflegerin?", options: ["Seit sechs Jahren.", "Seit acht Jahren.", "Seit vierzehn Jahren."], answer: 1 },
        { frage: "Wo arbeitet sie jetzt?", options: ["In Kassel.", "In Frankfurt.", "In Köln."], answer: 0 },
        { frage: "Wann beginnt ihr Frühdienst?", options: ["Um vierzehn Uhr.", "Um acht Uhr.", "Um sechs Uhr."], answer: 2 },
        { frage: "Was findet Frau Abadi schwer?", options: ["Den Kontakt mit den Menschen.", "Die Nachtschichten.", "Die Ausbildung."], answer: 1 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Guten Tag, hier spricht Frau Petrenko von der Firma Norda. Es geht um Ihr Vorstellungsgespräch. Der Termin am Dienstag geht leider nicht, weil unser Chef auf einer Dienstreise ist. Der neue Termin ist am Donnerstag um halb elf. Bitte bringen Sie Ihre Zeugnisse mit und melden Sie sich am Empfang im zweiten Stock. Bei Fragen erreichen Sie mich unter null fünf einundfünfzig, acht neun drei zwei. Auf Wiederhören!",
      noteTitle: "Notiz: Anruf von der Firma Norda",
      gaps: [
        { label: "Es ruft an: Frau ____", answer: "Petrenko", alt: [] },
        { label: "Neuer Termin: am ____", answer: "Donnerstag", alt: ["donnerstag"] },
        { label: "Uhrzeit: ____ Uhr", answer: "10:30", alt: ["10.30", "halb elf", "halb 11", "1030"] },
        { label: "Mitbringen: ____", answer: "Zeugnisse", alt: ["die Zeugnisse"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihr Freund Karim hat Ihnen geschrieben. Er hat Fragen zu Ihrer neuen Arbeit.",
    incomingEmail: {
      von: "karim.fares@mail.de",
      betreff: "Deine neue Arbeit",
      text: "Hallo!\n\nich habe gehört, dass du eine neue Arbeit hast. Herzlichen Glückwunsch! Wie gefällt dir die neue Stelle, und was machst du dort genau? Hast du jetzt mehr Freizeit als früher? Wollen wir uns bald treffen?\n\nViele Grüße\nKarim"
    },
    points: [
      "Schreiben Sie, wie Ihnen die neue Arbeit gefällt und was Sie dort machen.",
      "Vergleichen Sie: Haben Sie jetzt mehr oder weniger Freizeit als früher?",
      "Machen Sie einen Vorschlag für ein Treffen."
    ],
    musterloesung: "Hallo Karim,\n\ndanke für deine E-Mail! Die neue Arbeit gefällt mir sehr gut. Ich arbeite jetzt im Büro einer kleinen Firma und schreibe Rechnungen und E-Mails an Kunden. Ich habe mehr Freizeit als früher, weil ich am Wochenende nicht mehr arbeiten muss. Wollen wir uns am Samstagnachmittag im Café am Markt treffen? Ich freue mich!\n\nViele Grüße",
    tipps: "At this level, try to connect your sentences: use \"weil\" for reasons and a comparative (\"mehr ... als früher\") for the comparison. Cover all three points and end with a question or suggestion for the meeting."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Ich heiße ... / Mein Name ist ...",
        "Ich bin ... Jahre alt.",
        "Ich wohne in ... / Ich komme aus ...",
        "Ich bin verheiratet. / Ich habe ... Geschwister.",
        "Ich arbeite als ... / Zurzeit suche ich eine Stelle als ...",
        "Ich spreche ..., und ich lerne gerade ...",
        "In meiner Freizeit ... ich gern ..."
      ]
    },
    teil2: {
      thema: "Arbeit und Beruf",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Was sind Sie von Beruf? Was machen Sie bei der Arbeit?",
        "Was ist Ihnen bei der Arbeit wichtig: das Geld, die Kollegen oder die Zeit?",
        "Möchten Sie lieber im Büro oder von zu Hause arbeiten? Warum?",
        "Was war Ihr Traumberuf als Kind?"
      ],
      redemittel: [
        "Ich arbeite als ... / Ich bin ... von Beruf.",
        "Für mich ist ... am wichtigsten, weil ...",
        "Ich arbeite lieber ..., denn ...",
        "Als Kind wollte ich ... werden.",
        "Wie ist das bei dir?"
      ]
    },
    teil3: {
      aufgabe: "Eine Kollegin verlässt die Firma. Planen Sie zusammen eine kleine Abschiedsfeier.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Wann feiern wir? (Tag und Uhrzeit)", "Wo feiern wir? (im Büro oder im Restaurant?)", "Was essen und trinken wir?", "Welches Geschenk kaufen wir?"],
      redemittel: [
        "Wollen wir am ... feiern?",
        "Wie wäre es mit ...?",
        "Das ist eine gute Idee!",
        "Ich glaube, das ist zu teuer. Vielleicht lieber ...",
        "Wer kauft das Geschenk?",
        "Gut, dann machen wir das so."
      ]
    }
  }
});
