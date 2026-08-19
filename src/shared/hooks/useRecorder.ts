import { useCallback, useEffect, useRef, useState } from 'react';

import { toast } from 'sonner';

export type RecorderStatus = 'idle' | 'recording' | 'done' | 'unavailable';

export interface RecorderState {
  readonly status: RecorderStatus;
  readonly message: string;
  readonly supported: boolean;
  readonly start: () => Promise<void>;
  readonly stop: () => void;
}

interface RecorderOptions {
  /** Called with a blob URL once a recording finishes. */
  readonly onRecorded: (url: string) => void;
}

/**
 * Microphone capture for the speaking module. Recordings stay in memory as blob URLs:
 * they are never uploaded or written to disk, and so do not survive a reload.
 */
export const useRecorder = ({ onRecorded }: RecorderOptions): RecorderState => {
  const [status, setStatus] = useState<RecorderStatus>('idle');
  const [message, setMessage] = useState('');
  const activeRef = useRef<{ stream: MediaStream | null; recorder: MediaRecorder | null }>({
    stream: null,
    recorder: null
  });

  const supported =
    typeof navigator !== 'undefined' &&
    'mediaDevices' in navigator &&
    typeof window !== 'undefined' &&
    'MediaRecorder' in window;

  useEffect(
    () => () => {
      const { stream, recorder } = activeRef.current;
      if (recorder && recorder.state !== 'inactive') recorder.stop();
      stream?.getTracks().forEach(track => {
        track.stop();
      });
    },
    []
  );

  const start = useCallback(async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = event => chunks.push(event.data);
      recorder.onstop = () => {
        onRecorded(URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })));
        stream.getTracks().forEach(track => {
          track.stop();
        });
        setStatus('done');
        setMessage('recorded ✓ — listen below');
      };

      recorder.start();
      activeRef.current = { stream, recorder };
      setStatus('recording');
      setMessage('recording…');
    } catch {
      setStatus('unavailable');
      setMessage('Microphone not available — practice out loud and self-rate.');
      toast.error('Microphone unavailable', {
        description: 'Allow microphone access in your browser, or just speak out loud and rate yourself.'
      });
    }
  }, [onRecorded]);

  const stop = useCallback(() => {
    const { recorder } = activeRef.current;
    if (recorder && recorder.state !== 'inactive') recorder.stop();
  }, []);

  return { status, message, supported, start, stop };
};
