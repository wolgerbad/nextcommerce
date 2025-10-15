'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type BookType = {
  id: number;
  title: string;
  image: string;
  author: string;
  price: number;
  description: string;
  stock: number;
  rating: number;
};

const CommerceContext = createContext();

export function CommerceContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [cart, setCart] = useState(() => {
    const storageCart = localStorage.getItem('cart');
    if (!storageCart) return [];
    return JSON.parse(storageCart);
  });
  // const cartTotal = cart?.reduce((acc, cur) => acc + cur.totalPrice);
  const totalCartVal = cart.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  );
  const cargoFee = 59.99;

  const totalCart = discount
    ? ((+totalCartVal.toFixed(2) + cargoFee) * 9) / 10
    : +totalCartVal.toFixed(2) + cargoFee;

  function handleCartDelete(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function handleCartDecrement(id) {
    setCart((cart) =>
      cart.map((c) => {
        return c.id === id
          ? {
              ...c,
              quantity: c.quantity - 1,
            }
          : c;
      })
    );

    setCart((cart) => cart.filter((c) => c.quantity !== 0));
  }
  function handleCartIncrement(id) {
    setCart((cart) =>
      cart.map((c) =>
        c.id === id
          ? {
              ...c,
              quantity: c.quantity + 1,
            }
          : c
      )
    );
  }

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(`/api/books`);
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  useEffect(
    function () {
      localStorage.setItem('cart', JSON.stringify(cart));
    },
    [cart, setCart]
  );

  return (
    <CommerceContext.Provider
      value={{
        cart,
        discount,
        setDiscount,
        setCart,
        books,
        loading,
        totalCart,
        cargoFee,
        handleCartDelete,
        handleCartDecrement,
        handleCartIncrement,
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const ctx = useContext(CommerceContext);

  if (!ctx) return;

  return ctx;
}
