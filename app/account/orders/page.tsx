import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import OrderClient from './OrderClient';
import { redirect } from 'next/navigation';

export default async function ordersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  const res = await fetch(
    `${process.env.NEXT_BASE_URL}/api/purchase/${userId}`
  );

  const orders = await res?.json();

  if (orders?.error) return <p>You have no orders to look at...</p>;

  if (!session?.user) redirect('/login');

  return <OrderClient orders={orders} />;
}
