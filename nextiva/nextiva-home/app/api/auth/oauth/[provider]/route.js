// Starts "Sign in with Google / Microsoft": stores PKCE + state in a short-
// lived cookie and redirects to the provider.
import { NextResponse } from 'next/server';
import { PROVIDERS, isConfigured, newPkce, authorizeUrl, originOf } from '../../../../../lib/auth/oauth';

const safeNext = (n) => (n && n.startsWith('/') && !n.startsWith('//') ? n : '/account');

export async function GET(request, { params }) {
  const { provider } = await params;
  const p = PROVIDERS[provider];
  const origin = originOf(request);
  const url = new URL(request.url);
  const from = url.searchParams.get('from') === 'sign-up' ? '/sign-up' : '/sign-in';

  if (!p) return NextResponse.redirect(`${origin}${from}?error=sso_failed`);
  if (!isConfigured(p)) return NextResponse.redirect(`${origin}${from}?error=sso_unavailable&provider=${provider}`);

  const pkce = newPkce();
  const res = NextResponse.redirect(authorizeUrl(p, provider, origin, pkce));
  res.cookies.set('ucaas_oauth', JSON.stringify({
    provider, state: pkce.state, verifier: pkce.verifier, next: safeNext(url.searchParams.get('next')), from,
  }), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/api/auth/oauth',
    maxAge: 10 * 60,
  });
  return res;
}
