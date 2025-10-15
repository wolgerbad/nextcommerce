'use client';

import Link from 'next/link';
import { TiTickOutline } from 'react-icons/ti';

export default function SuccessClient() {
  return (
    <div className="flex justify-center mt-16 rounded-md">
      <div className="flex flex-col items-center gap-4 bg-gray-100 p-20">
        <TiTickOutline className="border-4 text-orange-500 border-orange-500 text-6xl rounded-full" />
        <h1 className="text-xl font-bold">Siparişiniz Onaylandı!</h1>
        <p className="font-thin">
          Sipariş Başarılı! Bizi tercih ettiğiniz için teşekkür ederiz.
        </p>
        <Link
          href="/account/orders"
          className="bg-orange-500  hover:bg-orange-600 text-white px-8 py-3 font-semibold uppercase rounded-md"
        >
          SİPARİŞE GİT
        </Link>
      </div>
    </div>
  );
}
