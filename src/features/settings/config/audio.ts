/** Constants of the listening-audio settings: the speeds offered and the test sentence. */

import { type SettingChoice } from '@shared/config/examConditions.ts';

/**
 * "Auto" is stored as an empty voice name, and Radix Select needs a non-empty value, so the
 * two spellings are bridged by one constant both the hook and the select read.
 */
export const AUTO_VOICE = 'auto';

/** Speeds the listening audio is read at, as multipliers of the paper's own rate. */
export const TTS_RATE_CHOICES: readonly SettingChoice[] = [
  { value: 0.85, label: 'Slower' },
  { value: 1, label: 'Normal (recommended)' },
  { value: 1.1, label: 'Faster (challenge)' }
];

/** What "Test voice" reads out. Names no trainer: the setting applies to all of them. */
export const VOICE_TEST_SCRIPT = 'Guten Tag! Willkommen zur Prüfung. Hören Sie gut zu — viel Erfolg!';
