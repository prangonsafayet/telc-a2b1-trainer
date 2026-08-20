import { Info, Sparkles } from 'lucide-react';

import { A2B1_CURRICULUM } from '@content/trainers/a2b1/curriculum.ts';

import { PageTitle, SectionTitle } from '@shared/components';
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

import LearnDayCard from '../components/LearnDayCard.tsx';
import LearnSlotSection from '../components/LearnSlotSection.tsx';
import { useLearnPlan } from '../hooks/useLearnPlan.ts';
import { useScheduledLearn } from '../hooks/useScheduledLearn.ts';

const LearnPage = () => {
  const plan = useLearnPlan();
  const scheduled = useScheduledLearn();

  return (
    <>
      <PageTitle
        /* A2B1_CURRICULUM.intro is authored HTML in content/learn.ts (it bolds a few phrases), so it is
           injected rather than rendered as text — same as the guide and cheatsheets. It is
           the fallback for a date no plan can be built from. */
        lead={scheduled.lead ?? <span dangerouslySetInnerHTML={{ __html: A2B1_CURRICULUM.intro }} />}
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
              <LearnSlotSection
                key={group.key}
                heading={group.heading}
                kindLabel={group.kindLabel}
                isToday={group.isToday}
                days={group.days}
                plan={plan}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <SectionTitle>The 28-day curriculum</SectionTitle>
          <div className="stagger space-y-4">
            {scheduled.pending.map(day => (
              <LearnDayCard
                key={day.day}
                day={day}
                complete={false}
                cheatsheets={A2B1_CURRICULUM.cheatsheets}
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
            Not scheduled at your pace — these {scheduled.extra.length} B1 days are worth doing if you find
            the time, and they move into the plan automatically if your exam date moves.
          </p>
          <div className="stagger space-y-4">
            {scheduled.extra.map(day => (
              <LearnDayCard
                key={day.day}
                day={day}
                complete={false}
                cheatsheets={A2B1_CURRICULUM.cheatsheets}
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
                        <LearnDayCard
                          key={day.day}
                          day={day}
                          complete
                          cheatsheets={A2B1_CURRICULUM.cheatsheets}
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

      <SectionTitle>Cheatsheets</SectionTitle>
      <p className="mb-3 flex items-center gap-1.5 text-muted-foreground">
        <Sparkles className="size-4 shrink-0" aria-hidden />
        Open, study, and come back before every mock exam.
      </p>
      <Card>
        <CardContent>
          <Accordion
            type="multiple"
            value={[...plan.openCheatsheets]}
            onValueChange={plan.setOpenCheatsheets}
          >
            {Object.entries(A2B1_CURRICULUM.cheatsheets).map(([id, sheet]) => (
              <AccordionItem key={id} value={id} id={`cs-${id}`} className="scroll-mt-24">
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
  );
};

export default LearnPage;
