/* Supabase hides "this email already exists" behind a generic success response, so the
   only signal is an empty `identities` array. Both bugs this guards against were live:
   an existing user being told to check an inbox nothing was sent to, and an unconfirmed
   user re-signing-up and never getting another email. */
import { interpretSignUp, isRateLimited, retryAfterSeconds } from '../src/features/auth/lib/signUpOutcome.ts';

const checks = [];
const check = (name, cond, extra = '') => {
  checks.push(cond);
  console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${name}${!cond && extra ? ' — ' + extra : ''}`);
};

const user = identities => ({ id: 'u1', identities });

/* --- brand new account, confirmation required --- */
let outcome = interpretSignUp({ user: user([{ provider: 'email' }]), session: null }, null);
check('new signup awaiting confirmation', outcome.kind === 'confirmation-sent', outcome.kind);

/* --- brand new account, confirmation disabled on the project --- */
outcome = interpretSignUp({ user: user([{ provider: 'email' }]), session: { access_token: 'x' } }, null);
check('new signup with a session is signed in', outcome.kind === 'signed-in', outcome.kind);

/* --- THE BUG: existing confirmed account, obfuscated as a success --- */
outcome = interpretSignUp({ user: user([]), session: null }, null);
check('empty identities means already registered', outcome.kind === 'already-registered', outcome.kind);

/* --- older/undefined identities field must not be read as "already registered" --- */
outcome = interpretSignUp({ user: { id: 'u1' }, session: null }, null);
check(
  'missing identities is treated as already registered',
  outcome.kind === 'already-registered',
  outcome.kind
);

/* --- obfuscation off: Supabase returns an explicit error instead --- */
outcome = interpretSignUp(null, { message: 'User already registered' });
check('explicit "already registered" error', outcome.kind === 'already-registered', outcome.kind);
outcome = interpretSignUp(null, { message: 'user_already_exists' });
check('the error-code variant is recognised', outcome.kind === 'already-registered', outcome.kind);

/* --- genuine failures stay failures, with their message --- */
outcome = interpretSignUp(null, { message: 'Password should be at least 6 characters' });
check('other errors surface as failures', outcome.kind === 'failed', outcome.kind);
check('failure keeps the original message', outcome.kind === 'failed' && /at least 6/.test(outcome.message));

outcome = interpretSignUp({ user: null, session: null }, null);
check('no user and no error is a failure, not a success', outcome.kind === 'failed', outcome.kind);

/* --- resend rate limiting must be recognisable, or it reads as "email never arrived" --- */
check(
  'rate limit detected',
  isRateLimited('For security purposes, you can only request this after 51 seconds.')
);
check('rate limit detected (generic)', isRateLimited('email rate limit exceeded'));
check('unrelated errors are not rate limits', !isRateLimited('Invalid login credentials'));
check('retry delay is extracted', retryAfterSeconds('you can only request this after 51 seconds.') === 51);
check('no delay when none is named', retryAfterSeconds('email rate limit exceeded') === null);

const failed = checks.filter(c => !c).length;
console.log(
  failed
    ? `\nSIGN-UP OUTCOME FAILED (${failed}/${checks.length})`
    : `\nSIGN-UP OUTCOME PASSED (${checks.length}/${checks.length})`
);
process.exit(failed ? 1 : 0);
