export default function FeaturedCategories() {
  const categories = [
    { title: 'Roman', color: 'bg-purple-100', accent: 'text-purple-800' },
    {
      title: 'Kişisel Gelişim',
      color: 'bg-orange-100',
      accent: 'text-orange-700',
    },
    {
      title: 'Bilim & Teknoloji',
      color: 'bg-blue-100',
      accent: 'text-blue-700',
    },
    { title: 'Çocuk', color: 'bg-green-100', accent: 'text-green-700' },
    { title: 'Tarih', color: 'bg-yellow-100', accent: 'text-yellow-700' },
    { title: 'Felsefe', color: 'bg-pink-100', accent: 'text-pink-700' },
  ];

  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-bold text-purple-800 mb-6 uppercase">
        Öne Çıkan Kategoriler
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((c) => (
          <div
            key={c.title}
            className={`${c.color} rounded-md p-4 text-center hover:shadow transition-shadow`}
          >
            <div className={`font-semibold ${c.accent}`}>{c.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
