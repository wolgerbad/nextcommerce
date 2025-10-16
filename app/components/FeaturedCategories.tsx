export default function FeaturedCategories() {
  const categories = [
    { title: 'Novel', color: 'bg-purple-100', accent: 'text-purple-800' },
    {
      title: 'Personal Development',
      color: 'bg-orange-100',
      accent: 'text-orange-700',
    },
    {
      title: 'Science & Technology',
      color: 'bg-blue-100',
      accent: 'text-blue-700',
    },
    { title: 'Children', color: 'bg-green-100', accent: 'text-green-700' },
    { title: 'History', color: 'bg-yellow-100', accent: 'text-yellow-700' },
    { title: 'Philosophy', color: 'bg-pink-100', accent: 'text-pink-700' },
  ];

  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-bold text-purple-800 mb-6 uppercase">
        Featured Categories
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
