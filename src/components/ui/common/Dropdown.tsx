"use client";
import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../label";

interface ComboboxOption {
  [key: string]: any;
}

interface ComboboxProps {
  options: ComboboxOption[];
  placeholder?: string;
  optionLabel?: string;
  onChange?: (selected: ComboboxOption | null) => void;
  value?: ComboboxOption | null;
  filter?: boolean;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
  labelClassName?: string;
}

export function Dropdown({
  options,
  placeholder = "Select...",
  onChange,
  optionLabel = "name",
  value: controlledValue = null,
  filter = true,
  disabled = false,
  label,
  required = false,
  error,
  className,
  labelClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedObj, setSelectedObj] = React.useState(controlledValue);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    setSelectedObj(controlledValue);
  }, [controlledValue]);

  const handleSelect = (selectedLabel: string) => {
    const obj =
      options.find((opt) => opt[optionLabel] === selectedLabel) || null;
    setSelectedObj(obj);
    onChange?.(obj);
    setOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedObj(null);
    onChange?.(null);
  };

  const filteredOptions = search
    ? options.filter((opt) =>
        String(opt[optionLabel]).toLowerCase().includes(search.toLowerCase())
      )
    : options;

  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <Label className={"flex items-center gap-1 " + labelClassName}>
          {label}
          {required && <span className="text-primary">*</span>}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            aria-expanded={open}
            className={cn(
              "w-full justify-between bg-background hover:bg-background hover:text-foreground",
              className,
              disabled && "cursor-not-allowed opacity-60"
            )}
          >
            <span className="truncate flex-1 text-left">
              {selectedObj ? String(selectedObj[optionLabel]) : placeholder}
            </span>
            <div className="flex items-center gap-2">
              {selectedObj && !disabled ? (
                <span className="cursor-pointer" onClick={handleClear}>
                  <X className="opacity-50" />
                </span>
              ) : (
                <ChevronDown className="opacity-50" />
              )}
            </div>
          </Button>
        </PopoverTrigger>

        {!disabled && (
          <PopoverContent
            align="start"
            sideOffset={4}
            className="p-0 min-w-[var(--radix-popover-trigger-width)] w-[var(--radix-popover-trigger-width)]"
          >
            <Command>
              {filter && (
                <CommandInput
                  placeholder={`Search... `}
                  className="h-9"
                  value={search}
                  onValueChange={setSearch}
                />
              )}

              <CommandList>
                <CommandEmpty>No result found.</CommandEmpty>
                <CommandGroup>
                  {filteredOptions.map((opt) => {
                    return (
                      <CommandItem
                        key={opt[optionLabel]}
                        value={opt[optionLabel]}
                        onSelect={handleSelect}
                        className="cursor-pointer data-[highlighted]:bg-muted"
                      >
                        {opt[optionLabel]}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedObj?.[optionLabel] === opt[optionLabel]
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>

      {error && (
        <span className="text-sm text-[var(--destructive)]">{error}</span>
      )}
    </div>
  );
}
