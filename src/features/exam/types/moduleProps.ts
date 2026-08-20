import {
  type DualLevelExam,
  type ExamModuleProps,
  type LevelTrainerSettings,
  type Settings,
  type SingleLevelExam
} from '@shared/types';

/** What an A2·B1 module renderer receives. */
export type A2b1ModuleProps = ExamModuleProps<DualLevelExam, Settings>;

/** What a single-level (B1/B2) module renderer receives. */
export type SingleLevelModuleProps = ExamModuleProps<SingleLevelExam, LevelTrainerSettings>;
