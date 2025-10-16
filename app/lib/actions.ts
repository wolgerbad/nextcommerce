'use server';

import { headers } from 'next/headers';
import { auth } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PurchaseItem } from '../checkout/CheckoutClient';

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    revalidatePath('/login');

    return result;
  } catch (error: any) {
    return error.message;
  }
}

export async function signUp({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
      },
    });
    revalidatePath('/login');
    return result;
  } catch (error: any) {
    return error.message;
  }
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  revalidatePath('/account');
  redirect('/login');
}

export async function createPurchase({
  userId,
  address,
  totalPrice,
  discount = 0,
  email,
  phone,
  purchase_items,
}: {
  userId?: string;
  address: string;
  totalPrice: number;
  discount?: number;
  email: string;
  phone: string;
  purchase_items: PurchaseItem[];
}) {
  const res = await fetch(`${process.env.NEXT_BASE_URL}/api/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      address,
      discount,
      total_price: totalPrice,
      email,
      phone,
      purchase_items,
    }),
  });
  if (!res.ok) {
    throw new Error('Failed to create purchase');
  }

  revalidatePath('/account/orders');
  revalidatePath(`/api/purchase/${userId}`);
  return res.ok;
}

export async function deletePurchase(id: number, userId: string) {
  await fetch(`${process.env.NEXT_BASE_URL}/api/purchase?id=${id}`, {
    method: 'DELETE',
  });

  revalidatePath(`/api/purchase/${userId}`);
}

export async function updateUser({
  userId: id,
  address,
  nationalId,
}: {
  userId: string;
  address: string;
  nationalId: string;
}) {
  await fetch(`${process.env.NEXT_BASE_URL}/api/user/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, national_id: nationalId }),
  });
  revalidatePath(`/api/user/${id}`);
}
