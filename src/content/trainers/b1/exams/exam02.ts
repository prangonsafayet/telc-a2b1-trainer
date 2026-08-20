import { type TelcExam } from '@shared/types';

const exam = {
  id: 2,
  level: 'b1',
  title: 'Modelltest 2',
  theme: 'Reisen & Verkehr',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Nachtzüge in Europa werden wieder beliebter',
        'Flughafen-Streik: Hunderte Flüge fallen aus',
        'Mit dem Fahrrad zur Arbeit: Stadt belohnt Pendler',
        'Neues Ticket macht Busfahren auf dem Land günstiger',
        'Autofahren in der Innenstadt bald verboten?',
        'Camping-Boom: Stellplätze schon im Frühjahr ausgebucht',
        'Reisen mit Hund: Was Sie beachten müssen',
        'Immer mehr Senioren buchen Kreuzfahrten',
        'Warnung vor falschen Ferienwohnungen im Internet',
        'Bahnhof bekommt endlich neue Fahrstühle'
      ],
      texts: [
        'Vor zehn Jahren schien der Nachtzug fast tot zu sein: Viele Verbindungen wurden gestrichen, weil Fliegen billiger war. Heute erleben Schlafwagen ein Comeback. Mehrere Bahnen bauen ihr Angebot aus, neue Strecken nach Rom, Stockholm und Paris sind geplant. Vor allem junge Reisende buchen die Züge, weil sie klimafreundlich reisen und morgens ausgeschlafen ankommen wollen.',
        'Die Verbraucherzentrale warnt vor Betrügern, die im Internet Ferienwohnungen anbieten, die es gar nicht gibt. Die Fotos sehen echt aus, und die Preise sind verlockend niedrig. Wer bucht und im Voraus überweist, steht im Urlaub oft vor einer fremden Haustür. Experten raten: Bewertungen lesen, die Adresse prüfen und niemals den vollen Preis vorab bezahlen.',
        'Zelt, Wohnwagen oder Wohnmobil: Urlaub auf dem Campingplatz ist so gefragt wie nie. Viele Plätze an Seen und an der Küste melden schon im März, dass sie für den ganzen Sommer komplett ausgebucht sind. Die Betreiber empfehlen deshalb, den Stellplatz viele Monate im Voraus zu reservieren — oder erst im September zu fahren, wenn es ruhiger wird.',
        'Wer in Neustadt mit dem Rad zur Arbeit fährt, kann jetzt Punkte sammeln: Eine App zählt die gefahrenen Kilometer, und die Stadt verteilt dafür kleine Prämien — vom Kinogutschein bis zur Fahrradtasche. Die Aktion soll den Autoverkehr am Morgen verringern. Im ersten Monat haben sich bereits über zweitausend Pendlerinnen und Pendler angemeldet.',
        'Auf dem Land fahren viele Menschen fast alle Wege mit dem Auto, weil Busse selten und Tickets teuer sind. Der Landkreis Osterberg versucht nun etwas Neues: Für nur zwei Euro kann man künftig quer durch den ganzen Kreis fahren, Kinder zahlen die Hälfte. Der Landrat hofft, dass so mehr Menschen vom Auto in den Bus umsteigen.'
      ],
      answers: [0, 8, 5, 2, 3]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Vier Wochen Europa — ohne Flugzeug',
      text: `Letzten Sommer hat Familie Brandt aus Kassel etwas gewagt, das viele ihrer Freunde verrückt fanden: vier Wochen durch Europa, nur mit dem Zug. Die Idee hatte die neunjährige Tochter Emma. In der Schule hatte sie ein Projekt über das Klima gemacht und danach gefragt, warum die Familie eigentlich jedes Jahr fliegt.

Die Eltern planten die Route ein halbes Jahr im Voraus: von Kassel über München nach Italien, weiter an die französische Küste und zurück durch die Schweiz. Jeder durfte nur einen Rucksack mitnehmen — auch die Kinder. „Weniger Gepäck bedeutet weniger Stress“, sagt Vater Jens Brandt. Übernachtet hat die Familie in kleinen Pensionen, die möglichst nah am Bahnhof lagen.

Billiger als eine Flugreise war der Urlaub übrigens nicht. „Wir haben ungefähr so viel bezahlt wie im Jahr davor für zwei Wochen Mallorca“, rechnet Mutter Sandra vor. „Aber wir haben viel mehr gesehen und waren viel entspannter.“ Nur einmal ging etwas schief: In Zürich verpasste die Familie den Anschlusszug und musste ungeplant in einer Kleinstadt übernachten. Ausgerechnet dieser Abend, sagen heute alle vier, war der schönste der ganzen Reise.

Anderen Familien rät Sandra Brandt, sich nicht zu viel vorzunehmen: wenige Orte, lange Aufenthalte und Sitzplätze früh reservieren. Die nächste Reise ist jedenfalls schon geplant: Im kommenden Sommer soll es mit dem Nachtzug nach Schweden gehen.`,
      questions: [
        {
          frage: 'Die Idee für die Reise ohne Flugzeug …',
          options: [
            'hatten die Eltern beim Planen der Route.',
            'kam von der Tochter nach einem Schulprojekt.',
            'stammte von Freunden der Familie.'
          ],
          answer: 1
        },
        {
          frage: 'Auf die Reise hat die Familie …',
          options: [
            'pro Person nur einen Rucksack mitgenommen.',
            'für die Kinder extra Koffer mitgenommen.',
            'das Gepäck mit der Post vorausgeschickt.'
          ],
          answer: 0
        },
        {
          frage: 'Im Vergleich zum früheren Flugurlaub war die Zugreise …',
          options: ['deutlich günstiger.', 'ungefähr gleich teuer.', 'sehr viel teurer.'],
          answer: 1
        },
        {
          frage: 'In Zürich …',
          options: [
            'hat die Familie einen Zug verpasst.',
            'hat die Familie den schönsten Bahnhof der Reise gesehen.',
            'endete die Reise früher als geplant.'
          ],
          answer: 0
        },
        {
          frage: 'Im nächsten Sommer will die Familie …',
          options: [
            'wieder nach Mallorca fliegen.',
            'zu Hause in Kassel bleiben.',
            'mit dem Nachtzug nach Schweden fahren.'
          ],
          answer: 2
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Sie müssen sehr früh mit einem schweren Koffer zum Flughafen, haben aber kein Auto.',
        'Ihre Eltern sind über siebzig und möchten einen Tagesausflug machen, ohne selbst zu fahren.',
        'Eine Familie mit kleinen Kindern sucht einen Urlaub, bei dem die Kinder Tiere erleben können.',
        'Sie fahren allein nach Berlin und möchten Geld sparen — die Bahn ist Ihnen zu teuer.',
        'Sie machen Urlaub an der Ostsee und möchten dort für ein paar Tage Fahrräder ausleihen.',
        'Ihr Sohn (15) soll in den Sommerferien sein Englisch verbessern.',
        'Sie brauchen für einen Umzug am Wochenende ein größeres Fahrzeug.',
        'Sie wandern gern, möchten aber nicht allein gehen und die Umgebung besser kennenlernen.',
        'Sie möchten mit dem Zelt Urlaub am Wasser machen.',
        'Sie möchten spontan und günstig eine Woche ans Mittelmeer fliegen.'
      ],
      ads: [
        'Mitfahrzentrale online: Fahrten von Stadt zu Stadt, oft für unter zwanzig Euro. Als Fahrer oder Mitfahrer anmelden — Benzinkosten teilen!',
        'Reisebüro Sonnenklar: Last-Minute-Pauschalreisen ans Mittelmeer — Flug und Hotel zum Sparpreis, Abflug schon diese Woche!',
        'Fahrradverleih Küstenrad: Räder und E-Bikes direkt am Ostseestrand, tageweise oder wochenweise, Helme und Kindersitze inklusive.',
        'Sprachreisen für Jugendliche (13–17): Zwei Wochen Englisch lernen in England, Unterkunft in netten Gastfamilien, Betreuung rund um die Uhr.',
        'Autovermietung City: Kleinwagen ab 29 € pro Tag, Transporter fürs Wochenende ab 79 € — ideal für Umzüge, Kilometer frei.',
        'Wanderverein Bergfreunde: Geführte Tageswanderungen jeden Sonntag, gemütliches Tempo, Gäste sind herzlich willkommen!',
        'Reisegepäck-Service Kofferflink: Wir holen Ihre Koffer zu Hause ab und liefern sie direkt ins Hotel — weltweit und versichert.',
        'Ferienhof Familie Krause: Urlaub auf dem Bauernhof! Kinder dürfen Kühe, Ponys und Hühner füttern, großer Spielplatz, Kinderbetten vorhanden.',
        'Fahrschule Blitz: Führerschein in vier Wochen! Intensivkurs mit Theorieunterricht am Abend, faire Preise, kostenlose Beratung.',
        'Busreisen Meyer: Bequeme Tagesfahrten für Seniorinnen und Senioren — Abholung an der Haustür, Mittagessen und Reisebegleitung inklusive.',
        'Camping am Waldsee: Ruhige Stellplätze für Zelte und Wohnwagen direkt am Ufer, Bootsverleih und Kiosk auf dem Platz.',
        'Flughafen-Shuttle Airliner: Transfer rund um die Uhr zum Festpreis, unsere Fahrer helfen gern mit dem Gepäck. Telefonisch oder online buchen!'
      ],
      answers: [11, 9, 7, 0, 2, 3, 4, 5, 10, 1]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrte Damen und Herren,

im Juli möchte ich mit meiner Familie eine Woche Urlaub [1] der Ostsee machen. Eine Kollegin, [2] letztes Jahr bei Ihnen war, hat mir Ihr Hotel empfohlen.

Wir sind zwei Erwachsene [3] zwei Kindern (vier und sieben Jahre alt). Deshalb möchte ich Sie fragen, [4] Sie in dieser Zeit ein Familienzimmer frei haben. Wir möchten [5] 12. bis zum 19. Juli bleiben.

Außerdem hätte ich noch eine Frage: Kann man bei [6] auch Fahrräder ausleihen? Wir wollen nämlich viele Ausflüge [7]. Unser Sohn ist erst vier Jahre alt, [8] wäre ein Kindersitz für ein Erwachsenenrad wichtig.

Bitte schicken Sie mir ein Angebot mit dem Preis für die ganze Woche. Wenn uns das Angebot [9], buchen wir sofort.

Vielen Dank [10] Ihre Mühe!

Mit freundlichen Grüßen
Lena Krüger`,
      gaps: [
        { options: ['bei', 'an', 'nach'], answer: 1 },
        { options: ['der', 'das', 'die'], answer: 2 },
        { options: ['mit', 'bei', 'zu'], answer: 0 },
        { options: ['dass', 'ob', 'wenn'], answer: 1 },
        { options: ['am', 'im', 'vom'], answer: 2 },
        { options: ['Ihnen', 'Sie', 'Ihre'], answer: 0 },
        { options: ['gemacht', 'machen', 'macht'], answer: 1 },
        { options: ['weil', 'denn', 'deshalb'], answer: 2 },
        { options: ['gefällt', 'gefallen', 'gefiel'], answer: 0 },
        { options: ['auf', 'über', 'für'], answer: 2 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

vom 2. bis zum 9. August habe ich bei Ihnen eine [1] nach Spanien gebucht. Leider war ich mit dem Hotel überhaupt nicht [2].

In Ihrem Katalog stand, dass das Hotel direkt am [3] liegt. In Wirklichkeit mussten wir jeden Tag zwanzig Minuten mit dem Bus fahren. Außerdem war unser Zimmer sehr laut, weil es zur [4] lag. Wir konnten nachts kaum [5].

Am dritten Tag habe ich an der Rezeption um ein anderes Zimmer [6]. Man hat mir gesagt, das Hotel sei leider [7] besetzt.

Ich finde, das ist kein guter [8] für so viel Geld. Deshalb bitte ich Sie, mir einen Teil des Reisepreises [9]. Eine Kopie meiner Rechnung schicke ich Ihnen als [10] mit.

Ich erwarte Ihre Antwort bis zum 15. September.

Mit freundlichen Grüßen
Murat Özdemir`,
      wordBank: [
        'Ankunft',
        'Anlage',
        'bezahlt',
        'gebeten',
        'Gepäck',
        'leer',
        'Reise',
        'ruhig',
        'schlafen',
        'Service',
        'Strand',
        'Straße',
        'voll',
        'zufrieden',
        'zurückzuzahlen'
      ],
      answers: [6, 13, 10, 11, 8, 3, 12, 9, 14, 1]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Nina schlägt vor, einen späteren Zug zu nehmen.',
          answer: false,
          audio:
            'Hallo Tom, hier ist Nina. Du, wegen unserer Fahrt nach Köln am Samstag: Ich habe gerade gelesen, dass auf der Strecke gebaut wird und einige Züge ausfallen. Ich schlage vor, dass wir schon den Zug um acht Uhr nehmen statt den um zehn. Dann haben wir genug Zeit, falls etwas schiefgeht. Ruf mich bitte kurz zurück. Tschüss!'
        },
        {
          statement: 'Auf der Autobahn gibt es wegen eines Unfalls einen langen Stau.',
          answer: true,
          audio:
            'Und nun der Verkehr: Auf der A3 zwischen Würzburg und Nürnberg hat sich wegen eines Unfalls ein Stau von zwölf Kilometern gebildet. Die Fahrbahn ist zurzeit nur einspurig befahrbar, Sie verlieren ungefähr eine Stunde. Wir empfehlen, die Autobahn an der Ausfahrt Kitzingen zu verlassen und der Umleitung zu folgen.'
        },
        {
          statement: 'Das Flugzeug nach Lissabon startet früher als ursprünglich geplant.',
          answer: true,
          audio:
            'Guten Tag, Frau Berg, hier ist das Reisebüro Meridian. Es geht um Ihre Flugreise nach Lissabon nächste Woche. Die Fluggesellschaft hat die Abflugzeit geändert: Ihre Maschine startet nicht um vierzehn Uhr, sondern bereits um elf Uhr dreißig. Bitte seien Sie also spätestens um neun Uhr dreißig am Flughafen. Die neuen Unterlagen schicken wir Ihnen per E-Mail.'
        },
        {
          statement: 'Die Fährtickets von heute kann man morgen noch benutzen.',
          answer: true,
          audio:
            'Liebe Urlauberinnen und Urlauber an der Nordseeküste, eine wichtige Meldung: Wegen des starken Sturms fahren heute keine Fähren zur Insel Norderoog. Alle Fahrten sind gestrichen. Ihre Tickets bleiben aber gültig — Sie können sie morgen für jede beliebige Abfahrt nutzen. Aktuelle Informationen erhalten Sie stündlich hier im Radio oder direkt am Hafen.'
        },
        {
          statement: 'Das Hotel hat die Zimmerreservierung abgesagt.',
          answer: false,
          audio:
            'Guten Abend, hier spricht Herr Lindner vom Hotel Seeblick. Ich rufe an wegen Ihrer Reservierung vom zwölften bis zum fünfzehnten August. Leider müssen wir Ihnen mitteilen, dass unser Parkhaus in dieser Zeit wegen Bauarbeiten geschlossen ist. Sie können aber kostenlos auf dem öffentlichen Parkplatz gegenüber parken. Ihr Zimmer ist selbstverständlich wie vereinbart für Sie reserviert.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Herzlich willkommen zu unserer Sendung „Unterwegs“! Heute ist Jana Fuchs bei uns. Frau Fuchs, Sie sind ein halbes Jahr lang durch Europa gereist — ohne ein einziges Mal zu fliegen. Wie kam es dazu?'
        },
        {
          speaker: 'Jana Fuchs',
          text: 'Diesen Traum hatte ich schon lange. Letztes Jahr habe ich dann mit meiner Firma gesprochen. Kündigen wollte ich auf keinen Fall — mein Chef war zum Glück einverstanden, dass ich sechs Monate unbezahlten Urlaub nehme.'
        },
        {
          speaker: 'Moderator',
          text: 'Und dann ging es los. Wie sind Sie gereist?'
        },
        {
          speaker: 'Jana Fuchs',
          text: 'Nur mit Zug und Bus. Ich wollte zeigen, dass man auch ohne Flugzeug weit kommt. Am Ende waren es vierzehn Länder — von Norwegen bis nach Griechenland.'
        },
        {
          speaker: 'Moderator',
          text: 'Wo haben Sie unterwegs übernachtet?'
        },
        {
          speaker: 'Jana Fuchs',
          text: 'Ganz unterschiedlich. Manchmal in günstigen Hostels, aber sehr oft bei Privatleuten, die über eine Internetplattform Gäste aufnehmen. Das war das Beste an der Reise: So lernt man ein Land wirklich von innen kennen.'
        },
        {
          speaker: 'Moderator',
          text: 'Welches Land hat Ihnen denn am besten gefallen?'
        },
        {
          speaker: 'Jana Fuchs',
          text: 'Eindeutig Portugal. Die Menschen dort waren unglaublich herzlich, und ich bin gleich zwei Wochen länger geblieben als geplant.'
        },
        {
          speaker: 'Moderator',
          text: 'Gab es auch schwierige Momente?'
        },
        {
          speaker: 'Jana Fuchs',
          text: 'Oh ja. In Budapest ist mein Rucksack im Bus liegen geblieben — mit allem, was ich hatte. Ich dachte schon, die Reise ist zu Ende. Aber das Busunternehmen hat ihn gefunden, und nach zwei Tagen hatte ich ihn zurück.'
        },
        {
          speaker: 'Moderator',
          text: 'Ist so eine lange Reise nicht furchtbar teuer?'
        },
        {
          speaker: 'Jana Fuchs',
          text: 'Weniger, als viele denken. Ich habe genau Buch geführt: ungefähr dreißig Euro am Tag, alles zusammen. Man muss eben langsam reisen, selbst kochen und nicht jeden Tag ins Restaurant gehen.'
        },
        {
          speaker: 'Moderator',
          text: 'Was ist von der Reise geblieben?'
        },
        {
          speaker: 'Jana Fuchs',
          text: 'Sehr viel! Unterwegs habe ich einen Blog geschrieben, den überraschend viele Menschen gelesen haben. Ein Verlag hat sich gemeldet, und jetzt sitze ich an einem Buch über die Reise. Es soll im nächsten Frühjahr erscheinen.'
        },
        {
          speaker: 'Moderator',
          text: 'Und wann geht es wieder los?'
        },
        {
          speaker: 'Jana Fuchs',
          text: 'Nächsten Sommer! Diesmal aber nicht allein: Meine Schwester kommt mit, wir wollen zusammen nach Skandinavien. Sie hat sich von mir anstecken lassen.'
        },
        {
          speaker: 'Moderator',
          text: 'Frau Fuchs, herzlichen Dank für das Gespräch!'
        }
      ],
      statements: [
        { statement: 'Frau Fuchs war ein ganzes Jahr unterwegs.', answer: false },
        { statement: 'Für die Reise hat sie ihre Stelle gekündigt.', answer: false },
        { statement: 'Frau Fuchs ist während der Reise nie geflogen.', answer: true },
        { statement: 'Sie hat mehr als zehn Länder besucht.', answer: true },
        { statement: 'Übernachtet hat sie ausschließlich in Hostels.', answer: false },
        { statement: 'Am besten hat ihr Portugal gefallen.', answer: true },
        { statement: 'Ihren Rucksack hat sie nicht wiederbekommen.', answer: false },
        { statement: 'Pro Tag hat sie ungefähr dreißig Euro ausgegeben.', answer: true },
        { statement: 'Frau Fuchs arbeitet gerade an einem Buch über die Reise.', answer: true },
        { statement: 'Die nächste Reise plant sie allein.', answer: false }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf Durchsagen. Sie hören jede Durchsage einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Der Zug nach Hamburg fährt später ab als geplant.',
          answer: true,
          audio:
            'Achtung am Gleis drei: Der Intercity-Express nach Hamburg-Altona, planmäßige Abfahrt sechzehn Uhr fünf, verspätet sich um ungefähr zwanzig Minuten. Grund ist eine technische Störung an einem vorausfahrenden Zug. Reisende mit Anschlussverbindungen wenden sich bitte an das Servicepersonal am Bahnsteig. Wir bitten um Entschuldigung.'
        },
        {
          statement: 'Der Flug nach Madrid fällt heute aus.',
          answer: false,
          audio:
            'Meine Damen und Herren, Ihre Aufmerksamkeit bitte: Für den Flug IB dreihundertsieben nach Madrid hat sich der Ausgang geändert. Das Boarding beginnt nicht wie angekündigt am Ausgang A drei, sondern am Ausgang B sieben. Passagiere nach Madrid begeben sich bitte zum Ausgang B sieben. Der Abflug erfolgt pünktlich. Vielen Dank.'
        },
        {
          statement: 'Die Haltestelle Rathaus wird am Wochenende nicht angefahren.',
          answer: true,
          audio:
            'Liebe Fahrgäste, wegen des Straßenfestes in der Altstadt fährt die Buslinie zwölf am Samstag und Sonntag eine Umleitung. Die Haltestellen Rathaus und Marktstraße können an beiden Tagen nicht bedient werden. Bitte nutzen Sie stattdessen die Ersatzhaltestelle am Stadttheater. Ab Montag früh gilt wieder der normale Fahrplan.'
        },
        {
          statement: 'Das Schiff kommt später an als geplant.',
          answer: false,
          audio:
            'Liebe Gäste an Bord der „Seestern“, hier spricht Ihr Kapitän. Wir haben ruhiges Wetter und liegen gut in der Zeit: Wir erreichen den Hafen von Warnemünde pünktlich um achtzehn Uhr dreißig. Unser Bordrestaurant auf Deck zwei ist noch bis achtzehn Uhr geöffnet. Ich wünsche Ihnen eine angenehme restliche Überfahrt.'
        },
        {
          statement: 'Autofahrer sollen heute im Parkhaus P drei parken.',
          answer: true,
          audio:
            'Sehr geehrte Fluggäste, ein Hinweis für alle, die mit dem Auto angereist sind: Das Parkhaus P eins ist heute vollständig belegt. Bitte nutzen Sie das Parkhaus P drei am Terminal zwei. Von dort bringt Sie ein kostenloser Shuttlebus alle zehn Minuten zu den Abflughallen. Wir danken für Ihr Verständnis.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Antworten Sie auf den Brief. Schreiben Sie zu mindestens drei der vier Leitpunkte — zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht.',
    tasks: [
      {
        titel: 'Antwort an das Busreiseunternehmen',
        situation:
          'Sie haben eine viertägige Busreise nach Wien gebucht. Zwei Wochen vor der Abfahrt bekommen Sie eine E-Mail vom Reiseveranstalter.',
        incoming: {
          von: 'info@busreisen-mueller.de',
          betreff: 'Ihre Busreise nach Wien — wichtige Änderungen',
          text: `Liebe Reisegäste,

in zwei Wochen beginnt unsere viertägige Busreise nach Wien, für die Sie sich angemeldet haben. Heute müssen wir Ihnen leider eine Änderung mitteilen: Wegen einer Großbaustelle auf der Autobahn fährt der Bus nicht wie geplant um 8 Uhr ab, sondern bereits um 6.30 Uhr.

Bitte teilen Sie uns außerdem mit, wo Sie zusteigen möchten: am Hauptbahnhof oder am Messeplatz.

Am zweiten Reisetag bieten wir eine Stadtführung mit einem österreichischen Reiseleiter an. Sie kostet 12 Euro extra — bitte schreiben Sie uns, ob Sie daran teilnehmen möchten.

Mit freundlichen Grüßen
Ihr Team von Busreisen Müller`
        },
        leitpunkte: [
          'Bedanken Sie sich für die Informationen.',
          'Sagen Sie, ob die neue Abfahrtszeit für Sie ein Problem ist, und wo Sie zusteigen möchten.',
          'Sagen Sie, ob Sie an der Stadtführung teilnehmen möchten, und begründen Sie das.',
          'Stellen Sie eine Frage zur Reise (zum Beispiel zum Hotel oder zum Gepäck).'
        ],
        musterloesung: `Sehr geehrte Damen und Herren,

vielen Dank für Ihre E-Mail und die Informationen zur Reise nach Wien.

Die neue Abfahrtszeit ist für mich kein Problem, ich stehe gern früh auf. Ich möchte am Hauptbahnhof zusteigen, weil ich von dort eine gute Busverbindung habe.

An der Stadtführung nehme ich sehr gern teil. Ich war noch nie in Wien und möchte möglichst viel über die Stadt erfahren. Kann ich die zwölf Euro direkt im Bus bezahlen?

Eine Frage habe ich noch: Wie viel Gepäck darf ich mitnehmen? Ich würde gern einen großen Koffer und eine kleine Tasche einpacken.

Ich freue mich schon sehr auf die Reise und danke Ihnen für Ihre Mühe.

Mit freundlichen Grüßen
Sofia Martinez`
      }
    ],
    tipps:
      'Kontrollieren Sie am Ende: Anrede und Gruß vorhanden? Mindestens drei Leitpunkte behandelt? Passt der Ton zu einer offiziellen E-Mail? Sie/Ihnen großgeschrieben?'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Kontaktaufnahme',
      anweisung:
        'Sprechen Sie mit Ihrer Partnerin / Ihrem Partner. Lernen Sie sich kennen. Die folgenden Punkte helfen Ihnen.',
      punkte: ['Name', 'Wohnort und Wohnung', 'Familie', 'Beruf oder Ausbildung', 'Sprachen', 'Freizeit'],
      redemittel: [
        'Guten Tag! Darf ich mich vorstellen? Mein Name ist …',
        'Wie lange wohnen Sie schon in …?',
        'Arbeiten Sie, oder machen Sie eine Ausbildung?',
        'Haben Sie Geschwister? / Haben Sie Kinder?',
        'Welche Sprachen sprechen Sie außer Deutsch?',
        'Was machen Sie am liebsten am Wochenende?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Gespräch über ein Thema',
      anweisung:
        'Sie haben in einer Zeitung gelesen: „Immer mehr junge Leute in den Städten verzichten auf ein eigenes Auto.“ Berichten Sie: Wie sind Sie selbst meistens unterwegs? Sagen Sie Ihre Meinung: Braucht man heute noch ein eigenes Auto?',
      punkte: [
        'Berichten Sie, wie Sie selbst meistens unterwegs sind (Auto, Fahrrad, Bus und Bahn).',
        'Wie ist die Situation in Ihrem Heimatland?',
        'Nennen Sie Vorteile UND Nachteile eines Lebens ohne eigenes Auto.',
        'Fragen Sie auch Ihre Partnerin / Ihren Partner nach ihrer/seiner Meinung.'
      ],
      redemittel: [
        'In dem Artikel steht, dass …',
        'Ich persönlich fahre meistens mit …',
        'Bei uns in … ist das ganz anders: …',
        'Ein großer Vorteil ist, dass … / Andererseits …',
        'Wie machen Sie das? Haben Sie ein Auto?',
        'Da haben Sie recht. / Das sehe ich anders, denn …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Ihr Deutschkurs endet bald. Sie möchten zum Abschluss mit dem ganzen Kurs einen Tagesausflug in eine andere Stadt machen. Planen Sie den Ausflug gemeinsam.',
      punkte: [
        'In welche Stadt fahren Sie, und was möchten Sie dort besichtigen?',
        'Wie reisen Sie: mit dem Zug, mit dem Bus oder mit Autos?',
        'Wann fahren Sie los, und wann kommen Sie zurück?',
        'Was darf der Ausflug pro Person kosten?'
      ],
      redemittel: [
        'Wollen wir vielleicht nach … fahren?',
        'Wie wäre es, wenn wir den Zug nehmen?',
        'Das finde ich gut! / Einverstanden!',
        'Ich schlage vor, dass wir früh losfahren, weil …',
        'Wer kümmert sich um die Tickets? — Das kann ich machen.',
        'Gut, dann sind wir uns einig!'
      ]
    }
  }
} as const satisfies TelcExam;

export default exam;
