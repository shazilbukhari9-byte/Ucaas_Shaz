/* Session cookie helpers and shared validation for the auth routes.
   Server-only. */
import { cookies } from 'next/headers';
import { readSession, signSession } from './crypto';
import { getUser } from './store';

export const COOKIE = 'ucaas_session';
const DAY = 24 * 60 * 60;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const normEmail = (e) => String(e || '').trim().toLowerCase();

/** The public shape of a user — never includes the password hash. */
export const publicUser = (u) => u && ({
  first: u.first, last: u.last, email: u.email, company: u.company, createdAt: u.createdAt, lastLoginAt: u.lastLoginAt, providers: u.providers || [],
});

/** [name, value, options] for the session cookie — usable with cookies().set
    or directly on a NextResponse (e.g. an OAuth redirect). */
export function sessionCookie(email, remember = true) {
  const maxAge = remember ? 30 * DAY : DAY;
  const token = signSession({ email, exp: Date.now() + maxAge * 1000 });
  return [COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    // "Keep me signed in" off → a browser-session cookie.
    ...(remember ? { maxAge } : {}),
  }];
}

export async function startSession(email, remember = true) {
  const store = await cookies();
  store.set(...sessionCookie(email, remember));
}

export async function endSession() {
  const store = await cookies();
  store.delete(COOKIE);
}

/** The signed-in user (public fields), or null. */
export async function currentUser() {
  const store = await cookies();
  const data = readSession(store.get(COOKIE)?.value);
  if (!data?.email) return null;
  const user = await getUser(data.email);
  return publicUser(user);
}

/* Small in-memory limiter for sign-in attempts (per IP + email). Good enough
   to slow down guessing on a single instance; use a shared store for more. */
const attempts = new Map();
export function tooManyAttempts(id, limit = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const rec = attempts.get(id);
  if (!rec || now - rec.start > windowMs) {
    attempts.set(id, { start: now, n: 1 });
    return false;
  }
  rec.n += 1;
  return rec.n > limit;
}
export const clearAttempts = (id) => attempts.delete(id);

export const json = (data, status = 200) =>
  Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
