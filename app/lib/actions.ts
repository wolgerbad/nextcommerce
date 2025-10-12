'use server';

import { headers } from 'next/headers';
import { auth } from './auth';
import { revalidatePath } from 'next/cache';

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
    return result;
  } catch (error) {
    console.error(error.message);
  }

  revalidatePath('/login');
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
    return result;
  } catch (error) {
    console.error(error.message);
  }

  revalidatePath('/login');
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
}
