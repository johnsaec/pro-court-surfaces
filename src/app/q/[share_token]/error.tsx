"use client";

export default function PublicQuoteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Something went wrong
        </h1>
        <p className="mt-3 text-gray-600">
          We had trouble loading this quote. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
