export default function WhyChooseUs() {
  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-bold text-purple-800 mb-8 uppercase">
        Neden Bizden Almalısınız?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Hızlı Kargo</h3>
          <p className="text-sm text-gray-600">
            Aynı gün kargolama ve kapınıza hızlı teslimat.
          </p>
        </div>
        <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Güvenli Ödeme</h3>
          <p className="text-sm text-gray-600">
            PCI-DSS uyumlu altyapı ile %100 güvenli ödeme.
          </p>
        </div>
        <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Uygun Fiyat</h3>
          <p className="text-sm text-gray-600">
            Sürekli kampanyalar ve en iyi fiyat garantisi.
          </p>
        </div>
        <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Müşteri Desteği</h3>
          <p className="text-sm text-gray-600">
            7/24 destek ile her adımda yanınızdayız.
          </p>
        </div>
      </div>
    </section>
  );
}
