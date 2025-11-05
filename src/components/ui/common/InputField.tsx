"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input as ShadInput } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  id?: string;
}

export function InputField({
  label,
  error,
  className,
  labelClassName,
  id,
  type = "text",
  placeholder,
  required,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  // Determine input type based on showPassword toggle
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="flex flex-col space-y-1 w-full relative">
      {label && (
        <Label htmlFor={id} className={"flex items-center gap-1 "+labelClassName}>
          {label}
          {required && <span className="text-primary">*</span>}
        </Label>
      )}
      <div className="relative w-full">
        <ShadInput
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={cn(
            "bg-[var(--input)] text-[var(--foreground)]  placeholder:text-[var(--muted-foreground)] dark:bg-[var(--input)] dark:text-[var(--foreground)] focus-visible:border-[var(--ring)] focus-visible:ring-[var(--ring)]/50 pr-10",
            className
          )}
          {...props}
        />
        {/* Show/Hide eye icon */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-sm text-[var(--destructive)]">{error}</span>
      )}
    </div>
  );
}
