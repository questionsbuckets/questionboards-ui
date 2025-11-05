"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type CustomButtonProps = {
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  startIconClassName?: string;
  className?: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  type = "button",
  loading = false,
  disabled = false,
  startIcon,
  startIconClassName,
  className,
  label,
  onClick,
}) => {
  return (
    <Button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer justify-center gap-2 transition-all duration-200 bg-primary text-primary-foreground",
        className
      )}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        startIcon && (
          <span className={cn("flex-shrink-0", startIconClassName)}>
            {startIcon}
          </span>
        )
      )}

      <span>{loading ? "Please wait..." : label}</span>
    </Button>
  );
};
