import { auth } from '../lib/auth';
import { headers } from 'next/headers';
import AccountClient from './AccountClient';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const username = session?.user.name;

  if (!session?.user) redirect('/login');

  return <AccountClient username={username} />;
}
