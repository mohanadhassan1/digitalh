'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw, Home, Bug } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error caught by error boundary:', error)
  }, [error])

  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600">
            We encountered an unexpected error. Do not worry, our team has been notified.
          </p>
        </div>

        {isDevelopment && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
            <div className="flex items-center mb-2">
              <Bug className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Debug Info:</span>
            </div>
            <div className="text-xs text-gray-600 font-mono break-all">
              <div className="mb-1">
                <strong>Message:</strong> {error.message}
              </div>
              {error.digest && (
                <div>
                  <strong>Digest:</strong> {error.digest}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          Error ID: {error.digest || 'Unknown'}
        </div>
      </div>
    </div>
  )
}