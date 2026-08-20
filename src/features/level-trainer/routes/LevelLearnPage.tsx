import { Info } from 'lucide-react';

import { TRAINER_CONTENT } from '@content/trainers/index.ts';

import { PageTitle, SectionTitle } from '@shared/components';
import { type SingleLevelTrainerId } from '@shared/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  Card,
  CardContent,
  Progress
} from '@shared/ui';

import CurriculumDayCard from '../components/curriculum/CurriculumDayCard.tsx';
import CurriculumSlotSection from '../components/curriculum/CurriculumSlotSection.tsx';
import { useLevelPlan } from '../hooks/useLevelPlan.ts';
import { useScheduledLevelLearn } from '../hooks/useScheduledLevelLearn.ts';

interface LevelLearnPageProps {
  readonly level: SingleLevelTrainerId;
}

/** The level trainer's curriculum, re-paced around its exam date. */
const LevelLearnPage = ({ level }: LevelLearnPageProps) => {
  const plan = useLevelPlan(level);
  const scheduled = useScheduledLevelLearn(level);
  const curriculum = TRAINER_CONTENT[level].curriculum;
  const cheatsheets = Object.entries(curriculum.cheatsheets);

  return (
    <>
      <PageTitle
        /* `intro` is repo-authored HTML (it bolds a few phrases) and is injected, like the
           A2·B1 plan's. It is the fallback for a date no plan can be built from. */
        lead={scheduled.lead ?? <span dangerouslySetInnerHTML={{ __html: curriculum.intro }} />}
      >
        {scheduled.headline}
      </PageTitle>

      {scheduled.notice ? (
        <Alert className="mb-4">
          <Info aria-hidden />
          <AlertDescription>{scheduled.notice}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardContent className="space-y-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium">Plan progress</span>
            <span className="tabular-nums text-muted-foreground">
              {plan.summary.doneTasks}/{plan.summary.totalTasks} tasks done
            </span>
          </div>
          <Progress value={plan.summary.percent} />
        </CardContent>
      </Card>

      {scheduled.scheduled ? (
        <>
          <SectionTitle>Your schedule</SectionTitle>
          <div className="stagger space-y-8">
            {scheduled.groups.map(group => (
              <CurriculumSlotSection key={group.key} group={group} plan={plan} />
            ))}
          </div>
        </>
      ) : (
        <>
          <SectionTitle>The curriculum</SectionTitle>
          <div className="stagger space-y-4">
            {scheduled.pending.map(day => (
              <CurriculumDayCard
                key={day.day}
                day={day}
                complete={false}
                isTaskDone={index => plan.isTaskDone(day.day, index)}
                onToggleTask={(index, done) => {
                  plan.toggleTask(day.day, index, done);
                }}
              />
            ))}
          </div>
        </>
      )}

      {scheduled.extra.length > 0 ? (
        <>
          <SectionTitle>Extra material</SectionTitle>
          <p className="mb-3 text-muted-foreground">
            Not scheduled at your pace — these {scheduled.extra.length} days are worth doing if you find the
            time, and they move into the plan automatically if your exam date moves.
          </p>
          <div className="stagger space-y-4">
            {scheduled.extra.map(day => (
              <CurriculumDayCard
                key={day.day}
                day={day}
                complete={false}
                isTaskDone={index => plan.isTaskDone(day.day, index)}
                onToggleTask={(index, done) => {
                  plan.toggleTask(day.day, index, done);
                }}
              />
            ))}
          </div>
        </>
      ) : null}

      {scheduled.done.length > 0 ? (
        <>
          <SectionTitle>Done</SectionTitle>
          <Card>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="done" className="border-b-0">
                  <AccordionTrigger className="text-base font-semibold">
                    {scheduled.done.length} day{scheduled.done.length === 1 ? '' : 's'} finished
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {scheduled.done.map(day => (
                        <CurriculumDayCard
                          key={day.day}
                          day={day}
                          complete
                          isTaskDone={index => plan.isTaskDone(day.day, index)}
                          onToggleTask={(index, done) => {
                            plan.toggleTask(day.day, index, done);
                          }}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </>
      ) : null}

      {cheatsheets.length > 0 ? (
        <>
          <SectionTitle>Cheatsheets</SectionTitle>
          <Card>
            <CardContent>
              <Accordion type="multiple">
                {cheatsheets.map(([id, sheet]) => (
                  <AccordionItem key={id} value={id}>
                    <AccordionTrigger className="text-base font-semibold">{sheet.title}</AccordionTrigger>
                    <AccordionContent>
                      <div
                        className="prose prose-sm prose-stone max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: sheet.html }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default LevelLearnPage;
