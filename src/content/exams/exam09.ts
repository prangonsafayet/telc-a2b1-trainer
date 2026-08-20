import { type DualLevelExam } from '@shared/types';

const exam = {
  id: 9,
  title: "Modelltest 9",
  difficulty: "b1",
  level: "B1 · Ziel",
  theme: "Umwelt & Stadtleben",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Ihr Balkon ist klein, aber Sie möchten trotzdem eigenes Gemüse anbauen.",
        "Sie ziehen um und möchten Ihre alten Möbel nicht wegwerfen, sondern verschenken.",
        "Sie ärgern sich über den Müll im Stadtpark und möchten selbst aktiv werden.",
        "Ihr altes Fahrrad steht seit Jahren im Keller. Sie möchten es selbst reparieren, brauchen aber Werkzeug und Hilfe.",
        "Sie möchten zu Hause Strom sparen und suchen eine kostenlose Beratung."
      ],
      ads: [
        "Möbelhaus Wohnidee: Neue Sofas, Tische und Schränke – jetzt 20 % Rabatt auf alles! Lieferung innerhalb einer Woche.",
        "Gemeinschaftsgarten Sonnenbeet: Workshop \"Gemüse auf dem Balkon\" – Tipps für kleine Flächen, Erde und Samen inklusive. Jeden ersten Samstag im Monat, 10 Uhr.",
        "Aktion Sauberer Stadtpark: Wir sammeln gemeinsam Müll! Treffpunkt Sonntag, 10 Uhr, am Haupteingang. Handschuhe und Säcke werden gestellt.",
        "Sozialkaufhaus Brücke: Wir holen gut erhaltene Möbel kostenlos bei Ihnen ab und geben sie an Menschen mit wenig Geld weiter. Tel. 0951 33 44 55.",
        "Zweirad Krause: Wir reparieren Ihr Fahrrad schnell und professionell – Inspektion ab 25 Euro. Mo–Fr 9–18 Uhr.",
        "Offene Fahrradwerkstatt im Stadtteilzentrum: Reparieren Sie Ihr Rad selbst! Werkzeug, Ersatzteile und Beratung vor Ort. Mittwochs 17–20 Uhr, Teilnahme frei.",
        "Verbraucherzentrale: Kostenlose Energieberatung für Ihren Haushalt – so senken Sie Ihre Stromrechnung. Termine unter 0800 11 22 33.",
        "Elektro Schmidt: Waschmaschinen, Kühlschränke und Lampen zu günstigen Preisen. Altgeräte nehmen wir beim Kauf mit."
      ],
      answers: [1, 3, 2, 5, 6]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Neue Regeln für die Biotonne",
          text: "Ab dem 1. März bekommt jeder Haushalt in Grünberg eine braune Biotonne. Hinein gehören Obst- und Gemüsereste, Kaffeefilter, Eierschalen und Gartenabfälle. Plastiktüten sind verboten – auch sogenannte \"kompostierbare\" Tüten dürfen nicht in die Tonne. Benutzen Sie stattdessen Papiertüten oder Zeitungspapier. Die Biotonne wird alle zwei Wochen geleert, in den Sommermonaten Juni bis August jede Woche. Fragen beantwortet die Abfallberatung unter Tel. 0661 40 40 oder auf www.gruenberg-abfall.de."
        },
        {
          titel: "Lastenräder kostenlos ausleihen",
          text: "Die Stadt Grünberg bietet ab sofort fünf elektrische Lastenräder zum kostenlosen Ausleihen an. Damit können Einkäufe, Getränkekisten oder auch Kinder bequem und ohne Auto transportiert werden. Wer ein Rad nutzen möchte, registriert sich einmal online und kann danach Termine buchen. Ein Rad kann für maximal drei Tage ausgeliehen werden. Abholung und Rückgabe sind an fünf Stationen im Stadtgebiet möglich, zum Beispiel am Hauptbahnhof und am Rathaus. Das Angebot kostet nichts, über eine kleine Spende freut sich die Stadt aber."
        }
      ],
      questions: [
        { textIndex: 0, frage: "Wie oft wird die Biotonne im Sommer geleert?", options: ["Alle zwei Wochen.", "Jede Woche.", "Einmal im Monat."], answer: 1 },
        { textIndex: 0, frage: "Was darf nicht in die Biotonne?", options: ["Papiertüten.", "Gartenabfälle.", "Kompostierbare Plastiktüten."], answer: 2 },
        { textIndex: 0, frage: "Ab wann gilt die neue Regel?", options: ["Ab dem 1. März.", "Ab dem 1. Juni.", "Ab August."], answer: 0 },
        { textIndex: 1, frage: "Wie lange kann man ein Lastenrad höchstens ausleihen?", options: ["Einen Tag.", "Drei Tage.", "Eine Woche."], answer: 1 },
        { textIndex: 1, frage: "Was kostet das Ausleihen eines Lastenrads?", options: ["Nichts, aber man muss sich vorher registrieren.", "Fünf Euro pro Tag.", "Nur die Rückgabe am Rathaus kostet etwas."], answer: 0 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Liebe Hausgemeinschaft, am Samstag ab 9 Uhr pflanzen wir gemeinsam Blumen im Innenhof. Wer Werkzeug hat, bringt es bitte mit. Für Kaffee und Kuchen ist gesorgt! Eure Hausverwaltung",
        "Hallo Frau Novak, Ihr repariertes Fahrrad steht ab morgen zur Abholung bereit. Die Bremsen sind neu, die Rechnung liegt bei. Ihre Werkstatt am Kanal",
        "Hi Samuel, ich habe im Umsonstladen ein fast neues Bücherregal gesehen – es kostet nichts! Wenn du es willst, musst du schnell sein. Soll ich es für dich reservieren? LG Rosa",
        "Sehr geehrte Anwohnerinnen und Anwohner, wegen Bauarbeiten gibt es am Donnerstag von 8 bis 15 Uhr kein Wasser in der Gartenstraße. Bitte füllen Sie vorher etwas Wasser ab. Stadtwerke Neuburg",
        "Liebe Mitglieder, unsere Radtour am Sonntag startet wegen der Hitze schon um 8 Uhr, nicht erst um 11 Uhr. Denkt an Sonnencreme und genug Wasser! Euer Radclub"
      ],
      headlines: [
        "Radtour beginnt früher",
        "Fahrrad zur Reparatur bringen",
        "Gemeinsam Blumen pflanzen",
        "Kein Wasser am Donnerstag",
        "Möbel günstig verkaufen",
        "Fahrrad kann abgeholt werden",
        "Radtour fällt aus",
        "Gratis-Regal entdeckt"
      ],
      answers: [2, 5, 7, 3, 0]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Ein Jahr ohne eigenes Auto – eine Familie berichtet",
      text: "Vor einem Jahr hat Familie Wagner aus Erfurt ihr Auto verkauft. Was zuerst wie ein Experiment klang, ist heute Alltag. \"Der Anfang war nicht leicht\", erzählt Katrin Wagner, die als Krankenpflegerin arbeitet. \"Besonders der Schichtdienst war ein Problem, weil nachts kaum Busse fahren.\" Die Lösung: Für Nachtschichten nutzt sie jetzt ein Carsharing-Auto, das an der Ecke ihrer Straße steht.\n\nIhr Mann Jens bringt die beiden Kinder morgens mit einem Lastenrad zur Kita und zur Schule. \"Im Winter, wenn es regnet oder schneit, ist das manchmal anstrengend\", gibt er zu. \"Aber die Kinder lieben es, und ich bewege mich nebenbei an der frischen Luft.\"\n\nFinanziell hat sich die Entscheidung gelohnt. Früher gab die Familie jeden Monat rund 400 Euro für das Auto aus – für Benzin, Versicherung und Reparaturen. Heute zahlt sie etwa 150 Euro für Bahntickets, Carsharing und das Lastenrad. Das gesparte Geld wird für Urlaube genutzt: Im Sommer fuhr die Familie mit dem Zug nach Italien.\n\nGanz ohne Auto geht es allerdings nicht immer. Für den Besuch bei den Großeltern, die auf dem Land leben, mietet die Familie ungefähr einmal im Monat einen Wagen. \"Wir sind keine Auto-Gegner\", sagt Katrin Wagner. \"Wir haben nur gemerkt, dass wir in der Stadt keins besitzen müssen.\" Nur eines vermisst die Familie manchmal: spontane Ausflüge am Wochenende. Dafür, sagt Jens, kenne er inzwischen jeden Radweg der Region – und die Kinder ihre Nachbarschaft besser als je zuvor.",
      statements: [
        { text: "Familie Wagner hat ihr Auto vor einem Jahr verkauft.", answer: true },
        { text: "Katrin Wagner fährt nachts immer mit dem Bus zur Arbeit.", answer: false },
        { text: "Die Familie gibt heute mehr Geld für Mobilität aus als früher.", answer: false },
        { text: "Für Besuche bei den Großeltern mietet die Familie manchmal ein Auto.", answer: true },
        { text: "Die Kinder werden mit dem Lastenrad zur Kita und zur Schule gebracht.", answer: true }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Sehr geehrte Damen und Herren,\n\nich wohne seit fünf Jahren in der Lindenstraße und möchte Sie auf ein Problem aufmerksam machen. An der Bushaltestelle \"Alter Markt\" gibt es keinen einzigen Fahrradständer, [1] dort jeden Tag viele Räder abgestellt werden. Die Fahrräder, [2] am Zaun des Spielplatzes stehen, blockieren oft den Gehweg. Für ältere Menschen und Eltern mit Kinderwagen ist das gefährlich.\n\n[3] das Problem zu lösen, schlage ich vor, an der Haltestelle zehn Fahrradständer aufzustellen. Meines Wissens wurde ein ähnlicher Vorschlag schon vor zwei Jahren [4], aber bis heute ist nichts passiert. Ich [5] mich freuen, wenn Sie mir mitteilen könnten, ob und wann mit einer Lösung zu rechnen ist. Bitte informieren Sie [6] über die nächsten Schritte.\n\nMit freundlichen Grüßen\nRobert Hansen",
      gaps: [
        { options: ["weil", "obwohl", "damit"], answer: 1 },
        { options: ["die", "deren", "denen"], answer: 0 },
        { options: ["Ohne", "Für", "Um"], answer: 2 },
        { options: ["diskutiert", "diskutieren", "diskutierte"], answer: 0 },
        { options: ["werde", "wurde", "würde"], answer: 2 },
        { options: ["mir", "mich", "ich"], answer: 1 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Liebe Nachbarinnen und Nachbarn,\n\nam kommenden Samstag öffnet unser Repair-Café wieder seine Türen! Bringen Sie kaputte Geräte, Kleidung oder Spielzeug mit – gemeinsam mit unseren ehrenamtlichen Helfern können Sie fast alles [1]. So sparen Sie Geld und schonen die [2]. Die Teilnahme ist kostenlos, wir freuen uns aber über eine kleine [3]. Neu in diesem Jahr ist eine Tauschecke für Bücher und Pflanzen. Wer selbst gern hilft und handwerkliche [4] hat, kann sich bei uns als Helfer [5]. Kaffee und Kuchen stehen wie immer [6].\n\nIhr Team vom Stadtteiltreff",
      wordBank: ["wegwerfen", "Spende", "Umwelt", "bereit", "kaufen", "reparieren", "Meinung", "Erfahrung", "Rechnung", "anmelden", "besuchen", "fertig"],
      answers: [5, 2, 1, 7, 9, 3]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Was halten Sie von dem neuen Radweg in der Innenstadt?\"", options: ["Ich finde ihn gut, aber er könnte breiter sein.", "Ja, ich fahre morgen mit dem Rad.", "Der Radweg ist zwei Kilometer lang."], answer: 0 },
        { prompt: "\"Entschuldigung, wissen Sie, wo ich alte Batterien abgeben kann?\"", options: ["Batterien sind wirklich teuer geworden.", "Ja, im Supermarkt gibt es eine Sammelbox an der Kasse.", "Nein, ich brauche keine Batterien."], answer: 1 },
        { prompt: "\"Würden Sie mir kurz helfen? Die Kiste ist zu schwer für mich allein.\"", options: ["Ja, die Kiste ist wirklich groß.", "Nein, die Kiste gehört mir nicht.", "Klar, warten Sie, ich fasse mit an."], answer: 2 },
        { prompt: "\"Ist der Bus der Linie acht schon weg?\"", options: ["Ja, leider vor fünf Minuten. Der nächste kommt in zehn Minuten.", "Nein, ich fahre nie mit dem Bus.", "Die Linie acht ist ganz neu."], answer: 0 },
        { prompt: "\"Sollen wir am Samstag zusammen zum Flohmarkt gehen?\"", options: ["Der Flohmarkt war letzte Woche schön.", "Gern! Ich suche sowieso einen alten Spiegel.", "Nein, ich verkaufe nichts."], answer: 1 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Liebe Fahrgäste, wegen einer Demonstration in der Innenstadt fahren die Busse der Linien drei und fünf heute nicht über den Rathausplatz. Bitte steigen Sie am Stadttheater um. Die Umleitung gilt bis achtzehn Uhr.",
          statement: "Die Umleitung gilt den ganzen Abend.",
          answer: false
        },
        {
          audio: "Guten Tag, hier ist der Wertstoffhof der Stadt Grünberg. Ab April haben wir neue Öffnungszeiten: Wir sind dann auch samstags von neun bis sechzehn Uhr für Sie geöffnet. Elektrogeräte und alte Farben nehmen wir wie immer kostenlos an.",
          statement: "Der Wertstoffhof ist ab April auch am Samstag geöffnet.",
          answer: true
        },
        {
          audio: "Liebe Kundinnen und Kunden, ab heute finden Sie bei uns eine neue Station für Pfandflaschen direkt neben dem Eingang. Den Pfandbon können Sie an allen Kassen einlösen oder für einen guten Zweck spenden. Vielen Dank!",
          statement: "Den Pfandbon kann man auch spenden.",
          answer: true
        },
        {
          audio: "Achtung, liebe Besucherinnen und Besucher des Stadtparks: Wegen des starken Windes bleibt der Park heute ab sechzehn Uhr geschlossen. Bitte verlassen Sie den Park rechtzeitig. Morgen ist der Park wieder normal geöffnet.",
          statement: "Der Park bleibt auch morgen geschlossen.",
          answer: false
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Und nun der Umwelt-Tipp im Radio: Morgen wird es mit vierunddreißig Grad sehr heiß. Denken Sie an ältere Nachbarn, trinken Sie genug Wasser und gießen Sie Ihre Pflanzen am besten früh am Morgen – dann verdunstet weniger Wasser.",
          frage: "Wann soll man die Pflanzen gießen?",
          options: ["Am frühen Morgen.", "Am Mittag.", "Am Abend."],
          answer: 0
        },
        {
          audio: "Verkehrsfunk: Auf der Bundesstraße vierzehn ist nach einem Unfall die Fahrbahn in Richtung Norden gesperrt. Die Polizei leitet den Verkehr über das Gewerbegebiet um. Die Sperrung dauert voraussichtlich bis siebzehn Uhr.",
          frage: "Bis wann ist die Straße voraussichtlich gesperrt?",
          options: ["Bis vierzehn Uhr.", "Bis siebzehn Uhr.", "Bis morgen früh."],
          answer: 1
        },
        {
          audio: "Eine Information der Stadt: Ab nächster Woche können Sie sich wieder kostenlos einen jungen Baum für Ihren Garten abholen. Pro Haushalt gibt es einen Baum. Die Ausgabe ist am Freitag und Samstag auf dem Betriebshof in der Industriestraße.",
          frage: "Wie viele Bäume bekommt ein Haushalt?",
          options: ["Einen.", "Zwei.", "Drei."],
          answer: 0
        },
        {
          audio: "Und zum Schluss ein Hinweis: Am Sonntag ist wieder autofreier Sonntag in der Innenstadt. Von zehn bis achtzehn Uhr gehören die Straßen den Fußgängern und Radfahrern. Auf dem Marktplatz gibt es ein Programm mit Musik und Essensständen.",
          frage: "Für wen sind die Straßen am Sonntag frei?",
          options: ["Für Busse und Taxis.", "Für Autos mit Elektromotor.", "Für Fußgänger und Radfahrer."],
          answer: 2
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Nachbarin", text: "Hallo Herr Petrov, wissen Sie schon, dass wir jetzt eine Biotonne im Hof haben?" },
            { speaker: "Herr Petrov", text: "Ja, aber ich bin unsicher: Dürfen auch gekochte Essensreste hinein?" },
            { speaker: "Nachbarin", text: "Ja, das ist erlaubt. Nur Plastik darf nicht hinein, auch keine sogenannten Bio-Plastiktüten." },
            { speaker: "Herr Petrov", text: "Gut zu wissen, danke!" }
          ],
          statement: "Gekochte Essensreste dürfen in die Biotonne.",
          answer: true
        },
        {
          audio: [
            { speaker: "Kunde", text: "Guten Tag, ich möchte diese Lampe zurückgeben. Sie funktioniert nicht." },
            { speaker: "Verkäuferin", text: "Haben Sie den Kassenbon dabei?" },
            { speaker: "Kunde", text: "Nein, den habe ich leider verloren. Aber ich habe mit Karte gezahlt." },
            { speaker: "Verkäuferin", text: "Dann finden wir den Kauf im System. Das ist kein Problem." }
          ],
          statement: "Der Kunde kann die Lampe ohne Kassenbon nicht zurückgeben.",
          answer: false
        },
        {
          audio: [
            { speaker: "Anna", text: "Und, wie war der Termin bei der Energieberatung?" },
            { speaker: "Murat", text: "Sehr gut! Die Beraterin hat mir gezeigt, dass unser alter Kühlschrank viel zu viel Strom verbraucht. Ein neuer würde sich schon nach drei Jahren lohnen." },
            { speaker: "Anna", text: "Und was hat die Beratung gekostet?" },
            { speaker: "Murat", text: "Nichts, die bezahlt die Stadt." }
          ],
          statement: "Murat hat für die Beratung fünfzig Euro bezahlt.",
          answer: false
        },
        {
          audio: [
            { speaker: "Vermieterin", text: "Guten Tag, Frau Lehmann. Ab Montag wird das Dach repariert. Es kann leider laut werden." },
            { speaker: "Mieterin", text: "Oh. Wie lange dauern die Arbeiten denn?" },
            { speaker: "Vermieterin", text: "Ungefähr zwei Wochen. Die Handwerker arbeiten aber nur von acht bis siebzehn Uhr." },
            { speaker: "Mieterin", text: "Na gut, da bin ich sowieso meistens bei der Arbeit." }
          ],
          statement: "Die Arbeiten am Dach dauern ungefähr zwei Wochen.",
          answer: true
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderatorin", text: "Willkommen im Stadtgespräch! Heute ist Lena Hoffmann zu Gast. Frau Hoffmann, Sie haben vor drei Jahren einen Laden ohne Verpackungen eröffnet. Wie funktioniert das genau?" },
        { speaker: "Lena Hoffmann", text: "Ganz einfach: Bei uns gibt es Lebensmittel wie Reis, Nudeln oder Nüsse aus großen Behältern. Die Kundinnen und Kunden bringen ihre eigenen Gläser und Dosen mit und füllen sich genau so viel ab, wie sie brauchen." },
        { speaker: "Moderatorin", text: "Und wenn jemand kein Glas dabeihat?" },
        { speaker: "Lena Hoffmann", text: "Kein Problem, man kann bei uns Gläser leihen oder für wenig Geld kaufen." },
        { speaker: "Moderatorin", text: "Ist das Einkaufen bei Ihnen teurer als im Supermarkt?" },
        { speaker: "Lena Hoffmann", text: "Manche Produkte kosten etwas mehr, das stimmt. Aber viele Kunden kaufen bei uns kleinere Mengen und werfen deshalb weniger weg. Am Ende sparen sie oft sogar Geld." },
        { speaker: "Moderatorin", text: "Was war Ihre größte Schwierigkeit?" },
        { speaker: "Lena Hoffmann", text: "Der Anfang war hart. Im ersten Jahr habe ich fast ohne Gehalt gearbeitet. Heute läuft der Laden gut, wir sind inzwischen zu viert." },
        { speaker: "Moderatorin", text: "Und was wünschen Sie sich für die Zukunft?" },
        { speaker: "Lena Hoffmann", text: "Ich wünsche mir, dass die großen Supermärkte nachziehen und ihre Verpackungen reduzieren. Wir zeigen ja jeden Tag, dass es geht." }
      ],
      questions: [
        { frage: "Was bringen die Kunden zum Einkaufen mit?", options: ["Eigene Gläser und Dosen.", "Große Behälter für den Laden.", "Papiertüten vom Supermarkt."], answer: 0 },
        { frage: "Was sagt Frau Hoffmann über die Preise?", options: ["Alles ist billiger als im Supermarkt.", "Manche Produkte kosten etwas mehr.", "Alle Produkte kosten gleich viel."], answer: 1 },
        { frage: "Wie war das erste Jahr für Frau Hoffmann?", options: ["Sehr erfolgreich von Anfang an.", "Sie hat den Laden fast wieder geschlossen.", "Schwierig – sie hat fast ohne Gehalt gearbeitet."], answer: 2 },
        { frage: "Was wünscht sich Frau Hoffmann für die Zukunft?", options: ["Einen zweiten Laden in der Stadt.", "Dass Supermärkte Verpackungen reduzieren.", "Mehr Mitarbeiter für ihr Team."], answer: 1 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Guten Tag, hier spricht Frau Albrecht von der Hausverwaltung Kurz. Ich rufe an wegen der Sperrmüll-Abholung, die Sie bestellt haben. Die Abholung ist am Donnerstag ab sieben Uhr. Bitte stellen Sie die alten Möbel schon am Mittwochabend vor das Haus, aber lassen Sie den Gehweg frei. Wichtig: Elektrogeräte werden nicht mitgenommen, die müssen Sie zum Wertstoffhof bringen. Die Abholung kostet zwanzig Euro, die Rechnung kommt per Post. Bei Fragen erreichen Sie mich unter null sechs neun, sieben sieben drei zwei. Auf Wiederhören!",
      noteTitle: "Notiz: Anruf von der Hausverwaltung",
      gaps: [
        { label: "Es ruft an: Frau ____", answer: "Albrecht", alt: [] },
        { label: "Sperrmüll-Abholung am: ____", answer: "Donnerstag", alt: ["donnerstag"] },
        { label: "Möbel vor das Haus stellen: am ____", answer: "Mittwochabend", alt: ["Mittwoch Abend", "Mittwoch abend", "Mittwoch"] },
        { label: "Kosten: ____ Euro", answer: "20", alt: ["zwanzig", "20 Euro"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihre Freundin Elif zieht bald in Ihre Stadt und hat Ihnen geschrieben.",
    incomingEmail: {
      von: "elif.demir@gmx.de",
      betreff: "Umzug in deine Stadt!",
      text: "Hallo!\n\nStell dir vor: Ich habe die Stelle bekommen und ziehe im Oktober in deine Stadt! Ich habe aber noch viele Fragen. In welchem Stadtteil sollte ich eine Wohnung suchen? Ich hätte gern eine Gegend, die ruhig ist, aber gut angebunden. Brauche ich ein Auto, oder reichen Bus und Bahn? Und hättest du am Umzugswochenende vielleicht Zeit, mir zu helfen?\n\nLiebe Grüße\nElif"
    },
    points: [
      "Empfehlen Sie einen Stadtteil und begründen Sie Ihre Empfehlung.",
      "Schreiben Sie etwas zu Bus, Bahn oder Auto in Ihrer Stadt.",
      "Sagen Sie, ob Sie beim Umzug helfen können, und machen Sie einen Vorschlag."
    ],
    musterloesung: "Hallo Elif,\n\nwas für eine tolle Nachricht! Ich empfehle dir das Gartenviertel, weil es dort ruhig ist und trotzdem alle zehn Minuten eine Bahn ins Zentrum fährt. Ein Auto brauchst du hier wirklich nicht, die Verbindungen sind sehr gut. Beim Umzug helfe ich dir natürlich gern – ich könnte am Samstag ab neun Uhr kommen und einen Transporter besorgen. Melde dich!\n\nLiebe Grüße",
    tipps: "Answer all three points and give a reason for your recommendation with \"weil ...\". Use Konjunktiv II (\"ich könnte ...\") for polite offers — exactly the structures examiners expect at B1."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Mein Name ist ..., ich bin ... Jahre alt.",
        "Zurzeit wohne ich in ..., und zwar im Stadtteil ...",
        "Ich lebe zusammen mit ...",
        "Beruflich arbeite ich als ...",
        "Ich spreche ..., und im Moment lerne ich Deutsch.",
        "Wenn ich Zeit habe, ... ich gern ...",
        "Besonders wichtig ist mir ..."
      ]
    },
    teil2: {
      thema: "Umweltschutz im Alltag",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Was tun Sie im Alltag für die Umwelt?",
        "Wie kommen Sie normalerweise zur Arbeit oder zum Einkaufen?",
        "Sollte Plastik verboten werden? Was meinen Sie?",
        "Wer ist für den Umweltschutz verantwortlich: jeder Einzelne oder der Staat?"
      ],
      redemittel: [
        "Ich versuche, möglichst wenig ... zu ...",
        "Meiner Meinung nach sollte man ...",
        "Ich bin (nicht) der Meinung, dass ...",
        "Auf der einen Seite ..., auf der anderen Seite ...",
        "Da hast du recht, aber ..."
      ]
    },
    teil3: {
      aufgabe: "Planen Sie zusammen einen Stand auf dem Flohmarkt in Ihrem Stadtteil.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Was wollen Sie verkaufen?", "Wann und wo findet der Flohmarkt statt?", "Wie transportieren Sie die Sachen?", "Was machen Sie mit dem Geld?"],
      redemittel: [
        "Ich schlage vor, dass wir ...",
        "Wie wäre es, wenn wir ...?",
        "Das halte ich für eine gute Idee.",
        "Da bin ich mir nicht sicher, vielleicht lieber ...",
        "Wer kümmert sich um ...?",
        "Also gut, dann machen wir es so."
      ]
    }
  }
} as const satisfies DualLevelExam;

export default exam;
