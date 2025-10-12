'use client';

import Link from 'next/link';
import { useCommerce } from '../lib/context/CommerceContext';

export default function CartClient() {
  const { cart } = useCommerce();
  const totalCartVal = cart.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  );

  const totalCart = totalCartVal.toFixed(2);

  const cargoFee = 59.99;

  console.log(totalCart);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3 p-4 flex flex-col gap-4">
        {cart.map((cartItem) => {
          const totalPrice = (cartItem.quantity * cartItem.price).toFixed(2);
          return (
            <div
              key={cartItem.id}
              className="grid grid-cols-7 px-4 py-2 border-2 border-gray-300 gap-4"
            >
              <img
                className="h-36 col-start-1 col-span-1"
                src={cartItem.image}
              />
              <div className="col-start-2 col-span-2">
                <p>{cartItem.title}</p>
                <p>{cartItem.author}</p>
              </div>
              <div className="col-start-4 col-span-1">
                <p>Adet</p>
                <button>-</button>
                <span>{cartItem.quantity}</span>
                <button>+</button>
              </div>
              <div className="col-start-5 col-span-1">
                <p>Fiyat</p>
                <p>{cartItem.price}</p>
              </div>
              <div className="col-start-6 col-span-1">
                <p>Toplam</p>
                <p>{totalPrice} TL</p>
              </div>
              <button className="col-start-7 col-span-1 h-fit">delete</button>
            </div>
          );
        })}
      </div>
      <div className="col-span-1 flex flex-col gap-4">
        <Link
          href="/"
          className="text-purple-800 font-semibold border-2 border-purple-800 rounded-md block py-2 px-4 text-center"
        >
          Alışverişe Devam Et
        </Link>
        <div className="border-2 border-gray-300 rounded-md flex flex-col gap-2 py-2 px-4">
          <span className="flex justify-between font-bold">
            <p>Sepet Toplamı</p>
            <p>{totalCart} TL</p>
          </span>
          <span className="flex justify-between">
            <p>Kargo Ücreti</p>
            <p>{cargoFee} TL</p>
          </span>
          <span className="flex justify-between font-semibold">
            <p>Genel Toplam</p>
            <p>{+totalCart + cargoFee} TL</p>
          </span>
        </div>
        <Link
          href="/checkout"
          className="text-white bg-orange-500 font-semibold rounded-md block py-2 px-4 text-center"
        >
          Satın al
        </Link>
        <button className="border-2 border-gray-300 px-4 py-2 rounded-md">
          Kupon Kodu Ekle
        </button>
      </div>
    </div>
  );
}
