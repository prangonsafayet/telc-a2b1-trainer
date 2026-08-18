/* German text-to-speech for the listening module — thin wrapper over speechSynthesis. */
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

let voices = [];
const listeners = new Set();

/* Re-read the browser's voice list. The array identity only changes when the set of
   German voices actually changed — otherwise a render that reads it would set state,
   re-render, re-read, and loop forever (which is exactly what happens on machines with
   no German voice installed, where getVoices() keeps returning an empty list). */
function refreshVoices() {
  let next;
  try {
    next = speechSynthesis.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith('de'));
  } catch (e) {
    next = [];
  }
  const same = next.length === voices.length && next.every((v, i) => v.name === voices[i].name);
  if (same) return;
  voices = next;
  listeners.forEach(fn => fn(voices));
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  refreshVoices();
  speechSynthesis.onvoiceschanged = refreshVoices;
}

export function getVoices() {
  return voices;
}

/* Re-renders the component when the browser finishes loading its voice list. */
export function useGermanVoices() {
  const [list, setList] = useState(voices);
  useEffect(() => {
    listeners.add(setList);
    refreshVoices();
    setList(voices);
    return () => { listeners.delete(setList); };
  }, []);
  return list;
}

function pickVoice(voiceName) {
  const list = getVoices();
  return list.find(v => v.name === voiceName) || list[0] || null;
}

export const rateForExam = (ex, settings) =>
  (ex.difficulty === 'easy' ? 0.88 : ex.difficulty === 'medium' ? 0.94 : 1.0) * settings.ttsRate;

let speaking = false;
export const isSpeaking = () => speaking;

export function stopSpeech() {
  try { speechSynthesis.cancel(); } catch (e) { /* not supported */ }
  speaking = false;
}

/* `audio` is either a plain string or [{ speaker, text }, …] for dialogues. */
export function speakAudio(audio, rate, voiceName, onDone) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    toast.error('This browser has no speech synthesis', {
      description: 'The listening audio needs it. You can still read the transcripts in the review.'
    });
    onDone && onDone();
    return;
  }
  if (!getVoices().length) {
    toast.error('No German voice installed', {
      description: 'Chrome and Edge ship one; otherwise install a German language pack, then reload.'
    });
    onDone && onDone();
    return;
  }
  stopSpeech();
  const turns = Array.isArray(audio) ? audio : [{ speaker: '', text: audio }];
  const speakers = [...new Set(turns.map(t => t.speaker))];
  const v = pickVoice(voiceName);
  let i = 0;
  speaking = true;
  const next = () => {
    if (!speaking || i >= turns.length) {
      speaking = false;
      onDone && onDone();
      return;
    }
    const t = turns[i++];
    const u = new SpeechSynthesisUtterance(t.text);
    if (v) u.voice = v;
    u.lang = 'de-DE';
    u.rate = rate;
    u.pitch = speakers.length > 1 ? (speakers.indexOf(t.speaker) % 2 === 0 ? 1.05 : 0.85) : 1.0;
    u.onend = () => setTimeout(next, 350);
    u.onerror = () => setTimeout(next, 100);
    speechSynthesis.speak(u);
  };
  next();
}
