import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 8,
  level: 'b2',
  title: 'Modelltest 8',
  theme: 'Wissenschaft & Technik',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Quantencomputer: Durchbruch im Labor, Alltag noch fern',
        'Streit um Gentechnik: Neue Regeln für die Landwirtschaft',
        'Studie: Jugendliche vertrauen der Wissenschaft mehr als je zuvor',
        'Roboter in der Pflege: Modellprojekt startet in drei Heimen',
        'Datenschützer warnen vor smarten Haushaltsgeräten',
        'Elektromobilität: Ladeinfrastruktur wächst langsamer als geplant',
        'Künstliche Intelligenz erkennt Krankheiten früher als Ärzte',
        'Raumfahrt: Europäische Sonde liefert erste Bilder vom Merkur',
        'Forschungsgelder gekürzt: Universitäten schlagen Alarm',
        'Citizen Science: Laien zählen Insekten für die Forschung'
      ],
      texts: [
        'Ein Forschungsteam der Universität Tübingen hat ein Computerprogramm entwickelt, das Hautveränderungen auf Fotos analysiert und bösartige Tumoren mit erstaunlicher Treffsicherheit erkennt — im Durchschnitt früher als erfahrene Fachärzte. In einer Vergleichsstudie mit über zehntausend Aufnahmen lag die Software in neun von zehn Fällen richtig. Die Forscher betonen jedoch, das Programm solle die ärztliche Untersuchung nicht ersetzen, sondern lediglich eine zusätzliche Kontrolle ermöglichen.',
        'Der Absatz von Elektroautos steigt, doch beim Ausbau der öffentlichen Ladesäulen kommt Deutschland kaum voran. Nach aktuellen Zahlen des Branchenverbandes wurde im vergangenen Jahr nur gut die Hälfte der geplanten neuen Ladepunkte tatsächlich errichtet. Als Gründe nennen die Kommunen fehlendes Personal, lange Genehmigungsverfahren und Engpässe beim Stromnetz. Fachleute warnen, dass die schleppende Entwicklung viele Interessenten vom Umstieg auf ein Elektrofahrzeug abhalten könnte.',
        'Wie viele Schmetterlinge fliegen noch durch deutsche Gärten? Antworten liefert ausgerechnet die Bevölkerung selbst: Beim Projekt „Insektensommer“ zählen jedes Jahr zehntausende Freiwillige eine Stunde lang alle Tiere, die sie beobachten, und melden die Ergebnisse über eine App. Für die Wissenschaft sind diese Daten wertvoll, denn kein Institut könnte flächendeckend so viele Beobachtungen sammeln. Die Auswertung übernehmen anschließend Fachleute, die daraus Trends für den Artenschutz ableiten.',
        'Sie hören mit, speichern Gewohnheiten und senden Daten an Server im Ausland: Sprachassistenten, vernetzte Fernseher und Saugroboter sammeln nach Ansicht von Verbraucherschützern weit mehr Informationen, als für den Betrieb nötig wäre. Eine aktuelle Untersuchung zeigt, dass viele Hersteller nur unzureichend darüber informieren, was mit den Aufzeichnungen geschieht. Experten raten, bei der Einrichtung sämtliche Übertragungsfunktionen zu prüfen und nicht benötigte Mikrofone konsequent abzuschalten.',
        'Mit deutlichen Worten haben sich die Rektoren mehrerer Universitäten an die Landesregierung gewandt: Die angekündigten Einsparungen im Wissenschaftsetat gefährdeten laufende Projekte und trieben junge Forscherinnen und Forscher ins Ausland. Betroffen wären vor allem die Grundlagenforschung sowie hunderte befristete Stellen. Das Ministerium verteidigt die Kürzungen mit der angespannten Haushaltslage, stellt aber in Aussicht, besonders erfolgreiche Institute von den Maßnahmen auszunehmen.'
      ],
      answers: [6, 5, 9, 4, 8]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Ein Roboter namens Emil',
      text: `Im Seniorenheim „Am Lindenpark“ in Kassel gehört Emil längst zum Alltag. Der kniehohe Roboter rollt über die Flure, erinnert die Bewohnerinnen und Bewohner an Termine und Medikamente, spielt Gedächtnisspiele und leitet am Vormittag sogar eine kleine Gymnastikrunde an. Wer ihn ruft, bekommt eine geduldige Antwort — auch beim zehnten Mal.

Entwickelt wurde Emil an der Technischen Universität Darmstadt unter der Leitung von Dr. Sofia Petrova. „Uns ging es nie darum, Pflegekräfte zu ersetzen“, betont die Informatikerin. „Emil übernimmt Routineaufgaben, damit die Menschen mehr Zeit für das haben, was keine Maschine kann: Zuwendung.“ Genau davon war das Personal anfangs allerdings nicht überzeugt. Viele Pflegekräfte fürchteten, der Roboter sei der erste Schritt, um Stellen abzubauen, andere fühlten sich durch seine Kameras beobachtet.

Nach einem Jahr Modellbetrieb fällt die Bilanz differenzierter aus. Die meisten Bewohner haben Emil akzeptiert; besonders Menschen mit Demenz reagieren positiv auf seine immer gleichbleibende, ruhige Art. Das Pflegeteam spart nach eigener Schätzung rund eine Stunde täglich, weil Emil an Trinkpausen erinnert und Botengänge übernimmt. Seine Grenzen sind freilich klar: Heben oder stützen kann der Roboter niemanden, und wer Dialekt spricht, wird von ihm regelmäßig missverstanden.

Kritik kommt von anderer Seite. Der Ethikprofessor Johannes Weigel warnt davor, Einsamkeit im Alter mit Maschinen zu beantworten: „Ein Roboter darf niemals das letzte Gegenüber eines Menschen sein.“ Petrova widerspricht dem gar nicht. Emil sei eine Ergänzung, kein Ersatz — und gerade deshalb dürfe man ihn nicht als Sparmodell missverstehen. Ein Problem bleibt allerdings ungelöst: Mit rund 30.000 Euro pro Gerät ist Emil teuer, und die Pflegekassen beteiligen sich bisher nicht an den Kosten. Trotzdem geht das Projekt weiter: Ab Herbst wird Emil in zwölf weiteren Einrichtungen erprobt, und Petrovas Team arbeitet bereits daran, dass er künftig auch regionale Sprachfärbungen versteht.`,
      questions: [
        {
          frage: 'Emil übernimmt im Seniorenheim vor allem …',
          options: [
            'körperlich anstrengende Pflegetätigkeiten.',
            'Erinnerungen, Spiele und kleine Übungen.',
            'die Verwaltung der Medikamente durch das Personal.'
          ],
          answer: 1
        },
        {
          frage: 'Die Pflegekräfte reagierten zu Beginn skeptisch, weil …',
          options: [
            'sie den Umgang mit der Technik nicht lernen wollten.',
            'die Bewohner den Roboter ablehnten.',
            'sie Stellenabbau und Überwachung befürchteten.'
          ],
          answer: 2
        },
        {
          frage: 'Nach einem Jahr zeigt sich, dass …',
          options: [
            'besonders demente Bewohner gut auf Emil reagieren.',
            'der Roboter inzwischen auch Bewohner stützen kann.',
            'das Personal durch Emil mehr Arbeit hat als vorher.'
          ],
          answer: 0
        },
        {
          frage: 'Der Ethikprofessor Weigel kritisiert, dass …',
          options: [
            'die Universität zu wenig Geld für das Projekt erhält.',
            'Einsamkeit nicht durch Maschinen gelöst werden dürfe.',
            'der Roboter zu viele Daten über die Bewohner sammle.'
          ],
          answer: 1
        },
        {
          frage: 'Zur Finanzierung erfährt man, dass …',
          options: [
            'die Pflegekassen die Geräte inzwischen bezahlen.',
            'der Preis pro Gerät deutlich gesunken ist.',
            'sich die Pflegekassen bislang nicht an den Kosten beteiligen.'
          ],
          answer: 2
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Der Laptop eines Freundes ist defekt; er möchte ihn reparieren lassen, statt ein neues Gerät zu kaufen.',
        'Ihre Großmutter möchte endlich lernen, mit ihrem Smartphone Nachrichten und Fotos zu verschicken.',
        'Sie möchten wissen, wie Sie Ihre privaten Daten im Internet besser schützen können.',
        'Ein Kollege möchte abends neben dem Beruf Programmieren lernen.',
        'Sie suchen ein Ausflugsziel, bei dem Kinder Naturwissenschaften durch Ausprobieren entdecken können.',
        'Ein Nachbar überlegt, eine Solaranlage auf seinem Dach zu installieren, und wünscht eine unabhängige Beratung.',
        'Eine Freundin sucht ein gebrauchtes Smartphone mit Garantie.',
        'Sie möchten Ihren alten, aber noch funktionierenden Computer für einen guten Zweck spenden.',
        'Zwei Gründerinnen aus Ihrem Bekanntenkreis suchen günstige Arbeitsplätze mit Werkstatt und 3D-Druckern.',
        'Sie möchten alte Videokassetten Ihrer Familie digitalisieren lassen.'
      ],
      ads: [
        'Repair-Café Nordstadt: Jeden zweiten Samstag reparieren ehrenamtliche Fachleute gemeinsam mit Ihnen Laptops, Radios und Toaster — kostenlos, Ersatzteile gegen Spende.',
        'Elektromarkt MegaWatt: Große Neueröffnung! Aktuelle Smartphones, Laptops und Fernseher zu Aktionspreisen — ausschließlich Neugeräte mit Herstellergarantie.',
        'Volkshochschule: Kurs „Mein Smartphone und ich“ für Seniorinnen und Senioren — kleine Gruppen, viel Zeit zum Üben: Nachrichten, Fotos, Videotelefonie.',
        'CodeCampus: Berufsbegleitender Online-Kurs „Programmieren mit Python“ — Live-Unterricht dienstags und donnerstags ab 19 Uhr, Abschlusszertifikat inklusive.',
        'Verein Hardware hilft e. V.: Wir sammeln funktionstüchtige Computer, bereiten sie auf und geben sie an Schulen und bedürftige Familien weiter. Abholung möglich.',
        'IT-Security-Kongress: Zwei Tage Fachvorträge zu Netzwerksicherheit für Administratoren und Sicherheitsbeauftragte von Unternehmen. Teilnahme ab 890 Euro.',
        'Phönix Elektronik: Geprüfte Gebraucht-Smartphones mit 24 Monaten Garantie und 30 Tagen Rückgaberecht — bis zu 40 Prozent günstiger als neu.',
        'Energieagentur Region: Unabhängige und kostenlose Beratung zu Photovoltaik und Stromspeichern — auf Wunsch auch bei Ihnen zu Hause.',
        'EXPERIMENTUM: Das Mitmach-Museum mit über 200 Stationen zum Anfassen und Ausprobieren — Naturwissenschaft für die ganze Familie, täglich geöffnet.',
        'MedienRetter: Wir digitalisieren Ihre VHS-Kassetten, Dias und Schmalfilme — sichere Abwicklung per Post oder vor Ort, fertig in zehn Tagen.',
        'Verbraucherzentrale: Kostenloser Abendvortrag „Meine Daten gehören mir“ — sichere Passwörter, soziale Netzwerke, Online-Einkauf. Anmeldung erbeten.',
        'Werkraum 4.0: Coworking mit Holz- und Metallwerkstatt, 3D-Druckern und Lasercutter — flexible Monatstarife für Start-ups und Kreative.'
      ],
      answers: [0, 2, 10, 3, 8, 7, 6, 4, 11, 9]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrte Damen und Herren,

vor zwei Monaten habe ich ein Elektroauto bestellt, das [1] voraussichtlich Ende November geliefert wird. Aus diesem Grund [2] ich mich heute mit einer Anfrage an Sie.

Ich wohne zur Miete in einem Mehrfamilienhaus, [3] Tiefgarage über keine Lademöglichkeit verfügt. Mein Vermieter hat mir bereits [4], dass er der Installation einer sogenannten Wallbox zustimmt, [5] die Kosten von mir übernommen werden.

Nun möchte ich gerne wissen, [6] Voraussetzungen für den Anschluss erfüllt sein müssen und ob Ihr Unternehmen die Installation selbst [7]. Außerdem wäre ich Ihnen dankbar, wenn Sie mir mitteilen könnten, mit welchen Kosten ich ungefähr rechnen [8] und ob es derzeit Förderprogramme gibt, die ich in Anspruch [9] kann.

Da die Lieferung des Fahrzeugs näher rückt, wäre ich Ihnen für eine baldige Antwort sehr [10].

Mit freundlichen Grüßen
Jonas Weber`,
      gaps: [
        { options: ['mich', 'mir', 'meiner'], answer: 1 },
        { options: ['wende', 'melde', 'richte'], answer: 0 },
        { options: ['deren', 'dessen', 'denen'], answer: 1 },
        { options: ['zugestimmt', 'zugegeben', 'zugesichert'], answer: 2 },
        { options: ['sofern', 'obwohl', 'damit'], answer: 0 },
        { options: ['wessen', 'welche', 'was für'], answer: 1 },
        { options: ['unternimmt', 'übergibt', 'übernimmt'], answer: 2 },
        { options: ['muss', 'will', 'mag'], answer: 0 },
        { options: ['setzen', 'nehmen', 'stellen'], answer: 1 },
        { options: ['einverstanden', 'zufrieden', 'verbunden'], answer: 2 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

seit dem 3. Mai bin ich Kundin Ihres Unternehmens und habe den Tarif „Internet Komfort 250“ [1]. In Ihrer Werbung [2] Sie eine stabile Verbindung mit einer Geschwindigkeit von 250 Megabit pro Sekunde. Die [3] sieht leider anders aus: Messungen ergeben selbst zu ruhigen Tageszeiten kaum ein Zehntel des zugesagten Wertes, und am Abend bricht die Verbindung [4] ganz ab.

Da ich im Homeoffice arbeite, bin ich auf einen [5] Anschluss dringend angewiesen. Videokonferenzen sind derzeit kaum möglich, [6] ich bereits berufliche Nachteile hatte.

Ihre Hotline habe ich dreimal kontaktiert; man hat mir jedes Mal eine technische Prüfung [7], doch geschehen ist bisher nichts. Ich setze Ihnen hiermit eine [8] bis zum 15. Juni, um die vertraglich vereinbarte Leistung herzustellen. [9] werde ich von meinem Sonderkündigungsrecht Gebrauch machen und die monatlichen Beträge nur noch [10] zahlen.

Mit freundlichen Grüßen
Carola Schmitt`,
      wordBank: [
        'Andernfalls',
        'anteilig',
        'Ausnahme',
        'beantragt',
        'Frist',
        'gebucht',
        'geeignet',
        'regelmäßig',
        'sodass',
        'trotzdem',
        'versprechen',
        'Wirklichkeit',
        'zugesagt',
        'zuständig',
        'zuverlässigen'
      ],
      answers: [5, 10, 11, 7, 14, 8, 12, 4, 0, 1]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Laut der Studie verbringen Jugendliche täglich mehr als vier Stunden am Smartphone.',
          answer: true,
          audio:
            'Und nun ein Blick auf eine neue Untersuchung zur Mediennutzung: Nach einer heute veröffentlichten Studie der Universität Leipzig verbringen Jugendliche zwischen zwölf und siebzehn Jahren im Durchschnitt viereinhalb Stunden pro Tag am Smartphone — deutlich mehr als noch vor fünf Jahren. Die Forscher fordern, Medienkompetenz stärker im Unterricht zu verankern, warnen aber zugleich vor pauschalen Verboten.'
        },
        {
          statement: 'Das neue Rechenzentrum wird mit Strom aus Kohlekraftwerken betrieben.',
          answer: false,
          audio:
            'Wirtschaftsnachrichten aus der Region: In Erfurt ist heute eines der größten Rechenzentren Deutschlands eröffnet worden. Die Anlage bezieht ihren Strom vollständig aus Wind- und Sonnenenergie, und die Abwärme der Computer soll künftig ein benachbartes Schwimmbad sowie mehrere hundert Wohnungen heizen. Rund zweihundert Arbeitsplätze sind durch das Projekt entstanden.'
        },
        {
          statement: 'Der Start der Trägerrakete wurde verschoben.',
          answer: true,
          audio:
            'Meldung aus der Raumfahrt: Der für heute Nacht geplante Start der europäischen Trägerrakete mit zwei Forschungssatelliten an Bord ist kurzfristig abgesagt worden. Wegen starker Höhenwinde über dem Weltraumbahnhof entschied die Kontrollstation, den Start um mindestens achtundvierzig Stunden zu verschieben. Die Satelliten sollen künftig die Erderwärmung in den Polarregionen beobachten.'
        },
        {
          statement: 'Der Experte hält Passwörter für überflüssig.',
          answer: false,
          audio:
            'Nach der jüngsten Welle von Betrugs-E-Mails haben wir mit dem IT-Sicherheitsexperten Dr. Halim Aydin gesprochen. Sein Rat: Verwenden Sie für jeden Dienst ein eigenes, langes Passwort und speichern Sie diese in einem Passwort-Manager. Wo immer möglich, solle man zusätzlich die Bestätigung per Handy aktivieren. Wer eine verdächtige Nachricht erhalte, solle keinesfalls auf Links klicken.'
        },
        {
          statement: 'Das Projekt mit selbstfahrenden Bussen wird auf weitere Strecken ausgeweitet.',
          answer: true,
          audio:
            'Zum Schluss eine Nachricht aus dem Verkehr: Seit einem Jahr pendelt in Monheim ein kleiner selbstfahrender Elektrobus zwischen Bahnhof und Altstadt — begleitet von einer Aufsichtsperson, aber ohne Fahrer am Steuer. Die Bilanz fällt so positiv aus, dass der Stadtrat gestern beschlossen hat, ab dem Frühjahr zwei weitere Linien mit autonomen Bussen einzurichten.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Willkommen bei „Forschung aktuell“. Mein Gast ist heute Professorin Lena Osterkamp. Sie leitet ein Institut, das künstliche Intelligenz für die Medizin entwickelt — genauer gesagt für die Augenheilkunde. Frau Osterkamp, was genau macht Ihre Software?'
        },
        {
          speaker: 'Prof. Osterkamp',
          text: 'Unser Programm analysiert Aufnahmen der Netzhaut und erkennt darauf frühe Anzeichen von Augenkrankheiten — zum Beispiel von Erkrankungen, die durch Diabetes entstehen und unbehandelt zur Erblindung führen können. Je früher man sie entdeckt, desto besser lassen sie sich behandeln.'
        },
        {
          speaker: 'Moderator',
          text: 'Heißt das, die Maschine stellt künftig die Diagnose — ganz ohne Arzt?'
        },
        {
          speaker: 'Prof. Osterkamp',
          text: 'Nein, und das ist mir wirklich wichtig: Die Software markiert auffällige Stellen und schlägt eine Einschätzung vor. Die endgültige Diagnose stellt immer eine Ärztin oder ein Arzt. Die KI ist ein zweites Paar Augen — ein sehr aufmerksames, aber eben nur ein Hilfsmittel.'
        },
        {
          speaker: 'Moderator',
          text: 'Wie bringt man einem Computer so etwas überhaupt bei?'
        },
        {
          speaker: 'Prof. Osterkamp',
          text: 'Mit sehr vielen Beispielen. Wir haben das System mit über hunderttausend Netzhautbildern trainiert, die zuvor von Fachärzten beurteilt worden waren. Inzwischen läuft die Software nicht mehr nur bei uns im Labor: Seit Januar wird sie in zwanzig Augenarztpraxen im ganzen Land erprobt.'
        },
        {
          speaker: 'Moderator',
          text: 'Und wie reagieren die Patientinnen und Patienten? Viele haben ja Vorbehalte gegenüber künstlicher Intelligenz.'
        },
        {
          speaker: 'Prof. Osterkamp',
          text: 'Das hatten wir auch erwartet — aber gerade die älteren Patienten sind erstaunlich offen. Für sie zählt vor allem, dass die Untersuchung schnell geht und nichts wehtut. Wichtig ist uns die Transparenz: Alle Bilder werden ohne Namen und Geburtsdatum gespeichert, also vollständig anonymisiert.'
        },
        {
          speaker: 'Moderator',
          text: 'Bezahlen die Krankenkassen eine solche Untersuchung eigentlich schon?'
        },
        {
          speaker: 'Prof. Osterkamp',
          text: 'Leider noch nicht, das ist im Moment unsere größte Hürde. Wir verhandeln mit mehreren Kassen, aber bis zu einer Entscheidung tragen die Praxen die Kosten selbst oder die Patienten zahlen einen kleinen Betrag dazu.'
        },
        {
          speaker: 'Moderator',
          text: 'Sie selbst sind gar keine Medizinerin, richtig?'
        },
        {
          speaker: 'Prof. Osterkamp',
          text: 'Richtig, ich habe Informatik studiert und bin über ein Praktikum in einer Augenklinik zur Medizin gekommen. In unserem Team arbeiten heute übrigens Fachleute aus elf Ländern, ungefähr die Hälfte davon Frauen — diese Mischung aus Medizin und Technik ist unsere Stärke.'
        },
        {
          speaker: 'Moderator',
          text: 'Zum Schluss ein Blick nach vorn: Was kommt als Nächstes?'
        },
        {
          speaker: 'Prof. Osterkamp',
          text: 'Wir übertragen das Verfahren gerade auf die Haut: Künftig soll das Programm auch bei der Früherkennung von Hautkrebs helfen. Wenn die Studien gut verlaufen, könnte diese Anwendung in etwa drei Jahren in die Praxen kommen.'
        },
        {
          speaker: 'Moderator',
          text: 'Frau Professorin Osterkamp, herzlichen Dank für das Gespräch!'
        }
      ],
      statements: [
        {
          statement: 'Die Software von Frau Osterkamp soll Augenkrankheiten frühzeitig erkennen.',
          answer: true
        },
        {
          statement: 'Die endgültige Diagnose stellt weiterhin eine Ärztin oder ein Arzt.',
          answer: true
        },
        { statement: 'Das Programm wurde mit einigen hundert Bildern trainiert.', answer: false },
        { statement: 'Die Software wird bereits in Arztpraxen getestet.', answer: true },
        {
          statement: 'Ältere Patientinnen und Patienten lehnen die neue Untersuchung meistens ab.',
          answer: false
        },
        { statement: 'Die Bilder werden ohne persönliche Daten gespeichert.', answer: true },
        { statement: 'Die Krankenkassen übernehmen die Kosten der Untersuchung bereits.', answer: false },
        { statement: 'Frau Osterkamp hat Informatik studiert.', answer: true },
        { statement: 'Im Team des Instituts arbeiten ausschließlich Männer.', answer: false },
        {
          statement: 'Künftig soll das Programm auch bei der Früherkennung von Hautkrebs eingesetzt werden.',
          answer: true
        }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf kurze Durchsagen und Mitteilungen. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Sonderausstellung kann nur mit einer Führung besichtigt werden.',
          answer: false,
          audio:
            'Liebe Besucherinnen und Besucher des Technikmuseums, herzlich willkommen! Ab heute zeigen wir die Sonderausstellung „Künstliche Intelligenz — Fluch oder Segen?“ im zweiten Obergeschoss. Sie können die Ausstellung selbstverständlich auf eigene Faust erkunden; zusätzlich bieten wir zu jeder vollen Stunde kostenlose Führungen an. Treffpunkt ist das Foyer am Haupteingang.'
        },
        {
          statement: 'Ein Fahrzeug blockiert eine Feuerwehrzufahrt.',
          answer: true,
          audio:
            'Achtung, eine wichtige Durchsage für unsere Messegäste: Der Halter des blauen Kombis mit dem Kennzeichen M-TR 4382 wird gebeten, sein Fahrzeug umgehend umzuparken. Der Wagen steht vor Halle sechs in einer Feuerwehrzufahrt und muss sofort entfernt werden, andernfalls wird er kostenpflichtig abgeschleppt. Vielen Dank für Ihr Verständnis.'
        },
        {
          statement: 'Der Vortrag über Robotik fällt heute aus.',
          answer: false,
          audio:
            'Eine Information für alle Gäste der Kinderuni: Der Vortrag „Wie lernen Roboter?“ von Professor Brandt findet statt — allerdings nicht wie angekündigt im Hörsaal drei. Wegen der großen Nachfrage wurde die Veranstaltung in das Audimax im Hauptgebäude verlegt. Der Beginn bleibt unverändert um siebzehn Uhr. Es sind noch ausreichend Plätze frei.'
        },
        {
          statement: 'Im Zug funktioniert das Internet zurzeit nicht.',
          answer: true,
          audio:
            'Meine Damen und Herren, hier spricht Ihr Zugbegleiter. Leider ist das WLAN in diesem Zug aufgrund einer technischen Störung derzeit nicht verfügbar. Unsere Techniker arbeiten an dem Problem; wir können Ihnen jedoch nicht zusagen, dass die Verbindung vor Hannover wiederhergestellt wird. Wir bitten, die Unannehmlichkeiten zu entschuldigen.'
        },
        {
          statement: 'Für die spätere Vorstellung im Planetarium gibt es noch Karten.',
          answer: true,
          audio:
            'Verehrte Gäste, eine Mitteilung der Abendkasse: Die Vorstellung „Reise durch das Sonnensystem“ um neunzehn Uhr ist leider ausverkauft. Für die Zusatzvorstellung um einundzwanzig Uhr sind an der Kasse sowie online noch Karten erhältlich. Inhaberinnen und Inhaber von Karten für neunzehn Uhr bitten wir, den Saal über den linken Eingang zu betreten.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Schreiben Sie eine halbformelle E-Mail und gehen Sie auf alle vier Leitpunkte ein. Achten Sie auf eine passende Anrede und einen passenden Gruß.',
    tasks: [
      {
        titel: 'Leserbrief: Künstliche Intelligenz in der Schule',
        situation:
          'In einer Zeitung haben Sie den Artikel „Künstliche Intelligenz gehört ins Klassenzimmer — je früher, desto besser“ gelesen. Sie haben dazu eine klare Meinung. Schreiben Sie einen Leserbrief an die Redaktion.',
        leitpunkte: [
          'Erklären Sie, warum Sie schreiben und wie Ihre Position ist.',
          'Begründen Sie Ihre Meinung mit Beispielen oder Erfahrungen.',
          'Gehen Sie auf ein Argument des Artikels ein.',
          'Machen Sie einen eigenen Vorschlag, wie Schulen mit KI umgehen sollten.'
        ],
        musterloesung: `Betreff: Leserbrief zum Artikel „Künstliche Intelligenz gehört ins Klassenzimmer“ vom 12. April

Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihren Artikel über künstliche Intelligenz im Unterricht gelesen. Als Mutter zweier Schulkinder möchte ich der Begeisterung des Autors jedoch in einem Punkt widersprechen.

Selbstverständlich müssen Schulen auf die digitale Zukunft vorbereiten, und ein Verbot von KI-Programmen wäre weltfremd. Der Artikel übersieht aber, dass viele Schülerinnen und Schüler solche Programme bereits jetzt nutzen, um Hausaufgaben erledigen zu lassen — gelernt wird dabei wenig. Mein Sohn gab offen zu, seine letzte Buchvorstellung vollständig von einem Programm geschrieben zu haben.

Statt Technik unkritisch zu feiern, sollten Schulen deshalb zuerst den bewussten Umgang damit vermitteln: Wie erkenne ich Fehler in KI-Texten? Wann darf ich Hilfsmittel verwenden — und wann schade ich mir selbst? Dafür brauchen vor allem die Lehrkräfte verpflichtende Fortbildungen, bevor neue Programme eingeführt werden.

Ich würde mich freuen, wenn Ihre Zeitung auch diese kritische Perspektive stärker berücksichtigen würde.

Mit freundlichen Grüßen
Daniela Petzold`
      }
    ],
    tipps:
      'Beim Leserbrief gehören der Bezug auf den Artikel, eine klare Position und ein eigenes Argument dazu. Nutzen Sie Konnektoren (aber, deshalb, statt … zu). Gehen Sie auf alle vier Leitpunkte ein und prüfen Sie am Ende: Zielumfang etwa 150–220 Wörter, passende Anrede und Grußformel.'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Über Erfahrungen sprechen',
      anweisung:
        'Erzählen Sie Ihrer Partnerin / Ihrem Partner von einer eigenen Erfahrung zum Thema „Eine technische Entwicklung, die meinen Alltag verändert hat“ (ca. 2,5 Minuten pro Person). Gehen Sie auf die Punkte ein und reagieren Sie anschließend auf die Fragen Ihres Partners.',
      punkte: [
        'Beschreiben Sie, wie Sie diese technische Entwicklung zum ersten Mal genutzt haben.',
        'Erzählen Sie, was sich dadurch in Ihrem Alltag konkret verändert hat.',
        'Berichten Sie von einer Schattenseite oder einem Risiko, das Sie dabei erlebt haben.',
        'Sagen Sie, ob Sie darauf wieder verzichten möchten.'
      ],
      redemittel: [
        'Ich möchte euch/Ihnen von einer Erfahrung erzählen, bei der …',
        'Bei mir war das so: …',
        'Aus meiner Erfahrung …',
        'Früher musste ich …, heute dagegen …',
        'Rückblickend würde ich sagen, dass …',
        'Habt ihr/Haben Sie das auch schon einmal erlebt?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Diskussion',
      anweisung:
        'Sie haben folgende Schlagzeile gelesen: „Künstliche Intelligenz macht Hausaufgaben wertlos — Schulen müssen ihre Prüfungen völlig neu denken.“ Diskutieren Sie mit Ihrer Partnerin / Ihrem Partner: Stimmen Sie zu? Begründen Sie Ihre Meinung und reagieren Sie auf die Argumente der anderen Seite.',
      punkte: [
        'Formulieren Sie Ihre Position klar.',
        'Begründen Sie mit Beispielen oder Erfahrungen.',
        'Gehen Sie auf die Argumente Ihrer Partnerin / Ihres Partners ein.',
        'Finden Sie zum Schluss eine gemeinsame Einschätzung.'
      ],
      redemittel: [
        'Ich bin davon überzeugt, dass …',
        'Dem kann ich nur teilweise zustimmen, denn …',
        'Man darf allerdings nicht vergessen, dass …',
        'Ein Beispiel dafür ist …',
        'Da haben Sie recht, aber …',
        'Können wir uns darauf einigen, dass …?'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Ihr Stadtteilzentrum möchte einen „Technik-Nachmittag“ für Seniorinnen und Senioren anbieten, bei dem Freiwillige beim Umgang mit Smartphone und Computer helfen. Sie beide sollen die Veranstaltung organisieren. Planen Sie gemeinsam.',
      punkte: [
        'Welche Themen und Hilfsangebote soll es geben?',
        'Wie finden Sie Freiwillige, die ihr Wissen weitergeben?',
        'Wie machen Sie die Veranstaltung bei der Zielgruppe bekannt?',
        'Wie stellen Sie fest, ob der Nachmittag ein Erfolg war und wiederholt werden soll?'
      ],
      redemittel: [
        'Ich schlage vor, dass wir zunächst …',
        'Wäre es nicht sinnvoll, wenn …?',
        'Das könnte ich übernehmen. / Darum könnten Sie sich kümmern.',
        'Einverstanden, aber wir sollten auch an … denken.',
        'Lassen Sie uns festhalten: …',
        'Dann fassen wir zusammen, wer was macht.'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
