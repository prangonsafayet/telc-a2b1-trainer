import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 1,
  level: 'b2',
  title: 'Modelltest 1',
  theme: 'Arbeitswelt im Wandel',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Vier-Tage-Woche: Pilotprojekt übertrifft Erwartungen',
        'Immer mehr Beschäftigte wechseln in die Selbstständigkeit',
        'Fachkräftemangel: Betriebe werben im Ausland um Personal',
        'Studie: Großraumbüros senken die Produktivität',
        'Künstliche Intelligenz verändert die Bewerbungsverfahren',
        'Weiterbildung wird zur Pflicht: Neue Regelung beschlossen',
        'Burn-out: Krankenkassen melden Rekordzahlen',
        'Tarifabschluss: Mehr Lohn für das Reinigungspersonal',
        'Homeoffice-Streit: Konzern holt Mitarbeiter zurück ins Büro',
        'Ehrenamt statt Ruhestand: Senioren gründen Hilfsnetzwerk'
      ],
      texts: [
        'Wer sich heute auf eine Stelle bewirbt, hat es zunehmend nicht mehr mit Menschen zu tun: Immer mehr Unternehmen lassen die eingehenden Unterlagen zunächst von Algorithmen vorsortieren, manche führen sogar das erste Gespräch per Chatbot. Befürworter versprechen sich davon objektivere Entscheidungen, Kritiker warnen vor undurchsichtigen Kriterien, gegen die sich abgelehnte Bewerber kaum wehren können.',
        'Sechs Monate lang hatten fünfzig Unternehmen ihren Beschäftigten bei vollem Lohn einen zusätzlichen freien Tag gewährt. Das Ergebnis überrascht selbst die Initiatoren: Die Produktivität blieb nicht nur stabil, sie stieg in den meisten Betrieben sogar leicht an, während sich Krankmeldungen deutlich verringerten. Neun von zehn beteiligten Firmen wollen das Modell nun dauerhaft beibehalten.',
        'Ob in der Pflege, im Handwerk oder in der Gastronomie — vielerorts bleiben Stellen monatelang unbesetzt. Zahlreiche Betriebe suchen deshalb inzwischen gezielt in Südeuropa, Asien und Lateinamerika nach Personal und unterstützen die neuen Beschäftigten bei Behördengängen, Sprachkursen und der Wohnungssuche. Ohne Zuwanderung, so warnen Wirtschaftsverbände, lasse sich der Bedarf nicht mehr decken.',
        'Nach Jahren großzügiger Regelungen zieht ein Münchner Technologiekonzern die Zügel wieder an: Ab Januar müssen die Beschäftigten an mindestens vier Tagen pro Woche im Büro erscheinen. Die Geschäftsleitung begründet den Schritt mit nachlassendem Teamgeist, der Betriebsrat spricht dagegen von einem Vertrauensbruch und kündigt Widerstand an — zumal viele Beschäftigte wegen der bisherigen Freiheit weite Arbeitswege in Kauf genommen hatten.',
        'Die Zahl der Arbeitnehmerinnen und Arbeitnehmer, die wegen seelischer Erschöpfung längere Zeit ausfallen, hat einen neuen Höchststand erreicht. Nach Angaben mehrerer Versicherungen haben sich die Fehltage aufgrund psychischer Erkrankungen innerhalb von zehn Jahren fast verdoppelt. Fachleute machen dafür vor allem ständige Erreichbarkeit und wachsenden Zeitdruck verantwortlich.'
      ],
      answers: [4, 0, 2, 8, 6]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Kündigen für den Neuanfang',
      text: `Lena Hartmann galt als Musterbeispiel einer gelungenen Karriere: Mit 34 Jahren leitete sie die Marketingabteilung eines internationalen Konsumgüterkonzerns, verdiente überdurchschnittlich und hatte gerade eine weitere Beförderung in Aussicht. Umso größer war das Unverständnis, als sie vor zwei Jahren kündigte — ohne eine neue Stelle zu haben.

„Ich habe irgendwann gemerkt, dass ich zwar erfolgreich war, aber nicht mehr wusste, wofür eigentlich“, sagt Hartmann heute. Der Gedanke an einen Ausstieg sei über Monate gereift; den letzten Anstoß habe eine Erkrankung gegeben, die sie zu einer sechswöchigen Pause zwang. In dieser Zeit habe sie zum ersten Mal seit Jahren wieder in Ruhe nachgedacht.

Hartmann ist kein Einzelfall. Arbeitspsychologen beobachten, dass vor allem gut ausgebildete Beschäftigte zwischen dreißig und vierzig ihre Prioritäten neu ordnen. Entscheidend sei dabei selten das Gehalt, betont die Forscherin Prof. Ulrike Steiner: „Die meisten wünschen sich vor allem eine Tätigkeit, deren Sinn sie erkennen — und einen Arbeitgeber, der ihre Lebenszeit respektiert.“ Unternehmen, die nur mit Geld lockten, hätten langfristig das Nachsehen.

Heute führt Hartmann gemeinsam mit einer Freundin eine kleine Agentur, die gemeinnützige Organisationen berät. Sie verdient deutlich weniger als früher und trägt mehr Verantwortung, denn von den Aufträgen hängen inzwischen vier Angestellte ab. Trotzdem bereut sie den Schritt nicht: „Ich arbeite heute eher mehr als vorher — aber zum ersten Mal habe ich das Gefühl, dass es meine eigene Zeit ist.“ Nur eines würde sie rückblickend anders machen: früher mit Kolleginnen über ihre Zweifel sprechen, statt jahrelang zu schweigen.`,
      questions: [
        {
          frage: 'Lena Hartmanns Kündigung überraschte ihr Umfeld, weil …',
          options: [
            'sie beruflich gerade sehr erfolgreich war.',
            'sie schon lange offen über ihre Unzufriedenheit sprach.',
            'sie bereits eine neue Stelle gefunden hatte.'
          ],
          answer: 0
        },
        {
          frage: 'Den letzten Anstoß zur Kündigung gab …',
          options: [
            'ein Angebot einer anderen Firma.',
            'eine längere krankheitsbedingte Auszeit.',
            'ein Streit mit ihrem Vorgesetzten.'
          ],
          answer: 1
        },
        {
          frage: 'Laut Prof. Steiner wünschen sich viele Beschäftigte vor allem …',
          options: [
            'ein deutlich höheres Gehalt.',
            'eine sinnvolle Tätigkeit und Respekt für ihre Zeit.',
            'mehr Möglichkeiten, im Ausland zu arbeiten.'
          ],
          answer: 1
        },
        {
          frage: 'Hartmanns heutige Arbeit …',
          options: [
            'bringt ihr mehr Geld als die frühere Stelle.',
            'ist mit weniger Verantwortung verbunden.',
            'ist anstrengend, fühlt sich aber selbstbestimmt an.'
          ],
          answer: 2
        },
        {
          frage: 'Rückblickend hätte Hartmann …',
          options: [
            'früher über ihre Zweifel reden sollen.',
            'den Konzern nicht verlassen sollen.',
            'die Agentur allein gründen sollen.'
          ],
          answer: 0
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Eine Bekannte möchte sich beruflich selbstständig machen und sucht kostenlose Beratung.',
        'Ihr Kollege möchte seine Präsentationstechnik auf Deutsch verbessern.',
        'Eine Freundin sucht nach der Pflege ihrer Mutter den Wiedereinstieg in den Beruf.',
        'Sie suchen für Ihr kleines Team einen externen Konferenzraum mit Technik für einen Tag.',
        'Ein Nachbar wurde gekündigt und möchte prüfen lassen, ob die Kündigung rechtens ist.',
        'Sie möchten neben dem Beruf einen anerkannten Abschluss im Bereich Buchhaltung erwerben.',
        'Eine Studentin sucht einen Nebenjob am Wochenende im Service.',
        'Ihr Betrieb sucht kurzfristig Ersatz für die erkrankte Bürokraft — nur für sechs Wochen.',
        'Ein Freund möchte herausfinden, welcher Beruf überhaupt zu ihm passt.',
        'Sie wollen Ihre Bewerbungsunterlagen professionell überarbeiten lassen.'
      ],
      ads: [
        'Kanzlei Rothe & Partner: Arbeitsrecht ist unser Schwerpunkt — Erstgespräch zur Kündigungsschutzklage innerhalb von 48 Stunden.',
        'Zeitarbeit PLUS vermittelt qualifizierte Büro- und Verwaltungskräfte — auch für kurzfristige Krankheitsvertretungen ab einer Woche.',
        'Gründerzentrum Neustadt: Kostenfreie Erstberatung für alle, die den Schritt in die Selbstständigkeit planen. Termine auch abends!',
        'IHK-Lehrgang „Geprüfte/r Finanzbuchhalter/in“: berufsbegleitend an Samstagen, staatlich anerkannter Abschluss, Start im November.',
        'Restaurant Bellevue stellt ein: Servicekräfte für Samstag/Sonntag, gern Studierende. Faire Bezahlung plus Trinkgeld.',
        'Karrierewerkstatt: Wir bringen Lebenslauf und Anschreiben auf den neuesten Stand — inklusive Foto-Beratung und Online-Profil.',
        'Rhetorikakademie: Zweitägiges Intensivtraining „Überzeugend präsentieren“ — Videoanalyse und individuelles Feedback inklusive.',
        'Coaching-Praxis Horizont: Berufliche Orientierung mit Potenzialanalyse — finden Sie heraus, welche Tätigkeit wirklich zu Ihnen passt.',
        'Tagungshaus Alte Mühle: Seminarräume für 5 bis 40 Personen, Beamer, Videokonferenztechnik und Verpflegung — tageweise buchbar.',
        'Verein Comeback e. V.: Kostenlose Kurse und Praktikumsbörse für Frauen, die nach einer Familien- oder Pflegezeit zurück in den Beruf möchten.',
        'Steuerbüro Lange sucht Auszubildende (m/w/d) für den Beruf Steuerfachangestellte — Bewerbung bis 30. September.',
        'Sprachschule Global: Einzelunterricht Business-Englisch per Video, flexible Termine für Berufstätige.'
      ],
      answers: [2, 6, 9, 8, 0, 3, 4, 1, 7, 5]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrte Frau Winter,

vielen Dank für Ihre Einladung zum Vorstellungsgespräch, [1] ich mich sehr gefreut habe. Leider muss ich Ihnen mitteilen, dass ich den vorgeschlagenen Termin aus beruflichen Gründen nicht [2] kann.

Am 14. Oktober vertrete ich meine Kollegin, [3] sich zurzeit im Mutterschutz befindet, auf einer Fachtagung in Hamburg. Diese Verpflichtung wurde bereits vor mehreren Monaten [4], sodass ich sie nicht mehr verschieben kann.

[5] wäre ich Ihnen sehr dankbar, wenn Sie mir einen Ausweichtermin anbieten könnten. In der darauffolgenden Woche bin ich zeitlich völlig flexibel und könnte [6] kurzfristig zu Ihnen kommen. Sollte ein persönliches Treffen schwierig sein, stehe ich selbstverständlich auch für ein Gespräch per Video zur [7].

Ich möchte betonen, dass mein Interesse an der ausgeschriebenen Stelle [8] groß ist. Gerade die Möglichkeit, Verantwortung für ein eigenes Projekt zu [9], reizt mich an Ihrem Angebot besonders.

Ich danke Ihnen für Ihr Verständnis und hoffe, Sie bald persönlich kennenzulernen. Über eine kurze Rückmeldung würde ich mich sehr [10].

Mit freundlichen Grüßen
Selin Aydin`,
      gaps: [
        { options: ['worüber', 'über die', 'darüber'], answer: 1 },
        { options: ['wahrnehmen', 'annehmen', 'unternehmen'], answer: 0 },
        { options: ['deren', 'die', 'der'], answer: 1 },
        { options: ['zusagt', 'zugesagt', 'zusagen'], answer: 1 },
        { options: ['Trotzdem', 'Deshalb', 'Außerdem'], answer: 1 },
        { options: ['auch', 'noch', 'schon'], answer: 0 },
        { options: ['Verfügung', 'Auswahl', 'Bedingung'], answer: 0 },
        { options: ['unverändert', 'unbedingt', 'unerwartet'], answer: 0 },
        { options: ['übergeben', 'übernehmen', 'unternehmen'], answer: 1 },
        { options: ['freuen', 'bedanken', 'interessieren'], answer: 0 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

am 12. März habe ich in Ihrem Online-Shop einen Bürostuhl (Modell „Ergo Comfort“) bestellt, der laut Ihrer [1] besonders für langes Arbeiten am Schreibtisch geeignet sein soll. Die Lieferung erfolgte zwar [2], doch leider musste ich schon nach wenigen Tagen feststellen, dass die Rückenlehne sich nicht mehr [3] lässt.

Ich habe daraufhin mehrfach versucht, Ihren Kundendienst telefonisch zu [4] — ohne Erfolg. Auf meine E-Mail vom 20. März habe ich bis heute keine [5] erhalten. Dieses Verhalten bin ich von Ihrem Unternehmen nicht [6].

Ich fordere Sie daher auf, den Stuhl [7] von vierzehn Tagen zu reparieren oder mir ein neues Gerät zu liefern. [8] behalte ich mir vor, vom Kauf zurückzutreten und den Kaufpreis zurückzuverlangen. Nach dem Gesetz steht mir dieses Recht ausdrücklich [9].

Ich hoffe dennoch auf eine schnelle und kundenfreundliche [10] und verbleibe

mit freundlichen Grüßen
Martin Krause`,
      wordBank: [
        'Andernfalls',
        'Antwort',
        'Beschreibung',
        'dagegen',
        'erreichen',
        'gewohnt',
        'innerhalb',
        'Lösung',
        'pünktlich',
        'Rechnung',
        'trotzdem',
        'verstellen',
        'vorbei',
        'zu',
        'zuständig'
      ],
      answers: [2, 8, 11, 4, 1, 5, 6, 0, 13, 7]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Bahnbeschäftigten wollen kommende Woche die Arbeit niederlegen.',
          answer: true,
          audio:
            'Und nun die Nachrichten. Im Tarifstreit bei der Bahn haben die Gewerkschaften die Verhandlungen für gescheitert erklärt. Für Dienstag und Mittwoch kommender Woche kündigten sie bundesweite Warnstreiks im Personenverkehr an. Die Bahn kritisierte die Ankündigung als unverhältnismäßig und rief die Gewerkschaften an den Verhandlungstisch zurück.'
        },
        {
          statement: 'Die Zahl der Ausbildungsplätze ist im Vergleich zum Vorjahr gesunken.',
          answer: false,
          audio:
            'Gute Nachrichten vom Ausbildungsmarkt: Nach Angaben der Arbeitsagentur bieten die Betriebe in diesem Jahr rund fünf Prozent mehr Lehrstellen an als im Vorjahr. Dennoch bleiben viele Plätze unbesetzt, weil Bewerber und Betriebe oft nicht zueinanderfinden. Besonders gesucht sind Auszubildende im Handwerk und in der Pflege.'
        },
        {
          statement: 'Wegen des Unwetters bleiben morgen in der Region alle Schulen geschlossen.',
          answer: true,
          audio:
            'Achtung, eine aktuelle Meldung: Der Deutsche Wetterdienst warnt für die Nacht und den morgigen Tag vor einem schweren Sturm mit Orkanböen. Die Bezirksregierung hat entschieden, dass morgen sämtliche Schulen der Region geschlossen bleiben. Eltern werden gebeten, ihre Kinder zu Hause zu betreuen. Der Unterricht soll am Donnerstag wieder regulär stattfinden.'
        },
        {
          statement: 'Die Museumsnacht findet dieses Jahr zum ersten Mal statt.',
          answer: false,
          audio:
            'Kulturtipp für das Wochenende: Am Samstag lädt unsere Stadt bereits zum fünfzehnten Mal zur Langen Nacht der Museen ein. Über dreißig Häuser öffnen bis zwei Uhr morgens ihre Türen, ein Shuttlebus verbindet alle Stationen. Das vollständige Programm finden Sie auf der Internetseite der Stadt.'
        },
        {
          statement: 'Der Ökonom rechnet damit, dass die Preise für Lebensmittel weiter steigen.',
          answer: true,
          audio:
            'Zum Abschluss ein Blick auf die Wirtschaft: Die Inflation hat sich zwar insgesamt abgeschwächt, doch beim Wocheneinkauf spüren die Verbraucher davon wenig. Der Ökonom Professor Wenzel erklärte heute im Interview, gerade bei Lebensmitteln sei in den kommenden Monaten mit weiter steigenden Preisen zu rechnen — unter anderem wegen der schlechten Ernte in Südeuropa.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Herzlich willkommen zu „Wirtschaft am Morgen“. Zu Gast ist heute Dr. Miriam Falk, Personalchefin eines mittelständischen Maschinenbauers mit rund achthundert Beschäftigten. Frau Falk, Ihr Unternehmen hat die Bewerbungsverfahren radikal umgebaut. Was hat Sie dazu gebracht?'
        },
        {
          speaker: 'Dr. Falk',
          text: 'Ganz ehrlich: die Not. Vor drei Jahren blieben bei uns im Schnitt vierzig Stellen unbesetzt, vor allem in der Produktion und in der IT. Wir haben gemerkt: Mit Anzeigen und dem klassischen Anschreiben erreichen wir die Leute einfach nicht mehr.'
        },
        {
          speaker: 'Moderator',
          text: 'Was haben Sie konkret geändert?'
        },
        {
          speaker: 'Dr. Falk',
          text: 'Dreierlei. Erstens verzichten wir vollständig auf das Anschreiben — ein Lebenslauf genügt, und den kann man bei uns auch per Handy hochladen, in fünf Minuten. Zweitens antworten wir jeder Bewerberin und jedem Bewerber innerhalb von achtundvierzig Stunden. Und drittens laden wir zu einem Probearbeitstag ein, bevor wir entscheiden.'
        },
        {
          speaker: 'Moderator',
          text: 'Ein Probearbeitstag — ist das nicht aufwendig?'
        },
        {
          speaker: 'Dr. Falk',
          text: 'Doch, natürlich. Aber er zahlt sich aus, und zwar für beide Seiten. Die Kandidaten sehen ehrlich, wie es bei uns zugeht, und das Team hat ein Mitspracherecht. Seitdem kündigt kaum noch jemand in der Probezeit — vorher haben wir fast jeden fünften neuen Mitarbeiter im ersten halben Jahr wieder verloren.'
        },
        {
          speaker: 'Moderator',
          text: 'Sie bilden auch Menschen aus, die gar keine passende Ausbildung mitbringen. Wie funktioniert das?'
        },
        {
          speaker: 'Dr. Falk',
          text: 'Wir nennen das Quereinsteiger-Programm. Wer Motivation und technisches Grundverständnis mitbringt, bekommt bei uns eine bezahlte sechsmonatige Qualifizierung mit Abschlussprüfung. Fast die Hälfte unserer neuen Produktionskräfte kommt inzwischen auf diesem Weg — darunter eine ehemalige Friseurin, die heute unsere beste Maschinenführerin ist.'
        },
        {
          speaker: 'Moderator',
          text: 'Und die Kosten?'
        },
        {
          speaker: 'Dr. Falk',
          text: 'Das Programm kostet uns pro Person ungefähr so viel wie ein halbes Jahr Personalsuche über eine Agentur. Nur dass am Ende jemand da ist, der bleibt. Übrigens beteiligt sich auch die Arbeitsagentur an den Kosten — das wissen viele Betriebe gar nicht.'
        },
        {
          speaker: 'Moderator',
          text: 'Zum Schluss: Was raten Sie anderen Unternehmen?'
        },
        {
          speaker: 'Dr. Falk',
          text: 'Hört auf, perfekte Lebensläufe zu suchen. Die gibt es nicht mehr. Sucht Menschen, die lernen wollen, und behandelt Bewerber so respektvoll wie Kunden. Wer erst nach sechs Wochen antwortet, braucht sich über Absagen nicht zu wundern.'
        },
        {
          speaker: 'Moderator',
          text: 'Frau Dr. Falk, herzlichen Dank für diese Einblicke!'
        }
      ],
      statements: [
        {
          statement:
            'Das Unternehmen von Frau Falk hatte früher Schwierigkeiten, offene Stellen zu besetzen.',
          answer: true
        },
        { statement: 'Bewerber müssen bei der Firma weiterhin ein Anschreiben einreichen.', answer: false },
        { statement: 'Eine Bewerbung ist auch über das Smartphone möglich.', answer: true },
        { statement: 'Bewerber erhalten spätestens nach zwei Tagen eine Antwort.', answer: true },
        {
          statement: 'Der Probearbeitstag wurde wegen des hohen Aufwands wieder abgeschafft.',
          answer: false
        },
        {
          statement: 'Früher verließ etwa jeder fünfte neue Mitarbeiter die Firma noch in der Probezeit.',
          answer: true
        },
        { statement: 'Das Quereinsteiger-Programm dauert zwei Jahre.', answer: false },
        { statement: 'Ungefähr die Hälfte der neuen Produktionskräfte sind Quereinsteiger.', answer: true },
        { statement: 'Die Arbeitsagentur übernimmt einen Teil der Programmkosten.', answer: true },
        {
          statement:
            'Frau Falk empfiehlt anderen Firmen, nur Bewerber mit perfektem Lebenslauf einzustellen.',
          answer: false
        }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf kurze Durchsagen und Mitteilungen. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Teilnehmer des Seminars sollen in einen anderen Raum gehen.',
          answer: true,
          audio:
            'Eine Durchsage für die Teilnehmerinnen und Teilnehmer des Seminars „Projektmanagement kompakt“: Wegen eines Wasserschadens kann der Kurs heute nicht wie geplant im Raum 204 stattfinden. Bitte begeben Sie sich stattdessen in den Konferenzsaal im Erdgeschoss, gleich rechts neben dem Empfang. Der Beginn verschiebt sich um fünfzehn Minuten.'
        },
        {
          statement: 'Das Parkhaus am Bahnhof ist am Wochenende kostenlos.',
          answer: false,
          audio:
            'Hinweis für alle Autofahrer: Das Parkhaus am Bahnhof ist wegen Wartungsarbeiten am kommenden Wochenende komplett gesperrt. Bitte nutzen Sie ersatzweise die Tiefgarage am Theaterplatz; dort gilt am Samstag und Sonntag der reguläre Tarif von zwei Euro pro Stunde. Ab Montag früh steht Ihnen das Parkhaus wie gewohnt zur Verfügung.'
        },
        {
          statement: 'Der Fernzug nach Berlin hält heute nicht an allen Bahnhöfen.',
          answer: true,
          audio:
            'Information zu Ihrer Reise: Der Intercity-Express nach Berlin, Abfahrt sechzehn Uhr zwanzig, kann wegen einer Signalstörung heute nicht in Braunschweig und Wolfsburg halten. Reisende in diese Städte nutzen bitte den Regionalexpress um sechzehn Uhr fünfunddreißig von Gleis neun. Wir bitten, die Unannehmlichkeiten zu entschuldigen.'
        },
        {
          statement: 'Die Apotheke im Einkaufszentrum bleibt während des Umbaus geschlossen.',
          answer: false,
          audio:
            'Liebe Kundinnen und Kunden, unsere Apotheke im Untergeschoss wird ab Montag modernisiert. Während des Umbaus sind wir selbstverständlich weiter für Sie da: Sie finden uns vorübergehend im ersten Obergeschoss neben der Buchhandlung — mit den gewohnten Öffnungszeiten. Wir danken für Ihr Verständnis.'
        },
        {
          statement: 'Interessierte können sich noch für die Führung am Nachmittag anmelden.',
          answer: true,
          audio:
            'Meine Damen und Herren, willkommen auf der Berufsmesse! Um fünfzehn Uhr beginnt unsere geführte Tour zu den Ausbildungsbetrieben der Region — Treffpunkt ist der Informationsstand in Halle zwei. Einige Plätze sind noch frei; eine Anmeldung ist bis vierzehn Uhr dreißig direkt am Stand möglich. Die Teilnahme ist kostenlos.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Schreiben Sie eine halbformelle E-Mail (150–220 Wörter) und gehen Sie auf alle vier Leitpunkte ein. Achten Sie auf eine passende Anrede und einen passenden Gruß.',
    tasks: [
      {
        titel: 'Anfrage: Betriebliche Weiterbildung',
        situation:
          'Ihre Firma bietet an, Weiterbildungen finanziell zu unterstützen. Sie möchten einen berufsbegleitenden Kurs besuchen. Schreiben Sie an die Personalabteilung.',
        leitpunkte: [
          'Erklären Sie, welchen Kurs Sie besuchen möchten und warum.',
          'Beschreiben Sie, welchen Nutzen die Firma davon hätte.',
          'Fragen Sie nach der Höhe der finanziellen Unterstützung.',
          'Bitten Sie um ein persönliches Gespräch.'
        ],
        musterloesung: `Betreff: Unterstützung einer berufsbegleitenden Weiterbildung

Sehr geehrte Frau Winter,

wie ich dem Intranet entnommen habe, unterstützt unser Unternehmen berufsbegleitende Weiterbildungen von Mitarbeitenden finanziell. Deshalb wende ich mich heute mit einem konkreten Anliegen an Sie.

Ich arbeite seit vier Jahren im Kundenservice und möchte ab Januar den IHK-Lehrgang „Projektmanagement“ besuchen, der samstags stattfindet und sechs Monate dauert. In unserer Abteilung werden Projekte immer wichtiger, jedoch fehlt es bisher an entsprechend geschulten Mitarbeiterinnen und Mitarbeitern.

Von der Weiterbildung würde also nicht nur ich profitieren: Ich könnte künftig kleinere Projekte selbstständig leiten und Kollegen einarbeiten, wodurch externe Berater eingespart werden könnten. Außerdem würde ich mein neues Wissen in einer kurzen internen Schulung an mein Team weitergeben.

Daher möchte ich fragen, in welcher Höhe sich die Firma an den Kursgebühren von 1.800 Euro beteiligen würde und ob dafür auch Sonderurlaub vorgesehen ist. Über ein persönliches Gespräch, gern auch kurzfristig, würde ich mich sehr freuen.

Vielen Dank im Voraus für Ihre Mühe und Ihre Rückmeldung.

Mit freundlichen Grüßen
Selin Aydin`
      }
    ],
    tipps:
      'Eine halbformelle Anfrage bleibt höflich und konkret: Nutzen Sie den Konjunktiv II für Fragen und Bitten („Ich würde gern wissen, ob …“, „Könnten Sie mir sagen, …?“). Gehen Sie auf alle vier Leitpunkte ein und schließen Sie mit einer klaren Bitte. Prüfen Sie am Ende: 150–220 Wörter, passende Anrede und Grußformel.'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Über Erfahrungen sprechen',
      anweisung:
        'Erzählen Sie Ihrer Partnerin / Ihrem Partner von einer eigenen Erfahrung zum Thema „Ein Beruf, der mich beeindruckt hat“ (ca. 2,5 Minuten). Gehen Sie auf die Punkte ein und reagieren Sie anschließend auf die Fragen Ihres Partners.',
      punkte: [
        'Beschreiben Sie, wie und wo Sie diesen Beruf kennengelernt haben.',
        'Erzählen Sie, was genau passiert ist und was Sie daran beeindruckt hat.',
        'Sagen Sie, wie Sie sich dabei gefühlt haben.',
        'Vergleichen Sie kurz: Wie wird dieser Beruf in Ihrem Heimatland gesehen?'
      ],
      redemittel: [
        'Ich möchte euch/Ihnen von einer Erfahrung erzählen, bei der …',
        'Bei mir war das so: …',
        'Aus meiner Erfahrung kann ich sagen, dass …',
        'Besonders beeindruckt hat mich, dass …',
        'Rückblickend würde ich sagen, dass …',
        'Habt ihr/Haben Sie so etwas auch schon erlebt?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Diskussion',
      anweisung:
        'Sie haben folgende Schlagzeile gelesen: „Firmen sollten Bewerber ohne Lebenslauf einstellen — die Probezeit zeigt, wer wirklich passt.“ Diskutieren Sie mit Ihrer Partnerin / Ihrem Partner: Stimmen Sie zu? Begründen Sie Ihre Meinung und reagieren Sie auf die Argumente der anderen Seite.',
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
        'Aus meiner Sicht überwiegen die Vorteile/Nachteile, weil …',
        'Da haben Sie recht, aber …',
        'Können wir uns darauf einigen, dass …?'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Ihre Abteilung bekommt drei neue Kolleginnen und Kollegen aus dem Ausland. Planen Sie gemeinsam, wie Sie den neuen Mitarbeitenden den Start erleichtern können.',
      punkte: [
        'Wie sollen die neuen Kollegen am ersten Tag empfangen werden?',
        'Wer übernimmt welche Aufgaben (Einarbeitung, Rundgang, Pate)?',
        'Welche Unterstützung außerhalb der Arbeit ist sinnvoll (Wohnung, Sprache, Behörden)?',
        'Wie stellen Sie fest, ob sich die neuen Kollegen gut eingelebt haben?'
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
