import { redirect } from 'next/navigation';
import { currentUser } from '../../lib/auth/session';
import AccountView from '../../components/auth/AccountView';

export const metadata = {
  title: 'Your account | UCaaS',
  robots: { index: false },
};

export default async function AccountPage({ searchParams }) {
  const user = await currentUser();
  if (!user) redirect('/sign-in?next=/account');
  const sp = await searchParams;
  return <AccountView user={user} welcome={sp?.welcome === '1'} />;
}
