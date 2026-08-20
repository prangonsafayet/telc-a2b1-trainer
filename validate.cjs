// Node validator for exam data files. Usage: node validate.js [src/data/examNN.js ...]
// With no args, validates every src/data/exam*.js file.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs
      .readdirSync(path.join(__dirname, 'src', 'content', 'exams'))
      .filter(f => /^exam\d+\.ts$/.test(f))
      .sort()
      .map(f => 'src/content/exams/' + f);

let failures = 0;
const err = (f, msg) => {
  failures++;
  console.error(`  ✗ [${f}] ${msg}`);
};

const distinct = arr => new Set(arr).size === arr.length;
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
      .replace(/\bas const satisfies Exam;?/, '')
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
    });
  const t3 = L.teil3 || {};
  if (!t3.messages || t3.messages.length !== 5) err(f, 'lesen.teil3 needs 5 messages');
  if (!t3.headlines || t3.headlines.length !== 8) err(f, 'lesen.teil3 needs 8 headlines');
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
  const s2 = S.teil2 || {};
  if (!isStr(s2.text)) err(f, 'sb.teil2 missing text');
  else
    for (let i = 1; i <= 6; i++) if (!s2.text.includes(`[${i}]`)) err(f, `sb.teil2 text missing gap [${i}]`);
  if (!s2.wordBank || s2.wordBank.length !== 12) err(f, 'sb.teil2 needs 12 wordBank words');
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

  // Sprechen
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

  if (failures === 0) console.log(`  ✓ [${f}] OK — "${ex.title}" (${ex.level}, ${ex.theme})`);
  else console.log(`  … [${f}] checked with errors above`);
}

// ---------------------------------------------------------------------------
// telc B1/B2 Modelltests (src/content/trainers/<level>/exams/examNN.ts)
// ---------------------------------------------------------------------------
const telcFiles = [];
for (const level of ['b1', 'b2']) {
  const dir = path.join(__dirname, 'src', 'content', 'trainers', level, 'exams');
  if (!fs.existsSync(dir)) continue;
  for (const f of fs
    .readdirSync(dir)
    .filter(x => /^exam\d+\.ts$/.test(x))
    .sort()) {
    telcFiles.push({ level, file: `src/content/trainers/${level}/exams/${f}` });
  }
}

const telcSeen = { b1: new Set(), b2: new Set() };
for (const { level, file } of telcFiles) {
  const abs = path.join(__dirname, file);
  const ctx = {};
  vm.createContext(ctx);
  let ex;
  try {
    const src = fs
      .readFileSync(abs, 'utf8')
      .replace(/^import[^\n]*\n/gm, '')
      .replace(/^\s*const exam =\s*/m, '')
      .replace(/\bas const satisfies TelcExam;?/, '')
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

  if (!Number.isInteger(ex.id) || ex.id < 1 || ex.id > 10) err(f, 'id must be 1–10');
  else if (telcSeen[level].has(ex.id)) err(f, `duplicate ${level} id ${ex.id}`);
  else telcSeen[level].add(ex.id);
  if (ex.level !== level) err(f, `level must be '${level}'`);
  for (const k of ['title', 'theme']) if (!isStr(ex[k])) err(f, 'missing ' + k);

  // Lesen: 5 texts → 10 headlines · 5 MC on one article · 10 situations → 12 ads
  const L = ex.lesen || {};
  const t1 = L.teil1 || {};
  if (!t1.headlines || t1.headlines.length !== 10) err(f, 'lesen.teil1 needs 10 headlines');
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
  const t3 = L.teil3 || {};
  if (!t3.situations || t3.situations.length !== 10) err(f, 'lesen.teil3 needs 10 situations');
  if (!t3.ads || t3.ads.length !== 12) err(f, 'lesen.teil3 needs 12 ads');
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
  const s2 = S.teil2 || {};
  if (!isStr(s2.text)) err(f, 'sb.teil2 missing text');
  else
    for (let i = 1; i <= 10; i++) if (!s2.text.includes(`[${i}]`)) err(f, `sb.teil2 text missing gap [${i}]`);
  if (!s2.wordBank || s2.wordBank.length !== 15) err(f, 'sb.teil2 needs 15 wordBank words');
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

  // Schreiben: B1 replies to a letter (1 task, incoming); B2 chooses 1 of 2 formal tasks
  const W = ex.schreiben || {};
  if (!isStr(W.anweisung) || !isStr(W.tipps)) err(f, 'schreiben missing fields');
  const wantTasks = level === 'b1' ? 1 : 2;
  if (!W.tasks || W.tasks.length !== wantTasks) err(f, `schreiben needs ${wantTasks} task(s)`);
  else
    W.tasks.forEach((t, i) => {
      if (!isStr(t.titel) || !isStr(t.situation) || !isStr(t.musterloesung))
        err(f, `schreiben.task${i + 1} missing fields`);
      if (!t.leitpunkte || t.leitpunkte.length !== 4 || !t.leitpunkte.every(isStr))
        err(f, `schreiben.task${i + 1} needs 4 Leitpunkte`);
      if (level === 'b1' && (!t.incoming || !isStr(t.incoming.von) || !isStr(t.incoming.text)))
        err(f, 'schreiben B1 task needs the incoming letter');
    });

  // Sprechen: three parts with Punkte and Redemittel
  const P = ex.sprechen || {};
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

  if (failures === 0) console.log(`  ✓ [${f}] OK — "${ex.title}" (telc ${level.toUpperCase()}, ${ex.theme})`);
  else console.log(`  … [${f}] checked with errors above`);
}

console.log(failures ? `\nFAILED: ${failures} problem(s).` : '\nAll files valid.');
process.exit(failures ? 1 : 0);
