import { type VocabBank } from '@shared/types';

/**
 * The A2·B1 vocabulary and grammar bank.
 *
 * Empty for now: the bank is authored in its own task, with ids of the form `a2b1.v.001`.
 * The descriptor reports it as it is rather than pretending — the practice hub reads the
 * counts and shows its empty state, which is the honest thing for a trainer with no bank
 * yet and needs no per-trainer branch anywhere.
 */
export const A2B1_VOCAB: VocabBank = {
  verbs: [],
  nouns: [],
  adjectives: [],
  prepVerbs: [],
  caseItems: []
};
