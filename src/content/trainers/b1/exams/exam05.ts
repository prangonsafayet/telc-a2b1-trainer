import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 5,
  level: 'b1',
  title: 'Modelltest 5',
  theme: 'Medien & digitale Welt',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Senioren lernen den Umgang mit dem Smartphone',
        'Neue App warnt vor Staus in der Innenstadt',
        'Streamingdienste: Immer mehr Kunden kündigen ihr Abo',
        'Stadtbibliothek bietet jetzt auch E-Books an',
        'Studie: Jugendliche lesen kaum noch gedruckte Zeitungen',
        'Kostenloses WLAN auf öffentlichen Plätzen',
        'Vorsicht: Betrüger verschicken gefälschte Rechnungen per E-Mail',
        'Computerspiele bald als Unterrichtsfach an Schulen?',
        'Immer mehr Radiosender senden nur noch im Internet',
        'Handy am Steuer: Polizei kündigt strenge Kontrollen an'
      ],
      texts: [
        'Die Verbraucherzentrale warnt vor gefälschten E-Mails, die zurzeit im Umlauf sind. Die Nachrichten sehen aus wie Rechnungen bekannter Firmen und fordern die Empfänger auf, schnell Geld zu überweisen. Wer auf den Link klickt, riskiert außerdem einen Virus auf dem Computer. Die Experten raten: solche E-Mails sofort löschen und auf keinen Fall persönliche Daten eingeben.',
        'Wie schreibe ich eine Nachricht? Wie speichere ich eine Telefonnummer? Im Mehrgenerationenhaus zeigen Schülerinnen und Schüler älteren Menschen jeden Mittwochnachmittag geduldig, wie ihr Smartphone funktioniert. Das Angebot ist kostenlos, eine Anmeldung ist nicht nötig. „Meine Enkel wohnen weit weg. Jetzt kann ich ihnen endlich selbst Fotos schicken“, freut sich eine 74-jährige Teilnehmerin.',
        'Gute Nachrichten für alle, die unterwegs online gehen wollen: Ab nächstem Monat gibt es auf dem Marktplatz, im Stadtpark und am Bahnhof kostenloses Internet. Die Stadt bezahlt die Technik, eine Registrierung ist nicht erforderlich — Nutzer verbinden sich einfach mit dem Netz „Stadt-WLAN“. Weitere Plätze sollen folgen, wenn das Angebot gut angenommen wird.',
        'Nur noch acht Prozent der 14- bis 19-Jährigen lesen regelmäßig eine gedruckte Zeitung — vor zehn Jahren waren es noch dreimal so viele. Das zeigt eine aktuelle Untersuchung. Ihre Nachrichten bekommen die meisten Jugendlichen heute über soziale Netzwerke und Videoplattformen. Forscher sehen das kritisch, denn dort verbreiten sich auch falsche Meldungen sehr schnell.',
        'Wer einen Ausweis der Stadtbibliothek besitzt, kann ab sofort auch digital lesen: Über die neue Online-Ausleihe stehen mehr als zehntausend E-Books, Hörbücher und Zeitschriften bereit. Die Ausleihe funktioniert rund um die Uhr von zu Hause aus und kostet nichts extra. Nach drei Wochen werden die Titel automatisch zurückgegeben — Mahngebühren gibt es also nicht.'
      ],
      answers: [6, 0, 5, 4, 3]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Ferien ohne Internet — Erholung oder Stress?',
      text: `Beim Frühstück schnell die Nachrichten lesen, am See Fotos posten, abends eine Serie streamen: Für viele Menschen gehört das Smartphone auch im Urlaub selbstverständlich dazu. Das kleine Hotel „Bergblick“ in den Alpen geht einen anderen Weg. Wer hier eincheckt, gibt sein Handy freiwillig an der Rezeption ab — und bekommt es erst bei der Abreise zurück.

„Am Anfang haben uns viele für verrückt erklärt“, erzählt der Besitzer Martin Huber. „Heute sind wir oft Monate im Voraus ausgebucht.“ Statt WLAN bietet das Haus Wanderkarten, eine kleine Bibliothek und lange Abende am Kamin. Wer dringend telefonieren muss, kann das Telefon an der Rezeption benutzen — Notfälle sind also kein Problem.

Die Gäste reagieren ganz unterschiedlich. „Die ersten zwei Tage war ich richtig nervös und habe ständig in meine leere Jackentasche gegriffen“, berichtet die Lehrerin Sandra Krüger, die schon zum zweiten Mal hier Urlaub macht. „Danach habe ich zum ersten Mal seit Jahren wieder ein ganzes Buch gelesen.“ Es gibt aber auch Gäste, die früher abreisen, weil sie die Ruhe nicht aushalten.

Wissenschaftler beobachten das Konzept mit großem Interesse. Eine Psychologin der Universität Innsbruck begleitet das Hotel seit zwei Jahren und befragt regelmäßig die Gäste. Ihr erstes Ergebnis: Die meisten schlafen schon nach wenigen Tagen besser und fühlen sich deutlich erholter als im Alltag. Herr Huber plant deshalb bereits ein zweites Haus am Bodensee. Nur eines will er auf keinen Fall ändern: Handys bleiben auch dort draußen.`,
      questions: [
        {
          frage: 'Im Hotel „Bergblick“ …',
          options: [
            'gibt es WLAN nur an der Rezeption.',
            'geben die Gäste ihr Handy bei der Ankunft ab.',
            'sind Handys im Zimmer erlaubt.'
          ],
          answer: 1
        },
        {
          frage: 'Martin Huber sagt, dass …',
          options: [
            'das Hotel oft lange im Voraus ausgebucht ist.',
            'viele Gäste das Hotel verrückt finden und wegbleiben.',
            'das Hotel bald WLAN anbieten will.'
          ],
          answer: 0
        },
        {
          frage: 'Wer dringend telefonieren muss, …',
          options: [
            'bekommt sein Handy für eine Stunde zurück.',
            'muss dafür ins nächste Dorf gehen.',
            'kann das Telefon an der Rezeption benutzen.'
          ],
          answer: 2
        },
        {
          frage: 'Sandra Krüger …',
          options: [
            'war am Anfang ohne Handy sehr unruhig.',
            'ist nach zwei Tagen wieder abgereist.',
            'macht zum ersten Mal Urlaub in dem Hotel.'
          ],
          answer: 0
        },
        {
          frage: 'Die Psychologin hat herausgefunden, dass …',
          options: [
            'viele Gäste schlechter schlafen als zu Hause.',
            'sich die meisten Gäste schnell erholen.',
            'die Gäste ein zweites Haus am Bodensee wünschen.'
          ],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Ihr Laptop startet nicht mehr, und Sie brauchen ihn dringend für die Arbeit.',
        'Ihre Großmutter möchte lernen, wie man Videoanrufe mit der Familie macht.',
        'Ihr Sportverein braucht endlich eine eigene Internetseite.',
        'Sie möchten alte Videokassetten von Familienfesten digital speichern lassen.',
        'Ihr Sohn (12) möchte in den Ferien programmieren lernen.',
        'Sie suchen ein günstiges gebrauchtes Smartphone mit Garantie.',
        'Das Internet in Ihrer Wohnung ist sehr langsam. Sie möchten den Anbieter wechseln.',
        'Sie brauchen professionelle Fotos für Ihre Online-Bewerbung.',
        'Eine Freundin möchte einen eigenen Podcast starten und sucht eine Einführung in die Technik.',
        'Sie möchten alte Filme lieber im Kino auf großer Leinwand sehen statt zu Hause.'
      ],
      ads: [
        'Computerhilfe Blitz: Wir reparieren Laptops und PCs — Express-Service innerhalb von 24 Stunden, Abholung möglich.',
        'Fotostudio Lichtblick: Bewerbungsfotos digital und gedruckt, in 30 Minuten fertig. Termine auch samstags!',
        'Medienwerkstatt: Wochenendworkshop „Mein erster Podcast“ — Aufnahme, Schnitt und Veröffentlichung für Anfänger.',
        'Elektromarkt Megawatt: Die neuesten Smartphones und Tablets — jetzt mit Null-Prozent-Finanzierung!',
        'Handy-Oase: An- und Verkauf gebrauchter Smartphones — alle Geräte geprüft, mit 12 Monaten Garantie.',
        'Volkshochschule: Kurs „Smartphone und Tablet für Seniorinnen und Senioren“ — Schritt für Schritt, mit viel Zeit zum Üben. Videotelefonie inklusive!',
        'Ferienprogramm im Jugendzentrum: Coding-Camp für Kinder von 10 bis 14 Jahren — spielerisch die erste eigene App programmieren.',
        'Studio Retro: Wir digitalisieren Ihre Videokassetten, Dias und Schallplatten — sicher, schnell und günstig.',
        'Kino Lumière: Jeden Donnerstag Filmklassiker auf großer Leinwand im historischen Saal — Karten ab 6 Euro.',
        'Netzprofi: Unabhängige Beratung beim Wechsel des Internetanbieters — wir finden den schnellsten Tarif für Ihre Adresse.',
        'Webatelier Krause: Moderne Internetseiten für Vereine und kleine Firmen — günstige Pauschalpreise, Pflege inklusive.',
        'Spieletreff Pixel: Computerspiele-Abend für Erwachsene — jeden Freitag Turniere und Retro-Games, Eintritt frei.'
      ],
      answers: [0, 5, 10, 7, 6, 4, 9, 1, 2, 8]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrte Damen und Herren,

vor zwei Wochen habe ich in Ihrem Online-Shop einen Laptop bestellt, [1] leider bis heute nicht angekommen ist. Als ich Ihre Hotline angerufen habe, sagte mir ein Mitarbeiter, [2] das Paket schon unterwegs sei. In der Sendungsverfolgung steht aber seit zehn Tagen, dass das Paket noch [3] Lager liegt.

Ich brauche den Laptop dringend [4] meine Arbeit. Das Paket [5] schon vor einer Woche bei mir ankommen sollen. Bitte teilen Sie mir mit, [6] das Paket jetzt wirklich ist. Außerdem bitte ich Sie, mir die Lieferkosten [7].

Ich hoffe, dass ich nicht noch [8] warten muss. Sie erreichen mich am besten [9] E-Mail. Ich erwarte Ihre Antwort [10] Ende der Woche.

Mit freundlichen Grüßen
Elena Petrova`,
      gaps: [
        { options: ['den', 'der', 'dem'], answer: 1 },
        { options: ['dass', 'ob', 'weil'], answer: 0 },
        { options: ['am', 'im', 'um'], answer: 1 },
        { options: ['für', 'gegen', 'um'], answer: 0 },
        { options: ['wäre', 'hätte', 'würde'], answer: 1 },
        { options: ['wohin', 'woher', 'wo'], answer: 2 },
        { options: ['zurückzuzahlen', 'zurückzahlen', 'zurückgezahlt'], answer: 0 },
        { options: ['länger', 'lange', 'am längsten'], answer: 0 },
        { options: ['mit', 'auf', 'per'], answer: 2 },
        { options: ['seit', 'bis', 'ab'], answer: 1 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrter Herr Lang,

im Programm der Volkshochschule habe ich gelesen, dass Sie einen Kurs „Sicher im [1]“ anbieten. Dafür [2] ich mich sehr.

Ich benutze Computer und Smartphone zwar jeden Tag, aber ich habe oft [3], dass ich etwas falsch mache — zum Beispiel bei Passwörtern oder beim Online-Banking. Ein Kollege hat mir Ihren Kurs [4].

Leider habe ich noch einige Fragen: Auf Ihrer Internetseite steht kein [5] für den Kursbeginn. Können Sie mir sagen, wann der Kurs anfängt? Ich arbeite bis 17 Uhr und könnte erst ab 18 Uhr [6].

Außerdem möchte ich wissen, ob ich meinen eigenen Laptop [7] soll oder ob es im Kursraum Geräte gibt.

Ich würde mich freuen, wenn Sie mir diese [8] per E-Mail beantworten könnten. Bitte schicken Sie mir auch das Formular für die [9].

Vielen Dank im [10] für Ihre Mühe!

Mit freundlichen Grüßen
Olga Danilova`,
      wordBank: [
        'Angst',
        'Anmeldung',
        'Antwort',
        'Ausflug',
        'empfohlen',
        'erklärt',
        'Fragen',
        'interessiere',
        'Internet',
        'kündigen',
        'mitbringen',
        'teilnehmen',
        'Termin',
        'Unterricht',
        'Voraus'
      ],
      answers: [8, 7, 0, 4, 12, 11, 10, 6, 1, 14]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Der Laptop ist repariert und kann noch heute abgeholt werden.',
          answer: true,
          audio:
            'Guten Tag, hier ist Computerhilfe Blitz, Ihre Werkstatt am Marktplatz. Ihr Laptop ist fertig repariert — wir haben die Festplatte ausgetauscht, und alle Ihre Daten sind gerettet. Sie können das Gerät ab sofort bei uns abholen, wir haben heute bis achtzehn Uhr geöffnet. Bitte bringen Sie Ihren Abholschein mit. Auf Wiederhören!'
        },
        {
          statement: 'Der Hauptpreis des Gewinnspiels ist ein neues Smartphone.',
          answer: false,
          audio:
            'Und jetzt unser großes Sommer-Gewinnspiel! Beantworten Sie unsere Frage des Tages und gewinnen Sie mit etwas Glück den Hauptpreis: ein nagelneues Tablet! Außerdem verlosen wir zehnmal zwei Kinokarten. Rufen Sie bis zwölf Uhr an oder schreiben Sie uns über unsere App. Der Anruf kostet fünfzig Cent aus allen Netzen. Viel Glück!'
        },
        {
          statement: 'Störungen kann man auch über das Internet melden.',
          answer: true,
          audio:
            'Herzlich willkommen bei Telnet, Ihrem Internetanbieter. Zurzeit sind leider alle Leitungen belegt. Bitte bleiben Sie in der Leitung oder versuchen Sie es später noch einmal. Übrigens: Viele Anliegen können Sie auch rund um die Uhr in unserem Kundenportal im Internet erledigen — zum Beispiel Störungen melden oder Ihre Rechnungen ansehen. Vielen Dank für Ihre Geduld.'
        },
        {
          statement: 'Lea möchte das Treffen komplett absagen.',
          answer: false,
          audio:
            'Hi Deniz, hier ist Lea! Du, wegen unseres Serienabends morgen: Ich schaffe es leider nicht, ich muss länger arbeiten. Können wir den Abend auf Sonntag verschieben? Dann bringe ich auch Pizza für uns mit. Absagen will ich auf keinen Fall — ich freue mich schon die ganze Woche darauf! Schreib mir kurz, ob Sonntag bei dir klappt. Ciao!'
        },
        {
          statement: 'Der Computerkurs beginnt heute später als sonst.',
          answer: false,
          audio:
            'Liebe Kursteilnehmerinnen und Kursteilnehmer, eine wichtige Mitteilung der Volkshochschule: Der Kurs „Fotobearbeitung am Computer“ fällt heute Abend leider komplett aus, weil der Dozent erkrankt ist. Der Unterricht wird nächste Woche am selben Tag und zur selben Uhrzeit nachgeholt. Alle anderen Kurse finden wie geplant statt. Vielen Dank für Ihr Verständnis.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Herzlich willkommen zu unserer Sendung „Familienzeit“! Heute sprechen wir über Kinder und Smartphones. Zu Gast ist die Medienpädagogin Julia Weber. Frau Weber, was genau macht eigentlich eine Medienpädagogin?'
        },
        {
          speaker: 'Julia Weber',
          text: 'Ich besuche Schulen und Kindergärten und spreche dort mit Kindern, aber auch mit Eltern und Lehrern über den Umgang mit Handys, Computerspielen und dem Internet. Außerdem biete ich Workshops für ganze Familien an.'
        },
        {
          speaker: 'Moderator',
          text: 'In welchem Alter bekommen Kinder heute ihr erstes eigenes Smartphone?'
        },
        {
          speaker: 'Julia Weber',
          text: 'Viel früher als noch vor zehn Jahren. Die meisten Kinder bekommen ihr erstes Gerät heute schon in der Grundschule, oft zum Wechsel auf die weiterführende Schule. Manche sogar noch früher.'
        },
        {
          speaker: 'Moderator',
          text: 'Viele Eltern haben dabei ein schlechtes Gewissen. Sind Smartphones für Kinder denn grundsätzlich schlecht?'
        },
        {
          speaker: 'Julia Weber',
          text: 'Nein, das würde ich so nicht sagen. Verbote bringen wenig. Kinder wachsen mit diesen Geräten auf, und sie müssen lernen, vernünftig damit umzugehen. Wichtig ist, dass die Eltern sie dabei begleiten.'
        },
        {
          speaker: 'Moderator',
          text: 'Was empfehlen Sie den Familien konkret?'
        },
        {
          speaker: 'Julia Weber',
          text: 'Feste Regeln, die für alle gelten. Zum Beispiel: Beim Essen bleiben alle Handys in einer Kiste — auch das von Mama und Papa. Kinder beobachten nämlich sehr genau, wie oft die Erwachsenen selbst auf ihr Display schauen.'
        },
        {
          speaker: 'Moderator',
          text: 'Und wie lange darf ein Kind am Tag ans Handy? Gibt es da eine klare Zahl?'
        },
        {
          speaker: 'Julia Weber',
          text: 'Eine feste Minutenzahl halte ich für wenig sinnvoll. Es kommt viel mehr darauf an, was das Kind macht: Eine Stunde an einem eigenen Video basteln ist etwas ganz anderes als eine Stunde lang fremde Videos anschauen.'
        },
        {
          speaker: 'Moderator',
          text: 'Sie machen auch Workshops mit Schulklassen. Was passiert da?'
        },
        {
          speaker: 'Julia Weber',
          text: 'Die Kinder drehen dort selbst kurze Videos und bauen absichtlich falsche Nachrichten. So verstehen sie am besten, wie leicht man Bilder und Informationen manipulieren kann — und glauben danach nicht mehr alles, was sie im Netz sehen.'
        },
        {
          speaker: 'Moderator',
          text: 'Gab es in Ihrer Arbeit etwas, das Sie überrascht hat?'
        },
        {
          speaker: 'Julia Weber',
          text: 'Ja! Viele Kinder wünschen sich selbst Pausen vom Handy. In einer Umfrage an einer Schule sagte über die Hälfte der Klasse, dass sie sich mehr gemeinsame Zeit mit den Eltern wünscht — ohne Bildschirm.'
        },
        {
          speaker: 'Moderator',
          text: 'Was wünschen Sie sich für die Zukunft?'
        },
        {
          speaker: 'Julia Weber',
          text: 'Ich wünsche mir, dass Medienkunde ein normales Schulfach wird, so wie Mathematik oder Sport. Bis dahin mache ich einfach weiter mit meinen Besuchen — die nächsten Monate bin ich übrigens schon komplett ausgebucht.'
        }
      ],
      statements: [
        {
          statement: 'Frau Weber arbeitet nur mit Kindern, nicht mit Eltern oder Lehrern.',
          answer: false
        },
        {
          statement: 'Die meisten Kinder bekommen ihr erstes Smartphone schon in der Grundschulzeit.',
          answer: true
        },
        { statement: 'Frau Weber möchte Smartphones für Kinder verbieten.', answer: false },
        { statement: 'Beim Essen sollen auch die Eltern ihre Handys weglegen.', answer: true },
        {
          statement: 'Kinder achten genau darauf, wie oft ihre Eltern aufs Handy schauen.',
          answer: true
        },
        {
          statement: 'Frau Weber empfiehlt eine feste Minutenzahl pro Tag.',
          answer: false
        },
        {
          statement: 'In den Workshops schauen sich die Kinder nur fertige Videos an.',
          answer: false
        },
        {
          statement: 'Viele Kinder wünschen sich selbst manchmal Zeit ohne Bildschirm.',
          answer: true
        },
        {
          statement: 'Frau Weber möchte, dass Medienkunde ein Schulfach wird.',
          answer: true
        },
        {
          statement: 'Frau Weber hat in den nächsten Monaten noch viele Termine frei.',
          answer: false
        }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf Durchsagen. Sie hören jede Durchsage einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Der Zug nach Hannover fällt heute aus.',
          answer: true,
          audio:
            'Information zu Gleis drei: Der Regionalexpress nach Hannover, planmäßige Abfahrt sechzehn Uhr zwanzig, fällt heute wegen einer technischen Störung leider aus. Reisende nutzen bitte den Regionalzug um sechzehn Uhr fünfundvierzig vom selben Gleis. Ihre Fahrkarten behalten selbstverständlich ihre Gültigkeit. Wir bitten, die Unannehmlichkeiten zu entschuldigen.'
        },
        {
          statement: 'Das Angebot für die Fernseher gilt die ganze Woche.',
          answer: false,
          audio:
            'Liebe Kundinnen und Kunden, beachten Sie unser Tagesangebot in der Fernsehabteilung: Alle Fernseher der Marke Vision sind heute um zwanzig Prozent reduziert. Das Angebot gilt nur heute und nur, solange der Vorrat reicht. Unsere Mitarbeiterinnen und Mitarbeiter im zweiten Stock beraten Sie gern. Wir wünschen Ihnen viel Spaß beim Einkaufen!'
        },
        {
          statement: 'Die Besucher bekommen wegen der Verspätung ein kostenloses Getränk.',
          answer: true,
          audio:
            'Liebe Kinobesucherinnen und Kinobesucher, aufgrund eines technischen Problems beginnt die Vorstellung „Sturm über Berlin“ in Saal zwei heute etwa zwanzig Minuten später. Als kleine Entschuldigung erhalten alle Gäste mit einer Eintrittskarte für Saal zwei ein Freigetränk an unserer Bar im Foyer. Vielen Dank für Ihre Geduld.'
        },
        {
          statement: 'Die Bibliothek ist heute länger geöffnet als sonst.',
          answer: false,
          audio:
            'Liebe Besucherinnen und Besucher, wegen einer Personalversammlung schließt die Stadtbibliothek heute bereits um sechzehn Uhr statt um neunzehn Uhr. Die Rückgabe von Büchern und anderen Medien ist weiterhin über den Automaten am Eingang möglich — rund um die Uhr. Ab morgen gelten wieder die gewohnten Öffnungszeiten. Vielen Dank für Ihr Verständnis.'
        },
        {
          statement: 'Für jedes abgegebene Handy wird Geld gespendet.',
          answer: true,
          audio:
            'Meine Damen und Herren, noch bis achtzehn Uhr können Sie im Foyer des Rathauses Ihre alten Handys abgeben. Die Geräte werden umweltgerecht recycelt, und für jedes abgegebene Handy spendet die Stadt zwei Euro an ein Schulprojekt. Bitte entfernen Sie vorher Ihre SIM-Karte. Wir danken allen Teilnehmerinnen und Teilnehmern!'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Antworten Sie auf den Brief. Schreiben Sie zu mindestens drei der vier Leitpunkte — zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht.',
    tasks: [
      {
        titel: 'Antwort an den Nachbarschaftstreff',
        situation:
          'Sie besuchen manchmal den Nachbarschaftstreff in Ihrem Stadtteil. Heute bekommen Sie eine E-Mail von der Leiterin.',
        incoming: {
          von: 'm.albers@nachbarschaftstreff-west.de',
          betreff: 'Neues Digital-Café — machen Sie mit?',
          text: `Liebe Nachbarinnen und Nachbarn,

ab nächstem Monat wollen wir in unserem Treff ein „Digital-Café“ anbieten: Einmal pro Woche helfen Freiwillige älteren Menschen bei Fragen rund um Smartphone, Tablet und Internet.

Dafür suchen wir noch Helferinnen und Helfer. Sie müssen kein Profi sein — Geduld und ein bisschen Erfahrung mit dem Handy genügen. Hätten Sie Lust mitzumachen? Und an welchem Wochentag hätten Sie Zeit?

Über Ideen für das Café freuen wir uns natürlich auch.

Herzliche Grüße
Martina Albers`
        },
        leitpunkte: [
          'Bedanken Sie sich für die Einladung.',
          'Sagen Sie, ob Sie mitmachen möchten, und begründen Sie das.',
          'Schreiben Sie, an welchem Tag Sie Zeit haben.',
          'Machen Sie einen Vorschlag für das Digital-Café.'
        ],
        musterloesung: `Liebe Frau Albers,

vielen Dank für Ihre E-Mail und für die Einladung zum neuen Digital-Café.

Ich mache sehr gern mit. Ich helfe schon jetzt meiner Nachbarin manchmal mit ihrem Smartphone, und es macht mir Freude, anderen etwas zu erklären. Ein Profi bin ich nicht, aber Geduld habe ich genug.

Am besten passt mir der Donnerstag, weil ich da schon um 16 Uhr Feierabend habe. Der Montag wäre zur Not auch möglich.

Ich hätte noch einen Vorschlag: Wir könnten für jedes Treffen ein kleines Thema planen, zum Beispiel „Fotos verschicken“ oder „Sicher bezahlen im Internet“. So wissen die Besucher schon vorher, was sie erwartet.

Ich freue mich auf Ihre Antwort und auf das erste Treffen!

Herzliche Grüße
Olga Danilova`
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
        'Herkunft und Wohnort',
        'Familie',
        'Arbeit oder Ausbildung',
        'Sprachen',
        'Hobbys und Mediennutzung'
      ],
      redemittel: [
        'Darf ich mich vorstellen? Ich heiße …',
        'Wo wohnen Sie? / Wie lange wohnen Sie schon in …?',
        'Was machen Sie beruflich? / Was studieren Sie?',
        'Welche Sprachen sprechen Sie?',
        'Was machen Sie in Ihrer Freizeit am liebsten?',
        'Wirklich? Das interessiert mich auch!'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Gespräch über ein Thema',
      anweisung:
        'Sie haben in einer Zeitschrift gelesen: „Viele Menschen schauen mehr als drei Stunden am Tag auf ihr Smartphone.“ Berichten Sie: Welche Rolle spielen Handy und Internet in Ihrem Alltag? Sagen Sie Ihre Meinung: Was ist gut daran, was ist problematisch?',
      punkte: [
        'Berichten Sie, wofür Sie Handy und Internet täglich benutzen.',
        'Wie ist die Situation in Ihrem Heimatland?',
        'Nennen Sie Vorteile UND Nachteile der ständigen Erreichbarkeit.',
        'Fragen Sie auch Ihre Partnerin / Ihren Partner nach ihrer/seiner Meinung.'
      ],
      redemittel: [
        'Ich habe gelesen, dass …',
        'Ich benutze mein Handy vor allem für …',
        'Bei uns in … ist das ähnlich / ganz anders: …',
        'Einerseits …, andererseits …',
        'Wie ist das bei Ihnen? / Was meinen Sie dazu?',
        'Da haben Sie recht. / Das sehe ich ein bisschen anders, weil …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'In Ihrem Deutschkurs möchten Sie einen gemeinsamen Filmabend organisieren. Planen Sie den Abend mit Ihrer Partnerin / Ihrem Partner.',
      punkte: [
        'Wann und wo soll der Filmabend stattfinden?',
        'Welchen Film schauen Sie — mit oder ohne Untertitel?',
        'Wer kümmert sich um Raum und Technik?',
        'Essen und Getränke — wer bringt was mit?'
      ],
      redemittel: [
        'Wollen wir den Filmabend am … machen?',
        'Wie wäre es mit einem deutschen Film?',
        'Ich schlage vor, dass …',
        'Das ist eine gute Idee! / Einverstanden!',
        'Wer kümmert sich um …? — Das kann ich übernehmen.',
        'Gut, dann machen wir das so!'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
