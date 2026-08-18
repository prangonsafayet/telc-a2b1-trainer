export const LETTERS = 'abcdefghijkl';

export const fmtClock = sec => {
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m + ':' + String(s).padStart(2, '0');
};

export const fmtDate = iso =>
  new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' });

export const wordCount = s => (s && s.trim() ? s.trim().split(/\s+/).length : 0);
