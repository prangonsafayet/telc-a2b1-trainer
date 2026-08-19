import { useSyncExternalStore } from 'react';

import { getGermanVoices, subscribeToVoices } from '@shared/lib/speech.ts';

/**
 * The browser's German voice list, which Chrome populates asynchronously after load.
 * It is external mutable state, so it is read through `useSyncExternalStore` rather than
 * mirrored into component state.
 */
export function useGermanVoices(): readonly SpeechSynthesisVoice[] {
  return useSyncExternalStore(subscribeToVoices, getGermanVoices, getGermanVoices);
}
