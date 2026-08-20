import {
  type Exam,
  type ExamModuleProps,
  type LevelTrainerSettings,
  type Settings,
  type TelcExam
} from '@shared/types';

/** What an A2·B1 module renderer receives. */
export type A2b1ModuleProps = ExamModuleProps<Exam, Settings>;

/** What a telc B1/B2 module renderer receives. */
export type TelcModuleProps = ExamModuleProps<TelcExam, LevelTrainerSettings>;
