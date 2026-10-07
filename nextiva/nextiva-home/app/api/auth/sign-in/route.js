import { getUser, updateUser } from '../../../../lib/auth/store';
import { verifyPassword } from '../../../../lib/auth/crypto';
import {
  EMAIL_RE, normEmail, startSession, publicUser, json, tooManyAttempts, clearAttempts,
} from '../../../../lib/auth/session';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const email = normEmail(body.email);
  const password = String(body.password || '');
  const fields = {};
  if (!EMAIL_RE.test(email)) fields.email = 'Enter a valid work email.';
  if (!password) fields.password = 'Enter your password.';
  if (Object.keys(fields).length) return json({ error: 'Please fix the highlighted fields.', fields }, 422);

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
  const id = `${ip}|${email}`;
  if (tooManyAttempts(id)) {
    return json({ error: 'Too many attempts. Please wait a few minutes and try again.' }, 429);
  }

  let user;
  try {
    user = await getUser(email);
  } catch (e) {
    console.error('[auth] sign-in failed', e);
    return json({ error: 'We couldn’t sign you in right now. Please try again in a moment.' }, 500);
  }
  if (user && !user.passwordHash && user.providers?.length) {
    const via = user.providers.map((x) => (x === 'google' ? 'Google' : 'Microsoft')).join(' or ');
    return json({ error: `This account signs in with ${via}. Use the ${via} button above.` }, 401);
  }
  // Same message whether the email or the password is wrong.
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return json({ error: 'Incorrect email or password.' }, 401);
  }

  clearAttempts(id);
  const updated = (await updateUser(email, { lastLoginAt: new Date().toISOString() })) || user;
  await startSession(email, body.remember !== false);
  return json({ user: publicUser(updated) });
}
