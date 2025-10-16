'use client';

import { PurchaseItem } from '@/app/checkout/CheckoutClient';
import { deletePurchase } from '@/app/lib/actions';
import { format } from 'date-fns';
import { useOptimistic } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

type OrderType = {
  id: number;
  address: string;
  total_price: number;
  user_id: string;
  discount?: number;
  email: string;
  phone: string;
  purchase_items: PurchaseItem[];
  createdAt: Date;
};

export default function OrderClient({ orders }: { orders: OrderType[] }) {
  const [optimisticOrders, deleteOptimisticOrder] = useOptimistic(
    orders,
    (state, id) => state.filter((order) => order.id !== id)
  );

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm w-full">
      <table className="min-w-full divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Order
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Date
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Status
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Price
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Products
            </th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {optimisticOrders.map((order) => {
            const formattedDate = format(order.createdAt, 'MM/dd/yyyy');
            return (
              <tr key={order.id}>
                <td className="px-4 py-2">#{order.id}</td>
                <td className="px-4 py-2">{formattedDate}</td>
                <td className="px-4 py-2">Confirmed</td>
                <td className="px-4 py-2">₺{order.total_price}</td>
                <td className="px-4 py-2 flex w-32">
                  {order.purchase_items.map((item) => (
                    <div key={item.image} className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="overflow-hidden"
                      />
                      <p className="absolute -top-2 -right-2  bg-red-800 px-1 z-40 py-0.5  text-white font-semibold rounded-full">
                        *{item.quantity}
                      </p>
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">
                  {' '}
                  <button
                    className="cursor-pointer"
                    onClick={async () => {
                      deleteOptimisticOrder(order.id);
                      await deletePurchase(order.id, order.user_id);
                    }}
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
