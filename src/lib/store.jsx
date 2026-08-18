/* The single source of truth for progress: attempts, learn-plan checkboxes and settings.
   Everything is mirrored into localStorage on every change, so a page refresh is lossless. */
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { DEFAULTS } from './constants.js';

const KEY = 'telcTrainerV1';
const mem = {};
const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return mem[k] ?? null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } };

export function normalizeDB(raw) {
  const db = { ...DEFAULTS, ...(raw || {}) };
  db.settings = { ...DEFAULTS.settings, ...(db.settings || {}) };
  db.attempts = Array.isArray(db.attempts) ? db.attempts : [];
  db.learnDone = db.learnDone || {};
  return db;
}

function loadDB() {
  try {
    return normalizeDB(JSON.parse(lsGet(KEY) || '{}'));
  } catch (e) {
    return normalizeDB(null);
  }
}

const DBContext = createContext(null);

export function DBProvider({ children }) {
  const [db, setDb] = useState(loadDB);
  const dbRef = useRef(db);
  dbRef.current = db;

  /* Apply a change, stamp it, and write it through to localStorage.
     `recipe` receives a shallow copy it may mutate, or returns a fresh object. */
  const update = useCallback(recipe => {
    setDb(prev => {
      const draft = { ...prev, settings: { ...prev.settings }, learnDone: { ...prev.learnDone }, attempts: prev.attempts.slice() };
      const next = normalizeDB(recipe(draft) || draft);
      next._updatedAt = new Date().toISOString();
      lsSet(KEY, JSON.stringify(next));
      dbRef.current = next;
      return next;
    });
  }, []);

  /* Save locally without stamping a new _updatedAt — used when cloud sync hands us
     a merged document, so we don't fight over which side is newer. */
  const replaceLocal = useCallback(next => {
    const norm = normalizeDB(next);
    lsSet(KEY, JSON.stringify(norm));
    dbRef.current = norm;
    setDb(norm);
  }, []);

  const value = useMemo(() => ({ db, dbRef, update, replaceLocal }), [db, update, replaceLocal]);
  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
}

export function useDB() {
  const ctx = useContext(DBContext);
  if (!ctx) throw new Error('useDB must be used inside <DBProvider>');
  return ctx;
}
