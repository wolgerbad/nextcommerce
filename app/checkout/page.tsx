import { headers } from 'next/headers';
import { auth } from '../lib/auth';
import CheckoutClient from './CheckoutClient';

export default async function checkoutPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;
  const user = session?.user;
  const res = await fetch(`${process.env.NEXT_BASE_URL}/api/user/${userId}`);
  const dataWhole = await res.json();
  const data = dataWhole[0];
  const address = data?.address;

  return <CheckoutClient userId={userId} user={user} address={address} />;
}
