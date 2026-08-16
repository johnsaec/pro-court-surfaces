"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyDialog } from "./company-dialog";

export function CompanyCreateButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Add Company
      </Button>
      <CompanyDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
