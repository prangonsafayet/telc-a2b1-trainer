export default {
  id: 2,
  title: "Modelltest 2",
  difficulty: "easy",
  level: "A2 · leicht",
  theme: "Einkaufen & Essen",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Sie möchten frischen Fisch kaufen.",
        "Sie wollen mit Freunden vegetarisch essen gehen.",
        "Sie brauchen für Sonntag eine Geburtstagstorte.",
        "Sie möchten kochen lernen.",
        "Sie kommen spät von der Arbeit und möchten am Abend noch Lebensmittel einkaufen."
      ],
      ads: [
        "Metzgerei Huber: Wurst und Fleisch aus der Region. Di–Sa 8–18 Uhr, Marktstraße 4.",
        "Restaurant Grüner Garten: Vegetarische Küche, frische Salate und Gemüsegerichte. Täglich ab 17 Uhr geöffnet.",
        "Eiscafé Venezia: 20 Sorten Eis, hausgemachte Waffeln. Bei schönem Wetter Terrasse offen!",
        "Kochschule Pfanne: Kochkurse für Anfänger, jeden Donnerstag 18–21 Uhr. Jetzt Platz sichern!",
        "Supermarkt City: Bei uns kaufen Sie täglich bis 24 Uhr ein. Große Auswahl, kleine Preise. Am Bahnhofsplatz 1.",
        "Konditorei Zuckersüß: Torten für Geburtstage und Feste auf Bestellung. Bestellen Sie bis Donnerstag, abholen am Wochenende!",
        "Café Morgenlicht: Frühstück von 8 bis 12 Uhr, große Auswahl an Tee und Kaffee.",
        "Fisch Petersen: Frischer Fisch aus der Nordsee, jeden Mittwoch und Freitag neue Ware. Hafenstraße 9."
      ],
      answers: [7, 1, 5, 3, 4]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Der neue Bioladen in der Gartenstraße",
          text: "Seit zwei Monaten gibt es in der Gartenstraße 15 einen Bioladen. Der Laden ist von Montag bis Samstag von 9 bis 19 Uhr geöffnet. Es gibt Obst, Gemüse, Brot und Käse aus der Region. Jeden Samstag können die Kunden neue Produkte kostenlos probieren. Wer oft einkauft, bekommt die Kundenkarte: Beim zehnten Einkauf gibt es 5 Euro Rabatt."
        },
        {
          titel: "Restaurant Olive",
          text: "Das Restaurant Olive in der Altstadt ist täglich von 11:30 bis 22 Uhr geöffnet. Von Montag bis Freitag gibt es ein Mittagsmenü für 9,50 Euro. Dienstag ist Suppentag: Alle Suppen kosten nur 4 Euro. Im Sommer sitzen die Gäste gern im Garten hinter dem Haus. Am Wochenende ist das Restaurant oft voll. Reservieren Sie dann bitte einen Tisch unter 0621 778899."
        }
      ],
      questions: [
        { textIndex: 0, frage: "An welchen Tagen ist der Bioladen geöffnet?", options: ["Nur am Samstag.", "Von Montag bis Samstag.", "Jeden Tag."], answer: 1 },
        { textIndex: 0, frage: "Was kann man am Samstag im Laden machen?", options: ["Kochen lernen.", "Blumen kaufen.", "Produkte kostenlos probieren."], answer: 2 },
        { textIndex: 0, frage: "Was bekommt man mit der Kundenkarte?", options: ["Beim zehnten Einkauf 5 Euro Rabatt.", "Jeden Tag 10 Prozent Rabatt.", "Ein Brot gratis."], answer: 0 },
        { textIndex: 1, frage: "Wann gibt es das Mittagsmenü?", options: ["Am Wochenende.", "Jeden Tag.", "Von Montag bis Freitag."], answer: 2 },
        { textIndex: 1, frage: "Was soll man am Wochenende machen?", options: ["Einen Tisch reservieren.", "Im Garten bezahlen.", "Nur Suppe bestellen."], answer: 0 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Hallo Ben, ich koche heute Abend eine Suppe. Kannst du auf dem Heimweg bitte Kartoffeln und Zwiebeln kaufen? Danke dir! Nina",
        "Hi Sara, das neue Café am Markt ist toll! Der Kuchen dort ist selbst gemacht. Wollen wir am Freitagnachmittag zusammen hingehen? Deine Lea",
        "Lieber Herr Kowalski, Ihre Torte ist fertig. Sie können sie morgen ab 9 Uhr bei uns abholen. Mit freundlichen Grüßen, Ihre Bäckerei Land",
        "Hallo Mama, dein Rezept war super! Die Lasagne hat allen Gästen geschmeckt. Kannst du mir jetzt auch das Rezept für deinen Apfelkuchen schicken? Dein David",
        "Liebe Kolleginnen und Kollegen, am Donnerstag gehen wir nach der Arbeit zusammen Pizza essen. Wer kommt mit? Bitte sagt mir bis Mittwoch Bescheid. Tom"
      ],
      headlines: [
        "Bestellung abholen",
        "Einladung zum Pizzaessen",
        "Bitte etwas einkaufen",
        "Restaurant heute geschlossen",
        "Frage nach einem Rezept",
        "Kuchen ist nicht gelungen",
        "Vorschlag: zusammen ins Café",
        "Lob für den Supermarkt"
      ],
      answers: [2, 6, 0, 4, 1]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Einkaufen auf dem Wochenmarkt",
      text: "Ich heiße Julia und kaufe gern auf dem Wochenmarkt ein. Der Markt ist zweimal in der Woche: am Mittwoch und am Samstag. Ich gehe fast immer am Samstagmorgen hin, denn dann habe ich Zeit.\n\nAuf dem Markt gibt es viele Stände. Obst und Gemüse kaufe ich bei einem Bauern aus der Region. Seine Tomaten sind ein bisschen teurer als im Supermarkt, aber sie schmecken viel besser. Brot und Brötchen kaufe ich am Stand von Familie Krause. Ihr Brot ist immer frisch.\n\nMein Mann kommt manchmal mit. Er trinkt dann einen Kaffee am Kaffeestand und spricht mit den Leuten. Um zwölf Uhr machen viele Stände günstige Preise, denn der Markt endet um 13 Uhr. Dann kaufe ich manchmal noch Blumen für unsere Küche. Nach dem Markt kochen mein Mann und ich zu Hause zusammen das Mittagessen. Das ist unser kleines Ritual am Samstag.",
      statements: [
        { text: "Der Markt ist zweimal pro Woche.", answer: true },
        { text: "Julia geht meistens am Mittwoch auf den Markt.", answer: false },
        { text: "Die Tomaten vom Bauern sind billiger als im Supermarkt.", answer: false },
        { text: "Der Markt endet um 13 Uhr.", answer: true },
        { text: "Nach dem Markt kochen Julia und ihr Mann zusammen.", answer: true }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Lieber Jan,\n\nam Samstag mache ich eine kleine Party und ich [1] einen Salat und eine Suppe kochen. Kannst du [2] beim Einkaufen helfen? Wir treffen [3] um zehn Uhr vor dem Supermarkt. Ich habe schon eine Einkaufsliste [4]. Wir brauchen Gemüse, Reis und Saft. Hast du [5] Auto? Die Sachen sind schwer. Danach lade ich dich [6] einem Kaffee ein.\n\nViele Grüße\nMartha",
      gaps: [
        { options: ["möchtest", "möchte", "möchtet"], answer: 1 },
        { options: ["mich", "ich", "mir"], answer: 2 },
        { options: ["uns", "sich", "euch"], answer: 0 },
        { options: ["schreiben", "geschrieben", "schreibt"], answer: 1 },
        { options: ["eine", "einen", "ein"], answer: 2 },
        { options: ["zu", "für", "mit"], answer: 0 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Liebe Frau Sommer,\n\nvielen Dank für die [1] zum Abendessen am Freitag. Ich komme sehr [2]. Ich esse kein Fleisch, aber Fisch ist kein [3]. Soll ich einen Nachtisch [4]? Ich backe gern Kuchen. Sagen Sie mir bitte noch [5], wann ich kommen soll. Ich freue mich schon [6] Freitag!\n\nHerzliche Grüße\nAmira Said",
      wordBank: ["auf", "Einladung", "trinken", "gern", "Problem", "an", "Bescheid", "mitbringen", "Frage", "spät", "über", "Antwort"],
      answers: [1, 3, 4, 7, 6, 0]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Guten Tag! Was darf es sein?\"", options: ["Ich bin um zehn Uhr da.", "Ich hätte gern 200 Gramm Käse.", "Das Wetter ist heute schön."], answer: 1 },
        { prompt: "\"Schmeckt Ihnen die Suppe?\"", options: ["Die Suppe kostet vier Euro.", "Ja, sie ist sehr lecker.", "Nein, ich koche nicht gern."], answer: 1 },
        { prompt: "\"Haben Sie die Milch auch in einer kleinen Flasche?\"", options: ["Nein, leider nur in der großen.", "Ja, die Milch ist von heute.", "Die Flasche ist aus Glas."], answer: 0 },
        { prompt: "\"Möchten Sie hier essen oder mitnehmen?\"", options: ["Ich esse gern Pizza.", "Das Essen war gestern gut.", "Zum Mitnehmen, bitte."], answer: 2 },
        { prompt: "\"Kann ich mit Karte zahlen?\"", options: ["Ja, natürlich, kein Problem.", "Nein, ich habe keine Karte.", "Die Speisekarte liegt auf dem Tisch."], answer: 0 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Liebe Kundinnen und Kunden, unser Geschäft schließt in fünfzehn Minuten. Bitte gehen Sie langsam zu den Kassen. Morgen sind wir ab acht Uhr wieder für Sie da. Vielen Dank für Ihren Einkauf!",
          statement: "Das Geschäft öffnet morgen um acht Uhr.",
          answer: true
        },
        {
          audio: "Achtung, liebe Marktbesucher: Der Käsestand von Familie Groß ist heute leider nicht da. Käse bekommen Sie aber am Stand Nummer zwölf, gleich neben dem Blumenstand.",
          statement: "Heute gibt es auf dem Markt keinen Käse.",
          answer: false
        },
        {
          audio: "Guten Tag, hier ist das Restaurant Adria. Für Samstagabend können Sie leider keinen Tisch mehr reservieren, wir sind schon voll. Für Sonntag haben wir noch Plätze frei. Rufen Sie gern noch einmal an.",
          statement: "Am Sonntag gibt es noch freie Tische.",
          answer: true
        },
        {
          audio: "Liebe Kundinnen und Kunden, heute im Angebot: Orangensaft, die Flasche für nur einen Euro zwanzig. Sie finden den Saft im ersten Stock bei den Getränken.",
          statement: "Der Orangensaft kostet heute zwei Euro zwanzig.",
          answer: false
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Radio Morgen mit einem Tipp: Am Samstag öffnet in der Innenstadt ein neuer Bauernmarkt. Von neun bis vierzehn Uhr gibt es dort Käse, Honig und frisches Brot. Der Markt findet ab jetzt jeden Samstag statt.",
          frage: "Wann endet der Bauernmarkt?",
          options: ["Um neun Uhr.", "Um vierzehn Uhr.", "Um sechzehn Uhr."],
          answer: 1
        },
        {
          audio: "Eine Information für unsere Kunden: Die Bäckerei im Eingangsbereich ist heute wegen Krankheit geschlossen. Brot und Brötchen bekommen Sie heute an der Käsetheke. Wir danken für Ihr Verständnis.",
          frage: "Wo bekommt man heute Brot?",
          options: ["An der Käsetheke.", "In der Bäckerei.", "Am Eingang."],
          answer: 0
        },
        {
          audio: "Und jetzt ein Tipp zum Kochen: Auf unserer Internetseite finden Sie jede Woche ein neues Rezept. Diese Woche gibt es eine Gemüsesuppe. Das Rezept ist einfach, und die Suppe kostet pro Person nur ungefähr zwei Euro.",
          frage: "Wie viel kostet die Suppe pro Person ungefähr?",
          options: ["Zehn Euro.", "Fünf Euro.", "Zwei Euro."],
          answer: 2
        },
        {
          audio: "Eine Durchsage im Kaufhaus: Heute können Sie im Erdgeschoss kostenlos unsere neue Schokolade probieren. Kommen Sie vorbei! Die Aktion läuft noch bis siebzehn Uhr.",
          frage: "Was kann man heute kostenlos machen?",
          options: ["Schokolade probieren.", "Kuchen essen.", "Kaffee trinken."],
          answer: 0
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Kunde", text: "Guten Tag, ich hätte gern ein Kilo Tomaten." },
            { speaker: "Verkäuferin", text: "Gern. Möchten Sie auch Gurken? Die sind heute im Angebot." },
            { speaker: "Kunde", text: "Nein danke, nur die Tomaten." }
          ],
          statement: "Der Kunde kauft Tomaten und Gurken.",
          answer: false
        },
        {
          audio: [
            { speaker: "Kellner", text: "Haben Sie schon gewählt?" },
            { speaker: "Gast", text: "Ja, ich nehme das Hähnchen mit Reis. Und ein Wasser, bitte." },
            { speaker: "Kellner", text: "Gern, kommt sofort." }
          ],
          statement: "Der Gast bestellt Hähnchen mit Reis.",
          answer: true
        },
        {
          audio: [
            { speaker: "Anna", text: "Ich backe morgen einen Kuchen für Omas Geburtstag. Hast du noch Eier zu Hause?" },
            { speaker: "Ben", text: "Ja, ich habe noch sechs Eier. Ich bringe sie dir heute Abend vorbei." },
            { speaker: "Anna", text: "Super, danke dir!" }
          ],
          statement: "Ben bringt Anna heute Abend Eier.",
          answer: true
        },
        {
          audio: [
            { speaker: "Kundin", text: "Ist das Brot von heute?" },
            { speaker: "Verkäufer", text: "Das Weißbrot ja. Das Bauernbrot ist von gestern, es kostet nur noch die Hälfte." },
            { speaker: "Kundin", text: "Dann nehme ich das Bauernbrot." }
          ],
          statement: "Die Kundin kauft das Weißbrot.",
          answer: false
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderator", text: "Guten Tag und willkommen bei Radio Markt! Heute ist Frau Yilmaz bei uns. Frau Yilmaz, Sie haben einen Gemüseladen in der Altstadt. Seit wann gibt es den Laden?" },
        { speaker: "Frau Yilmaz", text: "Den Laden gibt es seit fünf Jahren. Zuerst war er sehr klein, jetzt haben wir mehr Platz." },
        { speaker: "Moderator", text: "Was verkaufen Sie denn alles?" },
        { speaker: "Frau Yilmaz", text: "Obst und Gemüse, aber auch Oliven, Käse und frisches Brot. Das Brot kommt jeden Morgen von einer Bäckerei aus unserer Straße." },
        { speaker: "Moderator", text: "Wann beginnt Ihr Arbeitstag?" },
        { speaker: "Frau Yilmaz", text: "Sehr früh! Ich stehe um vier Uhr auf und fahre zum Großmarkt. Um acht Uhr öffne ich dann den Laden." },
        { speaker: "Moderator", text: "Und was gefällt Ihnen an Ihrer Arbeit?" },
        { speaker: "Frau Yilmaz", text: "Die Kunden! Viele kommen jeden Tag. Wir sprechen oft über Rezepte, das macht mir Freude. Nur der Sonntag ist mir wichtig: Da bleibt der Laden zu, und ich koche für meine Familie." }
      ],
      questions: [
        { frage: "Seit wann gibt es den Laden?", options: ["Seit vier Jahren.", "Seit fünf Jahren.", "Seit acht Jahren."], answer: 1 },
        { frage: "Woher kommt das Brot?", options: ["Von einer Bäckerei in der Nähe.", "Vom Großmarkt.", "Frau Yilmaz backt es selbst."], answer: 0 },
        { frage: "Um wie viel Uhr öffnet der Laden?", options: ["Um vier Uhr.", "Um sechs Uhr.", "Um acht Uhr."], answer: 2 },
        { frage: "Was macht Frau Yilmaz am Sonntag?", options: ["Sie arbeitet im Laden.", "Sie kocht für ihre Familie.", "Sie fährt zum Großmarkt."], answer: 1 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Hallo, hier ist Herr Lindner vom Restaurant Bella Vista. Ich rufe an wegen Ihrer Reservierung. Der Tisch am Samstag um acht Uhr ist leider nicht mehr frei. Ich kann Ihnen aber einen Tisch um halb sieben am Abend anbieten. Der Tisch ist dann für sechs Personen reserviert. Bitte rufen Sie kurz zurück, ob das passt. Unsere Nummer ist: null vier null, zwei acht neun sieben. Vielen Dank und auf Wiederhören!",
      noteTitle: "Notiz: Anruf vom Restaurant",
      gaps: [
        { label: "Es ruft an: Herr ____", answer: "Lindner", alt: [] },
        { label: "Reservierung am: ____", answer: "Samstag", alt: ["samstag"] },
        { label: "Neue Uhrzeit: ____ Uhr", answer: "18:30", alt: ["18.30", "halb sieben", "halb 7", "6:30", "1830"] },
        { label: "Tisch für ____ Personen", answer: "sechs", alt: ["6"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihr Freund Deniz hat Ihnen geschrieben. Er möchte am Sonntag mit Ihnen kochen.",
    incomingEmail: {
      von: "deniz.acar@mail.de",
      betreff: "Kochen am Sonntag?",
      text: "Hallo!\n\nam Sonntag möchte ich für uns kochen. Kommst du zu mir? Was möchtest du gern essen? Ich gehe am Samstag einkaufen. Kannst du mir beim Einkaufen helfen?\n\nViele Grüße\nDeniz"
    },
    points: [
      "Sagen Sie: Sie kommen am Sonntag gern.",
      "Schreiben Sie, was Sie gern essen möchten.",
      "Antworten Sie: Können Sie beim Einkaufen helfen? Wann?"
    ],
    musterloesung: "Hallo Deniz,\n\ndanke für deine Einladung! Ich komme am Sonntag sehr gern zu dir. Ich möchte gern Gemüselasagne essen, die finde ich super. Beim Einkaufen kann ich dir natürlich helfen. Ich habe am Samstag ab 10 Uhr Zeit. Wir treffen uns einfach vor dem Supermarkt.\n\nBis Samstag!\nViele Grüße",
    tipps: "Answer all three points in order, and use a greeting and a closing. Short main clauses are fine at this level — one or two sentences per point is enough."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Ich heiße ... / Mein Name ist ...",
        "Ich bin ... Jahre alt.",
        "Ich wohne in ... / Ich komme aus ...",
        "Ich bin ledig. / Ich bin verheiratet und habe ... Kinder.",
        "Ich arbeite als ... / Ich bin ... von Beruf.",
        "Ich spreche ... und ein bisschen ...",
        "Mein Hobby ist ... / Ich ... gern."
      ]
    },
    teil2: {
      thema: "Einkaufen",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Wo kaufen Sie Ihre Lebensmittel ein?",
        "Wie oft gehen Sie einkaufen?",
        "Kaufen Sie lieber im Supermarkt oder auf dem Markt? Warum?",
        "Was kaufen Sie nicht gern ein?"
      ],
      redemittel: [
        "Ich kaufe meistens in/auf ... ein.",
        "Einmal / Zweimal pro Woche ...",
        "Ich finde den Markt besser, denn ...",
        "... kaufe ich nicht gern, das ist langweilig/teuer.",
        "Und wo kaufst du ein?"
      ]
    },
    teil3: {
      aufgabe: "Planen Sie zusammen ein gemeinsames Abendessen: Sie möchten für Freunde kochen.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Wann kochen wir? (Tag und Uhrzeit)", "Was kochen wir?", "Wer kauft was ein?", "Wen laden wir ein?"],
      redemittel: [
        "Wollen wir am ... kochen?",
        "Wie wäre es mit ...?",
        "Gute Idee! / Das finde ich nicht so gut.",
        "Ich kaufe ..., und du kaufst ...",
        "Sollen wir ... einladen?",
        "Okay, dann machen wir das so."
      ]
    }
  }
};
