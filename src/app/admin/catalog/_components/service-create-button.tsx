"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceDialog } from "./service-dialog";

export function ServiceCreateButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Add Service
      </Button>
      <ServiceDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
