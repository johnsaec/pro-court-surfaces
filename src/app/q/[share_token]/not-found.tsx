export default function PublicQuoteNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Quote Not Found</h1>
        <p className="mt-3 text-gray-600">
          This quote link may have expired or is no longer available.
          Please contact Pro Court Surfaces if you believe this is an error.
        </p>
      </div>
    </div>
  );
}
