window.TELC_EXAMS = window.TELC_EXAMS || [];
window.TELC_EXAMS.push({
  id: 3,
  title: "Modelltest 3",
  difficulty: "easy",
  level: "A2 · leicht",
  theme: "Wohnen & Nachbarschaft",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Ihr Wasserhahn in der Küche ist kaputt. Sie suchen einen Handwerker.",
        "Sie ziehen um und brauchen für einen Tag ein Umzugsauto.",
        "Sie haben zu viele Möbel und suchen einen Lagerraum.",
        "Sie wohnen in einer Wohnung, möchten aber einen kleinen Garten mieten.",
        "Sie fahren in den Urlaub und suchen jemanden für Ihre Blumen und Ihre Katze."
      ],
      ads: [
        "Möbelhaus Wohnwelt: Sofas, Tische und Schränke — große Auswahl, faire Preise. Mo–Sa 10–20 Uhr.",
        "Sanitär Fischer: Wir reparieren Wasserhähne, Duschen und Heizungen. Schneller Service, auch am Wochenende. Tel. 0160 2233445.",
        "Kleingartenverein Am Fluss: Gärten mit kleinem Haus zu vermieten, nur 300 Euro im Jahr. Jetzt anfragen!",
        "Malerbetrieb Colora: Wir streichen Ihre Wohnung schnell und sauber. Kostenloses Angebot am Telefon.",
        "Miet-Transporter Blitz: Umzugsautos ab 49 Euro pro Tag, auch samstags und sonntags. Einfach online buchen.",
        "Immobilien Krüger: Wir verkaufen Häuser und Wohnungen in der ganzen Region. Beratung kostenlos.",
        "Lager Plus: Saubere und trockene Lagerräume von 2 bis 20 m², ab 25 Euro im Monat. Zufahrt rund um die Uhr.",
        "Hilfe von nebenan: Nachbarn helfen Nachbarn — Blumen gießen, Haustiere füttern, einkaufen. Kostenlos anmelden!"
      ],
      answers: [1, 4, 6, 2, 7]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Mitteilung der Hausverwaltung",
          text: "Liebe Mieterinnen und Mieter, nächste Woche von Montag bis Mittwoch streicht die Firma Colora das Treppenhaus. Bitte stellen Sie in dieser Zeit keine Schuhe und keine Fahrräder ins Treppenhaus. Die Fahrräder können Sie in den Keller stellen. Am Dienstag fährt außerdem der Fahrstuhl nicht. Bei Fragen rufen Sie uns an: 030 445566. Vielen Dank für Ihr Verständnis!"
        },
        {
          titel: "Neuer Nachbarschaftstreff im Stadtteil",
          text: "Seit April gibt es in der Parkstraße 3 einen Nachbarschaftstreff. Das Programm: Am Montag ist Spielenachmittag für Jung und Alt, am Donnerstag öffnet ab 15 Uhr das Café für alle. Es gibt auch einen Deutschkurs und einen Computerkurs. Der Eintritt ist immer frei. Der Treff sucht noch Helferinnen und Helfer, zum Beispiel für das Café."
        }
      ],
      questions: [
        { textIndex: 0, frage: "Was macht die Firma nächste Woche?", options: ["Sie streicht das Treppenhaus.", "Sie repariert den Fahrstuhl.", "Sie putzt den Keller."], answer: 0 },
        { textIndex: 0, frage: "Wohin sollen die Fahrräder?", options: ["In den Hof.", "In den Keller.", "In die Wohnung."], answer: 1 },
        { textIndex: 0, frage: "Wann fährt der Fahrstuhl nicht?", options: ["Am Montag.", "Am Mittwoch.", "Am Dienstag."], answer: 2 },
        { textIndex: 1, frage: "Wann ist das Café im Treff geöffnet?", options: ["Am Donnerstag ab 15 Uhr.", "Jeden Tag ab 15 Uhr.", "Am Montag ab 15 Uhr."], answer: 0 },
        { textIndex: 1, frage: "Was sucht der Nachbarschaftstreff?", options: ["Neue Räume.", "Helferinnen und Helfer.", "Geld für Kurse."], answer: 1 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Liebe Nachbarn, am Freitagabend feiere ich meinen Geburtstag. Es kann bis 23 Uhr etwas laut werden. Ich bitte um Verständnis! Bei Fragen klingeln Sie gern bei mir. K. Demir, Wohnung 12",
        "Hallo Frau Neumann, ich habe Ihren Schlüssel gefunden. Er lag im Treppenhaus vor Ihrer Tür. Sie können ihn heute bei mir abholen. Ihr Nachbar aus dem 2. Stock, M. Vogel",
        "Liebe Hausgemeinschaft, am Samstag ab 10 Uhr putzen wir zusammen den Hof und pflanzen Blumen. Wer hilft mit? Bitte Handschuhe mitbringen! Ihre Hausverwaltung",
        "Hallo Jonas, wir sind endlich umgezogen! Die neue Wohnung ist hell und hat einen Balkon. Du musst uns bald besuchen. Viele Grüße aus der Lindenstraße, Katrin",
        "Sehr geehrte Frau Albers, die Heizung in unserer Wohnung ist seit gestern kalt. Können Sie bitte einen Handwerker schicken? Vielen Dank. Familie Rossi, 3. Stock"
      ],
      headlines: [
        "Schlüssel gefunden",
        "Beschwerde über laute Musik",
        "Umzug in eine neue Wohnung",
        "Heizung kaputt — bitte Reparatur",
        "Wohnung zu vermieten",
        "Information über eine Feier",
        "Gemeinsame Aktion im Hof",
        "Schlüssel verloren"
      ],
      answers: [5, 0, 6, 2, 3]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Unser Haus in der Bergstraße",
      text: "Ich wohne seit drei Jahren in der Bergstraße 8. Das Haus ist alt, aber schön. Es hat vier Stockwerke und einen kleinen Hof mit einem großen Baum. Im Erdgeschoss wohnt Herr Otto. Er ist 70 Jahre alt und kennt alle im Haus. Er hilft gern: Er nimmt Pakete für die Nachbarn an und gießt im Sommer die Blumen im Hof.\n\nNeben mir wohnt Familie Haddad. Ihre Tochter Lina ist acht Jahre alt und sehr freundlich. Am Wochenende ist der Hof unser Treffpunkt. Die Kinder spielen, und die Erwachsenen trinken zusammen Tee oder Kaffee. Einmal im Jahr, im Juni, machen wir ein Hoffest. Jede Familie bringt etwas zu essen mit.\n\nNatürlich gibt es auch Probleme: Die Treppe ist dunkel, und der Keller ist klein. Aber die Nachbarn sind freundlich, und das ist mir am wichtigsten. Ich möchte hier nicht mehr ausziehen.",
      statements: [
        { text: "Die Erzählerin wohnt seit drei Jahren in dem Haus.", answer: true },
        { text: "Herr Otto wohnt im vierten Stock.", answer: false },
        { text: "Herr Otto nimmt Pakete für die Nachbarn an.", answer: true },
        { text: "Das Hoffest ist zweimal im Jahr.", answer: false },
        { text: "Die Erzählerin möchte bald umziehen.", answer: false }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Liebe Selma,\n\nich habe eine neue Wohnung [1]! Sie liegt im dritten Stock und hat zwei Zimmer. Vom Balkon [2] man den Park sehen. Meine Nachbarn [3] sehr nett. Gestern hat mir eine Nachbarin einen Kuchen [4]. Am Samstag ziehe ich um. Kannst du mir [5]? Wir sind [6] Abend fertig, dann bestelle ich Pizza für alle.\n\nLiebe Grüße\nOlga",
      gaps: [
        { options: ["gefunden", "finden", "findet"], answer: 0 },
        { options: ["kannst", "kann", "können"], answer: 1 },
        { options: ["ist", "seid", "sind"], answer: 2 },
        { options: ["bringen", "gebracht", "bringt"], answer: 1 },
        { options: ["helfen", "hilfst", "hilft"], answer: 0 },
        { options: ["im", "am", "um"], answer: 1 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Liebe Nachbarinnen und Nachbarn,\n\nwir sind neu im Haus und möchten uns gern [1]. Wir heißen Mateo und Ana und wohnen jetzt im ersten [2]. Am Sonntag machen wir eine kleine [3] und laden Sie herzlich [4]. Es gibt Kaffee, Kuchen und kalte [5]. Kommen Sie einfach ab 15 Uhr vorbei, Sie müssen nichts [6].\n\nWir freuen uns auf Sie!\nMateo und Ana",
      wordBank: ["ein", "Feier", "Zimmer", "vorstellen", "aus", "Getränke", "Straße", "Stock", "Fragen", "mitbringen", "an", "Arbeit"],
      answers: [3, 7, 1, 0, 5, 9]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Entschuldigung, ist die Wohnung im zweiten Stock noch frei?\"", options: ["Nein, sie ist leider schon vermietet.", "Ja, der zweite Stock ist oben.", "Die Wohnung hat drei Zimmer."], answer: 0 },
        { prompt: "\"Können Sie bitte die Musik leiser machen? Ich muss morgen früh arbeiten.\"", options: ["Ich höre gern Musik.", "Oh, Entschuldigung! Natürlich, mache ich sofort.", "Morgen ist Dienstag."], answer: 1 },
        { prompt: "\"Wo kann ich mein Fahrrad abstellen?\"", options: ["Das Fahrrad ist blau.", "Ich fahre nicht gern Fahrrad.", "Im Hof, neben der Garage."], answer: 2 },
        { prompt: "\"Haben Sie gestern mein Paket angenommen?\"", options: ["Ja, es liegt bei mir. Kommen Sie einfach vorbei.", "Nein, ich habe nichts bestellt.", "Das Paket ist sehr schwer."], answer: 0 },
        { prompt: "\"Wie gefällt Ihnen die neue Wohnung?\"", options: ["Die Miete kostet 700 Euro.", "Sehr gut, sie ist hell und ruhig.", "Ich wohne schon lange hier."], answer: 1 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Guten Tag, hier ist die Hausverwaltung Weber. Unser Büro ist heute nur bis zwölf Uhr geöffnet. Ab morgen sind wir wieder wie immer von neun bis siebzehn Uhr für Sie da. Auf Wiederhören!",
          statement: "Das Büro ist heute bis zwölf Uhr geöffnet.",
          answer: true
        },
        {
          audio: "Achtung, eine Durchsage: Wegen Bauarbeiten gibt es morgen von acht bis vierzehn Uhr in der Gartenstraße kein Wasser. Bitte füllen Sie heute Abend Wasser in Flaschen. Vielen Dank!",
          statement: "Morgen gibt es den ganzen Tag kein Wasser.",
          answer: false
        },
        {
          audio: "Guten Tag, hier ist die Firma Elektro Brandt. Unsere Werkstatt ist diese Woche geschlossen. Ab Montag sind wir wieder für Sie da. Bei Notfällen wählen Sie bitte die null eins fünf zwei, drei sechs sieben neun.",
          statement: "Die Firma ist diese Woche geöffnet.",
          answer: false
        },
        {
          audio: "Hallo, hier spricht Hausmeister Paulsen. Gute Nachrichten: Der Fahrstuhl ist wieder repariert. Sie können ihn ab sofort wieder benutzen. Danke für Ihre Geduld und einen schönen Tag!",
          statement: "Der Fahrstuhl funktioniert wieder.",
          answer: true
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Ein Tipp für alle Neuen in der Stadt: Am Sonntag ist Tag der offenen Tür im Nachbarschaftszentrum an der Parkstraße. Von elf bis sechzehn Uhr gibt es Musik, Spiele und Informationen über Kurse. Der Eintritt ist frei.",
          frage: "Wo ist der Tag der offenen Tür?",
          options: ["Im Rathaus.", "Im Nachbarschaftszentrum.", "Im Park."],
          answer: 1
        },
        {
          audio: "Eine Information für die Bewohner der Hafenstraße: Am Donnerstag holt die Stadt alte Möbel ab. Stellen Sie Ihre Möbel bitte erst am Mittwochabend vor das Haus, nicht früher. Vielen Dank!",
          frage: "Wann soll man die Möbel vor das Haus stellen?",
          options: ["Am Mittwochabend.", "Am Donnerstagabend.", "Am Montagmorgen."],
          answer: 0
        },
        {
          audio: "Radio Region informiert: In unserer Stadt gibt es jetzt das Nachbarschaftstelefon. Wer Hilfe im Haushalt braucht, ruft einfach an. Studenten helfen dann zum Beispiel beim Tragen oder im Garten. Eine Stunde kostet zehn Euro.",
          frage: "Wie viel kostet eine Stunde Hilfe?",
          options: ["Zwei Euro.", "Fünf Euro.", "Zehn Euro."],
          answer: 2
        },
        {
          audio: "Liebe Mieterinnen und Mieter, eine Durchsage: Die Tiefgarage bleibt am Freitag wegen Reinigung geschlossen. Bitte parken Sie an diesem Tag auf dem Parkplatz hinter dem Haus. Danke für Ihr Verständnis!",
          frage: "Wo sollen die Mieter am Freitag parken?",
          options: ["In der Tiefgarage.", "Hinter dem Haus.", "Vor dem Supermarkt."],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Frau Lang", text: "Guten Morgen, Herr Peters. Wir fahren morgen für eine Woche in den Urlaub. Können Sie unsere Blumen gießen?" },
            { speaker: "Herr Peters", text: "Ja, das mache ich gern. Geben Sie mir einfach den Schlüssel." },
            { speaker: "Frau Lang", text: "Vielen Dank! Ich bringe ihn heute Abend vorbei." }
          ],
          statement: "Herr Peters soll im Urlaub die Blumen gießen.",
          answer: true
        },
        {
          audio: [
            { speaker: "Mieterin", text: "Herr Krohn, das Licht im Treppenhaus ist kaputt. Abends ist es ganz dunkel." },
            { speaker: "Hausmeister", text: "Danke für die Information. Ich kaufe heute eine neue Lampe und repariere das Licht morgen früh." },
            { speaker: "Mieterin", text: "Das ist gut, vielen Dank!" }
          ],
          statement: "Der Hausmeister repariert das Licht noch heute.",
          answer: false
        },
        {
          audio: [
            { speaker: "Mann", text: "Hallo, ich bin Ihr neuer Nachbar, Timo Berg. Ich bin gestern eingezogen." },
            { speaker: "Frau", text: "Herzlich willkommen! Ich bin Rita Sommer. Wenn Sie Fragen haben, klingeln Sie einfach bei mir." },
            { speaker: "Mann", text: "Danke, das ist sehr nett!" }
          ],
          statement: "Herr Berg wohnt schon lange im Haus.",
          answer: false
        },
        {
          audio: [
            { speaker: "Frau", text: "Die Wohnung gefällt mir wirklich gut. Wie hoch ist die Miete?" },
            { speaker: "Vermieter", text: "Sechshundertzwanzig Euro, mit Heizung." },
            { speaker: "Frau", text: "Das ist okay. Ich nehme die Wohnung." }
          ],
          statement: "Die Frau möchte die Wohnung mieten.",
          answer: true
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderatorin", text: "Willkommen bei Radio Grün! Herr Beck, Sie haben in Ihrem Stadtteil einen Garten für alle Nachbarn gemacht. Wie ist die Idee entstanden?" },
        { speaker: "Herr Beck", text: "Vor drei Jahren war hinter unserem Haus ein leerer Platz. Ich habe die Nachbarn gefragt: Wollen wir hier einen Garten machen? Zwölf Familien haben Ja gesagt." },
        { speaker: "Moderatorin", text: "Was wächst denn in dem Garten?" },
        { speaker: "Herr Beck", text: "Tomaten, Salat und viele Kräuter. Die Kinder haben ein eigenes Beet mit Erdbeeren." },
        { speaker: "Moderatorin", text: "Und wer arbeitet im Garten?" },
        { speaker: "Herr Beck", text: "Alle zusammen. Jede Familie hilft zwei Stunden pro Woche. Am Samstag treffen wir uns oft alle im Garten." },
        { speaker: "Moderatorin", text: "Was ist das Schönste für Sie?" },
        { speaker: "Herr Beck", text: "Die Menschen kennen sich jetzt. Früher habe ich meine Nachbarn nur kurz im Treppenhaus gesehen. Heute sind wir Freunde." }
      ],
      questions: [
        { frage: "Wann hat der Garten angefangen?", options: ["Vor drei Jahren.", "Vor zwölf Jahren.", "Vor zwei Monaten."], answer: 0 },
        { frage: "Was haben die Kinder im Garten?", options: ["Einen Spielplatz.", "Ein Beet mit Erdbeeren.", "Ein kleines Haus."], answer: 1 },
        { frage: "Wie viel hilft jede Familie pro Woche?", options: ["Zwölf Stunden.", "Zwei Tage.", "Zwei Stunden."], answer: 2 },
        { frage: "Was findet Herr Beck am schönsten?", options: ["Das Gemüse ist billig.", "Die Nachbarn sind jetzt Freunde.", "Der Platz ist nicht mehr leer."], answer: 1 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Guten Tag, hier spricht Herr Sauer von der Hausverwaltung Domus. Es geht um Ihre kaputte Heizung. Der Handwerker kommt am Montag zu Ihnen. Er ist um vierzehn Uhr da. Bitte bleiben Sie zu Hause und machen Sie die Kellertür auf, der Handwerker muss auch in den Keller. Wenn Sie Fragen haben, rufen Sie mich an: null drei null, sechs sieben eins zwei. Auf Wiederhören!",
      noteTitle: "Notiz: Anruf von der Hausverwaltung",
      gaps: [
        { label: "Es ruft an: Herr ____", answer: "Sauer", alt: [] },
        { label: "Der Handwerker kommt am: ____", answer: "Montag", alt: ["montag"] },
        { label: "Uhrzeit: ____ Uhr", answer: "14", alt: ["vierzehn", "14:00", "14.00"] },
        { label: "Bitte aufmachen: ____", answer: "Kellertür", alt: ["die Kellertür", "Kellertuer"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihr Freund Piotr hat Ihnen geschrieben. Er zieht am Samstag um und braucht Hilfe.",
    incomingEmail: {
      von: "piotr.zielinski@mail.de",
      betreff: "Hilfe beim Umzug?",
      text: "Hallo!\n\nich ziehe am Samstag in meine neue Wohnung in der Blumenstraße. Kannst du mir beim Umzug helfen? Ab wann hast du Zeit? Und hast du vielleicht ein Auto?\n\nViele Grüße\nPiotr"
    },
    points: [
      "Sagen Sie: Sie helfen gern beim Umzug.",
      "Schreiben Sie, ab wann Sie am Samstag Zeit haben.",
      "Antworten Sie auf die Frage nach dem Auto."
    ],
    musterloesung: "Hallo Piotr,\n\ndanke für deine E-Mail! Natürlich helfe ich dir gern beim Umzug. Am Samstag habe ich ab 9 Uhr Zeit, ich komme direkt zu deiner alten Wohnung. Ein Auto habe ich leider nicht, aber mein Bruder hat einen großen Wagen. Ich frage ihn heute.\n\nBis Samstag!\nViele Grüße",
    tipps: "Answer all three points, even the negative one — if you don't have a car, say so and offer an alternative. A greeting and a closing are part of the score."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Ich heiße ... / Mein Name ist ...",
        "Ich bin ... Jahre alt.",
        "Ich wohne in ... / Ich komme aus ...",
        "Ich wohne allein. / Ich wohne mit ... zusammen.",
        "Ich arbeite als ... / Ich bin ... von Beruf.",
        "Ich spreche ... und ein bisschen ...",
        "In meiner Freizeit ... ich gern ..."
      ]
    },
    teil2: {
      thema: "Wohnen",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Wie wohnen Sie: in einer Wohnung oder in einem Haus?",
        "Was gefällt Ihnen an Ihrer Wohnung oder Ihrem Haus?",
        "Kennen Sie Ihre Nachbarn? Wie sind sie?",
        "Wohnen Sie lieber in der Stadt oder auf dem Land? Warum?"
      ],
      redemittel: [
        "Ich wohne in einer Wohnung / in einem Haus mit ...",
        "Mir gefällt besonders ...",
        "Meine Nachbarn sind ... / Wir sprechen oft über ...",
        "Ich wohne lieber ..., denn ...",
        "Und wie wohnst du?"
      ]
    },
    teil3: {
      aufgabe: "Planen Sie zusammen ein Fest für Ihre Nachbarn im Hof.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Wann feiern wir? (Tag und Uhrzeit)", "Was essen und trinken wir?", "Wer macht was? (Tische, Musik, Einladungen)", "Was machen wir bei Regen?"],
      redemittel: [
        "Wollen wir am ... feiern?",
        "Wie wäre es mit ...?",
        "Das ist eine gute Idee!",
        "Ich kann ... mitbringen, und du ...?",
        "Bei Regen können wir vielleicht ...",
        "Gut, dann machen wir das so."
      ]
    }
  }
});
