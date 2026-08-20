import { type DualLevelExam } from '@shared/types';

const exam = {
  id: 12,
  title: "Modelltest 12",
  difficulty: "b1",
  level: "B1 · Ziel",
  theme: "Digitaler Alltag & Technik",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Ihr Laptop ist kaputt, und Sie brauchen ihn schnell wieder für die Arbeit.",
        "Ihre Großmutter möchte lernen, wie man mit dem Smartphone Nachrichten schreibt.",
        "Sie möchten ein gebrauchtes Fahrrad kaufen und suchen Angebote in Ihrer Nähe.",
        "Sie möchten zu Hause schnelleres Internet und suchen einen neuen Anbieter.",
        "Sie haben viele Fotos auf dem Handy und möchten daraus ein Fotobuch machen lassen."
      ],
      ads: [
        "Zweirad Krause: Fahrradwerkstatt und Reparatur – wir machen Ihr altes Rad wieder fit! Inspektion ab 39 Euro, Bahnhofstraße 3.",
        "PC-Klinik Meyer: Laptop- und Computerreparatur mit Express-Service innerhalb von 24 Stunden. Kostenlose Diagnose! Mo–Fr 9–18 Uhr.",
        "Volkshochschule: Smartphone-Kurs für Seniorinnen und Senioren – Schritt für Schritt in kleinen Gruppen. Nachrichten schreiben, Fotos verschicken, Videotelefonie. Start: 5. Oktober.",
        "Blitznet: Highspeed-Internet für Ihr Zuhause – bis zu 500 Mbit, in den ersten sechs Monaten zum halben Preis. Jetzt Verfügbarkeit an Ihrer Adresse prüfen!",
        "Medienwerkstatt für Kids: Programmieren lernen für Kinder von 8 bis 12 Jahren, jeden Samstagvormittag. Spielerisch, kreativ, mit Abschlussprojekt!",
        "regio-flohmarkt.de: Kaufen und verkaufen in Ihrer Nachbarschaft – Möbel, Fahrräder, Elektronik. Kostenlos inserieren, direkt beim Verkäufer abholen!",
        "Handy-Paradies: Die neuesten Smartphones aller Marken, mit und ohne Vertrag. Große Auswahl, faire Beratung – mitten in der Fußgängerzone!",
        "fotomomente.de: Aus Ihren Handyfotos wird ein hochwertiges Fotobuch – App herunterladen, Fotos auswählen, bestellen. Lieferung in fünf Tagen, ab 19,90 Euro."
      ],
      answers: [1, 2, 5, 3, 7]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Sicher unterwegs im Internet – Tipps der Verbraucherzentrale",
          text: "Gefälschte E-Mails werden immer professioneller: Sie sehen aus wie Nachrichten Ihrer Bank und fordern Sie auf, Ihre Zugangsdaten einzugeben. Merken Sie sich: Keine Bank fragt jemals per E-Mail nach Ihrem Passwort. Antworten Sie nicht, klicken Sie keinen Link an und kontaktieren Sie im Zweifel Ihre Bank direkt. Wichtig ist auch der Umgang mit Passwörtern: Verwenden Sie für jedes Konto ein anderes, ein Passwort-Manager hilft beim Merken. Installieren Sie Updates immer sofort, denn sie schließen Sicherheitslücken. Und wenn doch etwas passiert ist? Dann informieren Sie sofort Ihre Bank und erstatten Sie Anzeige bei der Polizei – auch online möglich."
        },
        {
          titel: "Die Stadt wird digital: das neue Bürgerportal",
          text: "Ummelden nach dem Umzug, das Auto anmelden oder einen Bewohnerparkausweis beantragen – vieles davon geht in unserer Stadt jetzt online über das neue Bürgerportal. Nötig ist einmalig ein Benutzerkonto; die Anmeldung funktioniert mit der Online-Funktion des Personalausweises. Benötigte Dokumente laden Sie einfach als Foto hoch, Gebühren bezahlen Sie direkt per Karte. Wer kein Internet hat, muss sich keine Sorgen machen: Das Bürgerbüro im Rathaus bleibt geöffnet, ein Termin sollte aber vorher telefonisch vereinbart werden. In den ersten drei Monaten haben bereits über 8.000 Bürgerinnen und Bürger das Portal genutzt."
        }
      ],
      questions: [
        { textIndex: 0, frage: "Was soll man bei einer verdächtigen E-Mail der Bank tun?", options: ["Das Passwort zur Kontrolle eingeben.", "Nicht antworten und die Bank direkt kontaktieren.", "Die E-Mail an Freunde weiterleiten."], answer: 1 },
        { textIndex: 0, frage: "Was empfiehlt der Text für Passwörter?", options: ["Für jedes Konto ein anderes Passwort.", "Ein kurzes Passwort für alle Konten.", "Das Passwort an die Bank schicken."], answer: 0 },
        { textIndex: 0, frage: "Was soll man tun, wenn man betrogen wurde?", options: ["Ein neues Handy kaufen.", "Nur das E-Mail-Konto löschen.", "Die Bank informieren und Anzeige erstatten."], answer: 2 },
        { textIndex: 1, frage: "Wie reicht man Dokumente im Bürgerportal ein?", options: ["Man lädt sie als Foto hoch.", "Man schickt sie per Post.", "Man gibt sie persönlich ab – anders geht es nicht."], answer: 0 },
        { textIndex: 1, frage: "Was gilt für Menschen ohne Internet?", options: ["Sie können nichts mehr erledigen.", "Sie können weiterhin ins Bürgerbüro kommen.", "Sie bekommen einen kostenlosen Computer."], answer: 1 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Hallo Papa, dein neues Tablet ist fertig eingerichtet! Dein Passwort liegt auf dem Küchentisch. Wenn etwas nicht funktioniert, ruf MICH an – und niemals eine Nummer, die dir das Internet anzeigt! Deine Tochter",
        "Liebe Kolleginnen und Kollegen, morgen wird zwischen 12 und 14 Uhr das WLAN im ganzen Gebäude gewartet. Bitte speichern Sie Ihre Arbeit rechtzeitig vorher. Die IT-Abteilung",
        "Hi Samira, ich habe die Konzertkarten online bestellt! Sie kommen als QR-Code aufs Handy, ich schicke dir deinen am Freitag weiter. Freu mich riesig!! Lisa",
        "Sehr geehrter Herr Nowak, Ihr reparierter Laptop liegt zur Abholung bereit. Die Reparatur kostet wie besprochen 89 Euro. Wir haben heute bis 18:30 Uhr geöffnet. Ihre PC-Klinik Meyer",
        "Hallo Oma, klappt unser Videoanruf am Sonntag um 16 Uhr? Du musst nur auf den grünen Knopf drücken, wenn es klingelt. Mama hilft dir bestimmt dabei. Wir freuen uns auf dich! Ben"
      ],
      headlines: [
        "Karten online gekauft",
        "Laptop kann abgeholt werden",
        "Hilfe: Passwort vergessen",
        "Verabredung zum Videoanruf",
        "Tablet ist fertig eingerichtet",
        "Internet fällt kurze Zeit aus",
        "Neuer Laptop gekauft",
        "Konzert fällt leider aus"
      ],
      answers: [4, 5, 0, 1, 3]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Ein Monat ohne Smartphone – ein Experiment",
      text: "Vier Wochen ohne Smartphone – für viele unvorstellbar. Familie Berger aus Kassel hat es ausprobiert: Die Eltern und ihre beiden Kinder (13 und 15) haben ihre Smartphones für einen Monat in eine Schublade gelegt. Die Idee kam von einem Projekt an der Schule der Kinder. Ganz ohne Telefon war die Familie allerdings nicht: Für Notfälle gab es das Festnetz und ein altes Handy ohne Internet.\n\nDie erste Woche war die schwerste. \"Mir war ständig langweilig, und ich wusste nie, wann der Bus fährt\", erzählt Tochter Merle. Doch dann veränderte sich etwas: Die Familie spielte abends wieder Gesellschaftsspiele, alle schliefen besser, und Merle traf ihre Freundinnen häufiger persönlich statt im Chat.\n\nFür Sohn Elias war das Experiment schwieriger. Seine Fußballmannschaft organisiert alles über eine Chatgruppe – Trainingszeiten, Fahrgemeinschaften, Absagen. \"Ich habe zweimal wichtige Infos verpasst und fühlte mich manchmal richtig ausgeschlossen\", sagt er.\n\nNach dem Monat bekam die Familie ihre Geräte zurück – aber der Alltag ist nicht mehr derselbe. Der Sonntag ist jetzt smartphonefrei, und beim Abendessen bleiben alle Geräte in der Küchenschublade. Mutter Sandra Berger zieht ein positives Fazit: \"Ich würde es sofort wieder machen.\" Elias sieht das anders: \"Einmal war okay. Aber nie wieder vier Wochen!\"",
      statements: [
        { text: "Die Familie hat vier Wochen ohne Smartphones gelebt.", answer: true },
        { text: "Während des Experiments hatte die Familie gar keine Telefone.", answer: false },
        { text: "Elias fühlte sich manchmal ausgeschlossen, weil seine Mannschaft alles über eine Chatgruppe organisiert.", answer: true },
        { text: "Nach dem Experiment benutzt die Familie die Smartphones genau wie vorher.", answer: false },
        { text: "Die Mutter würde das Experiment wiederholen.", answer: true }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Sehr geehrte Damen und Herren,\n\nseit zwei Wochen funktioniert mein Internet nur sehr langsam, [1] ich mich bereits zweimal bei Ihrer Hotline gemeldet habe. Der Techniker, [2] Besuch mir für Montag versprochen wurde, ist leider nicht gekommen. Ich arbeite von zu Hause und bin [3] eine stabile Verbindung angewiesen. Ich bitte Sie deshalb, den Fehler bis Ende der Woche [4] beheben. Andernfalls muss ich den Vertrag leider kündigen. Bitte teilen Sie mir mit, [5] der Techniker kommen kann. Am besten erreichen Sie mich [6] E-Mail.\n\nMit freundlichen Grüßen\nJulia Petrenko",
      gaps: [
        { options: ["obwohl", "weil", "damit"], answer: 0 },
        { options: ["deren", "dessen", "der"], answer: 1 },
        { options: ["für", "über", "auf"], answer: 2 },
        { options: ["zu", "für", "um"], answer: 0 },
        { options: ["ob", "wann", "als"], answer: 1 },
        { options: ["mit", "per", "bei"], answer: 1 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Liebe Mitglieder,\n\nab September bietet unser Verein jeden Mittwoch eine Handy-Sprechstunde an. Junge Freiwillige beantworten Ihre [1] rund um Smartphone und Tablet: WhatsApp einrichten, Fotos [2], Apps installieren und vieles mehr. Bringen Sie Ihr eigenes [3] mit, dann können wir alles direkt daran zeigen. Die Teilnahme ist kostenlos, eine [4] ist nicht nötig – kommen Sie einfach vorbei! Wichtig: Notieren Sie vorher Ihre Passwörter, [5] wir Ihnen schneller helfen können. Bei großem Interesse planen wir zusätzlich einen [6] am Samstagvormittag.\n\nIhr Seniorentreff Mitte",
      wordBank: ["Fragen", "Zeitung", "verschicken", "Gerät", "Anmeldung", "damit", "Kurs", "Antworten", "kaufen", "weil", "Brille", "Adresse"],
      answers: [0, 2, 3, 4, 5, 6]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Mein Drucker druckt schon wieder nicht!\"", options: ["Hast du schon versucht, ihn aus- und wieder einzuschalten?", "Ich lese lieber Bücher auf Papier.", "Der Drucker war ein Geschenk von meiner Firma."], answer: 0 },
        { prompt: "\"Kannst du mir kurz dein WLAN-Passwort geben?\"", options: ["Mein WLAN ist wirklich sehr schnell.", "Klar, es steht hinten auf dem Router.", "Ich habe mein Handy nicht dabei."], answer: 1 },
        { prompt: "\"Ich habe aus Versehen alle Urlaubsfotos gelöscht!\"", options: ["Du machst wirklich schöne Fotos.", "Wohin fährst du dieses Jahr in den Urlaub?", "Keine Panik – vielleicht sind sie noch im Papierkorb."], answer: 2 },
        { prompt: "\"Schickst du mir die Adresse per WhatsApp?\"", options: ["Mache ich, sobald ich zu Hause bin.", "Ich wohne schon sehr lange dort.", "WhatsApp benutze ich jeden Tag."], answer: 0 },
        { prompt: "\"Mein Akku ist gleich leer – hast du zufällig ein Ladekabel dabei?\"", options: ["Mein Handy ist noch ganz neu.", "Ja, hier – ich brauche es gerade nicht.", "Der Akku von meinem Laptop ist auch leer."], answer: 1 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Liebe Kundinnen und Kunden, unser Online-Shop wird heute Nacht von zweiundzwanzig bis zwei Uhr gewartet. In dieser Zeit sind Bestellungen leider nicht möglich. Ab zwei Uhr sind wir wieder wie gewohnt für Sie da.",
          statement: "Heute Nacht kann man einige Stunden lang nichts bestellen.",
          answer: true
        },
        {
          audio: "Hier spricht die Praxis Doktor Hansen. Ab dem ersten November können Sie Ihre Termine auch bequem über unsere neue Website buchen. Telefonisch erreichen Sie uns natürlich weiterhin, montags bis freitags von acht bis zwölf Uhr.",
          statement: "Termine kann man ab November nur noch online buchen.",
          answer: false
        },
        {
          audio: "Achtung, eine Durchsage für unsere Kundinnen und Kunden: Im Elektromarkt im ersten Stock beginnt in wenigen Minuten die Vorführung der neuen Fotodrohnen. Alle Interessierten sind herzlich eingeladen.",
          statement: "Die Vorführung findet im ersten Stock statt.",
          answer: true
        },
        {
          audio: "Guten Tag, hier ist die Stadtbibliothek. Ihr reserviertes Tablet aus der Technik-Ausleihe liegt ab morgen für Sie bereit. Bitte holen Sie es innerhalb von drei Tagen ab und bringen Sie Ihren Bibliotheksausweis mit.",
          statement: "Das Tablet muss innerhalb von einer Woche abgeholt werden.",
          answer: false
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Verbrauchertipp im Radio: Immer mehr Betrüger verschicken gefälschte SMS über angebliche Paketlieferungen. Klicken Sie auf keinen Fall auf den Link in der Nachricht, sondern löschen Sie die SMS sofort. Ihre Bank oder die Post fragt niemals per SMS nach Ihren Daten.",
          frage: "Was soll man mit einer verdächtigen Paket-SMS machen?",
          options: ["Auf den Link klicken.", "Sie sofort löschen.", "Sie an die Post weiterleiten."],
          answer: 1
        },
        {
          audio: "Und jetzt eine Information für alle Fahrgäste: Ab Dezember gibt es die Fahrkarten unserer Stadtwerke auch in der neuen App. Wer sein Ticket dort kauft, spart zehn Prozent gegenüber dem Automaten. Die App ist kostenlos für alle Smartphones erhältlich.",
          frage: "Was ist der Vorteil beim Ticketkauf in der App?",
          options: ["Man spart zehn Prozent.", "Man fährt kostenlos.", "Die Tickets gelten länger."],
          answer: 0
        },
        {
          audio: "Hinweis für unsere Fahrgäste: Im gesamten Hauptbahnhof steht Ihnen ab sofort kostenloses WLAN zur Verfügung. Wählen Sie einfach das Netz Bahnhof-Frei und bestätigen Sie die Nutzungsbedingungen. Eine Anmeldung mit E-Mail-Adresse ist nicht mehr nötig.",
          frage: "Was braucht man für das WLAN im Bahnhof?",
          options: ["Eine E-Mail-Adresse.", "Ein Passwort vom Kiosk.", "Nur die Bestätigung der Bedingungen."],
          answer: 2
        },
        {
          audio: "Radio-Servicezeit: Am Samstag veranstaltet das Umweltzentrum wieder einen Sammeltag für alte Handys. Die Geräte werden repariert oder recycelt, der Erlös geht an Umweltprojekte. Abgeben können Sie Ihre alten Handys zwischen neun und fünfzehn Uhr am Stand vor dem Rathaus.",
          frage: "Wo kann man die alten Handys abgeben?",
          options: ["Im Umweltzentrum.", "Am Stand vor dem Rathaus.", "Im Elektromarkt."],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Vater", text: "Kannst du mir helfen? Onkel Murat hat mir ein Foto geschickt, aber ich finde es nicht." },
            { speaker: "Tochter", text: "Zeig mal ... Du schaust im falschen Chat, Papa. Er hat es in die Familiengruppe geschickt, nicht dir persönlich." },
            { speaker: "Vater", text: "Ach so! Auf die Gruppe muss ich also tippen. Jetzt sehe ich es. Danke!" }
          ],
          statement: "Das Foto ist in der Familien-Chatgruppe.",
          answer: true
        },
        {
          audio: [
            { speaker: "Ozan", text: "Machst du deine Überweisungen eigentlich immer noch am Schalter in der Bank?" },
            { speaker: "Marie", text: "Nein, schon lange nicht mehr! Ich benutze die Banking-App, das dauert keine zwei Minuten." },
            { speaker: "Ozan", text: "Ist dir das nicht zu unsicher?" },
            { speaker: "Marie", text: "Eigentlich nicht. Ich öffne die App nur mit Fingerabdruck, und in öffentlichem WLAN mache ich grundsätzlich kein Banking." }
          ],
          statement: "Marie macht ihre Überweisungen nur noch am Schalter in der Bank.",
          answer: false
        },
        {
          audio: [
            { speaker: "Kunde", text: "Guten Tag, ich suche ein neues Handy. Am wichtigsten ist mir ein guter Akku." },
            { speaker: "Verkäuferin", text: "Da kann ich Ihnen dieses Modell empfehlen – der Akku hält zwei Tage. Es ist diese Woche im Angebot: 299 statt 349 Euro." },
            { speaker: "Kunde", text: "Das klingt gut. Dann nehme ich es." }
          ],
          statement: "Der Kunde bezahlt 349 Euro für das Handy.",
          answer: false
        },
        {
          audio: [
            { speaker: "Enkel", text: "So, Oma, die Video-App ist eingerichtet. Wenn es klingelt, drückst du einfach auf den grünen Knopf." },
            { speaker: "Oma", text: "Den grünen Knopf, gut. Und das klappt dann auch mit Kanada?" },
            { speaker: "Enkel", text: "Klar! Tante Ines ruft am Sonntag um achtzehn Uhr an, dann siehst du alle auf dem Bildschirm." },
            { speaker: "Oma", text: "Wie schön! Dann ziehe ich mir extra etwas Hübsches an." }
          ],
          statement: "Am Sonntag telefoniert die Oma per Video mit der Familie in Kanada.",
          answer: true
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderator", text: "Herzlich willkommen! Zu Gast ist heute Sandra Okafor, sie ist Medienpädagogin. Frau Okafor, was genau machen Sie beruflich?" },
        { speaker: "Sandra Okafor", text: "Ich besuche Schulen und spreche dort mit Kindern über Handys, Spiele und soziale Medien. Und abends bin ich oft bei Elternabenden – die Eltern haben meistens mehr Fragen als die Kinder!" },
        { speaker: "Moderator", text: "Worüber streiten Familien denn am häufigsten?" },
        { speaker: "Sandra Okafor", text: "Ganz klar über die Zeit für Computerspiele. Viele Eltern wollen einfach Verbote, aber das funktioniert selten." },
        { speaker: "Moderator", text: "Was empfehlen Sie stattdessen?" },
        { speaker: "Sandra Okafor", text: "Gemeinsame Regeln, die Eltern und Kinder zusammen aufschreiben – zum Beispiel: keine Handys beim Essen, und das gilt dann für alle. Wenn Kinder mitentscheiden dürfen, halten sie sich viel eher daran." },
        { speaker: "Moderator", text: "Gibt es etwas, das Sie bei Ihrer Arbeit überrascht hat?" },
        { speaker: "Sandra Okafor", text: "Ja – wie stark Kinder das Verhalten ihrer Eltern kopieren. Wenn Mama und Papa ständig aufs Handy schauen, kann man vom Kind nichts anderes erwarten. Das eigene Vorbild ist viel wichtiger, als die meisten denken." }
      ],
      questions: [
        { frage: "Wo arbeitet Frau Okafor unter anderem?", options: ["In Schulen.", "In einem Handy-Geschäft.", "Bei einer Spielefirma."], answer: 0 },
        { frage: "Worüber streiten Familien am häufigsten?", options: ["Über das Essen.", "Über die Zeit für Computerspiele.", "Über die Hausaufgaben."], answer: 1 },
        { frage: "Was empfiehlt Frau Okafor den Familien?", options: ["Ein Verbot von allen Spielen.", "Ein eigenes Handy ab sechs Jahren.", "Gemeinsame Regeln für alle."], answer: 2 },
        { frage: "Was hat Frau Okafor bei ihrer Arbeit überrascht?", options: ["Wie wichtig das Vorbild der Eltern ist.", "Wie teuer Smartphones geworden sind.", "Wie wenig Kinder am Handy spielen."], answer: 0 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Guten Tag, Herr Yildiz, hier ist die PC-Klinik, mein Name ist Frau Sommer. Gute Nachrichten: Ihr Laptop ist fertig! Es war nur die Festplatte, die Reparatur kostet fünfundsiebzig Euro – also weniger als gedacht. Sie können das Gerät ab Mittwoch abholen, wir haben bis achtzehn Uhr dreißig geöffnet. Bitte bringen Sie unbedingt Ihren Abholschein mit, ohne den dürfen wir den Laptop nicht herausgeben. Und noch ein Tipp: Machen Sie in Zukunft regelmäßig eine Sicherungskopie Ihrer Daten. Bei Fragen erreichen Sie uns unter null vier null, zwei acht neun sechs. Auf Wiederhören!",
      noteTitle: "Notiz: Anruf von der PC-Klinik",
      gaps: [
        { label: "Es ruft an: Frau ____", answer: "Sommer", alt: [] },
        { label: "Reparatur kostet: ____ Euro", answer: "75", alt: ["fünfundsiebzig", "75€"] },
        { label: "Laptop abholen ab: ____", answer: "Mittwoch", alt: ["mittwoch"] },
        { label: "Unbedingt mitbringen: ____", answer: "Abholschein", alt: ["den Abholschein"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihre Freundin Nadia möchte einen Laptop kaufen und bittet Sie um Rat.",
    incomingEmail: {
      von: "nadia.rahimi@mail.de",
      betreff: "Brauche deinen Rat!",
      text: "Hallo!\n\ndu kennst dich doch so gut mit Computern aus! Ich möchte mir einen Laptop für meinen Deutschkurs kaufen, aber ich weiß nicht, welchen. Worauf muss ich achten? Und wo soll ich ihn kaufen – online oder im Geschäft? Vielleicht hast du ja Zeit und kommst einfach mit?\n\nViele Grüße\nNadia"
    },
    points: [
      "Geben Sie Nadia einen Tipp, worauf sie beim Laptop achten soll.",
      "Empfehlen Sie: online kaufen oder im Geschäft? Begründen Sie kurz.",
      "Antworten Sie auf die Frage, ob Sie mitkommen, und machen Sie einen Terminvorschlag."
    ],
    musterloesung: "Hallo Nadia,\n\nschön, dass du fragst! Für den Kurs brauchst du keinen teuren Laptop – wichtig sind ein Akku mit langer Laufzeit und eine gute Tastatur. Ich würde ihn im Geschäft kaufen, weil man dort alles ausprobieren kann. Natürlich komme ich mit! Passt es dir am Samstag um 11 Uhr? Dann gehen wir zusammen in die Stadt.\n\nViele Grüße",
    tipps: "Cover the three points in order and show B1 range: a recommendation with \"Ich würde ...\", a reason with \"weil\", and a concrete suggestion with a time."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Ich heiße ... und bin ... Jahre alt.",
        "Ursprünglich komme ich aus ..., seit ... lebe ich in ...",
        "Ich wohne zusammen mit ...",
        "Von Beruf bin ich ... / Im Moment arbeite ich als ...",
        "Ich spreche ..., ... und natürlich Deutsch.",
        "In meiner Freizeit bin ich viel am Computer / draußen ...",
        "Am Wochenende ... ich am liebsten ..."
      ]
    },
    teil2: {
      thema: "Handy, Internet und Medien",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Wie oft und wofür benutzen Sie Ihr Handy am Tag?",
        "Was machen Sie am liebsten im Internet?",
        "Gibt es bei Ihnen Regeln für die Handynutzung, zum Beispiel beim Essen?",
        "Was finden Sie am Internet gut – und was eher schlecht?"
      ],
      redemittel: [
        "Ich benutze mein Handy vor allem für ...",
        "Am liebsten schaue / lese / höre ich ...",
        "Bei uns gilt die Regel, dass ...",
        "Einerseits finde ich das Internet praktisch, andererseits ...",
        "Und wie ist das bei dir?"
      ]
    },
    teil3: {
      aufgabe: "Ihre Freundin Elena hat zum Geburtstag Geld bekommen und möchte sich ein neues Handy kaufen. Planen Sie den Kauf zusammen.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Neues Handy oder gebrauchtes?", "Wo kaufen – online oder im Geschäft?", "Wie viel darf es kosten?", "Wann gehen Sie zusammen einkaufen?"],
      redemittel: [
        "Ich schlage vor, dass wir zuerst ...",
        "Wie wäre es, wenn wir ...?",
        "Da bin ich anderer Meinung, weil ...",
        "Das ist ein guter Kompromiss!",
        "Also gut, dann machen wir es so."
      ]
    }
  }
} as const satisfies DualLevelExam;

export default exam;
