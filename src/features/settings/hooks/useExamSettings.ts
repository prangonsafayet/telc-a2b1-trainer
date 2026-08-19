import { useCallback } from 'react';

import { toast } from 'sonner';

import { DEFAULT_SETTINGS } from '@shared/config/exam.ts';
import { useGermanVoices } from '@shared/hooks/useGermanVoices.ts';
import { speakScript } from '@shared/lib/speech.ts';
import { useConfirm } from '@shared/providers/useConfirm.ts';
import { type Settings } from '@shared/types';

import { stamp, useProgress } from '@features/progress';

const VOICE_TEST_SCRIPT = 'Guten Tag! Willkommen zur Prüfung telc Deutsch A2 B1. Viel Erfolg!';

export interface ExamSettingsState {
  readonly settings: Settings;
  readonly voices: readonly SpeechSynthesisVoice[];
  readonly setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  readonly testVoice: () => void;
  readonly deleteAllProgress: () => Promise<void>;
}

export function useExamSettings(): ExamSettingsState {
  const { db, update, replaceLocal } = useProgress();
  const confirm = useConfirm();
  const voices = useGermanVoices();
  const settings = db.settings;

  const setSetting = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      update(current => ({ ...current, settings: { ...current.settings, [key]: value } }));
    },
    [update]
  );

  const testVoice = useCallback(() => {
    speakScript(VOICE_TEST_SCRIPT, settings.ttsRate, settings.voiceName);
  }, [settings.ttsRate, settings.voiceName]);

  const deleteAllProgress = useCallback(async () => {
    const confirmed = await confirm({
      title: 'Delete all progress?',
      description:
        'Every attempt, score and learn-plan checkbox will be removed from this browser. This cannot be undone.',
      confirmText: 'Delete everything',
      destructive: true
    });
    if (!confirmed) return;

    replaceLocal(stamp({ attempts: [], learnDone: {}, settings: DEFAULT_SETTINGS }));
    toast.success('All progress deleted.');
  }, [confirm, replaceLocal]);

  return { settings, voices, setSetting, testVoice, deleteAllProgress };
}
