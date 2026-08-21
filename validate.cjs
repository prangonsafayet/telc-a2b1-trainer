// Node validator for exam data files.
// Usage: node validate.cjs [src/content/trainers/<id>/exams/examNN.ts ...]
// With no args it discovers every trainer under src/content/trainers and validates its
// papers against the format they are authored in — so a new trainer needs no edit here.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const TRAINERS_DIR = path.join(__dirname, 'src', 'content', 'trainers');

// Which paper a file is: the type it declares itself to satisfy, not its folder name.
const formatOf = abs =>
  /satisfies\s+SingleLevelExam/.test(fs.readFileSync(abs, 'utf8')) ? 'single-level' : 'dual-level';

const discover = () => {
  const found = [];
  for (const trainer of fs.readdirSync(TRAINERS_DIR).sort()) {
    const dir = path.join(TRAINERS_DIR, trainer, 'exams');
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue;
    for (const name of fs
      .readdirSync(dir)
      .filter(x => /^exam\d+\.ts$/.test(x))
      .sort()) {
      const file = `src/content/trainers/${trainer}/exams/${name}`;
      found.push({ trainer, file, format: formatOf(path.join(dir, name)) });
    }
  }
  return found;
};

const named = process.argv.slice(2);
const allExams = named.length
  ? named.map(file => ({
      trainer: file.split('/')[3],
      file,
      format: formatOf(path.join(__dirname, file))
    }))
  : discover();

const files = allExams.filter(entry => entry.format === 'dual-level').map(entry => entry.file);

let failures = 0;
const err = (f, msg) => {
  failures++;
  console.error(`  ✗ [${f}] ${msg}`);
};

const distinct = arr => new Set(arr).size === arr.length;
// The Sprechen part names are fixed telc facts for the single-level paper, and were wrong
// in twenty papers once ("Kontaktaufnahme", "Präsentation"), so they are asserted here.
// The dual-level paper's `sprechen` carries no part names to check — see its type.
const SPRECHEN_TITLES = {
  b1: ['Einander kennenlernen', 'Über ein Thema sprechen', 'Gemeinsam etwas planen'],
  b2: ['Über Erfahrungen sprechen', 'Diskussion', 'Gemeinsam etwas planen']
};
const inRange = (arr, n) => arr.every(i => Number.isInteger(i) && i >= 0 && i < n);
const mixedBool = (items, key) => {
  const vals = items.map(i => i[key]);
  return vals.includes(true) && vals.includes(false);
};
const isStr = s => typeof s === 'string' && s.trim().length > 0;
const audioOk = a =>
  isStr(a) || (Array.isArray(a) && a.length >= 2 && a.every(t => isStr(t.speaker) && isStr(t.text)));

const seenIds = new Set();
for (const file of files) {
  const abs = path.join(__dirname, file);
  const ctx = {};
  vm.createContext(ctx);
  let ex;
  try {
    // Strip the TypeScript wrapper so the literal can be evaluated as plain JS.
    const src = fs
      .readFileSync(abs, 'utf8')
      .replace(/^import[^\n]*\n/gm, '')
      .replace(/^\s*const exam =\s*/m, '')
      .replace(/\bas const satisfies DualLevelExam;?/, '')
      .replace(/export default exam;?\s*$/m, '')
      .trim()
      .replace(/;\s*$/, '');
    ex = vm.runInContext('(' + src + ')', ctx, { filename: file });
  } catch (e) {
    err(file, 'JS error: ' + e.message);
    continue;
  }
  if (!ex || typeof ex !== 'object') {
    err(file, 'file does not export a single exam object');
    continue;
  }
  const f = file;
  // Per file, so one bad paper cannot relabel every valid one after it.
  const failuresBefore = failures;
  // Two identical options in one item would make two answers correct.
  const optionsDistinct = (label, options) => {
    if (Array.isArray(options) && !distinct(options)) err(f, `${label} repeats an option`);
  };

  if (!Number.isInteger(ex.id)) err(f, 'missing id');
  else if (seenIds.has(ex.id)) err(f, 'duplicate id ' + ex.id);
  else seenIds.add(ex.id);
  if (!['easy', 'medium', 'b1'].includes(ex.difficulty)) err(f, 'bad difficulty');
  for (const k of ['title', 'level', 'theme']) if (!isStr(ex[k])) err(f, 'missing ' + k);

  // Lesen
  const L = ex.lesen || {};
  const t1 = L.teil1 || {};
  if (!t1.situations || t1.situations.length !== 5) err(f, 'lesen.teil1 needs 5 situations');
  if (!t1.ads || t1.ads.length !== 8) err(f, 'lesen.teil1 needs 8 ads');
  else if (!distinct(t1.ads.map(a => JSON.stringify(a)))) err(f, 'lesen.teil1 repeats an ad');
  if (!t1.answers || t1.answers.length !== 5 || !distinct(t1.answers) || !inRange(t1.answers, 8))
    err(f, 'lesen.teil1 answers invalid');
  const t2 = L.teil2 || {};
  if (!t2.texts || t2.texts.length !== 2 || !t2.texts.every(t => isStr(t.titel) && isStr(t.text)))
    err(f, 'lesen.teil2 needs 2 texts');
  if (!t2.questions || t2.questions.length !== 5) err(f, 'lesen.teil2 needs 5 questions');
  else
    t2.questions.forEach((q, i) => {
      if (![0, 1].includes(q.textIndex)) err(f, `lesen.teil2 q${i + 1} bad textIndex`);
      if (!q.options || q.options.length !== 3 || !inRange([q.answer], 3))
        err(f, `lesen.teil2 q${i + 1} bad options/answer`);
      else optionsDistinct(`lesen.teil2 q${i + 1}`, q.options);
    });
  const t3 = L.teil3 || {};
  if (!t3.messages || t3.messages.length !== 5) err(f, 'lesen.teil3 needs 5 messages');
  if (!t3.headlines || t3.headlines.length !== 8) err(f, 'lesen.teil3 needs 8 headlines');
  else if (!distinct(t3.headlines)) err(f, 'lesen.teil3 repeats a headline');
  if (!t3.answers || t3.answers.length !== 5 || !distinct(t3.answers) || !inRange(t3.answers, 8))
    err(f, 'lesen.teil3 answers invalid');
  const t4 = L.teil4 || {};
  if (!isStr(t4.titel) || !isStr(t4.text)) err(f, 'lesen.teil4 missing text');
  if (
    !t4.statements ||
    t4.statements.length !== 5 ||
    !t4.statements.every(s => isStr(s.text) && typeof s.answer === 'boolean')
  )
    err(f, 'lesen.teil4 needs 5 statements');
  else if (!mixedBool(t4.statements, 'answer')) err(f, 'lesen.teil4 statements all same truth value');

  // Sprachbausteine
  const S = ex.sprachbausteine || {};
  const s1 = S.teil1 || {};
  if (!isStr(s1.text)) err(f, 'sb.teil1 missing text');
  else
    for (let i = 1; i <= 6; i++) if (!s1.text.includes(`[${i}]`)) err(f, `sb.teil1 text missing gap [${i}]`);
  if (
    !s1.gaps ||
    s1.gaps.length !== 6 ||
    !s1.gaps.every(g => g.options && g.options.length === 3 && inRange([g.answer], 3))
  )
    err(f, 'sb.teil1 gaps invalid');
  else s1.gaps.forEach((g, i) => optionsDistinct(`sb.teil1 gap${i + 1}`, g.options));
  const s2 = S.teil2 || {};
  if (!isStr(s2.text)) err(f, 'sb.teil2 missing text');
  else
    for (let i = 1; i <= 6; i++) if (!s2.text.includes(`[${i}]`)) err(f, `sb.teil2 text missing gap [${i}]`);
  if (!s2.wordBank || s2.wordBank.length !== 12) err(f, 'sb.teil2 needs 12 wordBank words');
  // A repeated bank word makes two indices correct for the same gap.
  else if (!distinct(s2.wordBank)) err(f, 'sb.teil2 repeats a wordBank word');
  if (!s2.answers || s2.answers.length !== 6 || !distinct(s2.answers) || !inRange(s2.answers, 12))
    err(f, 'sb.teil2 answers invalid');
  const s3 = S.teil3 || {};
  if (
    !s3.items ||
    s3.items.length !== 5 ||
    !s3.items.every(
      it => isStr(it.prompt) && it.options && it.options.length === 3 && inRange([it.answer], 3)
    )
  )
    err(f, 'sb.teil3 items invalid');
  else s3.items.forEach((it, i) => optionsDistinct(`sb.teil3 item${i + 1}`, it.options));

  // Hören
  const H = ex.hoeren || {};
  const h1 = H.teil1 || {};
  if (
    !h1.items ||
    h1.items.length !== 4 ||
    !h1.items.every(it => audioOk(it.audio) && isStr(it.statement) && typeof it.answer === 'boolean')
  )
    err(f, 'hoeren.teil1 invalid');
  else if (!mixedBool(h1.items, 'answer')) err(f, 'hoeren.teil1 all same truth value');
  const h2 = H.teil2 || {};
  if (
    !h2.items ||
    h2.items.length !== 4 ||
    !h2.items.every(
      it =>
        audioOk(it.audio) &&
        isStr(it.frage) &&
        it.options &&
        it.options.length === 3 &&
        inRange([it.answer], 3)
    )
  )
    err(f, 'hoeren.teil2 invalid');
  else h2.items.forEach((it, i) => optionsDistinct(`hoeren.teil2 item${i + 1}`, it.options));
  const h3 = H.teil3 || {};
  if (
    !h3.items ||
    h3.items.length !== 4 ||
    !h3.items.every(it => audioOk(it.audio) && isStr(it.statement) && typeof it.answer === 'boolean')
  )
    err(f, 'hoeren.teil3 invalid');
  else if (!mixedBool(h3.items, 'answer')) err(f, 'hoeren.teil3 all same truth value');
  const h4 = H.teil4 || {};
  if (!audioOk(h4.audio) || !Array.isArray(h4.audio)) err(f, 'hoeren.teil4 audio must be dialogue array');
  if (
    !h4.questions ||
    h4.questions.length !== 4 ||
    !h4.questions.every(q => isStr(q.frage) && q.options && q.options.length === 3 && inRange([q.answer], 3))
  )
    err(f, 'hoeren.teil4 questions invalid');
  else h4.questions.forEach((q, i) => optionsDistinct(`hoeren.teil4 q${i + 1}`, q.options));
  const h5 = H.teil5 || {};
  if (!isStr(h5.audio)) err(f, 'hoeren.teil5 audio must be a string');
  if (
    !h5.gaps ||
    h5.gaps.length !== 4 ||
    !h5.gaps.every(g => isStr(g.label) && isStr(g.answer) && Array.isArray(g.alt))
  )
    err(f, 'hoeren.teil5 gaps invalid');
  else
    h5.gaps.forEach((g, i) => {
      // The note sheet renders the label with its gap shown as ____ .
      if (!g.label.includes('____')) err(f, `hoeren.teil5 gap${i + 1} label needs a ____ blank`);
      const hay = h5.audio.toLowerCase();
      const needles = [g.answer, ...g.alt].map(x => x.toLowerCase());
      // The answer (or an alternative) should be derivable; only warn-level: check the main token appears for word answers
      if (!/\d/.test(g.answer) && !needles.some(n => hay.includes(n.split(' ').pop()))) {
        console.warn(
          `  ⚠ [${f}] hoeren.teil5 gap${i + 1}: answer "${g.answer}" not literally found in audio (check it is inferable)`
        );
      }
    });

  // Schreiben
  const W = ex.schreiben || {};
  if (!isStr(W.anweisung) || !isStr(W.situation) || !isStr(W.musterloesung) || !isStr(W.tipps))
    err(f, 'schreiben missing fields');
  if (
    !W.incomingEmail ||
    !isStr(W.incomingEmail.von) ||
    !isStr(W.incomingEmail.betreff) ||
    !isStr(W.incomingEmail.text)
  )
    err(f, 'schreiben.incomingEmail invalid');
  if (!W.points || W.points.length !== 3 || !W.points.every(isStr)) err(f, 'schreiben needs 3 points');

  // Sprechen. The dual-level paper's parts carry no titel to check; the item counts below
  // (5 Punkte in Teil 1, 4 Leitfragen, 4 Punkte in Teil 3) are this repo's authoring
  // conventions for a full-looking task, not telc rules.
  const P = ex.sprechen || {};
  if (
    !P.teil1 ||
    !P.teil1.punkte ||
    P.teil1.punkte.length < 5 ||
    !P.teil1.redemittel ||
    P.teil1.redemittel.length < 5
  )
    err(f, 'sprechen.teil1 invalid');
  if (
    !P.teil2 ||
    !isStr(P.teil2.thema) ||
    !P.teil2.leitfragen ||
    P.teil2.leitfragen.length !== 4 ||
    !P.teil2.redemittel ||
    P.teil2.redemittel.length < 4
  )
    err(f, 'sprechen.teil2 invalid');
  if (
    !P.teil3 ||
    !isStr(P.teil3.aufgabe) ||
    !P.teil3.punkte ||
    P.teil3.punkte.length !== 4 ||
    !P.teil3.redemittel ||
    P.teil3.redemittel.length < 4
  )
    err(f, 'sprechen.teil3 invalid');

  if (failures === failuresBefore) console.log(`  ✓ [${f}] OK — "${ex.title}" (${ex.level}, ${ex.theme})`);
  else console.log(`  … [${f}] checked with errors above`);
}

// ---------------------------------------------------------------------------
// Single-level Modelltests (src/content/trainers/<id>/exams/examNN.ts)
// ---------------------------------------------------------------------------
const telcFiles = allExams.filter(entry => entry.format === 'single-level');

const telcSeen = {};
for (const { trainer: level, file } of telcFiles) {
  telcSeen[level] = telcSeen[level] || new Set();
  const abs = path.join(__dirname, file);
  const ctx = {};
  vm.createContext(ctx);
  let ex;
  try {
    const src = fs
      .readFileSync(abs, 'utf8')
      .replace(/^import[^\n]*\n/gm, '')
      .replace(/^\s*const exam =\s*/m, '')
      .replace(/\bas const satisfies SingleLevelExam;?/, '')
      .replace(/export default exam;?\s*$/m, '')
      .trim()
      .replace(/;\s*$/, '');
    ex = vm.runInContext('(' + src + ')', ctx, { filename: file });
  } catch (e) {
    err(file, 'JS error: ' + e.message);
    continue;
  }
  if (!ex || typeof ex !== 'object') {
    err(file, 'file does not export a single exam object');
    continue;
  }
  const f = file;
  // Per file, so one bad paper cannot relabel every valid one after it.
  const failuresBefore = failures;
  const optionsDistinct = (label, options) => {
    if (Array.isArray(options) && !distinct(options)) err(f, `${label} repeats an option`);
  };

  if (!Number.isInteger(ex.id) || ex.id < 1 || ex.id > 10) err(f, 'id must be 1–10');
  else if (telcSeen[level].has(ex.id)) err(f, `duplicate ${level} id ${ex.id}`);
  else telcSeen[level].add(ex.id);
  if (ex.level !== level) err(f, `level must be '${level}'`);
  for (const k of ['title', 'theme']) if (!isStr(ex[k])) err(f, 'missing ' + k);

  // Lesen: 5 texts → 10 headlines · 5 MC on one article · 10 situations → 12 ads
  const L = ex.lesen || {};
  const t1 = L.teil1 || {};
  if (!t1.headlines || t1.headlines.length !== 10) err(f, 'lesen.teil1 needs 10 headlines');
  // Two identical headlines would make two answers correct for the same text.
  else if (!distinct(t1.headlines)) err(f, 'lesen.teil1 repeats a headline');
  if (!t1.texts || t1.texts.length !== 5 || !t1.texts.every(isStr)) err(f, 'lesen.teil1 needs 5 texts');
  if (!t1.answers || t1.answers.length !== 5 || !distinct(t1.answers) || !inRange(t1.answers, 10))
    err(f, 'lesen.teil1 answers invalid');
  const t2 = L.teil2 || {};
  if (!isStr(t2.titel) || !isStr(t2.text)) err(f, 'lesen.teil2 missing article');
  if (
    !t2.questions ||
    t2.questions.length !== 5 ||
    !t2.questions.every(q => isStr(q.frage) && q.options && q.options.length === 3 && inRange([q.answer], 3))
  )
    err(f, 'lesen.teil2 questions invalid');
  else t2.questions.forEach((q, i) => optionsDistinct(`lesen.teil2 q${i + 1}`, q.options));
  const t3 = L.teil3 || {};
  if (!t3.situations || t3.situations.length !== 10) err(f, 'lesen.teil3 needs 10 situations');
  if (!t3.ads || t3.ads.length !== 12) err(f, 'lesen.teil3 needs 12 ads');
  else if (!distinct(t3.ads.map(a => JSON.stringify(a)))) err(f, 'lesen.teil3 repeats an ad');
  if (!t3.answers || t3.answers.length !== 10 || !distinct(t3.answers) || !inRange(t3.answers, 12))
    err(f, 'lesen.teil3 answers invalid');

  // Sprachbausteine: 10 MC gaps · 10 gaps from a 15-word bank
  const S = ex.sprachbausteine || {};
  const s1 = S.teil1 || {};
  if (!isStr(s1.text)) err(f, 'sb.teil1 missing text');
  else
    for (let i = 1; i <= 10; i++) if (!s1.text.includes(`[${i}]`)) err(f, `sb.teil1 text missing gap [${i}]`);
  if (
    !s1.gaps ||
    s1.gaps.length !== 10 ||
    !s1.gaps.every(g => g.options && g.options.length === 3 && inRange([g.answer], 3))
  )
    err(f, 'sb.teil1 gaps invalid');
  else s1.gaps.forEach((g, i) => optionsDistinct(`sb.teil1 gap${i + 1}`, g.options));
  const s2 = S.teil2 || {};
  if (!isStr(s2.text)) err(f, 'sb.teil2 missing text');
  else
    for (let i = 1; i <= 10; i++) if (!s2.text.includes(`[${i}]`)) err(f, `sb.teil2 text missing gap [${i}]`);
  if (!s2.wordBank || s2.wordBank.length !== 15) err(f, 'sb.teil2 needs 15 wordBank words');
  // A repeated bank word makes two indices correct for the same gap.
  else if (!distinct(s2.wordBank)) err(f, 'sb.teil2 repeats a wordBank word');
  if (!s2.answers || s2.answers.length !== 10 || !distinct(s2.answers) || !inRange(s2.answers, 15))
    err(f, 'sb.teil2 answers invalid');

  // Hören: 5 R/F clips · one interview with 10 statements · 5 R/F announcements
  const H = ex.hoeren || {};
  const h1 = H.teil1 || {};
  if (
    !h1.items ||
    h1.items.length !== 5 ||
    !h1.items.every(it => audioOk(it.audio) && isStr(it.statement) && typeof it.answer === 'boolean')
  )
    err(f, 'hoeren.teil1 invalid');
  else if (!mixedBool(h1.items, 'answer')) err(f, 'hoeren.teil1 all same truth value');
  const h2 = H.teil2 || {};
  if (!audioOk(h2.audio) || !Array.isArray(h2.audio)) err(f, 'hoeren.teil2 audio must be dialogue array');
  if (
    !h2.statements ||
    h2.statements.length !== 10 ||
    !h2.statements.every(it => isStr(it.statement) && typeof it.answer === 'boolean')
  )
    err(f, 'hoeren.teil2 needs 10 statements');
  else if (!mixedBool(h2.statements, 'answer')) err(f, 'hoeren.teil2 all same truth value');
  const h3 = H.teil3 || {};
  if (
    !h3.items ||
    h3.items.length !== 5 ||
    !h3.items.every(it => audioOk(it.audio) && isStr(it.statement) && typeof it.answer === 'boolean')
  )
    err(f, 'hoeren.teil3 invalid');
  else if (!mixedBool(h3.items, 'answer')) err(f, 'hoeren.teil3 all same truth value');

  // Schreiben: one task at both levels — B1 replies to an incoming e-mail, B2 writes a
  // halbformelle E-Mail from a prompt. Neither level offers a choice of two tasks.
  const W = ex.schreiben || {};
  if (!isStr(W.anweisung) || !isStr(W.tipps)) err(f, 'schreiben missing fields');
  const wantTasks = 1;
  if (!W.tasks || W.tasks.length !== wantTasks) err(f, `schreiben needs ${wantTasks} task(s)`);
  else
    W.tasks.forEach((t, i) => {
      if (!isStr(t.titel) || !isStr(t.situation) || !isStr(t.musterloesung))
        err(f, `schreiben.task${i + 1} missing fields`);
      if (!t.leitpunkte || t.leitpunkte.length !== 4 || !t.leitpunkte.every(isStr))
        err(f, `schreiben.task${i + 1} needs 4 Leitpunkte`);
      if (level === 'b1' && (!t.incoming || !isStr(t.incoming.von) || !isStr(t.incoming.text)))
        err(f, 'schreiben B1 task needs the incoming letter');
      // B2 writes its halbformelle E-Mail from the prompt alone — no letter to reply to.
      if (level === 'b2' && t.incoming) err(f, 'schreiben B2 task must not carry an incoming letter');
    });

  // Sprechen: three parts with Punkte and Redemittel. The part names differ between the two
  // levels and are the telc facts most easily copied from the wrong level, so they are checked.
  const P = ex.sprechen || {};
  const wantTitles = SPRECHEN_TITLES[level] || [];
  ['teil1', 'teil2', 'teil3'].forEach((teil, i) => {
    const want = wantTitles[i];
    const got = (P[teil] || {}).titel;
    if (want && !(isStr(got) && got.includes(want)))
      err(f, `sprechen.${teil} must be named "${want}" at ${level.toUpperCase()}, not "${String(got)}"`);
  });
  for (const teil of ['teil1', 'teil2', 'teil3']) {
    const t = P[teil] || {};
    if (
      !isStr(t.titel) ||
      !isStr(t.anweisung) ||
      !t.punkte ||
      t.punkte.length < 3 ||
      !t.redemittel ||
      t.redemittel.length < 4
    )
      err(f, `sprechen.${teil} invalid`);
  }

  if (failures === failuresBefore)
    console.log(`  ✓ [${f}] OK — "${ex.title}" (telc ${level.toUpperCase()}, ${ex.theme})`);
  else console.log(`  … [${f}] checked with errors above`);
}

console.log(failures ? `\nFAILED: ${failures} problem(s).` : '\nAll files valid.');
process.exit(failures ? 1 : 0);
