import { type TelcExam } from '@shared/types';

const exam = {
  id: 1,
  level: 'b1',
  title: 'Modelltest 1',
  theme: 'Arbeit, Alltag & Stadtleben',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Immer mehr Deutsche arbeiten von zu Hause',
        'Neue Buslinien für die Innenstadt geplant',
        'Stadtbibliothek verleiht jetzt auch Werkzeug',
        'Streik: Am Freitag fahren keine Züge',
        'Gesund essen im Büro — so klappt es',
        'Mieten steigen weiter: Wohnen wird teurer',
        'Immer weniger junge Leute machen den Führerschein',
        'Volkshochschule bietet neue Sprachkurse an',
        'Supermarkt öffnet erste Filiale ohne Kassen',
        'Mehr Fahrraddiebstähle: Polizei gibt Tipps'
      ],
      texts: [
        'Ob Bohrmaschine, Nähmaschine oder Leiter: In der Stadtbibliothek Grünstadt kann man ab sofort nicht nur Bücher ausleihen. „Viele Geräte braucht man nur einmal im Jahr. Warum soll sie jeder selbst kaufen?“, erklärt die Leiterin. Der Ausweis der Bibliothek genügt, die Ausleihe ist kostenlos und auf zwei Wochen begrenzt.',
        'Wegen eines Tarifkonflikts hat die Gewerkschaft die Lokführer zu einem ganztägigen Ausstand aufgerufen. Betroffen sind am Freitag der Fern- und der Regionalverkehr. Die Bahn empfiehlt ihren Kunden, Reisen zu verschieben oder auf Busse auszuweichen. Am Samstag soll der Verkehr wieder normal laufen.',
        'Nach einer neuen Studie erledigt inzwischen fast jeder dritte Beschäftigte in Deutschland seine Arbeit mindestens teilweise in der eigenen Wohnung. Vor allem in großen Firmen ist das Modell beliebt: Die Mitarbeiter sparen den Arbeitsweg, und die Unternehmen brauchen weniger Büros. Kritiker warnen jedoch, dass der Kontakt zu den Kollegen verloren geht.',
        'Wer im Stadtzentrum eine Wohnung sucht, braucht Geduld — und immer mehr Geld. Im Vergleich zum letzten Jahr verlangen Vermieter durchschnittlich acht Prozent mehr. Besonders kleine Wohnungen sind betroffen, weil viele Studierende und Berufspendler sie suchen. Die Stadt will deshalb neue Wohnungen bauen lassen.',
        'Salat statt Currywurst: Eine Ernährungsberaterin erklärt in unserem Interview, wie man auch mit wenig Zeit in der Mittagspause etwas Gesundes isst. Ihr wichtigster Tipp: Wer sein Essen am Abend vorher zu Hause vorbereitet, isst gesünder und spart außerdem Geld.'
      ],
      answers: [2, 3, 0, 5, 4]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Ein Café, in dem die Zeit zählt',
      text: `In vielen Cafés bezahlt man für Kaffee und Kuchen. Im „Stundencafé“ in Leipzig ist das anders: Hier bezahlen die Gäste für die Zeit, die sie bleiben — eine Stunde kostet fünf Euro. Getränke, Gebäck und Obst sind im Preis enthalten, ebenso das WLAN und die Spiele, die in den Regalen stehen.

Die Idee stammt ursprünglich aus Russland und funktioniert in Leipzig seit drei Jahren erstaunlich gut. „Am Anfang dachten viele, das sei nur etwas für Studenten“, erzählt die Besitzerin Karin Vogel. „Inzwischen kommen auch Geschäftsleute, die hier in Ruhe arbeiten, und Familien, die am Sonntag zusammen spielen wollen.“ Am Nachmittag sind oft alle achtzig Plätze besetzt, deshalb kann man online einen Tisch reservieren.

Besonders beliebt ist das Café bei Menschen, die viel unterwegs arbeiten. Anna Berger zum Beispiel, die als Übersetzerin arbeitet, kommt fast jeden Tag: „Zu Hause lenkt mich alles ab. Hier habe ich schnelles Internet, so viel Tee, wie ich möchte, und nette Leute um mich herum. Das ist billiger als ein eigenes Büro.“

Frau Vogel plant schon den nächsten Schritt: Im Herbst will sie einen zweiten Raum eröffnen, in dem es ganz still sein soll — ohne Musik und ohne Gespräche. „Viele Gäste wünschen sich einen Ort zum konzentrierten Arbeiten. Den sollen sie bei uns bekommen.“`,
      questions: [
        {
          frage: 'Im „Stundencafé“ bezahlen die Gäste …',
          options: [
            'für jedes Getränk einzeln.',
            'dafür, wie lange sie bleiben.',
            'nur für das WLAN und die Spiele.'
          ],
          answer: 1
        },
        {
          frage: 'Die Idee für das Café …',
          options: [
            'hatte Karin Vogel schon als Studentin.',
            'gibt es nur in Deutschland.',
            'kommt aus einem anderen Land.'
          ],
          answer: 2
        },
        {
          frage: 'Wer kommt heute ins Café?',
          options: [
            'Nur Studenten und Schüler.',
            'Ganz unterschiedliche Gäste.',
            'Vor allem Touristen aus Russland.'
          ],
          answer: 1
        },
        {
          frage: 'Anna Berger kommt fast täglich, weil sie …',
          options: [
            'hier besser arbeiten kann als zu Hause.',
            'im Café als Kellnerin arbeitet.',
            'die Besitzerin gut kennt.'
          ],
          answer: 0
        },
        {
          frage: 'Im Herbst soll es im Café …',
          options: [
            'zum ersten Mal Musik geben.',
            'einen ruhigen Raum zum Arbeiten geben.',
            'achtzig neue Plätze geben.'
          ],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Ihre Freundin möchte nach der Elternzeit wieder halbtags arbeiten, am liebsten im Büro.',
        'Sie möchten am Wochenende mit zwei Kindern etwas unternehmen, ohne viel Geld auszugeben.',
        'Ihr Nachbar sucht jemanden, der seine Katze füttert, wenn er im Urlaub ist.',
        'Sie ziehen um und brauchen günstig gebrauchte Möbel.',
        'Ein Kollege möchte abends Deutsch üben, hat aber wenig Geld für einen Kurs.',
        'Sie suchen für Ihre Tochter (10) ein sportliches Hobby im Verein.',
        'Ihr Fahrrad ist kaputt, und Sie brauchen es nächste Woche wieder.',
        'Sie möchten alte Kinderkleidung verkaufen, statt sie wegzuwerfen.',
        'Ihre Eltern besuchen Sie und brauchen für drei Nächte eine günstige Unterkunft.',
        'Sie möchten lernen, einfache Gerichte selbst zu kochen.'
      ],
      ads: [
        'Fahrrad-Schmidt: Reparaturen aller Marken, meist innerhalb von 48 Stunden. Kostenloser Kostenvoranschlag!',
        'Pension Lindenhof: Ruhige Zimmer mit Frühstück ab 39 € pro Nacht, zentral gelegen, keine Mindestaufenthalte.',
        'SV Grünstadt: Handball, Turnen und Leichtathletik für Kinder ab 8 Jahren. Erste Schnupperstunde gratis!',
        'Möbelbörse im Gewerbehof: Gut erhaltene Sofas, Schränke und Tische aus zweiter Hand — täglich neue Ware.',
        'Sprachcafé International: Jeden Dienstag ab 19 Uhr Deutsch sprechen bei Tee und Keksen. Teilnahme kostenlos!',
        'Büroservice Weber sucht Verstärkung: Teilzeitstelle (vormittags) am Empfang, gern Wiedereinsteigerinnen.',
        'Familienfest im Stadtpark am Samstag und Sonntag: Spiele, Musik und Mitmach-Zirkus — Eintritt frei!',
        'Kochschule Paprika: Grundkurs „Schnelle Alltagsküche“ an vier Abenden, alle Zutaten inklusive.',
        'Flohmarkt am Hafen sucht Verkäufer: Stand ab 10 €, besonders Kindersachen sind gefragt!',
        'Tierpension Wuff & Miau: Wir betreuen Hund und Katze bei uns — Tag und Nacht, auch am Wochenende.',
        'Haussitter-Börse: Zuverlässige Nachbarschaftshilfe — wir gießen Blumen und versorgen Haustiere bei Ihnen zu Hause.',
        'Autohaus Krüger: Große Auswahl an Gebrauchtwagen mit Garantie, Finanzierung ohne Anzahlung möglich.'
      ],
      answers: [5, 6, 10, 3, 4, 2, 0, 8, 1, 7]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Liebe Frau Sommer,

vielen Dank für Ihre E-Mail. Ich freue mich sehr, [1] Sie mich nach dem Kurs gefragt haben. Seit zwei Monaten arbeite ich bei einer Firma, [2] Büromöbel verkauft. Die Arbeit gefällt [3] gut, aber mein Chef sagt, ich soll noch besser Deutsch lernen, [4] ich oft mit Kunden telefonieren muss.

Deshalb habe ich mich [5] einen Abendkurs an der Volkshochschule angemeldet. Der Kurs beginnt [6] 3. September und findet zweimal [7] Woche statt. Ich hoffe, dass ich danach weniger Fehler [8] als heute.

Können Sie mir vielleicht ein gutes Wörterbuch [9]? Ich möchte auch zu Hause üben. Ich würde mich sehr über eine Antwort freuen und wünsche [10] einen schönen Sommer!

Herzliche Grüße
Amir Hassan`,
      gaps: [
        { options: ['dass', 'ob', 'weil'], answer: 0 },
        { options: ['der', 'die', 'das'], answer: 1 },
        { options: ['mich', 'mir', 'ich'], answer: 1 },
        { options: ['denn', 'weil', 'deshalb'], answer: 1 },
        { options: ['für', 'auf', 'über'], answer: 0 },
        { options: ['im', 'am', 'um'], answer: 1 },
        { options: ['pro', 'jeden', 'alle'], answer: 0 },
        { options: ['machte', 'gemacht', 'mache'], answer: 2 },
        { options: ['empfehlen', 'empfiehlt', 'empfohlen'], answer: 0 },
        { options: ['Sie', 'Ihnen', 'Ihr'], answer: 1 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

ich habe Ihre [1] für die Wohnung in der Gartenstraße 12 gelesen und bin sehr [2] an der Wohnung interessiert. Ich arbeite seit fünf Jahren als Krankenpfleger im Stadtkrankenhaus und suche eine Wohnung in der [3], weil ich oft Nachtdienst habe.

Zurzeit wohne ich noch in Bergdorf und fahre jeden Tag fast eine Stunde mit dem Auto. Das kostet viel Zeit und [4]. Die Wohnung wäre für mich also ideal.

Ich hätte noch zwei [5]: Gehören Keller und Stellplatz zur Wohnung? Und wäre es [6], die Wohnung schon am Wochenende zu besichtigen? Ich bin flexibel und kann [7] auch abends vorbeikommen.

Meine letzte Vermieterin kann Ihnen gern [8], dass ich die Miete immer pünktlich gezahlt habe. Ihre Telefonnummer schicke ich Ihnen auf [9] gern zu.

Ich freue mich auf Ihre Antwort und [10] mich für Ihre Mühe.

Mit freundlichen Grüßen
Jonas Weber`,
      wordBank: [
        'Anzeige',
        'bedanke',
        'bestätigen',
        'Fragen',
        'Geld',
        'gerne',
        'melde',
        'möglich',
        'Nähe',
        'natürlich',
        'Termin',
        'Umgebung',
        'verspreche',
        'Wunsch',
        'zwar'
      ],
      answers: [0, 14, 8, 4, 3, 7, 9, 2, 13, 1]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Der Anrufer möchte den Termin auf einen anderen Tag verschieben.',
          answer: true,
          audio:
            'Guten Tag, Frau Doktor Klein, hier ist Peter Maier. Ich habe morgen um zehn Uhr einen Termin bei Ihnen, aber leider muss ich kurzfristig zu einer Besprechung nach Frankfurt. Wäre es möglich, den Termin auf Donnerstag oder Freitag zu verschieben? Sie erreichen mich den ganzen Tag auf dem Handy. Vielen Dank und auf Wiederhören!'
        },
        {
          statement: 'Das Schwimmbad ist am Montag wegen einer Reparatur geschlossen.',
          answer: true,
          audio:
            'Liebe Badegäste, bitte beachten Sie: Am kommenden Montag bleibt das Hallenbad ganztägig geschlossen. Der Grund ist eine dringende Reparatur an der Wasserheizung. Ab Dienstag sind wir wieder wie gewohnt von sechs bis zweiundzwanzig Uhr für Sie da. Wir bitten um Ihr Verständnis.'
        },
        {
          statement: 'Die Wetterlage bleibt am Nachmittag sonnig und trocken.',
          answer: false,
          audio:
            'Und nun das Wetter: Am Vormittag ist es noch freundlich und meist sonnig bei angenehmen zwanzig Grad. Am Nachmittag ziehen jedoch von Westen dichte Wolken auf, und es muss mit kräftigen Schauern und Gewittern gerechnet werden. Nehmen Sie also besser einen Regenschirm mit!'
        },
        {
          statement: 'Kunden mit einer Kundenkarte bekommen heute auf alles zwanzig Prozent Rabatt.',
          answer: false,
          audio:
            'Sehr geehrte Kundinnen und Kunden, herzlich willkommen! Heute lohnt sich Ihr Einkauf besonders: In unserer Sportabteilung im ersten Stock erhalten Sie zwanzig Prozent Rabatt auf alle Laufschuhe. Mit der Kundenkarte sparen Sie außerdem zehn Prozent auf Textilien. Wir wünschen Ihnen viel Spaß beim Einkaufen!'
        },
        {
          statement: 'Die Anruferin sagt die Verabredung am Samstag ab.',
          answer: true,
          audio:
            'Hallo Miriam, hier ist Sandra. Du, wegen Samstag: Es tut mir wahnsinnig leid, aber ich kann doch nicht mit ins Kino kommen. Meine Schwester hat sich das Bein gebrochen, und ich muss auf ihre Kinder aufpassen. Können wir nächste Woche etwas ausmachen? Melde dich, ja? Tschüss!'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderatorin',
          text: 'Willkommen bei „Stadtgespräch“! Mein Gast ist heute Tim Berger. Herr Berger, Sie haben vor vier Jahren ein Repair-Café gegründet. Was genau ist das?'
        },
        {
          speaker: 'Tim Berger',
          text: 'Ein Repair-Café ist ein Treffpunkt, an dem Menschen ihre kaputten Sachen gemeinsam mit Ehrenamtlichen reparieren — Toaster, Lampen, Fahrräder, manchmal sogar Spielzeug. Wir treffen uns einmal im Monat im Gemeindehaus.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Und wie sind Sie auf die Idee gekommen?'
        },
        {
          speaker: 'Tim Berger',
          text: 'Ganz einfach: Mein Wasserkocher war kaputt, und der Händler sagte, eine Reparatur lohne sich nicht, ich solle einen neuen kaufen. Das hat mich geärgert. Ich bin gelernter Elektriker, also habe ich ihn selbst repariert — in zwanzig Minuten.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Wer kommt zu Ihren Treffen?'
        },
        {
          speaker: 'Tim Berger',
          text: 'Alle Altersgruppen! Am Anfang kamen vor allem ältere Leute aus dem Viertel. Heute kommen auch viele junge Familien und Studenten. Beim letzten Treffen hatten wir über sechzig Besucher — so viele wie noch nie.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Muss man für die Reparatur etwas bezahlen?'
        },
        {
          speaker: 'Tim Berger',
          text: 'Nein, die Hilfe ist kostenlos. Wer möchte, kann etwas spenden — davon kaufen wir Werkzeug und Ersatzteile. Nur wenn ein besonderes Ersatzteil bestellt werden muss, bezahlt das der Besitzer selbst.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Gelingt denn jede Reparatur?'
        },
        {
          speaker: 'Tim Berger',
          text: 'Leider nein. Ungefähr zwei von drei Geräten können wir retten. Aber auch wenn es nicht klappt, haben die Leute etwas gelernt — zum Beispiel, worauf man beim nächsten Kauf achten sollte.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Was wünschen Sie sich für die Zukunft?'
        },
        {
          speaker: 'Tim Berger',
          text: 'Wir suchen dringend weitere Helferinnen und Helfer, vor allem für Näharbeiten. Und ich wünsche mir größere Räume, denn im Gemeindehaus wird es langsam zu eng. Mit der Stadt sind wir schon im Gespräch.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Herr Berger, vielen Dank für das Gespräch!'
        }
      ],
      statements: [
        { statement: 'Das Repair-Café trifft sich jede Woche.', answer: false },
        { statement: 'Im Repair-Café werden nur elektrische Geräte repariert.', answer: false },
        {
          statement: 'Herr Berger hatte die Idee, weil er seinen Wasserkocher nicht neu kaufen wollte.',
          answer: true
        },
        { statement: 'Herr Berger hat einen technischen Beruf gelernt.', answer: true },
        { statement: 'Zu den Treffen kommen heute nur ältere Menschen.', answer: false },
        { statement: 'Beim letzten Treffen waren mehr Besucher da als je zuvor.', answer: true },
        { statement: 'Jeder Besucher muss einen festen Betrag bezahlen.', answer: false },
        { statement: 'Besondere Ersatzteile müssen die Besitzer selbst bezahlen.', answer: true },
        { statement: 'Alle Geräte können im Repair-Café repariert werden.', answer: false },
        { statement: 'Das Repair-Café sucht neue Räume, weil der Platz knapp wird.', answer: true }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf Durchsagen. Sie hören jede Durchsage einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Der Zug nach München fährt heute von einem anderen Gleis ab.',
          answer: true,
          audio:
            'Achtung an Gleis sieben: Der Intercity nach München, planmäßige Abfahrt vierzehn Uhr zwölf, fährt heute von Gleis elf ab. Ich wiederhole: Der Intercity nach München fährt heute von Gleis elf. Bitte begeben Sie sich zu Gleis elf.'
        },
        {
          statement: 'Die Fahrgäste sollen wegen einer Baustelle früher aussteigen.',
          answer: false,
          audio:
            'Liebe Fahrgäste, wegen eines Unfalls an der Kreuzung Marktplatz endet diese Straßenbahn ausnahmsweise an der Haltestelle Rathaus. Von dort fahren Ersatzbusse in Richtung Hauptbahnhof. Wir entschuldigen uns für die Unannehmlichkeiten.'
        },
        {
          statement: 'Ein Kind wartet an der Information auf seine Eltern.',
          answer: true,
          audio:
            'Werte Kundinnen und Kunden, eine wichtige Durchsage: Der kleine Lukas, vier Jahre alt, blaue Jacke, sucht seine Eltern. Er wartet an der Information im Erdgeschoss. Seine Eltern werden gebeten, ihn dort abzuholen. Vielen Dank.'
        },
        {
          statement: 'Der Flug nach Wien startet pünktlich.',
          answer: false,
          audio:
            'Meine Damen und Herren, Ihre Aufmerksamkeit bitte. Der Flug LH 4 5 2 nach Wien verspätet sich wegen des starken Nebels um voraussichtlich neunzig Minuten. Das Boarding beginnt jetzt erst um siebzehn Uhr vierzig am Ausgang B zwölf. Wir bitten um Ihr Verständnis.'
        },
        {
          statement: 'Das Konzert im Stadtpark findet trotz des Wetters statt.',
          answer: true,
          audio:
            'Liebe Besucherinnen und Besucher des Sommerfestes, gute Nachrichten: Das Open-Air-Konzert heute Abend im Stadtpark findet trotz des angekündigten Regens statt. Die Bühne ist überdacht, und für die Zuschauer stehen Zelte bereit. Beginn ist wie geplant um zwanzig Uhr.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Antworten Sie auf den Brief. Schreiben Sie zu mindestens drei der vier Leitpunkte — zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht.',
    tasks: [
      {
        titel: 'Antwort an die Sprachschule',
        situation:
          'Sie haben vor einem Monat einen Deutschkurs an der Sprachschule „Lingua“ besucht. Heute bekommen Sie eine E-Mail von der Kursleiterin.',
        incoming: {
          von: 'k.brandt@lingua-sprachschule.de',
          betreff: 'Ihr Kurs bei uns — Ihre Meinung ist gefragt!',
          text: `Liebe Teilnehmerin, lieber Teilnehmer,

vor vier Wochen ist Ihr Intensivkurs B1 bei uns zu Ende gegangen. Wir möchten unsere Kurse verbessern und bitten Sie deshalb um Ihre Rückmeldung.

Wie zufrieden waren Sie mit dem Unterricht und mit den Lehrmaterialien? Gab es etwas, das Ihnen nicht gefallen hat? Außerdem planen wir ab Oktober einen Konversationskurs am Abend — hätten Sie daran Interesse?

Ich freue mich auf Ihre Antwort!

Mit freundlichen Grüßen
Katrin Brandt`
        },
        leitpunkte: [
          'Bedanken Sie sich für die E-Mail.',
          'Schreiben Sie Ihre Meinung zum Kurs (Unterricht, Materialien).',
          'Machen Sie einen Verbesserungsvorschlag.',
          'Sagen Sie, ob Sie am Konversationskurs Interesse haben, und begründen Sie das.'
        ],
        musterloesung: `Sehr geehrte Frau Brandt,

vielen Dank für Ihre E-Mail und dafür, dass Sie nach meiner Meinung fragen.

Mit dem Kurs war ich insgesamt sehr zufrieden. Der Unterricht war lebendig, und wir haben viel gesprochen, was mir besonders geholfen hat. Das Lehrbuch fand ich dagegen etwas langweilig, weil die Themen oft sehr alt waren.

Ich hätte einen Vorschlag: Es wäre schön, wenn wir im Kurs öfter mit aktuellen Zeitungstexten arbeiten könnten. So lernt man Wörter, die man wirklich braucht.

Am Konversationskurs im Oktober habe ich großes Interesse, weil ich im Beruf mehr Deutsch sprechen möchte. Könnten Sie mir bitte mitteilen, an welchen Tagen der Kurs stattfindet und was er kostet?

Ich freue mich auf Ihre Antwort.

Mit freundlichen Grüßen
Amir Hassan`
      }
    ],
    tipps:
      'Alle Leitpunkte kurz abhaken, bevor Sie abgeben: Anrede und Gruß? Mindestens drei Punkte behandelt? Verben an der richtigen Position? Sie/Ihnen großgeschrieben?'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Kontaktaufnahme',
      anweisung:
        'Sprechen Sie mit Ihrer Partnerin / Ihrem Partner. Lernen Sie sich kennen. Die folgenden Punkte helfen Ihnen.',
      punkte: ['Name', 'Wohnort und Wohnung', 'Familie', 'Beruf oder Ausbildung', 'Sprachen', 'Freizeit'],
      redemittel: [
        'Darf ich Sie etwas fragen? Woher kommen Sie?',
        'Ich wohne seit … in … Und Sie?',
        'Was sind Sie von Beruf? / Was machen Sie beruflich?',
        'Ich habe … Kinder. / Ich bin ledig / verheiratet.',
        'In meiner Freizeit … ich gern …',
        'Das ist ja interessant! Erzählen Sie mehr davon.'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Gespräch über ein Thema',
      anweisung:
        'Sie haben in einer Zeitschrift gelesen: „Immer mehr Menschen arbeiten von zu Hause aus.“ Berichten Sie: Wie ist das in Ihrem Land oder in Ihrem Beruf? Sagen Sie Ihre Meinung: Welche Vorteile und Nachteile hat das Arbeiten zu Hause?',
      punkte: [
        'Berichten Sie über eigene Erfahrungen mit Arbeit oder Lernen zu Hause.',
        'Wie ist die Situation in Ihrem Heimatland?',
        'Nennen Sie Vorteile UND Nachteile.',
        'Fragen Sie auch Ihre Partnerin / Ihren Partner nach ihrer/seiner Meinung.'
      ],
      redemittel: [
        'Ich habe gelesen, dass …',
        'Bei uns in … ist das so: …',
        'Meiner Meinung nach ist der größte Vorteil, dass …',
        'Ein Nachteil könnte sein, dass …',
        'Wie sehen Sie das? / Was meinen Sie dazu?',
        'Da stimme ich Ihnen zu. / Das sehe ich ein bisschen anders, weil …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Eine Kollegin verlässt Ihre Firma und zieht in eine andere Stadt. Sie möchten mit den Kolleginnen und Kollegen eine kleine Abschiedsfeier organisieren. Planen Sie die Feier gemeinsam.',
      punkte: [
        'Wann und wo soll die Feier stattfinden?',
        'Wer wird eingeladen?',
        'Essen und Getränke — wer bringt was mit?',
        'Welches Geschenk kaufen Sie, und wie viel darf es kosten?'
      ],
      redemittel: [
        'Wollen wir die Feier am … machen?',
        'Wie wäre es mit …? / Ich schlage vor, dass …',
        'Das ist eine gute Idee! / Einverstanden!',
        'Vielleicht lieber …, weil …',
        'Wer kümmert sich um …? — Das kann ich übernehmen.',
        'Gut, dann machen wir das so!'
      ]
    }
  }
} as const satisfies TelcExam;

export default exam;
