import { type AudioScript } from '@shared/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@shared/ui';

interface TranscriptProps {
  readonly audio: AudioScript;
}

/** Collapsed by default — transcripts must stay hidden until the review screen. */
export function Transcript({ audio }: TranscriptProps) {
  return (
    <Accordion type="single" collapsible className="mt-2">
      <AccordionItem value="transcript" className="border-b-0">
        <AccordionTrigger className="py-2 text-xs text-muted-foreground">Transcript</AccordionTrigger>
        <AccordionContent className="pb-2">
          <div className="rounded-md bg-muted p-3 text-sm leading-relaxed">
            {typeof audio === 'string'
              ? audio
              : audio.map((turn, index) => (
                  <div key={index}>
                    <b>{turn.speaker}:</b> {turn.text}
                  </div>
                ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
