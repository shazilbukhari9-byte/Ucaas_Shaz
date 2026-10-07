import { redirect } from 'next/navigation';
import AuthPage from '../../components/auth/AuthPage';
import { currentUser } from '../../lib/auth/session';

export const metadata = {
  title: 'Start your free trial | UCaaS',
  description: 'Create your UCaaS account — business phone, AI receptionist and team messaging, live in minutes.',
};

// Already signed in? Go straight to the account.
export default async function SignUp() {
  if (await currentUser()) redirect('/account');
  return <AuthPage mode="sign-up" />;
}
