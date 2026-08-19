import { type AnswerMap, type AnswerValue, type Exam, type PlayBudget, type Settings } from '@/shared/types';

import { type RecordingMap, type SpeakingPart } from '../hooks/use-exam-run.ts';

/** Everything a module component may receive. Each uses only the parts it needs. */
export interface ExamModuleProps {
  readonly exam: Exam;
  readonly answers: AnswerMap;
  readonly setAnswer: (key: string, value: AnswerValue) => void;
  readonly settings: Settings;
  readonly plays: PlayBudget;
  readonly onConsumePlay: (key: string) => void;
  readonly recordings: RecordingMap;
  readonly onRecorded: (part: SpeakingPart, url: string) => void;
}
