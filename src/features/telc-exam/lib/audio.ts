import { type AudioScript, type TelcExam, type TelcLevel } from '@shared/types';

/** Resolves the audio script for a listening item key such as `h1.3` or `h2`. */
export const telcAudioForKey = (exam: TelcExam, key: string): AudioScript => {
  if (key === 'h2') return exam.hoeren.teil2.audio;
  const [part, itemIndex] = key.split('.');
  const index = Number(itemIndex);
  if (part === 'h1') return exam.hoeren.teil1.items[index]?.audio ?? '';
  if (part === 'h3') return exam.hoeren.teil3.items[index]?.audio ?? '';
  return '';
};

/** B1 audio is read slightly slower than B2, then scaled by the user's speed setting. */
export const telcRate = (level: TelcLevel, ttsRate: number): number =>
  (level === 'b1' ? 0.97 : 1.03) * ttsRate;
