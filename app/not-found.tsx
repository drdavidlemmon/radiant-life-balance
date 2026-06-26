import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-purple-200 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-3">Page Not Found</h1>
        <p className="text-slate-500 mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
