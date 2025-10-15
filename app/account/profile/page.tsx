import { auth } from '@/app/lib/auth';
import ProfileClient from './ProfileClient';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function profilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;
  const res = await fetch(`${process.env.NEXT_BASE_URL}/api/user/${userId}`);
  const userData = await res.json();
  const user = userData[0];

  if (!user) redirect('/login');

  return <ProfileClient userId={userId} user={user} />;
}
