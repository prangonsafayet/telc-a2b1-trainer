import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 7,
  level: 'b1',
  title: 'Modelltest 7',
  theme: 'Umwelt & Konsum',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Stadt pflanzt tausend neue Bäume',
        'Unverpackt-Laden eröffnet in der Altstadt',
        'Immer mehr Menschen kaufen Kleidung aus zweiter Hand',
        'Pfandsystem für Kaffeebecher gestartet',
        'Weniger Fleisch: Kantinen ändern ihre Speisepläne',
        'Neue Regeln für die Mülltrennung ab Januar',
        'Strom vom Balkon: Kleine Solaranlagen boomen',
        'Supermärkte spenden Lebensmittel statt sie wegzuwerfen',
        'Autofreier Sonntag lockt Tausende in die Innenstadt',
        'Umweltpreis für junge Forscherinnen und Forscher'
      ],
      texts: [
        'Kaffee zum Mitnehmen produziert jede Menge Müll. Damit soll jetzt Schluss sein: Vierzig Cafés und Bäckereien der Stadt machen bei einem neuen Pfandsystem mit. Kundinnen und Kunden zahlen zwei Euro Pfand für einen Mehrwegbecher und können ihn in jedem teilnehmenden Geschäft wieder abgeben. Die Stadt hofft, so mehrere Hunderttausend Einwegbecher pro Jahr zu sparen.',
        'Was passiert mit Brot, Joghurt und Gemüse, die am Abend nicht verkauft sind? Bisher landete vieles davon im Müll. Jetzt haben sich fünfzehn Supermärkte der Stadt mit der Tafel geeinigt: Übrig gebliebene Lebensmittel werden ab sofort jeden Abend abgeholt und an Menschen mit wenig Geld verteilt. Andere Städte interessieren sich bereits für das Modell.',
        'Jeans für fünf Euro, Wintermantel für zwölf: Secondhand-Läden erleben zurzeit einen Boom. Nach einer aktuellen Umfrage hat fast jeder zweite Deutsche im letzten Jahr gebrauchte Kleidung gekauft — deutlich mehr als noch vor fünf Jahren. Die Gründe: Gebrauchte Mode ist billiger und schont die Umwelt. Besonders junge Leute finden Secondhand längst ganz normal.',
        'Wo sonst Autos fahren, wurde am Sonntag Fußball gespielt, geradelt und gepicknickt: Beim ersten autofreien Sonntag blieb die Hauptstraße von zehn bis achtzehn Uhr für den Verkehr gesperrt. Mehrere Tausend Besucherinnen und Besucher nutzten das schöne Wetter. Die Stadt zeigt sich zufrieden und denkt über eine Wiederholung im Herbst nach — dann mit noch mehr Programm.',
        'Strom vom eigenen Balkon: Kleine Solaranlagen, die man am Balkongeländer befestigt, werden immer beliebter. Seit die Regeln vereinfacht wurden, muss man die Geräte nur noch anmelden — eine Genehmigung ist nicht mehr nötig. Wer ein solches Kraftwerk nutzt, kann pro Jahr etwa hundert Euro Stromkosten sparen. Fachleute raten aber, vorher mit dem Vermieter zu sprechen.'
      ],
      answers: [3, 7, 2, 8, 6]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Einkaufen ohne Verpackung',
      text: `Wer den kleinen Laden von Nina Falk in der Altstadt betritt, sucht Plastiktüten vergeblich. Reis, Nudeln, Müsli und sogar Waschmittel gibt es hier nur „unverpackt“: Die Kundinnen und Kunden bringen eigene Gläser und Dosen mit, füllen sie an den großen Behältern selbst und bezahlen an der Kasse nach Gewicht.

„Am Anfang muss man sich umstellen“, gibt die 34-Jährige zu. „Man braucht ein bisschen Planung, und der Einkauf dauert etwas länger als im Supermarkt.“ Dafür kaufe man genau die Menge, die man wirklich braucht. Gerade Menschen, die allein wohnen, werfen dadurch viel weniger weg. Und wer seine Gläser einmal vergessen hat, kann sich im Laden welche leihen oder günstig gegen Pfand kaufen.

Vor der Eröffnung hat Falk drei Jahre in einem großen Supermarkt gearbeitet. Dort störte sie vor allem, wie viel Verpackung schon am frühen Morgen im Container landete. Mit einem Kredit ihrer Bank und mit Hilfe von Freunden baute sie schließlich einen alten Schuhladen um. Seit zwei Jahren läuft das Geschäft inzwischen — nicht glänzend, aber stabil, wie sie sagt. Und jede Woche kommen ein paar neue Gesichter dazu.

Probleme gibt es trotzdem: Viele Produkte sind etwas teurer als im Discounter, weil Falk kleine regionale Lieferanten bevorzugt. Manche Kunden kommen deshalb nur für bestimmte Waren, zum Beispiel Gewürze oder Seife. Falk plant darum einen Lieferservice mit dem Lastenrad und einmal im Monat einen Kochabend im Laden. „Aufgeben“, sagt sie, „ist für mich keine Option. Jedes gesparte Stück Plastik zählt.“`,
      questions: [
        {
          frage: 'In dem Laden …',
          options: [
            'bekommt man an der Kasse Plastiktüten.',
            'füllen die Kunden die Waren selbst ab.',
            'gibt es nur Lebensmittel zu kaufen.'
          ],
          answer: 1
        },
        {
          frage: 'Nina Falk sagt, dass …',
          options: [
            'der Einkauf mehr Zeit braucht als im Supermarkt.',
            'der Einkauf schneller geht als im Supermarkt.',
            'man immer große Mengen kaufen muss.'
          ],
          answer: 0
        },
        {
          frage: 'Wer keine eigenen Gläser dabei hat, …',
          options: [
            'kann an diesem Tag nicht einkaufen.',
            'bekommt Plastiktüten geschenkt.',
            'kann sich im Laden Gläser leihen oder kaufen.'
          ],
          answer: 2
        },
        {
          frage: 'Vor der Eröffnung ihres Ladens hat Nina Falk …',
          options: [
            'in einem großen Supermarkt gearbeitet.',
            'einen Schuhladen geführt.',
            'bei einer Bank gearbeitet.'
          ],
          answer: 0
        },
        {
          frage: 'Für die Zukunft plant sie …',
          options: [
            'niedrigere Preise als der Discounter.',
            'einen Lieferservice mit dem Lastenrad.',
            'die Schließung des Ladens.'
          ],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Ihr Toaster ist kaputt. Sie möchten ihn nicht wegwerfen, sondern reparieren lassen.',
        'Sie suchen ein gebrauchtes Fahrrad für Ihre Tochter.',
        'Sie möchten frisches Gemüse ohne Plastikverpackung kaufen.',
        'Sie haben viele gut erhaltene Kleidungsstücke, die Sie nicht mehr tragen. Wegwerfen möchten Sie sie nicht.',
        'Sie ziehen um. Ihr altes Sofa ist noch gut — Sie möchten es verschenken.',
        'Sie möchten Ihren Balkon so bepflanzen, dass Bienen und andere Insekten Nahrung finden.',
        'Ihre Stromrechnung ist sehr hoch. Sie möchten wissen, wie Sie zu Hause Energie sparen können.',
        'Sie möchten mit Ihren Kindern am Wochenende etwas über die Natur lernen.',
        'Sie möchten Honig kaufen, der aus Ihrer Region kommt.',
        'Sie fahren jeden Tag allein mit dem Auto zur Arbeit und suchen Mitfahrer, um Kosten zu sparen.'
      ],
      ads: [
        'Reparaturtreff im Bürgerhaus: Ehrenamtliche reparieren mit Ihnen Toaster, Radios und Lampen — jeden ersten Samstag im Monat, kostenlos.',
        'Gemüsehof Lindner: Wöchentliche Gemüsekiste direkt vom Feld — ganz ohne Plastik, frei Haus geliefert. Samstags auch am Marktstand!',
        'Elektro-Discounter Watt: Toaster, Wasserkocher und mehr — Neugeräte schon ab 14,99 Euro!',
        'Rad & Tat: Gebrauchte Kinder- und Erwachsenenräder, frisch geprüft, mit sechs Monaten Garantie. Ankauf möglich.',
        'Sozialkaufhaus „Brücke“: Wir nehmen gut erhaltene Kleidung, Geschirr und Spielzeug an — Abgabe Montag bis Freitag, 9 bis 17 Uhr.',
        'verschenk-es.de: Der Online-Marktplatz zum Verschenken — Möbel und Hausrat finden hier neue Besitzer. Einfach Foto hochladen!',
        'Gärtnerei Sommerfeld: Beratung für Balkon und Terrasse — bienenfreundliche Blumen und Kräuter, jetzt in großer Auswahl.',
        'Verbraucherzentrale: Energiesparberatung bei Ihnen zu Hause — wir prüfen Heizung, Geräte und Stromverbrauch. Termin online buchen.',
        'Waldabenteuer für Familien: Führungen mit dem Förster jeden Sonntag — Tiere, Pflanzen und Spiele für Kinder ab 5 Jahren.',
        'Imkerei Blum: Honig aus der Region, direkt vom Erzeuger — Hofverkauf freitags und samstags, Führungen nach Absprache.',
        'pendlerportal-region.de: Finden Sie Fahrgemeinschaften für den Arbeitsweg — kostenlos anmelden, Benzinkosten teilen, Umwelt schonen.',
        'Autohaus Grün: Sparsame Kleinwagen und E-Autos zu fairen Preisen — jetzt Probefahrt vereinbaren!'
      ],
      answers: [0, 3, 1, 4, 5, 6, 7, 8, 9, 10]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrter Herr Wagner,

ich wohne seit drei Jahren [1] Haus Bergstraße 8 und bin eigentlich sehr zufrieden. Leider gibt es seit einigen Wochen ein Problem, [2] ich Ihnen schreiben möchte.

Im Hof stehen nur zwei Mülltonnen, und sie sind oft schon nach wenigen Tagen so voll, [3] die Nachbarn ihre Säcke daneben stellen. Außerdem trennen viele ihren Müll nicht richtig: Papier und Plastik landen [4] derselben Tonne. [5] Sommer riecht es im Hof deshalb sehr unangenehm.

Ich möchte Sie bitten, eine [6] Tonne für Papier zu bestellen. Vielleicht könnte man auch Schilder aufhängen, [7] alle wissen, was in welche Tonne gehört. Meine Nachbarin, [8] ich gestern gesprochen habe, sieht das genauso.

Für Ihre Mühe [9] wir uns schon jetzt herzlich bedanken. Bitte geben Sie mir kurz Bescheid, [10] Sie die Tonne bestellt haben.

Mit freundlichen Grüßen
Amira Haddad`,
      gaps: [
        { options: ['am', 'im', 'beim'], answer: 1 },
        { options: ['über das', 'mit dem', 'für den'], answer: 0 },
        { options: ['obwohl', 'damit', 'dass'], answer: 2 },
        { options: ['an', 'auf', 'in'], answer: 2 },
        { options: ['Am', 'Im', 'Beim'], answer: 1 },
        { options: ['zusätzlichen', 'zusätzliche', 'zusätzliches'], answer: 1 },
        { options: ['denn', 'weil', 'damit'], answer: 2 },
        { options: ['mit dem', 'mit der', 'mit den'], answer: 1 },
        { options: ['möchte', 'möchtet', 'möchten'], answer: 2 },
        { options: ['bevor', 'sobald', 'während'], answer: 1 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Frau Lindner,

eine Freundin bekommt Ihre Gemüsekiste schon lange und ist sehr [1] damit. Ich möchte weniger [2] produzieren und mehr regionale Produkte kaufen. Deshalb interessiere ich mich für ein [3] für die kleine Kiste.

Ich hätte aber noch ein paar Fragen: Wie hoch ist der [4] für eine Lieferung pro Woche? Und ist es möglich, die Lieferung zu [5], wenn ich im Urlaub bin?

Ich wohne im dritten Stock. Stellen Ihre Fahrer die Kiste einfach vor die [6], oder muss ich zu Hause sein? Außerdem esse ich keine Pilze. Kann ich einzelne Produkte gegen andere [7]?

Auf Ihrer Internetseite habe ich zu diesen Fragen leider keine [8] gefunden. Bitte schicken Sie mir auch die aktuelle [9] mit allen Produkten und Sorten.

Ich freue mich darauf, bald zu Ihren [10] zu gehören!

Mit freundlichen Grüßen
Petar Novak`,
      wordBank: [
        'Abo',
        'bestellen',
        'Garten',
        'Informationen',
        'Kunden',
        'Liste',
        'Müll',
        'Nachbarn',
        'Preis',
        'Rechnung',
        'tauschen',
        'teuer',
        'Tür',
        'unterbrechen',
        'zufrieden'
      ],
      answers: [14, 6, 0, 8, 13, 12, 10, 3, 5, 4]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Renate lädt zu einem Flohmarkt im Hof ein.',
          answer: true,
          audio:
            'Hallo Jana, hier ist Renate aus dem zweiten Stock. Wir organisieren am Samstag einen kleinen Flohmarkt bei uns im Hof — jeder kann einen Tisch aufstellen und Sachen verkaufen, die er nicht mehr braucht. Hättest du Lust mitzumachen? Sag mir bitte bis Donnerstag Bescheid, dann reserviere ich dir einen Tisch. Tschüss!'
        },
        {
          statement: 'Die Mülltonnen werden in dieser Woche wie gewohnt geleert.',
          answer: false,
          audio:
            'Und hier noch ein Hinweis für unsere Hörerinnen und Hörer: Wegen des Feiertags am Donnerstag verschiebt sich die Müllabfuhr in dieser Woche um einen Tag. Die grauen und die gelben Tonnen werden also erst am Freitag geleert. Bitte stellen Sie Ihre Tonnen deshalb erst am Donnerstagabend an die Straße.'
        },
        {
          statement: 'Kunden dürfen an der Frischetheke eigene Dosen benutzen.',
          answer: true,
          audio:
            'Liebe Kundinnen und Kunden, ein Hinweis: An unserer Käse- und Wursttheke können Sie sich Ihre Einkäufe ab sofort in Ihre eigenen, sauberen Dosen füllen lassen. So sparen wir gemeinsam eine Menge Verpackungsmüll. Fragen Sie einfach unser Personal an der Theke. Vielen Dank, dass Sie mit uns die Umwelt schonen!'
        },
        {
          statement: 'Die Reparatur wird billiger als geplant.',
          answer: false,
          audio:
            'Guten Tag, hier ist die Fahrradwerkstatt Pedale, eine Nachricht für Herrn Costa: Bei Ihrem Rad ist leider nicht nur die Bremse kaputt, wir müssen auch die Schaltung austauschen. Die Reparatur kostet damit fünfundachtzig Euro statt der geplanten vierzig. Bitte rufen Sie uns zurück und sagen Sie uns, ob wir das machen sollen. Danke!'
        },
        {
          statement: 'Das Wasser an den neuen Brunnen kostet nichts.',
          answer: true,
          audio:
            'Bei diesen sommerlichen Temperaturen noch ein Tipp: In der Innenstadt gibt es jetzt zwölf öffentliche Trinkwasserbrunnen, zum Beispiel am Rathausplatz und im Stadtpark. Dort können Sie Ihre Flasche kostenlos auffüllen — das spart Geld und Plastikflaschen. Einen Stadtplan mit allen Brunnen finden Sie auf der Internetseite der Stadt.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Guten Tag und willkommen bei „Engagiert vor Ort“! Mein Gast ist heute Sofia Reiter. Frau Reiter, Sie retten Lebensmittel. Was bedeutet das genau?'
        },
        {
          speaker: 'Sofia Reiter',
          text: 'Unsere Gruppe holt bei Bäckereien, Supermärkten und auf dem Wochenmarkt Lebensmittel ab, die sonst in den Müll wandern würden — Brot vom Vortag, Gemüse mit kleinen Fehlern, Joghurt kurz vor dem Ablaufdatum. Wir verschenken alles weiter, verkauft wird nichts. Allein in Deutschland landen jedes Jahr Millionen Tonnen Essen im Müll — dagegen wollen wir etwas tun.'
        },
        {
          speaker: 'Moderator',
          text: 'Wie sind Sie persönlich dazu gekommen?'
        },
        {
          speaker: 'Sofia Reiter',
          text: 'Ich habe während des Studiums in einer Bäckerei gejobbt. Jeden Abend mussten wir Körbe voller Brot wegwerfen. Das hat mich so geärgert, dass ich etwas ändern wollte.'
        },
        {
          speaker: 'Moderator',
          text: 'Wie funktioniert das Ganze praktisch?'
        },
        {
          speaker: 'Sofia Reiter',
          text: 'Unsere Helferinnen und Helfer holen die Ware zu festen Zeiten ab, kontrollieren sie und bringen sie zu unseren Verteilstationen. Das sind offene Schränke und Kühlschränke, zum Beispiel im Gemeindehaus. Dort darf sich jeder bedienen, und niemand muss dafür etwas bezahlen.'
        },
        {
          speaker: 'Moderator',
          text: 'Wirklich jeder? Oder nur Menschen, die wenig Geld haben?'
        },
        {
          speaker: 'Sofia Reiter',
          text: 'Wirklich jeder. Es geht uns nicht um Armut, sondern darum, dass gutes Essen nicht im Müll landet. Aber natürlich freuen wir uns, wenn es besonders den Menschen hilft, die sparen müssen.'
        },
        {
          speaker: 'Moderator',
          text: 'Wie groß ist Ihre Gruppe inzwischen?'
        },
        {
          speaker: 'Sofia Reiter',
          text: 'Wir sind ungefähr achtzig Aktive und retten mehrere Tonnen Lebensmittel im Jahr. Trotzdem ist es nicht immer leicht: Manche Geschäfte haben Angst, Ärger zu bekommen, wenn jemand von den Lebensmitteln krank wird. Da braucht man viel Geduld und gute Argumente. Inzwischen arbeiten aber mehr als zwanzig Geschäfte fest mit uns zusammen.'
        },
        {
          speaker: 'Moderator',
          text: 'Gibt es Lebensmittel, die Sie nicht verteilen?'
        },
        {
          speaker: 'Sofia Reiter',
          text: 'Ja, bei der Sicherheit machen wir keine Kompromisse: Produkte mit abgelaufenem Verbrauchsdatum, zum Beispiel frisches Hackfleisch, nehmen wir grundsätzlich nicht an. Das Mindesthaltbarkeitsdatum ist dagegen kein Problem — viele Sachen sind danach noch lange gut.'
        },
        {
          speaker: 'Moderator',
          text: 'Hat diese Arbeit Ihr eigenes Leben verändert?'
        },
        {
          speaker: 'Sofia Reiter',
          text: 'Sehr! Ich kaufe heute viel weniger ein als früher und koche viel kreativer, weil ich oft erst am Abend weiß, welches Gemüse da ist. Für nächstes Jahr planen wir drei neue Verteilstationen und eine Zusammenarbeit mit zwei Schulen. Und wer mitmachen möchte: Jeden ersten Mittwoch im Monat gibt es einen Infoabend im Gemeindehaus.'
        },
        {
          speaker: 'Moderator',
          text: 'Frau Reiter, herzlichen Dank für das Gespräch!'
        }
      ],
      statements: [
        {
          statement: 'Die Gruppe verkauft die geretteten Lebensmittel zu günstigen Preisen.',
          answer: false
        },
        { statement: 'Sofia Reiter hat früher in einer Bäckerei gejobbt.', answer: true },
        { statement: 'Die Helfer holen die Ware zu festen Zeiten ab.', answer: true },
        {
          statement: 'Die Lebensmittel sind nur für Menschen mit wenig Geld gedacht.',
          answer: false
        },
        { statement: 'Die Gruppe hat rund achtzig aktive Mitglieder.', answer: true },
        { statement: 'Alle Geschäfte machen sofort gern mit.', answer: false },
        {
          statement: 'Produkte mit abgelaufenem Verbrauchsdatum werden nicht angenommen.',
          answer: true
        },
        { statement: 'Sofia Reiter kauft heute mehr Lebensmittel ein als früher.', answer: false },
        {
          statement: 'Die Gruppe möchte im nächsten Jahr neue Verteilstationen eröffnen.',
          answer: true
        },
        {
          statement: 'Der Infoabend für neue Helfer findet einmal pro Woche statt.',
          answer: false
        }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf Durchsagen. Sie hören jede Durchsage einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Im Zug nach Freiburg gibt es heute noch freie Plätze für Fahrräder.',
          answer: false,
          audio:
            'Sehr geehrte Fahrgäste am Gleis zwei: Im Regionalzug nach Freiburg ist die Fahrradmitnahme heute leider nicht mehr möglich, da das Fahrradabteil bereits voll besetzt ist. Radfahrerinnen und Radfahrer nutzen bitte den nächsten Zug um fünfzehn Uhr dreißig, der über zusätzliche Fahrradplätze verfügt. Vielen Dank für Ihr Verständnis.'
        },
        {
          statement: 'Der Recyclinghof ist samstags künftig länger geöffnet.',
          answer: true,
          audio:
            'Eine Information des Recyclinghofs Nord: Ab dem ersten März gelten neue Öffnungszeiten. Wir haben dann auch samstags von acht bis sechzehn Uhr für Sie geöffnet — vier Stunden länger als bisher. Elektrogeräte, Farben und alte Möbel nehmen wir wie immer kostenlos an. Alle Informationen finden Sie auch im Internet.'
        },
        {
          statement: 'Das Pfandgeschirr kann man an zwei Ständen zurückgeben.',
          answer: true,
          audio:
            'Liebe Gäste des Stadtfestes! Auf unserem Fest gibt es dieses Jahr kein Einweggeschirr. Für Becher und Teller zahlen Sie zwei Euro Pfand. Bitte bringen Sie das Geschirr nach dem Essen zu einem der Pfandstände zurück — Sie finden sie am Haupteingang und neben der Bühne. Danke, dass Sie mithelfen, Müll zu vermeiden!'
        },
        {
          statement: 'Ohne Kassenbon bekommt man den Kaufpreis nicht zurück.',
          answer: false,
          audio:
            'Liebe Kundinnen und Kunden, eine wichtige Mitteilung: Der Hersteller ruft den Erdbeerjoghurt der Marke „Landgut“, fünfhundert Gramm, zurück. In einzelnen Bechern können sich kleine Plastikteile befinden. Bitte essen Sie diesen Joghurt nicht. Sie können ihn an der Information zurückgeben — den Kaufpreis erstatten wir Ihnen selbstverständlich auch ohne Kassenbon.'
        },
        {
          statement: 'Grillen ist zurzeit nur an den festen Grillplätzen am See erlaubt.',
          answer: true,
          audio:
            'Liebe Besucherinnen und Besucher des Stadtparks, wegen der großen Trockenheit gilt ab sofort: Grillen ist nur noch an den festen Grillplätzen am See erlaubt. Offenes Feuer auf den Wiesen ist streng verboten. Bitte werfen Sie außerdem keine Zigaretten ins Gras. Wir danken Ihnen für Ihre Rücksicht.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Antworten Sie auf den Brief. Schreiben Sie zu mindestens drei der vier Leitpunkte — zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht.',
    tasks: [
      {
        titel: 'Antwort an die Umweltgruppe',
        situation:
          'Sie wohnen seit zwei Jahren in Ihrem Stadtteil. Heute bekommen Sie eine E-Mail von einer Nachbarschaftsinitiative.',
        incoming: {
          von: 'info@gruenes-viertel.de',
          betreff: 'Aufräumaktion im Stadtpark — helfen Sie mit?',
          text: `Liebe Nachbarinnen und Nachbarn,

am kommenden Samstag von 10 bis 14 Uhr wollen wir gemeinsam den Stadtpark vom Müll befreien. Handschuhe, Zangen und Säcke stellen wir, die Stadtreinigung holt die vollen Säcke am Abend ab.

Zum Abschluss gibt es ein gemeinsames Picknick auf der großen Wiese. Machen Sie mit? Können Sie vielleicht etwas für das Picknick beitragen? Und kennen Sie weitere Nachbarn, die helfen möchten?

Wir freuen uns über jede Antwort!

Herzliche Grüße
Ihre Initiative „Grünes Viertel“`
        },
        leitpunkte: [
          'Bedanken Sie sich für die Einladung.',
          'Sagen Sie, ob Sie teilnehmen, und begründen Sie das.',
          'Schreiben Sie, was Sie zum Picknick beitragen können.',
          'Stellen Sie eine Frage zur Aktion.'
        ],
        musterloesung: `Liebe Initiative „Grünes Viertel“,

vielen Dank für Ihre E-Mail und die Einladung zur Aufräumaktion.

Ich mache sehr gern mit. Ich gehe oft mit meinen Kindern in den Stadtpark, und der viele Müll dort ärgert mich schon lange. Am Samstag habe ich Zeit und bringe auch meinen Sohn mit — er ist zehn Jahre alt und möchte unbedingt helfen.

Zum Picknick kann ich gern etwas beitragen: Ich backe Brot und bringe außerdem Apfelsaft vom Markt mit. Sagen Sie mir einfach, für wie viele Personen ich ungefähr planen soll.

Eine Frage habe ich noch: Wo genau treffen wir uns am Samstag? Und was passiert, wenn es regnet — fällt die Aktion dann aus?

Ich freue mich auf Samstag!

Herzliche Grüße
Ana Marić`
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
      punkte: [
        'Name',
        'Wohnort und Umgebung',
        'Familie',
        'Beruf oder Ausbildung',
        'Einkaufen und Alltag',
        'Freizeit und Natur'
      ],
      redemittel: [
        'Guten Tag, ich heiße … Und Sie?',
        'Wo wohnen Sie? Gefällt es Ihnen dort?',
        'Was machen Sie beruflich?',
        'Wo kaufen Sie am liebsten ein — auf dem Markt oder im Supermarkt?',
        'Sind Sie gern draußen in der Natur?',
        'Ach, wirklich? Das finde ich interessant!'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Gespräch über ein Thema',
      anweisung:
        'Sie haben in einer Zeitschrift gelesen: „Immer mehr Menschen kaufen gebrauchte Sachen statt neuer Produkte.“ Berichten Sie: Kaufen Sie manchmal gebrauchte Dinge? Sagen Sie Ihre Meinung: Was spricht dafür, was dagegen?',
      punkte: [
        'Berichten Sie über eigene Erfahrungen mit gebrauchten Sachen (Kleidung, Möbel, Handy …).',
        'Wie ist die Situation in Ihrem Heimatland?',
        'Nennen Sie Vorteile UND Nachteile von Secondhand-Käufen.',
        'Fragen Sie auch Ihre Partnerin / Ihren Partner nach ihrer/seiner Meinung.'
      ],
      redemittel: [
        'Ich habe gelesen, dass …',
        'Ich habe einmal … gebraucht gekauft, und …',
        'Bei uns in … ist das ganz normal / eher selten.',
        'Dafür spricht, dass … / Dagegen spricht, dass …',
        'Kaufen Sie auch manchmal gebrauchte Sachen?',
        'Da bin ich ganz Ihrer Meinung. / Das sehe ich anders, weil …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'In Ihrem Wohnhaus möchten Sie mit den Nachbarn eine Tauschbörse organisieren: Jeder bringt gut erhaltene Kleidung, Bücher und Spielzeug mit und tauscht mit den anderen. Planen Sie die Veranstaltung mit Ihrer Partnerin / Ihrem Partner.',
      punkte: [
        'Wann und wo soll die Tauschbörse stattfinden?',
        'Wie informieren Sie die Nachbarn (Aushang, Einladung …)?',
        'Welche Regeln gelten — was darf man mitbringen?',
        'Was passiert mit den Sachen, die übrig bleiben?'
      ],
      redemittel: [
        'Wollen wir die Tauschbörse am … machen?',
        'Wie wäre es mit dem Gemeinschaftsraum im Erdgeschoss?',
        'Ich schlage vor, dass wir einen Aushang machen.',
        'Gute Idee! / Einverstanden!',
        'Wer kümmert sich um …? — Das übernehme ich.',
        'Die übrigen Sachen könnten wir spenden.'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
