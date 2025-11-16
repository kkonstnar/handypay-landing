import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-12 min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-neutral-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#3AB75C] text-white rounded-full font-medium hover:bg-[#2ea04a] transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/#features"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-colors"
          >
            View Features
          </Link>
        </div>
      </div>
    </main>
  );
}

