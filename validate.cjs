// Node validator for exam data files. Usage: node validate.js [src/data/examNN.js ...]
// With no args, validates every src/data/exam*.js file.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(path.join(__dirname, 'src', 'data')).filter(f => /^exam\d+\.js$/.test(f)).sort().map(f => 'src/data/' + f);

let failures = 0;
const err = (f, msg) => { failures++; console.error(`  ✗ [${f}] ${msg}`); };

function distinct(arr) { return new Set(arr).size === arr.length; }
function inRange(arr, n) { return arr.every(i => Number.isInteger(i) && i >= 0 && i < n); }
function mixedBool(items, key) { const vals = items.map(i => i[key]); return vals.includes(true) && vals.includes(false); }
function isStr(s) { return typeof s === 'string' && s.trim().length > 0; }
function audioOk(a) {
  return isStr(a) || (Array.isArray(a) && a.length >= 2 && a.every(t => isStr(t.speaker) && isStr(t.text)));
}

const seenIds = new Set();
for (const file of files) {
  const abs = path.join(__dirname, file);
  const ctx = {};
  vm.createContext(ctx);
  let ex;
  try {
    const src = fs.readFileSync(abs, 'utf8').replace(/^\s*export default\s*/, '');
    ex = vm.runInContext('(' + src.replace(/;\s*$/, '') + ')', ctx, { filename: file });
  } catch (e) { err(file, 'JS error: ' + e.message); continue; }
  if (!ex || typeof ex !== 'object') { err(file, 'file does not export a single exam object'); continue; }
  const f = file;

  if (!Number.isInteger(ex.id)) err(f, 'missing id');
  else if (seenIds.has(ex.id)) err(f, 'duplicate id ' + ex.id); else seenIds.add(ex.id);
  if (!['easy', 'medium', 'b1'].includes(ex.difficulty)) err(f, 'bad difficulty');
  for (const k of ['title', 'level', 'theme']) if (!isStr(ex[k])) err(f, 'missing ' + k);

  // Lesen
  const L = ex.lesen || {};
  const t1 = L.teil1 || {};
  if (!t1.situations || t1.situations.length !== 5) err(f, 'lesen.teil1 needs 5 situations');
  if (!t1.ads || t1.ads.length !== 8) err(f, 'lesen.teil1 needs 8 ads');
  if (!t1.answers || t1.answers.length !== 5 || !distinct(t1.answers) || !inRange(t1.answers, 8)) err(f, 'lesen.teil1 answers invalid');
  const t2 = L.teil2 || {};
  if (!t2.texts || t2.texts.length !== 2 || !t2.texts.every(t => isStr(t.titel) && isStr(t.text))) err(f, 'lesen.teil2 needs 2 texts');
  if (!t2.questions || t2.questions.length !== 5) err(f, 'lesen.teil2 needs 5 questions');
  else t2.questions.forEach((q, i) => {
    if (![0, 1].includes(q.textIndex)) err(f, `lesen.teil2 q${i + 1} bad textIndex`);
    if (!q.options || q.options.length !== 3 || !inRange([q.answer], 3)) err(f, `lesen.teil2 q${i + 1} bad options/answer`);
  });
  const t3 = L.teil3 || {};
  if (!t3.messages || t3.messages.length !== 5) err(f, 'lesen.teil3 needs 5 messages');
  if (!t3.headlines || t3.headlines.length !== 8) err(f, 'lesen.teil3 needs 8 headlines');
  if (!t3.answers || t3.answers.length !== 5 || !distinct(t3.answers) || !inRange(t3.answers, 8)) err(f, 'lesen.teil3 answers invalid');
  const t4 = L.teil4 || {};
  if (!isStr(t4.titel) || !isStr(t4.text)) err(f, 'lesen.teil4 missing text');
  if (!t4.statements || t4.statements.length !== 5 || !t4.statements.every(s => isStr(s.text) && typeof s.answer === 'boolean')) err(f, 'lesen.teil4 needs 5 statements');
  else if (!mixedBool(t4.statements, 'answer')) err(f, 'lesen.teil4 statements all same truth value');

  // Sprachbausteine
  const S = ex.sprachbausteine || {};
  const s1 = S.teil1 || {};
  if (!isStr(s1.text)) err(f, 'sb.teil1 missing text');
  else for (let i = 1; i <= 6; i++) if (!s1.text.includes(`[${i}]`)) err(f, `sb.teil1 text missing gap [${i}]`);
  if (!s1.gaps || s1.gaps.length !== 6 || !s1.gaps.every(g => g.options && g.options.length === 3 && inRange([g.answer], 3))) err(f, 'sb.teil1 gaps invalid');
  const s2 = S.teil2 || {};
  if (!isStr(s2.text)) err(f, 'sb.teil2 missing text');
  else for (let i = 1; i <= 6; i++) if (!s2.text.includes(`[${i}]`)) err(f, `sb.teil2 text missing gap [${i}]`);
  if (!s2.wordBank || s2.wordBank.length !== 12) err(f, 'sb.teil2 needs 12 wordBank words');
  if (!s2.answers || s2.answers.length !== 6 || !distinct(s2.answers) || !inRange(s2.answers, 12)) err(f, 'sb.teil2 answers invalid');
  const s3 = S.teil3 || {};
  if (!s3.items || s3.items.length !== 5 || !s3.items.every(it => isStr(it.prompt) && it.options && it.options.length === 3 && inRange([it.answer], 3))) err(f, 'sb.teil3 items invalid');

  // Hören
  const H = ex.hoeren || {};
  const h1 = H.teil1 || {};
  if (!h1.items || h1.items.length !== 4 || !h1.items.every(it => audioOk(it.audio) && isStr(it.statement) && typeof it.answer === 'boolean')) err(f, 'hoeren.teil1 invalid');
  else if (!mixedBool(h1.items, 'answer')) err(f, 'hoeren.teil1 all same truth value');
  const h2 = H.teil2 || {};
  if (!h2.items || h2.items.length !== 4 || !h2.items.every(it => audioOk(it.audio) && isStr(it.frage) && it.options && it.options.length === 3 && inRange([it.answer], 3))) err(f, 'hoeren.teil2 invalid');
  const h3 = H.teil3 || {};
  if (!h3.items || h3.items.length !== 4 || !h3.items.every(it => audioOk(it.audio) && isStr(it.statement) && typeof it.answer === 'boolean')) err(f, 'hoeren.teil3 invalid');
  else if (!mixedBool(h3.items, 'answer')) err(f, 'hoeren.teil3 all same truth value');
  const h4 = H.teil4 || {};
  if (!audioOk(h4.audio) || !Array.isArray(h4.audio)) err(f, 'hoeren.teil4 audio must be dialogue array');
  if (!h4.questions || h4.questions.length !== 4 || !h4.questions.every(q => isStr(q.frage) && q.options && q.options.length === 3 && inRange([q.answer], 3))) err(f, 'hoeren.teil4 questions invalid');
  const h5 = H.teil5 || {};
  if (!isStr(h5.audio)) err(f, 'hoeren.teil5 audio must be a string');
  if (!h5.gaps || h5.gaps.length !== 4 || !h5.gaps.every(g => isStr(g.label) && isStr(g.answer) && Array.isArray(g.alt))) err(f, 'hoeren.teil5 gaps invalid');
  else h5.gaps.forEach((g, i) => {
    const hay = h5.audio.toLowerCase();
    const needles = [g.answer, ...g.alt].map(x => x.toLowerCase());
    // The answer (or an alternative) should be derivable; only warn-level: check the main token appears for word answers
    if (!/\d/.test(g.answer) && !needles.some(n => hay.includes(n.split(' ').pop()))) {
      console.warn(`  ⚠ [${f}] hoeren.teil5 gap${i + 1}: answer "${g.answer}" not literally found in audio (check it is inferable)`);
    }
  });

  // Schreiben
  const W = ex.schreiben || {};
  if (!isStr(W.anweisung) || !isStr(W.situation) || !isStr(W.musterloesung) || !isStr(W.tipps)) err(f, 'schreiben missing fields');
  if (!W.incomingEmail || !isStr(W.incomingEmail.von) || !isStr(W.incomingEmail.betreff) || !isStr(W.incomingEmail.text)) err(f, 'schreiben.incomingEmail invalid');
  if (!W.points || W.points.length !== 3 || !W.points.every(isStr)) err(f, 'schreiben needs 3 points');

  // Sprechen
  const P = ex.sprechen || {};
  if (!P.teil1 || !P.teil1.punkte || P.teil1.punkte.length < 5 || !P.teil1.redemittel || P.teil1.redemittel.length < 5) err(f, 'sprechen.teil1 invalid');
  if (!P.teil2 || !isStr(P.teil2.thema) || !P.teil2.leitfragen || P.teil2.leitfragen.length !== 4 || !P.teil2.redemittel || P.teil2.redemittel.length < 4) err(f, 'sprechen.teil2 invalid');
  if (!P.teil3 || !isStr(P.teil3.aufgabe) || !P.teil3.punkte || P.teil3.punkte.length !== 4 || !P.teil3.redemittel || P.teil3.redemittel.length < 4) err(f, 'sprechen.teil3 invalid');

  if (failures === 0) console.log(`  ✓ [${f}] OK — "${ex.title}" (${ex.level}, ${ex.theme})`);
  else console.log(`  … [${f}] checked with errors above`);
}

console.log(failures ? `\nFAILED: ${failures} problem(s).` : '\nAll files valid.');
process.exit(failures ? 1 : 0);
