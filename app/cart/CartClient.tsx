'use client';

import Link from 'next/link';
import { useCommerce } from '../lib/context/CommerceContext';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
import { TiTickOutline } from 'react-icons/ti';

export default function CartClient() {
  const {
    cart,
    discount,
    setDiscount,
    totalCart,
    handleCartDelete,
    cargoFee,
    handleCartDecrement,
    handleCartIncrement,
  } = useCommerce();

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {cart.length === 0 ? (
        <div className="col-span-3 p-4 flex justify-between items-center border-2 border-gray-200">
          <div className="flex items-center gap-4">
            <span className="bg-orange-200 p-4 rounded-full">
              <FaShoppingCart className="text-3xl text-orange-600" />
            </span>
            <h1 className="text-xl font-semibold">
              Sepetinde ürün bulunmamaktadır.
            </h1>
          </div>
          <Link
            href="/"
            className="bg-orange-600 text-white font-semibold px-6 py-3"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <>
          <div className="col-span-3 p-4 flex flex-col gap-4">
            {cart.map((cartItem) => {
              const totalPrice = (cartItem.quantity * cartItem.price).toFixed(
                2
              );

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
                    <p className="font-thin text-sm">{cartItem.author}</p>
                  </div>
                  <div className="col-start-4 col-span-1">
                    <p>Adet</p>
                    <button
                      onClick={() => handleCartDecrement(cartItem.id)}
                      className="mr-2 text-purple-800 font-semibold"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-lg">{cartItem.quantity}</span>
                    <button
                      onClick={() => handleCartIncrement(cartItem.id)}
                      className="ml-2 text-purple-800 font-semibold"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="col-start-5 col-span-1">
                    <p>Fiyat</p>
                    <p>{cartItem.price}</p>
                  </div>
                  <div className="col-start-6 col-span-1">
                    <p>Toplam</p>
                    <p>{totalPrice} TL</p>
                  </div>
                  <div className="col-start-7 col-span-1 h-fit">
                    <p>Sil</p>
                    <button onClick={() => handleCartDelete(cartItem.id)}>
                      <MdDelete className="text-2xl text-red-800" />
                    </button>
                  </div>
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
                <p>{totalCart - cargoFee} TL</p>
              </span>
              <span className="flex justify-between">
                <p>Kargo Ücreti</p>
                <p>{cargoFee} TL</p>
              </span>
              <span className="flex justify-between font-semibold">
                <p>Genel Toplam</p>
                <p>{totalCart.toFixed(2)} TL</p>
              </span>
            </div>
            <Link
              href="/checkout"
              className="text-white bg-orange-500 font-semibold rounded-md block py-2 px-4 text-center"
            >
              Satın al
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
