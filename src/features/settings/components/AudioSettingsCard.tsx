import { TriangleAlert, Volume2 } from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@shared/ui';

import { AUTO_VOICE, TTS_RATE_CHOICES } from '../config/audio.ts';
import { useAudioSettings } from '../hooks/useAudioSettings.ts';

import ChoiceSelect from './ChoiceSelect.tsx';
import SettingsField from './SettingsField.tsx';

/** The voice every listening module is read by, its speed, and a way to hear it. */
const AudioSettingsCard = () => {
  const { ttsRate, voiceValue, voices, voiceCountHint, setRate, setVoice, testVoice } = useAudioSettings();

  return (
    <Card>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <SettingsField label="German voice" htmlFor="setting-voice" hint={voiceCountHint}>
            <Select value={voiceValue} onValueChange={setVoice}>
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

          <SettingsField
            label="Listening speed"
            htmlFor="setting-rate"
            hint="Normal is the pace of the real recordings."
          >
            <ChoiceSelect id="setting-rate" value={ttsRate} choices={TTS_RATE_CHOICES} onChange={setRate} />
          </SettingsField>
        </div>

        {voiceCountHint === null ? (
          <Alert variant="warning">
            <TriangleAlert aria-hidden />
            <AlertTitle>No German voice in this browser</AlertTitle>
            <AlertDescription>
              <p>
                The listening modules need one. Chrome and Edge usually ship German voices; on some systems
                you have to install a German language pack first, then reload this page.
              </p>
            </AlertDescription>
          </Alert>
        ) : null}

        <Button variant="outline" onClick={testVoice}>
          <Volume2 /> Test voice
        </Button>
      </CardContent>
    </Card>
  );
};

export default AudioSettingsCard;
