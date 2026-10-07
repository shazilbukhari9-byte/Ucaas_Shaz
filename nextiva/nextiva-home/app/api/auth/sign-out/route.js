import { endSession, json } from '../../../../lib/auth/session';

export async function POST() {
  await endSession();
  return json({ ok: true });
}
