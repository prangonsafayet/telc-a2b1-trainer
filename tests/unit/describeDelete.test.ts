import { describe, expect, it } from 'vitest';

import { describeDelete } from '@features/settings/lib/describeDelete.ts';

/*
 * The dialog used to say the data "will be removed from this browser. This cannot be undone."
 * Both halves were wrong at once: the write stamps the document, which trips the debounced
 * push, so a signed-in delete has always reached the cloud — and the merge is union-only, so
 * any other signed-in device that still holds a copy restores everything on its next sync.
 * A dialog that under-promises the blast radius and over-promises finality is worse than no
 * dialog, so the two claims are asserted here rather than left to a reading.
 */

describe('describeDelete', () => {
  it('never claims the delete cannot be undone', () => {
    for (const signedIn of [true, false]) {
      expect(describeDelete(signedIn)).not.toMatch(/cannot be undone/i);
    }
  });

  it('says the cloud copy goes, and that another device can bring it back', () => {
    const copy = describeDelete(true);

    expect(copy).toMatch(/cloud copy is deleted/i);
    expect(copy).toMatch(/restore it on its next sync/i);
    expect(copy).toMatch(/delete there too|sign out/i);
  });

  it('says the opposite when signed out — nothing leaves the browser', () => {
    const copy = describeDelete(false);

    expect(copy).toMatch(/nothing leaves this browser/i);
    expect(copy).not.toMatch(/cloud copy is deleted/i);
    /* Signing in later is the way it comes back, which the old copy denied outright. */
    expect(copy).toMatch(/brings it back/i);
  });

  it('names the exam in progress, which the wipe used to leave behind', () => {
    for (const signedIn of [true, false]) {
      expect(describeDelete(signedIn)).toMatch(/exam in progress/i);
    }
  });
});
