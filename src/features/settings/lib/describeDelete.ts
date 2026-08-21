/**
 * What "delete all progress" actually does, in words.
 *
 * The dialog used to say the data "will be removed from this browser. This cannot be undone."
 * Both halves were wrong at once: the write stamps the document, which trips the debounced
 * push, so a signed-in delete has always reached the cloud — and the merge is union-only by
 * design, so any other signed-in device that still holds a copy restores everything on its
 * next sync. Undoing it is exactly what happens by accident.
 *
 * Copy lives here rather than in the card or the hook so there is one wording of it, checked
 * next to the behaviour it describes.
 */

/** Everything that goes, whether or not an account is involved. */
const LOCAL =
  'Everything stored in this browser goes: every attempt and score, every learn-plan tick of every trainer, and any exam in progress. Exam conditions return to their defaults.';

/**
 * The dialog's description. `signedIn` decides the second half, because that is where the
 * two cases genuinely differ — not a flourish.
 */
export const describeDelete = (signedIn: boolean): string =>
  signedIn
    ? `${LOCAL} Your cloud copy is deleted with it. Another signed-in device that still holds a copy will restore it on its next sync, so delete there too — or sign out on this one first.`
    : `${LOCAL} Nothing leaves this browser, so signing in later on a device that still has your progress brings it back.`;
