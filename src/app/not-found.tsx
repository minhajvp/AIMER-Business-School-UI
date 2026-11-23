import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-aimer-600 bg-aimer-50 px-3 py-1 border border-aimer-200">
          Error 404
        </span>
        <h1 className="text-4xl font-bold font-poppins text-charcoal-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-charcoal-600 font-light">
          The requested page could not be located. Please return to the AIMER Business School homepage.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-wider font-semibold text-white bg-aimer-600 hover:bg-aimer-700 transition-colors"
          >
            Return to Homepage →
          </Link>
        </div>
      </div>
    </main>
  );
}

