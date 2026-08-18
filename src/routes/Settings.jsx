import { Trash2, Volume2 } from 'lucide-react';
import { toast } from 'sonner';
import SyncPanel from '@/components/SyncPanel.jsx';
import { PageTitle } from '@/components/common.jsx';
import { useConfirm } from '@/components/ConfirmProvider.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { DEFAULTS } from '@/lib/constants.js';
import { useDB } from '@/lib/store.jsx';
import { speakAudio, useGermanVoices } from '@/lib/tts.js';

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export default function Settings() {
  const { db, update, replaceLocal } = useDB();
  const confirm = useConfirm();
  const s = db.settings;
  const voices = useGermanVoices();

  const set = (key, value) => update(draft => { draft.settings = { ...draft.settings, [key]: value }; });

  const wipe = async () => {
    const ok = await confirm({
      title: 'Delete all progress?',
      description: 'Every attempt, score and learn-plan checkbox will be removed from this browser. This cannot be undone.',
      confirmText: 'Delete everything',
      destructive: true
    });
    if (!ok) return;
    replaceLocal({ ...JSON.parse(JSON.stringify(DEFAULTS)), _updatedAt: new Date().toISOString() });
    toast.success('All progress deleted.');
  };

  return (
    <>
      <PageTitle lead="Tune the exam conditions — then keep them fixed, so your scores stay comparable.">Settings</PageTitle>

      <Card>
        <CardHeader>
          <CardTitle>Exam conditions</CardTitle>
          <CardDescription>Defaults match the official telc format.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Writing time" hint="Official: 10 minutes.">
              <Select value={String(s.writingMinutes)} onValueChange={v => set('writingMinutes', +v)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 minutes (official)</SelectItem>
                  <SelectItem value="15">15 minutes (relaxed)</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Listening speed">
              <Select value={String(s.ttsRate)} onValueChange={v => set('ttsRate', +v)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.85">Slower</SelectItem>
                  <SelectItem value="1">Normal (recommended)</SelectItem>
                  <SelectItem value="1.1">Faster (challenge)</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="Audio plays per item" hint="The real exam plays most items twice.">
              <Select value={String(s.playsAllowed)} onValueChange={v => set('playsAllowed', +v)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 (hard mode)</SelectItem>
                  <SelectItem value="2">2 (realistic)</SelectItem>
                  <SelectItem value="3">3 (training)</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field label="German voice">
              <Select value={s.voiceName || 'auto'} onValueChange={v => set('voiceName', v === 'auto' ? '' : v)}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (first German voice)</SelectItem>
                  {voices.map(v => (
                    <SelectItem key={v.name} value={v.name}>{v.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Your exam date">
              <Input type="date" value={s.examDate} onChange={e => set('examDate', e.target.value || s.examDate)} />
            </Field>
          </div>

          <p className="text-sm text-muted-foreground">
            {voices.length
              ? `${voices.length} German voice(s) found in this browser.`
              : '⚠ No German voice found — listening audio needs one. Chrome/Edge usually include German voices; on some systems you must install a German language pack.'}
          </p>

          <Separator />

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() =>
                speakAudio('Guten Tag! Willkommen zur Prüfung telc Deutsch A2 B1. Viel Erfolg!', s.ttsRate, s.voiceName)
              }
            >
              <Volume2 /> Test voice
            </Button>
            <Button variant="destructive" onClick={wipe}><Trash2 /> Delete all progress</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <SyncPanel />
      </div>
    </>
  );
}
