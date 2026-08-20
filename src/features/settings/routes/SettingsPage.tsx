import { Trash2, Volume2 } from 'lucide-react';

import { PageTitle } from '@shared/components';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator
} from '@shared/ui';

import { SyncPanel } from '@features/auth';

import ExamDateControls from '../components/ExamDateControls.tsx';
import LevelTrainerSettingsCard from '../components/LevelTrainerSettingsCard.tsx';
import SettingsField from '../components/SettingsField.tsx';
import { useExamSettings } from '../hooks/useExamSettings.ts';

/** "Auto" is stored as an empty voice name; Radix Select needs a non-empty value. */
const AUTO_VOICE = 'auto';

const SettingsPage = () => {
  const { settings, voices, setSetting, testVoice, deleteAllProgress } = useExamSettings();

  return (
    <>
      <PageTitle lead="Tune the exam conditions — then keep them fixed, so your scores stay comparable.">
        Settings
      </PageTitle>

      <Card>
        <CardHeader>
          <CardTitle>Exam conditions</CardTitle>
          <CardDescription>Defaults match the official telc format.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <SettingsField label="Writing time" htmlFor="setting-writing" hint="Official: 10 minutes.">
              <Select
                value={String(settings.writingMinutes)}
                onValueChange={value => {
                  setSetting('writingMinutes', Number(value));
                }}
              >
                <SelectTrigger id="setting-writing" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 minutes (official)</SelectItem>
                  <SelectItem value="15">15 minutes (relaxed)</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>

            <SettingsField label="Listening speed" htmlFor="setting-rate">
              <Select
                value={String(settings.ttsRate)}
                onValueChange={value => {
                  setSetting('ttsRate', Number(value));
                }}
              >
                <SelectTrigger id="setting-rate" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.85">Slower</SelectItem>
                  <SelectItem value="1">Normal (recommended)</SelectItem>
                  <SelectItem value="1.1">Faster (challenge)</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>

            <SettingsField
              label="Audio plays per item"
              htmlFor="setting-plays"
              hint="The real exam plays most items twice."
            >
              <Select
                value={String(settings.playsAllowed)}
                onValueChange={value => {
                  setSetting('playsAllowed', Number(value));
                }}
              >
                <SelectTrigger id="setting-plays" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 (hard mode)</SelectItem>
                  <SelectItem value="2">2 (realistic)</SelectItem>
                  <SelectItem value="3">3 (training)</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>

            <SettingsField label="German voice" htmlFor="setting-voice">
              <Select
                value={settings.voiceName || AUTO_VOICE}
                onValueChange={value => {
                  setSetting('voiceName', value === AUTO_VOICE ? '' : value);
                }}
              >
                <SelectTrigger id="setting-voice" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={AUTO_VOICE}>Auto (first German voice)</SelectItem>
                  {voices.map(voice => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SettingsField>

            <SettingsField label="Your exam date">
              <ExamDateControls
                value={settings.examDate}
                onChange={iso => {
                  setSetting('examDate', iso);
                }}
              />
            </SettingsField>
          </div>

          <p className="text-sm text-muted-foreground">
            {voices.length > 0
              ? `${String(voices.length)} German voice(s) found in this browser.`
              : '⚠ No German voice found — listening audio needs one. Chrome/Edge usually include German voices; on some systems you must install a German language pack.'}
          </p>

          <Separator />

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={testVoice}>
              <Volume2 /> Test voice
            </Button>
            <Button variant="destructive" onClick={() => void deleteAllProgress()}>
              <Trash2 /> Delete all progress
            </Button>
          </div>
        </CardContent>
      </Card>

      <LevelTrainerSettingsCard />

      <div className="mt-6">
        <SyncPanel />
      </div>
    </>
  );
};

export default SettingsPage;
