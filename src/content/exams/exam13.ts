import { type DualLevelExam } from '@shared/types';

const exam = {
  id: 13,
  title: "Modelltest 13",
  difficulty: "b1",
  level: "B1 · Prüfungsnah",
  theme: "Pannen, Reklamationen & Service",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Ihre Waschmaschine ist kaputt, die Garantie ist abgelaufen. Sie suchen einen Reparaturdienst mit festen Preisen.",
        "Sie möchten ein Paket zurückschicken und suchen einen Paketshop, der auch abends geöffnet ist.",
        "Ihr Handydisplay ist gebrochen. Sie möchten es noch heute ohne Termin reparieren lassen.",
        "Sie haben Streit mit einer Firma über eine Rechnung und suchen eine kostenlose Beratung.",
        "Der Reißverschluss Ihrer Lieblingsjacke ist kaputt und soll ersetzt werden."
      ],
      ads: [
        "Änderungsschneiderei Nadel & Faden: Wir kürzen, nähen und ersetzen Reißverschlüsse – schnell und ordentlich. Mo–Fr 9–18 Uhr, Samstag bis 13 Uhr.",
        "Elektro Groß: Riesige Auswahl an neuen Waschmaschinen, Trocknern und Kühlschränken. Null-Prozent-Finanzierung, Lieferung und Anschluss inklusive!",
        "Hausgeräte-Service Blitz: Reparatur von Waschmaschinen und Geschirrspülern aller Marken – auch nach der Garantie. Faire Festpreise, Termin innerhalb von 48 Stunden.",
        "Kanzlei Dr. Stein & Partner: Ihre Spezialisten für Vertragsrecht. Erstgespräch 90 Euro, Termine nach Vereinbarung.",
        "Paketpoint im Kiosk 24: Pakete abgeben und abholen bis 22 Uhr, auch am Wochenende. Retouren aller großen Versandhändler – schnell und unkompliziert.",
        "Schuh-Eck: Sommerschlussverkauf! Sandalen und Sneaker bis zu 50 Prozent reduziert. Nur solange der Vorrat reicht.",
        "Display-Doktor: Handy kaputt? Wir reparieren Displays in 60 Minuten, ganz ohne Termin – einfach vorbeikommen. Im Hauptbahnhof, täglich 8–20 Uhr.",
        "Verbraucherzentrale: Ärger mit einer Rechnung oder einem Vertrag? Unsere kostenlose Erstberatung hilft Ihnen weiter. Jeden Donnerstag 14–18 Uhr, ohne Anmeldung."
      ],
      answers: [2, 4, 6, 7, 0]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Umtausch und Reklamation: Welche Rechte haben Kundinnen und Kunden?",
          text: "Der neue Pullover gefällt zu Hause doch nicht mehr? Viele glauben, das Geschäft müsse ihn zurücknehmen – das stimmt aber nicht. Ein Umtausch bei Nichtgefallen ist immer freiwillig; die meisten Geschäfte bieten ihn nur aus Kulanz an. Anders sieht es bei defekter Ware aus: Hier gilt die gesetzliche Gewährleistung von zwei Jahren. Das Geschäft muss die Ware dann reparieren oder ersetzen. Wieder andere Regeln gelten im Internet: Online-Käufe können Sie innerhalb von 14 Tagen ohne Angabe von Gründen widerrufen. Wichtig in allen Fällen: Heben Sie den Kassenbon auf – ein Foto davon reicht übrigens auch."
        },
        {
          titel: "Neue Servicestelle für Fluggäste am Flughafen",
          text: "Flug verspätet, gestrichen oder der Koffer weg? Seit diesem Monat hilft eine neue Servicestelle im Terminal 2, täglich von 6 bis 22 Uhr. Die Mitarbeiterinnen und Mitarbeiter erklären kostenlos, welche Entschädigung Reisenden zusteht, und helfen beim Ausfüllen der Anträge. Denn viele Passagiere wissen nicht: Bei großen Verspätungen zahlen Airlines je nach Strecke bis zu 600 Euro – allerdings dauert die Bearbeitung oft mehrere Wochen. Wer die Servicestelle nutzen möchte, bringt am besten die Bordkarte und die Buchungsbestätigung mit. Dann kann der Antrag sofort gestellt werden."
        }
      ],
      questions: [
        { textIndex: 0, frage: "Was gilt, wenn ein gekaufter Pullover zu Hause nicht mehr gefällt?", options: ["Das Geschäft muss ihn zurücknehmen.", "Ein Umtausch ist freiwillig.", "Man hat zwei Jahre Zeit für den Umtausch."], answer: 1 },
        { textIndex: 0, frage: "Wie lange gilt die Gewährleistung bei defekter Ware?", options: ["14 Tage.", "Sechs Monate.", "Zwei Jahre."], answer: 2 },
        { textIndex: 0, frage: "Was gilt für Online-Käufe?", options: ["Man kann sie 14 Tage lang ohne Grund widerrufen.", "Man kann sie nie zurückgeben.", "Nur defekte Ware darf zurückgeschickt werden."], answer: 0 },
        { textIndex: 1, frage: "Wobei hilft die neue Servicestelle?", options: ["Beim Kofferpacken.", "Bei Entschädigungen für Fluggäste.", "Beim Buchen von Urlaubsreisen."], answer: 1 },
        { textIndex: 1, frage: "Was sollen Reisende am besten mitbringen?", options: ["Bordkarte und Buchungsbestätigung.", "Nur den Reisepass.", "Bargeld für die Beratung."], answer: 0 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Sehr geehrte Frau Wagner, leider müssen wir Ihren Liefertermin verschieben: Ihr neues Sofa kommt erst am 28., nicht wie geplant am 21. Wir entschuldigen uns für die Verzögerung. Ihr Möbelhaus Komfort",
        "Hallo Jens, stell dir vor: Die Werkstatt hat schon angerufen – mein Auto ist fertig, es war nur die Batterie! Ich kann dich morgen also doch zum Sport fahren. LG Petra",
        "Liebe Kundin, lieber Kunde, Ihre Reklamation ist bei uns eingegangen. Sie erhalten den Kaufpreis innerhalb von fünf Werktagen zurück. Den Rücksendeschein finden Sie im Anhang. Ihr Modehaus-Online-Team",
        "Hi Ana, Vorsicht: Bestell bloß nichts bei diesem Online-Shop! Ich warte seit sechs Wochen auf meine Lampe, und der Kundenservice antwortet einfach nicht. LG Carmen",
        "Sehr geehrter Herr Miller, vielen Dank für Ihre Nachricht. Ihr Heizungsproblem tut uns leid – unser Techniker kommt morgen zwischen 8 und 10 Uhr. Bitte seien Sie in dieser Zeit zu Hause. Hausverwaltung Nord"
      ],
      headlines: [
        "Warnung vor einem Online-Shop",
        "Geld kommt zurück",
        "Sofa ist heute geliefert worden",
        "Techniker kommt morgen",
        "Lieferung kommt später",
        "Auto ist schon repariert",
        "Neue Lampe ist angekommen",
        "Rechnung ist noch offen"
      ],
      answers: [4, 5, 1, 0, 3]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Ein Tag im Servicecenter",
      text: "Wenn Melina Costa morgens um acht ihr Headset aufsetzt, weiß sie nie, was der Tag bringt. Die 29-Jährige arbeitet im Servicecenter eines großen Online-Möbelhauses und beantwortet täglich sechzig bis achtzig Anrufe. \"Die meisten Leute rufen wegen verspäteter Lieferungen an\", erzählt sie. \"An zweiter Stelle kommen Fragen zum Aufbau – und erst danach echte Reklamationen.\"\n\nNicht alle Anruferinnen und Anrufer bleiben freundlich. \"Manche schreien erst einmal drei Minuten\", sagt Melina. Auflegen darf sie trotzdem nicht sofort – und will sie meistens auch nicht. In einer Schulung hat sie gelernt, ruhig zu bleiben, zuzuhören und das Problem in eigene Worte zu fassen. \"Wenn die Leute merken, dass ich sie ernst nehme, wird es fast immer besser.\" Am schönsten findet sie Gespräche, in denen sie sofort helfen kann: eine fehlende Schraube nachschicken, einen Gutschein buchen, einen Liefertermin retten.\n\nDas Unternehmen hat aus der Vergangenheit gelernt. Im letzten Jahr gab es große Lieferprobleme, die Wartezeit in der Hotline stieg zeitweise auf zwanzig Minuten. Danach wurden fünfzehn neue Kolleginnen und Kollegen eingestellt. Heute warten Anrufer im Durchschnitt keine fünf Minuten mehr. \"Trotzdem gilt\", sagt Melina und lacht, \"wer freundlich fragt, dem hilft man am liebsten – das ist am Telefon wie überall im Leben.\"",
      statements: [
        { text: "Melina arbeitet im Servicecenter eines Möbelhauses.", answer: true },
        { text: "Die meisten Kundinnen und Kunden rufen wegen kaputter Möbel an.", answer: false },
        { text: "Melina hat in einer Schulung gelernt, mit wütenden Anrufern umzugehen.", answer: true },
        { text: "Nach den Problemen im letzten Jahr hat die Firma neue Mitarbeiter eingestellt.", answer: true },
        { text: "Die Wartezeit in der Hotline ist heute länger als früher.", answer: false }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Sehr geehrte Damen und Herren,\n\nam 3. Mai hat Ihr Techniker meine Spülmaschine repariert. Schon eine Woche später trat derselbe Fehler wieder auf. Ich habe Sie sofort angerufen, und man hat mir [1], dass sich jemand bei mir meldet. Leider ist das bis heute nicht [2]. Da die Reparatur mit Garantie durchgeführt [3], erwarte ich, dass Sie den Schaden kostenlos beheben. Falls ich bis zum 15. Juni nichts von Ihnen [4], werde ich eine andere Firma beauftragen und Ihnen die Kosten in Rechnung stellen. Ich hoffe, dass es nicht so weit kommen [5], und bitte Sie [6] eine schnelle Antwort.\n\nMit freundlichen Grüßen\nRobert Klein",
      gaps: [
        { options: ["verspricht", "versprochen", "versprechen"], answer: 1 },
        { options: ["passieren", "passierte", "passiert"], answer: 2 },
        { options: ["wurde", "würde", "werden"], answer: 0 },
        { options: ["hören", "höre", "gehört"], answer: 1 },
        { options: ["müssen", "musst", "muss"], answer: 2 },
        { options: ["über", "um", "für"], answer: 1 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Sehr geehrte Mieterinnen und Mieter,\n\nwie viele von Ihnen bereits gemerkt haben, funktioniert die Heizung im Vorderhaus seit gestern nicht [1]. Die Ursache ist ein defektes Teil, das leider erst [2] werden muss. Die Firma hat uns versprochen, die Reparatur bis Freitag [3]. Bis dahin stellen wir allen betroffenen Haushalten auf [4] elektrische Heizgeräte zur Verfügung – melden Sie sich dafür einfach im Büro. Die Kosten für den zusätzlichen Strom übernimmt selbstverständlich die [5]. Wir bedanken uns für Ihre [6] und entschuldigen uns für die Unannehmlichkeiten.\n\nIhre Hausverwaltung",
      wordBank: ["Geduld", "bestellt", "richtig", "abzuschließen", "Wunsch", "Hausverwaltung", "kalt", "Fenster", "Küche", "Nachbarn", "öffnen", "Freude"],
      answers: [2, 1, 3, 4, 5, 0]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Guten Tag, ich möchte diese Hose umtauschen. Sie ist mir leider zu klein.\"", options: ["Haben Sie den Kassenbon dabei?", "Die Hose steht Ihnen aber sehr gut.", "Wir verkaufen leider keine Hosen."], answer: 0 },
        { prompt: "\"Mein Zug wurde gestrichen! Was mache ich denn jetzt?\"", options: ["Ich fahre selten mit dem Zug.", "Der nächste fährt in dreißig Minuten von Gleis fünf – Ihr Ticket gilt auch dort.", "Am Wochenende sind die Züge oft voll."], answer: 1 },
        { prompt: "\"Ihre Rechnung ist doppelt so hoch wie besprochen. Das kann doch nicht stimmen!\"", options: ["Rechnen war noch nie mein Lieblingsfach.", "Die Rechnung schicken wir immer per Post.", "Da haben Sie recht, das prüfe ich sofort – einen Moment, bitte."], answer: 2 },
        { prompt: "\"Das Essen war leider schon kalt, als es an unseren Tisch kam.\"", options: ["Das tut mir sehr leid – ich bringe Ihnen sofort ein neues Gericht.", "Kaltes Essen ist im Sommer sehr beliebt.", "Unsere Küche ist ganz modern eingerichtet."], answer: 0 },
        { prompt: "\"Ich warte jetzt schon seit vierzig Minuten – wann bin ich endlich dran?\"", options: ["Warten macht doch eigentlich Spaß.", "Ich verstehe Ihren Ärger – Sie sind gleich als Nächste dran.", "Wir haben heute schon um acht Uhr geöffnet."], answer: 1 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Sehr geehrte Fahrgäste, wegen einer technischen Störung endet diese Straßenbahn ausnahmsweise an der Haltestelle Stadtmitte. Für die Weiterfahrt nutzen Sie bitte die Buslinie sechzig, die direkt gegenüber abfährt.",
          statement: "Die Straßenbahn fährt heute bis zur Endhaltestelle.",
          answer: false
        },
        {
          audio: "Liebe Kundinnen und Kunden, das Kundenzentrum im zweiten Stock ist heute wegen einer Systemumstellung geschlossen. Reklamationen nimmt bis achtzehn Uhr die Information im Erdgeschoss entgegen. Vielen Dank für Ihr Verständnis.",
          statement: "Reklamationen sind heute im Erdgeschoss möglich.",
          answer: true
        },
        {
          audio: "Guten Tag, hier ist die Autowerkstatt Schneider. Ihr Wagen ist leider noch nicht fertig, wir warten auf ein Ersatzteil. Wir melden uns, sobald es da ist – wahrscheinlich Anfang nächster Woche. Bitte entschuldigen Sie die Verzögerung.",
          statement: "Das Auto kann noch heute abgeholt werden.",
          answer: false
        },
        {
          audio: "Achtung, eine Durchsage: Der Kunde oder die Kundin mit dem blauen Kombi, Kennzeichen M A vier sieben eins eins, bitte kommen Sie zu Ihrem Fahrzeug zurück. Sie haben die Scheinwerfer angelassen.",
          statement: "Beim blauen Auto ist das Licht noch an.",
          answer: true
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Servicezeit im Radio: Wenn Ihr Flug mehr als drei Stunden Verspätung hat, steht Ihnen nach europäischem Recht oft eine Entschädigung zu – je nach Strecke bis zu sechshundert Euro. Wichtig: Heben Sie Ihre Bordkarte auf und lassen Sie sich die Verspätung am Schalter bestätigen.",
          frage: "Was sollen Reisende bei großer Verspätung tun?",
          options: ["Sofort ein neues Ticket kaufen.", "Die Bordkarte aufheben und die Verspätung bestätigen lassen.", "Direkt zur Polizei gehen."],
          answer: 1
        },
        {
          audio: "Kundeninformation: Unser Möbelhaus erweitert den Service – ab sofort können Sie kleinere Reklamationen direkt online melden. Laden Sie einfach ein Foto des Schadens hoch, und wir melden uns innerhalb von zwei Werktagen bei Ihnen. Das lange Warten in der Serviceabteilung entfällt damit.",
          frage: "Wie kann man Reklamationen jetzt auch melden?",
          options: ["Nur persönlich im Möbelhaus.", "Per Telefon am Wochenende.", "Online mit einem Foto des Schadens."],
          answer: 2
        },
        {
          audio: "Und ein Hinweis der Stadtwerke: Wegen Bauarbeiten kann es morgen zwischen neun und zwölf Uhr in der Innenstadt zu kurzen Stromausfällen kommen. Stellen Sie empfindliche elektronische Geräte in dieser Zeit am besten aus. Ab dem Mittag läuft alles wieder normal.",
          frage: "Wann kann der Strom morgen ausfallen?",
          options: ["Zwischen neun und zwölf Uhr.", "Am Nachmittag.", "Die ganze Nacht."],
          answer: 0
        },
        {
          audio: "Verbrauchertipp: Viele Fitnessstudios verlängern Verträge automatisch. Kündigen Sie deshalb rechtzeitig – seit der Gesetzesänderung reicht dafür eine Frist von einem Monat. Schicken Sie die Kündigung am besten per E-Mail und lassen Sie sich den Eingang bestätigen.",
          frage: "Wie lang ist die Kündigungsfrist jetzt?",
          options: ["Ein Jahr.", "Ein Monat.", "Eine Woche."],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Kundin", text: "Guten Tag, ich habe diesen Toaster vor drei Wochen gekauft, und jetzt funktioniert er nicht mehr." },
            { speaker: "Verkäufer", text: "Das tut mir leid. Haben Sie den Kassenbon dabei?" },
            { speaker: "Kundin", text: "Ja, hier bitte." },
            { speaker: "Verkäufer", text: "Danke. Dann tauschen wir ihn sofort um – ich hole Ihnen ein neues Gerät aus dem Lager." }
          ],
          statement: "Die Kundin bekommt sofort einen neuen Toaster.",
          answer: true
        },
        {
          audio: [
            { speaker: "Tom", text: "Und, Miguel, gibt es Neuigkeiten von deinen Konzertkarten, die nie angekommen sind?" },
            { speaker: "Miguel", text: "Ja, endlich! Ich hatte ja über den Zahlungsdienst reklamiert – gestern war das Geld wieder auf meinem Konto." },
            { speaker: "Tom", text: "Na also! Und die Karten kaufst du jetzt woanders?" },
            { speaker: "Miguel", text: "Genau, direkt an der Konzertkasse. Da kann nichts schiefgehen." }
          ],
          statement: "Miguel wartet immer noch auf sein Geld.",
          answer: false
        },
        {
          audio: [
            { speaker: "Kunde", text: "Guten Tag, ich wollte fragen, ob mein Fahrrad schon fertig ist." },
            { speaker: "Mechanikerin", text: "Fast! Die Bremsen sind gemacht, aber das neue Licht kommt erst heute Nachmittag. Morgen ab zwölf Uhr können Sie es abholen." },
            { speaker: "Kunde", text: "Gut, dann komme ich morgen nach der Arbeit vorbei." }
          ],
          statement: "Das Fahrrad ist morgen ab Mittag fertig.",
          answer: true
        },
        {
          audio: [
            { speaker: "Gast", text: "Entschuldigung, in meinem Zimmer kommt seit heute Morgen nur kaltes Wasser aus der Dusche." },
            { speaker: "Rezeptionistin", text: "Oh, das tut mir sehr leid! Ich kann Ihnen sofort ein anderes Zimmer geben – die 305, ein Stockwerk höher. Unser Kollege bringt Ihr Gepäck nach oben." },
            { speaker: "Gast", text: "Das ist nett, vielen Dank. Dann packe ich kurz meine Sachen." }
          ],
          statement: "Der Gast bleibt in seinem alten Zimmer.",
          answer: false
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderator", text: "Willkommen zur Servicezeit! Heute bei uns: Petra Wilms von der Verbraucherzentrale. Frau Wilms, immer mehr Menschen fallen auf Fake-Shops im Internet herein. Woran erkennt man solche Shops?" },
        { speaker: "Petra Wilms", text: "Das größte Warnsignal sind extrem niedrige Preise – das neue Smartphone für die Hälfte, das gibt es einfach nicht. Verdächtig ist auch, wenn man nur per Vorkasse bezahlen kann, also überweisen muss, bevor die Ware kommt." },
        { speaker: "Moderator", text: "Was kann ich denn vor einer Bestellung prüfen?" },
        { speaker: "Petra Wilms", text: "Schauen Sie ins Impressum: Fehlt es oder steht dort keine echte Adresse, Finger weg. Und lesen Sie Bewertungen auf unabhängigen Seiten, nicht nur im Shop selbst." },
        { speaker: "Moderator", text: "Und wenn ich schon bezahlt habe und die Ware kommt nicht?" },
        { speaker: "Petra Wilms", text: "Dann zählt jede Stunde: Kontaktieren Sie sofort Ihre Bank – manchmal lässt sich eine Überweisung noch stoppen oder zurückholen. Und erstatten Sie auf jeden Fall Anzeige bei der Polizei, das geht auch online." },
        { speaker: "Moderator", text: "Ihr wichtigster Tipp zum Schluss?" },
        { speaker: "Petra Wilms", text: "Bezahlen Sie möglichst auf Rechnung – dann zahlen Sie erst, wenn die Ware wirklich da ist. Das ist der beste Schutz." }
      ],
      questions: [
        { frage: "Woran erkennt man einen Fake-Shop oft?", options: ["An sehr niedrigen Preisen und Vorkasse.", "An zu hohen Preisen.", "An bunten Fotos."], answer: 0 },
        { frage: "Was soll man vor einer Bestellung prüfen?", options: ["Nur die Produktfotos.", "Das Impressum und unabhängige Bewertungen.", "Die Lieferzeit im Shop."], answer: 1 },
        { frage: "Was soll man tun, wenn man schon bezahlt hat?", options: ["Einfach abwarten.", "Noch einmal bestellen.", "Sofort die Bank kontaktieren und Anzeige erstatten."], answer: 2 },
        { frage: "Welche Zahlungsart empfiehlt Frau Wilms?", options: ["Kauf auf Rechnung.", "Immer Vorkasse.", "Bargeld im Briefumschlag."], answer: 0 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Guten Tag, Frau Osei, hier ist die Autowerkstatt Schneider, mein Name ist Marco Brandt. Gute Nachrichten: Ihr Auto ist früher fertig als gedacht! Sie können es schon am Donnerstag ab vierzehn Uhr abholen. Wir haben die Bremsen erneuert und den Ölwechsel gemacht, zusammen kostet das zweihundertvierzig Euro. Kartenzahlung ist möglich. Bitte bringen Sie den Fahrzeugschein mit, den brauchen wir für die Unterlagen. Falls Donnerstag nicht passt, rufen Sie uns kurz an: null acht neun, sechs sechs eins zwei. Auf Wiederhören!",
      noteTitle: "Notiz: Anruf von der Autowerkstatt",
      gaps: [
        { label: "Es ruft an: Herr ____", answer: "Brandt", alt: [] },
        { label: "Auto abholen: am ____ ab 14 Uhr", answer: "Donnerstag", alt: ["donnerstag"] },
        { label: "Kosten: ____ Euro", answer: "240", alt: ["zweihundertvierzig", "240€"] },
        { label: "Mitbringen: ____", answer: "Fahrzeugschein", alt: ["den Fahrzeugschein"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Sie haben online eine Stehlampe bestellt. Der Online-Shop schreibt Ihnen, dass es ein Problem gibt.",
    incomingEmail: {
      von: "kundenservice@lampenwelt-shop.de",
      betreff: "Ihre Bestellung Nr. 48213",
      text: "Guten Tag,\n\nleider können wir Ihre bestellte Stehlampe zurzeit nicht liefern, weil der Artikel nicht auf Lager ist. Sie haben zwei Möglichkeiten: Sie warten etwa vier Wochen, oder Sie wählen ein anderes Modell aus unserem Sortiment. Bitte teilen Sie uns außerdem mit, ob Ihre Lieferadresse noch aktuell ist.\n\nMit freundlichen Grüßen\nIhr Team von Lampenwelt"
    },
    points: [
      "Schreiben Sie, ob Sie warten oder ein anderes Modell wählen möchten. Begründen Sie.",
      "Stellen Sie eine Frage zum Angebot (zum Beispiel zu Preis oder Lieferzeit).",
      "Bestätigen oder korrigieren Sie Ihre Lieferadresse."
    ],
    musterloesung: "Sehr geehrte Damen und Herren,\n\nvielen Dank für Ihre Nachricht. Vier Wochen möchte ich nicht warten, weil die Lampe ein Geburtstagsgeschenk sein soll. Deshalb wähle ich gern ein anderes Modell. Könnten Sie mir mitteilen, welche ähnlichen Lampen Sie auf Lager haben und was sie kosten? Meine Lieferadresse ist noch aktuell: Gartenweg 5, 34117 Kassel.\n\nMit freundlichen Grüßen",
    tipps: "This one is formal: use \"Sehr geehrte Damen und Herren\" and \"Mit freundlichen Grüßen\". Show B1 range with an indirect question (\"Könnten Sie mir mitteilen, welche ...\") and a reason with \"weil\"."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Mein Name ist ..., ich bin ... Jahre alt.",
        "Geboren bin ich in ..., heute lebe ich in ...",
        "Zu meiner Familie gehören ...",
        "Ich arbeite zurzeit als ... / Ich suche gerade eine Stelle als ...",
        "Ich spreche ... – und Deutsch lerne ich seit ...",
        "Wenn ich Zeit habe, ... ich gern ...",
        "Besonders gern mag ich ..."
      ]
    },
    teil2: {
      thema: "Einkaufen und Reklamieren",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Kaufen Sie lieber online oder im Geschäft ein? Warum?",
        "Haben Sie schon einmal etwas umgetauscht oder reklamiert? Erzählen Sie.",
        "Was machen Sie, wenn ein neues Gerät schnell kaputtgeht?",
        "Wie wichtig ist Ihnen guter Kundenservice?"
      ],
      redemittel: [
        "Ich kaufe am liebsten ... ein, weil ...",
        "Einmal musste ich ... zurückbringen. Das war ...",
        "Wenn etwas kaputtgeht, würde ich zuerst ...",
        "Für mich ist guter Service ..., denn ...",
        "Hast du so etwas auch schon erlebt?"
      ]
    },
    teil3: {
      aufgabe: "Sie haben zusammen ein Küchengerät für eine Freundin gekauft, aber es funktioniert nicht. Besprechen Sie, was Sie jetzt machen.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Zurückbringen oder reparieren lassen?", "Wer hat den Kassenbon, und wer geht zum Geschäft?", "Wann haben Sie beide Zeit dafür?", "Was machen Sie, wenn das Geschäft nicht hilft?"],
      redemittel: [
        "Am besten wäre es, wenn wir ...",
        "Ich finde, wir sollten zuerst ...",
        "Da hast du recht, aber ...",
        "Falls das nicht klappt, könnten wir ...",
        "Einverstanden, so machen wir es."
      ]
    }
  }
} as const satisfies DualLevelExam;

export default exam;
