"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { List, LayoutGrid } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ViewToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "table";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "table") {
      params.delete("view");
    } else {
      params.set("view", value);
    }
    const qs = params.toString();
    router.push(`/admin/leads${qs ? `?${qs}` : ""}`);
  }

  return (
    <Tabs value={view} onValueChange={handleChange}>
      <TabsList className="h-9">
        <TabsTrigger value="table" className="gap-1.5 px-3">
          <List className="size-4" />
          <span className="hidden sm:inline">List</span>
        </TabsTrigger>
        <TabsTrigger value="board" className="gap-1.5 px-3">
          <LayoutGrid className="size-4" />
          <span className="hidden sm:inline">Board</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
