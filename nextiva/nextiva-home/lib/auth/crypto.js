/* Password hashing (scrypt) and signed session tokens (HMAC-SHA256).
   Server-only. */
import { randomBytes, scrypt as scryptCb, timingSafeEqual, createHmac } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scryptCb);
const KEYLEN = 64;

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, KEYLEN);
  return `scrypt$${salt}$${hash.toString('hex')}`;
}

export async function verifyPassword(password, stored) {
  const [scheme, salt, hex] = String(stored || '').split('$');
  if (scheme !== 'scrypt' || !salt || !hex) return false;
  const expected = Buffer.from(hex, 'hex');
  const actual = await scrypt(password, salt, expected.length);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

/* Session secret: AUTH_SECRET. Without it, development uses a stable
   machine-local value so local sign-in works with no setup (route handlers
   and pages may load this module separately, so it can't be random). In
   production a missing secret falls back to a random per-instance key —
   secure, but sessions won't survive a restart — and a warning is logged. */
let fallback;
function secret() {
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET;
  if (process.env.NODE_ENV !== 'production') {
    return createHmac('sha256', 'ucaas-dev-session').update(process.cwd()).digest('hex');
  }
  if (!fallback) {
    console.warn('[auth] AUTH_SECRET is not set — sessions will not survive a restart. Set AUTH_SECRET.');
    fallback = randomBytes(32).toString('hex');
  }
  return fallback;
}

const b64 = (buf) => Buffer.from(buf).toString('base64url');

export function signSession(payload) {
  const body = b64(JSON.stringify(payload));
  const sig = createHmac('sha256', secret()).update(body).digest('base64url');
  return `${body}.${sig}`;
}

export function readSession(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const expected = createHmac('sha256', secret()).update(body).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!data.exp || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}
