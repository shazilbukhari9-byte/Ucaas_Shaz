import { redirect } from 'next/navigation';
import AuthPage from '../../components/auth/AuthPage';
import { currentUser } from '../../lib/auth/session';

export const metadata = {
  title: 'Sign in | UCaaS',
  description: 'Sign in to manage your UCaaS numbers, calls and team.',
};

// Already signed in? Go straight to the account.
export default async function SignIn() {
  if (await currentUser()) redirect('/account');
  return <AuthPage mode="sign-in" />;
}
