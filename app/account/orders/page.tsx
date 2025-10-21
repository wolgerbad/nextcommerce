import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import OrderClient from './OrderClient';
import { redirect } from 'next/navigation';
import { baseUrl } from '@/app/lib/baseUrl';

export default async function OrdersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) redirect('/login');

  const res = await fetch(`${baseUrl}/api/purchase/${userId}`);

  const orders = await res?.json();

  if (orders?.error) return <p>You have no order to look at.</p>;

  return <OrderClient orders={orders} />;
}
