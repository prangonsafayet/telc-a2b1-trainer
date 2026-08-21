import { Trash2, TriangleAlert } from 'lucide-react';

import { Button, Card, CardContent, CardHeader } from '@shared/ui';

import { useProgressData } from '../hooks/useProgressData.ts';

/**
 * The one destructive action on the page, in a region of its own at the end of it: bounded,
 * tinted and named, so the confirm dialog it opens is the expected next step rather than a
 * surprise from a button that sat in a row with the harmless ones.
 *
 * The warning is a sentence rather than a red chip: `--destructive` as small text on this
 * tint measures 4.43:1 in the light theme, under the 4.5:1 that body text needs, while the
 * same colour as the icon and the button is a graphic at 4.43:1 against the 3:1 it needs.
 */
const DeleteProgressCard = () => {
  const { deleteAllProgress } = useProgressData();

  return (
    <Card className="gap-4 border-destructive/50 bg-[color-mix(in_oklab,var(--destructive)_4%,transparent)]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TriangleAlert className="size-4 shrink-0 text-destructive" aria-hidden />
          <h3 className="font-semibold leading-none">Delete all progress</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="max-w-2xl text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Everything in this browser goes.</span> Every attempt,
          score and learn-plan tick of every trainer, any exam in progress, and the exam conditions return to
          their defaults. Signed in, your cloud copy goes with it — but another device that still holds a copy
          will restore it on its next sync, so delete there too. Export a backup first if you may want any of
          it again.
        </p>
        <Button variant="destructive" onClick={() => void deleteAllProgress()}>
          <Trash2 /> Delete all progress
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeleteProgressCard;
