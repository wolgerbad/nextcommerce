'use client';

import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useCommerce } from '../lib/context/CommerceContext';
import { createPurchase } from '../lib/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutClient({ userId, user, address }) {
  const { cart, setCart, totalCart, cargoFee } = useCommerce();
  const router = useRouter();

  console.log('user:', user);

  async function handleForm(formData) {
    const email = user.email;
    const name = user.name;
    const lastName = formData.get('lastName');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const purchaseItems = JSON.stringify(cart);

    const result = await createPurchase({
      userId,
      totalPrice: totalCart,
      email,
      phone,
      address,
      purchase_items: purchaseItems,
    });

    if (result) {
      router.push('/checkout/success');
      setCart([]);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Ödeme Sayfası</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
          <div className="space-y-4 flex-grow">
            {cart.map((c) => (
              <div
                key={c.id}
                className="flex items-center space-x-4 border-b pb-4"
              >
                <img
                  src={c.image}
                  alt="Kitap Resmi"
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{c.title}</h3>
                  <p className="text-sm text-gray-600">{c.author}</p>
                  <p className="text-sm">Adet: {c.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₺{c.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4 flex flex-col justify-self-end">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Toplam:</span>
              <span>₺{totalCart.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span>Kargo Ücreti</span>
              <span>{cargoFee} TL</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Teslimat Bilgileri</h2>

          <form className="space-y-4" action={handleForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  E-posta*
                </label>
                <input
                  type="email"
                  name="email"
                  value={user?.email}
                  disabled
                  required
                  placeholder="E-postanızı giriniz"
                  className="w-full disabled:bg-gray-300 disabled:cursor-not-allowed p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ad*</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.name}
                  disabled
                  required
                  placeholder="Adınızı giriniz"
                  className="w-full disabled:bg-gray-300 disabled:cursor-not-allowed p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Soyad*</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Soyadınızı giriniz"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Telefon numarası*
                </label>
                <PhoneInput
                  defaultCountry="tr"
                  name="phone"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Adres*</label>
              <p className="text-sm text-gray-600 mb-2">
                Kargonuzun size sorunsuz bir şekilde ulaşabilmesi için mahalle,
                cadde, sokak, bina gibi detay bilgileri eksiksiz girdiğinizden
                emin olun.
              </p>
              <textarea
                name="address"
                rows={6}
                required
                defaultValue={address}
                placeholder="Adresinizi açık bir biçimde giriniz. Örnek: Mahalle, Cadde/Sokak, Bina No, Daire No, İl/İlçe"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            {!userId ? (
              <Link
                href="/login"
                className="block text-center w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Sipariş Verebilmek için &rarr; Giriş Yap
              </Link>
            ) : (
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Siparişi Tamamla
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
