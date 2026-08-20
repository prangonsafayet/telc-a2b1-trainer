import { Info, Sparkles } from 'lucide-react';

import { PageTitle, SectionTitle } from '@shared/components';
import { useTrainerContent } from '@shared/hooks/useTrainerContent.ts';
import { type LearnDay, type TrainerId } from '@shared/types';
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

interface LearnPageProps {
  readonly trainer: TrainerId;
}

/** One trainer's curriculum, re-paced around its own exam date. */
const LearnPage = ({ trainer }: LearnPageProps) => {
  const plan = useLearnPlan(trainer);
  const scheduled = useScheduledLearn(trainer);
  const curriculum = useTrainerContent(trainer).curriculum;
  const cheatsheets = Object.entries(plan.cheatsheets);

  const dayCard = (day: LearnDay, complete: boolean) => (
    <LearnDayCard
      key={day.day}
      day={day}
      complete={complete}
      cheatsheets={plan.cheatsheets}
      isTaskDone={index => plan.isTaskDone(day.day, index)}
      onToggleTask={(index, done) => {
        plan.toggleTask(day.day, index, done);
      }}
    />
  );

  return (
    <>
      <PageTitle
        /* The curriculum intro is repo-authored HTML (it bolds a few phrases) and is
           injected rather than rendered as text — same as the guide and the cheatsheets. It
           is the fallback for a date no plan can be built from. */
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
              <LearnSlotSection key={group.key} group={group} plan={plan} />
            ))}
          </div>
        </>
      ) : (
        <>
          <SectionTitle>The curriculum</SectionTitle>
          <div className="stagger space-y-4">{scheduled.pending.map(day => dayCard(day, false))}</div>
        </>
      )}

      {scheduled.extra.length > 0 ? (
        <>
          <SectionTitle>Extra material</SectionTitle>
          <p className="mb-3 text-muted-foreground">
            Not scheduled at your pace — these {scheduled.extra.length} days are worth doing if you find the
            time, and they move into the plan automatically if your exam date moves.
          </p>
          <div className="stagger space-y-4">{scheduled.extra.map(day => dayCard(day, false))}</div>
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
                    <div className="space-y-4">{scheduled.done.map(day => dayCard(day, true))}</div>
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
                {cheatsheets.map(([id, sheet]) => (
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
      ) : null}
    </>
  );
};

export default LearnPage;
