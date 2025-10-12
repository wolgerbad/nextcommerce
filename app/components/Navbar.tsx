'use client';

import Link from 'next/link';
import { LuShoppingBasket } from 'react-icons/lu';
import { MdAccountCircle } from 'react-icons/md';
import { useCommerce } from '../lib/context/CommerceContext';

export default function Navbar({ session }) {
  const { cart } = useCommerce();

  const numCart = cart.length;

  return (
    <nav className="flex justify-between items-center border-b-2 border-gray-200 py-4">
      <h2 className="bg-purple-800 text-white px-8 py-4 font-semibold tracking-wider rounded-sm">
        kitapsepeti
      </h2>
      <div>
        <input type="text" className="border-2 bor  der-black px-6 py-2 h-10" />
        <button className="bg-purple-800 text-white px-6 py-2 h-10">ARA</button>
      </div>
      <div className="flex gap-2 text-white">
        {session?.user ? (
          <Link
            href="/account"
            className="bg-purple-800 px-2 py-1 rounded-sm flex items-center gap-1 text-sm"
          >
            <MdAccountCircle />
            My account
          </Link>
        ) : (
          <Link
            href="/login"
            className="bg-purple-800 px-2 py-1 rounded-sm flex items-center gap-1 text-sm"
          >
            <MdAccountCircle className="text-orange-600 text-xl" />
            Giriş Yap / Kayıt Ol
          </Link>
        )}
        <Link
          href="/cart"
          className="bg-orange-600 px-2 py-1 rounded-sm flex items-center gap-1 relative"
        >
          <span className="absolute -top-3 -right-3 bg-red-800 px-2 font-semibold rounded-full">
            {numCart}
          </span>
          <LuShoppingBasket />
          Sepetim
        </Link>
      </div>
    </nav>
  );
}
