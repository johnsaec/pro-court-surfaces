"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorDialog } from "./color-dialog";

export function ColorCreateButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus /> Add Color
      </Button>
      <ColorDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
