import { type ExamModuleProps, type LevelTrainerSettings, type TelcExam } from '@shared/types';

/** What a telc B1/B2 module renderer receives. */
export type TelcModuleProps = ExamModuleProps<TelcExam, LevelTrainerSettings>;
