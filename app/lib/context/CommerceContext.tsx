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
  const [cart, setCart] = useState(() => {
    const storageCart = localStorage.getItem('cart');
    if (!storageCart) return [];
    return JSON.parse(storageCart);
  });
  // const cartTotal = cart?.reduce((acc, cur) => acc + cur.totalPrice);

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
    [cart]
  );

  return (
    <CommerceContext.Provider value={{ cart, setCart, books, loading }}>
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const ctx = useContext(CommerceContext);

  if (!ctx) return;

  return ctx;
}
