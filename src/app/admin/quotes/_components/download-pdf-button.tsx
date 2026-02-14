"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DownloadPdfButton({ quoteId }: { quoteId: string }) {
  return (
    <Button variant="outline" asChild>
      <a href={`/api/quotes/${quoteId}/pdf`} target="_blank" rel="noopener noreferrer">
        <Download className="size-4 mr-1" />
        Download PDF
      </a>
    </Button>
  );
}
