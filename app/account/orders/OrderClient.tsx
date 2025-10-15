'use client';

import { deletePurchase } from '@/app/lib/actions';
import { format } from 'date-fns';
import { IoMdCloseCircle } from 'react-icons/io';

export default function OrderClient({ orders }) {
  return (
    <div className="rounded-xl border border-gray-200 shadow-sm w-full">
      <table className="min-w-full divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Sipariş Kodu
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Tarih
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Sipariş Durumu
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Fiyat
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Ürünler
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Sil
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => {
            const formattedDate = format(order.createdAt, 'MM/dd/yyyy');
            return (
              <tr>
                <td className="px-4 py-2">#{order.id}</td>
                <td className="px-4 py-2">{formattedDate}</td>
                <td className="px-4 py-2">Onaylandı</td>
                <td className="px-4 py-2">{order.total_price} TL</td>
                <td className="px-4 py-2 flex w-32">
                  {order.purchase_items.map((item) => (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="overflow-hidden"
                    />
                  ))}
                </td>
                <td className="px-4 py-2">
                  {' '}
                  <button
                    className="cursor-pointer"
                    onClick={async () =>
                      deletePurchase(order.id, order.user_id)
                    }
                  >
                    <IoMdCloseCircle className="text-2xl text-red-800" />{' '}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
