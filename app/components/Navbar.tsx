'use client';

import Link from 'next/link';
import { LuShoppingBasket } from 'react-icons/lu';
import { MdAccountCircle } from 'react-icons/md';
import { useCommerce } from '../lib/context/CommerceContext';

export type SessionType = {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined | undefined;
    userAgent?: string | null | undefined | undefined;
  };
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined | undefined;
  };
} | null;

export default function Navbar({ session }: { session: SessionType }) {
  const { cart } = useCommerce();

  const numCart = cart.length;

  return (
    <nav className="flex justify-between items-center border-b-2 border-gray-200 py-4">
      <Link
        href="/"
        className=" text-purple-800 text-xl px-8 py-4 font-semibold tracking-wider rounded-sm"
      >
        kitapsepeti
      </Link>

      <div className="flex gap-2 text-white">
        {session?.user ? (
          <Link
            href="/account"
            className="bg-purple-800 px-4 py-2 rounded-sm flex items-center gap-1 font-semibold hover:bg-purple-900"
          >
            <MdAccountCircle className="text-xl" />
            My account
          </Link>
        ) : (
          <Link
            href="/login"
            className="bg-purple-800 px-4 py-2 rounded-sm flex items-center gap-1 font-semibold"
          >
            <MdAccountCircle className="text-orange-600 text-xl" />
            Log in / Sign up
          </Link>
        )}
        <Link
          href="/cart"
          className="bg-orange-600 hover:bg-orange-700 px-2 py-1 rounded-sm flex items-center gap-1 relative font-semibold"
        >
          <span className="absolute -top-3 -right-3 bg-red-800 px-2 font-semibold rounded-full">
            {numCart}
          </span>
          <LuShoppingBasket className="text-xl" />
          Cart
        </Link>
      </div>
    </nav>
  );
}
