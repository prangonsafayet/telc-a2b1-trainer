import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 4,
  level: 'b1',
  title: 'Modelltest 4',
  theme: 'Wohnen & Nachbarschaft',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Streit um Lärm: Wenn Nachbarn vor Gericht ziehen',
        'Neues Wohnprojekt: Jung und Alt unter einem Dach',
        'Stadt fördert Solaranlagen auf dem Balkon',
        'Einbrüche im Herbst: So schützen Sie Ihre Wohnung',
        'Immer mehr Menschen leben allein',
        'Nachbarschaftsfest bricht Besucherrekord',
        'Gärtnern ohne eigenen Garten: Hochbeete für alle',
        'Wohnungssuche: Tipps für die perfekte Bewerbung',
        'Handwerker verzweifelt gesucht: Kunden warten monatelang',
        'Tauschbörse im Stadtteil: Bücher gegen Blumen'
      ],
      texts: [
        'In der Gartenstadt ist ein besonderes Haus fertig geworden: Dort wohnen Studierende, Familien und Senioren bewusst zusammen. Die Älteren passen auf die Kinder auf, die Jüngeren helfen beim Einkaufen oder erklären das Smartphone. Einmal pro Woche kochen alle gemeinsam im Gemeinschaftsraum. Die Warteliste für die Wohnungen ist bereits lang.',
        'Ein tropfender Wasserhahn, ein kaputtes Dach: Wer heute einen Handwerksbetrieb braucht, muss oft viele Wochen oder sogar Monate warten. Den Betrieben fehlen Fachkräfte, denn zu wenige junge Leute beginnen eine Lehre. Die Handwerkskammer wirbt deshalb jetzt an Schulen und verspricht: Wer heute eine Ausbildung anfängt, muss sich um Arbeit nie Sorgen machen.',
        'Im Herbst, wenn es früh dunkel wird, steigt die Zahl der Wohnungseinbrüche. Die Polizei rät: Schließen Sie die Haustür immer zweimal ab, und kippen Sie die Fenster nicht, wenn niemand zu Hause ist. Licht mit Zeitschaltuhr hilft ebenfalls. Wer verdächtige Personen im Haus bemerkt, sollte sofort die Nummer einhundertzehn anrufen.',
        'Noch nie haben in Deutschland so viele Menschen allein gewohnt wie heute: Fast jeder fünfte Einwohner lebt in einem Einpersonenhaushalt, in Großstädten sogar fast jeder dritte. Die Gründe sind unterschiedlich — Studium, Trennung oder der Tod des Partners. Fachleute warnen, dass besonders ältere Alleinlebende häufig einsam sind, und fordern mehr Treffpunkte in den Vierteln.',
        'Frische Kräuter und eigene Tomaten mitten in der Stadt? Das geht auch ohne eigenen Garten. Auf dem Alten Marktplatz stehen seit diesem Frühjahr zwanzig Hochbeete aus Holz, die sich Bewohnerinnen und Bewohner teilen. Die Stadt stellt Erde und Wasser, gegossen wird gemeinsam. Wer mitmachen will, meldet sich einfach im Stadtteilbüro an.'
      ],
      answers: [1, 8, 3, 4, 6]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Die Nachbarn sind nur einen Klick entfernt',
      text: `Früher klingelte man beim Nachbarn, wenn man Eier oder eine Bohrmaschine brauchte. In vielen Großstädten kennt man heute jedoch nicht einmal die Namen der Menschen im eigenen Haus. Zwei Studenten aus Köln wollten das ändern — und gründeten vor fünf Jahren die Internetplattform „Nebenan-Netz“.

Die Idee ist einfach: Wer sich anmeldet, gibt seine Adresse an und sieht dann nur Nachrichten aus dem eigenen Stadtviertel. Dort bitten Nachbarn um Hilfe oder bieten etwas an: Die eine sucht jemanden, der ihre Blumen gießt, der andere verschenkt ein Sofa oder organisiert einen Spieleabend. Für Privatpersonen ist die Plattform kostenlos; Geld verdient die Firma durch Anzeigen von Geschäften aus dem Viertel.

Inzwischen nutzen fast zwei Millionen Menschen das Angebot. Eine von ihnen ist Ruth Krause, 78, aus Dortmund. Nach einer Operation konnte sie ihren geliebten Garten nicht mehr allein pflegen. Über die Plattform fand sie einen Studenten, der nun jede Woche hilft. „Aus der Gartenhilfe ist eine echte Freundschaft geworden“, erzählt sie. „Er bleibt fast immer noch auf einen Kaffee.“

Perfekt ist das Netz trotzdem nicht. Auf dem Land, wo Hilfe oft am dringendsten gebraucht wird, machen bisher nur wenige Menschen mit. Die Gründer arbeiten deshalb jetzt mit Gemeinden zusammen, die das Angebot vor Ort bekannt machen sollen. Ihr Ziel klingt altmodisch und modern zugleich: dass Nachbarn einander wieder helfen — auch wenn der erste Kontakt über das Internet entsteht.`,
      questions: [
        {
          frage: 'Die Plattform „Nebenan-Netz“ …',
          options: [
            'wurde von zwei Studenten gegründet.',
            'gibt es schon seit zwanzig Jahren.',
            'wurde von der Stadt Köln entwickelt.'
          ],
          answer: 0
        },
        {
          frage: 'Wer angemeldet ist, …',
          options: [
            'sieht Nachrichten aus ganz Deutschland.',
            'sieht nur Nachrichten aus dem eigenen Viertel.',
            'muss jeden Monat selbst etwas anbieten.'
          ],
          answer: 1
        },
        {
          frage: 'Die Plattform …',
          options: [
            'verdient Geld mit Anzeigen von Geschäften aus dem Viertel.',
            'kostet für alle Nutzerinnen und Nutzer Geld.',
            'wird vom Staat bezahlt.'
          ],
          answer: 0
        },
        {
          frage: 'Frau Krause …',
          options: [
            'hilft einem Studenten bei der Gartenarbeit.',
            'hat über die Plattform Hilfe für ihren Garten gefunden.',
            'hat ihren Garten nach der Operation aufgegeben.'
          ],
          answer: 1
        },
        {
          frage: 'Ein Problem ist, dass …',
          options: [
            'zu viele Firmen auf der Plattform sind.',
            'die Plattform in Großstädten unbekannt ist.',
            'auf dem Land bisher nur wenige Menschen mitmachen.'
          ],
          answer: 2
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Sie haben sich ausgesperrt — der Schlüssel liegt in der Wohnung, und Sie müssen schnell wieder hinein.',
        'Ihre Mutter ist gestürzt und kann zurzeit nicht selbst einkaufen gehen.',
        'Ihre Nebenkostenabrechnung erscheint Ihnen viel zu hoch, und Sie möchten sie prüfen lassen.',
        'Sie ziehen nächsten Monat um und schaffen den Transport nicht allein.',
        'Sie haben eine neue Küche gekauft, können sie aber nicht selbst aufbauen.',
        'Ihre Wohnung soll vor dem Einzug neu gestrichen werden, aber Sie haben dafür keine Zeit.',
        'Sie suchen eine günstige Drei-Zimmer-Wohnung und möchten keine Maklergebühren zahlen.',
        'Sie möchten eigenes Gemüse anbauen, haben aber keinen Garten.',
        'Ihr Onkel ist gestorben, und seine Wohnung muss komplett geräumt werden.',
        'Ihre Hausgemeinschaft sucht jemanden, der das Treppenhaus putzt und im Winter Schnee räumt.'
      ],
      ads: [
        'Umzugsservice Blitz: Wir transportieren Ihre Möbel sicher in die neue Wohnung — auf Wunsch mit Verpackung, auch kurzfristig, Festpreise!',
        'Malermeister Kolb: Wände, Decken, Türen — wir renovieren Ihre Wohnung schnell und sauber. Kostenlose Beratung vor Ort!',
        'Gartencenter Grün & Co: Alles für Balkon und Terrasse — Blumenerde, Pflanzen und Töpfe. Lieferung ab 50 € frei Haus!',
        'Nachbarschaftshilfe „Hand in Hand“: Wir kaufen für Sie ein und begleiten Sie zu Ärzten — ehrenamtlich und zuverlässig. Rufen Sie uns an!',
        'Wohnungsgenossenschaft Heimat: 2- und 3-Zimmer-Wohnungen zu fairen Mieten — ohne Provision, direkt von uns. Jetzt Termin vereinbaren!',
        'Schlüsseldienst Fix: Tür zugefallen? Wir öffnen schnell und ohne Schaden — Tag und Nacht, faire Festpreise, in 30 Minuten bei Ihnen.',
        'Möbelmontage Schulz: Wir bauen Ihre neuen Möbel fachgerecht auf — auch komplette Küchen. Schnell, günstig, mit Garantie!',
        'Mieterverein Stadtmitte: Wir prüfen Mietverträge und Nebenkostenabrechnungen — die erste Beratung ist für Mitglieder kostenlos.',
        'Haushaltsauflösungen Berger: Wir räumen Wohnungen, Keller und Dachböden besenrein — gut erhaltene Möbel kaufen wir an.',
        'Verein Stadtgarten: Mieten Sie ein eigenes Beet und ziehen Sie Ihr Gemüse selbst! Wasser, Werkzeug und Tipps von Profis inklusive.',
        'Hausmeisterservice Petersen: Treppenreinigung, Winterdienst und kleine Reparaturen — zuverlässig für Hausgemeinschaften und Vermieter.',
        'Immobilienbüro Sonnenseite: Wir verkaufen Ihr Haus oder Ihre Wohnung zum besten Preis — kostenlose Bewertung innerhalb einer Woche.'
      ],
      answers: [5, 3, 7, 0, 6, 1, 4, 9, 8, 10]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrter Herr Winter,

ich wohne [1] drei Jahren als Mieterin in Ihrem Haus in der Beethovenstraße 5 und war bisher immer zufrieden. Leider gibt es jetzt ein Problem, [2] ich Ihnen melden möchte.

Seit letzter Woche funktioniert die Heizung in [3] Wohnung nicht richtig. Im Wohnzimmer wird es abends nicht wärmer [4] achtzehn Grad. Ich habe schon versucht, die Heizung selbst zu [5], aber es hat nichts genützt.

[6] es draußen immer kälter wird, bitte ich Sie, schnell einen Handwerker zu schicken. Am besten erreichen Sie mich abends [7] 18 Uhr. Sie können den Termin auch direkt [8] meiner Nachbarin, Frau Roth, absprechen — sie hat einen Schlüssel für meine Wohnung.

Ich hoffe, [9] das Problem bald gelöst wird. Bitte teilen Sie mir mit, wann der Handwerker [10] kann.

Mit freundlichen Grüßen
Elena Petrova`,
      gaps: [
        { options: ['vor', 'seit', 'ab'], answer: 1 },
        { options: ['was', 'das', 'es'], answer: 1 },
        { options: ['meine', 'meinem', 'meiner'], answer: 2 },
        { options: ['als', 'wie', 'so'], answer: 0 },
        { options: ['reparieren', 'repariert', 'reparierte'], answer: 0 },
        { options: ['Denn', 'Da', 'Deshalb'], answer: 1 },
        { options: ['um', 'ab', 'seit'], answer: 1 },
        { options: ['bei', 'von', 'mit'], answer: 2 },
        { options: ['dass', 'weil', 'ob'], answer: 0 },
        { options: ['kommt', 'gekommen', 'kommen'], answer: 2 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Frau Lehmann,

wir, die Mieterinnen und Mieter aus der Rosenstraße 8, möchten uns gern besser [1]. Deshalb planen wir für Samstag, den 21. Juni, ein kleines Fest in unserem [2].

Wir haben folgende [3]: Jeder bringt etwas zu essen mit, und die Getränke [4] wir gemeinsam. Ein Nachbar stellt Tische und Bänke zur [5].

Natürlich möchten wir vorher Ihre [6] einholen. Wir werden auf die anderen Bewohner Rücksicht [7] und die Musik um 22 Uhr ausmachen. Am nächsten Morgen [8] wir den Hof selbstverständlich auf.

Über eine kurze [9] würden wir uns sehr freuen. Und wenn Sie am 21. Juni Zeit haben: Sie sind herzlich [10]!

Mit freundlichen Grüßen
im Namen aller Nachbarn
Karim Said`,
      wordBank: [
        'Antwort',
        'bezahlt',
        'eingeladen',
        'Erlaubnis',
        'gefeiert',
        'Hof',
        'Idee',
        'kaufen',
        'kennenlernen',
        'Lärm',
        'nehmen',
        'Ordnung',
        'räumen',
        'Verfügung',
        'versprechen'
      ],
      answers: [8, 5, 6, 7, 13, 3, 10, 12, 0, 2]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Am Dienstagvormittag gibt es im Haus kein Wasser.',
          answer: true,
          audio:
            'Guten Tag, hier spricht die Hausverwaltung Nordlicht. Eine wichtige Information für alle Bewohner der Ahornstraße vier: Am kommenden Dienstag wird zwischen acht und zwölf Uhr das Wasser im ganzen Haus abgestellt, weil wir die alten Rohre im Keller reparieren lassen. Bitte füllen Sie sich morgens genug Wasser ab. Vielen Dank für Ihr Verständnis.'
        },
        {
          statement: 'Die Nachbarin hat ein Paket für Herrn Aslan angenommen.',
          answer: true,
          audio:
            'Guten Abend, Herr Aslan, hier ist Frau Hoffmann aus dem zweiten Stock. Der Paketbote war heute Mittag da, und ich habe ein großes Paket für Sie angenommen. Klingeln Sie einfach bei mir, wenn Sie zu Hause sind — ich bin den ganzen Abend da. Bis später!'
        },
        {
          statement: 'Der Umzug kann wie geplant am Freitag stattfinden.',
          answer: false,
          audio:
            'Guten Tag, Frau Petrova, hier ist die Umzugsfirma Blitz. Es geht um Ihren Umzug am Freitag. Leider ist unser großer Lastwagen kaputtgegangen, und die Reparatur dauert bis Freitagabend. Wir möchten Ihren Umzug deshalb auf Samstagmorgen acht Uhr verschieben. Bitte rufen Sie uns zurück und sagen Sie uns, ob das für Sie möglich ist.'
        },
        {
          statement: 'Der Handwerker kommt morgen erst am Nachmittag.',
          answer: false,
          audio:
            'Hallo Frau Schmidt, hier ist Hausmeister Krause. Sie hatten ja gemeldet, dass Ihre Heizung nicht richtig warm wird. Der Handwerker kommt morgen Vormittag zwischen zehn und zwölf Uhr bei Ihnen vorbei. Falls Sie nicht zu Hause sind, können Sie mir auch Ihren Schlüssel geben — ich bin ab sieben Uhr im Haus.'
        },
        {
          statement: 'Bei Regen findet das Fest in einem Gebäude statt.',
          answer: true,
          audio:
            'Und jetzt eine Meldung aus dem Stadtteil: Am Samstag feiert die Nordstadt ihr großes Nachbarschaftsfest. Von vierzehn bis zweiundzwanzig Uhr gibt es im Stadtteilpark Musik, internationale Küche und ein buntes Programm für Kinder. Sollte es regnen, findet das Fest im Gemeindezentrum an der Parkstraße statt. Der Eintritt ist frei.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Guten Tag und willkommen bei „Mittendrin“! Zu Gast ist heute Aylin Demir. Sie hat in der Weststadt ein Nachbarschaftsnetz aufgebaut. Frau Demir, wie lange leben Sie schon dort?'
        },
        {
          speaker: 'Aylin Demir',
          text: 'Seit zwölf Jahren. Ich habe dort meine Ausbildung gemacht, und dann bin ich einfach geblieben, weil ich das Viertel so mag.'
        },
        {
          speaker: 'Moderator',
          text: 'Wie ist die Idee zu Ihrem Netzwerk entstanden?'
        },
        {
          speaker: 'Aylin Demir',
          text: 'Vor vier Jahren kam meine Nachbarin, Frau Genscher, aus dem Krankenhaus. Sie ist über achtzig und konnte plötzlich nicht mehr einkaufen oder den Müll hinunterbringen. Da habe ich gemerkt: In unserem Haus wusste niemand etwas vom anderen. Das wollte ich ändern.'
        },
        {
          speaker: 'Moderator',
          text: 'Was haben Sie konkret gemacht?'
        },
        {
          speaker: 'Aylin Demir',
          text: 'Ich habe einen Zettel in den Hausflur gehängt: „Wer hilft mit? Wer braucht Hilfe?“ — mit meiner Telefonnummer. Nach einer Woche hatten sich fünfzehn Leute gemeldet, nach einem Monat waren es schon vierzig.'
        },
        {
          speaker: 'Moderator',
          text: 'Und heute?'
        },
        {
          speaker: 'Aylin Demir',
          text: 'Heute sind wir über hundertzwanzig Menschen aus der ganzen Straße. Und zwar wirklich alle Altersgruppen — Schüler, Familien, Rentner. Das ist mir wichtig: Wir sind kein reines Seniorenprojekt.'
        },
        {
          speaker: 'Moderator',
          text: 'Wobei helfen sich die Nachbarn denn?'
        },
        {
          speaker: 'Aylin Demir',
          text: 'Bei ganz alltäglichen Dingen: einkaufen, den Hund ausführen, kleine Reparaturen, Nachhilfe für die Kinder. Und manchmal geht es einfach nur darum, dass jemand Zeit für einen Kaffee und ein Gespräch hat.'
        },
        {
          speaker: 'Moderator',
          text: 'Wie organisieren Sie das alles?'
        },
        {
          speaker: 'Aylin Demir',
          text: 'Über eine Nachrichtengruppe auf dem Handy — und einmal im Monat treffen wir uns persönlich im Stadtteilzentrum. Diesen Raum müssen wir übrigens nicht bezahlen, den stellt uns die Stadt kostenlos zur Verfügung.'
        },
        {
          speaker: 'Moderator',
          text: 'Gibt es auch Probleme? Manche Leute nehmen vielleicht nur Hilfe an, ohne selbst zu helfen.'
        },
        {
          speaker: 'Aylin Demir',
          text: 'Das höre ich oft, aber ich sehe das ganz entspannt. Wer heute Hilfe braucht, gibt später oft etwas zurück. Frau Genscher zum Beispiel kann nicht mehr schwer tragen — aber sie gießt jetzt die Blumen von drei Familien, wenn die im Urlaub sind.'
        },
        {
          speaker: 'Moderator',
          text: 'Was war bisher Ihr schönster Moment?'
        },
        {
          speaker: 'Aylin Demir',
          text: 'Unser Hoffest im letzten Sommer. Wir hatten mit fünfzig Gästen gerechnet, am Ende waren es rund dreihundert. Es gab Essen aus zehn Ländern, und die Kinder haben bis zum Abend im Hof getanzt.'
        },
        {
          speaker: 'Moderator',
          text: 'Und wie geht es weiter?'
        },
        {
          speaker: 'Aylin Demir',
          text: 'Inzwischen fragen Leute aus anderen Stadtteilen, wie man so ein Netz aufbaut. Deshalb schreibe ich gerade eine kleine Anleitung, und ich besuche andere Viertel, um ihnen beim Start zu helfen. Nachbarschaft funktioniert überall — man muss nur anfangen.'
        },
        {
          speaker: 'Moderator',
          text: 'Frau Demir, vielen Dank für das Gespräch!'
        }
      ],
      statements: [
        { statement: 'Frau Demir wohnt erst seit zwei Jahren in der Weststadt.', answer: false },
        {
          statement: 'Die Idee entstand, als eine ältere Nachbarin nach dem Krankenhaus Hilfe brauchte.',
          answer: true
        },
        { statement: 'Am Anfang hat Frau Demir einen Zettel im Hausflur aufgehängt.', answer: true },
        { statement: 'Im Netzwerk machen Menschen aller Altersgruppen mit.', answer: true },
        { statement: 'Die Nachbarn helfen sich ausschließlich beim Einkaufen.', answer: false },
        { statement: 'Die Gruppe trifft sich jede Woche persönlich.', answer: false },
        { statement: 'Die Stadt stellt der Gruppe einen Raum kostenlos zur Verfügung.', answer: true },
        { statement: 'Frau Demir ärgert sich über Nachbarn, die nur Hilfe annehmen.', answer: false },
        { statement: 'Zum Hoffest kamen viel mehr Gäste als erwartet.', answer: true },
        {
          statement: 'Frau Demir hilft jetzt auch anderen Stadtteilen beim Aufbau von Netzwerken.',
          answer: true
        }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf Durchsagen. Sie hören jede Durchsage einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Auf Wandfarben gibt es heute zwanzig Prozent Rabatt.',
          answer: true,
          audio:
            'Liebe Kundinnen und Kunden unseres Baumarkts, heute sparen Sie beim Renovieren: In der Abteilung drei erhalten Sie zwanzig Prozent Rabatt auf alle Wandfarben und Lacke. Und für die schnelle Stärkung zwischendurch: Unsere Grillwürstchen am Eingang kosten heute nur einen Euro. Wir wünschen Ihnen einen guten Einkauf!'
        },
        {
          statement: 'Ein Auto versperrt die Einfahrt und soll weggefahren werden.',
          answer: true,
          audio:
            'Werte Kundinnen und Kunden, eine dringende Durchsage: Der Fahrer oder die Fahrerin des blauen Kombis mit dem Kennzeichen M A drei-vier-sieben wird gebeten, das Fahrzeug umzuparken. Es blockiert die Einfahrt für unsere Lieferwagen. Bitte kommen Sie umgehend zum Parkplatz hinter dem Möbelhaus. Vielen Dank.'
        },
        {
          statement: 'Der Strom fällt am Mittwochabend aus.',
          answer: false,
          audio:
            'Achtung, eine Mitteilung der Stadtwerke: Wegen Wartungsarbeiten am Stromnetz kommt es am Mittwochvormittag zwischen neun und elf Uhr in Teilen der Nordstadt zu Stromausfällen. Betroffen sind die Bergstraße, der Lindenweg und die Hafenallee. Bitte benutzen Sie in dieser Zeit nicht die Aufzüge. Ab elf Uhr funktioniert alles wieder normal.'
        },
        {
          statement: 'Das Kindertheater fängt schon um vierzehn Uhr an.',
          answer: false,
          audio:
            'Liebe Besucherinnen und Besucher unseres Straßenfestes, eine Programmänderung: Das Kindertheater beginnt nicht wie geplant um vierzehn Uhr, sondern erst um fünfzehn Uhr, weil die Bühne nach dem Regen noch trocknen muss. Die Hüpfburg und das Kinderschminken sind aber schon jetzt geöffnet. Viel Spaß beim Fest!'
        },
        {
          statement: 'Das Bürgeramt schließt heute früher als sonst.',
          answer: true,
          audio:
            'Sehr geehrte Besucherinnen und Besucher, bitte beachten Sie: Das Bürgeramt schließt heute wegen einer Betriebsversammlung bereits um fünfzehn Uhr. Wer nur Dokumente abholen möchte, kann dies noch bis vierzehn Uhr dreißig am Schalter eins tun. Ab morgen gelten wieder die gewohnten Öffnungszeiten. Wir bitten um Ihr Verständnis.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Antworten Sie auf den Brief. Schreiben Sie zu mindestens drei der vier Leitpunkte — zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht.',
    tasks: [
      {
        titel: 'Antwort an die Hausverwaltung',
        situation:
          'Sie wohnen zur Miete in einer größeren Wohnanlage. Heute bekommen Sie eine E-Mail von Ihrer Hausverwaltung.',
        incoming: {
          von: 'verwaltung@hausservice-nord.de',
          betreff: 'Einladung zur Mieterversammlung — Umgestaltung des Innenhofs',
          text: `Sehr geehrte Mieterinnen und Mieter,

der Innenhof unserer Wohnanlage soll im nächsten Jahr neu gestaltet werden. Dafür gibt es zwei Vorschläge: einen Spielplatz mit Sitzecke für alle Bewohner oder sechs zusätzliche Parkplätze.

Wir laden Sie herzlich zur Mieterversammlung am Dienstag, den 12. Mai, um 19 Uhr im Gemeinschaftsraum ein. Dort stellen wir beide Pläne vor, und Sie können abstimmen.

Bitte teilen Sie uns vorher kurz mit, ob Sie kommen. Wenn Sie nicht teilnehmen können, schreiben Sie uns gern Ihre Meinung — auch Ihre Stimme zählt.

Mit freundlichen Grüßen
Petra Neumann
Hausverwaltung Nord`
        },
        leitpunkte: [
          'Bedanken Sie sich für die Einladung.',
          'Sagen Sie, ob Sie zur Versammlung kommen können.',
          'Schreiben Sie, welchen Vorschlag Sie besser finden, und begründen Sie Ihre Meinung.',
          'Stellen Sie eine Frage (zum Beispiel zu den Kosten oder zum Zeitplan).'
        ],
        musterloesung: `Sehr geehrte Frau Neumann,

vielen Dank für Ihre E-Mail und für die Einladung zur Mieterversammlung.

Leider kann ich am 12. Mai nicht kommen, weil ich an diesem Abend arbeiten muss. Deshalb möchte ich Ihnen meine Meinung schreiben.

Ich finde den Vorschlag mit dem Spielplatz und der Sitzecke viel besser. In unserem Haus wohnen viele Familien, und die Kinder haben bisher keinen Platz zum Spielen. Eine Sitzecke wäre auch für die älteren Nachbarn schön, damit man sich öfter trifft. Parkplätze gibt es in unserer Straße meiner Meinung nach genug.

Eine Frage habe ich noch: Müssen die Mieter für die Umgestaltung etwas bezahlen, oder übernimmt die Verwaltung alle Kosten?

Vielen Dank, dass Sie die Bewohner nach ihrer Meinung fragen.

Mit freundlichen Grüßen
Elena Petrova`
      }
    ],
    tipps:
      'Lesen Sie den Brief genau: Auf welche Fragen müssen Sie antworten? Haken Sie am Ende ab: Anrede und Gruß? Mindestens drei Leitpunkte? Begründungen mit weil oder denn?'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Kontaktaufnahme',
      anweisung:
        'Sprechen Sie mit Ihrer Partnerin / Ihrem Partner. Lernen Sie sich kennen. Die folgenden Punkte helfen Ihnen.',
      punkte: ['Name', 'Wohnort und Wohnung', 'Familie', 'Beruf oder Ausbildung', 'Sprachen', 'Freizeit'],
      redemittel: [
        'Schön, Sie kennenzulernen! Ich bin …',
        'Wohnen Sie in einer Wohnung oder in einem Haus?',
        'Leben Sie allein oder mit Ihrer Familie?',
        'Was machen Sie beruflich, wenn ich fragen darf?',
        'Seit wann lernen Sie Deutsch?',
        'Und was machen Sie gern in Ihrer Freizeit?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Gespräch über ein Thema',
      anweisung:
        'Sie haben in einer Zeitung gelesen: „In vielen großen Städten kennen die Menschen ihre Nachbarn kaum noch.“ Berichten Sie: Wie ist Ihr Kontakt zu Ihren Nachbarn? Sagen Sie Ihre Meinung: Wie wichtig ist eine gute Nachbarschaft?',
      punkte: [
        'Berichten Sie über Ihre eigenen Erfahrungen mit Nachbarn.',
        'Wie ist das Verhältnis zwischen Nachbarn in Ihrem Heimatland?',
        'Nennen Sie Vorteile UND mögliche Nachteile eines engen Kontakts zu den Nachbarn.',
        'Fragen Sie auch Ihre Partnerin / Ihren Partner nach ihrer/seiner Meinung.'
      ],
      redemittel: [
        'In dem Artikel steht, dass …',
        'Meine Nachbarn kenne ich … / Mit meinen Nachbarn …',
        'In meinem Heimatland ist das anders: Dort …',
        'Gute Nachbarn sind wichtig, weil … / Andererseits kann es stören, wenn …',
        'Kennen Sie Ihre Nachbarn gut?',
        'Das kann ich gut verstehen. / Da habe ich andere Erfahrungen gemacht, denn …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'In Ihrem Haus wohnen viele Familien, aber die Bewohner kennen sich kaum. Sie möchten zusammen mit Ihrer Partnerin / Ihrem Partner einen Flohmarkt im Innenhof organisieren, damit sich die Nachbarn kennenlernen. Planen Sie den Flohmarkt gemeinsam.',
      punkte: [
        'An welchem Tag und um welche Uhrzeit soll der Flohmarkt stattfinden?',
        'Wie informieren Sie die Nachbarn (Plakate, Zettel, Internet)?',
        'Woher bekommen Sie Tische, und wer hilft beim Aufbau?',
        'Was passiert mit den Sachen, die nicht verkauft werden?'
      ],
      redemittel: [
        'Ich schlage vor, dass wir den Flohmarkt am … machen.',
        'Sollen wir Zettel aufhängen oder lieber alle persönlich fragen?',
        'Einverstanden, das ist eine gute Idee!',
        'Ich weiß nicht, vielleicht wäre … besser, weil …',
        'Um die Tische kann ich mich kümmern. Übernehmen Sie die Plakate?',
        'Super, dann haben wir alles geplant!'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
