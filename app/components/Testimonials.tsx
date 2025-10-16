export default function Testimonials() {
  const testimonials = [
    {
      name: 'Ayşe K.',
      text: 'My order arrived the next day, the packaging was amazing!',
    },
    {
      name: 'Mehmet T.',
      text: 'Prices are very reasonable, promotions come often, I recommend it.',
    },
    {
      name: 'Ece Y.',
      text: 'Customer service is very attentive, they found a solution quickly.',
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-bold text-purple-800 mb-6 uppercase">
        What Our Customers Say?
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
