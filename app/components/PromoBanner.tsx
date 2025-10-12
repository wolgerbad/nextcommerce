export default function PromoBanner() {
  return (
    <section className="mt-8 rounded-md bg-gradient-to-r from-purple-800 to-orange-500 text-white p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-wide">
            Sonbahar İndirimi
          </h3>
          <p className="text-sm opacity-90">
            Seçili kitaplarda %50'ye varan fırsatlar!
          </p>
        </div>
        <button className="bg-white text-purple-800 px-5 py-2 rounded font-semibold">
          Fırsatları Gör
        </button>
      </div>
    </section>
  );
}
