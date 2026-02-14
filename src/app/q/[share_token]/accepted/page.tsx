import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getQuoteByShareToken } from "@/lib/quotes/public-queries";

export default async function AcceptedPage({
  params,
}: {
  params: Promise<{ share_token: string }>;
}) {
  const { share_token } = await params;
  const quote = await getQuoteByShareToken(share_token);

  if (!quote || quote.status !== "accepted") notFound();

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardContent className="pt-8 pb-8 space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold">Quote Accepted!</h1>
          <p className="text-muted-foreground">
            Thank you for accepting quote{" "}
            <span className="font-medium">{quote.quote_number}</span>. We will
            be in touch shortly to discuss next steps for your project.
          </p>
          {quote.customer?.email && (
            <p className="text-sm text-muted-foreground">
              A confirmation will be sent to{" "}
              <span className="font-medium">{quote.customer.email}</span>.
            </p>
          )}
          <div className="pt-4">
            <Button variant="outline" asChild>
              <Link href={`/q/${share_token}`}>View Quote Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
