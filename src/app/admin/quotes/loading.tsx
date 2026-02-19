export default function QuotesLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-36 animate-pulse rounded bg-muted" />
        <div className="h-4 w-56 animate-pulse rounded bg-muted" />
      </div>
      <div className="rounded-lg border">
        <div className="border-b px-4 py-3">
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-20 animate-pulse rounded bg-muted" />
            ))}
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 border-b px-4 py-3 last:border-0">
            {Array.from({ length: 6 }).map((_, j) => (
              <div key={j} className="h-4 w-20 animate-pulse rounded bg-muted" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
