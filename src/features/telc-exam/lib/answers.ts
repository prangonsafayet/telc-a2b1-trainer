import { type AnswerMap } from '@shared/types';

/**
 * Same flat, stringly-keyed answer scheme as the A2·B1 trainer, because it is persisted:
 * `l1.0`–`l1.4`, `l2.0`–`l2.4`, `l3.0`–`l3.9`, `s1.0`–`s1.9`, `s2.0`–`s2.9`,
 * `h1.0`–`h1.4`, `h2.0`–`h2.9`, `h3.0`–`h3.4`, `w.text`, `w.task`. Do not change it.
 */

export const numberAnswer = (answers: AnswerMap, key: string): number | undefined => {
  const value = answers[key];
  return typeof value === 'number' ? value : undefined;
};

export const booleanAnswer = (answers: AnswerMap, key: string): boolean | undefined => {
  const value = answers[key];
  return typeof value === 'boolean' ? value : undefined;
};

export const textAnswer = (answers: AnswerMap, key: string): string => {
  const value = answers[key];
  return typeof value === 'string' ? value : '';
};

/** Item key builder, so key formats live in one place. */
export const itemKey = (prefix: string, index: number): string => `${prefix}${String(index)}`;

/** The single key holding the Schreiben text. */
export const WRITING_ANSWER_KEY = 'w.text';

/** Which writing task was chosen (B2 offers two). */
export const WRITING_TASK_KEY = 'w.task';
