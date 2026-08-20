import { toast } from 'sonner';

import { type AudioScript, type DualLevelExam, type Settings } from '@shared/types';

type VoiceListener = () => void;

let germanVoices: readonly SpeechSynthesisVoice[] = [];
const listeners = new Set<VoiceListener>();

/**
 * Re-reads the browser's voice list. The array identity only changes when the set of
 * German voices actually changed: a component that reads this during render would
 * otherwise set state, re-render and loop forever — which is exactly what happens on a
 * machine with no German voice installed, where the list is always empty.
 */
const refreshVoices = (): void => {
  let next: SpeechSynthesisVoice[];
  try {
    next = speechSynthesis.getVoices().filter(voice => voice.lang.toLowerCase().startsWith('de'));
  } catch {
    next = [];
  }
  const unchanged =
    next.length === germanVoices.length && next.every((voice, i) => voice.name === germanVoices[i]?.name);
  if (unchanged) return;

  germanVoices = next;
  for (const listener of listeners) listener();
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  refreshVoices();
  speechSynthesis.onvoiceschanged = refreshVoices;
}

export const getGermanVoices = (): readonly SpeechSynthesisVoice[] => germanVoices;

/** Store subscription: the callback takes no arguments, per useSyncExternalStore. */
export const subscribeToVoices = (onStoreChange: () => void): (() => void) => {
  listeners.add(onStoreChange);
  refreshVoices();
  return () => {
    listeners.delete(onStoreChange);
  };
};

const pickVoice = (preferredName: string): SpeechSynthesisVoice | null =>
  germanVoices.find(voice => voice.name === preferredName) ?? germanVoices[0] ?? null;

/** Easier exams are read more slowly, then scaled by the user's speed setting. */
export const rateForExam = (exam: DualLevelExam, settings: Settings): number => {
  const base = exam.difficulty === 'easy' ? 0.88 : exam.difficulty === 'medium' ? 0.94 : 1;
  return base * settings.ttsRate;
};

let speaking = false;

export const isSpeaking = (): boolean => speaking;

export const stopSpeech = (): void => {
  try {
    speechSynthesis.cancel();
  } catch {
    /* Not supported — nothing to cancel. */
  }
  speaking = false;
};

const TURN_GAP_MS = 350;

/** Reads a monologue or a dialogue aloud, alternating pitch between speakers. */
export const speakScript = (
  script: AudioScript,
  rate: number,
  voiceName: string,
  onDone?: () => void
): void => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    toast.error('This browser has no speech synthesis', {
      description: 'The listening audio needs it. You can still read the transcripts in the review.'
    });
    onDone?.();
    return;
  }
  if (germanVoices.length === 0) {
    toast.error('No German voice installed', {
      description: 'Chrome and Edge ship one; otherwise install a German language pack, then reload.'
    });
    onDone?.();
    return;
  }

  stopSpeech();

  const turns = typeof script === 'string' ? [{ speaker: '', text: script }] : script;
  const speakers = [...new Set(turns.map(turn => turn.speaker))];
  const voice = pickVoice(voiceName);

  let index = 0;
  speaking = true;

  const speakNext = (): void => {
    const turn = turns[index++];
    if (!speaking || !turn) {
      speaking = false;
      onDone?.();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(turn.text);
    if (voice) utterance.voice = voice;
    utterance.lang = 'de-DE';
    utterance.rate = rate;
    utterance.pitch = speakers.length > 1 ? (speakers.indexOf(turn.speaker) % 2 === 0 ? 1.05 : 0.85) : 1;
    utterance.onend = () => setTimeout(speakNext, TURN_GAP_MS);
    utterance.onerror = () => setTimeout(speakNext, 100);
    speechSynthesis.speak(utterance);
  };

  speakNext();
};

/** Resolves the audio script for a listening item key such as `h2.3`, `h4` or `h5`. */
export const audioForKey = (exam: DualLevelExam, key: string): AudioScript => {
  const { hoeren } = exam;
  if (key === 'h4') return hoeren.teil4.audio;
  if (key === 'h5') return hoeren.teil5.audio;

  const [part, itemIndex] = key.split('.');
  const index = Number(itemIndex);
  if (part === 'h1') return hoeren.teil1.items[index]?.audio ?? '';
  if (part === 'h2') return hoeren.teil2.items[index]?.audio ?? '';
  if (part === 'h3') return hoeren.teil3.items[index]?.audio ?? '';
  return '';
};
