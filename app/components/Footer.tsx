import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 py-10 px-20 text-sm text-gray-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Hakkımızda</h4>
          <p className="text-gray-600">
            Kitapsepeti: Milyonlarca kitabı uygun fiyatlarla keşfedin.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">
            Müşteri Hizmetleri
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/yardim" className="hover:text-purple-800">
                Yardım
              </Link>
            </li>
            <li>
              <Link href="/iade" className="hover:text-purple-800">
                İade ve Değişim
              </Link>
            </li>
            <li>
              <Link href="/kargo" className="hover:text-purple-800">
                Kargo ve Teslimat
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Kurumsal</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/hakkimizda" className="hover:text-purple-800">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/kariyer" className="hover:text-purple-800">
                Kariyer
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-purple-800">
                İletişim
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Bülten</h4>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
            <button
              type="button"
              className="bg-purple-800 text-white px-4 py-2 rounded"
            >
              Abone Ol
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-gray-500">
        <p>© {new Date().getFullYear()} Kitapsepeti. Tüm hakları saklıdır.</p>
        <div className="flex gap-4">
          <Link href="/gizlilik" className="hover:text-purple-800">
            Gizlilik
          </Link>
          <Link href="/kosullar" className="hover:text-purple-800">
            Koşullar
          </Link>
        </div>
      </div>
    </footer>
  );
}
