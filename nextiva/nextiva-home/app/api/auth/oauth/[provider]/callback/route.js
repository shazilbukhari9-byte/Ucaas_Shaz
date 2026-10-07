// OAuth callback: checks state, exchanges the code (PKCE), then finds or
// creates the account for that email and signs the visitor in.
import { NextResponse } from 'next/server';
import { PROVIDERS, isConfigured, fetchProfile, originOf } from '../../../../../../lib/auth/oauth';
import { getUser, createUser, updateUser } from '../../../../../../lib/auth/store';
import { sessionCookie } from '../../../../../../lib/auth/session';

export async function GET(request, { params }) {
  const { provider } = await params;
  const p = PROVIDERS[provider];
  const origin = originOf(request);
  const url = new URL(request.url);

  let saved = null;
  try {
    saved = JSON.parse(request.cookies.get('ucaas_oauth')?.value || 'null');
  } catch {}
  const from = saved?.from || '/sign-in';
  const fail = (code) => {
    const res = NextResponse.redirect(`${origin}${from}?error=${code}&provider=${provider}`);
    res.cookies.delete({ name: 'ucaas_oauth', path: '/api/auth/oauth' });
    return res;
  };

  if (!p || !isConfigured(p)) return fail('sso_unavailable');
  if (url.searchParams.get('error')) return fail('sso_cancelled');
  const code = url.searchParams.get('code');
  if (!code || !saved || saved.provider !== provider || saved.state !== url.searchParams.get('state')) {
    return fail('sso_failed');
  }

  let profile;
  try {
    profile = await fetchProfile(p, provider, origin, code, saved.verifier);
  } catch (e) {
    console.error(`[auth] ${provider} sign-in failed`, e);
    return fail('sso_failed');
  }

  try {
    const now = new Date().toISOString();
    const existing = await getUser(profile.email);
    if (existing) {
      const providers = Array.from(new Set([...(existing.providers || []), provider]));
      await updateUser(profile.email, { lastLoginAt: now, providers });
    } else {
      await createUser({
        first: profile.first, last: profile.last, email: profile.email, company: '',
        passwordHash: null, providers: [provider], createdAt: now, lastLoginAt: now,
      });
    }
  } catch (e) {
    console.error('[auth] could not save SSO user', e);
    return fail('sso_failed');
  }

  const res = NextResponse.redirect(`${origin}${saved.next || '/account'}`);
  res.cookies.set(...sessionCookie(profile.email, true));
  res.cookies.delete({ name: 'ucaas_oauth', path: '/api/auth/oauth' });
  return res;
}
