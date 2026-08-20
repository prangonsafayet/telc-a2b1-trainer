import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 2,
  level: 'b2',
  title: 'Modelltest 2',
  theme: 'Digitalisierung & Medien',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Streamingdienste erhöhen erneut die Preise',
        'Digitale Verwaltung: Behördengänge künftig komplett online möglich',
        'Studie: Jugendliche verbringen täglich über vier Stunden am Smartphone',
        'Cyberangriff legt Stadtverwaltung tagelang lahm',
        'Zeitungssterben: Immer mehr Lokalredaktionen geben auf',
        'Künstliche Intelligenz im Verlag: Wenn der Computer Artikel schreibt',
        'Nie zu alt fürs Netz: Computerkurse für Senioren ausgebucht',
        'Neues Gesetz: Härtere Strafen für Hetze im Internet',
        'Datenschützer warnen vor smarten Haushaltsgeräten',
        'Digitalpakt gescheitert? Schulen warten weiter auf Technik'
      ],
      texts: [
        'Seit vergangenem Donnerstag geht im Rathaus von Werdenfeld fast nichts mehr: Unbekannte hatten sich Zugang zum Computersystem der Verwaltung verschafft und sämtliche Daten verschlüsselt. Weder Ausweise noch Fahrzeuge können derzeit angemeldet werden, die Beschäftigten greifen notgedrungen zu Papier und Stift. Die Täter fordern ein hohes Lösegeld, doch die Stadt lehnt jede Zahlung ab. Fachleute rechnen damit, dass die Systeme frühestens in zwei Wochen wieder vollständig funktionieren.',
        'Dass das Internet nur etwas für junge Leute sei, kann Herta Vogel nicht bestätigen. Die 78-Jährige besucht seit Oktober einen Kurs der Volkshochschule, in dem Menschen über 65 den Umgang mit Tablet und Smartphone lernen — vom Videoanruf mit den Enkeln bis zum Online-Banking. Die Nachfrage ist enorm: Sämtliche Kurse des kommenden Semesters sind bereits belegt, und die Warteliste wächst von Woche zu Woche.',
        'Erst traf es das Wochenblatt in Grevenstein, nun stellt auch der traditionsreiche „Bote am Sonntag“ sein Erscheinen ein. Sinkende Anzeigenerlöse und schwindende Abonnentenzahlen machen kleinen Zeitungen zunehmend zu schaffen, denn viele Leser informieren sich lieber kostenlos im Netz. Medienforscher warnen vor den Folgen: Wo niemand mehr aus dem Gemeinderat berichtet, fehlt die demokratische Kontrolle vor Ort.',
        'Der Kühlschrank bestellt Milch nach, der Staubsauger kennt den Grundriss der Wohnung, und der Lautsprecher hört aufs Wort: Vernetzte Haushaltsgeräte versprechen Komfort. Verbraucherschützer haben nun untersucht, welche Informationen die Geräte an die Hersteller übermitteln — mit beunruhigendem Ergebnis. Viele Apparate senden weit mehr Daten als nötig, teils sogar Tonaufnahmen. Die Fachleute raten, vor dem Kauf die Datenschutzbestimmungen genau zu prüfen.',
        'Wer einen neuen Reisepass braucht oder sein Gewerbe anmelden will, soll dafür künftig nicht mehr aufs Amt müssen: Nach einem gestern verabschiedeten Gesetz müssen Bund und Länder ihre wichtigsten Verwaltungsleistungen innerhalb von drei Jahren vollständig ins Internet bringen. Bürgerinnen und Bürger sollen Anträge dann rund um die Uhr von zu Hause stellen können. Die Kommunen fordern allerdings deutlich mehr Geld für die Umsetzung.'
      ],
      answers: [3, 6, 4, 8, 1]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Vier Wochen offline — ein Selbstversuch',
      text: `Jedes Mal, wenn das Display aufleuchtete, griff Tim Berger zum Handy. Der 29-jährige Grafiker aus Leipzig öffnete Nachrichten-Apps und soziale Netzwerke nach eigener Schätzung weit über hundert Mal am Tag — morgens vor dem Aufstehen, in jeder Pause, abends im Bett. Als ihn seine Freundin darauf hinwies, dass er inzwischen sogar beim gemeinsamen Abendessen auf den Bildschirm starrte, beschloss er einen Selbstversuch: vier Wochen ohne soziale Medien und ohne Nachrichten-Apps.

Die ersten Tage seien die schwersten gewesen, erzählt Berger. „Meine Hand ist ständig wie von selbst zur Hosentasche gewandert — dabei lag das Handy zu Hause in der Schublade.“ Um die Lücke zu füllen, abonnierte er eine gedruckte Wochenzeitung und hörte morgens Radio. Nach etwa einer Woche legte sich die innere Unruhe: Er schlief besser, war bei der Arbeit konzentrierter und las abends zum ersten Mal seit Jahren wieder Bücher.

Die Medienpsychologin Prof. Carola Brandt überrascht dieser Verlauf nicht. Nachrichten-Apps und Netzwerke seien gezielt so gestaltet, dass sie das Belohnungssystem im Gehirn ansprechen und immer neue Impulse liefern. Von einem völligen Verzicht hält sie dennoch wenig: Entscheidend sei nicht die Bildschirmzeit an sich, sondern der bewusste Umgang mit den Geräten. Statt radikaler Verbote empfiehlt sie feste nachrichtenfreie Zeiten, etwa am Morgen und vor dem Schlafengehen.

Genau diesen Weg ist Berger nach dem Experiment gegangen. Er nutzt soziale Medien heute wieder, aber anders als früher: Die Apps sind vom Startbildschirm verschwunden, sämtliche Push-Mitteilungen bleiben abgeschaltet, und Nachrichten liest er nur noch zweimal täglich zu festen Uhrzeiten. Das Handy im Schlafzimmer hat er dauerhaft abgeschafft. Am meisten erstaunt hat ihn eine andere Erfahrung: Obwohl er deutlich weniger Zeit mit Nachrichten verbrachte, fühlte er sich besser informiert als zuvor — weil er statt endloser Schlagzeilen nun ausführliche Hintergrundberichte las.`,
      questions: [
        {
          frage: 'Tim Berger entschied sich für den Selbstversuch, weil …',
          options: [
            'er beruflich darüber berichten sollte.',
            'sein Arzt ihm dringend dazu geraten hatte.',
            'ihn seine Freundin auf sein Verhalten aufmerksam machte.'
          ],
          answer: 2
        },
        {
          frage: 'In den ersten Tagen des Versuchs …',
          options: [
            'bemerkte Berger kaum eine Veränderung.',
            'griff seine Hand aus Gewohnheit immer wieder zum Handy.',
            'brach er das Experiment beinahe ab.'
          ],
          answer: 1
        },
        {
          frage: 'Prof. Brandt ist der Ansicht, dass …',
          options: [
            'der bewusste Umgang wichtiger ist als die reine Bildschirmzeit.',
            'man vollständig auf soziale Medien verzichten sollte.',
            'gedruckte Zeitungen die einzig seriöse Informationsquelle sind.'
          ],
          answer: 0
        },
        {
          frage: 'Nach dem Experiment …',
          options: [
            'hat Berger alle Apps endgültig gelöscht.',
            'informiert sich Berger nur noch zu festen Zeiten.',
            'nutzt Berger das Handy wieder genauso wie vorher.'
          ],
          answer: 1
        },
        {
          frage: 'Am meisten überraschte Berger, dass …',
          options: [
            'ihm seine Freunde kaum noch Nachrichten schickten.',
            'die Wochenzeitung teurer war als erwartet.',
            'er sich trotz geringeren Konsums besser informiert fühlte.'
          ],
          answer: 2
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Ihre Nachbarin möchte lernen, mit ihrem neuen Tablet umzugehen, hat aber keinerlei Vorkenntnisse.',
        'Ein Freund hat versehentlich wichtige Fotos von seiner Speicherkarte gelöscht.',
        'Sie suchen jemanden, der für Ihren Sportverein möglichst günstig eine Internetseite erstellt.',
        'Ihre Firma braucht eine Schulung zum Thema Datenschutz für alle Beschäftigten.',
        'Der Bildschirm des Laptops Ihrer Tochter ist gesprungen; das Gerät soll möglichst schnell repariert werden.',
        'Ein Bekannter möchte alte Familienvideos von Videokassetten digitalisieren lassen.',
        'Sie möchten lernen, wie man einen eigenen Podcast produziert.',
        'Eltern aus der Klasse Ihres Sohnes wünschen sich einen Vortrag darüber, wie Kinder sicher im Internet unterwegs sind.',
        'Ihre Kollegin ärgert sich über ihren langsamen Internetanschluss und möchte den Anbieter wechseln.',
        'Sie wollen gebrauchte Handys und Tablets verkaufen, statt sie wegzuwerfen.'
      ],
      ads: [
        'Medienbüro Klick: Wir gestalten professionelle Firmen-Websites ab 3.900 Euro — inklusive Wartungsvertrag und Suchmaschinenoptimierung.',
        'PC-Hilfe Sofort: Laptop- und Handy-Reparaturen aller Marken. Express-Service: Ihr Gerät ist in 24 Stunden wieder einsatzbereit!',
        'Volkshochschule: „Tablet und Smartphone für absolute Anfängerinnen und Anfänger“ — kleine Gruppen, viel Geduld, keine Vorkenntnisse nötig.',
        'Studio Hörbar: Wochenendworkshop „Mein erster Podcast“ — von der Idee über die Aufnahme bis zur Veröffentlichung. Technik wird gestellt.',
        'Datenretter24: Gelöschte oder beschädigte Dateien? Wir stellen Fotos und Dokumente von Festplatten und Speicherkarten wieder her. Keine Rettung, keine Kosten.',
        'An- und Verkauf Elektrofuchs: Wir kaufen gebrauchte Handys, Tablets und Konsolen zu fairen Preisen — sofortige Barauszahlung.',
        'Webwerkstatt Campus: Studierende der Medieninformatik erstellen Vereins- und Privatseiten zum kleinen Preis — Beispiele auf Anfrage.',
        'Medienpädagoge Roth: Vorträge für Elternabende — „Sicher im Netz: Was Kinder online wirklich tun“. Termine nach Vereinbarung.',
        'Kanzlei Datenrecht: Wir schulen Ihre Belegschaft in allen Fragen des Datenschutzes — praxisnah und direkt in Ihrem Unternehmen.',
        'Filmschätze retten: Wir überspielen VHS-Kassetten, Dias und Schmalfilme auf USB-Stick oder DVD — schonend und günstig.',
        'Tarifwechsel leicht gemacht: Unabhängige Beratung zu Internet- und Mobilfunkverträgen — wir finden den passenden Anbieter und übernehmen die Kündigung.',
        'Fotoclub Blende 8 sucht neue Mitglieder: monatliche Fotoausflüge und Bildbesprechungen — Anfänger herzlich willkommen.'
      ],
      answers: [2, 4, 6, 8, 1, 9, 3, 7, 10, 5]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrte Damen und Herren,

seit drei Jahren nutze ich Ihren Internetanschluss „Komfort 100“, [1] ich bisher sehr zufrieden war. Zum 1. November ziehe ich aus beruflichen Gründen nach Dresden um und bitte Sie daher, meinen Anschluss zum genannten Termin an die neue Adresse zu [2].

Auf Ihrer Internetseite habe ich gelesen, dass ein Umzug spätestens sechs Wochen im [3] angekündigt werden muss. Da mein Umzugstermin bereits [4], hoffe ich, dass die Umstellung rechtzeitig erfolgen kann.

Außerdem möchte ich Sie bitten, mir mitzuteilen, [5] an der neuen Adresse dieselbe Geschwindigkeit verfügbar ist. [6] dies nicht der Fall sein, bitte ich um ein Angebot für einen passenden Tarif.

Für die Einrichtung des Anschlusses benötige ich einen Termin, [7] ein Techniker in die Wohnung kommt. Ich wäre Ihnen dankbar, wenn dieser Termin [8] am Nachmittag stattfinden könnte, da ich vormittags arbeite.

Meine neue Anschrift [9] Sie dem beigefügten Formular. Für Rückfragen [10] ich Ihnen selbstverständlich gern zur Verfügung.

Mit freundlichen Grüßen
Katja Lorenz`,
      gaps: [
        { options: ['worüber', 'mit dem', 'über den'], answer: 1 },
        { options: ['verlegen', 'versetzen', 'verschieben'], answer: 0 },
        { options: ['Nachhinein', 'Übrigen', 'Voraus'], answer: 2 },
        { options: ['feststeht', 'stattfindet', 'besteht'], answer: 0 },
        { options: ['dass', 'ob', 'wenn'], answer: 1 },
        { options: ['Würde', 'Möchte', 'Sollte'], answer: 2 },
        { options: ['an dem', 'auf den', 'in den'], answer: 0 },
        { options: ['jederzeit', 'möglichst', 'beliebig'], answer: 1 },
        { options: ['entziehen', 'erhalten', 'entnehmen'], answer: 2 },
        { options: ['stehe', 'bleibe', 'halte'], answer: 0 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

seit vielen Jahren bin ich [1] Ihrer Stadtbücherei und nutze regelmäßig auch Ihre digitalen Angebote. Umso mehr habe ich mich über die [2] gefreut, dass Sie die Online-Ausleihe erweitern wollen.

Leider funktioniert die dazugehörige App seit der letzten Aktualisierung nicht mehr [3]. Beim Herunterladen von E-Books bricht die [4] häufig ab, und mehrere Hörbücher lassen sich gar nicht erst [5]. Ich habe dieses Problem bereits vor zwei Wochen per E-Mail [6], jedoch bis heute keine Antwort erhalten.

Da ich für die digitale Ausleihe eine jährliche Gebühr [7], erwarte ich, dass die Technik einwandfrei funktioniert. Ich bitte Sie daher, den Fehler so bald wie möglich zu [8] oder mir mitzuteilen, an wen ich mich stattdessen [9] kann.

Ich hoffe auf eine rasche [10] meines Anliegens und verbleibe

mit freundlichen Grüßen
Peter Albrecht`,
      wordBank: [
        'Anmeldung',
        'Bearbeitung',
        'beheben',
        'dringend',
        'entrichte',
        'erfahren',
        'gemeldet',
        'Gerät',
        'Mitglied',
        'Nachricht',
        'öffnen',
        'schließen',
        'Verbindung',
        'wenden',
        'zuverlässig'
      ],
      answers: [8, 9, 14, 12, 10, 6, 4, 2, 13, 1]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die neue Warn-App wird bereits von der Mehrheit der Bevölkerung genutzt.',
          answer: false,
          audio:
            'Sechs Monate nach dem Start ziehen die Behörden eine gemischte Bilanz der neuen Warn-App, die vor Unwettern und anderen Gefahren warnen soll. Zwar funktioniert die Technik inzwischen zuverlässig, doch installiert hat die Anwendung bislang nur etwa jeder achte Bürger. Das Innenministerium kündigte deshalb eine Informationskampagne an, um deutlich mehr Menschen zu erreichen.'
        },
        {
          statement: 'Der Ausbau des Mobilfunknetzes auf dem Land soll schneller vorangehen.',
          answer: true,
          audio:
            'Wer auf dem Land telefonieren will, braucht mancherorts immer noch Geduld: Hunderte Funklöcher gibt es nach wie vor, vor allem in ländlichen Regionen. Die Bundesregierung hat nun ein Programm beschlossen, mit dem der Ausbau des Mobilfunknetzes dort deutlich beschleunigt werden soll. Die Netzbetreiber verpflichten sich, bis Ende nächsten Jahres mehrere hundert zusätzliche Masten zu errichten.'
        },
        {
          statement: 'Das neue Jugendprogramm ist auch im klassischen Fernsehen zu empfangen.',
          answer: false,
          audio:
            'Aus dem Medienbereich: Die öffentlich-rechtlichen Sender starten heute ein neues Programm für junge Zuschauerinnen und Zuschauer zwischen vierzehn und neunundzwanzig Jahren. Das Angebot ist ausschließlich im Internet zu sehen — auf einer eigenen Plattform sowie in den sozialen Netzwerken. Einen Platz im klassischen Fernsehen wird es bewusst nicht geben, denn dort erreiche man die Zielgruppe kaum noch, so die Verantwortlichen.'
        },
        {
          statement: 'Die Polizei rät, auf Links in solchen Kurznachrichten nicht zu klicken.',
          answer: true,
          audio:
            'Die Polizei warnt vor einer neuen Betrugsmasche: Zurzeit erhalten viele Menschen Kurznachrichten, die angeblich von einem Paketdienst stammen und zur Verfolgung einer Sendung auffordern. Wer den enthaltenen Link öffnet, installiert unbemerkt ein Schadprogramm auf seinem Handy. Die Beamten raten dringend, solche Links keinesfalls anzuklicken, die Nachrichten sofort zu löschen und im Zweifel direkt beim Paketdienst nachzufragen.'
        },
        {
          statement: 'Die Zahl der Kinobesucher ist im vergangenen Jahr gestiegen.',
          answer: true,
          audio:
            'Totgesagte leben länger — das gilt offenbar auch fürs Kino: Trotz der großen Konkurrenz durch Streamingdienste haben die deutschen Kinos im vergangenen Jahr rund acht Prozent mehr Besucherinnen und Besucher gezählt als im Jahr davor. Branchenvertreter erklären den Erfolg mit aufwendigen Filmproduktionen und dem Wunsch vieler Menschen nach einem gemeinsamen Erlebnis außerhalb der eigenen vier Wände.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderatorin',
          text: 'Willkommen bei „Medienzeit“! Mein Gast ist heute die Medienpädagogin Dr. Sandra Klein. Sie leitet das Projekt „Netzscouts“, das gerade einen Preis für digitale Bildung erhalten hat. Frau Klein, worum geht es bei den Netzscouts genau?'
        },
        {
          speaker: 'Dr. Klein',
          text: 'Wir bilden Schülerinnen und Schüler der achten und neunten Klassen zu sogenannten Netzscouts aus. Die beraten anschließend jüngere Mitschülerinnen und Mitschüler bei allen Fragen rund um soziale Medien, Datenschutz und Cybermobbing. Das Projekt läuft jetzt im dritten Jahr, und inzwischen machen über sechzig Schulen mit — Gymnasien genauso wie Real- und Gesamtschulen.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Warum brauchen Jugendliche überhaupt solche Beratung? Sie gelten doch als Generation, die mit dem Internet aufgewachsen ist.'
        },
        {
          speaker: 'Dr. Klein',
          text: 'Das ist ein weit verbreitetes Missverständnis. Junge Leute können schnell wischen und tippen, aber das heißt nicht, dass sie das Netz auch durchschauen. Und wenn über Jugendliche und Handys diskutiert wird, geht es fast immer nur um die Frage, wie lange sie online sind. Die reine Nutzungsdauer halte ich ehrlich gesagt für zweitrangig — entscheidend ist, was die Jugendlichen in dieser Zeit eigentlich tun.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Womit haben die Schülerinnen und Schüler denn die größten Schwierigkeiten?'
        },
        {
          speaker: 'Dr. Klein',
          text: 'Ganz klar mit der Bewertung von Informationen. In einer aktuellen Untersuchung konnte etwa die Hälfte der Jugendlichen bezahlte Werbung nicht von echten Artikeln unterscheiden. Auch gefälschte Bilder und erfundene Meldungen werden oft für bare Münze genommen — und ungeprüft weiterverbreitet.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Wie werden die Netzscouts auf ihre Aufgabe vorbereitet?'
        },
        {
          speaker: 'Dr. Klein',
          text: 'Sie bekommen zunächst eine zweitägige Ausbildung bei uns im Medienzentrum, danach treffen sie sich einmal im Monat mit unseren Fachleuten. Anschließend geben sie eigene Workshops für die fünften und sechsten Klassen — natürlich begleitet von Lehrkräften. Und dieser Ansatz funktioniert erstaunlich gut: Wenn eine Sechzehnjährige erklärt, warum sie bestimmte Bilder nicht postet, hat das mehr Gewicht als jeder Vortrag eines Lehrers. Die Jüngeren stellen den Scouts außerdem Fragen, die sie Erwachsenen niemals stellen würden.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Welche Rolle spielen die Eltern bei alldem?'
        },
        {
          speaker: 'Dr. Klein',
          text: 'Eine viel größere, als die meisten denken. Kinder übernehmen die Gewohnheiten ihrer Eltern. Wer selbst beim Abendessen ständig aufs Handy schaut, braucht sich über den Nachwuchs nicht zu wundern. Eltern sollten also mit gutem Beispiel vorangehen und über das reden, was ihre Kinder online erleben. Verbote allein bringen dagegen wenig.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Apropos Verbote: Immer mehr Schulen verbieten private Handys komplett. Halten Sie das für eine gute Idee?'
        },
        {
          speaker: 'Dr. Klein',
          text: 'Ich verstehe den Wunsch nach Ruhe im Unterricht, aber von einem vollständigen Verbot halte ich wenig. Die Probleme verschwinden dadurch ja nicht, sie verlagern sich nur auf den Nachmittag. Sinnvoller sind klare Regeln — handyfreie Zeiten und Zonen, aber eben auch Unterricht, in dem die Geräte bewusst und produktiv eingesetzt werden.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Was kostet die Teilnahme die Schulen eigentlich?'
        },
        {
          speaker: 'Dr. Klein',
          text: 'Gar nichts. Das Projekt wird vom Land und von einer privaten Stiftung finanziert, für die Schulen ist es vollständig kostenlos. Und es geht weiter: Im kommenden Schuljahr weiten wir das Angebot auf Grundschulen aus — mit eigens dafür geschulten Teams, denn die Kinder kommen ja immer früher mit dem Netz in Berührung.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Frau Dr. Klein, herzlichen Dank für das Gespräch!'
        }
      ],
      statements: [
        {
          statement:
            'Die Netzscouts beraten jüngere Mitschülerinnen und Mitschüler zu Themen wie sozialen Medien und Cybermobbing.',
          answer: true
        },
        { statement: 'An dem Projekt nehmen ausschließlich Gymnasien teil.', answer: false },
        {
          statement: 'Frau Klein hält die reine Nutzungsdauer für das entscheidende Problem.',
          answer: false
        },
        {
          statement:
            'Laut einer Untersuchung konnte etwa die Hälfte der Jugendlichen Werbung nicht von echten Artikeln unterscheiden.',
          answer: true
        },
        {
          statement: 'Die Netzscouts werden ein ganzes Schuljahr lang jede Woche geschult.',
          answer: false
        },
        {
          statement:
            'Die jüngeren Schüler stellen den Scouts Fragen, die sie Erwachsenen nicht stellen würden.',
          answer: true
        },
        {
          statement: 'Frau Klein rät Eltern, bei der Mediennutzung selbst ein Vorbild zu sein.',
          answer: true
        },
        {
          statement: 'Frau Klein spricht sich für ein vollständiges Handyverbot an Schulen aus.',
          answer: false
        },
        {
          statement: 'Die Schulen müssen für die Teilnahme am Projekt nichts bezahlen.',
          answer: true
        },
        {
          statement: 'Im nächsten Schuljahr soll das Projekt auch an Grundschulen starten.',
          answer: true
        }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf kurze Durchsagen und Mitteilungen. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Kunden erhalten heute auf alle Fernseher zwanzig Prozent Rabatt.',
          answer: true,
          audio:
            'Liebe Kundinnen und Kunden, herzlich willkommen im Elektromarkt Wagner! Nur heute feiern wir unser Jubiläum — und Sie sparen mit: Auf sämtliche Fernsehgeräte erhalten Sie an der Kasse zwanzig Prozent Rabatt. Außerdem beraten Sie unsere Fachleute in der ersten Etage kostenlos zu allen Fragen rund um Empfang und Streaming. Wir wünschen Ihnen einen angenehmen Einkauf!'
        },
        {
          statement: 'Fahrkarten können zurzeit nur am Automaten oder am Schalter gekauft werden.',
          answer: true,
          audio:
            'Sehr geehrte Fahrgäste, eine wichtige Information: Wegen einer technischen Störung ist der Fahrkartenkauf über unsere App und unsere Internetseite zurzeit leider nicht möglich. Bitte nutzen Sie die Automaten in der Bahnhofshalle oder unseren Schalter im Reisezentrum, der heute bis zwanzig Uhr geöffnet ist. Wir arbeiten mit Hochdruck an einer Lösung und bitten um Entschuldigung.'
        },
        {
          statement: 'Der Computerkurs fällt ersatzlos aus.',
          answer: false,
          audio:
            'Guten Tag, hier ist der Anrufbeantworter der Volkshochschule Mitte. Eine Mitteilung für die Teilnehmerinnen und Teilnehmer des Kurses „Sicher im Internet“: Da unser Kursleiter erkrankt ist, kann der Unterricht am Donnerstag nicht im Kursraum stattfinden. Der Termin wird stattdessen als Videokonferenz durchgeführt. Den Zugangslink erhalten Sie heute Abend per E-Mail. Alle weiteren Termine finden wie geplant statt.'
        },
        {
          statement: 'Für die Führung durch die Sonderausstellung muss man zusätzlich bezahlen.',
          answer: false,
          audio:
            'Meine Damen und Herren, herzlich willkommen im Stadtmuseum. Um fünfzehn Uhr beginnt unsere Führung durch die Sonderausstellung „Vom Telegramm zum Smartphone — 150 Jahre Kommunikation“. Die Teilnahme ist im Eintrittspreis bereits enthalten, eine Anmeldung ist nicht erforderlich. Treffpunkt ist das Foyer im Erdgeschoss. Bitte beachten Sie: Das Fotografieren ist in der Ausstellung nur ohne Blitz gestattet.'
        },
        {
          statement: 'Die Computersysteme der Firma sind am Freitagvormittag nicht nutzbar.',
          answer: true,
          audio:
            'Achtung, eine Durchsage für alle Mitarbeiterinnen und Mitarbeiter: Am kommenden Freitag führt die IT-Abteilung zwischen acht und zwölf Uhr dringend notwendige Wartungsarbeiten durch. In dieser Zeit stehen weder das E-Mail-Programm noch die internen Datenbanken zur Verfügung. Bitte planen Sie Ihre Aufgaben entsprechend und speichern Sie wichtige Dokumente bereits am Donnerstag lokal ab. Vielen Dank für Ihr Verständnis.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Schreiben Sie eine halbformelle E-Mail (150–220 Wörter) und gehen Sie auf alle vier Leitpunkte ein. Achten Sie auf eine passende Anrede und einen passenden Gruß.',
    tasks: [
      {
        titel: 'Leserbrief: Handyverbot an Schulen',
        situation:
          'In der Zeitung haben Sie den Artikel „Schulen ohne Handys — endlich wieder Ruhe im Klassenzimmer?“ gelesen. Darin wird ein vollständiges Handyverbot an allen Schulen gefordert. Schreiben Sie einen Leserbrief an die Redaktion.',
        leitpunkte: [
          'Nehmen Sie Bezug auf den Artikel.',
          'Formulieren Sie Ihre eigene Meinung zum Handyverbot.',
          'Begründen Sie Ihre Position mit Beispielen oder Erfahrungen.',
          'Machen Sie einen eigenen Vorschlag, wie Schulen mit Handys umgehen sollten.'
        ],
        musterloesung: `Betreff: Leserbrief zum Artikel „Schulen ohne Handys“ vom 12. Oktober

Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihren Artikel über das geforderte Handyverbot an Schulen gelesen. Der Wunsch nach mehr Ruhe im Unterricht ist verständlich, dennoch halte ich ein vollständiges Verbot für den falschen Weg.

Meiner Ansicht nach verschwinden die Probleme dadurch nicht — sie verlagern sich lediglich auf den Nachmittag. Als Mutter zweier Schulkinder beobachte ich außerdem, dass gerade die Schule der richtige Ort wäre, um den vernünftigen Umgang mit dem Gerät zu üben. Wer den Kindern das Handy einfach wegnimmt, bringt ihnen nichts bei.

Sinnvoller erscheint mir eine klare Regelung: handyfreie Pausen und Klassenzimmer, gleichzeitig aber Unterrichtsstunden, in denen die Geräte gezielt eingesetzt werden — etwa um Informationen zu prüfen oder gemeinsam Präsentationen zu erstellen. An der Schule meines Sohnes funktioniert dieses Modell seit zwei Jahren erstaunlich gut, und auch die Lehrkräfte ziehen eine positive Bilanz.

Ich würde mich freuen, wenn Ihre Zeitung auch solche positiven Beispiele vorstellen würde, statt nur über Verbote zu diskutieren.

Mit freundlichen Grüßen
Elena Petrova`
      }
    ],
    tipps:
      'Beim Leserbrief gehören der Bezug auf den Artikel und eine klar begründete Meinung dazu. Nutzen Sie Konnektoren (dennoch, außerdem, daher), um Ihre Argumentation zu verbinden. Gehen Sie auf alle vier Leitpunkte ein und prüfen Sie am Ende: 150–220 Wörter, passende Anrede und Grußformel.'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Über Erfahrungen sprechen',
      anweisung:
        'Erzählen Sie Ihrer Partnerin / Ihrem Partner von einer eigenen Erfahrung zum Thema „Ein Medium, das mein Leben verändert hat“ (ca. 2,5 Minuten). Gehen Sie auf die Punkte ein und reagieren Sie anschließend auf die Fragen Ihres Partners.',
      punkte: [
        'Beschreiben Sie, wie es dazu kam, dass Sie dieses Medium zu nutzen begannen.',
        'Erzählen Sie, was sich dadurch in Ihrem Alltag konkret verändert hat.',
        'Berichten Sie von einer negativen Erfahrung, die Sie damit gemacht haben.',
        'Sagen Sie, wie dieses Medium in Ihrem Heimatland genutzt wird.'
      ],
      redemittel: [
        'Ich erzähle euch/Ihnen von einer Erfahrung mit …',
        'Bei mir war das so: …',
        'Aus meiner Erfahrung …',
        'Negativ war für mich vor allem, dass …',
        'Das kann ich gut nachvollziehen, weil …',
        'Wie ist das eigentlich bei dir/Ihnen?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Diskussion',
      anweisung:
        'Sie haben folgende Schlagzeile gelesen: „Soziale Medien erst ab 16 — Jugendschutz muss wichtiger sein als Freiheit.“ Diskutieren Sie mit Ihrer Partnerin / Ihrem Partner: Stimmen Sie zu? Begründen Sie Ihre Meinung und reagieren Sie auf die Argumente der anderen Seite.',
      punkte: [
        'Formulieren Sie Ihre Position klar.',
        'Begründen Sie mit Beispielen oder eigenen Erfahrungen.',
        'Gehen Sie auf die Argumente Ihrer Partnerin / Ihres Partners ein.',
        'Finden Sie zum Schluss eine gemeinsame Einschätzung.'
      ],
      redemittel: [
        'Meiner Überzeugung nach …',
        'Dagegen spricht allerdings, dass …',
        'Ihr Argument verstehe ich, trotzdem meine ich, dass …',
        'Ein Beispiel dafür ist …',
        'Da bin ich anderer Meinung, denn …',
        'Vielleicht können wir uns darauf einigen, dass …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Ihr Nachbarschaftszentrum möchte einen „Digital-Nachmittag“ anbieten, an dem Freiwillige älteren Menschen den Umgang mit Smartphone und Tablet erklären. Planen Sie die Veranstaltung gemeinsam.',
      punkte: [
        'Wann und wo soll der Digital-Nachmittag stattfinden?',
        'Welche Themen sollen angeboten werden (z. B. Videoanrufe, Online-Termine, Sicherheit)?',
        'Wie gewinnen Sie Freiwillige, und wer übernimmt welche Aufgabe?',
        'Wie machen Sie die Zielgruppe auf das Angebot aufmerksam — auch ohne Internet?'
      ],
      redemittel: [
        'Ich schlage vor, dass wir zuerst …',
        'Wie wäre es, wenn wir …?',
        'Das könnte ich übernehmen, wenn Sie sich um … kümmern.',
        'Wir dürfen nicht vergessen, dass viele Ältere …',
        'Einverstanden — dann halten wir fest, dass …',
        'Zum Schluss sollten wir noch klären, wer …'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
