import Link from 'next/link'
import { Compass, Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Compass className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>What happened?</strong>
          </p>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            <li>• The URL might be typed incorrectly</li>
            <li>• The page may have been removed or renamed</li>
            <li>• You might not have permission to view this page</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>

          <Link
            href="/search"
            className="w-full bg-green-100 hover:bg-green-200 text-green-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Site
          </Link>
        </div>

        <div className="mt-8 text-xs text-gray-500">
          <p>Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  )
}