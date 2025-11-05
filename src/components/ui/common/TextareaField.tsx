"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea as ShadTextarea } from "@/components/ui/textarea";

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  id?: string;
}

export function TextareaField({
  label,
  error,
  className,
  labelClassName,
  id,
  placeholder,
  required,
  ...props
}: TextareaFieldProps) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <Label htmlFor={id} className={"flex items-center gap-1 "+ labelClassName}>
          {label}
          {required && <span className="text-primary">*</span>}
        </Label>
      )}
      <ShadTextarea
        id={id}
        placeholder={placeholder}
        className={cn(
          "bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] dark:bg-[var(--input)] dark:text-[var(--foreground)] focus-visible:border-[var(--ring)] focus-visible:ring-[var(--ring)]/50 min-h-[100px]",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-sm text-[var(--destructive)]">{error}</span>
      )}
    </div>
  );
}
