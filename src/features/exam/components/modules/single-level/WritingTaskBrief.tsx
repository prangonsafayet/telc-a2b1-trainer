import { Multiline } from '@shared/components';
import { type SingleLevelWritingTask } from '@shared/types';

interface WritingTaskBriefProps {
  readonly task: SingleLevelWritingTask;
}

/** The situation, incoming letter and Leitpunkte of one writing task. */
const WritingTaskBrief = ({ task }: WritingTaskBriefProps) => (
  <>
    <p className="mb-4">{task.situation}</p>
    {task.incoming ? (
      <div className="my-4 overflow-hidden rounded-lg border">
        <div className="border-b bg-muted/60 px-4 py-2 text-sm text-muted-foreground">
          Von: {task.incoming.von} · Betreff: <b className="text-foreground">{task.incoming.betreff}</b>
        </div>
        <div className="p-4 leading-relaxed">
          <Multiline text={task.incoming.text} />
        </div>
      </div>
    ) : null}
    <p className="mb-2 font-semibold">Leitpunkte:</p>
    <ol className="mb-4 list-decimal space-y-1 pl-5">
      {task.leitpunkte.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ol>
  </>
);

export default WritingTaskBrief;
