import Link from 'next/link';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { FaBasketShopping } from 'react-icons/fa6';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { signOut } from '../lib/actions';

export default function accountLayout({ children }) {
  return (
    <div className="grid grid-cols-4 min-h-[calc(100vh-320px)] mt-8">
      <nav className="h-full">
        <ul className="h-full border-r-2 border-gray-600 flex flex-col justify-between p-4 text-gray-600">
          <div className="flex flex-col gap-4">
            <Link
              href="/account"
              className="flex items-center gap-2 text-xl hover:bg-purple-300 px-2 py-1 cursor-pointer rounded-sm transition-all ease-in"
            >
              <FaHome /> Home
            </Link>
            <Link
              href="/account/orders"
              className="flex items-center gap-2 text-xl hover:bg-purple-300 px-2 py-1 cursor-pointer rounded-sm transition-all ease-in"
            >
              <FaBasketShopping /> Siparişlerim
            </Link>
            <Link
              href="/account/profile"
              className="flex items-center gap-2 text-xl hover:bg-purple-300 px-2 py-1 cursor-pointer rounded-sm transition-all ease-in"
            >
              <MdOutlineAccountCircle /> Guest profile
            </Link>
          </div>
          <form action={signOut}>
            <button className="flex w-full items-center gap-2 text-xl hover:bg-purple-300 px-2 py-1 cursor-pointer rounded-sm transition-all ease-in">
              <FaSignOutAlt /> Sign out
            </button>
          </form>
        </ul>
      </nav>
      <div className="col-span-3 p-4">{children}</div>
    </div>
  );
}
