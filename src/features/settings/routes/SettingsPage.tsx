import { PageTitle } from '@shared/components';
import { TRAINER_ORDER } from '@shared/config/trainers.ts';

import { SyncPanel } from '@features/auth';

import AudioSettingsCard from '../components/AudioSettingsCard.tsx';
import DeleteProgressCard from '../components/DeleteProgressCard.tsx';
import ExamConditionsCard from '../components/ExamConditionsCard.tsx';
import ProgressBackupCard from '../components/ProgressBackupCard.tsx';
import SettingsSection from '../components/SettingsSection.tsx';
import TrainerExamDateCard from '../components/TrainerExamDateCard.tsx';

/**
 * Five groups, in the order they matter: when you sit the exam, how strictly a mock exam
 * runs, what it sounds like, where the results are kept, and what to do with them. Grouping
 * by what a setting is for is what keeps the destructive action out of a row of dropdowns.
 */
const SettingsPage = () => (
  <>
    <PageTitle lead="Your exam dates drive the study plans. Everything else here decides how a mock exam runs — set it once and leave it, so your scores stay comparable.">
      Settings
    </PageTitle>

    <SettingsSection
      title="Your exams"
      lead="Each trainer has its own date, and its 28-day plan re-paces itself around that date on its own."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRAINER_ORDER.map(trainer => (
          <TrainerExamDateCard key={trainer} trainer={trainer} />
        ))}
      </div>
    </SettingsSection>

    <SettingsSection
      title="Exam conditions"
      lead="How closely a mock exam copies the real sitting. The defaults match the official format of each paper — relax one and your scores stop being comparable."
    >
      <ExamConditionsCard />
    </SettingsSection>

    <SettingsSection
      title="Listening audio"
      lead="Your browser reads the listening modules aloud. One voice serves every trainer."
    >
      <AudioSettingsCard />
    </SettingsSection>

    <SettingsSection
      title="Account and sync"
      lead="Sign in to carry your progress between devices. Without it, everything stays in this browser."
    >
      <SyncPanel />
    </SettingsSection>

    <SettingsSection
      title="Your data"
      lead="Your attempts, plans and settings are stored in this browser. Take a copy of them, restore one, or clear everything out."
    >
      <div className="space-y-4">
        <ProgressBackupCard />
        <DeleteProgressCard />
      </div>
    </SettingsSection>
  </>
);

export default SettingsPage;
