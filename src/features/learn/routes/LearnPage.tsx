import { LEARN } from '@/content/learn.ts';

import { PageTitle, SectionTitle } from '@/shared/components';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/components/ui/accordion.tsx';
import { Card, CardContent } from '@/shared/components/ui/card.tsx';
import { Progress } from '@/shared/components/ui/progress.tsx';

import { LearnDayCard } from '../components/LearnDayCard.tsx';
import { useLearnPlan } from '../hooks/use-learn-plan.ts';

export function LearnPage() {
  const plan = useLearnPlan();

  return (
    <>
      {/* LEARN.intro is authored HTML in content/learn.ts (it bolds a few phrases), so it
          is injected rather than rendered as text — same as the guide and cheatsheets. */}
      <PageTitle lead={<span dangerouslySetInnerHTML={{ __html: LEARN.intro }} />}>
        AI-assisted learning — 14 days to mock-exam readiness
      </PageTitle>

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

      <SectionTitle>The 14-day plan</SectionTitle>
      <div className="stagger space-y-4">
        {LEARN.days.map(day => (
          <LearnDayCard
            key={day.day}
            day={day}
            complete={plan.isDayComplete(day.day)}
            cheatsheets={LEARN.cheatsheets}
            isTaskDone={index => plan.isTaskDone(day.day, index)}
            onToggleTask={(index, done) => {
              plan.toggleTask(day.day, index, done);
            }}
          />
        ))}
      </div>

      <SectionTitle>Cheatsheets</SectionTitle>
      <p className="mb-3 text-muted-foreground">Open, study, and come back before every mock exam.</p>
      <Card>
        <CardContent>
          <Accordion
            type="multiple"
            value={[...plan.openCheatsheets]}
            onValueChange={plan.setOpenCheatsheets}
          >
            {Object.entries(LEARN.cheatsheets).map(([id, sheet]) => (
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
}
