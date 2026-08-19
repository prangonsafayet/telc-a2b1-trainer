import { type SpeakingPart } from '@shared/components';
import {
  type AnswerMap,
  type AnswerValue,
  type LevelTrainerSettings,
  type PlayBudget,
  type TelcExam
} from '@shared/types';

import { type TelcRecordingMap } from '../hooks/useTelcRun.ts';

/** Everything a B1/B2 module component may receive. Each uses only the parts it needs. */
export interface TelcModuleProps {
  readonly exam: TelcExam;
  readonly answers: AnswerMap;
  readonly setAnswer: (key: string, value: AnswerValue) => void;
  readonly settings: LevelTrainerSettings;
  readonly plays: PlayBudget;
  readonly onConsumePlay: (key: string) => void;
  readonly recordings: TelcRecordingMap;
  readonly onRecorded: (part: SpeakingPart, url: string) => void;
}
