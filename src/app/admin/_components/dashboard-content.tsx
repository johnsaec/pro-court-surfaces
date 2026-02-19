import Link from "next/link";
import { FileText, DollarSign, TrendingUp, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatCard } from "./stat-card";
import { ActivityTimeline } from "../quotes/_components/activity-timeline";
import { getDashboardStats, getRecentQuotes } from "@/lib/admin/queries/dashboard-queries";
import { getRecentActivity } from "@/lib/admin/queries/activity-queries";
import { QUOTE_STATUS_LABELS, QUOTE_STATUS_COLORS } from "@/lib/constants";

export async function DashboardContent() {
  const [stats, recentQuotes, recentActivity] = await Promise.all([
    getDashboardStats(),
    getRecentQuotes(5),
    getRecentActivity(10),
  ]);

  return (
    <>
      {/* Stat Cards */}
      <div className="mt-6 grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Quotes"
          value={stats.totalQuotes.toString()}
          icon={FileText}
        />
        <StatCard
          title="Pipeline Value"
          value={`$${stats.pipelineValue.toLocaleString()}`}
          icon={TrendingUp}
        />
        <StatCard
          title="Deposits Collected"
          value={`$${stats.depositsCollected.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatCard
          title="Completed Revenue"
          value={`$${stats.completedRevenue.toLocaleString()}`}
          icon={CheckCircle}
        />
      </div>

      {/* Two-column: Recent Quotes + Recent Activity */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Recent Quotes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Quotes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {recentQuotes.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">
                No quotes yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quote #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentQuotes.map((q) => (
                    <TableRow key={q.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/admin/quotes/${q.id}/preview`}
                          className="hover:underline"
                        >
                          {q.quote_number}
                        </Link>
                      </TableCell>
                      <TableCell className="truncate max-w-[120px]">
                        {q.customer?.display_name ??
                          q.lead?.display_name ??
                          "—"}
                      </TableCell>
                      <TableCell>
                        <Badge className={QUOTE_STATUS_COLORS[q.status]}>
                          {QUOTE_STATUS_LABELS[q.status] ?? q.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {q.total != null ? `$${q.total.toLocaleString()}` : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline entries={recentActivity} showQuoteNumber />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
