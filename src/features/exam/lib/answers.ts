import { type AnswerMap } from '@shared/types';

/**
 * The answer map is deliberately stringly-keyed and loosely typed because it is persisted
 * and must stay readable by older and newer versions of the app. These accessors narrow a
 * stored value to what a given input actually expects, so components never cast.
 */
export function numberAnswer(answers: AnswerMap, key: string): number | undefined {
  const value = answers[key];
  return typeof value === 'number' ? value : undefined;
}

export function booleanAnswer(answers: AnswerMap, key: string): boolean | undefined {
  const value = answers[key];
  return typeof value === 'boolean' ? value : undefined;
}

export function textAnswer(answers: AnswerMap, key: string): string {
  const value = answers[key];
  return typeof value === 'string' ? value : '';
}

/** Item key builder, so key formats live in one place. */
export function itemKey(prefix: string, index: number): string {
  return `${prefix}${String(index)}`;
}

/** The single key holding the Schreiben text. */
export const WRITING_ANSWER_KEY = 'w.text';
