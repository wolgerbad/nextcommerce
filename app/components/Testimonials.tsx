export default function Testimonials() {
  const testimonials = [
    {
      name: 'Ayşe K.',
      text: 'Siparişim ertesi gün elime ulaştı, paketleme harikaydı!',
    },
    {
      name: 'Mehmet T.',
      text: 'Fiyatlar çok uygun, kampanyalar sık geliyor, tavsiye ederim.',
    },
    {
      name: 'Ece Y.',
      text: 'Müşteri hizmetleri çok ilgili, hızlıca çözüm buldular.',
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-bold text-purple-800 mb-6 uppercase">
        Müşterilerimiz Ne Diyor?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="border border-gray-200 rounded-md p-6 bg-white shadow-sm"
          >
            <p className="text-gray-700 mb-3">“{t.text}”</p>
            <div className="text-sm text-gray-500">— {t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
