import {
  ACTIVITY_EVENT_LABELS,
  ACTIVITY_EVENT_COLORS,
} from "@/lib/constants";
import type { ActivityLogEntry } from "@/lib/admin/queries/activity-queries";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

type Props = {
  entries: (ActivityLogEntry & { quote_number?: string })[];
  showQuoteNumber?: boolean;
};

export function ActivityTimeline({ entries, showQuoteNumber = false }: Props) {
  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
    );
  }

  return (
    <div className="space-y-0">
      {entries.map((entry, idx) => {
        const dotColor =
          ACTIVITY_EVENT_COLORS[entry.event_type] ?? "bg-gray-400";
        const label =
          ACTIVITY_EVENT_LABELS[entry.event_type] ?? entry.event_type;
        const isLast = idx === entries.length - 1;

        return (
          <div key={entry.id} className="flex gap-3">
            {/* Timeline rail */}
            <div className="flex flex-col items-center">
              <div className={`mt-1.5 size-2.5 shrink-0 rounded-full ${dotColor}`} />
              {!isLast && <div className="w-px flex-1 bg-border" />}
            </div>

            {/* Content */}
            <div className={`pb-4 ${isLast ? "" : ""}`}>
              <p className="text-sm font-medium leading-tight">
                {label}
                {showQuoteNumber && entry.quote_number && (
                  <span className="ml-1 text-muted-foreground font-normal">
                    ({entry.quote_number})
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(entry.created_at)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
