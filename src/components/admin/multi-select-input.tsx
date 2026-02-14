"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MultiSelectInputProps {
  label: string;
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  options?: string[];
  mode?: "tags" | "checkbox";
  placeholder?: string;
  className?: string;
}

export function MultiSelectInput({
  label,
  name,
  value,
  onChange,
  options,
  mode = "tags",
  placeholder = "Type and press Enter...",
  className,
}: MultiSelectInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !value.includes(trimmed)) {
        onChange([...value, trimmed]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function removeTag(tag: string) {
    onChange(value.filter((v) => v !== tag));
  }

  function toggleOption(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  }

  if (mode === "checkbox" && options) {
    return (
      <div className={cn("space-y-1.5", className)}>
        <Label>{label}</Label>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <label
              key={option}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors",
                value.includes(option)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-input hover:bg-accent"
              )}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={value.includes(option)}
                onChange={() => toggleOption(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <input type="hidden" name={name} value={JSON.stringify(value)} />
      </div>
    );
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label>{label}</Label>
      <div
        className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-1.5 shadow-xs focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]"
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1">
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="ml-0.5 rounded-full hover:bg-muted"
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="h-auto min-w-20 flex-1 border-0 p-0 shadow-none focus-visible:ring-0"
        />
      </div>
      <input type="hidden" name={name} value={JSON.stringify(value)} />
    </div>
  );
}
