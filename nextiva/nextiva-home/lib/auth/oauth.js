/* "Sign in with Google / Microsoft" — OAuth 2.0 authorization-code flow with
   PKCE and a state check. Server-only.

   Each provider needs its own app credentials in the environment:
     GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
     MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET  (MICROSOFT_TENANT optional, default "common")
   and this redirect URI registered with the provider:
     <site origin>/api/auth/oauth/<provider>/callback
   Without credentials the button still shows; the start route sends the
   visitor back with a friendly "not available yet" message. */
import { createHash, randomBytes } from 'crypto';

const tenant = process.env.MICROSOFT_TENANT || 'common';

export const PROVIDERS = {
  google: {
    label: 'Google',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scope: 'openid email profile',
    extra: { prompt: 'select_account' },
  },
  microsoft: {
    label: 'Microsoft',
    clientId: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    authUrl: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`,
    tokenUrl: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`,
    scope: 'openid email profile',
    extra: { prompt: 'select_account' },
  },
};

export const isConfigured = (p) => Boolean(p?.clientId && p?.clientSecret);

const b64url = (buf) => Buffer.from(buf).toString('base64url');

export function newPkce() {
  const verifier = b64url(randomBytes(32));
  const challenge = b64url(createHash('sha256').update(verifier).digest());
  return { verifier, challenge, state: b64url(randomBytes(16)) };
}

export function redirectUri(origin, id) {
  return `${origin}/api/auth/oauth/${id}/callback`;
}

/** The public origin of this request (respects proxies like Vercel). */
export function originOf(request) {
  const url = new URL(request.url);
  const proto = request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || url.host;
  return `${proto}://${host}`;
}

export function authorizeUrl(p, id, origin, { challenge, state }) {
  const u = new URL(p.authUrl);
  u.search = new URLSearchParams({
    client_id: p.clientId,
    redirect_uri: redirectUri(origin, id),
    response_type: 'code',
    scope: p.scope,
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    ...p.extra,
  }).toString();
  return u.toString();
}

/** Exchanges the code and returns { email, first, last } from the ID token. */
export async function fetchProfile(p, id, origin, code, verifier) {
  const res = await fetch(p.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: p.clientId,
      client_secret: p.clientSecret,
      code,
      code_verifier: verifier,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri(origin, id),
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`token exchange failed (${res.status})`);
  const tokens = await res.json();
  if (!tokens.id_token) throw new Error('no id_token');
  // The ID token came straight from the provider's token endpoint over TLS,
  // so its claims can be read without re-verifying the signature.
  const claims = JSON.parse(Buffer.from(tokens.id_token.split('.')[1], 'base64url').toString('utf8'));
  const email = String(claims.email || claims.preferred_username || '').trim().toLowerCase();
  if (!email || !email.includes('@')) throw new Error('no email on account');
  if (id === 'google' && claims.email_verified === false) throw new Error('email not verified');
  const [first = '', ...rest] = String(claims.given_name || claims.name || '').split(' ');
  return {
    email,
    first: claims.given_name || first || email.split('@')[0],
    last: claims.family_name || rest.join(' ') || '',
  };
}
