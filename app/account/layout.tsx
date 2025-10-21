import { FaSignOutAlt } from 'react-icons/fa';
import { signOut } from '../lib/actions';
import AccountNav from '../components/AccountNav';
import { ReactNode } from 'react';

type PropTypes = {
  children: ReactNode;
};

export default function AccountLayout({ children }: PropTypes) {
  return (
    <div className="grid grid-cols-4 min-h-[calc(100vh-320px)] mt-8">
      <nav className="h-full">
        <ul className="h-full border-r-2 border-gray-600 flex flex-col justify-between p-4 text-gray-600">
          <AccountNav />
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
