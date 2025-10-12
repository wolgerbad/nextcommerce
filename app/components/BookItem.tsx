'use client';

import { useState } from 'react';
import { BookType } from './BestSellersHero';
import { useCommerce } from '../lib/context/CommerceContext';

type PropTypes = {
  book: BookType;
};

export default function BookItem({ book }: PropTypes) {
  const { cart, setCart } = useCommerce();
  function handleAddToCart() {
    setCart((cart) => {
      const existingItem = cart.find((c) => c.id === book.id);
      if (existingItem)
        return cart.map((c) =>
          c.id === book.id
            ? {
                ...c,
                quantity: c.quantity++,
              }
            : c
        );
      else return [...cart, { ...book, quantity: 1 }];
    });
  }

  /*
 IF CART ALREADY HAS THE BOOK, QUANTITY++
 IF CART DOESNT HAVE THE BOOK, {id, quantity}
*/

  console.log(cart);

  return (
    <div className="w-48 flex flex-col justify-between">
      <img src={book.image} className="h-64" />
      <p>{book.title}</p>
      <p className="mb-2">{book.author}</p>
      <button
        className="bg-purple-600 w-full py-1 text-white font-semibold"
        onClick={handleAddToCart}
      >
        Sepete Ekle | {book.price} TL
      </button>
    </div>
  );
}
