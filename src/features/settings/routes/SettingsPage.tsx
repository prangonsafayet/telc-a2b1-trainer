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

import SettingsField from '../components/SettingsField.tsx';
import TrainerConditionsCard from '../components/TrainerConditionsCard.tsx';
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

      <TrainerConditionsCard />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Listening audio</CardTitle>
          <CardDescription>
            The listening modules are read by your browser&apos;s German voice. These apply to every trainer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
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

      <div className="mt-6">
        <SyncPanel />
      </div>
    </>
  );
};

export default SettingsPage;
