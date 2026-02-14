"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCreateDialog } from "./lead-create-dialog";

export function LeadCreateButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Add Lead
      </Button>
      <LeadCreateDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
