'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

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
type CartItem = {
  author: string;
  description: string;
  id: number;
  image: string;
  price: string | number;
  quantity: number;
  rating: string | number;
  stock: number;
  title: string;
  totalPrice: string | number;
};

type CartType = CartItem[];

type CommerceContextType = {
  cart: CartType;
  setCart: Dispatch<SetStateAction<CartType>>;
  books: BookType[];
  loading: boolean;
  totalCart: number;
  cargoFee: number;
  handleCartDelete: (id: number) => void;
  handleCartDecrement: (id: number) => void;
  handleCartIncrement: (id: number) => void;
};

const CommerceContext = createContext<CommerceContextType | null>(null);

export function CommerceContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartType>([]);
  const totalCartVal = cart.reduce(
    (acc, cur) => acc + cur.quantity * +cur.price,
    0
  );
  const cargoFee = 59.99;

  const totalCart = +totalCartVal.toFixed(2);

  function handleCartDelete(id: number) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function handleCartDecrement(id: number) {
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
  function handleCartIncrement(id: number) {
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

  useEffect(function () {
    const storageCart = localStorage.getItem('cart');
    if (!storageCart) return;

    const parsedCart = JSON.parse(storageCart);
    setCart(parsedCart);
  }, []);

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

export function useCommerce(): CommerceContextType {
  const ctx = useContext(CommerceContext);

  if (!ctx) throw new Error('You probably used context outside of its scope.');

  return ctx;
}
