import { type CaseItem, type PrepVerbEntry } from '@shared/types';

/* B2 grammar banks: Verben mit Präposition and case government (Akkusativ / Dativ /
   Genitiv). Ids are persisted SRS keys — never renumber existing items. */

export const B2_PREP_VERBS: readonly PrepVerbEntry[] = [
  {
    id: 'b2.pv.001',
    de: 'sich beziehen auf + Akk.',
    en: 'to refer to',
    verb: 'sich beziehen',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Der Autor bezieht sich in seinem Artikel auf eine aktuelle Studie.',
      en: 'In his article the author refers to a recent study.'
    }
  },
  {
    id: 'b2.pv.002',
    de: 'verzichten auf + Akk.',
    en: 'to do without, to forgo',
    verb: 'verzichten',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Aus gesundheitlichen Gründen verzichtet sie auf Zucker.',
      en: 'For health reasons she goes without sugar.'
    }
  },
  {
    id: 'b2.pv.003',
    de: 'beitragen zu + Dat.',
    en: 'to contribute to',
    verb: 'beitragen',
    preposition: 'zu',
    kasus: 'dativ',
    example: {
      de: 'Jeder Einzelne kann zum Schutz der Umwelt beitragen.',
      en: 'Every individual can contribute to protecting the environment.'
    }
  },
  {
    id: 'b2.pv.004',
    de: 'sich auseinandersetzen mit + Dat.',
    en: 'to engage with, to grapple with',
    verb: 'sich auseinandersetzen',
    preposition: 'mit',
    kasus: 'dativ',
    example: {
      de: 'Im Seminar setzen wir uns mit der deutschen Nachkriegsgeschichte auseinander.',
      en: 'In the seminar we engage with German post-war history.'
    }
  },
  {
    id: 'b2.pv.005',
    de: 'abhängen von + Dat.',
    en: 'to depend on',
    verb: 'abhängen',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Der Erfolg des Projekts hängt von der Finanzierung ab.',
      en: 'The success of the project depends on the funding.'
    }
  },
  {
    id: 'b2.pv.006',
    de: 'sich einsetzen für + Akk.',
    en: 'to advocate for, to stand up for',
    verb: 'sich einsetzen',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Die Organisation setzt sich für die Rechte von Geflüchteten ein.',
      en: 'The organisation advocates for the rights of refugees.'
    }
  },
  {
    id: 'b2.pv.007',
    de: 'zweifeln an + Dat.',
    en: 'to doubt, to have doubts about',
    verb: 'zweifeln',
    preposition: 'an',
    kasus: 'dativ',
    example: {
      de: 'Viele Bürger zweifeln an den Versprechen der Politiker.',
      en: 'Many citizens doubt the promises made by politicians.'
    }
  },
  {
    id: 'b2.pv.008',
    de: 'neigen zu + Dat.',
    en: 'to tend towards, to be prone to',
    verb: 'neigen',
    preposition: 'zu',
    kasus: 'dativ',
    example: {
      de: 'Unter Stress neigt sie zu vorschnellen Urteilen.',
      en: 'Under stress she tends towards hasty judgements.'
    }
  },
  {
    id: 'b2.pv.009',
    de: 'sich bewerben um + Akk.',
    en: 'to apply for',
    verb: 'sich bewerben',
    preposition: 'um',
    kasus: 'akkusativ',
    example: {
      de: 'Nach dem Studium bewirbt er sich um eine Stelle im Ausland.',
      en: 'After university he is applying for a position abroad.'
    }
  },
  {
    id: 'b2.pv.010',
    de: 'verfügen über + Akk.',
    en: 'to have at one’s disposal, to possess',
    verb: 'verfügen',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Die Bewerberin verfügt über langjährige Berufserfahrung.',
      en: 'The applicant has many years of professional experience.'
    }
  },
  {
    id: 'b2.pv.011',
    de: 'hinweisen auf + Akk.',
    en: 'to point out, to draw attention to',
    verb: 'hinweisen',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Der Arzt wies auf die Risiken der Operation hin.',
      en: 'The doctor pointed out the risks of the operation.'
    }
  },
  {
    id: 'b2.pv.012',
    de: 'sich beschweren über + Akk.',
    en: 'to complain about',
    verb: 'sich beschweren',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Die Mieter beschwerten sich beim Vermieter über den ständigen Lärm.',
      en: 'The tenants complained to the landlord about the constant noise.'
    }
  },
  {
    id: 'b2.pv.013',
    de: 'ausgehen von + Dat.',
    en: 'to assume, to proceed from',
    verb: 'ausgehen',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Die Forscher gehen von einem weiteren Anstieg der Temperaturen aus.',
      en: 'The researchers assume a further rise in temperatures.'
    }
  },
  {
    id: 'b2.pv.014',
    de: 'rechnen mit + Dat.',
    en: 'to expect, to reckon with',
    verb: 'rechnen',
    preposition: 'mit',
    kasus: 'dativ',
    example: {
      de: 'Mit einer so schnellen Antwort der Behörde hatte niemand gerechnet.',
      en: 'Nobody had expected such a quick reply from the authorities.'
    }
  },
  {
    id: 'b2.pv.015',
    de: 'appellieren an + Akk.',
    en: 'to appeal to',
    verb: 'appellieren',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'Die Ministerin appellierte an die Vernunft der Bevölkerung.',
      en: 'The minister appealed to the good sense of the public.'
    }
  },
  {
    id: 'b2.pv.016',
    de: 'leiden unter + Dat.',
    en: 'to suffer from (a burden)',
    verb: 'leiden',
    preposition: 'unter',
    kasus: 'dativ',
    example: {
      de: 'Viele Beschäftigte leiden unter dem wachsenden Zeitdruck.',
      en: 'Many employees suffer from the growing time pressure.'
    }
  },
  {
    id: 'b2.pv.017',
    de: 'sich wenden an + Akk.',
    en: 'to turn to, to contact',
    verb: 'sich wenden',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'Bei Fragen wenden Sie sich bitte an den Kundenservice.',
      en: 'If you have questions, please contact customer service.'
    }
  },
  {
    id: 'b2.pv.018',
    de: 'bestehen auf + Dat.',
    en: 'to insist on',
    verb: 'bestehen',
    preposition: 'auf',
    kasus: 'dativ',
    example: {
      de: 'Der Kunde bestand auf einer vollständigen Rückerstattung.',
      en: 'The customer insisted on a full refund.'
    }
  },
  {
    id: 'b2.pv.019',
    de: 'sich verlassen auf + Akk.',
    en: 'to rely on',
    verb: 'sich verlassen',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Du kannst dich jederzeit auf meine Unterstützung verlassen.',
      en: 'You can rely on my support at any time.'
    }
  },
  {
    id: 'b2.pv.020',
    de: 'sich befassen mit + Dat.',
    en: 'to deal with, to look into',
    verb: 'sich befassen',
    preposition: 'mit',
    kasus: 'dativ',
    example: {
      de: 'Die Kommission befasst sich mit den Ursachen des Unfalls.',
      en: 'The commission is looking into the causes of the accident.'
    }
  },
  {
    id: 'b2.pv.021',
    de: 'sich engagieren für + Akk.',
    en: 'to get involved in, to be committed to',
    verb: 'sich engagieren',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Immer mehr Jugendliche engagieren sich für den Klimaschutz.',
      en: 'More and more young people are getting involved in climate protection.'
    }
  },
  {
    id: 'b2.pv.022',
    de: 'profitieren von + Dat.',
    en: 'to benefit from',
    verb: 'profitieren',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Kleine Betriebe profitieren von den neuen Förderprogrammen.',
      en: 'Small businesses benefit from the new funding programmes.'
    }
  },
  {
    id: 'b2.pv.023',
    de: 'sich konzentrieren auf + Akk.',
    en: 'to concentrate on',
    verb: 'sich konzentrieren',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Wir sollten uns in der Sitzung auf das Wesentliche konzentrieren.',
      en: 'In the meeting we should concentrate on the essentials.'
    }
  },
  {
    id: 'b2.pv.024',
    de: 'verhandeln über + Akk.',
    en: 'to negotiate about',
    verb: 'verhandeln',
    preposition: 'über',
    kasus: 'akkusativ',
    example: {
      de: 'Die Gewerkschaft verhandelt mit den Arbeitgebern über höhere Löhne.',
      en: 'The union is negotiating with the employers about higher wages.'
    }
  },
  {
    id: 'b2.pv.025',
    de: 'sich gewöhnen an + Akk.',
    en: 'to get used to',
    verb: 'sich gewöhnen',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'An das raue Klima im Norden habe ich mich nur langsam gewöhnt.',
      en: 'I only slowly got used to the harsh climate in the north.'
    }
  },
  {
    id: 'b2.pv.026',
    de: 'übereinstimmen mit + Dat.',
    en: 'to agree with, to be consistent with',
    verb: 'übereinstimmen',
    preposition: 'mit',
    kasus: 'dativ',
    example: {
      de: 'Seine Aussage stimmt nicht mit den Fakten überein.',
      en: 'His statement is not consistent with the facts.'
    }
  },
  {
    id: 'b2.pv.027',
    de: 'sich distanzieren von + Dat.',
    en: 'to distance oneself from',
    verb: 'sich distanzieren',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Die Partei distanzierte sich von den Äußerungen ihres Mitglieds.',
      en: 'The party distanced itself from its member’s remarks.'
    }
  },
  {
    id: 'b2.pv.028',
    de: 'beruhen auf + Dat.',
    en: 'to be based on',
    verb: 'beruhen',
    preposition: 'auf',
    kasus: 'dativ',
    example: {
      de: 'Der Film beruht auf einer wahren Begebenheit.',
      en: 'The film is based on a true story.'
    }
  },
  {
    id: 'b2.pv.029',
    de: 'sich richten nach + Dat.',
    en: 'to be guided by, to depend on',
    verb: 'sich richten',
    preposition: 'nach',
    kasus: 'dativ',
    example: {
      de: 'Der Preis richtet sich nach der aktuellen Nachfrage.',
      en: 'The price depends on current demand.'
    }
  },
  {
    id: 'b2.pv.030',
    de: 'streben nach + Dat.',
    en: 'to strive for',
    verb: 'streben',
    preposition: 'nach',
    kasus: 'dativ',
    example: {
      de: 'Das Unternehmen strebt nach einer führenden Position auf dem Markt.',
      en: 'The company is striving for a leading position in the market.'
    }
  },
  {
    id: 'b2.pv.031',
    de: 'sich sehnen nach + Dat.',
    en: 'to long for',
    verb: 'sich sehnen',
    preposition: 'nach',
    kasus: 'dativ',
    example: {
      de: 'Nach Monaten im Ausland sehnte sie sich nach ihrer Heimat.',
      en: 'After months abroad she longed for her home country.'
    }
  },
  {
    id: 'b2.pv.032',
    de: 'warnen vor + Dat.',
    en: 'to warn of, to warn against',
    verb: 'warnen',
    preposition: 'vor',
    kasus: 'dativ',
    example: {
      de: 'Experten warnen vor den Folgen des Klimawandels.',
      en: 'Experts warn of the consequences of climate change.'
    }
  },
  {
    id: 'b2.pv.033',
    de: 'schützen vor + Dat.',
    en: 'to protect from',
    verb: 'schützen',
    preposition: 'vor',
    kasus: 'dativ',
    example: {
      de: 'Die Impfung schützt vor einem schweren Verlauf der Krankheit.',
      en: 'The vaccination protects against a severe course of the illness.'
    }
  },
  {
    id: 'b2.pv.034',
    de: 'resultieren aus + Dat.',
    en: 'to result from',
    verb: 'resultieren',
    preposition: 'aus',
    kasus: 'dativ',
    example: {
      de: 'Die Verzögerungen resultieren aus einem Mangel an Personal.',
      en: 'The delays result from a shortage of staff.'
    }
  },
  {
    id: 'b2.pv.035',
    de: 'sich äußern zu + Dat.',
    en: 'to comment on',
    verb: 'sich äußern',
    preposition: 'zu',
    kasus: 'dativ',
    example: {
      de: 'Der Sprecher wollte sich nicht zu den Vorwürfen äußern.',
      en: 'The spokesman did not want to comment on the accusations.'
    }
  },
  {
    id: 'b2.pv.036',
    de: 'anknüpfen an + Akk.',
    en: 'to tie in with, to follow on from',
    verb: 'anknüpfen',
    preposition: 'an',
    kasus: 'akkusativ',
    example: {
      de: 'Die Rednerin knüpfte an die Diskussion vom Vortag an.',
      en: 'The speaker followed on from the previous day’s discussion.'
    }
  },
  {
    id: 'b2.pv.037',
    de: 'plädieren für + Akk.',
    en: 'to argue for, to plead for',
    verb: 'plädieren',
    preposition: 'für',
    kasus: 'akkusativ',
    example: {
      de: 'Der Anwalt plädierte für einen Freispruch seines Mandanten.',
      en: 'The lawyer argued for his client’s acquittal.'
    }
  },
  {
    id: 'b2.pv.038',
    de: 'sich berufen auf + Akk.',
    en: 'to invoke, to cite as authority',
    verb: 'sich berufen',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Die Journalistin beruft sich auf zuverlässige Quellen.',
      en: 'The journalist cites reliable sources.'
    }
  },
  {
    id: 'b2.pv.039',
    de: 'absehen von + Dat.',
    en: 'to refrain from, to disregard',
    verb: 'absehen',
    preposition: 'von',
    kasus: 'dativ',
    example: {
      de: 'Die Polizei sah in diesem Fall von einer Anzeige ab.',
      en: 'In this case the police refrained from pressing charges.'
    }
  },
  {
    id: 'b2.pv.040',
    de: 'sich einigen auf + Akk.',
    en: 'to agree on, to settle on',
    verb: 'sich einigen',
    preposition: 'auf',
    kasus: 'akkusativ',
    example: {
      de: 'Nach langen Verhandlungen einigten sich beide Seiten auf einen Kompromiss.',
      en: 'After long negotiations both sides agreed on a compromise.'
    }
  }
];

export const B2_CASE_ITEMS: readonly CaseItem[] = [
  /* --- Akkusativ --- */
  {
    id: 'b2.c.001',
    de: 'betreffen + Akkusativ',
    en: 'to concern, to affect',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Die neue Regelung betrifft alle Mitarbeiter der Firma.',
      en: 'The new regulation affects all employees of the company.'
    }
  },
  {
    id: 'b2.c.002',
    de: 'benötigen + Akkusativ',
    en: 'to require, to need',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Für den Antrag benötigen Sie einen gültigen Ausweis.',
      en: 'You need a valid ID for the application.'
    }
  },
  {
    id: 'b2.c.003',
    de: 'umfassen + Akkusativ',
    en: 'to comprise, to include',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Der Kurs umfasst zwölf Einheiten und eine Abschlussprüfung.',
      en: 'The course comprises twelve units and a final exam.'
    }
  },
  {
    id: 'b2.c.004',
    de: 'erfordern + Akkusativ',
    en: 'to demand, to call for',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Diese Aufgabe erfordert viel Geduld und großes Fachwissen.',
      en: 'This task calls for a lot of patience and great expertise.'
    }
  },
  {
    id: 'b2.c.005',
    de: 'beantragen + Akkusativ',
    en: 'to apply for (officially)',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Sie können die Förderung ab sofort online beantragen.',
      en: 'You can now apply for the grant online.'
    }
  },
  {
    id: 'b2.c.006',
    de: 'berücksichtigen + Akkusativ',
    en: 'to take into account',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Bei der Planung müssen wir die Wünsche der Anwohner berücksichtigen.',
      en: 'When planning we have to take the residents’ wishes into account.'
    }
  },
  {
    id: 'b2.c.007',
    de: 'gewährleisten + Akkusativ',
    en: 'to guarantee, to ensure',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Die neuen Maßnahmen sollen die Sicherheit der Fahrgäste gewährleisten.',
      en: 'The new measures are intended to ensure the safety of passengers.'
    }
  },
  {
    id: 'b2.c.008',
    de: 'unterstützen + Akkusativ',
    en: 'to support',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Die Stiftung unterstützt junge Künstlerinnen und Künstler.',
      en: 'The foundation supports young artists.'
    }
  },
  {
    id: 'b2.c.009',
    de: 'überschreiten + Akkusativ',
    en: 'to exceed',
    kasus: 'akkusativ',
    kind: 'verb',
    example: {
      de: 'Die Kosten haben das geplante Budget deutlich überschritten.',
      en: 'The costs have clearly exceeded the planned budget.'
    }
  },
  {
    id: 'b2.c.010',
    de: 'es geht um + Akkusativ',
    en: 'it is about, it concerns',
    kasus: 'akkusativ',
    kind: 'wendung',
    example: {
      de: 'In der heutigen Sitzung geht es um den neuen Haushaltsplan.',
      en: 'Today’s meeting is about the new budget plan.'
    }
  },
  {
    id: 'b2.c.011',
    de: 'es handelt sich um + Akkusativ',
    en: 'it is (a matter of)',
    kasus: 'akkusativ',
    kind: 'wendung',
    example: {
      de: 'Bei dem Fund handelt es sich um einen wertvollen alten Ring.',
      en: 'The find is a valuable old ring.'
    }
  },
  {
    id: 'b2.c.012',
    de: 'Bezug nehmen auf + Akkusativ',
    en: 'to refer to (formally)',
    kasus: 'akkusativ',
    kind: 'wendung',
    example: {
      de: 'Ich nehme Bezug auf Ihr Schreiben vom 3. Mai.',
      en: 'I refer to your letter of 3 May.'
    }
  },
  {
    id: 'b2.c.013',
    de: 'wider + Akkusativ',
    en: 'against, contrary to (formal)',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Wider besseres Wissen unterschrieb er den Vertrag.',
      en: 'Against his better judgement he signed the contract.'
    }
  },
  {
    id: 'b2.c.014',
    de: 'betreffend + Akkusativ',
    en: 'regarding, concerning (formal)',
    kasus: 'akkusativ',
    kind: 'praeposition',
    example: {
      de: 'Fragen betreffend den Datenschutz richten Sie bitte an unser Büro.',
      en: 'Please direct questions regarding data protection to our office.'
    }
  },
  /* --- Dativ --- */
  {
    id: 'b2.c.015',
    de: 'widersprechen + Dativ',
    en: 'to contradict',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Ich muss Ihrer Einschätzung entschieden widersprechen.',
      en: 'I must firmly contradict your assessment.'
    }
  },
  {
    id: 'b2.c.016',
    de: 'zustimmen + Dativ',
    en: 'to agree to, to approve of',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Der Betriebsrat stimmte dem Vorschlag der Geschäftsführung zu.',
      en: 'The works council agreed to the management’s proposal.'
    }
  },
  {
    id: 'b2.c.017',
    de: 'ausweichen + Dativ',
    en: 'to evade, to dodge',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Der Politiker wich den kritischen Fragen geschickt aus.',
      en: 'The politician skilfully dodged the critical questions.'
    }
  },
  {
    id: 'b2.c.018',
    de: 'begegnen + Dativ',
    en: 'to encounter, to meet',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Auf der Konferenz bin ich einem alten Studienfreund begegnet.',
      en: 'At the conference I ran into an old friend from university.'
    }
  },
  {
    id: 'b2.c.019',
    de: 'gelingen + Dativ',
    en: 'to succeed (someone succeeds in)',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Es gelang der Feuerwehr, den Brand schnell zu löschen.',
      en: 'The fire brigade succeeded in putting out the fire quickly.'
    }
  },
  {
    id: 'b2.c.020',
    de: 'misslingen + Dativ',
    en: 'to fail, to go wrong (for someone)',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Der erste Versuch misslang dem Team völlig.',
      en: 'The team’s first attempt failed completely.'
    }
  },
  {
    id: 'b2.c.021',
    de: 'schaden + Dativ',
    en: 'to harm, to damage',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Rauchen schadet der Gesundheit und dem Geldbeutel.',
      en: 'Smoking harms your health and your wallet.'
    }
  },
  {
    id: 'b2.c.022',
    de: 'nützen + Dativ',
    en: 'to be of use to',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Diese Erfahrung wird dir im Berufsleben sehr nützen.',
      en: 'This experience will be very useful to you in your working life.'
    }
  },
  {
    id: 'b2.c.023',
    de: 'drohen + Dativ',
    en: 'to threaten (someone/something)',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Dem Unternehmen droht wegen der hohen Verluste die Insolvenz.',
      en: 'The company is threatened with insolvency because of its heavy losses.'
    }
  },
  {
    id: 'b2.c.024',
    de: 'vorwerfen + Dativ',
    en: 'to accuse someone of, to reproach',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Die Opposition wirft der Regierung Untätigkeit vor.',
      en: 'The opposition accuses the government of inaction.'
    }
  },
  {
    id: 'b2.c.025',
    de: 'beitreten + Dativ',
    en: 'to join (an organisation)',
    kasus: 'dativ',
    kind: 'verb',
    example: {
      de: 'Das Land möchte der Europäischen Union beitreten.',
      en: 'The country wants to join the European Union.'
    }
  },
  {
    id: 'b2.c.026',
    de: 'entgegen + Dativ',
    en: 'contrary to',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Entgegen allen Erwartungen gewann die Außenseiterin das Turnier.',
      en: 'Contrary to all expectations, the outsider won the tournament.'
    }
  },
  {
    id: 'b2.c.027',
    de: 'gemäß + Dativ',
    en: 'in accordance with',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Gemäß den neuen Vorschriften ist das Rauchen im Gebäude verboten.',
      en: 'In accordance with the new regulations, smoking is prohibited in the building.'
    }
  },
  {
    id: 'b2.c.028',
    de: 'zufolge + Dativ',
    en: 'according to (follows the noun)',
    kasus: 'dativ',
    kind: 'praeposition',
    example: {
      de: 'Dem aktuellen Bericht zufolge steigen die Mieten weiter.',
      en: 'According to the latest report, rents are continuing to rise.'
    }
  },
  {
    id: 'b2.c.029',
    de: 'den Umständen entsprechend',
    en: 'as well as can be expected, in keeping with the circumstances',
    kasus: 'dativ',
    kind: 'wendung',
    example: {
      de: 'Der Patientin geht es den Umständen entsprechend gut.',
      en: 'The patient is doing as well as can be expected.'
    }
  },
  {
    id: 'b2.c.030',
    de: 'meiner Meinung nach',
    en: 'in my opinion',
    kasus: 'dativ',
    kind: 'wendung',
    example: {
      de: 'Meiner Meinung nach sollte der öffentliche Nahverkehr kostenlos sein.',
      en: 'In my opinion, public transport should be free of charge.'
    }
  },
  /* --- Genitiv --- */
  {
    id: 'b2.c.031',
    de: 'infolge + Genitiv',
    en: 'as a result of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Infolge des schweren Sturms fielen zahlreiche Züge aus.',
      en: 'As a result of the severe storm, numerous trains were cancelled.'
    }
  },
  {
    id: 'b2.c.032',
    de: 'angesichts + Genitiv',
    en: 'in view of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Angesichts der steigenden Preise sparen viele Haushalte.',
      en: 'In view of rising prices, many households are cutting back.'
    }
  },
  {
    id: 'b2.c.033',
    de: 'anhand + Genitiv',
    en: 'on the basis of, using',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Anhand konkreter Beispiele erklärte die Dozentin die Regel.',
      en: 'The lecturer explained the rule using concrete examples.'
    }
  },
  {
    id: 'b2.c.034',
    de: 'anlässlich + Genitiv',
    en: 'on the occasion of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Anlässlich des Firmenjubiläums fand ein großes Fest statt.',
      en: 'A big celebration was held on the occasion of the company anniversary.'
    }
  },
  {
    id: 'b2.c.035',
    de: 'aufgrund + Genitiv',
    en: 'due to, on the grounds of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Aufgrund eines technischen Defekts blieb der Aufzug stehen.',
      en: 'Due to a technical fault, the lift stopped working.'
    }
  },
  {
    id: 'b2.c.036',
    de: 'bezüglich + Genitiv',
    en: 'regarding, with reference to',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Bezüglich Ihrer Anfrage melden wir uns Anfang nächster Woche.',
      en: 'Regarding your enquiry, we will get back to you early next week.'
    }
  },
  {
    id: 'b2.c.037',
    de: 'hinsichtlich + Genitiv',
    en: 'with regard to',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Hinsichtlich der Kosten gibt es noch einige offene Fragen.',
      en: 'With regard to the costs, there are still some open questions.'
    }
  },
  {
    id: 'b2.c.038',
    de: 'mangels + Genitiv',
    en: 'for lack of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Mangels ausreichender Beweise wurde der Angeklagte freigesprochen.',
      en: 'For lack of sufficient evidence, the defendant was acquitted.'
    }
  },
  {
    id: 'b2.c.039',
    de: 'mithilfe + Genitiv',
    en: 'with the help of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Mithilfe einer speziellen App lernt sie jeden Tag neue Vokabeln.',
      en: 'With the help of a special app, she learns new vocabulary every day.'
    }
  },
  {
    id: 'b2.c.040',
    de: 'seitens + Genitiv',
    en: 'on the part of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Seitens der Verwaltung gab es keine Einwände gegen den Plan.',
      en: 'On the part of the administration there were no objections to the plan.'
    }
  },
  {
    id: 'b2.c.041',
    de: 'zugunsten + Genitiv',
    en: 'in favour of, for the benefit of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Der Erlös des Konzerts geht zugunsten eines Kinderhospizes.',
      en: 'The proceeds of the concert go to the benefit of a children’s hospice.'
    }
  },
  {
    id: 'b2.c.042',
    de: 'zwecks + Genitiv',
    en: 'for the purpose of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Zwecks besserer Planung bitten wir um eine frühzeitige Anmeldung.',
      en: 'For the purpose of better planning, we ask you to register early.'
    }
  },
  {
    id: 'b2.c.043',
    de: 'einschließlich + Genitiv',
    en: 'including',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Die Miete beträgt 900 Euro einschließlich der Nebenkosten.',
      en: 'The rent is 900 euros including utilities.'
    }
  },
  {
    id: 'b2.c.044',
    de: 'trotz + Genitiv',
    en: 'despite',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Trotz des schlechten Wetters fand das Straßenfest statt.',
      en: 'Despite the bad weather, the street festival took place.'
    }
  },
  {
    id: 'b2.c.045',
    de: 'während + Genitiv',
    en: 'during',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Während der gesamten Prüfung sind Handys nicht erlaubt.',
      en: 'Mobile phones are not allowed during the entire exam.'
    }
  },
  {
    id: 'b2.c.046',
    de: 'innerhalb + Genitiv',
    en: 'within',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Bitte begleichen Sie die Rechnung innerhalb der nächsten zwei Wochen.',
      en: 'Please settle the invoice within the next two weeks.'
    }
  },
  {
    id: 'b2.c.047',
    de: 'außerhalb + Genitiv',
    en: 'outside of',
    kasus: 'genitiv',
    kind: 'praeposition',
    example: {
      de: 'Außerhalb der Öffnungszeiten erreichen Sie uns per E-Mail.',
      en: 'Outside opening hours you can reach us by email.'
    }
  },
  {
    id: 'b2.c.048',
    de: 'meines Erachtens',
    en: 'in my view',
    kasus: 'genitiv',
    kind: 'wendung',
    example: {
      de: 'Meines Erachtens wird das Problem völlig unterschätzt.',
      en: 'In my view, the problem is completely underestimated.'
    }
  }
];
