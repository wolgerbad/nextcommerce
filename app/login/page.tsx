import { headers } from 'next/headers';
import { auth } from '../lib/auth';
import LoginClient from './LoginClient';
import { redirect } from 'next/navigation';

export default async function loginPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log('session for login:', session);
  if (session?.user) redirect('/account');

  return <LoginClient session={session} />;
}
