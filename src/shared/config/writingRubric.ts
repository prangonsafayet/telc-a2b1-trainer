/**
 * How a written answer is turned into a **provisional** telc-style mark.
 *
 * The band structure is telc's and is verified: each of the three criteria —
 * Aufgabenbewältigung, Kommunikative Gestaltung, Formale Richtigkeit — is graded A/B/C/D =
 * 5/3/1/0, the three grades are summed and tripled, so a criterion is worth 15, 9, 3 or 0
 * and the maximum is 45. There is no smooth 0–15 scale. The app states this to learners
 * itself, in the B1 `schreiben` cheatsheet (`src/content/trainers/b1/curriculum.ts`).
 *
 * Everything else here is the app's own heuristic and must never be presented as telc's:
 * telc publishes no error-per-100-words table, and a proofreader cannot know whether a
 * learner answered the question. Only Formale Richtigkeit is informed by LanguageTool, which
 * on the free public API reliably finds spelling and some preposition-and-case errors and
 * little else — so the density bands below are lenient by construction, and the score is
 * shown beside the learner's own self-rating rather than instead of it.
 *
 * The German word lists are sourced from this repo's own content wherever it teaches the
 * thing being checked; each list says where it came from.
 */

/** telc sums the three criteria and multiplies by three. */
export const RUBRIC_SCALE = 3;

/**
 * Weighted errors per 100 words, and the band each threshold buys. Weights come from
 * `WEAKNESS_WEIGHTS` in `./weakness.ts`, so a style nag counts a tenth of a case error.
 *
 * App-owned numbers, and nothing more than that: telc publishes no error density, so one had
 * to be chosen. They are set so that a handful of style nags cannot sink an otherwise good
 * letter while a comparable number of case or agreement errors costs two bands — and they
 * are deliberately lenient, because the public LanguageTool API finds only a fraction of a
 * learner's real grammar errors and a band computed from a partial count must not read as a
 * verdict.
 */
export const FORMAL_ERROR_BANDS: readonly { readonly under: number; readonly points: 0 | 1 | 3 | 5 }[] = [
  { under: 2, points: 5 },
  { under: 5, points: 3 },
  { under: 9, points: 1 },
  { under: Number.POSITIVE_INFINITY, points: 0 }
];

/**
 * A word shorter than this is a function word by length alone, which is why the lists below
 * never restate one: three letters or fewer never reaches them.
 */
export const MIN_CUE_LENGTH = 4;

/**
 * Below this share of the task's minimum length, a text is too short to have completed the
 * task whatever it happens to mention — the D band, not a deduction. App-owned: telc's
 * Aufgabenbewältigung descriptors talk about content, and the length is set by the
 * Aufgabenstellung, so the two are combined here rather than sourced from one document.
 */
export const TOO_SHORT_RATIO = 0.6;

/**
 * How far into the text an opening may sit and still count as the greeting, in words — and
 * how far from the end a closing may sit and still count as the sign-off.
 *
 * Measured against the 35 authored Musterlösungen rather than guessed: ten of them open with
 * a `Betreff:` line before the Anrede, and the formal ones close with the Gruß followed by a
 * name and sometimes an `Anlagen:` line, so neither can be found by looking at the first or
 * last line only.
 */
export const SALUTATION_WINDOW_WORDS = 16;

/**
 * Openings that count as a greeting, formal and informal.
 *
 * Taken from what the app teaches and models: the Anrede lines of the A2·B1 `writing` and B1
 * `schreiben` cheatsheets, and the openings of all 35 authored Musterlösungen ("Sehr geehrte
 * Damen und Herren,", "Sehr geehrte Frau …", "Sehr geehrter Herr …", "Liebe Frau …",
 * "Hallo …").
 */
export const GREETINGS: readonly string[] = [
  'sehr geehrte',
  'sehr geehrter',
  'liebe',
  'lieber',
  'hallo',
  'guten tag',
  'guten morgen'
];

/**
 * Closings that count as a sign-off. Same source: the Gruß lines the cheatsheets teach and
 * the Musterlösungen use ("Mit freundlichen Grüßen", "Viele Grüße", "Liebe Grüße",
 * "Herzliche Grüße"). "LG" is deliberately absent — the B1 cheatsheet tells learners never
 * to write it.
 */
export const SIGN_OFFS: readonly string[] = [
  'mit freundlichen gruessen',
  'freundliche gruesse',
  'viele gruesse',
  'liebe gruesse',
  'herzliche gruesse',
  'beste gruesse',
  'mit besten gruessen'
];

/**
 * Connectors that show sentences were joined on purpose.
 *
 * Harvested from the connectors the three trainers' own cheatsheets, curricula and guides
 * teach — A2·B1's `connectors`, B1's `konnektoren` ("Group 1 — Position 0", "Group 2 — verb
 * to the END", "Group 3 — inversion") and B2's formal register lists.
 *
 * Four taught words are deliberately left out, because counting them would make the check
 * free rather than evidence of anything: `und` and `oder`, which every text contains, and
 * `als` and `da`, which are ambiguous ("besser als", "da drüben") and would fire on text
 * that joined nothing. `dass` and `ob` are out for the same reason — they subordinate a
 * clause without relating two ideas.
 */
export const CONNECTORS: readonly string[] = [
  /* Position 0 */
  'aber',
  'denn',
  'sondern',
  /* Verb to the end */
  'weil',
  'wenn',
  'obwohl',
  'damit',
  'sodass',
  'falls',
  'bevor',
  'nachdem',
  'waehrend',
  /* Inversion */
  'deshalb',
  'deswegen',
  'daher',
  'darum',
  'trotzdem',
  'dennoch',
  'ausserdem',
  'zudem',
  'danach',
  'dann',
  'sonst',
  'folglich',
  'somit',
  'infolgedessen',
  'jedoch',
  'allerdings',
  /* Structuring an argument — the B2 register */
  'stattdessen',
  'dagegen',
  'dadurch',
  'zuerst',
  'zunaechst',
  'schliesslich',
  'abschliessend',
  'einerseits',
  'andererseits',
  'zum beispiel',
  'beispielsweise',
  'bezueglich',
  'hinsichtlich'
];

/**
 * Distinct connectors needed for the top band. The app's own B1 `schreiben` cheatsheet sets
 * this number in its two-minute checklist: "At least 3 different connectors (weil, deshalb,
 * trotzdem …)".
 */
export const CONNECTOR_TARGET = 3;

/**
 * The shortest task the connector check is applied to, in words, and it is the same source
 * that gives the number above: the B1 cheatsheet asks for three different connectors in the
 * 80–150-word letter, while the A2·B1 `writing` cheatsheet's checklist for the 40–80-word
 * e-mail asks only "greeting + sign-off present?" and says nothing about connectors.
 *
 * So the check starts where the app's own advice starts. Measured consequence: all fifteen
 * dual-level Musterlösungen contain nought to two connectors — an A2-level e-mail of parallel
 * main clauses legitimately has none — and holding them to a B1 letter's standard would dock a
 * band off every model answer the app itself prints.
 */
export const CONNECTOR_CHECK_MIN_WORDS = 80;

/**
 * Closed-class German words: articles, possessives, pronouns, prepositions, conjunctions,
 * interrogatives, auxiliaries, modals and topic-free particles. A learner who writes one of
 * these has shown nothing about whether they addressed a Leitpunkt.
 *
 * Compiled here rather than pulled from a dependency, and normalised the way
 * `normalizeGerman` normalises text (ue/oe/ae/ss), so it can be compared directly against a
 * tokenised text. Nothing shorter than `MIN_CUE_LENGTH` is listed: those never reach the
 * lookup. Some entries are also `CONNECTORS` — the two lists answer different questions
 * ("can this word show a point was addressed?" versus "were ideas joined on purpose?") and a
 * word can honestly be in both.
 */
export const FUNCTION_WORDS: ReadonlySet<string> = new Set([
  /* Articles, determiners, quantifiers */
  'eine',
  'einen',
  'einem',
  'einer',
  'eines',
  'kein',
  'keine',
  'keinen',
  'keinem',
  'keiner',
  'keines',
  'dies',
  'diese',
  'dieser',
  'dieses',
  'diesen',
  'diesem',
  'jede',
  'jeder',
  'jedes',
  'jeden',
  'jedem',
  'alle',
  'allen',
  'aller',
  'alles',
  'allem',
  'manche',
  'manchen',
  'solche',
  'solchen',
  'welche',
  'welcher',
  'welches',
  'welchen',
  'welchem',
  'beide',
  'beiden',
  'andere',
  'anderen',
  'anderes',
  'anderem',
  'einige',
  'einigen',
  'mehrere',
  'viele',
  'vielen',
  'etwas',
  'nichts',
  'jemand',
  'niemand',
  /* Possessives */
  'mein',
  'meine',
  'meinen',
  'meinem',
  'meiner',
  'meines',
  'dein',
  'deine',
  'deinen',
  'deinem',
  'deiner',
  'deines',
  'sein',
  'seine',
  'seinen',
  'seinem',
  'seiner',
  'seines',
  'ihre',
  'ihren',
  'ihrem',
  'ihrer',
  'ihres',
  'unser',
  'unsere',
  'unseren',
  'unserem',
  'unserer',
  'euer',
  'eure',
  'euren',
  'eurem',
  /* Pronouns */
  'mich',
  'dich',
  'sich',
  'euch',
  'ihnen',
  'selbst',
  'einander',
  /* Prepositions */
  'ohne',
  'gegen',
  'durch',
  'fuer',
  'ueber',
  'unter',
  'neben',
  'hinter',
  'zwischen',
  'nach',
  'seit',
  'beim',
  'wegen',
  'trotz',
  'statt',
  'entlang',
  'innerhalb',
  'ausserhalb',
  'gegenueber',
  /* Conjunctions and their particles */
  'oder',
  'aber',
  'denn',
  'sondern',
  'dass',
  'weil',
  'wenn',
  'obwohl',
  'damit',
  'bevor',
  'nachdem',
  'sobald',
  'falls',
  'sowie',
  'sowohl',
  'entweder',
  'weder',
  'noch',
  'zwar',
  'desto',
  /* Interrogatives */
  'wann',
  'warum',
  'wieso',
  'weshalb',
  'wohin',
  'woher',
  'wessen',
  'wieviel',
  /* sein, haben, werden */
  'sind',
  'seid',
  'waren',
  'warst',
  'waere',
  'waeren',
  'gewesen',
  'habe',
  'hast',
  'haben',
  'hatte',
  'hatten',
  'gehabt',
  'werde',
  'wirst',
  'wird',
  'werden',
  'wurde',
  'wurden',
  'worden',
  /* Modals */
  'kann',
  'kannst',
  'koennen',
  'konnte',
  'konnten',
  'koennte',
  'koennten',
  'muss',
  'musst',
  'muessen',
  'musste',
  'mussten',
  'muesste',
  'muessten',
  'soll',
  'sollen',
  'sollte',
  'sollten',
  'will',
  'willst',
  'wollen',
  'wollte',
  'wollten',
  'darf',
  'duerfen',
  'duerfte',
  'moechte',
  'moechten',
  'moegen',
  'mochte',
  /* Topic-free adverbs and register particles */
  'auch',
  'schon',
  'sehr',
  'mehr',
  'dann',
  'doch',
  'immer',
  'wieder',
  'hier',
  'dort',
  'jetzt',
  'ganz',
  'gern',
  'gerne',
  'bitte',
  'leider'
]);

/**
 * The verbs a telc writing prompt opens with. Not function words — they are the instruction
 * ("Beschreiben Sie …", "Begründen Sie …") — but they carry no topic either, so a learner
 * writing "beschreiben" has shown nothing about whether they addressed the point.
 *
 * These are the complete set of opening verbs of the 125 writing points actually authored in
 * `src/content` (`schreiben.points` on the dual-level paper, `schreiben.tasks[].leitpunkte`
 * on the single-level one), harvested rather than imagined, and normalised like the text.
 * `tests/unit/leitpunkte.test.ts` sweeps all 125 to prove no point is left without a cue.
 */
export const PROMPT_VERBS: ReadonlySet<string> = new Set([
  'schreiben',
  'sagen',
  'stellen',
  'machen',
  'bedanken',
  'erklaeren',
  'beschreiben',
  'nennen',
  'antworten',
  'bitten',
  'fragen',
  'schlagen',
  'empfehlen',
  'geben',
  'nehmen',
  'begruenden',
  'gratulieren',
  'bestaetigen',
  'formulieren',
  'vergleichen',
  'erzaehlen',
  'erkundigen',
  'erlaeutern',
  'berichten',
  'gehen',
  'belegen'
]);
