'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome } from 'react-icons/fa';
import { FaBasketShopping } from 'react-icons/fa6';
import { MdOutlineAccountCircle } from 'react-icons/md';

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-4">
      <Link
        href="/account"
        className={`flex ${
          pathname === '/account' ? 'bg-purple-300' : ''
        } items-center gap-2 text-xl hover:bg-purple-300 px-2 py-1 cursor-pointer rounded-sm transition-all ease-in`}
      >
        <FaHome /> Home
      </Link>
      <Link
        href="/account/orders"
        className={`flex ${
          pathname === '/account/orders' ? 'bg-purple-300' : ''
        } items-center gap-2 text-xl hover:bg-purple-300 px-2 py-1 cursor-pointer rounded-sm transition-all ease-in`}
      >
        <FaBasketShopping /> Orders
      </Link>
      <Link
        href="/account/profile"
        className={`flex ${
          pathname === '/account/profile' ? 'bg-purple-300' : ''
        } items-center gap-2 text-xl hover:bg-purple-300 px-2 py-1 cursor-pointer rounded-sm transition-all ease-in`}
      >
        <MdOutlineAccountCircle /> Guest profile
      </Link>
    </nav>
  );
}
