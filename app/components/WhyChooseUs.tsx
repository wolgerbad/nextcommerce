export default function WhyChooseUs() {
  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-bold text-purple-800 mb-8 uppercase">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
          <p className="text-sm text-gray-600">
            Same-day shipping and fast delivery to your door.
          </p>
        </div>
        <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
          <p className="text-sm text-gray-600">
            100% secure payment with PCI-DSS compliant infrastructure.
          </p>
        </div>
        <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Affordable Price</h3>
          <p className="text-sm text-gray-600">
            Ongoing promotions and best price guarantee.
          </p>
        </div>
        <div className="border border-gray-200 rounded-md p-6 bg-white shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Customer Support</h3>
          <p className="text-sm text-gray-600">
            We are with you every step with 24/7 support.
          </p>
        </div>
      </div>
    </section>
  );
}
