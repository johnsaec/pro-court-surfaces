"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function FormField({
  label,
  name,
  error,
  className,
  children,
  ...inputProps
}: {
  label: string;
  name: string;
  error?: string;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentProps<typeof Input>, "children">) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={name}>{label}</Label>
      {children ?? <Input id={name} name={name} {...inputProps} />}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
