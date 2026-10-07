import { currentUser, json } from '../../../../lib/auth/session';

export async function GET() {
  const user = await currentUser();
  return user ? json({ user }) : json({ user: null }, 401);
}
