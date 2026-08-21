import { afterEach, describe, expect, it, vi } from 'vitest';

import { checkText } from '@shared/lib/languageToolClient.ts';

const respond = (body: unknown, status = 200): void => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve(new Response(JSON.stringify(body), { status })))
  );
};

/*
 * The feature switch (`VITE_DYNAMIC_FEEDBACK`) and the base URL (`VITE_LANGUAGETOOL_URL`)
 * are independent: a build can resolve a base (the same-origin proxy always does) while
 * the feature stays off. Every test below stubs both explicitly rather than relying on
 * whatever the previous test left behind, since `vi.stubEnv` is not reset between tests
 * in this file (only `vi.unstubAllGlobals()` runs in `afterEach`).
 */
const enableDynamicFeedback = (base = 'https://lt.example.test'): void => {
  vi.stubEnv('VITE_DYNAMIC_FEEDBACK', 'true');
  vi.stubEnv('VITE_LANGUAGETOOL_URL', base);
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('checkText', () => {
  it('reports not-configured when the feature switch is off, without calling fetch', async () => {
    const spy = vi.fn();
    vi.stubGlobal('fetch', spy);
    vi.stubEnv('VITE_DYNAMIC_FEEDBACK', '');
    vi.stubEnv('VITE_LANGUAGETOOL_URL', '');
    await expect(checkText('Ich habe ein Hund.')).resolves.toEqual({
      kind: 'unavailable',
      reason: 'not-configured'
    });
    expect(spy).not.toHaveBeenCalled();
  });

  it('returns matches on success', async () => {
    enableDynamicFeedback();
    respond({
      matches: [
        {
          message: 'Möglicher Grammatikfehler',
          shortMessage: 'Grammatik',
          offset: 9,
          length: 8,
          replacements: [{ value: 'einen Hund' }],
          rule: { id: 'DE_AGREEMENT', issueType: 'grammar', category: { id: 'GRAMMAR', name: 'Grammatik' } }
        }
      ]
    });
    const result = await checkText('Ich habe ein Hund.');
    expect(result.kind).toBe('ok');
    expect(result.kind === 'ok' && result.matches[0]?.rule.category.id).toBe('GRAMMAR');
  });

  it('maps 429 to rate-limited and 413 to too-long rather than throwing', async () => {
    enableDynamicFeedback();
    respond({}, 429);
    expect(await checkText('x')).toEqual({ kind: 'unavailable', reason: 'rate-limited' });
    respond({}, 413);
    expect(await checkText('x')).toEqual({ kind: 'unavailable', reason: 'too-long' });
  });

  it('maps any other non-2xx status to error rather than throwing', async () => {
    enableDynamicFeedback();
    respond({}, 500);
    expect(await checkText('x')).toEqual({ kind: 'unavailable', reason: 'error' });
  });

  it('reports offline rather than rejecting when fetch throws', async () => {
    enableDynamicFeedback();
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new TypeError('Failed to fetch')))
    );
    expect(await checkText('x')).toEqual({ kind: 'unavailable', reason: 'offline' });
  });

  it('serves a repeated identical check from cache, hitting the network once', async () => {
    enableDynamicFeedback();
    const spy = vi.fn(() => Promise.resolve(new Response(JSON.stringify({ matches: [] }), { status: 200 })));
    vi.stubGlobal('fetch', spy);
    await checkText('Guten Tag, wie geht es Ihnen?');
    await checkText('Guten Tag, wie geht es Ihnen?');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('calls the public API directly when no self-hosted override is set', async () => {
    vi.stubEnv('VITE_DYNAMIC_FEEDBACK', 'true');
    vi.stubEnv('VITE_LANGUAGETOOL_URL', '');
    const spy = vi.fn(() => Promise.resolve(new Response(JSON.stringify({ matches: [] }), { status: 200 })));
    vi.stubGlobal('fetch', spy);
    await checkText('Ein anderer Satz zur Kontrolle.');
    expect(spy).toHaveBeenCalledWith('https://api.languagetool.org/v2/check', expect.anything());
  });
});
