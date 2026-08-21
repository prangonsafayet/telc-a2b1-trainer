import { type AnswerMap } from '@shared/types';

/**
 * The flat, stringly-keyed answer scheme every trainer shares. It is persisted and must
 * stay readable by older and newer versions of the app — do not change the key format.
 * These accessors narrow a stored value to what a given input expects, so components
 * never cast.
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
