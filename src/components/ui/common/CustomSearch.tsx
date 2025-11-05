"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input as ShadInput } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}


export function SearchInput({
  value,
  onChange,
  className,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <ShadInput
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] dark:bg-[var(--input)] dark:text-[var(--foreground)] focus-visible:border-[var(--ring)] focus-visible:ring-[var(--ring)]/50 pr-10 h-12",
          className
        )}
        {...props}
      />

      {/* Icon logic */}
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 cursor-pointer"
        >
          <X size={18} />
        </button>
      ) : (
        <Search
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
        />
      )}
    </div>
  );
}
