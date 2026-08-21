import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 9,
  level: 'b2',
  title: 'Modelltest 9',
  theme: 'Gesellschaft & Ehrenamt',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Freiwillige Feuerwehr: Nachwuchsmangel bedroht den Brandschutz',
        'Tafeln melden Rekordandrang — und weniger Spenden',
        'Studie: Ehrenamt hält gesund und macht zufriedener',
        'Neues Gesetz: Mehr Geld für Freiwilligendienste',
        'Nachbarschaftshilfe per App: Start-up vermittelt Helfer',
        'Immer mehr Alleinlebende: Städte suchen Antworten auf Einsamkeit',
        'Vereine klagen über Bürokratie: Jeder dritte Vorstand gibt auf',
        'Integration durch Sport: Fußballverein gewinnt Bundespreis',
        'Jugendliche engagieren sich anders: Projekte statt Vereinsleben',
        'Streit um verkaufsoffene Sonntage: Proteste angekündigt'
      ],
      texts: [
        'Noch nie mussten die Lebensmittelausgaben in Deutschland so viele Menschen versorgen wie derzeit: Nach Angaben des Dachverbandes ist die Zahl der Kundinnen und Kunden innerhalb von zwei Jahren um die Hälfte gestiegen. Gleichzeitig gehen die Spenden der Supermärkte zurück, weil der Handel genauer kalkuliert und weniger übrig bleibt. Manche Ausgabestellen haben deshalb Aufnahmestopps verhängt oder verkürzen die Öffnungszeiten.',
        'Der klassische Vereinsmeier stirbt aus — engagiert sind junge Menschen trotzdem. Eine neue Untersuchung zeigt: Wer unter dreißig ist, bindet sich ungern für Jahre an einen Verein, packt aber bei zeitlich begrenzten Aktionen bereitwillig mit an, etwa bei einem Umwelttag oder einer Spendenkampagne im Internet. Die Forscher raten Organisationen deshalb, kurze und flexible Einsätze anzubieten, statt über die Jugend zu klagen.',
        'Wenn nachts der Alarm ertönt, rücken vielerorts immer weniger Einsatzkräfte aus. Vor allem auf dem Land finden die freiwilligen Wehren kaum noch Aktive, weil viele Berufstätige tagsüber weit entfernt vom Wohnort arbeiten. Der Landesverband warnt, dass mancherorts schon heute die vorgeschriebene Zahl an Einsatzkräften nicht mehr erreicht wird, und fordert Arbeitgeber auf, engagierte Beschäftigte für Einsätze freizustellen.',
        'Einkaufen für die kranke Nachbarin, Hilfe beim Umzug oder jemand, der den Hund ausführt: Ein junges Unternehmen aus Köln bringt über eine Handy-Anwendung Menschen zusammen, die Unterstützung suchen oder anbieten. Wer hilft, sammelt Punkte, die er später selbst gegen Hilfe eintauschen kann. Innerhalb eines Jahres haben sich bereits achtzigtausend Nutzerinnen und Nutzer registriert — die Gründer planen nun die Ausweitung auf weitere Städte.',
        'Steuerrecht, Datenschutz, Versicherungspflichten: Wer heute einen Verein führt, verbringt oft mehr Zeit mit Formularen als mit der eigentlichen Vereinsarbeit. Laut einer Umfrage unter zwölftausend Vereinen denkt jedes dritte Vorstandsmitglied darüber nach, sein Amt niederzulegen. Die Verbände fordern von der Politik einfachere Regeln und eine zentrale Anlaufstelle — sonst drohe vielen kleinen Vereinen das Aus, weil sich niemand mehr für die Leitung findet.'
      ],
      answers: [1, 8, 0, 4, 6]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Die Frau, die Nachbarn verbindet',
      text: `Als Renate Vogel vor sieben Jahren in Rente ging, freute sie sich zunächst auf die freie Zeit. Doch nach wenigen Monaten stellte die frühere Verwaltungsangestellte fest, wie still es um sie geworden war — und dass es vielen in ihrem Viertel ähnlich ging. „Ich kannte eine alte Dame, die tagelang mit niemandem sprach, und eine junge Mutter, die keine Hilfe beim Einkaufen hatte. Die wohnten im selben Haus und wussten nichts voneinander“, erzählt die 67-Jährige.

Aus dieser Beobachtung entstand der Verein „Nachbarn für Nachbarn“. Was mit einem Aushang im Supermarkt und sieben Freiwilligen begann, ist heute ein Netzwerk mit mehr als 120 Aktiven: Sie begleiten Ältere zum Arzt, helfen bei Behördenbriefen, reparieren tropfende Wasserhähne oder trinken einfach einen Kaffee mit Menschen, die sonst niemanden hätten. Vermittelt werden die Einsätze über ein kleines Büro, das an drei Vormittagen in der Woche besetzt ist.

Einfach war der Weg nicht. Im ersten Jahr scheiterte der Verein beinahe an Fragen, an die niemand gedacht hatte: Wer haftet, wenn beim Helfen etwas kaputtgeht? Wie gewinnt man Freiwillige, die sich nicht auf Jahre festlegen wollen? Heute schließt der Verein für alle Aktiven eine Versicherung ab, und wer mitmacht, entscheidet von Einsatz zu Einsatz neu. „Gerade die Jüngeren wollen helfen, aber ohne festen Dienstplan“, sagt Vogel. Die Soziologin Prof. Carmen Ilg bestätigt diesen Trend: Engagement verschwinde nicht, es werde nur flexibler — Organisationen müssten sich darauf einstellen.

Sorgen bereitet Vogel vor allem das Geld: Die Stadt fördert das Büro nur noch bis zum Jahresende, danach ist die Finanzierung offen. Aufhören kommt für sie trotzdem nicht infrage. Nur eines würde sie heute anders machen: „Ich hätte viel früher andere um Hilfe bitten sollen. Zwei Jahre lang wollte ich alles allein regeln — das war mein größter Fehler.“`,
      questions: [
        {
          frage: 'Renate Vogel gründete den Verein, weil …',
          options: [
            'sie nach der Rente Geld verdienen wollte.',
            'ihr auffiel, dass sich Nachbarn gegenseitig nicht kannten und Hilfe fehlte.',
            'die Stadt sie darum gebeten hatte.'
          ],
          answer: 1
        },
        {
          frage: 'Die Freiwilligen des Vereins …',
          options: [
            'helfen bei ganz unterschiedlichen Aufgaben im Alltag.',
            'kümmern sich ausschließlich um ältere Menschen.',
            'arbeiten alle täglich im Vereinsbüro.'
          ],
          answer: 0
        },
        {
          frage: 'Im ersten Jahr hatte der Verein vor allem Probleme mit …',
          options: [
            'zu vielen Hilfsanfragen aus anderen Stadtteilen.',
            'Versicherungsfragen und der Bindung von Freiwilligen.',
            'Beschwerden aus der Nachbarschaft.'
          ],
          answer: 1
        },
        {
          frage: 'Laut Prof. Ilg …',
          options: [
            'verschwindet das Engagement in der Gesellschaft allmählich.',
            'engagieren sich Menschen heute flexibler als früher.',
            'sollten sich Freiwillige langfristig verpflichten.'
          ],
          answer: 1
        },
        {
          frage: 'Rückblickend sagt Vogel, sie hätte …',
          options: [
            'früher andere um Unterstützung bitten sollen.',
            'den Verein nie gründen sollen.',
            'sich stärker um die Finanzierung kümmern sollen.'
          ],
          answer: 0
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Eine Freundin ist Rentnerin und möchte Grundschulkindern beim Lesenlernen helfen.',
        'Sie möchten gut erhaltene Möbel spenden und brauchen jemanden, der sie abholt.',
        'Ein Bekannter ist neu in Deutschland und sucht Kontakt zu Einheimischen, um Deutsch zu sprechen.',
        'Ihre Nachbarin pflegt ihren Mann und braucht stundenweise Entlastung.',
        'Ein Kollege möchte sich am Wochenende draußen für den Naturschutz engagieren.',
        'Ihr Sportverein sucht kostenlose Beratung zu Fördergeldern und Vereinsrecht.',
        'Eine Freundin möchte Geflüchtete ehrenamtlich zu Ämtern und Behörden begleiten.',
        'Die Tochter eines Bekannten möchte nach dem Abitur ein Freiwilliges Soziales Jahr machen.',
        'Ein älterer Herr aus Ihrem Haus fühlt sich einsam und sucht Gesellschaft zum Erzählen und Spielen.',
        'Sie möchten gut erhaltene Winterkleidung für Bedürftige in Ihrer Nähe abgeben.'
      ],
      ads: [
        'Leselernhelfer e. V.: Wir suchen Vorlesepatinnen und -paten für Grundschulen — eine Stunde pro Woche, Einführungskurs und Materialien kostenlos.',
        'Sozialkaufhaus Brücke: Wir holen gut erhaltene Möbel und Elektrogeräte kostenlos bei Ihnen ab und geben sie günstig an Menschen mit wenig Einkommen weiter.',
        'Diakonie sucht Sozialarbeiter/in (Vollzeit, unbefristet) für die Wohnungslosenhilfe. Bewerbungen bis zum 15. des Monats an die Personalabteilung.',
        'Sprachcafé International: Jeden Mittwoch ab 18 Uhr im Bürgerhaus — Deutsch üben in lockerer Runde, Einheimische und Zugewanderte willkommen. Ohne Anmeldung!',
        'Besuchs- und Entlastungsdienst der Malteser: Geschulte Ehrenamtliche betreuen Ihren pflegebedürftigen Angehörigen stundenweise — damit Sie Zeit für sich haben.',
        'NABU-Gruppe Süd: Praktische Pflegeeinsätze an Samstagen — Bäume pflanzen, Wiesen mähen, Nistkästen bauen. Keine Vorkenntnisse nötig, Geräte vorhanden.',
        'Stiftung Miteinander: Spendenlauf am 3. Oktober — laufen Sie mit und sammeln Sie Kilometer für den guten Zweck! Startgebühr zehn Euro.',
        'Ehrenamtsagentur: Kostenlose Beratung für Vereine — von der Beantragung von Fördermitteln bis zu Fragen des Vereinsrechts. Termine nach Vereinbarung.',
        'Initiative Ankommen: Wir suchen Freiwillige, die Geflüchtete zu Behördenterminen begleiten und beim Ausfüllen von Formularen helfen. Schulung inklusive.',
        'FSJ bei der Lebenshilfe: Informationsabend für Schulabgängerinnen und Schulabgänger — alle Einsatzstellen, Bewerbung und Taschengeld auf einen Blick.',
        'Erzählcafé im Seniorentreff Rosengarten: Dienstags und freitags Kaffee, Karten- und Brettspiele in geselliger Runde — wir freuen uns auf neue Gesichter!',
        'Kleiderkammer St. Martin: Annahme gut erhaltener Kleidung montags bis freitags von 9 bis 17 Uhr — besonders gesucht: warme Winterkleidung.'
      ],
      answers: [0, 1, 3, 4, 5, 7, 8, 9, 10, 11]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrter Herr Vorsitzender,

seit über zehn Jahren bin ich Mitglied im Turnverein Eiche, [1] Angebote ich stets gern genutzt habe. Umso schwerer [2] mir die Entscheidung, Ihnen heute zu schreiben.

Aus beruflichen Gründen werde ich im Februar nach Dresden ziehen, [3] es mir künftig nicht mehr möglich sein wird, am Vereinsleben teilzunehmen. Ich bitte Sie daher, meine Mitgliedschaft fristgerecht zum 31. Dezember zu [4].

Gleichzeitig möchte ich mich herzlich für die vielen schönen Jahre [5]. Besonders die Arbeit mit der Jugendgruppe, [6] ich vier Jahre lang geleitet habe, wird mir fehlen. Gern [7] ich bereit, meine Nachfolgerin bis zum Umzug einzuarbeiten, [8] der Übergang reibungslos verläuft.

Abschließend bitte ich Sie, mir den Erhalt dieses Schreibens kurz zu [9] und mir mitzuteilen, ob ich darüber hinaus noch etwas [10] muss.

Mit freundlichen Grüßen
Katrin Albers`,
      gaps: [
        { options: ['deren', 'dessen', 'denen'], answer: 1 },
        { options: ['trifft', 'kommt', 'fällt'], answer: 2 },
        { options: ['sodass', 'obwohl', 'damit'], answer: 0 },
        { options: ['beenden', 'abschließen', 'aufhören'], answer: 0 },
        { options: ['danken', 'verabschieden', 'bedanken'], answer: 2 },
        { options: ['die', 'der', 'denen'], answer: 0 },
        { options: ['hätte', 'wäre', 'würde'], answer: 1 },
        { options: ['denn', 'als ob', 'damit'], answer: 2 },
        { options: ['bestätigen', 'bestehen', 'bestimmen'], answer: 0 },
        { options: ['verursachen', 'veranlassen', 'vermeiden'], answer: 1 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

durch einen Zeitungsartikel bin ich auf Ihre Freiwilligenagentur [1] geworden. Seit Kurzem bin ich im Ruhestand und möchte einen Teil meiner freien Zeit sinnvoll [2] — am liebsten in der Arbeit mit Kindern oder mit älteren Menschen.

Beruflich war ich dreißig Jahre als Erzieherin tätig, [3] ich über viel Erfahrung im Umgang mit Kindern verfüge. Zeitlich bin ich [4]: Sowohl vormittags als auch am Wochenende könnte ich regelmäßig helfen.

Nun habe ich einige Fragen: Welche Einrichtungen suchen zurzeit [5]? Muss ich vor dem ersten Einsatz an einer Schulung [6]? Und wie bin ich während meiner Tätigkeit [7] — übernimmt Ihre Agentur zum Beispiel eine Haftpflicht- und eine Unfallversicherung?

Über eine Einladung zu einem persönlichen [8] würde ich mich sehr freuen. Sie erreichen mich [9] unter der unten angegebenen Telefonnummer.

Vielen Dank im [10] für Ihre Mühe!

Mit freundlichen Grüßen
Hannelore Brandt`,
      wordBank: [
        'aufmerksam',
        'bekannt',
        'dennoch',
        'erfahren',
        'flexibel',
        'Gespräch',
        'jederzeit',
        'kürzlich',
        'nutzen',
        'obwohl',
        'sodass',
        'teilnehmen',
        'Unterstützung',
        'versichert',
        'Voraus'
      ],
      answers: [0, 8, 10, 4, 12, 11, 13, 5, 6, 14]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Tafeln versorgen mehr Menschen als früher, erhalten aber weniger Spenden.',
          answer: true,
          audio:
            'Guten Morgen, hier sind die Nachrichten. Der Dachverband der Tafeln hat heute alarmierende Zahlen vorgelegt: Die Zahl der Menschen, die regelmäßig eine Lebensmittelausgabe besuchen, ist binnen zwei Jahren um rund fünfzig Prozent gestiegen. Gleichzeitig spenden Supermärkte deutlich weniger Ware als früher. Mehrere Ausgabestellen mussten deshalb bereits einen Aufnahmestopp verhängen.'
        },
        {
          statement: 'Wer Blut spenden möchte, muss vorher einen Termin vereinbaren.',
          answer: false,
          audio:
            'Ein Aufruf des Deutschen Roten Kreuzes: Wegen der Ferienzeit werden die Blutreserven in der Region knapp. Am kommenden Donnerstag findet deshalb von vierzehn bis zwanzig Uhr ein zusätzlicher Spendetermin in der Stadthalle statt. Eine Anmeldung ist nicht erforderlich — kommen Sie einfach vorbei und bringen Sie Ihren Personalausweis mit. Für Verpflegung ist gesorgt.'
        },
        {
          statement: 'Freiwillige im sozialen Jahr sollen künftig mehr Geld bekommen.',
          answer: true,
          audio:
            'Aus der Hauptstadt: Der Bundestag hat am Abend eine Reform der Freiwilligendienste beschlossen. Das monatliche Taschengeld für die rund einhunderttausend jungen Menschen im Freiwilligen Sozialen Jahr wird deutlich angehoben, außerdem erhalten sie künftig ein vergünstigtes Nahverkehrsticket. Sozialverbände begrüßten die Entscheidung, forderten aber zusätzlich einen Rechtsanspruch auf einen Platz.'
        },
        {
          statement: 'Laut der Studie sind vor allem ältere Menschen von Einsamkeit betroffen.',
          answer: false,
          audio:
            'Ein überraschendes Ergebnis liefert eine neue Studie zur Einsamkeit in Deutschland: Nicht die Älteren, sondern junge Erwachsene zwischen achtzehn und dreißig Jahren fühlen sich am häufigsten einsam — fast jeder Dritte gab an, oft niemanden zum Reden zu haben. Die Forscher führen das unter anderem auf häufige Umzüge und die Verlagerung sozialer Kontakte ins Internet zurück.'
        },
        {
          statement: 'Die Feuerwehr will mit einem Aktionstag neue Mitglieder gewinnen.',
          answer: true,
          audio:
            'Und noch ein Termin für das Wochenende: Die Freiwillige Feuerwehr lädt am Samstag zum großen Aktionstag auf den Marktplatz ein. Besucherinnen und Besucher können Löschfahrzeuge besichtigen, an Übungen teilnehmen und sich über die Ausbildung informieren. Mit dem Tag will die Wehr gezielt neue Aktive gewinnen, denn in den letzten Jahren ist die Zahl der Einsatzkräfte stark gesunken.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderatorin',
          text: 'Herzlich willkommen zu unserer Reihe „Engagiert vor Ort“. Bei mir ist heute Karin Ellerbrok, sie leitet die Freiwilligenagentur unserer Stadt. Frau Ellerbrok, was genau macht so eine Agentur eigentlich?'
        },
        {
          speaker: 'Frau Ellerbrok',
          text: 'Wir sind so etwas wie eine Vermittlungsstelle: Auf der einen Seite stehen Menschen, die etwas Sinnvolles tun möchten, auf der anderen Seite Vereine, Schulen und soziale Einrichtungen, die Unterstützung suchen. Wir bringen beide zusammen — im letzten Jahr übrigens über sechshundert Mal.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Man hört oft, das Ehrenamt stecke in der Krise. Merken Sie das?'
        },
        {
          speaker: 'Frau Ellerbrok',
          text: 'Das kann ich so nicht bestätigen. Das Interesse ist in den letzten Jahren sogar leicht gestiegen. Was sich verändert hat, ist die Form: Die wenigsten wollen sich noch auf Jahre an eine Organisation binden. Gefragt sind überschaubare Projekte — ein Ferienprogramm begleiten, eine Pflanzaktion, eine Weihnachtsfeier organisieren.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Wer meldet sich denn bei Ihnen? Vor allem junge Leute?'
        },
        {
          speaker: 'Frau Ellerbrok',
          text: 'Nein, das ist bunt gemischt. Wir haben Studierende, Berufstätige, die am Wochenende etwas tun möchten, und sehr viele Menschen über fünfzig, die nach dem Berufsleben eine neue Aufgabe suchen. Die größte Gruppe sind tatsächlich die Fünfzig- bis Siebzigjährigen.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Und wie läuft eine Vermittlung konkret ab?'
        },
        {
          speaker: 'Frau Ellerbrok',
          text: 'Am Anfang steht immer ein persönliches Gespräch, etwa eine Stunde lang. Wir fragen: Was können Sie, was möchten Sie, wie viel Zeit haben Sie? Danach schlagen wir zwei, drei passende Stellen vor, und die Interessenten schnuppern unverbindlich hinein. Das alles kostet übrigens nichts — weder die Freiwilligen noch die Einrichtungen zahlen etwas.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Was ist, wenn beim Einsatz einmal etwas passiert — ein Unfall zum Beispiel?'
        },
        {
          speaker: 'Frau Ellerbrok',
          text: 'Dafür ist gesorgt: Alle, die über uns vermittelt werden, sind während ihrer Einsätze haftpflicht- und unfallversichert. Diese Sorge kann ich den Menschen also nehmen — das ist tatsächlich eine der häufigsten Fragen im Erstgespräch.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Sie selbst kennen das Ehrenamt ja auch aus eigener Erfahrung, oder?'
        },
        {
          speaker: 'Frau Ellerbrok',
          text: 'Ja, ich habe fünfzehn Jahre lang ehrenamtlich Patienten im Krankenhaus besucht, neben meinem Beruf als Buchhändlerin. Diese Zeit hat mir gezeigt, wie viel man zurückbekommt. Neu ist übrigens, dass sich inzwischen auch Firmen bei uns melden: Ganze Teams nehmen sich einen Tag frei und streichen etwa einen Kindergarten.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Zum Schluss: Was planen Sie als Nächstes?'
        },
        {
          speaker: 'Frau Ellerbrok',
          text: 'Im Oktober veranstalten wir zum ersten Mal eine Ehrenamtsmesse im Rathaus. Rund vierzig Organisationen stellen sich dort vor, der Eintritt ist frei. Wer also überlegt, sich zu engagieren, findet an einem einzigen Nachmittag das passende Angebot — herzliche Einladung!'
        },
        {
          speaker: 'Moderatorin',
          text: 'Frau Ellerbrok, vielen Dank für das Gespräch!'
        }
      ],
      statements: [
        {
          statement: 'Die Agentur vermittelt Freiwillige an Vereine und soziale Einrichtungen.',
          answer: true
        },
        { statement: 'Das Interesse am Ehrenamt ist in den letzten Jahren gesunken.', answer: false },
        {
          statement: 'Viele Menschen möchten sich lieber für einzelne Projekte als langfristig engagieren.',
          answer: true
        },
        { statement: 'Die meisten Freiwilligen sind unter dreißig Jahre alt.', answer: false },
        { statement: 'Am Anfang jeder Vermittlung steht ein persönliches Gespräch.', answer: true },
        { statement: 'Für die Vermittlung zahlen die Freiwilligen eine geringe Gebühr.', answer: false },
        { statement: 'Vermittelte Freiwillige sind bei ihren Einsätzen versichert.', answer: true },
        {
          statement: 'Frau Ellerbrok hat früher selbst ehrenamtlich Patienten im Krankenhaus besucht.',
          answer: true
        },
        { statement: 'Firmen zeigen kein Interesse an ehrenamtlichen Einsätzen.', answer: false },
        { statement: 'Im Oktober findet zum ersten Mal eine Ehrenamtsmesse statt.', answer: true }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf kurze Durchsagen und Mitteilungen. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Kleiderspenden werden nur am Vormittag angenommen.',
          answer: false,
          audio:
            'Liebe Besucherinnen und Besucher des Bürgerhauses, ein Hinweis zur heutigen Kleidersammlung: Die Annahmestelle im Erdgeschoss ist durchgehend bis achtzehn Uhr geöffnet. Wir bitten Sie, nur saubere und gut erhaltene Kleidung abzugeben. Besonders benötigt werden Winterjacken, Schuhe und Kinderkleidung. Die Spenden gehen direkt an die Kleiderkammer der Stadt.'
        },
        {
          statement: 'Wegen des Stadtfests fahren einige Busse eine andere Strecke.',
          answer: true,
          audio:
            'Eine Mitteilung der Verkehrsbetriebe: Wegen des Stadtfests am Wochenende ist die Innenstadt von Freitagabend bis Sonntagnacht für den Verkehr gesperrt. Die Buslinien drei, sieben und zwölf werden in dieser Zeit über den Nordring umgeleitet. Die Haltestellen Marktplatz und Rathaus können nicht bedient werden; bitte nutzen Sie ersatzweise die Haltestelle Stadtpark.'
        },
        {
          statement: 'Die Ehrungsveranstaltung beginnt später als geplant.',
          answer: true,
          audio:
            'Sehr geehrte Gäste, herzlich willkommen im Rathaus zur Verleihung des Ehrenamtspreises. Da die Oberbürgermeisterin wegen einer Zugverspätung erst gegen neunzehn Uhr eintreffen wird, beginnt die Veranstaltung dreißig Minuten später als vorgesehen. Wir laden Sie ein, die Wartezeit bei Getränken im Foyer zu überbrücken. Vielen Dank für Ihre Geduld.'
        },
        {
          statement: 'Die Spendenaktion im Markt endet noch heute.',
          answer: false,
          audio:
            'Liebe Kundinnen und Kunden, eine Information zu unserer Aktion „Ein Teil mehr“: Noch bis einschließlich Samstag können Sie ein zusätzlich gekauftes Lebensmittel in den Spendenkorb am Ausgang legen. Alle Waren gehen an die örtliche Tafel. Bereits jetzt sind über vierhundert Kilogramm zusammengekommen — herzlichen Dank für Ihre Unterstützung!'
        },
        {
          statement: 'Der Besuch der Freiwilligenmesse kostet keinen Eintritt.',
          answer: true,
          audio:
            'Meine Damen und Herren, ein Veranstaltungshinweis: Am Sonntag findet in der Stadthalle die große Freiwilligenmesse statt. Von zehn bis siebzehn Uhr stellen sich über dreißig Vereine und Initiativen vor — vom Sportverein bis zum Hospizdienst. Der Eintritt ist frei. Um vierzehn Uhr spricht die Sozialdezernentin über die Zukunft des Ehrenamts.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Schreiben Sie eine halbformelle E-Mail und gehen Sie auf alle vier Leitpunkte ein. Achten Sie auf eine passende Anrede und einen passenden Gruß.',
    tasks: [
      {
        titel: 'Bewerbung: Ehrenamtliche Mitarbeit',
        situation:
          'Der Verein „Lesewelt e. V.“ sucht per Anzeige Freiwillige, die Grundschulkindern einmal pro Woche vorlesen und beim Lesenlernen helfen. Sie möchten mitmachen. Schreiben Sie an den Verein.',
        leitpunkte: [
          'Erklären Sie, warum Sie sich engagieren möchten.',
          'Beschreiben Sie Ihre Erfahrungen im Umgang mit Kindern.',
          'Nennen Sie Ihre zeitlichen Möglichkeiten.',
          'Fragen Sie nach Schulung, Ablauf und Versicherung.'
        ],
        musterloesung: `Betreff: Bewerbung um eine ehrenamtliche Lesepatenschaft

Sehr geehrte Frau Sommer,

mit großem Interesse habe ich Ihre Anzeige im Stadtanzeiger gelesen, in der Sie Vorlesepatinnen und -paten für Grundschulen suchen. Hiermit möchte ich mich um eine solche Aufgabe bewerben.

Seit meinem Eintritt in den Ruhestand im Frühjahr suche ich eine sinnvolle Beschäftigung, bei der ich mit Menschen zu tun habe. Lesen hat in meinem Leben immer eine große Rolle gespielt, und ich finde es besorgniserregend, wie viele Kinder heute Schwierigkeiten damit haben. Als Vater von zwei Töchtern und langjähriger Betreuer einer Jugendfußballmannschaft bringe ich außerdem viel Geduld und Erfahrung mit Kindern mit.

Zeitlich bin ich flexibel: An zwei Vormittagen pro Woche könnte ich regelmäßig in eine Schule kommen, gern auch dauerhaft.

Zuvor hätte ich noch einige Fragen: Bieten Sie eine Einführung oder Schulung an? Wie läuft ein typischer Einsatz ab, und bin ich während der Tätigkeit über den Verein versichert?

Über eine Einladung zu einem persönlichen Gespräch würde ich mich sehr freuen.

Mit freundlichen Grüßen
Werner Kluge`
      }
    ],
    tipps:
      'Bei der Bewerbung zählen Struktur und ein positiver Ton: Bezug zur Anzeige, passende Erfahrungen mit Beispielen, zeitliche Verfügbarkeit und offene Fragen zum Ablauf. Gehen Sie auf alle vier Leitpunkte ein. Prüfen Sie am Ende: Zielumfang etwa 150–220 Wörter, passende Anrede und Grußformel.'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Über Erfahrungen sprechen',
      anweisung:
        'Erzählen Sie Ihrer Partnerin / Ihrem Partner von einer eigenen Erfahrung zum Thema „Ein Engagement oder eine Organisation, die ich bewundere“ (ca. 2,5 Minuten). Gehen Sie auf die Punkte ein und reagieren Sie anschließend auf die Fragen Ihres Partners.',
      punkte: [
        'Beschreiben Sie, wie Sie diese Person, Gruppe oder Organisation kennengelernt haben.',
        'Erzählen Sie, was Sie an diesem Engagement beeindruckt hat.',
        'Sagen Sie, ob Sie sich selbst schon einmal ehrenamtlich engagiert haben oder das gern täten.',
        'Sagen Sie, welche Rolle Ehrenamt in Ihrem Heimatland spielt.'
      ],
      redemittel: [
        'Ich möchte euch/Ihnen von einer Erfahrung erzählen, bei der …',
        'Bei mir war das so: …',
        'Aus meiner Erfahrung …',
        'Besonders beeindruckt hat mich, dass …',
        'Rückblickend würde ich sagen, dass …',
        'Wärt ihr/Wären Sie auch bereit, euch/sich dort zu engagieren?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Diskussion',
      anweisung:
        'Sie haben folgende Schlagzeile gelesen: „Ohne Ehrenamtliche bricht unser Sozialsystem zusammen — der Staat spart auf Kosten der Freiwilligen.“ Diskutieren Sie mit Ihrer Partnerin / Ihrem Partner: Stimmen Sie zu? Begründen Sie Ihre Meinung und reagieren Sie auf die Argumente der anderen Seite.',
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
        'Ihre Stadt veranstaltet einen „Freiwilligentag“, an dem Bürgerinnen und Bürger einen Tag lang gemeinnützige Projekte unterstützen. Sie beide sollen für Ihren Stadtteil eine Aktion organisieren. Planen Sie gemeinsam.',
      punkte: [
        'Welches Projekt eignet sich für Ihren Stadtteil (z. B. Spielplatz, Park, Seniorenheim)?',
        'Wie gewinnen Sie genügend Helferinnen und Helfer?',
        'Was muss vorher organisiert werden (Material, Verpflegung, Genehmigungen)?',
        'Wie bedanken Sie sich bei den Freiwilligen und berichten über die Aktion?'
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
