import { readFileSync } from 'node:fs';

/**
 * The trainer registry, readable from Node.
 *
 * `src/shared/config/trainers.ts` is the single place a per-trainer fact may live, but three
 * things outside the app cannot import it: `eslint.config.js` and the Vite config are plain
 * Node with no layer aliases, and the Playwright specs are plain JS with no bundler at all —
 * while the registry reaches for `@content/...` and `@shared/...` transitively. Each of them
 * used to keep its own copy of the trainer list, and the `eslint.config.js` copy was the
 * dangerous one: miss it when adding a trainer and the `no-restricted-syntax` rule the whole
 * design rests on silently stops covering the new id.
 *
 * So the descriptors are read out of the registry as text. It is a narrow parse — the flat
 * string fields of each descriptor, nothing nested — and it throws rather than returning a
 * short list, because a silent empty answer is what every one of those copies was for.
 * `tests/unit/trainerRegistry.test.js` asserts what this returns against the real `TRAINERS`,
 * so drift fails a test rather than a deploy.
 */

const REGISTRY = new URL('../src/shared/config/trainers.ts', import.meta.url);

/** The flat `field: 'value'` lines of one descriptor — nested objects are indented deeper. */
const FIELD = /^ {4}(\w+): '([^']*)',?$/gm;

/** One `  <id>: {` … `  },` block per descriptor inside the `TRAINERS` object literal. */
const DESCRIPTOR = /^ {2}(\w+): \{$/gm;

const REQUIRED = ['id', 'name', 'short', 'basePath', 'format'];

/**
 * Every trainer the registry declares, in the order it declares them.
 *
 * @param {URL} [registry] the registry module to read; overridable for tests
 * @returns {readonly {id: string, name: string, short: string, basePath: string, format: string}[]}
 */
export const trainerDescriptors = (registry = REGISTRY) => {
  const source = readFileSync(registry, 'utf8');
  const start = source.indexOf('export const TRAINERS');
  if (start === -1) throw new Error(`No \`export const TRAINERS\` in ${registry.pathname}.`);
  const literal = source.slice(start);

  const starts = [...literal.matchAll(DESCRIPTOR)].map(match => match.index ?? 0);
  if (starts.length === 0) {
    throw new Error(
      `No trainer descriptors found in ${registry.pathname}. Every Node-side consumer of the registry reads them from here — fix the pattern in scripts/trainerRegistry.mjs rather than hardcoding a trainer list.`
    );
  }

  return starts.map((from, index) => {
    const block = literal.slice(from, starts[index + 1] ?? literal.length);
    /** @type {Record<string, string>} */
    const fields = {};
    for (const [, key, value] of block.matchAll(FIELD)) fields[key] = value;
    const missing = REQUIRED.filter(key => !(key in fields));
    if (missing.length > 0) {
      throw new Error(
        `Trainer descriptor #${String(index + 1)} in ${registry.pathname} is missing ${missing.join(', ')}. Fix the pattern in scripts/trainerRegistry.mjs.`
      );
    }
    return {
      id: fields.id,
      name: fields.name,
      short: fields.short,
      basePath: fields.basePath,
      format: fields.format
    };
  });
};

/**
 * Every trainer id, for the lint rule that refuses one anywhere outside the registry.
 *
 * @param {URL} [registry]
 * @returns {readonly string[]}
 */
export const trainerIds = (registry = REGISTRY) => trainerDescriptors(registry).map(trainer => trainer.id);

/**
 * Every trainer's route namespace. The root trainer's is the empty string.
 *
 * @param {URL} [registry]
 * @returns {readonly string[]}
 */
export const trainerBasePaths = (registry = REGISTRY) => [
  ...new Set(trainerDescriptors(registry).map(trainer => trainer.basePath))
];
