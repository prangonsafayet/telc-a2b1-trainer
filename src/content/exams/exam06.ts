import { type Exam } from '@/shared/types';

const exam = {
  id: 6,
  title: "Modelltest 6",
  difficulty: "medium",
  level: "A2+ · mittel",
  theme: "Reisen & Verkehr",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Sie möchten im Juli mit Ihren zwei Kindern günstig Urlaub am Meer machen.",
        "Ihr Koffer ist kaputt, und Sie brauchen schnell einen neuen.",
        "Sie fliegen früh am Morgen und suchen eine Fahrt zum Flughafen.",
        "Sie möchten am Wochenende eine Stadtführung mit dem Fahrrad machen.",
        "Sie wollen mit dem Zug nach Wien fahren und suchen ein günstiges Ticket."
      ],
      ads: [
        "Reisebüro Sonnenklar: Städtereisen für Senioren – Rom, Paris, London. 5 Tage mit Reiseleitung ab 499 Euro.",
        "Ferienwohnungen Strandblick an der Ostsee: 3 Zimmer für bis zu 5 Personen, Strand nur 200 Meter. Juli und August noch frei, ab 60 Euro pro Nacht!",
        "Fahrschule Blitz: Führerschein in acht Wochen! Theorieunterricht am Abend, moderne Autos. Erste Fahrstunde gratis.",
        "Airport-Shuttle Berger: Wir bringen Sie bequem zum Flughafen – auch früh am Morgen, ab 4 Uhr. Festpreis 25 Euro. Reservierung: 0160 4455667.",
        "Lederwaren Krüger: Große Auswahl an Koffern, Taschen und Rucksäcken. Diese Woche: alle Koffer 30 % reduziert! Mo–Sa 9–19 Uhr.",
        "Radtouren Mainz: Entdecken Sie die Stadt mit dem Fahrrad! Geführte Touren jeden Samstag und Sonntag um 11 Uhr, Dauer 2 Stunden, 15 Euro inklusive Leihrad.",
        "Bahnagentur am Markt: Sparpreise für Zugreisen nach Österreich und in die Schweiz. Wien schon ab 29,90 Euro! Wir beraten Sie gern.",
        "Hotel Seestern auf Rügen: Wellness-Wochenende für Paare – 2 Nächte mit Frühstück und Sauna, 240 Euro pro Person."
      ],
      answers: [1, 4, 3, 5, 6]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Hinweis für Fahrgäste: Bauarbeiten auf der Linie 7",
          text: "Von Montag, dem 5. Oktober, bis Freitag, dem 23. Oktober, fahren auf der Straßenbahnlinie 7 zwischen Hauptbahnhof und Messe keine Bahnen. Grund sind Bauarbeiten an den Gleisen. Alle Haltestellen werden in dieser Zeit von Bussen der Linie E7 bedient. Die Busse fahren alle 10 Minuten, die Fahrt dauert aber etwa 15 Minuten länger als mit der Bahn. Ihre Tickets gelten auch in den Bussen. Aktuelle Informationen finden Sie unter www.stadtwerke-online.de."
        },
        {
          titel: "Der neue Fernbus-Bahnhof",
          text: "Seit dem 1. September hat unsere Stadt einen neuen Fernbus-Bahnhof an der Südbrücke. Von hier fahren täglich über 80 Busse in viele europäische Städte, zum Beispiel nach Prag, Amsterdam und Paris. Im Gebäude gibt es einen Warteraum, Toiletten und ein kleines Café. Tickets bekommt man am Schalter oder günstiger im Internet. Wer mit dem Auto kommt: Direkt neben dem Bahnhof gibt es ein Parkhaus, die erste Stunde ist dort kostenlos."
        }
      ],
      questions: [
        { textIndex: 0, frage: "Wie lange dauern die Bauarbeiten?", options: ["Fast drei Wochen.", "Drei Tage.", "Drei Monate."], answer: 0 },
        { textIndex: 0, frage: "Was sollen die Fahrgäste in dieser Zeit benutzen?", options: ["Taxis.", "Busse.", "Eine andere Straßenbahn."], answer: 1 },
        { textIndex: 0, frage: "Was gilt für die Tickets?", options: ["Man braucht ein neues Ticket.", "Die Busse sind kostenlos.", "Die Tickets gelten auch im Bus."], answer: 2 },
        { textIndex: 1, frage: "Wo bekommt man die Tickets günstiger?", options: ["Am Schalter.", "Im Café.", "Im Internet."], answer: 2 },
        { textIndex: 1, frage: "Was kostet das Parken in der ersten Stunde?", options: ["Nichts.", "80 Cent.", "Einen Euro."], answer: 0 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Hallo Miriam, wir sind gut in Lissabon angekommen! Das Hotel liegt direkt am Meer, und das Essen ist fantastisch. Morgen machen wir eine Bootstour. Liebe Grüße, Katharina",
        "Sehr geehrter Herr Novak, Ihr Flug LH 342 nach Warschau am 12. Mai wurde leider gestrichen. Wir haben Sie auf den Flug um 18:40 Uhr umgebucht. Ihre Fluggesellschaft",
        "Hi Paul, ich habe gestern meine Jacke in deinem Auto vergessen. Kannst du sie am Freitag mitbringen? Danke dir! Nadja",
        "Liebe Kolleginnen und Kollegen, wegen des Bahnstreiks arbeite ich morgen von zu Hause. Sie erreichen mich per E-Mail und Telefon. Viele Grüße, Ilona Fuchs",
        "Hallo Familie Wagner, Ihr Mietwagen steht morgen ab 9 Uhr für Sie bereit. Bitte bringen Sie Führerschein und Kreditkarte mit. Ihre Autovermietung Süd"
      ],
      headlines: [
        "Flug wurde umgebucht",
        "Grüße aus dem Urlaub",
        "Neues Auto gekauft",
        "Etwas im Auto vergessen",
        "Wegen Streik im Homeoffice",
        "Zug hat Verspätung",
        "Auto kann abgeholt werden",
        "Hotelzimmer ist reserviert"
      ],
      answers: [1, 0, 3, 4, 6]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Mit dem Zug durch Europa",
      text: "Letzten Sommer habe ich etwas Besonderes gemacht: Ich bin vier Wochen mit dem Zug durch Europa gereist. Mit einem Interrail-Ticket kann man einen Monat lang fast alle Züge in Europa benutzen. Das Ticket war nicht billig, aber es hat sich wirklich gelohnt.\n\nMeine Reise begann in Hamburg. Zuerst bin ich nach Kopenhagen gefahren, danach weiter nach Stockholm. Als ich in Schweden ankam, war ich überrascht: Obwohl es schon Ende August war, waren die Tage noch sehr lang. In Stockholm habe ich mich mit einer alten Schulfreundin getroffen, die dort seit drei Jahren lebt.\n\nDanach ging es in den Süden: Prag, Wien und zum Schluss Italien. Die Nachtzüge fand ich am besten. Man steigt am Abend ein, schläft im Zug und wacht am Morgen in einer neuen Stadt auf. So spart man auch das Geld für das Hotel.\n\nNatürlich war nicht alles perfekt. In Italien hatte mein Zug einmal fünf Stunden Verspätung, und in Wien habe ich fast meinen Rucksack verloren. Trotzdem war es die schönste Reise meines Lebens. Nächstes Jahr möchte ich wieder mit dem Zug fahren, dann vielleicht nach Spanien und Portugal. Fliegen kommt für mich nicht mehr infrage: Im Zug sieht man einfach viel mehr vom Land.",
      statements: [
        { text: "Der Autor war vier Wochen mit dem Zug unterwegs.", answer: true },
        { text: "Die Reise begann in Kopenhagen.", answer: false },
        { text: "In Stockholm hat er eine Schulfreundin getroffen.", answer: true },
        { text: "Die Nachtzüge fand er nicht gut.", answer: false },
        { text: "In Italien hatte ein Zug fünf Stunden Verspätung.", answer: true }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Liebe Frau Albrecht,\n\nvielen Dank für Ihre E-Mail. Ich habe [1] sehr über Ihre Einladung nach Dresden gefreut. Leider kann ich am Samstag nicht kommen, [2] ich am Wochenende arbeiten muss. Ich könnte aber am Sonntag [3] dem Zug kommen. Er kommt um 10:30 Uhr [4] Hauptbahnhof an. Können Sie mich dort abholen? Am Abend muss ich [5] 20 Uhr wieder zurückfahren. Ich freue mich schon [6] unser Treffen!\n\nHerzliche Grüße\nBoris Kalinin",
      gaps: [
        { options: ["mich", "mir", "sich"], answer: 0 },
        { options: ["denn", "weil", "deshalb"], answer: 1 },
        { options: ["bei", "von", "mit"], answer: 2 },
        { options: ["im", "am", "zum"], answer: 1 },
        { options: ["am", "um", "im"], answer: 1 },
        { options: ["über", "für", "auf"], answer: 2 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Sehr geehrte Damen und Herren,\n\nwir möchten vom 3. bis zum 7. Juni ein Doppelzimmer in Ihrem Hotel [1]. Wir kommen mit dem Auto – hat das Hotel eigene [2]? Auf Ihrer Internetseite haben wir gesehen, dass es auch Zimmer mit Blick auf den See gibt. Was [3] so ein Zimmer pro Nacht? Ist das Frühstück im Preis [4]? Wir möchten vor Ort auch gern Fahrräder [5]. Ist das bei Ihnen möglich? Bitte senden Sie uns ein [6] mit allen Preisen.\n\nMit freundlichen Grüßen\nFamilie Petrenko",
      wordBank: ["Parkplätze", "Angebot", "buchen", "verkaufen", "kostet", "leihen", "enthalten", "Schlüssel", "bezahlt", "Küche", "besuchen", "geöffnet"],
      answers: [2, 0, 4, 6, 5, 1]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Entschuldigung, ist dieser Platz noch frei?\"", options: ["Nein, ich habe keine Fahrkarte.", "Ja, bitte setzen Sie sich.", "Der Platz ist sehr bequem."], answer: 1 },
        { prompt: "\"Wann fährt der nächste Bus zum Flughafen?\"", options: ["In zwanzig Minuten, um 14:40 Uhr.", "Der Flughafen ist sehr groß.", "Ich fliege morgen nach Rom."], answer: 0 },
        { prompt: "\"Habt ihr schon Pläne für den Sommer?\"", options: ["Nein, der Sommer war schön.", "Ja, letzten Sommer waren wir in Polen.", "Ja, wir fahren im August ans Meer."], answer: 2 },
        { prompt: "\"Einmal nach Frankfurt, bitte. Hin und zurück.\"", options: ["Gern. Möchten Sie erste oder zweite Klasse?", "Frankfurt ist eine schöne Stadt.", "Nein, ich fahre nicht nach Frankfurt."], answer: 0 },
        { prompt: "\"Wie war eure Fahrt? Ihr kommt so spät!\"", options: ["Wir fahren morgen früh los.", "Wir standen zwei Stunden im Stau.", "Die Fahrt kostet dreißig Euro."], answer: 1 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Achtung, eine Durchsage für alle Passagiere des Fluges nach Lissabon: Das Boarding beginnt in zehn Minuten am Gate B vierzehn. Bitte halten Sie Ihre Bordkarte und Ihren Ausweis bereit.",
          statement: "Das Boarding beginnt am Gate B vierzehn.",
          answer: true
        },
        {
          audio: "Liebe Fahrgäste, der Intercity nach Basel hat heute circa zwanzig Minuten Verspätung. Grund ist ein technischer Defekt am Zug. Wir bitten um Entschuldigung.",
          statement: "Der Zug nach Basel kommt heute pünktlich.",
          answer: false
        },
        {
          audio: "Meine Damen und Herren, der Reisebus nach Prag fährt heute nicht um neun Uhr, sondern erst um neun Uhr dreißig ab. Die Abfahrt ist wie immer an Bussteig drei. Vielen Dank für Ihr Verständnis.",
          statement: "Der Bus nach Prag fährt um neun Uhr dreißig ab.",
          answer: true
        },
        {
          audio: "Guten Tag, hier ist das Hotel Lindenhof. Sie können Ihr Zimmer am Anreisetag ab vierzehn Uhr beziehen. Am Abreisetag müssen Sie das Zimmer bitte bis elf Uhr verlassen. Vielen Dank und gute Reise!",
          statement: "Man kann das Zimmer schon am Vormittag beziehen.",
          answer: false
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Der Verkehrsfunk: Auf der A acht in Richtung Salzburg gibt es nach einem Unfall zwölf Kilometer Stau. Bitte verlassen Sie die Autobahn an der Ausfahrt Rosenheim und folgen Sie der Umleitung.",
          frage: "Warum gibt es einen Stau?",
          options: ["Wegen einer Baustelle.", "Wegen eines Unfalls.", "Wegen des Wetters."],
          answer: 1
        },
        {
          audio: "Und noch ein Tipp für alle, die im Oktober verreisen möchten: Die Fähren nach Dänemark sind in den Herbstferien schnell ausgebucht. Reservieren Sie Ihre Überfahrt deshalb am besten schon jetzt im Internet.",
          frage: "Was soll man schon jetzt machen?",
          options: ["Die Fähre reservieren.", "Ein Hotel suchen.", "Die Koffer packen."],
          answer: 0
        },
        {
          audio: "Das Wetter: Heute Nacht müssen Autofahrer im Süden mit dichtem Nebel rechnen. Die Sicht liegt teilweise unter fünfzig Metern. Fahren Sie bitte besonders vorsichtig.",
          frage: "Womit müssen Autofahrer heute Nacht rechnen?",
          options: ["Mit Schnee.", "Mit starkem Regen.", "Mit Nebel."],
          answer: 2
        },
        {
          audio: "Eine Information für Reisende nach Amsterdam: Der Zug fährt heute ausnahmsweise von Gleis elf ab, nicht von Gleis fünf. Der Zugteil nach Rotterdam befindet sich vorne.",
          frage: "Von welchem Gleis fährt der Zug nach Amsterdam heute?",
          options: ["Von Gleis fünf.", "Von Gleis elf.", "Von Gleis fünfzehn."],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Kundin", text: "Guten Tag, ich möchte bitte eine Fahrkarte nach Leipzig." },
            { speaker: "Verkäufer", text: "Gern. Einfach oder hin und zurück?" },
            { speaker: "Kundin", text: "Hin und zurück, bitte. Ich fahre am Freitag und komme am Sonntag wieder." }
          ],
          statement: "Die Kundin möchte hin und zurück fahren.",
          answer: true
        },
        {
          audio: [
            { speaker: "Kunde", text: "Wir suchen für den Mai eine Woche Urlaub auf einer Insel, aber es darf nicht zu teuer sein." },
            { speaker: "Beraterin", text: "Da habe ich ein schönes Angebot für Mallorca: Flug und Hotel für vierhundertfünfzig Euro pro Person." },
            { speaker: "Kunde", text: "Das klingt gut. Können Sie mir mehr dazu zeigen?" }
          ],
          statement: "Der Kunde findet das Angebot zu teuer.",
          answer: false
        },
        {
          audio: [
            { speaker: "Fahrerin", text: "Entschuldigung, wie komme ich von hier zur Autobahn in Richtung Norden?" },
            { speaker: "Passant", text: "Fahren Sie geradeaus bis zur Ampel und dann rechts. Nach ungefähr zwei Kilometern sehen Sie schon das blaue Schild." },
            { speaker: "Fahrerin", text: "Geradeaus und an der Ampel rechts. Vielen Dank!" }
          ],
          statement: "Die Fahrerin soll an der Ampel links fahren.",
          answer: false
        },
        {
          audio: [
            { speaker: "Mann", text: "Hast du die Pässe eingepackt?" },
            { speaker: "Frau", text: "Ja, die sind in meiner Handtasche. Aber wir müssen noch die Blumen zur Nachbarin bringen, sie gießt sie ja im Urlaub." },
            { speaker: "Mann", text: "Stimmt, das mache ich schnell. Danach fahren wir los." }
          ],
          statement: "Die Pässe sind in der Handtasche.",
          answer: true
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderatorin", text: "Guten Morgen! Bei uns im Studio ist heute Stefan Krause. Stefan, du fährst seit vielen Jahren Fernbus. Wie bist du zu diesem Beruf gekommen?" },
        { speaker: "Stefan", text: "Ich wollte schon als Kind Busfahrer werden. Nach der Schule habe ich zuerst in einer Werkstatt gearbeitet, und mit fünfundzwanzig habe ich dann den Busführerschein gemacht." },
        { speaker: "Moderatorin", text: "Welche Strecken fährst du denn?" },
        { speaker: "Stefan", text: "Meistens fahre ich von München nach Zagreb. Die Fahrt dauert ungefähr neun Stunden. Weil die Fahrt so lang ist, sind wir immer zwei Fahrer im Bus." },
        { speaker: "Moderatorin", text: "Was gefällt dir an deiner Arbeit?" },
        { speaker: "Stefan", text: "Ich treffe jeden Tag neue Menschen, und ich sehe viel von Europa. Obwohl ich oft am Wochenende arbeiten muss, möchte ich keinen anderen Beruf." },
        { speaker: "Moderatorin", text: "Und was ist dein Tipp für unsere Fahrgäste?" },
        { speaker: "Stefan", text: "Nehmen Sie genug Wasser und etwas zu essen mit. Und buchen Sie früh, dann sind die Tickets deutlich billiger." }
      ],
      questions: [
        { frage: "Wann hat Stefan den Busführerschein gemacht?", options: ["Mit fünfundzwanzig Jahren.", "Direkt nach der Schule.", "Schon als Kind."], answer: 0 },
        { frage: "Wie lange dauert die Fahrt nach Zagreb?", options: ["Ungefähr fünf Stunden.", "Ungefähr neun Stunden.", "Ungefähr zwei Stunden."], answer: 1 },
        { frage: "Warum sind zwei Fahrer im Bus?", options: ["Weil die Fahrt lang ist.", "Weil der Bus sehr groß ist.", "Weil viele Fahrgäste mitfahren."], answer: 0 },
        { frage: "Was sollen die Fahrgäste laut Stefan machen?", options: ["Spät buchen.", "Viel Gepäck mitnehmen.", "Früh buchen."], answer: 2 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Guten Tag, hier ist Frau Steiner vom Reisebüro Fernweh. Es geht um Ihre Busreise nach Amsterdam. Die Abfahrt ist nicht um sieben Uhr, sondern schon um Viertel vor sieben. Der Bus fährt am Busbahnhof ab, Bussteig fünf. Bitte bringen Sie Ihren Reisepass mit und seien Sie fünfzehn Minuten früher da. Bei Fragen erreichen Sie uns unter null sechs neun, acht acht zwei vier. Auf Wiederhören!",
      noteTitle: "Notiz: Anruf vom Reisebüro",
      gaps: [
        { label: "Es ruft an: Frau ____", answer: "Steiner", alt: [] },
        { label: "Busreise nach: ____", answer: "Amsterdam", alt: [] },
        { label: "Abfahrt um: ____ Uhr", answer: "6:45", alt: ["6.45", "Viertel vor sieben", "viertel vor sieben", "06:45", "645"] },
        { label: "Mitbringen: ____", answer: "Reisepass", alt: ["den Reisepass", "Pass"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihre Freundin Olga plant einen Wochenendausflug und hat Ihnen geschrieben.",
    incomingEmail: {
      von: "olga.smirnova@gmx.de",
      betreff: "Ausflug am Wochenende",
      text: "Hallo!\n\nIch möchte nächstes Wochenende endlich mal raus aus der Stadt und einen Ausflug machen. Kommst du mit? Wohin können wir fahren, und wie kommen wir am besten dahin – mit dem Zug oder mit dem Auto? Und wo treffen wir uns?\n\nLiebe Grüße\nOlga"
    },
    points: [
      "Sagen Sie: Sie kommen gern mit.",
      "Schlagen Sie ein Ziel und ein Verkehrsmittel vor.",
      "Nennen Sie einen Treffpunkt und eine Uhrzeit."
    ],
    musterloesung: "Hallo Olga,\n\ndanke für deine Nachricht, ich komme sehr gern mit! Wollen wir an den Bodensee fahren? Am besten nehmen wir den Zug, weil wir dann keinen Parkplatz suchen müssen. Es gibt ein günstiges Wochenendticket. Treffen wir uns am Samstag um 8:30 Uhr am Hauptbahnhof, direkt vor dem Kiosk? Ich freue mich schon!\n\nLiebe Grüße",
    tipps: "Cover all three points and give concrete details (place, transport, meeting point, time). A short reason with 'weil' shows good A2+ level."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Ich heiße ... / Mein Name ist ...",
        "Ich bin ... Jahre alt.",
        "Ich wohne in ... / Ich komme aus ...",
        "Ich habe ... Geschwister. / Ich habe ... Kinder.",
        "Ich arbeite als ... / Ich studiere ...",
        "Ich spreche ... und ein bisschen ...",
        "Am Wochenende reise ich gern."
      ]
    },
    teil2: {
      thema: "Reisen",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Wie reisen Sie am liebsten: mit dem Auto, mit dem Zug oder mit dem Flugzeug?",
        "Wohin sind Sie zuletzt gereist?",
        "Was ist für Sie im Urlaub wichtig?",
        "Möchten Sie lieber ans Meer oder in die Berge? Warum?"
      ],
      redemittel: [
        "Am liebsten reise ich mit ..., weil ...",
        "Letztes Jahr war ich in ...",
        "Für mich ist im Urlaub ... wichtig.",
        "Ich möchte lieber ..., denn ...",
        "Und du? Wohin fährst du gern?"
      ]
    },
    teil3: {
      aufgabe: "Planen Sie zusammen eine Fahrt in eine andere Stadt.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Wann fahren wir? (Tag)", "Wie fahren wir? (Zug, Bus, Auto?)", "Was machen wir dort?", "Was nehmen wir mit?"],
      redemittel: [
        "Wollen wir am Samstag fahren?",
        "Wie wäre es mit dem Zug?",
        "Das finde ich gut!",
        "Ich weiß nicht, vielleicht lieber ...",
        "Wir könnten zuerst ... und danach ...",
        "Gut, dann machen wir das so."
      ]
    }
  }
} as const satisfies Exam;

export default exam;
