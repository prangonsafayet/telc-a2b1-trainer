const norm = s =>
  String(s ?? '')
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:"'()]/g, '')
    .replace(/^((der|die|das|den|dem|ein|eine|einen|am|um|im) )+/, '')
    .replace(/ uhr$/, '')
    .replace(/\s+/g, ' ');

export function scoreLesen(ex, a) {
  let c = 0;
  ex.lesen.teil1.answers.forEach((ans, i) => { if (a['l1.' + i] === ans) c++; });
  ex.lesen.teil2.questions.forEach((q, i) => { if (a['l2.' + i] === q.answer) c++; });
  ex.lesen.teil3.answers.forEach((ans, i) => { if (a['l3.' + i] === ans) c++; });
  ex.lesen.teil4.statements.forEach((s, i) => { if (a['l4.' + i] === s.answer) c++; });
  return { correct: c, of: 20, points: c * 3 };
}

export function scoreSB(ex, a) {
  let c = 0;
  ex.sprachbausteine.teil1.gaps.forEach((g, i) => { if (a['s1.' + i] === g.answer) c++; });
  ex.sprachbausteine.teil2.answers.forEach((ans, i) => { if (a['s2.' + i] === ans) c++; });
  ex.sprachbausteine.teil3.items.forEach((it, i) => { if (a['s3.' + i] === it.answer) c++; });
  return { correct: c, of: 17, percent: Math.round((c / 17) * 100) };
}

export function gapCorrect(gap, val) {
  const n = norm(val);
  if (!n) return false;
  const cands = [gap.answer, ...(gap.alt || [])].map(norm);
  if (cands.includes(n)) return true;
  const digits = x => x.replace(/[^0-9]/g, '');
  if (digits(gap.answer) && digits(n) && digits(n) === digits(gap.answer)) return true;
  return false;
}

export function scoreHoeren(ex, a) {
  let c = 0;
  ex.hoeren.teil1.items.forEach((it, i) => { if (a['h1.' + i] === it.answer) c++; });
  ex.hoeren.teil2.items.forEach((it, i) => { if (a['h2.' + i] === it.answer) c++; });
  ex.hoeren.teil3.items.forEach((it, i) => { if (a['h3.' + i] === it.answer) c++; });
  ex.hoeren.teil4.questions.forEach((q, i) => { if (a['h4.' + i] === q.answer) c++; });
  ex.hoeren.teil5.gaps.forEach((g, i) => { if (gapCorrect(g, a['h5.' + i])) c++; });
  return { correct: c, of: 20, points: c * 3 };
}

/* Official rule: B1 = ≥42/60 in three skills + ≥24/60 in the fourth. */
export function gradeFull(scores) {
  const vals = ['lesen', 'hoeren', 'schreiben', 'sprechen'].map(k => scores[k] ?? 0);
  const total = vals.reduce((x, y) => x + y, 0);
  const b1 = vals.filter(v => v >= 42).length >= 3 && vals.every(v => v >= 24);
  const a2 = vals.filter(v => v >= 24).length >= 3 && vals.every(v => v >= 6);
  return { total, result: b1 ? 'B1' : a2 ? 'A2' : 'Nicht bestanden' };
}

/* How many items of a module are still blank — used for the submit warning. */
export function unansweredCount(ex, mod, a) {
  const miss = keys => keys.filter(k => a[k] == null || a[k] === '').length;
  const idx = (arr, p) => arr.map((_, i) => p + i);
  if (mod === 'lesen')
    return (
      miss(idx(ex.lesen.teil1.answers, 'l1.')) +
      miss(idx(ex.lesen.teil2.questions, 'l2.')) +
      miss(idx(ex.lesen.teil3.answers, 'l3.')) +
      miss(idx(ex.lesen.teil4.statements, 'l4.'))
    );
  if (mod === 'sprachbausteine')
    return (
      miss(idx(ex.sprachbausteine.teil1.gaps, 's1.')) +
      miss(idx(ex.sprachbausteine.teil2.answers, 's2.')) +
      miss(idx(ex.sprachbausteine.teil3.items, 's3.'))
    );
  if (mod === 'hoeren')
    return (
      miss(idx(ex.hoeren.teil1.items, 'h1.')) +
      miss(idx(ex.hoeren.teil2.items, 'h2.')) +
      miss(idx(ex.hoeren.teil3.items, 'h3.')) +
      miss(idx(ex.hoeren.teil4.questions, 'h4.')) +
      miss(idx(ex.hoeren.teil5.gaps, 'h5.'))
    );
  return 0;
}
