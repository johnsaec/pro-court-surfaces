export default function QuoteDetailLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-4 w-64 animate-pulse rounded bg-muted" />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div className="h-32 animate-pulse rounded-lg border bg-muted" />
        <div className="h-32 animate-pulse rounded-lg border bg-muted" />
      </div>
      <div className="h-96 animate-pulse rounded-lg border bg-muted" />
    </div>
  );
}
