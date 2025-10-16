import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 py-10 px-20 text-sm text-gray-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">About Us</h4>
          <p className="text-gray-600">
            Kitapsepeti: Discover millions of books at affordable prices.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Customer Service</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/yardim" className="hover:text-purple-800">
                Help
              </Link>
            </li>
            <li>
              <Link href="/iade" className="hover:text-purple-800">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/kargo" className="hover:text-purple-800">
                Shipping & Delivery
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Corporate</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/hakkimizda" className="hover:text-purple-800">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/kariyer" className="hover:text-purple-800">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-purple-800">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Newsletter</h4>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
            <button
              type="button"
              className="bg-purple-800 text-white px-4 py-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-gray-500">
        <p>© {new Date().getFullYear()} Kitapsepeti. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/gizlilik" className="hover:text-purple-800">
            Privacy
          </Link>
          <Link href="/kosullar" className="hover:text-purple-800">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
