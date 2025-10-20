'use client';

import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useCommerce } from '../lib/context/CommerceContext';
import { createPurchase } from '../lib/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

export type PurchaseItem = {
  id: number;
  image: string;
  price: string | number;
  stock: number;
  title: string;
  author: string;
  rating: string | number;
  quantity: number;
  totalPrice: string | number;
  description: string;
};

type User =
  | {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined | undefined;
    }
  | undefined;

export default function CheckoutClient({
  userId,
  user,
  address = '',
}: {
  userId?: string;
  user: User;
  address: string;
}) {
  const [phoneError, setPhoneError] = useState('');
  const [phoneVal, setPhoneVal] = useState('');
  const [error, setError] = useState('');

  const { cart, setCart, totalCart, cargoFee } = useCommerce();
  const router = useRouter();

  async function handleForm(formData: any) {
    setPhoneError('');
    if (!user) return;
    if (!cart.length) {
      setError('Your cart is empty');
      return;
    }

    const email = user.email;
    const phone = formData.get('phone');
    const address = formData.get('address');
    const purchaseItems = cart;

    if (
      phone.length !== 17 ||
      phone.at(4) !== '5' ||
      !phone.startsWith('+90')
    ) {
      setPhoneError('Invalid phone number');
      return;
    }

    const result = await createPurchase({
      userId,
      totalPrice: totalCart,
      email,
      phone,
      address,
      purchase_items: purchaseItems,
    });

    if (result === 'success') {
      router.push('/checkout/success');
      setCart([]);
    } else setError(result);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout Page</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 flex-grow">
            {cart.map((c) => (
              <div
                key={c.id}
                className="flex items-center space-x-4 border-b pb-4"
              >
                <img
                  src={c.image}
                  alt="book image"
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{c.title}</h3>
                  <p className="text-sm text-gray-600">{c.author}</p>
                  <p className="text-sm">Quantity: {c.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₺{c.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4 flex flex-col justify-self-end">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>₺{totalCart.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Cargo Fee</span>
              <span>₺{cargoFee}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

          <form className="space-y-4" action={handleForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={user?.email}
                  disabled
                  required
                  placeholder="Email"
                  className="w-full disabled:bg-gray-300 disabled:cursor-not-allowed p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.name}
                  disabled
                  required
                  placeholder="Firstname"
                  className="w-full disabled:bg-gray-300 disabled:cursor-not-allowed p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Lastname"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number*
                </label>
                <PhoneInput
                  defaultCountry="tr"
                  placeholder="phone"
                  value={phoneVal}
                  onChange={(val) => {
                    setPhoneError('');
                    setPhoneVal(val);
                  }}
                  name="phone"
                  required
                  className="w-full"
                />
                {phoneError && (
                  <p className="text-red-800 font-thin text-sm">{phoneError}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Adres*</label>
              <p className="text-sm text-gray-600 mb-2">
                To ensure your package reaches you without any issues, make sure
                to enter complete details such as neighborhood, street, avenue,
                and building.
              </p>
              <textarea
                name="address"
                rows={6}
                required
                defaultValue={address}
                placeholder="Please enter your address clearly. Example: Neighborhood, Street/Avenue, Building No., Apartment No., City/District"
                className="-mb-4 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
            {error && <p className="text-red-800">{error}</p>}

            {!userId ? (
              <Link
                href="/login"
                className="block text-center w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                To place an order &rarr; Log in
              </Link>
            ) : (
              <Button />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`w-full ${
        pending
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-purple-600 hover:bg-purple-700 text-white'
      }  py-3 px-4 rounded-lg  transition-colors`}
    >
      {pending ? 'Order is processing...' : 'Place Order'}
    </button>
  );
}
