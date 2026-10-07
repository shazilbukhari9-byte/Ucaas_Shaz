import { createUser } from '../../../../lib/auth/store';
import { hashPassword } from '../../../../lib/auth/crypto';
import { EMAIL_RE, normEmail, startSession, publicUser, json } from '../../../../lib/auth/session';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const first = String(body.first || '').trim();
  const last = String(body.last || '').trim();
  const email = normEmail(body.email);
  const company = String(body.company || '').trim();
  const password = String(body.password || '');

  const fields = {};
  if (!first) fields.first = 'Required.';
  else if (first.length > 60) fields.first = 'Too long.';
  if (!last) fields.last = 'Required.';
  else if (last.length > 60) fields.last = 'Too long.';
  if (!EMAIL_RE.test(email) || email.length > 254) fields.email = 'Enter a valid work email.';
  if (!company) fields.company = 'Enter your company name.';
  else if (company.length > 100) fields.company = 'Too long.';
  if (password.length < 8) fields.password = 'Use at least 8 characters.';
  else if (password.length > 128) fields.password = 'Use 128 characters or fewer.';
  if (!body.terms) fields.terms = 'Please accept the terms to continue.';
  if (Object.keys(fields).length) return json({ error: 'Please fix the highlighted fields.', fields }, 422);

  const now = new Date().toISOString();
  const user = { first, last, email, company, passwordHash: await hashPassword(password), createdAt: now, lastLoginAt: now };

  let created;
  try {
    created = await createUser(user);
  } catch (e) {
    console.error('[auth] sign-up failed', e);
    return json({ error: 'We couldn’t create your account right now. Please try again in a moment.' }, 500);
  }
  if (!created) {
    return json({ error: 'An account with this email already exists.', fields: { email: 'This email is already registered — sign in instead.' } }, 409);
  }

  await startSession(email, true);
  return json({ user: publicUser(user) }, 201);
}
