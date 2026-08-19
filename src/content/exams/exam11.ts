import { type Exam } from '@shared/types';

const exam = {
  id: 11,
  title: "Modelltest 11",
  difficulty: "b1",
  level: "B1 · Ziel",
  theme: "Ehrenamt & Nachbarschaftshilfe",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Sie möchten sich ehrenamtlich engagieren und älteren Menschen im Alltag helfen.",
        "Ihre Nachbarin ist krank. Sie suchen jemanden, der ihren Hund tagsüber ausführt.",
        "Sie ziehen um und suchen günstige Helfer mit einem Transporter.",
        "Sie sprechen gut Deutsch und möchten Kindern kostenlos bei den Hausaufgaben helfen.",
        "Sie haben gut erhaltene Möbel, die Sie nicht mehr brauchen, und möchten sie spenden."
      ],
      ads: [
        "Sozialkaufhaus Brücke: Wir holen gut erhaltene Möbel und Hausrat kostenlos bei Ihnen ab und geben sie günstig an Menschen mit wenig Geld weiter. Termin unter 0421 33 44 55.",
        "Nachhilfe-Institut Lernplus: Professionelle Einzelnachhilfe in Mathe und Deutsch, ab 25 Euro pro Stunde. Jetzt Probestunde buchen!",
        "Besuchsdienst Sonnenschein: Wir suchen Freiwillige, die einmal pro Woche ältere Menschen besuchen, mit ihnen spazieren gehen oder einkaufen. Schulung und Versicherung inklusive.",
        "Umzugshilfe Studentenpower: Zwei starke Studenten mit Transporter helfen bei Ihrem Umzug – 18 Euro pro Stunde und Person. Auch kurzfristig buchbar!",
        "Möbel-Discount Colombo: Neue Sofas, Schränke und Betten zu kleinen Preisen. Diese Woche: 20 Prozent Rabatt auf alle Küchen!",
        "Tierheim Pfotenglück: Wir brauchen dringend Geldspenden für kranke Tiere. Jeder Euro hilft! Das Spendenkonto finden Sie auf unserer Website.",
        "Dogwalker Bello & Co: Wir führen Ihren Hund aus, wenn Sie keine Zeit haben – zuverlässig und versichert, ab 12 Euro pro Spaziergang. Auch regelmäßige Termine möglich.",
        "Stadtteilzentrum West: Für unsere kostenlose Hausaufgabenhilfe suchen wir Ehrenamtliche mit guten Deutschkenntnissen, dienstags oder donnerstags am Nachmittag."
      ],
      answers: [2, 6, 3, 7, 0]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Freiwilligenagentur: So finden Sie das passende Ehrenamt",
          text: "Sie möchten anderen helfen, wissen aber nicht, wo Sie anfangen sollen? Die Freiwilligenagentur am Marktplatz vermittelt Ehrenämter in über 80 Vereinen und Einrichtungen – vom Sportverein bis zum Seniorenheim. Der erste Schritt ist ein persönliches Beratungsgespräch, das Sie online oder telefonisch vereinbaren. Dort besprechen Sie, wie viel Zeit Sie haben und was zu Ihnen passt. Zusätzlich gibt es jeden ersten Dienstag im Monat einen Informationsabend – kostenlos und ohne Anmeldung. Mitmachen kann übrigens jeder ab 16 Jahren; alle Freiwilligen sind während ihres Einsatzes über die Stadt versichert."
        },
        {
          titel: "Neue Nachbarschafts-App: Hallo Nebenan",
          text: "Wer im Stadtgebiet wohnt, kann seit März die App Hallo Nebenan nutzen. Nachbarn leihen sich darüber Werkzeug, verschenken Kleidung oder suchen Hilfe beim Einkaufen. Damit wirklich nur echte Nachbarn mitmachen, muss jedes neue Mitglied seine Adresse bestätigen: Man bekommt einen Brief mit einem Code, den man in der App eingibt. Die normale Nutzung kostet nichts. Nur Firmen, die in der App Werbung machen möchten, zahlen eine monatliche Gebühr. Wer unfreundliche oder verdächtige Nachrichten bekommt, kann sie mit einem Klick an das Moderationsteam melden."
        }
      ],
      questions: [
        { textIndex: 0, frage: "Was ist der erste Schritt zu einem Ehrenamt?", options: ["Ein Beratungsgespräch vereinbaren.", "Sofort in einem Verein anfangen.", "Einen Kurs bezahlen."], answer: 0 },
        { textIndex: 0, frage: "Was kostet der Informationsabend?", options: ["16 Euro.", "Nichts.", "Es steht nicht im Text."], answer: 1 },
        { textIndex: 0, frage: "Wer kann ein Ehrenamt übernehmen?", options: ["Nur Studenten.", "Nur Erwachsene ab 18 Jahren.", "Alle ab 16 Jahren."], answer: 2 },
        { textIndex: 1, frage: "Wie bestätigt man bei der App seine Adresse?", options: ["Mit einem Code, der per Brief kommt.", "Mit einem Anruf beim Moderationsteam.", "Mit dem Ausweis im Rathaus."], answer: 0 },
        { textIndex: 1, frage: "Wer muss für die App bezahlen?", options: ["Alle Mitglieder.", "Neue Nachbarn im ersten Jahr.", "Firmen, die Werbung machen."], answer: 2 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Liebe Hausgemeinschaft, am Samstag ab 10 Uhr machen wir wieder unseren Frühjahrsputz im Hof und im Treppenhaus. Wer mithilft, ist danach zu Pizza eingeladen! Bitte tragt euch in die Liste im Eingang ein. Euer Hausmeister",
        "Hallo Frau Yilmaz, ich habe heute Ihr Paket angenommen, weil Sie nicht zu Hause waren. Sie können es bis 20 Uhr bei mir abholen – Wohnung 3b, einfach klingeln. Viele Grüße, Herr Krause",
        "Hi Deniz, ich schaffe es heute nicht zum Flughafen, mein Auto springt nicht an! Könntest du vielleicht meine Mutter abholen? Ihr Flug landet um 17:40 Uhr. Ich rufe dich gleich an! Sam",
        "Liebe Nachbarn, wir suchen für zwei Wochen im August jemanden, der unsere Blumen gießt und den Briefkasten leert. Als Dankeschön bringen wir etwas Schönes aus dem Urlaub mit! Familie Roth, 2. Stock",
        "Hallo zusammen, der Aufzug ist ab Montag wegen einer Reparatur außer Betrieb, voraussichtlich drei Tage. Wer Hilfe beim Tragen braucht, kann sich gern bei mir melden. Ali aus dem Erdgeschoss"
      ],
      headlines: [
        "Hilfe während des Urlaubs gesucht",
        "Paket ist verloren gegangen",
        "Gemeinsames Putzen im Haus",
        "Aufzug wird repariert",
        "Bitte um eine Fahrt zum Flughafen",
        "Nachbar hat ein Paket angenommen",
        "Einladung ins Pizza-Restaurant",
        "Neue Blumen für den Hof"
      ],
      answers: [2, 5, 4, 0, 3]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Ein Garten für alle",
      text: "Wo früher nur ein leerer Parkplatz war, wachsen heute Tomaten, Kürbisse und Sonnenblumen: Der Gemeinschaftsgarten Grüne Insel im Stadtteil Ost feiert diesen Sommer seinen dritten Geburtstag. Die Stadt hat dem Verein die Fläche für fünf Jahre kostenlos überlassen – eine Entscheidung, die anfangs nicht allen gefiel, denn einige Anwohner hätten lieber neue Parkplätze gehabt.\n\nHeute arbeiten rund dreißig Mitglieder im Garten, sie stammen aus zwölf verschiedenen Ländern. \"Hier lernt man beim Unkrautjäten mehr Deutsch als in manchem Kurs\", sagt die Vorsitzende Renate Kowalski und lacht. Das Gemüse wird unter den Mitgliedern aufgeteilt; was übrig bleibt, wird nicht verkauft, sondern an die Tafel gespendet.\n\nEinfach war der Anfang nicht: Im ersten Sommer wurden mehrmals Beete zerstört und Werkzeuge gestohlen. Der Verein reagierte mit einem niedrigen Zaun – und mit einem Sommerfest, zu dem die ganze Nachbarschaft eingeladen wurde. \"Seitdem passen alle mit auf den Garten auf\", erzählt Kowalski. \"Wer mitfeiert, macht nichts mehr kaputt.\"\n\nFür die Zukunft hat der Verein große Pläne: Ein kleines Gewächshaus soll gebaut werden, damit auch im Winter gegärtnert werden kann. Außerdem möchte der Verein mit den Grundschulen im Viertel zusammenarbeiten. Schulklassen sollen eigene Beete bekommen und lernen, wie aus einem Samenkorn eine Mahlzeit wird.",
      statements: [
        { text: "Die Stadt hat dem Verein die Fläche für fünf Jahre überlassen.", answer: true },
        { text: "Alle Anwohner fanden die Idee von Anfang an gut.", answer: false },
        { text: "Das übrige Gemüse wird auf dem Markt verkauft.", answer: false },
        { text: "Am Anfang gab es Probleme mit Zerstörungen und Diebstahl.", answer: true },
        { text: "Der Verein möchte in Zukunft mit Schulen zusammenarbeiten.", answer: true }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Liebe Frau Sommer,\n\nvielen Dank, dass Sie mir den Kontakt zur Freiwilligenagentur gegeben haben. Ich habe mich dort [1] einen Platz im Besuchsdienst beworben. Gestern hatte ich das Gespräch, [2] ich Ihnen erzählt habe. Die Leiterin fragte mich, [3] ich lieber ältere Menschen oder Kinder betreuen möchte. Ich habe gesagt, dass mir beides gefallen [4]. Nächste Woche besuche ich zum ersten Mal die Gruppe, [5] sich jeden Mittwoch im Stadtteilzentrum trifft. [6] mir die Arbeit gefällt, bleibe ich das ganze Jahr dabei.\n\nHerzliche Grüße\nAmira Haddad",
      gaps: [
        { options: ["für", "um", "auf"], answer: 1 },
        { options: ["von dem", "über das", "auf das"], answer: 0 },
        { options: ["dass", "ob", "wenn"], answer: 1 },
        { options: ["würde", "wird", "werde"], answer: 0 },
        { options: ["der", "das", "die"], answer: 2 },
        { options: ["Ob", "Weil", "Wenn"], answer: 2 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Liebe Nachbarinnen und Nachbarn,\n\nunser Verein organisiert seit einem Jahr die Nachbarschaftshilfe im Viertel. Über vierzig Freiwillige bieten ihre freie [1] an: Sie kaufen ein, begleiten zum Arzt oder helfen beim Ausfüllen von Formularen. Das Angebot ist kostenlos, wir freuen uns aber über eine kleine [2] für unsere Vereinskasse. Sie brauchen selbst [3]? Dann rufen Sie uns werktags zwischen 9 und 12 Uhr an. Wir suchen außerdem neue Helferinnen und Helfer: Schon zwei Stunden pro [4] machen einen großen Unterschied. Am 3. September stellen wir unsere Arbeit bei einem offenen [5] im Stadtteilzentrum vor. Kommen Sie vorbei und lernen Sie uns [6]!\n\nIhr Team der Nachbarschaftshilfe",
      wordBank: ["Straße", "kennen", "Hilfe", "Spende", "Zeit", "Woche", "teuer", "Nachbarn", "verstehen", "Treffen", "Garten", "Angst"],
      answers: [4, 3, 2, 5, 9, 1]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Könnten Sie mir kurz helfen? Der Karton ist zu schwer für mich.\"", options: ["Natürlich, ich nehme gern eine Seite.", "Der Karton ist ganz neu.", "Nein, ich habe keinen Karton."], answer: 0 },
        { prompt: "\"Ich danke Ihnen herzlich für Ihre Hilfe beim Umzug!\"", options: ["Ja, der Umzug war sehr teuer.", "Gern geschehen! Melden Sie sich einfach, wenn Sie wieder etwas brauchen.", "Ich ziehe nächste Woche um."], answer: 1 },
        { prompt: "\"Würdest du nächste Woche meine Katze füttern? Ich bin auf Dienstreise.\"", options: ["Katzen fressen am liebsten Fisch.", "Ich war noch nie auf einer Dienstreise.", "Kein Problem, gib mir einfach deinen Schlüssel."], answer: 2 },
        { prompt: "\"Entschuldigen Sie, hätten Sie einen Moment Zeit? Wir sammeln Unterschriften für einen neuen Spielplatz.\"", options: ["Ja, erzählen Sie mir kurz, worum es geht.", "Nein, ich habe keinen Stift gekauft.", "Der Spielplatz war früher viel größer."], answer: 0 },
        { prompt: "\"Mein Sohn kann Ihnen gern beim Einkaufen helfen, wenn Ihr Bein wieder wehtut.\"", options: ["Ich kaufe nie Schuhe.", "Das ist sehr nett, darauf komme ich gern zurück.", "Einkaufen macht mir immer Spaß."], answer: 1 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Liebe Besucherinnen und Besucher des Freiwilligentags, wegen des Regens beginnt die Aktion auf dem Marktplatz erst um elf Uhr, nicht wie geplant um zehn Uhr. Die Infostände in der Halle sind aber schon jetzt geöffnet.",
          statement: "Die Aktion auf dem Marktplatz beginnt später als geplant.",
          answer: true
        },
        {
          audio: "Hier ist der Anrufbeantworter des Sozialkaufhauses Brücke. Unser Lager ist zurzeit voll – wir können im Moment leider keine Kleiderspenden annehmen. Möbel und Geschirr nehmen wir aber gern weiter an. Vielen Dank für Ihr Verständnis.",
          statement: "Das Sozialkaufhaus nimmt im Moment keine Möbel an.",
          answer: false
        },
        {
          audio: "Liebe Hausbewohnerinnen und Hausbewohner, am Donnerstag wird zwischen acht und vierzehn Uhr das Wasser abgestellt, weil die Leitungen im Keller repariert werden. Bitte füllen Sie sich vorher genug Wasser ab.",
          statement: "Am Donnerstag gibt es mehrere Stunden lang kein Wasser.",
          answer: true
        },
        {
          audio: "Und hier eine Meldung für alle Helferinnen und Helfer beim Stadtteilfest: Die Besprechung heute Abend findet nicht im Stadtteilzentrum statt, sondern im Café Luna direkt daneben. Beginn ist wie immer um neunzehn Uhr.",
          statement: "Die Besprechung beginnt heute um achtzehn Uhr.",
          answer: false
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Radio Neustadt informiert: Am kommenden Samstag ist wieder Repair-Café im Bürgerhaus. Freiwillige reparieren dort kostenlos Ihre kaputten Geräte – vom Toaster bis zum Fahrrad. Nur die Ersatzteile müssen Sie selbst bezahlen. Geöffnet ist von zehn bis sechzehn Uhr.",
          frage: "Was müssen die Besucher im Repair-Café bezahlen?",
          options: ["Die Arbeit der Freiwilligen.", "Nur die Ersatzteile.", "Den Eintritt."],
          answer: 1
        },
        {
          audio: "Eine Durchsage der Stadtbücherei: Ab Oktober suchen wir Vorlesepatinnen und Vorlesepaten für Kinder von vier bis acht Jahren. Sie brauchen keine Erfahrung – wir bereiten Sie in einem kostenlosen Kurs vor. Interessierte melden sich bitte an der Information im Erdgeschoss.",
          frage: "Was bietet die Bücherei den neuen Vorlesepaten an?",
          options: ["Einen kostenlosen Vorbereitungskurs.", "Geld für jede Vorlesestunde.", "Bücher zum Mitnehmen."],
          answer: 0
        },
        {
          audio: "Der Verein Essenszeit sucht dringend Fahrerinnen und Fahrer, die einmal pro Woche Mittagessen an ältere Menschen ausliefern. Ein eigenes Auto ist nicht nötig, der Verein stellt die Fahrzeuge. Wichtig ist nur ein Führerschein. Mehr Informationen auf der Website des Vereins.",
          frage: "Was brauchen die Fahrerinnen und Fahrer unbedingt?",
          options: ["Ein eigenes Auto.", "Viel Zeit am Wochenende.", "Einen Führerschein."],
          answer: 2
        },
        {
          audio: "Und zum Schluss der Spendenaufruf der Woche: Der Kindergarten Regenbogen sammelt für ein neues Klettergerüst. Zwölftausend Euro werden insgesamt gebraucht – die Hälfte ist schon zusammen. Wer helfen möchte, findet alle Informationen auf der Website des Kindergartens.",
          frage: "Wie viel Geld fehlt noch für das Klettergerüst?",
          options: ["Zwölftausend Euro.", "Sechstausend Euro.", "Zweitausend Euro."],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Frau Behrens", text: "Herr Weber, Sie wollten doch nächste Woche meine Blumen gießen, wenn ich bei meiner Tochter bin. Passt das noch?" },
            { speaker: "Herr Weber", text: "Ja, gern! Nur am Samstag bin ich selbst nicht da, da bin ich auf einer Hochzeit." },
            { speaker: "Frau Behrens", text: "Das macht gar nichts. Montag bis Freitag reicht völlig, am Wochenende regnet es sowieso." }
          ],
          statement: "Herr Weber soll auch am Samstag die Blumen gießen.",
          answer: false
        },
        {
          audio: [
            { speaker: "Miriam", text: "Ich war gestern wieder bei der Tafel und habe Lebensmittel sortiert. Jeden Freitag zwei Stunden – das macht wirklich Sinn." },
            { speaker: "Tobias", text: "Das würde mich auch interessieren. Kann man da einfach vorbeikommen?" },
            { speaker: "Miriam", text: "Nicht direkt – du musst dich vorher auf der Website anmelden, dann bekommst du eine kurze Einführung." }
          ],
          statement: "Wer bei der Tafel helfen möchte, muss sich vorher anmelden.",
          answer: true
        },
        {
          audio: [
            { speaker: "Emre", text: "Clara, wir organisieren einen Kuchenverkauf für die neue Schulbibliothek. Machst du mit?" },
            { speaker: "Clara", text: "Klar! Soll ich zwei Kuchen backen? Meinen Schokoladenkuchen mögen doch alle." },
            { speaker: "Emre", text: "Kuchen haben wir ehrlich gesagt schon genug. Aber wir brauchen dringend jemanden, der am Stand verkauft – so von zehn bis zwölf?" },
            { speaker: "Clara", text: "In Ordnung, dann übernehme ich den Verkauf." }
          ],
          statement: "Clara soll für den Verkauf Kuchen backen.",
          answer: false
        },
        {
          audio: [
            { speaker: "Frau Krüger", text: "Vielen Dank, junger Mann, dass Sie mir die schweren Taschen getragen haben!" },
            { speaker: "Jannik", text: "Sehr gern! Ich mache das übrigens jeden Dienstag über die Nachbarschaftshilfe. Wenn Sie möchten, kann ich nächste Woche wiederkommen." },
            { speaker: "Frau Krüger", text: "Das wäre wunderbar. Wo kann ich mich denn dafür anmelden?" },
            { speaker: "Jannik", text: "Ich gebe Ihnen die Telefonnummer, dort erreichen Sie das Büro jeden Vormittag." }
          ],
          statement: "Jannik hilft jeden Dienstag bei der Nachbarschaftshilfe.",
          answer: true
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderator", text: "Willkommen bei Radio Neustadt! Heute ist Jonas Bergmann bei uns, vierundzwanzig Jahre alt und Mitglied der freiwilligen Feuerwehr. Jonas, wie lange bist du schon dabei?" },
        { speaker: "Jonas", text: "Ich habe mit sechzehn in der Jugendfeuerwehr angefangen – also seit acht Jahren. Mein Opa war auch bei der Feuerwehr, das hat mich als Kind schon fasziniert." },
        { speaker: "Moderator", text: "Wie viel Zeit kostet dich das Ehrenamt?" },
        { speaker: "Jonas", text: "Wir üben jeden Montagabend zwei Stunden. Und dann gibt es natürlich die Einsätze – der Piepser kann jederzeit losgehen, auch nachts oder bei der Arbeit. Zum Glück lässt mich mein Chef dann sofort los." },
        { speaker: "Moderator", text: "Was ist für dich das Schwierigste?" },
        { speaker: "Jonas", text: "Die Übungen machen mir Spaß, und das Team ist wie eine zweite Familie. Am schwersten sind die Einsätze mitten in der Nacht – wenn der Piepser um drei Uhr geht und man am nächsten Morgen trotzdem arbeiten muss." },
        { speaker: "Moderator", text: "Und was wünschst du dir für die Zukunft?" },
        { speaker: "Jonas", text: "Vor allem mehr junge Mitglieder, gern auch mehr Frauen! Wer neugierig ist, kann einfach zum Schnupperabend kommen, jeden ersten Freitag im Monat. Die Ausbildung bezahlt die Feuerwehr komplett." }
      ],
      questions: [
        { frage: "Seit wann ist Jonas bei der Feuerwehr?", options: ["Seit acht Jahren.", "Seit sechzehn Jahren.", "Seit einem Jahr."], answer: 0 },
        { frage: "Wann übt die Feuerwehr?", options: ["Jeden ersten Freitag.", "Jeden Montagabend.", "Nur am Wochenende."], answer: 1 },
        { frage: "Was findet Jonas am schwierigsten?", options: ["Die Übungen am Montag.", "Die Arbeit im Team.", "Einsätze mitten in der Nacht."], answer: 2 },
        { frage: "Was wünscht sich Jonas für die Zukunft?", options: ["Mehr junge Mitglieder.", "Ein neues Feuerwehrauto.", "Weniger Einsätze bei der Arbeit."], answer: 0 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Hallo Frau Demir, hier ist Peter Lang von der Nachbarschaftshilfe. Es geht um Ihren Einsatz am Donnerstag: Sie begleiten Frau Albrecht zum Augenarzt. Bitte seien Sie schon um viertel vor neun bei ihr, die Praxis ist in der Gartenstraße zwölf. Ganz wichtig: Denken Sie an die Versichertenkarte von Frau Albrecht – sie vergisst sie oft. Nach dem Termin möchte Frau Albrecht noch kurz in die Apotheke. Wenn etwas dazwischenkommt, rufen Sie mich bitte an: null eins fünf zwei, sieben sieben neun drei. Vielen Dank und bis Donnerstag!",
      noteTitle: "Notiz: Einsatz für die Nachbarschaftshilfe",
      gaps: [
        { label: "Es ruft an: Herr ____", answer: "Lang", alt: [] },
        { label: "Bei Frau Albrecht sein um: ____ Uhr", answer: "8:45", alt: ["8.45", "08:45", "845", "viertel vor neun", "viertel vor 9"] },
        { label: "Adresse der Praxis: ____ 12", answer: "Gartenstraße", alt: ["Gartenstrasse"] },
        { label: "Unbedingt mitnehmen: ____", answer: "Versichertenkarte", alt: ["die Versichertenkarte"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihre Nachbarin Carola organisiert ein Hoffest und bittet Sie um Hilfe.",
    incomingEmail: {
      von: "carola.jensen@mail.de",
      betreff: "Unser Hoffest am 14. Juni",
      text: "Hallo!\n\nwie du weißt, feiern wir am 14. Juni unser Hoffest. Ich organisiere gerade alles und brauche noch Hilfe. Hättest du Zeit, mir beim Aufbau zu helfen? Und könntest du etwas für das Buffet mitbringen? Außerdem suche ich noch jemanden mit einer Musikbox – kennst du vielleicht jemanden?\n\nLiebe Grüße\nCarola"
    },
    points: [
      "Sagen Sie zu, dass Sie beim Aufbau helfen, und nennen Sie eine Uhrzeit.",
      "Schreiben Sie, was Sie für das Buffet mitbringen.",
      "Antworten Sie auf die Frage nach der Musikbox."
    ],
    musterloesung: "Hallo Carola,\n\ndanke für deine Nachricht – klar helfe ich beim Aufbau! Ich kann am 14. Juni schon um 15 Uhr im Hof sein. Für das Buffet bringe ich einen großen Nudelsalat und frisches Brot mit. Eine Musikbox habe ich leider nicht, aber mein Bruder hat eine, die er uns bestimmt leiht. Ich frage ihn heute Abend.\n\nLiebe Grüße",
    tipps: "Work through the three points in order and show B1 range: a concrete time, a relative clause (\"..., die er uns leiht\") and a polite commitment (\"Ich frage ihn heute Abend\")."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Darf ich mich kurz vorstellen? Ich heiße ...",
        "Ich bin ... Jahre alt und komme ursprünglich aus ...",
        "Seit ... Jahren wohne ich in ...",
        "Ich bin verheiratet / ledig und habe ...",
        "Beruflich arbeite ich als ... / Zurzeit mache ich ...",
        "Neben meiner Muttersprache spreche ich ...",
        "In meiner Freizeit engagiere ich mich ... / mache ich gern ..."
      ]
    },
    teil2: {
      thema: "Helfen und Nachbarschaft",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Kennen Sie Ihre Nachbarn gut?",
        "Haben Sie schon einmal einem Nachbarn geholfen – oder ein Nachbar Ihnen?",
        "Wie helfen sich die Menschen in Ihrem Heimatland gegenseitig?",
        "Finden Sie ehrenamtliche Arbeit wichtig? Warum (nicht)?"
      ],
      redemittel: [
        "Mit meinen Nachbarn verstehe ich mich ...",
        "Einmal habe ich ... / Einmal hat mir ein Nachbar ...",
        "Bei uns ist es üblich, dass ...",
        "Ich finde Ehrenamt wichtig, weil ...",
        "Wie ist das eigentlich bei dir?"
      ]
    },
    teil3: {
      aufgabe: "Ihr älterer Nachbar kommt nächste Woche aus dem Krankenhaus. Planen Sie zusammen, wie Sie ihm in der ersten Woche helfen.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Was muss gemacht werden? (Einkaufen, Wohnung, Apotheke?)", "Wer übernimmt welche Aufgabe?", "An welchen Tagen haben Sie Zeit?", "Was können Sie für ihn kochen?"],
      redemittel: [
        "Ich schlage vor, dass wir zuerst ...",
        "Ich könnte ... übernehmen, wenn du ...",
        "Einverstanden, das ist eine gute Idee!",
        "Hm, ich weiß nicht – vielleicht wäre es besser, wenn ...",
        "Also gut, dann machen wir es so."
      ]
    }
  }
} as const satisfies Exam;

export default exam;
