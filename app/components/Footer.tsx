export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 py-10 px-20 text-sm text-gray-700">
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Bookify: Discover millions of books at affordable prices.
        </p>
        <p className="text-gray-500">
          © {new Date().getFullYear()} Bookify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
