import Link from "next/link"
import Navbar from "../../../components/navbar"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
          <h2 className="text-3xl font-serif text-gray-800">Category Not Found</h2>
          <p className="text-gray-600 max-w-md">
            The jewelry category you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-x-4">
            <Link
              href="/products/jewellery"
              className="inline-block bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-full font-medium transition-colors duration-300"
            >
              Browse Jewellery
            </Link>
            <Link
              href="/"
              className="inline-block border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-full font-medium transition-colors duration-300"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
